<?php
/**
 * File & Asset Upload API for Rasa Qateh Gostar Mehr CMS
 * Handles product images, hero slider banners, CAD drawings, and documents
 */
require_once __DIR__ . '/db.php';
require_once __DIR__ . '/auth.php';

ensureUploadsDirExists();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'متد درخواست باید POST باشد.'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// Check if file was provided
if (!isset($_FILES['file']) || $_FILES['file']['error'] !== UPLOAD_ERR_OK) {
    $errorMsg = 'هیچ فایلی برای آپلود انتخاب نشده یا خطایی در ارسال رخ داده است.';
    if (isset($_FILES['file']['error'])) {
        switch ($_FILES['file']['error']) {
            case UPLOAD_ERR_INI_SIZE:
            case UPLOAD_ERR_FORM_SIZE:
                $errorMsg = 'حجم فایل بیشتر از سقف مجاز سرور است (حداکثر ۲۰ مگابایت).';
                break;
            case UPLOAD_ERR_PARTIAL:
                $errorMsg = 'فایل به صورت ناقص ارسال شده است.';
                break;
            case UPLOAD_ERR_NO_FILE:
                $errorMsg = 'فایلی ارسال نشده است.';
                break;
        }
    }
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => $errorMsg
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

$file = $_FILES['file'];
$fileSize = $file['size'];
$originalName = $file['name'];
$ext = strtolower(pathinfo($originalName, PATHINFO_EXTENSION));

// Maximum file size: 25MB
$maxSize = 25 * 1024 * 1024;
if ($fileSize > $maxSize) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'حجم فایل بیش از حد مجاز (۲۵ مگابایت) است.'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// Allowed extensions
$allowedExtensions = [
    // Images
    'jpg', 'jpeg', 'png', 'webp', 'gif', 'svg',
    // CAD & 3D Engineering
    'dwg', 'dxf', 'stp', 'step', 'igs', 'iges', 'sldprt', 'sldasm', 'catpart', 'catproduct',
    // Documents & Archives
    'pdf', 'zip', 'rar', '7z', 'doc', 'docx', 'xls', 'xlsx'
];

if (!in_array($ext, $allowedExtensions)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'فرمت فایل مجاز نمی‌باشد. فرمت‌های مجاز: تصاویر، نقشه‌های CAD (DWG/DXF/STP)، PDF و ZIP.'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// Generate unique safe file name
$uniquePrefix = time() . '_' . substr(md5(uniqid(rand(), true)), 0, 8);
$cleanBasename = preg_replace('/[^a-zA-Z0-9_-]/', '_', pathinfo($originalName, PATHINFO_FILENAME));
$newFileName = $uniquePrefix . '_' . $cleanBasename . '.' . $ext;
$targetPath = UPLOADS_DIR . '/' . $newFileName;

if (move_uploaded_file($file['tmp_name'], $targetPath)) {
    // Generate public web URL
    $isImage = in_array($ext, ['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg']);
    $url = '/api/uploads/' . $newFileName;

    echo json_encode([
        'success' => true,
        'message' => 'فایل با موفقیت در سرور ذخیره شد.',
        'url' => $url,
        'filename' => $newFileName,
        'originalName' => $originalName,
        'extension' => $ext,
        'size' => $fileSize,
        'isImage' => $isImage,
        'uploadedAt' => date('Y-m-d H:i:s')
    ], JSON_UNESCAPED_UNICODE);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'خطای سرور در انتقال فایل به پوشه uploads.'
    ], JSON_UNESCAPED_UNICODE);
}
