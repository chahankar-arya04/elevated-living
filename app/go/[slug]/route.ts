import { NextResponse } from "next/server";
import { getProductBySlug } from "@/lib/data";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug;
  const product = getProductBySlug(slug);

  if (!product) {
    // Product not found or not publishable — redirect to products listing
    return NextResponse.redirect(new URL("/products", request.url));
  }

  // Use the affiliate URL if it's active and valid, otherwise fall back to product URL
  const affiliateUrl =
    product.affiliate?.status === "ACTIVE" && product.affiliate?.url
      ? product.affiliate.url
      : null;
  const targetUrl = affiliateUrl || product.productUrl;

  if (!targetUrl || !targetUrl.startsWith("http")) {
    // No valid outbound URL — redirect to product page instead of 404
    return NextResponse.redirect(new URL(`/products/item/${slug}`, request.url));
  }

  // Redirect to the affiliate destination with 302 (temporary)
  return NextResponse.redirect(targetUrl, { status: 302 });
}
