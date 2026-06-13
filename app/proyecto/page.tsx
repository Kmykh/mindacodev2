import type { Metadata } from "next";
import { SitePage } from "@/components/site-page";

export const metadata: Metadata = {
  title: "Proyectos — Mindacode | Casos de Éxito",
  description:
    "Proyectos que hablan por sí mismos. Conoce cómo transformamos ideas en productos digitales de alto impacto: Vac App, King Reserve, FinanCello y más.",
  alternates: { canonical: "/proyecto" },
  openGraph: {
    title: "Proyectos — Mindacode",
    description:
      "Conoce cómo transformamos ideas en productos digitales de alto impacto.",
    url: "/proyecto"
  }
};

export default function ProyectoPage() {
  return <SitePage initialSection="portfolio" />;
}
