<?php
// /api/followups.php
declare(strict_types=1);

header("Content-Type: application/json; charset=utf-8");
require_once __DIR__ . "/../includes/db.php";

$start = $_GET["start"] ?? "";
$end   = $_GET["end"] ?? "";

if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $start) || !preg_match('/^\d{4}-\d{2}-\d{2}$/', $end)) {
  http_response_code(400);
  echo json_encode(["error" => "Invalid date range. Use YYYY-MM-DD."]);
  exit;
}

$sql = "
  SELECT id, name, phone, email, location, follow_up, status, bucket, notes
  FROM leads
  WHERE follow_up IS NOT NULL
    AND follow_up BETWEEN :start AND :end
  ORDER BY follow_up ASC, id DESC
";

$stmt = $pdo->prepare($sql);
$stmt->execute([":start" => $start, ":end" => $end]);
$rows = $stmt->fetchAll();

echo json_encode($rows);
