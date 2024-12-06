import { Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const TopHeader = () => {
  const { t } = useLanguage();
  
  return (
    <div 
      className="bg-primary text-white text-sm transition-all duration-300 sticky top-0 z-50 shadow-elegant backdrop-blur-sm bg-opacity-95" 
      id="top-header"
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-8">
          <div className="text-xs md:text-sm font-medium">{t('top_header_iso')}</div>
          <a 
            href="mailto:makpas@makpas.com" 
            className="flex items-center gap-1 hover:text-secondary transition-colors duration-300 text-xs md:text-sm group"
          >
            <Mail size={14} className="group-hover:scale-110 transition-transform duration-300" />
            <span className="group-hover:underline">{t('top_header_email')}</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;