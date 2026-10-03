import axios from 'axios';
import {
  CaseStudyDetail,
  CaseStudySummary,
  ConceptDetail,
  ConceptSummary,
  InterviewQuestion,
  CapacityCalculationRequest,
  CapacityCalculationResponse,
  SystemTemplate,
  FeedbackSubmission,
  Bookmark,
} from '@/types';
import { computeCapacity } from './calculators';

const isServer = typeof window === 'undefined';
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  (isServer ? 'http://127.0.0.1:8080/api/v1' : '/api/v1');

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
});

// Attach JWT token if stored in localStorage
apiClient.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('sdl_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export const api = {
  // Case Studies
  async getCaseStudies(category?: string, search?: string): Promise<CaseStudySummary[]> {
    try {
      const res = await apiClient.get('/case-studies', {
        params: { category, search },
      });
      return res.data.data;
    } catch {
      // Fallback data if backend is offline during client build
      return fallbackCaseStudies;
    }
  },

  async getCaseStudyBySlug(slug: string): Promise<CaseStudyDetail | null> {
    try {
      const res = await apiClient.get(`/case-studies/${slug}`);
      return res.data.data;
    } catch {
      return fallbackCaseStudyDetails[slug] || null;
    }
  },

  // Fundamentals
  async getConcepts(category?: string, search?: string): Promise<ConceptSummary[]> {
    try {
      const res = await apiClient.get('/fundamentals', {
        params: { category, search },
      });
      return res.data.data;
    } catch {
      return fallbackConcepts;
    }
  },

  async getConceptBySlug(slug: string): Promise<ConceptDetail | null> {
    try {
      const res = await apiClient.get(`/fundamentals/${slug}`);
      return res.data.data;
    } catch {
      return fallbackConceptDetails[slug] || null;
    }
  },

  // Interview Prep
  async getInterviewQuestions(category?: string, search?: string): Promise<InterviewQuestion[]> {
    try {
      const res = await apiClient.get('/interview', {
        params: { category, search },
      });
      return res.data.data;
    } catch {
      return fallbackInterviewQuestions;
    }
  },

  // Calculator
  async calculateCapacity(req: CapacityCalculationRequest): Promise<CapacityCalculationResponse> {
    try {
      const res = await apiClient.post('/calculator/capacity', req);
      return res.data.data;
    } catch {
      return computeCapacity(req);
    }
  },

  async getTemplates(): Promise<SystemTemplate[]> {
    try {
      const res = await apiClient.get('/calculator/templates');
      return res.data.data;
    } catch {
      return fallbackTemplates;
    }
  },

  // Feedback
  async submitFeedback(data: FeedbackSubmission): Promise<boolean> {
    try {
      await apiClient.post('/feedback', data);
      return true;
    } catch {
      return false;
    }
  },

  // Bookmarks
  async getBookmarks(): Promise<Bookmark[]> {
    try {
      const res = await apiClient.get('/bookmarks');
      return res.data.data;
    } catch {
      return [];
    }
  },

  async addBookmark(data: { itemType: string; itemId: string; itemTitle: string; itemSlug: string }): Promise<Bookmark | null> {
    try {
      const res = await apiClient.post('/bookmarks', data);
      return res.data.data;
    } catch {
      return null;
    }
  },

  async deleteBookmark(id: string): Promise<boolean> {
    try {
      await apiClient.delete(`/bookmarks/${id}`);
      return true;
    } catch {
      return false;
    }
  },
};

// Fallback datasets for flawless offline SSG rendering
const fallbackCaseStudies: CaseStudySummary[] = [
  {
    id: 'c1d2e3f4-a5b6-7c8d-9e0f-1a2b3c4d5e6f',
    slug: 'url-shortener',
    title: 'Design a Distributed URL Shortener (TinyURL)',
    summary: 'Comprehensive architectural blueprint for high-throughput, low-latency URL shortening featuring Base62 encoding, Key Generation Service (KGS), and Redis caching.',
    difficulty: 'BEGINNER',
    category: 'HIGH_THROUGHPUT',
    readingTimeMinutes: 18,
    createdAt: '2026-10-01T10:00:00Z',
  },
  {
    id: 'd2e3f4a5-b6c7-8d9e-0f1a-2b3c4d5e6f7a',
    slug: 'rate-limiter',
    title: 'Design a Distributed Rate Limiter',
    summary: 'In-depth design of a multi-tier API rate limiting engine using Token Bucket, Sliding Window Counter, and Redis Lua scripts with distributed lock avoidance.',
    difficulty: 'INTERMEDIATE',
    category: 'HIGH_THROUGHPUT',
    readingTimeMinutes: 22,
    createdAt: '2026-10-01T11:00:00Z',
  },
  {
    id: 'e3f4a5b6-c7d8-9e0f-1a2b-3c4d5e6f7a8b',
    slug: 'notification-system',
    title: 'Design a Scalable Real-Time Notification Engine',
    summary: 'Architectural walkthrough for multi-channel notification fan-out (APNS, FCM, SMS, Email) handling millions of notifications with deduplication and priority queues.',
    difficulty: 'ADVANCED',
    category: 'REAL_TIME',
    readingTimeMinutes: 24,
    createdAt: '2026-10-01T12:00:00Z',
  },
  {
    id: 'f4a5b6c7-d8e9-0f1a-2b3c-4d5e6f7a8b9c',
    slug: 'chat-system',
    title: 'Design a High-Scale Distributed Chat Application',
    summary: 'End-to-end design of a WhatsApp/Slack style chat system with bi-directional WebSocket gateways, Cassandra message store, and distributed presence management.',
    difficulty: 'ADVANCED',
    category: 'REAL_TIME',
    readingTimeMinutes: 25,
    createdAt: '2026-10-01T13:00:00Z',
  },
];

