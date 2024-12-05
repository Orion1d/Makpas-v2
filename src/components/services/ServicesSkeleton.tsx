import { Skeleton } from "@/components/ui/skeleton";

const ServicesSkeleton = () => {
  return (
    <section className="w-full py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <Skeleton className="h-12 w-64 mx-auto mb-16" />
        <div className="relative">
          <div className="w-full px-16">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <Skeleton className="h-[400px] rounded-xl" />
              <div className="space-y-6">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/6" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSkeleton;