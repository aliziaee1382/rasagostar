<?php
/**
 * CMS Content Management API for Rasa Qateh Gostar Mehr
 * Provides public GET endpoints and authenticated POST/PUT endpoints for cPanel
 */
require_once __DIR__ . '/db.php';
require_once __DIR__ . '/auth.php';

$method = $_SERVER['REQUEST_METHOD'];
$action = isset($_GET['action']) ? trim($_GET['action']) : '';

// -------------------------------------------------------------
// GET: Retrieve all content or specific section
// -------------------------------------------------------------
if ($method === 'GET') {
    if ($action === 'export') {
        // Authenticated export backup
        requireAdminAuth();
        $content = loadAllContent();
        header('Content-Disposition: attachment; filename="rasa_cms_backup_' . date('Y-m-d_His') . '.json"');
        echo json_encode($content, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
        exit;
    }

    $content = loadAllContent();
    
    // If specific section requested (e.g., ?section=companyInfo)
    $section = isset($_GET['section']) ? trim($_GET['section']) : '';
    if (!empty($section)) {
        if (isset($content[$section])) {
            echo json_encode([
                'success' => true,
                'section' => $section,
                'data' => $content[$section]
            ], JSON_UNESCAPED_UNICODE);
        } else {
            echo json_encode([
                'success' => false,
                'message' => 'بخش مورد نظر یافت نشد.'
            ], JSON_UNESCAPED_UNICODE);
        }
        exit;
    }

    echo json_encode([
        'success' => true,
        'data' => $content,
        'timestamp' => time()
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// -------------------------------------------------------------
// POST / PUT: Update, Save, Reset or Import Content (Requires Admin Auth)
// -------------------------------------------------------------
if ($method === 'POST' || $method === 'PUT') {
    // 1. Enforce Admin Authentication
    $adminUser = requireAdminAuth();

    // 2. Handle Reset to Defaults
    if ($action === 'reset') {
        $defaultFile = DATA_DIR . '/default_backup.json';
        if (file_exists($defaultFile)) {
            $defaultData = json_decode(file_get_contents($defaultFile), true);
            if ($defaultData && is_array($defaultData)) {
                saveAllContent($defaultData);
                echo json_encode([
                    'success' => true,
                    'message' => 'اطلاعات با موفقیت به مقادیر پیش‌فرض کاتالوگ کارخانه بازگردانی شد.',
                    'data' => $defaultData
                ], JSON_UNESCAPED_UNICODE);
                exit;
            }
        }
        
        // If no default backup file, wipe file and allow client to push defaults
        @unlink(DATA_FILE);
        echo json_encode([
            'success' => true,
            'message' => 'داده‌ها بازنشانی شدند.'
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    // 3. Handle Content Save/Update
    $rawInput = file_get_contents('php://input');
    $inputData = json_decode($rawInput, true);

    if (!is_array($inputData)) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'فرمت داده‌های ارسالی نامعتبر است (JSON مورد نیاز است).'
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    // If payload is wrapped in a "data" property
    $payloadToSave = isset($inputData['data']) && is_array($inputData['data']) ? $inputData['data'] : $inputData;

    // Load existing to merge if partial update
    $existing = loadAllContent();
    $merged = array_merge($existing, $payloadToSave);

    $success = saveAllContent($merged);

    if ($success) {
        echo json_encode([
            'success' => true,
            'message' => 'تغییرات با موفقیت در سرور و پایگاه‌داده ذخیره شد و به صورت زنده برای همه بازدیدکنندگان اعمال گردید.',
            'updated_at' => date('Y-m-d H:i:s'),
            'updated_by' => $adminUser['sub']
        ], JSON_UNESCAPED_UNICODE);
    } else {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'خطا در ذخیره‌سازی داده‌ها روی سرور.'
        ], JSON_UNESCAPED_UNICODE);
    }
    exit;
}

http_response_code(405);
echo json_encode([
    'success' => false,
    'message' => 'متد ارسالی مجاز نیست.'
], JSON_UNESCAPED_UNICODE);
