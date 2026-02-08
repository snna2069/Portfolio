import { useEffect, useRef } from 'react';

const CURSOR_COLOR = '#1e3a5f';

/**
 * Lightweight custom cursor - no requestAnimationFrame loop.
 * Uses a single mousemove listener + CSS transition for the trailing ring.
 * Hidden on touch/mobile devices.
 */
const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skip on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let hovering = false;

    const onMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.opacity = '0.85';
        dotRef.current.style.transform = `translate(${x - 4}px, ${y - 4}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.opacity = '0.6';
        const offset = hovering ? 20 : 16;
        ringRef.current.style.transform = `translate(${x - offset}px, ${y - offset}px)`;
      }

      // Check for interactive elements
      const target = e.target as HTMLElement;
      const isInteractive = !!(
        target.closest('a') ||
        target.closest('button') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('select') ||
        target.closest('[role="button"]')
      );

      if (isInteractive !== hovering) {
        hovering = isInteractive;
        if (ringRef.current) {
          ringRef.current.style.width = hovering ? '40px' : '32px';
          ringRef.current.style.height = hovering ? '40px' : '32px';
          ringRef.current.style.borderColor = hovering
            ? `${CURSOR_COLOR}`
            : `${CURSOR_COLOR}60`;
          ringRef.current.style.backgroundColor = hovering
            ? `${CURSOR_COLOR}10`
            : 'transparent';
        }
      }
    };

    const onLeave = () => {
      if (dotRef.current) dotRef.current.style.opacity = '0';
      if (ringRef.current) ringRef.current.style.opacity = '0';
    };

    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <>
      {/* Inner dot - follows mouse instantly */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full hidden md:block"
        style={{
          width: 8,
          height: 8,
          backgroundColor: CURSOR_COLOR,
          opacity: 0,
          willChange: 'transform',
        }}
      />
      {/* Outer ring - trails with CSS transition */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full hidden md:block"
        style={{
          width: 32,
          height: 32,
          border: `1.5px solid ${CURSOR_COLOR}60`,
          backgroundColor: 'transparent',
          opacity: 0,
          transition:
            'transform 0.15s ease-out, width 0.2s ease, height 0.2s ease, opacity 0.3s, border-color 0.2s, background-color 0.2s',
          willChange: 'transform',
        }}
      />
    </>
  );
};

export default CustomCursor;
