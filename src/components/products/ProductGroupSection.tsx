import ProductGrid from "./ProductGrid";
import type { Product } from "@/types/product";

interface ProductGroupSectionProps {
  group: string;
  products: Product[];
  language: string;
}

export const ProductGroupSection = ({ group, products, language }: ProductGroupSectionProps) => {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-semibold mb-6 text-primary dark:text-white capitalize">
        {group}
      </h2>
      <ProductGrid products={products} language={language} />
    </div>
  );
};