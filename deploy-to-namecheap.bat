@echo off
REM Deployment script for Namecheap VPS

echo ==========================================
echo   Deploying to Namecheap VPS
echo   fastfortourism.com
echo ==========================================
echo.

REM Set your credentials
set SSH_USER=fastforTourism
set SSH_HOST=fastfortourism.com

echo Connecting to %SSH_HOST%...
echo Username: %SSH_USER%
echo.
echo Running deployment commands via SSH...
echo.

REM Create the deployment script to run on server
(
echo cd ~
echo echo "Checking if project exists..."
echo if [ -d "Fast-forTourism" ]; then
echo   echo "Project exists, pulling latest changes..."
echo   cd Fast-forTourism
echo   git pull origin master
echo else
echo   echo "Cloning project..."
echo   git clone https://github.com/tahaeljoker/Fast-forTourism.git
echo   cd Fast-forTourism
echo fi
echo.
echo echo "Installing dependencies..."
echo cd app
echo npm install
echo.
echo echo "Building project..."
echo npm run build
echo.
echo echo "Setting up PM2..."
echo npm install -g pm2
echo pm2 delete fast-tourism 2^>nul
echo pm2 start "npm start" --name "fast-tourism"
echo pm2 save
echo pm2 startup
echo.
echo echo "Deployment complete!"
echo echo "Your site should be live at: http://fastfortourism.com:3000"
) > deploy_commands.sh

REM Run the script on the server using plink (from PuTTY) or ssh
echo To deploy, run these commands manually on your server:
echo.
echo 1. Connect via SSH:
echo    ssh %SSH_USER%@%SSH_HOST%
echo.
echo 2. Then run these commands on the server:
echo    cd ~
echo    git clone https://github.com/tahaeljoker/Fast-forTourism.git
echo    cd Fast-forTourism/app
echo    npm install
echo    npm run build
echo    npm install -g pm2
echo    pm2 start "npm start" --name "fast-tourism"
echo    pm2 save
echo    pm2 startup
.
echo.
echo ==========================================
echo   Manual Deployment Instructions
echo ==========================================
pause
