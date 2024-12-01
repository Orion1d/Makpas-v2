import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Autoplay from "embla-carousel-autoplay";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const ProductShowcase = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const { data: products = [] } = useQuery({
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

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-primary text-center mb-8">
          {t('products_showcase_title')}
        </h2>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 3000,
            }),
          ]}
          className="w-full max-w-6xl mx-auto"
        >
          <CarouselContent>
            {products.map((product) => (
              <CarouselItem key={product.id} className="md:basis-1/2">
                <div 
                  onClick={() => handleProductClick(product.id)}
                  className="cursor-pointer transition-transform duration-300 hover:scale-105"
                >
                  <Card className="bg-gray-100 border-gray-200 hover:shadow-lg transition-shadow">
                    {product.photo_url && (
                      <div className="relative h-72 w-full overflow-hidden rounded-t-lg">
                        <img
                          src={product.photo_url}
                          alt={product.name}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    )}
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-xl text-primary text-center">
                        {product.name}
                      </h3>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};

export default ProductShowcase;