
import { useLanguage } from "@/contexts/LanguageContext";

interface ProductsHeaderProps {
  title: string;
  totalResults: number;
}

export const ProductsHeader = ({ title, totalResults }: ProductsHeaderProps) => {
  const { t } = useLanguage();
  
  return (
    <div className="mb-6">
      <h1 className="text-4xl font-bold text-primary dark:text-white capitalize mb-2">
        {title}
      </h1>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {totalResults} {totalResults === 1 ? t('product') || 'product' : t('products') || 'products'}
      </p>
    </div>
  );
};
