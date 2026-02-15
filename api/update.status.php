<?php
require __DIR__ . "/db.php";
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
  http_response_code(405);
  echo json_encode(["status"=>"error","message"=>"Use POST"]);
  exit;
}

$id = intval($_POST["id"] ?? 0);
$status = trim($_POST["status"] ?? "");

$allowed = ["New","Attempted Contact","Contacted","Interview Scheduled","Interviewed","Hired","Closed"];

if ($id <= 0 || !in_array($status, $allowed, true)) {
  http_response_code(400);
  echo json_encode(["status"=>"error","message"=>"Bad input"]);
  exit;
}

$stmt = $pdo->prepare("UPDATE leads SET status = :status WHERE id = :id");
$stmt->execute([":status"=>$status, ":id"=>$id]);

echo json_encode(["status"=>"success"]);
