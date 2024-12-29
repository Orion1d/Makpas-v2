import { useState } from "react";
import { cn } from "@/lib/utils";

interface ProductImageGalleryProps {
  photoUrls: string[];
  productName: string;
}

const ProductImageGallery = ({ photoUrls, productName }: ProductImageGalleryProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  return (
    <div className="space-y-4">
      <div className="relative aspect-square overflow-hidden rounded-lg">
        <img
          src={photoUrls[selectedImageIndex]}
          alt={`${productName} - Image ${selectedImageIndex + 1}`}
          className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
        />
      </div>

      {photoUrls.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {photoUrls.map((url, index) => (
            <button
              key={url}
              onClick={() => setSelectedImageIndex(index)}
              className={cn(
                "relative aspect-square overflow-hidden rounded-md border-2",
                selectedImageIndex === index
                  ? "border-primary"
                  : "border-transparent hover:border-primary/50"
              )}
            >
              <img
                src={url}
                alt={`${productName} - Thumbnail ${index + 1}`}
                className="object-cover w-full h-full"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;