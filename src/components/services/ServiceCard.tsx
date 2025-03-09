
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

interface ServiceCardProps {
  title: string;
  description: string | null;
  imageUrl: string | null;
  index: number;
}

const ServiceCard = ({ title, description, imageUrl }: ServiceCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Card className="overflow-hidden group h-full relative bg-white dark:bg-gray-800/90 hover:shadow-lg transition-all duration-500 hover:border-l-[3px] hover:border-l-safety-orange">
        {imageUrl && (
          <div className="relative h-48 w-full overflow-hidden">
            <img
              src={imageUrl}
              alt={title}
              className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        )}
        <CardContent className="p-8 bg-gradient-to-b from-transparent to-white/5">
          <h3 className="text-2xl font-['Space_Grotesk'] font-semibold mb-4 text-industry-blue dark:text-white group-hover:text-safety-orange transition-colors duration-300">
            {title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-inter">
            {description}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ServiceCard;
