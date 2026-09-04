import React from "react";
import { Product } from "@/types/product";
import { AffiliateButton } from "@/components/ui/AffiliateButton";
import { Badge } from "@/components/ui/Badge";
import { isPublishableProduct } from "@/lib/data";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  // Final safety check — never render a non-publishable product
  if (!isPublishableProduct(product)) {
    return null;
  }

  const hasValidAffiliate =
    product.affiliate?.status === "ACTIVE" &&
    product.affiliate?.url &&
    product.affiliate.url.startsWith("http");

  return (
    <div className="group relative flex flex-col rounded-lg border border-brand-200 bg-white p-4 shadow-soft transition-shadow hover:shadow-md">
      {/* Featured Badge */}
      {product.featured && (
        <Badge className="absolute top-2 left-2 z-10" variant="secondary">
          Editorial Pick
        </Badge>
      )}

      {/* Image Area */}
      <Link
        href={`/products/${product.slug}`}
        className="relative aspect-square w-full overflow-hidden rounded-md bg-brand-50 mb-4 block"
        aria-label={`View ${product.name}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.productImage || "/placeholder.jpg"}
          alt={product.name}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/placeholder.jpg";
          }}
        />
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-grow">
        <div className="text-xs text-brand-500 font-medium mb-1 tracking-wider uppercase">
          {product.brand}
        </div>
        <Link href={`/products/${product.slug}`} className="hover:underline">
          <h3 className="text-base font-serif font-bold text-brand-900 mb-2 leading-tight">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-brand-700 line-clamp-2 mb-4 flex-grow">
          {product.shortDescription}
        </p>

        {/* Footer Area */}
        <div className="flex items-end justify-between mt-auto gap-2">
          <div className="text-base font-bold text-brand-900 shrink-0">
            {product.price.current > 0
              ? `${product.price.currency === "INR" ? "₹" : "$"}${product.price.current.toLocaleString()}`
              : "Check Price"}
          </div>

          {hasValidAffiliate ? (
            <AffiliateButton product={product} size="sm" />
          ) : (
            <Link
              href={`/products/${product.slug}`}
              className="inline-flex items-center justify-center h-9 px-3 rounded-md text-sm font-medium border border-brand-200 text-brand-900 hover:bg-brand-50 transition-colors"
            >
              Details →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
