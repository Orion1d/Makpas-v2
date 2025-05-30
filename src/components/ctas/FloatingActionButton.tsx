import React from 'react';
import { Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
const FloatingActionButton = () => {
  return <motion.div className="fixed bottom-8 right-8 z-50 safe-area-padding" initial={{
    opacity: 0,
    scale: 0.8
  }} animate={{
    opacity: 1,
    scale: 1
  }} transition={{
    duration: 0.3
  }}>
      
    </motion.div>;
};
export default FloatingActionButton;