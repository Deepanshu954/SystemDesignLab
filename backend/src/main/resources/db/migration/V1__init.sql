-- System Design Lab Database Schema & Initial Seeds
-- Flyway Migration V1__init.sql

-- 1. Users Table
CREATE TABLE users (
    id UUID PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(120) NOT NULL,
    role VARCHAR(32) NOT NULL DEFAULT 'ROLE_STUDENT',
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    version INT NOT NULL DEFAULT 0
);

CREATE INDEX idx_users_email ON users(email);

-- 2. Case Studies Table
CREATE TABLE case_studies (
    id UUID PRIMARY KEY,
    slug VARCHAR(120) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    summary VARCHAR(500) NOT NULL,
    difficulty VARCHAR(32) NOT NULL,
    category VARCHAR(64) NOT NULL,
    reading_time_minutes INT NOT NULL DEFAULT 15,
    architecture_diagram_json TEXT,
    capacity_math_json TEXT,
    full_content_markdown TEXT NOT NULL,
    published BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    version INT NOT NULL DEFAULT 0
);

CREATE INDEX idx_case_studies_slug ON case_studies(slug);
CREATE INDEX idx_case_studies_category ON case_studies(category);
CREATE INDEX idx_case_studies_difficulty ON case_studies(difficulty);

-- 3. Fundamentals / Concepts Table
CREATE TABLE concepts (
    id UUID PRIMARY KEY,
    slug VARCHAR(120) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    summary VARCHAR(500) NOT NULL,
    category VARCHAR(64) NOT NULL,
    difficulty VARCHAR(32) NOT NULL,
    reading_time_minutes INT NOT NULL DEFAULT 10,
    key_takeaways_json TEXT,
    full_content_markdown TEXT NOT NULL,
    published BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    version INT NOT NULL DEFAULT 0
);

CREATE INDEX idx_concepts_slug ON concepts(slug);
CREATE INDEX idx_concepts_category ON concepts(category);

-- 4. Interview Questions Table
CREATE TABLE interview_questions (
    id UUID PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(64) NOT NULL,
    difficulty VARCHAR(32) NOT NULL,
    question_text TEXT NOT NULL,
    answer_guide TEXT NOT NULL,
    key_points_json TEXT,
    published BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    version INT NOT NULL DEFAULT 0
);

CREATE INDEX idx_interview_category ON interview_questions(category);
CREATE INDEX idx_interview_difficulty ON interview_questions(difficulty);

-- 5. Bookmarks Table
CREATE TABLE bookmarks (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    item_type VARCHAR(32) NOT NULL,
    item_id UUID NOT NULL,
    item_title VARCHAR(255) NOT NULL,
    item_slug VARCHAR(120) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    version INT NOT NULL DEFAULT 0,
    CONSTRAINT uq_user_bookmark UNIQUE (user_id, item_type, item_id)
);

CREATE INDEX idx_bookmarks_user_id ON bookmarks(user_id);

