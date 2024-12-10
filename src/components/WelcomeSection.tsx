import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Skeleton } from "@/components/ui/skeleton";

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
      <section className="relative h-screen w-full bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="relative h-full flex items-center justify-center text-center">
          <div className="container mx-auto px-4">
            <Skeleton className="h-16 w-3/4 md:w-1/2 mx-auto mb-6 bg-gray-800" />
            <Skeleton className="h-8 w-2/3 md:w-1/3 mx-auto mb-12 bg-gray-800" />
            <div className="flex justify-center gap-6 mb-16">
              <Skeleton className="h-10 w-32 bg-gray-800" />
              <Skeleton className="h-10 w-32 bg-gray-800" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transform transition-transform duration-[2s]"
        style={{
          backgroundImage: `url(${welcomeImage})`,
          backgroundAttachment: "fixed"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/60 backdrop-blur-[2px]"></div>
      </div>
      
      <div className="relative h-full flex items-center justify-center text-center">
        <div className="container mx-auto px-4 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 drop-shadow-lg tracking-tight leading-tight">
            {t('welcome.title')}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-16 leading-relaxed drop-shadow-md font-light">
            {t('welcome.subtitle')}
          </p>
          
          <div className="flex justify-center gap-8 mb-20">
            <Button 
              asChild 
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white backdrop-blur-md transform hover:scale-105 transition-all duration-300 shadow-lg px-8"
            >
              <Link to="/products">{t('nav.view_products')}</Link>
            </Button>
            <Button 
              asChild 
              variant="outline"
              size="lg"
              className="border-2 bg-transparent hover:bg-white/10 text-white backdrop-blur-md transform hover:scale-105 transition-all duration-300 shadow-lg px-8"
            >
              <Link to="/contact">{t('nav.contact_us')}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;