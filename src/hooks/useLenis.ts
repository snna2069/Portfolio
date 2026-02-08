import { useEffect, useRef, useCallback } from 'react';
import Lenis from 'lenis';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface LenisOptions {
  duration?: number;
  easing?: (t: number) => number;
  orientation?: 'vertical' | 'horizontal';
  gestureOrientation?: 'vertical' | 'horizontal' | 'both';
  smoothWheel?: boolean;
  syncTouch?: boolean;
  touchMultiplier?: number;
  infinite?: boolean;
}

// Default Lenis configuration for luxury feel
const defaultOptions: LenisOptions = {
  duration: 1.2,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical',
  gestureOrientation: 'vertical',
  smoothWheel: true,
  syncTouch: false,
  touchMultiplier: 2,
  infinite: false,
};

// Custom hook to initialize and manage Lenis
export function useLenis(options: LenisOptions = {}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis with merged options
    const lenis = new Lenis({
      ...defaultOptions,
      ...options,
    });

    lenisRef.current = lenis;

    // Integrate with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // RAF loop for Lenis
    // Track the RAF id so we can cancel it on cleanup.
    const rafIdRef = { current: 0 } as { current: number };

    function raf(time: number) {
      lenis.raf(time);
      rafIdRef.current = requestAnimationFrame(raf);
    }

    // Start the RAF loop and keep the id
    rafIdRef.current = requestAnimationFrame(raf);

    // Cleanup
    return () => {
      // Cancel the RAF loop if running
      try {
        cancelAnimationFrame((rafIdRef as any).current);
      } catch (e) {
        // ignore
      }

      lenis.destroy();
      lenisRef.current = null;
    };
  }, [/* initialize once; options should be stable to avoid re-init */]);

  // Scroll to a specific target
  const scrollTo = useCallback(
    (
      target: string | number | HTMLElement,
      options?: {
        offset?: number;
        duration?: number;
        immediate?: boolean;
        lock?: boolean;
        force?: boolean;
        onComplete?: () => void;
      }
    ) => {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(target, options);
      }
    },
    []
  );

  // Stop scrolling
  const stop = useCallback(() => {
    if (lenisRef.current) {
      lenisRef.current.stop();
    }
  }, []);

  // Start scrolling
  const start = useCallback(() => {
    if (lenisRef.current) {
      lenisRef.current.start();
    }
  }, []);

  return {
    lenis: lenisRef.current,
    scrollTo,
    stop,
    start,
  };
}

// Custom hook to get scroll progress
export function useScrollProgress() {
  const progressRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      progressRef.current = window.scrollY / scrollHeight;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return progressRef;
}

// Custom hook to detect scroll direction
export function useScrollDirection() {
  const directionRef = useRef<'up' | 'down'>('down');
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      directionRef.current = currentScrollY > lastScrollY.current ? 'down' : 'up';
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return directionRef;
}

export default useLenis;
