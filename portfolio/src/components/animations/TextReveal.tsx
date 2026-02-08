import { ReactNode, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface TextRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
}

// Simple text reveal with clip-path
export const TextReveal = ({
  children,
  className = '',
  delay = 0,
  once = true,
}: TextRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: '-10% 0px' });

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: '100%' }}
        animate={isInView ? { y: 0 } : { y: '100%' }}
        transition={{
          duration: 0.8,
          delay,
          ease: [0.16, 1, 0.3, 1] as any,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

// Character by character reveal
interface CharacterRevealProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
}

export const CharacterReveal = ({
  text,
  className = '',
  delay = 0,
  stagger = 0.02,
  once = true,
}: CharacterRevealProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once, margin: '-10% 0px' });

  const characters = text.split('');

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const characterVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1] as any,
      },
    },
  };

  return (
    <motion.span
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      aria-label={text}
    >
      {characters.map((char, index) => (
        <motion.span
          key={index}
          variants={characterVariants}
          className="inline-block"
          style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
};

// Word by word reveal
interface WordRevealProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
}

export const WordReveal = ({
  text,
  className = '',
  delay = 0,
  stagger = 0.08,
  once = true,
}: WordRevealProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once, margin: '-10% 0px' });

  const words = text.split(' ');

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      rotateX: -90,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as any,
      },
    },
  };

  return (
    <motion.span
      ref={ref}
      className={`inline-flex flex-wrap ${className}`}
      style={{ perspective: '1000px' }}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {words.map((word, index) => (
        <span key={index} className="overflow-visible mr-[0.25em]">
          <motion.span
            variants={wordVariants}
            className="inline-block origin-bottom"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
};

export default TextReveal;
