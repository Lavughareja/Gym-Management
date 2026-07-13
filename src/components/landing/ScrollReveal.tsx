import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  duration?: number;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({ 
  children, 
  delay = 0, 
  direction = 'up',
  duration = 0.5
}) => {
  const directionOffset = 50;
  
  let initial = {};
  if (direction === 'up') initial = { opacity: 0, y: directionOffset };
  if (direction === 'down') initial = { opacity: 0, y: -directionOffset };
  if (direction === 'left') initial = { opacity: 0, x: directionOffset };
  if (direction === 'right') initial = { opacity: 0, x: -directionOffset };
  if (direction === 'none') initial = { opacity: 0 };

  return (
    <motion.div
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration,
        delay,
        ease: "easeOut"
      }}
    >
      {children}
    </motion.div>
  );
};
