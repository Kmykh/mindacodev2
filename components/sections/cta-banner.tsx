"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useT } from "@/lib/i18n";

import { smoothScrollTo } from "@/lib/utils";

export function CtaBanner() {
  const { t } = useT();

  const handleSchedule = () => {
    smoothScrollTo("contact");
    const text = encodeURIComponent(t("cta.whatsapp"));
    window.open(`https://wa.me/51926948155?text=${text}`, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-2xl border border-accent/15 bg-gradient-to-br from-accent/8 via-background to-accent-soft/5 p-8 sm:p-12 md:rounded-[2rem] md:p-20"
        >
          {/* Decorative glows */}
          <div className="absolute -right-20 -top-20 h-[300px] w-[300px] rounded-full bg-accent/8 blur-[100px]" />
          <div className="absolute -left-20 -bottom-20 h-[250px] w-[250px] rounded-full bg-accent-soft/8 blur-[100px]" />

          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(123, 91, 255, 1) 1px, transparent 1px)",
              backgroundSize: "24px 24px"
            }}
          />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

          <div className="relative z-10 flex flex-col items-center gap-8 text-center">
            <motion.div
              className="flex h-16 w-16 items-center justify-center rounded-2xl border border-accent/20 bg-accent/10 text-accent"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles className="h-8 w-8" />
            </motion.div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold leading-tight sm:text-3xl md:text-5xl lg:text-6xl">
                {t("cta.h2.1")}
                <br className="hidden sm:block" />
                <span className="text-gradient-flow text-glow-pulse"> {t("cta.h2.2")}</span>
              </h2>
              <p className="mx-auto max-w-xl text-sm text-foreground-muted sm:text-base md:text-lg">
                {t("cta.sub")}
              </p>
            </div>

            <div className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">
              <Button
                className="group h-14 px-10 text-base font-semibold shine-hover shadow-glow-accent active:scale-[0.97] transition-transform"
                size="lg"
                onClick={handleSchedule}
              >
                {t("cta.btn")}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1.5" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
