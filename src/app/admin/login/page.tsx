'use client';

import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // بيانات اعتماد المسؤول
    const ADMIN_EMAIL = 'fastforAdmin@gmail.com';
    const ADMIN_PASSWORD = 'fastAdmin12792';

    if (email.trim() === ADMIN_EMAIL && password.trim() === ADMIN_PASSWORD) {
      try {
        const token = 'admin_session_' + Date.now();
        localStorage.setItem('adminToken', token);
        console.log('✓ تم حفظ التوكن:', token);
        console.log('✓ التوكن المحفوظ في localStorage:', localStorage.getItem('adminToken'));
        
        console.log('✓ جاري الانتقال للداشبورد...');
        // استخدام window.location للانتقال الفوري والكامل
        setTimeout(() => {
          window.location.href = '/admin/dashboard';
        }, 0);
      } catch (err) {
        console.error('✗ خطأ في تسجيل الدخول:', err);
        setError('حدث خطأ. حاول مرة أخرى.');
        setIsLoading(false);
      }
    } else {
      console.log('✗ بيانات غير صحيحة');
      setError('البريد الإلكتروني أو كلمة المرور غير صحيحة.');
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-container">
        <div className="login-form">
          <h2 className="text-center mb-4">تسجيل دخول المسؤول</h2>
          <form onSubmit={handleLogin}>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">البريد الإلكتروني</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="fastforAdmin@gmail.com"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">كلمة المرور</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="fastAdmin12792"
              />
            </div>
            <button 
              type="submit" 
              className="btn btn-primary w-100 mt-3"
              disabled={isLoading}
            >
              {isLoading ? 'جاري التحقق...' : 'تسجيل الدخول'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
