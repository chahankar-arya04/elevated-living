import Link from "next/link";
import { Metadata } from "next";
import { getFeaturedArticles, getRecentArticles } from "@/lib/content";
import { Article } from "@/lib/content";

export const metadata: Metadata = {
  title: "Things Worth Knowing. Problems Worth Solving.",
  description:
    "Practical guides, beauty discoveries, problem-solving finds and destination ideas to help you make better everyday choices.",
  openGraph: {
    title: "Elevated Everyday Living",
    description:
      "Practical guides, beauty discoveries, problem-solving finds and destination ideas.",
    type: "website",
  },
};

const PILLARS = [
  {
    href: "/skin",
    label: "Skincare",
    hook: "Mistakes you didn't know you were making",
    bgClass: "from-rose-50 to-pink-50 border-rose-200",
    textColor: "text-rose-900",
  },
  {
    href: "/hair",
    label: "Haircare",
    hook: "Frizz, dryness and routine fixes",
    bgClass: "from-amber-50 to-yellow-50 border-amber-200",
    textColor: "text-amber-900",
  },
  {
    href: "/trending",
    label: "Trending",
    hook: "Why is everyone buying this?",
    bgClass: "from-orange-50 to-red-50 border-orange-200",
    textColor: "text-orange-900",
  },
  {
    href: "/useful-finds",
    label: "Useful Finds",
    hook: "Tiny products that solve big problems",
    bgClass: "from-stone-50 to-neutral-50 border-stone-200",
    textColor: "text-stone-900",
  },
  {
    href: "/style",
    label: "Style",
    hook: "Outfits for every occasion",
    bgClass: "from-purple-50 to-violet-50 border-purple-200",
    textColor: "text-purple-900",
  },
  {
    href: "/travel",
    label: "Travel",
    hook: "What to wear for every destination",
    bgClass: "from-sky-50 to-blue-50 border-sky-200",
    textColor: "text-sky-900",
  },
];

const PROBLEM_HOOKS = [
  { label: "Hair still frizzy after washing?", href: "/hair", pill: "Hair" },
  { label: "Skincare mistakes you may be making", href: "/skin", pill: "Skin" },
  { label: "Products that solve surprisingly annoying problems", href: "/useful-finds", pill: "Finds" },
  { label: "What to wear on a Manali trip in June", href: "/travel", pill: "Travel" },
  { label: "Viral beauty products — worth it or not?", href: "/trending", pill: "Trending" },
  { label: "Going somewhere? Pack smarter, not more.", href: "/travel", pill: "Travel" },
];

function ArticleCard({ article }: { article: Article }) {
  const pillarHref = `/${article.pillar}/${article.slug}`;
  return (
    <Link
      href={pillarHref}
      className="group flex flex-col bg-white border border-brand-200 rounded-xl overflow-hidden hover:shadow-soft hover:border-brand-300 transition-all"
    >
      <div className="aspect-video bg-brand-100 flex items-center justify-center text-brand-400 text-sm font-medium">
        {article.category}
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <span className="text-xs font-semibold text-brand-500 uppercase tracking-wide mb-2">
          {article.pillar.replace("-", " ")}
        </span>
        <h3 className="font-serif font-bold text-brand-900 text-base leading-snug mb-2 group-hover:text-brand-700">
          {article.title}
        </h3>
        <p className="text-sm text-brand-600 line-clamp-2 flex-grow">{article.description}</p>
        <span className="mt-3 text-xs font-medium text-brand-700 group-hover:underline">
          Read guide &rarr;
        </span>
      </div>
    </Link>
  );
}

