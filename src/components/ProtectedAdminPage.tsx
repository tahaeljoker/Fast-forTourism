'use client';

import { useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { Container } from 'react-bootstrap';

interface ProtectedAdminPageProps {
  children: ReactNode;
}

export default function ProtectedAdminPage({ children }: ProtectedAdminPageProps) {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);

  // التحقق من الجلسة - الـ useEffect الأول
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const adminToken = localStorage.getItem('adminToken');
      setHasAccess(!!adminToken);
      setIsLoaded(true);
    }
  }, []);

  // إعادة التوجيه - الـ useEffect الثاني منفصل
  useEffect(() => {
    if (isLoaded && !hasAccess) {
      router.push('/admin/login');
    }
  }, [isLoaded, hasAccess, router]);

  if (!isLoaded) {
    return (
      <Container fluid className="py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">جاري التحقق...</span>
        </div>
      </Container>
    );
  }

  if (!hasAccess) {
    return null;
  }

  return <>{children}</>;
}
