<?php
declare(strict_types=1);

require __DIR__ . '/require_login.php';
require __DIR__ . '/db.php';

$id = isset($_GET['id']) ? (int)$_GET['id'] : 0;
if ($id <= 0) {
    header("Location: /recruiting.php");
    exit;
}

$stmt = $pdo->prepare("SELECT * FROM leads WHERE id = ?");
$stmt->execute([$id]);
$lead = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$lead) {
    header("Location: /recruiting.php");
    exit;
}

function h($v): string {
    return htmlspecialchars((string)$v, ENT_QUOTES, 'UTF-8');
}
?>
<!DOCTYPE html>
<html>
<head>
  <title>Acutec ATS - Lead Profile</title>
  <link rel="stylesheet" href="style.css">
  <script src="script.js?v=4" defer></script>
  <style>
    .profileGrid{display:grid;grid-template-columns:1fr 1fr;gap:14px;max-width:980px}
    .profileGrid .full{grid-column:1 / -1}
    .field label{display:block;font-weight:800;margin:0 0 6px}
    .field input,.field select,.field textarea{width:100%;box-sizing:border-box}
    .actionsRow{display:flex;gap:10px;align-items:center;margin-top:14px}
    @media (max-width: 900px){.profileGrid{grid-template-columns:1fr}}
  </style>
</head>

<body>

  <!-- TOP BAR -->
  <div id="topBar">
    <div class="title">Lead Profile</div>
    <button id="logoutBtn" onclick="window.location='/logout.php'">Logout</button>
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
    <h1><?php echo h(trim(($lead['first_name'] ?? '').' '.($lead['last_name'] ?? '')) ?: 'Lead'); ?></h1>

    <div class="profileGrid" data-lead-id="<?php echo (int)$lead['id']; ?>" id="profileRoot">

      <div class="field">
        <label>First name</label>
        <input id="first_name" type="text" value="<?php echo h($lead['first_name'] ?? ''); ?>" placeholder="First name">
      </div>

      <div class="field">
        <label>Last name</label>
        <input id="last_name" type="text" value="<?php echo h($lead['last_name'] ?? ''); ?>" placeholder="Last name">
      </div>

      <div class="field">
        <label>Phone</label>
        <input id="phone" type="text" value="<?php echo h($lead['phone'] ?? ''); ?>" placeholder="Phone">
        <div style="margin-top:6px;">
          <?php if (!empty($lead['phone'])): ?>
            <a class="link" href="tel:<?php echo preg_replace('/\D+/', '', (string)$lead['phone']); ?>">Tap to call</a>
          <?php endif; ?>
        </div>
      </div>

      <div class="field">
        <label>Email</label>
        <input id="email" type="email" value="<?php echo h($lead['email'] ?? ''); ?>" placeholder="Email">
        <div style="margin-top:6px;">
          <?php if (!empty($lead['email'])): ?>
            <a class="link" href="mailto:<?php echo h($lead['email']); ?>">Send email</a>
          <?php endif; ?>
        </div>
      </div>

      <div class="field">
        <label>Location</label>
        <input id="location" type="text" value="<?php echo h($lead['location'] ?? ''); ?>" placeholder="City, State">
      </div>

      <div class="field">
        <label>Follow-up date</label>
        <input id="follow_up" type="date" value="<?php echo h($lead['follow_up'] ?? ''); ?>">
      </div>

      <div class="field">
        <label>Status</label>
        <select id="status">
          <option <?php echo (($lead['status'] ?? '') === 'New') ? 'selected' : ''; ?>>New</option>
          <option <?php echo (($lead['status'] ?? '') === 'Contacted') ? 'selected' : ''; ?>>Contacted</option>
          <option <?php echo (($lead['status'] ?? '') === 'Interviewing') ? 'selected' : ''; ?>>Interviewing</option>
          <option <?php echo (($lead['status'] ?? '') === 'Offered') ? 'selected' : ''; ?>>Offered</option>
          <option <?php echo (($lead['status'] ?? '') === 'Hired') ? 'selected' : ''; ?>>Hired</option>
          <option <?php echo (($lead['status'] ?? '') === 'Closed') ? 'selected' : ''; ?>>Closed</option>
        </select>
      </div>

      <div class="field">
        <label>Bucket</label>
        <select id="bucket">
          <option <?php echo (($lead['bucket'] ?? '') === 'New Lead') ? 'selected' : ''; ?>>New Lead</option>
          <option <?php echo (($lead['bucket'] ?? '') === 'Machinist') ? 'selected' : ''; ?>>Machinist</option>
          <option <?php echo (($lead['bucket'] ?? '') === 'Student') ? 'selected' : ''; ?>>Student</option>
          <option <?php echo (($lead['bucket'] ?? '') === 'Engineer') ? 'selected' : ''; ?>>Engineer</option>
          <option <?php echo (($lead['bucket'] ?? '') === 'Other') ? 'selected' : ''; ?>>Other</option>
        </select>
      </div>

      <div class="field full">
        <label>Source</label>
        <input id="source" type="text" value="<?php echo h($lead['source'] ?? ''); ?>" placeholder="Indeed, LinkedIn, referral, etc.">
      </div>

      <div class="field full">
        <label>Notes</label>
        <textarea id="notes" rows="6" placeholder="Notes..."><?php echo h($lead['notes'] ?? ''); ?></textarea>
      </div>

      <div class="full">
        <div class="actionsRow">
          <button class="btn" onclick="window.location='/recruiting.php'">Back to Talent Search</button>
          <button class="danger" id="deleteBtn">Delete Lead</button>
          <div id="saveStatus" style="font-weight:800;"></div>
        </div>
      </div>
	  
	  <h3>Resume</h3>

