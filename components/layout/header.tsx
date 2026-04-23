"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedLogo } from "@/components/ui/animated-logo";
import { cn, smoothScrollTo } from "@/lib/utils";
import { useT } from "@/lib/i18n";

const navKeys = [
  { tKey: "header.services", id: "services" },
  { tKey: "header.portfolio", id: "portfolio" },
  { tKey: "header.process", id: "process" },
  { tKey: "header.about", id: "about" },
  { tKey: "header.contact", id: "contact" }
];

export function Header() {
  const { t, locale, setLocale } = useT();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = navKeys.map(i => i.id);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "unset";
  }, [menuOpen]);

  // Close mobile menu with Escape key (a11y focus trap lite)
  useEffect(() => {
    if (!menuOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [menuOpen]);

  const scrollToSection = (id: string, offset: number = 100) => {
    setMenuOpen(false);
    smoothScrollTo(id, offset);
  };

  return (
    <>
      <motion.header
        className={cn(
          "fixed inset-x-0 z-50 flex justify-center px-4 transition-all duration-500",
          scrolled ? "pt-3" : "pt-5"
        )}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div
          className={cn(
            "relative flex w-full max-w-6xl items-center justify-between rounded-full border px-6 py-3 transition-all duration-500 sm:px-8",
            scrolled
              ? "border-white/10 bg-black/70 backdrop-blur-xl shadow-2xl shadow-black/40"
              : "border-white/5 bg-white/[0.02] backdrop-blur-md"
          )}
        >
          <AnimatedLogo textClassName="text-lg sm:text-xl" />

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navKeys.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={cn(
                  "relative px-4 py-2 text-[13px] font-medium transition-colors rounded-full tracking-wide",
                  activeSection === item.id
                    ? "text-white"
                    : "text-foreground-muted hover:text-foreground"
                )}
              >
                {t(item.tKey)}
                {activeSection === item.id && (
                  <motion.span
                    layoutId="activeNav"
                    className="absolute inset-0 rounded-full bg-white/10 border border-white/10"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Language + CTA */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => scrollToSection("promocion", 30)}
              className="relative overflow-hidden group flex items-center gap-1.5 rounded-full border border-rose-400/40 bg-rose-500/10 px-3 py-1.5 text-[12px] font-bold text-rose-300 transition-all hover:bg-rose-500/20 hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(244,63,94,0.3)]"
            >
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              >
              </motion.span>
              Promo Mamá
            </button>
            <button
              onClick={() => setLocale(locale === "es" ? "en" : "es")}
              className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[12px] font-semibold text-foreground-muted transition-all hover:border-accent/30 hover:text-white"
              aria-label="Change language"
            >
              <Globe className="h-3.5 w-3.5" />
              {t("lang.switch")}
            </button>
            <Button
              size="sm"
              className="rounded-full px-6 text-[13px] font-semibold"
              onClick={() => scrollToSection("contact")}
            >
              {t("header.cta")}
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden flex items-center justify-center rounded-full border border-white/10 bg-white/5 p-2.5 text-foreground hover:text-accent active:scale-95 transition-all min-w-[44px] min-h-[44px]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu — Bottom Sheet */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-x-0 bottom-0 z-50 md:hidden safe-bottom"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label="Menú de navegación"
            >
              <div className="rounded-t-[28px] border border-white/10 border-b-0 bg-zinc-900/98 backdrop-blur-xl shadow-2xl shadow-black/60">
                <div className="flex justify-center py-3">
                  <div className="h-1 w-10 rounded-full bg-white/20" />
                </div>

                <div className="flex flex-col px-5 pb-3">
                  {navKeys.map((item, index) => (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.04 }}
                      onClick={() => scrollToSection(item.id)}
                      className={cn(
                        "flex items-center w-full text-left px-4 py-4 text-[17px] font-medium rounded-2xl transition-all active:scale-[0.97]",
                        activeSection === item.id
                          ? "bg-accent/10 text-accent"
                          : "text-foreground-muted hover:bg-white/5 hover:text-white"
                      )}
                    >
                      {t(item.tKey)}
                    </motion.button>
                  ))}
                  {/* Mobile Promo toggle */}
                  <button
                    onClick={() => scrollToSection("promocion")}
                    className="flex items-center gap-2.5 px-4 py-3 text-[15px] font-bold text-rose-300 rounded-2xl hover:bg-rose-500/10 active:scale-[0.97] transition-all bg-rose-500/5 border border-rose-500/20 mb-1"
                  >
                    <motion.span
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    >
                      🎁
                    </motion.span>
                    Especial Mamá
                  </button>
                  {/* Mobile language toggle */}
                  <button
                    onClick={() => setLocale(locale === "es" ? "en" : "es")}
                    className="flex items-center gap-2 px-4 py-3 text-[15px] font-medium text-foreground-muted rounded-2xl hover:bg-white/5 active:scale-[0.97] transition-all"
                  >
                    <Globe className="h-4 w-4" />
                    {locale === "es" ? "English" : "Español"}
                  </button>
                  <div className="mt-3 px-2 pb-3">
                    <Button
                      className="w-full rounded-2xl h-14 text-base font-semibold"
                      onClick={() => scrollToSection("contact")}
                    >
                      {t("header.cta")}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
