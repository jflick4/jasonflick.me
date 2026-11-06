import type { MetadataRoute } from "next";
import site from "../../content/site.json";
import { getProjects, getEssays } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const fixed = ["", "/wonder", "/experiment", "/all-of-it", "/all-of-it/media", "/about", "/press", "/now", "/contact"];
  return [
    ...fixed.map((p) => ({ url: `${base}${p}`, changeFrequency: "weekly" as const, priority: p === "" ? 1 : 0.7 })),
    ...getProjects().map((p) => ({ url: `${base}/experiment/${p.meta.slug}`, changeFrequency: "monthly" as const, priority: 0.6 })),
    ...getEssays().map((e) => ({ url: `${base}/wonder/${e.meta.slug}`, changeFrequency: "monthly" as const, priority: 0.6 })),
  ];
}
