
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { AboutContent } from "@/components/about/AboutContent";
import { CertificatesSection } from "@/components/about/CertificatesSection";
import { BlurFade } from "@/components/ui/blur-fade";
import { CoreValuesGrid } from "@/components/about/CoreValuesGrid";
import { StatsCounter } from "@/components/about/StatsCounter";
import { TimelineSection } from "@/components/about/TimelineSection";
import { motion } from "framer-motion";

const About = () => {
  const { language, t } = useLanguage();
  
  const { data: aboutText } = useQuery({
    queryKey: ['about-text', language],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('translations')
        .select('*')
        .eq('key', 'about_text')
        .single();
      
      if (error) throw error;
      return data;
    },
  });

  const { data: images } = useQuery({
    queryKey: ['about-images'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('icons')
        .select('*')
        .in('name', ['company_building', 'iso_certificate']);
      
      if (error) throw error;
      return data;
    },
  });

  const companyBuilding = images?.find(img => img.name === 'company_building');
  const isoCertificate = images?.find(img => img.name === 'iso_certificate');

  const getAboutText = (): string[] => {
    if (!aboutText?.en && !aboutText?.tr) return [];
    const text = language === 'en' ? aboutText.en : aboutText.tr;
    if (!text) return [];
    
    return text.split(/(?<!\d)\.(?!\d|\w)(?!\s*[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g)
      .map(sentence => sentence.trim())
      .filter(sentence => sentence && !sentence.toLowerCase().includes('contact'))
      .map(sentence => sentence.endsWith('.') ? sentence : sentence + '.');
  };

  return (
    <div className="relative min-h-screen">
      {/* Hero Section with Background */}
      <div className="relative h-[70vh] min-h-[500px] overflow-hidden">
        {companyBuilding?.photo_url && (
          <>
            <div 
              className="absolute inset-0 w-full h-full"
              style={{
                backgroundImage: `url(${companyBuilding.photo_url})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-primary/80 to-primary/95 dark:from-primary/90 dark:to-primary/95"></div>
          </>
        )}
        
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-rubik"
          >
            {t('precision_engineering')}
          </motion.h1>
          
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg md:text-xl text-white/90 max-w-3xl mb-12"
          >
            {t('about_subtitle')}
          </motion.div>
          
          <StatsCounter />
        </div>
      </div>

      <div className="relative z-10 py-20 bg-pattern-bubbles bg-transition">
        <div className="container mx-auto px-4">
          <BlurFade>
            <div className="max-w-4xl mx-auto mb-24">
              <h2 className="text-3xl font-bold text-primary dark:text-white mb-8 text-center font-rubik">
                {t('about_company')}
              </h2>
              
              <div className="bg-white/90 dark:bg-primary/90 backdrop-blur-sm p-8 rounded-lg shadow-md">
                <AboutContent sentences={getAboutText()} />
              </div>
            </div>
          </BlurFade>
          
          <BlurFade delay={0.1}>
            <CoreValuesGrid />
          </BlurFade>
          
          <BlurFade delay={0.2}>
            <TimelineSection />
          </BlurFade>
          
          <BlurFade delay={0.3}>
            <CertificatesSection isoCertificate={isoCertificate} />
          </BlurFade>
        </div>
      </div>
    </div>
  );
};

export default About;
