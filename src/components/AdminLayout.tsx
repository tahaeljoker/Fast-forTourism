'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import '@/app/admin/admin.css';

interface MenuItem {
  title: string;
  icon: string;
  href: string;
  active: boolean;
}

interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const user = localStorage.getItem('adminUser');
    
    if (!token || !user) {
      router.push('/admin/login');
      return;
    }
    
    try {
      setAdminUser(JSON.parse(user));
    } catch (error) {
      router.push('/admin/login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    router.push('/admin/login');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const menuItems: MenuItem[] = [
    {
      title: 'لوحة التحكم',
      icon: 'fas fa-tachometer-alt',
      href: '/admin/dashboard',
      active: pathname === '/admin/dashboard'
    },
    {
      title: 'إدارة الجولات',
      icon: 'fas fa-map-marked-alt',
      href: '/admin/tours',
      active: pathname.startsWith('/admin/tours')
    },
    {
      title: 'إدارة العروض',
      icon: 'fas fa-tags',
      href: '/admin/offers',
      active: pathname.startsWith('/admin/offers')
    },
    {
      title: 'إدارة التأشيرات',
      icon: 'fas fa-passport',
      href: '/admin/visas',
      active: pathname.startsWith('/admin/visas')
    },
    {
      title: 'إدارة المحتوى',
      icon: 'fas fa-edit',
      href: '/admin/content',
      active: pathname.startsWith('/admin/content')
    },
    {
      title: 'إدارة المستخدمين',
      icon: 'fas fa-users',
      href: '/admin/users',
      active: pathname.startsWith('/admin/users')
    },
    {
      title: 'الإحصائيات',
      icon: 'fas fa-chart-bar',
      href: '/admin/analytics',
      active: pathname.startsWith('/admin/analytics')
    },
    {
      title: 'الإعدادات',
      icon: 'fas fa-cog',
      href: '/admin/settings',
      active: pathname.startsWith('/admin/settings')
    }
  ];

  if (!adminUser) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">جاري التحميل...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-layout">
      <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <Link href="/admin/dashboard" className="navbar-brand">
            <i className="fas fa-tachometer-alt me-2"></i>
            <span>لوحة الإدارة</span>
          </Link>
        </div>
        <nav className="sidebar-nav">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={`sidebar-link ${item.active ? 'active' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              <i className={`${item.icon} me-2`}></i>
              <span>{item.title}</span>
            </Link>
          ))}
        </nav>
        <div className="sidebar-footer">
          <div className="dropdown">
            <button
              className="btn btn-link dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="fas fa-user me-2"></i>
              {adminUser.name}
            </button>
            <ul className="dropdown-menu dropdown-menu-light">
              <li><h6 className="dropdown-header">{adminUser.role}</h6></li>
              <li><hr className="dropdown-divider" /></li>
              <li>
                <button className="dropdown-item" onClick={handleLogout}>
                  <i className="fas fa-sign-out-alt me-2"></i>
                  تسجيل الخروج
                </button>
              </li>
            </ul>
          </div>
        </div>
      </aside>
      <div className="main-content">
        <header className="top-navbar">
          <button className="navbar-toggler" type="button" onClick={toggleSidebar}>
            <span className="navbar-toggler-icon"></span>
          </button>
          <span className="navbar-brand mb-0 h1">لوحة الإدارة</span>
        </header>
        <main className="container-fluid p-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;