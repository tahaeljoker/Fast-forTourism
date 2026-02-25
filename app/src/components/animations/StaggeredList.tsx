"use client";
import React from 'react';
import { motion, Variants } from 'framer-motion';

type AnimationType = 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scale';

type StaggeredListProps = {
  items: React.ReactNode[];
  animationType?: AnimationType;
  stagger?: number;
  duration?: number;
  className?: string;
};

const itemVariants: Record<AnimationType, Variants> = {
  fadeIn: {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  },
  slideUp: {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: 20 },
    show: { opacity: 1, x: 0 },
  },
  slideRight: {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1 },
  },
};

export default function StaggeredList({
  items,
  animationType = 'fadeIn',
  stagger = 0.08,
  duration = 0.4,
  className,
}: StaggeredListProps) {
  return (
    <motion.ul
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-100px' }}
      transition={{ staggerChildren: stagger }}
    >
      {items.map((child, i) => (
        <motion.li
          key={i}
          variants={itemVariants[animationType]}
          transition={{ duration }}
        >
          {child}
        </motion.li>
      ))}
    </motion.ul>
  );
}