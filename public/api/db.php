<?php
/**
 * Database & Storage Adapter for Rasa Qateh Gostar Mehr CMS
 * Designed for cPanel / Apache / MySQL environments with automatic JSON fallback
 */

// Global CORS & Header Configuration
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Content-Type: application/json; charset=utf-8');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// -------------------------------------------------------------
// Database Configuration (Customize for your cPanel MySQL Database)
// -------------------------------------------------------------
define('DB_HOST', getenv('DB_HOST') ?: 'localhost');
define('DB_NAME', getenv('DB_NAME') ?: 'rasa_cms_db');
define('DB_USER', getenv('DB_USER') ?: 'rasa_cms_user');
define('DB_PASS', getenv('DB_PASS') ?: '');
define('DB_CHARSET', 'utf8mb4');

// Fallback JSON Storage Path
define('DATA_DIR', __DIR__ . '/data');
define('DATA_FILE', DATA_DIR . '/data.json');
define('BACKUP_FILE', DATA_DIR . '/default_backup.json');

/**
 * Get PDO MySQL connection if available, otherwise null
 */
function getDbConnection() {
    static $pdo = null;
    if ($pdo !== null) {
        return $pdo;
    }

    // If no password or host is placeholder, check connection quietly
    try {
        $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;
        $options = [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
            PDO::ATTR_TIMEOUT            => 2,
        ];
        $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
        
        // Ensure content table exists
        $createTableSql = "CREATE TABLE IF NOT EXISTS rasa_site_content (
            id INT AUTO_INCREMENT PRIMARY KEY,
            content_key VARCHAR(64) UNIQUE NOT NULL,
            content_value LONGTEXT NOT NULL,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;";
        $pdo->exec($createTableSql);

        return $pdo;
    } catch (Throwable $e) {
        // Fallback to JSON file storage mode
        $pdo = false;
        return null;
    }
}

/**
 * Ensure data directory and .htaccess protection exists
 */
function ensureDataDirExists() {
    if (!is_dir(DATA_DIR)) {
        mkdir(DATA_DIR, 0755, true);
    }
    
    $htaccessFile = DATA_DIR . '/.htaccess';
    if (!file_exists($htaccessFile)) {
        $htaccessContent = "# Prevent direct web access to JSON data files\n<IfModule authz_core_module>\n    Require all denied\n</IfModule>\n<IfModule !authz_core_module>\n    Deny from all\n</IfModule>\n";
        @file_put_contents($htaccessFile, $htaccessContent);
    }
}

/**
 * Retrieve all content from DB or JSON file
 */
function loadAllContent() {
    ensureDataDirExists();
    $pdo = getDbConnection();

    if ($pdo) {
        try {
            $stmt = $pdo->prepare("SELECT content_key, content_value FROM rasa_site_content");
            $stmt->execute();
            $rows = $stmt->fetchAll();
            if (!empty($rows)) {
                $result = [];
                foreach ($rows as $row) {
                    $val = json_decode($row['content_value'], true);
                    $result[$row['content_key']] = ($val !== null) ? $val : $row['content_value'];
                }
                return $result;
            }
        } catch (Throwable $e) {
            // DB query failed, fallback to file
        }
    }

    // JSON file fallback
    if (file_exists(DATA_FILE)) {
        $raw = file_get_contents(DATA_FILE);
        $json = json_decode($raw, true);
        if ($json && is_array($json)) {
            return $json;
        }
    }

    // Return empty array if not initialized yet
    return [];
}

/**
 * Save all content to DB and JSON file
 */
function saveAllContent(array $data) {
    ensureDataDirExists();
    $savedToDb = false;
    $savedToFile = false;

    // 1. Try saving to MySQL Database
    $pdo = getDbConnection();
    if ($pdo) {
        try {
            $pdo->beginTransaction();
            $stmt = $pdo->prepare("INSERT INTO rasa_site_content (content_key, content_value) 
                VALUES (:k, :v) 
                ON DUPLICATE KEY UPDATE content_value = :v_update, updated_at = CURRENT_TIMESTAMP");
            
            foreach ($data as $key => $value) {
                $jsonValue = json_encode($value, JSON_UNESCAPED_UNICODE);
                $stmt->execute([
                    ':k' => $key,
                    ':v' => $jsonValue,
                    ':v_update' => $jsonValue
                ]);
            }
            $pdo->commit();
            $savedToDb = true;
        } catch (Throwable $e) {
            if ($pdo->inTransaction()) {
                $pdo->rollBack();
            }
        }
    }

    // 2. Always persist to JSON File as reliable storage and backup
    $rawJson = json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    if ($rawJson) {
        $writeResult = @file_put_contents(DATA_FILE, $rawJson, LOCK_EX);
        if ($writeResult !== false) {
            $savedToFile = true;
        }
    }

    return ($savedToDb || $savedToFile);
}
