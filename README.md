# CCANsolutions Collaborative Website  
CMIS 4920 Capstone Project  

---

## 1. Project Overview

CCANsolutions is a collaborative web-based Applicant Tracking System (ATS) prototype developed for the CMIS 4920 Capstone course.

The purpose of this project is to demonstrate:

- Team-based software development
- Structured GitHub workflow with branching
- Agile sprint documentation
- Frontend and backend integration
- Database connectivity
- UI/UX implementation

The system simulates an internal recruiting dashboard with talent management, follow-up tracking, and candidate profile features.

This system is fully deployed and operating in a live production environment.

Live Site:  
https://acutectalent.com :contentReference[oaicite:0]{index=0}

---

## 2. Setup & Installation

### Dependencies

- Web Browser (Chrome recommended)
- MAMP (for local PHP/MySQL environment)
- Git
- GitHub account
- Optional: VS Code

---

### Local Environment Setup (MAMP)

1. Place the project folder inside:  
   /Applications/MAMP/htdocs/CCANsolutions  

2. Start MAMP  

3. Visit in browser:  
   http://localhost:8888/CCANsolutions/home.php  

4. Database management:  
   http://localhost:8888/phpMyAdmin  

---

## 3. Production Deployment (Hostinger)

This system is deployed using:

- Hostinger Web Hosting  
- Custom domain: acutectalent.com  
- PHP backend  
- MySQL database  
- Public hosting environment  

Deployment structure:

public_html/

- home.php  
- recruiting.php  
- candidate_profile.php  
- login.php  
- require_login.php  
- script.js  
- style.css  
- api/  
- db.php  

The live deployment allows full system functionality including:

- Secure login and authentication  
- Viewing and editing candidates  
- Resume upload and storage  
- Follow-up tracking and history  
- Profile navigation  

---

## 4. Features & Usage

### Dashboard

- Follow-up Calendar UI  
  - Dynamic month grid  
  - Clickable day selection  
  - Displays scheduled follow-ups  
  - Clickable candidate navigation  

- Today’s To-Dos section  
  - Interactive UI layout  

- Real-Time Metrics  
  - Total leads  
  - New leads  
  - Follow-ups today  
  - Interviewing  
  - Offered  
  - Hired  

---

### Talent Search (Recruiting Page)

- Candidate search functionality (name, email, phone)  
- Status management dropdown  
- Bucket assignment dropdown  
- Quick notes editing  
- Delete functionality  
- Follow-up date field  
- Improved filtering and usability  
- Clickable candidate profile navigation  
  - Clicking a candidate name opens the profile page  
  - Phone numbers and email addresses are clickable  

---

### Candidate Profile Page

- Displays full candidate details  
- Resume upload and viewing  
- Follow-up history tracking  
- Notes tracking  
- Easy navigation back to dashboard  

---

### Authentication System

- Login page implemented  
- Session-based access control  
- Protected routes using require_login.php  
- Prevents unauthorized access  
- Session timeout handling  

---

## 5. Backend (API Folder)

The /api directory contains backend PHP endpoints that:

- Connect to MySQL database  
- Handle candidate data retrieval and updates  
- Manage status and bucket changes  
- Store and retrieve follow-up data  
- Provide dashboard metrics  
- Return structured JSON responses  

---

## 6. Database

- MySQL (phpMyAdmin and Hostinger)  
- Storage engine: InnoDB  
- Collation: utf8mb4_unicode_ci  

Leads table includes:

- id  
- first_name  
- last_name  
- phone  
- email  
- location  
- follow_up  
- status  
- bucket  
- notes  
- created_at  

Additional support for:

- Resume file storage  
- Follow-up tracking updates  

---

## 7. Development Workflow

This project follows a structured Git branching strategy:

main  
Stable production-ready code only  

develop  
Main integration branch  

feature/*  
Individual feature branches  

Workflow Process:

1. Create feature branch  
2. Implement changes  
3. Commit changes  
4. Submit pull request  
5. Review and merge  
6. Deploy to production  

---

## 8. Sprint Technical Logs

For detailed planning, testing, and progress tracking, see:

SPRINT_LOG.md  

Includes:

- Task assignments  
- UI implementation notes  
- Backend development  
- Database adjustments  
- Feature testing  

---

## 9. Current Sprint Progress (Sprint 5)

### Completed

- Full authentication system implementation  
- Session protection across all pages  
- Resume upload system  
- Dashboard metrics connected to database  
- Talent Search search and filtering improvements  
- Follow-up history tracking  
- Mobile responsiveness improvements  
- UI/UX cleanup and consistency fixes  
- Production system fully operational  

### In Progress

- Final demo video  
- Advanced analytics (source tracking)  
- Export functionality (CSV/Excel)  

---

## 10. Recent Feature Updates

### Resume Upload System

Users can now upload resumes:

- During candidate creation  
- After candidate creation  

Resumes are stored on the server and linked to candidate profiles.

---

### Follow-Up History Tracking

- Tracks changes to follow-up dates and notes  
- Visible within candidate profile  
- Integrated with dashboard calendar  

---

### Authentication & Security

- Full login system implemented  
- Protected access to all system pages  
- Prevents direct URL access without login  

---

## 11. Live Production System

Production URL:

https://acutectalent.com :contentReference[oaicite:1]{index=1}  

This version connects to a live MySQL database and demonstrates a fully functional ATS in a real hosting environment.
