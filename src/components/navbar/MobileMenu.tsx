import { Link } from "react-router-dom";
import { Home, Mail, Package, Info } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isActive: (path: string) => string;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  language: string;
  toggleLanguage: () => void;
}

export const MobileMenu = ({
  isOpen,
  onClose,
  isActive,
  isDarkMode,
  toggleDarkMode,
  language,
  toggleLanguage,
}: MobileMenuProps) => {
  const { t } = useLanguage();

  const navItems = [
    { path: "/", icon: <Home size={20} />, label: t('nav_home') },
    { path: "/about", icon: <Info size={20} />, label: t('nav_about') },
    { path: "/products", icon: <Package size={20} />, label: t('nav_products') },
    { path: "/contact", icon: <Mail size={20} />, label: t('nav_contact') },
  ];

  return (
    <div
      className={`md:hidden ${
        isOpen ? "block" : "hidden"
      } pb-4 transition-all duration-300 ease-in-out`}
    >
      <div className="flex flex-col space-y-4 px-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md ${isActive(
              item.path
            )}`}
            onClick={onClose}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
        <div className="px-4 flex items-center gap-4">
          <ThemeToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
          <LanguageToggle language={language} toggleLanguage={toggleLanguage} />
        </div>
      </div>
    </div>
  );
};