
import { Button } from "@/components/ui/button";
import { getOptimizedImageProps } from "@/utils/imageOptimization";
import type { Banner } from "../types/banner";

interface BannerSlideProps {
  banner: Banner;
  index: number;
}

export const BannerSlide = ({ banner, index }: BannerSlideProps) => {
  const imageProps = getOptimizedImageProps(index, index < 2);
  
  return (
    <div className="relative w-full h-full flex-shrink-0">
      {banner.photo_url ? (
        <img
          src={banner.photo_url}
          alt={banner.name || `Banner ${index + 1}`}
          className="absolute inset-0 w-full h-full object-cover"
          loading={imageProps.loading}
          decoding={imageProps.decoding}
          fetchPriority={imageProps.fetchPriority}
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-safety-orange/90" />
      )}
      
      <div className="absolute inset-0 bg-black bg-opacity-40" />
      
      {/* Content overlay */}
      <div className="relative h-full flex items-center justify-start px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="text-white max-w-lg">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-1 sm:mb-2 md:mb-3 lg:mb-4">
            {banner.name || `Banner ${index + 1}`}
          </h2>
          <Button 
            variant="accent" 
            size="sm"
            className="bg-safety-orange hover:bg-safety-orange/90 text-white font-semibold px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 text-sm sm:text-base"
          >
            View Products
          </Button>
        </div>
      </div>
    </div>
  );
};
