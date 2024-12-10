import { Mail, Phone, MapPin, Printer } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Contact = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 md:px-6 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto max-w-7xl space-y-12">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-primary dark:text-white mb-6 tracking-tight">
            {t('contact_us')}
          </h2>
          <div className="w-24 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            {t('contact_subtitle')}
          </p>
        </div>

        <div className="bg-white/90 dark:bg-primary/90 p-8 md:p-10 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-500 backdrop-blur-sm">
          <h2 className="text-2xl md:text-3xl font-bold text-primary dark:text-white mb-8">{t('contact_our_location')}</h2>
          <div className="w-full overflow-hidden rounded-lg shadow-lg">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1553.953241285284!2d28.943822548558284!3d40.239896931513556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14ca11446a3f46d5%3A0x2b76598dc60f6156!2zTWFrcGHFnw!5e1!3m2!1str!2ses!4v1732628839154!5m2!1str!2ses"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg transform hover:scale-[1.01] transition-transform duration-500"
            ></iframe>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="bg-white/90 dark:bg-primary/90 p-8 md:p-10 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-500 backdrop-blur-sm max-w-2xl w-full">
            <h2 className="text-2xl md:text-3xl font-bold text-primary dark:text-white mb-8">{t('contact_company_info')}</h2>
            <div className="space-y-8">
              <div className="flex items-start gap-6 group">
                <MapPin className="text-primary dark:text-secondary mt-1 flex-shrink-0 w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                <p className="dark:text-gray-100 text-lg group-hover:text-primary dark:group-hover:text-secondary transition-colors duration-300">
                  {t('contact_address')}
                </p>
              </div>
              <div className="flex items-center gap-6 group">
                <Phone className="text-primary dark:text-secondary flex-shrink-0 w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                <p className="dark:text-gray-100 text-lg group-hover:text-primary dark:group-hover:text-secondary transition-colors duration-300">
                  {t('contact_phone')}
                </p>
              </div>
              <div className="flex items-center gap-6 group">
                <Printer className="text-primary dark:text-secondary flex-shrink-0 w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                <p className="dark:text-gray-100 text-lg group-hover:text-primary dark:group-hover:text-secondary transition-colors duration-300">
                  {t('contact_fax')}
                </p>
              </div>
              <div className="flex items-center gap-6 group">
                <Mail className="text-primary dark:text-secondary flex-shrink-0 w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                <a 
                  href="mailto:makpas@makpas.com" 
                  className="hover:text-primary dark:text-gray-100 dark:hover:text-secondary transition-colors text-lg group-hover:text-primary dark:group-hover:text-secondary transition-colors duration-300"
                >
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