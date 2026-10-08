@echo off
setlocal

echo ========================================================
echo    System Design Lab -- Local Build ^& Run (Windows)
echo ========================================================

echo ==> [1/3] Building local 'seo' image from Dockerfile.seo...
docker build -f Dockerfile.seo -t seo .
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Docker build failed. Make sure Docker Desktop is running.
    pause
    exit /b %ERRORLEVEL%
)

echo ==> [2/3] Starting standalone container on http://localhost:3000...
docker rm -f seo >nul 2>&1
docker run -d -p 3000:3000 --name seo seo
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to start container. Check if port 3000 is occupied.
    pause
    exit /b %ERRORLEVEL%
)

echo ==> [3/3] Waiting for services to initialize...
timeout /t 6 /nobreak >nul

echo ========================================================
echo    App is live: http://localhost:3000
echo ========================================================

start http://localhost:3000
