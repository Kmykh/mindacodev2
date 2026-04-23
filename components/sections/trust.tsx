"use client";

import { motion } from "framer-motion";
import { useT } from "@/lib/i18n";
import {
  Zap,
  Code2,
  Palette,
  Search,
  Gauge,
  HeartHandshake,
  Shield,
  Clock
} from "lucide-react";

export function TrustSection() {
  const { t } = useT();

  const trustItems = [
    { icon: Clock, label: t("trust.0") },
    { icon: Code2, label: t("trust.1") },
    { icon: Palette, label: t("trust.2") },
    { icon: Search, label: t("trust.3") },
    { icon: Gauge, label: t("trust.4") },
    { icon: HeartHandshake, label: t("trust.5") },
    { icon: Shield, label: t("trust.6") },
    { icon: Zap, label: t("trust.7") },
  ];

  const allItems = [...trustItems, ...trustItems];

  return (
    <section id="trust" className="relative overflow-hidden py-8 md:py-12">
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex animate-marquee gap-6 sm:gap-8">
          {allItems.map((item, index) => (
            <div
              key={`${item.label}-${index}`}
              className="flex shrink-0 items-center gap-2.5 rounded-full border border-white/[0.06] bg-white/[0.02] px-5 py-2.5 backdrop-blur-sm transition-colors hover:border-accent/20 hover:bg-white/[0.05]"
            >
              <item.icon className="h-4 w-4 text-accent" />
              <span className="whitespace-nowrap text-sm font-medium text-foreground-muted">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
