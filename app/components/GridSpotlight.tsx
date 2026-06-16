'use client';

import { useRef, useCallback, useEffect, ElementType } from 'react';

interface GridSpotlightProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  as?: ElementType;
  /**
   * Radius of the radial spotlight in px.
   * Increased default to 400 for a soft wide glow.
   */
  radius?: number;
}

export default function GridSpotlight({
  children,
  className = '',
  id,
  as: Tag = 'div',
  radius = 400,
}: GridSpotlightProps) {
  const containerRef = useRef<HTMLElement>(null);
  const overlayRef   = useRef<HTMLDivElement>(null);
  const rafId        = useRef<number | null>(null);
  const mouse        = useRef({ x: -9999, y: -9999 });
  const isHovering   = useRef(false);

  /**
   * True only when the primary input is a real pointer (mouse / trackpad).
   * `(hover: hover) and (pointer: fine)` excludes touch-only and stylus devices,
   * preventing the "spotlight stays lit after tap" bug on mobile / tablet.
   */
  const isPointerDevice = useRef(false);

  const flush = useCallback(() => {
    rafId.current = null;
    const container = containerRef.current;
    if (!container) return;
    container.style.setProperty('--mouse-x', `${mouse.current.x}px`);
    container.style.setProperty('--mouse-y', `${mouse.current.y}px`);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      // Skip entirely on touch / coarse-pointer devices
      if (!isPointerDevice.current) return;

      if (!isHovering.current) {
        isHovering.current = true;
        if (overlayRef.current) overlayRef.current.style.opacity = '1';
      }

      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouse.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
      if (rafId.current === null) {
        rafId.current = requestAnimationFrame(flush);
      }
    },
    [flush],
  );

  const handleMouseLeave = useCallback(() => {
    if (!isPointerDevice.current) return;
    isHovering.current = false;
    if (overlayRef.current) overlayRef.current.style.opacity = '0';
  }, []);

  useEffect(() => {
    // Evaluate once at mount — avoids SSR mismatch
    isPointerDevice.current =
      window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    const container = containerRef.current;
    if (container) {
      container.style.setProperty('--mouse-x', '-9999px');
      container.style.setProperty('--mouse-y', '-9999px');
    }
    return () => {
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, []);

  const maskGradient = `radial-gradient(circle ${radius}px at var(--mouse-x) var(--mouse-y), rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)`;

  return (
    <Tag
      ref={containerRef}
      id={id}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={overlayRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-700 ease-out"
        style={{
          opacity: 0,
          backgroundImage: [
            'linear-gradient(to right,  rgba(255,255,255,0.6) 1px, transparent 1px)',
            'linear-gradient(to bottom, rgba(255,255,255,0.6) 1px, transparent 1px)',
            'linear-gradient(to right,  rgba(255,255,255,0.3) 1px, transparent 1px)',
            'linear-gradient(to bottom, rgba(255,255,255,0.3) 1px, transparent 1px)',
          ].join(', '),
          backgroundSize: '100px 100px, 100px 100px, 20px 20px, 20px 20px',
          maskImage: maskGradient,
          WebkitMaskImage: maskGradient,
        }}
      />
      <div className="relative z-[1]">{children}</div>
    </Tag>
  );
}
