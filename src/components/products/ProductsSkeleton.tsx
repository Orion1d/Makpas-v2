import { Skeleton } from "@/components/ui/skeleton";

const ProductsSkeleton = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <Skeleton className="h-12 w-64 mx-auto mb-16" />
        
        <div className="bg-white dark:bg-primary/90 rounded-lg shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-6">
            <Skeleton className="aspect-square rounded-lg" />
            
            <div className="space-y-6">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-10 w-32" />
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="w-3 h-3 rounded-full" />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSkeleton;