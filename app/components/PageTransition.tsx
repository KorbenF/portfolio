'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

/**
 * Wraps all page content and restarts the fade-in animation on every
 * client-side navigation by removing + re-adding the CSS class after
 * forcing a reflow. Works with both hard loads and soft (SPA) navigation.
 */
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.classList.remove('animate-page-in');
    // Force a reflow so removing + re-adding the class is noticed by the browser
    void el.offsetHeight;
    el.classList.add('animate-page-in');
  }, [pathname]);

  return (
    <div ref={ref} className="animate-page-in">
      {children}
    </div>
  );
}
