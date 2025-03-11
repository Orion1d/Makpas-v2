
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Globe, Ship, Award } from "lucide-react";
import { useState } from "react";

interface CoreValueCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const CoreValueCard = ({ icon, title, description, delay }: CoreValueCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card 
        className={`h-full p-6 bg-white/90 dark:bg-primary/90 transition-all duration-300 ${
          isHovered ? 'shadow-lg transform -translate-y-1' : 'shadow'
        }`}
      >
        <CardContent className="p-0 h-full flex flex-col items-center text-center">
          <div className="text-[#1EAEDB] mb-4 text-4xl">
            {icon}
          </div>
          <h3 className="font-bold text-xl mb-3 font-rubik">{title}</h3>
          <p className="text-gray-600 dark:text-gray-300">{description}</p>
          
          <div className={`mt-4 h-0.5 bg-[#1EAEDB] transition-all duration-300 ${
            isHovered ? 'w-1/2' : 'w-0'
          }`}></div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export const MinimalCoreValues = () => {
  const { language } = useLanguage();
  
  const coreValues = [
    {
      icon: <Globe />,
      title: language === 'tr' ? 'Global Tedarik' : 'Global Supply',
      description: language === 'tr' 
        ? "Amerika'dan Uzak Doğu'ya uluslararası ithalat/ihracat" 
        : "International import/export from America to the Far East",
    },
    {
      icon: <Ship />,
      title: language === 'tr' ? 'Lojistik Destek' : 'Logistics Support',
      description: language === 'tr'
        ? "7/24 lojistik çözümler ve teknik destek"
        : "24/7 logistics solutions and technical support",
    },
    {
      icon: <Award />,
      title: language === 'tr' ? 'Sürekli Gelişim' : 'Continuous Improvement',
      description: language === 'tr'
        ? "Müşteri talepleri doğrultusunda yeni ürün grupları"
        : "New product groups in line with customer demands",
    },
  ];
  
  return (
    <div className="max-w-6xl mx-auto mb-20">
      <h2 className="text-2xl font-bold text-primary dark:text-white mb-10 text-center font-rubik">
        {language === 'tr' ? 'Değerlerimiz' : 'Our Values'}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
