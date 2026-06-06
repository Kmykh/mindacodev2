"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ════════════════════════════════════════════
   Shared data
   ════════════════════════════════════════════ */
const REASSURANCE = [
  { text:"Respondemos en ",        bold:"menos de 24h",           end:"" },
  { text:"Primera reunión ",       bold:"gratis y sin compromiso", end:"" },
  { text:"Directo con el dev, ",   bold:"sin intermediarios",      end:"" },
  { text:"Basados en ",            bold:"Lima, Perú",               end:"" },
];

const SERVICES = [
  { title:"Chatbot IA",            sub:"WhatsApp · Instagram · Web" },
  { title:"Landing Page / Web",    sub:"Presencia profesional" },
  { title:"App Móvil",             sub:"iOS y Android" },
  { title:"E-commerce",            sub:"Tienda online completa" },
  { title:"Automatizaciones",      sub:"n8n · Zapier · API" },
  { title:"Aún no lo tengo claro", sub:"Hablemos y te oriento" },
];

/* ════════════════════════════════════════════
   Types
   ════════════════════════════════════════════ */
type Flow = null | "proyecto" | "debut";

/* ════════════════════════════════════════════
   Pure UI atoms  (defined outside to avoid remounts)
   ════════════════════════════════════════════ */
function FieldLabel({ text }: { text: string }) {
  return (
    <p style={{ fontFamily:"var(--font-sans)", fontWeight:700, fontSize:"10px", color:"rgba(255,255,255,0.4)", textTransform:"uppercase", letterSpacing:"2px", margin:"0 0 8px" }}>
      {text}
    </p>
  );
}

function StepLabel({ label }: { label: string }) {
  return (
    <p style={{ fontFamily:"var(--font-sans)", fontWeight:700, fontSize:"10px", color:"rgba(124,58,237,0.6)", textTransform:"uppercase", letterSpacing:"3px", margin:"0 0 10px" }}>
      {label}
    </p>
  );
}

function Question({ text }: { text: string }) {
  return (
    <h3 style={{ fontFamily:"var(--font-sans)", fontWeight:700, fontSize:"22px", color:"#ffffff", lineHeight:1.25, margin:"0 0 20px", letterSpacing:"-0.01em" }}>
      {text}
    </h3>
  );
}

function PrimaryBtn({ label, onClick, disabled }: { label:string; onClick:()=>void; disabled?:boolean }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      background: disabled ? "rgba(124,58,237,0.3)" : "#7C3AED",
      color:"#ffffff", fontFamily:"var(--font-sans)", fontWeight:600, fontSize:"14px",
      borderRadius:"10px", padding:"14px 28px", border:"none",
      cursor: disabled ? "not-allowed" : "pointer", marginTop:"20px", transition:"background 0.2s",
    }}>
      {label}
    </button>
  );
}

function BackBtn({ onClick }: { onClick:()=>void }) {
  return (
    <button onClick={onClick} style={{
      background:"transparent", border:"none", cursor:"pointer",
      fontFamily:"var(--font-sans)", fontWeight:300, fontSize:"13px",
      color:"rgba(255,255,255,0.35)", marginTop:"10px", padding:"4px 0",
    }}>
      ← Volver
    </button>
  );
}

