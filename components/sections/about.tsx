"use client";

import { motion } from "framer-motion";
import { useT } from "@/lib/i18n";
import {
  Eye,
  Flag,
  HeartHandshake,
  LineChart,
  ShieldCheck,
  Zap
} from "lucide-react";

const corporateGoals = [
  {
    type: "Misión",
    text: "Democratizar la tecnología de alto nivel. Convertimos ideas complejas en activos digitales escalables, ayudando a emprendedores y empresas a liderar sus mercados con software robusto.",
    icon: Flag,
    color: "text-blue-400",
    borderColor: "border-blue-500/20",
    bgColor: "bg-blue-500/10"
  },
  {
    type: "Visión",
    text: "Ser el partner tecnológico de referencia en Latam. Aspiramos a redefinir el estándar de la industria, donde la calidad del código y la experiencia de usuario sean innegociables.",
    icon: Eye,
    color: "text-purple-400",
    borderColor: "border-purple-500/20",
    bgColor: "bg-purple-500/10"
  }
];

const values = [
  {
    title: "Excelencia Técnica",
    description: "No entregamos 'código que funciona', entregamos arquitecturas que escalan. Clean Code y Testing son norma.",
    icon: ShieldCheck
  },
  {
    title: "Transparencia Radical",
    description: "Sin letras chicas. Acceso total al tablero de tareas, reportes y blockers. Somos una extensión de tu equipo.",
    icon: HeartHandshake
  },
  {
    title: "Innovación Pragmática",
    description: "No usamos IA o Blockchain por moda. Implementamos tecnología solo cuando aporta valor real y medible.",
    icon: Zap
  },
  {
    title: "Orientación a Resultados",
    description: "El software es una inversión. Nos enfocamos en métricas clave (KPIs) para asegurar que traiga retorno.",
    icon: LineChart
  }
];

export function AboutSection() {
  const { t } = useT();

  return (
    <section id="about" className="relative overflow-hidden py-16 md:py-28">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[400px] w-[400px] bg-accent/4 blur-[100px] rounded-full pointer-events-none" style={{ transform: "translate(0, -50%) translateZ(0)" }} />

      <div className="relative z-10 section-container">
        {/* Header */}
        <motion.div
          className="mx-auto mb-12 max-w-3xl space-y-5 text-center md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm uppercase tracking-[0.3em] text-accent font-medium">{t("about.label")}</p>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-6xl">
            {t("about.h2.1")}{" "}
            <br className="hidden sm:block" />
            <span className="text-gradient-flow text-glow-pulse">{t("about.h2.2")}</span>
          </h2>
          <p className="text-base text-foreground-muted sm:text-lg">
            {t("about.sub")}
          </p>
        </motion.div>

        {/* Mission & Vision */}
        <div className="mb-12 grid gap-5 md:mb-20 md:grid-cols-2 md:gap-6">
          {corporateGoals.map((item, index) => (
            <motion.div
              key={item.type}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              className={`rounded-2xl border ${item.borderColor} ${item.bgColor} p-6 backdrop-blur-sm sm:rounded-3xl sm:p-8`}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className={`p-3 rounded-2xl ${item.bgColor} ${item.color}`}>
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className={`text-xl font-bold ${item.color} sm:text-2xl`}>{t(`about.${["mission", "vision"][index]}.type`)}</h3>
              </div>
              <p className="text-sm leading-relaxed text-foreground-muted sm:text-base md:text-lg">
                {t(`about.${["mission", "vision"][index]}.text`)}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-12 opacity-40">
          <div className="h-px bg-white/10 flex-1" />
          <span className="text-xs uppercase tracking-[0.3em] text-foreground-muted">{t("about.dna")}</span>
          <div className="h-px bg-white/10 flex-1" />
        </div>

        {/* Values */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.4 }}
              className="group"
            >
              <div className="h-full rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition-all duration-300 hover:border-accent/20 hover:bg-white/[0.05] hover:-translate-y-1">
                <div className="mb-4 inline-flex rounded-xl bg-white/5 p-3 text-foreground-muted group-hover:text-accent group-hover:bg-accent/10 transition-colors">
                  <value.icon className="h-6 w-6" />
                </div>
                <h4 className="mb-2 text-lg font-semibold text-foreground">
                  {t(`about.v${index}.title`)}
                </h4>
                <p className="text-sm text-foreground-muted leading-relaxed">
                  {t(`about.v${index}.desc`)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
