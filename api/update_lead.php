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

$allowed = ['first_name','last_name','email','phone','location','source','notes','status','bucket','follow_up'];
$fields = [];
$params = [];

foreach ($allowed as $key) {
    if (array_key_exists($key, $input)) {
        $fields[] = "$key = ?";
        $val = $input[$key];

        if ($key === 'follow_up') {
            $val = trim((string)$val);
            $val = ($val === '') ? null : $val;
        } else {
            $val = is_null($val) ? null : trim((string)$val);
        }

        $params[] = $val;
    }
}

if (!$fields) {
    echo json_encode(["status" => "success"]);
    exit;
}

$params[] = $id;

try {
    $sql = "UPDATE leads SET " . implode(", ", $fields) . " WHERE id = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);

    echo json_encode(["status" => "success"]);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