-- 6. Saved Estimations Table
CREATE TABLE saved_estimations (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    system_name VARCHAR(120) NOT NULL,
    daily_active_users BIGINT NOT NULL,
    read_write_ratio INT NOT NULL,
    payload_size_bytes INT NOT NULL,
    retention_years INT NOT NULL,
    avg_qps NUMERIC(14,2) NOT NULL,
    peak_qps NUMERIC(14,2) NOT NULL,
    storage_tb NUMERIC(14,3) NOT NULL,
    bandwidth_mbps NUMERIC(14,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    version INT NOT NULL DEFAULT 0
);

CREATE INDEX idx_estimations_user_id ON saved_estimations(user_id);

-- 7. Feedback Table
CREATE TABLE feedback (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    page_url VARCHAR(255) NOT NULL,
    rating INT NOT NULL,
    category VARCHAR(64) NOT NULL,
    comment TEXT,
    status VARCHAR(32) NOT NULL DEFAULT 'NEW',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    version INT NOT NULL DEFAULT 0
);

CREATE INDEX idx_feedback_page_url ON feedback(page_url);

-- SEED DATA
-- Default Demo User (password: Password123! -> BCrypt hash)
INSERT INTO users (id, email, password_hash, full_name, role, active, created_at, updated_at, version)
VALUES (
    'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    'student@systemdesignlab.dev',
    '$2a$12$QTbDhmACWmdgLACjuMPocucdrZfQCykvhi1mDLc2CIIy.pn/bfrwm',
    'Deepanshu Chauhan',
    'ROLE_STUDENT',
    TRUE,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP,
    0
);

INSERT INTO users (id, email, password_hash, full_name, role, active, created_at, updated_at, version)
VALUES (
    'b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e',
    'admin@systemdesignlab.dev',
    '$2a$12$QTbDhmACWmdgLACjuMPocucdrZfQCykvhi1mDLc2CIIy.pn/bfrwm',
    'System Design Lab Admin',
    'ROLE_ADMIN',
    TRUE,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP,
    0
);

-- Seed Flagship Case Studies
INSERT INTO case_studies (id, slug, title, summary, difficulty, category, reading_time_minutes, architecture_diagram_json, capacity_math_json, full_content_markdown, published, created_at, updated_at, version)
VALUES (
    'c1d2e3f4-a5b6-7c8d-9e0f-1a2b3c4d5e6f',
    'url-shortener',
    'Design a Distributed URL Shortener (TinyURL)',
    'Comprehensive architectural blueprint for high-throughput, low-latency URL shortening featuring Base62 encoding, Key Generation Service (KGS), and Redis caching.',
    'BEGINNER',
    'HIGH_THROUGHPUT',
    18,
    '{"nodes":[{"id":"client","label":"Client"},{"id":"lb","label":"Load Balancer (Layer 7)"},{"id":"api","label":"Shortener Service"},{"id":"cache","label":"Redis Cluster"},{"id":"db","label":"PostgreSQL / ScyllaDB"},{"id":"kgs","label":"Key Generation Service (KGS)"}],"edges":[{"from":"client","to":"lb"},{"from":"lb","to":"api"},{"from":"api","to":"cache"},{"from":"api","to":"db"},{"from":"kgs","to":"db"}]}',
    '{"dau":10000000,"readsPerDay":100000000,"writesPerDay":10000000,"readWriteRatio":10,"avgWriteQps":116,"peakWriteQps":232,"avgReadQps":1160,"peakReadQps":2320,"storagePerYearTb":1.8,"ramCacheGb":36.5}',
    '# Flagship Case Study: Distributed URL Shortener (TinyURL)

## 1. Problem Statement
Design a distributed URL shortener service similar to TinyURL or bit.ly. The service converts long HTTP URLs into short, human-readable aliases and redirects incoming requests to the original destination with sub-10ms response latency.

## 2. Who Uses the System?
- **End users / Content creators:** Shortening links for social media posts, SMS messaging, and print media.
- **Enterprise / Marketing teams:** Tracking clicks, analytics, conversion metrics, and UTM campaigns.
- **Automated systems:** Bot redirection and programmatic API integrations.

## 3. Functional Requirements
1. Given a valid long URL, the system must generate a unique, short alias (e.g. `https://sho.rt/aZ89kL`).
2. When a user navigates to a short link, the system redirects them to the original URL via HTTP `302 Found` or `301 Moved Permanently`.
3. Users can optionally supply custom alias keys (subject to uniqueness).
4. Links expire after a configurable duration (default: 5 years).
5. Basic click tracking metrics (timestamp, IP, referrer) recorded asynchronously.

## 4. Non-Functional Requirements
1. **High Availability:** 99.999% uptime. Link redirection cannot fail.
2. **Low Latency:** URL redirection must complete in under 10ms (p99).
3. **Consistency vs Availability:** Eventual consistency for new creations; high availability for reads (AP system in CAP theorem).
4. **Collision Free:** Zero hash collisions allowed.

## 5. Capacity Estimation
- **Traffic Assumptions:**
  - 10 Million Daily Active Users (DAU).
  - 10:1 Read-to-Write ratio.
  - New URLs created/day = 10,000,000 requests.
  - URL redirections/day = 100,000,000 requests.
- **Throughput Calculations:**
  - Average Write QPS = 10,000,000 / 86,400 ≈ 116 QPS.
  - Peak Write QPS (2x factor) ≈ 232 QPS.
  - Average Read QPS = 100,000,000 / 86,400 ≈ 1,160 QPS.
  - Peak Read QPS (2x factor) ≈ 2,320 QPS.
- **Storage Calculations:**
  - Average URL record size = 500 bytes (UUID, ShortKey, LongURL, UserID, CreatedAt, ExpiresAt).
  - Daily storage = 10M × 500 bytes = 5 GB/day.
  - 5-Year Storage = 5 GB × 365 × 5 ≈ 9.125 TB.
- **Cache Sizing (80/20 Rule):**
  - 20% of popular URLs generate 80% of daily read traffic.
  - Daily read volume cached = 20% of 100M = 20M requests.
  - Required Redis RAM = 20M × 500 bytes ≈ 10 GB RAM.

## 6. Key Architecture Components
- **Base62 Encoding vs Key Generation Service (KGS):** Rather than hashing on the fly (which suffers from collisions and counter synchronization bottlenecks), an offline Key Generation Service generates random unique 7-character Base62 keys (`62^7 = 3.52 Trillion keys`) and loads them into memory queues.
- **Storage Tier:** Relational database (PostgreSQL with sharding on `short_key` hash) or wide-column store (ScyllaDB/Cassandra) partitioned by short key.
- **Caching Layer:** Distributed Redis cluster configured with LRU eviction to serve hot short URLs with sub-millisecond response times.',
    TRUE,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP,
    0
);

INSERT INTO case_studies (id, slug, title, summary, difficulty, category, reading_time_minutes, architecture_diagram_json, capacity_math_json, full_content_markdown, published, created_at, updated_at, version)
VALUES (
    'd2e3f4a5-b6c7-8d9e-0f1a-2b3c4d5e6f7a',
    'rate-limiter',
    'Design a Distributed Rate Limiter',
    'In-depth design of a multi-tier API rate limiting engine using Token Bucket, Sliding Window Counter, and Redis Lua scripts with distributed lock avoidance.',
    'INTERMEDIATE',
    'HIGH_THROUGHPUT',
    22,
    '{"nodes":[{"id":"client","label":"Client"},{"id":"gw","label":"API Gateway"},{"id":"limiter","label":"Rate Limiter Filter"},{"id":"redis","label":"Redis Cluster (Counters)"},{"id":"service","label":"Downstream Microservices"}],"edges":[{"from":"client","to":"gw"},{"from":"gw","to":"limiter"},{"from":"limiter","to":"redis"},{"from":"limiter","to":"service"}]}',
    '{"requestsPerSec":50000,"clientCount":1000000,"rateLimitPerClient":100,"windowSeconds":60,"redisMemoryMb":250}',
    '# Flagship Case Study: Distributed Rate Limiter

## 1. Problem Statement
Build an enterprise distributed rate limiting service that protects backend infrastructure from denial-of-service (DoS) attacks, brute-force exploits, noisy neighbors, and runaway scripts across thousands of servers.

## 2. Algorithm Comparison
1. **Token Bucket:** Tokens added at constant rate; burst capacity supported up to bucket size. Highly memory efficient.
2. **Leaky Bucket:** Constant outflow rate via FIFO queue. Smooths bursts into a steady stream.
3. **Sliding Window Log:** Stores exact timestamp per request. Perfectly accurate but memory intensive.
4. **Sliding Window Counter:** Blends prior window and current window count. Accurate within 99.5% with tiny O(1) memory footprint.

## 3. High-Level Architecture
The rate limiter sits as an Envoy/Nginx filter or API Gateway middleware. Atomic operations in Redis via Lua scripts prevent race conditions (TOCTOU). When limits are exceeded, the system immediately returns `429 Too Many Requests` with `Retry-After` and `X-RateLimit-*` headers.',
    TRUE,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP,
    0
);

INSERT INTO case_studies (id, slug, title, summary, difficulty, category, reading_time_minutes, architecture_diagram_json, capacity_math_json, full_content_markdown, published, created_at, updated_at, version)
VALUES (
    'e3f4a5b6-c7d8-9e0f-1a2b-3c4d5e6f7a8b',
    'notification-system',
    'Design a Scalable Real-Time Notification Engine',
    'Architectural walkthrough for multi-channel notification fan-out (APNS, FCM, SMS, Email) handling millions of notifications with deduplication and priority queues.',
    'ADVANCED',
    'REAL_TIME',
    24,
    '{"nodes":[{"id":"producer","label":"Event Producers"},{"id":"api","label":"Notification API"},{"id":"kafka","label":"Kafka Message Queue"},{"id":"worker","label":"Fan-out Workers"},{"id":"apns","label":"Apple Push"},{"id":"fcm","label":"Firebase Cloud"},{"id":"email","label":"SendGrid/SES"}],"edges":[{"from":"producer","to":"api"},{"from":"api","to":"kafka"},{"from":"kafka","to":"worker"},{"from":"worker","to":"apns"},{"from":"worker","to":"fcm"},{"from":"worker","to":"email"}]}',
    '{"notificationsPerDay":500000000,"avgQps":5787,"peakQps":17361,"payloadSizeKb":2}',
    '# Flagship Case Study: Scalable Notification System

## 1. Problem Statement
Design a notification platform capable of transmitting push notifications, SMS text messages, and transactional emails to 100M+ global users within seconds of trigger events.

## 2. Key Architecture Pillars
- **Idempotency & Deduplication:** Redis Bloom filter + PostgreSQL unique event idempotency keys ensure no notification is delivered twice.
- **Priority Queues:** Kafka topics split into critical (OTP, fraud alerts, password reset) and bulk (promotional, newsletter) to prevent queue starvation.
- **Third-Party Rate Limit Handling:** Dedicated token bucket throttlers per third-party gateway (Apple APNS, Google FCM, Twilio).',
    TRUE,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP,
    0
);

INSERT INTO case_studies (id, slug, title, summary, difficulty, category, reading_time_minutes, architecture_diagram_json, capacity_math_json, full_content_markdown, published, created_at, updated_at, version)
VALUES (
    'f4a5b6c7-d8e9-0f1a-2b3c-4d5e6f7a8b9c',
    'chat-system',
    'Design a High-Scale Distributed Chat Application',
    'End-to-end design of a WhatsApp/Slack style chat system with bi-directional WebSocket gateways, Cassandra message store, and distributed presence management.',
    'ADVANCED',
    'REAL_TIME',
    25,
    '{"nodes":[{"id":"client","label":"Chat Clients"},{"id":"ws","label":"WebSocket Gateway"},{"id":"presence","label":"Presence Service"},{"id":"redis","label":"Redis Pub/Sub"},{"id":"msgStore","label":"Cassandra Message Store"}],"edges":[{"from":"client","to":"ws"},{"from":"ws","to":"presence"},{"from":"ws","to":"redis"},{"from":"ws","to":"msgStore"}]}',
    '{"dau":50000000,"messagesPerDay":5000000000,"peakMsgQps":115740,"storagePerYearTb":182.5}',
    '# Flagship Case Study: High-Scale Chat System

## 1. Problem Statement
Architect a chat service supporting 1:1 direct messaging, group conversations, real-time online/offline presence indicators, and cross-device synchronization with message persistence.

## 2. Key Technical Decisions
- **Connection Protocol:** Persistent WebSockets for bi-directional low-latency messaging.
- **Message Store:** Apache Cassandra or ScyllaDB modeled with partition key `(chat_id)` and clustering key `(message_id DESC)` for lightning-fast chronological pagination.
- **Presence Server:** Heartbeat mechanism over Redis sorted sets or epoll socket keepalives.',
    TRUE,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP,
    0
);

-- Seed Fundamentals
INSERT INTO concepts (id, slug, title, summary, category, difficulty, reading_time_minutes, key_takeaways_json, full_content_markdown, published, created_at, updated_at, version)
VALUES (
    'a1111111-2222-3333-4444-555555555555',
    'hld-vs-lld',
    'High-Level Design (HLD) vs Low-Level Design (LLD)',
    'A definitive guide contrasting system architecture, topologies, and scalability (HLD) with object-oriented design, design patterns, and code contracts (LLD).',
    'FUNDAMENTALS',
    'BEGINNER',
    12,
    '["HLD focuses on system topology, data flow, scale, and network boundaries","LLD focuses on class hierarchies, interfaces, concurrency, and DB schemas","HLD answers WHAT and WHERE; LLD answers HOW at the code level"]',
    '# High-Level Design (HLD) vs Low-Level Design (LLD)

## Overview
In systems engineering and software placement interviews, system design is divided into two distinct dimensions:

### High-Level Design (HLD)
High-Level Design defines the macro architecture of a system. It focuses on the overall topology, component boundaries, service communication protocols, storage choices, and high-level scaling strategies.

- **Primary Artifacts:** Architecture topology diagrams, network flow diagrams, capacity estimations, tech stack selections.
- **Audience:** Architects, Lead Engineers, Product Managers.
- **Core Questions Answered:**
  - What are the primary microservices?
  - Where is data persisted?
  - How do we achieve 99.99% availability?
  - How does traffic flow from CDN to reverse proxy to database?

### Low-Level Design (LLD)
Low-Level Design zooms into individual services to specify the programmatic architecture. It translates HLD component responsibilities into concrete class structures, data models, design patterns, and thread-safety mechanisms.

- **Primary Artifacts:** UML Class diagrams, Sequence diagrams, Entity Relationship schemas, API payload contracts, Design pattern implementations (Factory, Strategy, Observer).
- **Audience:** Software Development Engineers (SDEs), code reviewers.
- **Core Questions Answered:**
  - What interfaces and concrete classes implement this business logic?
  - How are race conditions prevented under high concurrency?
  - How is error propagation handled?',
    TRUE,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP,
    0
);

INSERT INTO concepts (id, slug, title, summary, category, difficulty, reading_time_minutes, key_takeaways_json, full_content_markdown, published, created_at, updated_at, version)
VALUES (
    'b2222222-3333-4444-5555-666666666666',
    'capacity-estimation',
    'Capacity Estimation & Back-of-the-Envelope Math',
    'Master the formulas, powers of two, and latency numbers every backend engineer must know to rapidly estimate QPS, storage, memory, and bandwidth.',
    'FUNDAMENTALS',
    'BEGINNER',
    14,
    '["1 Day = 86,400 seconds (approx 100,000 for mental math)","1 Million requests/day ≈ 12 QPS","Memory access is 100x faster than SSD and 100,000x faster than disk","Always size caches using 80/20 rule"]',
    '# System Design Capacity Estimation

## Latency Numbers Every Software Engineer Must Know
| Operation | Latency | Real-World Equivalent |
|---|---|---|
| L1 Cache Reference | 0.5 ns | 1 Heartbeat |
| Branch Mispredict | 5 ns | 10 Heartbeats |
| L2 Cache Reference | 7 ns | 14 Heartbeats |
| Mutex Lock / Unlock | 25 ns | 50 Heartbeats |
| Main Memory (RAM) Access | 100 ns | Quick stretch (3.3 mins) |
| Read 1 MB sequentially from Memory | 250,000 ns (250 µs) | 2 Days |
| Read 1 MB sequentially from NVMe SSD | 1,000,000 ns (1 ms) | 1 Week |
| Send 2KB over 1 Gbps Network | 20,000 ns (20 µs) | 4 Hours |
| Round Trip within same Datacenter | 500,000 ns (500 µs) | 4 Days |
| Round Trip CA to Netherlands (WAN) | 150,000,000 ns (150 ms) | 3 Years |

## Essential Back-of-the-Envelope Formulas
- **Daily to QPS:** $\text{Avg QPS} = \frac{\text{Daily Requests}}{86,400} \approx \frac{\text{Daily Requests}}{100,000}$
- **Peak QPS:** $\text{Peak QPS} = \text{Avg QPS} \times 2 \text{ to } 3$
- **Daily Storage:** $\text{Daily Storage} = \text{Daily Writes} \times \text{Average Payload Size}$
- **RAM Sizing (80/20):** $\text{Cache Size} = \text{Daily Read Traffic} \times 0.20 \times \text{Payload Size}$',
    TRUE,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP,
    0
);

INSERT INTO concepts (id, slug, title, summary, category, difficulty, reading_time_minutes, key_takeaways_json, full_content_markdown, published, created_at, updated_at, version)
VALUES (
    'c3333333-4444-5555-6666-777777777777',
    'caching',
    'Distributed Caching Patterns & Invalidation Strategies',
    'Deep architectural guide to cache-aside, write-through, write-behind, cache stampede prevention, and eviction policies (LRU, LFU, FIFO).',
    'CACHING',
    'INTERMEDIATE',
    15,
    '["Cache-aside gives full application control with lazy loading","Write-through guarantees data consistency at cost of write latency","Cache stampede can be mitigated via mutex locks or probabilistic early expiration"]',
    '# Distributed Caching Architecture

Caching is the primary architectural lever for lowering latency and insulating databases from high-volume read traffic.

## Caching Patterns
1. **Cache-Aside (Lazy Loading):** Application queries the cache. On miss, it reads from DB and writes to cache.
2. **Write-Through:** Application writes to cache, and cache synchronously updates DB before returning.
3. **Write-Behind (Write-Back):** Writes update cache instantly; cache asynchronously batches writes to DB. High throughput, risk of data loss on power failure.
4. **Refresh-Ahead:** Cache automatically predicts and re-fetches frequently requested keys before expiry.',
    TRUE,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP,
    0
);

INSERT INTO concepts (id, slug, title, summary, category, difficulty, reading_time_minutes, key_takeaways_json, full_content_markdown, published, created_at, updated_at, version)
VALUES (
    'd4444444-5555-6666-7777-888888888888',
    'load-balancing',
    'Load Balancing Strategies & Consistent Hashing',
    'Explaining Layer 4 vs Layer 7 load balancing, health checking, and how Consistent Hashing with virtual nodes prevents server hot-spotting.',
    'SCALING',
    'INTERMEDIATE',
    16,
    '["Layer 4 operates on TCP/IP; Layer 7 inspects HTTP headers, cookies, and URLs","Consistent Hashing maps both keys and servers to a circular 360 ring","Virtual nodes evenly distribute load and minimize data reshuffling when nodes join or leave"]',
    '# Load Balancing & Consistent Hashing

## Layer 4 vs Layer 7 Load Balancing
- **Layer 4 (Transport Layer):** Operates on IP address and TCP/UDP ports (e.g. AWS NLB, Linux Virtual Server). Extremely fast, cannot inspect URL paths or HTTP headers.
- **Layer 7 (Application Layer):** Operates on HTTP/HTTPS protocol headers, cookies, and URI routes (e.g. Nginx, Envoy, AWS ALB). Enables smart routing, SSL termination, and rate limiting.

## Consistent Hashing Algorithm
Traditional modulo hashing (`hash(key) % N`) causes massive cache disruption when a server is added or removed ($N \to N+1$). Consistent hashing solves this by arranging hash slots in a circular ring ($0 \text{ to } 2^{32}-1$). Adding or removing a server only reshuffles $K/N$ keys on average.',
    TRUE,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP,
    0
);

INSERT INTO concepts (id, slug, title, summary, category, difficulty, reading_time_minutes, key_takeaways_json, full_content_markdown, published, created_at, updated_at, version)
VALUES (
    'e5555555-6666-7777-8888-999999999999',
    'database-scaling',
    'Database Scaling: Sharding vs Master-Replica Replication',
    'Architectural trade-offs of horizontal vs vertical scaling, read replicas, replication lag, sharding keys, rebalancing, and distributed transactions.',
    'DATABASES',
    'ADVANCED',
    18,
    '["Replication scales read traffic but write throughput remains limited to single primary","Sharding partitions data across independent database nodes","Choosing the correct shard key is critical to prevent hot shards and cross-shard queries"]',
    '# Database Scaling: Sharding vs Replication

## 1. Master-Replica Replication
- **Mechanism:** One Primary (Master) node accepts all writes and asynchronously streams write-ahead logs (WAL) to multiple Read Replicas.
- **Benefits:** Linearly scales read throughput; provides hot standby for failover.
- **Drawbacks:** Replication lag can cause "stale reads" right after writes; does not scale write capacity.

## 2. Database Sharding
- **Mechanism:** Divides a large database into smaller, faster, and more manageable pieces called shards.
- **Shard Key Strategies:**
  - Range-based (e.g. User IDs 1-100k on Shard A, 101k-200k on Shard B). Risk of uneven distribution.
  - Hash-based (`hash(user_id) % num_shards`). Uniform distribution but re-sharding is expensive.
  - Consistent Hashing with virtual nodes. Best for dynamic scaling.',
    TRUE,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP,
    0
);

-- Seed Interview Questions
INSERT INTO interview_questions (id, title, category, difficulty, question_text, answer_guide, key_points_json, published, created_at, updated_at, version)
VALUES (
    'f1111111-aaaa-bbbb-cccc-111111111111',
    'How do you design a system to prevent Double Booking in a Hotel Reservation platform?',
    'SYSTEM_DESIGN',
    'INTERMEDIATE',
    'Design an inventory reservation system where multiple users can browse and attempt to book the same limited hotel rooms concurrently without double bookings occurring.',
    'To guarantee no double booking: 1. Use Optimistic Locking with a version column on room availability or Pessimistic Locking (`SELECT FOR UPDATE`) on the inventory row during checkout. 2. Implement a 10-minute temporary reservation lock via Redis TTL key `lock:hotel:{id}:room:{id}`. 3. Backed by PostgreSQL unique constraint on `(room_id, booking_date)`. 4. Idempotency key passed on payment processing to guarantee single financial deduction.',
    '["Pessimistic vs Optimistic Locking","Distributed Redis lock with TTL","Database unique constraint on room_id + date","Payment idempotency token"]',
    TRUE,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP,
    0
);

INSERT INTO interview_questions (id, title, category, difficulty, question_text, answer_guide, key_points_json, published, created_at, updated_at, version)
VALUES (
    'f2222222-aaaa-bbbb-cccc-222222222222',
    'How do you handle Cache Stampede (Thundering Herd Problem)?',
    'CACHING',
    'INTERMEDIATE',
    'Explain what happens during a cache stampede when a hot cache key expires, and propose three architectural mitigations.',
    'When a hot key expires, thousands of concurrent requests miss the cache and overwhelm the underlying database simultaneously. Mitigations: 1. Mutex Locking (e.g. Redis `SETNX`) allowing only one thread to regenerate the cache while others await or retry. 2. Probabilistic Early Expiration (XFetch algorithm) where requests proactively recompute the key before it officially expires. 3. Background Cron Refresh for predictable hot resources.',
    '["Mutex / Lock on cache miss","Probabilistic Early Invalidation (XFetch)","Background worker asynchronous revalidation"]',
    TRUE,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP,
    0
);
