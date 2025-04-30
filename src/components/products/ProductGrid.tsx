
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { isTouchDevice } from "@/utils/deviceUtils";

interface ProductGridProps {
  products: any[];
  language: string;
}

const ProductGrid = ({ products, language }: ProductGridProps) => {
  const navigate = useNavigate();
  const [isTouch, setIsTouch] = useState(false);
  
  useEffect(() => {
    // Check if we're on a touch device
    setIsTouch(isTouchDevice());
  }, []);

  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  // Calculate grid columns based on product count and screen size
  const getGridClass = () => {
    // For mobile, always use 1 column with 24px gap
    if (isTouch) {
      return "grid grid-cols-1 gap-6";
    }
    
    if (products.length >= 4) {
      return "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-12";
    } else if (products.length === 3) {
      return "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12";
    } else if (products.length === 2) {
      return "grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12";
    }
    // For single products - maintain consistent width with other grid layouts
    return "grid grid-cols-1 gap-8 md:gap-12";
  };

  return (
    <div className={getGridClass()}>
      {products.map((product, idx) => (
        <motion.div
          key={product.id}
          layout
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="z-10" // Changed from z-50 to z-10 to prevent overlapping with navbar
        >
          <Card
            className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px] bg-white dark:bg-gray-800 border border-border relative overflow-hidden h-[420px] contain-content card-brushed-metal"
            onClick={() => handleProductClick(product.id)}
          >
            {product.photo_url && (
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src={product.photo_url.split(',')[0]?.trim()}
                  alt={language === 'tr' ? (product.name_tr || product.name) : product.name}
                  className="object-cover w-full h-full max-w-full" // Added max-w-full to fix image width issue
                  loading={idx < 3 ? "eager" : "lazy"}
                />
              </div>
            )}
            <CardHeader className="p-4">
              <CardTitle className="text-lg font-space-grotesk text-safety-orange dark:text-safety-orange line-clamp-2">
                {language === 'tr' ? (product.name_tr || product.name) : product.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-base font-inter text-muted-foreground dark:text-gray-300 line-clamp-2">
                {language === 'tr' ? (product.description_tr || product.description) : product.description}
              </p>
              
              {/* Price display with badge */}
              <div className="mt-4 flex items-center">
                <span className="text-xl font-rubik font-medium text-foreground">
                  {product.price ? `€${product.price}` : ''}
                </span>
                {product.on_sale && (
                  <span className="ml-2 bg-yellow-400 text-black text-xs px-2 py-1 rounded-full">
                    SALE
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default ProductGrid;
