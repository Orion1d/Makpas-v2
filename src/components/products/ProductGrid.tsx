
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { QuoteIcon } from "lucide-react";
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

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product) => (
        <motion.div
          key={product.id}
          layout
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card
            className="cursor-pointer transition-all duration-300 hover:scale-105 bg-white dark:bg-gray-800 border border-border relative overflow-hidden group"
            onClick={() => handleProductClick(product.id)}
          >
            {product.photo_url && (
              <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                <img
                  src={product.photo_url}
                  alt={language === 'tr' ? (product.name_tr || product.name) : product.name}
                  className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                />
              </div>
            )}
            <CardHeader>
              <CardTitle className="text-xl text-primary dark:text-white">
                {language === 'tr' ? (product.name_tr || product.name) : product.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground dark:text-gray-300 line-clamp-3">
                {language === 'tr' ? (product.description_tr || product.description) : product.description}
              </p>
            </CardContent>
            
            {/* Product Quote Hover Overlay */}
            <div className={cn(
              "absolute inset-0 bg-gradient-to-t from-primary/30 to-primary/10 flex items-center justify-center",
              "opacity-0 group-hover:opacity-100 transition-opacity duration-300",
              "rounded-md backdrop-blur-sm"
            )}>
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                whileHover={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="md:transform md:translate-y-100 md:group-hover:translate-y-0 transition-transform duration-300"
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
