"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState, useRef } from "react";
import { useT } from "@/lib/i18n";
import { smoothScrollTo } from "@/lib/utils";

export const heroShowcase = [
  {
    tag: "Agrotech Mobile",
    title: "Vac App",
    description: "Gestión ganadera inteligente, trazabilidad y control veterinario en la nube.",
    pills: ["AWS", "Microservicios"]
  },
  {
    tag: "Booking System",
    title: "King Reserve",
    description: "Plataforma integral para gestión de reservas, aforos y pagos automatizados.",
    pills: ["Realtime", "Dashboard"]
  },
  {
    tag: "Fintech / EdTech",
    title: "FinanCello",
    description: "Educación financiera interactiva y gamificada para el inversor moderno.",
    pills: ["React", "Multimedia"]
  }
];



function useWordFlipper(length: number, intervalMs = 2500) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % length);
    }, intervalMs);
    return () => clearInterval(interval);
  }, [length, intervalMs]);

  return index;
}

function HeroBackground() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <motion.div ref={ref} className="absolute inset-0 overflow-hidden pointer-events-none" style={{ y: bgY, opacity: bgOpacity }}>
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)",
          backgroundSize: "80px 80px"
        }}
      />
      {/* Aurora blobs — static blur, animated opacity only (avoids re-rasterization) */}
      <motion.div
        className="absolute -top-[20%] -left-[10%] h-[600px] w-[600px] rounded-full bg-gradient-to-br from-accent/12 via-purple-600/6 to-transparent blur-[120px]"
        style={{ transform: "translateZ(0)", willChange: "opacity" }}
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-[10%] -right-[5%] h-[500px] w-[500px] rounded-full bg-gradient-to-tl from-accent-soft/10 via-cyan-500/6 to-transparent blur-[120px]"
        style={{ transform: "translateZ(0)", willChange: "opacity" }}
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      />
      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,_rgba(10,10,10,0.6)_70%)]" />
    </motion.div>
  );
}

export function Hero() {
  const { t } = useT();
  const roles = [t("hero.role.0"), t("hero.role.1"), t("hero.role.2"), t("hero.role.3"), t("hero.role.4"), t("hero.role.5")];
  const roleIndex = useWordFlipper(roles.length);
  const heroContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = heroContentRef.current;
    if (!el) return;

    const items = el.querySelectorAll<HTMLElement>("[data-hero-animate]");
    const tween = gsap.fromTo(
      items,
      { opacity: 0, y: 22, filter: "blur(10px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.8,
        ease: "power2.out",
        stagger: 0.25,
        delay: 1.2,
      }
    );

    return () => {
      tween.kill();
    };
  }, []);

  return (
    <section
      id="hero"
      data-tr-skip
      className="relative flex min-h-[100svh] flex-col items-center justify-center px-5 pt-24 pb-12 text-center sm:px-6 md:pt-28 md:pb-16"
    >
      <HeroBackground />

      <motion.div
        ref={heroContentRef}
        className="relative z-10 mx-auto w-full max-w-5xl space-y-8 md:space-y-10"
      >
        {/* Badge */}
        <motion.div data-hero-animate>
          <Badge className="mx-auto w-fit gap-2 text-sm border-accent/30 bg-accent/10 backdrop-blur-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
            </span>
            {t("hero.badge")}
          </Badge>
        </motion.div>

        {/* Label */}
        <motion.p
          data-hero-animate
          className="text-sm uppercase tracking-[0.4em] text-accent font-medium"
        >
          {t("hero.label")}
        </motion.p>

        {/* Main heading — bold, dramatic */}
        <motion.h1
          data-hero-animate
          className="text-[2.5rem] font-semibold leading-[0.95] tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl xl:text-[6.5rem]"
        >
          {t("hero.h1.1")}
          <br />
          <span
            className="inline-block"
            style={{
              color: "#9b7bff",
              textShadow:
                "0 0 40px rgba(155, 123, 255, 0.45), 0 0 80px rgba(123, 91, 255, 0.25)",
            }}
          >
            {t("hero.h1.2")}
          </span>
        </motion.h1>

        <motion.div
          data-hero-animate
          className="mx-auto max-w-2xl space-y-4"
        >
          <p className="text-base text-foreground-muted sm:text-lg md:text-xl leading-relaxed">
            {t("hero.sub")}
          </p>
          <p className="text-base sm:text-lg md:text-xl flex items-center justify-center flex-wrap gap-x-2">
            <span className="text-foreground-muted">{t("hero.sub.prefix")}</span>
            <AnimatePresence mode="wait">
              <motion.span
                key={roleIndex}
                initial={{ y: 15, opacity: 0, filter: "blur(4px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                exit={{ y: -15, opacity: 0, filter: "blur(4px)" }}
                transition={{ duration: 0.3 }}
                className="inline-block text-accent font-bold"
              >
                {roles[roleIndex]}
              </motion.span>
            </AnimatePresence>
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          data-hero-animate
          className="flex flex-col items-stretch justify-center gap-3 pt-2 w-full max-w-md mx-auto sm:max-w-none sm:w-auto sm:flex-row sm:items-center"
        >
          <Button
            className="text-base group shine-hover h-14 px-10 sm:w-auto w-full active:scale-[0.97] transition-transform"
            size="lg"
            onClick={() => smoothScrollTo("contact", 100)}
          >
            {t("hero.cta1")}
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1.5" />
          </Button>
          <Button
            variant="secondary"
            size="lg"
            className="text-base group border-white/10 h-14 px-10 sm:w-auto w-full active:scale-[0.97] transition-transform"
            onClick={() => smoothScrollTo("services", 100)}
          >
            <Play className="mr-2 h-4 w-4 text-accent" />
            {t("hero.cta2")}
          </Button>
        </motion.div>

      </motion.div>
    </section>
  );
}
