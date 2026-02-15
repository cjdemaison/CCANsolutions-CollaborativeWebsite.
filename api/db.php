<?php
// api/db.php
header("Content-Type: application/json");

$host = "localhost";
$db   = "ccan";
$user = "root";
$pass = "root"; // MAMP default
$port = 8889;   // your MySQL port in MAMP

try {
  $pdo = new PDO(
    "mysql:host=$host;port=$port;dbname=$db;charset=utf8mb4",
    $user,
    $pass,
    [
      PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
      PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]
  );
} catch (Exception $e) {
  echo json_encode(["status" => "error", "message" => "DB connection failed", "detail" => $e->getMessage()]);
  exit;
}
