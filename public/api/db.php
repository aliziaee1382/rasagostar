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
define('MESSAGES_FILE', DATA_DIR . '/messages.json');
define('BACKUP_FILE', DATA_DIR . '/default_backup.json');
define('UPLOADS_DIR', __DIR__ . '/uploads');
define('UPLOADS_URL', '/api/uploads');

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

        // Ensure contact messages table exists
        $createMessagesTableSql = "CREATE TABLE IF NOT EXISTS rasa_contact_messages (
            id INT AUTO_INCREMENT PRIMARY KEY,
            tracking_code VARCHAR(32) UNIQUE NOT NULL,
            full_name VARCHAR(128) NOT NULL,
            phone VARCHAR(64) NOT NULL,
            email VARCHAR(128) DEFAULT NULL,
            company_name VARCHAR(128) DEFAULT NULL,
            service_interest VARCHAR(64) DEFAULT 'general',
            subject VARCHAR(255) NOT NULL,
            message TEXT NOT NULL,
            attachment_name VARCHAR(255) DEFAULT NULL,
            attachment_path VARCHAR(255) DEFAULT NULL,
            attachment_size INT DEFAULT 0,
            attachment_type VARCHAR(64) DEFAULT NULL,
            status ENUM('new', 'read', 'reviewed', 'approved') DEFAULT 'new',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;";
        $pdo->exec($createMessagesTableSql);

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
 * Ensure uploads directory exists with execution security
 */
