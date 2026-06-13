/**
 * Localized URL slugs for each on-page section.
 *
 * The site is a single page, but each section is reachable through a clean,
 * Spanish URL (e.g. mindacode.com/servicios) for SEO and shareability.
 * The URL is kept in sync with the section the visitor is currently viewing.
 */

export type SectionId = "services" | "portfolio" | "process" | "about" | "contact";

export const SECTION_TO_SLUG: Record<SectionId, string> = {
  services: "servicios",
  portfolio: "proyecto",
  process: "proceso",
  about: "nosotros",
  contact: "contacto",
};

export const SLUG_TO_SECTION: Record<string, SectionId> = Object.fromEntries(
  (Object.entries(SECTION_TO_SLUG) as [SectionId, string][]).map(
    ([section, slug]) => [slug, section]
  )
) as Record<string, SectionId>;

export const SECTION_SLUGS = Object.values(SECTION_TO_SLUG);

/** Returns the clean path for a section id ("/servicios"), or "/" for home/hero. */
export function pathForSection(sectionId: string): string {
  const slug = SECTION_TO_SLUG[sectionId as SectionId];
  return slug ? `/${slug}` : "/";
}

/**
 * Reflects the current section into the address bar without reloading or
 * adding history noise. Uses replaceState so the back button still returns
 * to wherever the visitor came from.
 *
 * Only acts on mapped sections and the hero ("/"); any other id is ignored
 * so transient targets (e.g. the promo banner) don't rewrite the URL.
 */
export function syncUrlToSection(sectionId: string): void {
  if (typeof window === "undefined") return;
  const isHome = sectionId === "hero" || sectionId === "top";
  if (!isHome && !(sectionId in SECTION_TO_SLUG)) return;
  const path = pathForSection(sectionId);
  if (window.location.pathname !== path) {
    window.history.replaceState(window.history.state, "", path);
  }
}
