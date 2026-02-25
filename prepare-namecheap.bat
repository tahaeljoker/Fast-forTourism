@echo off
REM Namecheap Deployment Preparation Script
REM هذا السكريبت يعد المشروع للنشر على Namecheap

setlocal enabledelayedexpansion

echo.
echo ==========================================
echo   تحضير المشروع لنشر Namecheap
echo   Namecheap Deployment Preparation
echo ==========================================
echo.

REM الألوان
set "GREEN=[92m"
set "YELLOW=[93m"
set "RED=[91m"
set "RESET=[0m"

REM 1. التحقق من Node.js
echo %YELLOW%1. التحقق من Node.js...%RESET%
node --version
if errorlevel 1 (
    echo %RED%❌ Node.js غير مثبت!%RESET%
    exit /b 1
)
echo %GREEN%✅ Node.js مثبت%RESET%
echo.

REM 2. الانتقال إلى مجلد التطبيق
echo %YELLOW%2. الانتقال إلى مجلد التطبيق...%RESET%
cd app
if errorlevel 1 (
    echo %RED%❌ لم يتم العثور على مجلد app!%RESET%
    exit /b 1
)
echo %GREEN%✅ تم الانتقال بنجاح%RESET%
echo.

REM 3. تثبيت المتطلبات
echo %YELLOW%3. تثبيت المتطلبات...%RESET%
npm install
if errorlevel 1 (
    echo %RED%❌ خطأ في التثبيت!%RESET%
    exit /b 1
)
echo %GREEN%✅ تم التثبيت بنجاح%RESET%
echo.

REM 4. اختبار البناء
echo %YELLOW%4. اختبار البناء...%RESET%
npm run build
if errorlevel 1 (
    echo %RED%❌ خطأ في البناء!%RESET%
    exit /b 1
)
echo %GREEN%✅ تم البناء بنجاح%RESET%
echo.

REM 5. إنشاء ملف Environment
echo %YELLOW%5. إنشاء ملف .env.local...%RESET%
if not exist .env.local (
    (
        echo NEXT_PUBLIC_API_URL=https://yourdomain.com
        echo NEXT_PUBLIC_LANGUAGE=ar
        echo NODE_ENV=production
    ) > .env.local
    echo %GREEN%✅ تم إنشاء .env.local%RESET%
) else (
    echo %GREEN%✅ .env.local موجود بالفعل%RESET%
)
echo.

REM 6. إنشاء مجلد .next
echo %YELLOW%6. التحقق من مجلد البناء...%RESET%
if exist .next (
    echo %GREEN%✅ مجلد .next جاهز%RESET%
) else (
    echo %RED%⚠️ مجلد .next لم يتم إنشاؤه!%RESET%
)
echo.

REM 7. معلومات ملخص
echo.
echo ==========================================
echo          معلومات المشروع
echo ==========================================
echo.
npm -v
node --version
type package.json | find "\"version\""
echo.

REM 8. تعليمات النشر
echo ==========================================
echo         خطوات النشر على Namecheap
echo ==========================================
echo.
echo 1. اذهب إلى Namecheap Dashboard
echo    https://www.namecheap.com/myaccount/login.aspx
echo.
echo 2. فعّل SSH Access وأحصل على بيانات الاتصال
echo.
echo 3. اتصل بالسيرفر عبر SSH:
echo    ssh username@yourdomain.com
echo.
echo 4. انسخ المشروع (اختر إحداها):
echo    أ) git clone https://github.com/tahaeljoker/Fast-forTourism.git
echo    ب) استخدم File Manager في cPanel
echo.
echo 5. من مجلد التطبيق:
echo    npm install --production
echo    npm run build
echo.
echo 6. اثبت PM2:
echo    npm install -g pm2
echo    pm2 start "npm start" --name "fast-tourism"
echo    pm2 startup
echo    pm2 save
echo.
echo 7. أعد تشغيل التطبيق:
echo    pm2 restart fast-tourism
echo.
echo 8. اختبر الموقع:
echo    https://yourdomain.com
echo.
echo ==========================================
echo         تم التحضير بنجاح! ✅
echo ==========================================
echo.
echo 📚 اقرأ دليل النشر الكامل:
echo    NAMECHEAP_DEPLOYMENT_GUIDE.md
echo.

pause
