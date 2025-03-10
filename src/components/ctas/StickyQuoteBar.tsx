import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
const StickyQuoteBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const {
    t
  } = useLanguage();
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsVisible(scrollPosition > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return <AnimatePresence>
      {isVisible}
    </AnimatePresence>;
};
export default StickyQuoteBar;