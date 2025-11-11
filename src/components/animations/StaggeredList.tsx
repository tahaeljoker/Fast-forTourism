'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface StaggeredListProps {
  children: ReactNode[];
  animationType?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scale';
  staggerDelay?: number;
  duration?: number;
  className?: string;
}

const animationVariants = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  },
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  },
  slideLeft: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
  },
  slideRight: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
  },
};

export default function StaggeredList({
  children,
  animationType = 'slideUp',
  staggerDelay = 0.1,
  duration = 0.5,
  className = '',
}: StaggeredListProps) {
  const variants = animationVariants[animationType];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        duration: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: variants.initial,
    visible: {
      ...variants.animate,
      transition: {
        duration,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      {children.map((child, index) => (
        <motion.div key={index} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}