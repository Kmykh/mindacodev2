"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

export function SpotlightCursor() {
  const prefersReducedMotion = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 30, stiffness: 200, mass: 0.5 };
  const spotlightX = useSpring(cursorX, springConfig);
  const spotlightY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Avoid mounting a mousemove listener on touch devices or when the user prefers reduced motion.
    const mq = window.matchMedia("(min-width: 768px) and (hover: hover)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!isDesktop || prefersReducedMotion) return;
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cursorX, cursorY, isDesktop, prefersReducedMotion]);

  if (!isDesktop || prefersReducedMotion) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[1] hidden md:block" aria-hidden="true">
      <motion.div
        className="absolute h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          left: spotlightX,
          top: spotlightY,
          background: "radial-gradient(circle, rgba(123, 91, 255, 0.06) 0%, rgba(123, 91, 255, 0.02) 40%, transparent 70%)",
        }}
      />
    </div>
  );
}
