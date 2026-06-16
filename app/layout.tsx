import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import PageTransition from "./components/PageTransition";
import Navbar from "./components/Navbar";

const manrope = Manrope({
  variable: "--font-headline",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FK STUDIO | Web Design & Development",
  description: "Professional web design and development services. Custom websites, UI/UX design, and frontend development for businesses. Get a website that converts.",
  metadataBase: new URL('https://fkstudio.sk'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'FK STUDIO | Web Design & Development',
    description: 'Professional web design and development services. Custom websites, UI/UX design, and frontend development for businesses.',
    url: 'https://fkstudio.sk',
    siteName: 'FK STUDIO',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FK STUDIO | Web Design & Development',
    description: 'Professional web design and development services. Custom websites, UI/UX design, and frontend development for businesses.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className={`${manrope.variable} antialiased font-headline`} suppressHydrationWarning>
        {/* Skip to main content — keyboard accessibility */}
        <a href="#main-content" className="skip-to-content">Skip to main content</a>
        <Navbar />
        <PageTransition>
          {children}
        </PageTransition>
      </body>
    </html>
  );
}
