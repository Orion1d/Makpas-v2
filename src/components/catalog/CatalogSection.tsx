
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Download } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import { useTheme } from "@/contexts/ThemeContext";
import { useState, useEffect } from "react";

const CatalogSection = () => {
  const { t } = useLanguage();
  const { isDarkMode } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  
  // Set visibility after component mount to prevent flashing
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <section className="px-0 my-[30px] py-[40px]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mx-auto bg-white/80 dark:bg-primary/80 backdrop-blur-sm p-6 rounded-lg shadow-md">
          {/* Catalog Cover Image */}
          <BlurFade delay={0.2} inView={isVisible}>
            <div className="flex items-center gap-4">
              <img 
                src="/src/components/catalog_cover.png" 
                alt="Makpas Catalog Cover" 
                className="rounded-lg shadow-lg transform hover:scale-105 transition-all duration-500 h-20 md:h-28" 
                onError={(e) => {
                  console.log("Image failed to load, trying alternative path");
                  e.currentTarget.src = "/Makpas_catalog_cover.png";
                }}
              />
              
              <h2 className={`text-xl md:text-2xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                {t('catalog.title') || 'Product Catalog'}
              </h2>
            </div>
          </BlurFade>
          
          {/* Download Button */}
          <BlurFade delay={0.4} inView={isVisible}>
            <Button asChild variant="secondary" className="gap-2 transform hover:scale-105 transition-all duration-300">
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
