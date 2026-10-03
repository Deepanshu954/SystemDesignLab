# Backend Tasks — System Design Lab

- [x] **Task 1: Project Scaffold & Core Infrastructure**
  - Create Spring Boot 3.3.x Maven project in `backend/` with Java 21.
  - Configure `pom.xml`: Spring Web, Spring Data JPA, Spring Security, Validation, Flyway, PostgreSQL, H2, Springdoc OpenAPI.
  - Implement `BaseEntity` (`id` UUID, `createdAt`, `updatedAt`, `version`).
  - Implement RFC 7807 `GlobalExceptionHandler` returning `ProblemDetail`.
  - Configure CORS, `SecurityFilterChain`, `application.yml`, `application-test.yml`.
  - Verify `mvn test` context loads cleanly.

- [x] **Task 2: Flyway Database Migration & Initial Seed Data**
  - Create `src/main/resources/db/migration/V1__init.sql`.
  - Define schema: `case_studies`, `concepts`, `interview_questions`, `users`, `bookmarks`, `saved_estimations`, `feedback`.
  - Seed flagship case studies (TinyURL, Rate Limiter, Notification, Chat), fundamentals (HLD vs LLD, Caching, Scaling), and interview questions.

- [x] **Task 3: Authentication & User Management Slice**
  - Implement `User` entity, `UserRepository`, and `UserRole`.
  - Implement `JwtTokenProvider`, `JwtAuthenticationFilter`, `UserPrincipal`.
  - Implement `UserService`, `AuthController` (`/api/v1/auth/register`, `/login`, `/me`).
  - Unit and integration tests for authentication lifecycle.

- [x] **Task 4: Capacity & Back-of-the-Envelope Math Engine Slice**
  - Implement `CalculationEngineService` (QPS, storage, bandwidth, memory caching formulas).
  - Implement `CalculatorController` (`/api/v1/calculator/capacity`, `/api/v1/calculator/templates`).
  - Implement input validation and comprehensive test assertions.

- [x] **Task 5: Flagship Case Studies Module Slice**
  - Implement `CaseStudy` entity, `CaseStudyRepository`, `CaseStudyService`.
  - Implement `CaseStudyController` (`/api/v1/case-studies`, `/api/v1/case-studies/{slug}`).
  - Add search and category/difficulty filtering.
  - Write unit and slice tests.

- [x] **Task 6: Fundamentals Knowledge Base Slice**
  - Implement `Concept` entity, `ConceptRepository`, `ConceptService`.
  - Implement `ConceptController` (`/api/v1/fundamentals`, `/api/v1/fundamentals/{slug}`).
  - Write unit and slice tests.

- [x] **Task 7: Interview Preparation Module Slice**
  - Implement `InterviewQuestion` entity, `InterviewQuestionRepository`, `InterviewQuestionService`.
  - Implement `InterviewQuestionController` (`/api/v1/interview`).
  - Write unit and slice tests.

- [x] **Task 8: User Bookmarks & Saved Calculations Slice**
  - Implement `Bookmark` & `SavedEstimation` entities, repositories, and services.
  - Implement `BookmarkController` (`/api/v1/bookmarks`, delete, check).
  - Implement security checks ensuring users only manage their own bookmarks.
  - Write unit and slice tests.

- [x] **Task 9: Feedback & Coursework Analytics Slice**
  - Implement `Feedback` entity, repository, service, and controller (`/api/v1/feedback`).
  - Validation: rating 1-5, category check, comment length.
  - Write unit and slice tests.

- [x] **Task 10: OpenAPI Swagger UI & Actuator Health Integration**
  - Configure `OpenApiConfig` with detailed metadata, tags, and JWT Bearer security schemes.
  - Verify `/swagger-ui.html` and `/actuator/health`.
  - Full suite verification: `mvn test` passing 100%.
