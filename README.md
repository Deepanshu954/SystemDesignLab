# System Design Lab 🏗️⚡

> **An interactive, quantitative, and production-grade system design platform.**  
> Master high-throughput architectures, worked capacity math, technology decision matrices, and battle-tested interview frameworks.

[![Live Website](https://img.shields.io/badge/Live%20Website-system--design--lab-22c55e?style=for-the-badge&logo=vercel)](https://system-design-lab-topaz.vercel.app)
[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/Deepanshu954/SystemDesignLab)
[![CI Pipeline](https://github.com/Deepanshu954/SystemDesignLab/actions/workflows/ci.yml/badge.svg)](https://github.com/Deepanshu954/SystemDesignLab/actions)

---

## 🌐 Live URLs

| Service | Public Internet URL |
|---|---|
| **Live Web Application** | **[https://system-design-lab-topaz.vercel.app](https://system-design-lab-topaz.vercel.app)** |
| **GitHub Repository** | **[https://github.com/Deepanshu954/SystemDesignLab](https://github.com/Deepanshu954/SystemDesignLab)** |
| **Render 1-Click Deploy** | **[Deploy on Render](https://render.com/deploy?repo=https://github.com/Deepanshu954/SystemDesignLab)** |

---

## 🚀 Key Modules & Capabilities

1. **Interactive Capacity & Sizing Calculator (`/tools/capacity-calculator`)**:
   - Model DAU, read:write ratios, and payload sizes with real-time back-of-the-envelope calculations.
   - Built-in scale templates: TinyURL, Twitter/X, Chat System, and Video Streaming.
   - Instant calculation of QPS (Average & Peak), Ingress/Egress Bandwidth, Multi-Year Storage, and 80/20 RAM Cache footprint.

2. **Architecture Decision Matrix (`/tools/decision-matrix`)**:
   - Multi-vector comparison across PostgreSQL, DynamoDB, Redis, Kafka, Cassandra, and ElasticSearch.
   - Evaluates ACID compliance, latency profile, scaling complexity, and consistency models.

3. **Production 24-Step Case Studies (`/case-studies`)**:
   - **Distributed URL Shortener (TinyURL)**: Base62 encoding, Key Generation Service (KGS), Redis caching, ScyllaDB persistence.
   - **Distributed Rate Limiter**: Token Bucket, Sliding Window Counter, atomic Redis Lua scripts, and fail-open resilience.
   - **Scalable Notification Engine**: Priority queues, idempotency hashes, and multi-channel failover (APNS/FCM/SMS).
   - **High-Scale Chat Application**: WebSocket gateway cluster, Cassandra message store, and Snowflake ordering.

4. **System Design Fundamentals (`/fundamentals`)**:
   - High-Level Design (HLD) vs Low-Level Design (LLD).
   - Back-of-the-Envelope Capacity Estimation.
   - Distributed Caching Strategies (Cache-Aside, Write-Through, Stampede Prevention).
   - Load Balancing & Consistent Hashing.
   - Database Scaling: Master-Replica Replication vs Horizontal Sharding.

5. **Interview Preparation Hub (`/interview-prep`)**:
   - The 45-Minute Interview Cadence Cheat Sheet.
   - Beginner System Design Guide with 4-step framework and common traps.
   - Searchable interview questions with architectural rubrics.

---

## 🐳 Quickstart with Docker Compose

Run the entire platform (PostgreSQL 16 + Spring Boot + Next.js) locally with a single command:

```bash
# 1. Clone the repository
git clone https://github.com/Deepanshu954/SystemDesignLab.git
cd SystemDesignLab

# 2. Configure environment
cp .env.example .env

# 3. Launch containers
docker-compose up -d --build
```

- **Frontend:** [http://localhost:3000](http://localhost:3000)
- **Backend API:** [http://localhost:8080/api/v1](http://localhost:8080/api/v1)
- **Swagger UI:** [http://localhost:8080/swagger-ui/index.html](http://localhost:8080/swagger-ui/index.html)
- **Health Actuator:** [http://localhost:8080/actuator/health](http://localhost:8080/actuator/health)

---

## ☁️ Deploy to Render in 1 Click

Click the button below to deploy the backend service and managed PostgreSQL database directly to Render using [`render.yaml`](./render.yaml):

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/Deepanshu954/SystemDesignLab)

---

## 🛠️ Tech Stack

- **Backend:** Java 21, Spring Boot 3.3.4, Spring Data JPA, Flyway 10, JJWT 0.12.6, Springdoc OpenAPI 2.6.0.
- **Frontend:** Next.js 14 (App Router, standalone), TypeScript 5.6, Tailwind CSS 3.4, Lucide Icons, Vitest.
- **Persistence:** PostgreSQL 16 Alpine with Flyway migrations.
- **DevOps:** Docker, Docker Compose, GitHub Actions CI, Vercel, Render Blueprint.
