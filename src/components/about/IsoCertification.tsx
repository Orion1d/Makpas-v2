
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Award } from "lucide-react";

interface Certificate {
  name: string;
  photo_url: string;
}

interface IsoCertificationProps {
  isoCertificate?: Certificate;
}

export const IsoCertification = ({ isoCertificate }: IsoCertificationProps) => {
  const { language } = useLanguage();
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto mb-20"
    >
      <h2 className="text-2xl font-bold text-primary dark:text-white mb-10 text-center font-rubik">
        {language === 'tr' ? 'Teknik Mükemmellik' : 'Technical Excellence'}
      </h2>
      
      <div className="bg-white/90 dark:bg-primary/90 p-8 rounded-lg border-2 border-[#FF6B35] transition-all duration-300 hover:shadow-lg group">
        <div className="flex flex-col items-center">
          {isoCertificate?.photo_url ? (
            <div className="w-64 h-64 md:w-80 md:h-80 mb-6 overflow-hidden flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <img 
                src={isoCertificate.photo_url} 
                alt="ISO Certificate" 
                className="max-w-full max-h-full object-contain"
              />
            </div>
          ) : (
            <div className="w-64 h-64 md:w-80 md:h-80 mb-6 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center text-[#FF6B35]">
              <Award size={96} />
            </div>
          )}
          
          <h3 className="text-xl font-bold mb-2 font-rubik">
            {language === 'tr' ? 'Kalite Yönetim Sistemleri Belgesi' : 'Quality Management Systems Certificate'}
          </h3>
          
          <p className="text-gray-600 dark:text-gray-300 text-center">
            {language === 'tr' 
              ? 'ISO sertifikasyonu ile güvence altına alınmış kalite standartları' 
              : 'Quality standards secured with ISO certification'}
          </p>
        </div>
      </div>
    </motion.div>
  );
};
