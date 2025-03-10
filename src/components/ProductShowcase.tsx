
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QuoteIcon } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import ProductsSkeleton from "./products/ProductsSkeleton";
import Autoplay from "embla-carousel-autoplay";
import type { EmblaPluginType as LoosePluginType } from "embla-carousel";

const ProductShowcase = () => {
  const {
    t,
    language
  } = useLanguage();
  const navigate = useNavigate();
  const [api, setApi] = useState<CarouselApi>();
  
  const {
    data: products = [],
    isLoading
  } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from('products').select('*');
      if (error) throw error;
      return data || [];
    }
  });
  
  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  const handleQuoteClick = (e: React.MouseEvent, productId: number) => {
    e.stopPropagation();
    // Navigate to contact page with product ID
    navigate(`/contact?product=${productId}`);
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
  
  const autoplayPlugin = Autoplay({
    delay: 4000,
    stopOnInteraction: false
  }) as unknown as LoosePluginType;
  
  return <section className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-all duration-700 ease-in-out py-[20px]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 text-primary dark:text-white transform hover:scale-105 transition-transform duration-300">
          {t('products.title')}
        </h2>
        
        <div className="w-full max-w-7xl mx-auto">
          <Carousel opts={{
          align: "start",
          loop: true,
          // Fix: Replace object with number for slidesToScroll
          slidesToScroll: 1
        }} plugins={[autoplayPlugin]} setApi={setApi} className="w-full">
            <CarouselContent className="-ml-2 md:-ml-4">
              {products.map(product => <CarouselItem key={product.id} className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                  <Card className="cursor-pointer group overflow-hidden backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 hover:shadow-xl transition-all duration-500 transform hover:scale-[1.02] relative" onClick={() => handleProductClick(product.id)}>
                    {product.photo_url && <div className="relative h-72 w-full overflow-hidden rounded-t-lg">
                        <img src={product.photo_url} alt={language === 'tr' ? product.name_tr || product.name : product.name} className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>}
                    <CardContent className="p-6 bg-gradient-to-b from-transparent to-white/5">
                      <h3 className="text-xl font-semibold text-primary dark:text-white text-center group-hover:text-secondary transition-colors duration-300">
                        {language === 'tr' ? product.name_tr || product.name : product.name}
                      </h3>
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
                </CarouselItem>)}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-12 hover:scale-110 transition-transform duration-300" />
            <CarouselNext className="hidden md:flex -right-12 hover:scale-110 transition-transform duration-300" />
          </Carousel>
        </div>
      </div>
    </section>;
};

export default ProductShowcase;
