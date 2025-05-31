
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

interface AboutContentProps {
  sentences: string[];
}

export const AboutContent = ({ sentences }: AboutContentProps) => {
  if (sentences.length === 0) {
    return (
      <Card className="p-6 bg-white/95 dark:bg-primary/90">
        <p className="text-gray-700 dark:text-gray-100">Loading content...</p>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <ul className="space-y-6">
        {sentences.map((sentence, index) => (
          <motion.li 
            key={index} 
            className="flex items-start gap-4"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <span className="mt-2.5 block w-2 h-2 rounded-full bg-secondary flex-shrink-0" />
            <p className="text-gray-800 dark:text-gray-100 leading-relaxed text-lg font-medium tracking-wide font-inter">
              {sentence}
            </p>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};
