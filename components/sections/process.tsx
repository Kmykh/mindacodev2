"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const STEPS = [
  { num:"01", prefix:"Te ",        hl:"escuchamos",      suffix:" primero", desc:"Entendemos tu negocio, tus clientes y tus metas reales. Sin tecnicismos ni contratos trampa." },
  { num:"02", prefix:"Ves cómo ",  hl:"va a quedar",     suffix:"",         desc:"Diseñamos antes de construir. Tú apruebas cada detalle y recién arrancamos." },
  { num:"03", prefix:"Tú ",        hl:"ves el avance",   suffix:"",         desc:"Cada 2 semanas, resultados reales sobre la mesa. No promesas — código funcionando." },
  { num:"04", prefix:"Lo lanzamos ",hl:"juntos",         suffix:"",         desc:"Sale perfecto desde el primer día. Sin errores en el estreno, sin malas sorpresas." },
  { num:"05", prefix:"",           hl:"No desaparecemos",suffix:" después", desc:"Soporte real cuando lo necesites. No eres un ticket, eres un cliente que sigue creciendo." },
];

const STYLES = `
.proc-col {
  overflow: hidden;
  position: relative;
  cursor: pointer;
  flex-shrink: 0;
  border-right: 1px solid rgba(255,255,255,0.05);
}
.proc-col:last-child { border-right: none; }

.proc-dots {
  display: flex;
  justify-content: center;
  gap: 8px;
  padding: 28px 0 64px;
}

@media(max-width:900px){
  .proc-row  { flex-direction: column !important; overflow: visible !important; }
  .proc-col  { width: 100% !important; border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.05) !important; }
  .proc-col:last-child { border-bottom: none !important; }
  .proc-ghost { display: none !important; }
  .proc-timeline { padding: 0 24px !important; }
  .proc-header  { padding: 72px 24px 40px !important; }
}
@media(max-width:640px){
  .proc-inner { padding: 28px 18px 36px !important; }
}
`;

