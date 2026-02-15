<?php
require_once __DIR__ . "/db.php";

$raw = file_get_contents("php://input");
$data = json_decode($raw, true);
if (!$data) { $data = $_POST; }

$id = $data["id"] ?? null;

if (!$id) {
  echo json_encode(["status" => "error", "message" => "Missing id"]);
  exit;
}

try {
  $stmt = $pdo->prepare("DELETE FROM leads WHERE id = :id");
  $stmt->execute([":id" => $id]);

  echo json_encode(["status" => "success"]);
} catch (Exception $e) {
  echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
