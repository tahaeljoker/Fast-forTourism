'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // بيانات اعتماد المسؤول
    const ADMIN_EMAIL = 'fastforAdmin@gmail.com';
    const ADMIN_PASSWORD = 'fastAdmin12792';

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      // نجاح تسجيل الدخول
      localStorage.setItem('adminToken', 'your_secret_token'); // يمكنك تغيير التوكن
      router.push('/admin/dashboard');
    } else {
      // فشل تسجيل الدخول
      setError('البريد الإلكتروني أو كلمة المرور غير صحيحة.');
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
            <button type="submit" className="btn btn-primary w-100 mt-3">
              تسجيل الدخول
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
