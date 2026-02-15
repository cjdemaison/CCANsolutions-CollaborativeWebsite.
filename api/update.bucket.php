<?php
require __DIR__ . "/db.php";
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
  http_response_code(405);
  echo json_encode(["status"=>"error","message"=>"Use POST"]);
  exit;
}

$id = intval($_POST["id"] ?? 0);
$bucket = trim($_POST["bucket"] ?? "");

$allowed = ["New Lead","Hot Lead","Contact Later","CNC","Quality","Skilled","Not Interested"];

if ($id <= 0 || !in_array($bucket, $allowed, true)) {
  http_response_code(400);
  echo json_encode(["status"=>"error","message"=>"Bad input"]);
  exit;
}

$stmt = $pdo->prepare("UPDATE leads SET bucket = :bucket WHERE id = :id");
$stmt->execute([":bucket"=>$bucket, ":id"=>$id]);

echo json_encode(["status"=>"success"]);
