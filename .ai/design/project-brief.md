# Project Brief — System Design Lab

## 1. Project Overview
- **Project Name:** System Design Lab — A Practical System Design & Backend Engineering Knowledge Hub
- **Tagline:** Production-grade system design concepts, flagship case studies, interactive capacity estimation, and interview preparation for BTech students and early-career software engineers.
- **Repository:** Monorepo (`backend/` Spring Boot 3.x REST API + `frontend/` Next.js 14+ App Router + Docker + Evidence Repository)
- **Primary Objective:** Build a public-ready, highly technical, and search-optimized system design resource platform. Deliver original worked examples, visual architecture diagrams, real-time estimation tools, and deep architectural trade-off analyses while maintaining 100% technical correctness and lighthouse performance.

## 2. Target Personas
1. **Persona A — System Design Beginner (BTech CS Students):**
   - Goal: Grasp High-Level Design (HLD) vs Low-Level Design (LLD), core building blocks (Load Balancing, Caching, Databases, Sharding, Replication, Queues), and standard distributed systems trade-offs (CAP Theorem, PACELC).
   - Key Search Queries: `system design for beginners`, `hld vs lld`, `what is load balancing`, `system design capacity estimation`.
2. **Persona B — Placement & Interview Candidate:**
   - Goal: Master flagship system design problems (URL Shortener, Distributed Rate Limiter, Notification Engine, Real-time Chat) using a structured 24-step response framework. Practice capacity estimation and mock interview questions.
   - Key Search Queries: `url shortener system design`, `rate limiter system design`, `system design interview questions for beginners`.
3. **Persona C — Early Backend Engineer:**
   - Goal: Compare architectural patterns (SQL vs NoSQL, Redis vs Memcached, Kafka vs RabbitMQ), understand failure handling, fault tolerance, and explore database partitioning strategies.
   - Key Search Queries: `database sharding vs replication`, `distributed cache system design`, `api gateway architecture`.

## 3. Scope & MVP Core Deliverables
- **Flagship Case Studies (Substantive, 24-step standard structure):**
  1. URL Shortener (TinyURL architecture, Base62 encoding, KGS, cache invalidation, Redis, sharding)
  2. Distributed Rate Limiter (Token Bucket, Leaky Bucket, Sliding Window Log, Redis Lua scripts, distributed synchronization)
  3. Real-Time Notification System (Fan-out service, WebSockets, APNS/FCM, Kafka message broker, idempotency)
  4. Scalable Chat System (WebSocket gateways, presence servers, Cassandra/ScyllaDB message store, push fallback)
- **Fundamentals Knowledge Base:**
  - HLD vs LLD (Conceptual differences, architectural artifacts, design patterns)
  - Capacity Estimation & Back-of-the-Envelope Math (Formulas, latency numbers every engineer should know, storage/bandwidth/QPS rules)
  - Distributed Caching (Eviction policies LRU/LFU, write-through vs write-back vs cache-aside, cache stampede)
  - Load Balancing & Consistent Hashing (Virtual nodes, hash rings, Layer 4 vs Layer 7 load balancers)
  - Database Scaling (Replication lag, master-slave, sharding keys, distributed transactions & 2PC/Saga)
- **Interactive Tools & Calculators:**
  - Capacity & Storage Estimation Calculator (Dynamic input for DAU, Read/Write ratio, payload size, retention years; calculates QPS, peak QPS, ingress/egress bandwidth, storage required)
  - QPS & Latency Visualizer
  - Architecture Trade-off Decision Matrix
- **Backend API (Spring Boot 3.3.x):**
  - Full CRUD & query endpoints for Case Studies, Fundamentals, Interview Questions, Calculators, User Bookmarks, and Feedback.
  - Interactive Calculation Engine with server-side validation.
  - JWT Authentication, Role-based Access Control (ROLE_STUDENT, ROLE_ADMIN).
  - OpenApi Swagger UI documentation (`/swagger-ui.html`).
- **Technical SEO & Quality Standards:**
  - Semantic HTML, unique metadata per page, OpenGraph/Twitter cards, canonical tags, automated XML sitemap, `robots.txt`, and rich JSON-LD (Article, BreadcrumbList, TechArticle, Organization).
  - Clean URLs, Breadcrumb trails, and context-rich internal linking.
