# UI Flows & Screen Specifications — System Design Lab

## 1. Global Navigation & Layout Architecture

### 1.1 Shell & Header
- **Brand Logo:** "System Design Lab" with glowing terminal icon and "BETA" / "LAB" pill badge.
- **Top Navigation Links:**
  - `Fundamentals` (Dropdown or direct link to `/fundamentals`)
  - `Case Studies` (`/case-studies`)
  - `Interview Prep` (`/interview-prep`)
  - `Calculators & Tools` (`/tools`)
- **Action Elements:**
  - Quick Search Modal (`Cmd+K` trigger): Instant fuzzy search across all concepts, case studies, and interview topics.
  - Theme Toggle: Dark mode (default sleek slate-900 background with cyan/indigo accents) and Light mode.
  - Bookmark Drawer: Quick access to user-saved articles and capacity calculations.

### 1.2 Footer
- Multi-column engineering sitemap:
  - Fundamentals (HLD vs LLD, Capacity Estimation, Caching, Load Balancing, Database Scaling)
  - Case Studies (TinyURL, Rate Limiter, Notification Engine, Chat Application)
  - Interactive Tools (Capacity Calculator, Architecture Matrix)
  - Project Info, GitHub repository link, Author attribution, and Course Compliance notice.

---

## 2. Key Screen Blueprints

### 2.1 Homepage (`/`)
- **Hero Section:**
  - H1: "Master System Design & Backend Architecture"
  - Subhead: "Production-grade distributed systems guides, real-world capacity estimation math, 24-step flagship case studies, and interview blueprints for software engineers."
  - CTA Buttons: "Explore Flagship Case Studies" (Primary) | "Interactive Capacity Calculator" (Secondary)
  - Live Stat Badges: 4 Flagship Studies • 5 Core Fundamentals • Interactive Tooling • 100% Free & Open Source
- **Feature Cards Grid:**
  - System Design Fundamentals (HLD vs LLD, Caching, Scaling)
  - 24-Step Flagship Case Studies
  - Interactive Back-of-the-Envelope Math Engine
  - Placement & Interview Battle-tested Frameworks
- **Featured Case Studies Showcase:**
  - Visual cards with difficulty pills, reading time, key technologies (Redis, Kafka, Cassandra, Postgres), and direct links.
- **Interactive Calculator Teaser:**
  - Mini QPS/Storage estimator widget directly usable on homepage.

### 2.2 Case Study Detail Page (`/case-studies/{slug}`)
- **Header Section:**
  - Breadcrumb: `Home > Case Studies > URL Shortener`
  - Title, badge (Beginner / Intermediate / Advanced), reading time, published date.
- **Sticky Sidebar (Desktop):**
  - Table of Contents with active scroll-spy highlighting the current section across the 24 steps.
  - Quick Action Buttons: "Save to Bookmarks", "Download PDF Summary", "Share".
- **Main Content Area (The 24-Step Flagship Standard):**
  - Highlighting key metrics, trade-offs, and failure scenarios.
  - Interactive Mermaid / SVG architecture diagrams with component click-to-explain tooltips.
  - Interactive worked capacity math calculator embedded in Section 6.
  - Side-by-side trade-off matrices in Section 20.
- **Feedback & Community Widget:**
  - 5-star rating widget, feedback comment box, and next recommended reading.

### 2.3 Fundamentals Hub & Topic Pages (`/fundamentals/*`)
- **Catalog View:** Grid grouped by categories: Architecture Fundamentals, Storage & Caching, Distributed Systems Primitives.
- **Flagship Detail View (e.g. `/fundamentals/hld-vs-lld`):**
  - Side-by-side comparison tables.
  - Visual artifacts: What an HLD deliverable looks like vs what an LLD deliverable looks like.
  - Latency Numbers Every Engineer Should Know interactive table (L1, RAM, NVMe SSD, Cross-datacenter RTT).

### 2.4 Interactive Capacity Calculator (`/tools/capacity-calculator`)
- **Input Parameters Panel:**
  - Sliders & numeric inputs:
    - Daily Active Users (DAU)
    - Requests per User per Day
    - Read:Write Ratio (e.g. 10:1, 100:1)
    - Average Payload Size (Bytes/KB)
    - Data Retention Period (Years)
    - Peak Traffic Multiplier (e.g. 2.0x, 3.0x)
- **Preset Template Buttons:** "TinyURL", "Twitter Feed", "WhatsApp Messages", "Video Streaming".
- **Dynamic Output Dashboard:**
  - Instant reactive calculations on both client and synchronized with Spring Boot backend:
    - Average QPS and Peak QPS cards
    - Read QPS vs Write QPS breakdown
    - Daily Data Ingestion (GB/day) & 5-Year Storage Projection (TB)
    - Ingress / Egress Network Bandwidth (Mbps / Gbps)
    - Recommended RAM Cache Sizing (80/20 Pareto rule)
  - Action buttons: "Save Calculation", "Copy Math Breakdown", "Share Link".

### 2.5 Interview Preparation Hub (`/interview-prep`)
- 45-Minute System Design Interview Framework step-by-step timeline.
- Common interview traps and how to handle ambiguities.
- Searchable & filterable question bank with expandable answer rubrics.
