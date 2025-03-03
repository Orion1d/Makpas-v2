
import WelcomeSection from "@/components/WelcomeSection";
import ServicesShowcase from "@/components/ServicesShowcase";
import ProductShowcase from "@/components/ProductShowcase";
import CatalogSection from "@/components/catalog/CatalogSection";

const Index = () => {
  return (
    <div className="flex flex-col">
      <WelcomeSection />
      <ServicesShowcase />
      <ProductShowcase />
      <CatalogSection />
    </div>
  );
};

export default Index;
