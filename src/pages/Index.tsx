import WelcomeSection from "@/components/WelcomeSection";
import ServicesShowcase from "@/components/ServicesShowcase";
import ProductShowcase from "@/components/ProductShowcase";
import { useEffect, useRef, useState } from "react";

const Index = () => {
  const [activeSection, setActiveSection] = useState(0);
  const sectionRefs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];
  const scrollingRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observers = sectionRefs.map((ref, index) => {
      return new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !scrollingRef.current) {
            setActiveSection(index);
          }
        },
        {
          threshold: 0.5,
        }
      );
    });

    sectionRefs.forEach((ref, index) => {
      if (ref.current) {
        observers[index].observe(ref.current);
      }
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  const scrollToSection = (index: number) => {
    if (scrollingRef.current) return;
    
    scrollingRef.current = true;
    const section = sectionRefs[index].current;
    
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      
      setActiveSection(index);
      
      setTimeout(() => {
        scrollingRef.current = false;
      }, 1000);
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    
    if (scrollingRef.current) return;
    
    const direction = e.deltaY > 0 ? 1 : -1;
    const nextSection = Math.min(Math.max(activeSection + direction, 0), sectionRefs.length - 1);
    
    if (nextSection !== activeSection) {
      scrollToSection(nextSection);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    containerRef.current?.setAttribute('data-touch-start-y', touch.clientY.toString());
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (scrollingRef.current) return;

    const touch = e.touches[0];
    const startY = Number(containerRef.current?.getAttribute('data-touch-start-y') || 0);
    const deltaY = startY - touch.clientY;

    if (Math.abs(deltaY) > 50) {
      const direction = deltaY > 0 ? 1 : -1;
      const nextSection = Math.min(Math.max(activeSection + direction, 0), sectionRefs.length - 1);
      
      if (nextSection !== activeSection) {
        scrollToSection(nextSection);
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className="h-screen overflow-hidden"
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      <div 
        ref={sectionRefs[0]} 
        className="h-screen w-full"
      >
        <WelcomeSection />
      </div>
      <div 
        ref={sectionRefs[1]} 
        className="h-screen w-full"
      >
        <ServicesShowcase />
      </div>
      <div 
        ref={sectionRefs[2]} 
        className="h-screen w-full"
      >
        <ProductShowcase />
      </div>

      <div className="fixed right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2">
        {[0, 1, 2].map((index) => (
          <button
            key={index}
            onClick={() => scrollToSection(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              activeSection === index
                ? "bg-primary scale-125"
                : "bg-gray-300 hover:bg-primary/50"
            }`}
            aria-label={`Scroll to section ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Index;