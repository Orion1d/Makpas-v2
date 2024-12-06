import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

const ProductDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const { language, t } = useLanguage();

  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load product details",
        });
        throw error;
      }
      
      if (!data) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Product not found",
        });
        throw new Error("Product not found");
      }
      
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen pt-24 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <Button asChild>
            <Link to="/products">Back to Products</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 px-4">
      <div className="container mx-auto max-w-4xl">
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="mb-6"
        >
          <Link to="/products" className="flex items-center gap-2">
            <ArrowLeft size={20} />
            {t('back.to.products')}
          </Link>
        </Button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-6">
            <div className="relative aspect-square overflow-hidden rounded-lg">
              {product.photo_url && (
                <img
                  src={product.photo_url}
                  alt={language === 'tr' ? product.name_tr || product.name : product.name}
                  className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                />
              )}
            </div>
            
            <div className="space-y-6">
              <h1 className="text-3xl font-bold text-primary">
                {language === 'tr' ? product.name_tr || product.name : product.name}
              </h1>
              
              {(language === 'tr' ? product.description_tr || product.description : product.description) && (
                <div className="prose max-w-none">
                  <p className="text-gray-600">
                    {language === 'tr' ? product.description_tr || product.description : product.description}
                  </p>
                </div>
              )}
              
              {(language === 'tr' ? product.Product_Group_tr || product.Product_Group : product.Product_Group) && (
                <div className="pt-4">
                  <span className="text-sm font-medium text-gray-500">{t('product.category')}:</span>
                  <span className="ml-2 text-sm text-gray-900">
                    {language === 'tr' ? product.Product_Group_tr || product.Product_Group : product.Product_Group}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;