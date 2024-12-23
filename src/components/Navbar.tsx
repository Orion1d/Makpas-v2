import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useState } from "react";
import { NavLinks } from "./navbar/NavLinks";
import { ThemeToggle } from "./navbar/ThemeToggle";
import { LanguageToggle } from "./navbar/LanguageToggle";
import { MobileMenu } from "./navbar/MobileMenu";

const Navbar = () => {
  const { language, setLanguage } = useLanguage();
  const { isDarkMode, toggleDarkMode } = useTheme();
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

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'tr' : 'en');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path ? "text-secondary border-b-2 border-secondary" : "text-primary hover:text-secondary";
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-b border-border z-50">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-14">
            <Link to="/" className="flex items-center">
              {logo?.photo_url && (
                <img src={logo.photo_url} alt="Logo" className="h-11" />
              )}
            </Link>

            <button
              onClick={toggleMenu}
              className="md:hidden p-2 text-primary hover:text-secondary"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            
            <div className="hidden md:flex items-center">
              <div className="flex items-center space-x-6 mr-8">
                <NavLinks />
              </div>
              <div className="flex items-center gap-4">
                <ThemeToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
                <LanguageToggle language={language} toggleLanguage={toggleLanguage} />
              </div>
            </div>
          </div>

          <MobileMenu
            isOpen={isMenuOpen}
            onClose={() => setIsMenuOpen(false)}
            isActive={isActive}
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
            language={language}
            toggleLanguage={toggleLanguage}
          />
        </div>
      </nav>
      <div className="h-14" /> {/* Reduced spacer height to match navbar */}
    </>
  );
};

export default Navbar;