# 🚀 Namecheap Quick Start Guide
# دليل سريع لنشر Namecheap

## 📋 الخطوات السريعة

### 1️⃣ **تحضير المشروع محليًا**
```bash
cd app
npm install
npm run build
npm run start
```
✅ اختبر على `http://localhost:3000`

---

### 2️⃣ **إعداد Namecheap**
1. سجل الدخول إلى [Namecheap Dashboard](https://www.namecheap.com)
2. اذهب إلى **Hosting**
3. اختر حسابك وانقر **Manage**
4. فعّل **SSH Access** في Advanced
5. احفظ بيانات الاتصال (Username, Password)

---

### 3️⃣ **الاتصال بالسيرفر**

**Windows (PowerShell):**
```powershell
ssh username@yourdomain.com
```

**Linux/Mac:**
```bash
ssh username@yourdomain.com
```

---

### 4️⃣ **نسخ المشروع**

**الطريقة الأولى (Git - موصى به):**
```bash
cd public_html  # أو /home/username/domains/yourdomain.com
git clone https://github.com/tahaeljoker/Fast-forTourism.git .
```

**الطريقة الثانية (cPanel File Manager):**
- اذهب إلى cPanel → File Manager
- Upload ملف ZIP للمشروع
- استخرج الملف

---

### 5️⃣ **تثبيت وبناء**
```bash
cd app
npm install --production
npm run build
```

---

### 6️⃣ **إعداد PM2 (مراقب العملية)**
```bash
# تثبيت PM2
npm install -g pm2

# تشغيل التطبيق
pm2 start "npm start" --name "fast-tourism"

# إعادة تشغيل تلقائية
pm2 startup
pm2 save

# التحقق
pm2 status
pm2 logs
```

---

### 7️⃣ **إعداد Reverse Proxy**

**إذا كنت تستخدم Apache/cPanel:**
- اذهب إلى cPanel → Public HTML
- أنشئ ملف `.htaccess`:

```apache
<IfModule mod_proxy.c>
    ProxyPreserveHost On
    ProxyPass / http://localhost:3000/
    ProxyPassReverse / http://localhost:3000/
</IfModule>
```

---

### 8️⃣ **تفعيل HTTPS/SSL**
1. اذهب إلى Namecheap Dashboard
2. اختر **SSL**
3. اختر **AutoSSL** (عادة مجاني)
4. اتبع التعليمات

---

### 9️⃣ **اختبر الموقع**
افتح متصفحك وادخل:
```
https://yourdomain.com
```

---

## 🔄 تحديث المشروع مستقبلاً

من السيرفر في مجلد المشروع:
```bash
git pull origin master
cd app
npm install
npm run build
pm2 restart fast-tourism
```

أو استخدم السكريبت المُعد:
```bash
./namecheap-deploy.sh
```

---

## 📚 ملفات إضافية

| الملف | الوصف |
|------|-------|
| `NAMECHEAP_DEPLOYMENT_GUIDE.md` | دليل شامل ومفصل |
| `NAMECHEAP_CHECKLIST.md` | قائمة التحقق الكاملة |
| `namecheap-deploy.sh` | سكريبت تحديث تلقائي |
| `prepare-namecheap.bat` | سكريبت تحضير محلي |
| `.env.namecheap.example` | مثال للمتغيرات |

---

## 🚨 استكشاف الأخطاء السريع

### الموقع لا يعمل
```bash
pm2 restart fast-tourism
pm2 logs
```

### Node.js غير موجود
- اتصل بدعم Namecheap لتثبيت Node.js

### Port مستخدم
```bash
pm2 delete fast-tourism
pm2 start "npm start -- -p 3001" --name "fast-tourism"
```

### أخطاء في البناء
```bash
rm -rf node_modules package-lock.json .next
npm install --production
npm run build
```

---

## 📞 الدعم

- 📚 الدليل الكامل: [NAMECHEAP_DEPLOYMENT_GUIDE.md](./NAMECHEAP_DEPLOYMENT_GUIDE.md)
- ✅ قائمة التحقق: [NAMECHEAP_CHECKLIST.md](./NAMECHEAP_CHECKLIST.md)
- 🆘 Namecheap Support: https://www.namecheap.com/support/
- 💬 Live Chat: https://www.namecheap.com/support/

---

## ✨ النتيجة النهائية

بعد الانتهاء من الخطوات أعلاه، سيكون موقعك متاحًا على:

**🌐 https://yourdomain.com**

**استمتع بالنشر! 🚀**
