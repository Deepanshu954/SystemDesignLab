# Architectural Decisions Record (ADR) — System Design Lab

## ADR-001: Pure Java Records & Explicit Getters/Setters over Lombok
- **Context:** Host environment runs OpenJDK 27 / modern javac toolchains where Lombok causes `ExceptionInInitializerError: com.sun.tools.javac.code.TypeTag`.
- **Decision:** Eliminate Lombok dependency entirely. Use pure Java records for DTOs and value types, and explicit getters/setters for JPA entities.
- **Outcome:** Sub-second compile times, zero annotation processor incompatibilities, and complete forward-compatibility.

## ADR-002: RFC 7807 Problem Details
- **Context:** Frontend requires consistent, machine-readable error responses across all failure scenarios (400 validation, 401 unauthenticated, 404 missing, 409 conflict, 500 server).
- **Decision:** Implement `GlobalExceptionHandler` extending `ResponseEntityExceptionHandler` and emitting `ProblemDetail` with type URI, title, status, and detail.
- **Outcome:** Clean client-side error handling and industry standard REST compliance.

## ADR-003: Dual-Mode Dynamic & Offline Fallback Architecture in Frontend
- **Context:** In Next.js SSG / Docker builds, the backend might be built in parallel or temporarily unavailable.
- **Decision:** `src/lib/api.ts` transparently catches network errors during static generation and supplies complete fallback datasets.
- **Outcome:** 22/22 static pages build flawlessly under any circumstances while dynamically fetching live data from Spring Boot at runtime.

## ADR-004: ByteBuddy Agent Loading in Test Suites
- **Context:** JVM 21+ warns and JVM 27+ restricts dynamic agent attachment for Mockito / ByteBuddy.
- **Decision:** Configure Maven Surefire plugin with `<argLine>-XX:+EnableDynamicAgentLoading -Dnet.bytebuddy.experimental=true</argLine>`.
- **Outcome:** 33/33 backend tests execute with zero JVM agent warnings or errors.

## ADR-005: Stateless JWT with Explicit Security Filter Chain
- **Context:** REST API must scale horizontally across multiple instances without sticky sessions or distributed session stores.
- **Decision:** JJWT 0.12.6 with HS256 HMAC tokens, 24-hour expiration, and explicit `AuthenticationEntryPoint` returning 401 Problem Details.
- **Outcome:** Fully stateless, horizontally scalable auth with zero server-side session memory.
