# Verified Route Catalog — System Design Lab

## Frontend Routes (Next.js 14 App Router)

| Route Path | Type | Key Features |
|---|---|---|
| `/` | Static | Hero section, 4 pillars, interactive live calculator preview, flagship case study cards |
| `/case-studies` | Static | Search, difficulty filters (Beginner, Intermediate, Advanced), category tabs |
| `/case-studies/url-shortener` | SSG | Flagship 24-step blueprint, Base62 code, KGS architecture, worked capacity math, trade-offs |
| `/case-studies/rate-limiter` | SSG | Token bucket, sliding window, Redis Lua script, fail-open resilience |
| `/case-studies/notification-system` | SSG | Priority queues, idempotency hash, omnichannel failover |
| `/case-studies/chat-system` | SSG | WebSocket gateway, Cassandra message store, Snowflake sequencing |
| `/fundamentals` | Static | Core distributed systems index with category pills and reading time |
| `/fundamentals/hld-vs-lld` | SSG | Side-by-side comparison table, interview phase mapping, artifacts |
| `/fundamentals/capacity-estimation` | SSG | QPS formulas, powers of two table, 80/20 caching rule, mental math |
| `/fundamentals/caching` | SSG | Cache-aside, write-through, write-behind, cache stampede mitigations |
| `/fundamentals/load-balancing` | SSG | L4 vs L7, consistent hashing ring, virtual nodes |
| `/fundamentals/database-scaling` | SSG | Master-replica replication lag vs horizontal sharding trade-offs |
| `/interview-prep` | Static | 45-minute interview cadence cheat sheet, collapsible solutions with key phrases |
| `/interview-prep/beginners` | Static | Complete 4-step framework for junior/mid engineers, 4 traps to avoid |
| `/tools` | Static | Interactive tools directory and Jeff Dean hardware latency hierarchy table |
| `/tools/capacity-calculator` | Static | Dynamic sliders, 4 industry presets, real-time QPS, RAM, and storage projections |
| `/tools/decision-matrix` | Static | Multi-criteria technology comparison (Postgres, DynamoDB, Redis, Kafka, Cassandra, ES) |
| `/sitemap.xml` | Dynamic XML | Auto-generated XML sitemap covering all 22 application routes |
| `/robots.txt` | Dynamic TXT | Search crawler rules referencing `/sitemap.xml` |

---

## Backend REST Endpoints (Spring Boot 3.3.4)

| HTTP Method | Endpoint URI | Auth Required | Description |
|---|---|---|---|
| `POST` | `/api/v1/auth/register` | No | Register new user account |
| `POST` | `/api/v1/auth/login` | No | Authenticate user & return JWT token |
| `GET` | `/api/v1/auth/me` | Yes (Bearer) | Return current user profile |
| `GET` | `/api/v1/case-studies` | No | List case studies with optional filtering |
| `GET` | `/api/v1/case-studies/{slug}` | No | Retrieve complete 24-step case study detail |
| `GET` | `/api/v1/fundamentals` | No | List distributed systems concepts |
| `GET` | `/api/v1/fundamentals/{slug}` | No | Retrieve concept guide and key takeaways |
| `GET` | `/api/v1/interview` | No | List interview questions and solutions |
| `GET` | `/api/v1/interview/{id}` | No | Retrieve interview question detail |
| `POST` | `/api/v1/calculator/capacity` | No | Calculate capacity math via server engine |
| `GET` | `/api/v1/calculator/templates` | No | Retrieve predefined system scale presets |
| `GET` | `/api/v1/bookmarks` | Yes (Bearer) | Retrieve authenticated user's bookmarks |
| `POST` | `/api/v1/bookmarks` | Yes (Bearer) | Add a bookmark for current user |
| `DELETE` | `/api/v1/bookmarks/{id}` | Yes (Bearer) | Remove bookmark owned by current user |
| `POST` | `/api/v1/feedback` | No | Submit rating and architectural feedback |
| `GET` | `/actuator/health` | No | Healthcheck status (`UP`) |
| `GET` | `/v3/api-docs` | No | OpenAPI 3.0 JSON specification |
| `GET` | `/swagger-ui/index.html` | No | Interactive Swagger UI |
