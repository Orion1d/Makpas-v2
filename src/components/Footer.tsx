import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-primary text-white py-4 mt-auto fixed bottom-0 left-0 right-0 h-16 z-30">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">
          {t('footer_copyright')}
        </p>
      </div>
    </footer>
  );
};

export default Footer;