
import { useState, useEffect } from "react";
import { preloadCriticalImages } from "@/utils/imageOptimization";
import { useBanners } from "./hooks/useBanners";
import { BannerSlide } from "./components/BannerSlide";
import { BannerNavigation } from "./components/BannerNavigation";
import { BannerDots } from "./components/BannerDots";
import { DefaultBanner } from "./components/DefaultBanner";
import { LoadingBanner } from "./components/LoadingBanner";
import type { ProductBannerProps } from "./types/banner";

export const ProductBanner = ({ banners = [] }: ProductBannerProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { activeBanners, isLoading, error } = useBanners(banners);

  // Preload critical images when banners are available
  useEffect(() => {
    if (activeBanners.length > 0) {
      const imageUrls = activeBanners
        .filter(banner => banner.photo_url)
        .map(banner => banner.photo_url!)
        .slice(0, 3);
      
      if (imageUrls.length > 0) {
        preloadCriticalImages(imageUrls);
      }
    }
  }, [activeBanners]);

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

  if (isLoading) {
    return <LoadingBanner />;
  }

  if (activeBanners.length === 0) {
    return <DefaultBanner />;
  }

  const hasMultipleBanners = activeBanners.length > 1;

  return (
    <div className="relative w-full h-[200px] sm:h-[250px] md:h-[320px] lg:h-[380px] xl:h-[420px] mb-8 overflow-hidden rounded-lg shadow-lg">
      {/* Banner slides */}
      <div 
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {activeBanners.map((banner, index) => (
          <BannerSlide
            key={banner.id}
            banner={banner}
            index={index}
          />
        ))}
      </div>

      <BannerNavigation
        onPrevious={prevSlide}
        onNext={nextSlide}
        showNavigation={hasMultipleBanners}
      />

      <BannerDots
        totalBanners={activeBanners.length}
        currentSlide={currentSlide}
        onSlideSelect={goToSlide}
        showDots={hasMultipleBanners}
      />
    </div>
  );
};
