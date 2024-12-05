import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import ServicesSkeleton from "./services/ServicesSkeleton";
import ServiceCard from "./services/ServiceCard";
import ServicesPagination from "./services/ServicesPagination";

const ServicesShowcase = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { t, language } = useLanguage();

  const { data: services = [], isLoading } = useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('order_index', { ascending: true });
      
      if (error) throw error;
      return data || [];
    },
  });

  const nextService = () => {
    setCurrentIndex((prev) => (prev + 1) % services.length);
  };

  const prevService = () => {
    setCurrentIndex((prev) => (prev - 1 + services.length) % services.length);
  };

  if (isLoading) {
    return <ServicesSkeleton />;
  }

  if (services.length === 0) {
    return null;
  }

  return (
    <section className="w-full py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 text-primary">
          {t('services.title')}
        </h2>
        
        <ServiceCard
          service={services[currentIndex]}
          language={language}
          onNext={nextService}
          onPrev={prevService}
        />

        <ServicesPagination
          totalServices={services.length}
          currentIndex={currentIndex}
          onPageChange={setCurrentIndex}
        />
      </div>
    </section>
  );
};

export default ServicesShowcase;