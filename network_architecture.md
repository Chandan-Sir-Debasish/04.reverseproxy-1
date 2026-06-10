# Cloud Deployment Network Architecture

This document defines a production-ready cloud deployment network topology for the Student Management System. It maps the local Docker Compose services into a Virtual Private Cloud (VPC) design following industry-standard multi-tier architecture guidelines (Public DMZ Subnet, Private Application Subnet, and Private Database Subnet).

---

## Network Architecture Diagram

The diagram below is written in **Mermaid.js** syntax. It is entirely text-based and programmatically editable inside any Markdown viewer or code editor.

```mermaid
flowchart TD
    %% Define Styles for Different Resource Types
    classDef external fill:#f1f5f9,stroke:#94a3b8,stroke-width:2px,color:#0f172a,rx:5px,ry:5px;
    classDef network fill:#f0fdf4,stroke:#16a34a,stroke-width:2px,color:#14532d,rx:5px,ry:5px;
    classDef compute fill:#eff6ff,stroke:#2563eb,stroke-width:2px,color:#1e3a8a,rx:5px,ry:5px;
    classDef storage fill:#fff7ed,stroke:#ea580c,stroke-width:2px,color:#7c2d12,rx:5px,ry:5px;
    classDef service fill:#faf5ff,stroke:#9333ea,stroke-width:2px,color:#581c87,rx:5px,ry:5px;

    %% Client Region
    subgraph ClientRegion ["External Clients"]
        Client["Client Web Browser"]
        Admin["Administrator CLI"]
    end
    
    %% Virtual Private Cloud
    subgraph VPC ["Virtual Private Cloud (VPC) - 10.0.0.0/16"]
        IGW["Internet Gateway"]
        
        subgraph PublicSubnet ["Public Subnet - 10.0.1.0/24 (DMZ)"]
            Nginx["Nginx Reverse Proxy Instance<br>(Host Port 8080 / Container 80)"]
        end
        
        subgraph PrivateAppSubnet ["Private Subnet - 10.0.2.0/24 (Application Tier)"]
            Frontend["Frontend React Service<br>(Static Site Server / Container 80)"]
            Backend["Backend Express API Service<br>(Node.js Engine / Container 5000)"]
        end
        
        subgraph PrivateDBSubnet ["Private Subnet - 10.0.3.0/24 (Database Tier)"]
            MongoDB["MongoDB Database Cluster<br>(Replica Set / Container 27017)"]
        end
    end
    
    %% Managed Cloud Services
    subgraph RegionalServices ["Managed Cloud Services (AWS Equivalent)"]
        SecretsManager["Secrets Manager<br>(Env Variables Store)"]
        CloudWatch["CloudWatch Logs<br>(Unified Logging)"]
        S3["S3 Storage Bucket<br>(Database Backups)"]
    end

    %% Apply Styles to Nodes
    class Client,Admin external;
    class IGW,Nginx network;
    class Frontend,Backend compute;
    class MongoDB storage;
    class SecretsManager,CloudWatch,S3 service;

    %% Data Flow Connections
    Client -->|HTTP Requests on Port 8080| IGW
    Admin -->|SSH Maintenance| IGW
    
    IGW --> Nginx
    
    Nginx -->|"/ (Serves Web App)"| Frontend
    Nginx -->|"/api/* (Routes Requests)"| Backend
    
    Backend -->|CRUD Queries on Port 27017| MongoDB
    
    %% Config and Logs Operations
    Backend -.->|Reads Secret Keys| SecretsManager
    Nginx -.->|Streams Access/Error Logs| CloudWatch
    Backend -.->|Streams App Execution Logs| CloudWatch
    MongoDB -.->|Uploads Daily Backups| S3
```

---

## Architectural Summary

### 1. External Clients Tier
- **Client Web Browser**: End-users who access the application interface.
- **Administrator CLI**: Systems administrators managing operations and running server configurations.

### 2. Public Subnet (DMZ)
- **Internet Gateway (IGW)**: Direct interface connecting the VPC to the public Internet.
- **Nginx Reverse Proxy Instance**: Exposed directly on port `8080`. It acts as the gatekeeper, receiving all client traffic, terminating requests, enforcing security configurations, and proxying incoming calls downstream.

### 3. Private Application Subnet
- **Frontend React Service**: Serves build bundles (`index.html`, JS, CSS). Isolated from direct public exposure; accessible only through Nginx proxy routing.
- **Backend Express API Service**: Node.js microservice running on port `5000`. It processes requests forwarded by Nginx and interfaces with MongoDB.

### 4. Private Database Subnet
- **MongoDB Database**: Data tier restricted to internal query access. It only accepts connections from the Backend application layer on port `27017`.

### 5. Managed Cloud Services
- **Secrets Manager**: Securely stores configurations (such as the database connection string `MONGODB_URI` and JWT secret keys).
- **CloudWatch Logs**: Centralized storage for streaming diagnostic logs from Nginx proxy servers and application runtimes.
- **S3 Storage Bucket**: Used for storing daily database snapshots and static media file uploads.
