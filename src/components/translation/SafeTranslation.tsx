
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from '@/hooks/use-toast';

interface SafeTranslationProps {
  keyName: string;
  fallback?: string;
  showWarning?: boolean;
}

const SafeTranslation: React.FC<SafeTranslationProps> = ({ 
  keyName, 
  fallback, 
  showWarning = process.env.NODE_ENV === 'development' 
}) => {
  const { t } = useLanguage();
  
  const translatedText = t(keyName);
  
  // If the translation returns the key, it means it's missing
  const isMissing = translatedText === keyName;
  
  // Only show warning once per session for each key
  React.useEffect(() => {
    if (isMissing && showWarning) {
      const warningKey = `missing_translation_warned_${keyName}`;
      if (!sessionStorage.getItem(warningKey)) {
        console.warn(`Missing translation for key: ${keyName}`);
        sessionStorage.setItem(warningKey, 'true');
      }
    }
  }, [keyName, isMissing, showWarning]);
  
  return <>{isMissing ? (fallback || translatedText) : translatedText}</>;
};

export default SafeTranslation;
