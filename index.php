<?php
declare(strict_types=1);

session_start();

if (!empty($_SESSION['user_id'])) {
    header("Location: /home.php");
    exit;
}

header("Location: /login.php");
exit;
