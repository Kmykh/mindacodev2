"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function PageLoader({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = "";
    }, 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.55, ease: "easeInOut" } }}
            style={{
              position: "fixed", inset: 0, zIndex: 9999,
              background: "#07071a",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexDirection: "column", gap: "28px",
            }}
          >
            {/* Purple glow behind logo */}
            <div style={{
              position: "absolute", width: "320px", height: "320px", borderRadius: "50%",
              background: "radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 70%)",
              pointerEvents: "none",
            }} />

            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: "flex", alignItems: "baseline", gap: "0px", position: "relative" }}
            >
              <span style={{
                fontFamily: "var(--font-sans)", fontWeight: 900, fontSize: "42px",
                color: "#ffffff", letterSpacing: "-2px", lineHeight: 1,
              }}>
                MINDA
              </span>
              <span style={{
                fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "42px",
                color: "#7C3AED", letterSpacing: "-2px", lineHeight: 1,
              }}>
                CODE
              </span>
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.45 }}
              style={{
                fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "12px",
                color: "rgba(255,255,255,0.28)", letterSpacing: "3px",
                textTransform: "uppercase", margin: 0, position: "relative",
              }}
            >
              Lima, Perú
            </motion.p>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              style={{
                width: "100px", height: "1px",
                background: "rgba(124,58,237,0.2)", borderRadius: "2px",
                overflow: "hidden", position: "relative",
              }}
            >
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, delay: 0.35, ease: [0.4, 0, 0.2, 1] }}
                style={{ height: "100%", background: "#7C3AED", borderRadius: "2px" }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page content — fades in after loader exits */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </>
  );
}
