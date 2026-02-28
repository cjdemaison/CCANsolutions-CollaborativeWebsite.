<?php
declare(strict_types=1);

$dbHost = 'localhost';
$dbPort = 3306;
$dbName = 'u564515980_ats_prod';
$dbUser = 'u564515980_ats_prod';
$dbPass = 'AcutecATS!2026'; // this is your MySQL user password (NOT your website login)

try {
    $dsn = "mysql:host={$dbHost};port={$dbPort};dbname={$dbName};charset=utf8mb4";
    $pdo = new PDO($dsn, $dbUser, $dbPass, [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    exit("Database connection failed: " . $e->getMessage());
}
