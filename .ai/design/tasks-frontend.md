# Frontend Tasks — System Design Lab

- [x] **Task 1: Next.js Scaffold & Foundation Setup**
  - Initialize Next.js 14 App Router project in `frontend/` with TypeScript, Tailwind CSS, and Lucide icons.
  - Setup Vitest + React Testing Library for frontend testing.
  - Configure `lib/api.ts` (Axios client with base URL, error handling, and complete offline fallbacks) and `types/index.ts`.
  - Configure `globals.css` with dark mode tokens, typography, and glassmorphism utilities.
  - Verify `npm run build` and `npm test` succeed.

- [x] **Task 2: Design System, Navigation & Footer Components**
  - Implement `Header.tsx` (sticky navigation, logo, desktop links, mobile hamburger menu, search bar trigger, theme toggle).
  - Implement `Footer.tsx` (comprehensive engineering links, sitemap categories, copyright, course compliance info).
  - Implement `Breadcrumbs.tsx` with schema markup integration.
  - Implement `TableOfContents.tsx` with active scroll-spy.

- [x] **Task 3: High-Impact Homepage (`/`)**
  - Hero section with authoritative typography, value proposition, and primary CTAs.
  - Core feature pillars grid (Fundamentals, 24-Step Studies, Math Calculators, Interview Blueprints).
  - Featured Flagship Case Studies preview cards.
  - Live mini-calculator demo widget.

- [x] **Task 4: Interactive Capacity & Sizing Calculator (`/tools/capacity-calculator`)**
  - Implement dynamic sliders and numeric inputs (DAU, requests/user, read:write ratio, payload size, retention years).
  - Implement preset templates (TinyURL, Twitter/X, Chat, Video Streaming).
  - Real-time reactive cards for QPS (Avg & Peak), Ingress/Egress Bandwidth, Storage projections (Daily & 5-Year), and Cache RAM sizing.
  - Synchronize with backend calculation API (`/api/v1/calculator/capacity`).

- [x] **Task 5: Architecture Decision Matrix Tool (`/tools/decision-matrix`)**
  - Interactive comparison tool across databases, caches, and queues.
  - Side-by-side criteria evaluation (Consistency, Latency, Throughput, Complexity, Scalability).

- [x] **Task 6: Flagship Case Studies Module (`/case-studies/*`)**
  - Case studies index (`/case-studies/page.tsx`) with search and difficulty filters.
  - 4 complete, substantive 24-step flagship case study pages:
    - TinyURL Distributed URL Shortener (`/case-studies/url-shortener`)
    - Distributed Rate Limiter (`/case-studies/rate-limiter`)
    - Real-Time Notification Engine (`/case-studies/notification-system`)
    - High-Scale Chat System (`/case-studies/chat-system`)
  - Embed SVG architecture diagrams, worked calculations, trade-offs, and failure scenarios.

- [x] **Task 7: Fundamentals Knowledge Base (`/fundamentals/*`)**
  - Fundamentals index catalog (`/fundamentals/page.tsx`).
  - Flagship guides:
    - HLD vs LLD Complete Comparison (`/fundamentals/hld-vs-lld`)
    - Capacity Estimation & Back-of-the-Envelope Math (`/fundamentals/capacity-estimation`)
    - Distributed Caching Strategies (`/fundamentals/caching`)
    - Load Balancing & Consistent Hashing (`/fundamentals/load-balancing`)
    - Database Scaling: Sharding vs Replication (`/fundamentals/database-scaling`)

- [x] **Task 8: Interview Preparation Hub (`/interview-prep/*`)**
  - Interview prep index (`/interview-prep/page.tsx`) with 45-minute interview pacing guide.
  - Beginner System Design Roadmap (`/interview-prep/beginners/page.tsx`).
  - Searchable interview questions with expandable rubric answers.

- [x] **Task 9: Technical SEO Infrastructure**
  - Implement dynamic `sitemap.ts` generating `/sitemap.xml`.
  - Implement `robots.ts` serving `/robots.txt`.
  - Implement `JsonLd.tsx` structured data components (`TechArticle`, `BreadcrumbList`, `SoftwareApplication`, `Organization`).
  - Unique metadata, OpenGraph, and Twitter tags on every route.

- [x] **Task 10: Bookmarks, Feedback & Test Suite**
  - Quick bookmarking feature with localStorage and optional backend sync.
  - 5-Star feedback submission component connected to backend `/api/v1/feedback`.
  - Comprehensive unit and component tests (Vitest) for calculators, navigation, and SEO components.
  - Verify `npm run build` (22/22 static pages generated) and `npm test` (9/9 tests pass).
