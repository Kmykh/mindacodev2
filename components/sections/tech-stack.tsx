"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

/* ════════════════════════════════════════════
   Data
   ════════════════════════════════════════════ */
const FAQS: { hl: string; rest: string; answer: string }[] = [
  {
    hl:     "¿Cuánto cuesta?",
    rest:   "",
    answer: "El precio se adapta exactamente a lo que tu negocio necesita. No pagás por cosas que no vas a usar. En la primera reunión te damos un presupuesto claro, sin sorpresas ni letra chica.",
  },
  {
    hl:     "¿Cuánto tiempo",
    rest:   " demora?",
    answer: "Una landing page puede estar lista en 2 semanas. Una app móvil entre 6 y 10 semanas. Siempre te decimos los tiempos antes de empezar — y los cumplimos.",
  },
  {
    hl:     "¿Y si no me gusta",
    rest:   " el resultado?",
    answer: "Lo mejoramos hasta que estés conforme. No cerramos ningún proyecto hasta que digas que sí. Las revisiones están incluidas en el proceso, sin costo extra.",
  },
  {
    hl:     "¿Necesito saber",
    rest:   " de tecnología?",
    answer: "Para nada. Tú traes la idea y nosotros nos encargamos de todo lo técnico. Solo necesitás tener claro qué problema querés resolver.",
  },
  {
    hl:     "¿Qué pasa",
    rest:   " después de que me entregan?",
    answer: "No desaparecemos. Tenemos soporte post-entrega y planes de mantenimiento para que tu proyecto siga creciendo después del lanzamiento.",
  },
  {
    hl:     "¿Puedo ver",
    rest:   " cómo va avanzando?",
    answer: "Sí. Cada 2 semanas te mostramos una actualización real del proyecto. Siempre sabés en qué estamos y qué viene después.",
  },
  {
    hl:     "¿Trabajan con",
    rest:   " negocios pequeños?",
    answer: "Es nuestro cliente principal. Emprendedores, restaurantes, boutiques, clínicas — negocios reales que quieren crecer digitalmente sin gastar de más.",
  },
];

const STYLES = `
.faq-item {
  border-bottom: 1px solid rgba(255,255,255,0.06);
  cursor: pointer;
}
.faq-item:first-child { border-top: 1px solid rgba(255,255,255,0.06); }
.faq-icon {
  width: 28px; height: 28px; border-radius: 50%;
  border: 1px solid rgba(124,58,237,0.35);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0; transition: border-color 0.3s, background 0.3s;
}
.faq-item-open .faq-icon {
  background: rgba(124,58,237,0.15);
  border-color: rgba(124,58,237,0.6);
}
@media(max-width:768px){
  .faq-wrap { padding: 72px 24px 80px !important; }
  .faq-question { font-size: 15px !important; }
}
`;

/* ════════════════════════════════════════════
   Component
   ════════════════════════════════════════════ */
