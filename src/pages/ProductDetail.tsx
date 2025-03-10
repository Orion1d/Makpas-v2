import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, Award, ChevronRight, MessageSquare } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import ProductImageGallery from "@/components/products/ProductImageGallery";
import { RelatedProducts } from "@/components/products/RelatedProducts";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type Product } from "@/types/product";

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
      
      return data as Product;
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
  const productName = language === 'tr' ? product.name_tr || product.name : product.name;
  const productDescription = language === 'tr' ? product.description_tr || product.description : product.description;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen pt-16 bg-pattern-triangles bg-transition"
    >
      <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-7xl">
        <nav className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBackClick}
            className="flex items-center gap-1 p-0 h-auto"
          >
            <span className="flex items-center gap-1">
              <ArrowLeft size={14} />
              {t('products')}
            </span>
          </Button>
          <ChevronRight size={14} />
          <span className="text-primary dark:text-white font-medium line-clamp-1">{productName}</span>
        </nav>

        <motion.div 
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-white dark:bg-primary/90 rounded-lg shadow-lg overflow-hidden relative mb-8"
        >
          <div className="absolute inset-0 opacity-5 dark:opacity-10">
            <div className="absolute inset-0 bg-pattern-waves"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-8 p-6 md:p-8 relative z-10">
            <ProductImageGallery 
              photoUrls={photoUrls}
              productName={productName}
            />
            
            <motion.div 
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="space-y-6"
            >
              <h1 className="text-3xl font-bold text-foreground">
                {productName}
              </h1>
              
              <Tabs defaultValue="details" className="w-full">
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="details">{t('details') || "Details"}</TabsTrigger>
                  <TabsTrigger value="specifications">{t('specifications') || "Specifications"}</TabsTrigger>
                  <TabsTrigger value="documents">{t('documents') || "Documents"}</TabsTrigger>
                </TabsList>
                
                <TabsContent value="details" className="space-y-4">
                  {productDescription && (
                    <div className="prose max-w-none dark:prose-invert">
                      <p className="text-foreground">
                        {productDescription}
                      </p>
                    </div>
                  )}
                  
                  {(language === 'tr' ? product.Product_Group_tr || product.Product_Group : product.Product_Group) && (
                    <div className="pt-2">
                      <span className="text-sm font-medium text-muted-foreground">{t('product.category')}:</span>
                      <span className="ml-2 text-sm text-foreground">
                        {language === 'tr' ? product.Product_Group_tr || product.Product_Group : product.Product_Group}
                      </span>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="specifications" className="space-y-4">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <tbody>
                        <tr className="bg-gray-50 dark:bg-gray-800/50">
                          <td className="px-4 py-2 font-medium text-gray-600 dark:text-gray-300">{t('material') || "Material"}</td>
                          <td className="px-4 py-2">{t('industrial_steel') || "Industrial Steel"}</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 font-medium text-gray-600 dark:text-gray-300">{t('tolerance') || "Tolerance"}</td>
                          <td className="px-4 py-2">±0.05mm</td>
                        </tr>
                        <tr className="bg-gray-50 dark:bg-gray-800/50">
                          <td className="px-4 py-2 font-medium text-gray-600 dark:text-gray-300">{t('finish') || "Finish"}</td>
                          <td className="px-4 py-2">{t('polished') || "Polished"}</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 font-medium text-gray-600 dark:text-gray-300">{t('weight') || "Weight"}</td>
                          <td className="px-4 py-2">3.5kg</td>
                        </tr>
                        <tr className="bg-gray-50 dark:bg-gray-800/50">
                          <td className="px-4 py-2 font-medium text-gray-600 dark:text-gray-300">{t('origin') || "Country of Origin"}</td>
                          <td className="px-4 py-2">{t('turkey') || "Turkey"}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </TabsContent>
                
                <TabsContent value="documents" className="space-y-4">
                  <div className="space-y-3">
                    <Card className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <CardContent className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-safety-orange" />
                          <div>
                            <p className="font-medium">{t('technical_data_sheet') || "Technical Data Sheet"}</p>
                            <p className="text-sm text-gray-500">PDF, 1.2 MB</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          {t('download') || "Download"}
                        </Button>
                      </CardContent>
                    </Card>
                    
                    <Card className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <CardContent className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Award className="h-5 w-5 text-safety-orange" />
                          <div>
                            <p className="font-medium">{t('quality_certificate') || "Quality Certificate"}</p>
                            <p className="text-sm text-gray-500">PDF, 0.8 MB</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          {t('download') || "Download"}
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="pt-4">
                <Card className="bg-gray-50 dark:bg-gray-800/50 border-safety-orange/20">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <MessageSquare className="h-5 w-5 text-safety-orange" />
                      {t('request_quote') || "Request a Quote"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      {t('quote_description') || "Get a custom quote for this product. Our team will respond within 24 hours."}
                    </p>
                    <Button 
                      variant="accent" 
                      className="w-full"
                      onClick={() => navigate('/contact')}
                    >
                      {t('get_quote') || "Get a Quote"}
                    </Button>
                  </CardContent>
                </Card>
              </div>
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
