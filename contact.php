<?php
require __DIR__ . '/require_login.php';
?>
<!DOCTYPE html>
<html>
<head>
    <title>Contact - Acutec ATS</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>

    <!-- TOP BAR -->
    <div id="topBar">
        <div class="title">Contact</div>
        <button id="logoutBtn" onclick="window.location='/logout.php'">Logout</button>
    </div>

    <!-- SIDE NAV -->
    <div id="sideNav">
        <a href="home.php">Home</a>
        <a href="recruiting.php">Talent Search</a>
        <a href="add_lead_page.php">Add Lead</a>
        <a href="about.php">About</a>
        <a href="contact.php" class="active">Contact</a>
    </div>

    <!-- MAIN -->
    <div id="main">

        <h1>Contact Information</h1>

        <div class="sectionBox">

            <p>If you need help with the ATS or have questions, you can keep internal contact info here.</p>

            <h3>Recruiting Support</h3>
            <p>
                Recruiter: <strong>Cameron</strong><br>
                Email: <a href="mailto:CDeMaison@acutecprecision.com" class="link">CDeMaison@acutecprecision.com</a><br>
                Phone: <a href="tel:8148535987" class="link">814-853-5987</a>
            </p>

            <h3>HR Department</h3>
            <p>Email: <a class="link" href="mailto:hr@acutecprecision.com">hr@acutecprecision.com</a></p>

            <h3>General Notes</h3>
            <p>
                This page can be customized to show real HR contacts, IT info, or system instructions.
            </p>

        </div>

    </div>

</body>
</html>
