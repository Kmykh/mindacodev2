import type { Metadata } from "next";
import { Poppins, Syne } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-sans",
  display: "swap"
});

// Fuente display editorial — títulos grandes del menú overlay.
const syne = Syne({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mindacode.com"),
  title: "Mindacode — Agencia Digital",
  description:
    "Agencia digital especializada en desarrollo web, apps móviles, inteligencia artificial y arquitecturas escalables. Diseñamos el futuro digital de tu negocio.",
  keywords: [
    "agencia digital",
    "desarrollo web",
    "apps móviles",
    "software a medida",
    "React",
    "Next.js",
    "inteligencia artificial",
    "Lima Perú"
  ],
  authors: [{ name: "Minda Code" }],
  creator: "Minda Code",
  publisher: "Minda Code",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  alternates: {
    canonical: "/",
    languages: {
      "es-PE": "/",
      "en-US": "/"
    }
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  openGraph: {
    title: "Minda Code | Agencia Digital — Diseñamos el Futuro",
    description:
      "Transformamos ideas complejas en ecosistemas digitales escalables. Desarrollo web, mobile y AI.",
    type: "website",
    locale: "es_PE",
    url: "/",
    siteName: "Minda Code",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Minda Code — Agencia Digital"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Minda Code | Agencia Digital Premium",
    description:
      "Código limpio, arquitectura sólida y despliegues listos para producción.",
    images: ["/og-image.jpg"]
  }
};

import { Providers } from "./providers";
import { CosmicSpace } from "@/components/ui/cosmic-space";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Minda Code",
  url: "https://mindacode.com",
  logo: "https://mindacode.com/favicon.ico",
  description:
    "Agencia digital especializada en desarrollo web, apps móviles e inteligencia artificial.",
  address: {
    "@type": "PostalAddress",
    addressCountry: "PE",
    addressLocality: "Lima"
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+51-926-948-155",
    contactType: "customer service",
    email: "mindacode@gmail.com",
    availableLanguage: ["Spanish", "English"]
  },
  sameAs: ["https://wa.me/51926948155"]
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body
        className={`${poppins.variable} ${syne.variable} text-foreground antialiased`}
      >
        <a
          href="#hero"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[999] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-background focus:shadow-glow focus:outline-none"
        >
          Saltar al contenido principal
        </a>
        <CosmicSpace />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