<form action="api/upload_resume.php" method="POST" enctype="multipart/form-data">
    <input type="hidden" name="candidate_id" value="<?php echo $candidate['id']; ?>">
    <input type="file" name="resume" required>
    <button type="submit">Upload Resume</button>
</form>

<?php if (!empty($candidate['resume_path'])): ?>
    <p>
        <a href="<?php echo $candidate['resume_path']; ?>" target="_blank">
            View Resume
        </a>
    </p>

    <form action="api/upload_resume.php" method="POST" enctype="multipart/form-data">
        <input type="hidden" name="candidate_id" value="<?php echo $candidate['id']; ?>">
        <input type="file" name="resume" required>
        <button type="submit">Replace Resume</button>
    </form>
<?php endif; ?>

    </div>
  </div>

<script>
document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("profileRoot");
  if (!root) return;

  const id = parseInt(root.getAttribute("data-lead-id"), 10);
  const saveStatus = document.getElementById("saveStatus");

  const bindBlur = (fieldId, payloadKey) => {
    const el = document.getElementById(fieldId);
    if (!el) return;
    const eventName = (el.tagName === "SELECT" || el.type === "date") ? "change" : "blur";

    el.addEventListener(eventName, async () => {
      try{
        saveStatus.textContent = "Saving...";
        await saveField(id, { [payloadKey]: el.value });
        saveStatus.textContent = "Saved";
        setTimeout(() => saveStatus.textContent = "", 800);
      }catch(e){
        saveStatus.textContent = "Save failed";
      }
    });
  };

  bindBlur("first_name","first_name");
  bindBlur("last_name","last_name");
  bindBlur("phone","phone");
  bindBlur("email","email");
  bindBlur("location","location");
  bindBlur("follow_up","follow_up");
  bindBlur("status","status");
  bindBlur("bucket","bucket");
  bindBlur("source","source");
  bindBlur("notes","notes");

  const del = document.getElementById("deleteBtn");
  if (del) del.addEventListener("click", async () => {
    await deleteLead(id);
    window.location = "/recruiting.php";
  });
});
</script>

</body>
</html>
