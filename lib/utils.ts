import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { getLenis } from "./lenis";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Smoothly scrolls to the top of the page or to the element matching `id`.
 * Accounts for a fixed header offset (default 100px) except when targeting "hero".
 * Uses Lenis when available (falls back to native smooth scroll on SSR / before Lenis mounts).
 */
export function smoothScrollTo(id: string, offset: number = 100): void {
  if (typeof window === "undefined") return;
  const lenis = getLenis();

  if (!id || id === "hero" || id === "top") {
    if (lenis) {
      lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    return;
  }
  const el = document.getElementById(id);
  if (!el) return;

  if (lenis) {
    lenis.scrollTo(el, { offset: -offset });
    return;
  }
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: "smooth" });
}
