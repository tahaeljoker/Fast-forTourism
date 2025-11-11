'use client';

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="login-layout min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="login-container">
        {children}
      </div>
    </div>
  );
}