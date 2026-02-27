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

This system is also deployed to a live production environment.

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

2. Start MAMP.

3. Visit in browser:  
   http://localhost:8888/CCANsolutions/home.html

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

- home.html
- recruiting.html
- candidate_profile.html
- script.js
- style.css
- api/
- dbconnection.php

The live deployment allows full system functionality including:

- Viewing candidates
- Editing candidate data
- Follow-up tracking
- Profile navigation

---

## 4. Features & Usage

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
- Clickable candidate profile navigation
  - Clicking a candidate name opens the full candidate profile page
  - Phone numbers and email addresses are clickable for direct contact

---

## 5. Backend (API Folder)

The /api directory contains backend PHP endpoints that:

- Connect to MySQL database
- Handle candidate data retrieval
- Manage status and bucket updates
- Support follow-up data storage
- Provide structured JSON responses

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

## 9. Current Sprint Progress

### Completed

- Dashboard calendar UI implementation
- To-Do section UI
- Talent Search functional controls
- Database schema updates
- Backend API structure
- Encoding fixes
- Local environment documentation
- Clickable candidate profile implementation
- Live deployment to Hostinger

### In Progress

- Calendar follow-up persistence
- Login system integration
- Authentication system

---

## 10. Recent Feature Update – Clickable Candidate Profiles

Users can now click a candidate’s name from:

- Talent Search page
- Dashboard follow-up calendar

This opens the candidate profile page.

Phone numbers and email addresses are also clickable.

This improves recruiter workflow and navigation efficiency.

---

## 11. Live Production System

Production URL:

https://acutectalent.com

This version connects to a live MySQL database and demonstrates full system functionality in a real hosting environment.
