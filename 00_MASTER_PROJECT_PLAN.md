# System Design Lab — Complete Project Master Plan

## 1. Project Identity

**Working title:** System Design Lab — A Practical System Design & Backend Engineering Knowledge Hub

**Project type:** SEO + Content + Web Development + Technical Optimization + Measurement

**Primary objective:** Build a genuinely useful public website for BTech students and early-career software engineers, optimize it for relevant Google searches, publish original high-quality system-design resources, and measure whether the SEO work improves organic visibility.

**Team:**
1. Deepanshu Chauhan — Website Development / Technical SEO
2. Yash — Keyword Research / Audience Research
3. Anirudh — Content / On-Page SEO
4. Aditiya — Analytics / Testing / Evidence

---

# 2. What We Are Actually Building

This is **not** a generic blog containing random AI-generated articles.

The website will be a structured **system-design knowledge hub** where users can learn a concept, understand a complete architecture, perform capacity calculations, compare alternatives, and prepare for interviews.

A flagship page should answer:

> What is the problem?
> What are the requirements?
> How much traffic/storage do we expect?
> What architecture should we use?
> Why?
> What are the alternatives?
> What happens when the system scales or fails?
> How would the design change under different constraints?

The website should combine:

- System Design Fundamentals
- HLD
- LLD
- Distributed Systems
- Backend Engineering
- Real-world System Design Case Studies
- Interview Preparation
- Capacity Estimation
- Architecture Diagrams
- Design Trade-offs
- Practical examples
- Selected calculators/tools

---

# 3. Why This Project Is Suitable for the SEO Course

The course requires more than recommendations. We need actual implementation, a baseline, final evidence, a change log, testing, and individual responsibility.

Our project therefore follows:

```text
Research
   ↓
Search Intent
   ↓
Keyword/Page Strategy
   ↓
Information Architecture
   ↓
Website Implementation
   ↓
Original Content
   ↓
Technical + On-page SEO
   ↓
Publish + Index
   ↓
Measure
   ↓
Optimize
   ↓
Measure Again
```

The course handbook explicitly expects a clear audience/problem, research, working implementation, technical correctness, reproducible measurement, ethics, and a clear demo/viva story.

---

# 4. Target Audience

## Primary audience

BTech/Computer Science students and early-career software developers, primarily in India and consuming English-language technical content.

## Persona A — System Design Beginner

Needs:
- Understand HLD and LLD
- Learn basic architecture concepts
- Know what components do
- Follow a beginner-friendly path

Typical queries:
- system design for beginners
- hld vs lld
- what is load balancing

## Persona B — Placement / Interview Candidate

Needs:
- Solve common design questions
- Understand interview expectations
- Practice capacity estimation
- Learn common architectures

Typical queries:
- url shortener system design
- rate limiter system design
- system design interview questions

## Persona C — Early Backend Engineer

Needs:
- Understand production trade-offs
- Compare databases/caches/queues
- Reason about scaling and failure

Typical queries:
- redis caching system design
- database sharding vs replication
- kafka vs rabbitmq

---

# 5. Search Objective

We are trying to grow **organic search visibility**, not merely demonstrate SEO in a local environment.

Success is not defined as "guaranteed #1." Rankings depend on Google systems, competition, indexing, authority, query demand and time.

Our measurable objective is:

> Improve organic visibility for carefully selected, relevant queries through technically accessible pages, useful original content, strong site architecture and ethical SEO.

Primary SEO outcomes:
- More impressions
- More relevant queries
- More clicks
- Better CTR where appropriate
- Better average positions over time
- More indexed useful pages
- Growth of non-branded organic visibility

---

# 6. Search Strategy

## Principle

Do not target only huge head terms.

Instead build topic clusters containing:
- broad concepts
- specific questions
- comparison queries
- case-study queries
- problem/design queries
- beginner queries

Example:

```text
Cluster: URL Shortener

Primary:
url shortener system design

Supporting:
url shortener architecture
url shortener database design
url shortener capacity estimation
tinyurl system design
url shortening system design
```

One strong page should satisfy related queries with the same dominant intent instead of creating several thin pages.

---

# 7. Initial Keyword/Page Plan

These are starter hypotheses only. Member 2 must validate them through real SERP research before finalizing the keyword set.

| Search phrase | Planned page |
|---|---|
| url shortener system design | /case-studies/url-shortener |
| rate limiter system design | /case-studies/rate-limiter |
| system design interview questions for beginners | /interview-prep/beginners |
| high level design vs low level design | /fundamentals/hld-vs-lld |
| system design capacity estimation | /fundamentals/capacity-estimation |

Potential additional clusters:
- notification system design
- chat application system design
- file storage system design
- video streaming system design
- distributed cache system design
- API gateway architecture
- database replication vs sharding
- message queue architecture
- consistent hashing explained
- load balancer system design

