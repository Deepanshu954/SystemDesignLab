#!/bin/bash
set -e

echo "========================================================"
echo "   System Design Lab — Local Build & Run               "
echo "========================================================"

# Step 1: Build standalone Docker image locally
echo "==> [1/3] Building local 'seo' image from Dockerfile.seo..."
docker build -f Dockerfile.seo -t seo .

# Step 2: Stop any existing container on port 3000
echo "==> [2/3] Starting standalone container on http://localhost:3000..."
docker rm -f seo 2>/dev/null || true
docker run -d -p 3000:3000 --name seo seo

# Step 3: Wait briefly and open in browser
echo "==> [3/3] Waiting for services to initialize..."
for i in {1..30}; do
    if curl -s http://localhost:3000/api/v1/case-studies > /dev/null 2>&1; then
        echo "==> System Design Lab is online!"
        break
    fi
    sleep 1
done

echo ""
echo "========================================================"
echo "   App is live: http://localhost:3000                   "
echo "========================================================"

if [[ "$OSTYPE" == "darwin"* ]]; then
    open http://localhost:3000
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    xdg-open http://localhost:3000 2>/dev/null || true
fi
