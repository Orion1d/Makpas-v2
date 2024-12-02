import { Link, useLocation } from "react-router-dom";
import { Home, Mail, Package, Info, Menu, X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { TR, GB } from 'country-flag-icons/react/3x2';
import { useState } from "react";

const Navbar = () => {
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const { data: logo } = useQuery({
    queryKey: ['logo'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('icons')
        .select('photo_url')
        .eq('name', 'logo1')
        .single();
      
      if (error) throw error;
      return data;
    },
  });
  
  const isActive = (path: string) => {
    return location.pathname === path ? "text-secondary border-b-2 border-secondary" : "text-primary hover:text-secondary";
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'tr' : 'en');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { path: "/", icon: <Home size={20} />, label: t('nav_home') },
    { path: "/about", icon: <Info size={20} />, label: t('nav_about') },
    { path: "/products", icon: <Package size={20} />, label: t('nav_products') },
    { path: "/contact", icon: <Mail size={20} />, label: t('nav_contact') },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm shadow-sm z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            {logo?.photo_url && (
              <img src={logo.photo_url} alt="Logo" className="h-10" />
            )}
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-primary hover:text-secondary"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-1 ${isActive(item.path)}`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLanguage}
              className="ml-4 flex items-center gap-2"
            >
              {language === 'en' ? (
                <GB className="h-4 w-auto" />
              ) : (
                <TR className="h-4 w-auto" />
              )}
              <span>{language.toUpperCase()}</span>
            </Button>
          </div>
        </div>

        {/* Mobile navigation */}
        <div
          className={`md:hidden ${
            isMenuOpen ? "block" : "hidden"
          } pb-4 transition-all duration-300 ease-in-out`}
        >
          <div className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md ${isActive(
                  item.path
                )}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
            <div className="px-4">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleLanguage}
                className="w-full flex items-center justify-center gap-2"
              >
                {language === 'en' ? (
                  <GB className="h-4 w-auto" />
                ) : (
                  <TR className="h-4 w-auto" />
                )}
                <span>{language.toUpperCase()}</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;