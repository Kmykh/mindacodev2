"use client";

import { useEffect } from "react";
import { motion, type Variants } from "framer-motion";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ScrollToTop } from "@/components/layout/scroll-to-top";
import { SpotlightCursor } from "@/components/ui/spotlight-cursor";
import { Hero } from "@/components/sections/hero";
import { TrustSection } from "@/components/sections/trust";
import { ServicesSection } from "@/components/sections/services";
import { PortfolioSection } from "@/components/sections/portfolio";
import { ProcessSection } from "@/components/sections/process";
import { TechStackSection } from "@/components/sections/tech-stack";
import { AboutSection } from "@/components/sections/about";
import { BrandFilmSection } from "@/components/sections/brand-film";
import { ContactSection } from "@/components/sections/contact";
import { FathersDayBanner } from "@/components/sections/fathers-day-banner";
import { smoothScrollTo } from "@/lib/utils";
import type { SectionId } from "@/lib/routes";

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 }
};

function RevealOnScroll({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={revealVariants}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

export function SitePage({ initialSection }: { initialSection?: SectionId }) {
  // When the page is opened directly on a localized route (e.g. /servicios),
  // jump to that section once the layout has settled.
  useEffect(() => {
    if (!initialSection) return;
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => smoothScrollTo(initialSection, 100));
    });
    return () => cancelAnimationFrame(id);
  }, [initialSection]);

  return (
    <>
      <SpotlightCursor />
      <Header />
      <main className="relative">
        <Hero />

        <RevealOnScroll delay={0.05}>
          <FathersDayBanner />
        </RevealOnScroll>

        <RevealOnScroll>
          <TrustSection />
        </RevealOnScroll>

        <ServicesSection />

        <RevealOnScroll>
          <PortfolioSection />
        </RevealOnScroll>

        <RevealOnScroll delay={0.05}>
          <ProcessSection />
        </RevealOnScroll>

        <RevealOnScroll delay={0.05}>
          <TechStackSection />
        </RevealOnScroll>

        <RevealOnScroll delay={0.05}>
          <AboutSection />
        </RevealOnScroll>

        <RevealOnScroll delay={0.05}>
          <BrandFilmSection />
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <ContactSection />
        </RevealOnScroll>
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
