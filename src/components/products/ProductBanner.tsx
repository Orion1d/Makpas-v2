
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Banner {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  link?: string;
  buttonText?: string;
}

interface ProductBannerProps {
  banners?: Banner[];
}

export const ProductBanner = ({ banners = [] }: ProductBannerProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Demo banners - you can replace these with data from Supabase later
  const demoBanners: Banner[] = [
    {
      id: "1",
      title: "High-Heat Welding Gloves",
      subtitle: "Designed for Maximum Safety, Flexibility, and Control",
      image: "/lovable-uploads/48420f73-2f5c-4071-a15c-0f3785b48dc1.png",
      buttonText: "View Products"
    },
    {
      id: "2",
      title: "New Product Line",
      subtitle: "Discover our latest industrial solutions",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&h=400&q=80",
      buttonText: "Explore Now"
    },
    {
      id: "3", 
      title: "Special Campaign",
      subtitle: "Limited time offer on selected products",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&h=400&q=80",
      buttonText: "Learn More"
    },
    {
      id: "4",
      title: "Popular Products",
      subtitle: "Most demanded items this month",
      image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1200&h=400&q=80",
      buttonText: "View Collection"
    }
  ];

  const activeBanners = banners.length > 0 ? banners : demoBanners;

  useEffect(() => {
    if (activeBanners.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % activeBanners.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [activeBanners.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % activeBanners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + activeBanners.length) % activeBanners.length);
  };

  if (activeBanners.length === 0) return null;

  return (
    <div className="relative w-full h-[200px] sm:h-[250px] md:h-[320px] lg:h-[380px] xl:h-[420px] mb-8 overflow-hidden rounded-lg shadow-lg">
      {/* Banner slides */}
      <div 
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {activeBanners.map((banner, index) => (
          <div
            key={banner.id}
            className="relative w-full h-full flex-shrink-0"
          >
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${banner.image})` }}
            />
            {/* Preload first few banner images */}
            {index < 2 && (
              <link 
                rel="preload" 
                as="image" 
                href={banner.image}
                fetchpriority={index === 0 ? "high" : "low"}
              />
            )}
            <div className="absolute inset-0 bg-black bg-opacity-40" />
            
            {/* Content overlay */}
            <div className="relative h-full flex items-center justify-start px-4 sm:px-6 md:px-8 lg:px-12">
              <div className="text-white max-w-lg">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-1 sm:mb-2 md:mb-3 lg:mb-4">
                  {banner.title}
                </h2>
                {banner.subtitle && (
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-3 sm:mb-4 md:mb-5 lg:mb-6 opacity-90">
                    {banner.subtitle}
                  </p>
                )}
                {banner.buttonText && (
                  <Button 
                    variant="accent" 
                    size="sm"
                    className="bg-safety-orange hover:bg-safety-orange/90 text-white font-semibold px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 text-sm sm:text-base"
                  >
                    {banner.buttonText}
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      {activeBanners.length > 1 && (
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
      {activeBanners.length > 1 && (
        <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {activeBanners.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-safety-orange' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
