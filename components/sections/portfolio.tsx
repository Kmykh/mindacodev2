"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

/* ════════════════════════════════════════════════════════
   CSS — header animations + underline
   ════════════════════════════════════════════════════════ */
const STYLES = `
@keyframes pfTagPulse{0%,100%{box-shadow:none}50%{box-shadow:0 0 14px rgba(124,58,237,0.28)}}
.pf-tag{animation:pfTagPulse 2.8s ease-in-out infinite}

/* Flotación continua de los dispositivos 3D */
@keyframes pfFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
.pf-float{animation:pfFloat 6s ease-in-out infinite;transform-style:preserve-3d}

@media(max-width:900px){
  .pf-block{flex-direction:column !important}
  .pf-side{width:100% !important;padding:40px 32px 0 !important}
  .pf-text{padding:40px 32px 48px !important}
  .pf-header-inner{flex-direction:column !important;gap:32px !important}
  .pf-index{display:none !important}
  .pf-float{animation:none}
}
`;

/* ════════════════════════════════════════════════════════
   Device3D — pose 3D con perspectiva. Entra volando desde
   afuera de la pantalla y se asienta inclinado; al hover
   se endereza de frente. Los hijos pueden usar translateZ
   para profundidad real entre capas.
   ════════════════════════════════════════════════════════ */
