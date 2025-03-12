import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { AboutContent } from "@/components/about/AboutContent";
import { MinimalCoreValues } from "@/components/about/MinimalCoreValues";
import { IsoCertification } from "@/components/about/IsoCertification";
import { ContactModule } from "@/components/about/ContactModule";
import { motion } from "framer-motion";
const About = () => {
  const {
    language,
    t
  } = useLanguage();
  const {
    data: aboutText
  } = useQuery({
    queryKey: ['about-text', language],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from('translations').select('*').eq('key', 'about_text').single();
      if (error) throw error;
      return data;
    }
  });
  const {
    data: images
  } = useQuery({
    queryKey: ['about-images'],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from('icons').select('*').in('name', ['company_building', 'iso_certificate']);
      if (error) throw error;
      return data;
    }
  });
  const companyBuilding = images?.find(img => img.name === 'company_building');
  const isoCertificate = images?.find(img => img.name === 'iso_certificate');
  const getAboutText = (): string[] => {
    if (!aboutText?.en && !aboutText?.tr) return [];
    const text = language === 'en' ? aboutText.en : aboutText.tr;
    if (!text) return [];
    return text.split(/(?<!\d)\.(?!\d|\w)(?!\s*[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g).map(sentence => sentence.trim()).filter(sentence => sentence && !sentence.toLowerCase().includes('contact')).map(sentence => sentence.endsWith('.') ? sentence : sentence + '.');
  };
  return <div className="relative min-h-screen">
      {/* Hero Section with Gradient Background */}
      

      <div className="relative z-10 py-[30px]">
        <div className="container mx-auto px-4">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5
        }} viewport={{
          once: true
        }} className="mb-20">
            <h2 className="text-3xl font-bold text-primary dark:text-white mb-8 text-center font-rubik">
              {t('about_company')}
            </h2>
            
            <div className="bg-white/90 dark:bg-primary/90 p-8 rounded-lg shadow-md">
              <AboutContent sentences={getAboutText()} />
            </div>
          </motion.div>
          
          <MinimalCoreValues />
          
          <IsoCertification isoCertificate={isoCertificate} />
          
          <ContactModule />
        </div>
      </div>
    </div>;
};
export default About;