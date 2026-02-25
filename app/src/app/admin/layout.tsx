'use client';

import { usePathname } from 'next/navigation';
import AdminLayout from '@/components/AdminLayout';
import './admin.css';

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';

  // لا نريد عرض AdminLayout في صفحة تسجيل الدخول
  if (isLoginPage) {
    return children;
  }

  return (
    <div className="admin-container">
      <AdminLayout>
        {children}
      </AdminLayout>
    </div>
  );
}
