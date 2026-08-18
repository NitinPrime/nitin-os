import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://nitin.os";
  return [
    { url: base, lastModified: new Date() },
    { url: `${base}/resume`, lastModified: new Date() },
    { url: `${base}/work/autonomous-indoor-drone`, lastModified: new Date() },
    { url: `${base}/work/chiefpulse`, lastModified: new Date() },
    { url: `${base}/work/ai-resume-analyzer`, lastModified: new Date() },
    { url: `${base}/work/url-shortener`, lastModified: new Date() },
  ];
}
