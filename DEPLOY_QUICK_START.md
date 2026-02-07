# 🎯 دليل النشر السريع - Quick Deploy Guide

## ✅ كل شيء جاهز الآن!

المستودع متصل ب GitHub وجاهز للنشر على Vercel

---

## 🚀 للنشر الآن

### استخدم الـ Batch File (الأسهل):

```bash
.\update_and_deploy.bat
```

سيطلب منك:
1. إدخال رسالة الالتزام
2. ثم يرفع كل شيء تلقائيًا

---

## 📍 الروابط المهمة

| الخدمة | الرابط |
|-------|--------|
| **GitHub** | https://github.com/tahaeljoker/Fast-forTourism |
| **GitHub Repo Settings** | https://github.com/tahaeljoker/Fast-forTourism/settings |
| **Vercel Dashboard** | https://vercel.com/dashboard |
| **Project on Vercel** | https://vercel.com/tahaeljoker/fast-fortourism |
| **Live Website** | https://fast-fortourism.vercel.app |

---

## 🔄 سير العمل

### 1. العمل محليًا
```bash
cd d:\programming\projects\work\Fast-forTourism\app
npm run dev
```

### 2. الاختبار
افتح: `http://localhost:3000`

### 3. النشر
```bash
.\update_and_deploy.bat
```

### 4. التحقق
- GitHub: https://github.com/tahaeljoker/Fast-forTourism
- Vercel: https://vercel.com/dashboard
- Website: https://fast-fortourism.vercel.app

---

## 📝 الملفات الجديدة

| الملف | الغرض |
|------|-------|
| `update_and_deploy.bat` | سكريبت النشر الآلي |
| `vercel.json` | إعدادات Vercel |
| `.vercelignore` | الملفات المستبعدة |
| `VERCEL_DEPLOYMENT_GUIDE.md` | دليل شامل |

---

## ⚙️ إعدادات Vercel المهمة

### متغيرات البيئة (Settings → Environment Variables):
```
NEXT_PUBLIC_API_URL = http://localhost:3000
NEXT_PUBLIC_LANGUAGE = ar
```

### تأكد من:
- ✅ root directory = `app`
- ✅ framework = Next.js
- ✅ auto deploy من `master` branch

---

## 🎉 الخلاصة

**الآن يمكنك:**

✅ تعديل الكود محليًا  
✅ رفع التحديثات بأمر واحد  
✅ Vercel ينشر تلقائيًا  
✅ الموقع يعمل على الإنتاج  

**استمتع بالعمل! 🚀**

---

## 📞 للمزيد من التفاصيل

اقرأ: [VERCEL_DEPLOYMENT_GUIDE.md](./VERCEL_DEPLOYMENT_GUIDE.md)
