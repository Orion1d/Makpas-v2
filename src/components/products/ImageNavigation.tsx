
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageNavigationProps {
  onPrevImage: () => void;
  onNextImage: () => void;
  hasMultipleImages: boolean;
}

export const ImageNavigation = ({
  onPrevImage,
  onNextImage,
  hasMultipleImages
}: ImageNavigationProps) => {
  if (!hasMultipleImages) return null;

  return (
    <>
      <Button 
        variant="secondary" 
        size="icon" 
        className="absolute left-2 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/80 dark:bg-black/50 hover:bg-white dark:hover:bg-black/70 shadow-lg z-20 border-2 border-white/20" 
        onClick={e => {
          e.stopPropagation();
          onPrevImage();
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
          onNextImage();
        }}
      >
        <ArrowRight className="h-6 w-6 text-primary dark:text-white" />
      </Button>
    </>
  );
};
