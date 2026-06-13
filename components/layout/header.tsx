"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { X, ArrowUpRight, ArrowRight } from "lucide-react";
import { AnimatedLogo } from "@/components/ui/animated-logo";
import { smoothScrollTo } from "@/lib/utils";
import { syncUrlToSection, pathForSection } from "@/lib/routes";

/* ── Navegación principal (columna izquierda del overlay) ── */
const NAV = [
  { label: "Inicio",     id: "hero"      },
  { label: "Servicios",  id: "services"  },
  { label: "Portafolio", id: "portfolio" },
  { label: "Proceso",    id: "process"   },
  { label: "Nosotros",   id: "about"     },
  { label: "Contacto",   id: "contact"   },
];

/* ── Servicios (columna derecha) — index = panel del carrusel de Servicios ── */
const SERVICES = [
  { label: "Chatbot IA",              index: 0 },
  { label: "Landing Pages",           index: 3 },
  { label: "Apps Móviles",            index: 5 },
  { label: "E-commerce",              index: 4 },
  { label: "Automatizaciones",        index: 1 },
  { label: "Sistemas de Facturación", index: 8 },
];

/* ── Variants para el stagger de los links ── */
const listVariants: Variants = {
  hidden: {},
  visible: { transition: { delayChildren: 0.5, staggerChildren: 0.07 } },
};
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Bloquea el scroll de fondo mientras el overlay está abierto.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [menuOpen]);

  // Escape cierra el overlay.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  // Cierra el overlay y luego hace scroll suave + actualiza la URL.
  const goTo = (id: string, offset = 100) => {
    setMenuOpen(false);
    syncUrlToSection(id);
    setTimeout(() => smoothScrollTo(id, offset), 140);
  };
  const onNavClick = (e: React.MouseEvent, id: string, offset = 100) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || (e as React.MouseEvent).button === 1) return;
    e.preventDefault();
    goTo(id, offset);
  };

  // Va al carrusel de Servicios y lo posiciona en la tarjeta exacta.
  const onServiceClick = (e: React.MouseEvent, index: number) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    setMenuOpen(false);
    syncUrlToSection("services");
    setTimeout(() => {
      smoothScrollTo("services", 100);
      window.dispatchEvent(new CustomEvent("mc:goService", { detail: index }));
    }, 160);
  };

  return (
    <>
      {/* ════════ HEADER (estado cerrado) ════════ */}
      <motion.header
        className="hdr-bar fixed inset-x-0 top-0 z-50 flex items-center justify-between"
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <AnimatedLogo textClassName="text-xl font-bold" />

        {/* Botón de menú */}
        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          className="group flex items-center gap-3"
          style={{ background: "none", border: "none", cursor: "pointer" }}
          aria-label="Abrir menú"
          aria-expanded={menuOpen}
        >
          <span style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "14px", color: "#ffffff" }}>
            Menú
          </span>
          <span className="flex flex-col" style={{ gap: "5px" }}>
            <span className="block transition-transform duration-300 group-hover:-translate-y-[2px]" style={{ width: "24px", height: "2px", background: "#7C3AED" }} />
            <span className="block transition-transform duration-300 group-hover:translate-y-[2px]" style={{ width: "24px", height: "2px", background: "#7C3AED" }} />
          </span>
        </button>
      </motion.header>

      {/* ════════ OVERLAY FULLSCREEN (estado abierto) ════════ */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[100] overflow-y-auto"
            style={{ background: "#07071a" }}
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.77, 0, 0.175, 1] }}
            role="dialog"
            aria-modal="true"
          >
            {/* Gradiente morado tenue en las esquinas */}
            <div
              aria-hidden
              style={{
                position: "absolute", inset: 0, pointerEvents: "none",
                background:
                  "radial-gradient(circle at 85% 10%, rgba(124,58,237,0.16), transparent 50%), radial-gradient(circle at 5% 95%, rgba(124,58,237,0.1), transparent 55%)",
              }}
            />

            <div style={{ position: "relative", minHeight: "100%", display: "flex", flexDirection: "column" }}>
              {/* ── Barra superior del overlay ── */}
              <div className="hdr-bar flex items-center justify-between">
                <div onClick={() => setMenuOpen(false)}>
                  <AnimatedLogo textClassName="text-xl font-bold" />
                </div>
                <motion.button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  whileHover={{ rotate: 90 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  style={{ background: "none", border: "none", cursor: "pointer", color: "#ffffff", display: "flex", padding: "4px" }}
                  aria-label="Cerrar menú"
                >
                  <X size={28} strokeWidth={2} />
                </motion.button>
              </div>

              {/* ── Contenido — dos columnas ── */}
              <div className="hdr-overlay-grid">
                {/* COLUMNA IZQUIERDA — Navegación */}
                <motion.nav
                  className="hdr-overlay-nav"
                  variants={listVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {NAV.map((item) => (
                    <motion.a
                      key={item.id}
                      href={pathForSection(item.id)}
                      onClick={e => onNavClick(e, item.id)}
                      variants={itemVariants}
                      whileHover={{ x: 18, color: "#7C3AED" }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="hdr-nav-link group"
                      style={{
                        position: "relative",
                        display: "inline-flex",
                        alignItems: "center",
                        fontFamily: "var(--font-display)",
                        fontWeight: 700,
                        lineHeight: 1.18,
                        letterSpacing: "-0.02em",
                        color: "rgba(255,255,255,0.88)",
                        textDecoration: "none",
                        width: "fit-content",
                      }}
                    >
                      {/* Flecha que aparece al hover — a la izquierda, sin cruzar el texto */}
                      <ArrowRight
                        aria-hidden
                        className="hdr-nav-arrow opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"
                      />
                      {item.label}
                    </motion.a>
                  ))}

                  {/* CTA — Hablemos de tu proyecto */}
                  <motion.a
                    href={pathForSection("contact")}
                    onClick={e => onNavClick(e, "contact")}
                    variants={itemVariants}
                    className="hdr-cta group"
                  >
                    <span className="hdr-cta-eyebrow">¿Tienes una idea?</span>
                    <span className="hdr-cta-line">
                      Hablemos de tu proyecto
                      <ArrowRight size={26} className="hdr-cta-arrow" />
                    </span>
                  </motion.a>
                </motion.nav>

                {/* COLUMNA DERECHA — Servicios + Contacto */}
                <motion.div
                  className="hdr-overlay-side"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Promo Mundial — dorado, resalta arriba de Servicios */}
                  <a
                    href="#promocion"
                    onClick={e => onNavClick(e, "promocion", 30)}
                    className="hdr-promo-top group"
                  >
                    Promo Mundial 2026
                    <ArrowUpRight size={16} className="hdr-promo-top-arrow" />
                  </a>

                  <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "30px", color: "#7C3AED", letterSpacing: "-0.01em", margin: "0 0 28px" }}>
                    Servicios
                  </h3>

                  <div className="hdr-services-grid">
                    {SERVICES.map(s => (
                      <a
                        key={s.label}
                        href={pathForSection("services")}
                        onClick={e => onServiceClick(e, s.index)}
                        className="hdr-service-item group"
                      >
                        <span className="hdr-service-dot" />
                        <span className="hdr-service-label">{s.label}</span>
                      </a>
                    ))}
                  </div>

                  {/* Separador */}
                  <div style={{ height: "1px", background: "rgba(255,255,255,0.1)", margin: "40px 0" }} />

                  {/* Bloque de contacto */}
                  <p style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "18px", color: "#ffffff", margin: "0 0 18px" }}>
                    Coméntanos tu proyecto
                  </p>
                  <a
                    href="https://wa.me/51926948155"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontFamily: "var(--font-sans)", fontWeight: 500, fontSize: "22px", color: "#ffffff", textDecoration: "none", marginBottom: "10px", letterSpacing: "-0.01em" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#a78bfa"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#ffffff"; }}
                  >
                    +51 926 948 155
                    <ArrowUpRight size={18} style={{ color: "#7C3AED" }} />
                  </a>
                  <div style={{ display: "flex", gap: "18px", alignItems: "center" }}>
                    <span style={{ fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "14px", color: "rgba(255,255,255,0.5)" }}>
                      @mindacode
                    </span>
                    <span style={{ width: "3px", height: "3px", borderRadius: "50%", background: "rgba(255,255,255,0.25)" }} />
                    <span style={{ fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "14px", color: "rgba(255,255,255,0.35)" }}>
                      Lima, Perú
                    </span>
                  </div>
                </motion.div>
              </div>

            </div>

            {/* Estilos del overlay */}
            <style dangerouslySetInnerHTML={{ __html: `
              .hdr-overlay-grid {
                flex: 1;
                display: grid;
                grid-template-columns: 1.1fr 0.9fr;
              }
              .hdr-overlay-nav {
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                gap: 4px;
                padding: 64px 64px 0;
              }
              .hdr-nav-link { font-size: clamp(40px, 4.6vw, 60px); }
              .hdr-nav-arrow {
                position: absolute; left: -46px; top: 50%;
                width: 26px; height: 26px; color: #7C3AED;
                margin-top: -13px;
              }

              /* CTA — Hablemos de tu proyecto */
              .hdr-cta { display: flex; flex-direction: column; gap: 6px; margin-top: 46px; text-decoration: none; width: fit-content; }
              .hdr-cta-eyebrow {
                font-family: var(--font-sans); font-weight: 500; font-size: 12px;
                letter-spacing: 0.12em; text-transform: uppercase; color: rgba(255,255,255,0.4);
              }
              .hdr-cta-line {
                display: inline-flex; align-items: center; gap: 10px;
                font-family: var(--font-sans); font-weight: 600; font-size: 22px;
                color: #ffffff; transition: color .3s ease;
              }
              .hdr-cta:hover .hdr-cta-line { color: #a78bfa; }
              .hdr-cta-arrow { color: #7C3AED; transition: transform .3s ease; }
              .hdr-cta:hover .hdr-cta-arrow { transform: translateX(6px); }

              .hdr-overlay-side {
                padding: 70px 64px 0;
                border-left: 1px solid rgba(255,255,255,0.1);
              }

              /* Promo Mundial — dorado, arriba de Servicios */
              .hdr-promo-top {
                display: inline-flex; align-items: center; gap: 7px; width: fit-content;
                margin-bottom: 26px;
                font-family: var(--font-sans); font-weight: 700; font-size: 13px;
                letter-spacing: 0.18em; text-transform: uppercase;
                color: #E6B93D; text-decoration: none;
                text-shadow: 0 0 18px rgba(212,160,23,0.4);
                transition: color .25s ease;
              }
              .hdr-promo-top:hover { color: #F4CE5E; }
              .hdr-promo-top-arrow { transition: transform .25s ease; }
              .hdr-promo-top:hover .hdr-promo-top-arrow { transform: translate(2px,-2px); }
              .hdr-services-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 18px 24px;
              }
              .hdr-service-item {
                display: flex; align-items: center; gap: 10px;
                text-decoration: none; cursor: pointer;
              }
              .hdr-service-dot {
                width: 6px; height: 6px; border-radius: 50%;
                background: rgba(124,58,237,0.5);
                flex-shrink: 0;
                transition: transform .25s ease, background .25s ease;
              }
              .hdr-service-item:hover .hdr-service-dot { background: #7C3AED; transform: scale(1.6); }
              .hdr-service-label {
                font-family: var(--font-sans); font-weight: 600; font-size: 15px;
                color: rgba(255,255,255,0.7); transition: color .25s ease;
              }
              .hdr-service-item:hover .hdr-service-label { color: #ffffff; }

              @media (max-width: 900px) {
                .hdr-overlay-grid { grid-template-columns: 1fr; }
                .hdr-overlay-nav { padding: 52px 28px 8px; }
                .hdr-overlay-side { padding: 40px 28px 60px; border-left: none; border-top: 1px solid rgba(255,255,255,0.1); margin-top: 40px; }
              }
            ` }} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Padding de la barra superior (closed + overlay) */}
      <style dangerouslySetInnerHTML={{ __html: `
        .hdr-bar { padding: 24px 48px; }
        @media (max-width: 640px) { .hdr-bar { padding: 20px 24px; } }
      ` }} />
    </>
  );
}