const fallbackCaseStudyDetails: Record<string, CaseStudyDetail> = {
  'url-shortener': {
    ...fallbackCaseStudies[0],
    architectureDiagramJson: '{"nodes":[{"id":"client","label":"Client"},{"id":"lb","label":"Load Balancer (Layer 7)"},{"id":"api","label":"Shortener Service"},{"id":"cache","label":"Redis Cluster"},{"id":"db","label":"PostgreSQL / ScyllaDB"},{"id":"kgs","label":"Key Generation Service (KGS)"}],"edges":[{"from":"client","to":"lb"},{"from":"lb","to":"api"},{"from":"api","to":"cache"},{"from":"api","to":"db"},{"from":"kgs","to":"db"}]}',
    capacityMathJson: '{"dau":10000000,"readsPerDay":100000000,"writesPerDay":10000000,"readWriteRatio":10,"avgWriteQps":116,"peakWriteQps":232,"avgReadQps":1160,"peakReadQps":2320,"storagePerYearTb":1.8,"ramCacheGb":36.5}',
    fullContentMarkdown: `# Flagship Case Study: Distributed URL Shortener (TinyURL)

## 1. Problem Statement
Design a distributed URL shortener service similar to TinyURL or bit.ly. The service converts long HTTP URLs into short, human-readable aliases and redirects incoming requests to the original destination with sub-10ms response latency.

## 2. Who Uses the System?
- **End users / Content creators:** Shortening links for social media posts, SMS messaging, and print media.
- **Enterprise / Marketing teams:** Tracking clicks, analytics, conversion metrics, and UTM campaigns.
- **Automated systems:** Bot redirection and programmatic API integrations.

## 3. Functional Requirements
1. Given a valid long URL, the system must generate a unique, short alias (e.g. \`https://sho.rt/aZ89kL\`).
2. When a user navigates to a short link, the system redirects them to the original URL via HTTP \`302 Found\` or \`301 Moved Permanently\`.
3. Users can optionally supply custom alias keys (subject to uniqueness).
4. Links expire after a configurable duration (default: 5 years).
5. Basic click tracking metrics (timestamp, IP, referrer) recorded asynchronously.

## 4. Non-Functional Requirements
1. **High Availability:** 99.999% uptime. Link redirection cannot fail.
2. **Low Latency:** URL redirection must complete in under 10ms (p99).
3. **Consistency vs Availability:** Eventual consistency for new creations; high availability for reads (AP system in CAP theorem).
4. **Collision Free:** Zero hash collisions allowed.

## 5. Assumptions
- 10 Million Daily Active Users (DAU).
- 10:1 Read-to-Write ratio.
- Average URL record size is 500 bytes.
- Default link lifespan is 5 years.

## 6. Capacity Estimation
- **Throughput Calculations:**
  - Daily Writes: 10,000,000 requests/day
  - Average Write QPS = 10,000,000 / 86,400 ≈ 116 QPS
  - Peak Write QPS (2x factor) ≈ 232 QPS
  - Daily Reads: 100,000,000 requests/day
  - Average Read QPS = 100,000,000 / 86,400 ≈ 1,160 QPS
  - Peak Read QPS (2x factor) ≈ 2,320 QPS
- **Storage Calculations:**
  - Daily storage = 10M × 500 bytes = 5 GB/day
  - 5-Year Storage = 5 GB × 365 × 5 ≈ 9.125 TB
- **Bandwidth:**
  - Ingress: 116 QPS × 500 bytes × 8 = 464 Kbps
  - Egress: 1,160 QPS × 500 bytes × 8 = 4.64 Mbps
- **Cache Sizing (80/20 Rule):**
  - 20% of popular URLs generate 80% of daily read traffic.
  - Required Redis RAM = 20M × 500 bytes ≈ 10 GB RAM.

## 7. API Design
\`\`\`http
POST /api/v1/urls
Content-Type: application/json

{
  "longUrl": "https://www.example.com/deep/path/article?utm_source=spring",
  "customAlias": "spring-deep-dive" // optional
}

Response: 201 Created
{
  "shortUrl": "https://sho.rt/spring-deep-dive",
  "longUrl": "https://www.example.com/deep/path/article?utm_source=spring",
  "expiresAt": "2031-10-03T00:00:00Z"
}

GET /api/v1/urls/{shortKey}
Response: 302 Found
Location: https://www.example.com/deep/path/article?utm_source=spring
\`\`\`

## 8. Data Model & Schema
\`\`\`sql
CREATE TABLE url_mappings (
    id UUID PRIMARY KEY,
    short_key VARCHAR(16) NOT NULL UNIQUE,
    long_url TEXT NOT NULL,
    user_id UUID,
    clicks BIGINT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL
);

CREATE INDEX idx_short_key ON url_mappings (short_key);
CREATE INDEX idx_user_id ON url_mappings (user_id);
\`\`\`

## 9. High-Level Architecture
- **DNS & CDN:** Cloudflare terminates TLS and caches static assets.
- **Layer 7 Load Balancer:** Round-robin / Least connections balancing HTTP traffic to application instances.
- **Application Servers:** Stateless Spring Boot nodes executing validation and Base62 retrieval.
- **Key Generation Service (KGS):** Standalone daemon that pre-generates 7-character Base62 keys in batches and stores them in memory/data structures to guarantee O(1) allocation without collision checking.
- **Cache Cluster:** Redis cluster with LRU eviction and memory replica slaves.
- **Primary Datastore:** PostgreSQL or ScyllaDB partitioned by hash of short_key.

## 10. Component Responsibilities
- **Redirect Worker:** Reads shortKey from path, queries Redis cache; on miss, falls back to DB, populates Redis, and issues HTTP 302 redirect.
- **Key Generator:** Precomputes millions of keys into two tables: \`unused_keys\` and \`used_keys\`. Transmits keys to app servers in memory chunks.

## 11. Detailed Request Flow
1. User requests \`https://sho.rt/k8sNav\`
2. Gateway routes to nearest URL Shortener node.
3. Node queries Redis: \`GET key:k8sNav\`.
4. Cache Hit: Node returns \`302 Found\` with \`Location: longUrl\` in <2ms.
5. Cache Miss: Node queries PostgreSQL / ScyllaDB. If found, sets \`SET key:k8sNav longUrl EX 86400\` and redirects.
6. Asynchronous event sent to Kafka topic \`url-clicks\` for analytics processing.

## 12. Storage Choice & Partitioning
- **Why NoSQL / Wide-column vs SQL?** While PostgreSQL handles 10 TB with sharding, ScyllaDB/Cassandra provides masterless horizontal scaling out of the box with zero single-point-of-failure.
- **Partition Key:** \`short_key\`. Guarantees uniform hash ring distribution across cluster nodes.

## 13. Caching Strategy
- **Pattern:** Cache-Aside with LRU eviction.
- **TTL:** 24 Hours with sliding expiration for frequently accessed links.
- **Cache Stampede Prevention:** Redis distributed lock with 500ms timeout prevents thundering herd upon key expiration.

## 14. Asynchronous Click Tracking
Click tracking does not block HTTP redirection. Application emits a fire-and-forget message to Apache Kafka. Analytics consumer groups batch updates into ClickHouse for real-time dashboards.

## 15. Scaling Strategy
- Application layer is 100% stateless, autoscaling on CPU > 70% or QPS thresholds.
- Database sharded across 16 partitions using consistent hashing.

## 16. Failure Scenarios & High Availability
- **Redis Crash:** App falls back to database with circuit breakers (Resilience4j) preventing database saturation.
- **KGS Failure:** Standby replica takes over via Zookeeper/Raft leader election. Application servers keep a local in-memory buffer of 10,000 keys.

## 17. Security Considerations
- **Malicious URL Detection:** Google Safe Browsing API hook scans URLs before saving.
- **Rate Limiting:** Token bucket limiter restricts creation to 20 links/min per IP.

## 18. Low-Level Design (Base62 Algorithm)
\`\`\`java
public class Base62 {
    private static final String ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    private static final int BASE = 62;

    public static String encode(long num) {
        StringBuilder sb = new StringBuilder();
        while (num > 0) {
            sb.append(ALPHABET.charAt((int) (num % BASE)));
            num /= BASE;
        }
        return sb.reverse().toString();
    }
}
\`\`\`

## 19. Alternatives Considered
- **MD5 / SHA-256 Hashing:** Truncating first 7 chars causes collisions; collision resolution requires database lookups that multiply write latency.
- **Auto-increment Database IDs:** Sequential IDs reveal business volume to competitors and allow trivial crawling/scraping.

## 20. Trade-offs Matrix
| Design Dimension | Choice Made | Trade-off / Consequence |
|---|---|---|
| Redirection Code | \`302 Found\` | Browser checks server every time; enables accurate click analytics at the cost of higher server traffic. |
| Key Generation | KGS Offline Service | Higher architectural complexity vs instant O(1) conflict-free key assignment. |
| Persistence | Sharded Relational | ACID guarantees on custom aliases vs needing manual sharding logic. |

## 21. Bottlenecks & Mitigations
- **Hotspotting on Viral Links:** Celebrity tweets produce 50,000 QPS on a single key. Mitigation: Multi-tier caching with local Guava in-memory cache inside application JVMs.

## 22. Final Architecture Synthesis
A multi-tier architecture pairing an offline Key Generation Service with distributed Redis caching and wide-column persistence delivers 99.999% availability and sub-10ms latency.

## 23. Interview Follow-ups
1. *How would you support custom aliases safely?* Check uniqueness in index before insert.
2. *What happens if the KGS dies?* Standby node elected, app instances draw from local buffer of 10k keys.
3. *How to purge expired URLs efficiently?* Lazy deletion on access + night batch cron deleting \`WHERE expires_at < NOW()\`.

## 24. References
- RFC 3986 — Uniform Resource Identifier (URI): Generic Syntax
- Google Safe Browsing Protocol v4
- Twitter Snowflake & Distributed ID Generation Architecture`,
    updatedAt: '2026-10-01T10:00:00Z',
  },
  'rate-limiter': {
    ...fallbackCaseStudies[1],
    architectureDiagramJson: '{"nodes":[{"id":"client","label":"API Clients"},{"id":"gateway","label":"API Gateway / Envoy"},{"id":"limiter","label":"Rate Limiter Service"},{"id":"redis","label":"Redis Cluster (Lua scripts)"},{"id":"rules","label":"Rules DB / Configuration Cache"}],"edges":[{"from":"client","to":"gateway"},{"from":"gateway","to":"limiter"},{"from":"limiter","to":"redis"},{"from":"limiter","to":"rules"}]}',
    capacityMathJson: '{"dau":50000000,"readsPerDay":500000000,"writesPerDay":50000000,"readWriteRatio":10,"avgWriteQps":5787,"peakWriteQps":11574,"storagePerYearTb":0.1,"ramCacheGb":12.0}',
    fullContentMarkdown: `# Flagship Case Study: Distributed Rate Limiter

## 1. Problem Statement
Design an ultra-low latency, distributed API rate limiter capable of enforcing per-client, per-endpoint request thresholds across hundreds of distributed microservices with sub-millisecond evaluation overhead.

## 2. Who Uses the System?
- **Public API Clients:** Third-party developers subject to tier-based quotas.
- **Microservice Gateways:** Internal services guarding against cascading failures and abusive traffic.
- **Security & Infrastructure Teams:** Mitigating DDoS attacks, credential stuffing, and bot scrapers.

## 3. Functional Requirements
1. Limit requests based on client identifier (IP address, User ID, API Key).
2. Return HTTP \`429 Too Many Requests\` with \`Retry-After\` header when limits are exceeded.
3. Support configurable quota tiers (e.g. Free: 60 req/min, Pro: 10,000 req/min).
4. Include informative headers: \`X-RateLimit-Limit\`, \`X-RateLimit-Remaining\`, \`X-RateLimit-Reset\`.

## 4. Non-Functional Requirements
1. **Ultra-Low Latency:** Rate check evaluation must complete in <1ms (p99).
2. **Distributed Consistency:** Ensure accurate counts across distributed gateway instances without race conditions.
3. **High Availability:** If the rate limiting service fails, default to fail-open (allow traffic) to preserve API availability.
4. **Memory Efficiency:** Minimal RAM footprint per user key.

## 5. Capacity Estimation
- **Traffic Assumptions:** 50 Million DAU, 500M API requests/day.
- **Peak QPS:** 500M / 86,400 × 2 ≈ 11,574 QPS.
- **Memory Footprint:**
  - 50M active keys × (64 bytes key + 32 bytes value + 48 bytes Redis overhead) ≈ 7.2 GB RAM.
  - Adding 50% buffer = ~11-12 GB RAM in Redis.

## 6. Rate Limiting Algorithms Comparison
| Algorithm | Pros | Cons | Best Used For |
|---|---|---|---|
| **Token Bucket** | Bursts allowed; memory efficient | Complex concurrency synchronization | General API Gateway rate limiting (AWS, Stripe) |
| **Leaky Bucket** | Constant, smooth output rate | Starves bursty legitimate requests | Traffic shaping to downstream message queues |
| **Sliding Window Log** | Mathematically accurate | High memory consumption (stores timestamps) | Strict financial transactions |
| **Sliding Window Counter** | Memory efficient; smooths edge bursts | Approximation (~0.05% error) | Massive scale distributed systems |

## 7. Architecture & Request Flow
1. Client sends request to API Gateway (Envoy / Spring Cloud Gateway).
2. Gateway invokes Rate Limiter Filter with API Key & Route ID.
3. Rate Limiter executes atomic Lua script against Redis Cluster.
4. If tokens available: Decrement token count and return HTTP 200 Allow.
5. If quota exhausted: Return HTTP 429 Too Many Requests with header \`Retry-After: 42\`.

## 8. Redis Lua Script Implementation
\`\`\`lua
local key = KEYS[1]
local limit = tonumber(ARGV[1])
local current = tonumber(redis.call('get', key) or "0")
if current + 1 > limit then
    return 0
else
    redis.call("INCRBY", key, 1)
    if current == 0 then
        redis.call("EXPIRE", key, ARGV[2])
    end
    return 1
end
\`\`\`

## 9. Failure Modes & Mitigations
- **Redis Cluster Outage:** Circuit breaker switches limiter to **Fail-Open** mode with localized in-memory token bucket on gateway instances.
- **Hotspotting on Global Keys:** Local Guava cache with batch synchronization reduces Redis writes by 80%.`,
    updatedAt: '2026-10-01T11:00:00Z',
  },
  'notification-system': {
    ...fallbackCaseStudies[2],
    architectureDiagramJson: '{"nodes":[{"id":"client","label":"Service Producers"},{"id":"api","label":"Notification API"},{"id":"mq","label":"Kafka / RabbitMQ"},{"id":"workers","label":"Notification Workers"},{"id":"thirdparty","label":"APNS / FCM / Twilio / SendGrid"},{"id":"db","label":"Notification History DB"}],"edges":[{"from":"client","to":"api"},{"from":"api","to":"mq"},{"from":"mq","to":"workers"},{"from":"workers","to":"thirdparty"},{"from":"workers","to":"db"}]}',
    capacityMathJson: '{"dau":20000000,"readsPerDay":20000000,"writesPerDay":50000000,"readWriteRatio":0.4,"avgWriteQps":578,"peakWriteQps":2890,"storagePerYearTb":3.6,"ramCacheGb":8.0}',
    fullContentMarkdown: `# Flagship Case Study: Scalable Real-Time Notification Engine

## 1. Problem Statement
Architect an omnichannel notification platform delivering push notifications (iOS/Android), SMS, and transactional emails to tens of millions of users with deduplication, priority queues, and delivery guarantees.

## 2. Key Architecture Vectors
- **Priority Queues:** Critical authentication codes (OTP) bypass marketing newsletters.
- **Deduplication:** Redis idempotent hash \`SHA256(userId + eventType + payloadHash)\` with 5-minute sliding window prevents duplicate alerts.
- **Provider Redundancy:** Automatic failover between Twilio and AWS SNS for SMS.`,
    updatedAt: '2026-10-01T12:00:00Z',
  },
  'chat-system': {
    ...fallbackCaseStudies[3],
    architectureDiagramJson: '{"nodes":[{"id":"client","label":"Chat Clients (Web/App)"},{"id":"ws","label":"WebSocket Gateway Cluster"},{"id":"presence","label":"Presence Service (Redis)"},{"id":"chat_svc","label":"Chat Business Service"},{"id":"db","label":"Cassandra / ScyllaDB Message Store"},{"id":"kafka","label":"Kafka Message Bus"}],"edges":[{"from":"client","to":"ws"},{"from":"ws","to":"presence"},{"from":"ws","to":"kafka"},{"from":"kafka","to":"chat_svc"},{"from":"chat_svc","to":"db"}]}',
    capacityMathJson: '{"dau":50000000,"readsPerDay":500000000,"writesPerDay":100000000,"readWriteRatio":5,"avgWriteQps":1157,"peakWriteQps":5787,"storagePerYearTb":18.2,"ramCacheGb":64.0}',
    fullContentMarkdown: `# Flagship Case Study: High-Scale Distributed Chat Application

## 1. Problem Statement
Design a distributed real-time messaging application supporting 1-on-1 direct chat, group messaging with up to 500 members, read receipts, and online presence tracking with end-to-end encryption.

## 2. Core Technical Challenges
- **Bi-directional Connections:** Maintaining 50 million concurrent persistent WebSocket connections.
- **Message Ordering:** Consistent sequencing via distributed Snowflake IDs.
- **Storage:** LSM-tree based Cassandra store optimized for sequential write throughput and range queries by chat ID.`,
    updatedAt: '2026-10-01T13:00:00Z',
  },
};

