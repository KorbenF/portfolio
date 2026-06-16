import Link from 'next/link';
import GridSpotlight from './GridSpotlight';

/**
 * Shared site footer — used on both the homepage and /contact page.
 * showCta: show the "Let's build something great" block (default true).
 */
export default function SiteFooter({ showCta = true }: { showCta?: boolean }) {
  return (
    <GridSpotlight
      as="footer"
      id="contact"
      className={`bg-[#000000] w-full ${showCta ? 'pt-40' : 'pt-20'} pb-12 hero-grid-bg`}
      radius={150}
    >
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12">

        {/* ── CTA Header ──────────────────────────────── */}
        {showCta && (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-32 md:mb-40">
          <div className="space-y-2 w-full md:w-auto">
            <div className="text-neutral-500 text-[10px] font-bold uppercase tracking-[0.3em] mb-4">READY TO START?</div>
            <h2 className="text-5xl md:text-8xl font-black text-white leading-[1.1] tracking-tighter">
              Let&apos;s build something<br />
              <span className="text-accent">great.</span>
            </h2>
          </div>
          <Link
            href="/contact"
            className="w-full md:w-auto mt-12 md:mt-0 bg-accent text-white rounded-full px-10 py-5 font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(248,95,30,0.3)]"
          >
            BOOK A CALL
            <span className="material-symbols-outlined text-xl">arrow_right_alt</span>
          </Link>
        </div>
        )}

        {/* ── Info Grid ───────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 mb-32">

          {/* Brand */}
          <div className="md:col-span-5 flex flex-col">
            <div className="text-white font-black text-3xl uppercase tracking-tight mb-8">FK STUDIO</div>
            <div className="flex items-center gap-3 text-neutral-400 font-bold tracking-[0.2em] text-[10px] uppercase mb-8">
              <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_6px_2px_rgba(34,197,94,0.5)] animate-pulse" />
              AVAILABLE FOR PROJECTS
            </div>
            <div className="border-t border-white/10 pt-6">
              <a
                className="text-neutral-200 text-xl md:text-2xl font-medium hover:text-white transition-colors"
                href="mailto:hello@fkstudio.sk"
              >
                hello@fkstudio.sk
              </a>
            </div>
          </div>

          {/* Navigate */}
          <div className="md:col-span-3 md:col-start-7 flex flex-col hidden md:flex">
            <div className="text-neutral-500 text-[10px] font-bold uppercase tracking-[0.3em] mb-8">NAVIGATE</div>
            <nav className="flex flex-col">
              {[
                { href: '/#work',    label: 'Work' },
                { href: '/#about',   label: 'About' },
                { href: '/contact',  label: 'Contact' },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="border-t border-white/10 py-5 text-neutral-400 hover:text-white font-medium text-lg flex items-center justify-between group transition-colors last:border-b last:border-white/10"
                >
                  {l.label}
                  <span className="material-symbols-outlined text-lg opacity-40 group-hover:opacity-100 transition-opacity">north_east</span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Social */}
          <div className="md:col-span-3 flex flex-col">
            <div className="text-neutral-500 text-[10px] font-bold uppercase tracking-[0.3em] mb-8">SOCIAL</div>
            <nav className="flex flex-col">
              {[
                { href: '#', label: 'Instagram' },
                { href: '#', label: 'TikTok' },
                { href: '#', label: 'Behance' },
              ].map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  className="border-t border-white/10 py-5 text-neutral-400 hover:text-white font-medium text-lg flex items-center justify-between group transition-colors last:border-b last:border-white/10"
                >
                  {l.label}
                  <span className="material-symbols-outlined text-lg opacity-40 group-hover:opacity-100 transition-opacity">north_east</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* ── Copyright ───────────────────────────────── */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-neutral-600 text-[10px] font-bold uppercase tracking-[0.2em]">
          <div className="order-2 md:order-1">© 2026 FK STUDIO — WEB DESIGN</div>
          <div className="order-1 md:order-2 flex gap-8">
            <Link href="#" className="hover:text-white transition-colors">LEGAL</Link>
            <Link href="#" className="hover:text-white transition-colors">PRIVACY</Link>
          </div>
        </div>

      </div>
    </GridSpotlight>
  );
}
