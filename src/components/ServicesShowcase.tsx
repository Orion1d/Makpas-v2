import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import ServiceCard from "./services/ServiceCard";
import ServicesSkeleton from "./services/ServicesSkeleton";

const ServicesShowcase = () => {
  const { t, language } = useLanguage();

  const { data: services = [], isLoading } = useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('order_index');
      
      if (error) throw error;
      return data || [];
    },
  });

  if (isLoading) {
    return <ServicesSkeleton />;
  }

  return (
    <section className="py-32 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 transition-all duration-500">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-primary dark:text-white mb-6 tracking-tight">
            {t('services.title')}
          </h2>
          <div className="w-24 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            {t('services.subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <div 
              key={service.id}
              className="transform hover:scale-105 transition-all duration-500 opacity-0 animate-[fade-in_0.5s_ease-out_forwards]"
              style={{
                animationDelay: `${index * 150}ms`,
              }}
            >
              <ServiceCard
                title={language === 'tr' ? service.title_tr || service.title : service.title}
                description={language === 'tr' ? service.description_tr || service.description : service.description}
                imageUrl={service.photo_url}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesShowcase;