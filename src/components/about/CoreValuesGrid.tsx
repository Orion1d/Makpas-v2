
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { Shield, Tool, Clock, Award, BarChart, Settings } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

interface CoreValueCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const CoreValueCard = ({ icon, title, description, delay }: CoreValueCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      className="h-64 perspective"
    >
      <div 
        className={`h-full w-full relative transform-style-3d transition-transform duration-500 cursor-pointer ${isFlipped ? 'rotate-y-180' : ''}`}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front face */}
        <Card className="absolute inset-0 backface-hidden flex flex-col items-center justify-center p-6 bg-white/90 dark:bg-primary/90 overflow-hidden group">
          <div className="text-secondary mb-4 transition-transform duration-300 group-hover:scale-110">
            {icon}
          </div>
          <CardTitle className="text-xl font-bold mb-2 text-center font-space-grotesk">
            {title}
          </CardTitle>
          <div className="h-1 w-0 bg-secondary transition-all duration-300 group-hover:w-1/3"></div>
          <div className="absolute inset-0 bg-pattern-circles opacity-10 -z-10"></div>
        </Card>
        
        {/* Back face */}
        <Card className="absolute inset-0 backface-hidden rotate-y-180 p-6 bg-white/90 dark:bg-primary/90 overflow-hidden">
          <CardContent className="h-full flex flex-col items-center justify-center p-0">
            <p className="text-gray-700 dark:text-gray-200 text-center leading-relaxed">
              {description}
            </p>
            <div className="mt-4">
              <div className="h-1 w-1/3 bg-secondary mx-auto"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export const CoreValuesGrid = () => {
  const { t } = useLanguage();
  
  const coreValues = [
    {
      icon: <Shield size={48} />,
      title: t('quality_assurance') || 'Quality Assurance',
      description: t('quality_description') || 'We maintain strict quality control processes to ensure every product meets international standards and specifications.',
    },
    {
      icon: <Tool size={48} />,
      title: t('precision_engineering') || 'Precision Engineering',
      description: t('precision_description') || 'Our advanced CNC machinery delivers components with exceptional accuracy and tight tolerances for critical applications.',
    },
    {
      icon: <Clock size={48} />,
      title: t('timely_delivery') || 'Timely Delivery',
      description: t('delivery_description') || 'We understand time-sensitivity in manufacturing and commit to reliable on-time delivery for all orders.',
    },
    {
      icon: <Award size={48} />,
      title: t('certified_processes') || 'Certified Processes',
      description: t('certification_description') || 'All our manufacturing processes are ISO certified, ensuring consistent quality and regulatory compliance.',
    },
    {
      icon: <BarChart size={48} />,
      title: t('continuous_improvement') || 'Continuous Improvement',
      description: t('improvement_description') || 'We constantly review and enhance our operations to increase efficiency and product quality.',
    },
    {
      icon: <Settings size={48} />,
      title: t('technical_expertise') || 'Technical Expertise',
      description: t('expertise_description') || 'Our skilled team brings decades of experience in industrial manufacturing and specialized technical knowledge.',
    },
  ];
  
  return (
    <div className="max-w-7xl mx-auto mb-24">
      <h2 className="text-3xl font-bold text-primary dark:text-white mb-8 text-center font-rubik">
        {t('core_values') || 'Core Values'}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {coreValues.map((value, index) => (
          <CoreValueCard
            key={index}
            icon={value.icon}
            title={value.title}
            description={value.description}
            delay={index}
          />
        ))}
      </div>
    </div>
  );
};
