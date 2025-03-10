
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { QuoteIcon } from 'lucide-react';

const StickyQuoteBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useLanguage();
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsVisible(scrollPosition > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleQuoteClick = () => {
    window.location.href = '/contact';
  };
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50"
        >
          <Button 
            onClick={handleQuoteClick}
            variant="floating"
            size="lg" 
            className="bg-safety-orange text-white shadow-lg px-6 py-3 flex items-center gap-2"
          >
            <QuoteIcon className="h-5 w-5" />
            {t('get_quote') || 'Get a Quote'}
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyQuoteBar;
