"use client";

import { motion } from "framer-motion";

/* ════════════════════════════════════════════
   Data
   ════════════════════════════════════════════ */
const TAGS: {
  text: string; size: number; indent: number;
  purple: boolean; fromX: number; fromY: number;
}[] = [
  { text: "#DejarHuella",  size: 44, indent:  0, purple: false, fromX: -55, fromY: -75 },
  { text: "#MarcaDigital", size: 32, indent: 36, purple: true,  fromX:  48, fromY: -48 },
  { text: "#SinExcusas",   size: 40, indent:  0, purple: false, fromX: -28, fromY: -95 },
  { text: "#EntregaReal",  size: 28, indent: 22, purple: false, fromX:  58, fromY: -38 },
  { text: "#CodeQueVende", size: 37, indent:  0, purple: true,  fromX: -38, fromY: -58 },
  { text: "#HechoEnLima",  size: 24, indent: 44, purple: false, fromX:  32, fromY: -28 },
];

const VALUES: { num: string; pre: string; hl: string; post: string; desc: string }[] = [
  { num:"01", pre:"",                hl:"Entregamos",           post:" lo que prometemos.", desc:"Sin excusas ni retrasos. Si lo dijimos, lo cumplimos. Así de simple." },
  { num:"02", pre:"Ves ",            hl:"todo en tiempo real.", post:"",                    desc:"Avances, costos y tiempos siempre claros. Sin sorpresas al final." },
  { num:"03", pre:"Tecnología que ", hl:"sirve de verdad.",     post:"",                    desc:"Usamos lo que funciona para tu caso, no lo que está de moda en el mundo tech." },
  { num:"04", pre:"Creamos para ",   hl:"dejar huella.",        post:"",                    desc:"No trabajamos para cumplir. Cada proyecto que sale de Minda Code tiene que marcar la diferencia en tu negocio." },
];

/* ════════════════════════════════════════════
   CSS
   ════════════════════════════════════════════ */
const STYLES = `
/* ── Values 2x2 grid ── */
.about-vals-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1px;
  background: rgba(255,255,255,0.06);
  border-radius: 2px;
}
.about-val-cell {
  background: #07071a;
  padding: 52px 48px;
  position: relative;
  overflow: hidden;
  cursor: default;
  transition: background 0.45s ease;
}
.about-val-cell:hover { background: rgba(124,58,237,0.04); }

.about-val-num {
  display: block;
  color: rgba(124,58,237,0.45);
  font-family: var(--font-sans);
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 3px;
  margin-bottom: 18px;
  position: relative;
  z-index: 1;
  transition: color 0.4s ease;
}
.about-val-cell:hover .about-val-num { color: #7C3AED; }

.about-val-title {
  color: rgba(255,255,255,0.68);
  font-family: var(--font-sans);
  font-weight: 700;
  font-size: 26px;
  line-height: 1.25;
  letter-spacing: -0.02em;
  margin: 0 0 14px 0;
  position: relative;
  z-index: 1;
  transition: color 0.4s ease;
}
.about-val-cell:hover .about-val-title { color: #ffffff; }

.about-val-desc {
  color: rgba(255,255,255,0.3);
  font-family: var(--font-sans);
  font-weight: 300;
  font-size: 13px;
  line-height: 1.78;
  margin: 0;
  position: relative;
  z-index: 1;
  transition: color 0.4s 0.1s ease;
}
.about-val-cell:hover .about-val-desc { color: rgba(255,255,255,0.52); }

/* ── Highlight ── */
.hl {
  position: relative;
  padding: 2px 8px;
  border-radius: 4px;
  display: inline;
  white-space: nowrap;
  color: inherit;
}
.hl::before {
  content: '';
  background: #7C3AED;
  position: absolute;
  inset: 0;
  border-radius: 4px;
  z-index: -1;
  clip-path: inset(0 100% 0 0);
  transition: clip-path 0.55s cubic-bezier(0.22,1,0.36,1);
}
.about-val-cell:hover .hl::before { clip-path: inset(0 0% 0 0); }
.about-val-cell:hover .hl { color: #ffffff; }

/* ── Responsive ── */
@media(max-width:900px){
  .about-split  { flex-direction: column !important; }
  .about-left   { width: 100% !important; padding: 64px 24px 48px !important; }
  .about-right  { width: 100% !important; padding: 48px 28px !important; }
  .about-lower  { padding: 64px 24px 80px !important; }
  .about-vals-grid { grid-template-columns: 1fr !important; }
  .about-val-title { font-size: 22px !important; }
}
@media(max-width:640px){
  .about-val-cell  { padding: 36px 22px !important; }
  .about-val-title { font-size: 19px !important; }
}
`;

/* ════════════════════════════════════════════
   Component
   ════════════════════════════════════════════ */
