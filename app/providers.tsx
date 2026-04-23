"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { LocaleProvider } from "@/lib/i18n";
import { setLenis } from "@/lib/lenis";
import { TextReveal } from "@/components/ui/text-reveal";

export function Providers({ children }: { children: React.ReactNode }) {
  // Pause all CSS animations during resize/zoom to prevent jank and white flash.
  useEffect(() => {
    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      document.body.classList.add("resize-animation-stopper");
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        document.body.classList.remove("resize-animation-stopper");
      }, 400);
    };
    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  // Smooth scroll (Lenis). Disabled if the user prefers reduced motion.
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });
    setLenis(lenis);

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      setLenis(undefined);
    };
  }, []);

  return (
    <LocaleProvider>
      {children}
      <TextReveal />
    </LocaleProvider>
  );
}
