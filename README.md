# Student Management System

A production-ready MERN stack application with Nginx reverse proxy for educational institutions to manage student records.

## Architecture
```
Client Browser
│
▼
Nginx (Port 8080) - Reverse Proxy
│
├──► Frontend (React) - Port 80
│
└──► Backend API (Express) - Port 5000
│
▼
MongoDB - Port 27017
```

## Technology Stack

- **Frontend**: React 18, Vite
- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose ODM
- **Proxy Server**: Nginx
- **Containerization**: Docker, Docker Compose

## Features

- Student registration with comprehensive data collection
- Student record management (Create, Read, Delete)
- Grade and section assignment
- Emergency contact information tracking
- Address management
- Student ID generation
- Response data validation
- API rate limiting
- Security headers with Helmet
- Response compression
- Request logging
- Pagination for student listings

## Prerequisites

- Docker Desktop 20.10+
- Node.js 18+ (for local development)
- Git

## Quick Installation

### Using Docker (Recommended)

1. Clone the repository:
```bash
git clone <repository-url>
cd student-management-system

Create environment files: