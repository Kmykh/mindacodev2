import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://mindacode.com";
  const now = new Date();
  const sections = [
    "",
    "#services",
    "#portfolio",
    "#process",
    "#testimonials",
    "#about",
    "#contact"
  ];

  return sections.map((section) => ({
    url: `${baseUrl}/${section}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: section === "" ? 1 : 0.7
  }));
}
