'use client';

import { useState, useEffect, Suspense } from 'react';
import SiteFooter from '../components/SiteFooter';
import ScrollToTop from '../components/ScrollToTop';
import ContactForm from './ContactForm';

export default function ContactPageContent() {
  const [submitted, setSubmitted] = useState(false);

  // When form is submitted, scroll back to top so the success message is visible
  useEffect(() => {
    if (submitted) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [submitted]);

  return (
    <div className="font-headline text-on-background bg-background min-h-screen selection:bg-accent selection:text-white overflow-x-hidden">
      <ScrollToTop />

      <main id="main-content">
        {submitted ? (
          /* ── Full-section success ───────────────────────── */
          <section className="min-h-[85vh] flex flex-col items-center justify-center px-6 text-center animate-fade-in">
            <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mb-10">
              <span className="material-symbols-outlined text-accent" style={{ fontSize: '2.5rem' }}>check_circle</span>
            </div>
            <h1 className="font-extrabold text-[3.5rem] md:text-[6rem] leading-[0.9] tracking-[-0.04em] text-white mb-8">
              Message<br />
              <span className="text-accent">sent.</span>
            </h1>
            <p className="text-neutral-400 text-lg md:text-xl font-medium max-w-md leading-relaxed">
              We&apos;ll review your request and get back to you within 24 hours.
            </p>
          </section>
        ) : (
          /* ── Normal layout ──────────────────────────────── */
          <section className="pt-40 pb-32 px-6 md:px-12 max-w-screen-2xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">

              {/* Left — headline & contact info */}
              <div className="lg:col-span-5 lg:sticky lg:top-40">
                <div className="flex items-center gap-2 mb-10">
                  <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_6px_2px_rgba(34,197,94,0.5)] animate-pulse" />
                  <span className="text-neutral-500 font-bold text-[10px] uppercase tracking-[0.3em]">Available for new projects</span>
                </div>

                <h1 className="font-extrabold text-[3.5rem] md:text-[5rem] lg:text-[6rem] leading-[0.9] tracking-[-0.04em] text-white mb-8">
                  New<br />
                  <span className="text-accent">project.</span>
                </h1>

                <p className="text-neutral-400 text-lg font-medium leading-relaxed mb-12 max-w-sm">
                  Tell us about your project and let&apos;s bring it to life. We&apos;ll get back to you within 24 hours.
                </p>

                {/* Direct contact — Desktop only */}
                <div className="hidden lg:block border-t border-white/5 pt-8 mt-12">
                  <p className="text-neutral-600 text-[10px] font-bold uppercase tracking-[0.3em] mb-4">Or reach us directly</p>
                  <a
                    href="mailto:hello@fkstudio.sk"
                    className="text-xl md:text-2xl font-medium text-neutral-200 hover:text-white transition-colors duration-300 group flex items-center gap-2"
                  >
                    hello@fkstudio.sk
                    <span className="material-symbols-outlined text-base opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">north_east</span>
                  </a>
                </div>
              </div>

              {/* Right — form */}
              <div className="lg:col-span-7 relative">
                <Suspense fallback={<div className="text-neutral-500 font-bold text-xs uppercase tracking-widest animate-pulse">Loading form...</div>}>
                  <ContactForm onSuccess={() => setSubmitted(true)} />
                </Suspense>

                {/* Direct contact — Mobile only */}
                <div className="lg:hidden border-t border-white/5 pt-12 mt-20">
                  <p className="text-neutral-600 text-[10px] font-bold uppercase tracking-[0.3em] mb-4">Or reach us directly</p>
                  <a
                    href="mailto:hello@fkstudio.sk"
                    className="text-2xl font-medium text-neutral-200 hover:text-white transition-colors duration-300 group flex items-center gap-2"
                  >
                    hello@fkstudio.sk
                    <span className="material-symbols-outlined text-base opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">north_east</span>
                  </a>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <SiteFooter showCta={false} />
    </div>
  );
}
