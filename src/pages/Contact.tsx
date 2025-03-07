
import { Mail, Phone, MapPin, Printer } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Contact = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen pt-20 pb-12 px-2 md:px-6 bg-pattern-waves bg-transition">
      <div className="container mx-auto max-w-7xl space-y-8">
        <div className="bg-white dark:bg-primary/90 p-4 md:p-6 rounded-lg shadow-md">
          <h2 className="text-2xl md:text-3xl font-bold text-primary dark:text-white mb-4">{t('contact_our_location')}</h2>
          <div className="w-full">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1553.953241285284!2d28.943822548558284!3d40.239896931513556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14ca11446a3f46d5%3A0x2b76598dc60f6156!2zTWFrcGHFnw!5e1!3m2!1str!2ses!4v1732628839154!5m2!1str!2ses"
              width="100%"
              height="500"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg"
            ></iframe>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="bg-white dark:bg-primary/90 p-6 md:p-8 rounded-lg shadow-md max-w-2xl w-full relative overflow-hidden">
            <div className="absolute inset-0 opacity-5 dark:opacity-10">
              <div className="absolute inset-0 bg-pattern-triangles"></div>
            </div>
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold text-primary dark:text-white mb-6">{t('contact_company_info')}</h2>
              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <MapPin className="text-primary dark:text-secondary mt-1 flex-shrink-0 w-6 h-6" />
                  <p className="dark:text-gray-100 text-lg">{t('contact_address')}</p>
                </div>
                <div className="flex items-center gap-6">
                  <Phone className="text-primary dark:text-secondary flex-shrink-0 w-6 h-6" />
                  <p className="dark:text-gray-100 text-lg">{t('contact_phone')}</p>
                </div>
                <div className="flex items-center gap-6">
                  <Printer className="text-primary dark:text-secondary flex-shrink-0 w-6 h-6" />
                  <p className="dark:text-gray-100 text-lg">{t('contact_fax')}</p>
                </div>
                <div className="flex items-center gap-6">
                  <Mail className="text-primary dark:text-secondary flex-shrink-0 w-6 h-6" />
                  <a 
                    href="mailto:makpas@makpas.com" 
                    className="hover:text-primary dark:text-gray-100 dark:hover:text-secondary transition-colors text-lg"
                  >
                    {t('contact_email')}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
