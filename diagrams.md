# Technical Diagrams for Student Management System

This document contains additional structural and behavioral diagrams for the Student Management System to explain the database model design and request lifecycle.

---

## 1. Database Schema structure (Entity Relationship Layout)

The database runs on MongoDB. Although MongoDB is document-oriented, the application defines a structured schema with embedded subdocuments using Mongoose. The following class diagram illustrates the nested object structure of the Student model.

```mermaid
classDiagram
    class Student {
        +ObjectId _id
        +String firstName
        +String lastName
        +String email
        +String studentId
        +Date dateOfBirth
        +String grade
        +String section
        +String phoneNumber
        +Date enrollmentDate
        +String status
        +Number gpa
        +Address address
        +EmergencyContact emergencyContact
        +Course[] courses
    }
    class Address {
        +String street
        +String city
        +String state
        +String zipCode
        +String country
    }
    class EmergencyContact {
        +String name
        +String relationship
        +String phoneNumber
    }
    class Course {
        +String courseCode
        +String courseName
        +Number credits
        +String grade
    }
    Student *-- Address : embedded
    Student *-- EmergencyContact : embedded
    Student *-- Course : embedded list
```

---

## 2. Express.js Middleware Processing Pipeline

When a client makes a request to the backend REST API (such as submitting the registration form via `POST /api/students`), the request is passed through several security, parsing, validation, and database verification steps. The diagram below illustrates this lifecycle:

```mermaid
graph TD
    Request["Incoming API Request"] --> RateLimit["express-rate-limit (Rate Limiter)"]
    RateLimit -->|Within Limit| Helmet["helmet (Security Headers)"]
    RateLimit -->|Limit Exceeded| Block["Return 429 Too Many Requests"]
    
    Helmet --> Compression["compression (Gzip Response)"]
    Compression --> CORS["cors (Access Control Validation)"]
    CORS --> JSONParser["express.json (Body Parser)"]
    
    JSONParser --> RouteHandler["Route: POST /api/students"]
    RouteHandler --> Validation["validateStudent (express-validator)"]
    
    Validation -->|Validation Failed| ValidationError["Return 400 Bad Request"]
    Validation -->|Validation Passed| DBCheck["Check Email in MongoDB"]
    
    DBCheck -->|Email Exists| EmailConflict["Return 400 Email already exists"]
    DBCheck -->|Email Unique| PreSaveHook["Mongoose pre-save hook (Auto-generate studentId)"]
    
    PreSaveHook --> SaveDB["Mongoose save to MongoDB"]
    SaveDB --> SuccessResponse["Return 201 Created JSON Response"]
```
