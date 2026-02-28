<?php
declare(strict_types=1);

session_start();

$loggedIn = isset($_SESSION['user_id']) && (int)$_SESSION['user_id'] > 0;

if (!$loggedIn) {
    $uri = $_SERVER['REQUEST_URI'] ?? '';
    $isApi = (strpos($uri, '/api/') === 0);

    // API calls should return JSON, not redirect
    if ($isApi) {
        header('Content-Type: application/json; charset=utf-8');
        http_response_code(401);
        echo json_encode([
            "status" => "error",
            "message" => "Not logged in"
        ]);
        exit;
    }

    // Normal page request: redirect to the real login page
    header("Location: /login.php");
    exit;
}
