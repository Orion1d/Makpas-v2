
import { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { ZoomIn } from "lucide-react";

interface ZoomControlsProps {
  isZoomed: boolean;
  isHovering: boolean;
  onZoomToggle: () => void;
  onMouseMove: (e: React.MouseEvent) => void;
  zoomPosition: { x: number; y: number };
  children: React.ReactNode;
  isTouchDevice: boolean;
}

export const ZoomControls = ({
  isZoomed,
  isHovering,
  onZoomToggle,
  onMouseMove,
  zoomPosition,
  children,
  isTouchDevice
}: ZoomControlsProps) => {
  return (
    <div 
      className="relative w-full h-full overflow-hidden group cursor-zoom-in" 
      onMouseEnter={() => !isTouchDevice && onMouseMove}
      onMouseMove={onMouseMove}
      onClick={onZoomToggle}
    >
      <div
        className="w-full h-full transition-transform duration-300 ease-out"
        style={{
          transform: `scale(${isZoomed ? 2.5 : (isTouchDevice ? 1 : isHovering ? 1.05 : 1)})`,
          transformOrigin: isZoomed ? `${zoomPosition.x}% ${zoomPosition.y}%` : 'center'
        }}
      >
        {children}
      </div>
      
      {/* Enhanced zoom indicator */}
      <div className={cn(
        "absolute top-4 right-4 bg-white/90 dark:bg-black/70 p-3 rounded-full transition-all duration-300 shadow-lg",
        isZoomed ? "bg-safety-orange text-white" : "opacity-0 group-hover:opacity-100"
      )}>
        <ZoomIn className="h-5 w-5" />
      </div>

      {/* Zoom instructions */}
      {!isTouchDevice && (
        <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-2 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {isZoomed ? "Click to zoom out" : "Click to zoom in"}
        </div>
      )}
    </div>
  );
};
