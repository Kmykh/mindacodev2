"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Flame, ArrowRight, X, Clock } from "lucide-react";
import { useT } from "@/lib/i18n";

const OFFER_HOURS = 2;
// Shared with <TimeLimitedOffer />. Key suffix bumped (v2h) so any client
// that still has the legacy 72h expiry stored resets cleanly to the 2h window.
const STORAGE_EXPIRY = "mc_offer_expiry_v2h";
const STORAGE_DISMISS = "mc_offer_bar_dismissed";

function formatSegment(n: number) {
  return String(n).padStart(2, "0");
}

export function OfferBar() {
  const { t } = useT();
  const [visible, setVisible] = useState(false);
  const [time, setTime] = useState({ h: 0, m: 0, s: 0 });

  useEffect(() => {
    // Respect dismissal for the session
    if (typeof window === "undefined") return;
    const dismissed = sessionStorage.getItem(STORAGE_DISMISS);
    if (dismissed === "1") {
      document.documentElement.style.setProperty("--offer-bar-h", "0px");
      setVisible(false);
      return;
    }
    setVisible(true);

    // Countdown (shared with TimeLimitedOffer via same key)
    const stored = localStorage.getItem(STORAGE_EXPIRY);
    let expiry: number;
    if (stored && !isNaN(parseInt(stored, 10))) {
      expiry = parseInt(stored, 10);
    } else {
      expiry = Date.now() + OFFER_HOURS * 3_600_000;
      localStorage.setItem(STORAGE_EXPIRY, expiry.toString());
    }

    const tick = () => {
      const diff = expiry - Date.now();
      if (diff <= 0) {
        const next = Date.now() + OFFER_HOURS * 3_600_000;
        localStorage.setItem(STORAGE_EXPIRY, next.toString());
        expiry = next;
        setTime({ h: OFFER_HOURS - 1, m: 59, s: 59 });
        return;
      }
      setTime({
        h: Math.floor(diff / 3_600_000),
        m: Math.floor((diff % 3_600_000) / 60_000),
        s: Math.floor((diff % 60_000) / 1_000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // Sync CSS var with visibility so the header can offset itself.
  useEffect(() => {
    const root = document.documentElement;
    if (visible) {
      // Values must match the bar heights in the markup.
      root.style.setProperty("--offer-bar-h", "40px");
      // On mobile we use 44px for touch targets.
      const mq = window.matchMedia("(max-width: 640px)");
      const apply = () => root.style.setProperty("--offer-bar-h", mq.matches ? "44px" : "40px");
      apply();
      mq.addEventListener("change", apply);
      return () => mq.removeEventListener("change", apply);
    }
    root.style.setProperty("--offer-bar-h", "0px");
  }, [visible]);

  const handleCTA = () => {
    window.dispatchEvent(new Event("mc:offer-open"));
  };

  const handleDismiss = () => {
    sessionStorage.setItem(STORAGE_DISMISS, "1");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          role="region"
          aria-label={t("offerBar.aria")}
          className="fixed inset-x-0 top-0 z-[70] overflow-hidden border-b border-amber-500/25 bg-gradient-to-r from-amber-600/95 via-amber-500/95 to-orange-600/95 text-black shadow-[0_4px_24px_-8px_rgba(255,170,40,0.55)] backdrop-blur-md"
          style={{ height: "var(--offer-bar-h, 40px)" }}
        >
          {/* Animated shimmer stripe */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent"
            style={{ animation: "shimmerLine 4s ease-in-out infinite" }}
          />

          <div className="relative mx-auto flex h-full w-full max-w-7xl items-center justify-between gap-3 px-3 sm:px-6">
            {/* Left: flame + message (hidden on very small screens) */}
            <div className="hidden min-w-0 items-center gap-2 sm:flex">
              <Flame className="h-4 w-4 animate-pulse" aria-hidden />
              <p className="truncate text-[12px] font-bold uppercase tracking-wider sm:text-[13px]">
                {t("offerBar.message")}{" "}
                <span className="font-black">{t("offerBar.bold")}</span>
              </p>
            </div>

            {/* Mobile compact label */}
            <div className="flex items-center gap-1.5 sm:hidden">
              <Flame className="h-3.5 w-3.5 animate-pulse" aria-hidden />
              <span className="text-[11px] font-black uppercase tracking-wider">
                {t("offerBar.mobile")}
              </span>
            </div>

            {/* Center: countdown */}
            <div
              className="flex items-center gap-1 font-mono text-[12px] font-black tabular-nums sm:text-[13px]"
              aria-live="polite"
              aria-atomic="true"
            >
              <Clock className="mr-0.5 hidden h-3.5 w-3.5 sm:block" aria-hidden />
              <span className="rounded bg-black/15 px-1.5 py-0.5">{formatSegment(time.h)}</span>
              <span>:</span>
              <span className="rounded bg-black/15 px-1.5 py-0.5">{formatSegment(time.m)}</span>
              <span>:</span>
              <span className="rounded bg-black/15 px-1.5 py-0.5">{formatSegment(time.s)}</span>
            </div>

            {/* Right: CTA + dismiss */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={handleCTA}
                className="group inline-flex items-center gap-1 rounded-full bg-black px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-amber-300 shadow-lg transition-transform hover:scale-[1.03] active:scale-[0.97] sm:px-4 sm:py-1.5 sm:text-[12px]"
              >
                {t("offerBar.cta")}
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 sm:h-3.5 sm:w-3.5" />
              </button>
              <button
                onClick={handleDismiss}
                aria-label={t("offerBar.dismiss")}
                className="rounded-full p-1 text-black/70 transition hover:bg-black/10 hover:text-black"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
