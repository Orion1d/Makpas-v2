import { cn } from "@/lib/utils";

interface ServicesPaginationProps {
  totalServices: number;
  currentIndex: number;
  onPageChange: (index: number) => void;
}

const ServicesPagination = ({ totalServices, currentIndex, onPageChange }: ServicesPaginationProps) => {
  return (
    <div className="flex justify-center mt-8 gap-2">
      {Array.from({ length: totalServices }).map((_, index) => (
        <button
          key={index}
          className={cn(
            "w-3 h-3 rounded-full transition-all duration-300",
            index === currentIndex
              ? "bg-primary scale-125"
              : "bg-gray-300 hover:bg-gray-400"
          )}
          onClick={() => onPageChange(index)}
        />
      ))}
    </div>
  );
};

export default ServicesPagination;