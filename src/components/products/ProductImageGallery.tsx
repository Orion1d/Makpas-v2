
import { useState, useRef, useEffect } from "react";
import { OptimizedImage } from "./OptimizedImage";
import { ZoomControls } from "./ZoomControls";
import { ImageNavigation } from "./ImageNavigation";
import { ThumbnailStrip } from "./ThumbnailStrip";

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
  const dynamicGradient = `linear-gradient(135deg, hsl(${dynamicHue}, 15%, 95%), hsl(${dynamicHue + 30}, 20%, 90%))`;

  // Enhanced zoom handling
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current || !isZoomed) return;
    
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
  
  const handlePrevImage = () => {
    setSelectedImageIndex(prev => prev > 0 ? prev - 1 : photoUrls.length - 1);
    setIsZoomed(false);
  };
  
  const handleNextImage = () => {
    setSelectedImageIndex(prev => prev < photoUrls.length - 1 ? prev + 1 : 0);
    setIsZoomed(false);
  };

  const handleThumbnailClick = (index: number) => {
    setSelectedImageIndex(index);
    setIsZoomed(false);
  };
  
  return (
    <div className="space-y-4 contain-content">
      {/* Main Image with industry-standard 4:3 aspect ratio */}
      <div 
        ref={containerRef}
        className="relative w-full aspect-[4/3] rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700" 
        style={{
          backgroundImage: dynamicGradient,
          boxShadow: "0 2px 8px 0 rgba(0,0,0,0.1), inset 0 0 0 1px rgba(255,255,255,0.1)",
          minHeight: '400px',
          maxHeight: '500px'
        }} 
        onTouchStart={handleTouchDown} 
        onTouchEnd={handleTouchUp}
        onMouseEnter={() => !isTouchDevice.current && setIsHovering(true)} 
        onMouseLeave={() => !isTouchDevice.current && setIsHovering(false)}
      >
        {/* Professional frame border */}
        <div className="absolute inset-2 z-10 border border-white/20 rounded pointer-events-none"></div>
        
        <ZoomControls
          isZoomed={isZoomed}
          isHovering={isHovering}
          onZoomToggle={handleZoomToggle}
          onMouseMove={handleMouseMove}
          zoomPosition={zoomPosition}
          isTouchDevice={isTouchDevice.current}
        >
          <div className="w-full h-full flex items-center justify-center p-4">
            <OptimizedImage
              src={photoUrls[selectedImageIndex] || ''}
              alt={`${productName} - Image ${selectedImageIndex + 1}`}
              className="max-w-full max-h-full object-contain"
              loading={selectedImageIndex < 3 ? "eager" : "lazy"}
              width="800"
              height="600"
              decoding={selectedImageIndex === 0 ? "sync" : "async"}
              fetchPriority={selectedImageIndex === 0 ? "high" : "low"}
              onError={() => console.info(`Image failed to load for ${productName}, image ${selectedImageIndex + 1}`)}
            />
          </div>
        </ZoomControls>

        <ImageNavigation
          onPrevImage={handlePrevImage}
          onNextImage={handleNextImage}
          hasMultipleImages={photoUrls.length > 1}
        />
      </div>

      <ThumbnailStrip
        photoUrls={photoUrls}
        selectedImageIndex={selectedImageIndex}
        productName={productName}
        onThumbnailClick={handleThumbnailClick}
      />
    </div>
  );
};

export default ProductImageGallery;
