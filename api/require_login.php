<?php
declare(strict_types=1);

session_start();

$loggedIn = isset($_SESSION['user_id']) && (int)$_SESSION['user_id'] > 0;

if (!$loggedIn) {
    $scriptName = $_SERVER['SCRIPT_NAME'] ?? '';
    $isApi = strpos($scriptName, '/api/') !== false;

    if ($isApi) {
        header('Content-Type: application/json; charset=utf-8');
        http_response_code(401);
        echo json_encode([
            'status' => 'error',
            'message' => 'Not logged in'
        ]);
        exit;
    }

    $basePath = rtrim(str_replace('\\', '/', dirname($scriptName)), '/');
    $loginPath = ($basePath === '' || $basePath === '.') ? '/login.php' : $basePath . '/login.php';

    header('Location: ' . $loginPath);
    exit;
}
