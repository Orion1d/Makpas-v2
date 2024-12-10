import { Card, CardContent } from "@/components/ui/card";

interface ServiceCardProps {
  title: string;
  description: string | null;
  imageUrl: string | null;
}

const ServiceCard = ({ title, description, imageUrl }: ServiceCardProps) => {
  return (
    <Card className="overflow-hidden group backdrop-blur-sm bg-white/90 dark:bg-gray-800/90 hover:shadow-2xl transition-all duration-500 border-0">
      {imageUrl && (
        <div className="relative h-56 w-full overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      )}
      <CardContent className="p-8 bg-gradient-to-b from-transparent to-white/5">
        <h3 className="text-2xl font-bold mb-4 text-primary dark:text-white group-hover:text-secondary transition-colors duration-300">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;