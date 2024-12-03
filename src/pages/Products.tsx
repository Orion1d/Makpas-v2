import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { ProductSidebar } from "@/components/ProductSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

const Products = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeGroup, setActiveGroup] = useState("all");
  const navigate = useNavigate();
  const { t } = useLanguage();

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
    new Set(products.map((product) => product.Product_Group || "other"))
  );

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesGroup =
      activeGroup === "all" ||
      (product.Product_Group || "other").toLowerCase() === activeGroup.toLowerCase();

    return matchesSearch && matchesGroup;
  });

  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
  };

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

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <Card
                    key={product.id}
                    className="cursor-pointer transition-transform duration-300 hover:scale-105"
                    onClick={() => handleProductClick(product.id)}
                  >
                    {product.photo_url && (
                      <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                        <img
                          src={product.photo_url}
                          alt={product.name}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle className="text-xl text-primary">
                        {product.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 line-clamp-3">
                        {product.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Products;