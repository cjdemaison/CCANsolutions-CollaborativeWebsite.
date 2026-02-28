<?php require __DIR__ . '/require_login.php'; ?>
<!DOCTYPE html>
<html>
<head>
  <title>Acutec ATS - Talent Search</title>
  <link rel="stylesheet" href="style.css">
  <script src="script.js?v=4" defer></script>
</head>

<body>

  <!-- TOP BAR -->
  <div id="topBar">
    <div class="title">Talent Search</div>
    <button id="logoutBtn" onclick="window.location='/logout.php'">Logout</button>
  </div>

  <!-- SIDE NAV -->
  <div id="sideNav">
    <a href="home.php">Home</a>
    <a href="recruiting.php" class="active">Talent Search</a>
    <a href="add_lead_page.php">Add Lead</a>
    <a href="about.php">About</a>
    <a href="contact.php">Contact</a>
  </div>

  <!-- MAIN -->
  <div id="main">
    <h1>Talent Search</h1>

    <table>
      <thead>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Phone</th>
          <th>Email</th>
          <th>Location</th>
          <th>Follow-Up</th>
          <th>Status</th>
          <th>Bucket</th>
          <th>Notes</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody id="recruitTableBody"></tbody>
    </table>

  </div>

</body>
</html>
