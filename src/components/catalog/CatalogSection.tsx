
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Download } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";

const CatalogSection = () => {
  const { t } = useLanguage();
  
  return (
    <section className="py-8 bg-primary text-white transition-all duration-700 ease-in-out">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mx-auto">
          {/* Catalog Cover Image */}
          <BlurFade delay={0.2} inView>
            <div className="flex items-center gap-4">
              <img 
                src="/src/components/catalog_cover.png" 
                alt="Makpas Catalog Cover" 
                className="rounded-lg shadow-lg transform hover:scale-105 transition-all duration-500 h-20 md:h-28"
              />
              
              <h2 className="text-xl md:text-2xl font-semibold">
                {t('catalog.title') || 'Product Catalog'}
              </h2>
            </div>
          </BlurFade>
          
          {/* Download Button */}
          <BlurFade delay={0.4} inView>
            <Button
              asChild
              className="gap-2 bg-secondary hover:bg-secondary/90 transform hover:scale-105 transition-all duration-300"
            >
              <a href="/src/components/Makpas_catalog_EN.pdf" download="Makpas_Catalog_EN.pdf">
                <Download className="w-4 h-4 mr-1" />
                {t('catalog.download_button') || 'Download Catalog'}
              </a>
            </Button>
          </BlurFade>
        </div>
      </div>
    </section>
  );
};

export default CatalogSection;
