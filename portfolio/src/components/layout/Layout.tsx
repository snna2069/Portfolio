import { ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';
import { useAnimation } from '../../context/AnimationContext';
import LoadingScreen from '../ui/LoadingScreen';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const { isLoading, scrollTo } = useAnimation();

  // Scroll to top on route change
  useEffect(() => {
    scrollTo(0, { immediate: true });
  }, [location.pathname, scrollTo]);

  // Page transition variants
  const pageVariants = {
    initial: {
      opacity: 0,
    },
    enter: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] as const,
        when: 'beforeChildren' as const,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <>
      {/* Loading Screen */}
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key="loading" />}
      </AnimatePresence>

      {/* Main Layout */}
      <div className="relative min-h-screen flex flex-col">
        <Header />

        <AnimatePresence mode="wait">
          <motion.main
            key={location.pathname}
            variants={pageVariants}
            initial="initial"
            animate="enter"
            exit="exit"
            className="flex-1"
          >
            {children}
          </motion.main>
        </AnimatePresence>

        <Footer />
      </div>
    </>
  );
};

export default Layout;
