import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { ProductSidebar } from "@/components/ProductSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import ProductGrid from "@/components/products/ProductGrid";

const Products = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeGroup, setActiveGroup] = useState("all");
  const { t, language } = useLanguage();

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

  const productGroups = Array.from(
    new Set(products.map((product) => {
      if (language === 'tr') {
        return product.Product_Group_tr || product.Product_Group || "other";
      }
      return product.Product_Group || "other";
    }))
  );

  const filteredProducts = products.filter((product) => {
    const productName = language === 'tr' ? (product.name_tr || product.name) : product.name;
    const productDescription = language === 'tr' ? (product.description_tr || product.description) : product.description;
    const productGroup = language === 'tr' ? (product.Product_Group_tr || product.Product_Group || "other") : (product.Product_Group || "other");

    const matchesSearch =
      productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (productDescription?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);

    const matchesGroup =
      activeGroup === "all" ||
      productGroup.toLowerCase() === activeGroup.toLowerCase();

    return matchesSearch && matchesGroup;
  });

  // Group products by their category
  const groupedProducts = filteredProducts.reduce((acc, product) => {
    const group = language === 'tr' 
      ? (product.Product_Group_tr || product.Product_Group || "other")
      : (product.Product_Group || "other");
    
    if (!acc[group]) {
      acc[group] = [];
    }
    acc[group].push(product);
    return acc;
  }, {} as Record<string, typeof products>);

  // Sort groups alphabetically
  const sortedGroups = Object.keys(groupedProducts).sort();

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      <SidebarProvider>
        <div className="flex w-full">
          <ProductSidebar
            groups={productGroups}
            activeGroup={activeGroup}
            onGroupChange={setActiveGroup}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
          <main className="flex-1 px-4 pb-8">
            <div className="container mx-auto">
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-4xl font-bold text-primary">
                  {t('products_page_title')}
                </h1>
              </div>

              {activeGroup === "all" ? (
                // Display all products grouped by category
                sortedGroups.map((group) => (
                  <div key={group} className="mb-12">
                    <h2 className="text-2xl font-semibold mb-6 text-primary capitalize">
                      {group}
                    </h2>
                    <ProductGrid products={groupedProducts[group]} language={language} />
                  </div>
                ))
              ) : (
                // Display only products from selected category
                <ProductGrid products={filteredProducts} language={language} />
              )}
            </div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Products;