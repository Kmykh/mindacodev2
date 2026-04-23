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

async function detectLocaleByIP(): Promise<Locale> {
  try {
    const res = await fetch("https://ipapi.co/json/", { signal: AbortSignal.timeout(3000) });
    if (!res.ok) return "es";
    const data = await res.json();
    const code: string = (data.country_code ?? "").toUpperCase();
    return SPANISH_COUNTRIES.has(code) ? "es" : "en";
  } catch {
    return "es";
  }
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("es");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (saved === "es" || saved === "en") {
      setLocaleState(saved);
      setReady(true);
      return;
    }
    // Detect by IP on first visit
    detectLocaleByIP().then((detected) => {
      setLocaleState(detected);
      localStorage.setItem(STORAGE_KEY, detected);
      setReady(true);
    });
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    localStorage.setItem(STORAGE_KEY, l);
  }, []);

  const dict = getDictionary(locale);
  const t = useCallback((key: string) => dict[key] ?? key, [dict]);

  // Render immediately with "es" while detecting — avoids flash
  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}
