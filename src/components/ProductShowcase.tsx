import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import ProductCard from "./products/ProductCard";
import ProductPagination from "./products/ProductPagination";
import ProductsSkeleton from "./products/ProductsSkeleton";

const ProductShowcase = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { t, language } = useLanguage();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('order_index', { ascending: true });
      
      if (error) throw error;
      return data || [];
    },
  });

  const nextProduct = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const prevProduct = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  if (isLoading) {
    return <ProductsSkeleton />;
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 text-primary dark:text-white">
          {t('products.title')}
        </h2>
        
        <ProductCard
          product={products[currentIndex]}
          language={language}
          onNext={nextProduct}
          onPrev={prevProduct}
        />

        <ProductPagination
          totalProducts={products.length}
          currentIndex={currentIndex}
          onPageChange={setCurrentIndex}
        />
      </div>
    </section>
  );
};

export default ProductShowcase;
