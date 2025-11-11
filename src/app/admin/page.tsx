'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminRedirect() {
  const router = useRouter();

  useEffect(() => {
    // التحقق من وجود جلسة إدارة
    const adminToken = localStorage.getItem('adminToken');
    
    if (adminToken) {
      // إذا كان المستخدم مسجل دخول، انتقل إلى الداشبورد
      router.push('/admin/dashboard');
    } else {
      // إذا لم يكن مسجل دخول، انتقل إلى صفحة تسجيل الدخول
      router.push('/admin/login');
    }
  }, [router]);

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="text-center">
        <div className="spinner-border text-primary mb-3" role="status">
          <span className="visually-hidden">جاري التحميل...</span>
        </div>
        <p className="text-muted">جاري التوجيه...</p>
      </div>
    </div>
  );
}
