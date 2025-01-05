import WelcomeSection from "@/components/WelcomeSection";
import ServicesShowcase from "@/components/ServicesShowcase";
import ProductShowcase from "@/components/ProductShowcase";
import { useEffect, useRef } from "react";

const Index = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isScrolling = false;
    let startY = 0;

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

      setTimeout(() => {
        isScrolling = false;
      }, 1000);
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

        setTimeout(() => {
          isScrolling = false;
        }, 1000);
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

  return (
    <div 
      ref={containerRef} 
      className="h-screen overflow-y-auto scroll-smooth"
      style={{
        scrollSnapType: "y mandatory",
        scrollBehavior: "smooth",
      }}
    >
      <div className="h-screen snap-start snap-always">
        <WelcomeSection />
      </div>
      <div className="h-screen snap-start snap-always">
        <ServicesShowcase />
      </div>
      <div className="h-screen snap-start snap-always">
        <ProductShowcase />
      </div>
    </div>
  );
};

export default Index;