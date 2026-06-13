"use client";

import { useRef, useState, type ReactNode } from "react";

/* ════════════════════════════════════════════════════════════
   MobileCarousel — carrusel horizontal con scroll-snap, contador
   y puntos de navegación. Mismo patrón que el carrusel de
   Servicios, pensado para acortar el scroll en móvil.
   ════════════════════════════════════════════════════════════ */

const CAR_STYLES = `
.mcar-scroller{
  display:flex;gap:16px;overflow-x:auto;scroll-snap-type:x mandatory;
  scrollbar-width:none;-webkit-overflow-scrolling:touch;padding:6px 7vw 6px;
}
.mcar-scroller::-webkit-scrollbar{display:none}
.mcar-panel{flex:0 0 auto;width:min(440px,86vw);scroll-snap-align:center;display:flex}
.mcar-panel>*{width:100%}
.mcar-dots{display:flex;justify-content:center;align-items:center;gap:7px;padding:22px 0 6px}
.mcar-dot{height:7px;border-radius:4px;border:none;padding:0;cursor:pointer;
  transition:width .3s ease,background .3s ease}
`;

export function MobileCarousel({
  panels,
  accent = "#7C3AED",
  accentSoft = "#a78bfa",
}: {
  panels: ReactNode[];
  accent?: string;
  accentSoft?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const total = panels.length;

  const goTo = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(total - 1, i));
    const child = el.children[clamped] as HTMLElement | undefined;
    if (!child) return;
    el.scrollTo({
      left: child.offsetLeft - (el.clientWidth - child.clientWidth) / 2,
      behavior: "smooth",
    });
  };

  const onScroll = () => {
    const el = ref.current;
    if (!el) return;
    const center = el.scrollLeft + el.clientWidth / 2;
    let best = 0,
      bestD = Infinity;
    for (let i = 0; i < el.children.length; i++) {
      const c = el.children[i] as HTMLElement;
      const d = Math.abs(c.offsetLeft + c.clientWidth / 2 - center);
      if (d < bestD) {
        bestD = d;
        best = i;
      }
    }
    setIndex(best);
  };

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div>
      <style dangerouslySetInnerHTML={{ __html: CAR_STYLES }} />

      <div ref={ref} className="mcar-scroller" onScroll={onScroll}>
        {panels.map((p, i) => (
          <div key={i} className="mcar-panel">
            {p}
          </div>
        ))}
      </div>

      <div className="mcar-dots">
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 600,
            fontSize: "12px",
            letterSpacing: "1.5px",
            color: "rgba(255,255,255,0.4)",
            marginRight: "8px",
          }}
        >
          <span style={{ color: accentSoft }}>{pad(index + 1)}</span> / {pad(total)}
        </span>
        {panels.map((_, i) => (
          <button
            key={i}
            className="mcar-dot"
            aria-label={`Ir a la tarjeta ${i + 1}`}
            onClick={() => goTo(i)}
            style={{
              width: i === index ? 22 : 7,
              background: i === index ? accent : "rgba(255,255,255,0.18)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
