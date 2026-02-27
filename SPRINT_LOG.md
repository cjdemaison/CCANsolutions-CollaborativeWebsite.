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
- Implement clickable candidate profile navigation
- Deploy system to production environment

---

| Task Description                              | Assigned Owner     | Priority | Status      |
|-----------------------------------------------|--------------------|----------|------------|
| GitHub workflow & branch setup                | @Cm192724          | High     | Completed  |
| Dashboard calendar implementation             | @cjdemaison        | High     | Completed  |
| To-Do section UI                              | @cjdemaison        | Medium   | Completed  |
| Talent Search table layout                    | @cjdemaison        | High     | Completed  |
| Clickable candidate profile implementation    | @cjdemaison        | High     | Completed  |
| Calendar follow-up clickable integration     | @cjdemaison        | High     | Completed  |
| Navigation cleanup and styling refinements    | @Ariyanamoore      | Medium   | Completed  |
| Login page HTML design                        | @Ariyanamoore      | High     | Completed  |
| Backend API folder structure                  | @nbryner1121       | High     | Completed  |
| Database schema configuration                 | @cjdemaison        | High     | Completed  |
| Production deployment (Hostinger)            | @cjdemaison        | High     | Completed  |
| Documentation updates                         | Team               | Medium   | Completed  |

---

## 2. Progress & Implementation Details

### Dashboard Implementation

- Dynamic monthly calendar grid
- Month navigation controls
- Clickable day selection
- Follow-up display section
- Clickable candidate names from calendar follow-ups
- Today’s To-Dos UI
- Resolved character encoding issue

---

### Talent Search System

- Candidate listing table
- Status dropdown interaction
- Bucket assignment functionality
- Quick notes field
- Delete functionality
- Bulk actions UI
- Clickable candidate name opens candidate profile page
- Clickable phone number (tel: link)
- Clickable email address (mailto: link)

---

### Candidate Profile Feature (New)

- Implemented candidate_profile.html page
- Connected Talent Search candidate names to profile page
- Connected Calendar follow-ups to profile page
- Passed candidate ID through URL parameter
- Enabled recruiter navigation between dashboard and profile

---

### Login Page

- HTML structure implemented
- Layout and styling applied
- Navigation routing connected
- Authentication logic planned for future sprint

---

### Backend Structure

- Created /api directory
- Structured PHP endpoints
- Configured database connection file
- Verified MySQL integration via phpMyAdmin
- Confirmed InnoDB engine and utf8mb4_unicode_ci collation

---

### Production Deployment

- Deployed system to Hostinger
- Connected domain: acutectalent.com
- Verified API endpoints working in production
- Confirmed database connectivity
- Confirmed clickable profile navigation working on live system

---

## 3. System Test Report

| Test Case                                   | Type   | Result | Evidence |
|--------------------------------------------|--------|--------|----------|
| Dashboard loads correctly                   | Manual | Passed | Local test |
| Calendar renders full month                 | Manual | Passed | UI verification |
| Month navigation works                      | Manual | Passed | UI verification |
| Talent Search loads                         | Manual | Passed | Local test |
| Candidate profile link works                | Manual | Passed | UI verification |
| Calendar follow-up profile link works      | Manual | Passed | UI verification |
| Phone link opens dialer                    | Manual | Passed | UI test |
| Email link opens email client              | Manual | Passed | UI test |
| Delete functionality                        | Manual | Passed | UI test |
| Login page loads and routes correctly       | Manual | Passed | UI verification |
| Database connectivity                       | Manual | Passed | phpMyAdmin |
| Production deployment operational           | Manual | Passed | acutectalent.com |

---

## 4. Issues & Resolutions

- Character encoding error in dashboard header  
  Severity: Medium  
  Status: Fixed  

- Initial database column mismatch  
  Severity: High  
  Status: Fixed  

- GitHub authentication issue during local setup  
  Severity: Medium  
  Status: Resolved  

- Script merge conflict during profile feature integration  
  Severity: High  
  Status: Resolved  

---

## 5. Sprint 3 Roadmap

Sprint 3 will focus on advanced system functionality:

- Full login authentication system
- Session management
- User account roles
- Role-based access control
- Profile editing enhancements
- Follow-up history tracking
- Backend To-Do persistence

---

## 6. Sprint Summary

Sprint 2 transitioned the project into a functional recruiting system.

Major accomplishments included:

- Fully functional Talent Search system
- Clickable candidate profile implementation
- Calendar follow-up navigation integration
- Backend database integration
- Successful live deployment to Hostinger

The system is now operating as a real-world ATS prototype and ready for authentication and advanced feature development in Sprint 3.
