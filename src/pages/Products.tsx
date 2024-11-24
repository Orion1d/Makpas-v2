import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Products = () => {
  const [searchQuery, setSearchQuery] = useState("");

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

  const groupProducts = (products: any[]) => {
    return products.reduce((acc: any, product) => {
      const group = product.Product_Group?.toLowerCase() || 'other';
      if (!acc[group]) {
        acc[group] = [];
      }
      acc[group].push(product);
      return acc;
    }, {});
  };

  const filterProducts = (products: any[], query: string) => {
    if (!query) return products;
    
    return products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description?.toLowerCase().includes(query.toLowerCase())
    );
  };

  const filteredProducts = filterProducts(products, searchQuery);
  const groupedProducts = groupProducts(filteredProducts);
  const productGroups = Object.keys(groupedProducts);

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
    <div className="min-h-screen pt-20 px-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-primary">Our Products</h1>
          <img 
            src="/lovable-uploads/2401d1ed-a520-43c6-b7cd-99b558306b25.png" 
            alt="Makpas Logo" 
            className="h-12"
          />
        </div>

        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="search"
            placeholder="Search products..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Tabs defaultValue={productGroups[0]} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            {productGroups.map((group) => (
              <TabsTrigger key={group} value={group} className="capitalize">
                {group}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {productGroups.map((group) => (
            <TabsContent key={group} value={group}>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {groupedProducts[group].map((product: any) => (
                  <Card key={product.id}>
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
                      <CardTitle className="text-xl text-primary">{product.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">{product.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default Products;