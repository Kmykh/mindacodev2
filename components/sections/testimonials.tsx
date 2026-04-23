"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useT } from "@/lib/i18n";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

const testimonials = [
  {
    name: "Carlos Mendoza",
    role: "CEO, AgroTech Solutions",
    text: "Minda Code transformó nuestra idea en una plataforma robusta en tiempo récord. La calidad del código y la comunicación constante hicieron toda la diferencia. Nuestro sistema ahora maneja +5,000 registros diarios sin fallos.",
    avatar: "CM",
    gradient: "from-violet-500 to-purple-600",
    rating: 5,
    project: "Vac App"
  },
  {
    name: "María Elena Torres",
    role: "Directora, King Reserve",
    text: "Buscábamos un equipo que entendiera la complejidad de un sistema de reservas en tiempo real. Minda Code no solo lo logró, sino que superó nuestras expectativas con una interfaz intuitiva y un backend bulletproof.",
    avatar: "MT",
    gradient: "from-blue-500 to-cyan-600",
    rating: 5,
    project: "King Reserve"
  },
  {
    name: "Javier Rodríguez",
    role: "Founder, FinanCello",
    text: "La gamificación que implementaron en nuestra plataforma educativa aumentó la retención de usuarios en un 40%. Su dominio de React y la atención al detalle en las micro-interacciones es impresionante.",
    avatar: "JR",
    gradient: "from-emerald-500 to-green-600",
    rating: 5,
    project: "FinanCello"
  },
  {
    name: "Ana Lucía Paredes",
    role: "CMO, StyleHub",
    text: "Nuestro e-commerce pasó de 200 a 2,000 pedidos mensuales tras el rediseño de Minda Code. La velocidad de carga, el checkout optimizado y el diseño premium hicieron la diferencia en conversión.",
    avatar: "AL",
    gradient: "from-amber-500 to-orange-500",
    rating: 5,
    project: "StyleHub"
  }
];

function TestimonialCard({ testimonial, isActive, index }: { testimonial: typeof testimonials[number]; isActive: boolean; index: number }) {
  const { t } = useT();

  return (
    <div
      className={`relative flex h-full flex-col justify-between rounded-2xl border bg-white/[0.02] p-6 backdrop-blur-sm transition-all duration-500 sm:rounded-3xl sm:p-8 ${
        isActive ? "border-accent/20 bg-white/[0.04]" : "border-white/[0.06]"
      }`}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="mb-4">
        <Quote className="h-8 w-8 text-accent/20" />
      </div>

      <p className="mb-6 flex-1 text-sm leading-relaxed text-foreground-muted sm:text-base md:text-lg md:leading-relaxed">
        &ldquo;{t(`testimonials.t${index}.text`)}&rdquo;
      </p>

      <div className="flex items-center justify-between border-t border-white/[0.06] pt-5">
        <div className="flex items-center gap-3">
          <div className={`flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br ${testimonial.gradient} text-sm font-bold text-white shadow-lg`}>
            {testimonial.avatar}
          </div>
          <div>
            <p className="text-sm font-semibold text-white">{t(`testimonials.t${index}.name`)}</p>
            <p className="text-xs text-foreground-muted">{t(`testimonials.t${index}.role`)}</p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <div className="flex">
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span className="text-[10px] uppercase tracking-wider text-accent/60">{t(`testimonials.t${index}.project`)}</span>
        </div>
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  const { t } = useT();
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section id="testimonials" className="relative overflow-hidden py-16 md:py-28">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] bg-accent/[0.03] blur-[120px] rounded-full pointer-events-none" />

      <div className="relative section-container">
        {/* Header */}
        <motion.div
          className="mx-auto mb-12 max-w-3xl space-y-5 text-center md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm uppercase tracking-[0.3em] text-accent font-medium">{t("testimonials.label")}</p>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-6xl">
            {t("testimonials.h2.1")}{" "}
            <br className="hidden sm:block" />
            <span className="text-gradient-flow text-glow-pulse">{t("testimonials.h2.2")}</span>
          </h2>
          <p className="text-base text-foreground-muted sm:text-lg">
            {t("testimonials.sub")}
          </p>
        </motion.div>

        {/* Desktop: 2 at a time */}
        <div className="relative">
          <div className="hidden md:grid md:grid-cols-2 md:gap-6">
            <AnimatePresence mode="popLayout" custom={direction}>
              {[0, 1].map((offset) => {
                const idx = (activeIndex + offset) % testimonials.length;
                return (
                  <motion.div
                    key={`${idx}-${activeIndex}`}
                    custom={direction}
                    initial={{ opacity: 0, x: direction >= 0 ? 50 : -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction >= 0 ? -50 : 50 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <TestimonialCard testimonial={testimonials[idx]} isActive={offset === 0} index={idx} />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Mobile: 1 at a time */}
          <div className="md:hidden overflow-hidden"
            onTouchStart={(e) => {
              const startX = e.touches[0].clientX;
              const el = e.currentTarget;
              const handleTouchEnd = (ev: TouchEvent) => {
                const diff = startX - ev.changedTouches[0].clientX;
                if (Math.abs(diff) > 50) {
                  diff > 0 ? next() : prev();
                }
                el.removeEventListener('touchend', handleTouchEnd);
              };
              el.addEventListener('touchend', handleTouchEnd);
            }}
          >
            <AnimatePresence mode="popLayout" custom={direction}>
              <motion.div
                key={activeIndex}
                custom={direction}
                initial={{ opacity: 0, x: direction >= 0 ? 80 : -80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction >= 0 ? -80 : 80 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <TestimonialCard testimonial={testimonials[activeIndex]} isActive index={activeIndex} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              onClick={prev}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-foreground-muted transition-all hover:border-accent/30 hover:text-accent active:scale-90"
              aria-label={t("testimonials.prev")}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex gap-2.5">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => { setDirection(idx > activeIndex ? 1 : -1); setActiveIndex(idx); }}
                  className={`h-2.5 rounded-full transition-all duration-300 ${idx === activeIndex ? "w-8 bg-accent" : "w-2.5 bg-white/20 hover:bg-white/40"}`}
                  aria-label={`${t("testimonials.dot")} ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-foreground-muted transition-all hover:border-accent/30 hover:text-accent active:scale-90"
              aria-label={t("testimonials.next")}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
