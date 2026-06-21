'use client';

import { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

const PROJECT_TYPES = [
  { id: 'website',  label: 'Website',  icon: 'language' },
  { id: 'eshop',    label: 'E-Shop',   icon: 'storefront' },
  { id: 'redesign', label: 'Redesign', icon: 'auto_fix_high' },
  { id: 'other',    label: 'Other',    icon: 'more_horiz' },
];

const TIMELINES = [
  { id: '2w',    label: '< 2 Weeks' },
  { id: '1-2m',  label: '1 – 2 Months' },
  { id: 'flex',  label: 'Flexible' },
];

type FormState = 'idle' | 'loading' | 'error';

export default function ContactForm({ onSuccess }: { onSuccess?: () => void }) {
  const searchParams = useSearchParams();
  const [projectType, setProjectType] = useState<string | null>(null);
  const [timeline, setTimeline]       = useState<string | null>(null);
  const [formState, setFormState]     = useState<FormState>('idle');
  const [errors, setErrors]           = useState<Record<string, string>>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Pre-select project type from URL query parameter (e.g. /contact?type=eshop)
  useEffect(() => {
    const typeQuery = searchParams.get('type');
    if (typeQuery && PROJECT_TYPES.some(pt => pt.id === typeQuery)) {
      setProjectType(typeQuery);
    }
  }, [searchParams]);

  const validate = (data: FormData) => {
    const errs: Record<string, string> = {};
    if (!data.get('name')?.toString().trim())        errs.name    = 'Name is required';
    const email = data.get('email')?.toString().trim() ?? '';
    if (!email)                                       errs.email   = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Invalid email address';
    if (!projectType)                                 errs.type    = 'Please select a project type';
    if (!timeline)                                    errs.timeline = 'Please select a timeline';
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    // 1. Honeypot check: if bot filled it, simulate success without sending email
    if (data.get('website_url')) {
      onSuccess?.();
      return;
    }

    // 2. Client-side Rate Limiting: max 1 submission per minute
    const lastSub = localStorage.getItem('last_contact_sub');
    const now = Date.now();
    if (lastSub && now - parseInt(lastSub, 10) < 60000) {
      setErrorMessage('Too many requests. Please wait a minute before trying again.');
      setFormState('error');
      return;
    }

    const errs = validate(data);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setFormState('loading');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:        data.get('name'),
          email:       data.get('email'),
          message:     data.get('message'),
          projectType,
          timeline,
          websiteUrl:  data.get('website_url'),
        }),
      });

      const resData = await res.json();

      if (!res.ok) {
        if (res.status === 429) {
          throw new Error('Too many requests. Please wait a minute before trying again.');
        }
        throw new Error(resData.error || 'Something went wrong. Please try again or email us directly.');
      }

      // Save rate-limit timestamp
      localStorage.setItem('last_contact_sub', Date.now().toString());

      onSuccess?.();
      formRef.current?.reset();
      setProjectType(null);
      setTimeline(null);
      setFormState('idle');
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong.');
      setFormState('error');
    }
  };


  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-10">

      {/* ── Honeypot (hidden from humans) ─────────────── */}
      <input
        type="text"
        name="website_url"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute opacity-0 pointer-events-none w-0 h-0"
      />

      {/* ── Name & Email ───────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div className="flex flex-col gap-2">
          <label htmlFor="contact-name" className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500">
            Your name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="John Doe"
            className={`bg-[#131313] border-b pb-3 text-white placeholder:text-neutral-700 font-medium focus:outline-none transition-colors duration-300 ${
              errors.name ? 'border-red-500 focus:border-red-400' : 'border-white/10 focus:border-accent'
            }`}
          />
          {errors.name && <p className="text-red-400 text-[10px] font-bold">{errors.name}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="contact-email" className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500">
            Email address
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            placeholder="your@company.com"
            className={`bg-[#131313] border-b pb-3 text-white placeholder:text-neutral-700 font-medium focus:outline-none transition-colors duration-300 ${
              errors.email ? 'border-red-500 focus:border-red-400' : 'border-white/10 focus:border-accent'
            }`}
          />
          {errors.email && <p className="text-red-400 text-[10px] font-bold">{errors.email}</p>}
        </div>
      </div>

      {/* ── Project type ───────────────────────────────── */}
      <div className="flex flex-col gap-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500">
          What do you need?
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {PROJECT_TYPES.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => { setProjectType(t.id === projectType ? null : t.id); setErrors((e) => ({ ...e, type: '' })); }}
              style={{ touchAction: 'manipulation' }}
              className={`group flex flex-col items-center gap-2 py-5 px-3 rounded-2xl border transition-all duration-300 ${
                projectType === t.id
                  ? 'bg-accent/10 border-accent text-white'
                  : 'bg-neutral-900/40 border-white/5 text-neutral-400 hover:border-white/20 hover:text-white'
              }`}
            >
              <span className={`material-symbols-outlined text-xl transition-colors duration-300 ${
                projectType === t.id ? 'text-accent' : ''
              }`}>
                {t.icon}
              </span>
              <span className="text-[10px] font-black uppercase tracking-widest">{t.label}</span>
            </button>
          ))}
        </div>
        {errors.type && <p className="text-red-400 text-[10px] font-bold">{errors.type}</p>}
      </div>

      {/* ── Timeline ────────────────────────────────────── */}
      <div className="flex flex-col gap-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500">
          Timeline
        </p>
        <div className="flex flex-wrap gap-3">
          {TIMELINES.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => { setTimeline(t.id === timeline ? null : t.id); setErrors((e) => ({ ...e, timeline: '' })); }}
              style={{ touchAction: 'manipulation' }}
              className={`rounded-full px-5 py-2 text-xs font-black uppercase tracking-widest border transition-all duration-300 ${
                timeline === t.id
                  ? 'bg-accent text-white border-accent'
                  : 'bg-transparent border-white/10 text-neutral-400 hover:border-white/30 hover:text-white'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        {errors.timeline && <p className="text-red-400 text-[10px] font-bold">{errors.timeline}</p>}
      </div>

      {/* ── Message ─────────────────────────────────────── */}
      <div className="flex flex-col gap-2">
        <label htmlFor="contact-message" className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500">
          Tell us about your project <span className="text-neutral-700">(optional)</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          placeholder="Share your vision, goals, references, or any details that could help us understand your project better…"
          className="bg-[#131313] border-b border-white/10 focus:border-accent pb-3 text-white placeholder:text-neutral-700 font-medium focus:outline-none transition-colors duration-300 resize-none"
        />
      </div>

      {/* ── Submit ─────────────────────────────────────── */}
      {formState === 'error' && (
        <p className="text-red-400 text-xs font-bold">
          {errorMessage || 'Something went wrong. Please try again or email us directly.'}
        </p>
      )}

      <button
        type="submit"
        disabled={formState === 'loading'}
        className="w-full sm:w-auto flex items-center justify-center gap-3 bg-accent text-white rounded-full px-10 py-5 font-black uppercase tracking-widest text-sm transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(248,95,30,0.3)] disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
      >
        {formState === 'loading' ? (
          <>
            <span className="material-symbols-outlined text-xl animate-spin">progress_activity</span>
            Sending…
          </>
        ) : (
          <>
            Send message
            <span className="material-symbols-outlined text-xl">arrow_right_alt</span>
          </>
        )}
      </button>
    </form>
  );
}
