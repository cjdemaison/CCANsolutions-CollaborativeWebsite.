<?php
session_start();
require 'db.php';

$error = '';
$field_error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $email = trim($_POST['email']);
    $password = $_POST['password'];

    if ($email === '' || $password === '') {

        $field_error = "Please fill in both email and password.";

    } else {

        $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
        $stmt->execute([$email]);

        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user) {

            if (password_verify($password, $user['password_hash'])) {

                $_SESSION['user_id'] = $user['id'];
                $_SESSION['full_name'] = $user['full_name'];

                header("Location: home.php");
                exit;

            } else {

                $error = "Incorrect email or password. Please try again.";

            }

        } else {

            $error = "Incorrect email or password. Please try again.";

        }
    }
}
?>
<!DOCTYPE html>
<html>
<head>
<title>Acutec ATS Login</title>
<link rel="stylesheet" href="style.css">
</head>

<body style="background:#f4f6f5; font-family:Arial;">

<div style="width:400px;margin:100px auto;background:white;padding:30px;border-radius:10px;box-shadow:0 0 10px #ccc;">

<h1>Welcome</h1>
<p>Sign in to access the ATS</p>

<?php if ($field_error): ?>
<div style="color:red;"><?php echo $field_error; ?></div>
<?php endif; ?>

<?php if ($error): ?>
<div style="color:red;"><?php echo $error; ?></div>
<?php endif; ?>

<form method="POST">

Email<br>
<input type="email" name="email" style="width:100%;padding:10px;"><br><br>

Password<br>
<input type="password" name="password" style="width:100%;padding:10px;"><br><br>

<button type="submit" style="width:100%;padding:12px;">Login</button>

</form>

</div>

</body>
</html>
