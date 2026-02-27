
import { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLocation } from "react-router-dom";
import type { Product } from "@/types/product";
import { motion } from "framer-motion";
import FloatingActionButton from "@/components/ctas/FloatingActionButton";
import StickyQuoteBar from "@/components/ctas/StickyQuoteBar";
import { ProductsFilters } from "@/components/products/ProductsFilters";
import { ProductsGrid } from "@/components/products/ProductsGrid";
import { ProductsLoading } from "@/components/products/ProductsLoading";
import { Package } from "lucide-react";

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
        .select('*')
        .order('group_priority', { ascending: true, nullsFirst: false });
      if (error) throw error;
      return (data || []) as Product[];
    }
  });

  // Get unique product groups sorted by priority
  const productGroups = useMemo(() => {
    const groupMap = new Map<string, number>();
    products.forEach(product => {
      const groupName = language === 'tr'
        ? product.Product_Group_tr || product.Product_Group || "other"
        : product.Product_Group || "other";
      const priority = product.group_priority ?? 999;
      if (!groupMap.has(groupName) || priority < (groupMap.get(groupName) ?? 999)) {
        groupMap.set(groupName, priority);
      }
    });
    return Array.from(groupMap.entries())
      .sort((a, b) => a[1] - b[1])
      .map(([name]) => name);
  }, [products, language]);

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const productName = language === 'tr' ? product.name_tr || product.name : product.name;
      const productDescription = language === 'tr' ? product.description_tr || product.description : product.description;
      const productGroup = language === 'tr' ? product.Product_Group_tr || product.Product_Group || "other" : product.Product_Group || "other";
      
      const matchesSearch = productName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           (productDescription?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
      const matchesGroup = activeGroup === "all" || productGroup.toLowerCase() === activeGroup.toLowerCase();
      
      return matchesSearch && matchesGroup;
    });
  }, [products, searchQuery, activeGroup, language]);

  // Group products by category
  const productsByGroup = useMemo(() => {
    if (activeGroup !== "all") {
      return { [activeGroup]: filteredProducts };
    }

    const grouped: { [key: string]: Product[] } = {};
    // Use the sorted productGroups order
    productGroups.forEach(group => {
      grouped[group] = [];
    });
    
    filteredProducts.forEach(product => {
      const group = language === 'tr' 
        ? product.Product_Group_tr || product.Product_Group || "other"
        : product.Product_Group || "other";
      
      if (!grouped[group]) {
        grouped[group] = [];
      }
      grouped[group].push(product);
    });

    // Remove empty groups
    Object.keys(grouped).forEach(key => {
      if (grouped[key].length === 0) delete grouped[key];
    });

    return grouped;
  }, [filteredProducts, productGroups, activeGroup, language]);

  const handleClearFilters = () => {
    setSearchQuery("");
    setActiveGroup("all");
  };

  useEffect(() => {
    document.title = `${t('products_page_title')} | Makpas`;
  }, [t]);

  if (isLoading) {
    return <ProductsLoading />;
  }

  return (
    <div className="min-h-screen bg-background pt-20 pb-24">
      <FloatingActionButton />
      <StickyQuoteBar />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Page Header */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-primary/10 dark:bg-primary/20">
              <Package className="h-6 w-6 text-primary dark:text-primary-foreground" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
              {activeGroup === "all" ? t('products_page_title') : activeGroup}
            </h1>
          </div>
          <p className="text-muted-foreground ml-[52px]">
            {filteredProducts.length} {filteredProducts.length === 1 ? t('product') || 'product' : t('products') || 'products'}
          </p>
        </motion.div>
        
        <ProductsFilters 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeGroup={activeGroup}
          onGroupChange={setActiveGroup}
          groups={productGroups}
          onClearFilters={handleClearFilters}
          hasActiveFilters={searchQuery !== "" || activeGroup !== "all"}
        />
        
        {filteredProducts.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Package className="h-16 w-16 text-muted-foreground/40 mx-auto mb-4" />
            <p className="text-muted-foreground text-lg font-medium">
              {language === 'tr' ? 'Ürün bulunamadı.' : 'No products found.'}
            </p>
            <p className="text-muted-foreground/60 text-sm mt-1">
              {language === 'tr' ? 'Filtrelerinizi değiştirmeyi deneyin.' : 'Try adjusting your filters.'}
            </p>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.3 }}
            className="space-y-12"
          >
            {Object.entries(productsByGroup).map(([groupName, groupProducts], groupIdx) => (
              <section key={groupName}>
                {activeGroup === "all" && (
                  <div className="flex items-center gap-3 mb-6">
                    <h2 className="text-xl font-semibold text-foreground capitalize">
                      {groupName}
                    </h2>
                    <div className="flex-1 h-px bg-border" />
                    <span className="text-xs font-medium text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
                      {groupProducts.length}
                    </span>
                  </div>
                )}
                <ProductsGrid products={groupProducts} language={language} />
              </section>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Products;