function Device3D({ children, from = "right" }: { children: React.ReactNode; from?: "left" | "right" }) {
  const dir = from === "right" ? 1 : -1;
  return (
    <div style={{ perspective: "1300px" }}>
      <motion.div
        initial={{ opacity: 0, x: dir * 200, rotateY: dir * -58, rotateX: 10, scale: 0.82 }}
        whileInView={{ opacity: 1, x: 0, rotateY: dir * -16, rotateX: 5, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        whileHover={{ rotateY: 0, rotateX: 0, scale: 1.03 }}
        transition={{ type: "spring", stiffness: 65, damping: 16, mass: 1.1 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="pf-float">{children}</div>
      </motion.div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   Header — "Resultados que [hablan/venden/escalan/duran]"
   Dos columnas: texto izquierda, índice de proyectos derecha
   ════════════════════════════════════════════════════════ */
const CYCLING_WORDS = ["hablan", "venden", "escalan", "duran"];
const BULLETS = [
  { icon: "→", text: "Apps nativas Flutter para iOS y Android" },
  { icon: "→", text: "Infraestructura AWS lista para escalar" },
  { icon: "→", text: "De idea a producción en semanas, no meses" },
];

function PortfolioHeader() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % CYCLING_WORDS.length), 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      style={{ padding: "88px 64px 64px" }}
    >
      <div
        className="pf-header-inner"
        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "64px" }}
      >

        {/* ══ IZQUIERDA — descripción marketera ══ */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.52, delay: 0.1 }}
          style={{ flex: 1, maxWidth: "420px" }}
        >
          {/* Label */}
          <p style={{
            fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "10px",
            color: "#7C3AED", letterSpacing: "4px", textTransform: "uppercase",
            margin: "0 0 20px",
          }}>
            Portafolio
          </p>

          {/* Tagline */}
          <p style={{
            fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "20px",
            color: "#ffffff", lineHeight: 1.5, margin: "0 0 12px",
          }}>
            No hacemos proyectos bonitos.
            <br />
            <span style={{ color: "rgba(255,255,255,0.45)", fontWeight: 300 }}>
              Construimos herramientas que trabajan para tu negocio todos los días.
            </span>
          </p>

          {/* Separador */}
          <div style={{ width: "40px", height: "1px", background: "rgba(124,58,237,0.4)", margin: "24px 0" }} />

          {/* Bullets */}
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {BULLETS.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}
              >
                <span style={{
                  fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "12px",
                  color: "#7C3AED", marginTop: "1px", flexShrink: 0,
                }}>
                  {b.icon}
                </span>
                <span style={{
                  fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "14px",
                  color: "rgba(255,255,255,0.5)", lineHeight: 1.55,
                }}>
                  {b.text}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ══ DERECHA — título con palabra ciclante ══ */}
        <div style={{ flexShrink: 0, textAlign: "right" }}>
          {/* Título */}
          <h2 style={{ margin: 0, lineHeight: 1.12 }}>
            <motion.span
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.12 }}
              style={{
                display: "block",
                fontFamily: "var(--font-sans)", fontWeight: 700,
                fontSize: "clamp(36px,3.8vw,52px)", color: "#ffffff",
              }}
            >
              Resultados que
            </motion.span>

            <motion.span
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.24 }}
              style={{ display: "inline-flex", alignItems: "center", gap: "10px", marginTop: "6px", justifyContent: "flex-end" }}
            >
              {/* Punto */}
              <span style={{
                fontFamily: "var(--font-sans)", fontWeight: 700,
                fontSize: "clamp(36px,3.8vw,52px)", color: "rgba(255,255,255,0.2)",
                lineHeight: 1.12,
              }}>
                .
              </span>
              {/* Pill ciclante */}
              <span style={{
                display: "inline-block",
                minWidth: "180px",
                background: "rgba(124,58,237,0.12)",
                border: "1.5px solid rgba(124,58,237,0.38)",
                borderRadius: "12px",
                padding: "4px 22px",
                overflow: "hidden",
              }}>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={CYCLING_WORDS[idx]}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    style={{
                      display: "block",
                      fontFamily: "var(--font-sans)", fontWeight: 700,
                      fontSize: "clamp(36px,3.8vw,52px)",
                      color: "#a78bfa", lineHeight: 1.12, textAlign: "center",
                    }}
                  >
                    {CYCLING_WORDS[idx]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </motion.span>
          </h2>
        </div>

      </div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════
   Tech pills
   ════════════════════════════════════════════════════════ */
function TechPills({ techs, textColor, borderColor }: {
  techs: string[];
  textColor?: string;
  borderColor?: string;
}) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
      {techs.map((t) => (
        <span key={t} style={{
          fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "11px",
          color: textColor ?? "rgba(255,255,255,0.38)",
          border: `1px solid ${borderColor ?? "rgba(255,255,255,0.1)"}`,
          borderRadius: "100px", padding: "5px 13px", letterSpacing: "0.3px",
        }}>
          {t}
        </span>
      ))}
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   Tag pill reutilizable
   ════════════════════════════════════════════════════════ */
function TagPill({ text, textColor, bg, border }: {
  text: string; textColor: string; bg: string; border: string;
}) {
  return (
    <div style={{
      display: "inline-flex", fontFamily: "var(--font-sans)", fontWeight: 300,
      fontSize: "11px", color: textColor, textTransform: "uppercase",
      letterSpacing: "1.5px", background: bg, border: `1px solid ${border}`,
      borderRadius: "100px", padding: "5px 14px", marginBottom: "24px",
    }}>
      {text}
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   Vac App — phone + mini browser (2 plataformas)
   ════════════════════════════════════════════════════════ */
function VacDevices() {
  return (
    <div style={{ position: "relative", width: "320px", height: "420px", transformStyle: "preserve-3d" }}>
      <div style={{
        position: "absolute", width: "400px", height: "400px", borderRadius: "50%",
        background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)",
        top: "50%", left: "50%", transform: "translate(-50%,-50%) translateZ(-50px)", zIndex: 0,
      }} />

      {/* Mini browser — detrás */}
      <div style={{
        position: "absolute", top: "24px", left: "0",
        width: "220px", height: "148px", borderRadius: "10px",
        border: "1.5px solid rgba(255,255,255,0.1)", background: "rgba(0,0,0,0.4)",
        overflow: "hidden", zIndex: 1, boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
        transform: "translateZ(-14px)",
      }}>
        <div style={{ height: "26px", background: "rgba(255,255,255,0.04)", display: "flex", alignItems: "center", padding: "0 10px", gap: "5px" }}>
          {["#e05555","#e0a030","#38b260"].map((c, i) => (
            <div key={i} style={{ width: "7px", height: "7px", borderRadius: "50%", background: c, opacity: 0.75 }} />
          ))}
          <div style={{ flex: 1, height: "4px", borderRadius: "2px", background: "rgba(255,255,255,0.06)", marginLeft: "6px" }} />
        </div>
        <div style={{ background: "#081208", height: "calc(100% - 26px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "6px" }}>
          <span style={{ fontSize: "32px", fontWeight: 700, color: "rgba(255,255,255,0.07)", fontFamily: "var(--font-sans)", lineHeight: 1 }}>V</span>
          <span style={{ fontSize: "8px", color: "rgba(255,255,255,0.18)", letterSpacing: "2px", fontFamily: "var(--font-sans)", fontWeight: 300, textTransform: "uppercase" }}>Web App</span>
        </div>
      </div>

      {/* Phone — frente */}
      <div style={{
        position: "absolute", bottom: 0, right: 0, zIndex: 2,
        width: "180px", height: "348px", borderRadius: "32px",
        border: "2px solid rgba(255,255,255,0.13)", background: "rgba(0,0,0,0.45)",
        overflow: "hidden", boxShadow: "0 30px 70px rgba(0,0,0,0.65)",
        transform: "translateZ(52px)",
      }}>
        <div style={{ width: "52px", height: "18px", background: "rgba(0,0,0,0.65)", borderRadius: "0 0 10px 10px", margin: "0 auto" }} />
        <div style={{ height: "calc(100% - 18px)", background: "#0A1A0E", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "10px" }}>
          <span style={{ fontSize: "56px", fontWeight: 700, color: "rgba(255,255,255,0.07)", fontFamily: "var(--font-sans)", lineHeight: 1 }}>V</span>
          <span style={{ fontSize: "9px", color: "rgba(255,255,255,0.18)", letterSpacing: "2px", fontFamily: "var(--font-sans)", fontWeight: 300, textTransform: "uppercase", textAlign: "center", padding: "0 20px" }}>Screenshots próximamente</span>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   Navegaya — phone amarillo/negro
   ════════════════════════════════════════════════════════ */
function NavegayaPhone() {
  return (
    <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", transformStyle: "preserve-3d" }}>
      <div style={{ position: "absolute", width: "380px", height: "380px", borderRadius: "50%", background: "rgba(234,179,8,0.04)", border: "1px solid rgba(234,179,8,0.07)", zIndex: 0, transform: "translateZ(-50px)" }} />
      <div style={{ position: "absolute", width: "260px", height: "260px", borderRadius: "50%", border: "1px solid rgba(234,179,8,0.05)", zIndex: 0, transform: "translateZ(-22px)" }} />
      <div style={{
        width: "200px", height: "380px", borderRadius: "36px",
        border: "2px solid rgba(234,179,8,0.2)", background: "rgba(0,0,0,0.5)",
        overflow: "hidden", position: "relative", zIndex: 1,
        boxShadow: "0 30px 70px rgba(0,0,0,0.6), 0 0 40px rgba(234,179,8,0.08)",
        transform: "translateZ(42px)",
      }}>
        <div style={{ width: "60px", height: "20px", background: "rgba(0,0,0,0.7)", borderRadius: "0 0 12px 12px", margin: "0 auto" }} />
        <div style={{ height: "calc(100% - 20px)", background: "#080700", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "12px" }}>
          <div style={{ position: "absolute", top: "28px", left: "16px", right: "16px", height: "3px", background: "rgba(234,179,8,0.25)", borderRadius: "2px" }} />
          <span style={{ fontSize: "64px", fontWeight: 700, color: "rgba(234,179,8,0.1)", fontFamily: "var(--font-sans)", lineHeight: 1 }}>N</span>
          <span style={{ fontSize: "10px", color: "rgba(234,179,8,0.3)", letterSpacing: "2px", fontFamily: "var(--font-sans)", fontWeight: 300, textTransform: "uppercase", textAlign: "center", padding: "0 24px" }}>Screenshots próximamente</span>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   KingReserve — browser frame (crema / marrón)
   ════════════════════════════════════════════════════════ */
function KingBrowser() {
  const cream = "rgba(200,163,110,";
  return (
    <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
      {/* Anillos decorativos */}
      <div style={{ position: "absolute", width: "420px", height: "420px", borderRadius: "50%", background: `${cream}0.03)`, border: `1px solid ${cream}0.06)`, zIndex: 0 }} />
      <div style={{ position: "absolute", width: "280px", height: "280px", borderRadius: "50%", border: `1px solid ${cream}0.04)`, zIndex: 0 }} />

      {/* Browser */}
      <div style={{
        width: "340px", height: "240px", borderRadius: "12px",
        border: `1.5px solid ${cream}0.15)`, background: "rgba(0,0,0,0.45)",
        overflow: "hidden", position: "relative", zIndex: 1,
        boxShadow: "0 16px 48px rgba(0,0,0,0.5)",
      }}>
        {/* Chrome bar */}
        <div style={{ height: "32px", background: "rgba(255,255,255,0.04)", display: "flex", alignItems: "center", padding: "0 12px", gap: "6px" }}>
          {["#e05555","#e0a030","#38b260"].map((c, i) => (
            <div key={i} style={{ width: "8px", height: "8px", borderRadius: "50%", background: c, opacity: 0.75 }} />
          ))}
          {/* URL bar */}
          <div style={{ flex: 1, height: "18px", borderRadius: "4px", background: "rgba(255,255,255,0.05)", marginLeft: "8px", display: "flex", alignItems: "center", paddingLeft: "10px" }}>
            <span style={{ fontSize: "10px", color: `${cream}0.35)`, fontFamily: "var(--font-sans)", fontWeight: 300, letterSpacing: "0.3px" }}>kingreserve.com</span>
          </div>
        </div>
        {/* Screen */}
        <div style={{ background: "#0C0904", height: "calc(100% - 32px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "10px", position: "relative" }}>
          {/* Accent bar top */}
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg,${cream}0.4),${cream}0.15),${cream}0.4))` }} />
          <span style={{ fontSize: "52px", fontWeight: 700, color: `${cream}0.09)`, fontFamily: "var(--font-sans)", lineHeight: 1, letterSpacing: "-0.04em" }}>K</span>
          <span style={{ fontSize: "9px", color: `${cream}0.2)`, letterSpacing: "3px", fontFamily: "var(--font-sans)", fontWeight: 300, textTransform: "uppercase" }}>Screenshots próximamente</span>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   Section
   ════════════════════════════════════════════════════════ */
export function PortfolioSection() {
  return (
    <section id="portfolio" style={{ background: "#07071a" }}>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      {/* ══════════════════════════════════════════════════
          HEADER
         ══════════════════════════════════════════════════ */}
      <PortfolioHeader />

      {/* ══════════════════════════════════════════════════
          BLOQUE 1 — VAC APP  (#0E2419)
         ══════════════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="pf-block"
        style={{ background: "#0E2419", minHeight: "500px", display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <div className="pf-text" style={{ flex: 1, padding: "80px 64px" }}>
          <TagPill text="App Móvil + Web · Ganadería" textColor="rgba(255,255,255,0.6)" bg="rgba(255,255,255,0.06)" border="rgba(255,255,255,0.12)" />
          <h3 style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "56px", color: "#ffffff", margin: "0 0 12px", lineHeight: 1.1 }}>Vac App</h3>
          <p style={{ fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "16px", color: "rgba(255,255,255,0.55)", lineHeight: 1.7, maxWidth: "420px", margin: 0 }}>
            Sistema de gestión ganadera para el campo peruano. Control de vacunación, reproducción y trazabilidad de animales.
          </p>
          <div style={{ width: "48px", height: "1px", background: "rgba(255,255,255,0.08)", margin: "28px 0" }} />
          <TechPills techs={["Flutter", "Node.js", "AWS"]} />
          <button style={{ fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: "13px", color: "#ffffff", background: "transparent", border: "1px solid rgba(255,255,255,0.25)", borderRadius: "100px", padding: "10px 24px", cursor: "pointer", marginTop: "32px", letterSpacing: "0.3px" }}>
            Ver proyecto →
          </button>
        </div>
        <div className="pf-side" style={{ width: "45%", display: "flex", alignItems: "center", justifyContent: "center", padding: "60px 40px" }}>
          <VacDevices />
        </div>
      </motion.div>

      <div style={{ height: "1px", background: "rgba(255,255,255,0.06)" }} />

      {/* ══════════════════════════════════════════════════
          BLOQUE 2 — NAVEGAYA  (#0D0B00)
         ══════════════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="pf-block"
        style={{ background: "#0D0B00", minHeight: "500px", display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <div className="pf-side" style={{ width: "45%", display: "flex", alignItems: "center", justifyContent: "center", padding: "60px 40px" }}>
          <NavegayaPhone />
        </div>
        <div className="pf-text" style={{ flex: 1, padding: "80px 64px" }}>
          <TagPill text="App Móvil · Navegación" textColor="rgba(234,179,8,0.75)" bg="rgba(234,179,8,0.07)" border="rgba(234,179,8,0.18)" />
          <h3 style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "56px", color: "#ffffff", margin: "0 0 12px", lineHeight: 1.1 }}>Navegaya</h3>
          <p style={{ fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "16px", color: "rgba(255,255,255,0.55)", lineHeight: 1.7, maxWidth: "420px", margin: 0 }}>
            App de navegación y tours para embarcaciones turísticas en Perú. Rutas, reservas y experiencias en el agua.
          </p>
          <div style={{ width: "48px", height: "1px", background: "rgba(234,179,8,0.2)", margin: "28px 0" }} />
          <TechPills techs={["Flutter", "Maps API", "GPS"]} textColor="rgba(234,179,8,0.55)" borderColor="rgba(234,179,8,0.2)" />
          <div style={{ marginTop: "32px", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "12px" }}>
            <button style={{ fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: "13px", color: "#EAB308", background: "transparent", border: "1px solid rgba(234,179,8,0.3)", borderRadius: "100px", padding: "10px 24px", cursor: "pointer", letterSpacing: "0.3px" }}>
              Ver proyecto →
            </button>
            <span style={{ fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: "11px", color: "#FDE68A", background: "rgba(234,179,8,0.1)", border: "1px solid rgba(234,179,8,0.25)", borderRadius: "100px", padding: "6px 14px", letterSpacing: "0.3px" }}>
              Lanzamiento 2026
            </span>
          </div>
        </div>
      </motion.div>

      <div style={{ height: "1px", background: "rgba(255,255,255,0.06)" }} />

      {/* ══════════════════════════════════════════════════
          BLOQUE 3 — KINGRESERVE  (#130E08)
          layout: texto izquierda | browser derecha
         ══════════════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="pf-block"
        style={{ background: "#130E08", minHeight: "500px", display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <div className="pf-text" style={{ flex: 1, padding: "80px 64px" }}>
          <TagPill text="Web App · Reservas" textColor="rgba(200,163,110,0.75)" bg="rgba(200,163,110,0.06)" border="rgba(200,163,110,0.18)" />
          <h3 style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "56px", color: "#ffffff", margin: "0 0 12px", lineHeight: 1.1 }}>KingReserve</h3>
          <p style={{ fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "16px", color: "rgba(255,255,255,0.55)", lineHeight: 1.7, maxWidth: "420px", margin: 0 }}>
            Plataforma web de reservas para restaurantes boutique. Gestión de mesas, calendario inteligente y confirmaciones automáticas para tus clientes.
          </p>
          <div style={{ width: "48px", height: "1px", background: "rgba(200,163,110,0.15)", margin: "28px 0" }} />
          <TechPills techs={["Next.js", "Node.js", "PostgreSQL"]} textColor="rgba(200,163,110,0.55)" borderColor="rgba(200,163,110,0.18)" />
          <button style={{ fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: "13px", color: "#C8A37E", background: "transparent", border: "1px solid rgba(200,163,110,0.28)", borderRadius: "100px", padding: "10px 24px", cursor: "pointer", marginTop: "32px", letterSpacing: "0.3px" }}>
            Ver proyecto →
          </button>
        </div>
        <div className="pf-side" style={{ width: "45%", display: "flex", alignItems: "center", justifyContent: "center", padding: "60px 40px" }}>
          <KingBrowser />
        </div>
      </motion.div>

    </section>
  );
}
