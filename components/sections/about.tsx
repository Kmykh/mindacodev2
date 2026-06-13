"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

/* ════════════════════════════════════════════
   Data
   ════════════════════════════════════════════ */
const TAGS: { text: string; size: number; hl: boolean; indent: number }[] = [
  { text:"#DiseñoQueVende",   size:46, hl:false, indent: 0 },
  { text:"#ResultadosReales", size:36, hl:true,  indent: 0 },
  { text:"#MásClientes",      size:33, hl:true,  indent:28 },
  { text:"#WebQueConvierte",  size:41, hl:false, indent: 0 },
  { text:"#SinPretextos",     size:26, hl:false, indent:48 },
];

const VALUES: { num:string; pre:string; hl:string; post:string; desc:string }[] = [
  { num:"01", pre:"",                hl:"Entregamos",           post:" lo que prometemos.", desc:"Sin excusas ni retrasos. Si lo dijimos, lo cumplimos. Así de simple." },
  { num:"02", pre:"Ves ",            hl:"todo en tiempo real.", post:"",                    desc:"Avances, costos y tiempos siempre claros. Sin sorpresas al final." },
  { num:"03", pre:"Tecnología que ", hl:"sirve de verdad.",     post:"",                    desc:"Usamos lo que funciona para tu caso, no lo que está de moda en el mundo tech." },
  { num:"04", pre:"Creamos para ",   hl:"dejar huella.",        post:"",                    desc:"No trabajamos para cumplir. Cada proyecto que sale de Minda Code tiene que marcar la diferencia en tu negocio." },
];

/* ════════════════════════════════════════════
   CSS
   ════════════════════════════════════════════ */
