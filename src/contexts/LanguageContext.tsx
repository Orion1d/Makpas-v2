import React, { createContext, useContext, useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

type Language = 'en' | 'tr';
type TranslationsType = Record<string, { en: string; tr: string }>;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [translations, setTranslations] = useState<TranslationsType>({});

  const { data } = useQuery({
    queryKey: ['translations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('translations')
        .select('*');
      
      if (error) throw error;
      return data || [];
    },
  });

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

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
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