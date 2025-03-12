import { MapPin, Phone, Printer, Mail, Factory } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { ContactInfoCard } from "@/components/contact/ContactInfoCard";
import { OperatingHoursCard } from "@/components/contact/OperatingHoursCard";
import { MapCard } from "@/components/contact/MapCard";
import StickyQuoteBar from "@/components/ctas/StickyQuoteBar";
import { motion } from "framer-motion";
const Contact = () => {
  const {
    t
  } = useLanguage();
  return <div className="min-h-[90vh] pt-20 pb-12 px-4 bg-pattern-waves section-bg-pattern py-[45px] md:px-[25px]">
      <StickyQuoteBar />
      
      <div className="container mx-auto max-w-7xl space-y-16">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.5
      }} className="text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-bold text-primary dark:text-white font-space-grotesk mb-4">
            {t('contact_us') || 'Contact Us'}
          </h1>
        </motion.div>
        
        {/* Main content section with 50/50 split on desktop */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          {/* Left side: Contact Info */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5,
          delay: 0.2
        }} className="space-y-8">
            {/* Address Card */}
            <ContactInfoCard title={t('our_address') || 'Our Address'} icon={<MapPin className="text-safety-orange h-6 w-6" />}>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Factory className="text-[#0A1A2F] mt-1 flex-shrink-0 h-5 w-5" />
                  <p className="text-gray-600 dark:text-gray-300">
                    Minareliçavuş Mah. Milas Sokak No:18/1 <br />
                    Nilüfer/Bursa/TÜRKİYE
                  </p>
                </div>
                
                <a href="https://maps.google.com/?q=40.199428,29.052986" target="_blank" rel="noopener noreferrer" className="text-safety-orange hover:underline inline-flex items-center gap-1 transition-all duration-200 hover:text-safety-orange/80">
                  {t('view_on_google_maps') || 'View on Google Maps'}
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                </a>
              </div>
            </ContactInfoCard>
            
            {/* Communication Card */}
            <ContactInfoCard title={t('contact_information') || 'Contact Information'} icon={<Phone className="text-safety-orange h-6 w-6" />}>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Phone className="text-[#0A1A2F] mt-1 flex-shrink-0 h-5 w-5" />
                  <div>
                    <Button variant="link" className="p-0 h-auto text-safety-orange font-normal text-lg" onClick={() => window.location.href = 'tel:+902244436836'}>
                      +90 224 443 68 36
                    </Button>
                    <div className="flex items-center gap-2 mt-1">
                      <Printer className="text-gray-500 h-4 w-4" />
                      <span className="text-gray-500 text-sm">+90 224 443 68 40</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Mail className="text-[#0A1A2F] mt-1 flex-shrink-0 h-5 w-5" />
                  <div className="space-y-2">
                    <Button variant="link" className="p-0 h-auto text-safety-orange font-normal text-lg block" onClick={() => window.location.href = 'mailto:makpas@makpas.com'}>
                      makpas@makpas.com
                    </Button>
                    <div className="space-y-1">
                      <Button variant="link" className="p-0 h-auto text-primary dark:text-gray-300 font-normal text-sm block" onClick={() => window.location.href = 'mailto:export@makpas.com'}>
                        export@makpas.com
                      </Button>
                      <Button variant="link" className="p-0 h-auto text-primary dark:text-gray-300 font-normal text-sm block" onClick={() => window.location.href = 'mailto:import@makpas.com'}>
                        import@makpas.com
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </ContactInfoCard>
            
            {/* Operating Hours Card */}
            <OperatingHoursCard />
          </motion.div>
          
          {/* Right side: Map */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5,
          delay: 0.4
        }}>
            <MapCard />
          </motion.div>
        </div>
      </div>
    </div>;
};
export default Contact;