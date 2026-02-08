import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Custom hook for basic GSAP animations
export function useGSAPAnimation<T extends HTMLElement>() {
  const elementRef = useRef<T>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const createTimeline = useCallback((config?: gsap.TimelineVars) => {
    if (timelineRef.current) {
      timelineRef.current.kill();
    }
    timelineRef.current = gsap.timeline(config);
    return timelineRef.current;
  }, []);

  useEffect(() => {
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, []);

  return { elementRef, timelineRef, createTimeline };
}

// Custom hook for scroll-triggered animations
export function useScrollTrigger<T extends HTMLElement>(
  animationConfig: gsap.TweenVars,
  triggerConfig?: ScrollTrigger.Vars
) {
  const elementRef = useRef<T>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const defaultTriggerConfig: ScrollTrigger.Vars = {
      trigger: element,
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play none none reverse',
      ...triggerConfig,
    };

    animationRef.current = gsap.fromTo(
      element,
      { opacity: 0, y: 50, ...animationConfig },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: defaultTriggerConfig,
        ...animationConfig,
      }
    );

    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [animationConfig, triggerConfig]);

  return elementRef;
}

// Custom hook for parallax effects
export function useParallax<T extends HTMLElement>(speed: number = 0.5) {
  const elementRef = useRef<T>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const animation = gsap.to(element, {
      y: () => speed * 100,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    return () => {
      animation.kill();
    };
  }, [speed]);

  return elementRef;
}

// Custom hook for text reveal animations
export function useTextReveal<T extends HTMLElement>(delay: number = 0) {
  const elementRef = useRef<T>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    gsap.set(element, { opacity: 0, y: 30 });

    const animation = gsap.to(element, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    });

    return () => {
      animation.kill();
    };
  }, [delay]);

  return elementRef;
}

// Custom hook for staggered animations
export function useStaggerReveal<T extends HTMLElement>(
  staggerAmount: number = 0.1,
  containerRef?: React.RefObject<HTMLElement>
) {
  const elementsRef = useRef<T[]>([]);

  const addToRefs = useCallback((el: T | null) => {
    if (el && !elementsRef.current.includes(el)) {
      elementsRef.current.push(el);
    }
  }, []);

  useEffect(() => {
    const elements = elementsRef.current;
    if (elements.length === 0) return;

    gsap.set(elements, { opacity: 0, y: 40 });

    const animation = gsap.to(elements, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: staggerAmount,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef?.current || elements[0],
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });

    return () => {
      animation.kill();
      elementsRef.current = [];
    };
  }, [staggerAmount, containerRef]);

  return addToRefs;
}

// Custom hook for magnetic effect on elements
export function useMagnetic<T extends HTMLElement>(strength: number = 0.3) {
  const elementRef = useRef<T>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;

      gsap.to(element, {
        x: distanceX * strength,
        y: distanceY * strength,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)',
      });
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);

  return elementRef;
}

// Utility to refresh ScrollTrigger
export function refreshScrollTrigger() {
  ScrollTrigger.refresh();
}

// Utility to kill all ScrollTriggers
export function killAllScrollTriggers() {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
}

export { gsap, ScrollTrigger };
