# Multi-stage Dockerfile: All-in-One Full-Stack Container (Frontend + Backend + PostgreSQL)
# Build Stage 1: Backend (Spring Boot 3.3.4, Java 21)
FROM maven:3.9.9-eclipse-temurin-21-alpine AS backend-builder
WORKDIR /build
COPY backend/pom.xml .
RUN mvn dependency:go-offline -B
COPY backend/src ./src
RUN mvn clean package -DskipTests -B

# Build Stage 2: Frontend (Next.js 14 Standalone, Node 20)
FROM node:20-alpine AS frontend-builder
RUN apk add --no-cache libc6-compat
WORKDIR /build
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci
COPY frontend/ ./
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
RUN npm run build

# Stage 3: Production Runner (Single All-in-One Service)
FROM eclipse-temurin:21-jre-alpine

# Install Node.js, PostgreSQL 16, su-exec, and runtime utilities
RUN apk add --no-cache \
    nodejs \
    postgresql16 \
    postgresql16-contrib \
    su-exec \
    bash \
    curl \
    wget

WORKDIR /app

# Setup Postgres data & runtime socket directories
RUN mkdir -p /var/lib/postgresql/data /run/postgresql \
    && chown -R postgres:postgres /var/lib/postgresql /run/postgresql

# Copy Backend artifacts
COPY --from=backend-builder /build/target/*.jar /app/backend/app.jar

# Copy Frontend artifacts (standalone Next.js server + static files)
COPY --from=frontend-builder /build/public /app/frontend/public
COPY --from=frontend-builder /build/.next/standalone /app/frontend/
COPY --from=frontend-builder /build/.next/static /app/frontend/.next/static

# Copy and configure entrypoint
COPY docker-entrypoint.sh /app/docker-entrypoint.sh
RUN chmod +x /app/docker-entrypoint.sh

# Environment variables
ENV NODE_ENV=production
ENV SPRING_PROFILES_ACTIVE=prod
ENV NEXT_TELEMETRY_DISABLED=1
ENV BACKEND_PORT=8080
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=35s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://127.0.0.1:${PORT:-3000}/api/v1/case-studies || exit 1

ENTRYPOINT ["/app/docker-entrypoint.sh"]
