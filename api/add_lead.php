<?php

require_once __DIR__ . '/../require_login.php';
require_once __DIR__ . '/../db.php';

$raw = file_get_contents("php://input");
$data = json_decode($raw, true);
if (!$data) { $data = $_POST; }

$fullName = trim($data["name"] ?? "");
$phone    = trim($data["phone"] ?? "");
$email    = trim($data["email"] ?? "");
$location = trim($data["location"] ?? "");

if ($fullName === "") {
  echo json_encode(["status" => "error", "message" => "Name is required"]);
  exit;
}

// split name into first/last
$parts = preg_split('/\s+/', $fullName);
$first = $parts[0] ?? "";
$last  = (count($parts) > 1) ? implode(" ", array_slice($parts, 1)) : "";

try {
  $stmt = $pdo->prepare("
    INSERT INTO leads (first_name, last_name, phone, email, location, status, bucket, created_at)
    VALUES (:first, :last, :phone, :email, :location, 'New', 'New Lead', NOW())
  ");
  $stmt->execute([
    ":first" => $first,
    ":last" => $last,
    ":phone" => $phone,
    ":email" => $email,
    ":location" => $location
  ]);

  echo json_encode(["status" => "success", "id" => $pdo->lastInsertId()]);
} catch (Exception $e) {
  echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
