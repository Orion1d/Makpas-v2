import ProductShowcase from "@/components/ProductShowcase";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen">
      <div 
        className="relative h-screen flex items-center justify-center"
        style={{
          backgroundImage: "url('/lovable-uploads/bfc59d3b-fe89-4a98-9a42-7188b454d33c.png')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="absolute inset-0 bg-primary/70"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl font-bold mb-6">Welcome to Makpaş</h1>
          <p className="text-xl mb-4">
            Since our establishment in 2000, our company has been a trusted provider of packaging and industrial materials.
          </p>
          <p className="text-lg mb-8">
            Serving Türkiye, America, Europe and Asia
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
              <Link to="/products">Our Products</Link>
            </Button>
            <Button asChild variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
      <ProductShowcase />
    </div>
  );
};

export default Index;