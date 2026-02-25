# 🚀 دليل النشر على Namecheap - Namecheap Deployment Guide

## 📋 المحتويات
1. [متطلبات التشغيل](#متطلبات-التشغيل)
2. [خطوات الإعداد](#خطوات-الإعداد)
3. [الخطوات التفصيلية](#الخطوات-التفصيلية)
4. [استكشاف الأخطاء](#استكشاف-الأخطاء)
5. [النشر المستقبلي](#النشر-المستقبلي)

---

## ✅ متطلبات التشغيل

### 1. **حساب Namecheap**
- ✅ اسم النطاق مسجل على Namecheap
- ✅ إمكانية الوصول إلى لوحة التحكم Hosting Panel
- ✅ وصول SSH مُفعّل (SSH Access)
- ✅ Node.js مُثبّت على السيرفر (إصدار 18.17 أو أحدث)

### 2. **أدوات محلية**
- ✅ Git
- ✅ Node.js (v18.17+)
- ✅ npm أو yarn

### 3. **المشروع**
- ✅ Next.js 16.0.10
- ✅ React 19.1.0
- ✅ جميع المتطلبات مثبتة

---

## ⚙️ خطوات الإعداد

### الخطوة 1️⃣: تحضير المشروع للإنتاج

```bash
# انتقل إلى مجلد التطبيق
cd d:\programming\projects\work\Fast-forTourism\app

# تثبيت المتطلبات (إن لم تكن مثبتة)
npm install

# بناء المشروع
npm run build

# اختبار البناء محليًا
npm run start
```

**تحقق من**: `http://localhost:3000`

---

### الخطوة 2️⃣: إعداد Namecheap Hosting

#### A. تفعيل SSH Access
1. اذهب إلى [Namecheap Dashboard](https://www.namecheap.com/myaccount/login.aspx)
2. انقر على **Hosting**
3. اختر حسابك
4. انقر على **Manage**
5. اضغط على **Advanced** → **SSH Access** → **Enable SSH**
6. اتبع التعليمات لتعيين اسم المستخدم وكلمة المرور

#### B. الوصول عبر cPanel (إن أمكن)
1. ادخل إلى **cPanel**
2. ابحث عن **Terminal** أو **SSH Access**
3. تفعيل SSH إذا لم يكن مُفعّلاً

---

### الخطوة 3️⃣: تحضير السيرفر

#### A. الاتصال عبر SSH

**Windows (PowerShell):**
```powershell
# تثبيت OpenSSH إن لم يكن مثبتاً
# ثم استخدم:
ssh username@yourdomain.com
```

**Linux/Mac:**
```bash
ssh username@yourdomain.com
```

#### B. التحقق من إصدار Node.js

```bash
node --version
npm --version
```

**إذا لم يكن Node.js مثبتاً:**
- اتصل بدعم Namecheap وطلب تثبيت Node.js
- أو استخدم cPanel Package Manager

---

### الخطوة 4️⃣: نسخ المشروع إلى السيرفر

#### الطريقة 1️⃣: استخدام Git (الموصى به)

**من السيرفر:**
```bash
# انتقل إلى المجلد الرئيسي
cd public_html

# أو إلى مجلد محدد
cd /home/yourusername/domains/yourdomain.com

# استنساخ المستودع
git clone https://github.com/tahaeljoker/Fast-forTourism.git .

# أو إذا أردت في مجلد فرعي:
git clone https://github.com/tahaeljoker/Fast-forTourism.git fast-tourism
cd fast-tourism
```

#### الطريقة 2️⃣: استخدام File Manager
1. استخدم **File Manager** في cPanel
2. اضغط على **Upload**
3. اختر ملف .zip للمشروع
4. استخرج الملف

---

### الخطوة 5️⃣: تثبيت المتطلبات على السيرفر

```bash
# انتقل إلى مجلد التطبيق
cd app

# تثبيت جميع المتطلبات
npm install --production

# بناء المشروع
npm run build
```

---

### الخطوة 6️⃣: إعداد عملية دائمة (PM2)

```bash
# تثبيت PM2 عالميًا
npm install -g pm2

# من مجلد التطبيق
pm2 start "npm start" --name "fast-tourism"

# إعادة تشغيل تلقائية عند إعادة تشغيل السيرفر
pm2 startup
pm2 save

# التحقق من الحالة
pm2 status
pm2 logs
```

---

### الخطوة 7️⃣: إعداد Reverse Proxy (Apache/Nginx)

#### إذا كنت تستخدم cPanel مع Apache:

في **cPanel** → **Addon Domains**:
1. أضف نطاقك الجديد
2. اذهب إلى **Public HTML** للنطاق
3. أنشئ ملف `.htaccess`:

```apache
<IfModule mod_proxy.c>
    ProxyPreserveHost On
    ProxyPass / http://localhost:3000/
    ProxyPassReverse / http://localhost:3000/
</IfModule>

<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule ^(.*)$ http://localhost:3000/$1 [P,L]
</IfModule>
```

#### إذا كنت تستخدم Nginx:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

### الخطوة 8️⃣: إعداد HTTPS (SSL)

#### من خلال Namecheap:
1. اذهب إلى Dashboard → Hosting
2. اختر **SSL**
3. اختر **AutoSSL** (عادة مجاني)
4. اتبع التعليمات

#### التحقق من HTTPS:
```bash
# قد تحتاج لتحديث proxy
# تأكد من تحديث .htaccess أو nginx config

# أعد تشغيل الخدمة
pm2 restart fast-tourism
```

---

## 🔧 الخطوات التفصيلية (كاملة)

### الترتيب المقترح:

```
1. ✅ تحضير المشروع محليًا
   ↓
2. ✅ إعداد حساب Namecheap و SSH
   ↓
3. ✅ الاتصال بالسيرفر
   ↓
4. ✅ نسخ المشروع (Git أو Upload)
   ↓
5. ✅ تثبيت المتطلبات (npm install)
   ↓
6. ✅ بناء المشروع (npm run build)
   ↓
7. ✅ إعداد PM2
   ↓
8. ✅ إعداد Reverse Proxy
   ↓
9. ✅ تفعيل SSL/HTTPS
   ↓
10. ✅ اختبار وتحقق
```

---

## 🧪 اختبار النشر

### بعد الانتهاء من الخطوات:

```bash
# 1. تحقق من حالة PM2
pm2 status

# 2. اطلع على السجلات
pm2 logs

# 3. اختبر الاتصال محليًا (من السيرفر)
curl http://localhost:3000

# 4. افتح المتصفح واختبر النطاق الخاص بك
# https://yourdomain.com
```

---

## 🚨 استكشاف الأخطاء

### الخطأ: "Connection Refused"
```bash
# تحقق من حالة PM2
pm2 status

# أعد تشغيل التطبيق
pm2 restart fast-tourism

# تحقق من السجلات
pm2 logs fast-tourism
```

### الخطأ: "Port already in use"
```bash
# ابحث عن العملية التي تستخدم المنفذ
lsof -i :3000

# أو استخدم منفذ مختلف في PM2
pm2 start "npm start -- -p 3001" --name "fast-tourism"
```

### الخطأ: "Module not found"
```bash
# أعد تثبيت المتطلبات
rm -rf node_modules package-lock.json
npm install --production
npm run build
```

### الخطأ: "Permission denied"
```bash
# قد تحتاج لصلاحيات sudo
sudo pm2 start "npm start" --name "fast-tourism"
sudo pm2 startup
sudo pm2 save
```

---

## 🔄 النشر المستقبلي

### تحديث المشروع:

```bash
# من السيرفر، في مجلد المشروع
git pull origin master

# أعد بناء المشروع
cd app
npm install
npm run build

# أعد تشغيل التطبيق
pm2 restart fast-tourism

# تحقق من الحالة
pm2 logs
```

### أنشئ سكريبت تحديث تلقائي:

```bash
#!/bin/bash
cd /path/to/Fast-forTourism
git pull origin master
cd app
npm install
npm run build
pm2 restart fast-tourism
```

حفظه باسم `update.sh` واجعله قابلاً للتنفيذ:
```bash
chmod +x update.sh
./update.sh
```

---

## 📊 متغيرات البيئة

إذا احتجت إلى متغيرات بيئة، أنشئ ملف `.env.local`:

```bash
# في /app/.env.local
NEXT_PUBLIC_API_URL=https://yourdomain.com
NEXT_PUBLIC_LANGUAGE=ar
```

---

## 📞 دعم Namecheap

إذا واجهت مشاكل:
- 📧 البريد: support@namecheap.com
- 💬 الدردشة الحية: [Namecheap Support Chat](https://www.namecheap.com/support/)
- 📚 المساعدة: [Namecheap KB](https://www.namecheap.com/support/knowledgebase/)

---

## ✅ قائمة التحقق النهائية

- [ ] تم تثبيت Node.js على السيرفر
- [ ] تم تفعيل SSH Access
- [ ] تم نسخ المشروع إلى السيرفر
- [ ] تم تثبيت المتطلبات (npm install)
- [ ] تم بناء المشروع (npm run build)
- [ ] تم تثبيت PM2 وإعداده
- [ ] تم إعداد Reverse Proxy
- [ ] تم تفعيل HTTPS/SSL
- [ ] تم اختبار النطاق
- [ ] تعمل جميع الصفحات بشكل صحيح
- [ ] تم إعداد التحديثات التلقائية

---

## 🎉 النتيجة

بعد اتباع هذه الخطوات، سيكون موقعك متاحًا على:
```
https://yourdomain.com
```

**استمتع بالنشر! 🚀**
