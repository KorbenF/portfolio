import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import LatestWorkCard from "./components/LatestWorkCard";
import GridSpotlight from "./components/GridSpotlight";
import HeroTags from "./components/HeroTags";
import ViewPortfolioButton from "./components/ViewPortfolioButton";
import SiteFooter from "./components/SiteFooter";
import ProjectCard from "./components/ProjectCard";
import { WebMaskedSlideReveal } from "@/components/ui/masked-slide-reveal";

export default function Home() {
  return (
    <div className="font-headline text-on-background selection:bg-accent selection:text-white overflow-x-hidden bg-background">
      <main id="main-content">
        {/* Hero Section */}
        <GridSpotlight as="section" id="hero" className="min-h-screen flex flex-col px-10 pt-10 pb-20 hero-grid-bg bg-[#000000]" radius={150}>
          {/* Hero Content */}
          <div className="flex-grow flex flex-col justify-end relative z-10 max-w-7xl mx-auto w-full pt-28 md:pt-48">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
              {/* Main Text Column */}
              <div className="md:col-span-12 lg:col-span-8">
                <div className="flex items-center gap-2 mb-10">
                  <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_6px_2px_rgba(34,197,94,0.5)] animate-pulse"></div>
                  <span className="text-neutral-500 font-bold text-[10px] uppercase tracking-[0.3em]">AVAILABLE FOR NEW PROJECTS</span>
                </div>

                <div className="mb-6">
                  <WebMaskedSlideReveal
                    text={["Websites for", "ambitious", "brands."]}
                    staggerDelay={4}
                    speed={1.2}
                    background="transparent"
                    as="h1"
                    isAbsolute={false}
                    accentColor="#F85F1E"
                    lineHeight={0.88}
                    className="font-extrabold text-[12vw] md:text-[8vw] lg:text-[7.5rem] leading-[0.9] tracking-[-0.04em] text-white flex flex-wrap justify-start text-left w-full"
                  />
                </div>

                <p className="text-neutral-400 text-xl md:text-2xl font-medium leading-relaxed mb-8 md:whitespace-nowrap">
                  Less noise, more impact. Just a really good website.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10 w-full sm:w-auto">
                  <a href="#contact" className="w-full sm:w-auto bg-accent text-white py-4 px-8 rounded-full font-bold uppercase tracking-widest text-xs transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(248,95,30,0.3)] text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black">
                    Start a Project
                  </a>
                  <ViewPortfolioButton />
                </div>
              </div>

              {/* Tags & Latest Work Column */}
              <div className="md:col-span-12 lg:col-span-4 flex flex-col h-full items-center lg:items-end mt-12 lg:mt-0">
                <div className="w-full flex flex-col items-center lg:items-end mb-auto lg:pt-4">
                  <div className="text-neutral-500 font-bold text-xs md:text-sm lg:text-base uppercase tracking-[0.3em] mb-8 lg:mb-12 text-center lg:text-right">
                    SINCE <span className="text-white">2026</span>
                  </div>
                  <HeroTags />
                </div>

                <LatestWorkCard />
              </div>
            </div>
          </div>
        </GridSpotlight>

        {/* Curated Portfolios (Bento Grid) */}
        <section id="work" className="py-40 bg-surface-container-lowest">
          <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
            <div className="flex justify-between items-end mb-20">
              <div className="space-y-4">
                <span className="text-accent font-bold tracking-[0.3em] uppercase text-xs">Portfolio</span>
                <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white">Selected Works</h2>
              </div>
              <div className="hidden md:block text-right max-w-md">
                <p className="text-outline text-sm leading-relaxed text-balance">
                  A collection of digital experiences built with a focus on clarity, precision, and user-centric design.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
              {/* Slot 1 - Web Presentation */}
              <ProjectCard
                href="#contact"
                colSpan="md:col-span-8"
                aspectRatio="aspect-[16/9]"
                imageSrc="/images/slot_web_placeholder.webp"
                imageAlt="Abstract architecture blueprint placeholder representing a web design concept"
                tagText="AVAILABLE SLOT"
                isTagAccent={true}
                title="Space for your new website"
                description="We design and develop custom websites that capture attention, set you apart from competition, and drive real business results."
                ctaText="Secure slot"
                isWide={true}
                sizes="(max-width: 768px) 100vw, 66vw"
                priority={true}
              />

              {/* Slot 2 - E-Commerce */}
              <ProjectCard
                href="#contact"
                colSpan="md:col-span-4"
                aspectRatio="aspect-[4/5]"
                imageSrc="/images/slot_eshop_placeholder.webp"
                imageAlt="Sleek abstract 3D design placeholder representing an e-shop concept"
                tagText="E-COMMERCE"
                title="Your future e-shop"
                description="Fast, reliable shopping experiences focused on clean user journeys and maximum conversion rates."
                ctaText="Book slot"
                isWide={false}
                sizes="(max-width: 768px) 100vw, 33vw"
              />

              {/* Slot 3 - Branding */}
              <ProjectCard
                href="#contact"
                colSpan="md:col-span-4"
                aspectRatio="aspect-[4/5]"
                imageSrc="/images/slot_branding_placeholder.webp"
                imageAlt="Abstract typographic graphic placeholder representing a brand identity concept"
                tagText="BRANDING & UI"
                title="Your brand identity"
                description="A comprehensive design system and unique logo that clearly express your company values and unify your brand."
                ctaText="Book slot"
                isWide={false}
                sizes="(max-width: 768px) 100vw, 33vw"
              />

              {/* Slot 4 - Web Apps */}
              <ProjectCard
                href="#contact"
                colSpan="md:col-span-8"
                aspectRatio="aspect-[16/9]"
                imageSrc="/images/slot_webapp_placeholder.webp"
                imageAlt="Futuristic data grids and interface layout placeholder representing a web app concept"
                tagText="WEB APPLICATION"
                title="Custom web application"
                description="Have an idea for a SaaS product or need to digitize internal processes and databases? We design and build fast, scalable systems."
                ctaText="Secure slot"
                isWide={true}
                sizes="(max-width: 768px) 100vw, 66vw"
              />
            </div>
          </div>
        </section>

        {/* About/Studio Section */}
        <section id="about" className="py-40 bg-surface">
          <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              <div className="md:col-span-4 mb-20 md:mb-0">
                <h2 className="text-6xl font-black tracking-tighter leading-none mb-8 text-white">BASED IN<br />BRATISLAVA</h2>
                <div className="w-20 h-1 bg-accent"></div>
              </div>

              <div className="md:col-span-8 space-y-16">
                <div className="space-y-8">
                  <h3 className="text-2xl md:text-3xl font-light leading-tight text-white">
                    We build digital spaces that feel as solid and intentional as great architecture. Precision-led design for brands that refuse to be average.
                  </h3>
                  <p className="text-neutral-300 font-medium text-lg leading-relaxed text-balance">
                    Founded in 2026, FK STUDIO operates at the intersection of high-end architectural identity and functional digital product design. We don't just build sites; we construct environments where brands live, breathe, and command attention.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 pt-16 border-t border-white/5">
                  <div className="space-y-4">
                    <span className="material-symbols-outlined text-accent text-3xl">edit</span>
                    <h4 className="font-bold text-xl text-white">Web Design</h4>
                    <p className="text-neutral-400 font-medium text-sm">High-end interfaces built on a solid grid system. We focus on structural integrity, speed, and clean user journeys that drive conversions.</p>
                  </div>
                  <div className="space-y-4">
                    <span className="material-symbols-outlined text-accent text-3xl">category</span>
                    <h4 className="font-bold text-xl text-white">Branding</h4>
                    <p className="text-neutral-400 font-medium text-sm">Scalable identity systems designed for longevity. From typography to complex design languages, we build brands that maintain clarity at any scale.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Footer Section */}
      <SiteFooter />
    </div>
  );
}
