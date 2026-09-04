import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Elevated Everyday Living — Beautiful ideas for everyday life",
  description: "Beautiful ideas, practical solutions and smart finds for the way you actually live. Curated home, organization, and lifestyle finds.",
  openGraph: {
    title: "Elevated Everyday Living",
    description: "Beautiful ideas, practical solutions and smart finds for the way you actually live.",
    type: "website",
  },
};

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-brand-50 to-white py-24 px-6 text-center">
        <h1 className="text-5xl md:text-6xl font-serif font-bold text-brand-900 mb-6 leading-tight max-w-3xl mx-auto">
          Make everyday life a little better.
        </h1>
        <p className="text-xl text-brand-700 max-w-2xl mx-auto mb-12 leading-relaxed">
          Beautiful ideas, practical solutions and smart finds for the way you actually live.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/products"
            className="px-8 py-3 bg-brand-800 text-white rounded-md font-medium hover:bg-brand-900 transition-colors text-base"
          >
            Discover Finds
          </Link>
          <Link
            href="/how-we-choose"
            className="px-8 py-3 bg-white text-brand-900 border border-brand-200 rounded-md font-medium hover:bg-brand-50 transition-colors text-base"
          >
            How We Choose
          </Link>
        </div>
      </section>

      {/* Category Grid */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-serif font-bold text-brand-900 mb-8 text-center">Explore by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { label: "Home & Spaces", slug: "home-spaces", emoji: "🏡" },
            { label: "Organization", slug: "organization", emoji: "📦" },
            { label: "Everyday Rituals", slug: "rituals", emoji: "☕" },
            { label: "Better Living", slug: "better-living", emoji: "🌿" },
            { label: "Smart Finds", slug: "finds", emoji: "✨" },
            { label: "Ideas & Guides", slug: "ideas", emoji: "💡" },
          ].map((cat) => (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}`}
              className="group flex flex-col items-center justify-center p-6 bg-white border border-brand-200 rounded-lg hover:border-brand-400 hover:shadow-soft transition-all text-center"
            >
              <span className="text-3xl mb-3">{cat.emoji}</span>
              <span className="font-medium text-brand-900 group-hover:text-brand-700 text-sm">{cat.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Smart Finds CTA */}
      <section className="bg-brand-900 text-white py-16 px-6 text-center">
        <h2 className="text-3xl font-serif font-bold mb-4">Smart Finds, Carefully Chosen</h2>
        <p className="text-brand-200 max-w-xl mx-auto mb-8">
          Every product we feature is checked for safety, seller reliability, and real value — never just affiliate commission.
        </p>
        <Link
          href="/products"
          className="inline-block px-8 py-3 bg-white text-brand-900 rounded-md font-medium hover:bg-brand-50 transition-colors"
        >
          Browse All Finds →
        </Link>
      </section>
    </>
  );
}
