import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-primary text-white py-6 mt-auto relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.05)_0%,rgba(255,255,255,0)_100%)]"></div>
      <div className="container mx-auto px-4 text-center relative">
        <p className="text-sm font-medium tracking-wide opacity-90 hover:opacity-100 transition-opacity">
          {t('footer_copyright')}
        </p>
      </div>
    </footer>
  );
};

export default Footer;