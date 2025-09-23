'use client';

import { motion, type HTMLMotionProps, type Variants } from 'motion/react';
import { forwardRef } from 'react';

// Fade in from bottom animation
export const fadeInUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 60,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

// Fade in from left animation
export const fadeInLeftVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -60,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

// Fade in from right animation
export const fadeInRightVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 60,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

// Scale in animation
export const scaleInVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

// Stagger children animation
export const staggerContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

// Text reveal animation
export const textRevealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

// Motion wrapper components
export const MotionDiv = motion.div;
export const MotionH1 = motion.h1;
export const MotionH2 = motion.h2;
export const MotionH3 = motion.h3;
export const MotionP = motion.p;
export const MotionSpan = motion.span;
export const MotionSection = motion.section;

// Animated text component with word-by-word reveal
export const AnimatedText = forwardRef<
  HTMLDivElement,
  HTMLMotionProps<'div'> & {
    text: string;
    className?: string;
    delay?: number;
  }
>(({ text, className = '', delay = 0, ...props }, ref) => {
  const words = text.split(' ');

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={staggerContainerVariants}
      {...props}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={textRevealVariants}
          className="inline-block mr-2"
          style={{ transitionDelay: `${delay + index * 0.1}s` }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
});

AnimatedText.displayName = 'AnimatedText';

// Scroll-triggered section component
export const ScrollSection = forwardRef<
  HTMLElement,
  HTMLMotionProps<'section'> & {
    children: React.ReactNode;
    className?: string;
  }
>(({ children, className = '', ...props }, ref) => {
  return (
    <motion.section
      ref={ref}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={staggerContainerVariants}
      {...props}
    >
      {children}
    </motion.section>
  );
});

ScrollSection.displayName = 'ScrollSection';
