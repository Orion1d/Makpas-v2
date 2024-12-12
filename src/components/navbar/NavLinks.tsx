import { Link, useLocation } from "react-router-dom";
import { Home, Package, Info, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const NavLinks = () => {
  const location = useLocation();
  const { t } = useLanguage();

  const isActive = (path: string) => {
    return location.pathname === path ? "text-secondary border-b-2 border-secondary" : "text-primary hover:text-secondary";
  };

  const navItems = [
    { path: "/", icon: <Home size={20} />, label: t('nav_home') },
    { path: "/products", icon: <Package size={20} />, label: t('nav_products') },
    { path: "/about", icon: <Info size={20} />, label: t('nav_about') },
    { path: "/contact", icon: <Mail size={20} />, label: t('nav_contact') },
  ];

  return (
    <>
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`flex items-center space-x-2 px-2 ${isActive(item.path)}`}
        >
          {item.icon}
          <span>{item.label}</span>
        </Link>
      ))}
    </>
  );
};