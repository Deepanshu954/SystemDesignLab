# Point 6: SEO Strategy & Implementation Plan (2 Marks)
**Course:** CSET489 — Search Engine Optimization & Web Strategies  
**Milestone:** Milestone I — Research, Analysis, Project Design & Deployment  

---

## 6.1 Chronological 14-Week SEO Roadmap (Semester Execution Plan)

Our SEO strategy is organized into a four-phase chronological roadmap mapped across the academic semester from initial research through final Milestone II evaluation:

```
+-------------------------------------------------------------------------------------------------------+
| PHASE 1: RESEARCH, ARCHITECTURE & CLOUD SETUP (Weeks 1–4)                                             |
| [X] Evergreen Niche Selection & Audience Persona Definition                                           |
| [X] Comprehensive Keyword Research (SEMrush, GKP) with KD < 20 Filter                                 |
| [X] SERP Analysis, PAA Scraping & Direct Competitor Gap Breakdown                                     |
| [X] Cloud VPS Provisioning (LEMP Stack), Cloudflare Edge DNS, and Full SSL Configuration              |
+-------------------------------------------------------------------------------------------------------+
                                                   |
                                                   v
+-------------------------------------------------------------------------------------------------------+
| PHASE 2: TECHNICAL SEO & MILESTONE I SUBMISSION (Weeks 5–7)                                            |
| [X] Implementation of Dynamic XML Sitemap (/sitemap.xml) & Robots.txt Directives                      |
| [X] Core Web Vitals Optimization (Sub-second LCP: 0.85s, Zero CLS: 0.00)                               |
| [X] Schema.org JSON-LD Structured Data Deployment (TechArticle, SoftwareApplication, FAQPage)          |
| [X] Full WordPress Deployment, UpdraftPlus Cloud Backup Generation, and Report Submission              |
+-------------------------------------------------------------------------------------------------------+
                                                   |
                                                   v
+-------------------------------------------------------------------------------------------------------+
| PHASE 3: CONTENT ROLLOUT & ON-PAGE OPTIMIZATION (Weeks 8–11)                                          |
| [ ] Publishing 6 Core Architectural Case Studies (URL Shortener, Rate Limiter, Notification, Chat)    |
| [ ] Deployment of Interactive Math Tools (/tools/capacity-calculator, /tools/decision-matrix)         |
| [ ] On-Page Meta Tag, OpenGraph, and Semantic Heading Hierarchy Optimization                           |
| [ ] Internal Contextual Linking Silo Enforcement (Pillar-to-Cluster linking)                           |
+-------------------------------------------------------------------------------------------------------+
                                                   |
                                                   v
+-------------------------------------------------------------------------------------------------------+
| PHASE 4: OFF-PAGE OUTREACH & MILESTONE II SHOWCASE (Weeks 12–14)                                      |
| [ ] High-Authority Developer Community Outreach (Reddit r/programming, Hacker News, Dev.to, Medium)   |
| [ ] Open-Source GitHub Repository Backlink Integration (SystemDesignLab Repo)                          |
| [ ] Google Search Console (GSC) Performance Tracking (Impressions, Clicks, CTR, Average Position)     |
| [ ] Milestone II Final Viva, Performance Showcase & Ranking Demonstration                              |
+-------------------------------------------------------------------------------------------------------+
```

---

## 6.2 Detailed Pillar-by-Pillar Execution Plan

### Pillar 1: Technical SEO Hardening (Priority: High | Weeks 1–6)
- **Zero-Crawl-Error Target:** Validate all URLs via Google Search Console URL Inspection API to ensure 100% 200 OK responses with zero 4xx/5xx crawl errors.
- **Protocol & Subdomain Unification:** Enforce single authoritative origin via Cloudflare page rules (301 redirect all `http://` and `http://www` traffic to `https://systemdesignlab.dev`).
- **Mobile-First Responsiveness:** Verify 100% viewport compliance across mobile devices using Chrome DevTools device emulators and Next.js responsive Tailwind layouts.
- **Automated XML Sitemap Pinging:** Submit `https://systemdesignlab.dev/sitemap.xml` directly to Google Search Console and Bing Webmaster Tools.

### Pillar 2: Content Rollout & Publishing Cadence (Priority: High | Weeks 7–10)
- **Batch 1 (Week 7):** Foundational Pillar Pages (`/fundamentals/hld-vs-lld`, `/fundamentals/capacity-estimation`, `/fundamentals/caching`).
- **Batch 2 (Week 8):** Core Case Studies (`/case-studies/url-shortener`, `/case-studies/rate-limiter`).
- **Batch 3 (Week 9):** Advanced Case Studies (`/case-studies/notification-system`, `/case-studies/chat-system`).
- **Batch 4 (Week 10):** Interview Preparation Hub & Cheat Sheets (`/interview-prep/beginners`).
- **Minimum Content Quality Gate:** Every article must exceed **2,500 words**, include at least 1 custom architecture diagram, 1 structured data table, and an FAQ accordion targeting PAA queries.

### Pillar 3: On-Page Optimization Standards (Priority: Medium | Weeks 8–11)
- **Title Tag Formula:** `[Primary Keyword] — [Actionable Value Hook] | System Design Lab` (Maximum 58 characters).
- **Meta Description Formula:** Active voice, contains primary keyword and CTA, under 155 characters.
- **Header Tag Discipline:** Single `<h1>` identical to the search query concept; semantic `<h2>` tags targeting secondary keywords; `<h3>` tags targeting LSI terms.
- **Image Optimization:** All architectural diagrams served in vector SVG format with descriptive `alt` tags and explicit aspect ratios to prevent CLS layout shifts.

### Pillar 4: Off-Page & Authority Building Outreach (Priority: Medium | Weeks 11–14)
- **GitHub Link Equity:** Feature the live web app link in the official GitHub repository README (PR 4+ domain authority link).
- **Developer Community Syndication:** Share canonical-referenced case study breakdowns on Dev.to and Hashnode with direct backlink attribution to the interactive calculator.
- **Technical Forum Citations:** Provide authoritative answers on StackOverflow and Reddit (`r/cscareerquestions`, `r/systemdesign`) linking to the live Capacity Sizing Calculator as a free utility.
