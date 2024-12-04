import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const WelcomeSection = () => {
  const { data: welcomeImage } = useQuery({
    queryKey: ['welcome-bg'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('icons')
        .select('photo_url')
        .eq('name', 'welcome_bg')
        .single();
      
      if (error) throw error;
      return data?.photo_url;
    },
  });

  return (
    <section className="relative h-screen w-full">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${welcomeImage})`,
          backgroundAttachment: "fixed"
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      
      <div className="relative h-full flex items-center justify-center text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
            Welcome to Our Factory
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-12 animate-fade-in">
            Discover our innovative solutions and quality products
          </p>
          
          <div className="flex justify-center gap-6 mb-16">
            <Button asChild variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white">
              <Link to="/products">View Products</Link>
            </Button>
            <Button asChild variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>

          <div className="animate-bounce">
            <svg 
              className="w-8 h-8 mx-auto text-white"
              fill="none" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;