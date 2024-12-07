import { Button } from "@/components/ui/button";

interface ProductPaginationProps {
  totalProducts: number;
  currentIndex: number;
  onPageChange: (index: number) => void;
}

const ProductPagination = ({
  totalProducts,
  currentIndex,
  onPageChange,
}: ProductPaginationProps) => {
  return (
    <div className="flex justify-center gap-2 mt-8">
      {Array.from({ length: totalProducts }).map((_, index) => (
        <Button
          key={index}
          variant={currentIndex === index ? "default" : "outline"}
          size="icon"
          className="w-3 h-3 rounded-full p-0"
          onClick={() => onPageChange(index)}
        >
          <span className="sr-only">Go to product {index + 1}</span>
        </Button>
      ))}
    </div>
  );
};

export default ProductPagination;