function ensureUploadsDirExists() {
    if (!is_dir(UPLOADS_DIR)) {
        mkdir(UPLOADS_DIR, 0755, true);
    }

    $htaccessFile = UPLOADS_DIR . '/.htaccess';
    if (!file_exists($htaccessFile)) {
        $htaccessContent = "# Disable PHP script execution in uploads directory\n<FilesMatch \"\.(php|php5|php7|php8|phtml|pl|py|jsp|asp|sh|cgi)$\">\n    Order Deny,Allow\n    Deny from all\n</FilesMatch>\nOptions -ExecCGI\n";
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

/**
 * Load all contact messages from Database or JSON file
 */
function loadAllMessages() {
    ensureDataDirExists();
    $pdo = getDbConnection();

    if ($pdo) {
        try {
            $stmt = $pdo->prepare("SELECT * FROM rasa_contact_messages ORDER BY id DESC");
            $stmt->execute();
            $rows = $stmt->fetchAll();
            if ($rows !== false) {
                $messages = [];
                foreach ($rows as $row) {
                    $attachment = null;
                    if (!empty($row['attachment_name'])) {
                        $attachment = [
                            'name' => $row['attachment_name'],
                            'url' => $row['attachment_path'],
                            'size' => (int)($row['attachment_size'] ?? 0),
                            'fileType' => $row['attachment_type'] ?? ''
                        ];
                    }

                    $messages[] = [
                        'id' => (string)$row['id'],
                        'trackingCode' => $row['tracking_code'],
                        'fullName' => $row['full_name'],
                        'phone' => $row['phone'],
                        'email' => $row['email'] ?: '',
                        'companyName' => $row['company_name'] ?: '',
                        'serviceInterest' => $row['service_interest'] ?: 'general',
                        'subject' => $row['subject'],
                        'message' => $row['message'],
                        'attachment' => $attachment,
                        'status' => $row['status'] ?: 'new',
                        'createdAt' => $row['created_at']
                    ];
                }
                return $messages;
            }
        } catch (Throwable $e) {
            // DB query failed, fallback to file
        }
    }

    // JSON file fallback
    if (file_exists(MESSAGES_FILE)) {
        $raw = file_get_contents(MESSAGES_FILE);
        $json = json_decode($raw, true);
        if ($json && is_array($json)) {
            return $json;
        }
    }

    return [];
}

/**
 * Save a new contact message to Database and JSON file
 */
function insertMessage(array $msgData) {
    ensureDataDirExists();
    $pdo = getDbConnection();
    $savedToDb = false;

    $trackingCode = !empty($msgData['trackingCode']) ? $msgData['trackingCode'] : 'MSG-' . rand(100000, 999999);
    $fullName = $msgData['fullName'] ?? '';
    $phone = $msgData['phone'] ?? '';
    $email = $msgData['email'] ?? '';
    $companyName = $msgData['companyName'] ?? '';
    $serviceInterest = $msgData['serviceInterest'] ?? 'general';
    $subject = $msgData['subject'] ?? '';
    $message = $msgData['message'] ?? '';
    $status = $msgData['status'] ?? 'new';
    $createdAt = $msgData['createdAt'] ?? date('Y-m-d H:i:s');
    
    $attachmentName = $msgData['attachment']['name'] ?? null;
    $attachmentPath = $msgData['attachment']['url'] ?? null;
    $attachmentSize = $msgData['attachment']['size'] ?? 0;
    $attachmentType = $msgData['attachment']['fileType'] ?? null;

    $insertedId = (string)time() . '_' . rand(100, 999);

    if ($pdo) {
        try {
            $stmt = $pdo->prepare("INSERT INTO rasa_contact_messages 
                (tracking_code, full_name, phone, email, company_name, service_interest, subject, message, attachment_name, attachment_path, attachment_size, attachment_type, status, created_at)
                VALUES 
                (:tracking_code, :full_name, :phone, :email, :company_name, :service_interest, :subject, :message, :attachment_name, :attachment_path, :attachment_size, :attachment_type, :status, :created_at)");
            
            $stmt->execute([
                ':tracking_code' => $trackingCode,
                ':full_name' => $fullName,
                ':phone' => $phone,
                ':email' => $email,
                ':company_name' => $companyName,
                ':service_interest' => $serviceInterest,
                ':subject' => $subject,
                ':message' => $message,
                ':attachment_name' => $attachmentName,
                ':attachment_path' => $attachmentPath,
                ':attachment_size' => $attachmentSize,
                ':attachment_type' => $attachmentType,
                ':status' => $status,
                ':created_at' => $createdAt
            ]);
            $insertedId = (string)$pdo->lastInsertId();
            $savedToDb = true;
        } catch (Throwable $e) {
            // DB insertion failed
        }
    }

    // Always update JSON file
    $allMessages = [];
    if (file_exists(MESSAGES_FILE)) {
        $raw = file_get_contents(MESSAGES_FILE);
        $allMessages = json_decode($raw, true) ?: [];
    }

    $newMessage = [
        'id' => $insertedId,
        'trackingCode' => $trackingCode,
        'fullName' => $fullName,
        'phone' => $phone,
        'email' => $email,
        'companyName' => $companyName,
        'serviceInterest' => $serviceInterest,
        'subject' => $subject,
        'message' => $message,
        'attachment' => $attachmentName ? [
            'name' => $attachmentName,
            'url' => $attachmentPath,
            'size' => $attachmentSize,
            'fileType' => $attachmentType
        ] : null,
        'status' => $status,
        'createdAt' => $createdAt
    ];

    array_unshift($allMessages, $newMessage);
    @file_put_contents(MESSAGES_FILE, json_encode($allMessages, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT), LOCK_EX);

    return $newMessage;
}

/**
 * Update status of an existing message
 */
function updateMessageStatus($id, $newStatus) {
    ensureDataDirExists();
    $validStatuses = ['new', 'read', 'reviewed', 'approved'];
    if (!in_array($newStatus, $validStatuses, true)) {
        return false;
    }

    $pdo = getDbConnection();
    if ($pdo) {
        try {
            $stmt = $pdo->prepare("UPDATE rasa_contact_messages SET status = :status WHERE id = :id OR tracking_code = :tc");
            $stmt->execute([':status' => $newStatus, ':id' => $id, ':tc' => $id]);
        } catch (Throwable $e) {
            // ignore
        }
    }

    // Update JSON
    if (file_exists(MESSAGES_FILE)) {
        $raw = file_get_contents(MESSAGES_FILE);
        $all = json_decode($raw, true) ?: [];
        $found = false;
        foreach ($all as &$m) {
            if ($m['id'] == $id || $m['trackingCode'] == $id) {
                $m['status'] = $newStatus;
                $found = true;
                break;
            }
        }
        if ($found) {
            @file_put_contents(MESSAGES_FILE, json_encode($all, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT), LOCK_EX);
        }
    }

    return true;
}

/**
 * Delete a message and remove its uploaded attachment
 */
function deleteMessage($id) {
    ensureDataDirExists();
    $attachmentToDelete = null;

    $pdo = getDbConnection();
    if ($pdo) {
        try {
            $stmtSelect = $pdo->prepare("SELECT attachment_path FROM rasa_contact_messages WHERE id = :id OR tracking_code = :tc");
            $stmtSelect->execute([':id' => $id, ':tc' => $id]);
            $row = $stmtSelect->fetch();
            if ($row && !empty($row['attachment_path'])) {
                $attachmentToDelete = $row['attachment_path'];
            }

            $stmt = $pdo->prepare("DELETE FROM rasa_contact_messages WHERE id = :id OR tracking_code = :tc");
            $stmt->execute([':id' => $id, ':tc' => $id]);
        } catch (Throwable $e) {
            // ignore
        }
    }

    // JSON file update
    if (file_exists(MESSAGES_FILE)) {
        $raw = file_get_contents(MESSAGES_FILE);
        $all = json_decode($raw, true) ?: [];
        $newAll = [];
        foreach ($all as $m) {
            if ($m['id'] == $id || $m['trackingCode'] == $id) {
                if (!empty($m['attachment']['url'])) {
                    $attachmentToDelete = $m['attachment']['url'];
                }
            } else {
                $newAll[] = $m;
            }
        }
        @file_put_contents(MESSAGES_FILE, json_encode($newAll, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT), LOCK_EX);
    }

    // If attachment exists, delete physical file safely
    if ($attachmentToDelete) {
        $filename = basename($attachmentToDelete);
        $fullPath = UPLOADS_DIR . '/' . $filename;
        if (file_exists($fullPath) && is_file($fullPath)) {
            @unlink($fullPath);
        }
    }

    return true;
}
