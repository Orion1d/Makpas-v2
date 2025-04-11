
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, Award, ChevronRight, MessageSquare, Wrench, Factory, Cpu, CheckCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import ProductImageGallery from "@/components/products/ProductImageGallery";
import { RelatedProducts } from "@/components/products/RelatedProducts";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { type Product } from "@/types/product";
import StickyQuoteBar from "@/components/ctas/StickyQuoteBar";
const ProductDetail = () => {
  const {
    id
  } = useParams();
  const {
    toast
  } = useToast();
  const {
    language,
    t
  } = useLanguage();
  const navigate = useNavigate();
  const {
    data: product,
    isLoading,
    error
  } = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const numericId = parseInt(id!, 10);
      if (isNaN(numericId)) {
        throw new Error("Invalid product ID");
      }
      const {
        data,
        error
      } = await supabase.from('products').select('*').eq('id', numericId).single();
      if (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load product details"
        });
        throw error;
      }
      if (!data) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Product not found"
        });
        throw new Error("Product not found");
      }
      return data as Product;
    }
  });
  const handleBackClick = () => {
    const productGroup = language === 'tr' ? product?.Product_Group_tr || product?.Product_Group : product?.Product_Group;
    navigate('/products', {
      state: {
        activeGroup: productGroup || 'all'
      }
    });
  };
  if (isLoading) {
    return <div className="min-h-screen pt-16 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>;
  }
  if (error || !product) {
    return <div className="min-h-screen pt-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <Button onClick={handleBackClick}>
            {t('back.to.products')}
          </Button>
        </div>
      </div>;
  }
  const photoUrls = product.photo_url ? product.photo_url.split(',').map(url => url.trim()) : [];
  const productName = language === 'tr' ? product.name_tr || product.name : product.name;
  const productDescription = language === 'tr' ? product.description_tr || product.description : product.description;
  
  return <motion.div initial={{
    opacity: 0
  }} animate={{
    opacity: 1
  }} exit={{
    opacity: 0
  }} transition={{
    duration: 0.3
  }} className="min-h-screen pt-16" style={{
    zIndex: 30
  }}>
      <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-7xl">
        <nav className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
          <Button variant="ghost" size="sm" onClick={handleBackClick} className="flex items-center gap-1 p-0 h-auto">
            <span className="flex items-center gap-1">
              <ArrowLeft size={14} />
              {t('products')}
            </span>
          </Button>
          <ChevronRight size={14} />
          <span className="text-primary dark:text-white font-medium line-clamp-1">{productName}</span>
        </nav>

        <motion.div initial={{
        y: 20
      }} animate={{
        y: 0
      }} transition={{
        duration: 0.4,
        delay: 0.1
      }} className="bg-white dark:bg-primary/90 rounded-lg shadow-lg overflow-hidden relative mb-8">
          <div className="absolute inset-0 opacity-5 dark:opacity-10">
            <div className="absolute inset-0 bg-pattern-waves"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-8 p-6 md:p-8 relative z-10">
            <ProductImageGallery photoUrls={photoUrls} productName={productName} />
            
            <motion.div initial={{
            x: 20,
            opacity: 0
          }} animate={{
            x: 0,
            opacity: 1
          }} transition={{
            duration: 0.4,
            delay: 0.2
          }} className="space-y-6">
              <h1 className="text-3xl font-bold text-foreground">
                {productName}
              </h1>
              
              {productDescription && <div className="prose max-w-none dark:prose-invert">
                  <p className="text-foreground">
                    {productDescription}
                  </p>
                </div>}
              
              {/* Technical specs section removed as requested */}
              
              {(language === 'tr' ? product.Product_Group_tr || product.Product_Group : product.Product_Group) && <div className="pt-2">
                  <span className="text-sm font-medium text-muted-foreground">{t('product.category')}:</span>
                  <span className="ml-2 text-sm text-foreground">
                    {language === 'tr' ? product.Product_Group_tr || product.Product_Group : product.Product_Group}
                  </span>
                </div>}
              
              <div className="sticky top-20 mt-8 z-50">
                <Card className="overflow-hidden border-safety-orange/20 backdrop-blur-xl bg-white/80 dark:bg-gray-800/80 shadow-lg">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <MessageSquare className="h-6 w-6 text-safety-orange" />
                      <div className="flex-1">
                        <h3 className="font-medium">{t('request_quote') || "Request a Quote"}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {t('quote_description') || "Get a custom quote for this product"}
                        </p>
                      </div>
                      <Button variant="accent" className="bg-[#FFD700] hover:bg-[#FFD700]/90 text-black font-bold" onClick={() => navigate('/contact')}>
                        {t('order_now') || "Order Now"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              
            </motion.div>
          </div>
        </motion.div>

        <RelatedProducts currentProductId={parseInt(id!, 10)} productGroup={product.Product_Group} />
      </div>
      
      <StickyQuoteBar />
    </motion.div>;
};
export default ProductDetail;