export default function HomePage() {
  const featured = getFeaturedArticles(3);
  const recent = getRecentArticles(6);

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-brand-100 via-brand-50 to-white px-4 sm:px-6 pt-16 pb-20 text-center">
        <p className="text-xs font-semibold tracking-widest text-brand-500 uppercase mb-4">
          Discover &middot; Solve &middot; Shop
        </p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-brand-900 leading-tight max-w-3xl mx-auto mb-6">
          Things Worth Knowing.
          <br />
          <span className="text-brand-700">Problems Worth Solving.</span>
        </h1>
        <p className="text-lg text-brand-700 max-w-xl mx-auto mb-10 leading-relaxed">
          Practical guides, beauty discoveries, outfit ideas and useful finds to help you make
          better everyday choices.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            href="/skin"
            className="px-6 py-3 bg-brand-800 text-white rounded-full font-medium hover:bg-brand-900 transition-colors text-sm"
          >
            Explore Discoveries &rarr;
          </Link>
          <Link
            href="/trending"
            className="px-6 py-3 bg-white text-brand-900 border border-brand-300 rounded-full font-medium hover:bg-brand-50 transition-colors text-sm"
          >
            See What&apos;s Trending
          </Link>
        </div>
      </section>

      {/* Pillar Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <h2 className="text-2xl font-serif font-bold text-brand-900 mb-2">Explore</h2>
        <p className="text-brand-600 text-sm mb-8">Pick a topic that matters to you right now.</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {PILLARS.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className={`group flex flex-col items-center text-center p-4 rounded-xl border bg-gradient-to-b ${p.bgClass} hover:shadow-soft transition-all`}
            >
              <span className={`font-semibold text-sm ${p.textColor}`}>{p.label}</span>
              <span className="text-xs text-brand-500 mt-1 leading-tight hidden sm:block">
                {p.hook}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Solve This */}
      <section className="bg-white border-y border-brand-100 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-serif font-bold text-brand-900 mb-2">Solve This</h2>
          <p className="text-brand-600 text-sm mb-8">Real problems with practical answers.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PROBLEM_HOOKS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="group flex items-start gap-3 p-4 bg-brand-50 rounded-lg border border-brand-200 hover:border-brand-400 hover:bg-white transition-all"
              >
                <span className="mt-0.5 text-brand-400">&rarr;</span>
                <div>
                  <span className="inline-block text-xs font-semibold text-brand-500 uppercase tracking-wide mb-1">
                    {item.pill}
                  </span>
                  <p className="text-brand-900 font-medium text-sm leading-snug group-hover:text-brand-700">
                    {item.label}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured articles */}
      {featured.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
          <h2 className="text-2xl font-serif font-bold text-brand-900 mb-2">Featured Guides</h2>
          <p className="text-brand-600 text-sm mb-8">Handpicked for you.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </section>
      )}

      {/* Travel teaser */}
      <section className="bg-gradient-to-r from-sky-50 to-blue-50 border-y border-sky-100 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <span className="text-xs font-semibold tracking-widest text-sky-600 uppercase">
                Travel &amp; Style
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-sky-900 mt-2 mb-3">
                What To Wear For Your Next Trip
              </h2>
              <p className="text-sky-800 text-sm leading-relaxed max-w-lg">
                From Manali in June to Goa in winter — destination-specific outfit guides that tell
                you exactly what to pack.
              </p>
            </div>
            <div className="shrink-0">
              <Link
                href="/travel"
                className="inline-block px-6 py-3 bg-sky-800 text-white rounded-full font-medium hover:bg-sky-900 transition-colors text-sm"
              >
                Explore Destinations &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Recent content */}
      {recent.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
          <h2 className="text-2xl font-serif font-bold text-brand-900 mb-2">Recently Added</h2>
          <p className="text-brand-600 text-sm mb-8">New guides and discoveries.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recent.slice(0, 6).map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/products"
              className="inline-block text-sm font-medium text-brand-700 hover:text-brand-900 underline underline-offset-4"
            >
              Browse all finds &rarr;
            </Link>
          </div>
        </section>
      )}

      {/* Pinterest CTA */}
      <section className="bg-brand-950 text-white py-14 px-4 sm:px-6 text-center">
        <p className="text-xs font-semibold tracking-widest text-brand-400 uppercase mb-3">
          Pinterest-First
        </p>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-4">
          Found us on Pinterest?
        </h2>
        <p className="text-brand-300 max-w-md mx-auto text-sm leading-relaxed mb-8">
          Every guide here is designed to answer exactly what the pin promised. No fluff. No
          bait-and-switch.
        </p>
        <Link
          href="/how-we-choose"
          className="inline-block px-6 py-3 border border-brand-400 text-brand-200 rounded-full text-sm font-medium hover:bg-brand-900 transition-colors"
        >
          How We Choose &rarr;
        </Link>
      </section>
    </>
  );
}
