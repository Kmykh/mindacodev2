"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

/* ── Sets (no dots) ── */
const SETS = [
  ["RESULTADOS", "no promesas",   "TUYO",     "sin plantillas", "DIRECTO",    "desde Lima"   ],
  ["LANZAMOS",   "sin excusas",   "REAL",     "con propósito",  "FUNCIONA",   "lo prometemos"],
  ["CREAMOS",    "que se cumple", "AHORA",    "que funciona",   "ENTREGAMOS", "sin humo"     ],
  ["CRECEMOS",   "para siempre",  "DISTINTO", "y se nota",      "DIFERENTE",  "con alma"     ],
];

/* ── Animation direction per line ── */
const DIRS = [
  { out:"slide-out-down",  in:"slide-in-down"  },
  { out:"slide-out-left",  in:"slide-in-left"  },
  { out:"slide-out-up",    in:"slide-in-up"    },
  { out:"slide-out-right", in:"slide-in-right" },
  { out:"slide-out-down",  in:"slide-in-down"  },
  { out:"slide-out-left",  in:"slide-in-left"  },
];

/* ── Outer line styles (font / size / color / spacing) ── */
const LINE_STYLES: React.CSSProperties[] = [
  { fontFamily:"'Bebas Neue', sans-serif",                         fontSize:"92px",  color:"#ffffff",                letterSpacing:"3px",  lineHeight:1    },
  { fontFamily:"'Cormorant Garamond', serif", fontStyle:"italic",  fontSize:"38px",  color:"rgba(255,255,255,0.75)", lineHeight:1.15,      marginBottom:"4px" },
  { fontFamily:"'Poppins', sans-serif",       fontWeight:900,      fontSize:"128px", color:"#7C3AED",               letterSpacing:"-5px", lineHeight:0.88 },
  { fontFamily:"'Playfair Display', serif",   fontStyle:"italic",  fontSize:"32px",  color:"rgba(255,255,255,0.72)", lineHeight:1.2,       marginBottom:"4px" },
  { fontFamily:"'Space Grotesk', sans-serif", fontWeight:700,      fontSize:"84px",  color:"#ffffff",               letterSpacing:"-3px", lineHeight:1    },
  { fontFamily:"'EB Garamond', serif",        fontStyle:"italic",  fontSize:"30px",  color:"rgba(167,139,250,1)",   lineHeight:1.2  },
];

/* ── Highlighter background — only on italic lines (2, 4, 6) ── */
const HIGHLIGHT: (React.CSSProperties | undefined)[] = [
  undefined,
  { background:"rgba(124,58,237,0.28)", padding:"3px 10px 4px", borderRadius:"3px" },
  undefined,
  { background:"rgba(124,58,237,0.25)", padding:"3px 10px 4px", borderRadius:"3px" },
  undefined,
  { background:"rgba(124,58,237,0.35)", padding:"3px 10px 4px", borderRadius:"3px" },
];

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Cormorant+Garamond:ital@1&family=Poppins:wght@900&family=Playfair+Display:ital@1&family=Space+Grotesk:wght@700&family=EB+Garamond:ital@1&display=swap');

.word-line  { display: block; overflow: visible; position: relative; }
.word-inner { display: inline-block; }

@keyframes slideOutUp    { from { transform:translateY(0);     opacity:1; } to { transform:translateY(-24px); opacity:0; } }
@keyframes slideOutDown  { from { transform:translateY(0);     opacity:1; } to { transform:translateY(24px);  opacity:0; } }
@keyframes slideOutLeft  { from { transform:translateX(0);     opacity:1; } to { transform:translateX(-24px); opacity:0; } }
@keyframes slideOutRight { from { transform:translateX(0);     opacity:1; } to { transform:translateX(24px);  opacity:0; } }
@keyframes slideInUp     { from { transform:translateY(24px);  opacity:0; } to { transform:translateY(0);     opacity:1; } }
@keyframes slideInDown   { from { transform:translateY(-24px); opacity:0; } to { transform:translateY(0);     opacity:1; } }
@keyframes slideInLeft   { from { transform:translateX(-24px); opacity:0; } to { transform:translateX(0);     opacity:1; } }
@keyframes slideInRight  { from { transform:translateX(24px);  opacity:0; } to { transform:translateX(0);     opacity:1; } }

