"use client";

import { motion } from "framer-motion";
import { useT } from "@/lib/i18n";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function PortfolioSection() {
  const { t } = useT();

  const projects = [
    {
      title: t("portfolio.p0.title"),
      category: t("portfolio.p0.cat"),
      description: t("portfolio.p0.desc"),
      tags: ["React Native", "AWS", "Microservicios"],
      gradient: "from-violet-500/20 via-purple-600/10 to-transparent",
      accent: "text-violet-400",
      accentBg: "bg-violet-500/10 border-violet-500/20"
    },
    {
      title: t("portfolio.p1.title"),
      category: t("portfolio.p1.cat"),
      description: t("portfolio.p1.desc"),
      tags: ["Next.js", "Realtime", "Dashboard"],
      gradient: "from-blue-500/20 via-cyan-600/10 to-transparent",
      accent: "text-blue-400",
      accentBg: "bg-blue-500/10 border-blue-500/20"
    },
    {
      title: t("portfolio.p2.title"),
      category: t("portfolio.p2.cat"),
      description: t("portfolio.p2.desc"),
      tags: ["React", "Gamificación", "Multimedia"],
      gradient: "from-emerald-500/20 via-green-600/10 to-transparent",
      accent: "text-emerald-400",
      accentBg: "bg-emerald-500/10 border-emerald-500/20"
    },
    {
      title: t("portfolio.p3.title"),
      category: t("portfolio.p3.cat"),
      description: t("portfolio.p3.desc"),
      tags: ["E-commerce", "Stripe", "SEO"],
      gradient: "from-amber-500/20 via-orange-600/10 to-transparent",
      accent: "text-amber-400",
      accentBg: "bg-amber-500/10 border-amber-500/20"
    }
  ];

  return (
    <section id="portfolio" className="relative overflow-hidden py-16 md:py-28">
      <div className="absolute top-0 right-0 -mr-20 -mt-20 h-[400px] w-[400px] bg-accent/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="section-container">
        {/* Header */}
        <motion.div
          className="mx-auto mb-12 max-w-3xl space-y-5 text-center md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm uppercase tracking-[0.3em] text-accent font-medium">{t("portfolio.label")}</p>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-6xl">
            {t("portfolio.h2.1")}{" "}
            <br className="hidden sm:block" />
            <span className="text-gradient-flow text-glow-pulse">{t("portfolio.h2.2")}</span>
          </h2>
          <p className="max-w-2xl mx-auto text-base text-foreground-muted sm:text-lg">
            {t("portfolio.sub")}
          </p>
        </motion.div>

        {/* Project Grid — Staff Digital style, large cards */}
        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: idx * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="group relative"
            >
              <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] transition-all duration-500 hover:border-white/15 hover:bg-white/[0.04] sm:rounded-3xl">
                {/* Project visual area */}
                <div className={`relative h-48 sm:h-56 md:h-64 bg-gradient-to-br ${project.gradient} overflow-hidden`}>
                  {/* Grid pattern */}
                  <div
                    className="absolute inset-0 opacity-[0.08]"
                    style={{
                      backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)",
                      backgroundSize: "24px 24px"
                    }}
                  />

                  {/* Decorative elements */}
                  <motion.div
                    className="absolute top-6 right-6 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm text-white/60 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-100 scale-75"
                  >
                    <ArrowUpRight className="h-5 w-5" />
                  </motion.div>

                  {/* Category pill */}
                  <div className="absolute bottom-4 left-4">
                    <span className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold border backdrop-blur-sm ${project.accentBg} ${project.accent}`}>
                      {project.category}
                    </span>
                  </div>

                  {/* Floating shapes */}
                  <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm"
                    animate={{ y: [0, -8, 0], rotate: [0, 3, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <motion.div
                    className="absolute top-1/3 right-1/4 h-16 w-16 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm"
                    animate={{ y: [0, 6, 0], rotate: [0, -5, 0] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  />
                </div>

                {/* Content */}
                <div className="p-6 sm:p-7 md:p-8">
                  <h3 className="mb-2 text-xl font-bold text-white sm:text-2xl group-hover:text-accent transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="mb-5 text-sm text-foreground-muted leading-relaxed sm:text-base">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-lg bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/60 border border-white/[0.04]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
