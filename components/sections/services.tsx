"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";
import {
  BrainCircuit,
  CalendarClock,
  Cpu,
  Globe,
  ShoppingCart,
  Smartphone,
  ArrowUpRight,
  Bot,
  Zap
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useT } from "@/lib/i18n";

type ServiceItem = {
  title: string;
  description: string;
  icon: typeof Bot;
  gradient: string;
  tags: string[];
  popular: boolean;
};

function ServiceCard({ service, index }: { service: ServiceItem; index: number }) {
  const { t } = useT();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.05, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="h-full"
    >
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition-all duration-500 hover:border-white/15 hover:bg-white/[0.05] sm:rounded-3xl cursor-default"
      >
        {/* Top shine */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

        {/* Popular badge */}
        {service.popular && (
          <div className="absolute -right-8 top-5 rotate-45 bg-gradient-to-r from-accent to-accent-soft px-10 py-0.5 text-[9px] font-bold uppercase tracking-widest text-background shadow-lg">
            {t("services.popular")}
          </div>
        )}

        <div className="relative z-10">
          {/* Icon */}
          <motion.div
            className={`mb-5 inline-flex rounded-2xl bg-gradient-to-br ${service.gradient} p-3.5 shadow-lg`}
            whileHover={{ scale: 1.1, rotate: -3 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <service.icon className="h-6 w-6 text-white" />
          </motion.div>

          <h3 className="mb-2 text-lg font-bold leading-tight text-white sm:text-xl">
            {service.title}
          </h3>
          <p className="text-sm leading-relaxed text-foreground-muted/80">{service.description}</p>
        </div>

        {/* Tags + arrow */}
        <div className="relative z-10 mt-5 flex items-center justify-between border-t border-white/[0.06] pt-4">
          <div className="flex flex-wrap gap-1.5">
            {service.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-lg bg-white/5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white/60 border border-white/[0.04] transition-colors group-hover:bg-white/10 group-hover:text-white/80"
              >
                {tag}
              </span>
            ))}
          </div>
          <motion.div
            className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white/5 text-foreground-muted transition-all group-hover:bg-accent/20 group-hover:text-accent"
            animate={isHovered ? { rotate: 0, scale: 1, opacity: 1 } : { rotate: -45, scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowUpRight className="h-4 w-4" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export function ServicesSection() {
  const { t } = useT();

  const services: ServiceItem[] = [
    {
      title: t("services.s0.title"),
      description: t("services.s0.desc"),
      icon: Bot,
      gradient: "from-violet-500 to-purple-600",
      tags: ["WhatsApp", "Instagram", "24/7"],
      popular: true
    },
    {
      title: t("services.s1.title"),
      description: t("services.s1.desc"),
      icon: Zap,
      gradient: "from-amber-500 to-orange-600",
      tags: ["n8n", "Zapier", "API"],
      popular: true
    },
    {
      title: t("services.s2.title"),
      description: t("services.s2.desc"),
      icon: CalendarClock,
      gradient: "from-emerald-500 to-green-600",
      tags: ["Calendly", "Cal.com", "Google"],
      popular: false
    },
    {
      title: t("services.s3.title"),
      description: t("services.s3.desc"),
      icon: Globe,
      gradient: "from-blue-500 to-cyan-600",
      tags: ["SEO", "CMS", "Landing"],
      popular: false
    },
    {
      title: t("services.s4.title"),
      description: t("services.s4.desc"),
      icon: ShoppingCart,
      gradient: "from-pink-500 to-rose-600",
      tags: ["Stripe", "Stock", "Ventas"],
      popular: false
    },
    {
      title: t("services.s5.title"),
      description: t("services.s5.desc"),
      icon: Smartphone,
      gradient: "from-indigo-500 to-blue-600",
      tags: ["iOS", "Android", "Flutter"],
      popular: false
    },
    {
      title: t("services.s6.title"),
      description: t("services.s6.desc"),
      icon: BrainCircuit,
      gradient: "from-fuchsia-500 to-purple-700",
      tags: ["GPT", "LLM", "Data"],
      popular: false
    },
    {
      title: t("services.s7.title"),
      description: t("services.s7.desc"),
      icon: Cpu,
      gradient: "from-cyan-500 to-sky-600",
      tags: ["AWS", "API", "Server"],
      popular: false
    }
  ];

  return (
    <section id="services" className="relative overflow-hidden py-16 md:py-28">
      {/* Ambients */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[5%] top-[10%] h-[400px] w-[400px] rounded-full bg-purple-500/[0.04] blur-[100px]" style={{ transform: "translateZ(0)" }} />
        <div className="absolute bottom-[10%] right-[5%] h-[400px] w-[400px] rounded-full bg-blue-500/[0.04] blur-[100px]" style={{ transform: "translateZ(0)" }} />
      </div>

      <div className="relative section-container">
        {/* Header — Staff Digital style: centered, bold */}
        <motion.div
          className="mx-auto mb-12 max-w-3xl space-y-5 text-center md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm uppercase tracking-[0.3em] text-accent font-medium">{t("services.label")}</p>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-6xl">
            {t("services.h2.1")}{" "}
            <br className="hidden sm:block" />
            <span className="text-gradient-flow text-glow-pulse">{t("services.h2.2")}</span>
          </h2>
          <p className="max-w-2xl mx-auto text-base text-foreground-muted sm:text-lg">
            {t("services.sub")}
          </p>
        </motion.div>

        {/* Grid */}
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-6 bg-gradient-to-r from-background to-transparent md:hidden" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-6 bg-gradient-to-l from-background to-transparent md:hidden" />

          <div className="flex gap-4 overflow-x-auto pb-4 mobile-snap-scroll [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:pb-0 lg:grid-cols-3 xl:grid-cols-4">
            {services.map((service, index) => (
              <div key={service.title} className="min-w-[75vw] snap-center sm:min-w-[320px] md:min-w-0">
                <ServiceCard service={service} index={index} />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile swipe hint */}
        <motion.div
          className="flex items-center justify-center gap-2 mt-4 md:hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <motion.span
            className="text-[11px] uppercase tracking-widest text-foreground-muted/50"
            animate={{ x: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            {t("services.swipe")}
          </motion.span>
        </motion.div>
      </div>
    </section>
  );
}
