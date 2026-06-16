'use client';
import React, { useState, useEffect } from 'react';

const TAGS = ['DESIGN', 'UI/UX', 'SEO', 'BRANDING'];

export default function HeroTags() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [phase, setPhase] = useState<'trace' | 'glow'>('trace');

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (phase === 'trace') {
      // Trace phase: light runs around the border for 1.5 seconds
      timeout = setTimeout(() => setPhase('glow'), 1500);
    } else if (phase === 'glow') {
      // Glow phase: the whole block is softly lit for 2 seconds, then moves to next tag
      timeout = setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % TAGS.length);
        setPhase('trace');
      }, 2000);
    }

    return () => clearTimeout(timeout);
  }, [phase, activeIndex]);

  return (
    <div className="flex flex-wrap gap-3 lg:gap-4 justify-center lg:justify-end max-w-lg">
      {TAGS.map((tag, i) => {
        const isActive = i === activeIndex;
        const isTrace = isActive && phase === 'trace';
        const isGlow = isActive && phase === 'glow';
        
        return (
          <div 
            key={tag} 
            className={`relative rounded-full p-[1px] overflow-hidden transition-shadow duration-1000 ${
              isGlow ? 'shadow-[0_0_20px_rgba(248,95,30,0.4)]' : 'shadow-none'
            }`}
          >
            {/* The rotating border trace element */}
            <div 
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300%] aspect-square bg-[conic-gradient(from_0deg,transparent_0_340deg,#f85f1e_360deg)] 
                ${isTrace ? 'opacity-100 animate-[spin_1.5s_linear_infinite]' : 'opacity-0'}
                transition-opacity duration-500`}
            />
            {/* The full glowing border for phase 2 */}
            <div 
              className={`absolute inset-0 bg-accent transition-opacity duration-1000 
                ${isGlow ? 'opacity-100' : 'opacity-0'}`}
            />
            
            {/* Static base border when not active to preserve layout */}
            <div className={`absolute inset-0 border border-accent/30 rounded-full transition-opacity duration-700 
              ${isActive ? 'opacity-0' : 'opacity-100'}`} 
            />
            
            {/* Inner Content */}
            <div className={`relative bg-black rounded-full px-6 lg:px-10 py-3 lg:py-4 transition-colors duration-1000 z-10 flex items-center justify-center ${
              isGlow ? 'bg-[#1a0a00]' : 'bg-black'
            }`}>
              <span className={`text-xs md:text-sm font-bold tracking-[0.2em] uppercase transition-colors duration-1000 ${
                isGlow ? 'text-white' : 'text-accent'
              }`}>
                {tag}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
