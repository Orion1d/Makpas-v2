import WelcomeSection from "@/components/WelcomeSection";
import ServicesShowcase from "@/components/ServicesShowcase";
import ProductShowcase from "@/components/ProductShowcase";

const Index = () => {
  return (
    <div className="flex flex-col">
      <WelcomeSection />
      <ServicesShowcase />
      <ProductShowcase />
    </div>
  );
};

export default Index;