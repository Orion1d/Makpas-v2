import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  service: {
    photo_url: string;
    title: string;
    title_tr?: string;
    description: string;
    description_tr?: string;
  };
  language: string;
  onNext: () => void;
  onPrev: () => void;
}

const ServiceCard = ({ service, language, onNext, onPrev }: ServiceCardProps) => {
  const serviceTitle = language === 'tr' && service.title_tr ? service.title_tr : service.title;
  const serviceDescription = language === 'tr' && service.description_tr ? service.description_tr : service.description;

  return (
    <div className="relative">
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10"
          onClick={onPrev}
        >
          <ChevronLeft className="h-8 w-8" />
        </Button>

        <div className="w-full px-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div 
              className="relative h-[400px] overflow-hidden rounded-xl"
              style={{
                backgroundImage: `url(${service.photo_url})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="absolute inset-0 bg-black/30"></div>
            </div>
            
            <div className="space-y-6">
              <div 
                className={cn(
                  "transition-opacity duration-500",
                  service ? "opacity-100" : "opacity-0"
                )}
              >
                <h3 className="text-3xl font-bold mb-4 text-primary">
                  {serviceTitle}
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {serviceDescription}
                </p>
              </div>
            </div>
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10"
          onClick={onNext}
        >
          <ChevronRight className="h-8 w-8" />
        </Button>
      </div>
    </div>
  );
};

export default ServiceCard;