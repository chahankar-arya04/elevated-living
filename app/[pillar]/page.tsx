import { getArticlesByPillar } from "@/lib/content";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";

export const PILLAR_META: Record<
  string,
  { label: string; description: string; seoTitle: string; bgClass: string }
> = {
  skin: {
    label: "Skincare",
    description:
      "Skincare routines, common mistakes, product comparisons and everything you need to know about building a routine that actually works for your skin.",
    seoTitle: "Skincare Guides, Tips & Product Finds",
    bgClass: "from-rose-50 to-pink-50",
  },
  hair: {
    label: "Haircare",
    description:
      "From frizz to dry scalp — haircare guides, routine tips, tool reviews and practical fixes for real hair problems.",
    seoTitle: "Haircare Guides, Routine Tips & Finds",
    bgClass: "from-amber-50 to-yellow-50",
  },
  trending: {
    label: "Trending",
    description:
      "Products everyone is talking about — but only the ones that are actually worth it. Honest takes on viral beauty, home and lifestyle products.",
    seoTitle: "Trending Products — Honest Takes",
    bgClass: "from-orange-50 to-red-50",
  },
  "useful-finds": {
    label: "Useful Finds",
    description:
      "Small tools and products that solve surprisingly annoying everyday problems. From organisation to beauty to travel — if it genuinely helps, it is here.",
    seoTitle: "Useful Finds — Products That Solve Real Problems",
    bgClass: "from-stone-50 to-neutral-50",
  },
  style: {
    label: "Style",
    description:
      "Outfit ideas, capsule wardrobes and style guides for every occasion — from casual everyday looks to event-specific dressing.",
    seoTitle: "Style Guides & Outfit Ideas",
    bgClass: "from-purple-50 to-violet-50",
  },
  travel: {
    label: "Travel",
    description:
      "Destination outfit guides, packing lists and travel-style content. What to wear in Manali, Goa, Dubai, Kashmir and more.",
    seoTitle: "Travel Outfit Guides & Packing Lists",
    bgClass: "from-sky-50 to-blue-50",
  },
};

export async function generateStaticParams() {
  return Object.keys(PILLAR_META).map((slug) => ({ pillar: slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { pillar: string };
}): Promise<Metadata> {
  const meta = PILLAR_META[params.pillar];
  if (!meta) return {};
  return {
    title: meta.seoTitle,
    description: meta.description,
  };
}

export default function PillarIndexPage({ params }: { params: { pillar: string } }) {
  const meta = PILLAR_META[params.pillar];
  if (!meta) notFound();

  const articles = getArticlesByPillar(params.pillar);

  return (
    <div className={`bg-gradient-to-b ${meta.bgClass} to-white min-h-screen`}>
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-10">
        <nav className="text-xs text-brand-500 mb-4">
          <Link href="/" className="hover:text-brand-700">
            Home
          </Link>{" "}
          &rsaquo;{" "}
          <span className="text-brand-800 font-medium">{meta.label}</span>
        </nav>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-brand-900 mb-4">
          {meta.label}
        </h1>
        <p className="text-brand-700 max-w-2xl leading-relaxed">{meta.description}</p>
      </div>

      {/* Articles */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        {articles.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl border border-brand-200">
            <p className="text-brand-600 font-medium mb-2">Guides coming soon.</p>
            <p className="text-sm text-brand-500">
              We are researching and writing content for this section. Check back soon, or{" "}
              <Link href="/products" className="underline hover:text-brand-700">
                browse all finds
              </Link>
              .
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/${params.pillar}/${article.slug}`}
                className="group flex flex-col bg-white border border-brand-200 rounded-xl overflow-hidden hover:shadow-soft hover:border-brand-300 transition-all"
              >
                <div className="aspect-video bg-brand-100 flex items-center justify-center text-brand-400 text-sm font-medium">
                  {article.category}
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <span className="text-xs font-semibold text-brand-500 uppercase tracking-wide mb-2">
                    {article.category}
                  </span>
                  <h2 className="font-serif font-bold text-brand-900 text-base leading-snug mb-2 group-hover:text-brand-700">
                    {article.title}
                  </h2>
                  <p className="text-sm text-brand-600 line-clamp-2 flex-grow">
                    {article.description}
                  </p>
                  <span className="mt-3 text-xs font-medium text-brand-700 group-hover:underline">
                    Read guide &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
