"use client";

import Image from "next/image";
import { Bebas_Neue } from "next/font/google";
import { motion } from "framer-motion";

const bebas = Bebas_Neue({ weight: "400", subsets: ["latin"] });

const PILLS = [
  "Diseño profesional",
  "Mobile ready",
  "Publicado online",
  "5 cupos",
  "@mindacode",
];

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay },
});

export function MothersDayBanner() {
  const handleCTA = () => {
    const msg = encodeURIComponent(
      "Hola Minda! Vi la promo Debut Digital - Mundial 2026 y quiero mi web profesional gratis"
    );
    window.open(`https://wa.me/51926948155?text=${msg}`, "_blank");
  };

  return (
    <section
      id="promocion"
      className="relative overflow-hidden"
      style={{ minHeight: "100vh", backgroundColor: "#080818" }}
    >

      {/* ═══════════════════════════════════════════
          z:0 — TIRAS VERTICALES ANIMADAS
          top: -100% + height: 300% garantiza que la
          tira cubra el viewport en todo momento,
          incluso en el extremo del translateY(±30%)
      ═══════════════════════════════════════════ */}
      {Array.from({ length: 7 }, (_, i) => (
        <motion.div
          key={i}
          aria-hidden
          style={{
            position: "absolute",
            left: `calc(${i} * 100% / 7)`,
            top: "-100%",
            width: "calc(100% / 7)",
            height: "300%",
            zIndex: 0,
          }}
          animate={{ y: i % 2 === 0 ? ["0%", "-30%"] : ["0%", "30%"] }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
        >
          <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <Image
              src={`/mundial/${i + 1}.png`}
              alt=""
              fill
              style={{ objectFit: "cover", objectPosition: "center" }}
              sizes="calc(100vw / 7)"
              priority={i < 2}
            />
          </div>
        </motion.div>
      ))}

      {/* ═══════════════════════════════════════════
          z:1 — OVERLAY oscuro encima de las tiras
      ═══════════════════════════════════════════ */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(8, 8, 24, 0.72)",
          zIndex: 1,
        }}
      />

      {/* ═══════════════════════════════════════════
          z:2+ — TODO EL CONTENIDO EXISTENTE
      ═══════════════════════════════════════════ */}

      {/* Glow aura detrás de la mascota */}
      <motion.div
        aria-hidden
        animate={{ scale: [1, 1.14, 1], opacity: [0.22, 0.42, 0.22] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          right: "8%",
          top: "0",
          width: "55%",
          height: "100%",
          background:
            "radial-gradient(ellipse 55% 65% at 65% 55%, rgba(124,58,237,0.32) 0%, rgba(212,160,23,0.07) 50%, transparent 78%)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      {/* Segundo glow dorado bajo la mascota */}
      <motion.div
        aria-hidden
        animate={{ scale: [1, 1.08, 1], opacity: [0.12, 0.22, 0.12] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        style={{
          position: "absolute",
          right: "18%",
          bottom: "-5%",
          width: "38%",
          height: "55%",
          background:
            "radial-gradient(ellipse 70% 60% at 50% 90%, rgba(212,160,23,0.28) 0%, transparent 70%)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      {/* Círculos concéntricos — rotación lenta */}
      <motion.svg
        aria-hidden
        animate={{ rotate: 360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute",
          top: "-100px",
          right: "12%",
          zIndex: 2,
          pointerEvents: "none",
          transformOrigin: "310px 360px",
        }}
        width="620" height="720" viewBox="0 0 620 720" fill="none"
      >
        {[310, 248, 186, 124].map((r, i) => (
          <circle key={i} cx="310" cy="360" r={r}
            stroke="#7C3AED" strokeOpacity={0.05 + i * 0.02} strokeWidth="1" fill="none" />
        ))}
      </motion.svg>

      {/* Dot grid — esquina inferior izquierda */}
      <svg
        aria-hidden
        style={{ position: "absolute", bottom: 0, left: 0, zIndex: 2, pointerEvents: "none" }}
        width="240" height="240"
      >
        <defs>
          <pattern id="munDots" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.3" fill="rgba(255,255,255,0.05)" />
          </pattern>
        </defs>
        <rect width="240" height="240" fill="url(#munDots)" />
      </svg>

      {/* "2026" watermark pulsante */}
      <motion.div
        aria-hidden
        className={bebas.className}
        animate={{ opacity: [0.04, 0.09, 0.04] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          bottom: "-16px",
          left: "-8px",
          fontSize: "clamp(120px, 22vw, 290px)",
          color: "#7C3AED",
          lineHeight: 1,
          userSelect: "none",
          zIndex: 2,
          letterSpacing: "-4px",
        }}
      >
        2026
      </motion.div>

      {/* Mascota — flotando */}
      <div
        style={{
          position: "absolute",
          right: "20%",
          bottom: 0,
          height: "90%",
          zIndex: 10,
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        <motion.div
          style={{ height: "100%", display: "flex", alignItems: "flex-end" }}
          animate={{ y: [0, -22, 0] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="/mundial.png"
            alt="Mascota Minda Code levantando la copa del mundo"
            width={1024}
            height={1536}
            priority
            style={{
              height: "100%",
              width: "auto",
              objectFit: "contain",
              mixBlendMode: "screen",
            }}
          />
        </motion.div>
      </div>

      {/* Zona superior izquierda — Tag + Headline */}
      <div
        style={{
          position: "absolute",
          top: "clamp(72px, 10vh, 110px)",
          left: "6%",
          zIndex: 5,
          maxWidth: "52%",
        }}
      >
        <motion.div
          {...fadeUp(0.15)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "clamp(10px, 1.6vw, 20px)",
          }}
        >
          <motion.span
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            style={{
              display: "inline-block",
              width: "7px",
              height: "7px",
              borderRadius: "50%",
              backgroundColor: "#D4A017",
              flexShrink: 0,
            }}
          />
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(8px, 0.9vw, 11px)",
              letterSpacing: "0.24em",
              color: "#D4A017",
              textTransform: "uppercase",
              fontWeight: 600,
              margin: 0,
            }}
          >
            MINDA CODE × MUNDIAL 2026
          </p>
        </motion.div>

        <motion.h2
          {...fadeUp(0.3)}
          className={bebas.className}
          style={{
            fontSize: "clamp(72px, 12.5vw, 148px)",
            lineHeight: 0.84,
            letterSpacing: "-1px",
            textTransform: "uppercase",
            margin: 0,
          }}
        >
          <motion.span
            style={{ color: "#FFFFFF", display: "block" }}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          >
            DEBUT
          </motion.span>
          <motion.span
            style={{ color: "#7C3AED", display: "block" }}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.45 }}
          >
            DIGITAL
          </motion.span>
        </motion.h2>
      </div>

      {/* Zona copy + CTA + pills */}
      <motion.div
        {...fadeUp(0.55)}
        style={{
          position: "absolute",
          top: "55%",
          left: "6%",
          right: "40%",
          transform: "translateY(-50%)",
          zIndex: 4,
        }}
      >
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 0.42 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
          style={{
            width: "100%",
            maxWidth: "500px",
            height: "1px",
            background: "#D4A017",
            marginBottom: "clamp(10px, 1.4vw, 18px)",
            transformOrigin: "left",
          }}
        />

        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(14px, 1.6vw, 20px)",
            color: "#FFFFFF",
            fontWeight: 700,
            margin: "0 0 clamp(5px, 0.7vw, 9px)",
            lineHeight: 1.3,
          }}
        >
          Tu página web profesional · gratis
        </p>

        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(10px, 1.1vw, 13px)",
            color: "rgba(212,160,23,0.85)",
            fontWeight: 600,
            margin: "0 0 clamp(16px, 2.2vw, 26px)",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          ⚡ Edición limitada — solo 5 cupos disponibles
        </p>

        <motion.button
          onClick={handleCTA}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          animate={{
            boxShadow: [
              "0 0 24px rgba(212,160,23,0.4), 0 0 60px rgba(212,160,23,0.12)",
              "0 0 40px rgba(212,160,23,0.65), 0 0 80px rgba(212,160,23,0.22)",
              "0 0 24px rgba(212,160,23,0.4), 0 0 60px rgba(212,160,23,0.12)",
            ],
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "clamp(8px, 0.9vw, 12px)",
            padding: "clamp(11px, 1.4vw, 16px) clamp(22px, 2.8vw, 36px)",
            background: "linear-gradient(135deg, #C8960F 0%, #F5C842 50%, #D4A017 100%)",
            border: "none",
            borderRadius: "100px",
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(11px, 1.2vw, 15px)",
            fontWeight: 800,
            color: "#080818",
            cursor: "pointer",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
          }}
        >
          Quiero la mía gratis
          <span style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "clamp(20px, 2.2vw, 26px)",
            height: "clamp(20px, 2.2vw, 26px)",
            borderRadius: "50%",
            background: "rgba(8,8,24,0.18)",
            fontSize: "clamp(10px, 1.1vw, 14px)",
            fontWeight: 900,
          }}>
            →
          </span>
        </motion.button>

        <div style={{ marginTop: "22px" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(5px, 0.55vw, 7px)", marginBottom: "clamp(8px, 1vw, 12px)" }}>
            {PILLS.map((tag) => (
              <span
                key={tag}
                style={{
                  border: "1px solid rgba(255,255,255,0.15)",
                  background: "rgba(255,255,255,0.05)",
                  borderRadius: "100px",
                  padding: "clamp(3px, 0.45vw, 6px) clamp(9px, 1.1vw, 14px)",
                  fontSize: "clamp(8px, 0.85vw, 11px)",
                  color: "rgba(255,255,255,0.68)",
                  fontFamily: "var(--font-sans)",
                  whiteSpace: "nowrap",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(10px, 1.1vw, 14px)", color: "#D4A017", fontWeight: 600, letterSpacing: "0.1em", margin: 0 }}>
            mindacode.com
          </p>
        </div>
      </motion.div>

    </section>
  );
}
