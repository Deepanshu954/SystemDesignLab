# Architecture & Engineering Decisions Log — System Design Lab

| ID | Decision Area | Chosen Standard | Rationale | Alternatives Considered |
|---|---|---|---|---|
| **ADR-001** | Repository Structure | Monorepo (`backend/` + `frontend/`) | Keeps full-stack contracts, documentation, and Docker Compose configurations tightly aligned in one workspace. | Polyrepo (separate repos) |
| **ADR-002** | Backend Framework | Spring Boot 3.3.x on Java 21 | Type-safe, enterprise-grade, comprehensive JPA ORM, robust security filters, and native OpenAPI generation. | Node/Express, Go/Gin, FastAPI |
| **ADR-003** | Frontend Framework | Next.js 14+ (App Router) + TypeScript | Outstanding SEO capabilities (SSR/SSG), automatic sitemaps, built-in metadata API, fast FCP and Core Web Vitals. | Vite SPA, Remix, Astro |
| **ADR-004** | Styling & Theme | Tailwind CSS with sleek Dark Mode tokens | Rapid prototyping, zero runtime CSS overhead, accessible contrast ratios, seamless responsive utilities. | Vanilla CSS only, Styled Components |
| **ADR-005** | Database Strategy | PostgreSQL 16 (Prod/Docker) + H2 (Dev/Test) | Relational integrity for user bookmarks, case study metadata, and calculation logs. H2 allows fast, zero-dependency test execution. | MongoDB, MySQL |
| **ADR-006** | Schema Migration | Flyway | Reproducible, version-controlled SQL migrations (`V1__init.sql`) ensuring consistency across environments. | Hibernate auto-ddl, Liquibase |
| **ADR-007** | API Specification | REST with `/api/v1/` prefix & RFC 7807 | Industry standard semantic versioning, predictable HTTP verbs, standardized ProblemDetail error payloads. | GraphQL, gRPC |
| **ADR-008** | Authentication | JWT (15-min access token + refresh token) | Stateless, scalable authentication for user-saved calculations and bookmarks without session state coupling. | Session cookies, OAuth2 only |
| **ADR-009** | Testing Strategy | JUnit 5 + Mockito (Backend) / Vitest + RTL (Frontend) | Unit testing for business logic (calculators, services) and slice testing for REST controllers. Fast test execution. | Jest, Cypress only |
| **ADR-010** | Containerization | Multi-stage Dockerfiles + Docker Compose | Isolates build steps, minimizes production image sizes (<400MB backend, <300MB frontend), non-root security. | Single-stage Docker |
