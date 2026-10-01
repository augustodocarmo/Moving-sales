(function () {
  "use strict";

  var DEFAULT_SHEET_ID = "1YvIGYcy9DOSiOg3fD3tw4D5eml2p3W5opT0-MpR6-xM";
  var SCOPES = "https://www.googleapis.com/auth/spreadsheets";

  var state = {
    token: null,
    tokenClient: null,
    currentView: "today",
    data: {
      master: [],
      today: [],
      crm: [],
      metrics: []
    },
    headers: {
      master: [],
      today: [],
      crm: [],
      metrics: []
    },
    config: {
      clientId: localStorage.getItem("hexology_hq_client_id") || DEFAULT_CLIENT_ID,
      sheetId: localStorage.getItem("hexology_hq_sheet_id") || DEFAULT_SHEET_ID
    },
    loading: false
  };

  var els = {
    nav: document.getElementById("nav"),
    pageTitle: document.getElementById("pageTitle"),
    pageSubtitle: document.getElementById("pageSubtitle"),
    content: document.getElementById("content"),
    connectButton: document.getElementById("connectButton"),
    refreshButton: document.getElementById("refreshButton"),
    welcomeConnect: document.getElementById("welcomeConnect"),
    connectionState: document.getElementById("connectionState"),
    lastRefresh: document.getElementById("lastRefresh"),
    setupButton: document.getElementById("setupButton"),
    setupDialog: document.getElementById("setupDialog"),
    setupForm: document.getElementById("setupForm"),
    clientIdInput: document.getElementById("clientIdInput"),
    sheetIdInput: document.getElementById("sheetIdInput"),
    saveSetup: document.getElementById("saveSetup"),
    toast: document.getElementById("toast")
  };

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function compact(value) {
    return String(value == null ? "" : value).trim();
  }

  function lower(value) {
    return compact(value).toLowerCase();
  }

  function showToast(message, isError) {
    els.toast.textContent = message;
    els.toast.className = "toast show" + (isError ? " error" : "");
    window.clearTimeout(showToast._timer);
    showToast._timer = window.setTimeout(function () {
      els.toast.className = "toast";
    }, 3600);
  }

  function setConnection(online) {
    els.connectionState.classList.toggle("online", online);
    els.connectionState.classList.toggle("offline", !online);
    els.connectionState.querySelector("span:last-child").textContent = online ? "Live Google Sheet" : "Not connected";
    els.refreshButton.disabled = !online;
    els.connectButton.textContent = online ? "Reconnect" : "Connect Google";
  }

  function openSetup() {
    els.clientIdInput.value = state.config.clientId;
    els.sheetIdInput.value = state.config.sheetId || DEFAULT_SHEET_ID;
    els.setupDialog.showModal();
  }

  function saveSetup() {
    state.config.clientId = compact(els.clientIdInput.value);
    state.config.sheetId = compact(els.sheetIdInput.value) || DEFAULT_SHEET_ID;
    localStorage.setItem("hexology_hq_client_id", state.config.clientId);
    localStorage.setItem("hexology_hq_sheet_id", state.config.sheetId);
    state.tokenClient = null;
    showToast("Connection settings saved.");
  }

  function waitForGoogleIdentity() {
    return new Promise(function (resolve, reject) {
      var tries = 0;
      var timer = window.setInterval(function () {
        tries += 1;
        if (window.google && google.accounts && google.accounts.oauth2) {
          window.clearInterval(timer);
          resolve();
          return;
        }
        if (tries > 80) {
          window.clearInterval(timer);
          reject(new Error("Google Identity Services did not load."));
        }
      }, 100);
    });
  }

  async function connectGoogle() {
    if (!state.config.clientId) {
      openSetup();
      showToast("Add your Google OAuth Client ID first.", true);
      return;
    }

    try {
      await waitForGoogleIdentity();

      if (!state.tokenClient) {
        state.tokenClient = google.accounts.oauth2.initTokenClient({
          client_id: state.config.clientId,
          scope: SCOPES,
          callback: async function (response) {
            if (response.error) {
              showToast("Google connection failed: " + response.error, true);
              return;
            }
            state.token = response.access_token;
            setConnection(true);
            showToast("Google connected. Loading Hexology Execution HQ…");
            await loadAll();
          },
          error_callback: function (error) {
            var reason = error && error.type ? error.type : "popup_error";
            showToast("Google sign-in could not open: " + reason + ". Check that pop-ups are allowed for localhost.", true);
          }
        });
      }

      showToast("Opening Google sign-in…");
      state.tokenClient.requestAccessToken({ prompt: "consent" });
    } catch (err) {
      showToast(err.message || "Could not connect to Google.", true);
    }
  }

  async function apiFetch(url, options) {
    if (!state.token) {
      throw new Error("Google is not connected.");
    }

    var opts = options || {};
    opts.headers = Object.assign({}, opts.headers || {}, {
      Authorization: "Bearer " + state.token
    });

    var response = await fetch(url, opts);

    if (response.status === 401) {
      setConnection(false);
      state.token = null;
      throw new Error("Google session expired. Reconnect and try again.");
    }

    if (!response.ok) {
      var detail = "";
      try {
        var body = await response.json();
        detail = body && body.error && body.error.message ? body.error.message : "";
      } catch (e) {
        detail = "";
      }
      throw new Error(detail || ("Google Sheets API returned " + response.status));
    }

    return response.json();
  }

  function valuesUrl(range) {
    return "https://sheets.googleapis.com/v4/spreadsheets/" +
      encodeURIComponent(state.config.sheetId) +
      "/values/" +
      encodeURIComponent(range);
  }

  async function readRange(range) {
    var data = await apiFetch(valuesUrl(range) + "?valueRenderOption=FORMATTED_VALUE");
    return data.values || [];
  }

  function rowsToObjects(values, key) {
    if (!values.length) {
      state.headers[key] = [];
      return [];
    }

    var headers = values[0].map(compact);
    state.headers[key] = headers;

    return values.slice(1)
      .map(function (row, index) {
        var item = { __row: index + 2 };
        headers.forEach(function (header, col) {
          item[header] = row[col] == null ? "" : row[col];
        });
        return item;
      })
      .filter(function (item) {
        return headers.some(function (h) { return compact(item[h]) !== ""; });
      });
  }

  async function loadAll() {
    if (state.loading) return;

    state.loading = true;
    els.refreshButton.disabled = true;
    els.lastRefresh.textContent = "Refreshing…";

    try {
      var masterValues = await readRange("'Master Tasks'!A1:J1000");
      var todayValues = await readRange("'Today'!A1:G500");
      var crmValues = await readRange("'CRM'!A1:M1000");
      var metricValues = await readRange("'Business Metrics'!A1:L500");

      state.data.master = rowsToObjects(masterValues, "master");
      state.data.today = rowsToObjects(todayValues, "today");
      state.data.crm = rowsToObjects(crmValues, "crm");
      state.data.metrics = rowsToObjects(metricValues, "metrics");

      els.lastRefresh.textContent = "Updated " + new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      setConnection(true);
      render();
    } catch (err) {
      showToast(err.message || "Could not load the spreadsheet.", true);
      els.lastRefresh.textContent = "Refresh failed";
    } finally {
      state.loading = false;
      els.refreshButton.disabled = !state.token;
    }
  }

  function isInactive(task) {
    var s = lower(task.Status);
    return s.indexOf("completed") !== -1 ||
      s.indexOf("paused") !== -1 ||
      s.indexOf("backlog") !== -1;
  }

  function isWaiting(task) {
    var s = lower(task.Status);
    return s.indexOf("waiting") !== -1 || s.indexOf("delegated") !== -1;
  }

  function priorityClass(priority) {
    var p = lower(priority);
    if (p.indexOf("p0") === 0) return "p0";
    if (p.indexOf("p1") === 0) return "p1";
    return "";
  }

  function cardClass(task) {
    var p = lower(task.Priority);
    if (p.indexOf("p0") === 0) return "critical";
    if (p.indexOf("p1") === 0) return "high";
    return "";
  }

  function statusPillClass(status) {
    var s = lower(status);
    if (s.indexOf("completed") !== -1) return "done";
    if (s.indexOf("paused") !== -1) return "paused";
    if (s.indexOf("waiting") !== -1 || s.indexOf("delegated") !== -1) return "waiting";
    return "";
  }

  function todayIso() {
    var d = new Date();
    var y = d.getFullYear();
    var m = String(d.getMonth() + 1).padStart(2, "0");
    var day = String(d.getDate()).padStart(2, "0");
    return y + "-" + m + "-" + day;
  }

  function dateOnly(value) {
    var v = compact(value);
    var match = v.match(/^(\d{4}-\d{2}-\d{2})/);
    return match ? match[1] : "";
  }

  function urgencyScore(task) {
    var score = 0;
    var p = lower(task.Priority);
    var s = lower(task.Status);
    var d = lower(task.Deadline);
    var date = dateOnly(task.Deadline);
    var today = todayIso();

    if (s.indexOf("top priority") !== -1) score += 70;
    if (s.indexOf("in progress") !== -1) score += 45;
    if (s === "priority" || s.indexOf("priority") !== -1) score += 32;
    if (p.indexOf("p0") === 0) score += 50;
    if (p.indexOf("p1") === 0) score += 28;
    if (d === "asap" || d === "immediate") score += 45;
    if (date && date <= today) score += 35;
    if (d.indexOf("weekday morning") !== -1 || d.indexOf("early morning") !== -1 || d.indexOf("daily") !== -1) score += 18;
    if (isWaiting(task)) score -= 14;

    return score;
  }

  function currentTasks() {
    return state.data.master.filter(function (task) {
      return !isInactive(task);
    });
  }

  function activeTodayTasks() {
    return currentTasks()
      .slice()
      .sort(function (a, b) { return urgencyScore(b) - urgencyScore(a); })
      .slice(0, 8);
  }

  function latestDailyPlan() {
    if (!state.data.today.length) return null;

    var exact = state.data.today.find(function (row) {
      return dateOnly(row.Date) === todayIso();
    });

    if (exact) return exact;

    return state.data.today.slice().sort(function (a, b) {
      return compact(b.Date).localeCompare(compact(a.Date));
    })[0];
  }

  function renderTaskCard(task, draggable) {
    var priority = compact(task.Priority);
    var status = compact(task.Status);
    var deadline = compact(task.Deadline);
    var html = "";

    html += '<article class="task-card ' + cardClass(task) + '"';
    if (draggable) {
      html += ' draggable="true" data-row="' + task.__row + '"';
    }
    html += ">";
    html += '<div class="task-meta">';
    html += '<span class="pill">' + escapeHtml(task.Project || "No project") + "</span>";
    if (priority) html += '<span class="pill ' + priorityClass(priority) + '">' + escapeHtml(priority) + "</span>";
    if (status) html += '<span class="pill ' + statusPillClass(status) + '">' + escapeHtml(status) + "</span>";
    html += "</div>";
    html += '<div class="task-title">' + escapeHtml(task.Task) + "</div>";

    if (compact(task["Next Action"])) {
      html += '<div class="next-action"><strong>Next:</strong> ' + escapeHtml(task["Next Action"]) + "</div>";
    }

    html += '<div class="task-footer">';
    if (deadline) html += "<span>Deadline: " + escapeHtml(deadline) + "</span>";
    if (compact(task.Owner)) html += "<span>Owner: " + escapeHtml(task.Owner) + "</span>";
    html += "</div>";
    html += "</article>";
    return html;
  }

  function setPage(title, subtitle) {
    els.pageTitle.textContent = title;
    els.pageSubtitle.textContent = subtitle;
  }

  function renderToday() {
    setPage("Today", "See what matters now and what needs the next move.");

    var tasks = activeTodayTasks();
    var p0 = tasks.filter(function (t) { return lower(t.Priority).indexOf("p0") === 0; }).length;
    var waiting = currentTasks().filter(isWaiting).length;
    var plan = latestDailyPlan();

    var html = '<div class="section-stack">';
    html += '<div class="grid-3">';
    html += '<div class="summary-card"><span class="label">Active tasks</span><span class="value">' + currentTasks().length + "</span></div>";
    html += '<div class="summary-card"><span class="label">P0 in today view</span><span class="value">' + p0 + "</span></div>";
    html += '<div class="summary-card"><span class="label">Waiting / delegated</span><span class="value">' + waiting + "</span></div>";
    html += "</div>";

    if (plan) {
      html += '<section class="panel">';
      html += '<div class="panel-header"><div><p class="eyebrow">DAILY PLAN</p><h2>' +
        (dateOnly(plan.Date) === todayIso() ? "Today’s plan" : "Latest saved daily plan") +
        '</h2></div><span class="muted">' + escapeHtml(plan.Date) + "</span></div>";
      html += '<div class="panel-body daily-plan">';
      ["Fixed Commitments", "Priority 1", "Priority 2", "Priority 3", "End-of-Day Notes"].forEach(function (field) {
        if (compact(plan[field])) {
          html += '<div class="daily-plan-item"><strong>' + escapeHtml(field) + "</strong>" + escapeHtml(plan[field]) + "</div>";
        }
      });
      html += "</div></section>";
    }

    html += '<section class="panel">';
    html += '<div class="panel-header"><div><p class="eyebrow">LIVE FROM MASTER TASKS</p><h2>Active today</h2></div><span class="muted">Ranked by priority, status and deadline</span></div>';
    html += '<div class="panel-body"><div class="task-list">';
    if (tasks.length) {
      tasks.forEach(function (task) { html += renderTaskCard(task, false); });
    } else {
      html += '<div class="empty">No active tasks found.</div>';
    }
    html += "</div></div></section></div>";

    els.content.innerHTML = html;
  }

  function renderPriorities() {
    setPage("Priorities", "Keep the active work visible without paused, backlog or completed noise.");

    var active = currentTasks();
    var top = active.filter(function (task) {
      var p = lower(task.Priority);
      var s = lower(task.Status);
      return p.indexOf("p0") === 0 || s.indexOf("top priority") !== -1;
    }).sort(function (a, b) { return urgencyScore(b) - urgencyScore(a); });

    var secondary = active.filter(function (task) {
      if (top.indexOf(task) !== -1) return false;
      var p = lower(task.Priority);
      return p.indexOf("p1") === 0 || lower(task.Status).indexOf("priority") !== -1;
    }).sort(function (a, b) { return urgencyScore(b) - urgencyScore(a); });

    var html = '<div class="grid-2">';
    html += '<section class="panel"><div class="panel-header"><div><p class="eyebrow">TOP PRIORITIES</p><h2>Critical focus</h2></div><span class="muted">' + top.length + " items</span></div>";
    html += '<div class="panel-body"><div class="task-list">';
    if (top.length) top.forEach(function (task) { html += renderTaskCard(task, false); });
    else html += '<div class="empty">No current top priorities.</div>';
    html += "</div></div></section>";

    html += '<section class="panel"><div class="panel-header"><div><p class="eyebrow">SECONDARY WORK</p><h2>High-priority support</h2></div><span class="muted">' + secondary.length + " items</span></div>";
    html += '<div class="panel-body"><div class="task-list">';
    if (secondary.length) secondary.forEach(function (task) { html += renderTaskCard(task, false); });
    else html += '<div class="empty">No secondary priorities.</div>';
    html += "</div></div></section>";
    html += "</div>";

    els.content.innerHTML = html;
  }

  function normaliseStage(task) {
    var s = lower(task.Status);
    if (s.indexOf("completed") !== -1) return "Completed";
    if (s.indexOf("paused") !== -1 || s.indexOf("backlog") !== -1) return "Paused";
    if (s.indexOf("waiting") !== -1 || s.indexOf("delegated") !== -1) return "Waiting";
    if (s.indexOf("in progress") !== -1) return "In Progress";
    return "To Do";
  }

  async function updateTaskStatus(row, newStatus) {
    var task = state.data.master.find(function (t) { return t.__row === Number(row); });
    if (!task) throw new Error("Task is no longer present in the loaded sheet.");

    var check = await readRange("'Master Tasks'!A" + row + ":B" + row);
    var current = check[0] || [];
    if (compact(current[0]) !== compact(task.Project) || compact(current[1]) !== compact(task.Task)) {
      await loadAll();
      throw new Error("The sheet changed after the dashboard loaded. It has been refreshed; move the task again.");
    }

    var range = "'Master Tasks'!E" + row;
    var url = valuesUrl(range) + "?valueInputOption=USER_ENTERED";

    await apiFetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        range: range,
        majorDimension: "ROWS",
        values: [[newStatus]]
      })
    });

    task.Status = newStatus;
  }

  function attachKanbanHandlers() {
    var draggedRow = null;

    els.content.querySelectorAll(".kanban .task-card").forEach(function (card) {
      card.addEventListener("dragstart", function (event) {
        draggedRow = card.dataset.row;
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("text/plain", draggedRow);
      });
    });

    els.content.querySelectorAll(".kanban-column").forEach(function (column) {
      column.addEventListener("dragover", function (event) {
        event.preventDefault();
        column.classList.add("drag-over");
      });

      column.addEventListener("dragleave", function () {
        column.classList.remove("drag-over");
      });

      column.addEventListener("drop", async function (event) {
        event.preventDefault();
        column.classList.remove("drag-over");

        var row = event.dataTransfer.getData("text/plain") || draggedRow;
        var stage = column.dataset.stage;
        if (!row || !stage) return;

        try {
          await updateTaskStatus(row, stage);
          showToast("Task moved to " + stage + ".");
          renderKanban();
        } catch (err) {
          showToast(err.message || "Could not update task status.", true);
        }
      });
    });
  }

  function renderKanban() {
    setPage("Kanban", "Move a card to update its status in Master Tasks.");

    var stages = ["To Do", "In Progress", "Waiting", "Paused", "Completed"];
    var groups = {};
    stages.forEach(function (stage) { groups[stage] = []; });

    state.data.master.forEach(function (task) {
      groups[normaliseStage(task)].push(task);
    });

    Object.keys(groups).forEach(function (stage) {
      groups[stage].sort(function (a, b) { return urgencyScore(b) - urgencyScore(a); });
    });

    var html = '<div class="kanban-wrap"><div class="kanban">';
    stages.forEach(function (stage) {
      html += '<section class="kanban-column" data-stage="' + escapeHtml(stage) + '">';
      html += '<div class="kanban-column-header"><span>' + escapeHtml(stage) + '</span><span class="kanban-count">' + groups[stage].length + "</span></div>";
      html += '<div class="kanban-cards">';
      if (groups[stage].length) {
        groups[stage].forEach(function (task) { html += renderTaskCard(task, true); });
      } else {
        html += '<div class="empty">No tasks</div>';
      }
      html += "</div></section>";
    });
    html += "</div></div>";

    els.content.innerHTML = html;
    attachKanbanHandlers();
  }

  function optionList(values, selected) {
    var unique = Array.from(new Set(values.map(compact).filter(Boolean))).sort();
    var html = '<option value="">All</option>';
    unique.forEach(function (value) {
      html += '<option value="' + escapeHtml(value) + '"' + (value === selected ? " selected" : "") + ">" + escapeHtml(value) + "</option>";
    });
    return html;
  }

  function renderMaster() {
    setPage("Master List", "Search and filter the complete operational task list.");

    var html = '<section class="panel"><div class="panel-body">';
    html += '<div class="filters">';
    html += '<input id="taskSearch" type="search" placeholder="Search task, project or next action…" />';
    html += '<select id="projectFilter" aria-label="Project filter">' + optionList(state.data.master.map(function (t) { return t.Project; }), "") + "</select>";
    html += '<select id="priorityFilter" aria-label="Priority filter">' + optionList(state.data.master.map(function (t) { return t.Priority; }), "") + "</select>";
    html += '<select id="statusFilter" aria-label="Status filter">' + optionList(state.data.master.map(function (t) { return t.Status; }), "") + "</select>";
    html += '<select id="ownerFilter" aria-label="Owner filter">' + optionList(state.data.master.map(function (t) { return t.Owner; }), "") + "</select>";
    html += '<select id="deadlineFilter" aria-label="Deadline filter"><option value="">All deadlines</option><option value="due">Due / overdue</option><option value="urgent">ASAP / Immediate</option><option value="none">No deadline</option></select>';
    html += "</div>";
    html += '<div id="masterTable"></div>';
    html += "</div></section>";

    els.content.innerHTML = html;

    ["taskSearch", "projectFilter", "priorityFilter", "statusFilter", "ownerFilter", "deadlineFilter"].forEach(function (id) {
      document.getElementById(id).addEventListener("input", updateMasterTable);
      document.getElementById(id).addEventListener("change", updateMasterTable);
    });

    updateMasterTable();
  }

  function updateMasterTable() {
    var q = lower(document.getElementById("taskSearch").value);
    var project = document.getElementById("projectFilter").value;
    var priority = document.getElementById("priorityFilter").value;
    var status = document.getElementById("statusFilter").value;
    var owner = document.getElementById("ownerFilter").value;
    var deadlineMode = document.getElementById("deadlineFilter").value;
    var today = todayIso();

    var rows = state.data.master.filter(function (task) {
      var haystack = lower([task.Project, task.Task, task["Next Action"], task.Dependencies, task.Owner].join(" "));
      if (q && haystack.indexOf(q) === -1) return false;
      if (project && compact(task.Project) !== project) return false;
      if (priority && compact(task.Priority) !== priority) return false;
      if (status && compact(task.Status) !== status) return false;
      if (owner && compact(task.Owner) !== owner) return false;

      var d = compact(task.Deadline);
      var date = dateOnly(d);
      if (deadlineMode === "due" && !(date && date <= today)) return false;
      if (deadlineMode === "urgent" && !["asap", "immediate"].includes(lower(d))) return false;
      if (deadlineMode === "none" && d) return false;

      return true;
    });

    var html = '<div class="table-wrap"><table><thead><tr>';
    ["Project", "Task", "Priority", "Status", "Deadline", "Owner", "Next Action"].forEach(function (h) {
      html += "<th>" + escapeHtml(h) + "</th>";
    });
    html += "</tr></thead><tbody>";

    rows.forEach(function (task) {
      html += "<tr>";
      html += "<td>" + escapeHtml(task.Project) + "</td>";
      html += "<td><strong>" + escapeHtml(task.Task) + "</strong></td>";
      html += '<td><span class="pill ' + priorityClass(task.Priority) + '">' + escapeHtml(task.Priority) + "</span></td>";
      html += '<td><span class="pill ' + statusPillClass(task.Status) + '">' + escapeHtml(task.Status) + "</span></td>";
      html += "<td>" + escapeHtml(task.Deadline) + "</td>";
      html += "<td>" + escapeHtml(task.Owner) + "</td>";
      html += "<td>" + escapeHtml(task["Next Action"]) + "</td>";
      html += "</tr>";
    });

    html += "</tbody></table></div>";
    html += '<p class="muted" style="margin:12px 0 0;">' + rows.length + " of " + state.data.master.length + " tasks shown.</p>";

    document.getElementById("masterTable").innerHTML = html;
  }

  async function updateCrmRow(row, stage, followUp, nextAction) {
    var contact = state.data.crm.find(function (c) { return c.__row === Number(row); });
    if (!contact) throw new Error("Contact is no longer present in the loaded sheet.");

    var check = await readRange("'CRM'!A" + row + ":B" + row);
    var current = check[0] || [];
    var idMatches = compact(contact["Contact ID"]) && compact(current[0]) === compact(contact["Contact ID"]);
    var nameMatches = !compact(contact["Contact ID"]) && compact(current[1]) === compact(contact.Name);

    if (!idMatches && !nameMatches) {
      await loadAll();
      throw new Error("The CRM sheet changed after the dashboard loaded. It has been refreshed; save again.");
    }

    var requests = [
      { range: "'CRM'!F" + row, value: stage },
      { range: "'CRM'!J" + row, value: followUp },
      { range: "'CRM'!K" + row, value: nextAction }
    ];

    for (var i = 0; i < requests.length; i += 1) {
      var item = requests[i];
      await apiFetch(valuesUrl(item.range) + "?valueInputOption=USER_ENTERED", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          range: item.range,
          majorDimension: "ROWS",
          values: [[item.value]]
        })
      });
    }
  }

  function attachCrmHandlers() {
    els.content.querySelectorAll("[data-crm-save]").forEach(function (button) {
      button.addEventListener("click", async function () {
        var row = Number(button.dataset.crmSave);
        var stage = document.getElementById("crm-stage-" + row).value;
        var followUp = document.getElementById("crm-follow-" + row).value;
        var action = document.getElementById("crm-action-" + row).value;

        button.disabled = true;
        button.textContent = "Saving…";

        try {
          await updateCrmRow(row, stage, followUp, action);
          var contact = state.data.crm.find(function (c) { return c.__row === row; });
          if (contact) {
            contact.Stage = stage;
            contact["Next Follow-up"] = followUp;
            contact["Next Action"] = action;
          }
          showToast("CRM follow-up updated.");
          button.textContent = "Saved";
        } catch (err) {
          showToast(err.message || "Could not update CRM.", true);
          button.textContent = "Save";
        } finally {
          button.disabled = false;
          window.setTimeout(function () { button.textContent = "Save"; }, 1200);
        }
      });
    });
  }

  function renderCrm() {
    setPage("CRM", "Track the next conversation, follow-up and action from the existing CRM sheet.");

    if (!state.data.crm.length) {
      els.content.innerHTML =
        '<section class="panel"><div class="panel-header"><div><p class="eyebrow">CURRENT SHEET SCHEMA</p><h2>CRM is ready, but empty</h2></div></div>' +
        '<div class="panel-body"><div class="empty">The CRM tab currently contains its headers but no contact rows yet. The current schema includes Contact ID, Name, Email, WhatsApp, Source, Stage, Interest, Potential Offer, Last Contact, Next Follow-up, Next Action, Notes and Owner. It does not currently include a separate Organisation field, so this MVP does not silently add one.</div></div></section>';
      return;
    }

    var html = '<section class="panel"><div class="panel-body"><div class="table-wrap"><table><thead><tr>';
    ["Contact", "Source", "Interest / Offer", "Last Contact", "Follow-up control", "Owner"].forEach(function (h) {
      html += "<th>" + h + "</th>";
    });
    html += "</tr></thead><tbody>";

    state.data.crm.forEach(function (c) {
      html += "<tr>";
      html += "<td><strong>" + escapeHtml(c.Name) + '</strong><div class="small">' + escapeHtml(c.Email || c.WhatsApp) + "</div></td>";
      html += "<td>" + escapeHtml(c.Source) + "</td>";
      html += "<td>" + escapeHtml(c.Interest) + '<div class="small">' + escapeHtml(c["Potential Offer"]) + "</div></td>";
      html += "<td>" + escapeHtml(c["Last Contact"]) + "</td>";
      html += '<td><div class="crm-edit">';
      html += '<input id="crm-stage-' + c.__row + '" value="' + escapeHtml(c.Stage) + '" placeholder="Stage" />';
      html += '<input id="crm-follow-' + c.__row + '" value="' + escapeHtml(c["Next Follow-up"]) + '" placeholder="Next follow-up" />';
      html += '<input id="crm-action-' + c.__row + '" value="' + escapeHtml(c["Next Action"]) + '" placeholder="Next action" />';
      html += '<button class="button secondary" data-crm-save="' + c.__row + '">Save</button>';
      html += "</div></td>";
      html += "<td>" + escapeHtml(c.Owner) + "</td>";
      html += "</tr>";
    });

    html += "</tbody></table></div></div></section>";
    els.content.innerHTML = html;
    attachCrmHandlers();
  }

  function renderMetrics() {
    setPage("Business Metrics", "A simple summary of the metrics already defined in the spreadsheet.");

    if (!state.data.metrics.length) {
      var headers = state.headers.metrics.filter(function (h) { return h && h !== "Date"; });
      var headerText = headers.length ? headers.join(", ") : "No metric fields found";
      els.content.innerHTML =
        '<section class="panel"><div class="panel-header"><div><p class="eyebrow">NO DATA YET</p><h2>Metric schema is ready</h2></div></div>' +
        '<div class="panel-body"><div class="empty">There are currently no recorded Business Metrics rows. The dashboard will not invent values. Existing fields are: ' +
        escapeHtml(headerText) +
        ".</div></div></section>";
      return;
    }

    var latest = state.data.metrics[state.data.metrics.length - 1];
    var headers = state.headers.metrics.filter(function (h) { return h && h !== "Date"; });
    var html = '<div class="section-stack"><div><p class="eyebrow">LATEST RECORDED ROW · ' + escapeHtml(latest.Date) + '</p><div class="metric-grid">';

    headers.forEach(function (h) {
      html += '<div class="metric-card"><div class="metric-label">' + escapeHtml(h) + '</div><div class="metric-value">' + escapeHtml(latest[h]) + "</div></div>";
    });

    html += '</div></div><section class="panel"><div class="panel-header"><h2>History</h2></div><div class="panel-body"><div class="table-wrap"><table><thead><tr>';
    state.headers.metrics.forEach(function (h) { html += "<th>" + escapeHtml(h) + "</th>"; });
    html += "</tr></thead><tbody>";

    state.data.metrics.slice().reverse().forEach(function (row) {
      html += "<tr>";
      state.headers.metrics.forEach(function (h) { html += "<td>" + escapeHtml(row[h]) + "</td>"; });
      html += "</tr>";
    });

    html += "</tbody></table></div></div></section></div>";
    els.content.innerHTML = html;
  }

  function render() {
    if (!state.token) return;

    document.querySelectorAll(".nav-item").forEach(function (item) {
      item.classList.toggle("active", item.dataset.view === state.currentView);
    });

    if (state.currentView === "today") renderToday();
    if (state.currentView === "priorities") renderPriorities();
    if (state.currentView === "kanban") renderKanban();
    if (state.currentView === "master") renderMaster();
    if (state.currentView === "crm") renderCrm();
    if (state.currentView === "metrics") renderMetrics();
  }

  els.nav.addEventListener("click", function (event) {
    var button = event.target.closest(".nav-item");
    if (!button) return;
    state.currentView = button.dataset.view;

    if (!state.token) {
      openSetup();
      return;
    }
    render();
  });

  els.connectButton.addEventListener("click", connectGoogle);
  if (els.welcomeConnect) els.welcomeConnect.addEventListener("click", connectGoogle);
  els.refreshButton.addEventListener("click", loadAll);
  els.setupButton.addEventListener("click", openSetup);

  els.setupForm.addEventListener("submit", function (event) {
    event.preventDefault();
    saveSetup();
    els.setupDialog.close();
  });

  els.saveSetup.addEventListener("click", function (event) {
    event.preventDefault();
    saveSetup();
    els.setupDialog.close();
  });

  setConnection(false);

  if (!state.config.clientId) {
    window.setTimeout(openSetup, 250);
  }
})();
