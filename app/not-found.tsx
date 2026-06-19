import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="font-headline text-on-background bg-background min-h-[85vh] flex flex-col items-center justify-center px-6 text-center select-none">
      {/* 404 Label */}
      <div className="text-neutral-500 text-[10px] font-bold uppercase tracking-[0.4em] mb-6 animate-page-in">
        ERROR 404
      </div>

      {/* Headline */}
      <h1 className="font-extrabold text-[4.5rem] md:text-[8rem] leading-[0.9] tracking-[-0.04em] text-white mb-8 animate-page-in">
        Page not<br />
        <span className="text-accent">found.</span>
      </h1>

      {/* Description */}
      <p className="text-neutral-400 text-base md:text-lg font-medium max-w-md leading-relaxed mb-12 animate-page-in">
        The page you are looking for doesn&apos;t exist, has been removed, or has been moved to a different URL.
      </p>

      {/* Back Button */}
      <Link
        href="/"
        className="bg-accent text-white rounded-full px-10 py-5 font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(248,95,30,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
      >
        BACK TO HOME
        <span className="material-symbols-outlined text-xl">arrow_right_alt</span>
      </Link>
    </div>
  );
}
