import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";

const About = () => {
  const { language } = useLanguage();
  
  const { data: aboutText } = useQuery({
    queryKey: ['about', language],
    queryFn: async () => {
      const { data, error } = await supabase
        .from(language === 'en' ? 'about_en' : 'about_tr')
        .select('*')
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

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-primary mb-6">About Us</h1>
          <p className="text-gray-700 leading-relaxed">
            {language === 'en' ? aboutText?.about_text_en : aboutText?.about_text_tr}
          </p>
        </div>
        {companyBuilding?.photo_url && (
          <div className="relative h-[400px]">
            <img
              src={companyBuilding.photo_url}
              alt="Company Building"
              className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>
        )}
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold text-primary mb-8">Certificates</h2>
        {isoCertificate?.photo_url && (
          <div className="max-w-lg mx-auto">
            <img
              src={isoCertificate.photo_url}
              alt="ISO Certificate"
              className="w-full rounded-lg shadow-lg"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default About;