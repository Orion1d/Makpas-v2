import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Download } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
const CatalogSection = () => {
  const {
    t
  } = useLanguage();
  return <section className="py-16 bg-white dark:bg-gray-950 transition-all duration-700 ease-in-out">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 max-w-5xl mx-auto">
          {/* Catalog Cover Image */}
          <BlurFade delay={0.2} inView>
            <div className="w-full md:w-1/2 flex justify-center">
              <img src="/src/components/catalog_cover.png" alt="Makpas Catalog Cover" className="rounded-lg shadow-lg transform hover:scale-105 transition-all duration-500 max-w-[450px] w-full" />
            </div>
          </BlurFade>
          
          {/* Catalog Description and Download Button */}
          <BlurFade delay={0.4} inView>
            <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
              <h2 className="text-primary dark:text-white mx-0 text-left font-bold text-2xl px-[44px]">
                {t('catalog.title') || 'Product Catalog'}
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                {t('catalog.description') || 'Get a copy of our catalog with the latest products and specifications. Download it now to explore our full range of offerings.'}
              </p>
              <Button asChild className="mt-4 gap-2 bg-secondary hover:bg-secondary/90 transform hover:scale-105 transition-all duration-300">
                <a href="/src/components/Makpas_catalog_EN.pdf" download="Makpas_Catalog_EN.pdf">
                  <Download className="w-4 h-4 mr-1" />
                  {t('catalog.download_button') || 'Download Catalog'}
                </a>
              </Button>
            </div>
          </BlurFade>
        </div>
      </div>
    </section>;
};
export default CatalogSection;