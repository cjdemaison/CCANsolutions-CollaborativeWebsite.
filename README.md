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

The system simulates an internal recruiting dashboard with talent management, follow-up tracking, and candidate profile functionality.

This system is fully deployed and operating in a live production environment.

Live Site:  
https://acutectalent.com  

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
- Filtering by status and bucket  
- Clickable candidate profile navigation  
- Clickable phone and email links  

---

### Candidate Profile Page

- Displays full candidate details  
- Resume upload and viewing  
- Follow-up history tracking  
- Notes tracking  
- Navigation back to dashboard  

---

### Authentication System

- Login page implemented  
- Session-based access control  
- Protected routes using require_login.php  
- Prevents unauthorized access  
- Session timeout handling  

---

## 5. Sprint 5 Features

The following features were implemented during Sprint 5:

- Full authentication system with session protection  
- Resume upload improvements and file storage  
- Dashboard analytics connected to live database  
- Talent Search search and filtering improvements  
- Follow-up history tracking  
- Mobile responsiveness improvements  

---

## 6. Test Credentials

Use the following credentials to access the system:

Username: test  
Password: test123  

---

## 7. Sprint 5 Traceability

- Authentication System → PR #20, PR #21  
- Resume Upload Improvements → PR #22  
- Dashboard Analytics → PR #23  
- Search & Filtering → PR #24  
- Follow-Up Tracking → PR #25  
- UI & Mobile Improvements → PR #26, PR #27  
- API Optimization → PR #28  

---

## 8. Backend (API Folder)

The /api directory contains backend PHP endpoints that:

- Connect to MySQL database  
- Handle candidate data retrieval and updates  
- Manage status and bucket changes  
- Store and retrieve follow-up data  
- Provide dashboard metrics  
- Return structured JSON responses  

Example endpoints:

- get_leads.php  
- add_lead.php  
- update_lead.php  
- delete_lead.php  

---

## 9. Database

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

## 10. Development Workflow

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

## 11. Sprint Technical Logs

For detailed planning, testing, and progress tracking, see:

SPRINT_LOG.md  

Includes:

- Task assignments  
- Feature implementation  
- Backend updates  
- Testing results  
- Bug tracking  

---

## 12. Current System Status

### Completed

- Full authentication system  
- Session protection across all pages  
- Resume upload system  
- Dashboard metrics connected to database  
- Talent Search search and filtering  
- Follow-up history tracking  
- Mobile responsiveness improvements  
- UI/UX cleanup  
- Production system fully operational  

### In Progress

- Advanced analytics (source tracking)  
- Export functionality (CSV/Excel)  
- Final demo preparation  

---

## 13. Live Production System

Production URL:

https://acutectalent.com  

This version connects to a live MySQL database and demonstrates a fully functional ATS in a real hosting environment.
