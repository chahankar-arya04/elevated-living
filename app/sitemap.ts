import { MetadataRoute } from "next";
import { getPublishableProducts } from "@/lib/data";
import { getAllArticles } from "@/lib/content";

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://elevatedeverydayliving.com";

const PILLARS = ["skin", "hair", "trending", "useful-finds", "style", "travel"];

export default function sitemap(): MetadataRoute.Sitemap {
  const products = getPublishableProducts();
  const articles = getAllArticles();

  const productUrls = products.map((product) => ({
    url: `${baseUrl}/products/item/${product.slug}`,,
    lastModified: new Date(product.lastVerified),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const articleUrls = articles.map((article) => ({
    url: `${baseUrl}/${article.pillar}/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: "weekly" as const,
    priority: 0.75,
  }));

  const pillarUrls = PILLARS.map((pillar) => ({
    url: `${baseUrl}/${pillar}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${baseUrl}/products`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/how-we-choose`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.5 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.4 },
    { url: `${baseUrl}/affiliate-disclosure`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.4 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    // /go/* intentionally excluded (affiliate redirects should not be indexed)
    ...pillarUrls,
    ...productUrls,
    ...articleUrls,
  ];
}
