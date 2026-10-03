#!/bin/bash
set -e

echo "=================================================="
echo "   System Design Lab — All-in-One Container      "
echo "=================================================="

BACKEND_PORT="${BACKEND_PORT:-8080}"
PUBLIC_PORT="${PORT:-3000}"
PGDATA="/var/lib/postgresql/data"

# Graceful shutdown handler
cleanup() {
    echo ""
    echo "==> [SHUTDOWN] Terminating services gracefully..."
    if [ -n "$FRONTEND_PID" ]; then
        kill -TERM "$FRONTEND_PID" 2>/dev/null || true
    fi
    if [ -n "$BACKEND_PID" ]; then
        kill -TERM "$BACKEND_PID" 2>/dev/null || true
    fi
    if [ -f "$PGDATA/postmaster.pid" ]; then
        echo "==> [SHUTDOWN] Stopping embedded PostgreSQL..."
        su-exec postgres pg_ctl -D "$PGDATA" -m fast stop 2>/dev/null || true
    fi
    wait
    echo "==> [SHUTDOWN] All services stopped."
    exit 0
}

trap cleanup SIGTERM SIGINT

# ----------------------------------------------------
# 1. Database Setup (External vs Embedded)
# ----------------------------------------------------
if [ -n "$DATABASE_URL" ] && [ -z "$DB_URL" ]; then
    echo "==> [DB] Detected DATABASE_URL environment variable."
    if [[ "$DATABASE_URL" =~ ^postgres(ql)?://([^:]+):([^@]+)@([^/]+)/(.*)$ ]]; then
        export DB_USER="${BASH_REMATCH[2]}"
        export DB_PASSWORD="${BASH_REMATCH[3]}"
        HOST_PORT="${BASH_REMATCH[4]}"
        DB_NAME_RAW="${BASH_REMATCH[5]}"
        export DB_URL="jdbc:postgresql://${HOST_PORT}/${DB_NAME_RAW}"
    else
        export DB_URL=$(echo "$DATABASE_URL" | sed -E 's|^postgres(ql)?://|jdbc:postgresql://|')
    fi
fi

if [ -n "$DB_URL" ]; then
    echo "==> [DB] Using external database: $DB_URL"
else
    echo "==> [DB] No external DB specified. Setting up embedded PostgreSQL 16..."
    mkdir -p "$PGDATA" /run/postgresql
    chown -R postgres:postgres "$PGDATA" /run/postgresql

    if [ ! -s "$PGDATA/PG_VERSION" ]; then
        echo "==> [DB] Initializing new PostgreSQL cluster in $PGDATA..."
        su-exec postgres initdb -D "$PGDATA" --auth-local=trust --auth-host=trust > /dev/null
        
        cat <<EOF >> "$PGDATA/postgresql.conf"
listen_addresses = '127.0.0.1'
port = 5432
max_connections = 25
shared_buffers = 16MB
effective_cache_size = 48MB
work_mem = 2MB
maintenance_work_mem = 16MB
EOF
    fi

    echo "==> [DB] Starting PostgreSQL daemon..."
    su-exec postgres pg_ctl -D "$PGDATA" -l /var/lib/postgresql/postgres.log -w start

    su-exec postgres psql -tc "SELECT 1 FROM pg_database WHERE datname = 'system_design_lab'" | grep -q 1 || su-exec postgres createdb system_design_lab
    su-exec postgres psql -c "ALTER USER postgres WITH PASSWORD 'postgres';" > /dev/null

    export DB_URL="jdbc:postgresql://127.0.0.1:5432/system_design_lab"
    export DB_USER="postgres"
    export DB_PASSWORD="postgres"
    echo "==> [DB] Embedded PostgreSQL is ready on 127.0.0.1:5432."
fi

# ----------------------------------------------------
# 2. Start Spring Boot Backend
# ----------------------------------------------------
echo "==> [BACKEND] Starting Spring Boot API on internal port ${BACKEND_PORT}..."
export SPRING_PROFILES_ACTIVE="${SPRING_PROFILES_ACTIVE:-prod}"

java -Xmx224m -XX:+UseSerialGC \
     -Dserver.port="${BACKEND_PORT}" \
     -Dspring.datasource.url="${DB_URL}" \
     -Dspring.datasource.username="${DB_USER}" \
     -Dspring.datasource.password="${DB_PASSWORD}" \
     -Dapp.cors.allowed-origins="*" \
     -jar /app/backend/app.jar &
BACKEND_PID=$!

# Wait for backend to be ready
echo "==> [BACKEND] Waiting for backend readiness..."
for i in $(seq 1 45); do
    if wget -q --spider "http://127.0.0.1:${BACKEND_PORT}/actuator/health" 2>/dev/null; then
        echo "==> [BACKEND] Backend is healthy and ready!"
        break
    fi
    sleep 1
done

# ----------------------------------------------------
# 3. Start Next.js Frontend
# ----------------------------------------------------
echo "==> [FRONTEND] Starting Next.js UI on public port ${PUBLIC_PORT}..."
cd /app/frontend

export PORT="${PUBLIC_PORT}"
export HOSTNAME="0.0.0.0"
export INTERNAL_BACKEND_URL="http://127.0.0.1:${BACKEND_PORT}"

node server.js &
FRONTEND_PID=$!

echo "=================================================="
echo "   All services running successfully!            "
echo "   Public Port: ${PUBLIC_PORT}                   "
echo "=================================================="

wait "$FRONTEND_PID"
