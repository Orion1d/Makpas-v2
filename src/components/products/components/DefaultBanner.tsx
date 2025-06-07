
import { Button } from "@/components/ui/button";

export const DefaultBanner = () => {
  return (
    <div className="relative w-full h-[200px] sm:h-[250px] md:h-[320px] lg:h-[380px] xl:h-[420px] mb-8 overflow-hidden rounded-lg shadow-lg">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-safety-orange/90" />
      <div className="relative h-full flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="text-white text-center max-w-lg">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-1 sm:mb-2 md:mb-3 lg:mb-4">
            Welcome to Our Products
          </h2>
          <p className="text-sm sm:text-base md:text-lg mb-4 opacity-90">
            Discover our extensive range of packaging and industrial materials
          </p>
          <Button 
            variant="accent" 
            size="sm"
            className="bg-white hover:bg-gray-100 text-primary font-semibold px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 text-sm sm:text-base"
          >
            Explore Products
          </Button>
        </div>
      </div>
    </div>
  );
};
