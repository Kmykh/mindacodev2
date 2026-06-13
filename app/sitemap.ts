import type { MetadataRoute } from "next";
import { SECTION_SLUGS } from "@/lib/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://mindacode.com";
  const now = new Date();

  const home: MetadataRoute.Sitemap[number] = {
    url: baseUrl,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 1
  };

  const sections: MetadataRoute.Sitemap = SECTION_SLUGS.map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8
  }));

  return [home, ...sections];
}
