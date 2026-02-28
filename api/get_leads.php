<?php
declare(strict_types=1);

require_once __DIR__ . '/../require_login.php';
header('Content-Type: application/json; charset=utf-8');

require_once __DIR__ . '/../db.php';

try {
    $stmt = $pdo->prepare("SELECT * FROM leads ORDER BY created_at DESC");
    $stmt->execute();
    $leads = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "status" => "success",
        "leads" => $leads
    ]);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage()
    ]);
}
