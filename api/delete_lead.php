<?php
declare(strict_types=1);

require_once __DIR__ . '/../require_login.php';
header('Content-Type: application/json; charset=utf-8');
require_once __DIR__ . '/../db.php';

$input = json_decode(file_get_contents('php://input'), true);
if (!is_array($input)) $input = [];

$id = isset($input['id']) ? (int)$input['id'] : 0;
if ($id <= 0) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Missing id"]);
    exit;
}

try {
    $stmt = $pdo->prepare("DELETE FROM leads WHERE id = ?");
    $stmt->execute([$id]);

    echo json_encode(["status" => "success"]);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
