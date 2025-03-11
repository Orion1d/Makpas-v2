
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { QuoteIcon, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductGridProps {
  products: any[];
  language: string;
}

const ProductGrid = ({ products, language }: ProductGridProps) => {
  const navigate = useNavigate();

  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  const handleQuoteClick = (e: React.MouseEvent, productId: number) => {
    e.stopPropagation();
    // Navigate to contact page with product ID
    navigate(`/contact?product=${productId}`);
  };

  // Calculate grid columns based on product count
  const getGridClass = () => {
    if (products.length >= 4) {
      return "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-12";
    } else if (products.length === 3) {
      return "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12";
    } else if (products.length === 2) {
      return "grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-12";
    }
    return "grid grid-cols-1 gap-6 md:gap-12";
  };

  return (
    <div className={getGridClass()}>
      {products.map((product) => (
        <motion.div
          key={product.id}
          layout
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="z-50"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 1 }}
        >
          <Card
            className="cursor-pointer transition-all duration-300 hover:shadow-lg bg-white dark:bg-gray-800 border border-border relative overflow-hidden group h-[420px] @container"
            onClick={() => handleProductClick(product.id)}
          >
            {product.photo_url && (
              <div className="relative h-48 w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[#0A1A2F55] to-[#122240AA] z-10"></div>
                <img
                  src={product.photo_url.split(',')[0]?.trim()}
                  alt={language === 'tr' ? (product.name_tr || product.name) : product.name}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                />
                {/* Status indicator for in stock products */}
                <div className="absolute top-2 right-2 z-20">
                  <span className="inline-flex items-center gap-1 bg-secondary/90 text-white text-xs px-2 py-1 rounded">
                    <CheckCircle className="h-3 w-3" />
                    <span>In Stock</span>
                  </span>
                </div>
              </div>
            )}
            <CardHeader className="p-4">
              <CardTitle className="text-lg font-medium text-[#FF6B35] dark:text-[#FF6B35] line-clamp-2 font-space-grotesk">
                {language === 'tr' ? (product.name_tr || product.name) : product.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 flex flex-col justify-between h-[calc(100%-144px)]">
              <p className="text-muted-foreground dark:text-gray-300 text-sm line-clamp-2 font-inter">
                {language === 'tr' ? (product.description_tr || product.description) : product.description}
              </p>
              
              {/* Price Badge */}
              <div className="mt-4 bg-safety-orange/10 px-3 py-2 rounded-md inline-flex items-center">
                <span className="text-xl font-medium text-gray-800 dark:text-white font-rubik">
                  {product.price ? `${product.price} €` : 'Contact for Price'}
                </span>
              </div>
            </CardContent>
            
            {/* Product Quote Hover Overlay */}
            <div className={cn(
              "absolute inset-0 bg-gradient-to-t from-[#0A1A2F55] to-[#122240AA] flex items-center justify-center",
              "opacity-0 group-hover:opacity-100 transition-opacity duration-300",
              "rounded-md backdrop-blur-sm z-20 touch:hidden"
            )}>
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                whileHover={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300"
              >
                <Button 
                  variant="accent"
                  size="lg" 
                  className="px-6 py-2 text-white shadow-lg"
                  onClick={(e) => handleQuoteClick(e, product.id)}
                >
                  <QuoteIcon className="mr-2 h-4 w-4" />
                  {language === 'tr' ? 'Teklif Al' : 'Get Quote'}
                </Button>
              </motion.div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default ProductGrid;
