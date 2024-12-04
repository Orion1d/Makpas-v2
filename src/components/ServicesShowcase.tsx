import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

const ServicesShowcase = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { t } = useLanguage();

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

  if (isLoading || services.length === 0) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  const currentService = services[currentIndex];

  return (
    <section className="w-full py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 text-primary">{t('services.title')}</h2>
        
        <div className="relative">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10"
              onClick={prevService}
            >
              <ChevronLeft className="h-8 w-8" />
            </Button>

            <div className="w-full px-16">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div 
                  className="relative h-[400px] overflow-hidden rounded-xl"
                  style={{
                    backgroundImage: `url(${currentService.photo_url})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <div className="absolute inset-0 bg-black/30"></div>
                </div>
                
                <div className="space-y-6">
                  <div 
                    className={cn(
                      "transition-opacity duration-500",
                      currentService ? "opacity-100" : "opacity-0"
                    )}
                  >
                    <h3 className="text-3xl font-bold mb-4 text-primary">
                      {currentService.title}
                    </h3>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      {currentService.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10"
              onClick={nextService}
            >
              <ChevronRight className="h-8 w-8" />
            </Button>
          </div>

          <div className="flex justify-center mt-8 gap-2">
            {services.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "w-3 h-3 rounded-full transition-all duration-300",
                  index === currentIndex
                    ? "bg-primary scale-125"
                    : "bg-gray-300 hover:bg-gray-400"
                )}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesShowcase;