# Sprint 2 Technical Log

---

## 1. Planning & Assignments

- Sprint Dates: February 2026
- Team Name: CCANsolutions
- Members Present: @cjdemaison, @nbryner1121, @cm192724, @Ariyanamoore

### Sprint 2 Goals:
- Implement functional dashboard UI
- Develop Talent Search interface
- Create login page UI
- Establish backend folder structure
- Connect system to database
- Prepare roadmap for Sprint 3 feature expansion

---

| Task Description                              | Assigned Owner     | Priority | Status      |
|-----------------------------------------------|--------------------|----------|------------|
| GitHub workflow & branch setup                | @Cm192724          | High     | Completed  |
| Dashboard calendar implementation             | @cjdemaison        | High     | Completed  |
| To-Do section UI                              | @cjdemaison        | Medium   | Completed  |
| Talent Search table layout                    | @cjdemaison        | High     | Completed  |
| Navigation cleanup and styling refinements    | @Ariyanamoore      | Medium   | Completed  |
| Login page HTML design                        | @Ariyanamoore      | High     | Completed  |
| Backend API folder structure                  | @nbryner1121       | High     | Completed  |
| Database schema configuration                 | @cjdemaison        | High     | Completed  |
| Documentation updates                         | Team               | Medium   | Completed  |

---

## 2. Progress & Implementation Details

### Dashboard Implementation

- Dynamic monthly calendar grid
- Month navigation controls
- Clickable day selection
- Follow-up display section
- Today’s To-Dos UI
- Resolved character encoding issue

### Talent Search System

- Candidate listing table
- Status dropdown interaction
- Bucket assignment functionality
- Quick notes field
- Delete functionality
- Bulk actions UI

### Login Page

- HTML structure implemented
- Layout and styling applied
- Navigation routing connected
- Authentication logic planned for future sprint

### Backend Structure

- Created /api directory
- Structured PHP endpoint placeholders
- Configured database connection file
- Verified MySQL integration via phpMyAdmin
- Confirmed InnoDB engine and utf8mb4_unicode_ci collation

---

## 3. System Test Report

| Test Case                                   | Type   | Result | Evidence |
|--------------------------------------------|--------|--------|----------|
| Dashboard loads correctly                   | Manual | Passed | Local test |
| Calendar renders full month                 | Manual | Passed | UI verification |
| Month navigation works                      | Manual | Passed | UI verification |
| Talent Search loads                         | Manual | Passed | Local test |
| Status dropdown interaction                 | Manual | Passed | UI test |
| Delete functionality                        | Manual | Passed | UI test |
| Login page loads and routes correctly       | Manual | Passed | UI verification |
| Database connectivity                       | Manual | Passed | phpMyAdmin |

---

## 4. Issues & Resolutions

- Character encoding error in dashboard header  
  - Severity: Medium  
  - Status: Fixed  

- Initial database column mismatch  
  - Severity: High  
  - Status: Fixed  

- GitHub authentication issue during local setup  
  - Severity: Medium  
  - Status: Resolved  

---

## 5. Sprint 3 Roadmap

Sprint 3 will focus on deeper feature expansion and integration:

- Clickable candidate names in Talent Search table
- Dedicated Candidate Profile page
  - Work history section
  - Interview notes section
  - Follow-up history timeline
- Calendar-to-candidate clickable integration
- Backend persistence for To-Do entries
- Login authentication logic implementation
- Role-based access control planning

Sprint 3 development will be distributed across team members to balance feature ownership.

---

## 6. Sprint Summary

Sprint 2 transitioned the project from structural setup into a working prototype. The dashboard, recruiting interface, login UI, and backend structure are now operational. The system foundation is stable and ready for feature-level expansion in Sprint 3.
