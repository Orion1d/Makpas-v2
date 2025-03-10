
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Award, Cpu, Users } from 'lucide-react';

interface StatItemProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  delay: number;
}

const StatItem = ({ icon, value, label, delay }: StatItemProps) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const duration = 2000; // 2 seconds animation
    const intervalTime = duration / value;
    
    let timer: NodeJS.Timeout;
    
    // Start animation after delay
    const startTimer = setTimeout(() => {
      timer = setInterval(() => {
        setCount(prevCount => {
          if (prevCount >= value) {
            clearInterval(timer);
            return value;
          }
          return prevCount + 1;
        });
      }, intervalTime);
    }, delay);
    
    return () => {
      clearTimeout(startTimer);
      clearInterval(timer);
    };
  }, [value, delay]);
  
  return (
    <motion.div 
      className="bg-white/10 backdrop-blur-md p-6 rounded-lg flex flex-col items-center"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: delay / 1000 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className="text-secondary mb-3">
        {icon}
      </div>
      <div className="text-4xl font-bold text-white mb-1 font-space-grotesk">
        {count}+
      </div>
      <div className="text-white/80 text-center font-medium">
        {label}
      </div>
    </motion.div>
  );
};

export const StatsCounter = () => {
  const { t } = useLanguage();
  
  const stats = [
    { 
      icon: <Award size={32} />, 
      value: 25, 
      label: t('years_experience') || 'Years Experience',
      delay: 300 
    },
    { 
      icon: <Cpu size={32} />, 
      value: 50, 
      label: t('machines_operated') || 'Machines Operated',
      delay: 600 
    },
    { 
      icon: <Users size={32} />, 
      value: 100, 
      label: t('certified_specialists') || 'Certified Specialists',
      delay: 900 
    },
  ];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
      {stats.map((stat, index) => (
        <StatItem 
          key={index}
          icon={stat.icon}
          value={stat.value}
          label={stat.label}
          delay={stat.delay}
        />
      ))}
    </div>
  );
};
