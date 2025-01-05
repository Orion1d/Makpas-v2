import WelcomeSection from "@/components/WelcomeSection";
import ServicesShowcase from "@/components/ServicesShowcase";
import ProductShowcase from "@/components/ProductShowcase";
import { useEffect, useRef, useState } from "react";

const Index = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isScrolling = false;
    let startY = 0;

    // Reduced timeout to show content faster
    requestAnimationFrame(() => {
      setIsLoading(false);
    });

    const handleWheel = (e: WheelEvent) => {
      if (isScrolling) return;
      
      e.preventDefault();
      isScrolling = true;

      const direction = e.deltaY > 0 ? 1 : -1;
      const height = window.innerHeight;
      const currentScroll = container.scrollTop;
      const targetScroll = Math.round((currentScroll + direction * height) / height) * height;

      container.scrollTo({
        top: targetScroll,
        behavior: 'smooth'
      });

      // Increased timeout for smoother transitions
      setTimeout(() => {
        isScrolling = false;
      }, 1500); // Increased from 1000ms to 1500ms
    };

    const handleTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isScrolling) return;

      const currentY = e.touches[0].clientY;
      const direction = startY > currentY ? 1 : -1;
      
      if (Math.abs(startY - currentY) > 50) {
        isScrolling = true;
        const height = window.innerHeight;
        const currentScroll = container.scrollTop;
        const targetScroll = Math.round((currentScroll + direction * height) / height) * height;

        container.scrollTo({
          top: targetScroll,
          behavior: 'smooth'
        });

        // Increased timeout for smoother transitions
        setTimeout(() => {
          isScrolling = false;
        }, 1500); // Increased from 1000ms to 1500ms
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('touchstart', handleTouchStart);
    container.addEventListener('touchmove', handleTouchMove);

    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef} 
      className="h-screen overflow-y-auto scroll-smooth opacity-0 animate-fade-in"
      style={{
        scrollSnapType: "y mandatory",
        scrollBehavior: "smooth",
        animationDuration: '0.3s',
        animationDelay: '0s',
        animationFillMode: 'forwards'
      }}
    >
      <div className="h-screen snap-start snap-always transition-all duration-1000 ease-in-out">
        <WelcomeSection />
      </div>
      <div className="h-screen snap-start snap-always transition-all duration-1000 ease-in-out">
        <ServicesShowcase />
      </div>
      <div className="h-screen snap-start snap-always transition-all duration-1000 ease-in-out">
        <ProductShowcase />
      </div>
    </div>
  );
};

export default Index;
