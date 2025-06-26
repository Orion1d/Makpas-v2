
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLocation } from "react-router-dom";
import type { Product } from "@/types/product";
import { motion } from "framer-motion";
import FloatingActionButton from "@/components/ctas/FloatingActionButton";
import StickyQuoteBar from "@/components/ctas/StickyQuoteBar";
import { ProductsHeader } from "@/components/products/ProductsHeader";
import { ProductsFilters } from "@/components/products/ProductsFilters";
import { ProductsGrid } from "@/components/products/ProductsGrid";
import { ProductsLoading } from "@/components/products/ProductsLoading";

const Products = () => {
  const location = useLocation();
  const initialGroup = location.state?.activeGroup || "all";
  const [searchQuery, setSearchQuery] = useState("");
  const [activeGroup, setActiveGroup] = useState(initialGroup);
  const { t, language } = useLanguage();
  
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*');
      if (error) throw error;
      return (data || []) as Product[];
    }
  });

  // Get unique product groups
  const productGroups = Array.from(new Set(products.map(product => {
    if (language === 'tr') {
      return product.Product_Group_tr || product.Product_Group || "other";
    }
    return product.Product_Group || "other";
  })));

  // Filter products based on search and group
  const filteredProducts = products.filter(product => {
    const productName = language === 'tr' ? product.name_tr || product.name : product.name;
    const productDescription = language === 'tr' ? product.description_tr || product.description : product.description;
    const productGroup = language === 'tr' ? product.Product_Group_tr || product.Product_Group || "other" : product.Product_Group || "other";
    
    const matchesSearch = productName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         (productDescription?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
    const matchesGroup = activeGroup === "all" || productGroup.toLowerCase() === activeGroup.toLowerCase();
    
    return matchesSearch && matchesGroup;
  });

  // Group products by category when showing all products or when no specific group is selected
  const groupedProducts = () => {
    if (activeGroup !== "all") {
      return { [activeGroup]: filteredProducts };
    }

    const grouped: { [key: string]: Product[] } = {};
    filteredProducts.forEach(product => {
      const group = language === 'tr' 
        ? product.Product_Group_tr || product.Product_Group || "other"
        : product.Product_Group || "other";
      
      if (!grouped[group]) {
        grouped[group] = [];
      }
      grouped[group].push(product);
    });

    return grouped;
  };

  // Clear filters
  const handleClearFilters = () => {
    setSearchQuery("");
    setActiveGroup("all");
  };

  // Set page title
  useEffect(() => {
    document.title = `${t('products_page_title')} | Makpas`;
  }, [t]);

  if (isLoading) {
    return <ProductsLoading />;
  }

  const productsByGroup = groupedProducts();

  return (
    <div className="min-h-screen bg-pattern-waves section-bg-pattern pt-16">
      <FloatingActionButton />
      <StickyQuoteBar />
      
      <div className="container mx-auto px-[17px] py-0">
        <ProductsHeader 
          title={activeGroup === "all" ? t('products_page_title') : activeGroup} 
          totalResults={filteredProducts.length} 
        />
        
        <ProductsFilters 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeGroup={activeGroup}
          onGroupChange={setActiveGroup}
          groups={productGroups}
          onClearFilters={handleClearFilters}
          hasActiveFilters={searchQuery !== "" || activeGroup !== "all"}
        />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.3 }}
        >
          {Object.entries(productsByGroup).map(([groupName, groupProducts]) => (
            <div key={groupName} className="mb-12">
              {activeGroup === "all" && (
                <h2 className="text-2xl font-bold text-primary dark:text-white capitalize mb-6 border-b border-gray-200 dark:border-gray-700 pb-2">
                  {groupName}
                </h2>
              )}
              <ProductsGrid products={groupProducts} language={language} />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Products;
