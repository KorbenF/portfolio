'use client';

import { useEffect } from 'react';

/**
 * Instantly resets scroll position to the top when a page mounts.
 * Needed because the global `scroll-behavior: smooth` on <html> causes
 * Next.js's automatic scroll-to-top on navigation to animate from the
 * previous page's scroll position, making it look like the page
 * "loads from the bottom up".
 *
 * `behavior: 'instant'` in the JS ScrollOptions overrides the CSS property.
 */
export default function ScrollToTop() {
  useEffect(() => {
    // If there's a hash in the URL, don't scroll to top so the browser can
    // handle the scroll-to-section naturally.
    if (window.location.hash) return;

    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  return null;
}
