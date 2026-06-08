"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn, smoothScrollTo } from "@/lib/utils";

interface AnimatedLogoProps {
  className?: string;
  textClassName?: string;
}

export function AnimatedLogo({ className, textClassName }: AnimatedLogoProps) {
  const prefersReducedMotion = useReducedMotion();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    smoothScrollTo("hero");
  };

  return (
    <motion.a
      href="#hero"
      onClick={handleClick}
      className={cn(
        "group relative inline-flex items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className
      )}
      initial={prefersReducedMotion ? false : { opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={prefersReducedMotion ? undefined : { scale: 1.03 }}
      whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
      aria-label="Minda Code — ir al inicio"
    >
      <span
        className={cn("font-semibold tracking-tight", textClassName)}
        style={{ letterSpacing: "-0.02em" }}
      >
        <span style={{ color: "#ffffff" }}>minda</span>
        <span style={{ color: "#7C3AED" }}>code</span>
      </span>
    </motion.a>
  );
}
