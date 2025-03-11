import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Award, Cpu, Factory, Medal, Target } from "lucide-react";

interface TimelineItemProps {
  year: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  isLeft?: boolean;
  delay: number;
}

const TimelineItem = ({ year, title, description, icon, isLeft = false, delay }: TimelineItemProps) => {
  const contentClasses = isLeft 
    ? "md:mr-auto md:text-right md:items-end" 
    : "md:ml-auto md:text-left md:items-start";
    
  const iconPositionClasses = isLeft
    ? "right-0 md:translate-x-1/2"
    : "left-0 md:-translate-x-1/2";
    
  return (
    <motion.div 
      className={`relative py-8 md:w-1/2 ${isLeft ? 'md:pl-0 md:pr-16' : 'md:pr-0 md:pl-16'}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
    >
      <div className={`absolute top-8 ${iconPositionClasses} z-10 bg-secondary text-white rounded-full p-2.5 shadow-md`}>
        {icon}
      </div>
      
      <div className={`flex flex-col bg-white/90 dark:bg-primary/90 p-6 rounded-lg shadow-md backdrop-blur-sm ${contentClasses}`}>
        <span className="text-secondary font-bold text-xl mb-2 font-space-grotesk">{year}</span>
        <h3 className="font-bold text-primary dark:text-white text-lg mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm">{description}</p>
      </div>
    </motion.div>
  );
};

export const TimelineSection = () => {
  const { t } = useLanguage();
  
  const timelineEvents = [
    {
      year: '1998',
      title: t('company_founded') || 'Company Founded',
      description: t('founded_description') || 'Established as a small manufacturing workshop with a vision for precision engineering.',
      icon: <Factory size={20} />,
      isLeft: true,
    },
    {
      year: '2005',
      title: t('first_cnc_machine') || 'First CNC Machine',
      description: t('cnc_description') || 'Upgraded to computer numerical control technology to enhance precision and capabilities.',
      icon: <Cpu size={20} />,
      isLeft: false,
    },
    {
      year: '2010',
      title: t('iso_certification') || 'ISO Certification',
      description: t('iso_description') || 'Achieved ISO 9001 certification for quality management systems.',
      icon: <Medal size={20} />,
      isLeft: true,
    },
    {
      year: '2015',
      title: t('expanded_production') || 'Expanded Production',
      description: t('expansion_description') || 'Moved to a larger facility and doubled production capacity with new equipment.',
      icon: <Factory size={20} />,
      isLeft: false,
    },
    {
      year: '2020',
      title: t('excellence_award') || 'Excellence Award',
      description: t('award_description') || 'Received industry recognition for outstanding manufacturing quality and innovation.',
      icon: <Award size={20} />,
      isLeft: true,
    },
    {
      year: '2023',
      title: t('international_presence') || 'International Presence',
      description: t('international_description') || 'Expanded operations to serve customers globally with dedicated export department.',
      icon: <Target size={20} />,
      isLeft: false,
    },
  ];
  
  return (
    <div className="max-w-7xl mx-auto mb-24">
      <h2 className="text-3xl font-bold text-primary dark:text-white mb-12 text-center font-rubik">
        {t('our_journey') || 'Our Journey'}
      </h2>
      
      <div className="relative">
        {/* Center Line - Hidden on Mobile */}
        <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-0.5 bg-gray-300 dark:bg-gray-700 -translate-x-1/2"></div>
        
        <div className="flex flex-wrap">
          {timelineEvents.map((event, index) => (
            <TimelineItem
              key={index}
              year={event.year}
              title={event.title}
              description={event.description}
              icon={event.icon}
              isLeft={event.isLeft}
              delay={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
