import { Mail, Phone, MapPin, Printer } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Contact = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="container mx-auto max-w-7xl space-y-12">
        <div className="bg-white dark:bg-primary/90 p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-primary dark:text-white mb-6">{t('contact_our_location')}</h2>
          <div className="w-full">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1553.953241285284!2d28.943822548558284!3d40.239896931513556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14ca11446a3f46d5%3A0x2b76598dc60f6156!2zTWFrcGHFnw!5e1!3m2!1str!2ses!4v1732628839154!5m2!1str!2ses"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg"
            ></iframe>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="bg-white dark:bg-primary/90 p-8 rounded-lg shadow-md max-w-xl w-full">
            <h2 className="text-2xl font-bold text-primary dark:text-white mb-6">{t('contact_company_info')}</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="text-primary dark:text-secondary mt-1 flex-shrink-0" />
                <p className="dark:text-gray-100">{t('contact_address')}</p>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="text-primary dark:text-secondary flex-shrink-0" />
                <p className="dark:text-gray-100">{t('contact_phone')}</p>
              </div>
              <div className="flex items-center gap-4">
                <Printer className="text-primary dark:text-secondary flex-shrink-0" />
                <p className="dark:text-gray-100">{t('contact_fax')}</p>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="text-primary dark:text-secondary flex-shrink-0" />
                <a href="mailto:makpas@makpas.com" className="hover:text-primary dark:text-gray-100 dark:hover:text-secondary transition-colors">
                  {t('contact_email')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;