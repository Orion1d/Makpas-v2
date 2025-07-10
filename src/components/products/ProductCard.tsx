import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ImageLightbox from "@/components/about/ImageLightbox";

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    name_tr?: string;
    description?: string;
    description_tr?: string;
    photo_url?: string;
  };
  language: string;
  onNext: () => void;
  onPrev: () => void;
}

const ProductCard = ({ product, language, onNext, onPrev }: ProductCardProps) => {
  const mainPhotoUrl = product.photo_url ? product.photo_url.split(',')[0].trim() : undefined;

  return (
    <div className="relative bg-white dark:bg-primary/90 rounded-lg shadow-lg overflow-hidden border border-border">
      <div className="grid md:grid-cols-2 gap-8 p-6">
        <div className="relative aspect-square overflow-hidden rounded-lg">
          {mainPhotoUrl && (
            <ImageLightbox
              imageUrl={mainPhotoUrl}
              alt={language === 'tr' ? product.name_tr || product.name : product.name}
            >
              <img
                src={mainPhotoUrl}
                alt={language === 'tr' ? product.name_tr || product.name : product.name}
                className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
              />
            </ImageLightbox>
          )}
        </div>
        
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-primary dark:text-gray-100">
            {language === 'tr' ? product.name_tr || product.name : product.name}
          </h3>
          
          {(language === 'tr' ? product.description_tr || product.description : product.description) && (
            <div className="space-y-2">
              {(language === 'tr' ? product.description_tr || product.description : product.description)!.split(/\n/).filter(line => line.trim() !== '').map((line, index) => (
                <p key={index} className="text-muted-foreground dark:text-gray-200">
                  {line.trim()}
                </p>
              ))}
            </div>
          )}
          
          <Button asChild variant="secondary" className="mt-4">
            <Link to={`/product/${product.id}`}>
              {language === 'tr' ? 'Detayları Gör' : 'View Details'}
            </Link>
          </Button>
        </div>
      </div>

      <div className="absolute top-1/2 -translate-y-1/2 left-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onPrev}
          className="text-foreground dark:text-gray-100 hover:bg-background/20"
        >
          <ChevronLeft className="h-8 w-8" />
        </Button>
      </div>

      <div className="absolute top-1/2 -translate-y-1/2 right-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onNext}
          className="text-foreground dark:text-gray-100 hover:bg-background/20"
        >
          <ChevronRight className="h-8 w-8" />
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;