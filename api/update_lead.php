<?php
require_once __DIR__ . "/db.php";

$raw = file_get_contents("php://input");
$data = json_decode($raw, true);
if (!$data) { $data = $_POST; }

$id       = $data["id"] ?? null;
$status   = $data["status"] ?? null;
$bucket   = $data["bucket"] ?? null;
$notes    = $data["notes"] ?? null;
$followUp = $data["follow_up"] ?? null;
$location = $data["location"] ?? null;

if (!$id) {
  echo json_encode(["status" => "error", "message" => "Missing id"]);
  exit;
}

// build dynamic update so you can send only what changed
$fields = [];
$params = [":id" => $id];

if ($status !== null)   { $fields[] = "status = :status"; $params[":status"] = $status; }
if ($bucket !== null)   { $fields[] = "bucket = :bucket"; $params[":bucket"] = $bucket; }
if ($notes !== null)    { $fields[] = "notes = :notes"; $params[":notes"] = $notes; }
if ($followUp !== null) { $fields[] = "follow_up = :follow_up"; $params[":follow_up"] = ($followUp === "" ? null : $followUp); }
if ($location !== null) { $fields[] = "location = :location"; $params[":location"] = $location; }

if (count($fields) === 0) {
  echo json_encode(["status" => "error", "message" => "Nothing to update"]);
  exit;
}

try {
  $sql = "UPDATE leads SET " . implode(", ", $fields) . " WHERE id = :id";
  $stmt = $pdo->prepare($sql);
  $stmt->execute($params);

  echo json_encode(["status" => "success"]);
} catch (Exception $e) {
  echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
