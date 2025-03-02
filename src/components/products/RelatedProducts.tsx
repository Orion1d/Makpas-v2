
"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface RelatedProductsProps {
  currentProductId: number;
  productGroup: string | null;
}

function RelatedProducts({ currentProductId, productGroup }: RelatedProductsProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();
  const { language } = useLanguage();

  const { data: relatedProducts } = useQuery({
    queryKey: ['relatedProducts', productGroup],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('Product_Group', productGroup)
        .neq('id', currentProductId)
        .limit(10);

      if (error) throw error;
      return data;
    },
    enabled: !!productGroup,
  });

  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      if (api.selectedScrollSnap() + 1 === api.scrollSnapList().length) {
        setCurrent(0);
        api.scrollTo(0);
      } else {
        api.scrollNext();
        setCurrent(current + 1);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [api, current]);

  if (!relatedProducts?.length) return null;

  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="w-full py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-primary dark:text-white">
            {language === 'tr' ? 'Benzer Ürünler' : 'Related Products'}
          </h2>
          <Carousel 
            setApi={setApi} 
            className="w-full"
            opts={{
              slidesToScroll: 1
            }}
          >
            <CarouselContent>
              {relatedProducts.map((product) => (
                <CarouselItem 
                  key={product.id} 
                  className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                >
                  <Card 
                    className="cursor-pointer transition-transform duration-300 hover:scale-105"
                    onClick={() => handleProductClick(product.id)}
                  >
                    {product.photo_url && (
                      <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                        <img
                          src={product.photo_url.split(',')[0]}
                          alt={language === 'tr' ? (product.name_tr || product.name) : product.name}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    )}
                    <CardHeader className="p-4">
                      <CardTitle className="text-lg">
                        {language === 'tr' ? (product.name_tr || product.name) : product.name}
                      </CardTitle>
                    </CardHeader>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export { RelatedProducts };
