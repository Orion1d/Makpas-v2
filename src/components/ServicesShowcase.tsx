import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import ServiceCard from "./services/ServiceCard";
import ServicesSkeleton from "./services/ServicesSkeleton";
const ServicesShowcase = () => {
  const {
    t,
    language
  } = useLanguage();
  const {
    data: services = [],
    isLoading
  } = useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from('services').select('*').order('order_index');
      if (error) throw error;
      return data || [];
    }
  });
  if (isLoading) {
    return <ServicesSkeleton />;
  }
  return <section className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 transition-all duration-700 ease-in-out py-0">
      <div className="container mx-auto px-4 bg-sky-100">
        <h2 className="text-4xl font-bold text-center mb-16 text-primary dark:text-white transform hover:scale-105 transition-transform duration-300">
          {t('services.title')}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => <div key={service.id} className="transform hover:scale-105 transition-all duration-500" style={{
          animationDelay: `${index * 150}ms`
        }}>
              <ServiceCard title={language === 'tr' ? service.title_tr || service.title : service.title} description={language === 'tr' ? service.description_tr || service.description : service.description} imageUrl={service.photo_url} />
            </div>)}
        </div>
      </div>
    </section>;
};
export default ServicesShowcase;