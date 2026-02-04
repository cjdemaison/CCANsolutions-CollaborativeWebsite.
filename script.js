// ================================
// ACUTEC ATS - FULL SYSTEM ENGINE
// LocalStorage Database
// Notes Array | Follow-Up Sync | Editable Buckets | Profiles | Bulk Actions
// ================================

// ---------- DEFAULT BUCKETS ----------
let defaultBuckets = [
    "New Lead",
    "Hot Lead",
    "Contact Later",
    "CNC",
    "Quality",
    "Skilled",
    "Not Interested"
];

// ---------- STORAGE KEYS ----------
const STORAGE_KEY = "acutecCandidates";
const BUCKET_KEY = "acutecBuckets";

// ---------- LOAD CANDIDATES ----------
function loadCandidates() {
    let data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
        return [];
    }
    return JSON.parse(data);
}

// ---------- SAVE CANDIDATES ----------
function saveCandidates(list) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

// ---------- LOAD BUCKETS ----------
function loadBuckets() {
    let data = localStorage.getItem(BUCKET_KEY);
    if (!data) {
        localStorage.setItem(BUCKET_KEY, JSON.stringify(defaultBuckets));
        return defaultBuckets;
    }
    return JSON.parse(data);
}

// ---------- SAVE BUCKETS ----------
function saveBuckets(list) {
    localStorage.setItem(BUCKET_KEY, JSON.stringify(list));
}

let buckets = loadBuckets();
let candidates = loadCandidates();

// =====================================
// CALENDAR STATE (HOME SCREEN)
// =====================================
let currentMonth = null; // 0-11
let currentYear = null;
let selectedDate = null; // "YYYY-MM-DD"

function initCalendarState() {
    let today = new Date();
    currentMonth = today.getMonth();
    currentYear = today.getFullYear();
    selectedDate = today.toISOString().split("T")[0];
}

// =====================================
// EMAIL "AUTOMATION" HELPERS
// =====================================

// Build and open a mailto link
function openEmail(to, subject, body) {
    if (!to) return;
    const s = encodeURIComponent(subject || "");
    const b = encodeURIComponent(body || "");
    window.location.href = `mailto:${to}?subject=${s}&body=${b}`;
}

// When a brand-new lead is added
function triggerEmailForNewLead(c) {
    if (!c.email) return;

    const firstName = c.name ? c.name.split(" ")[0] : "there";

    const subject = "Thanks for connecting with Acutec";
    const body =
`Hi ${firstName},

Thanks for your interest in opportunities at Acutec Precision Aerospace.

I’ll review your background and reach out to talk about next steps and where you might fit best on our team.

If you have any questions before then, feel free to reply to this email or call me.

Thanks,
Cameron
Acutec Recruiting`;

    // no confirm here – you literally just added them, so sending the welcome makes sense
    openEmail(c.email, subject, body);
}

// When a status changes (Interview Scheduled, Hired, Closed, etc.)
function triggerEmailForStatusChange(c) {
    if (!c.email) return;

    const firstName = c.name ? c.name.split(" ")[0] : "there";
    let subject = "";
    let body = "";

    if (c.status === "Interview Scheduled") {
        subject = "Your interview with Acutec";
        body =
`Hi ${firstName},

Thanks again for your interest in Acutec. I have you scheduled for an interview.

If we haven’t already confirmed details, please reply to this email and I’ll send the exact time, location, and who you’ll be meeting with.

Talk soon,
Cameron
Acutec Recruiting`;
    } else if (c.status === "Hired") {
        subject = "Welcome to Acutec!";
        body =
`Hi ${firstName},

We’re excited to have you join Acutec.

This email is just a quick congratulations. HR will be in touch with your official offer details and onboarding information.

If you have any questions in the meantime, reply here or give me a call.

Welcome aboard,
Cameron
Acutec Recruiting`;
    } else if (c.status === "Closed") {
        subject = "Update on your interest in Acutec";
        body =
`Hi ${firstName},

Thank you again for taking the time to speak with us and for your interest in Acutec.

At this time we’re not moving forward, but we truly appreciate your interest and the opportunity to learn more about you. If things change in the future, we may reach back out if a good fit opens up.

Best of luck moving forward,
Cameron
Acutec Recruiting`;
    } else {
        // for other statuses, do nothing automatically
        return;
    }

    if (!confirm(`Open an email template for "${c.status}" to ${c.name}?`)) return;
    openEmail(c.email, subject, body);
}

