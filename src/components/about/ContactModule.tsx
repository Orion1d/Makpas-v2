
import { useLanguage } from "@/contexts/LanguageContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { MapPin, Phone, Printer, Mail, ExternalLink } from "lucide-react";

export const ContactModule = () => {
  const { language } = useLanguage();
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="max-w-5xl mx-auto"
    >
      <h2 className="text-2xl font-bold text-primary dark:text-white mb-10 text-center font-rubik">
        {language === 'tr' ? 'İletişim' : 'Contact'}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="p-6 bg-white/90 dark:bg-primary/90 shadow-md card-brushed-metal">
          <h3 className="text-xl font-bold mb-6 font-rubik border-b pb-2 flex items-center gap-2">
            <Phone className="text-safety-orange h-5 w-5" />
            {language === 'tr' ? 'İletişim Bilgileri' : 'Contact Information'}
          </h3>
          
          <div className="space-y-6">
            <div className="flex items-start gap-3">
              <MapPin className="text-safety-orange mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-medium mb-1">{language === 'tr' ? 'Adres' : 'Address'}</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Minareliçavuş Mah. Milas Sokak No:18/1 Nilüfer/Bursa
                </p>
                <a href="https://maps.app.goo.gl/fRdsqY1A3EndCywF7" target="_blank" rel="noopener noreferrer" className="text-safety-orange text-sm hover:underline inline-flex items-center gap-1 mt-2">
                  {language === 'tr' ? 'Haritada Gör' : 'View on Maps'}
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Phone className="text-safety-orange mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-medium mb-1">{language === 'tr' ? 'Telefon' : 'Phone'}</h4>
                <Button variant="link" className="p-0 h-auto text-primary dark:text-blue-300 font-normal" onClick={() => window.location.href = 'tel:+902244436836'}>
                  +90 224 443 68 36
                </Button>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Printer className="text-safety-orange mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-medium mb-1">Fax</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  +90 224 443 68 40
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Mail className="text-safety-orange mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-medium mb-1">Email</h4>
                <div className="space-y-1">
                  <Button variant="link" className="p-0 h-auto text-safety-orange font-normal text-base" onClick={() => window.location.href = 'mailto:makpas@makpas.com'}>
                    makpas@makpas.com
                  </Button>
                  <div className="flex flex-col">
                    <Button variant="link" className="p-0 h-auto text-primary dark:text-gray-300 font-normal text-sm" onClick={() => window.location.href = 'mailto:export@makpas.com'}>
                      export@makpas.com
                    </Button>
                    <Button variant="link" className="p-0 h-auto text-primary dark:text-gray-300 font-normal text-sm" onClick={() => window.location.href = 'mailto:import@makpas.com'}>
                      import@makpas.com
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
        
        <Card className="bg-white/90 dark:bg-primary/90 shadow-md overflow-hidden h-full">
          <div className="h-full w-full relative border-2 border-safety-orange rounded-lg overflow-hidden">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1126.1154351910589!2d28.943677623011393!3d40.239940825870605!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14ca11446a3f46d5%3A0x2b76598dc60f6156!2zTWFrcGHFnw!5e1!3m2!1str!2ses!4v1749550816203!5m2!1str!2ses" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Makpas Location"
              className="absolute inset-0"
            />
          </div>
        </Card>
      </div>
    </motion.div>
  );
};
