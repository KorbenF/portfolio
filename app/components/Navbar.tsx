'use client';
import React, { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Helper to handle smooth scrolling for hash links on the same page
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Only intercept if it's a hash link
    if (href.includes('#')) {
      const [path, hash] = href.split('#');
      const currentPath = window.location.pathname;

      // If we are already on the target page (or it's just a hash)
      if (currentPath === path || path === '' || (path === '/' && currentPath === '/')) {
        const target = document.getElementById(hash);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
          setIsOpen(false); // Close mobile menu if open
        }
      }
    }
  };

  return (
    <header className="fixed top-4 md:top-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-5xl px-2 md:px-4">
      <div className="relative">
        <div className="bg-neutral-900/60 backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-between px-3 py-2 md:py-1.5 gap-2 md:gap-4 relative z-50">
          
          {/* Logo Left */}
          <div className="flex-1 flex justify-start items-center">
            <Link href="/" className="text-white font-extrabold text-lg md:text-xl tracking-tight uppercase hover:text-accent transition-colors whitespace-nowrap flex-shrink-0">
              FK STUDIO
            </Link>
          </div>
          
          {/* Links Center (Desktop Only) */}
          <nav className="hidden md:flex items-center gap-1 md:gap-2 flex-shrink-0">
            <Link href="/#work" onClick={(e) => handleScroll(e, '/#work')} className="border border-accent/30 text-accent hover:bg-accent hover:text-white rounded-full font-black uppercase tracking-widest transition-all duration-300 hover:scale-105 active:scale-95 py-1.5 md:py-2 px-3 text-[10px]">Work</Link>
            <Link href="/#about" onClick={(e) => handleScroll(e, '/#about')} className="text-neutral-400 hover:text-white font-black uppercase tracking-widest transition-colors py-1.5 md:py-2 px-3 text-[10px]">About</Link>
            <Link href="/#contact" onClick={(e) => handleScroll(e, '/#contact')} className="text-neutral-400 hover:text-white font-black uppercase tracking-widest transition-colors py-1.5 md:py-2 px-3 text-[10px]">Contact</Link>
          </nav>
          
          {/* Button & Hamburger Right */}
          <div className="flex-1 flex justify-end items-center gap-3">
            <Link href="/#contact" onClick={(e) => handleScroll(e, '/#contact')} className="bg-accent text-white rounded-full font-black uppercase tracking-widest py-1.5 md:py-2 px-4 text-[10px] inline-block transition-all duration-300 hover:scale-105 active:scale-95 whitespace-nowrap flex-shrink-0">
              Let's Talk
            </Link>
            
            {/* Hamburger (Mobile Only) */}
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="w-10 h-10 relative flex items-center justify-center md:hidden focus:outline-none z-[100] cursor-pointer"
              aria-label="Toggle menu"
            >
              <span className={`pointer-events-none absolute w-6 h-[2px] bg-white transition-all duration-300 ${isOpen ? 'rotate-45' : '-translate-y-[8px]'}`}></span>
              <span className={`pointer-events-none absolute w-6 h-[2px] bg-white transition-all duration-300 ${isOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`}></span>
              <span className={`pointer-events-none absolute w-6 h-[2px] bg-white transition-all duration-300 ${isOpen ? '-rotate-45' : 'translate-y-[8px]'}`}></span>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div className={`absolute top-full left-0 w-full pt-4 transition-all md:hidden ${isOpen ? 'opacity-100 translate-y-0 duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]' : 'opacity-0 -translate-y-4 duration-300 ease-in pointer-events-none'}`}>
          <div className="bg-[#050505]/95 backdrop-blur-3xl border border-white/10 rounded-3xl px-6 py-4 flex flex-col shadow-2xl overflow-hidden">
            <Link href="/#work" onClick={(e) => handleScroll(e, '/#work')} className={`group text-white font-black uppercase tracking-[0.2em] text-lg hover:text-accent transition-all border-b border-white/10 py-5 flex items-center ${isOpen ? 'opacity-100 translate-y-0 duration-700 delay-100 ease-[cubic-bezier(0.16,1,0.3,1)]' : 'opacity-0 -translate-y-2 duration-300 ease-in'}`}>
              <span className="transition-transform duration-300 group-hover:translate-x-2">Work</span>
            </Link>
            <Link href="/#about" onClick={(e) => handleScroll(e, '/#about')} className={`group text-white font-black uppercase tracking-[0.2em] text-lg hover:text-accent transition-all border-b border-white/10 py-5 flex items-center ${isOpen ? 'opacity-100 translate-y-0 duration-700 delay-150 ease-[cubic-bezier(0.16,1,0.3,1)]' : 'opacity-0 -translate-y-2 duration-300 ease-in'}`}>
              <span className="transition-transform duration-300 group-hover:translate-x-2">About</span>
            </Link>
            <Link href="/#contact" onClick={(e) => handleScroll(e, '/#contact')} className={`group text-white font-black uppercase tracking-[0.2em] text-lg hover:text-accent transition-all py-5 flex items-center ${isOpen ? 'opacity-100 translate-y-0 duration-700 delay-200 ease-[cubic-bezier(0.16,1,0.3,1)]' : 'opacity-0 -translate-y-2 duration-300 ease-in'}`}>
              <span className="transition-transform duration-300 group-hover:translate-x-2">Contact</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
