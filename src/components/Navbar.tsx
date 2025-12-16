"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';

const AppNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const pathname = usePathname();
  const { currentLanguage, setLanguage, t, languages } = useLanguage();

  const tourLinks = [
    { href: '/tours/egypt', key: 'egypt' },
    { href: '/tours/europe', key: 'europe' },
    { href: '/tours/lebanon', key: 'lebanon' },
    { href: '/tours/indonesia', key: 'indonesia' },
    { href: '/tours/malaysia', key: 'malaysia' },
    { href: '/tours/uae', key: 'uae' },
    { href: '/tours/saudi', key: 'saudi' },
    { href: '/tours/china', key: 'china' },
  ];

  // Close mobile menu and dropdown on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
  }, [pathname]);

  const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
    const isActive = pathname === href;
    return (
      <Link
        href={href}
        className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 transform hover:scale-105 ${isActive ? 'text-yellow-300' : 'text-white'} hover:text-yellow-200`}
      >
        {children}
        {isActive && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white rounded-full animate-pulse"></div>
        )}
      </Link>
    );
  };

  return (
    <nav className="bg-[var(--primary-color)] shadow-lg sticky top-0 z-50 transition-all duration-300 animate-in fade-in duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center text-white hover:text-white space-x-2 group">
              <Image src="/images/logo.png" alt="Logo" width={30} height={30} className="group-hover:scale-110 transition-transform duration-300" style={{ width: 'auto', height: 'auto' }} />
              <span className="font-bold text-white group-hover:text-yellow-300 transition-colors duration-300">Fast for Tourism</span>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ms-auto flex items-center space-x-4">
              <NavLink href="/">{t('home')}</NavLink>
              <NavLink href="/about">{t('aboutUs')}</NavLink>
              {/* Tours Dropdown */}
              <div 
                className="relative group"
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="relative px-3 py-2 text-sm font-medium text-white hover:text-yellow-200 transition-all duration-300 flex items-center transform hover:scale-105"
                >
                  <span className="text-white">{t('tours')}</span>
                  <i className={`fas fa-chevron-down text-xs ms-1 text-white transition-all duration-300 ${isDropdownOpen ? 'rotate-180 text-yellow-300' : ''}`}></i>
                  {isDropdownOpen && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-300 to-yellow-400 rounded-full animate-pulse"></div>
                  )}
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 top-full mt-1 w-56 rounded-lg shadow-xl bg-white border-2 border-yellow-300 py-2 z-[60] origin-top-right animate-in fade-in slide-in-from-top-2 duration-200">
                    {tourLinks.map((link, index) => (
                      <Link 
                        key={link.href} 
                        href={link.href} 
                        className="block px-4 py-3 text-sm font-medium text-black hover:bg-gradient-to-r hover:from-blue-50 hover:to-yellow-50 hover:text-black text-left transition-all duration-150 border-l-4 border-transparent hover:border-yellow-300 transform hover:translate-x-1"
                        style={{ animationDelay: `${index * 50}ms` }}
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        {t(link.key)}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <NavLink href="/offers">{t('offers')}</NavLink>
              <NavLink href="/visa">{t('visas')}</NavLink>
              <NavLink href="/admin">{t('admin')}</NavLink>
              <NavLink href="/contact">{t('contact')}</NavLink>
              <div 
                className="relative ml-4"
                onMouseEnter={() => setIsLanguageDropdownOpen(true)}
                onMouseLeave={() => setIsLanguageDropdownOpen(false)}
              >
                <button 
                  onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                  className="relative px-3 py-2 text-sm font-medium transition-all duration-300 flex items-center gap-2 border-2 border-blue-500 rounded-lg hover:border-blue-400 hover:bg-white/10 transform hover:scale-105"
                  style={{ color: '#ffffff' }}
                >
                  <span className="text-lg transition-transform duration-300 group-hover:scale-125">{languages[currentLanguage].flag}</span>
                  <span className="font-semibold" style={{ color: '#ffffff' }}>{languages[currentLanguage].name}</span>
                  <i className={`fas fa-chevron-down text-xs transition-all duration-300 ${isLanguageDropdownOpen ? 'rotate-180' : ''}`} style={{ color: '#ffffff' }}></i>
                </button>
                {isLanguageDropdownOpen && (
                  <div className="absolute right-0 top-full mt-1 w-48 rounded-lg shadow-xl bg-white border-2 border-blue-500 py-2 z-[60] origin-top-right animate-in fade-in slide-in-from-top-2 duration-200">
                    {Object.entries(languages).map(([code, lang], index) => (
                      <button
                        key={code}
                        onClick={() => {
                          setLanguage(code as keyof typeof languages);
                          setIsLanguageDropdownOpen(false);
                        }}
                        className={`block w-full text-left px-4 py-3 text-sm font-medium transition-all duration-150 border-l-4 transform hover:translate-x-1 !text-black ${
                          currentLanguage === code
                            ? 'bg-gradient-to-r from-blue-100 to-blue-50 border-blue-500 font-bold'
                            : 'hover:bg-blue-50 border-transparent hover:border-blue-400'
                        }`}
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <span className="mr-2 text-lg">{lang.flag}</span>
                        {lang.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-white/80 hover:text-yellow-300 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-yellow-300 transition-all duration-300 transform hover:scale-110"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <i className="fas fa-times h-6 w-6 animate-spin"></i>
              ) : (
                <i className="fas fa-bars h-6 w-6"></i>
              )}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden animate-in fade-in slide-in-from-top-2 duration-300" id="mobile-menu">
          <div className="block px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium text-white !important hover:bg-yellow-400/20 hover:text-yellow-300 transition-all duration-300 transform hover:translate-x-1">{t('home')}</Link>
            <Link href="/about" className="block px-3 py-2 rounded-md text-base font-medium text-white !important hover:bg-yellow-400/20 hover:text-yellow-300 transition-all duration-300 transform hover:translate-x-1">{t('aboutUs')}</Link>
            <div className="px-3 py-2 text-base font-medium text-yellow-300 !important">{t('tours')}</div>
            <div className="pl-4 space-y-1">
              {tourLinks.map((link, index) => (
                <Link key={link.href} href={link.href} className="block px-3 py-2 rounded-md text-sm font-medium text-white/90 hover:bg-yellow-400/20 hover:text-yellow-300 transition-all duration-300 transform hover:translate-x-1" style={{ animationDelay: `${index * 50}ms` }}>
                  {t(link.key)}
                </Link>
              ))}
            </div>
            <Link href="/offers" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-yellow-400/20 hover:text-yellow-300 transition-all duration-300 transform hover:translate-x-1">{t('offers')}</Link>
            <Link href="/visa" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-yellow-400/20 hover:text-yellow-300 transition-all duration-300 transform hover:translate-x-1">{t('visas')}</Link>
            <Link href="/admin" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-yellow-400/20 hover:text-yellow-300 transition-all duration-300 transform hover:translate-x-1">{t('admin')}</Link>
            <Link href="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-yellow-400/20 hover:text-yellow-300 transition-all duration-300 transform hover:translate-x-1">{t('contact')}</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default AppNavbar;