No query is final until intent and SERP competition have been checked.

---

# 8. Content Strategy

## Content should be organized into layers

```text
                    SYSTEM DESIGN
                          │
       ┌──────────────────┼──────────────────┐
       ▼                  ▼                  ▼
  Fundamentals        Case Studies       Interview Prep
       │                  │                  │
       ▼                  ▼                  ▼
 Concepts            URL Shortener        Beginner path
 Databases           Rate Limiter         Questions
 Caching             Notification         Patterns
 Scaling             Chat                 Practice
```

## Core content categories

### Fundamentals
- HLD vs LLD
- CAP theorem
- consistency
- availability
- latency
- load balancing
- caching
- queues
- replication
- sharding
- indexing
- rate limiting
- consistent hashing
- capacity estimation

### Case studies
Start with approximately 4–6 excellent case studies rather than 20 weak ones:
- URL Shortener
- Rate Limiter
- Notification System
- Chat System
- File Storage System
- Video/Content Delivery System

Final topics depend on keyword research and implementation capacity.

### Interview preparation
- beginner roadmap
- common patterns
- how to approach a design problem
- capacity estimation
- common mistakes
- follow-up questions

### Tools
Possible:
- Capacity calculator
- QPS/storage calculator
- architecture decision matrix
- system-design checklist

Tools are supporting assets, not substitutes for useful content.

---

# 9. Standard Flagship Page Structure

Every flagship system-design case study should follow a consistent format.

```text
1. Problem Statement
2. Who Uses the System?
3. Functional Requirements
4. Non-functional Requirements
5. Assumptions
6. Capacity Estimation
7. API Design
8. Data Model
9. High-Level Architecture
10. Component Responsibilities
11. Detailed Data/Request Flow
12. Storage Choice
13. Caching Strategy
14. Queue/Async Processing
15. Scaling Strategy
16. Failure Scenarios
17. Security Considerations
18. Low-Level Design
19. Alternatives
20. Trade-offs
21. Bottlenecks
22. Final Architecture
23. Interview Follow-ups
24. References
```

---

# 10. Original Value Strategy

Each important page should contain multiple elements that make it materially more useful than a generic rewrite:

- Original architecture diagram
- Original worked capacity example
- Explicit assumptions
- Trade-off matrix
- Failure-mode analysis
- API examples
- Data-model explanation
- Practical implementation notes
- Useful links to related concepts
- Interactive calculation where useful

Example:

```text
10M users
20% DAU
5 requests/user/day

DAU = 2M
Requests/day = 10M
Average QPS = 10M / 86,400
Peak QPS = average × chosen peak factor
```

All such numbers must be clearly labeled as assumptions/example calculations rather than presented as real production statistics without evidence.

---

# 11. HLD Philosophy

HLD should answer:

- What are the major components?
- Why do they exist?
- How do they communicate?
- Where does state live?
- What scales independently?
- Where can the system fail?

Example:

```text
Client
   ↓
API Gateway
   ↓
Application Service
 ┌─┴─────────┐
 ▼           ▼
Cache      Database
 │
 ▼
Queue → Workers
```

The explanation matters more than the diagram alone.

---

# 12. LLD Philosophy

LLD should show selected implementation-level decisions:

- classes/interfaces where useful
- API contracts
- entities
- validation
- error handling
- concurrency concerns
- persistence interactions
- relevant design patterns

We will avoid unnecessary code dumps.

---

# 13. Information Architecture

Recommended top-level routes:

```text
/
├── fundamentals/
│   ├── hld-vs-lld
│   ├── capacity-estimation
│   ├── load-balancing
│   ├── caching
│   ├── database-scaling
│   └── rate-limiting
│
├── case-studies/
│   ├── url-shortener
│   ├── rate-limiter
│   ├── notification-system
│   ├── chat-system
│   └── ...
│
├── distributed-systems/
│
├── backend/
│
├── interview-prep/
│
└── tools/
```

Navigation must expose the conceptual hierarchy.

Internal links should be contextual:
- URL Shortener → Caching
- URL Shortener → Database Indexing
- Rate Limiter → Distributed Systems
- Capacity Estimation → relevant case studies

---

# 14. HLD — Website Architecture

```text
                         Google Search
                              │
                              ▼
                         Vercel / CDN
                              │
                              ▼
                       Next.js Application
                              │
          ┌───────────────────┼───────────────────┐
          ▼                   ▼                   ▼
      Route Layer         Content Layer       SEO Layer
          │                   │                   │
          ▼                   ▼                   ▼
   Page Templates       MDX/Metadata        Sitemap
   Layout               Diagrams            Robots
   Components           Data                Canonical
                                           JSON-LD
                              │
                              ▼
                     Fast rendered pages
```

