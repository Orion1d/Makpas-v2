
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BannerNavigationProps {
  onPrevious: () => void;
  onNext: () => void;
  showNavigation: boolean;
}

export const BannerNavigation = ({ onPrevious, onNext, showNavigation }: BannerNavigationProps) => {
  if (!showNavigation) return null;

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm h-8 w-8 sm:h-10 sm:w-10"
        onClick={onPrevious}
        aria-label="Previous banner"
      >
        <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm h-8 w-8 sm:h-10 sm:w-10"
        onClick={onNext}
        aria-label="Next banner"
      >
        <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6" />
      </Button>
    </>
  );
};
