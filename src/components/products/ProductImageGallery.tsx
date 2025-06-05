
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import ImageLightbox from "@/components/about/ImageLightbox";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ProductImageGalleryProps {
  photoUrls: string[];
  productName: string;
}

const ProductImageGallery = ({
  photoUrls,
  productName
}: ProductImageGalleryProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const thumbnailsRef = useRef<HTMLDivElement>(null);
  const isTouchDevice = useRef(false);
  
  useEffect(() => {
    // Detect touch devices
    isTouchDevice.current = window.matchMedia('(hover: none)').matches;
  }, []);

  // Generate a dynamic background based on product name
  const generateDynamicHue = () => {
    let hash = 0;
    for (let i = 0; i < productName.length; i++) {
      hash = productName.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash % 360;
  };
  const dynamicHue = generateDynamicHue();
  const dynamicGradient = `linear-gradient(135deg, hsl(${dynamicHue}, 70%, 25%), hsl(${dynamicHue + 30}, 80%, 15%))`;

  // Handle thumbnail navigation
  const scrollThumbnails = (direction: 'left' | 'right') => {
    if (thumbnailsRef.current) {
      const scrollAmount = direction === 'left' ? -100 : 100;
      thumbnailsRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Touch swipe handling
  const handleTouchStart = useRef<number | null>(null);
  const handleTouchDown = (e: React.TouchEvent) => {
    handleTouchStart.current = e.touches[0].clientX;
  };
  const handleTouchUp = (e: React.TouchEvent) => {
    if (handleTouchStart.current === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = handleTouchStart.current - touchEnd;

    // Threshold to determine if swipe was intentional
    const threshold = 50;
    if (diff > threshold) {
      // Swiped left, go to next image
      handleNextImage();
    } else if (diff < -threshold) {
      // Swiped right, go to previous image
      handlePrevImage();
    }
    handleTouchStart.current = null;
  };

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
  
  const handlePrevImage = () => {
    setSelectedImageIndex(prev => prev > 0 ? prev - 1 : photoUrls.length - 1);
  };
  
  const handleNextImage = () => {
    setSelectedImageIndex(prev => prev < photoUrls.length - 1 ? prev + 1 : 0);
  };
  
  return (
    <div className="space-y-4 contain-content">
      {/* Main Image with CNC machine border effect and dynamic background */}
      <div 
        className="relative aspect-square rounded-lg overflow-hidden" 
        style={{
          backgroundImage: dynamicGradient,
          boxShadow: "inset 0 0 0 2px rgba(255,255,255,0.1), 0 10px 30px -10px rgba(0,0,0,0.3)"
        }} 
        onTouchStart={handleTouchDown} 
        onTouchEnd={handleTouchUp}
      >
        {/* CNC machine border effect */}
        <div className="absolute inset-3 z-10 border-[6px] border-dashed border-white/10 rounded pointer-events-none"></div>
        
        <ImageLightbox 
          imageUrl={photoUrls[selectedImageIndex]} 
          alt={`${productName} - Image ${selectedImageIndex + 1}`}
        >
          <div 
            className="relative aspect-square overflow-hidden group cursor-zoom-in" 
            onMouseEnter={() => !isTouchDevice.current && setIsHovering(true)} 
            onMouseLeave={() => !isTouchDevice.current && setIsHovering(false)}
          >
            <motion.img 
              src={photoUrls[selectedImageIndex]} 
              alt={`${productName} - Image ${selectedImageIndex + 1}`} 
              className="object-cover w-full h-full transition-transform duration-300" 
              loading={selectedImageIndex < 3 ? "eager" : "lazy"}
              width="600"
              height="600"
              decoding={selectedImageIndex === 0 ? "sync" : "async"}
              fetchpriority={selectedImageIndex === 0 ? "high" : "low"}
              animate={{
                scale: isTouchDevice.current ? 1 : isHovering ? 1.1 : 1
              }} 
              transition={{
                duration: 0.4,
                ease: "easeOut"
              }} 
            />
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            
            {/* Technical badge - ISO certification */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div></div>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="z-[100] contain-strict">
                  <p className="text-xs">ISO 9001 Certified Product</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <div className="absolute top-3 right-3 bg-white/80 dark:bg-black/50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover-effect">
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
              onClick={e => {
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
              onClick={e => {
                e.stopPropagation();
                handleNextImage();
              }}
            >
              <ArrowRight className="h-5 w-5 text-primary dark:text-white" />
            </Button>
          </>
        )}
      </div>

      {/* Thumbnails with Fixed Height and Contained Scroll */}
      {photoUrls.length > 1 && (
        <div className="relative">
          <div 
            ref={thumbnailsRef} 
            className="flex space-x-2 overflow-x-auto py-2 scrollbar-hide snap-x snap-mandatory h-[120px]" 
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            {photoUrls.map((url, index) => (
              <button 
                key={url} 
                onClick={() => setSelectedImageIndex(index)} 
                className={cn(
                  "relative flex-shrink-0 w-20 h-20 snap-start",
                  "overflow-hidden rounded-md transition-all duration-200",
                  selectedImageIndex === index 
                    ? "border-2 border-safety-orange ring-2 ring-safety-orange/50 shadow-[0_0_10px_0_rgba(255,107,53,0.5)]" 
                    : "border-2 border-transparent hover:border-safety-orange/50"
                )}
              >
                <img 
                  src={url} 
                  alt={`${productName} - Thumbnail ${index + 1}`} 
                  className="object-cover w-full h-full" 
                  loading={index < 5 ? "eager" : "lazy"}
                  width="80"
                  height="80"
                  decoding="async"
                />
                {selectedImageIndex === index && (
                  <motion.div 
                    className="absolute inset-0 border-2 border-safety-orange rounded-md pointer-events-none" 
                    animate={{
                      opacity: [0.2, 1, 0.2]
                    }} 
                    transition={{
                      duration: 1.5,
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
