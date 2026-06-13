import type { Metadata } from "next";
import { SitePage } from "@/components/site-page";

export const metadata: Metadata = {
  title: "Nosotros — Mindacode | Tu Socio Digital",
  description:
    "Más que desarrolladores, somos tu socio digital. Conoce nuestra misión, visión y el ADN que hace de Mindacode tu partner tecnológico en Latinoamérica.",
  alternates: { canonical: "/nosotros" },
  openGraph: {
    title: "Nosotros — Mindacode",
    description: "Más que desarrolladores, somos tu socio digital.",
    url: "/nosotros"
  }
};

export default function NosotrosPage() {
  return <SitePage initialSection="about" />;
}
