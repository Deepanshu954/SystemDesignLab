# System Design Lab — Architectural Memory

## 1. System Topology & Ecosystem
- **Monorepo Layout:**
  - `backend/`: Java 21, Spring Boot 3.3.4, Spring Data JPA, PostgreSQL 16, Flyway 10, JJWT 0.12.6, Springdoc OpenAPI 2.6.0.
  - `frontend/`: Node 20, Next.js 14.2.14 App Router, TypeScript 5.6, Tailwind CSS 3.4, Lucide React, Vitest 2.1.
  - `orchestration/`: Docker Compose (PostgreSQL 16 + Spring Boot + Next.js Standalone).

## 2. Core Modules & Endpoints
- **Authentication & Users (`com.app.modules.user`):**
  - `POST /api/v1/auth/register`, `POST /api/v1/auth/login`, `GET /api/v1/auth/me`
  - BCrypt cost 12, stateless JWT Bearer token validation with custom 401 ProblemDetail handler.
- **Bookmarks (`com.app.modules.user.controller.BookmarkController`):**
  - `GET /api/v1/bookmarks`, `POST /api/v1/bookmarks`, `DELETE /api/v1/bookmarks/{id}`
  - User-scoped ownership validation.
- **Capacity Calculator Engine (`com.app.modules.calculator`):**
  - `POST /api/v1/calculator/capacity`, `GET /api/v1/calculator/templates`
  - High-precision calculation of daily requests, avg/peak QPS, storage growth (1/5 yr), network ingress/egress, and RAM cache sizing.
- **Case Studies (`com.app.modules.casestudy`):**
  - `GET /api/v1/case-studies`, `GET /api/v1/case-studies/{slug}`
  - Flagship 24-step architectural blueprints with worked capacity math and SVG topology JSON.
- **Fundamentals (`com.app.modules.fundamentals`):**
  - `GET /api/v1/fundamentals`, `GET /api/v1/fundamentals/{slug}`
  - Comprehensive distributed systems guides (HLD vs LLD, capacity estimation, caching, load balancing, sharding).
- **Interview Preparation (`com.app.modules.interview`):**
  - `GET /api/v1/interview`, `GET /api/v1/interview/{id}`
  - 45-minute interview rubric, questions and solutions.
- **Feedback (`com.app.modules.feedback`):**
  - `POST /api/v1/feedback` (1-5 star rating and comments).

## 3. Database Schema (`backend/src/main/resources/db/migration/V1__init.sql`)
- Tables: `users`, `case_studies`, `concepts`, `interview_questions`, `system_templates`, `bookmarks`, `feedback`.
- Indexes on slugs, categories, user_id, and foreign keys.
- Pre-seeded with 4 flagship case studies, 5 fundamentals, 2 interview questions, 4 calculator templates, and 2 default user accounts.
