
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useInView } from "framer-motion";
import { prefersReducedMotion } from "@/utils/deviceUtils";

interface BlurFadeProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  inView?: boolean;
  once?: boolean;
}

export const BlurFade: React.FC<BlurFadeProps> = ({
  children,
  className,
  delay = 0,
  duration = 0.4,
  inView: propInView,
  once = true,
}) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once });
  const [reducedMotion, setReducedMotion] = useState(false);
  
  // Check for reduced motion preference
  useEffect(() => {
    setReducedMotion(prefersReducedMotion());
  }, []);

  // Use the prop value if provided, otherwise use the inView hook result
  const shouldAnimate = propInView !== undefined ? propInView : isInView;
  
  // If reduced motion is preferred, we skip the animation
  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, filter: "blur(4px)" }}
      animate={shouldAnimate ? { opacity: 1, filter: "blur(0px)" } : { opacity: 0, filter: "blur(4px)" }}
      transition={{ 
        duration: duration, 
        delay: delay,
        ease: "easeOut"
      }}
      className={cn("will-change-[opacity,filter]", className)}
    >
      {children}
    </motion.div>
  );
};
