"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Hero3DScene } from "@/components/ui/hero-3d-scene";
import { useEffect, useState, useRef } from "react";
import { useT } from "@/lib/i18n";
import { smoothScrollTo } from "@/lib/utils";

/* ── Word flipper ──────────────────────────────────────── */
function useWordFlipper(length: number, intervalMs = 2500) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((p) => (p + 1) % length), intervalMs);
    return () => clearInterval(id);
  }, [length, intervalMs]);
  return index;
}

/* ── Hacker scramble text ──────────────────────────────── */
const SCRAMBLE = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#@";

function HackerText({ text, className }: { text: string; className?: string }) {
  type CS = { char: string; locked: boolean };
  const target = text.charAt(0).toUpperCase() + text.slice(1);
  const [chars, setChars] = useState<CS[]>(() =>
    Array.from(target, (c) => ({ char: c, locked: true }))
  );

  useEffect(() => {
    const t = target;
    const len = t.length;
    let frame = 0;
    const TOTAL = 14;

    setChars(Array.from({ length: len }, () => ({
      char: SCRAMBLE[Math.floor(Math.random() * SCRAMBLE.length)],
      locked: false,
    })));

    const id = setInterval(() => {
      frame++;
      const p = frame / TOTAL;
      if (frame >= TOTAL) {
        setChars(Array.from(t, (c) => ({ char: c, locked: true })));
        clearInterval(id);
        return;
      }
      setChars(
        Array.from({ length: len }, (_, i) => {
          const locked = p > (i / len) * 0.65 + 0.2;
          return {
            char: locked ? t[i] : SCRAMBLE[Math.floor(Math.random() * SCRAMBLE.length)],
            locked,
          };
        })
      );
    }, 42);

    return () => clearInterval(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return (
    <span className={className} aria-label={target}>
      {chars.map((c, i) => (
        <span
          key={i}
          style={{
            color: c.locked ? "inherit" : "rgba(123,91,255,0.72)",
            opacity: c.locked ? 1 : 0.8,
            transition: "color 0.18s ease, opacity 0.18s ease",
          }}
        >
          {c.char}
        </span>
      ))}
    </span>
  );
}


/* ── Background aurora ─────────────────────────────────── */
function HeroBackground() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <motion.div
      ref={ref}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ y: bgY, opacity: bgOpacity }}
    >
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      <motion.div
        className="absolute -top-[20%] -left-[10%] h-[600px] w-[600px] rounded-full bg-gradient-to-br from-accent/10 via-purple-600/5 to-transparent blur-[120px]"
        style={{ transform: "translateZ(0)", willChange: "opacity" }}
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-[10%] right-[5%] h-[500px] w-[500px] rounded-full bg-gradient-to-tl from-accent-soft/8 via-cyan-500/4 to-transparent blur-[120px]"
        style={{ transform: "translateZ(0)", willChange: "opacity" }}
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,_rgba(10,10,10,0.5)_70%)]" />
    </motion.div>
  );
}

/* ── Hero ──────────────────────────────────────────────── */
const PHRASES = [
  { verb: "diseñamos",   complement: "lo que imaginaste" },
  { verb: "construimos", complement: "lo que tu negocio necesita" },
  { verb: "escalamos",   complement: "lo que imaginaste" },
  { verb: "lanzamos",    complement: "lo que tu negocio necesita" },
];

export function Hero() {
  const { t } = useT();
  const verbIndex = useWordFlipper(PHRASES.length, 2800);
  const heroContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Prefetch Three.js chunk en paralelo al GSAP, no en serie
    import("three").catch(() => {});

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
        stagger: 0.28,
        delay: 1.0,
      }
    );
    return () => { tween.kill(); };
  }, []);

  return (
    <section
      id="hero"
      data-tr-skip
      className="relative flex min-h-[100svh] items-center px-5 pt-28 pb-16 sm:px-6 lg:pt-32 lg:pb-20"
    >
      <HeroBackground />

      {/* Galaxia 3D — fondo del hero, detrás del texto */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <Hero3DScene className="h-full w-full" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[56fr_44fr]">

          {/* ── Left: text ── */}
          <motion.div
            ref={heroContentRef}
            className="flex flex-col items-center gap-8 text-center lg:items-start lg:text-left lg:gap-9"
          >
            {/* Label */}
            <p
              data-hero-animate
              className="text-sm uppercase tracking-[0.4em] text-accent font-semibold"
            >
              {t("hero.label")}
            </p>

            {/* Headline */}
            <h1
              data-hero-animate
              className="text-[2.2rem] font-extrabold leading-[0.92] text-foreground sm:text-5xl md:text-6xl lg:text-[4.6rem] xl:text-[5rem]"
              style={{ letterSpacing: "-0.03em" }}
            >
              {/* Verb — hacker scramble */}
              <HackerText text={PHRASES[verbIndex].verb} />
              <br />
              {/* Complement — fade slide */}
              <AnimatePresence mode="wait">
                <motion.span
                  key={verbIndex}
                  initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -14, filter: "blur(6px)" }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block leading-[0.92]"
                  style={{
                    color: "#9b7bff",
                    textShadow:
                      "0 0 40px rgba(155,123,255,0.45), 0 0 80px rgba(123,91,255,0.25)",
                  }}
                >
                  {PHRASES[verbIndex].complement}
                </motion.span>
              </AnimatePresence>
            </h1>

            {/* CTAs */}
            <div
              data-hero-animate
              className="flex flex-col items-stretch gap-3 w-full max-w-xs sm:max-w-none sm:flex-row sm:items-center lg:mx-0"
            >
              {/* Primary — gradient glow */}
              <button
                onClick={() => smoothScrollTo("contact", 100)}
                className="group relative overflow-hidden rounded-2xl h-14 px-9 font-bold text-[15px] text-white w-full sm:w-auto active:scale-[0.97] transition-transform duration-150"
                style={{
                  background: "linear-gradient(135deg, #7b5bff 0%, #9b7bff 50%, #5cd0ff 100%)",
                  backgroundSize: "200% 200%",
                  boxShadow: "0 0 28px rgba(123,91,255,0.4), 0 2px 8px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.12)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow =
                    "0 0 48px rgba(123,91,255,0.65), 0 4px 16px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.15)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow =
                    "0 0 28px rgba(123,91,255,0.4), 0 2px 8px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.12)";
                }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {t("hero.cta1")}
                  <ArrowRight className="h-4.5 w-4.5 transition-transform duration-200 group-hover:translate-x-1" />
                </span>
                {/* Shine sweep */}
                <span
                  aria-hidden
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-600 bg-gradient-to-r from-transparent via-white/15 to-transparent"
                />
              </button>

              {/* Secondary — glass */}
              <button
                onClick={() => smoothScrollTo("services", 100)}
                className="group relative overflow-hidden rounded-2xl h-14 px-9 font-semibold text-[15px] text-foreground/90 border border-white/12 bg-white/[0.04] backdrop-blur-sm hover:border-accent/35 hover:bg-accent/[0.07] hover:text-white transition-all duration-200 w-full sm:w-auto active:scale-[0.97]"
                style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)" }}
              >
                <span className="flex items-center justify-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent/15 ring-1 ring-accent/25 group-hover:bg-accent/25 transition-colors duration-200">
                    <Play className="h-3 w-3 text-accent fill-accent" />
                  </span>
                  {t("hero.cta2")}
                </span>
              </button>
            </div>
          </motion.div>

          {/* La galaxia 3D ahora es fondo fijo de toda la página (ver app/page.tsx);
              esta columna queda libre para que se vea a la derecha del texto. */}

        </div>
      </div>
    </section>
  );
}
