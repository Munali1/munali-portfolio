import type { MetadataRoute } from "next";

const SITE_URL = "https://munali.com.np";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/Munali_Shakya-CV.pdf`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  ];
}
