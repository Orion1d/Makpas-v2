import { Card } from "@/components/ui/card";

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
    <Card className="p-8 bg-white/90 dark:bg-primary/80 shadow-xl hover:shadow-2xl transition-shadow duration-300">
      <ul className="space-y-6">
        {sentences.map((sentence, index) => (
          <li key={index} className="flex items-start gap-4">
            <span className="mt-2.5 block w-2 h-2 rounded-full bg-primary dark:bg-secondary flex-shrink-0" />
            <p className="text-gray-800 dark:text-gray-100 leading-relaxed text-lg font-medium tracking-wide">
              {sentence}
            </p>
          </li>
        ))}
      </ul>
    </Card>
  );
};