const STYLES = `
/* ── Highlight background cycling color ── */
@keyframes hlBgCycle {
  0%   { background: #7C3AED; }
  28%  { background: #a855f7; }
  56%  { background: #d946ef; }
  82%  { background: #9333ea; }
  100% { background: #7C3AED; }
}
.tag-hl-bg { animation: hlBgCycle 2.4s ease-in-out infinite; }

/* ── Values 2×2 grid — tarjetas con borde, glow y lift ── */
.about-vals-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
}
.about-val-cell {
  background: linear-gradient(160deg, rgba(124,58,237,0.07) 0%, rgba(10,9,32,0.6) 50%, rgba(10,9,32,0.72) 100%);
  border: 1px solid rgba(124,58,237,0.14);
  border-radius: 20px;
  padding: 52px 48px;
  position: relative;
  overflow: hidden;
  cursor: default;
  transition: border-color 0.35s ease, transform 0.35s ease, box-shadow 0.35s ease;
}
.about-val-cell:hover {
  border-color: rgba(124,58,237,0.45);
  transform: translateY(-6px);
  box-shadow: 0 18px 50px rgba(124,58,237,0.15);
}
/* Línea de acento superior — se extiende al hacer hover */
.about-val-cell::before {
  content: '';
  position: absolute; top: 0; left: 0;
  width: 52px; height: 3px;
  background: linear-gradient(90deg, #7C3AED, #a78bfa);
  border-radius: 0 0 4px 0;
  opacity: 0.5;
  transition: width 0.45s cubic-bezier(0.22,1,0.36,1), opacity 0.45s ease;
}
.about-val-cell:hover::before { width: 100%; opacity: 1; }

.about-val-num {
  display: block;
  color: rgba(124,58,237,0.45);
  font-family: var(--font-sans);
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 3px;
  margin-bottom: 18px;
  position: relative; z-index: 1;
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
  position: relative; z-index: 1;
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
  position: relative; z-index: 1;
  transition: color 0.4s 0.1s ease;
}
.about-val-cell:hover .about-val-desc { color: rgba(255,255,255,0.52); }

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

@media(max-width:900px){
  .about-split  { flex-direction: column !important; }
  .about-left   { width: 100% !important; padding: 64px 24px 48px !important; }
  .about-right  { width: 100% !important; padding: 48px 28px !important; overflow: visible !important; }
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
const MANIFESTO = ["Impulsa", "Mejora", "Distínguete"] as const;

export function AboutSection() {
  const [mIdx, setMIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setMIdx(i => (i + 1) % MANIFESTO.length), 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <section id="about" style={{ background:"transparent", overflow:"hidden" }}>

        {/* ══ ZONA SUPERIOR — SPLIT ══ */}
        <div className="about-split" style={{ display:"flex" }}>

          {/* ── Left 55% ── */}
          <motion.div
            className="about-left"
            initial={{ opacity:0, x:-24 }}
            whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true }}
            transition={{ duration:0.6 }}
            style={{ width:"55%", padding:"80px 56px 64px" }}
          >
            <p style={{ fontFamily:"var(--font-sans)", fontWeight:700, fontSize:"10px", color:"#7C3AED", textTransform:"uppercase", letterSpacing:"4px", margin:"0 0 28px" }}>
              Sobre Nosotros
            </p>

            <h2 style={{ fontFamily:"var(--font-sans)", fontWeight:900, fontSize:"clamp(26px,2.8vw,42px)", lineHeight:1.15, margin:"0 0 44px", letterSpacing:"-0.025em" }}>
              <span style={{ display:"block", color:"#ffffff" }}>Un equipo en Lima</span>
              <span style={{ display:"block", color:"#ffffff" }}>listo para impulsar</span>
              <span style={{ display:"block", color:"#7C3AED" }}>tu negocio.</span>
            </h2>

            {/* Manifesto — cycling word */}
            <div style={{ minHeight:"72px", marginBottom:"28px", display:"flex", alignItems:"center" }}>
              <AnimatePresence mode="wait">
                <motion.p
                  key={mIdx}
                  initial={{ opacity:0, y:14, filter:"blur(4px)" }}
                  animate={{ opacity:1, y:0,  filter:"blur(0px)" }}
                  exit={{    opacity:0, y:-14, filter:"blur(4px)" }}
                  transition={{ duration:0.45, ease:[0.4,0,0.2,1] }}
                  style={{
                    fontFamily:"var(--font-sans)",
                    fontWeight:300,
                    fontStyle:"italic",
                    fontSize:"clamp(34px,3.8vw,54px)",
                    lineHeight:1.1,
                    letterSpacing:"0.01em",
                    color: mIdx === 2 ? "#a78bfa" : "rgba(255,255,255,0.9)",
                    margin:0,
                  }}
                >
                  {MANIFESTO[mIdx]}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Body — clean, no border */}
            <motion.div
              initial={{ opacity:0, y:12 }}
              whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }}
              transition={{ duration:0.5, delay:0.5 }}
              style={{ maxWidth:"440px" }}
            >
              <p style={{ fontFamily:"var(--font-sans)", fontWeight:400, fontSize:"15px", color:"rgba(255,255,255,0.5)", lineHeight:1.9, margin:"0 0 14px" }}>
                Tu competencia no duerme y tu web tampoco debería.
                Construimos desde Lima experiencias digitales que{" "}
                <span style={{ fontWeight:600, color:"rgba(255,255,255,0.8)" }}>
                  convierten visitas en clientes reales.
                </span>
              </p>
              <p style={{ fontFamily:"var(--font-sans)", fontWeight:500, fontSize:"13px", color:"rgba(124,58,237,0.7)", letterSpacing:"0.5px", margin:0 }}>
                Sin plantillas · Sin excusas · Solo resultados
              </p>
            </motion.div>
          </motion.div>

          {/* ── Right 45% — hashtags block-fall ── */}
          <div
            className="about-right"
            style={{ width:"45%", display:"flex", alignItems:"center", padding:"56px 44px", position:"relative", overflow:"hidden" }}
          >
            {/* Glow */}
            <div style={{ position:"absolute", top:"20%", left:"5%", width:"340px", height:"340px", borderRadius:"50%", background:"radial-gradient(circle, rgba(124,58,237,0.1), transparent 68%)", pointerEvents:"none" }} />

            <div style={{ position:"relative", zIndex:1, width:"100%", display:"flex", flexDirection:"column", gap:"2px" }}>
              {TAGS.map((tag, idx) => (
                <motion.div
                  key={tag.text}
                  initial={{ opacity:0, y:-75 }}
                  whileInView={{ opacity:1, y:0 }}
                  viewport={{ once:true }}
                  transition={{
                    y:       { type:"spring", stiffness:580, damping:20, delay: idx * 0.11 },
                    opacity: { duration:0.1, delay: idx * 0.11 },
                  }}
                  style={{
                    alignSelf:"flex-start",
                    marginLeft:`clamp(0px, ${(tag.indent / 8).toFixed(1)}vw, ${tag.indent}px)`,
                    fontFamily:"var(--font-sans)",
                    fontWeight:900,
                    fontSize:`clamp(${Math.round(tag.size * 0.52)}px, ${(tag.size / 7).toFixed(1)}vw, ${tag.size}px)`,
                    lineHeight:1.15,
                    letterSpacing:"-0.03em",
                    userSelect:"none",
                    position:"relative",
                    display:"inline-block",
                  }}
                >
                  {tag.hl ? (
                    <>
                      {/* Highlight: sweeps RIGHT → LEFT, bg color cycles */}
                      <motion.span
                        className="tag-hl-bg"
                        initial={{ clipPath:"inset(0 0 0 100%)" }}
                        whileInView={{ clipPath:"inset(0 0 0 0%)" }}
                        viewport={{ once:true }}
                        transition={{ duration:0.65, delay: idx * 0.11 + 0.28, ease:[0.4,0,0.2,1] }}
                        style={{ position:"absolute", inset:"-4px -10px", borderRadius:"6px", zIndex:0 }}
                      />
                      <span style={{ position:"relative", zIndex:1, color:"#ffffff" }}>
                        {tag.text}
                      </span>
                    </>
                  ) : (
                    <span style={{ color:"rgba(255,255,255,0.88)" }}>{tag.text}</span>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

        </div>

        {/* ══ SEPARATOR ══ */}
        <div style={{ height:"1px", background:"rgba(255,255,255,0.05)", margin:"0 56px" }} />

        {/* ══ ZONA INFERIOR — VALORES ══ */}
        <motion.div
          className="about-lower"
          initial={{ opacity:0, y:20 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }}
          transition={{ duration:0.5 }}
          style={{ padding:"80px 56px 100px" }}
        >
          <p style={{ fontFamily:"var(--font-sans)", fontWeight:700, fontSize:"10px", color:"rgba(124,58,237,0.6)", textTransform:"uppercase", letterSpacing:"4px", margin:"0 0 16px" }}>
            Esto nos define
          </p>
          <h3 style={{ fontFamily:"var(--font-sans)", fontWeight:800, fontSize:"clamp(24px,2.6vw,38px)", color:"#ffffff", letterSpacing:"-0.02em", lineHeight:1.15, margin:"0 0 48px" }}>
            Principios que <span style={{ color:"#a78bfa" }}>no negociamos.</span>
          </h3>

          <div className="about-vals-grid">
            {VALUES.map((v, i) => (
              <motion.div
                key={i}
                className="about-val-cell"
                initial={{ opacity:0, y:18 }}
                whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }}
                transition={{ duration:0.45, delay:i*0.1 }}
              >
                <span aria-hidden="true" style={{
                  position:"absolute", right:"-6px", bottom:"-14px",
                  fontFamily:"var(--font-sans)", fontWeight:900, fontSize:"130px", lineHeight:1,
                  color:"rgba(124,58,237,0.09)", pointerEvents:"none", zIndex:0, userSelect:"none",
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
