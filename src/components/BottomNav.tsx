import { Link, useLocation } from "react-router-dom";
import { Home, Package, Phone, Info } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useState } from "react";

const BottomNav = () => {
  const location = useLocation();
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      
      // Show when near bottom (within 100px)
      setIsVisible(scrollTop + windowHeight > documentHeight - 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial position
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav 
      className={`fixed bottom-16 left-0 right-0 bg-background/90 backdrop-blur-sm border-t border-border z-40 transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-around items-center h-16">
          <Link
            to="/"
            className={`flex flex-col items-center space-y-1 p-2 transition-colors ${
              isActive('/') 
                ? 'text-primary' 
                : 'text-muted-foreground hover:text-primary'
            }`}
          >
            <Home size={20} />
            <span className="text-xs">{t('nav.home')}</span>
          </Link>

          <Link
            to="/products"
            className={`flex flex-col items-center space-y-1 p-2 transition-colors ${
              isActive('/products') 
                ? 'text-primary' 
                : 'text-muted-foreground hover:text-primary'
            }`}
          >
            <Package size={20} />
            <span className="text-xs">{t('nav.products')}</span>
          </Link>

          <Link
            to="/about"
            className={`flex flex-col items-center space-y-1 p-2 transition-colors ${
              isActive('/about') 
                ? 'text-primary' 
                : 'text-muted-foreground hover:text-primary'
            }`}
          >
            <Info size={20} />
            <span className="text-xs">{t('nav.about')}</span>
          </Link>

          <Link
            to="/contact"
            className={`flex flex-col items-center space-y-1 p-2 transition-colors ${
              isActive('/contact') 
                ? 'text-primary' 
                : 'text-muted-foreground hover:text-primary'
            }`}
          >
            <Phone size={20} />
            <span className="text-xs">{t('nav.contact')}</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;