---

# 15. LLD — Suggested Repository

```text
src/
├── app/
│   ├── page.tsx
│   ├── fundamentals/
│   ├── case-studies/
│   ├── distributed-systems/
│   ├── backend/
│   ├── interview-prep/
│   ├── tools/
│   ├── sitemap.ts
│   ├── robots.ts
│   └── layout.tsx
│
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Breadcrumbs.tsx
│   ├── TableOfContents.tsx
│   ├── ArchitectureDiagram.tsx
│   ├── RelatedPages.tsx
│   └── JsonLd.tsx
│
├── content/
│   ├── fundamentals/
│   ├── case-studies/
│   └── interview-prep/
│
└── lib/
    ├── content.ts
    ├── metadata.ts
    ├── links.ts
    └── validation.ts
```

---

# 16. Technical SEO Requirements

The website should have:

- HTTPS
- clean descriptive URLs
- crawlable HTML links
- working navigation without requiring inaccessible JS-only interactions
- XML sitemap
- robots.txt
- correct canonical URLs
- unique titles
- useful meta descriptions
- one clear H1
- semantic heading hierarchy
- meaningful alt text
- mobile-friendly layouts
- fast loading pages
- valid structured data where appropriate
- no accidental noindex
- no broken internal links

Google's documentation explains that crawling, indexing, canonicalization, rendering, structured data and search appearance are related but distinct concerns.

---

# 17. Structured Data

Use only markup supported by the actual page content.

Likely useful types:
- Article
- BreadcrumbList
- Organization

Possibly others when genuinely applicable.

Requirements:
- visible facts must match marked-up facts
- do not invent authors, ratings or other properties
- validate representative pages
- retain validation evidence

Structured data can help Google understand page content, but valid markup does not guarantee a rich result.

---

# 18. Performance

Measure:
- LCP
- INP where field data exists
- CLS
- image weight
- JS/CSS weight
- font behavior
- third-party requests

Use:
- Lighthouse
- PageSpeed Insights
- browser DevTools

Run repeated tests under consistent conditions.

Performance is a quality/UX dimension; do not treat a Lighthouse score as a direct ranking guarantee.

---

# 19. SEO Execution Strategy

## Phase A — Research
- collect queries
- classify intent
- inspect SERPs
- analyze competing content
- identify gaps

## Phase B — Build
- architecture
- page templates
- content
- diagrams
- tools

## Phase C — Optimize
- title
- headings
- description
- internal links
- canonical
- sitemap
- robots
- structured data
- performance
- mobile UX

## Phase D — Publish
- deploy
- verify Google can access pages
- submit sitemap
- inspect representative URLs

## Phase E — Authority and distribution
Ethical activities only:
- share with genuinely relevant student/technical communities
- obtain legitimate references/mentions where deserved
- contribute useful resources to relevant communities
- avoid paid/manipulative link schemes

## Phase F — Measure and iterate
- Search Console
- page/query analysis
- technical rechecks
- update content based on evidence
- record every important change

---

# 20. Measurement Framework

## Baseline

Freeze:
- date
- Git commit/version
- URL inventory
- sitemap state
- robots state
- canonical state
- indexability state
- Lighthouse/PageSpeed results
- initial Search Console status

## After publishing

Track:
- impressions
- clicks
- CTR
- average position
- query coverage
- top pages
- indexed useful pages where observable

## Technical measurements
- broken links
- metadata completeness
- Core Web Vitals/lab metrics
- sitemap validity
- schema validation

Interpret results cautiously.

---

# 21. Ranking Experiment

We will not change everything at the same moment.

Possible controlled interventions:

### Experiment 1 — Title improvements
Select a set of pages with impressions but weak CTR.

Change:
- titles
- descriptions if appropriate

Observe:
- CTR
- impressions
- average position

### Experiment 2 — Internal linking
Select under-discovered/deep pages.

Change:
- contextual internal links
- anchors
- hub connections

Observe:
- internal graph/depth
- indexing/discovery indicators
- organic visibility over time

### Experiment 3 — Performance
Select pages with measurable performance bottlenecks.

Change:
- image delivery
- JS reduction
- layout stability
- font loading

Observe:
- lab metrics
- field metrics where available
- page/query visibility over time

Any ranking movement is an observation; not every change permits causal claims.

---

# 22. Ethical Boundaries

Never:
- buy spammy links
- create fake reviews
- fabricate data
- keyword stuff
- create doorway pages
- hide text
- manipulate clicks
- copy competitor articles/diagrams
- publish misleading structured data
- scrape systems against restrictions
- expose private analytics data

Originality and evidence are core project requirements.

---

# 23. Data We Need

