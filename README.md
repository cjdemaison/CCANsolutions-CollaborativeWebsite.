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

The system simulates an internal recruiting dashboard with talent management and follow-up tracking features.

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

2. Start MAMP.

3. Visit in browser:
   http://localhost:8888/CCANsolutions/home.html

4. Database management:
   http://localhost:8888/phpMyAdmin

---

## 3. Features & Usage

### Dashboard

- Follow-up Calendar UI
  - Dynamic month grid
  - Clickable day selection
  - Displays scheduled follow-ups
- Today’s To-Dos section
  - Add tasks
  - Interactive UI layout
- Clean responsive dashboard layout

---

### Talent Search (Recruiting Page)

- Candidate search functionality
- Status management dropdown
- Bucket assignment dropdown
- Quick notes editing
- Delete functionality
- Bulk actions support
- Follow-up date field
- Location and candidate metadata display

---

### Backend (API Folder)

The /api directory contains backend PHP endpoints that:

- Connect to MySQL database
- Handle candidate data retrieval
- Manage status and bucket updates
- Support follow-up data storage
- Provide structured JSON responses

---

## 4. Database

- MySQL (via phpMyAdmin)
- Storage engine: InnoDB
- Collation: utf8mb4_unicode_ci

Leads table includes:
- id
- name
- phone
- email
- location
- follow_up
- status
- bucket
- notes

---

## 5. Development Workflow

This project follows a structured Git branching strategy:

- main  
  Stable production-ready code only

- develop  
  Main integration branch

- feature/*  
  Individual feature branches  
  Example: feature/dashboard-calendar  
  Example: feature/talent-search-updates  

### Workflow Process

1. Create feature branch
2. Implement changes
3. Commit with descriptive message
4. Submit pull request
5. Review and merge into develop
6. Merge develop into main

---

## 6. Sprint Technical Logs

For detailed planning, testing, and progress tracking, see:

SPRINT_LOG.md

Includes:
- Task assignments
- UI implementation notes
- Backend development
- Database adjustments
- Feature testing

---

## 7. Current Sprint Progress

### Completed
- Dashboard calendar UI implementation
- To-Do section UI
- Talent Search functional controls
- Database schema updates
- Backend API structure
- Encoding fixes
- Local environment documentation

### In Progress
- Calendar follow-up persistence
- To-Do backend integration
- Branch refinement
