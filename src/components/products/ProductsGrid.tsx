
import { useNavigate } from "react-router-dom";

import { OptimizedImage } from "./OptimizedImage";
import type { Product } from "@/types/product";
import { ArrowRight } from "lucide-react";

interface ProductsGridProps {
  products: Product[];
  language: string;
  showDescription?: boolean;
}

export const ProductsGrid = ({ products, language, showDescription = false }: ProductsGridProps) => {
  const navigate = useNavigate();

  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
      {products.map((product, idx) => {
        const name = language === 'tr' ? (product.name_tr || product.name) : product.name;
        const description = language === 'tr' ? (product.description_tr || product.description) : product.description;
        const imageUrl = product.photo_url?.split(',')[0]?.trim() || '';
        
        // Get first line of description as short preview
        const shortDesc = description 
          ? description.replace(/\\n/g, '\n').split('\n').filter(l => l.trim())[0]?.trim() 
          : '';
        
        return (
          <div key={product.id}>
            <div
              className="group cursor-pointer rounded-xl overflow-hidden border border-border bg-card hover:shadow-lg hover:border-primary/20 transition-all duration-300 h-full flex flex-col"
              onClick={() => handleProductClick(product.id)}
            >
              {/* Image */}
              <div className="relative aspect-square overflow-hidden bg-muted/30">
                {imageUrl ? (
                  <OptimizedImage
                    src={imageUrl}
                    alt={name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading={idx < 10 ? "eager" : "lazy"}
                    width="280"
                    height="280"
                    decoding={idx < 5 ? "sync" : "async"}
                    fetchPriority={idx < 5 ? "high" : "low"}
                    onError={() => console.info(`Image failed to load for product: ${product.name}`)}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground/30">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-end p-3">
                  <div className="bg-card/90 backdrop-blur-sm rounded-full p-1.5">
                    <ArrowRight className="w-3.5 h-3.5 text-foreground" />
                  </div>
                </div>
              </div>
              
              {/* Info */}
              <div className="p-3 sm:p-4 flex flex-col flex-1">
                <h3 className="text-sm font-medium text-foreground line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                  {name}
                </h3>
                {showDescription && shortDesc && (
                  <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2 leading-relaxed">
                    {shortDesc}
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
