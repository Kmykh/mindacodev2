"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Gift, CheckCircle2, Flame, Clock, ArrowRight, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useT } from "@/lib/i18n";

import Image from "next/image";

const MOTHERS_DAY_EXPIRY = new Date("2026-05-13T23:59:59").getTime();

function useCountdown() {
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0, expired: false });

  useEffect(() => {
    const tick = () => {
      const diff = MOTHERS_DAY_EXPIRY - Date.now();
      if (diff <= 0) {
        setTimeLeft({ d: 0, h: 0, m: 0, s: 0, expired: true });
        return;
      }
      setTimeLeft({
        d: Math.floor(diff / 86_400_000),
        h: Math.floor((diff % 86_400_000) / 3_600_000),
        m: Math.floor((diff % 3_600_000) / 60_000),
        s: Math.floor((diff % 60_000) / 1_000),
        expired: false,
      });
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  return timeLeft;
}

function TimeBlock({ value, label }: { value: number; label: string }) {
  const prev = useRef(value);
  const [flipping, setFlipping] = useState(false);

  useEffect(() => {
    if (prev.current !== value) {
      setFlipping(true);
      const t = setTimeout(() => setFlipping(false), 300);
      prev.current = value;
      return () => clearTimeout(t);
    }
  }, [value]);

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="relative flex h-[50px] w-[50px] sm:h-[64px] sm:w-[64px] md:h-[80px] md:w-[80px] items-center justify-center overflow-hidden rounded-xl border border-rose-400/20 bg-gradient-to-b from-white/[0.08] to-white/[0.02] shadow-lg backdrop-blur-md">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-rose-300/50 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-black/10" />
        <motion.span
          key={value}
          initial={{ y: flipping ? -20 : 0, opacity: flipping ? 0 : 1 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="text-lg sm:text-xl md:text-3xl font-black text-white tabular-nums tracking-tight"
        >
          {String(value).padStart(2, "0")}
        </motion.span>
      </div>
      <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.15em] text-rose-300/80 font-semibold">{label}</span>
    </div>
  );
}

export function TimeLimitedOffer() {
  const { t } = useT();
  const { d, h, m, s, expired } = useCountdown();
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    if (expired) return;
    
    let timer: ReturnType<typeof setTimeout>;
    let hasTriggered = false;

    const onScroll = () => {
      if (window.scrollY > 600 && !hasTriggered) {
        hasTriggered = true;
        // Wait gracefully before showing the offer so it doesn't appear abruptly
        timer = setTimeout(() => {
          setVisible(true);
        }, 2500);
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(timer);
    };
  }, [expired]);

  const handleOfferClaim = () => {
    const text = encodeURIComponent("¡Hola Minda! 💖 Vengo de la promoción del Día de la Madre y me encantaría tener una Página Web increíble ✨");
    window.open(`https://wa.me/51926948155?text=${text}`, "_blank", "noopener,noreferrer");
  };

  if (!visible || expired) return null;

  return (
    <div id="oferta" className="pointer-events-none fixed inset-0 z-[100]">
      <AnimatePresence initial={false} mode="wait">
        {expanded ? (
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="pointer-events-auto absolute inset-0 bg-[#090508]/80 backdrop-blur-md"
              onClick={() => setExpanded(false)}
            />
            <motion.aside
              key="modal"
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="pointer-events-auto relative w-full max-w-[440px] overflow-hidden rounded-[2rem] border border-rose-400/40 bg-[#120a11]/98 shadow-[0_0_100px_-20px_rgba(244,63,94,0.6)]"
              aria-label="Oferta Día de la Madre"
            >
              {/* Floating Hearts Animation */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(12)].map((_, i) => {
                  const startX = Math.random() * 100;
                  const driftX = (Math.random() - 0.5) * 80;
                  const duration = 4 + Math.random() * 4;
                  const delay = Math.random() * 4;
                  const size = 0.8 + Math.random() * 0.8;
                  const emoji = ["💖", "✨", "🌸", "💕"][i % 4];

                  return (
                    <motion.div
                      key={i}
                      initial={{ y: 100, x: 0, opacity: 0, scale: 0.5, rotate: 0 }}
                      animate={{ 
                        y: -350, 
                        x: driftX,
                        opacity: [0, 1, 1, 0], 
                        scale: [0.5, size, size, size * 0.8],
                        rotate: [0, driftX * 1.5]
                      }}
                      transition={{ 
                        duration: duration, 
                        repeat: Infinity, 
                        delay: delay,
                        ease: "easeOut"
                      }}
                      className="absolute bottom-[-50px] text-4xl drop-shadow-[0_0_15px_rgba(244,63,94,0.6)]"
                      style={{ left: `${startX}%` }}
                    >
                      {emoji}
                    </motion.div>
                  );
                })}
              </div>

              <div className="relative z-10 flex items-center justify-between border-b border-rose-500/20 bg-gradient-to-r from-rose-500/30 via-pink-400/20 to-transparent px-5 py-4">
                <div className="flex items-center gap-2 text-[12px] font-black uppercase tracking-[0.2em] text-rose-200">
                  <Gift className="h-4 w-4 text-rose-400" />
                  Especial Día de la Madre
                </div>
                <button
                  onClick={() => setExpanded(false)}
                  aria-label="Minimizar oferta"
                  className="rounded-full bg-black/20 p-2 text-rose-200/70 transition-colors hover:bg-rose-500/40 hover:text-white"
                >
                  <Minimize2 className="h-4 w-4" />
                </button>
              </div>

              <div className="relative z-10 p-1.5">
                <div className="relative h-56 w-full overflow-hidden rounded-[1.75rem] shadow-inner">
                  <Image 
                    src="/mothers-day.png" 
                    alt="Día de la Madre" 
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 440px) 100vw, 440px"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#120a11] via-[#120a11]/40 to-transparent/10" />
                  <div className="absolute bottom-4 left-5 right-5 text-center">
                     <h3 className="text-[28px] leading-tight font-black text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                       Impulsa su Negocio
                     </h3>
                     <p className="mt-1 text-[15px] font-medium text-rose-100 drop-shadow-[0_2px_5px_rgba(0,0,0,0.8)]">
                       El mejor regalo: una <span className="text-rose-300 font-bold">Página Web Profesional</span>
                     </p>
                  </div>
                </div>
              </div>

              <div className="relative z-10 space-y-5 px-6 pb-6 pt-2 text-center">
                <p className="text-[15px] text-rose-100/80 leading-relaxed font-medium">
                  Sorprende a Mamá con una presencia online increíble. Aprovecha nuestra <span className="font-bold text-rose-300">promoción exclusiva</span> para crear o renovar su sitio web. ✨👩‍💻
                </p>

                <div className="flex items-end justify-center gap-1.5 sm:gap-2">
                  <TimeBlock value={d} label="Días" />
                  <span className="mb-4 sm:mb-6 text-xl font-black text-rose-300/80">:</span>
                  <TimeBlock value={h} label="Hrs" />
                  <span className="mb-4 sm:mb-6 text-xl font-black text-rose-300/80">:</span>
                  <TimeBlock value={m} label="Min" />
                  <span className="mb-4 sm:mb-6 text-xl font-black text-rose-300/80">:</span>
                  <TimeBlock value={s} label="Seg" />
                </div>

                <Button
                  className="group relative h-14 w-full overflow-hidden rounded-xl bg-gradient-to-r from-rose-500 via-pink-500 to-rose-500 bg-[length:200%_auto] text-[15px] font-black text-white shadow-[0_0_20px_rgba(244,63,94,0.4)] transition-all hover:bg-[100%_auto] hover:shadow-[0_0_30px_rgba(244,63,94,0.6)] hover:-translate-y-0.5 active:translate-y-0"
                  onClick={handleOfferClaim}
                >
                  <span className="relative z-10 flex items-center justify-center">
                    💖 ¡Reclamar Promoción Web!
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Button>
              </div>
            </motion.aside>
          </div>
        ) : (
          <div className="absolute bottom-4 right-3 sm:bottom-5 sm:right-5">
            <motion.button
              key="collapsed"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              onClick={() => setExpanded(true)}
              className="pointer-events-auto flex items-center gap-2.5 rounded-full border border-rose-400/40 bg-[#120a11]/95 px-5 py-3 text-[13px] font-bold uppercase tracking-[0.16em] text-rose-300 shadow-[0_10px_30px_-10px_rgba(244,63,94,0.6)] backdrop-blur-md transition-transform hover:scale-105 active:scale-95"
            >
              <Gift className="h-5 w-5 text-rose-400 animate-pulse" />
              Promoción Web 🎁
            </motion.button>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
