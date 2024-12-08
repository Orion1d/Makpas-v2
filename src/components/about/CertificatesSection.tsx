import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

interface Certificate {
  name: string;
  photo_url: string;
}

interface CertificatesSectionProps {
  isoCertificate?: Certificate;
}

export const CertificatesSection = ({ isoCertificate }: CertificatesSectionProps) => {
  const { t } = useLanguage();

  return (
    <div className="mt-20">
      <h2 className="text-2xl font-bold text-primary dark:text-white mb-8 text-center">
        {t('certificates_title')}
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {isoCertificate?.photo_url && (
          <Card className="group p-6 bg-white/90 dark:bg-primary/80 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="aspect-[4/3] relative overflow-hidden rounded-lg">
              <img
                src={isoCertificate.photo_url}
                alt="ISO Certificate"
                className="absolute inset-0 w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>
            <p className="mt-4 text-center text-gray-700 dark:text-gray-100 font-medium">
              ISO Certificate
            </p>
          </Card>
        )}
        
        <Card className="p-6 bg-white/80 dark:bg-primary/70 border-dashed border-2 border-gray-300 dark:border-gray-500 flex flex-col items-center justify-center aspect-[4/3]">
          <div className="text-4xl text-gray-400 dark:text-gray-300 mb-4">+</div>
          <p className="text-gray-500 dark:text-gray-300 text-center font-medium">
            Future Certificate
          </p>
        </Card>
        
        <Card className="p-6 bg-white/80 dark:bg-primary/70 border-dashed border-2 border-gray-300 dark:border-gray-500 flex flex-col items-center justify-center aspect-[4/3]">
          <div className="text-4xl text-gray-400 dark:text-gray-300 mb-4">+</div>
          <p className="text-gray-500 dark:text-gray-300 text-center font-medium">
            Future Certificate
          </p>
        </Card>
      </div>
    </div>
  );
};