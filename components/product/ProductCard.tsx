import React from 'react';
import { Product } from '@/types/product';
import { AffiliateButton } from '@/components/ui/AffiliateButton';
import { Badge } from '@/components/ui/Badge';
import { isPublishableProduct } from '@/lib/data';
import Link from 'next/link';
import Image from 'next/image';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  // Final safety check just in case
  if (!isPublishableProduct(product)) {
    return null;
  }

  return (
    <div className="group relative flex flex-col rounded-lg border border-brand-200 bg-white p-4 shadow-soft transition-shadow hover:shadow-md">
      {/* Featured Badge */}
      {product.featured && (
        <Badge className="absolute top-2 left-2 z-10" variant="secondary">
          Editorial Pick
        </Badge>
      )}
      
      {/* Image Area */}
      <Link href={`/products/${product.slug}`} className="relative aspect-square w-full overflow-hidden rounded-md bg-brand-50 mb-4">
        {/* Replace with Next.js Image in real deployment once domains are whitelisted */}
        <div className="absolute inset-0 flex items-center justify-center text-brand-300">
          <img 
            src={product.productImage || "/placeholder.jpg"} 
            alt={product.name}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-grow">
        <div className="text-xs text-brand-500 font-medium mb-1 tracking-wider uppercase">
          {product.brand}
        </div>
        <Link href={`/products/${product.slug}`} className="hover:underline">
          <h3 className="text-lg font-serif font-bold text-brand-900 mb-2 leading-tight">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-brand-700 line-clamp-2 mb-4 flex-grow">
          {product.shortDescription}
        </p>

        {/* Footer Area */}
        <div className="flex items-end justify-between mt-auto">
          <div>
            <div className="text-lg font-bold text-brand-900">
              {product.price.current > 0 ? (
                <>
                  {product.price.currency === 'INR' ? '₹' : '$'}
                  {product.price.current.toLocaleString()}
                </>
              ) : 'Check Price'}
            </div>
          </div>
          
          <AffiliateButton product={product} size="sm" />
        </div>
      </div>
    </div>
  );
}
