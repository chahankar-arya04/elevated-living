import { MetadataRoute } from "next";
import { getPublishableProducts } from "@/lib/data";
import { getAllArticles } from "@/lib/content";

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://elevatedeverydayliving.com";

const CATEGORY_SLUGS = [
  "home-spaces",
  "organization",
  "rituals",
  "better-living",
  "finds",
  "ideas",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const products = getPublishableProducts();
  const articles = getAllArticles();

  const productUrls = products.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: new Date(product.lastVerified),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const articleUrls = articles.map((article) => ({
    url: `${baseUrl}/blog/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const categoryUrls = CATEGORY_SLUGS.map((slug) => ({
    url: `${baseUrl}/categories/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${baseUrl}/products`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/how-we-choose`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.5 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.4 },
    { url: `${baseUrl}/affiliate-disclosure`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.4 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    // /go/* and /contact intentionally excluded from sitemap
    ...categoryUrls,
    ...productUrls,
    ...articleUrls,
  ];
}
