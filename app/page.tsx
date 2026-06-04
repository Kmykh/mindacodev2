"use client";

import { motion, type Variants, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback, useRef } from "react";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Preloader } from "@/components/layout/preloader";
import { OfferBar } from "@/components/layout/offer-bar";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ScrollToTop } from "@/components/layout/scroll-to-top";
import { SpotlightCursor } from "@/components/ui/spotlight-cursor";
import { ScrollHyperspace } from "@/components/ui/scroll-hyperspace";
import { Hero } from "@/components/sections/hero";
import { TrustSection } from "@/components/sections/trust";
import { ServicesSection } from "@/components/sections/services";
import { TimeLimitedOffer } from "@/components/sections/time-limited-offer";
import { PortfolioSection } from "@/components/sections/portfolio";
import { ProcessSection } from "@/components/sections/process";
import { TechStackSection } from "@/components/sections/tech-stack";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { AboutSection } from "@/components/sections/about";
import { ContactSection } from "@/components/sections/contact";
import { CtaBanner } from "@/components/sections/cta-banner";
import { FathersDayBanner } from "@/components/sections/fathers-day-banner";
import { WorldCupBanner } from "@/components/sections/world-cup-banner";
import { useT } from "@/lib/i18n";
import { smoothScrollTo } from "@/lib/utils";

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


function MobileFloatingCTA() {
  const { t } = useT();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const contactEl = document.getElementById("contact");
      const contactTop = contactEl?.getBoundingClientRect().top ?? Infinity;
      setVisible(scrollY > 600 && contactTop > 200);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`mobile-cta-bar md:hidden ${visible ? "visible" : ""}`}>
      <div className="flex gap-2">
        <button
          onClick={() => smoothScrollTo("contact")}
          className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-accent via-accent-soft to-accent text-background font-semibold py-3.5 text-sm shadow-glow-sm active:scale-[0.97] transition-transform"
        >
          {t("mobileCta.btn")}
          <ArrowRight className="h-4 w-4" />
        </button>
        <a
          href="https://wa.me/51926948155"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center rounded-2xl border border-green-500/30 bg-green-500/10 px-4 text-green-400 active:scale-[0.95] transition-transform"
          aria-label="WhatsApp"
        >
          <MessageCircle className="h-5 w-5" />
        </a>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <Preloader />
      <OfferBar />
      <TimeLimitedOffer />
      <ScrollHyperspace />
      <SpotlightCursor />
      <Header />
      <main className="relative">
        <Hero />

        <RevealOnScroll delay={0.05}>
          <FathersDayBanner />
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <WorldCupBanner />
        </RevealOnScroll>

        <RevealOnScroll>
          <TrustSection />
        </RevealOnScroll>

        <RevealOnScroll>
          <ServicesSection />
        </RevealOnScroll>

        <RevealOnScroll>
          <PortfolioSection />
        </RevealOnScroll>

        <RevealOnScroll delay={0.05}>
          <ProcessSection />
        </RevealOnScroll>
        <RevealOnScroll>
          <TestimonialsSection />
        </RevealOnScroll>
        <RevealOnScroll delay={0.05}>
          <TechStackSection />
        </RevealOnScroll>

        <RevealOnScroll delay={0.05}>
          <AboutSection />
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <ContactSection />
        </RevealOnScroll>

        <RevealOnScroll>
          <CtaBanner />
        </RevealOnScroll>
      </main>
      <Footer />
      <ScrollToTop />
      <MobileFloatingCTA />
    </>
  );
}
