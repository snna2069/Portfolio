import { motion } from 'framer-motion';
import { personalInfo } from '../../data/portfolio';

const LoadingScreen = () => {
  const containerVariants = {
    exit: {
      clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1] as const,
        delay: 0.3,
      },
    },
  };

  const textVariants = {
    initial: { y: 100, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
    exit: {
      y: -50,
      opacity: 0,
      transition: {
        duration: 0.4,
        ease: [0.76, 0, 0.24, 1] as const,
      },
    },
  };

  const lineVariants = {
    initial: { scaleX: 0 },
    animate: {
      scaleX: 1,
      transition: {
        duration: 1.5,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
      style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
    >
      <div className="text-center">
        {/* Logo/Name */}
        <div className="overflow-hidden mb-8">
          <motion.h1
            variants={textVariants}
            className="text-5xl md:text-7xl font-display text-cream"
          >
            {personalInfo.name.split(' ')[0]}
            <span className="text-gold">.</span>
          </motion.h1>
        </div>

        {/* Loading Line */}
        <motion.div
          variants={lineVariants}
          className="w-48 h-px bg-gold origin-left mx-auto"
        />

        {/* Loading Text */}
        <div className="overflow-hidden mt-6">
          <motion.p
            variants={textVariants}
            className="text-cream/50 text-sm tracking-widest uppercase"
          >
            Loading Experience
          </motion.p>
        </div>
      </div>

      {/* Corner decorations */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute top-8 left-8 w-16 h-16 border-l border-t border-gold/30"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="absolute top-8 right-8 w-16 h-16 border-r border-t border-gold/30"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="absolute bottom-8 left-8 w-16 h-16 border-l border-b border-gold/30"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-8 right-8 w-16 h-16 border-r border-b border-gold/30"
      />
    </motion.div>
  );
};

export default LoadingScreen;
