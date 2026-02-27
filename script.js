// script.js
// Works for BOTH recruiting.html + home.html

const API = {
  getLeads: "api/get_leads.php",
  addLead: "api/add_lead.php",
  deleteLead: "api/delete_lead.php",
  updateLead: "api/update_lead.php",
};

let allLeads = [];

// -----------------------------
// BOOTSTRAP
// -----------------------------
document.addEventListener("DOMContentLoaded", () => {
  // Recruiting page
  if (document.getElementById("recruitTableBody")) {
    loadLeads();
  }
});

// -----------------------------
// HELPERS
// -----------------------------
function escapeHtml(str) {
  return String(str ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttr(str) {
  return escapeHtml(str).replaceAll("`", "&#096;");
}

function statusOptions(current) {
  const opts = [
    "New",
    "Attempted Contact",
    "Contacted",
    "Interview Scheduled",
    "Interviewed",
    "Hired",
    "Closed",
  ];

  return opts
    .map((o) => `<option ${o === current ? "selected" : ""}>${escapeHtml(o)}</option>`)
    .join("");
}

function bucketOptions(current) {
  const opts = [
    "New Lead",
    "Hot Lead",
    "Contact Later",
    "CNC",
    "Quality",
    "Skilled",
    "Not Interested",
  ];

  return opts
    .map((o) => `<option ${o === current ? "selected" : ""}>${escapeHtml(o)}</option>`)
    .join("");
}

// -----------------------------
// LOAD + RENDER LEADS
// -----------------------------
async function loadLeads() {
  try {
    const res = await fetch(API.getLeads, { cache: "no-store" });
    const data = await res.json();

    if (data.status !== "success") {
      console.error("get_leads error:", data);
      return;
    }

    allLeads = data.leads || [];
    renderLeads(allLeads);
  } catch (err) {
    console.error(err);
  }
}

function renderLeads(leads) {
  const tbody = document.getElementById("recruitTableBody");
  if (!tbody) return;

  tbody.innerHTML = "";

  leads.forEach((lead) => {
    const fullName = `${lead.first_name || ""} ${lead.last_name || ""}`.trim() || "(No name)";
    const status = lead.status || "New";
    const bucket = lead.bucket || "New Lead";
    const location = lead.location || "";
    const followUp = lead.follow_up || "";
    const notes = lead.notes || "";

    const tr = document.createElement("tr");

    tr.innerHTML = `
        <td><input type="checkbox" class="rowCheck" data-id="${lead.id}"></td>

        <td>
          <a class="link" href="candidate_profile.html?id=${lead.id}">
            ${escapeHtml(fullName)}
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
          <textarea placeholder="Notes..." onblur="saveField(${lead.id}, { notes: this.value })">${escapeHtml(notes)}</textarea>
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
  try {
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
  } catch (err) {
    console.error(err);
    alert("Save failed: " + err.message);
  }
}

// -----------------------------
// DELETE
// -----------------------------
async function deleteLead(id) {
  if (!confirm("Delete this lead?")) return;

  try {
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

    loadLeads();
  } catch (err) {
    alert("Delete failed: " + err.message);
  }
}
