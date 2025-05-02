
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { ProductSidebar } from "@/components/ProductSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import ProductGrid from "@/components/products/ProductGrid";
import { ProductHeader } from "@/components/products/ProductHeader";
import { ProductGroupSection } from "@/components/products/ProductGroupSection";
import StickyQuoteBar from "@/components/ctas/StickyQuoteBar";
import { X } from "lucide-react";
import { useLocation } from "react-router-dom";
import type { Product } from "@/types/product";
import { motion } from "framer-motion";
import FloatingActionButton from "@/components/ctas/FloatingActionButton";

const Products = () => {
  const location = useLocation();
  const initialGroup = location.state?.activeGroup || "all";
  const [searchQuery, setSearchQuery] = useState("");
  const [activeGroup, setActiveGroup] = useState(initialGroup);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const { t, language } = useLanguage();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase.from('products').select('*');
      if (error) throw error;
      return (data || []) as Product[];
    }
  });

  const productGroups = Array.from(new Set(products.map(product => {
    if (language === 'tr') {
      return product.Product_Group_tr || product.Product_Group || "other";
    }
    return product.Product_Group || "other";
  })));

  const filteredProducts = products.filter(product => {
    const productName = language === 'tr' ? product.name_tr || product.name : product.name;
    const productDescription = language === 'tr' ? product.description_tr || product.description : product.description;
    const productGroup = language === 'tr' ? product.Product_Group_tr || product.Product_Group || "other" : product.Product_Group || "other";
    
    const matchesSearch = productName.toLowerCase().includes(searchQuery.toLowerCase()) || 
      (productDescription?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
    const matchesGroup = activeGroup === "all" || productGroup.toLowerCase() === activeGroup.toLowerCase();
    
    return matchesSearch && matchesGroup;
  });

  const groupedProducts = filteredProducts.reduce((acc, product) => {
    const group = language === 'tr' ? product.Product_Group_tr || product.Product_Group || "other" : product.Product_Group || "other";
    if (!acc[group]) {
      acc[group] = [];
    }
    acc[group].push(product);
    return acc;
  }, {} as Record<string, Product[]>);

  const sortedGroups = Object.keys(groupedProducts).sort();
  
  const handleClearFilters = () => {
    setSearchQuery("");
    setActiveGroup("all");
    setActiveFilters([]);
  };
  
  const removeFilter = (filter: string) => {
    if (filter === 'group') {
      setActiveGroup("all");
    } else if (filter === 'search') {
      setSearchQuery("");
    } else {
      setActiveFilters(activeFilters.filter(f => f !== filter));
    }
  };

  // Determine if we have active filters
  const hasActiveFilters = searchQuery !== "" || activeGroup !== "all" || activeFilters.length > 0;

  useEffect(() => {
    // Set page title
    document.title = `${t('products_page_title')} | Makpas`;
  }, [t]);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blueprint-pattern bg-white/95 dark:bg-gray-900/95 relative pt-16">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-light-gray/50 via-transparent to-safety-orange/5 dark:from-gray-900/50 dark:to-safety-orange/10 pointer-events-none"></div>
      
      <FloatingActionButton />
      <StickyQuoteBar />
      
      <SidebarProvider>
        <div className="flex flex-col md:flex-row w-full max-w-[1440px] mx-auto relative">
          {/* Desktop Sidebar - Moved inside the main container */}
          <div className="hidden md:block md:w-64 md:shrink-0 md:sticky md:top-16 md:self-start md:h-[calc(100vh-4rem)]">
            <ProductSidebar 
              groups={productGroups} 
              activeGroup={activeGroup} 
              onGroupChange={setActiveGroup} 
              searchQuery={searchQuery} 
              onSearchChange={setSearchQuery}
              onClearFilters={handleClearFilters}
              activeFilters={activeFilters}
            />
          </div>
          
          <main className="flex-1 px-4 pb-8 pt-4">
            <div className="container mx-auto">
              {/* Desktop header - hidden on mobile */}
              <div className="hidden md:block">
                <ProductHeader 
                  title={activeGroup === "all" ? t('products_page_title') : activeGroup} 
                />
              </div>
              
              {/* Mobile filter bar - Simplified and made sure it doesn't overlay */}
              <div className="md:hidden mb-6">
                <ProductSidebar 
                  groups={productGroups} 
                  activeGroup={activeGroup} 
                  onGroupChange={setActiveGroup} 
                  searchQuery={searchQuery} 
                  onSearchChange={setSearchQuery}
                  onClearFilters={handleClearFilters}
                  activeFilters={activeFilters}
                />
              </div>
              
              {/* Active Filters - Desktop */}
              {hasActiveFilters && (
                <div className="hidden md:flex flex-wrap gap-2 mt-4 mb-6">
                  {searchQuery && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="inline-flex items-center gap-1 bg-primary/10 text-primary dark:bg-primary/20 dark:text-white px-3 py-1.5 rounded-full"
                    >
                      <span>"{searchQuery}"</span>
                      <button onClick={() => removeFilter('search')} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 ml-1">
                        <X className="h-4 w-4" />
                      </button>
                    </motion.div>
                  )}
                  
                  {activeGroup !== "all" && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="inline-flex items-center gap-1 bg-primary/10 text-primary dark:bg-primary/20 dark:text-white px-3 py-1.5 rounded-full"
                    >
                      <span>{activeGroup}</span>
                      <button onClick={() => removeFilter('group')} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 ml-1">
                        <X className="h-4 w-4" />
                      </button>
                    </motion.div>
                  )}
                  
                  {activeFilters.map(filter => (
                    <motion.div 
                      key={filter}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="inline-flex items-center gap-1 bg-primary/10 text-primary dark:bg-primary/20 dark:text-white px-3 py-1.5 rounded-full"
                    >
                      <span>{filter}</span>
                      <button onClick={() => removeFilter(filter)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 ml-1">
                        <X className="h-4 w-4" />
                      </button>
                    </motion.div>
                  ))}
                  
                  <button 
                    onClick={handleClearFilters}
                    className="text-secondary hover:text-secondary/80 px-3 py-1.5 rounded-full border border-secondary/20 hover:border-secondary/40 transition-colors"
                  >
                    {t('clear_all') || 'Clear all'}
                  </button>
                </div>
              )}

              {/* Count of results */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-sm text-gray-500 dark:text-gray-400 mt-2 mb-4"
              >
                {filteredProducts.length} {filteredProducts.length === 1 ? t('product') || 'product' : t('products') || 'products'}
              </motion.div>

              {activeGroup === "all" ? (
                sortedGroups.map(group => (
                  <ProductGroupSection 
                    key={group} 
                    group={group} 
                    products={groupedProducts[group]} 
                    language={language} 
                  />
                ))
              ) : (
                <ProductGrid 
                  products={filteredProducts} 
                  language={language} 
                />
              )}
            </div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Products;
