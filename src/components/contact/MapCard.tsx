
import React from 'react';
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { MapPin } from 'lucide-react';

export const MapCard: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <Card className="bg-white dark:bg-industry-blue/90 shadow-md h-full flex flex-col overflow-hidden card-brushed-metal">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl text-primary dark:text-white font-space-grotesk flex items-center gap-2">
          <MapPin className="text-safety-orange h-5 w-5" />
          {t('our_location') || 'Our Location'}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0 flex-1">
        <div className="relative h-full w-full border-2 border-safety-orange rounded-lg overflow-hidden transition-all duration-200 hover:shadow-[0_0_15px_rgba(255,107,53,0.4)] group">
          <a 
            href="https://maps.google.com/?q=40.199428,29.052986" 
            target="_blank" 
            rel="noopener noreferrer"
            className="absolute inset-0 z-10"
            aria-label="Konum haritası"
          >
            <span className="sr-only">Open in Google Maps</span>
          </a>
          
          <div className="aspect-square md:aspect-square w-full h-full">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1553.953241285284!2d28.943822548558284!3d40.239896931513556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14ca11446a3f46d5%3A0x2b76598dc60f6156!2zTWFrcGHFnw!5e1!3m2!1str!2ses!4v1732628839154!5m2!1str!2ses" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={false}
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="z-0"
              title="Makpas Location Map"
            ></iframe>
          </div>
          
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none flex items-center justify-center">
            <span className="text-white bg-safety-orange px-4 py-2 rounded-full font-medium transform translate-y-2 group-hover:translate-y-0 transition-transform duration-200">
              {t('view_full_map') || 'View Full Map'}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
