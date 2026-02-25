#!/bin/bash
# Namecheap Auto-Deploy Script
# استخدم هذا السكريبت لنشر التحديثات تلقائيًا على Namecheap

set -e

echo "🚀 بدء نشر التحديثات على Namecheap..."
echo "========================================"

# الألوان
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# المتغيرات
PROJECT_PATH="/home/yourusername/domains/yourdomain.com"
BRANCH="master"

echo -e "${YELLOW}📍 المسار: $PROJECT_PATH${NC}"
echo -e "${YELLOW}🌿 الفرع: $BRANCH${NC}"

# 1. الانتقال إلى مجلد المشروع
echo -e "${YELLOW}1️⃣ الانتقال إلى مجلد المشروع...${NC}"
cd "$PROJECT_PATH" || exit 1
echo -e "${GREEN}✅ تم الانتقال بنجاح${NC}"

# 2. سحب آخر التحديثات
echo -e "${YELLOW}2️⃣ سحب آخر التحديثات من GitHub...${NC}"
git fetch origin
git reset --hard origin/$BRANCH
echo -e "${GREEN}✅ تم سحب التحديثات${NC}"

# 3. الانتقال إلى مجلد التطبيق
echo -e "${YELLOW}3️⃣ الانتقال إلى مجلد التطبيق...${NC}"
cd app || exit 1
echo -e "${GREEN}✅ تم الانتقال${NC}"

# 4. تثبيت المتطلبات
echo -e "${YELLOW}4️⃣ تثبيت المتطلبات...${NC}"
npm install --production
echo -e "${GREEN}✅ تم التثبيت${NC}"

# 5. بناء المشروع
echo -e "${YELLOW}5️⃣ بناء المشروع...${NC}"
npm run build
echo -e "${GREEN}✅ تم البناء${NC}"

# 6. إعادة تشغيل التطبيق
echo -e "${YELLOW}6️⃣ إعادة تشغيل التطبيق...${NC}"
pm2 restart fast-tourism
echo -e "${GREEN}✅ تم إعادة التشغيل${NC}"

# 7. التحقق من الحالة
echo -e "${YELLOW}7️⃣ التحقق من حالة التطبيق...${NC}"
sleep 2
pm2 status
pm2 logs fast-tourism --lines 20

echo ""
echo -e "${GREEN}========================================"
echo "🎉 تم النشر بنجاح!"
echo "========================================"
echo ""
echo "اختبر الموقع على: https://yourdomain.com"
echo "اطلع على السجلات: pm2 logs fast-tourism"
echo ""
