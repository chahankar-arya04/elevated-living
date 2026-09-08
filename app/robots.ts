import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://elevatedeverydayliving.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/go/",           // Internal affiliate redirects — not indexable
          "/api/",          // API routes
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
