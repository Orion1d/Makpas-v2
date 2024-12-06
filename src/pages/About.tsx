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

  const getAboutText = (): string[] => {
    if (!aboutText?.en && !aboutText?.tr) return [];
    const text = language === 'en' ? aboutText.en : aboutText.tr;
    if (!text) return [];
    
    const sentences = text.split(/(?<!\d)\.(?!\d|\w)(?!\s*[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g)
      .map(sentence => sentence.trim())
      .filter(sentence => sentence && !sentence.toLowerCase().includes('contact'))
      .map(sentence => sentence.endsWith('.') ? sentence : sentence + '.');

    return sentences;
  };

  const sentences = getAboutText();

  return (
    <div className="relative min-h-screen">
      {/* Fixed Background Image */}
      {companyBuilding?.photo_url && (
        <div 
          className="fixed inset-0 w-full h-full"
          style={{
            backgroundImage: `url(${companyBuilding.photo_url})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            filter: 'brightness(0.85) saturate(0.9) blur(2px)',
            opacity: '0.25',
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-primary mb-12 text-center">
              {t('about_title')}
            </h1>
            
            <div className="space-y-6 mb-20">
              {sentences.length > 0 ? (
                <Card className="p-8 bg-white/95 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-shadow duration-300">
                  <ul className="space-y-6">
                    {sentences.map((sentence, index) => (
                      <li key={index} className="flex items-start gap-4">
                        <span className="mt-2.5 block w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                        <p className="text-gray-800 leading-relaxed text-lg font-medium tracking-wide">
                          {sentence}
                        </p>
                      </li>
                    ))}
                  </ul>
                </Card>
              ) : (
                <Card className="p-6 bg-white/95">
                  <p className="text-gray-700">Loading content...</p>
                </Card>
              )}
            </div>

            {/* Certificates Section */}
            <div className="mt-20">
              <h2 className="text-2xl font-bold text-primary mb-8 text-center">
                {t('certificates_title')}
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Current Certificate */}
                {isoCertificate?.photo_url && (
                  <Card className="group p-6 bg-white/95 backdrop-blur-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="aspect-[4/3] relative overflow-hidden rounded-lg">
                      <img
                        src={isoCertificate.photo_url}
                        alt="ISO Certificate"
                        className="absolute inset-0 w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <p className="mt-4 text-center text-gray-700 font-medium">ISO Certificate</p>
                  </Card>
                )}
                
                {/* Placeholder for Future Certificates */}
                <Card className="p-6 bg-white/80 backdrop-blur-sm border-dashed border-2 border-gray-300 flex flex-col items-center justify-center aspect-[4/3]">
                  <div className="text-4xl text-gray-400 mb-4">+</div>
                  <p className="text-gray-500 text-center font-medium">
                    Future Certificate
                  </p>
                </Card>
                
                <Card className="p-6 bg-white/80 backdrop-blur-sm border-dashed border-2 border-gray-300 flex flex-col items-center justify-center aspect-[4/3]">
                  <div className="text-4xl text-gray-400 mb-4">+</div>
                  <p className="text-gray-500 text-center font-medium">
                    Future Certificate
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;