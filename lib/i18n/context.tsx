"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { type Locale, getDictionary } from "./dictionaries";

/* ── Spanish-speaking country codes ── */
const SPANISH_COUNTRIES = new Set([
  "AR","BO","CL","CO","CR","CU","DO","EC","SV","GQ",
  "GT","HN","MX","NI","PA","PY","PE","PR","ES","UY","VE",
]);

const STORAGE_KEY = "mc_locale";
const SOURCE_KEY = "mc_locale_src"; // "manual" | "auto"

type I18nCtx = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string) => string;
};

const I18nContext = createContext<I18nCtx>({
  locale: "es",
  setLocale: () => {},
  t: (k) => k,
});

export function useT() {
  return useContext(I18nContext);
}

/** Map an ISO country code to a supported locale. */
function localeForCountry(code: string): Locale {
  return SPANISH_COUNTRIES.has(code.toUpperCase()) ? "es" : "en";
}

/** Resolve a locale from the browser's preferred languages (instant, offline). */
function localeFromBrowser(): Locale | null {
  if (typeof navigator === "undefined") return null;
  const langs = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const lang of langs) {
    const lower = (lang ?? "").toLowerCase();
    if (lower.startsWith("es")) return "es";
    if (lower.startsWith("en")) return "en";
  }
  return null;
}

/**
 * Detect the visitor's country via IP geolocation and map it to a locale.
 * Tries two providers for resilience; returns null if both fail.
 */
async function detectLocaleByGeo(): Promise<Locale | null> {
  const providers: { url: string; pick: (data: any) => string | undefined }[] = [
    { url: "https://ipapi.co/json/", pick: (d) => d.country_code },
    { url: "https://ipwho.is/", pick: (d) => d.country_code },
  ];

  for (const provider of providers) {
    try {
      const res = await fetch(provider.url, { signal: AbortSignal.timeout(3000) });
      if (!res.ok) continue;
      const data = await res.json();
      const code = (provider.pick(data) ?? "").toString().toUpperCase();
      if (code) return localeForCountry(code);
    } catch {
      // try the next provider
    }
  }
  return null;
}

/**
 * Best-effort locale by location: geolocation first (what the user asked for),
 * then the browser language as a fast fallback, finally Spanish as default.
 */
async function detectLocale(): Promise<Locale> {
  const byGeo = await detectLocaleByGeo();
  if (byGeo) return byGeo;
  return localeFromBrowser() ?? "es";
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("es");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Locale | null;
    const source = localStorage.getItem(SOURCE_KEY);

    // Show the last known locale immediately to avoid a flash of the wrong language.
    if (saved === "es" || saved === "en") {
      setLocaleState(saved);
    }

    // A manual choice always wins and is never overridden by detection.
    if (source === "manual") return;

    // Otherwise (re)detect by location on each visit and refine.
    detectLocale().then((detected) => {
      setLocaleState(detected);
      localStorage.setItem(STORAGE_KEY, detected);
      localStorage.setItem(SOURCE_KEY, "auto");
    });
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    localStorage.setItem(STORAGE_KEY, l);
    localStorage.setItem(SOURCE_KEY, "manual");
  }, []);

  const dict = getDictionary(locale);
  const t = useCallback((key: string) => dict[key] ?? key, [dict]);

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}