const fallbackConcepts: ConceptSummary[] = [
  {
    id: 'a1111111-2222-3333-4444-555555555555',
    slug: 'hld-vs-lld',
    title: 'High-Level Design (HLD) vs Low-Level Design (LLD)',
    summary: 'A definitive guide contrasting system architecture, topologies, and scalability (HLD) with object-oriented design, design patterns, and code contracts (LLD).',
    category: 'FUNDAMENTALS',
    difficulty: 'BEGINNER',
    readingTimeMinutes: 12,
    createdAt: '2026-10-01T08:00:00Z',
  },
  {
    id: 'b2222222-3333-4444-5555-666666666666',
    slug: 'capacity-estimation',
    title: 'Capacity Estimation & Back-of-the-Envelope Math',
    summary: 'Master the formulas, powers of two, and latency numbers every backend engineer must know to rapidly estimate QPS, storage, memory, and bandwidth.',
    category: 'FUNDAMENTALS',
    difficulty: 'BEGINNER',
    readingTimeMinutes: 14,
    createdAt: '2026-10-01T08:30:00Z',
  },
  {
    id: 'c3333333-4444-5555-6666-777777777777',
    slug: 'caching',
    title: 'Distributed Caching Patterns & Invalidation Strategies',
    summary: 'Deep architectural guide to cache-aside, write-through, write-behind, cache stampede prevention, and eviction policies (LRU, LFU, FIFO).',
    category: 'CACHING',
    difficulty: 'INTERMEDIATE',
    readingTimeMinutes: 15,
    createdAt: '2026-10-01T09:00:00Z',
  },
  {
    id: 'd4444444-5555-6666-7777-888888888888',
    slug: 'load-balancing',
    title: 'Load Balancing Strategies & Consistent Hashing',
    summary: 'Explaining Layer 4 vs Layer 7 load balancing, health checking, and how Consistent Hashing with virtual nodes prevents server hot-spotting.',
    category: 'SCALING',
    difficulty: 'INTERMEDIATE',
    readingTimeMinutes: 16,
    createdAt: '2026-10-01T09:30:00Z',
  },
  {
    id: 'e5555555-6666-7777-8888-999999999999',
    slug: 'database-scaling',
    title: 'Database Scaling: Sharding vs Master-Replica Replication',
    summary: 'Architectural trade-offs of horizontal vs vertical scaling, read replicas, replication lag, sharding keys, rebalancing, and distributed transactions.',
    category: 'DATABASES',
    difficulty: 'ADVANCED',
    readingTimeMinutes: 18,
    createdAt: '2026-10-01T10:00:00Z',
  },
];

