import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: "https://munali.com.np", changeFrequency: "monthly", priority: 1 }];
}
