"use client";

import { motion } from "framer-motion";
import { Instagram, ArrowUpRight, ArrowUp } from "lucide-react";
import { useT } from "@/lib/i18n";
import { AnimatedLogo } from "@/components/ui/animated-logo";

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const socialLinks = [
  { name: "Instagram", icon: Instagram, href: "https://instagram.com/mindacode" },
  { name: "TikTok", icon: TikTokIcon, href: "https://tiktok.com/@mindacode" },
  { name: "LinkedIn", icon: LinkedInIcon, href: "https://linkedin.com/company/mindacode" },
];

export function Footer() {
  const { t } = useT();
  const year = new Date().getFullYear();

  const footerLinks = [
    {
      title: t("footer.nav.title"),
      links: [
        { label: t("header.services"), href: "#services" },
        { label: t("header.portfolio"), href: "#portfolio" },
        { label: t("header.process"), href: "#process" },
        { label: t("header.contact"), href: "#contact" },
      ]
    },
    {
      title: t("footer.company.title"),
      links: [
        { label: t("footer.company.about"), href: "#about" },
        { label: t("header.contact"), href: "#contact" },
      ]
    }
  ];

  return (
    <footer className="relative mt-0 overflow-hidden border-t border-white/[0.06] bg-black/40 pt-16 pb-8 sm:pt-20 sm:pb-10">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-40 w-1/3 bg-accent/4 blur-[100px] pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Top — Brand + CTA */}
        <div className="mb-12 flex flex-col items-center gap-6 text-center md:mb-16">
          <AnimatedLogo textClassName="text-4xl sm:text-5xl" />
          <p className="max-w-md text-sm text-foreground-muted leading-relaxed sm:text-base">
            {t("footer.tagline")}
          </p>
          <div className="flex gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all duration-300 hover:bg-accent hover:border-accent hover:text-white hover:scale-110 text-foreground-muted"
                aria-label={social.name}
              >
                <social.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Links Grid */}
        <div className="mb-12 grid grid-cols-2 gap-8 sm:grid-cols-3 md:gap-12">
          {footerLinks.map((section) => (
            <div key={section.title} className="space-y-4">
              <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="group flex items-center text-sm text-foreground-muted transition-colors hover:text-white w-fit"
                    >
                      <ArrowUpRight className="mr-1.5 h-3 w-3 opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact column */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
              {t("footer.contact.title")}
            </h4>
            <ul className="space-y-3 text-sm text-foreground-muted">
              <li>
                <a href="mailto:mindacode@gmail.com" className="hover:text-white transition-colors">mindacode@gmail.com</a>
              </li>
              <li>
                <a href="https://wa.me/51926948155" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors">+51 926 948 155</a>
              </li>
              <li>{t("contact.location")}</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 text-xs text-foreground-muted md:flex-row">
          <p>© {year} Minda Code. {t("footer.copyright")}</p>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-foreground-muted transition-all hover:border-accent/30 hover:text-accent active:scale-95"
            aria-label="Volver arriba"
          >
            <ArrowUp className="h-3 w-3" />
            {t("footer.backToTop")}
          </button>
        </div>
      </div>
    </footer>
  );
}
