"use client";

import { motion, useInView } from "framer-motion";
import { useT } from "@/lib/i18n";
import { Code2, Figma, Headset, Rocket, Search } from "lucide-react";
import { useRef } from "react";

type StepItem = {
  number: string;
  title: string;
  description: string;
  icon: typeof Search;
  accent: string;
  borderColor: string;
  bgColor: string;
  glowColor: string;
};

function ProcessStep({ step, index }: { step: StepItem; index: number }) {
  const { t } = useT();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative grid grid-cols-[48px_1fr] items-start gap-4 sm:grid-cols-[64px_1fr] sm:gap-6 md:grid-cols-[80px_1fr] md:gap-8"
    >
      {/* Timeline node */}
      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          className={`flex h-12 w-12 items-center justify-center rounded-xl border-2 ${step.borderColor} ${step.bgColor} shadow-lg backdrop-blur-sm sm:h-16 sm:w-16 sm:rounded-2xl`}
          initial={{ scale: 0, rotate: -90 }}
          animate={isInView ? { scale: 1, rotate: 0 } : {}}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: index * 0.1 + 0.15 }}
        >
          <step.icon className={`h-5 w-5 ${step.accent} sm:h-6 sm:w-6`} />
        </motion.div>
      </div>

      {/* Content */}
      <div className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 backdrop-blur-sm transition-all duration-500 hover:border-white/15 hover:bg-white/[0.04] sm:p-6 sm:rounded-3xl md:p-8">
        <div className="mb-3 flex items-center gap-3">
          <span className={`rounded-full ${step.bgColor} ${step.accent} px-3 py-1 text-[11px] font-bold tracking-[0.2em]`}>
            {t("process.step")} {step.number}
          </span>
          <span className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
        </div>

        <h3 className="mb-2 text-lg font-bold text-foreground sm:text-xl md:text-2xl">
          {step.title}
        </h3>
        <p className="max-w-2xl text-sm leading-relaxed text-foreground-muted sm:text-base md:text-lg">
          {step.description}
        </p>
      </div>
    </motion.div>
  );
}

export function ProcessSection() {
  const { t } = useT();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const steps: StepItem[] = [
    {
      number: "01",
      title: t("process.s0.title"),
      description: t("process.s0.desc"),
      icon: Search,
      accent: "text-blue-400",
      borderColor: "border-blue-400/20",
      bgColor: "bg-blue-400/10",
      glowColor: "rgba(96, 165, 250, 0.08)"
    },
    {
      number: "02",
      title: t("process.s1.title"),
      description: t("process.s1.desc"),
      icon: Figma,
      accent: "text-fuchsia-400",
      borderColor: "border-fuchsia-400/20",
      bgColor: "bg-fuchsia-400/10",
      glowColor: "rgba(232, 121, 249, 0.08)"
    },
    {
      number: "03",
      title: t("process.s2.title"),
      description: t("process.s2.desc"),
      icon: Code2,
      accent: "text-emerald-400",
      borderColor: "border-emerald-400/20",
      bgColor: "bg-emerald-400/10",
      glowColor: "rgba(52, 211, 153, 0.08)"
    },
    {
      number: "04",
      title: t("process.s3.title"),
      description: t("process.s3.desc"),
      icon: Rocket,
      accent: "text-orange-400",
      borderColor: "border-orange-400/20",
      bgColor: "bg-orange-400/10",
      glowColor: "rgba(251, 146, 60, 0.08)"
    },
    {
      number: "05",
      title: t("process.s4.title"),
      description: t("process.s4.desc"),
      icon: Headset,
      accent: "text-pink-400",
      borderColor: "border-pink-400/20",
      bgColor: "bg-pink-400/10",
      glowColor: "rgba(244, 114, 182, 0.08)"
    }
  ];

  return (
    <section id="process" className="relative overflow-hidden py-16 md:py-28">
      {/* Ambients */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          className="absolute left-[8%] top-16 h-56 w-56 rounded-full bg-accent/8 blur-[90px]"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="mx-auto w-full max-w-5xl px-5 sm:px-6">
        {/* Header */}
        <motion.div
          className="mb-12 space-y-5 text-center md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm uppercase tracking-[0.3em] text-accent font-medium">{t("process.label")}</p>
          <h2 className="text-3xl font-semibold leading-tight sm:text-4xl md:text-6xl">
            {t("process.h2.1")}{" "}
            <span className="text-gradient-flow text-glow-pulse">{t("process.h2.2")}</span>
          </h2>
          <p className="mx-auto max-w-2xl text-base text-foreground-muted sm:text-lg">
            {t("process.sub")}
          </p>
        </motion.div>

        {/* Timeline */}
        <div ref={containerRef} className="relative space-y-6 md:space-y-8">
          <div className="absolute left-6 top-4 bottom-4 w-px sm:left-8 md:left-10">
            <motion.div
              className="h-full w-full bg-gradient-to-b from-accent/40 via-accent-soft/20 to-transparent"
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: "top" }}
            />
          </div>

          {steps.map((step, index) => (
            <ProcessStep key={step.title} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
