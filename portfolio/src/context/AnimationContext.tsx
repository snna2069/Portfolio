import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AnimationContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  isPageTransitioning: boolean;
  setIsPageTransitioning: (transitioning: boolean) => void;
  prefersReducedMotion: boolean;
  scrollTo: (target: string | number | HTMLElement, options?: ScrollToOptions) => void;
  stopScroll: () => void;
  startScroll: () => void;
}

interface ScrollToOptions {
  offset?: number;
  duration?: number;
  immediate?: boolean;
  onComplete?: () => void;
}

const AnimationContext = createContext<AnimationContextType | undefined>(undefined);

interface AnimationProviderProps {
  children: ReactNode;
}

export function AnimationProvider({ children }: AnimationProviderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isPageTransitioning, setIsPageTransitioning] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Initial loading simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Native scroll-to (replaces Lenis)
  const scrollTo = (target: string | number | HTMLElement, options?: ScrollToOptions) => {
    const behavior = options?.immediate ? 'auto' as const : 'smooth' as const;

    if (typeof target === 'string') {
      const element = document.querySelector(target);
      if (element) {
        const top = element.getBoundingClientRect().top + window.scrollY + (options?.offset || 0);
        window.scrollTo({ top, behavior });
      }
    } else if (typeof target === 'number') {
      window.scrollTo({ top: target, behavior });
    } else if (target instanceof HTMLElement) {
      const top = target.getBoundingClientRect().top + window.scrollY + (options?.offset || 0);
      window.scrollTo({ top, behavior });
    }

    if (options?.onComplete) {
      setTimeout(options.onComplete, options?.duration || 600);
    }
  };

  const stopScroll = () => {
    document.body.style.overflow = 'hidden';
  };

  const startScroll = () => {
    document.body.style.overflow = '';
  };

  return (
    <AnimationContext.Provider
      value={{
        isLoading,
        setIsLoading,
        isPageTransitioning,
        setIsPageTransitioning,
        prefersReducedMotion,
        scrollTo,
        stopScroll,
        startScroll,
      }}
    >
      {children}
    </AnimationContext.Provider>
  );
}

export function useAnimation() {
  const context = useContext(AnimationContext);
  if (context === undefined) {
    throw new Error('useAnimation must be used within an AnimationProvider');
  }
  return context;
}

export default AnimationContext;