// =====================================
// FILTERED CANDIDATE LIST FOR TALENT PAGE
// =====================================
function getFilteredCandidates() {
    let termInput = document.getElementById("searchInput");
    let fieldSel = document.getElementById("searchField");
    let statusSel = document.getElementById("statusFilter");
    let sortSel = document.getElementById("sortBy");

    let term = termInput ? termInput.value.toLowerCase().trim() : "";
    let field = fieldSel ? fieldSel.value : "all";
    let statusFilter = statusSel ? statusSel.value : "all";
    let sortBy = sortSel ? sortSel.value : "followUpSoonest";

    let list = [...candidates];

    // search term
    if (term) {
        list = list.filter(c => {
            let fields = [];

            function addIf(str) {
                if (str) fields.push(String(str).toLowerCase());
            }

            if (field === "all" || field === "name") addIf(c.name);
            if (field === "all" || field === "location") addIf(c.location);
            if (field === "all" || field === "phone") addIf(c.phone);
            if (field === "all" || field === "email") addIf(c.email);
            if (field === "all" || field === "status") addIf(c.status);
            if (field === "all" || field === "bucket") addIf(c.bucket);

            return fields.some(f => f.includes(term));
        });
    }

    // status filter
    if (statusFilter && statusFilter !== "all") {
        list = list.filter(c => c.status === statusFilter);
    }

    // sorting
    list.sort((a, b) => {
        if (sortBy === "nameAZ") {
            return (a.name || "").localeCompare(b.name || "");
        } else if (sortBy === "recentAdded") {
            // ids are Date.now() when created
            return (b.id || 0) - (a.id || 0);
        } else {
            // followUpSoonest (default)
            let af = a.followUp || "9999-12-31";
            let bf = b.followUp || "9999-12-31";
            if (af === bf) {
                return (a.name || "").localeCompare(b.name || "");
            }
            return af.localeCompare(bf);
        }
    });

    return list;
}

function updateSearch() {
    renderRecruitingTable();
}

// ================================
// BUILD RECRUITING TABLE
// ================================
function renderRecruitingTable() {
    let tbody = document.getElementById("recruitTableBody");
    if (!tbody) return;

    let list = getFilteredCandidates();
    tbody.innerHTML = "";

    list.forEach((c) => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td><input type="checkbox" class="bulkCheck" data-id="${c.id}"></td>
            <td class="clickable" onclick="openProfile(${c.id})">${c.name}</td>
            <td><a href="tel:${cleanPhone(c.phone)}">${c.phone || ""}</a></td>
            <td><a href="mailto:${c.email}">${c.email || ""}</a></td>
            <td>${c.location || ""}</td>
            <td>
                <input type="date" value="${c.followUp || ""}" onchange="setFollowUp(${c.id}, this.value)">
            </td>
            <td>
                <select onchange="setStatus(${c.id}, this.value)">
                    ${statusOptions(c.status)}
                </select>
            </td>
            <td>
                ${bucketDropdown(c)}
            </td>
            <td>
                <input type="text" placeholder="Quick note" 
                    value="${c.quickNote || ""}"
                    onblur="saveQuickNote(${c.id}, this.value)">
            </td>
            <td>
                <button onclick="deleteCandidate(${c.id})" class="danger">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });

    // update count label
    let countEl = document.getElementById("candidateCount");
    if (countEl) {
        countEl.textContent = `${list.length} candidate(s) shown`;
    }
}

// ================================
// HELPERS
// ================================
function cleanPhone(phone) {
    return (phone || "").replace(/\D/g, "");
}

