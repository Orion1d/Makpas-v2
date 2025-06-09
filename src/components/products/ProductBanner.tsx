
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import type { EmblaPluginType as LoosePluginType } from "embla-carousel";

export const ProductBanner = () => {
  const [api, setApi] = useState<CarouselApi>();
  
  const { data: banners = [], isLoading } = useQuery({
    queryKey: ['banners'],
    queryFn: async () => {
      console.log('Fetching banners from Supabase...');
      const { data, error } = await supabase
        .from('banners')
        .select('*')
        .order('id', { ascending: true });
      
      if (error) {
        console.error('Error fetching banners:', error);
        throw error;
      }
      
      console.log('Raw banners data from Supabase:', data);
      return data || [];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });

  // Filter banners that have valid photo URLs
  const activeBanners = banners.filter(banner => banner.photo_url && banner.photo_url.trim() !== '');

  console.log('Active banners (filtered):', activeBanners);

  useEffect(() => {
    if (api) {
      api.scrollTo(0);
    }
  }, [activeBanners, api]);

  const autoplayPlugin = Autoplay({
    delay: 4000,
    stopOnInteraction: false
  }) as unknown as LoosePluginType;

  if (isLoading) {
    return (
      <section className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-all duration-700 ease-in-out py-[20px]">
        <div className="container mx-auto px-4">
          <div className="relative w-full h-[200px] sm:h-[250px] md:h-[320px] lg:h-[380px] xl:h-[420px] mb-8 overflow-hidden rounded-lg shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-safety-orange/90 animate-pulse" />
          </div>
        </div>
      </section>
    );
  }

  if (activeBanners.length === 0) {
    console.log('No active banners found, showing default banner');
    return (
      <section className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-all duration-700 ease-in-out py-[20px]">
        <div className="container mx-auto px-4">
          <div className="relative w-full h-[200px] sm:h-[250px] md:h-[320px] lg:h-[380px] xl:h-[420px] mb-8 overflow-hidden rounded-lg shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-safety-orange/90" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-all duration-700 ease-in-out py-[20px]">
      <div className="container mx-auto px-4">
        <div className="w-full max-w-7xl mx-auto">
          <Carousel 
            opts={{
              align: "start",
              loop: true,
              slidesToScroll: 1
            }} 
            plugins={[autoplayPlugin]} 
            setApi={setApi} 
            className="w-full"
          >
            <CarouselContent>
              {activeBanners.map((banner) => (
                <CarouselItem key={banner.id} className="pl-0">
                  <div className="relative w-full h-[200px] sm:h-[250px] md:h-[320px] lg:h-[380px] xl:h-[420px] overflow-hidden rounded-lg shadow-lg">
                    <img
                      src={banner.photo_url!}
                      alt={banner.name || `Banner ${banner.id}`}
                      className="object-cover w-full h-full"
                      loading="eager"
                      decoding="sync"
                      fetchPriority="high"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {activeBanners.length > 1 && (
              <>
                <CarouselPrevious className="hidden md:flex -left-12 hover:scale-110 transition-transform duration-300" />
                <CarouselNext className="hidden md:flex -right-12 hover:scale-110 transition-transform duration-300" />
              </>
            )}
          </Carousel>
        </div>
      </div>
    </section>
  );
};
