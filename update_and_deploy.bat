@echo off
REM ===============================================
REM Fast-forTourism - Update and Deploy Script
REM Repository: https://github.com/tahaeljoker/Fast-forTourism.git
REM Deployment: Vercel
REM ===============================================

echo.
echo ===== UPDATE AND DEPLOY SCRIPT =====
echo Repository: Fast-forTourism
echo Time: %date% %time%
echo.

REM Step 1: Check current branch
echo [1/6] Checking current branch...
git branch --show-current
echo.

REM Step 2: Pull latest changes from remote
echo [2/6] Pulling latest changes from origin...
git pull origin main
if errorlevel 1 (
    echo ERROR: Failed to pull from origin
    pause
    exit /b 1
)
echo.

REM Step 3: Add all changes
echo [3/6] Adding all changes...
git add .
echo.

REM Step 4: Commit changes
echo [4/6] Committing changes...
set /p "commit_message=Enter commit message (default: 'Update: Latest changes'): "
if "%commit_message%"=="" set "commit_message=Update: Latest changes - %date% %time%"

git commit -m "%commit_message%"
if errorlevel 1 (
    echo No changes to commit or error occurred
)
echo.

REM Step 5: Push to GitHub
echo [5/6] Pushing to GitHub (main branch)...
git push origin main
if errorlevel 1 (
    echo ERROR: Failed to push to GitHub
    pause
    exit /b 1
)
echo.

REM Step 6: Deployment notification
echo [6/6] Deployment Status
echo ===================================
echo ✓ Changes pushed to GitHub successfully!
echo ✓ Repository: https://github.com/tahaeljoker/Fast-forTourism
echo ✓ Vercel should automatically deploy from main branch
echo.
echo Visit your Vercel dashboard to check deployment status:
echo https://vercel.com/dashboard
echo.
echo Project URL (after deployment):
echo https://fast-fortourism.vercel.app
echo ===================================
echo.
echo [SUCCESS] Deployment process completed!
pause
