import { Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const TopHeader = () => {
  const { t } = useLanguage();
  
  return (
    <div 
      className="bg-primary text-white text-sm transition-all duration-300 sticky top-0 z-50 shadow-md" 
      id="top-header"
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-8">
          <div className="text-xs md:text-sm">{t('top_header_iso')}</div>
          <a 
            href="mailto:makpas@makpas.com" 
            className="flex items-center gap-1 hover:text-secondary transition-colors text-xs md:text-sm"
          >
            <Mail size={14} />
            {t('top_header_email')}
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;