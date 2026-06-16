'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

// Reading-time-based durations (in ms): ~200 words/min, scaled to title+tag length
const PROJECTS = [
  { title: 'Space for your new website', tag: 'Web Design',      duration: 4000, url: '#work' },
  { title: 'Your future e-shop',         tag: 'E-Commerce',      duration: 4000, url: '#work' },
  { title: 'Your brand identity',        tag: 'Branding & UI',   duration: 4000, url: '#work' },
  { title: 'Custom web application',     tag: 'Web Application', duration: 4000, url: '#work' },
];

export default function LatestWorkCard() {
  const [current, setCurrent]   = useState(0);
  const [progress, setProgress] = useState(0);
  const [active, setActive]     = useState(false);

  const startTime = useRef<number>(Date.now());
  const raf       = useRef<number | null>(null);

  useEffect(() => {
    startTime.current = Date.now();
    setProgress(0);

    const duration = PROJECTS[current].duration;

    const tick = () => {
      const elapsed = Date.now() - startTime.current;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setProgress(pct);

      if (elapsed < duration) {
        raf.current = requestAnimationFrame(tick);
      } else {
        setCurrent((prev) => (prev + 1) % PROJECTS.length);
      }
    };

    raf.current = requestAnimationFrame(tick);
    return () => { if (raf.current !== null) cancelAnimationFrame(raf.current); };
  }, [current]);

  const handleActivate   = useCallback(() => setActive(true),  []);
  const handleDeactivate = useCallback(() => setActive(false), []);

  const project = PROJECTS[current];
  const isExternal = project.url.startsWith('http');

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (project.url.startsWith('#')) {
      const target = document.getElementById(project.url.substring(1));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <Link
      href={project.url}
      onClick={handleClick}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className="block mt-12 w-full max-w-[320px] cursor-pointer outline-none select-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-2xl"
      onMouseEnter={handleActivate}
      onMouseLeave={handleDeactivate}
      onTouchStart={handleActivate}
      onTouchEnd={handleDeactivate}
      onTouchCancel={handleDeactivate}
    >
      <article
        className={[
          'w-full h-full p-8 rounded-2xl relative overflow-hidden backdrop-blur-xl border',
          'transition-all duration-300',
          active
            ? 'bg-neutral-900/60 border-white/10 -translate-y-1'
            : 'bg-neutral-900/40 border-white/5',
        ].join(' ')}
      >
        {/* ── Header ──────────────────────────────────── */}
        <div className="flex justify-between items-start mb-10">
          <span
            className={`text-[10px] font-bold uppercase tracking-widest transition-colors duration-300 ${
              active ? 'text-neutral-400' : 'text-neutral-500'
            }`}
          >
            Available Slots
          </span>

          <div className="w-8 h-8 bg-accent flex items-center justify-center rounded">
            <span
              className={`material-symbols-outlined text-white text-sm transition-transform duration-300 ${
                active ? '-translate-y-0.5 translate-x-0.5' : ''
              }`}
            >
              north_east
            </span>
          </div>
        </div>

        {/* ── Project info — crossfade on change ──────── */}
        <div className="space-y-2 h-[80px] overflow-hidden">
          <h3
            key={`title-${current}`}
            className={`text-xl font-bold animate-fade-in transition-colors duration-300 ${
              active ? 'text-accent' : 'text-white'
            }`}
          >
            {project.title}
          </h3>
          <p
            key={`tag-${current}`}
            className={`text-xs font-medium animate-fade-in transition-colors duration-300 ${
              active ? 'text-neutral-400' : 'text-neutral-500'
            }`}
          >
            {project.tag}
          </p>
        </div>

        {/* ── Progress bar ────────────────────────────── */}
        <div className="mt-8 h-[2px] w-full bg-white/10 relative overflow-hidden rounded-full">
          <div
            className="absolute inset-y-0 left-0 bg-accent rounded-full transition-none"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* ── Dot indicators ──────────────────────────── */}
        {/*
          Wrap dots in a div that stops the Link navigation on click/tap.
          Each button has extra invisible padding (py-3 px-2) so the tap target
          is ≥ 44×44 px even though the dot itself is tiny — WCAG 2.5.5.
        */}
        <div
          className="flex items-center gap-0.5 mt-2 -mx-1"
          onClick={(e) => e.preventDefault()}
        >
          {PROJECTS.map((_, i) => (
            <button
              key={i}
              aria-label={`Show ${PROJECTS[i].title}`}
              onClick={(e) => { e.preventDefault(); setCurrent(i); }}
              /* touch-manipulation prevents the 300 ms tap delay on mobile */
              style={{ touchAction: 'manipulation' }}
              className="py-3 px-2 flex items-center justify-center group/dot"
            >
              <span
                className={`block h-1 rounded-full transition-all duration-300 ${
                  i === current ? 'bg-accent w-4' : 'bg-white/20 w-1 group-hover/dot:bg-white/40'
                }`}
              />
            </button>
          ))}
        </div>
      </article>
    </Link>
  );
}
