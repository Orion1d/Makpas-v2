
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Skeleton } from "@/components/ui/skeleton";
import { BlurFade } from "./ui/blur-fade";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

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
    }
  });

  if (isLoading) {
    return (
      <section className="relative h-screen w-full bg-[#0A1A2F]">
        <div className="relative h-full flex items-center justify-center text-center">
          <div className="container mx-auto px-4">
            <Skeleton className="h-24 md:h-32 w-4/5 md:w-3/5 mx-auto mb-8 bg-gray-800/40" />
            <Skeleton className="h-8 w-2/3 md:w-2/5 mx-auto mb-12 bg-gray-800/40" />
            
            <div className="flex flex-col sm:flex-row justify-center gap-6 mb-16">
              <Skeleton className="h-14 w-40 sm:w-44 mx-auto sm:mx-0 bg-gray-800/40" />
              <Skeleton className="h-14 w-40 sm:w-44 mx-auto sm:mx-0 mt-4 sm:mt-0 bg-gray-800/40" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transform transition-transform duration-[2s] hover:scale-105"
        style={{
          backgroundImage: `url(${welcomeImage})`,
          backgroundAttachment: "fixed"
        }}
      >
        {/* Dark Gradient Overlay with Blue Accent */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1A2F]/90 via-[#0A1A2F]/75 to-[#0A1A2F]/90">
          {/* Blue Accent Lighting Effect */}
          <div className="absolute inset-0 opacity-30 bg-[#0A1A2F] mix-blend-overlay"></div>
        </div>
      </div>
      
      <div className="relative h-full flex items-center justify-center text-center">
        <div className="container mx-auto px-4">
          {/* Headline */}
          <BlurFade delay={0.2} inView>
            <h1 className="font-['Rubik'] font-bold text-4xl md:text-6xl lg:text-[68px] text-white mb-6 leading-tight tracking-tight shadow-lg">
              {t('welcome.title') || "Precision Metal Solutions"}
            </h1>
          </BlurFade>
          
          {/* Subheading */}
          <BlurFade delay={0.4} inView>
            <p className="font-['Inter'] text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-12 leading-relaxed">
              {t('welcome.subtitle') || "Delivering high-quality metal manufacturing with precision and excellence"}
            </p>
          </BlurFade>
          
          {/* CTAs */}
          <BlurFade delay={0.6} inView>
            <div className="flex flex-col sm:flex-row justify-center gap-6 mb-16">
              {/* Primary CTA */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3 }}
              >
                <Button 
                  asChild 
                  className="bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-white border-none shadow-lg text-lg px-8 py-6 h-auto w-full sm:w-auto"
                >
                  <Link to="/contact">{t('nav.contact_us') || "Contact Us"}</Link>
                </Button>
              </motion.div>
              
              {/* Secondary CTA */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3 }}
              >
                <Button 
                  asChild 
                  variant="outline" 
                  className="bg-transparent hover:bg-white/10 text-white border-[#FF6B35] hover:border-white backdrop-blur-md shadow-[0_0_15px_rgba(255,107,53,0.5)] text-lg px-8 py-6 h-auto w-full sm:w-auto"
                >
                  <Link to="/products">{t('nav.view_products') || "View Products"}</Link>
                </Button>
              </motion.div>
            </div>
          </BlurFade>

          {/* Floating Arrow with Bounce Animation */}
          <motion.div 
            animate={{ y: [0, 12, 0] }} 
            transition={{ 
              repeat: Infinity, 
              duration: 1.5,
              ease: "easeInOut" 
            }}
            className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
          >
            <ChevronDown className="w-10 h-10 text-[#FF6B35]" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
