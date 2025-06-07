
interface BannerDotsProps {
  totalBanners: number;
  currentSlide: number;
  onSlideSelect: (index: number) => void;
  showDots: boolean;
}

export const BannerDots = ({ totalBanners, currentSlide, onSlideSelect, showDots }: BannerDotsProps) => {
  if (!showDots) return null;

  return (
    <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
      {Array.from({ length: totalBanners }).map((_, index) => (
        <button
          key={index}
          className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
            index === currentSlide 
              ? 'bg-safety-orange' 
              : 'bg-white/50 hover:bg-white/75'
          }`}
          onClick={() => onSlideSelect(index)}
          aria-label={`Go to banner ${index + 1}`}
        />
      ))}
    </div>
  );
};
