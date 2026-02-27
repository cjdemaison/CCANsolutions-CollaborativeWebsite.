<?php
//  error display
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

session_start();
require 'dbconnection.php';

$error = '';           //  error message
$field_error = '';     //  error for empty fields

if (isset($_GET['email']) && isset($_GET['password'])) {
    $email    = trim($_GET['email']);
    $password = $_GET['password'];

    // Check if fields are empty
    if ($email === '' || $password === '') {
        $field_error = "Please fill in both email and password.";
    } else {
        // Try to find the user
        $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
        $stmt->execute([$email]);
        $user = $stmt->fetch();

        if ($user && password_verify($password, $user['password_hash'])) {
            // Success
            $_SESSION['user_id']    = $user['id'];
            $_SESSION['full_name']  = $user['full_name'];
            $_SESSION['role']       = $user['role'];
            $_SESSION['username']   = $user['username'];

            header("Location: home.html");
            exit;
        } else {
            // Wrong credentials
            $error = "Incorrect email or password. Please try again.";
        }
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Acutec ATS - Login</title>
    <link rel="stylesheet" href="style.css">
    <style>
        .error-message {
            color: red;
            font-weight: bold;
            text-align: center;
            margin: 10px 0;
            padding: 8px;
            background-color: #ffebee;
            border: 1px solid #f44336;
            border-radius: 4px;
        }
    </style>
</head>
<body style="margin:0; padding:0; background:#f4f6f5;">

    <div id="topBar" style="justify-content:center;">
        <div class="title">Acutec ATS Login</div>
    </div>

    <div style="width:350px; margin:70px auto; background:white; padding:25px; box-shadow:0 0 6px #aaa; border-radius:6px;">
        <h2 style="text-align:center;">Welcome</h2>
        <p style="text-align:center; color:#666;">Sign in to access the ATS</p>

        <!-- Show field empty error -->
        <?php if ($field_error): ?>
            <div class="error-message">
                <?php echo htmlspecialchars($field_error); ?>
            </div>
        <?php endif; ?>

        <!-- Show wrong credentials error -->
        <?php if ($error): ?>
            <div class="error-message">
                <?php echo htmlspecialchars($error); ?>
            </div>
        <?php endif; ?>

        <!-- Login form using GET -->
        <form method="get" action="login.php">
            <div style="margin-bottom:15px;">
                <label>Email</label>
                <input type="email" name="email" required 
                       value="<?php echo isset($_GET['email']) ? htmlspecialchars($_GET['email']) : ''; ?>" 
                       style="width:100%; padding:8px; margin-top:5px;">
            </div>

            <div style="margin-bottom:15px;">
                <label>Password</label>
                <input type="password" name="password" required 
                       style="width:100%; padding:8px; margin-top:5px;">
            </div>

            <button type="submit" style="width:100%; padding:10px; font-size:16px;">
                Login
            </button>
        </form>

        <p style="text-align:center; color:#888; margin-top:15px; font-size:0.9em;">
           
        </p>
    </div>

</body>
</html>