## Internal/original
- capacity calculation examples
- original system-design diagrams
- comparison matrices
- worked examples
- failure scenarios
- selected benchmark calculations
- potentially a small student/interviewer survey if feasible

## External/reference
- official technical documentation
- reputable technical sources
- standards/specifications where applicable
- source log for factual claims

Keep source URLs and access dates.

---

# 24. Suggested MVP

Do not overbuild.

### Core pages
- Home
- Fundamentals index
- HLD vs LLD
- Capacity Estimation
- Caching
- Load Balancing
- Interview Prep
- URL Shortener case study
- Rate Limiter case study
- Notification System case study

Then expand only if the content quality and SEO execution remain strong.

---

# 25. Definition of Done

The project is complete when:

### Website
- deployed
- responsive
- navigation works
- important pages return expected status
- no major broken links

### SEO
- target keyword/page map exists
- titles/descriptions are unique
- canonical strategy implemented
- robots/sitemap correct
- internal links implemented
- structured data validated where used

### Content
- flagship pages are substantive
- original diagrams/examples exist
- sources recorded
- content QA completed

### Measurement
- baseline frozen
- Search Console configured if possible
- performance tests repeated
- before/after comparison completed
- raw evidence retained

### Coursework
- contribution log completed
- AI-use log completed if required
- permissions/privacy statement completed
- report completed
- 8–10 minute demo ready
- each member able to explain their own work

---

# 26. 10-Week Execution Plan

Dates are planning targets and can move with instructor milestones.

## Week 1 — Project lock
- finalize project concept
- assign ownership
- repository
- audience definition
- initial seed queries

## Week 2 — SERP research
- keyword dataset
- intent classification
- competitors
- information architecture

## Week 3 — HLD + content architecture
- page map
- URL strategy
- templates
- content briefs
- technical architecture

## Week 4 — MVP build
- home
- navigation
- templates
- first content
- deployment

## Week 5 — Core content
- first flagship case studies
- fundamentals
- diagrams
- on-page optimization

## Week 6 — Technical SEO
- sitemap
- robots
- canonical
- metadata
- structured data
- internal links

## Week 7 — Quality and performance
- mobile QA
- Lighthouse/PageSpeed
- content QA
- broken-link check
- accessibility basics

## Week 8 — Publish/index/measure
- Search Console
- sitemap submission
- URL inspection
- baseline/follow-up comparison

## Week 9 — Optimization iteration
- improve underperforming pages
- test titles/internal links/performance where justified
- capture final evidence

## Week 10 — Freeze + demo
- final audit
- report
- contribution logs
- evidence repository
- 8–10 minute presentation
- individual viva preparation

---

# 27. Evidence Repository

```text
/evidence/
├── project/
│   ├── proposal/
│   ├── research/
│   └── architecture/
│
├── seo/
│   ├── keyword-map/
│   ├── metadata/
│   ├── sitemap/
│   ├── robots/
│   └── structured-data/
│
├── content/
│   ├── briefs/
│   ├── source-log/
│   ├── diagrams/
│   └── revisions/
│
├── measurement/
│   ├── baseline/
│   ├── search-console/
│   ├── pagespeed/
│   └── final/
│
└── logs/
    ├── change-log.md
    ├── ai-use-log.md
    └── contribution-log.md
```

---

# 28. Team Interfaces

Member 1 → website/technical infrastructure

Member 2 → keyword/page strategy

Member 3 → content/page quality

Member 4 → evidence/measurement

Important shared interfaces:

```text
Member 2 → Member 1
keyword/page map → URL/page implementation

Member 2 → Member 3
query clusters → content briefs

Member 3 → Member 1
content/components → published pages

Member 1 → Member 4
live URLs/technical state → measurement

Member 4 → All
data/observations → optimization decisions
```

---

# 29. Official/Authoritative Starting References

Use current Google Search Central documentation as the baseline for SEO behavior:

- Google Search documentation: https://developers.google.com/search/docs
- SEO Starter Guide
- How Google Search Works
- Search Essentials
- Spam policies
- Helpful/reliable/people-first content
- Crawling and indexing
- JavaScript SEO
- Canonicalization
- Sitemaps
- robots.txt
- Structured data
- Search Console
- Page Experience / Core Web Vitals
- Search appearance / AI features

Google's current documentation states that:
- crawling, indexing and serving are distinct stages;
- canonical preference is a hint and Google can select another canonical;
- structured data should represent visible/actual page content and be validated;
- AI features use the same fundamental Search SEO foundations.

---

# 30. Final Project Philosophy

The site should answer this test:

> **Would a real student prefer our page over a generic search result because it is genuinely clearer, more useful, more structured, and easier to apply?**

If the answer is yes, SEO is supporting a real product rather than creating SEO-shaped filler.

That is the standard for every page we publish.
