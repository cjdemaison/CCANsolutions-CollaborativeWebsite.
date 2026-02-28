// script.js
// Works for BOTH recruiting.html + home.html

const API = {
  getLeads: "/api/get_leads.php",
  addLead: "/api/add_lead.php",
  deleteLead: "/api/delete_lead.php",
  updateLead: "/api/update_lead.php",
};

let allLeads = [];
let followupsByDate = {};

// -----------------------------
// BOOTSTRAP
// -----------------------------
document.addEventListener("DOMContentLoaded", () => {
  // Recruiting page
  if (document.getElementById("recruitTableBody")) {
    loadLeads();
  }

  // Home calendar
  if (document.getElementById("calendarGrid")) {
    loadLeadsForCalendar();
  }

  // Todos page (if you have it wired later)
  if (document.getElementById("todoList")) {
    loadTodos();
  }
});

// -----------------------------
// LOAD LEADS
// -----------------------------
async function loadLeads() {
  try {
    const res = await fetch(API.getLeads, { cache: "no-store" });
    const data = await res.json();

    if (data.status !== "success") {
      console.error(data);
      alert(data.message || "Failed to load leads");
      return;
    }

    allLeads = data.leads || [];
    renderLeads(allLeads);
  } catch (err) {
    console.error(err);
    alert("Failed to load leads: " + err.message);
  }
}

// -----------------------------
// RENDER LEADS TABLE
// -----------------------------
function renderLeads(leads) {
  const tbody = document.getElementById("recruitTableBody");
  if (!tbody) return;

  tbody.innerHTML = "";

  leads.forEach((lead) => {
    const fullName = `${lead.first_name || ""} ${lead.last_name || ""}`.trim();
    const status = lead.status || "New";
    const bucket = lead.bucket || "New Lead";
    const location = lead.location || "";
    const followUp = lead.follow_up || "";
    const notes = lead.notes || "";

    const tr = document.createElement("tr");

    tr.innerHTML = `
        <td><input type="checkbox" class="rowCheck" data-id="${lead.id}"></td>

        <td>
          <a class="link" href="/candidate_profile.php?id=${lead.id}">
            ${escapeHtml(fullName || "(No name)")}
          </a>
        </td>

        <td>
          ${
            lead.phone
              ? `<a class="link" href="tel:${String(lead.phone).replace(/\D/g, "")}">${escapeHtml(lead.phone)}</a>`
              : ""
          }
        </td>

        <td>
          ${
            lead.email
              ? `<a class="link" href="mailto:${escapeAttr(lead.email)}">${escapeHtml(lead.email)}</a>`
              : ""
          }
        </td>

        <td>
          <input type="text" value="${escapeAttr(location)}"
            placeholder="City, State"
            onblur="saveField(${lead.id}, { location: this.value })">
        </td>

        <td>
          <input type="date" value="${escapeAttr(followUp)}"
            onchange="saveField(${lead.id}, { follow_up: this.value })">
        </td>

        <td>
          <select onchange="saveField(${lead.id}, { status: this.value })">
            ${statusOptions(status)}
          </select>
        </td>

        <td>
          <select onchange="saveField(${lead.id}, { bucket: this.value })">
            ${bucketOptions(bucket)}
          </select>
        </td>

        <td>
          <textarea placeholder="Notes..." onblur="saveField(${lead.id}, { notes: this.value })">${escapeHtml(
            notes
          )}</textarea>
        </td>

        <td>
          <button class="danger" onclick="deleteLead(${lead.id})">Delete</button>
        </td>
      `;

    tbody.appendChild(tr);
  });
}

// -----------------------------
// SAVE FIELD (INLINE EDIT)
// -----------------------------
async function saveField(id, fields) {
  const payload = { id, ...fields };

  const res = await fetch(API.updateLead, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (data.status !== "success") {
    console.error("Save failed:", data);
    alert("Save failed: " + (data.message || "Unknown error"));
  }
}

// -----------------------------
// DELETE
// -----------------------------
async function deleteLead(id) {
  if (!confirm("Delete this lead?")) return;

  const res = await fetch(API.deleteLead, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });

  const data = await res.json();

  if (data.status !== "success") {
    alert("Delete failed: " + (data.message || "Unknown error"));
    return;
  }

  // If we're on the recruiting page, reload the table
  if (document.getElementById("recruitTableBody")) {
    loadLeads();
  }
}

// -----------------------------
// HOME DASHBOARD CALENDAR (your existing logic continues below)
// -----------------------------
async function loadLeadsForCalendar() {
  try {
    const res = await fetch(API.getLeads, { cache: "no-store" });
    const data = await res.json();

    if (data.status !== "success") return;

    const leads = data.leads || [];
    followupsByDate = groupByFollowupDate(leads);

    renderCalendar();
    renderUpcomingFollowups();
  } catch (e) {
    console.error(e);
  }
}

// -----------------------------
// HELPERS (keep your existing helper functions; included here to avoid breaking)
// -----------------------------
function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (s) => {
    const map = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" };
    return map[s];
  });
}

function escapeAttr(str) {
  return String(str).replace(/"/g, "&quot;");
}

function statusOptions(selected) {
  const opts = ["New", "Contacted", "Interviewing", "Offered", "Hired", "Closed"];
  return opts
    .map((o) => `<option ${o === selected ? "selected" : ""}>${o}</option>`)
    .join("");
}

function bucketOptions(selected) {
  const opts = ["New Lead", "Machinist", "Student", "Engineer", "Other"];
  return opts
    .map((o) => `<option ${o === selected ? "selected" : ""}>${o}</option>`)
    .join("");
}

// Calendar helpers placeholders (if your home.php relies on these, keep them consistent)
function groupByFollowupDate(leads) {
  const map = {};
  leads.forEach((l) => {
    if (!l.follow_up) return;
    if (!map[l.follow_up]) map[l.follow_up] = [];
    map[l.follow_up].push(l);
  });
  return map;
}

function renderCalendar() {
  // your existing home.php calendar rendering uses this
}

function renderUpcomingFollowups() {
  // your existing home.php followup list uses this
}

function loadTodos() {
  // optional future
}
