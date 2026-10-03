# Research & Competitive Analysis — System Design Lab

## 1. Competitive Landscape Analysis

| Platform / Source | Strengths | Weaknesses & Gaps | System Design Lab Differentiator |
|---|---|---|---|
| **System Design Primer (Donne Martin)** | Widely referenced on GitHub, open source, comprehensive high-level summary. | Static markdown, dense walls of text, no interactive tooling, lacks structured 24-step case study format, no integrated runnable backend. | Interactive capacity calculators, modern responsive web UI with dark mode, side-by-side trade-off matrices, structured 24-step case studies, verified REST API. |
| **ByteByteGo (Alex Xu)** | Highly polished visual diagrams, clear book formats, well-known brand. | Paywalled premium content ($100+/year), static book chapters, no free interactive calculators or runnable code samples. | 100% free open-access technical resource, live calculators with customizable parameters, clear formulas with worked math, reproducible evidence logs. |
| **Educative.io (Grokking)** | Established interview preparation curriculum, structured courses. | Expensive recurring subscription, often outdated code snippets, rigid proprietary sandbox, generic text explanations. | Open-source monorepo with Spring Boot + Next.js, accessible and crawlable without logins or paywalls, comprehensive SEO-friendly content hierarchy. |
| **GeeksforGeeks** | Massive SEO footprint, high organic rankings for long-tail technical terms. | Low content quality, outdated formatting, intrusive advertisements, shallow explanations lacking trade-offs or production depth. | Ad-free, high-density engineering rigor, original Mermaid architecture diagrams, quantitative capacity calculations, modern accessible typography. |

## 2. Search Intent & Keyword Strategy

### Intent Clusters & Page Mapping

1. **Transactional / Educational (Fundamentals)**
   - Target Query: `hld vs lld` / `high level design vs low level design`
     - Intent: Student/engineer wants clear comparison, differences, artifacts, and examples.
     - Target Route: `/fundamentals/hld-vs-lld`
     - Content Requirement: Comparison table, concrete artifacts (architecture diagram vs class diagram), real-world scenario.
   - Target Query: `system design capacity estimation`
     - Intent: Candidate needs to know standard formulas, powers of two, latency numbers, and how to estimate QPS and storage.
     - Target Route: `/fundamentals/capacity-estimation`
     - Content Requirement: Cheat sheets, step-by-step math formulas, interactive calculator embed.

2. **Problem-Solving & Case Studies**
   - Target Query: `url shortener system design`
     - Intent: Placement student or backend engineer designing TinyURL from scratch.
     - Target Route: `/case-studies/url-shortener`
     - Content Requirement: Base62 vs MD5/SHA256, Key Generation Service (KGS), Redis cache sizing, database schema, sharding strategy.
   - Target Query: `rate limiter system design`
     - Intent: Understand distributed rate limiting algorithms (Token Bucket, Leaky Bucket, Sliding Window Counter) and Redis Lua scripts.
     - Target Route: `/case-studies/rate-limiter`
     - Content Requirement: Algorithm comparison matrix, distributed architecture, race conditions, HTTP headers (`X-RateLimit-*`).
   - Target Query: `notification system design`
     - Intent: Architectural pattern for cross-platform notifications (APNS, FCM, SMS, Email) with high throughput and deduplication.
     - Target Route: `/case-studies/notification-system`
   - Target Query: `chat application system design`
     - Intent: Scalable 1:1 and group chat architecture using WebSockets, presence servers, and distributed message queues.
     - Target Route: `/case-studies/chat-system`

3. **Interview Preparation**
   - Target Query: `system design interview questions for beginners`
     - Intent: Structured roadmap, 45-minute interview pacing guide, standard pitfalls, and common questions.
     - Target Route: `/interview-prep/beginners`

## 3. Technology Evaluation for Knowledge Hub & Backend
- **Frontend Framework:** Next.js 14+ with App Router. Next.js provides hybrid SSG/SSR rendering, fast page loads, automatic metadata generation for SEO, and React Server Components for minimal client-side JavaScript.
- **Styling:** Tailwind CSS with modern dark mode aesthetic, slate/indigo/cyan color palette, and accessible contrast ratios.
- **Backend Framework:** Spring Boot 3.3.x with Java 21. Robust type safety, enterprise modularity, Spring Data JPA, Flyway migrations, and OpenAPI documentation out-of-the-box.
- **Database:** PostgreSQL 16 for production and containerized deployments, H2 in-memory database for fast, isolated unit and integration testing.
- **Containerization:** Multi-stage Dockerfiles and Docker Compose orchestrating Postgres, Backend, and Frontend on an isolated bridge network.
