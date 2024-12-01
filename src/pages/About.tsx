import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

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

  const getAboutText = () => {
    if (!aboutText) return '';
    const text = language === 'en' ? aboutText.en : aboutText.tr;
    return text.split('\n\n').filter(Boolean); // Split text into paragraphs
  };

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-primary mb-6">
            {t('about_title')}
          </h1>
          <div className="space-y-4">
            {getAboutText().map((paragraph, index) => (
              <Card key={index} className="p-6 bg-white/50 backdrop-blur-sm hover:shadow-lg transition-shadow duration-300">
                <p className="text-gray-700 leading-relaxed font-medium">
                  {paragraph}
                </p>
              </Card>
            ))}
          </div>
        </div>
        {companyBuilding?.photo_url && (
          <div className="relative h-[400px]">
            <Card className="w-full h-full overflow-hidden">
              <img
                src={companyBuilding.photo_url}
                alt="Company Building"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </Card>
          </div>
        )}
      </div>

      <Separator className="my-12" />

      <div className="mt-16">
        <h2 className="text-2xl font-bold text-primary mb-8">
          {t('certificates_title')}
        </h2>
        {isoCertificate?.photo_url && (
          <Card className="max-w-md mx-auto p-4 bg-white/50 backdrop-blur-sm hover:shadow-lg transition-shadow duration-300">
            <img
              src={isoCertificate.photo_url}
              alt="ISO Certificate"
              className="w-full rounded-lg"
            />
          </Card>
        )}
      </div>
    </div>
  );
};

export default About;