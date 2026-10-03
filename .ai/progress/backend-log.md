# Backend Progress Log — System Design Lab

| Date | Task | Changes | Status |
|---|---|---|---|
| 2026-10-03 | Planning Phase | Completed design documentation, data model, API design, and tasks | COMPLETED |
| 2026-10-03 | Task 1: Project Scaffold | Created Spring Boot 3.3.4 project with Java 21, BaseEntity, GlobalExceptionHandler RFC 7807, CORS, JWT Security, test profile | COMPLETED |
| 2026-10-03 | Task 2: Flyway Migrations | Created V1__init.sql with 7 tables and initial seeds for case studies, fundamentals, interview questions, demo users | COMPLETED |
| 2026-10-03 | Task 3: Auth Slice | Implemented User entity, repository, UserService, AuthController (`/register`, `/login`, `/me`), JWT filter, tests passing 10/10 | COMPLETED |
| 2026-10-03 | Task 4: Calculator Engine | Implemented CalculationEngineService (QPS, storage, bandwidth, RAM cache Pareto sizing), CalculatorController, templates, tests passing 15/15 | COMPLETED |
| 2026-10-03 | Task 5: Case Studies Slice | Implemented CaseStudy entity, repository, search queries, CaseStudyService, CaseStudyController, tests passing 19/19 | COMPLETED |
| 2026-10-03 | Task 6: Fundamentals Slice | Implemented Concept entity, repository, search queries, ConceptService, ConceptController, tests passing 23/23 | COMPLETED |
| 2026-10-03 | Task 7: Interview Prep Slice | Implemented InterviewQuestion entity, repository, search queries, InterviewQuestionService, controller, tests passing 26/26 | COMPLETED |
| 2026-10-03 | Task 8: Bookmarks Slice | Implemented Bookmark entity, repository, service, BookmarkController, ownership checks, 401 auth entry point, tests passing 28/28 | COMPLETED |
| 2026-10-03 | Task 9: Feedback Slice | Implemented Feedback entity, repository, service, FeedbackController, validation, tests passing 31/31 | COMPLETED |
| 2026-10-03 | Task 10: OpenAPI & Health | Configured OpenApiConfig, Swagger UI, Actuator health check, 33/33 tests passing (100%) | COMPLETED |
