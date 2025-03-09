
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import ServiceCard from "./services/ServiceCard";
import ServicesSkeleton from "./services/ServicesSkeleton";
import { motion } from "framer-motion";
import { Wrench } from "lucide-react";

const ServicesShowcase = () => {
  const { t, language } = useLanguage();
  
  const { data: services = [], isLoading } = useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('order_index');
      
      if (error) throw error;
      return data || [];
    }
  });
  
  if (isLoading) {
    return <ServicesSkeleton />;
  }
  
  return (
    <section className="relative py-24 bg-light-gray dark:bg-industry-blue transition-all duration-700 ease-in-out">
      {/* Diagonal Divider - Top */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
        <svg 
          className="relative block w-full h-12 text-white dark:text-gray-900"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path 
            d="M1200 120L0 16.48V0h1200v120z" 
            className="fill-current"
          ></path>
        </svg>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center gap-3 bg-white/30 dark:bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full mb-6"
          >
            <Wrench className="w-5 h-5 text-safety-orange" />
            <span className="text-industry-blue dark:text-white font-medium">
              {t('services.subtitle') || "Industrial Solutions"}
            </span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="font-['Rubik'] font-bold text-4xl md:text-5xl text-industry-blue dark:text-white mb-6"
          >
            {t('services.title') || "Our Manufacturing Expertise"}
          </motion.h2>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="mx-auto max-w-3xl"
          >
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              {t('services.description') || "Delivering precision metal solutions with advanced technology and decades of expertise."}
            </p>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <motion.div 
              key={service.id} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <ServiceCard 
                title={language === 'tr' ? service.title_tr || service.title : service.title} 
                description={language === 'tr' ? service.description_tr || service.description : service.description} 
                imageUrl={service.photo_url}
                index={index}
              />
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Diagonal Divider - Bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none transform rotate-180">
        <svg 
          className="relative block w-full h-12 text-white dark:text-gray-900"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path 
            d="M1200 120L0 16.48V0h1200v120z" 
            className="fill-current"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default ServicesShowcase;
