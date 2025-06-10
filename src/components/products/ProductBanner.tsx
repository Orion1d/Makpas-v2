
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface BannerIcon {
  id: number;
  name: string;
  photo_url: string | null;
}

export const ProductBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Fetch banner images from icons table
  const {
    data: bannerIcons = [],
    isLoading
  } = useQuery({
    queryKey: ['banner-icons'],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from('icons').select('*').ilike('name', 'banner_%').order('name', {
        ascending: true
      });
      if (error) throw error;
      return (data || []) as BannerIcon[];
    }
  });

  // Filter banners that have valid photo URLs
  const validBanners = bannerIcons.filter(banner => banner.photo_url);

  useEffect(() => {
    if (validBanners.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % validBanners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [validBanners.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % validBanners.length);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + validBanners.length) % validBanners.length);
  };

  if (isLoading || validBanners.length === 0) return null;

  return (
    <div className="relative w-full aspect-[2/1] mb-8 overflow-hidden rounded-lg shadow-lg">
      {/* Banner slides */}
      <div 
        className="flex transition-transform duration-500 ease-in-out h-full" 
        style={{
          transform: `translateX(-${currentSlide * 100}%)`
        }}
      >
        {validBanners.map((banner, index) => (
          <div key={banner.id} className="relative w-full h-full flex-shrink-0">
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
              style={{
                backgroundImage: `url(${banner.photo_url})`
              }} 
            />
            {/* Preload first few banner images */}
            {index < 2 && banner.photo_url && (
              <link 
                rel="preload" 
                as="image" 
                href={banner.photo_url} 
                fetchPriority={index === 0 ? "high" : "low"} 
              />
            )}
            <div className="absolute inset-0 bg-black bg-opacity-20" />
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      {validBanners.length > 1 && (
        <>
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm h-8 w-8 sm:h-10 sm:w-10" 
            onClick={prevSlide}
          >
            <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm h-8 w-8 sm:h-10 sm:w-10" 
            onClick={nextSlide}
          >
            <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6" />
          </Button>
        </>
      )}

      {/* Dots indicator */}
      {validBanners.length > 1 && (
        <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {validBanners.map((_, index) => (
            <button 
              key={index}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-safety-orange' : 'bg-white/50 hover:bg-white/75'
              }`}
              onClick={() => goToSlide(index)} 
            />
          ))}
        </div>
      )}
    </div>
  );
};
