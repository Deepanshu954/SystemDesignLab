# Point 5: Keyword-to-Page/Content Mapping (2 Marks)
**Course:** CSET489 — Search Engine Optimization & Web Strategies  
**Milestone:** Milestone I — Research, Analysis, Project Design & Deployment  

---

## 5.1 Architectural Site Hierarchy & URL Taxonomy

To ensure flawless crawling efficiency for Googlebot and prevent orphan pages, **System Design Lab** uses a strictly structured, non-overlapping URL taxonomy:

```
https://systemdesignlab.dev/
├── /                                           (Homepage — Root Authority)
├── /about                                      (About Us, Author E-E-A-T, Mission)
├── /fundamentals/                              (Category Pillar: Core Concepts)
│   ├── /fundamentals/hld-vs-lld               (High-Level vs Low-Level Design)
│   ├── /fundamentals/capacity-estimation      (Back-of-the-Envelope Math Formulas)
│   ├── /fundamentals/caching                  (Distributed Caching Strategies)
│   └── /fundamentals/consistent-hashing       (Consistent Hashing & Hash Rings)
├── /case-studies/                              (Category Pillar: Architecture Case Studies)
│   ├── /case-studies/url-shortener            (TinyURL Architecture Blueprint)
│   ├── /case-studies/rate-limiter             (Distributed Rate Limiter Design)
│   ├── /case-studies/notification-system      (Scalable Notification Engine)
│   └── /case-studies/chat-system              (High-Throughput Chat Architecture)
├── /tools/                                     (Category Pillar: Interactive Engineering Tools)
│   ├── /tools/capacity-calculator             (Real-Time Capacity Sizing Engine)
│   └── /tools/decision-matrix                 (SQL vs NoSQL vs NewSQL Trade-Off Matrix)
├── /interview-prep/                            (Category Pillar: Interview Strategy & Guides)
│   └── /interview-prep/beginners              (Beginner 4-Step Framework & Scoring Rubric)
└── /blog/                                      (WordPress Content & Editorial Hub)
    ├── /blog/system-design-roadmap-2026       (Long-Form Evergreen Guide)
    └── /blog/best-system-design-courses       (Commercial Review & Comparison)
```

---

## 5.2 Complete Keyword-to-Page Mapping Matrix

Every page is assigned a single primary focus keyword to strictly eliminate **Keyword Cannibalization** (where multiple pages compete and split PageRank on the same search term).

| Page Title | Target URL Taxonomy | Primary Target Keyword | Search Volume & KD | Secondary Keywords | LSI / Semantic Terms | Search Intent | Cannibalization Prevention Directive |
|---|---|---|:---:|---|---|:---:|---|
| **Homepage** | `/` | `system design lab` | 1,200 (KD: 12%) | `interactive system design platform`, `system design practice` | Architecture lab, interview preparation, distributed systems | Navigational / Commercial | Exclusively targets brand and broad platform queries. Never targets specific case study terms. |
| **About Us & E-E-A-T** | `/about` | `system design lab team` | 250 (KD: 5%) | `system design author`, `about system design lab` | Engineering background, cloud certifications, Bennett University, authorship | Navigational | Contains author bios, schema credentials, and academic affiliation. No ranking competition with learning guides. |
| **Capacity Calculator** | `/tools/capacity-calculator` | `system design capacity estimation` | 5,400 (KD: 32%) | `qps calculator system design`, `storage capacity calculator online` | Daily Active Users, Peak QPS, 80/20 rule, memory cache footprint, TB/year | Calculative / Utility | Sole owner of all "calculator", "estimation tool", and "sizing calculator" search queries. |
| **Architecture Decision Matrix** | `/tools/decision-matrix` | `system design decision matrix` | **1,900 (KD: 18%)** | `sql vs nosql decision tree`, `database selection matrix` | ACID compliance, Cassandra vs DynamoDB, latency, consistency models | Commercial / Comparative | Sole owner of technology comparison matrices and database evaluation queries. |
| **URL Shortener Study** | `/case-studies/url-shortener` | `url shortener system design` | 18,100 (KD: 54%) | `design tinyurl interview`, `url shortening architecture` | Base62 encoding, Key Generation Service (KGS), ScyllaDB, redirect latency | Informational / Deep Dive | Sole owner of "TinyURL" and "URL shortener" queries. Cross-links to Calculator without stealing its keyword. |
| **Rate Limiter Study** | `/case-studies/rate-limiter` | `rate limiter system design` | 9,900 (KD: 46%) | `distributed rate limiter architecture`, `token bucket rate limiter` | Sliding window counter, Redis Lua scripts, 429 Too Many Requests, Leaky Bucket | Informational / Deep Dive | Sole owner of rate-limiting algorithms and DDoS throttling queries. |
| **HLD vs LLD Guide** | `/fundamentals/hld-vs-lld` | `hld vs lld` | 14,800 (KD: 24%) | `difference between high level design and low level design`, `hld and lld in software engineering` | System architecture, class diagrams, microservices boundaries, database schema | Informational | Sole owner of high-level vs low-level design comparison queries. |
| **Caching Strategies** | `/fundamentals/caching` | `distributed caching strategies` | 4,400 (KD: 38%) | `cache aside pattern`, `write through vs write back cache` | Cache stampede, thundering herd, TTL, Redis cluster, LRU eviction | Informational | Sole owner of caching patterns. Never targets general database terms. |
| **Capacity Math Guide** | `/fundamentals/capacity-estimation` | `qps calculation formula system design` | **2,100 (KD: 17%)** | `how to calculate qps in system design`, `back of the envelope calculations` | Read-write ratio, ingress bandwidth, server estimation, second in a day (86,400) | Informational | Explains mathematical theory and formulas, then deep-links to `/tools/capacity-calculator` for execution. |
| **Interview Framework** | `/interview-prep/beginners` | `system design interview framework` | 6,600 (KD: 41%) | `system design for beginners`, `how to approach system design interview` | 45-minute breakdown, clarifying questions, API design, trade-offs, rubrics | Informational | Sole owner of interview process, timing cheat sheets, and beginner frameworks. |
| **Blog: Best Courses** | `/blog/best-system-design-courses` | `best system design courses 2026` | 8,100 (KD: 62%) | `top system design interview courses`, `system design primer review` | ByteByteGo, Educative, NeetCode, Udemy, course curriculum, pricing | Commercial Investigation | Hosted on WordPress hub; reviews external courses with honest pros/cons and directs users to our free tools. |

---

## 5.3 Cannibalization Prevention Enforcement Rules

1. **Strict 1-Keyword-Per-URL Policy:** No two pages share the same `<h1>` or primary meta title keyword.
2. **Distinct Search Intent Separation:** Theory queries live in `/fundamentals/`, interactive calculators live in `/tools/`, and implementation breakdowns live in `/case-studies/`.
3. **Internal Anchor Text Discipline:** When linking from `/case-studies/url-shortener` to `/tools/capacity-calculator`, anchor text always reads: *"calculate TinyURL capacity and QPS"* (utility phrase) rather than just *"url shortener"*, preventing anchor dilution.
