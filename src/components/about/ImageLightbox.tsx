import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ImageLightboxProps {
  imageUrl: string;
  alt: string;
  children: React.ReactNode;
}

const ImageLightbox = ({ imageUrl, alt, children }: ImageLightboxProps) => {
  const [scale, setScale] = useState(1);

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.5, 0.5));
  };

  return (
    <Dialog>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <div className="cursor-pointer">
                {children}
              </div>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Click to View Full Image</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DialogContent className="max-w-[90vw] max-h-[90vh] w-fit h-fit p-0 overflow-hidden">
        <div className="relative">
          <div className="overflow-auto p-4">
            <img
              src={imageUrl}
              alt={alt}
              style={{
                transform: `scale(${scale})`,
                transition: 'transform 0.2s ease-in-out',
              }}
              className="max-w-full h-auto object-contain"
            />
          </div>
          
          <div className="absolute bottom-4 right-4 flex gap-2">
            <Button
              variant="secondary"
              size="icon"
              onClick={handleZoomOut}
              className="rounded-full"
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              onClick={handleZoomIn}
              className="rounded-full"
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageLightbox;