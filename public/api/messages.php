<?php
/**
 * Contact Messages & Quotation Requests API for Rasa Qateh Gostar Mehr
 * Supports public submission with file attachments and protected Admin management
 */
require_once __DIR__ . '/db.php';
require_once __DIR__ . '/auth.php';

$method = $_SERVER['REQUEST_METHOD'];
$action = isset($_GET['action']) ? trim($_GET['action']) : '';

// -------------------------------------------------------------
// GET: Retrieve messages list (Protected: Admin Auth Required)
// -------------------------------------------------------------
if ($method === 'GET') {
    requireAdminAuth();

    $messages = loadAllMessages();
    $unreadCount = 0;
    foreach ($messages as $m) {
        if (($m['status'] ?? 'new') === 'new') {
            $unreadCount++;
        }
    }

    echo json_encode([
        'success' => true,
        'messages' => $messages,
        'count' => count($messages),
        'unreadCount' => $unreadCount,
        'timestamp' => time()
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// -------------------------------------------------------------
// DELETE: Delete a message and attached file (Protected: Admin Auth Required)
// -------------------------------------------------------------
if ($method === 'DELETE' || ($method === 'POST' && $action === 'delete')) {
    requireAdminAuth();

    $id = isset($_GET['id']) ? trim($_GET['id']) : '';
    if (empty($id)) {
        $body = json_decode(file_get_contents('php://input'), true);
        $id = $body['id'] ?? '';
    }

    if (empty($id)) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'شناسه پیام جهت حذف مشخص نشده است.'
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    $deleted = deleteMessage($id);
    echo json_encode([
        'success' => true,
        'message' => 'پیام و فایل پیوست مربوطه با موفقیت حذف شد.'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// -------------------------------------------------------------
// PUT or POST (action=status): Update Message Status (Protected: Admin Auth Required)
// -------------------------------------------------------------
if ($method === 'PUT' || ($method === 'POST' && $action === 'status')) {
    requireAdminAuth();

    $id = isset($_GET['id']) ? trim($_GET['id']) : '';
    $rawInput = file_get_contents('php://input');
    $inputData = json_decode($rawInput, true) ?: [];

    if (empty($id)) {
        $id = $inputData['id'] ?? ($_POST['id'] ?? '');
    }

    $status = $inputData['status'] ?? ($_POST['status'] ?? '');

    if (empty($id) || empty($status)) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'شناسه پیام یا وضعیت جدید نامعتبر است.'
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    $updated = updateMessageStatus($id, $status);
    if ($updated) {
        echo json_encode([
            'success' => true,
            'message' => 'وضعیت پیام با موفقیت به روزرسانی شد.',
            'status' => $status
        ], JSON_UNESCAPED_UNICODE);
    } else {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'مقدار وضعیت نامعتبر است (باید new, read, reviewed یا approved باشد).'
        ], JSON_UNESCAPED_UNICODE);
    }
    exit;
}

// -------------------------------------------------------------
// POST: Public Submission from Contact Form
// -------------------------------------------------------------
if ($method === 'POST') {
    ensureUploadsDirExists();

    // Check if input is JSON or FormData
    $fullName = trim($_POST['fullName'] ?? '');
    $phone = trim($_POST['phone'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $companyName = trim($_POST['companyName'] ?? '');
    $serviceInterest = trim($_POST['serviceInterest'] ?? 'general');
    $subject = trim($_POST['subject'] ?? '');
    $message = trim($_POST['message'] ?? '');

    if (empty($fullName) || empty($phone) || empty($message)) {
        // Check raw JSON payload if not found in POST fields
        $raw = file_get_contents('php://input');
        $json = json_decode($raw, true);
        if ($json && is_array($json)) {
            $fullName = trim($json['fullName'] ?? $fullName);
            $phone = trim($json['phone'] ?? $phone);
            $email = trim($json['email'] ?? $email);
            $companyName = trim($json['companyName'] ?? $companyName);
            $serviceInterest = trim($json['serviceInterest'] ?? $serviceInterest);
            $subject = trim($json['subject'] ?? $subject);
            $message = trim($json['message'] ?? $message);
        }
    }

    // Required field validation
    if (empty($fullName)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'لطفاً نام و نام خانوادگی خود را وارد کنید.'], JSON_UNESCAPED_UNICODE);
        exit;
    }

    if (empty($phone)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'لطفاً شماره تماس معتبر وارد کنید.'], JSON_UNESCAPED_UNICODE);
        exit;
    }

    if (empty($message)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'لطفاً متن پیام یا درخواست استعلام خود را بنویسید.'], JSON_UNESCAPED_UNICODE);
        exit;
    }

    if (empty($subject)) {
        $subject = 'درخواست استعلام ساخت قطعه / قالب';
    }

    // Handle File Upload if provided
    $attachment = null;
    $fileField = null;

    if (isset($_FILES['attachment']) && $_FILES['attachment']['error'] === UPLOAD_ERR_OK) {
        $fileField = $_FILES['attachment'];
    } elseif (isset($_FILES['file']) && $_FILES['file']['error'] === UPLOAD_ERR_OK) {
        $fileField = $_FILES['file'];
    }

    if ($fileField) {
        $origName = $fileField['name'];
        $fileSize = $fileField['size'];
        $tmpPath = $fileField['tmp_name'];
        
        // 30MB limit
        if ($fileSize > 30 * 1024 * 1024) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'حجم فایل پیوست نمی‌تواند بیشتر از ۳۰ مگابایت باشد.'], JSON_UNESCAPED_UNICODE);
            exit;
        }

        $fileExt = strtolower(pathinfo($origName, PATHINFO_EXTENSION));
        $allowedExts = ['dwg', 'dxf', 'stp', 'step', 'pdf', 'jpg', 'jpeg', 'png', 'zip', 'rar', 'igs', 'iges'];
        
        if (!in_array($fileExt, $allowedExts, true)) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'فرمت فایل مجاز نیست. لطفاً از فرمت‌های مجاز مهندسی و تصویری (DWG, DXF, STP, PDF, JPG, PNG, ZIP) استفاده کنید.'], JSON_UNESCAPED_UNICODE);
            exit;
        }

        // Sanitize base name
        $cleanBaseName = preg_replace('/[^a-zA-Z0-9_\-\.]/', '_', pathinfo($origName, PATHINFO_FILENAME));
        $storedFilename = 'rasa_' . time() . '_' . rand(1000, 9999) . '.' . $fileExt;
        $targetPath = UPLOADS_DIR . '/' . $storedFilename;

        if (move_uploaded_file($tmpPath, $targetPath)) {
            $attachment = [
                'name' => $origName,
                'url' => UPLOADS_URL . '/' . $storedFilename,
                'size' => $fileSize,
                'fileType' => $fileExt
            ];
        }
    }

    // Generate unique tracking code
    $trackingCode = 'MSG-' . rand(100000, 999999);

    $msgData = [
        'trackingCode' => $trackingCode,
        'fullName' => $fullName,
        'phone' => $phone,
        'email' => $email,
        'companyName' => $companyName,
        'serviceInterest' => $serviceInterest,
        'subject' => $subject,
        'message' => $message,
        'attachment' => $attachment,
        'status' => 'new',
        'createdAt' => date('Y-m-d H:i:s')
    ];

    $saved = insertMessage($msgData);

    echo json_encode([
        'success' => true,
        'message' => 'پیام و استعلام شما با موفقیت ثبت گردید. کارشناسان ما به زودی با شما تماس خواهند گرفت.',
        'trackingCode' => $trackingCode,
        'data' => $saved
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

http_response_code(405);
echo json_encode(['success' => false, 'message' => 'متد درخواست مجاز نیست.'], JSON_UNESCAPED_UNICODE);
