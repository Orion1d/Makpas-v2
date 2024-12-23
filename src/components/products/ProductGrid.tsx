import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface ProductGridProps {
  products: any[];
  language: string;
}

const ProductGrid = ({ products, language }: ProductGridProps) => {
  const navigate = useNavigate();

  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product) => (
        <Card
          key={product.id}
          className="cursor-pointer transition-transform duration-300 hover:scale-105 bg-white dark:bg-gray-800 border border-border"
          onClick={() => handleProductClick(product.id)}
        >
          {product.photo_url && (
            <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
              <img
                src={product.photo_url}
                alt={language === 'tr' ? (product.name_tr || product.name) : product.name}
                className="object-cover w-full h-full"
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
        </Card>
      ))}
    </div>
  );
};

export default ProductGrid;