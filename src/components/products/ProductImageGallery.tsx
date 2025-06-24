
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import ImageLightbox from "@/components/about/ImageLightbox";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OptimizedImage } from "./OptimizedImage";

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
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const thumbnailsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
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

  // Enhanced zoom handling
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!imageRef.current || !containerRef.current || !isZoomed) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setZoomPosition({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
  };

  const handleZoomToggle = () => {
    setIsZoomed(!isZoomed);
    if (!isZoomed) {
      setZoomPosition({ x: 50, y: 50 });
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
    setIsZoomed(false);
  };
  
  const handleNextImage = () => {
    setSelectedImageIndex(prev => prev < photoUrls.length - 1 ? prev + 1 : 0);
    setIsZoomed(false);
  };
  
  return (
    <div className="space-y-4 contain-content">
      {/* Main Image with larger size and enhanced zoom */}
      <div 
        ref={containerRef}
        className="relative aspect-[4/3] md:aspect-square lg:aspect-[4/3] xl:aspect-[3/2] rounded-lg overflow-hidden cursor-zoom-in" 
        style={{
          backgroundImage: dynamicGradient,
          boxShadow: "inset 0 0 0 2px rgba(255,255,255,0.1), 0 10px 30px -10px rgba(0,0,0,0.3)",
          height: 'clamp(300px, 50vh, 600px)'
        }} 
        onTouchStart={handleTouchDown} 
        onTouchEnd={handleTouchUp}
        onMouseMove={handleMouseMove}
        onClick={handleZoomToggle}
      >
        {/* CNC machine border effect */}
        <div className="absolute inset-3 z-10 border-[6px] border-dashed border-white/10 rounded pointer-events-none"></div>
        
        <div 
          className="relative w-full h-full overflow-hidden group" 
          onMouseEnter={() => !isTouchDevice.current && setIsHovering(true)} 
          onMouseLeave={() => !isTouchDevice.current && setIsHovering(false)}
        >
          <motion.div
            className="w-full h-full"
            animate={{
              scale: isZoomed ? 2.5 : (isTouchDevice.current ? 1 : isHovering ? 1.05 : 1)
            }} 
            style={{
              transformOrigin: isZoomed ? `${zoomPosition.x}% ${zoomPosition.y}%` : 'center'
            }}
            transition={{
              duration: 0.3,
              ease: "easeOut"
            }}
          >
            <OptimizedImage
              src={photoUrls[selectedImageIndex] || ''}
              alt={`${productName} - Image ${selectedImageIndex + 1}`}
              className="w-full h-full"
              loading={selectedImageIndex < 3 ? "eager" : "lazy"}
              width="800"
              height="600"
              decoding={selectedImageIndex === 0 ? "sync" : "async"}
              fetchPriority={selectedImageIndex === 0 ? "high" : "low"}
              onError={() => console.info(`Image failed to load for ${productName}, image ${selectedImageIndex + 1}`)}
            />
          </motion.div>
          
          {/* Enhanced zoom indicator */}
          <div className={cn(
            "absolute top-4 right-4 bg-white/90 dark:bg-black/70 p-3 rounded-full transition-all duration-300 shadow-lg",
            isZoomed ? "bg-safety-orange text-white" : "opacity-0 group-hover:opacity-100"
          )}>
            <ZoomIn className="h-5 w-5" />
          </div>

          {/* Zoom instructions */}
          {!isTouchDevice.current && (
            <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-2 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {isZoomed ? "Click to zoom out" : "Click to zoom in"}
            </div>
          )}
        </div>

        {/* Image Navigation Arrows */}
        {photoUrls.length > 1 && (
          <>
            <Button 
              variant="secondary" 
              size="icon" 
              className="absolute left-2 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/80 dark:bg-black/50 hover:bg-white dark:hover:bg-black/70 shadow-lg z-20 border-2 border-white/20" 
              onClick={e => {
                e.stopPropagation();
                handlePrevImage();
              }}
            >
              <ArrowLeft className="h-6 w-6 text-primary dark:text-white" />
            </Button>
            <Button 
              variant="secondary" 
              size="icon" 
              className="absolute right-2 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/80 dark:bg-black/50 hover:bg-white dark:hover:bg-black/70 shadow-lg z-20 border-2 border-white/20" 
              onClick={e => {
                e.stopPropagation();
                handleNextImage();
              }}
            >
              <ArrowRight className="h-6 w-6 text-primary dark:text-white" />
            </Button>
          </>
        )}
      </div>

      {/* Thumbnails with improved layout */}
      {photoUrls.length > 1 && (
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
                onClick={() => {
                  setSelectedImageIndex(index);
                  setIsZoomed(false);
                }} 
                className={cn(
                  "relative flex-shrink-0 w-20 h-20 snap-start",
                  "overflow-hidden rounded-lg transition-all duration-200 border-2",
                  selectedImageIndex === index 
                    ? "border-safety-orange ring-2 ring-safety-orange/50 shadow-[0_0_15px_0_rgba(255,107,53,0.6)] scale-110" 
                    : "border-gray-200 dark:border-gray-600 hover:border-safety-orange/50 hover:scale-105"
                )}
              >
                <OptimizedImage
                  src={url}
                  alt={`${productName} - Thumbnail ${index + 1}`}
                  className="w-full h-full"
                  loading={index < 5 ? "eager" : "lazy"}
                  width="80"
                  height="80"
                  decoding="async"
                  onError={() => console.info(`Thumbnail failed to load for ${productName}, thumbnail ${index + 1}`)}
                />
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
      )}
    </div>
  );
};

export default ProductImageGallery;
