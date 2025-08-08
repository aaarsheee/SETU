import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export type Language = 'en' | 'ne';

type Translations = Record<string, string>;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('preferred-language');
    return (saved as Language) || 'en';
  });

  const [translations, setTranslations] = useState<Translations>({});

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const translationModule = await import(`../translations/${language}.ts`);
        setTranslations(translationModule.default);
      } catch (error) {
        console.error(`Failed to load translations for ${language}:`, error);
        if (language !== 'en') {
          const fallbackModule = await import('../translations/en.ts');
          setTranslations(fallbackModule.default);
        }
      }
    };

    loadTranslations();
  }, [language]);

  useEffect(() => {
    localStorage.setItem('preferred-language', language);
  }, [language]);

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: string | Translations | undefined = translations;

    for (const k of keys) {
      if (typeof value === 'string') {
        // If at any point value is a string but keys remain, break
        value = undefined;
        break;
      }
      value = value?.[k];
      if (value === undefined) break;
    }

    return typeof value === 'string' ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