function statusOptions(current) {
    let statuses = [
        "New",
        "Attempted Contact",
        "Contacted",
        "Interview Scheduled",
        "Interviewed",
        "Hired",
        "Closed"
    ];
    return statuses
        .map(s => `<option ${s === current ? "selected" : ""}>${s}</option>`)
        .join("");
}

function bucketDropdown(c) {
    return `
    <select onchange="setBucket(${c.id}, this.value)">
        ${buckets.map(b => `<option ${b === c.bucket ? "selected" : ""}>${b}</option>`).join("")}
        <option value="__addNew">+ Add New Bucket</option>
        <option value="__delete">Delete Bucket</option>
    </select>`;
}

// ================================
// UPDATE FIELDS
// ================================
function setFollowUp(id, date) {
    let c = candidates.find(x => x.id === id);
    if (!c) return;
    c.followUp = date;

    // sync calendar state to this date
    if (date) {
        let d = new Date(date);
        if (!isNaN(d.getTime())) {
            currentYear = d.getFullYear();
            currentMonth = d.getMonth();
            selectedDate = date;
        }
    }

    saveCandidates(candidates);
    renderCalendar();
    renderRecruitingTable();
}

function setQuickNote(id, note) {
    let c = candidates.find(x => x.id === id);
    if (!c) return;
    c.quickNote = note;
    saveCandidates(candidates);
}

// alias used by onblur in table
function saveQuickNote(id, note) {
    setQuickNote(id, note);
}

function setStatus(id, status) {
    let c = candidates.find(x => x.id === id);
    if (!c) return;
    c.status = status;
    saveCandidates(candidates);

    // trigger email automation for certain statuses
    triggerEmailForStatusChange(c);

    renderRecruitingTable();
}

// ================================
// NOTES SYSTEM (ARRAY)
// ================================
function addNote(id, text) {
    let c = candidates.find(x => x.id === id);
    if (!c) return;

    if (!c.notes) c.notes = [];

    c.notes.push({
        text: text,
        timestamp: new Date().toISOString()
    });

    saveCandidates(candidates);
    openProfile(id);
}

// ================================
// DELETE CANDIDATE
// ================================
function deleteCandidate(id) {
    if (!confirm("Delete this candidate?")) return;
    candidates = candidates.filter(x => x.id !== id);
    saveCandidates(candidates);
    renderRecruitingTable();
    renderCalendar();
}

// ================================
// ADD NEW CANDIDATE (ADD_LEAD PAGE)
// ================================
function saveNewLead() {
    let name = document.getElementById("newName").value.trim();
    let phone = document.getElementById("newPhone").value.trim();
    let email = document.getElementById("newEmail").value.trim();
    let location = document.getElementById("newLocation").value.trim();

    if (!name) {
        alert("Name required");
        return;
    }

    let newCandidate = {
        id: Date.now(),
        name,
        phone,
        email,
        location,
        status: "New",
        bucket: "New Lead",
        followUp: "",
        notes: [],
        lastContacted: "",
        quickNote: ""
    };

    candidates.push(newCandidate);
    saveCandidates(candidates);

    // send welcome email
    triggerEmailForNewLead(newCandidate);

    window.location.href = "recruiting.html";
}

// ================================
// OPEN PROFILE PAGE
// ================================
function openProfile(id) {
    localStorage.setItem("currentProfile", id);
    window.location.href = "candidate_profile.html";
}

function loadProfile() {
    let container = document.getElementById("profileContainer");
    if (!container) return;

    let id = parseInt(localStorage.getItem("currentProfile"));
    let c = candidates.find(x => x.id === id);
    if (!c) {
        container.innerHTML = "<p>Error loading profile.</p>";
        return;
    }

    document.getElementById("profileName").value = c.name || "";
    document.getElementById("profilePhone").value = c.phone || "";
    document.getElementById("profileEmail").value = c.email || "";
    document.getElementById("profileLocation").value = c.location || "";
    document.getElementById("profileStatus").value = c.status || "New";
    document.getElementById("profileBucket").value = c.bucket || "New Lead";

    // notes
    let notesArea = document.getElementById("notesList");
    notesArea.innerHTML = "";
    if (c.notes) {
        c.notes.forEach(n => {
            let div = document.createElement("div");
            div.className = "noteItem";
            div.innerHTML = `
                <strong>${new Date(n.timestamp).toLocaleString()}</strong><br>
                ${n.text}
            `;
            notesArea.appendChild(div);
        });
    }
}

