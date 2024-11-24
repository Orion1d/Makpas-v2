import { Link, useLocation } from "react-router-dom";
import { Home, Mail, Package } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Navbar = () => {
  const location = useLocation();
  
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

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm shadow-sm z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            {logo?.photo_url && (
              <img src={logo.photo_url} alt="Makpas Logo" className="h-10" />
            )}
          </Link>
          
          <div className="flex space-x-8">
            <Link to="/" className={`flex items-center space-x-1 ${isActive("/")}`}>
              <Home size={20} />
              <span>Home</span>
            </Link>
            <Link to="/products" className={`flex items-center space-x-1 ${isActive("/products")}`}>
              <Package size={20} />
              <span>Products</span>
            </Link>
            <Link to="/contact" className={`flex items-center space-x-1 ${isActive("/contact")}`}>
              <Mail size={20} />
              <span>Contact</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;