const fallbackConceptDetails: Record<string, ConceptDetail> = {
  'hld-vs-lld': {
    ...fallbackConcepts[0],
    keyTakeawaysJson: '["HLD focuses on system topology, data flow, scale, and network boundaries","LLD focuses on class hierarchies, interfaces, concurrency, and DB schemas","HLD answers WHAT and WHERE; LLD answers HOW at the code level"]',
    fullContentMarkdown: `# High-Level Design (HLD) vs Low-Level Design (LLD)

## Overview
In software engineering and placement interviews, system design is divided into two distinct dimensions:

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
  - How is error propagation handled?

## Side-by-Side Comparison
| Dimension | High-Level Design (HLD) | Low-Level Design (LLD) |
|---|---|---|
| **Scope** | Entire ecosystem / Macro architecture | Single component / Micro implementation |
| **Focus** | Services, Databases, Caches, Queues, Load Balancers | Classes, Interfaces, Methods, DB Schemas, Design Patterns |
| **Interview Stage** | Round 2/3 System Design (Senior / Placement) | Round 1/2 Machine Coding & OOP Design |
| **Trade-offs** | Latency vs Consistency, SQL vs NoSQL, Sync vs Async | Memory vs CPU, Composition vs Inheritance, Mutex vs Atomic |
| **Key Metrics** | QPS, Bandwidth, Storage, Availability SLA | Execution time, Thread safety, Cyclomatic complexity |`,
    updatedAt: '2026-10-01T08:00:00Z',
  },
  'capacity-estimation': {
    ...fallbackConcepts[1],
    keyTakeawaysJson: '["Remember 1 day ≈ 86,400 seconds (round to 100,000 for mental math)","80/20 rule states 20% of content drives 80% of read traffic","Storage needs 3x factor for replication and index overhead"]',
    fullContentMarkdown: `# Capacity Estimation & Back-of-the-Envelope Math

## 1. Why Estimate in System Design Interviews?
Estimation proves that your architectural choices are grounded in mathematical reality rather than theoretical guessing. A 10,000 QPS system requires fundamentally different tech than a 10 QPS system.

## 2. Magic Numbers Every Engineer Must Know
- **Seconds in a Day:** 86,400 seconds ≈ 100,000 (10^5) for quick approximation.
- **1 Million requests/day** = ~12 QPS average (~24-30 QPS peak).
- **10 Million requests/day** = ~116 QPS average (~230-300 QPS peak).
- **1 Billion requests/day** = ~11,600 QPS average (~25,000 QPS peak).

## 3. Powers of Two & Storage Prefixes
| Power | Approximate Value | Prefix |
|---|---|---|
| 2^10 | 1 Thousand (1,024) | 1 KB (Kilobyte) |
| 2^20 | 1 Million (1,048,576) | 1 MB (Megabyte) |
| 2^30 | 1 Billion (1,073,741,824) | 1 GB (Gigabyte) |
| 2^40 | 1 Trillion | 1 TB (Terabyte) |
| 2^50 | 1 Quadrillion | 1 PB (Petabyte) |

## 4. The 4-Step Estimation Framework
1. **Query Per Second (QPS):** Calculate average write & read requests, then apply 2x to 3x peak multiplier.
2. **Storage Growth:** Daily writes × payload size × 365 days × retention years × 1.3 (indexes & replication).
3. **Network Bandwidth:** Peak QPS × payload size (ingress for writes, egress for reads).
4. **Cache Sizing (80/20 Rule):** Cache 20% of daily read requests in RAM.`,
    updatedAt: '2026-10-01T08:30:00Z',
  },
  'caching': {
    ...fallbackConcepts[2],
    keyTakeawaysJson: '["Cache-Aside is the default pattern for general web workloads","Use Redis Sentinel or Redis Cluster for high availability","Prevent cache stampede using distributed locks or probabilistic early expiration"]',
    fullContentMarkdown: `# Distributed Caching Patterns & Invalidation

## 1. Core Caching Patterns
### Cache-Aside (Lazy Loading)
The application first queries the cache. On miss, it queries the database and populates the cache for future requests.
- **Pros:** Resilience to cache failure; only requested data is cached.
- **Cons:** Cache miss penalty on first request; potential stale data.

### Write-Through
Data is written to the cache and the primary datastore synchronously in a single transaction.
- **Pros:** Fast reads; consistency between cache and DB.
- **Cons:** Higher write latency; unused data pollutes cache memory.

### Write-Behind (Write-Back)
Data is written immediately to cache, and an asynchronous daemon batches writes to the datastore.
- **Pros:** Maximum write throughput and lowest write latency.
- **Cons:** Risk of permanent data loss if cache node crashes before flush.

## 2. Invalidation Strategies & Thundering Herd
- **TTL (Time to Live):** Guarantees eventual freshness.
- **Cache Stampede Prevention:** Use Redis Lua mutex or probabilistic early expiration (XFetch algorithm) to prevent thousands of threads from saturating the DB simultaneously.`,
    updatedAt: '2026-10-01T09:00:00Z',
  },
  'load-balancing': {
    ...fallbackConcepts[3],
    keyTakeawaysJson: '["Layer 4 operates on TCP/UDP IPs and ports; Layer 7 inspects HTTP headers, cookies, and URLs","Consistent Hashing maps servers and keys onto a 2^32 ring to minimize remapping during node changes","Virtual nodes solve uneven hash distribution"]',
    fullContentMarkdown: `# Load Balancing Strategies & Consistent Hashing

## 1. Layer 4 vs Layer 7 Load Balancing
- **Layer 4 (Transport):** Operates on IP address and TCP/UDP port without decrypting payload. Ultra-fast, minimal CPU overhead (e.g. AWS NLB, IPVS).
- **Layer 7 (Application):** Terminates TLS, parses HTTP headers, cookies, and URL paths to route traffic intelligently (e.g. AWS ALB, NGINX, Envoy).

## 2. Consistent Hashing Explained
Traditional modulo hashing (\`hash(key) % N\`) causes 90%+ cache misses whenever a server is added or removed.
Consistent Hashing distributes both servers and keys onto a circular ring (0 to 2^32 - 1). When a server node is added, only \`K / N\` keys need remapping. Virtual nodes (e.g. 100-256 tokens per physical node) guarantee uniform key distribution and eliminate hot spots.`,
    updatedAt: '2026-10-01T09:30:00Z',
  },
  'database-scaling': {
    ...fallbackConcepts[4],
    keyTakeawaysJson: '["Master-Replica separates read traffic from write traffic but introduces replication lag","Sharding partitions data horizontally across database instances","Choose shard key carefully to avoid cross-shard joins and hot partitions"]',
    fullContentMarkdown: `# Database Scaling: Sharding vs Replication

## 1. Master-Slave (Read Replica) Replication
Writes route exclusively to the Master instance, which asynchronously streams WAL (Write-Ahead Logs) to read replicas.
- **Pros:** Scales read throughput linearly; simple failover.
- **Cons:** Master remains a single bottleneck for writes; replication lag causes read-after-write inconsistency.

## 2. Horizontal Sharding
Partitioning a single logical table across multiple independent physical databases.
- **Shard Key Strategies:**
  - Range-based (e.g. user_id 1-1M on Shard 1). Prone to uneven load.
  - Hash-based (e.g. \`crc32(user_id) % num_shards\`). Uniform distribution.
  - Directory-based lookup service.
- **Challenges:** Cross-shard distributed joins, two-phase commits (2PC), and resharding during cluster expansion.`,
    updatedAt: '2026-10-01T10:00:00Z',
  },
};