function YNBtn({ label, selected, isYes, onClick }: { label:string; selected:boolean; isYes:boolean; onClick:()=>void }) {
  return (
    <button
      className={`ct-yn-btn${selected ? (isYes ? " ct-yn-yes-active" : " ct-yn-no-active") : ""}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

function BlockMessage({ title, body, btnLabel, onAlt }: { title:string; body:string; btnLabel:string; onAlt:()=>void }) {
  return (
    <motion.div
      initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:8 }}
      transition={{ duration:0.25 }}
      style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:"10px", padding:"20px", marginTop:"12px" }}
    >
      <p style={{ fontFamily:"var(--font-sans)", fontWeight:600, fontSize:"14px", color:"#ffffff", margin:"0 0 8px" }}>{title}</p>
      <p style={{ fontFamily:"var(--font-sans)", fontWeight:300, fontSize:"13px", color:"rgba(255,255,255,0.4)", margin:"0 0 14px", lineHeight:1.6 }}>{body}</p>
      <button onClick={onAlt} style={{ background:"transparent", border:"1px solid rgba(124,58,237,0.3)", color:"#A78BFA", borderRadius:"8px", padding:"10px 20px", cursor:"pointer", fontFamily:"var(--font-sans)", fontWeight:500, fontSize:"13px" }}>
        {btnLabel}
      </button>
    </motion.div>
  );
}

/* ════════════════════════════════════════════
   CSS
   ════════════════════════════════════════════ */
const STYLES = `
.ct-input {
  width: 100%;
  background: #0d0d28;
  border: 1px solid rgba(124,58,237,0.2);
  border-radius: 10px;
  padding: 14px 16px;
  font-family: var(--font-sans);
  font-size: 14px;
  color: #ffffff;
  outline: none;
  transition: border-color 0.25s;
  box-sizing: border-box;
}
.ct-input::placeholder { color: rgba(255,255,255,0.22); }
.ct-input:focus { border-color: #7C3AED; }

.ct-opt {
  background: #0d0d28;
  border: 1px solid rgba(124,58,237,0.2);
  border-radius: 10px;
  padding: 14px 16px;
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s;
  text-align: left;
  width: 100%;
}
.ct-opt:hover     { border-color: rgba(124,58,237,0.5); }
.ct-opt-active    { border-color: #7C3AED !important; background: rgba(124,58,237,0.15) !important; }

.ct-flow-card {
  background: #0d0d28;
  border: 1px solid rgba(124,58,237,0.2);
  border-radius: 12px;
  padding: 18px 20px;
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s;
  text-align: left;
  width: 100%;
}
.ct-flow-card:hover       { border-color: rgba(124,58,237,0.5); }
.ct-flow-card-active      { border-color: #7C3AED !important; background: rgba(124,58,237,0.12) !important; }
.ct-flow-debut:hover      { border-color: rgba(212,160,23,0.6) !important; }
.ct-flow-debut-active     { border-color: #D4A017 !important; background: rgba(212,160,23,0.08) !important; }

.ct-yn-btn {
  background: #0d0d28;
  border: 1px solid rgba(124,58,237,0.3);
  color: #ffffff;
  border-radius: 8px;
  padding: 10px 24px;
  cursor: pointer;
  font-family: var(--font-sans);
  font-weight: 500;
  font-size: 13px;
  transition: border-color 0.2s, background 0.2s;
  flex: 1;
}
.ct-yn-yes-active { border-color: #7C3AED !important; background: rgba(124,58,237,0.15) !important; }
.ct-yn-no-active  { border-color: rgba(255,255,255,0.2) !important; background: rgba(255,255,255,0.04) !important; }

@media(max-width:768px){
  .ct-wrap       { flex-direction: column !important; padding: 48px 24px !important; }
  .ct-left       { width: 100% !important; margin-bottom: 48px; }
  .ct-right      { width: 100% !important; }
  .ct-svc-grid   { grid-template-columns: 1fr !important; }
}
`;

/* ════════════════════════════════════════════
   Main component
   ════════════════════════════════════════════ */
export function ContactSection() {
  const [step,            setStep]    = useState(1);
  const [flow,            setFlow]    = useState<Flow>(null);
  const [selectedService, setSvc]     = useState("");
  const [name,            setName]    = useState("");
  const [message,         setMsg]     = useState("");
  const [business,        setBiz]     = useState("");
  const [answers, setAnswers] = useState<{ activeBusiness: null|boolean; hasDomain: null|boolean }>({
    activeBusiness: null,
    hasDomain: null,
  });

  /* Derived Flujo B state */
  const blockedBusiness = answers.activeBusiness === false;
  const blockedDomain   = answers.hasDomain === false && !blockedBusiness;
  const showQ2          = answers.activeBusiness === true;
  const canContinue     = answers.activeBusiness === true && answers.hasDomain === true;

  /* Progress bar */
  const totalBars = flow === "debut" ? 2 : 3;
  const activeBar = flow === "debut" && step > 2 ? 2 : step;

  /* WhatsApp senders */
  const sendA = () => {
    const text =
      `Hola Minda Code, los contacto desde su pagina web.\n\n` +
      `Mi nombre es ${name || "un cliente interesado"}.\n` +
      `Me interesa: ${selectedService}.\n` +
      `${message ? `${message}\n` : ""}` +
      `\nQueria coordinar una llamada para contarles mas, cuando tienen disponibilidad?`;
    window.open(`https://wa.me/51926948155?text=${encodeURIComponent(text)}`, "_blank");
  };

  const sendB = () => {
    const text =
      `Hola Minda Code, los contacto desde su pagina web.\n\n` +
      `Quiero postular a la Promo Debut Digital.\n\n` +
      `Soy ${name || "un emprendedor interesado"}` +
      `${business ? ` y mi negocio es: ${business}.` : "."}\n\n` +
      `Mi negocio ya esta activo y quiero tener una web propia.\n\n` +
      `Podrian darme mas informacion para dar el primer paso?`;
    window.open(`https://wa.me/51926948155?text=${encodeURIComponent(text)}`, "_blank");
  };

  const goToFlowA = () => {
    setFlow("proyecto");
    setSvc("");
    setStep(2);
  };

  /* Slide animation config */
  const slide = (dir: 1 | -1) => ({
    initial:    { opacity:0, x: 24*dir },
    animate:    { opacity:1, x:0 },
    exit:       { opacity:0, x:-24*dir },
    transition: { duration:0.3 },
  });

  /* ══ Render ══ */
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <section id="contact">
        <div className="ct-wrap" style={{ display:"flex", gap:"64px", padding:"80px 56px", maxWidth:"1200px", margin:"0 auto" }}>

          {/* ══ LEFT ══ */}
          <motion.div
            className="ct-left"
            initial={{ opacity:0, x:-24 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.55 }}
            style={{ width:"42%", flexShrink:0 }}
          >
            <p style={{ fontFamily:"var(--font-sans)", fontWeight:700, fontSize:"10px", color:"#7C3AED", textTransform:"uppercase", letterSpacing:"4px", margin:"0 0 24px" }}>
              Contacto
            </p>
            <h2 style={{ fontFamily:"var(--font-sans)", fontWeight:900, fontSize:"38px", lineHeight:1.12, letterSpacing:"-0.025em", margin:"0 0 20px" }}>
              <span style={{ display:"block", color:"#ffffff" }}>Tu próximo</span>
              <span style={{ display:"block", color:"#ffffff" }}>proyecto</span>
              <span style={{ display:"block", color:"#ffffff" }}>empieza</span>
              <span style={{ display:"block", color:"#7C3AED" }}>aquí.</span>
            </h2>
            <p style={{ fontFamily:"var(--font-sans)", fontWeight:300, fontSize:"14px", color:"rgba(255,255,255,0.4)", lineHeight:1.8, margin:0, maxWidth:"340px" }}>
              Ya sea que tengas una idea en servilleta o un negocio listo para digitalizarse. Hablemos.
            </p>
          </motion.div>

          {/* ══ RIGHT ══ */}
          <motion.div
            className="ct-right"
            initial={{ opacity:0, x:24 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.55, delay:0.1 }}
            style={{ flex:1, minWidth:0 }}
          >
            {/* Progress bars */}
            <div style={{ display:"flex", gap:"6px", marginBottom:"28px" }}>
              {Array.from({ length: totalBars }, (_, i) => (
                <motion.div
                  key={`${totalBars}-${i}`}
                  animate={{ background: i < activeBar ? "#7C3AED" : "rgba(124,58,237,0.2)" }}
                  transition={{ duration:0.3 }}
                  style={{ width:"24px", height:"3px", borderRadius:"2px" }}
                />
              ))}
            </div>

            <AnimatePresence mode="wait">

              {/* ── STEP 1 — Flow chooser ── */}
              {step === 1 && (
                <motion.div key="step1" {...slide(1)}>
                  <StepLabel label={flow === "debut" ? "Paso 1 de 2" : "Paso 1 de 3"} />
                  <Question text="¿Cómo te podemos ayudar?" />

                  <div style={{ display:"flex", flexDirection:"column", gap:"10px", marginBottom:"4px" }}>
                    {/* Option A: project */}
                    <button
                      className={`ct-flow-card${flow === "proyecto" ? " ct-flow-card-active" : ""}`}
                      onClick={() => setFlow("proyecto")}
                    >
                      <p style={{ fontFamily:"var(--font-sans)", fontWeight:700, fontSize:"15px", color:"#ffffff", margin:"0 0 4px" }}>
                        Tengo un proyecto
                      </p>
                      <p style={{ fontFamily:"var(--font-sans)", fontWeight:300, fontSize:"12px", color:"rgba(255,255,255,0.35)", margin:0 }}>
                        Landing, App, E-commerce, Chatbot y más
                      </p>
                    </button>

                    {/* Option B: debut */}
                    <button
                      className={`ct-flow-card ct-flow-debut${flow === "debut" ? " ct-flow-debut-active" : ""}`}
                      onClick={() => setFlow("debut")}
                      style={{ borderColor: flow === "debut" ? "#D4A017" : "rgba(212,160,23,0.3)" }}
                    >
                      <p style={{ fontFamily:"var(--font-sans)", fontWeight:700, fontSize:"15px", color: flow === "debut" ? "#D4A017" : "rgba(212,160,23,0.85)", margin:"0 0 4px" }}>
                        Promo Debut Digital
                      </p>
                      <p style={{ fontFamily:"var(--font-sans)", fontWeight:300, fontSize:"12px", color:"rgba(255,255,255,0.35)", margin:0 }}>
                        Primera web profesional · Solo para negocios activos
                      </p>
                    </button>
                  </div>

                  <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-start" }}>
                    <PrimaryBtn label="Siguiente →" onClick={() => setStep(2)} disabled={!flow} />
                  </div>
                </motion.div>
              )}

              {/* ── FLUJO A — Step 2: service ── */}
              {step === 2 && flow === "proyecto" && (
                <motion.div key="a2" {...slide(1)}>
                  <StepLabel label="Paso 2 de 3" />
                  <Question text="¿Qué necesitas desarrollar?" />

                  <div className="ct-svc-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px" }}>
                    {SERVICES.map(svc => (
                      <button
                        key={svc.title}
                        className={`ct-opt${selectedService === svc.title ? " ct-opt-active" : ""}`}
                        onClick={() => setSvc(svc.title)}
                      >
                        <p style={{ fontFamily:"var(--font-sans)", fontWeight:600, fontSize:"13px", color:"#ffffff", margin:"0 0 3px" }}>{svc.title}</p>
                        <p style={{ fontFamily:"var(--font-sans)", fontWeight:300, fontSize:"11px", color:"rgba(255,255,255,0.35)", margin:0 }}>{svc.sub}</p>
                      </button>
                    ))}
                  </div>

                  <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-start" }}>
                    <PrimaryBtn label="Siguiente →" onClick={() => setStep(3)} disabled={!selectedService} />
                    <BackBtn onClick={() => setStep(1)} />
                  </div>
                </motion.div>
              )}

              {/* ── FLUJO A — Step 3: contact ── */}
              {step === 3 && flow === "proyecto" && (
                <motion.div key="a3" {...slide(1)}>
                  <StepLabel label="Paso 3 de 3" />
                  <Question text="Cuéntanos sobre tu proyecto" />

                  <div style={{ marginBottom:"14px" }}>
                    <FieldLabel text="Tu nombre" />
                    <input className="ct-input" type="text" placeholder="Tu nombre o el de tu negocio" value={name} onChange={e => setName(e.target.value)} />
                  </div>
                  <div style={{ marginBottom:"20px" }}>
                    <FieldLabel text="¿Qué necesitas? (opcional)" />
                    <textarea className="ct-input" placeholder="Una línea sobre tu idea o proyecto..." value={message} onChange={e => setMsg(e.target.value)} style={{ height:"90px", resize:"none", display:"block" }} />
                  </div>

                  <button onClick={sendA} style={{ width:"100%", background:"#25D366", color:"#ffffff", fontFamily:"var(--font-sans)", fontWeight:700, fontSize:"15px", borderRadius:"10px", padding:"16px", border:"none", cursor:"pointer" }}>
                    Enviar por WhatsApp
                  </button>
                  <p style={{ fontFamily:"var(--font-sans)", fontSize:"11px", color:"rgba(255,255,255,0.25)", textAlign:"center", lineHeight:1.6, margin:"10px 0 0" }}>
                    Abre WhatsApp con tu mensaje prellenado.<br />Tú decides si enviar.
                  </p>

                  <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-start" }}>
                    <BackBtn onClick={() => setStep(2)} />
                  </div>
                </motion.div>
              )}

              {/* ── FLUJO B — Step 2: qualification ── */}
              {step === 2 && flow === "debut" && (
                <motion.div key="b2" {...slide(1)}>
                  <StepLabel label="Paso 2 de 2" />
                  <Question text="Antes de postular, confirma estos puntos" />

                  {/* Q1 */}
                  <div style={{ marginBottom:"16px" }}>
                    <p style={{ fontFamily:"var(--font-sans)", fontWeight:500, fontSize:"14px", color:"rgba(255,255,255,0.75)", margin:"0 0 10px", lineHeight:1.4 }}>
                      ¿Tu negocio está activo y operando?
                    </p>
                    <div style={{ display:"flex", gap:"8px" }}>
                      <YNBtn label="Sí" isYes selected={answers.activeBusiness === true}
                        onClick={() => setAnswers(a => ({ ...a, activeBusiness:true }))} />
                      <YNBtn label="No" isYes={false} selected={answers.activeBusiness === false}
                        onClick={() => setAnswers({ activeBusiness:false, hasDomain:null })} />
                    </div>
                  </div>

                  {/* Q2 — appears after Q1 = yes */}
                  <AnimatePresence>
                    {showQ2 && (
                      <motion.div
                        key="q2"
                        initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:8 }}
                        transition={{ duration:0.25 }}
                        style={{ marginBottom:"16px" }}
                      >
                        <p style={{ fontFamily:"var(--font-sans)", fontWeight:500, fontSize:"14px", color:"rgba(255,255,255,0.75)", margin:"0 0 10px", lineHeight:1.4 }}>
                          ¿Quieres que tu web tenga nombre propio, como tunegocio.com?
                        </p>
                        <div style={{ display:"flex", gap:"8px" }}>
                          <YNBtn label="Sí" isYes selected={answers.hasDomain === true}
                            onClick={() => setAnswers(a => ({ ...a, hasDomain:true }))} />
                          <YNBtn label="No" isYes={false} selected={answers.hasDomain === false}
                            onClick={() => setAnswers(a => ({ ...a, hasDomain:false }))} />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Block: no active business */}
                  <AnimatePresence>
                    {blockedBusiness && (
                      <BlockMessage
                        key="block-biz"
                        title="La promo es para negocios activos"
                        body="Debut Digital está diseñada para negocios que ya operan y quieren su primera presencia web profesional. Cuando tu negocio arranque, aquí estaremos."
                        btnLabel="Tengo un proyecto en mente →"
                        onAlt={goToFlowA}
                      />
                    )}
                  </AnimatePresence>

                  {/* Block: no domain */}
                  <AnimatePresence>
                    {blockedDomain && (
                      <BlockMessage
                        key="block-domain"
                        title="El dominio es parte del paquete"
                        body="Para tener una web profesional necesitas un dominio propio (ej. tunegocio.com). Es lo que hace que tu negocio se vea serio en línea. Si en el futuro lo tienes claro, escríbenos."
                        btnLabel="Entendido, quiero un proyecto normal →"
                        onAlt={goToFlowA}
                      />
                    )}
                  </AnimatePresence>

                  {/* Continue only when both = yes */}
                  {canContinue && (
                    <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-start" }}>
                      <PrimaryBtn label="Continuar →" onClick={() => setStep(3)} />
                    </div>
                  )}

                  <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-start" }}>
                    <BackBtn onClick={() => setStep(1)} />
                  </div>
                </motion.div>
              )}

              {/* ── FLUJO B — Step 3: debut contact ── */}
              {step === 3 && flow === "debut" && (
                <motion.div key="b3" {...slide(1)}>
                  <StepLabel label="Paso 2 de 2" />
                  <Question text="Casi listo para postular" />

                  <div style={{ marginBottom:"14px" }}>
                    <FieldLabel text="Tu nombre" />
                    <input className="ct-input" type="text" placeholder="Tu nombre" value={name} onChange={e => setName(e.target.value)} />
                  </div>
                  <div style={{ marginBottom:"20px" }}>
                    <FieldLabel text="Tu negocio" />
                    <textarea className="ct-input" placeholder="¿A qué se dedica tu negocio?" value={business} onChange={e => setBiz(e.target.value)} style={{ height:"70px", resize:"none", display:"block" }} />
                  </div>

                  <button onClick={sendB} style={{ width:"100%", background:"#25D366", color:"#ffffff", fontFamily:"var(--font-sans)", fontWeight:700, fontSize:"15px", borderRadius:"10px", padding:"16px", border:"none", cursor:"pointer" }}>
                    Enviar por WhatsApp
                  </button>
                  <p style={{ fontFamily:"var(--font-sans)", fontSize:"11px", color:"rgba(255,255,255,0.25)", textAlign:"center", lineHeight:1.6, margin:"10px 0 0" }}>
                    Abre WhatsApp con tu mensaje prellenado.<br />Tú decides si enviar.
                  </p>

                  <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-start" }}>
                    <BackBtn onClick={() => setStep(2)} />
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </motion.div>

        </div>
      </section>
    </>
  );
}
