<?php
// /api/todos.php
declare(strict_types=1);

header("Content-Type: application/json; charset=utf-8");
require_once __DIR__ . "/../includes/db.php";

$method = $_SERVER["REQUEST_METHOD"];

function readJsonBody(): array {
  $raw = file_get_contents("php://input");
  $data = json_decode($raw ?: "{}", true);
  return is_array($data) ? $data : [];
}

if ($method === "GET") {
  $stmt = $pdo->query("SELECT id, task, is_done, created_at FROM todos ORDER BY id DESC");
  echo json_encode($stmt->fetchAll());
  exit;
}

if ($method === "POST") {
  $body = readJsonBody();
  $task = trim((string)($body["task"] ?? ""));
  if ($task === "") {
    http_response_code(400);
    echo json_encode(["error" => "Task is required."]);
    exit;
  }

  $stmt = $pdo->prepare("INSERT INTO todos (task) VALUES (:task)");
  $stmt->execute([":task" => $task]);

  echo json_encode(["ok" => true, "id" => (int)$pdo->lastInsertId()]);
  exit;
}

if ($method === "PATCH") {
  $body = readJsonBody();
  $id = (int)($body["id"] ?? 0);
  $is_done = isset($body["is_done"]) ? (int)((bool)$body["is_done"]) : null;

  if ($id <= 0 || $is_done === null) {
    http_response_code(400);
    echo json_encode(["error" => "id and is_done required."]);
    exit;
  }

  $stmt = $pdo->prepare("UPDATE todos SET is_done = :is_done WHERE id = :id");
  $stmt->execute([":is_done" => $is_done, ":id" => $id]);

  echo json_encode(["ok" => true]);
  exit;
}

if ($method === "DELETE") {
  $body = readJsonBody();
  $id = (int)($body["id"] ?? 0);

  if ($id <= 0) {
    http_response_code(400);
    echo json_encode(["error" => "id required."]);
    exit;
  }

  $stmt = $pdo->prepare("DELETE FROM todos WHERE id = :id");
  $stmt->execute([":id" => $id]);

  echo json_encode(["ok" => true]);
  exit;
}

http_response_code(405);
echo json_encode(["error" => "Method not allowed."]);
