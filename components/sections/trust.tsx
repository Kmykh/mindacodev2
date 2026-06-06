"use client";

import { motion } from "framer-motion";

const PHRASES = [
  "Tu web carga en menos de 1 segundo",
  "El dev que responde el WhatsApp",
  "Reunión hoy. Propuesta mañana.",
  "Construimos, no copiamos plantillas",
  "Sin contratos trampa ni letra chica",
  "Más ventas, no solo más visitas",
  "Código que escala cuando tu negocio crece",
  "Tu competencia ya está online. ¿Y tú?",
  "Pagás cuando quedás conforme",
  "Tecnología de empresa grande, precio real",
  "Cada proyecto, un equipo dedicado",
  "Cero plantillas. Todo desde cero.",
];

const STYLES = `
@keyframes dotBeat {
  0%,100% { transform: scale(1);   box-shadow: 0 0 5px rgba(124,58,237,0.7); }
  50%      { transform: scale(1.5); box-shadow: 0 0 14px rgba(124,58,237,1), 0 0 28px rgba(124,58,237,0.4); }
}
@keyframes sepGlow {
  0%,100% { color: rgba(124,58,237,0.5); text-shadow: none; }
  50%      { color: #a78bfa; text-shadow: 0 0 10px #7C3AED, 0 0 22px rgba(124,58,237,0.5); }
}
@keyframes scanBeam {
  0%   { transform: translateX(-100%); }
  100% { transform: translateX(400%); }
}
@keyframes borderPulse {
  0%,100% { opacity: 0.4; }
  50%      { opacity: 1; }
}
.trust-sep { animation: sepGlow 2.8s ease-in-out infinite; }
.trust-dot { animation: dotBeat 2.2s ease-in-out infinite; }
`;

export function TrustSection() {
  const allPhrases = [...PHRASES, ...PHRASES];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <section
        id="trust"
        className="relative overflow-hidden"
        style={{ background: "#07071a", padding: "0" }}
      >
        {/* Top line */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "1px",
          background: "linear-gradient(to right, transparent 0%, rgba(124,58,237,0.5) 30%, rgba(167,139,250,0.8) 50%, rgba(124,58,237,0.5) 70%, transparent 100%)",
          animation: "borderPulse 3s ease-in-out infinite",
        }} />

        {/* Scanning beam */}
        <div style={{
          position: "absolute", top: 0, bottom: 0, left: 0,
          width: "25%",
          background: "linear-gradient(to right, transparent, rgba(124,58,237,0.06), transparent)",
          animation: "scanBeam 5s linear infinite",
          pointerEvents: "none",
          zIndex: 1,
        }} />

        {/* Center glow */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%,-50%)",
          width: "50%", height: "200%",
          background: "radial-gradient(ellipse 100% 100% at center, rgba(124,58,237,0.09), transparent)",
          pointerEvents: "none",
        }} />

        {/* Left + right fade */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-32"
          style={{ background: "linear-gradient(to right, #07071a 30%, transparent)" }} />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-32"
          style={{ background: "linear-gradient(to left, #07071a 30%, transparent)" }} />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ padding: "28px 0", position: "relative", zIndex: 2 }}
        >
          <div className="flex animate-marquee" style={{ gap: 0 }}>
            {allPhrases.map((phrase, index) => (
              <div key={`phrase-${index}`} className="flex shrink-0 items-center">

                {/* Pill */}
                <div style={{
                  display: "flex", alignItems: "center", gap: "9px",
                  borderRadius: "999px",
                  border: "1px solid rgba(124,58,237,0.22)",
                  background: "linear-gradient(135deg, rgba(124,58,237,0.08), rgba(124,58,237,0.03))",
                  padding: "8px 20px",
                  backdropFilter: "blur(6px)",
                  WebkitBackdropFilter: "blur(6px)",
                }}>
                  {/* Pulse dot */}
                  <span className="trust-dot" style={{
                    width: "6px", height: "6px", borderRadius: "50%",
                    background: "#7C3AED",
                    flexShrink: 0, display: "block",
                  }} />
                  <span style={{
                    whiteSpace: "nowrap",
                    fontSize: "13px",
                    fontWeight: 500,
                    fontFamily: "var(--font-sans)",
                    color: "rgba(230,225,255,0.85)",
                    letterSpacing: "0.015em",
                    userSelect: "none",
                  }}>
                    {phrase}
                  </span>
                </div>

                {/* Separator */}
                <span
                  aria-hidden="true"
                  className="trust-sep"
                  style={{
                    fontSize: "7px",
                    padding: "0 20px",
                    lineHeight: 1,
                    flexShrink: 0,
                  }}
                >
                  ●
                </span>

              </div>
            ))}
          </div>
        </motion.div>

        {/* Bottom line */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "1px",
          background: "linear-gradient(to right, transparent 0%, rgba(124,58,237,0.5) 30%, rgba(167,139,250,0.8) 50%, rgba(124,58,237,0.5) 70%, transparent 100%)",
          animation: "borderPulse 3s ease-in-out infinite",
          animationDelay: "1.5s",
        }} />
      </section>
    </>
  );
}