function saveProfile() {
    let id = parseInt(localStorage.getItem("currentProfile"));
    let c = candidates.find(x => x.id === id);
    if (!c) return;

    c.name = document.getElementById("profileName").value;
    c.phone = document.getElementById("profilePhone").value;
    c.email = document.getElementById("profileEmail").value;
    c.location = document.getElementById("profileLocation").value;
    c.status = document.getElementById("profileStatus").value;
    c.bucket = document.getElementById("profileBucket").value;

    saveCandidates(candidates);

    alert("Profile saved.");
    renderRecruitingTable();
    renderCalendar();
}

// =====================================
// MONTH CALENDAR (HOME SCREEN)
// =====================================
function renderCalendar() {
    let grid = document.getElementById("calendarGrid");
    let monthLabel = document.getElementById("monthLabel");
    if (!grid || !monthLabel || currentMonth === null || currentYear === null) return;

    let first = new Date(currentYear, currentMonth, 1);
    let startDay = first.getDay(); // 0 = Sun
    let daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    monthLabel.textContent = first.toLocaleString(undefined, {
        month: "long",
        year: "numeric"
    });

    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    let html = '<table class="calendarTable"><thead><tr>';
    dayNames.forEach(d => {
        html += `<th>${d}</th>`;
    });
    html += "</tr></thead><tbody>";

    let day = 1;
    for (let week = 0; week < 6; week++) {
        html += "<tr>";
        for (let dow = 0; dow < 7; dow++) {
            if ((week === 0 && dow < startDay) || day > daysInMonth) {
                html += '<td class="empty"></td>';
            } else {
                let yyyy = currentYear;
                let mm = String(currentMonth + 1).padStart(2, "0");
                let dd = String(day).padStart(2, "0");
                let dateStr = `${yyyy}-${mm}-${dd}`;

                let isSelected = selectedDate === dateStr;
                let hasFollowup = candidates.some(c => c.followUp === dateStr);

                let classes = "calendarDay";
                if (isSelected) classes += " selectedDay";
                if (hasFollowup) classes += " hasFollowup";

                html += `<td class="${classes}" onclick="selectCalendarDate('${dateStr}')">${day}</td>`;
                day++;
            }
        }
        html += "</tr>";
        if (day > daysInMonth) break;
    }

    html += "</tbody></table>";
    grid.innerHTML = html;

    renderFollowupsForSelected();
}

function selectCalendarDate(dateStr) {
    selectedDate = dateStr;
    renderCalendar();
}

function changeMonth(delta) {
    if (currentMonth === null || currentYear === null) return;
    currentMonth += delta;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    } else if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    renderCalendar();
}

function renderFollowupsForSelected() {
    let list = document.getElementById("followupsList");
    let header = document.getElementById("followupsHeader");
    if (!list || !header || !selectedDate) return;

    let d = new Date(selectedDate);
    header.textContent =
        "Follow-ups for " +
        d.toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
            year: "numeric"
        });

    list.innerHTML = "";

    let todays = candidates.filter(c => c.followUp === selectedDate);

    if (!todays.length) {
        list.innerHTML =
            "<p style='font-size:14px; color:#666;'>No follow-ups scheduled.</p>";
        return;
    }

    todays.forEach(c => {
        let div = document.createElement("div");
        div.className = "calendarItem";
        div.innerHTML = `
            <span class="calName" onclick="openProfile(${c.id})">${c.name}</span>
            <span>${c.phone || ""}</span>
        `;
        list.appendChild(div);
    });
}

// Show today's full date under greeting
function renderTodayDate() {
    let el = document.getElementById("todayDate");
    if (!el) return;

    let now = new Date();
    let options = {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric"
    };
    el.textContent = now.toLocaleDateString(undefined, options);
}

