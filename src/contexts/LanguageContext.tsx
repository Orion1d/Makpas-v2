import React, { createContext, useContext, useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { getLocationBasedLanguage } from '@/utils/autoPreferences';

type Language = 'en' | 'tr';
type TranslationsType = Record<string, { en: string; tr: string }>;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isLoading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('preferred-language');
    return (saved as Language) || 'en';
  });
  
  const [translations, setTranslations] = useState<TranslationsType>({});

  const { data, isLoading } = useQuery({
    queryKey: ['translations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('translations')
        .select('*');
      
      if (error) throw error;
      return data || [];
    },
  });

  // Set initial language based on IP location
  useEffect(() => {
    const initLanguage = async () => {
      if (!localStorage.getItem('preferred-language')) {
        const detectedLanguage = await getLocationBasedLanguage();
        setLanguageState(detectedLanguage);
        localStorage.setItem('preferred-language', detectedLanguage);
        document.documentElement.lang = detectedLanguage;
      }
    };
    
    initLanguage();
  }, []);

  useEffect(() => {
    if (data) {
      const formattedTranslations: TranslationsType = {};
      data.forEach((item: any) => {
        formattedTranslations[item.key] = {
          en: item.en,
          tr: item.tr,
        };
      });
      setTranslations(formattedTranslations);
    }
  }, [data]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('preferred-language', lang);
    document.documentElement.lang = lang;
  };

  const t = (key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation missing for key: ${key}`);
      return key;
    }
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isLoading }}>
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