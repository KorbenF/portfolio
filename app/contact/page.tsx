import type { Metadata } from 'next';
import ContactPageContent from './ContactPageContent';

export const metadata: Metadata = {
  title: 'New Project | FK STUDIO',
  description: "Start a new project with FK STUDIO. Tell us about your vision and we'll get back to you within 24 hours.",
  robots: { index: true, follow: true },
  openGraph: {
    title: 'New Project | FK STUDIO',
    description: 'Start a new project with FK STUDIO.',
    type: 'website',
  },
};

export default function ContactPage() {
  return <ContactPageContent />;
}
