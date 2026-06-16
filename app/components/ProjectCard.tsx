'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ProjectCardProps {
  href: string;
  colSpan: string; // e.g. "md:col-span-8" or "md:col-span-4"
  aspectRatio: string; // e.g. "aspect-[16/9]" or "aspect-[4/5]"
  imageSrc: string;
  imageAlt: string;
  tagText: string;
  isTagAccent?: boolean;
  title: string;
  description: string;
  ctaText: string;
  isWide?: boolean; // layout A vs layout B
  sizes: string;
  priority?: boolean;
}

export default function ProjectCard({
  href,
  colSpan,
  aspectRatio,
  imageSrc,
  imageAlt,
  tagText,
  isTagAccent = false,
  title,
  description,
  ctaText,
  isWide = false,
  sizes,
  priority = false,
}: ProjectCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <a
      href={href}
      className={`${colSpan} group cursor-pointer block relative rounded-2xl overflow-hidden border border-white/5 hover:border-accent/40 transition duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[0_0_50px_rgba(0,0,0,0.8)] hover:shadow-[0_0_50px_rgba(248,95,30,0.12)]`}
    >
      <article className={`${aspectRatio} w-full relative bg-surface-container-high`}>
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority={priority}
          onLoad={() => setImageLoaded(true)}
          className={`object-cover transition duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 ${
            imageLoaded ? 'opacity-45 group-hover:opacity-70' : 'opacity-0'
          }`}
          sizes={sizes}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

        {isWide ? (
          /* Layout A: Wide layouts (Slots 1 & 4) */
          <div className="absolute bottom-8 left-8 right-8 flex flex-col md:flex-row justify-between z-10 items-end gap-6">
            <div className="space-y-3 text-left">
              <span
                className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest inline-block ${
                  isTagAccent
                    ? 'bg-accent text-white shadow-[0_0_20px_rgba(248,95,30,0.4)]'
                    : 'bg-white/10 backdrop-blur-md text-white/80'
                }`}
              >
                {tagText}
              </span>
              <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight">
                {title}
              </h3>
              <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                <div className="overflow-hidden">
                  <p className="text-neutral-400 text-sm max-w-xl font-medium leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] pt-2">
                    {description}
                  </p>
                </div>
              </div>
            </div>
            <div
              className={`flex items-center gap-2 text-xs font-black uppercase tracking-widest shrink-0 group-hover:translate-x-2 transition-[transform,color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isTagAccent
                  ? 'text-accent'
                  : 'text-neutral-400 group-hover:text-accent'
              }`}
            >
              {ctaText} <span className="material-symbols-outlined text-sm">arrow_outward</span>
            </div>
          </div>
        ) : (
          /* Layout B: Tall layouts (Slots 2 & 3) */
          <div className="absolute bottom-8 left-8 right-8 flex flex-col justify-between h-[60%] z-10 text-left">
            <div className="space-y-3 mt-auto">
              <span
                className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest inline-block ${
                  isTagAccent
                    ? 'bg-accent text-white shadow-[0_0_20px_rgba(248,95,30,0.4)]'
                    : 'bg-white/10 backdrop-blur-md text-white/80'
                }`}
              >
                {tagText}
              </span>
              <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight leading-tight">
                {title}
              </h3>
              <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                <div className="overflow-hidden">
                  <p className="text-neutral-400 text-xs font-medium leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] pt-2">
                    {description}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-neutral-400 group-hover:text-accent group-hover:translate-x-2 transition-[transform,color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] mt-2">
              {ctaText} <span className="material-symbols-outlined text-sm">arrow_outward</span>
            </div>
          </div>
        )}
      </article>
    </a>
  );
}
