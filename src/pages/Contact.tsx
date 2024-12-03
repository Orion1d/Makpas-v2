import { Mail, Phone, MapPin, Printer } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Contact = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="bg-white p-8 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-bold text-primary mb-6">{t('contact_our_location')}</h2>
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
          <div className="bg-white p-8 rounded-lg shadow-md max-w-xl w-full">
            <h2 className="text-2xl font-bold text-primary mb-6">{t('contact_company_info')}</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="text-primary mt-1" />
                <p>{t('contact_address')}</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-primary" />
                <p>{t('contact_phone')}</p>
              </div>
              <div className="flex items-center gap-3">
                <Printer className="text-primary" />
                <p>{t('contact_fax')}</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="text-primary" />
                <a href="mailto:makpas@makpas.com" className="hover:text-primary">{t('contact_email')}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;