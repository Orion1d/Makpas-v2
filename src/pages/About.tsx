
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { AboutContent } from "@/components/about/AboutContent";
import { CertificatesSection } from "@/components/about/CertificatesSection";

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
    <div className="relative min-h-screen bg-pattern-bubbles bg-transition">
      {companyBuilding?.photo_url && (
        <div 
          className="fixed inset-0 w-full h-full opacity-25 pointer-events-none"
          style={{
            backgroundImage: `url(${companyBuilding.photo_url})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'scroll',
          }}
        />
      )}

      <div className="relative z-10">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-primary dark:text-white mb-12 text-center">
              {t('about_title')}
            </h1>
            
            <div className="space-y-6 mb-20 bg-white/80 dark:bg-primary/80 backdrop-blur-sm p-6 rounded-lg shadow-md">
              <AboutContent sentences={getAboutText()} />
            </div>

            <CertificatesSection isoCertificate={isoCertificate} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