export function AboutSection() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <section id="about" style={{ background: "#07071a", overflow: "hidden" }}>

        {/* ══ ZONA SUPERIOR — SPLIT ══ */}
        <div className="about-split" style={{ display: "flex" }}>

          {/* ── Left 55% ── */}
          <motion.div
            className="about-left"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ width: "55%", padding: "80px 56px 64px" }}
          >
            <p style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "10px", color: "#7C3AED", textTransform: "uppercase", letterSpacing: "4px", margin: "0 0 28px" }}>
              Sobre Nosotros
            </p>

            <h2 style={{ fontFamily: "var(--font-sans)", fontWeight: 900, fontSize: "clamp(26px,2.8vw,42px)", lineHeight: 1.15, margin: "0 0 40px", letterSpacing: "-0.025em" }}>
              <span style={{ display: "block", color: "#ffffff" }}>Un equipo en Lima</span>
              <span style={{ display: "block", color: "#ffffff" }}>que construye lo</span>
              <span style={{ display: "block", color: "#7C3AED" }}>que prometemos.</span>
            </h2>

            {/* Historia — impactante */}
            <div style={{ borderLeft: "3px solid #7C3AED", paddingLeft: "24px", maxWidth: "460px" }}>
              <p style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "20px", color: "rgba(255,255,255,0.85)", lineHeight: 1.45, margin: "0 0 14px", letterSpacing: "-0.01em" }}>
                Nacimos en Lima con una obsesión.
              </p>
              <p style={{ fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "15px", color: "rgba(255,255,255,0.44)", lineHeight: 1.85, margin: 0 }}>
                Que cualquier negocio peruano, sin importar su tamaño, tenga tecnología de calidad real.{" "}
                <span style={{ fontWeight: 600, color: "rgba(255,255,255,0.72)" }}>
                  No creamos para cumplir. Creamos para dejar huella.
                </span>
              </p>
            </div>
          </motion.div>

          {/* ── Right 45% — Hashtags slam in ── */}
          <div
            className="about-right"
            style={{ width: "45%", display: "flex", alignItems: "center", padding: "56px 44px", position: "relative", overflow: "hidden" }}
          >
            {/* Atmospheric glow */}
            <div style={{ position: "absolute", top: "25%", left: "15%", width: "300px", height: "300px", borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.12), transparent 68%)", pointerEvents: "none" }} />

            <div style={{ position: "relative", zIndex: 1, width: "100%" }}>
              {TAGS.map((tag, i) => (
                <motion.p
                  key={tag.text}
                  initial={{ opacity: 0, x: tag.fromX, y: tag.fromY, scale: 0.25 }}
                  whileInView={{
                    opacity: [0, 1,    1,    1],
                    x:       [tag.fromX, 0, 0, 0],
                    y:       [tag.fromY, 0, 0, 0],
                    scale:   [0.25,  1.28, 0.93, 1],
                  }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, times: [0, 0.5, 0.74, 1], delay: i * 0.09 }}
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontWeight: 900,
                    fontSize: `${tag.size}px`,
                    lineHeight: 1.18,
                    letterSpacing: "-0.03em",
                    color: tag.purple ? "#7C3AED" : "rgba(255,255,255,0.88)",
                    margin: `0 0 4px ${tag.indent}px`,
                    userSelect: "none",
                  }}
                >
                  {tag.text}
                </motion.p>
              ))}
            </div>
          </div>

        </div>

        {/* ══ SEPARATOR ══ */}
        <div style={{ height: "1px", background: "rgba(255,255,255,0.05)", margin: "0 56px" }} />

        {/* ══ ZONA INFERIOR — VALORES ══ */}
        <motion.div
          className="about-lower"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ padding: "80px 56px 100px" }}
        >
          <p style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "10px", color: "rgba(124,58,237,0.5)", textTransform: "uppercase", letterSpacing: "4px", margin: "0 0 48px" }}>
            Esto nos define
          </p>

          {/* 2 × 2 grid */}
          <div className="about-vals-grid">
            {VALUES.map((v, i) => (
              <motion.div
                key={i}
                className="about-val-cell"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
              >
                {/* Ghost number */}
                <span aria-hidden="true" style={{
                  position: "absolute", right: "-6px", bottom: "-14px",
                  fontFamily: "var(--font-sans)", fontWeight: 900, fontSize: "130px", lineHeight: 1,
                  color: "rgba(124,58,237,0.05)", pointerEvents: "none", zIndex: 0,
                  userSelect: "none",
                }}>
                  {v.num}
                </span>

                <span className="about-val-num">{v.num}</span>

                <h3 className="about-val-title">
                  {v.pre  && <span>{v.pre}</span>}
                  <span className="hl">{v.hl}</span>
                  {v.post && <span>{v.post}</span>}
                </h3>

                <p className="about-val-desc">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </section>
    </>
  );
}
