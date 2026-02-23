<?php
require_once __DIR__ . "/dbconnection.php";

try {
  $stmt = $pdo->query("
    SELECT
      id,
      first_name,
      last_name,
      phone,
      email,
      location,
      follow_up,
      status,
      bucket,
      source,
      notes,
      created_at
    FROM leads
    ORDER BY created_at DESC
  ");

  $leads = $stmt->fetchAll();

  echo json_encode(["status" => "success", "leads" => $leads]);
} catch (Exception $e) {
  echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
