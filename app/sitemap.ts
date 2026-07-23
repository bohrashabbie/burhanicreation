import { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";
import { locales } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/services", "/projects", "/contact"];

  return locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${siteConfig.url}/${locale}${route}`,
      lastModified: new Date().toISOString(),
      changeFrequency: route === "" ? "weekly" : ("monthly" as const),
      priority: route === "" ? 1.0 : 0.8,
    }))
  );
}
