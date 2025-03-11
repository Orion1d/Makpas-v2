import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { QuoteIcon, ChevronUp, X } from 'lucide-react';
import { useLocation } from 'react-router-dom';
const StickyQuoteBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [animateAttention, setAnimateAttention] = useState(false);
  const {
    t
  } = useLanguage();
  const location = useLocation();

  // Check if we're on a product detail page
  const isProductDetail = location.pathname.includes('/product/');
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsVisible(scrollPosition > 300);

      // Trigger attention animation when scrolled past certain point
      if (scrollPosition > 800 && !animateAttention) {
        setAnimateAttention(true);
        setTimeout(() => setAnimateAttention(false), 2000);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [animateAttention]);
  const handleQuoteClick = () => {
    if (isProductDetail) {
      setIsExpanded(!isExpanded);
    } else {
      window.location.href = '/contact';
    }
  };
  const handleCloseExpanded = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(false);
  };
  return <AnimatePresence>
      {isVisible && <motion.div initial={{
      y: 100,
      opacity: 0
    }} animate={{
      y: 0,
      opacity: 1
    }} exit={{
      y: 100,
      opacity: 0
    }} transition={{
      duration: 0.3
    }} className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
          <div className="relative">
            
            
            {/* Expanded quote form for product detail pages */}
            <AnimatePresence>
              {isExpanded && isProductDetail && <motion.div initial={{
            height: 0,
            opacity: 0
          }} animate={{
            height: 'auto',
            opacity: 1
          }} exit={{
            height: 0,
            opacity: 0
          }} transition={{
            duration: 0.3
          }} className="bg-white dark:bg-gray-800 p-4 rounded-b-lg shadow-lg border-t border-gray-200 dark:border-gray-700 w-72 sm:w-80">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-primary dark:text-white">{t('quick_quote') || 'Quick Quote Request'}</h3>
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={handleCloseExpanded}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-600 dark:text-gray-300">{t('quote_for_product') || 'Request quote for this product'}</p>
                    <Button variant="accent" size="sm" className="w-full mt-2" onClick={() => window.location.href = `${location.pathname}?quote=true#contact-form`}>
                      {t('send_quote_request') || 'Send Quote Request'}
                    </Button>
                  </div>
                </motion.div>}
            </AnimatePresence>
          </div>
        </motion.div>}
    </AnimatePresence>;
};
export default StickyQuoteBar;