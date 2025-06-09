
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
          className="object-cover w-full h-full"
          loading={imageProps.loading}
          decoding={imageProps.decoding}
          fetchPriority={imageProps.fetchPriority}
          width="800"
          height="400"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-safety-orange/90" />
      )}
    </div>
  );
};
