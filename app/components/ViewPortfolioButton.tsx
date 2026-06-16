'use client';

import { useState } from 'react';

/**
 * VIEW PORTFOLIO button with two micro-interactions:
 * 1. Hover: underline fills left→right (CSS transform scaleX)
 * 2. Click: arrow shoots down and fades out, then resets
 *    Works on touch devices too — click event fires on tap.
 */
export default function ViewPortfolioButton() {
  const [fired, setFired] = useState(false);

  const handleClick = () => {
    if (fired) return;
    setFired(true);
    // Reset after the out-animation completes so it's ready again
    setTimeout(() => setFired(false), 700);
  };

  return (
    <a
      href="#work"
      onClick={handleClick}
      className="relative flex items-center gap-2 text-neutral-400 hover:text-white font-bold uppercase tracking-[0.2em] text-[10px] transition-colors duration-300 group"
      aria-label="View portfolio – scroll to work section"
    >
      {/* Text + animated underline */}
      <span className="relative pb-[3px]">
        VIEW PORTFOLIO

        {/* Track: always-visible subtle line */}
        <span
          aria-hidden="true"
          className="absolute bottom-0 left-0 w-full h-[1px] bg-neutral-700"
        />

        {/* Fill: slides in from left on hover */}
        <span
          aria-hidden="true"
          className="absolute bottom-0 left-0 w-full h-[1px] bg-white origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        />
      </span>

      {/* Arrow — subtle float on hover, shoots down on click */}
      <span
        aria-hidden="true"
        className={[
          'material-symbols-outlined text-sm font-light',
          'transition-all',
          fired
            ? 'translate-y-5 opacity-0 duration-[220ms] ease-in'
            : 'group-hover:translate-y-1 opacity-100 duration-300 ease-out',
        ].join(' ')}
      >
        arrow_downward
      </span>
    </a>
  );
}
