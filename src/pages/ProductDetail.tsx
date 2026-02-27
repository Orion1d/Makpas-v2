import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronRight, MessageSquare } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import ProductImageGallery from "@/components/products/ProductImageGallery";
import { RelatedProducts } from "@/components/products/RelatedProducts";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { type Product } from "@/types/product";
import StickyQuoteBar from "@/components/ctas/StickyQuoteBar";

const ProductDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  
  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const numericId = parseInt(id!, 10);
      if (isNaN(numericId)) throw new Error("Invalid product ID");
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', numericId)
        .single();
      if (error) {
        toast({ variant: "destructive", title: "Error", description: "Failed to load product details" });
        throw error;
      }
      if (!data) {
        toast({ variant: "destructive", title: "Error", description: "Product not found" });
        throw new Error("Product not found");
      }
      return data as Product;
    }
  });

  const handleBackClick = () => navigate('/products');

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen pt-20 px-4 flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold text-foreground">Product Not Found</h1>
        <Button onClick={handleBackClick} variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('back.to.products')}
        </Button>
      </div>
    );
  }

  const photoUrls = product.photo_url ? product.photo_url.split(',').map(url => url.trim()) : [];
  const productName = language === 'tr' ? product.name_tr || product.name : product.name;
  const productDescription = language === 'tr' ? product.description_tr || product.description : product.description;
  const productGroup = language === 'tr' ? product.Product_Group_tr || product.Product_Group : product.Product_Group;

  const descriptionLines = productDescription
    ? productDescription.replace(/\\n/g, '\n').split('\n').filter(line => line.trim() !== '')
    : [];
  
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.3 }} 
      className="min-h-screen bg-background pt-20 pb-24"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-6">
          <button 
            onClick={handleBackClick} 
            className="flex items-center gap-1 hover:text-foreground transition-colors font-medium"
          >
            <ArrowLeft size={14} />
            {t('products')}
          </button>
          <ChevronRight size={12} className="text-muted-foreground/50" />
          {productGroup && (
            <>
              <span className="text-muted-foreground/80">{productGroup}</span>
              <ChevronRight size={12} className="text-muted-foreground/50" />
            </>
          )}
          <span className="text-foreground font-medium line-clamp-1">{productName}</span>
        </nav>

        {/* Main Product Section */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Left: Images */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <ProductImageGallery photoUrls={photoUrls} productName={productName} />
          </motion.div>
          
          {/* Right: Product Info */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.4, delay: 0.2 }} 
            className="flex flex-col"
          >
            {/* Category badge */}
            {productGroup && (
              <span className="inline-flex self-start text-xs font-medium text-primary bg-primary/10 dark:bg-primary/20 px-3 py-1 rounded-full mb-4">
                {productGroup}
              </span>
            )}
            
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground leading-tight mb-6">
              {productName}
            </h1>
            
            {/* Description */}
            {descriptionLines.length > 0 && (
              <div className="space-y-3 mb-8">
                {descriptionLines.map((line, index) => (
                  <p key={index} className="text-muted-foreground leading-relaxed">
                    {line.trim()}
                  </p>
                ))}
              </div>
            )}

            {/* Spacer to push CTA to bottom */}
            <div className="flex-1 min-h-4" />
            
            {/* CTA Card */}
            <Card className="border-border/60 bg-muted/30 backdrop-blur-sm">
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-lg bg-[#FF6B35]/10 shrink-0">
                    <MessageSquare className="h-5 w-5 text-[#FF6B35]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground text-sm mb-1">
                      {t('request_quote') || "Request a Quote"}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-3">
                      {t('quote_description') || "Get a custom quote for this product"}
                    </p>
                    <Button 
                      className="w-full sm:w-auto bg-[#FFD700] hover:bg-[#FFD700]/90 text-black font-bold text-sm" 
                      onClick={() => navigate('/contact')}
                    >
                      {t('order_now') || "Order Now"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Related Products */}
        <RelatedProducts currentProductId={parseInt(id!, 10)} productGroup={product.Product_Group} />
      </div>
      
      <StickyQuoteBar />
    </motion.div>
  );
};

export default ProductDetail;
