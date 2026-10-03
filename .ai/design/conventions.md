# Conventions & Golden Rules — System Design Lab

This is the **GOLDEN FILE**. Every backend and frontend engineer, subagent, and automation tool MUST adhere strictly to the rules documented here.

---

## 1. Backend Conventions (Spring Boot 3.x / Java 21)

### 1.1 Package Structure
Package naming MUST follow: `com.app.modules.{feature}.{layer}`
Shared cross-cutting code MUST live in `com.app.common.{domain}`

```text
com.app
├── common
│   ├── base (BaseEntity, ApiResponse)
│   ├── exception (GlobalExceptionHandler, exceptions)
│   ├── security (SecurityConfig, JwtTokenProvider, Filters)
│   └── util (MathUtils, StringUtils)
└── modules
    ├── casestudy (entity, repository, service, controller, dto)
    ├── fundamentals (entity, repository, service, controller, dto)
    ├── interview (entity, repository, service, controller, dto)
    ├── calculator (service, controller, dto)
    ├── user (entity, repository, service, controller, dto)
    └── feedback (entity, repository, service, controller, dto)
```

### 1.2 Naming Conventions
- **Classes / Records / Interfaces / Enums:** `PascalCase` (e.g. `CaseStudyService`, `CapacityCalculationRequest`)
- **Methods / Variables / Parameters:** `camelCase` (e.g. `calculateCapacity()`, `dailyActiveUsers`)
- **Constants / Enum Values:** `UPPER_SNAKE_CASE` (e.g. `DEFAULT_PAGE_SIZE`, `ROLE_STUDENT`)
- **Database Tables / Columns:** `snake_case` (e.g. `case_studies`, `daily_active_users`)
- **DTO Naming:**
  - Requests: `Create{Entity}Request`, `Update{Entity}Request`, `{Feature}Request` (e.g. `CapacityCalculationRequest`)
  - Responses: `{Entity}Response`, `{Feature}Response` (e.g. `CaseStudyResponse`, `CapacityCalculationResponse`)
  - All DTOs MUST be Java 21 `record` types (immutable).

### 1.3 JPA & Persistence Rules
1. Every JPA entity MUST extend `BaseEntity` (which provides `id` UUID, `createdAt`, `updatedAt`, `version`).
2. **ALL entity relationships MUST be `FetchType.LAZY`**. Never use `FetchType.EAGER`.
3. Soft delete where required using `@SQLDelete` and `@SQLRestriction`.
4. Implement `equals` and `hashCode` based strictly on the immutable `id`.

### 1.4 Service & Transactional Boundaries
1. Annotate Service classes with `@Transactional(readOnly = true)`.
2. Annotate modifying methods explicitly with `@Transactional(rollbackFor = Exception.class)`.
3. Never invoke a `@Transactional` method from within the same class without self-injection or event publishing.

### 1.5 REST Controllers & Status Codes
- All API routes MUST begin with `/api/v1/`.
- Controllers must return `ResponseEntity<ApiResponse<T>>` or `ResponseEntity<T>`.
- Use `@Valid` on all `@RequestBody` inputs.
- Status codes:
  - `POST` → `201 Created`
  - `GET` / `PUT` → `200 OK`
  - `DELETE` → `204 No Content`
  - Validation failures → `400 Bad Request` with RFC 7807 `ProblemDetail`

---

## 2. Frontend Conventions (Next.js 14+ / TypeScript / Tailwind)

### 2.1 Directory Structure
- Feature code in `src/features/{featureName}/` or route handlers in `src/app/{route}/`.
- Reusable UI primitives in `src/components/ui/`.
- Domain components in `src/components/{domain}/`.
- Utilities and API clients in `src/lib/`.
- Shared TypeScript interfaces in `src/types/`.

### 2.2 Naming Conventions
- **Component Files:** `PascalCase.tsx` (e.g. `ArchitectureDiagram.tsx`, `Header.tsx`)
- **Hooks:** `camelCase.ts` prefixed with `use` (e.g. `useCapacityCalculator.ts`)
- **Utilities & APIs:** `camelCase.ts` (e.g. `api.ts`, `calculators.ts`)
- **TypeScript Types & Interfaces:** `PascalCase` (e.g. `CaseStudy`, `CapacityResult`)
- **Page & Layout Files:** Standard Next.js names (`page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`)

### 2.3 Component & State Rules
1. **Server Components by Default:** Keep components as Server Components unless interactivity, state (`useState`, `useEffect`), or browser APIs are required (`'use client'`).
2. **Tailwind CSS Styling:**
   - Always use defined color tokens: slate/zinc backgrounds, cyan-500/indigo-500 primary accents, emerald-500 for success/green badges.
   - Consistent responsive padding: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`.
3. **Form Handling:** React Hook Form + Zod resolvers with inline validation feedback.

---

## 3. Error Response Format (RFC 7807)
Both backend and frontend MUST observe the RFC 7807 specification:
```json
{
  "type": "https://systemdesignlab.dev/errors/{error-type}",
  "title": "Short Human-Readable Title",
  "status": 400,
  "detail": "Specific detail message about what went wrong",
  "instance": "/api/v1/current/path",
  "timestamp": "2026-10-03T07:40:00Z"
}
```

---

## 4. Testing Conventions
- Backend Unit Tests: `{Class}Test.java` (e.g. `CalculationEngineServiceTest.java`)
- Backend Slice Tests: `{Class}ControllerTest.java`, `{Class}RepositoryTest.java`
- Frontend Tests: `{Component}.test.tsx` or `{utility}.test.ts` (using Vitest + React Testing Library)
- Minimum coverage targets:
  - Backend overall: ≥ 70% (Service layer: ≥ 80%)
  - Frontend overall: ≥ 60%
