import { getPublishableProducts } from '@/lib/data';
import { ProductCard } from '@/components/product/ProductCard';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';

const PILLARS = ['skin', 'hair', 'trending', 'useful-finds', 'style', 'travel'];

export async function generateStaticParams() {
  return PILLARS.map((category) => ({ category }));
}

export async function generateMetadata({ params }: { params: { category: string } }): Promise<Metadata> {
  if (!PILLARS.includes(params.category)) return {};
  
  const title = params.category.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  return {
    title: `${title} Products | Elevated Everyday Living`,
    description: `Curated ${title.toLowerCase()} products and smart finds.`,
  };
}

export default function ProductCategoryPage({ params }: { params: { category: string } }) {
  if (!PILLARS.includes(params.category)) {
    notFound();
  }

  const allProducts = getPublishableProducts();
  const categoryLabel = params.category.replace('-', ' ');
  
  // Filter logic: Check if the product has the exact category in its tags, category, or subcategory
  const products = allProducts.filter(p => {
    const searchTerms = [
      (p.category || '').toLowerCase(),
      (p.subcategory || '').toLowerCase(),
      ...(p.tags || []).map(t => t.toLowerCase())
    ];
    
    // Convert 'useful-finds' -> 'useful finds' or 'usefulfinds' etc. for loose matching
    return searchTerms.some(term => 
      term.includes(params.category) || 
      term.includes(params.category.replace('-', ' ')) ||
      term.includes(params.category.replace('-', ''))
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <nav className="text-xs text-brand-500 mb-6 flex items-center gap-1">
        <Link href="/" className="hover:text-brand-700">Home</Link>
        <span>›</span>
        <Link href="/products" className="hover:text-brand-700">All Finds</Link>
        <span>›</span>
        <span className="text-brand-800 font-medium capitalize">{categoryLabel}</span>
      </nav>

      <div className="mb-12">
        <h1 className="text-4xl font-serif font-bold text-brand-900 mb-4 capitalize">
          {categoryLabel} Finds
        </h1>
        <p className="text-lg text-brand-700 max-w-2xl">
          A curated collection of practical, beautiful, and highly-rated products in the {categoryLabel} category.
        </p>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-24 bg-white border border-brand-200 rounded-lg">
          <p className="text-brand-600 font-medium mb-2">No products found yet.</p>
          <p className="text-sm text-brand-500">We are currently curating the best items for this section.</p>
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
