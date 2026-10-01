# Hexology Business HQ

A lightweight internal dashboard for **Hexology Execution HQ**.

The Google Sheet remains the operational source of truth. This app does not create or require a separate database.

## MVP

- Today: current active work, ranked by urgency and priority
- Priorities: top and secondary active priorities without completed/paused/backlog clutter
- Kanban: To Do, In Progress, Waiting, Paused, Completed
- Master List: search and filters for project, priority, status, owner and deadline
- CRM: uses the existing CRM sheet schema
- Business Metrics: uses only metrics already present in the spreadsheet
- Task status write-back: dragging a task to another Kanban column updates the Status cell in Master Tasks

## Architecture

This repository intentionally uses plain HTML, CSS and JavaScript.

- Frontend: static files
- Data: Google Sheets API
- Authentication: Google Identity Services OAuth in the browser
- Database: none
- Backend: none
- Secrets in GitHub: none

The Google OAuth client ID for Hexology Business HQ is now preconfigured in the app. A browser OAuth client ID is a public identifier, not a client secret. No client secret is used by this project.

The preconfigured spreadsheet is:

- Hexology Execution HQ
- Spreadsheet ID: 1YvIGYcy9DOSiOg3fD3tw4D5eml2p3W5opT0-MpR6-xM

## One-time Google configuration

1. In Google Cloud Console, create or choose a project.
2. Enable the **Google Sheets API**.
3. Configure the OAuth consent screen.
4. Create an **OAuth 2.0 Client ID** of type **Web application**.
5. Add the app origin to **Authorised JavaScript origins**.
   - For local testing: http://localhost:4173
   - Add the production origin later when the app is deployed.
6. Open the Business HQ, paste the Client ID in Setup, and select **Connect Google**.

The app requests the spreadsheets scope because Kanban status changes need write access. Google still enforces the user's existing permission to the sheet.

## Run locally

Serve the folder over HTTP. For example:

    python -m http.server 4173

Then open:

    http://localhost:4173

OAuth will not work reliably from a file:// URL.

## Current spreadsheet observations

The source workbook currently contains:

- Master Tasks: populated and acting as the primary task database.
- Today: historical daily planning rows; the app also derives a live Today list from Master Tasks so it remains useful when today's row has not yet been added.
- Business Metrics: schema exists but currently has no recorded metric rows.
- Ideas Inbox: populated.
- Backlog and Decisions: populated.
- Weekly Goals: schema exists but currently has no rows.
- Kanban: schema exists but currently has no rows; the app derives Kanban from Master Tasks instead of duplicating task data.
- CRM: schema exists but currently has no contacts.

The CRM sheet currently has no Organisation column. The MVP does not silently change that schema.

## Status mapping

Existing statuses are normalised visually into five columns without rewriting them until a card is moved:

- To Do
- In Progress
- Waiting
- Paused
- Completed

When a card is moved, the Master Tasks Status cell is updated to the canonical column name.

## Repository note

This implementation is currently placed in the existing private repository `augustodocarmo/claude-code-routine` because it was empty and safe to repurpose without touching production Hexology, PMP, Journal, Bushido or AJAI code. The repository can be renamed to `hexology-business-hq` later without changing the app architecture.
