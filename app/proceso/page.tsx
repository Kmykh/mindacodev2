import type { Metadata } from "next";
import { SitePage } from "@/components/site-page";

export const metadata: Metadata = {
  title: "Proceso — Mindacode | De la Idea a Producción",
  description:
    "Nuestra metodología: un flujo claro, medible y sin sorpresas para construir software de calidad desde el primer sprint. Descubrimiento, diseño, desarrollo, QA y evolución.",
  alternates: { canonical: "/proceso" },
  openGraph: {
    title: "Proceso — Mindacode",
    description:
      "Un flujo claro, medible y sin sorpresas para construir software de calidad.",
    url: "/proceso"
  }
};

export default function ProcesoPage() {
  return <SitePage initialSection="process" />;
}
