<?php
declare(strict_types=1);

require_once __DIR__ . '/../require_login.php';
header('Content-Type: application/json; charset=utf-8');

require_once __DIR__ . '/../db.php';

try {
    $search = isset($_GET['search']) ? trim($_GET['search']) : '';

    if ($search !== '') {
        $sql = "
            SELECT * FROM leads
            WHERE 
                first_name LIKE :search OR
                last_name LIKE :search OR
                phone LIKE :search OR
                email LIKE :search OR
                location LIKE :search OR
                status LIKE :search OR
                bucket LIKE :search OR
                notes LIKE :search
            ORDER BY created_at DESC
        ";

        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            ':search' => "%$search%"
        ]);
    } else {
        $stmt = $pdo->prepare("SELECT * FROM leads ORDER BY created_at DESC");
        $stmt->execute();
    }

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