export function TechStackSection() {
  const [open, setOpen] = useState<number>(0);

  const toggle = (i: number) => setOpen(prev => (prev === i ? -1 : i));

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <section id="faq" style={{ background:"#07071a" }}>
        <div
          className="faq-wrap"
          style={{ maxWidth:"860px", margin:"0 auto", padding:"88px 56px 96px" }}
        >

          {/* ── Header ── */}
          <motion.div
            initial={{ opacity:0, y:22 }}
            whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }}
            transition={{ duration:0.5 }}
            style={{ marginBottom:"64px" }}
          >
            <p style={{
              fontFamily:"var(--font-sans)", fontWeight:700, fontSize:"11px",
              color:"#7C3AED", textTransform:"uppercase", letterSpacing:"4px", margin:"0 0 18px",
            }}>
              Lo que todos preguntan
            </p>
            <h2 style={{
              fontFamily:"var(--font-sans)", fontWeight:700,
              fontSize:"clamp(28px,3.5vw,48px)", color:"#ffffff",
              lineHeight:1.13, margin:"0 0 18px", letterSpacing:"-0.025em",
            }}>
              Respondemos antes<br />
              <span style={{ color:"#7C3AED" }}>de que preguntes.</span>
            </h2>
            <p style={{
              fontFamily:"var(--font-sans)", fontWeight:300, fontSize:"16px",
              color:"rgba(255,255,255,0.38)", fontStyle:"italic", lineHeight:1.65, margin:0,
            }}>
              Todo lo que querías saber antes de dar el primer paso.
            </p>
          </motion.div>

          {/* ── FAQ list ── */}
          <div>
            {FAQS.map((faq, i) => {
              const isOpen = open === i;
              return (
                <motion.div
                  key={i}
                  className={`faq-item${isOpen ? " faq-item-open" : ""}`}
                  initial={{ opacity:0, y:16 }}
                  whileInView={{ opacity:1, y:0 }}
                  viewport={{ once:true }}
                  transition={{ duration:0.4, delay: i * 0.055 }}
                >
                  {/* Question row */}
                  <button
                    onClick={() => toggle(i)}
                    style={{
                      width:"100%", background:"none", border:"none", cursor:"pointer",
                      display:"flex", alignItems:"center", justifyContent:"space-between",
                      gap:"20px", padding:"28px 0", textAlign:"left",
                    }}
                  >
                    {/* Question text */}
                    <span
                      className="faq-question"
                      style={{
                        fontFamily:"var(--font-sans)", fontWeight:700, fontSize:"17px",
                        lineHeight:1.3, letterSpacing:"-0.01em",
                        flex:1,
                      }}
                    >
                      {/* Highlight on first keyword when open */}
                      <span style={{ position:"relative", display:"inline-block" }}>
                        <motion.span
                          animate={{ clipPath: isOpen ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)" }}
                          transition={{ duration: isOpen ? 0.55 : 0.2, ease: isOpen ? [0.4,0,0.2,1] : "easeIn" }}
                          style={{
                            position:"absolute",
                            top:"-2px", bottom:"-2px", left:"-4px", right:"-4px",
                            background:"#7C3AED", borderRadius:"3px", zIndex:0,
                          }}
                        />
                        <motion.span
                          animate={{ color: isOpen ? "#ffffff" : "rgba(255,255,255,0.6)" }}
                          transition={{ duration:0.3 }}
                          style={{ position:"relative", zIndex:1 }}
                        >
                          {faq.hl}
                        </motion.span>
                      </span>
                      {faq.rest && (
                        <motion.span
                          animate={{ color: isOpen ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.6)" }}
                          transition={{ duration:0.3 }}
                        >
                          {faq.rest}
                        </motion.span>
                      )}
                    </span>

                    {/* Icon — + rotates to × */}
                    <div className="faq-icon">
                      <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration:0.28, ease:"easeOut" }}
                        style={{
                          display:"block", fontFamily:"var(--font-sans)",
                          fontWeight:300, fontSize:"20px", lineHeight:1,
                          color:"#7C3AED", userSelect:"none",
                        }}
                      >
                        +
                      </motion.span>
                    </div>
                  </button>

                  {/* Answer — animated open/close */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="answer"
                        initial={{ height:0, opacity:0 }}
                        animate={{ height:"auto", opacity:1 }}
                        exit={{ height:0, opacity:0 }}
                        transition={{ height:{ duration:0.35, ease:[0.4,0,0.2,1] }, opacity:{ duration:0.3 } }}
                        style={{ overflow:"hidden" }}
                      >
                        <p style={{
                          fontFamily:"var(--font-sans)", fontWeight:300,
                          fontSize:"15px", color:"rgba(255,255,255,0.5)",
                          lineHeight:1.8, margin:0, paddingBottom:"28px",
                          maxWidth:"720px",
                        }}>
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>
    </>
  );
}
