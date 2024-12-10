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
    <section className="py-32 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 transition-colors duration-500">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-primary dark:text-white mb-6 tracking-tight">
            {t('products.title')}
          </h2>
          <div className="w-24 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            {t('products.subtitle')}
          </p>
        </div>
        
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[plugin]}
          setApi={setApi}
          className="w-full max-w-6xl mx-auto"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {products.map((product) => (
              <CarouselItem key={product.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/2 p-4">
                <Card 
                  className="cursor-pointer group overflow-hidden backdrop-blur-sm bg-white/90 dark:bg-gray-800/90 hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] border-0"
                  onClick={() => handleProductClick(product.id)}
                >
                  {product.photo_url && (
                    <div className="relative h-80 w-full overflow-hidden rounded-t-lg">
                      <img
                        src={product.photo_url}
                        alt={language === 'tr' ? (product.name_tr || product.name) : product.name}
                        className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                  )}
                  <CardContent className="p-8 bg-gradient-to-b from-transparent to-white/5">
                    <h3 className="text-2xl font-bold text-primary dark:text-white text-center group-hover:text-secondary transition-colors duration-300">
                      {language === 'tr' ? (product.name_tr || product.name) : product.name}
                    </h3>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-12 hover:scale-110 transition-transform duration-300" />
          <CarouselNext className="hidden md:flex -right-12 hover:scale-110 transition-transform duration-300" />
        </Carousel>
      </div>
    </section>
  );
};

export default ProductShowcase;