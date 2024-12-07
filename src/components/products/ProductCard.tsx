import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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
  return (
    <div className="relative bg-primary/90 dark:bg-primary/90 rounded-lg shadow-lg overflow-hidden">
      <div className="grid md:grid-cols-2 gap-8 p-6">
        <div className="relative aspect-square overflow-hidden rounded-lg">
          {product.photo_url && (
            <img
              src={product.photo_url}
              alt={language === 'tr' ? product.name_tr || product.name : product.name}
              className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
            />
          )}
        </div>
        
        <div className="space-y-6 text-white">
          <h3 className="text-2xl font-bold">
            {language === 'tr' ? product.name_tr || product.name : product.name}
          </h3>
          
          {(language === 'tr' ? product.description_tr || product.description : product.description) && (
            <p className="text-gray-100">
              {language === 'tr' ? product.description_tr || product.description : product.description}
            </p>
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
          className="text-white hover:bg-white/20"
        >
          <ChevronLeft className="h-8 w-8" />
        </Button>
      </div>

      <div className="absolute top-1/2 -translate-y-1/2 right-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onNext}
          className="text-white hover:bg-white/20"
        >
          <ChevronRight className="h-8 w-8" />
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;