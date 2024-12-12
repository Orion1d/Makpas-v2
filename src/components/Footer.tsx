import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-primary text-white py-4 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">
          {t('footer_copyright')}
        </p>
      </div>
    </footer>
  );
};

export default Footer;