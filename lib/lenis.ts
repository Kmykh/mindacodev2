"use client";

import Lenis from "lenis";

/**
 * Singleton Lenis instance. Stored on window so any module can access
 * it after the provider mounts (e.g. smoothScrollTo in lib/utils.ts).
 */
declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export function getLenis(): Lenis | undefined {
  if (typeof window === "undefined") return undefined;
  return window.__lenis;
}

export function setLenis(instance: Lenis | undefined): void {
  if (typeof window === "undefined") return;
  window.__lenis = instance;
}
