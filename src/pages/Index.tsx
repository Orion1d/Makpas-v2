import ProductShowcase from "@/components/ProductShowcase";
import ServicesShowcase from "@/components/ServicesShowcase";

const Index = () => {
  return (
    <div className="min-h-screen">
      <ServicesShowcase />
      <ProductShowcase />
    </div>
  );
};

export default Index;