
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import ImageLightbox from "@/components/about/ImageLightbox";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductImageGalleryProps {
  photoUrls: string[];
  productName: string;
}

const ProductImageGallery = ({ photoUrls, productName }: ProductImageGalleryProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const thumbnailsRef = useRef<HTMLDivElement>(null);
  
  // Handle thumbnail navigation
  const scrollThumbnails = (direction: 'left' | 'right') => {
    if (thumbnailsRef.current) {
      const scrollAmount = direction === 'left' ? -100 : 100;
      thumbnailsRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Auto-center the active thumbnail
  useEffect(() => {
    if (thumbnailsRef.current && photoUrls.length > 3) {
      const thumbnail = thumbnailsRef.current.children[selectedImageIndex] as HTMLElement;
      if (thumbnail) {
        const scrollPosition = thumbnail.offsetLeft - (thumbnailsRef.current.offsetWidth / 2) + (thumbnail.offsetWidth / 2);
        thumbnailsRef.current.scrollTo({ left: scrollPosition, behavior: 'smooth' });
      }
    }
  }, [selectedImageIndex, photoUrls.length]);

  const handlePrevImage = () => {
    setSelectedImageIndex(prev => (prev > 0 ? prev - 1 : photoUrls.length - 1));
  };

  const handleNextImage = () => {
    setSelectedImageIndex(prev => (prev < photoUrls.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="space-y-4">
      {/* Main Image with Parallax Hover Effect */}
      <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
        <ImageLightbox
          imageUrl={photoUrls[selectedImageIndex]}
          alt={`${productName} - Image ${selectedImageIndex + 1}`}
        >
          <div 
            className="relative aspect-square overflow-hidden rounded-lg group cursor-zoom-in"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <motion.img
              src={photoUrls[selectedImageIndex]}
              alt={`${productName} - Image ${selectedImageIndex + 1}`}
              className="object-cover w-full h-full transition-transform duration-300"
              animate={{
                scale: isHovering ? 1.1 : 1,
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
            <div className="absolute top-3 right-3 bg-white/80 dark:bg-black/50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <ZoomIn className="h-5 w-5 text-primary dark:text-white" />
            </div>
          </div>
        </ImageLightbox>

        {/* Image Navigation Arrows */}
        {photoUrls.length > 1 && (
          <>
            <Button 
              variant="secondary"
              size="icon" 
              className="absolute left-2 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-white/70 dark:bg-black/40 hover:bg-white dark:hover:bg-black/60 shadow-md z-10"
              onClick={(e) => {
                e.stopPropagation();
                handlePrevImage();
              }}
            >
              <ArrowLeft className="h-5 w-5 text-primary dark:text-white" />
            </Button>
            <Button 
              variant="secondary"
              size="icon" 
              className="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-white/70 dark:bg-black/40 hover:bg-white dark:hover:bg-black/60 shadow-md z-10"
              onClick={(e) => {
                e.stopPropagation();
                handleNextImage();
              }}
            >
              <ArrowRight className="h-5 w-5 text-primary dark:text-white" />
            </Button>
          </>
        )}
      </div>

      {/* Thumbnails with Horizontal Scroll */}
      {photoUrls.length > 1 && (
        <div className="relative">
          <div 
            ref={thumbnailsRef}
            className="flex space-x-2 overflow-x-auto py-2 scrollbar-hide snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {photoUrls.map((url, index) => (
              <button
                key={url}
                onClick={() => setSelectedImageIndex(index)}
                className={cn(
                  "relative flex-shrink-0 w-20 h-20 snap-start",
                  "overflow-hidden rounded-md transition-all duration-200",
                  selectedImageIndex === index
                    ? "border-2 border-safety-orange ring-2 ring-safety-orange/20"
                    : "border-2 border-transparent hover:border-safety-orange/50"
                )}
              >
                <img
                  src={url}
                  alt={`${productName} - Thumbnail ${index + 1}`}
                  className="object-cover w-full h-full"
                />
              </button>
            ))}
          </div>
          
          {/* Thumbnail navigation arrows */}
          {photoUrls.length > 4 && (
            <>
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute left-0 top-1/2 -translate-y-1/2 h-7 w-7 bg-white/70 dark:bg-black/40 rounded-full shadow-sm"
                onClick={() => scrollThumbnails('left')}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-0 top-1/2 -translate-y-1/2 h-7 w-7 bg-white/70 dark:bg-black/40 rounded-full shadow-sm"
                onClick={() => scrollThumbnails('right')}
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;
