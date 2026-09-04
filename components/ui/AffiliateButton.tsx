import React from 'react';
import { cn } from '@/lib/utils';
import { Product } from '@/types/product';
import Link from 'next/link';

interface AffiliateButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  product: Product;
  variant?: 'default' | 'outline';
  size?: 'default' | 'lg';
}

export function AffiliateButton({ 
  product, 
  className, 
  variant = 'default',
  size = 'default',
  children,
  ...props 
}: AffiliateButtonProps) {
  
  const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2";
  
  const variants = {
    default: "bg-brand-800 text-white hover:bg-brand-900",
    outline: "border border-brand-200 bg-white hover:bg-brand-50 text-brand-900",
  };
  
  const sizes = {
    default: "h-10 px-4 py-2",
    lg: "h-12 px-8 py-3 text-base",
  };

  // Safely point to our internal redirect route
  const href = `/go/${product.slug}`;

  return (
    <Link
      href={href}
      target="_blank"
      rel="nofollow sponsored noopener"
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children || 'View Product \u2192'}
    </Link>
  );
}
