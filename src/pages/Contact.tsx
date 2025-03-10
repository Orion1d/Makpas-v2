import { useState } from "react";
import { Mail, Phone, MapPin, Printer, Send, MessageSquare, Clock, AlertTriangle, CheckCircle, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  const [focused, setFocused] = useState<string | null>(null);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const handleFocus = (name: string) => {
    setFocused(name);
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
  };
  const handleBlur = () => {
    setFocused(null);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Mark field as touched when changed
    if (!touched[name]) {
      setTouched(prev => ({
        ...prev,
        [name]: true
      }));
    }
  };
  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  const getFieldStatus = (field: string) => {
    if (!touched[field]) return null;
    switch (field) {
      case 'email':
        return formData.email && validateEmail(formData.email) ? 'valid' : 'invalid';
      case 'name':
      case 'message':
        return formData[field as keyof typeof formData].length > 2 ? 'valid' : 'invalid';
      case 'phone':
        return formData.phone.length > 0 ? 'valid' : null;
      default:
        return null;
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate all fields before submitting
    if (!formData.name || !formData.email || !validateEmail(formData.email) || !formData.message) {
      toast({
        title: t('validation_error') || "Validation Error",
        description: t('please_fill_required_fields') || "Please fill all required fields correctly.",
        variant: "destructive"
      });

      // Mark all fields as touched to show validation
      setTouched({
        name: true,
        email: true,
        phone: true,
        message: true
      });
      return;
    }
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      toast({
        title: t('message_sent') || "Message Sent!",
        description: t('we_will_contact_you') || "We'll contact you as soon as possible.",
        variant: "default"
      });

      // Reset form after delay
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: ""
        });
        setTouched({});
        setIsSuccess(false);
      }, 3000);
    }, 1500);
  };

  // Get current day to highlight in operating hours
  const getCurrentDay = () => {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    return days[new Date().getDay()];
  };
  const currentDay = getCurrentDay();
  return <div className="min-h-screen pt-20 pb-12 px-2 md:px-6 bg-pattern-waves bg-transition">
      <FloatingActionButton />
      <StickyQuoteBar />
      
      <div className="container mx-auto max-w-7xl space-y-12">
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
        
        <div className="grid md:grid-cols-5 gap-12">
          {/* Contact Form (60%) */}
          <motion.div id="contact-form" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5,
          delay: 0.2
        }} className="md:col-span-3 bg-white dark:bg-primary/90 p-6 md:p-8 rounded-lg shadow-md relative overflow-hidden">
            <div className="absolute inset-0 opacity-5 dark:opacity-10">
              <div className="absolute inset-0 bg-pattern-bubbles"></div>
            </div>
            <div className="relative z-10">
              <div className="flex items-center mb-8 gap-3">
                <MessageSquare className="w-7 h-7 text-safety-orange" />
                <h2 className="text-2xl md:text-3xl font-bold text-primary dark:text-white font-space-grotesk">
                  {t('send_us_message') || 'Send Us a Message'}
                </h2>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Name field with floating label */}
                <div className="relative">
                  <div className="relative border-b-2 border-gray-300 dark:border-gray-500 transition-colors duration-250 focus-within:border-safety-orange group">
                    <input id="name" name="name" value={formData.name} onChange={handleChange} onFocus={() => handleFocus('name')} onBlur={handleBlur} className="block w-full px-0 py-3 text-gray-900 dark:text-white bg-transparent appearance-none focus:outline-none peer" placeholder=" " required />
                    <label htmlFor="name" className={`absolute text-gray-500 duration-250 transform -translate-y-8 scale-75 top-3 origin-[0] 
                      ${focused === 'name' || formData.name ? '-translate-y-8 scale-75 text-sm text-safety-orange' : 'translate-y-0 scale-100'} 
                      peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                      peer-focus:-translate-y-8 peer-focus:scale-75 peer-focus:text-safety-orange`}>
                      {t('your_name') || 'Your Name'} *
                    </label>
                    
                    {getFieldStatus('name') === 'valid' && <CheckCircle className="absolute right-0 top-3 text-green-500 h-5 w-5" />}
                    {getFieldStatus('name') === 'invalid' && <X className="absolute right-0 top-3 text-red-500 h-5 w-5" />}
                  </div>
                  {getFieldStatus('name') === 'invalid' && touched.name && <p className="mt-1 text-sm text-red-500">{t('name_required') || 'Name is required (min 3 characters)'}</p>}
                </div>
                
                {/* Email field with floating label */}
                <div className="relative">
                  <div className="relative border-b-2 border-gray-300 dark:border-gray-500 transition-colors duration-250 focus-within:border-safety-orange group">
                    <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} onFocus={() => handleFocus('email')} onBlur={handleBlur} className="block w-full px-0 py-3 text-gray-900 dark:text-white bg-transparent appearance-none focus:outline-none peer" placeholder=" " required />
                    <label htmlFor="email" className={`absolute text-gray-500 duration-250 transform -translate-y-8 scale-75 top-3 origin-[0] 
                      ${focused === 'email' || formData.email ? '-translate-y-8 scale-75 text-sm text-safety-orange' : 'translate-y-0 scale-100'} 
                      peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                      peer-focus:-translate-y-8 peer-focus:scale-75 peer-focus:text-safety-orange`}>
                      {t('your_email') || 'Your Email'} *
                    </label>
                    
                    {getFieldStatus('email') === 'valid' && <CheckCircle className="absolute right-0 top-3 text-green-500 h-5 w-5" />}
                    {getFieldStatus('email') === 'invalid' && <X className="absolute right-0 top-3 text-red-500 h-5 w-5" />}
                  </div>
                  {getFieldStatus('email') === 'invalid' && touched.email && <p className="mt-1 text-sm text-red-500">{t('valid_email_required') || 'A valid email is required'}</p>}
                </div>
                
                {/* Phone field with floating label */}
                <div className="relative">
                  <div className="relative border-b-2 border-gray-300 dark:border-gray-500 transition-colors duration-250 focus-within:border-safety-orange group">
                    <input id="phone" name="phone" value={formData.phone} onChange={handleChange} onFocus={() => handleFocus('phone')} onBlur={handleBlur} className="block w-full px-0 py-3 text-gray-900 dark:text-white bg-transparent appearance-none focus:outline-none peer" placeholder=" " />
                    <label htmlFor="phone" className={`absolute text-gray-500 duration-250 transform -translate-y-8 scale-75 top-3 origin-[0] 
                      ${focused === 'phone' || formData.phone ? '-translate-y-8 scale-75 text-sm text-safety-orange' : 'translate-y-0 scale-100'} 
                      peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                      peer-focus:-translate-y-8 peer-focus:scale-75 peer-focus:text-safety-orange`}>
                      {t('your_phone') || 'Your Phone'}
                    </label>
                    
                    {getFieldStatus('phone') === 'valid' && <CheckCircle className="absolute right-0 top-3 text-green-500 h-5 w-5" />}
                  </div>
                </div>
                
                {/* Message field with floating label */}
                <div className="relative">
                  <div className="relative border-b-2 border-gray-300 dark:border-gray-500 transition-colors duration-250 focus-within:border-safety-orange group">
                    <textarea id="message" name="message" rows={5} value={formData.message} onChange={handleChange} onFocus={() => handleFocus('message')} onBlur={handleBlur} className="block w-full px-0 py-3 text-gray-900 dark:text-white bg-transparent appearance-none focus:outline-none peer resize-none" placeholder=" " required />
                    <label htmlFor="message" className={`absolute text-gray-500 duration-250 transform -translate-y-8 scale-75 top-3 origin-[0] 
                      ${focused === 'message' || formData.message ? '-translate-y-8 scale-75 text-sm text-safety-orange' : 'translate-y-0 scale-100'} 
                      peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                      peer-focus:-translate-y-8 peer-focus:scale-75 peer-focus:text-safety-orange`}>
                      {t('your_message') || 'Your Message'} *
                    </label>
                    
                    {getFieldStatus('message') === 'valid' && <CheckCircle className="absolute right-0 top-3 text-green-500 h-5 w-5" />}
                    {getFieldStatus('message') === 'invalid' && <X className="absolute right-0 top-3 text-red-500 h-5 w-5" />}
                  </div>
                  {getFieldStatus('message') === 'invalid' && touched.message && <p className="mt-1 text-sm text-red-500">{t('message_required') || 'Message is required (min 3 characters)'}</p>}
                </div>
                
                <Button type="submit" variant="accent" className="w-full mt-8 relative transition-all duration-250 bg-gradient-to-r from-safety-orange to-safety-orange/80 hover:to-safety-orange/90" disabled={isSubmitting || isSuccess}>
                  {isSubmitting ? <span className="flex items-center gap-2">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {t('sending') || 'Sending...'}
                    </span> : isSuccess ? <span className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      {t('message_sent') || 'Message Sent!'}
                    </span> : <span className="flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      {t('send_message') || 'Send Message'}
                    </span>}
                </Button>
              </form>
            </div>
          </motion.div>
          
          {/* Contact Info Cards (40%) */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5,
          delay: 0.4
        }} className="md:col-span-2 space-y-8">
            {/* Address Card */}
            <Card className="bg-white dark:bg-primary/90 shadow-md transition-transform duration-250 hover:scale-[1.02] focus-within:ring-3 focus-within:ring-safety-orange/30">
              <CardHeader>
                <CardTitle className="text-xl text-primary dark:text-white font-space-grotesk flex items-center gap-2">
                  <MapPin className="text-safety-orange h-5 w-5" />
                  {t('contact_address_title') || 'Our Address'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 dark:text-gray-300 font-inter leading-relaxed">
                  {t('contact_address')}
                </p>
                
                <div className="h-[1px] w-full bg-gray-300 dark:bg-gray-600 opacity-50 my-4"></div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Phone className="text-safety-orange flex-shrink-0 w-5 h-5" />
                    <p className="text-gray-600 dark:text-gray-300">{t('contact_phone')}</p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Printer className="text-safety-orange flex-shrink-0 w-5 h-5" />
                    <p className="text-gray-600 dark:text-gray-300">{t('contact_fax')}</p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Mail className="text-safety-orange flex-shrink-0 w-5 h-5" />
                    <a href="mailto:makpas@makpas.com" className="text-gray-600 dark:text-gray-300 hover:text-safety-orange dark:hover:text-safety-orange transition-colors">
                      {t('contact_email')}
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Operating Hours Card */}
            <Card className="bg-white dark:bg-primary/90 shadow-md transition-transform duration-250 hover:scale-[1.02] focus-within:ring-3 focus-within:ring-safety-orange/30">
              <CardHeader>
                <CardTitle className="text-xl text-primary dark:text-white font-space-grotesk flex items-center gap-2">
                  <Clock className="text-safety-orange h-5 w-5" />
                  {t('operating_hours') || 'Operating Hours'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  <div className={`py-2 ${currentDay === 'monday' ? 'text-safety-orange font-semibold' : 'text-gray-600 dark:text-gray-300'}`}>
                    {t('monday') || 'Monday'}
                  </div>
                  <div className={`py-2 ${currentDay === 'monday' ? 'text-safety-orange font-semibold' : 'text-gray-600 dark:text-gray-300'}`}>
                    9:00 - 17:00
                  </div>
                  
                  <div className={`py-2 ${currentDay === 'tuesday' ? 'text-safety-orange font-semibold' : 'text-gray-600 dark:text-gray-300'}`}>
                    {t('tuesday') || 'Tuesday'}
                  </div>
                  <div className={`py-2 ${currentDay === 'tuesday' ? 'text-safety-orange font-semibold' : 'text-gray-600 dark:text-gray-300'}`}>
                    9:00 - 17:00
                  </div>
                  
                  <div className={`py-2 ${currentDay === 'wednesday' ? 'text-safety-orange font-semibold' : 'text-gray-600 dark:text-gray-300'}`}>
                    {t('wednesday') || 'Wednesday'}
                  </div>
                  <div className={`py-2 ${currentDay === 'wednesday' ? 'text-safety-orange font-semibold' : 'text-gray-600 dark:text-gray-300'}`}>
                    9:00 - 17:00
                  </div>
                  
                  <div className={`py-2 ${currentDay === 'thursday' ? 'text-safety-orange font-semibold' : 'text-gray-600 dark:text-gray-300'}`}>
                    {t('thursday') || 'Thursday'}
                  </div>
                  <div className={`py-2 ${currentDay === 'thursday' ? 'text-safety-orange font-semibold' : 'text-gray-600 dark:text-gray-300'}`}>
                    9:00 - 17:00
                  </div>
                  
                  <div className={`py-2 ${currentDay === 'friday' ? 'text-safety-orange font-semibold' : 'text-gray-600 dark:text-gray-300'}`}>
                    {t('friday') || 'Friday'}
                  </div>
                  <div className={`py-2 ${currentDay === 'friday' ? 'text-safety-orange font-semibold' : 'text-gray-600 dark:text-gray-300'}`}>
                    9:00 - 17:00
                  </div>
                  
                  <div className={`py-2 ${currentDay === 'saturday' ? 'text-safety-orange font-semibold' : 'text-gray-600 dark:text-gray-300'}`}>
                    {t('saturday') || 'Saturday'}
                  </div>
                  <div className={`py-2 ${currentDay === 'saturday' ? 'text-safety-orange font-semibold' : 'text-gray-600 dark:text-gray-300'}`}>
                    {t('closed') || 'Closed'}
                  </div>
                  
                  <div className={`py-2 ${currentDay === 'sunday' ? 'text-safety-orange font-semibold' : 'text-gray-600 dark:text-gray-300'}`}>
                    {t('sunday') || 'Sunday'}
                  </div>
                  <div className={`py-2 ${currentDay === 'sunday' ? 'text-safety-orange font-semibold' : 'text-gray-600 dark:text-gray-300'}`}>
                    {t('closed') || 'Closed'}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Emergency Contact Card */}
            <Card className="bg-secondary shadow-md border-none transition-transform duration-250 hover:scale-[1.02]">
              
            </Card>
          </motion.div>
        </div>
        
        {/* Map Section */}
        <div className="bg-white dark:bg-primary/90 p-4 md:p-6 rounded-lg shadow-md py-[10px] relative overflow-hidden group border-2 border-gray-200 dark:border-gray-700 transition-all duration-250 hover:border-safety-orange hover:shadow-lg">
          <h2 className="text-2xl md:text-3xl font-bold text-primary dark:text-white mb-4 font-space-grotesk">
            {t('contact_our_location') || 'Our Location'}
          </h2>
          <div className="w-full relative aspect-video overflow-hidden rounded-lg">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1553.953241285284!2d28.943822548558284!3d40.239896931513556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14ca11446a3f46d5%3A0x2b76598dc60f6156!2zTWFrcGHFnw!5e1!3m2!1str!2ses!4v1732628839154!5m2!1str!2ses" width="100%" height="100%" style={{
            border: 0
          }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="rounded-lg"></iframe>
            
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-250 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <a href="https://www.google.com/maps?ll=40.239897,28.943823&z=17&t=h&hl=tr&gl=ES&mapclient=embed&cid=3140769231945303382" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-safety-orange text-white rounded-lg shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-250">
                {t('view_full_map') || 'View Full Map'}
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Emergency Contact Badge */}
      
    </div>;
};
export default Contact;