.slide-out-up    { animation: slideOutUp    0.35s ease-in                      forwards; }
.slide-out-down  { animation: slideOutDown  0.35s ease-in                      forwards; }
.slide-out-left  { animation: slideOutLeft  0.35s ease-in                      forwards; }
.slide-out-right { animation: slideOutRight 0.35s ease-in                      forwards; }
.slide-in-up     { animation: slideInUp     0.65s cubic-bezier(0.22,1,0.36,1) forwards; }
.slide-in-down   { animation: slideInDown   0.65s cubic-bezier(0.22,1,0.36,1) forwards; }
.slide-in-left   { animation: slideInLeft   0.65s cubic-bezier(0.22,1,0.36,1) forwards; }
.slide-in-right  { animation: slideInRight  0.65s cubic-bezier(0.22,1,0.36,1) forwards; }

@media(max-width:768px){
  .bf-split     { flex-direction:column !important; }
  .bf-video-col { width:100% !important; }
  .bf-text-col  { width:100% !important; padding:40px 24px !important; }
  .bf-line-0 { font-size:52px !important; }
  .bf-line-1 { font-size:22px !important; }
  .bf-line-2 { font-size:56px !important; letter-spacing:-3px !important; }
  .bf-line-3 { font-size:19px !important; }
  .bf-line-4 { font-size:48px !important; letter-spacing:-2px !important; }
  .bf-line-5 { font-size:18px !important; }
}
`;

export function BrandFilmSection() {
  const spanRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const setIdxRef = useRef(0);

  useEffect(() => {
    /* Initial entrance */
    spanRefs.current.forEach((el, i) => {
      if (!el) return;
      el.className = `word-inner ${DIRS[i].in}`;
    });

    const interval = setInterval(() => {
      /* Exit */
      spanRefs.current.forEach((el, i) => {
        if (!el) return;
        el.className = `word-inner ${DIRS[i].out}`;
      });

      /* Swap text + enter after exit completes */
      setTimeout(() => {
        setIdxRef.current = (setIdxRef.current + 1) % SETS.length;
        const next = setIdxRef.current;
        spanRefs.current.forEach((el, i) => {
          if (!el) return;
          el.textContent = SETS[next][i];
          void el.offsetWidth; // force reflow to restart animation
          el.className = `word-inner ${DIRS[i].in}`;
        });
      }, 380);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <section style={{ background:"#07071a", padding:"80px 0" }}>
        <div className="bf-split" style={{ display:"flex", flexDirection:"row", alignItems:"stretch" }}>

          {/* ── LEFT: Video ── */}
          <div className="bf-video-col" style={{ width:"58%", position:"relative", overflow:"hidden" }}>
            <video autoPlay muted playsInline style={{ width:"100%", display:"block" }}>
              <source src="/videos/video2.mp4" type="video/mp4" />
            </video>

            {/* Fusion overlays */}
            <div style={{ position:"absolute", inset:"0 auto 0 0",  width:"18%",  pointerEvents:"none", zIndex:2, background:"linear-gradient(to right,  #07071a 0%, transparent 100%)" }} />
            <div style={{ position:"absolute", inset:"0 0 0 auto",  width:"18%",  pointerEvents:"none", zIndex:2, background:"linear-gradient(to left,   #07071a 0%, transparent 100%)" }} />
            <div style={{ position:"absolute", inset:"0 0 auto 0",  height:"18%", pointerEvents:"none", zIndex:2, background:"linear-gradient(to bottom, #07071a 0%, transparent 100%)" }} />
            <div style={{ position:"absolute", inset:"auto 0 0 0",  height:"22%", pointerEvents:"none", zIndex:2, background:"linear-gradient(to top,    #07071a 0%, transparent 100%)" }} />

            {/* Watermark cover */}
            <div style={{ position:"absolute", bottom:0, right:0, width:"45%", height:"55%", pointerEvents:"none", zIndex:4, background:"radial-gradient(ellipse at bottom right, #07071a 0%, #07071a 28%, rgba(7,7,26,0.6) 50%, transparent 70%)" }} />
          </div>

          {/* ── RIGHT: Manifesto ── */}
          <motion.div
            className="bf-text-col"
            initial={{ opacity:0, x:24 }}
            whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true }}
            transition={{ duration:0.55, delay:0.15 }}
            style={{ width:"42%", padding:"0 64px 0 48px", display:"flex", flexDirection:"column", justifyContent:"center" }}
          >
            <div style={{ display:"flex", flexDirection:"column", gap:"0px" }}>
              {LINE_STYLES.map((style, i) => (
                <div key={i} className={`word-line bf-line-${i}`} style={style}>
                  <span
                    ref={el => { spanRefs.current[i] = el; }}
                    className="word-inner"
                    style={{ opacity:0, ...HIGHLIGHT[i] }}
                  >
                    {SETS[0][i]}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </section>
    </>
  );
}
