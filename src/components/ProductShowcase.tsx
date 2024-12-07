import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import ProductsSkeleton from "./products/ProductsSkeleton";
import Autoplay from "embla-carousel-autoplay";

const ProductShowcase = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [api, setApi] = useState<any>();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*');
      
      if (error) throw error;
      return data || [];
    },
  });

  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  useEffect(() => {
    if (api) {
      // Reset to first slide when products change
      api.scrollTo(0);
    }
  }, [products, api]);

  if (isLoading) {
    return <ProductsSkeleton />;
  }

  if (products.length === 0) {
    return null;
  }

  const plugin = Autoplay({ delay: 4000 });

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 text-primary dark:text-white">
          {t('products.title')}
        </h2>
        
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[plugin]}
          setApi={setApi}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {products.map((product) => (
              <CarouselItem key={product.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/2">
                <Card 
                  className="cursor-pointer hover:scale-105 transition-transform duration-300"
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
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold text-primary dark:text-white text-center">
                      {language === 'tr' ? (product.name_tr || product.name) : product.name}
                    </h3>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>
    </section>
  );
};

export default ProductShowcase;