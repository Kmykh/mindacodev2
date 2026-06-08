"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { AnimatedLogo } from "@/components/ui/animated-logo";
import { cn, smoothScrollTo } from "@/lib/utils";
import { useT } from "@/lib/i18n";

const navKeys = [
  { tKey: "header.services",  id: "services"  },
  { tKey: "header.portfolio", id: "portfolio" },
  { tKey: "header.process",   id: "process"   },
  { tKey: "header.about",     id: "about"     },
  { tKey: "header.contact",   id: "contact"   },
];

export function Header() {
  const { t } = useT();
  const [scrolled,       setScrolled]       = useState(false);
  const [menuOpen,       setMenuOpen]       = useState(false);
  const [activeSection,  setActiveSection]  = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = navKeys.map(i => i.id);
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); }),
      { rootMargin: "-30% 0px -60% 0px" }
    );
    ids.forEach(id => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "unset";
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const go = (id: string, offset = 100) => { setMenuOpen(false); smoothScrollTo(id, offset); };

  return (
    <>
      <motion.header
        className={cn(
          "fixed inset-x-0 z-50 flex justify-center px-4 transition-all duration-500",
          scrolled ? "pt-3" : "pt-5"
        )}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className={cn(
            "relative flex w-full max-w-6xl items-center justify-between rounded-full border px-6 py-3 transition-all duration-500 sm:px-8",
            scrolled
              ? "border-white/[0.08] bg-[#07071a]/85 backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.5)]"
              : "border-white/[0.04] bg-white/[0.015] backdrop-blur-md"
          )}
        >
          {/* Logo */}
          <AnimatedLogo textClassName="text-lg sm:text-xl" />

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center" style={{ gap: "2px" }}>
            {navKeys.map(item => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => go(item.id)}
                  style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "7px 16px",
                    borderRadius: "100px",
                    background: isActive ? "rgba(124,58,237,0.14)" : "transparent",
                    border: isActive ? "1px solid rgba(167,139,250,0.22)" : "1px solid transparent",
                    cursor: "pointer",
                    fontFamily: "var(--font-sans)",
                    fontSize: "12.5px",
                    fontWeight: isActive ? 500 : 400,
                    letterSpacing: "0.04em",
                    color: isActive ? "#c4b5fd" : "rgba(255,255,255,0.42)",
                    transition: "all 0.25s",
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                  }}
                  onMouseEnter={e => {
                    if (!isActive) {
                      const b = e.currentTarget as HTMLButtonElement;
                      b.style.color = "rgba(255,255,255,0.75)";
                      b.style.background = "rgba(255,255,255,0.04)";
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isActive) {
                      const b = e.currentTarget as HTMLButtonElement;
                      b.style.color = "rgba(255,255,255,0.42)";
                      b.style.background = "transparent";
                    }
                  }}
                >
                  {t(item.tKey)}
                </button>
              );
            })}
          </nav>

          {/* CTA buttons */}
          <div className="hidden md:flex items-center" style={{ gap: "10px" }}>

            {/* Promo Mundial — gold outline, no background */}
            <button
              onClick={() => go("promocion", 30)}
              style={{
                display: "flex", alignItems: "center", gap: "8px",
                padding: "8px 18px",
                borderRadius: "100px",
                border: "1px solid rgba(212,160,23,0.55)",
                background: "transparent",
                color: "#D4A017",
                fontFamily: "var(--font-sans)",
                fontSize: "11.5px",
                fontWeight: 500,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "border-color 0.25s, background 0.25s, color 0.25s",
              }}
              onMouseEnter={e => {
                const b = e.currentTarget as HTMLButtonElement;
                b.style.background = "rgba(212,160,23,0.06)";
                b.style.borderColor = "#D4A017";
              }}
              onMouseLeave={e => {
                const b = e.currentTarget as HTMLButtonElement;
                b.style.background = "transparent";
                b.style.borderColor = "rgba(212,160,23,0.55)";
              }}
            >
              {/* Pulsing gold dot */}
              <motion.span
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  width: "5px", height: "5px", borderRadius: "50%",
                  background: "#D4A017", flexShrink: 0, display: "block",
                }}
              />
              Promo Mundial
            </button>

            {/* Contáctanos — solid purple */}
            <button
              onClick={() => go("contact")}
              style={{
                display: "flex", alignItems: "center", gap: "7px",
                padding: "10px 22px",
                borderRadius: "100px",
                border: "none",
                background: "#7C3AED",
                color: "#ffffff",
                fontFamily: "var(--font-sans)",
                fontSize: "12.5px",
                fontWeight: 600,
                letterSpacing: "0.02em",
                cursor: "pointer",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.opacity = "0.82"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = "1"; }}
            >
              {t("header.cta")}
              <ArrowRight style={{ width: "13px", height: "13px", flexShrink: 0 }} />
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04] p-2.5 text-white/70 hover:text-white active:scale-95 transition-all min-w-[44px] min-h-[44px]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile bottom sheet */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 md:hidden"
              style={{ background: "rgba(7,7,26,0.8)", backdropFilter: "blur(12px)" }}
              onClick={() => setMenuOpen(false)}
            />

            {/* Sheet */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 280, damping: 30 }}
              className="fixed inset-x-0 bottom-0 z-50 md:hidden"
              onClick={e => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
            >
              <div style={{
                borderRadius: "28px 28px 0 0",
                border: "1px solid rgba(124,58,237,0.12)",
                borderBottom: "none",
                background: "linear-gradient(180deg, #0f0f2a 0%, #09091d 100%)",
                backdropFilter: "blur(32px)",
                paddingBottom: "max(24px, env(safe-area-inset-bottom))",
              }}>
                {/* Drag handle */}
                <div style={{ display: "flex", justifyContent: "center", padding: "14px 0 0" }}>
                  <div style={{ width: "36px", height: "4px", borderRadius: "2px", background: "rgba(255,255,255,0.1)" }} />
                </div>

                {/* Nav grid — 2 columns */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", padding: "16px 16px 0" }}>
                  {navKeys.map((item, idx) => {
                    const isActive = activeSection === item.id;
                    return (
                      <motion.button
                        key={item.id}
                        initial={{ opacity: 0, scale: 0.88, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ delay: idx * 0.055, duration: 0.32, ease: [0.22,1,0.36,1] }}
                        onClick={() => go(item.id)}
                        style={{
                          display: "flex", flexDirection: "column", alignItems: "flex-start",
                          padding: "16px 14px 14px",
                          borderRadius: "18px",
                          background: isActive
                            ? "linear-gradient(135deg, rgba(124,58,237,0.28) 0%, rgba(107,33,168,0.18) 100%)"
                            : "rgba(255,255,255,0.04)",
                          border: isActive
                            ? "1px solid rgba(167,139,250,0.35)"
                            : "1px solid rgba(255,255,255,0.07)",
                          cursor: "pointer",
                          gap: "12px",
                          position: "relative", overflow: "hidden",
                          boxShadow: isActive ? "0 0 20px rgba(124,58,237,0.2)" : "none",
                          transition: "all 0.25s ease",
                        }}
                      >
                        {/* Number */}
                        <span style={{
                          fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 700,
                          letterSpacing: "0.06em",
                          color: isActive ? "#a78bfa" : "rgba(255,255,255,0.22)",
                        }}>
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        {/* Name */}
                        <span style={{
                          fontFamily: "var(--font-sans)", fontSize: "16px", lineHeight: 1.2,
                          fontWeight: isActive ? 700 : 400,
                          color: isActive ? "#ffffff" : "rgba(255,255,255,0.48)",
                          textTransform: "capitalize",
                        }}>
                          {t(item.tKey)}
                        </span>
                        {/* Active dot */}
                        {isActive && (
                          <span style={{
                            position: "absolute", bottom: "12px", right: "12px",
                            width: "7px", height: "7px", borderRadius: "50%",
                            background: "#9b7bff",
                            boxShadow: "0 0 8px rgba(155,123,255,0.8)",
                          }} />
                        )}
                      </motion.button>
                    );
                  })}

                  {/* Promo card */}
                  <motion.button
                    initial={{ opacity: 0, scale: 0.88, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: navKeys.length * 0.055, duration: 0.32, ease: [0.22,1,0.36,1] }}
                    onClick={() => go("promocion")}
                    style={{
                      display: "flex", flexDirection: "column", alignItems: "flex-start",
                      padding: "16px 14px 14px",
                      borderRadius: "18px",
                      background: "rgba(212,160,23,0.07)",
                      border: "1px solid rgba(212,160,23,0.2)",
                      cursor: "pointer", gap: "12px",
                      position: "relative", overflow: "hidden",
                    }}
                  >
                    <motion.span
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                      style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#D4A017", display: "block" }}
                    />
                    <span style={{
                      fontFamily: "var(--font-sans)", fontSize: "14px", lineHeight: 1.2,
                      fontWeight: 600, color: "#D4A017",
                    }}>
                      Promo<br />Mundial
                    </span>
                  </motion.button>
                </div>

                {/* CTA */}
                <div style={{ padding: "14px 16px 0" }}>
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: (navKeys.length + 1) * 0.055, duration: 0.3, ease: [0.22,1,0.36,1] }}
                    onClick={() => go("contact")}
                    style={{
                      width: "100%",
                      display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                      padding: "17px",
                      borderRadius: "18px",
                      border: "none",
                      background: "linear-gradient(135deg, #7b5bff 0%, #9b7bff 100%)",
                      color: "#ffffff",
                      fontFamily: "var(--font-sans)",
                      fontSize: "16px",
                      fontWeight: 700,
                      letterSpacing: "0.01em",
                      cursor: "pointer",
                      boxShadow: "0 0 28px rgba(123,91,255,0.4)",
                    }}
                  >
                    {t("header.cta")}
                    <ArrowRight style={{ width: "17px", height: "17px" }} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
