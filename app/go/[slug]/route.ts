import { NextResponse } from 'next/server';
import { getProductBySlug } from '@/lib/data';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug;
  const product = getProductBySlug(slug);

  if (!product) {
    // If not found or not publishable, redirect to home or 404
    return NextResponse.redirect(new URL('/404', request.url));
  }

  // Use the affiliate URL if it's active and exists, otherwise fall back to product URL
  const targetUrl = (product.affiliate?.status === 'ACTIVE' && product.affiliate?.url) 
    ? product.affiliate.url 
    : product.productUrl;

  if (!targetUrl) {
    return NextResponse.redirect(new URL('/404', request.url));
  }

  // Redirect to the merchant safely
  return NextResponse.redirect(targetUrl, {
    status: 302,
  });
}
