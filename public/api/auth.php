<?php
/**
 * Authentication Handler for Rasa Qateh Gostar Mehr Admin CMS
 */
require_once __DIR__ . '/db.php';

// Admin Accounts
$ADMIN_ACCOUNTS = [
    'aliziaee1382' => [
        'password' => 'ali13821382ali',
        'displayName' => 'مدیریت کارخانه (علی ضیائی)',
        'role' => 'superadmin'
    ],
    'abotalebirasagostar' => [
        'password' => 'rasaabotalebi2020rasa',
        'displayName' => 'مدیر شرکت (آقای ابوطالبی)',
        'role' => 'superadmin'
    ]
];
define('JWT_SECRET_KEY', 'RasaQateh_SecureSecretKey_2026_cPanel!#%98');

/**
 * Generate a signed Bearer token
 */
function generateToken($username) {
    $header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);
    $payload = json_encode([
        'sub' => $username,
        'role' => 'admin',
        'iat' => time(),
        'exp' => time() + (86400 * 7) // 7 days expiration
    ]);

    $base64UrlHeader = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($header));
    $base64UrlPayload = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($payload));
    $signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, JWT_SECRET_KEY, true);
    $base64UrlSignature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));

    return $base64UrlHeader . "." . $base64UrlPayload . "." . $base64UrlSignature;
}

/**
 * Validate incoming Bearer token
 */
function validateToken($jwt) {
    if (!$jwt) return false;
    $tokenParts = explode('.', $jwt);
    if (count($tokenParts) !== 3) return false;

    $header = base64_decode(str_replace(['-', '_'], ['+', '/'], $tokenParts[0]));
    $payload = base64_decode(str_replace(['-', '_'], ['+', '/'], $tokenParts[1]));
    $signatureProvided = $tokenParts[2];

    $base64UrlHeader = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($header));
    $base64UrlPayload = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($payload));
    $signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, JWT_SECRET_KEY, true);
    $base64UrlSignature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));

    if (!hash_equals($base64UrlSignature, $signatureProvided)) {
        return false;
    }

    $payloadData = json_decode($payload, true);
    if (!$payloadData || !isset($payloadData['exp']) || $payloadData['exp'] < time()) {
        return false;
    }

    return $payloadData;
}

/**
 * Check Authorization header from request
 */
function getBearerTokenFromHeader() {
    $headers = null;
    if (isset($_SERVER['Authorization'])) {
        $headers = trim($_SERVER["Authorization"]);
    } else if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
        $headers = trim($_SERVER["HTTP_AUTHORIZATION"]);
    } elseif (function_exists('apache_request_headers')) {
        $requestHeaders = apache_request_headers();
        $requestHeaders = array_combine(array_map('ucwords', array_keys($requestHeaders)), array_values($requestHeaders));
        if (isset($requestHeaders['Authorization'])) {
            $headers = trim($requestHeaders['Authorization']);
        }
    }

    if (!empty($headers)) {
        if (preg_match('/Bearer\s(\S+)/i', $headers, $matches)) {
            return $matches[1];
        }
    }
    return null;
}

/**
 * Require valid admin authentication middleware
 */
function requireAdminAuth() {
    $token = getBearerTokenFromHeader();
    if (!$token) {
        http_response_code(401);
        echo json_encode([
            'success' => false,
            'message' => 'توکن امنیتی ارسال نشده است. لطفاً وارد حساب مدیریت شوید.'
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    $payload = validateToken($token);
    if (!$payload) {
        http_response_code(401);
        echo json_encode([
            'success' => false,
            'message' => 'توکن نامعتبر یا منقضی شده است. لطفاً مجدداً لاگین کنید.'
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    return $payload;
}

// -------------------------------------------------------------
// Direct Endpoint Execution for /api/auth.php
// -------------------------------------------------------------
if (basename($_SERVER['SCRIPT_FILENAME']) === 'auth.php') {
    $method = $_SERVER['REQUEST_METHOD'];

    if ($method === 'POST') {
        $input = json_decode(file_get_contents('php://input'), true);
        $username = isset($input['username']) ? trim($input['username']) : '';
        $password = isset($input['password']) ? trim($input['password']) : '';

        if (isset($ADMIN_ACCOUNTS[$username]) && $ADMIN_ACCOUNTS[$username]['password'] === $password) {
            $token = generateToken($username);
            $account = $ADMIN_ACCOUNTS[$username];
            echo json_encode([
                'success' => true,
                'message' => 'ورود با موفقیت انجام شد.',
                'token' => $token,
                'user' => [
                    'username' => $username,
                    'displayName' => $account['displayName'],
                    'role' => $account['role']
                ]
            ], JSON_UNESCAPED_UNICODE);
            exit;
        } else {
            http_response_code(401);
            echo json_encode([
                'success' => false,
                'message' => 'نام کاربری یا کلمه عبور وارد شده اشتباه است.'
            ], JSON_UNESCAPED_UNICODE);
            exit;
        }
    }

    if ($method === 'GET') {
        $token = getBearerTokenFromHeader();
        $payload = validateToken($token);
        if ($payload) {
            echo json_encode([
                'success' => true,
                'authenticated' => true,
                'user' => [
                    'username' => $payload['sub'],
                    'role' => $payload['role'] ?? 'admin'
                ]
            ], JSON_UNESCAPED_UNICODE);
        } else {
            http_response_code(401);
            echo json_encode([
                'success' => false,
                'authenticated' => false,
                'message' => 'نشست منقضی شده است.'
            ], JSON_UNESCAPED_UNICODE);
        }
        exit;
    }
}
