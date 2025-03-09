
import React from 'react';
import { Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const FloatingActionButton = () => {
  return (
    <motion.div
      className="fixed bottom-8 right-8 z-50 safe-area-padding"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Button
        variant="floating"
        size="floating"
        className="flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200 animate-pulse"
        onClick={() => window.location.href = 'tel:+902646777510'}
      >
        <Phone className="w-7 h-7" strokeWidth={2} />
      </Button>
    </motion.div>
  );
};

export default FloatingActionButton;