// =====================================
// TO-DO LIST
// =====================================
const TODO_KEY = "acutecTodo";

function loadTodos() {
    let x = localStorage.getItem(TODO_KEY);
    if (!x) return [];
    return JSON.parse(x);
}

function saveTodos(list) {
    localStorage.setItem(TODO_KEY, JSON.stringify(list));
}

let todos = loadTodos();

function renderTodo() {
    let list = document.getElementById("todoList");
    if (!list) return;
    list.innerHTML = "";

    todos.forEach((t, i) => {
        let row = document.createElement("div");
        row.className = "todoItem";
        row.innerHTML = `
            <input type="checkbox" ${t.done ? "checked" : ""} onchange="toggleTodo(${i})">
            <span class="${t.done ? "done" : ""}" style="flex:1; margin-left:8px;">${t.text}</span>
            <button onclick="deleteTodo(${i})">X</button>
        `;
        list.appendChild(row);
    });
}

function addTodo() {
    let input = document.getElementById("todoInput");
    if (!input) return;

    let txt = input.value.trim();
    if (!txt) return;
    todos.push({ text: txt, done: false });
    saveTodos(todos);
    renderTodo();
    input.value = "";
}

function toggleTodo(i) {
    todos[i].done = !todos[i].done;
    saveTodos(todos);
    renderTodo();
}

function deleteTodo(i) {
    todos.splice(i, 1);
    saveTodos(todos);
    renderTodo();
}

// =====================================
// BULK ACTIONS
// =====================================
function getCheckedIds() {
    return [...document.querySelectorAll(".bulkCheck:checked")].map(x =>
        parseInt(x.dataset.id)
    );
}

function bulkDelete() {
    let ids = getCheckedIds();
    if (ids.length === 0) return alert("No candidates selected.");

    if (!confirm("Delete selected candidates?")) return;

    candidates = candidates.filter(c => !ids.includes(c.id));
    saveCandidates(candidates);
    renderRecruitingTable();
    renderCalendar();
}

function bulkStatus(newStatus) {
    let ids = getCheckedIds();
    if (ids.length === 0) return alert("No candidates selected.");

    candidates.forEach(c => {
        if (ids.includes(c.id)) c.status = newStatus;
    });

    saveCandidates(candidates);
    renderRecruitingTable();
}

function bulkBucket(newBucket) {
    let ids = getCheckedIds();
    if (ids.length === 0) return alert("No candidates selected.");

    candidates.forEach(c => {
        if (ids.includes(c.id)) c.bucket = newBucket;
    });

    saveCandidates(candidates);
    renderRecruitingTable();
}

// =====================================
// DRAGGABLE COLUMNS
// =====================================
let draggedCol = null;

function enableDragColumns() {
    let headers = document.querySelectorAll("table th");
    if (!headers.length) return;

    headers.forEach(th => {
        th.draggable = true;

        th.addEventListener("dragstart", e => {
            draggedCol = th;
            e.dataTransfer.effectAllowed = "move";
        });

        th.addEventListener("dragover", e => {
            e.preventDefault();
        });

        th.addEventListener("drop", e => {
            e.preventDefault();
            if (!draggedCol || draggedCol === th) return;

            let rowIndex = [...th.parentNode.children].indexOf(th);
            let draggedIndex = [...draggedCol.parentNode.children].indexOf(
                draggedCol
            );

            document.querySelectorAll("table tr").forEach(row => {
                let cells = row.children;
                if (cells.length > Math.max(rowIndex, draggedIndex)) {
                    row.insertBefore(cells[draggedIndex], cells[rowIndex]);
                }
            });
        });
    });
}

// =====================================
// PAGE INITIALIZATION
// =====================================
document.addEventListener("DOMContentLoaded", () => {
    initCalendarState();

    renderRecruitingTable();
    renderCalendar();
    renderFollowupsForSelected();
    renderTodo();
    renderTodayDate();
    enableDragColumns();

    if (document.getElementById("profileContainer")) {
        loadProfile();
    }
});
