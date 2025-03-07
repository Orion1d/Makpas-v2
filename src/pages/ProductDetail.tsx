
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import ProductImageGallery from "@/components/products/ProductImageGallery";
import { RelatedProducts } from "@/components/products/RelatedProducts";
import { motion } from "framer-motion";

const ProductDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const { language, t } = useLanguage();
  const navigate = useNavigate();

  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const numericId = parseInt(id!, 10);
      if (isNaN(numericId)) {
        throw new Error("Invalid product ID");
      }

      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', numericId)
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

  const handleBackClick = () => {
    const productGroup = language === 'tr' 
      ? (product?.Product_Group_tr || product?.Product_Group)
      : product?.Product_Group;
    
    navigate('/products', { 
      state: { activeGroup: productGroup || 'all' }
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-16 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen pt-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <Button onClick={handleBackClick}>
            {t('back.to.products')}
          </Button>
        </div>
      </div>
    );
  }

  const photoUrls = product.photo_url ? product.photo_url.split(',').map(url => url.trim()) : [];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen pt-16 bg-pattern-triangles bg-transition"
    >
      <div className="container mx-auto px-6 md:px-8 lg:px-12 max-w-7xl">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleBackClick}
          className="mb-4"
        >
          <span className="flex items-center gap-2">
            <ArrowLeft size={20} />
            {t('back.to.products')}
          </span>
        </Button>

        <motion.div 
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-white dark:bg-primary/90 rounded-lg shadow-lg overflow-hidden relative"
        >
          <div className="absolute inset-0 opacity-5 dark:opacity-10">
            <div className="absolute inset-0 bg-pattern-waves"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-8 p-6 md:p-8 relative z-10">
            <ProductImageGallery 
              photoUrls={photoUrls}
              productName={language === 'tr' ? product.name_tr || product.name : product.name}
            />
            
            <motion.div 
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="space-y-6"
            >
              <h1 className="text-3xl font-bold text-foreground">
                {language === 'tr' ? product.name_tr || product.name : product.name}
              </h1>
              
              {(language === 'tr' ? product.description_tr || product.description : product.description) && (
                <div className="prose max-w-none">
                  <p className="text-foreground">
                    {language === 'tr' ? product.description_tr || product.description : product.description}
                  </p>
                </div>
              )}
              
              {(language === 'tr' ? product.Product_Group_tr || product.Product_Group : product.Product_Group) && (
                <div className="pt-4">
                  <span className="text-sm font-medium text-muted-foreground">{t('product.category')}:</span>
                  <span className="ml-2 text-sm text-foreground">
                    {language === 'tr' ? product.Product_Group_tr || product.Product_Group : product.Product_Group}
                  </span>
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>

        <RelatedProducts 
          currentProductId={parseInt(id!, 10)} 
          productGroup={product.Product_Group} 
        />
      </div>
    </motion.div>
  );
};

export default ProductDetail;
