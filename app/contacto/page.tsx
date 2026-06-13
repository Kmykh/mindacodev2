import type { Metadata } from "next";
import { SitePage } from "@/components/site-page";

export const metadata: Metadata = {
  title: "Contacto — Mindacode | Trabajemos Juntos",
  description:
    "¿Tienes una idea o un producto listo para escalar? Hablemos. Respondemos en menos de 24 horas. Lima, Perú — trabajo remoto en toda Latinoamérica.",
  alternates: { canonical: "/contacto" },
  openGraph: {
    title: "Contacto — Mindacode",
    description: "Es hora de trabajar juntos. Respondemos rápido.",
    url: "/contacto"
  }
};

export default function ContactoPage() {
  return <SitePage initialSection="contact" />;
}
