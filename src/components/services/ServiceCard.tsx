import { Card, CardContent } from "@/components/ui/card";

interface ServiceCardProps {
  title: string;
  description: string | null;
  imageUrl: string | null;
}

const ServiceCard = ({ title, description, imageUrl }: ServiceCardProps) => {
  return (
    <Card className="overflow-hidden group backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 hover:shadow-xl transition-all duration-500">
      {imageUrl && (
        <div className="relative h-64 w-full overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      )}
      <CardContent className="p-6 bg-gradient-to-b from-transparent to-white/5">
        <h3 className="text-xl font-semibold mb-4 text-primary dark:text-white group-hover:text-secondary transition-colors duration-300">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;