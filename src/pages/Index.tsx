import WelcomeSection from "@/components/WelcomeSection";
import ServicesShowcase from "@/components/ServicesShowcase";
import ProductShowcase from "@/components/ProductShowcase";
import { useEffect, useRef } from "react";
import scrollSnap from "react-scroll-snap";

const Index = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const element = containerRef.current;
      scrollSnap(element, {
        snapDestinationY: "100%",
        timeout: 100,
        duration: 300,
        threshold: 0.2,
      }, () => {});
    }
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="min-h-screen overflow-y-auto scroll-smooth"
      style={{
        scrollSnapType: "y mandatory",
        height: "100vh",
      }}
    >
      <div className="snap-start" style={{ height: "100vh" }}>
        <WelcomeSection />
      </div>
      <div className="snap-start" style={{ height: "100vh" }}>
        <ServicesShowcase />
      </div>
      <div className="snap-start" style={{ height: "100vh" }}>
        <ProductShowcase />
      </div>
    </div>
  );
};

export default Index;