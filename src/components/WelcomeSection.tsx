import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronDown } from "lucide-react";

const WelcomeSection = () => {
  const { t } = useLanguage();
  
  const { data: welcomeImage, isLoading } = useQuery({
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

  if (isLoading) {
    return (
      <section className="relative h-screen w-full bg-gradient-to-b from-gray-900 to-primary">
        <div className="relative h-full flex items-center justify-center text-center">
          <div className="container mx-auto px-4">
            <Skeleton className="h-16 w-3/4 md:w-1/2 mx-auto mb-6 bg-gray-800/50" />
            <Skeleton className="h-8 w-2/3 md:w-1/3 mx-auto mb-12 bg-gray-800/50" />
            
            <div className="flex justify-center gap-6 mb-16">
              <Skeleton className="h-10 w-32 bg-gray-800/50" />
              <Skeleton className="h-10 w-32 bg-gray-800/50" />
            </div>

            <Skeleton className="h-8 w-8 mx-auto bg-gray-800/50" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105 transition-transform duration-[2s]"
        style={{
          backgroundImage: `url(${welcomeImage})`,
          backgroundAttachment: "fixed"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-primary/90"></div>
      </div>
      
      <div className="relative h-full flex items-center justify-center text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
            {t('welcome.title')}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-12 animate-fade-in-up">
            {t('welcome.subtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mb-16 animate-fade-in-up [animation-delay:200ms]">
            <Button 
              asChild 
              variant="outline" 
              className="bg-white hover:bg-white/90 text-primary hover:text-primary/90 border-white hover:border-white/90 transition-all duration-300"
            >
              <Link to="/products">{t('nav.view_products')}</Link>
            </Button>
            <Button 
              asChild 
              className="bg-primary hover:bg-primary/90 text-white border-2 border-transparent hover:border-white/20 transition-all duration-300"
            >
              <Link to="/contact">{t('nav.contact_us')}</Link>
            </Button>
          </div>

          <div className="animate-bounce transition-transform hover:translate-y-1 cursor-pointer">
            <ChevronDown className="w-8 h-8 mx-auto text-white opacity-80 hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;