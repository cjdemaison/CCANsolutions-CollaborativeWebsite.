<?php require __DIR__ . '/require_login.php'; ?>
<!DOCTYPE html>
<html>
<head>
    <title>About - Acutec ATS</title>
    <link rel="stylesheet" href="style.css">
    <script src="script.js" defer></script>
</head>

<body>

    <!-- TOP BAR -->
    <div id="topBar">
        <div class="title">About This ATS</div>
        <button id="logoutBtn" onclick="window.location='login.php'">Logout</button>
    </div>

    <!-- SIDE NAV -->
    <div id="sideNav">
        <a href="home.php">Home</a>
        <a href="recruiting.php">Talent Search</a>
        <a href="add_lead_page.php">Add Lead</a>
        <a href="about.php">About</a>
        <a href="contact.php">Contact</a>
    </div>

    <!-- MAIN -->
    <div id="main">

        <h1>Acutec ATS System</h1>

        <div class="sectionBox">
            <p>
                This internal Applicant Tracking System was created to streamline how Acutec manages recruiting leads,
                tracks follow-ups, organizes candidates, and communicates effectively during the hiring process.
            </p>

            <p>
                Features include:
            </p>
            <ul>
                <li>LocalStorage-based candidate database</li>
                <li>Editable buckets and statuses</li>
                <li>Full candidate profiles with notes and history</li>
                <li>Follow-up reminders synced to home dashboard</li>
                <li>Clickable phone and email fields</li>
                <li>Bulk actions for faster workflow</li>
                <li>Movable table columns</li>
                <li>To-Do list for daily tasks</li>
            </ul>

            <p>
                This tool was custom-built to support Acutec’s recruiting efforts and can be expanded with future features as needed.
            </p>
        </div>

    </div>

</body>
</html>
