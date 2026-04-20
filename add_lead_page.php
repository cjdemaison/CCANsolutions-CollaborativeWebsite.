<?php
declare(strict_types=1);

require __DIR__ . '/require_login.php';
?>
<!DOCTYPE html>
<html>
<head>
  <title>Acutec ATS - Add Lead</title>
  <link rel="stylesheet" href="style.css">
  <script src="script.js?v=4" defer></script>
  <style>
    .formWrap{max-width:980px}
    .grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}
    .grid .full{grid-column:1 / -1}
    label{display:block;font-weight:800;margin:0 0 6px}
    input,select,textarea{width:100%;box-sizing:border-box}
    .row{margin-bottom:12px}
    @media (max-width:900px){.grid{grid-template-columns:1fr}}
  </style>
</head>

<body>

  <!-- TOP BAR -->
  <div id="topBar">
    <div class="title">Add Lead</div>
    <button id="logoutBtn" onclick="window.location='/logout.php'">Logout</button>
  </div>

  <!-- SIDE NAV -->
  <div id="sideNav">
    <a href="home.php">Home</a>
    <a href="recruiting.php">Talent Search</a>
    <a href="add_lead_page.php" class="active">Add Lead</a>
    <a href="about.php">About</a>
    <a href="contact.php">Contact</a>
  </div>

  <!-- MAIN -->
  <div id="main">
    <h1>Add Lead</h1>

    <div class="formWrap">
      <div class="grid" id="leadForm">

        <div class="row">
          <label>First name</label>
          <input id="first_name" type="text" placeholder="First name">
        </div>

        <div class="row">
          <label>Last name</label>
          <input id="last_name" type="text" placeholder="Last name">
        </div>

        <div class="row">
          <label>Phone</label>
          <input id="phone" type="text" placeholder="Phone">
        </div>

        <div class="row">
          <label>Email</label>
          <input id="email" type="email" placeholder="Email">
        </div>

        <div class="row">
          <label>Location</label>
          <input id="location" type="text" placeholder="City, State">
        </div>

        <div class="row">
          <label>Follow-up</label>
          <input id="follow_up" type="date">
        </div>

        <div class="row">
          <label>Status</label>
          <select id="status">
            <option>New</option>
            <option>Contacted</option>
            <option>Interviewing</option>
            <option>Offered</option>
            <option>Hired</option>
            <option>Closed</option>
          </select>
        </div>

        <div class="row">
          <label>Bucket</label>
          <select id="bucket">
            <option>New Lead</option>
            <option>Machinist</option>
            <option>Student</option>
            <option>Engineer</option>
            <option>Other</option>
          </select>
        </div>

        <div class="row full">
          <label>Source</label>
          <input id="source" type="text" placeholder="Indeed, LinkedIn, referral, etc.">
        </div>

        <div class="row full">
          <label>Notes</label>
          <textarea id="notes" rows="6" placeholder="Notes..."></textarea>
        </div>

        <div class="row full" style="display:flex; gap:10px; align-items:center;">
          <button class="btn" id="saveBtn">Save Lead</button>
          <button class="btn" type="button" onclick="window.location='/recruiting.php'">Cancel</button>
          <div id="msg" style="font-weight:800;"></div>
        </div>

      </div>
    </div>
  </div>

<script>
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("saveBtn");
  const msg = document.getElementById("msg");

  btn.addEventListener("click", async (e) => {
    e.preventDefault();
    msg.textContent = "Saving...";

    const payload = {
      first_name: document.getElementById("first_name").value.trim(),
      last_name: document.getElementById("last_name").value.trim(),
      phone: document.getElementById("phone").value.trim(),
      email: document.getElementById("email").value.trim(),
      location: document.getElementById("location").value.trim(),
      follow_up: document.getElementById("follow_up").value,
      status: document.getElementById("status").value,
      bucket: document.getElementById("bucket").value,
      source: document.getElementById("source").value.trim(),
      notes: document.getElementById("notes").value.trim()
    };

    try{
      const res = await fetch("/api/create_lead.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (data.status !== "success") {
        msg.textContent = "Save failed";
        alert("Save failed: " + (data.message || "Unknown error"));
        return;
      }

      msg.textContent = "Saved";
      window.location = "/candidate_profile.php?id=" + data.id;

    }catch(err){
      msg.textContent = "Save failed";
      alert("Save failed: " + err.message);
    }
  });
});
</script>

</body>
</html>
