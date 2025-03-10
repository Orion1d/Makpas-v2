import { useState } from "react";
import { Mail, Phone, MapPin, Printer, Send, MessageSquare } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FloatingActionButton from "@/components/ctas/FloatingActionButton";
import StickyQuoteBar from "@/components/ctas/StickyQuoteBar";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
const Contact = () => {
  const {
    t
  } = useLanguage();
  const {
    toast
  } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: t('message_sent') || "Message Sent!",
        description: t('we_will_contact_you') || "We'll contact you as soon as possible.",
        variant: "default"
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: ""
      });
    }, 1500);
  };
  return <div className="min-h-screen pt-20 pb-12 px-2 md:px-6 bg-pattern-waves bg-transition">
      <FloatingActionButton />
      <StickyQuoteBar />
      
      <div className="container mx-auto max-w-7xl space-y-8">
        <div className="bg-white dark:bg-primary/90 p-4 md:p-6 rounded-lg shadow-md py-[10px]">
          <h2 className="text-2xl md:text-3xl font-bold text-primary dark:text-white mb-4">{t('contact_our_location')}</h2>
          <div className="w-full">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1553.953241285284!2d28.943822548558284!3d40.239896931513556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14ca11446a3f46d5%3A0x2b76598dc60f6156!2zTWFrcGHFnw!5e1!3m2!1str!2ses!4v1732628839154!5m2!1str!2ses" width="100%" height="500" style={{
            border: 0
          }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="rounded-lg"></iframe>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-primary/90 p-6 md:p-8 rounded-lg shadow-md relative overflow-hidden">
            <div className="absolute inset-0 opacity-5 dark:opacity-10">
              <div className="absolute inset-0 bg-pattern-triangles"></div>
            </div>
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold text-primary dark:text-white mb-6">{t('contact_company_info')}</h2>
              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <MapPin className="text-safety-orange flex-shrink-0 w-6 h-6" />
                  <p className="dark:text-gray-100 text-lg">{t('contact_address')}</p>
                </div>
                <div className="flex items-center gap-6">
                  <Phone className="text-safety-orange flex-shrink-0 w-6 h-6" />
                  <p className="dark:text-gray-100 text-lg">{t('contact_phone')}</p>
                </div>
                <div className="flex items-center gap-6">
                  <Printer className="text-safety-orange flex-shrink-0 w-6 h-6" />
                  <p className="dark:text-gray-100 text-lg">{t('contact_fax')}</p>
                </div>
                <div className="flex items-center gap-6">
                  <Mail className="text-safety-orange flex-shrink-0 w-6 h-6" />
                  <a href="mailto:makpas@makpas.com" className="hover:text-safety-orange dark:text-gray-100 dark:hover:text-safety-orange transition-colors text-lg">
                    {t('contact_email')}
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <motion.div id="contact-form" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5
        }} className="bg-white dark:bg-primary/90 p-6 md:p-8 rounded-lg shadow-md relative overflow-hidden">
            <div className="absolute inset-0 opacity-5 dark:opacity-10">
              <div className="absolute inset-0 bg-pattern-bubbles"></div>
            </div>
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold text-primary dark:text-white mb-6 flex items-center gap-3">
                <MessageSquare className="w-7 h-7 text-safety-orange" />
                {t('contact_us') || 'Contact Us'}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    {t('your_name') || 'Your Name'}
                  </label>
                  <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder={t('enter_your_name') || 'Enter your name'} required />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    {t('your_email') || 'Your Email'}
                  </label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder={t('enter_your_email') || 'Enter your email'} required />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    {t('your_phone') || 'Your Phone'}
                  </label>
                  <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder={t('enter_your_phone') || 'Enter your phone number'} />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    {t('your_message') || 'Your Message'}
                  </label>
                  <textarea id="message" name="message" rows={5} value={formData.message} onChange={handleChange} className="w-full rounded-md border border-gray-500 dark:border-gray-400 bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-safety-orange focus-visible:border-safety-orange focus-visible:ring-offset-1" placeholder={t('enter_your_message') || 'Enter your message here...'} required />
                </div>
                
                <Button type="submit" variant="accent" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? <span className="flex items-center gap-2">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {t('sending') || 'Sending...'}
                    </span> : <span className="flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      {t('send_message') || 'Send Message'}
                    </span>}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>;
};
export default Contact;