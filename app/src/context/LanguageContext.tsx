'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Language, languages, getTranslation } from '@/lib/translations';

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  languages: typeof languages;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('ar');
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Load language from localStorage
    const savedLanguage = localStorage.getItem('language') as Language | null;
    if (savedLanguage && Object.keys(languages).includes(savedLanguage)) {
      setCurrentLanguage(savedLanguage);
    } else {
      // Default to Arabic
      setCurrentLanguage('ar');
    }
    setIsHydrated(true);
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setCurrentLanguage(lang);
    localStorage.setItem('language', lang);
    // Update HTML direction attribute for RTL languages
    if (lang === 'ar') {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ar';
    } else {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = lang;
    }
  };

  const t = (key: string): string => {
    return getTranslation(currentLanguage, key);
  };

  const isRTL = currentLanguage === 'ar';

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        setLanguage: handleSetLanguage,
        t,
        languages,
        isRTL,
      }}
    >
      {isHydrated ? children : null}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
