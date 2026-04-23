"use client";

import { motion } from "framer-motion";
import { useT } from "@/lib/i18n";
import {
  Atom,
  BrainCircuit,
  CloudCog,
  Database,
  Smartphone,
  Terminal
} from "lucide-react";

const techStack = [
  {
    title: "Frontend Moderno",
    icon: Atom,
    description: "La parte visual que tus clientes usan todos los días.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"]
  },
  {
    title: "Backend Robusto",
    icon: Terminal,
    description: "El motor interno que procesa reglas, usuarios y pagos.",
    stack: ["C# .NET", "Java Spring Boot", "Node.js", "Python"]
  },
  {
    title: "Cloud & DevOps",
    icon: CloudCog,
    description: "Servidores y despliegues automáticos para no detener tu negocio.",
    stack: ["AWS", "Docker", "Vercel", "CI/CD", "Kubernetes"]
  },
  {
    title: "Mobile Nativo",
    icon: Smartphone,
    description: "Apps para iPhone y Android con buena experiencia de uso.",
    stack: ["Flutter", "React Native", "Expo", "Swift", "Kotlin"]
  },
  {
    title: "Data & Storage",
    icon: Database,
    description: "Bases de datos preparadas para crecer sin perder información.",
    stack: ["PostgreSQL", "MongoDB", "Redis", "Supabase"]
  },
  {
    title: "Inteligencia Artificial",
    icon: BrainCircuit,
    description: "Automatizaciones y asistentes inteligentes para ahorrar tiempo.",
    stack: ["OpenAI API", "LangChain", "Pinecone", "Hugging Face"]
  }
];

export function TechStackSection() {
  const { t } = useT();

  return (
    <section id="tech" className="relative overflow-hidden py-16 md:py-28">
      <div className="section-container">
        <motion.div
          className="mb-12 space-y-5 text-center md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm uppercase tracking-[0.3em] text-accent font-medium">{t("tech.label")}</p>
          <h2 className="text-3xl font-semibold text-white sm:text-4xl md:text-6xl">
            {t("tech.h2.1")}{" "}
            <span className="text-gradient-flow text-glow-pulse">{t("tech.h2.2")}</span>
          </h2>
          <p className="mx-auto max-w-2xl text-base text-foreground-muted sm:text-lg">
            {t("tech.sub")}
          </p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {techStack.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.06, duration: 0.4 }}
              className="group"
            >
              <div className="relative flex h-full flex-col gap-4 overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition-all duration-500 hover:border-white/15 hover:bg-white/[0.05] sm:rounded-3xl md:p-8">
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent/5 blur-[60px] transition-all group-hover:bg-accent/10" />

                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 border border-white/5 text-accent group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                    <category.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{t(`tech.c${index}.title`)}</h3>
                    <p className="text-xs text-foreground-muted">{t(`tech.c${index}.desc`)}</p>
                  </div>
                </div>

                <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                <div className="flex flex-wrap gap-2">
                  {category.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-lg border border-white/5 bg-white/5 px-3 py-1.5 text-xs font-medium text-foreground-muted transition-colors hover:border-white/20 hover:text-white cursor-default"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
