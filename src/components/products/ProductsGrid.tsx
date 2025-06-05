
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import type { Product } from "@/types/product";

interface ProductsGridProps {
  products: Product[];
  language: string;
}

export const ProductsGrid = ({ products, language }: ProductsGridProps) => {
  const navigate = useNavigate();

  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          No products found. Try adjusting your filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product, idx) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: idx * 0.1 }}
        >
          <Card
            className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white dark:bg-gray-800 h-full"
            onClick={() => handleProductClick(product.id)}
          >
            {product.photo_url && (
              <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                <img
                  src={product.photo_url.split(',')[0]?.trim()}
                  alt={language === 'tr' ? (product.name_tr || product.name) : product.name}
                  className="object-cover w-full h-full"
                  loading={idx < 8 ? "eager" : "lazy"}
                  width="300"
                  height="200"
                  decoding={idx < 4 ? "sync" : "async"}
                  fetchpriority={idx < 4 ? "high" : "low"}
                />
              </div>
            )}
            <CardHeader className="p-4">
              <CardTitle className="text-lg font-semibold text-primary dark:text-white line-clamp-2">
                {language === 'tr' ? (product.name_tr || product.name) : product.name}
              </CardTitle>
            </CardHeader>
            {(language === 'tr' ? (product.description_tr || product.description) : product.description) && (
              <CardContent className="p-4 pt-0">
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {language === 'tr' ? (product.description_tr || product.description) : product.description}
                </p>
              </CardContent>
            )}
          </Card>
        </motion.div>
      ))}
    </div>
  );
};
