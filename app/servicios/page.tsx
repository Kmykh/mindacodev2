import type { Metadata } from "next";
import { SitePage } from "@/components/site-page";

export const metadata: Metadata = {
  title: "Servicios — Mindacode | Desarrollo Web, Apps e IA",
  description:
    "Chatbots, automatizaciones, landing pages, e-commerce, apps móviles e inteligencia artificial. Tecnología al servicio de tu negocio 24/7.",
  alternates: { canonical: "/servicios" },
  openGraph: {
    title: "Servicios — Mindacode",
    description:
      "Chatbots, automatizaciones, landing pages, e-commerce, apps móviles e inteligencia artificial.",
    url: "/servicios"
  }
};

export default function ServiciosPage() {
  return <SitePage initialSection="services" />;
}
