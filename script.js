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
  
    // Home dashboard page
    if (document.getElementById("calendarGrid")) {
      initDashboard();
    }

  // Candidate profile page
  if (document.getElementById("profileContainer")) {
    initCandidateProfile();
  }
  });
  
  // -----------------------------
  // RECRUITING: LOAD / RENDER
  // -----------------------------
  async function loadLeads() {
    try {
      const res = await fetch(API.getLeads);
      const data = await res.json();
  
      if (data.status !== "success") {
        alert("Failed to load leads: " + (data.message || "Unknown error"));
        return;
      }
  
      allLeads = data.leads || [];
      renderLeads(allLeads);
      updateCandidateCount(allLeads.length);
    } catch (err) {
      alert("Failed to load leads: " + err.message);
    }
  }
  
  function renderLeads(leads) {
    const tbody = document.getElementById("recruitTableBody");
    if (!tbody) return;
  
    tbody.innerHTML = "";
  
    leads.forEach((lead) => {
      const fullName = `${lead.first_name || ""} ${lead.last_name || ""}`.trim();
      const status = lead.status || "New";
      const bucket = lead.bucket || "New Lead";
      const notes = lead.notes || "";
      const location = lead.location || "";
      const followUp = lead.follow_up || "";
  
      const tr = document.createElement("tr");
  
      tr.innerHTML = `
        <td><input type="checkbox" class="rowCheck" data-id="${lead.id}"></td>
        <td>
          <a class="link" href="candidate_profile.html?id=${encodeURIComponent(lead.id)}">${escapeHtml(fullName || "(No name)")}</a>
        </td>
        <td>${escapeHtml(lead.phone || "")}</td>
        <td>${escapeHtml(lead.email || "")}</td>
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
          <input type="text" value="${escapeAttr(notes)}" placeholder="Add note..."
            onblur="saveField(${lead.id}, { notes: this.value })">
        </td>
        <td>
          <button class="danger" onclick="deleteLead(${lead.id})">Delete</button>
        </td>
      `;
  
      tbody.appendChild(tr);
    });
  }
  
  // Save single field(s) to DB
  async function saveField(id, fields) {
    try {
      const res = await fetch(API.updateLead, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...fields }),
      });
  
      const data = await res.json();
      if (data.status !== "success") {
        alert("Save failed: " + (data.message || "Unknown error"));
        return;
      }
  
      // Update local cache so UI doesn't "snap back"
      const idx = allLeads.findIndex((l) => Number(l.id) === Number(id));
      if (idx !== -1) {
        allLeads[idx] = { ...allLeads[idx], ...fields };
      }
  
      // If home page is open and we changed follow_up, refresh followups view
      if (document.getElementById("calendarGrid") && fields.follow_up !== undefined) {
        rebuildFollowupsFromLeads();
      }
    } catch (err) {
      alert("Save failed: " + err.message);
    }
  }
  
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
  
      allLeads = allLeads.filter((l) => Number(l.id) !== Number(id));
      renderLeads(allLeads);
      updateCandidateCount(allLeads.length);
  
      if (document.getElementById("calendarGrid")) {
        rebuildFollowupsFromLeads();
      }
    } catch (err) {
      alert("Delete failed: " + err.message);
    }
  }
  
  // Add Lead page submit
  async function saveNewLead() {
    const name = document.getElementById("newName")?.value?.trim() || "";
    const phone = document.getElementById("newPhone")?.value?.trim() || "";
    const email = document.getElementById("newEmail")?.value?.trim() || "";
    const location = document.getElementById("newLocation")?.value?.trim() || "";
  
    if (!name) {
      alert("Name is required");
      return;
    }
  
    try {
      const res = await fetch(API.addLead, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email, location }),
      });
  
      const data = await res.json();
      if (data.status !== "success") {
        alert("Save failed: " + (data.message || "Unknown error"));
        return;
      }
  
      window.location = "recruiting.html";
    } catch (err) {
      alert("Save failed: " + err.message);
    }
  }
  
  // Search (optional)
  function updateSearch() {
    const input = (document.getElementById("searchInput")?.value || "").toLowerCase();
    const field = document.getElementById("searchField")?.value || "all";
    const statusFilter = document.getElementById("statusFilter")?.value || "all";
  
    let filtered = [...allLeads];
  
    if (statusFilter !== "all") {
      filtered = filtered.filter((l) => (l.status || "New") === statusFilter);
    }
  
    if (input) {
      filtered = filtered.filter((l) => {
        const fullName = `${l.first_name || ""} ${l.last_name || ""}`.toLowerCase();
        const email = (l.email || "").toLowerCase();
        const phone = (l.phone || "").toLowerCase();
        const location = (l.location || "").toLowerCase();
        const status = (l.status || "").toLowerCase();
        const bucket = (l.bucket || "").toLowerCase();
  
        if (field === "name") return fullName.includes(input);
        if (field === "email") return email.includes(input);
        if (field === "phone") return phone.includes(input);
        if (field === "location") return location.includes(input);
        if (field === "status") return status.includes(input);
        if (field === "bucket") return bucket.includes(input);
  
        return (
          fullName.includes(input) ||
          email.includes(input) ||
          phone.includes(input) ||
          location.includes(input) ||
          status.includes(input) ||
          bucket.includes(input)
        );
      });
    }
  
    renderLeads(filtered);
    updateCandidateCount(filtered.length);
  }
  
  function updateCandidateCount(n) {
    const el = document.getElementById("candidateCount");
    if (el) el.textContent = `${n} Candidates`;
  }
  
  function statusOptions(selected) {
    const options = [
      "New",
      "Attempted Contact",
      "Contacted",
      "Interview Scheduled",
      "Interviewed",
      "Hired",
      "Closed",
    ];
    return options
      .map((o) => `<option ${o === selected ? "selected" : ""}>${o}</option>`)
      .join("");
  }
  
  function bucketOptions(selected) {
    const options = [
      "New Lead",
      "Hot Lead",
      "Contact Later",
      "CNC",
      "Quality",
      "Skilled",
      "Not Interested",
    ];
    return options
      .map((o) => `<option value="${o}" ${o === selected ? "selected" : ""}>${o}</option>`)
      .join("");
  }
  
  // -----------------------------
  // HOME: DASHBOARD + CALENDAR + TODOS
  // -----------------------------
  let calendarDate = new Date(); // current month view
  let followupsByDate = {}; // "YYYY-MM-DD" -> array of followups
  
  function initDashboard() {
    // Date under "Good Morning"
    const todayLabel = document.getElementById("todayDate");
    if (todayLabel) {
      const now = new Date();
      todayLabel.textContent = now.toLocaleDateString(undefined, {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    }
  
    // Load todos
    renderTodos();
  
    // Load leads so followups can show on calendar
    loadLeadsForHomeCalendar();
  }
  
  async function loadLeadsForHomeCalendar() {
    try {
      const res = await fetch(API.getLeads);
      const data = await res.json();
      if (data.status !== "success") return;
  
      allLeads = data.leads || [];
      rebuildFollowupsFromLeads();
      buildCalendar();
    } catch (e) {
      // don't alert here, dashboard still usable
    }
  }
  
  function rebuildFollowupsFromLeads() {
    followupsByDate = {};
  
    allLeads.forEach((l) => {
      if (!l.follow_up) return;
      const dateKey = String(l.follow_up).slice(0, 10); // YYYY-MM-DD
  
      const fullName = `${l.first_name || ""} ${l.last_name || ""}`.trim();
      const item = {
        id: l.id,
        name: fullName,
        status: l.status || "New",
        bucket: l.bucket || "New Lead",
      };
  
      if (!followupsByDate[dateKey]) followupsByDate[dateKey] = [];
      followupsByDate[dateKey].push(item);
    });
  }
  
  function changeMonth(delta) {
    calendarDate.setMonth(calendarDate.getMonth() + delta);
    buildCalendar();
  }
  
  function buildCalendar() {
    const grid = document.getElementById("calendarGrid");
    const label = document.getElementById("monthLabel");
    if (!grid || !label) return;
  
    grid.innerHTML = "";
  
    const year = calendarDate.getFullYear();
    const month = calendarDate.getMonth();
  
    label.textContent = calendarDate.toLocaleDateString(undefined, {
      month: "long",
      year: "numeric",
    });
  
    // first day of month
    const first = new Date(year, month, 1);
    const startDay = first.getDay(); // 0-6
    const daysInMonth = new Date(year, month + 1, 0).getDate();
  
    // Day headers
    const dayNames = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    dayNames.forEach((d) => {
      const h = document.createElement("div");
      h.className = "calendarDayHeader";
      h.textContent = d;
      grid.appendChild(h);
    });
  
    // Blank cells before first
    for (let i = 0; i < startDay; i++) {
      const blank = document.createElement("div");
      blank.className = "calendarCell calendarBlank";
      grid.appendChild(blank);
    }
  
    // Day cells
    for (let day = 1; day <= daysInMonth; day++) {
      const cell = document.createElement("div");
      cell.className = "calendarCell";
  
      const dateObj = new Date(year, month, day);
      const key = toDateKey(dateObj);
  
      const top = document.createElement("div");
      top.className = "calendarCellTop";
  
      const num = document.createElement("div");
      num.className = "calendarDayNumber";
      num.textContent = day;
  
      const dot = document.createElement("div");
      dot.className = "calendarDot";
      if (followupsByDate[key]?.length) {
        dot.classList.add("hasFollowups");
        cell.classList.add("hasFollowups");
      }
  
      top.appendChild(num);
      top.appendChild(dot);
  
      cell.appendChild(top);
  
      cell.onclick = () => showFollowupsForDate(key);
  
      // highlight today
      const todayKey = toDateKey(new Date());
      if (key === todayKey) cell.classList.add("today");
  
      grid.appendChild(cell);
    }
  
    // default followups: today
    showFollowupsForDate(toDateKey(new Date()));
  }
  
  function showFollowupsForDate(dateKey) {
    const header = document.getElementById("followupsHeader");
    const list = document.getElementById("followupsList");
    if (!header || !list) return;
  
    const nice = new Date(dateKey + "T00:00:00").toLocaleDateString(undefined, {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  
    header.textContent = `Follow-ups for ${nice}`;
    list.innerHTML = "";
  
    const items = followupsByDate[dateKey] || [];
    if (!items.length) {
      const empty = document.createElement("div");
      empty.className = "emptyState";
      empty.textContent = "No follow-ups scheduled for this date.";
      list.appendChild(empty);
      return;
    }
  
    items.forEach((it) => {
      const row = document.createElement("div");
      row.className = "followupRow";

      const href = `candidate_profile.html?id=${encodeURIComponent(it.id)}`;
      row.innerHTML = `
        <div class="followupName"><a class="link" href="${href}">${escapeHtml(it.name || "(No name)")}</a></div>
        <div class="followupMeta">${escapeHtml(it.status)} • ${escapeHtml(it.bucket)}</div>
      `;

      // Make the whole row clickable (but keep normal link behavior too)
      row.addEventListener("click", (e) => {
        if (e.target && e.target.closest && e.target.closest("a")) return;
        window.location.href = href;
      });
      list.appendChild(row);
    });
  }
  
  function toDateKey(d) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }

  // -----------------------------
  // CANDIDATE PROFILE
  // -----------------------------
  function getQueryParam(name) {
    const url = new URL(window.location.href);
    return url.searchParams.get(name);
  }

  async function initCandidateProfile() {
    const container = document.getElementById("profileContainer");
    if (!container) return;

    const idParam = getQueryParam("id") || localStorage.getItem("currentProfile");
    const id = Number(idParam);
    if (!id || Number.isNaN(id)) {
      container.innerHTML = `<div class="emptyState">No candidate selected. Go back to <a class="link" href="recruiting.html">Talent Search</a>.</div>`;
      return;
    }

    // Persist for backward compatibility with older pages
    localStorage.setItem("currentProfile", String(id));

    try {
      const res = await fetch(API.getLeads);
      const data = await res.json();
      if (data.status !== "success") throw new Error(data.message || "Failed to load candidate");

      const lead = (data.leads || []).find((l) => Number(l.id) === id);
      if (!lead) {
        container.innerHTML = `<div class="emptyState">Candidate not found. Go back to <a class="link" href="recruiting.html">Talent Search</a>.</div>`;
        return;
      }

      fillCandidateProfileForm(lead);
    } catch (err) {
      container.innerHTML = `<div class="emptyState">Failed to load candidate. ${escapeHtml(err.message)}</div>`;
    }
  }

  function fillCandidateProfileForm(lead) {
    const fullName = `${lead.first_name || ""} ${lead.last_name || ""}`.trim();

    const nameEl = document.getElementById("profileName");
    const phoneEl = document.getElementById("profilePhone");
    const emailEl = document.getElementById("profileEmail");
    const locationEl = document.getElementById("profileLocation");
    const statusEl = document.getElementById("profileStatus");
    const bucketEl = document.getElementById("profileBucket");
    const followEl = document.getElementById("profileFollowUp");
    const notesEl = document.getElementById("profileNotes");

    if (nameEl) nameEl.value = fullName;
    if (phoneEl) phoneEl.value = lead.phone || "";
    if (emailEl) emailEl.value = lead.email || "";
    if (locationEl) locationEl.value = lead.location || "";
    if (statusEl) statusEl.value = lead.status || "New";
    if (bucketEl) bucketEl.value = lead.bucket || "New Lead";
    if (followEl) followEl.value = (lead.follow_up || "").slice(0, 10);
    if (notesEl) notesEl.value = lead.notes || "";

    // Helpful action links
    const phoneLink = document.getElementById("profilePhoneLink");
    if (phoneLink) {
      const digits = String(lead.phone || "").replace(/\D/g, "");
      phoneLink.href = digits ? `tel:${digits}` : "#";
      phoneLink.classList.toggle("disabled", !digits);
    }
    const emailLink = document.getElementById("profileEmailLink");
    if (emailLink) {
      emailLink.href = lead.email ? `mailto:${lead.email}` : "#";
      emailLink.classList.toggle("disabled", !lead.email);
    }

    const saveBtn = document.getElementById("saveProfileBtn");
    if (saveBtn) {
      saveBtn.onclick = () => saveCandidateProfile(Number(lead.id));
    }
  }

  async function saveCandidateProfile(id) {
    const locationEl = document.getElementById("profileLocation");
    const statusEl = document.getElementById("profileStatus");
    const bucketEl = document.getElementById("profileBucket");
    const followEl = document.getElementById("profileFollowUp");
    const notesEl = document.getElementById("profileNotes");

    const payload = {
      id,
      location: locationEl ? locationEl.value : "",
      status: statusEl ? statusEl.value : "New",
      bucket: bucketEl ? bucketEl.value : "New Lead",
      follow_up: followEl ? followEl.value : "",
      notes: notesEl ? notesEl.value : "",
    };

    try {
      const res = await fetch(API.updateLead, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.status !== "success") throw new Error(data.message || "Save failed");

      // Refresh local cache if present
      const idx = allLeads.findIndex((l) => Number(l.id) === Number(id));
      if (idx !== -1) {
        allLeads[idx] = { ...allLeads[idx], ...payload };
      }

      alert("Profile saved.");
    } catch (err) {
      alert("Save failed: " + err.message);
    }
  }
  
  // -----------------------------
  // TODOS (localStorage)
  // -----------------------------
  function getTodos() {
    try {
      return JSON.parse(localStorage.getItem("ats_todos") || "[]");
    } catch {
      return [];
    }
  }
  
  function setTodos(todos) {
    localStorage.setItem("ats_todos", JSON.stringify(todos));
  }
  
  function addTodo() {
    const input = document.getElementById("todoInput");
    if (!input) return;
  
    const text = input.value.trim();
    if (!text) return;
  
    const todos = getTodos();
    todos.push({ id: Date.now(), text, done: false });
    setTodos(todos);
  
    input.value = "";
    renderTodos();
  }
  
  function toggleTodo(id) {
    const todos = getTodos().map((t) =>
      t.id === id ? { ...t, done: !t.done } : t
    );
    setTodos(todos);
    renderTodos();
  }
  
  function deleteTodo(id) {
    const todos = getTodos().filter((t) => t.id !== id);
    setTodos(todos);
    renderTodos();
  }
  
  function renderTodos() {
    const list = document.getElementById("todoList");
    if (!list) return;
  
    const todos = getTodos();
    list.innerHTML = "";
  
    if (!todos.length) {
      const empty = document.createElement("div");
      empty.className = "emptyState";
      empty.textContent = "No tasks yet.";
      list.appendChild(empty);
      return;
    }
  
    todos.forEach((t) => {
      const row = document.createElement("div");
      row.className = "todoRow";
      row.innerHTML = `
        <label class="todoLeft">
          <input type="checkbox" ${t.done ? "checked" : ""} onchange="toggleTodo(${t.id})">
          <span class="${t.done ? "todoDone" : ""}">${escapeHtml(t.text)}</span>
        </label>
        <button class="todoDelete" onclick="deleteTodo(${t.id})">Delete</button>
      `;
      list.appendChild(row);
    });
  }
  
  // -----------------------------
  // HELPERS
  // -----------------------------
  function escapeHtml(str) {
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }
  
  function escapeAttr(str) {
    return escapeHtml(str).replaceAll("\n", " ");
  }
  
