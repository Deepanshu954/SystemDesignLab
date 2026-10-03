# Phase 5 Deployment & Orchestration Guide — System Design Lab

**Date:** 2026-10-03  
**Status:** READY FOR PRODUCTION DEPLOYMENT

---

## 1. Architecture Overview

System Design Lab is containerized as a decoupled 3-tier microservice architecture:
- **`sdl-frontend` (Port 3000):** Next.js 14 App Router, standalone Node.js production runner, Tailwind CSS, pre-rendered static assets.
- **`sdl-backend` (Port 8080):** Spring Boot 3.3.4 (Java 21), Eclipse Temurin JRE, Flyway migrations, stateless REST API.
- **`sdl-postgres` (Port 5432):** PostgreSQL 16 Alpine, persistent storage volume, automated healthcheck.

---

## 2. Quickstart Deployment (Docker Compose)

### Prerequisites
- Docker Engine 20.10+
- Docker Compose 2.0+

### Steps
1. Clone the repository and navigate to root:
   ```bash
   cd SystemDesignLab
   ```
2. Copy environment configuration:
   ```bash
   cp .env.example .env
   ```
3. Build and launch all services in detached mode:
   ```bash
   docker-compose up -d --build
   ```
4. Check running containers:
   ```bash
   docker-compose ps
   ```
5. Follow system logs:
   ```bash
   docker-compose logs -f
   ```

---

## 3. Production Healthcheck Endpoints

| Service | Target URL | Expected Status | Description |
|---|---|---|---|
| Frontend Web App | `http://localhost:3000` | HTTP 200 OK | Next.js Landing Page & App |
| Backend Health Actuator | `http://localhost:8080/actuator/health` | `{"status":"UP"}` | Spring Boot & DB Connectivity |
| OpenAPI Specification | `http://localhost:8080/v3/api-docs` | HTTP 200 OK | Full OpenAPI 3.0 API Schema |
| Swagger UI | `http://localhost:8080/swagger-ui/index.html` | HTTP 200 OK | Interactive API documentation |
| Database Engine | `localhost:5432` | `pg_isready` OK | PostgreSQL 16 cluster |

---

## 4. Container Shutdown & Cleanup

- Stop running services:
  ```bash
  docker-compose down
  ```
- Stop services and purge database volume:
  ```bash
  docker-compose down -v
  ```