export function ProcessSection() {
  const [active, setActive]     = useState(0);
  const [timerKey, setTimerKey] = useState(0);
  const [scanKey, setScanKey]   = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive(a => (a + 1) % STEPS.length);
      setScanKey(k => k + 1);
    }, 2400);
    return () => clearInterval(id);
  }, [timerKey]);

  const jumpTo = (i: number) => {
    setActive(i);
    setScanKey(k => k + 1);
    setTimerKey(k => k + 1);
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <section id="process" style={{ background:"#07071a", overflow:"hidden" }}>

        {/* ── Header ── */}
        <motion.div
          className="proc-header"
          initial={{ opacity:0, y:22 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }}
          transition={{ duration:0.5 }}
          style={{ padding:"88px 52px 44px" }}
        >
          <p style={{ fontFamily:"var(--font-sans)", fontWeight:700, fontSize:"11px", color:"#7C3AED", textTransform:"uppercase", letterSpacing:"4px", margin:"0 0 18px" }}>
            Cómo Trabajamos
          </p>
          <h2 style={{ fontFamily:"var(--font-sans)", fontWeight:700, fontSize:"clamp(28px,3.5vw,48px)", color:"#ffffff", lineHeight:1.14, margin:"0 0 16px", letterSpacing:"-0.025em" }}>
            Así trabajamos{" "}
            <span style={{ color:"#7C3AED" }}>contigo.</span>
          </h2>
          <p style={{ fontFamily:"var(--font-sans)", fontWeight:300, fontSize:"16px", color:"rgba(255,255,255,0.38)", fontStyle:"italic", maxWidth:"480px", lineHeight:1.65, margin:0 }}>
            Sin tecnicismos. Sin sorpresas. Tú siempre sabes qué sigue.
          </p>
        </motion.div>

        {/* ── Steps row ── */}
        <div
          className="proc-row"
          style={{ display:"flex", overflow:"hidden", borderTop:"1px solid rgba(255,255,255,0.055)", borderBottom:"1px solid rgba(255,255,255,0.055)" }}
        >
          {STEPS.map((step, i) => {
            const isAct = i === active;
            return (
              <motion.div
                key={step.num}
                className="proc-col"
                animate={{ width: isAct ? "26%" : "18.5%" }}
                transition={{ duration:0.48, ease:[0.4,0,0.2,1] }}
                onClick={() => jumpTo(i)}
              >
                {/* ── Scanner wash — the "carga" ── */}
                <AnimatePresence>
                  {isAct && (
                    <motion.div
                      key={`scan-${scanKey}`}
                      initial={{ y:"0%", opacity:1 }}
                      animate={{ y:"130%", opacity:0 }}
                      exit={{}}
                      transition={{ duration:0.65, ease:"easeIn" }}
                      style={{
                        position:"absolute", left:0, right:0, top:0,
                        height:"55%",
                        background:"linear-gradient(to bottom, rgba(124,58,237,0.14) 0%, rgba(124,58,237,0.06) 60%, transparent 100%)",
                        pointerEvents:"none",
                        zIndex:4,
                      }}
                    />
                  )}
                </AnimatePresence>

                {/* ── Left active border ── */}
                <motion.div
                  animate={{ scaleY: isAct ? 1 : 0, opacity: isAct ? 1 : 0 }}
                  transition={{ duration:0.4, ease:"easeOut", delay: isAct ? 0.1 : 0 }}
                  style={{
                    position:"absolute", left:0, top:"15%", bottom:"15%",
                    width:"2px",
                    background:"linear-gradient(to bottom, transparent, #7C3AED 40%, #a78bfa 60%, transparent)",
                    transformOrigin:"center",
                    zIndex:3,
                    borderRadius:"2px",
                  }}
                />

                {/* ── Background glow ── */}
                <motion.div
                  animate={{ opacity: isAct ? 1 : 0 }}
                  transition={{ duration:0.5 }}
                  style={{
                    position:"absolute", inset:0,
                    background:"radial-gradient(ellipse 160% 80% at 50% 110%, rgba(124,58,237,0.1), transparent 60%)",
                    pointerEvents:"none",
                  }}
                />

                {/* ── Ghost number ── */}
                <motion.div
                  className="proc-ghost"
                  animate={{ opacity: isAct ? 0.07 : 0.022, scale: isAct ? 1 : 0.84, y: isAct ? 0 : 10 }}
                  transition={{ duration:0.5, ease:"easeOut" }}
                  style={{
                    position:"absolute", bottom:"-20px", right:"-6px",
                    fontFamily:"var(--font-sans)", fontWeight:900,
                    fontSize:"124px", lineHeight:1, color:"#7C3AED",
                    userSelect:"none", pointerEvents:"none", transformOrigin:"bottom right",
                  }}
                >
                  {step.num}
                </motion.div>

                {/* ── Content ── */}
                <div className="proc-inner" style={{ padding:"44px 28px 44px", position:"relative", zIndex:2 }}>

                  {/* Title with highlight sweep */}
                  <h3 style={{ fontFamily:"var(--font-sans)", fontWeight:700, fontSize:"clamp(15px,1.4vw,21px)", lineHeight:1.35, margin:"0 0 20px", letterSpacing:"-0.01em" }}>
                    {step.prefix ? (
                      <motion.span
                        animate={{ color: isAct ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.14)" }}
                        transition={{ duration:0.35 }}
                      >
                        {step.prefix}
                      </motion.span>
                    ) : null}

                    {/* Keyword highlight */}
                    <span style={{ position:"relative", display:"inline-block" }}>
                      {/* Sweep bg */}
                      <motion.span
                        animate={{ clipPath: isAct ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)" }}
                        transition={{ duration: isAct ? 0.6 : 0.22, ease: isAct ? [0.4,0,0.2,1] : "easeIn", delay: isAct ? 0.15 : 0 }}
                        style={{ position:"absolute", top:"-2px", bottom:"-2px", left:"-3px", right:"-3px", background:"#7C3AED", borderRadius:"3px", zIndex:0 }}
                      />
                      <motion.span
                        animate={{ color: isAct ? "#ffffff" : "rgba(255,255,255,0.14)" }}
                        transition={{ duration:0.35 }}
                        style={{ position:"relative", zIndex:1 }}
                      >
                        {step.hl}
                      </motion.span>
                    </span>

                    {step.suffix ? (
                      <motion.span
                        animate={{ color: isAct ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.14)" }}
                        transition={{ duration:0.35 }}
                      >
                        {step.suffix}
                      </motion.span>
                    ) : null}
                  </h3>

                  {/* Description — opacity only, no transform */}
                  <div style={{ minHeight:"68px" }}>
                    <AnimatePresence mode="wait">
                      {isAct && (
                        <motion.p
                          key={step.num}
                          initial={{ opacity:0 }}
                          animate={{ opacity:1 }}
                          exit={{ opacity:0 }}
                          transition={{ duration:0.4, delay:0.22 }}
                          style={{ fontFamily:"var(--font-sans)", fontWeight:300, fontSize:"13px", fontStyle:"italic", color:"rgba(255,255,255,0.42)", lineHeight:1.78, margin:0 }}
                        >
                          {step.desc}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Bottom accent line */}
                  <motion.div
                    animate={{ scaleX: isAct ? 1 : 0, opacity: isAct ? 1 : 0 }}
                    transition={{ duration:0.5, ease:"easeOut", delay: isAct ? 0.25 : 0 }}
                    style={{ position:"absolute", bottom:0, left:"28px", right:"28px", height:"2px", background:"linear-gradient(to right, #7C3AED, #a78bfa, rgba(167,139,250,0))", transformOrigin:"left", borderRadius:"2px" }}
                  />

                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── Navigation dots ── */}
        <div className="proc-dots">
          {STEPS.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => jumpTo(i)}
              animate={{ width: i === active ? 24 : 8, backgroundColor: i === active ? "#7C3AED" : "rgba(255,255,255,0.18)" }}
              transition={{ duration:0.3 }}
              style={{ height:"8px", borderRadius:"4px", border:"none", cursor:"pointer", padding:0, flexShrink:0 }}
            />
          ))}
        </div>

      </section>
    </>
  );
}
