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
  const { t, currentLanguage, setLanguage, languages } = useLanguage();


  const tourLinks = [
    { href: '/tours/egypt', text: 'Egypt' },
    { href: '/tours/europe', text: 'Europe' },
    { href: '/tours/lebanon', text: 'Lebanon' },
    { href: '/tours/indonesia', text: 'Indonesia' },
    { href: '/tours/malaysia', text: 'Malaysia' },
    { href: '/tours/uae', text: 'UAE' },
    { href: '/tours/saudi', text: 'Saudi Arabia' },
    { href: '/tours/china', text: 'China' },
  ];

  // Close mobile menu and dropdown on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
    setIsLanguageDropdownOpen(false);
  }, [pathname]);

  const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
    return (
      <Link href={href} className={`relative px-3 py-2 text-sm font-medium text-white hover:text-white/80 transition-colors duration-300`}>
        {children}
      </Link>
    );
  };

  return (
    <nav className="bg-[var(--primary-color)] shadow-lg sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center text-white hover:text-white space-x-2 rtl:space-x-reverse">
              <Image src="/images/logo.png" alt="Logo" width={30} height={30} />
              <span className="font-bold text-white">Fast for Tourism</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ms-auto flex items-center space-x-4 rtl:space-x-reverse">
              <NavLink href="/">{t('home')}</NavLink>
              <NavLink href="/about">{t('aboutUs')}</NavLink>
              {/* Tours Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="relative px-3 py-2 text-sm font-medium text-white hover:text-white/80 transition-colors duration-300 flex items-center"
                >
                  <span className="text-white">{t('tours')}</span>
                  <i className="fas fa-chevron-down text-xs ms-1 text-white"></i>
                </button>
                {isDropdownOpen && (
                  <div className="absolute -start-4 top-full mt-1 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 z-[60]">
                    {tourLinks.map(link => (
                      <Link 
                        key={link.href} 
                        href={link.href} 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 text-right transition-colors duration-200"
                        style={{ color: '#374151' }}
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        {link.text}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <NavLink href="/offers">{t('offers')}</NavLink>
              <NavLink href="/visa">{t('visas')}</NavLink>
              <NavLink href="/admin">{t('admin')}</NavLink>
              <NavLink href="/contact">{t('contact')}</NavLink>
              
              {/* Language Switcher */}
              <div 
                className="relative"
                onMouseEnter={() => setIsLanguageDropdownOpen(true)}
                onMouseLeave={() => setIsLanguageDropdownOpen(false)}
              >
                <button 
                  onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                  className="relative px-3 py-2 text-sm font-medium text-white hover:text-white/80 transition-all duration-300 flex items-center border-2 border-yellow-400 rounded-lg hover:border-yellow-300 hover:bg-white/10 hover:scale-105"
                >
                  <span className="text-white me-2">{languages[currentLanguage].flag}</span>
                  <span className="text-white">{languages[currentLanguage].name}</span>
                  <i className="fas fa-chevron-down text-xs ms-1 text-white"></i>
                </button>
                {isLanguageDropdownOpen && (
                  <div className="absolute end-0 top-full mt-1 w-40 rounded-md shadow-lg bg-white border-2 border-yellow-300 ring-1 ring-black ring-opacity-5 py-1 z-[60] animate-in fade-in slide-in-from-top-2 duration-200">
                    {Object.entries(languages).map(([code, lang]) => (
                      <button
                        key={code}
                        onClick={() => {
                          setLanguage(code as typeof currentLanguage);
                          setIsLanguageDropdownOpen(false);
                        }}
                        className={`w-full text-right px-4 py-2 text-sm transition-colors duration-200 ${
                          currentLanguage === code
                            ? 'bg-gradient-to-r from-blue-50 to-yellow-50 border-l-4 border-yellow-300 text-blue-900 font-semibold'
                            : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                        }`}
                        style={currentLanguage === code ? {} : { color: '#374151' }}
                      >
                        <span className="me-2">{lang.flag}</span>
                        {lang.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-white/80 hover:text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <i className="fas fa-times h-6 w-6"></i>
              ) : (
                <i className="fas fa-bars h-6 w-6"></i>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="block px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium text-white !important hover:bg-white/20">{t('home')}</Link>
            <Link href="/about" className="block px-3 py-2 rounded-md text-base font-medium text-white !important hover:bg-white/20">{t('aboutUs')}</Link>
            {/* Mobile Tours Dropdown - Simplified as a list */}
            <div className="px-3 py-2 text-base font-medium text-white !important">{t('tours')}</div>
            <div className="ps-4">
              {tourLinks.map(link => (
                <Link key={link.href} href={link.href} className="block px-3 py-2 rounded-md text-sm font-medium text-white/90 hover:bg-white/20">
                  {link.text}
                </Link>
              ))}
            </div>
            <Link href="/offers" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-white/20">{t('offers')}</Link>
            <Link href="/visa" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-white/20">{t('visas')}</Link>
            <Link href="/admin" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-white/20">{t('admin')}</Link>
            <Link href="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-white/20">{t('contact')}</Link>
            
            {/* Mobile Language Switcher */}
            <div className="border-t border-white/20 mt-2 pt-2">
              <div className="px-3 py-2 text-base font-medium text-white mb-2">{t('selectLanguage')}</div>
              <div className="ps-4 space-y-1">
                {Object.entries(languages).map(([code, lang]) => (
                  <button
                    key={code}
                    onClick={() => {
                      setLanguage(code as typeof currentLanguage);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full text-right px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      currentLanguage === code
                        ? 'bg-white/30 text-white font-semibold'
                        : 'text-white/90 hover:bg-white/20'
                    }`}
                  >
                    <span className="me-2">{lang.flag}</span>
                    {lang.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default AppNavbar;
