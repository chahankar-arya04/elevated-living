import { getPublishableProducts } from "@/lib/data";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/product/ProductCard";
import { Metadata } from "next";

// Category definitions — the source of truth for valid category slugs
const CATEGORIES: Record<string, { label: string; description: string }> = {
  "home-spaces": {
    label: "Home & Spaces",
    description: "Curated ideas and finds for every room — from small bedrooms to reading corners and home cafés.",
  },
  organization: {
    label: "Organization",
    description: "Storage solutions, desk organizers, drawer dividers, and systems that keep your spaces calm and clear.",
  },
  rituals: {
    label: "Everyday Rituals",
    description: "Morning coffee, evening wind-downs, journaling, and weekend routines — make them count.",
  },
  "better-living": {
    label: "Better Living",
    description: "DIY, sustainable living, creative hobbies, and offline activities for a richer everyday life.",
  },
  finds: {
    label: "Smart Finds",
    description: "Carefully selected budget-friendly and trending products that solve real everyday problems.",
  },
  ideas: {
    label: "Ideas & Guides",
    description: "Clever solutions, small-space hacks, transformation stories, and practical buying guides.",
  },
};

export async function generateStaticParams() {
  return Object.keys(CATEGORIES).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const category = CATEGORIES[params.slug];
  if (!category) return {};
  return {
    title: category.label,
    description: category.description,
  };
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = CATEGORIES[params.slug];

  if (!category) {
    notFound();
  }

  // Filter publishable products by category (case-insensitive match on slug or label)
  const allProducts = getPublishableProducts();
  const products = allProducts.filter((p) => {
    const productCategory = (p.category || "").toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    const productSubcategory = (p.subcategory || "").toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    return productCategory === params.slug || productSubcategory === params.slug;
  });

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Breadcrumb */}
      <nav className="text-sm text-brand-500 mb-6" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2">
          <li><a href="/" className="hover:text-brand-700">Home</a></li>
          <li aria-hidden="true">›</li>
          <li className="text-brand-900 font-medium">{category.label}</li>
        </ol>
      </nav>

      <div className="mb-12">
        <h1 className="text-4xl font-serif font-bold text-brand-900 mb-4">{category.label}</h1>
        <p className="text-lg text-brand-700 max-w-2xl">{category.description}</p>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-24 bg-white border border-brand-200 rounded-lg">
          <p className="text-brand-600 mb-2 font-medium">No products in this category yet.</p>
          <p className="text-sm text-brand-500">
            We are always adding new finds.{" "}
            <a href="/products" className="underline hover:text-brand-700">
              Browse all products →
            </a>
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