const fallbackInterviewQuestions: InterviewQuestion[] = [
  {
    id: 'f1111111-aaaa-bbbb-cccc-111111111111',
    title: 'How do you design a system to prevent Double Booking in a Hotel Reservation platform?',
    category: 'SYSTEM_DESIGN',
    difficulty: 'INTERMEDIATE',
    questionText: 'Design an inventory reservation system where multiple users can browse and attempt to book the same limited hotel rooms concurrently without double bookings occurring.',
    answerGuide: 'To guarantee no double booking: 1. Use Optimistic Locking with a version column on room availability or Pessimistic Locking (SELECT FOR UPDATE) on the inventory row during checkout. 2. Implement a 10-minute temporary reservation lock via Redis TTL key lock:hotel:{id}:room:{id}. 3. Backed by PostgreSQL unique constraint on (room_id, booking_date). 4. Idempotency key passed on payment processing to guarantee single financial deduction.',
    keyPointsJson: '["Pessimistic vs Optimistic Locking","Distributed Redis lock with TTL","Database unique constraint on room_id + date","Payment idempotency token"]',
    createdAt: '2026-10-01T07:00:00Z',
  },
  {
    id: 'f2222222-aaaa-bbbb-cccc-222222222222',
    title: 'How do you handle Cache Stampede (Thundering Herd Problem)?',
    category: 'CACHING',
    difficulty: 'INTERMEDIATE',
    questionText: 'Explain what happens during a cache stampede when a hot cache key expires, and propose three architectural mitigations.',
    answerGuide: 'When a hot key expires, thousands of concurrent requests miss the cache and overwhelm the underlying database simultaneously. Mitigations: 1. Mutex Locking (e.g. Redis SETNX) allowing only one thread to regenerate the cache while others await or retry. 2. Probabilistic Early Expiration (XFetch algorithm) where requests proactively recompute the key before it officially expires. 3. Background Cron Refresh for predictable hot resources.',
    keyPointsJson: '["Mutex / Lock on cache miss","Probabilistic Early Invalidation (XFetch)","Background worker asynchronous revalidation"]',
    createdAt: '2026-10-01T07:30:00Z',
  },
];

