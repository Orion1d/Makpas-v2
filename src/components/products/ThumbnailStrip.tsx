
import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OptimizedImage } from "./OptimizedImage";

interface ThumbnailStripProps {
  photoUrls: string[];
  selectedImageIndex: number;
  productName: string;
  onThumbnailClick: (index: number) => void;
}

export const ThumbnailStrip = ({
  photoUrls,
  selectedImageIndex,
  productName,
  onThumbnailClick
}: ThumbnailStripProps) => {
  const thumbnailsRef = useRef<HTMLDivElement>(null);

  // Auto-center the active thumbnail
  useEffect(() => {
    if (thumbnailsRef.current && photoUrls.length > 3) {
      const thumbnail = thumbnailsRef.current.children[selectedImageIndex] as HTMLElement;
      if (thumbnail) {
        const scrollPosition = thumbnail.offsetLeft - thumbnailsRef.current.offsetWidth / 2 + thumbnail.offsetWidth / 2;
        thumbnailsRef.current.scrollTo({
          left: scrollPosition,
          behavior: 'smooth'
        });
      }
    }
  }, [selectedImageIndex, photoUrls.length]);

  const scrollThumbnails = (direction: 'left' | 'right') => {
    if (thumbnailsRef.current) {
      const scrollAmount = direction === 'left' ? -100 : 100;
      thumbnailsRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (photoUrls.length <= 1) return null;

  return (
    <div className="relative">
      <div 
        ref={thumbnailsRef} 
        className="flex space-x-3 overflow-x-auto py-2 scrollbar-hide snap-x snap-mandatory h-[100px]" 
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        {photoUrls.map((url, index) => (
          <button 
            key={`${url}-${index}`} 
            onClick={() => onThumbnailClick(index)} 
            className={cn(
              "relative flex-shrink-0 w-20 h-20 snap-start",
              "overflow-hidden rounded-lg transition-all duration-200 border-2",
              "bg-gray-50 dark:bg-gray-800",
              selectedImageIndex === index 
                ? "border-safety-orange ring-2 ring-safety-orange/50 shadow-[0_0_15px_0_rgba(255,107,53,0.6)] scale-110" 
                : "border-gray-200 dark:border-gray-600 hover:border-safety-orange/50 hover:scale-105"
            )}
          >
            <div className="w-full h-full flex items-center justify-center p-1">
              <OptimizedImage
                src={url}
                alt={`${productName} - Thumbnail ${index + 1}`}
                className="max-w-full max-h-full object-contain"
                loading={index < 5 ? "eager" : "lazy"}
                width="80"
                height="80"
                decoding="async"
                onError={() => console.info(`Thumbnail failed to load for ${productName}, thumbnail ${index + 1}`)}
              />
            </div>
            {selectedImageIndex === index && (
              <motion.div 
                className="absolute inset-0 border-2 border-safety-orange rounded-lg pointer-events-none" 
                animate={{
                  opacity: [0.3, 1, 0.3]
                }} 
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }} 
              />
            )}
          </button>
        ))}
      </div>
      
      {/* Thumbnail navigation arrows */}
      {photoUrls.length > 4 && (
        <>
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-8 bg-white/80 dark:bg-black/50 rounded-full shadow-md border border-gray-200 dark:border-gray-600" 
            onClick={() => scrollThumbnails('left')}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-0 top-1/2 -translate-y-1/2 h-8 w-8 bg-white/80 dark:bg-black/50 rounded-full shadow-md border border-gray-200 dark:border-gray-600" 
            onClick={() => scrollThumbnails('right')}
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </>
      )}
    </div>
  );
};
