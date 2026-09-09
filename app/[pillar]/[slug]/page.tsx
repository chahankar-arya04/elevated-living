import { getArticleBySlug, getRelatedArticles, getAllArticles } from "@/lib/content";
import { getPublishableProducts } from "@/lib/data";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { PILLAR_META } from "../page";

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((a) => ({ pillar: a.pillar, slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { pillar: string; slug: string };
}): Promise<Metadata> {
  const article = getArticleBySlug(params.slug);
  if (!article) return {};

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://elevatedeverydayliving.com";
  const canonical = `${baseUrl}/${params.pillar}/${params.slug}`;

  return {
    title: article.metaTitle || article.title,
    description: article.metaDescription || article.description,
    keywords: [
      article.primaryKeyword,
      ...(article.secondaryKeywords ?? []),
      ...(article.tags ?? []),
    ].filter(Boolean) as string[],
    alternates: { canonical },
    openGraph: {
      title: article.pinterestTitle || article.title,
      description: article.pinterestDescription || article.description,
      type: "article",
      url: canonical,
      images: article.socialImage ? [{ url: article.socialImage }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: article.pinterestTitle || article.title,
      description: article.pinterestDescription || article.description,
    },
  };
}

export default function ArticlePage({
  params,
}: {
  params: { pillar: string; slug: string };
}) {
  const article = getArticleBySlug(params.slug);

  if (!article || article.pillar !== params.pillar) {
    notFound();
  }

  const related = getRelatedArticles(article, 4);
  const pillarMeta = PILLAR_META[params.pillar];

  const allProducts = getPublishableProducts();
  const articleTags = new Set([
    ...(article.tags ?? []).map((t) => t.toLowerCase()),
    article.category.toLowerCase(),
  ]);
  const relevantProducts = allProducts
    .filter(
      (p) =>
        p.tags?.some((t) => articleTags.has(t.toLowerCase())) ||
        articleTags.has((p.category ?? "").toLowerCase())
    )
    .slice(0, 4);

  const formattedDate = new Date(article.date).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
      {/* Breadcrumb */}
      <nav className="text-xs text-brand-500 mb-6 flex items-center gap-1 flex-wrap">
        <Link href="/" className="hover:text-brand-700">Home</Link>
        <span>&rsaquo;</span>
        <Link href={`/${params.pillar}`} className="hover:text-brand-700 capitalize">
          {pillarMeta?.label ?? params.pillar}
        </Link>
        <span>&rsaquo;</span>
        <span className="text-brand-800 font-medium truncate max-w-[200px]">{article.title}</span>
      </nav>

      {/* Header */}
      <header className="mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="inline-block text-xs font-semibold text-brand-500 uppercase tracking-wider bg-brand-100 px-2.5 py-1 rounded-full">
            {article.category}
          </span>
          {article.tags?.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="inline-block text-xs text-brand-500 bg-brand-50 border border-brand-200 px-2 py-0.5 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>

        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-brand-900 leading-tight mb-4">
          {article.title}
        </h1>
        <p className="text-lg text-brand-700 leading-relaxed mb-6">{article.description}</p>

        <div className="flex items-center gap-3 text-sm text-brand-500 flex-wrap">
          <span>By {article.author}</span>
          <span>&middot;</span>
          <time dateTime={article.date}>{formattedDate}</time>
          {article.lastUpdated && (
            <>
              <span>&middot;</span>
              <span>
                Updated{" "}
                {new Date(article.lastUpdated).toLocaleDateString("en-IN", {
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </>
          )}
        </div>
      </header>

      {/* Hero image */}
      {article.heroImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={article.heroImage}
          alt={article.heroImageAlt ?? article.title}
          className="w-full rounded-xl mb-8 aspect-video object-cover"
        />
      ) : (
        <div className="w-full rounded-xl mb-8 aspect-video bg-brand-100 flex items-center justify-center text-brand-400 text-sm">
          {article.category}
        </div>
      )}

      {/* Affiliate disclosure */}
      <div className="text-xs text-brand-500 bg-brand-50 border border-brand-200 rounded-md px-4 py-2.5 mb-8">
        <strong>Disclosure:</strong> This article may contain affiliate links. If you make a
        purchase through our links, we may earn a small commission at no extra cost to you.{" "}
        <Link href="/affiliate-disclosure" className="underline hover:text-brand-700">
          Learn more.
        </Link>
      </div>

      {/* Article content */}
      <div
        className="prose prose-brand max-w-none text-brand-800 prose-headings:font-serif prose-headings:text-brand-900 prose-a:text-brand-700 prose-a:underline prose-strong:text-brand-900"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />

      {/* Product recommendations */}
      {relevantProducts.length > 0 && (
        <section className="mt-12 pt-10 border-t border-brand-200">
          <h2 className="text-2xl font-serif font-bold text-brand-900 mb-2">
            Products That Can Help
          </h2>
          <p className="text-sm text-brand-600 mb-6">
            Carefully selected finds relevant to this guide. We only list products that pass our
            safety and quality review.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relevantProducts.map((product) => (
              <div
                key={product.id}
                className="flex flex-col bg-white border border-brand-200 rounded-xl p-4 hover:shadow-soft transition-shadow"
              >
                <div className="text-xs font-semibold text-brand-500 uppercase tracking-wide mb-1">
                  {product.category}
                </div>
                <h3 className="font-serif font-bold text-brand-900 text-sm mb-1 leading-snug">
                  {product.name}
                </h3>
                <p className="text-xs text-brand-600 mb-3 flex-grow line-clamp-2">
                  {product.shortDescription}
                </p>
                <div className="flex items-center justify-between mt-auto gap-2">
                  <div className="text-sm font-bold text-brand-900">
                    {product.price.current > 0
                      ? `${product.price.currency === "INR" ? "Rs." : "$"}${product.price.current.toLocaleString()}`
                      : "Check Price"}
                  </div>
                  <Link
                    href={`/go/${product.slug}`}
                    target="_blank"
                    rel="nofollow sponsored noopener"
                    className="inline-flex items-center justify-center text-xs font-medium bg-brand-800 text-white hover:bg-brand-900 px-3 py-1.5 rounded-md transition-colors"
                  >
                    Check Product
                  </Link>
                </div>
                <Link
                  href={`/products/${product.slug}`}
                  className="text-xs text-brand-500 hover:text-brand-700 mt-2 hover:underline"
                >
                  Full details &amp; verification
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Related articles */}
      {related.length > 0 && (
        <section className="mt-12 pt-10 border-t border-brand-200">
          <h2 className="text-2xl font-serif font-bold text-brand-900 mb-6">Related Guides</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {related.map((rel) => (
              <Link
                key={rel.slug}
                href={`/${rel.pillar}/${rel.slug}`}
                className="group flex items-start gap-3 p-4 bg-brand-50 rounded-lg border border-brand-200 hover:border-brand-400 hover:bg-white transition-all"
              >
                <span className="text-brand-400 mt-0.5">&rarr;</span>
                <div>
                  <span className="text-xs font-semibold text-brand-500 uppercase tracking-wide">
                    {rel.category}
                  </span>
                  <p className="text-sm font-medium text-brand-900 group-hover:text-brand-700 leading-snug mt-0.5">
                    {rel.title}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Footer CTA */}
      <div className="mt-12 pt-10 border-t border-brand-200 text-center">
        <p className="text-sm text-brand-600 mb-4">Found this helpful? Explore more guides:</p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            href="/skin"
            className="px-4 py-2 bg-rose-50 text-rose-800 border border-rose-200 rounded-full text-xs font-medium hover:bg-rose-100 transition-colors"
          >
            Skincare
          </Link>
          <Link
            href="/hair"
            className="px-4 py-2 bg-amber-50 text-amber-800 border border-amber-200 rounded-full text-xs font-medium hover:bg-amber-100 transition-colors"
          >
            Haircare
          </Link>
          <Link
            href="/travel"
            className="px-4 py-2 bg-sky-50 text-sky-800 border border-sky-200 rounded-full text-xs font-medium hover:bg-sky-100 transition-colors"
          >
            Travel
          </Link>
          <Link
            href="/trending"
            className="px-4 py-2 bg-orange-50 text-orange-800 border border-orange-200 rounded-full text-xs font-medium hover:bg-orange-100 transition-colors"
          >
            Trending
          </Link>
        </div>
      </div>
    </article>
  );
}
