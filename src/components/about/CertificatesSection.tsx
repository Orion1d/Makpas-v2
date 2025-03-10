
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import ImageLightbox from "./ImageLightbox";
import { motion } from "framer-motion";
import { Award, FileCheck, Shield } from "lucide-react";

interface Certificate {
  name: string;
  photo_url: string;
}

interface CertificatesSectionProps {
  isoCertificate?: Certificate;
}

const CertificateCard = ({ 
  icon, 
  title, 
  imageUrl, 
  delay 
}: { 
  icon: React.ReactNode;
  title: string;
  imageUrl: string;
  delay: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
    >
      <Card className="group p-6 bg-white/90 dark:bg-primary/90 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <ImageLightbox 
          imageUrl={imageUrl} 
          alt={title}
        >
          <div className="aspect-[4/3] relative overflow-hidden rounded-lg">
            <div className="absolute inset-0 flex items-center justify-center text-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
              {icon}
            </div>
            <img
              src={imageUrl}
              alt={title}
              className="absolute inset-0 w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-300 group-hover:opacity-90"
              loading="lazy"
            />
          </div>
        </ImageLightbox>
        <p className="mt-4 text-center text-gray-700 dark:text-gray-100 font-medium">
          {title}
        </p>
      </Card>
    </motion.div>
  );
};

export const CertificatesSection = ({ isoCertificate }: CertificatesSectionProps) => {
  const { t } = useLanguage();
  
  // In a real implementation, this would come from Supabase
  // For demonstration, we'll use the ISO certificate multiple times with different titles
  const certificates = [
    {
      title: "ISO 9001:2015",
      icon: <FileCheck size={48} className="drop-shadow-md" />,
    },
    {
      title: "ISO 14001:2015",
      icon: <Shield size={48} className="drop-shadow-md" />,
    },
    {
      title: "Industry Excellence Award",
      icon: <Award size={48} className="drop-shadow-md" />,
    }
  ];

  if (!isoCertificate?.photo_url) {
    return null;
  }

  return (
    <div className="mt-20">
      <h2 className="text-3xl font-bold text-primary dark:text-white mb-12 text-center font-rubik">
        {t('certificates_title')}
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {certificates.map((cert, index) => (
          <CertificateCard
            key={index}
            icon={cert.icon}
            title={cert.title}
            imageUrl={isoCertificate.photo_url}
            delay={index}
          />
        ))}
      </div>
    </div>
  );
};
