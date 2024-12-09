import { Button } from "@/components/ui/button";
import { TR, GB } from 'country-flag-icons/react/3x2';

interface LanguageToggleProps {
  language: string;
  toggleLanguage: () => void;
}

export const LanguageToggle = ({ language, toggleLanguage }: LanguageToggleProps) => {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center gap-2"
    >
      {language === 'en' ? (
        <GB className="h-4 w-auto" />
      ) : (
        <TR className="h-4 w-auto" />
      )}
      <span>{language.toUpperCase()}</span>
    </Button>
  );
};