const fallbackTemplates: SystemTemplate[] = [
  {
    id: 'tinyurl',
    name: 'TinyURL Distributed URL Shortener',
    description: 'High read-to-write ratio URL redirection system with compact payloads',
    dailyActiveUsers: 10_000_000,
    requestsPerUserDay: 10.0,
    readWriteRatio: 10.0,
    payloadSizeBytes: 500,
    retentionYears: 5,
    peakMultiplier: 2.0,
  },
  {
    id: 'twitter',
    name: 'Social Timeline / Twitter Feed',
    description: 'Massive read-dominant feed system with 100:1 read:write ratio',
    dailyActiveUsers: 300_000_000,
    requestsPerUserDay: 20.0,
    readWriteRatio: 100.0,
    payloadSizeBytes: 1024,
    retentionYears: 5,
    peakMultiplier: 2.5,
  },
  {
    id: 'chat',
    name: 'Real-Time Chat Platform',
    description: 'High write frequency messaging application with fast retention',
    dailyActiveUsers: 50_000_000,
    requestsPerUserDay: 100.0,
    readWriteRatio: 2.0,
    payloadSizeBytes: 200,
    retentionYears: 3,
    peakMultiplier: 3.0,
  },
  {
    id: 'video',
    name: 'Video Streaming Metadata Service',
    description: 'Large media metadata and catalog retrieval pipeline',
    dailyActiveUsers: 50_000_000,
    requestsPerUserDay: 5.0,
    readWriteRatio: 50.0,
    payloadSizeBytes: 5000,
    retentionYears: 5,
    peakMultiplier: 2.0,
  },
];
