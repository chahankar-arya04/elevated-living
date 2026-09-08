import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ProductCardData {
  id: string;
  slug: string;
  name: string;
  brand?: string;
  category: string;
  shortDescription: string;
  problemSolved?: string;
  bestFor?: string;
  price: { current: number; currency: string };
  productImage?: string;
  affiliate?: { status: string; url?: string };
  tags?: string[];
  featured?: boolean;
  pros?: string[];
}

interface ProductCardProps {
  product: ProductCardData;
  variant?: "default" | "compact" | "featured" | "horizontal";
  className?: string;
  onClickEvent?: string; // analytics event name
}

// ─── ProductCard ──────────────────────────────────────────────────────────────

export function ProductCard({ product, variant = "default", className }: ProductCardProps) {
  const hasAffiliate =
    product.affiliate?.status === "ACTIVE" &&
    product.affiliate?.url?.startsWith("http");

  const priceStr =
    product.price.current > 0
      ? `${product.price.currency === "INR" ? "₹" : "$"}${product.price.current.toLocaleString()}`
      : "Check Price";

  if (variant === "compact") {
    return (
      <div className={cn("flex items-start gap-3 p-3 bg-white border border-brand-200 rounded-lg", className)}>
        <div className="w-14 h-14 rounded-md bg-brand-100 shrink-0 overflow-hidden flex items-center justify-center text-brand-400 text-xs">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.productImage || "/placeholder.jpg"}
            alt={product.name}
            className="object-cover w-full h-full"
            onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.jpg"; }}
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-brand-500 truncate">{product.brand || product.category}</p>
          <Link href={`/products/${product.slug}`} className="text-sm font-semibold text-brand-900 hover:underline line-clamp-1">
            {product.name}
          </Link>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm font-bold text-brand-900">{priceStr}</span>
            {hasAffiliate && (
              <Link
                href={`/go/${product.slug}`}
                target="_blank"
                rel="nofollow sponsored noopener"
                className="text-xs font-medium bg-brand-800 text-white px-2 py-0.5 rounded hover:bg-brand-900 transition-colors"
              >
                Shop
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (variant === "horizontal") {
    return (
      <div className={cn("flex gap-4 p-4 bg-white border border-brand-200 rounded-xl hover:shadow-soft transition-shadow", className)}>
        <div className="w-24 h-24 rounded-lg bg-brand-100 shrink-0 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.productImage || "/placeholder.jpg"}
            alt={product.name}
            className="object-cover w-full h-full"
            onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.jpg"; }}
          />
        </div>
        <div className="flex flex-col justify-between flex-1 min-w-0">
          <div>
            <p className="text-xs text-brand-500">{product.brand}</p>
            <Link href={`/products/${product.slug}`} className="font-serif font-bold text-brand-900 text-sm leading-snug hover:underline line-clamp-2">
              {product.name}
            </Link>
            {product.bestFor && (
              <p className="text-xs text-brand-600 mt-1">
                <strong>Best for:</strong> {product.bestFor}
              </p>
            )}
          </div>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-sm font-bold text-brand-900">{priceStr}</span>
            {hasAffiliate ? (
              <Link
                href={`/go/${product.slug}`}
                target="_blank"
                rel="nofollow sponsored noopener"
                className="text-xs font-medium bg-brand-800 text-white px-3 py-1 rounded-md hover:bg-brand-900 transition-colors"
              >
                Check Product →
              </Link>
            ) : (
              <Link href={`/products/${product.slug}`} className="text-xs text-brand-600 hover:underline">Details →</Link>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (variant === "featured") {
    return (
      <div className={cn("flex flex-col bg-white border-2 border-brand-300 rounded-xl overflow-hidden shadow-soft", className)}>
        <div className="relative aspect-square bg-brand-100 overflow-hidden">
          {product.featured && (
            <span className="absolute top-2 left-2 z-10 text-xs font-semibold bg-brand-800 text-white px-2 py-0.5 rounded-full">
              Editorial Pick
            </span>
          )}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.productImage || "/placeholder.jpg"}
            alt={product.name}
            className="object-cover w-full h-full"
            onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.jpg"; }}
          />
        </div>
        <div className="p-5 flex flex-col flex-grow">
          <p className="text-xs text-brand-500 uppercase tracking-wider font-semibold mb-1">{product.brand}</p>
          <Link href={`/products/${product.slug}`}>
            <h3 className="font-serif font-bold text-brand-900 text-lg leading-tight mb-2 hover:underline">{product.name}</h3>
          </Link>
          {product.problemSolved && (
            <p className="text-xs text-brand-600 mb-3 bg-brand-50 rounded-md px-3 py-2 border-l-2 border-brand-300">
              <strong>Solves:</strong> {product.problemSolved}
            </p>
          )}
          <p className="text-sm text-brand-700 line-clamp-2 flex-grow mb-4">{product.shortDescription}</p>
          <div className="flex items-center justify-between gap-2 mt-auto">
            <span className="text-lg font-bold text-brand-900">{priceStr}</span>
            {hasAffiliate ? (
              <Link
                href={`/go/${product.slug}`}
                target="_blank"
                rel="nofollow sponsored noopener"
                className="flex-1 text-center text-sm font-medium bg-brand-800 text-white px-4 py-2 rounded-lg hover:bg-brand-900 transition-colors"
              >
                Check Product
              </Link>
            ) : (
              <Link href={`/products/${product.slug}`} className="text-sm text-brand-700 underline">Details</Link>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Default card
  return (
    <div className={cn("group flex flex-col bg-white border border-brand-200 rounded-xl overflow-hidden hover:shadow-soft hover:border-brand-300 transition-all", className)}>
      <Link href={`/products/${product.slug}`} className="relative aspect-square bg-brand-100 overflow-hidden block">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.productImage || "/placeholder.jpg"}
          alt={product.name}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.jpg"; }}
        />
        {product.featured && (
          <span className="absolute top-2 left-2 text-xs font-semibold bg-brand-800 text-white px-2 py-0.5 rounded-full">
            Editorial Pick
          </span>
        )}
      </Link>
      <div className="p-4 flex flex-col flex-grow">
        <p className="text-xs text-brand-500 uppercase tracking-wider font-semibold mb-1">{product.brand || product.category}</p>
        <Link href={`/products/${product.slug}`} className="hover:underline">
          <h3 className="font-serif font-bold text-brand-900 text-sm leading-snug mb-2">{product.name}</h3>
        </Link>
        <p className="text-xs text-brand-600 line-clamp-2 flex-grow mb-3">{product.shortDescription}</p>
        <div className="flex items-center justify-between gap-2 mt-auto">
          <span className="text-sm font-bold text-brand-900">{priceStr}</span>
          {hasAffiliate ? (
            <Link
              href={`/go/${product.slug}`}
              target="_blank"
              rel="nofollow sponsored noopener"
              className="text-xs font-medium bg-brand-800 text-white px-3 py-1.5 rounded-md hover:bg-brand-900 transition-colors"
            >
              Check →
            </Link>
          ) : (
            <Link href={`/products/${product.slug}`} className="text-xs text-brand-700 border border-brand-200 px-3 py-1.5 rounded-md hover:bg-brand-50 transition-colors">
              Details →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── ProductComparison ────────────────────────────────────────────────────────

interface ComparisonProps {
  title: string;
  budgetPick: ProductCardData;
  premiumPick: ProductCardData;
  className?: string;
}

export function ProductComparison({ title, budgetPick, premiumPick, className }: ComparisonProps) {
  return (
    <div className={cn("rounded-xl border border-brand-200 overflow-hidden", className)}>
      <div className="bg-brand-50 px-4 py-3 border-b border-brand-200">
        <h3 className="font-serif font-bold text-brand-900 text-base">{title}</h3>
      </div>
      <div className="grid grid-cols-2 divide-x divide-brand-100">
        <div className="p-4">
          <span className="inline-block text-xs font-semibold text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full mb-3">
            Budget Pick
          </span>
          <ProductCard product={budgetPick} variant="compact" />
        </div>
        <div className="p-4">
          <span className="inline-block text-xs font-semibold text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-full mb-3">
            Premium Pick
          </span>
          <ProductCard product={premiumPick} variant="compact" />
        </div>
      </div>
    </div>
  );
}

// ─── TrendingProduct ──────────────────────────────────────────────────────────

export function TrendingProduct({ product, rank }: { product: ProductCardData; rank: number }) {
  return (
    <div className="flex items-center gap-4 p-3 bg-white border border-brand-200 rounded-xl hover:shadow-soft transition-shadow">
      <span className="text-2xl font-serif font-bold text-brand-200 w-8 text-center shrink-0">
        {rank}
      </span>
      <ProductCard product={product} variant="compact" className="flex-1 border-0 p-0" />
    </div>
  );
}

// ─── ProductRecommendationSection ─────────────────────────────────────────────
// Drop this into any article to create a "Products That Can Help" section

interface ProductSectionProps {
  products: ProductCardData[];
  title?: string;
  subtitle?: string;
  variant?: "grid" | "list";
}

export function ProductRecommendationSection({
  products,
  title = "Products That Can Help",
  subtitle,
  variant = "grid",
}: ProductSectionProps) {
  if (products.length === 0) return null;

  return (
    <section className="mt-10 pt-8 border-t border-brand-200">
      <h2 className="text-xl sm:text-2xl font-serif font-bold text-brand-900 mb-1">{title}</h2>
      {subtitle && <p className="text-sm text-brand-600 mb-6">{subtitle}</p>}
      <div
        className={
          variant === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 gap-4"
            : "flex flex-col gap-3"
        }
      >
        {products.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            variant={variant === "list" ? "horizontal" : "default"}
          />
        ))}
      </div>
      <p className="text-xs text-brand-500 mt-4">
        *Prices are approximate and may vary. Always verify on the merchant&apos;s website.{" "}
        <Link href="/how-we-choose" className="underline hover:text-brand-700">How we choose products.</Link>
      </p>
    </section>
  );
}
