import { getPublishableProducts } from '@/lib/data';
import { ProductCard } from '@/components/product/ProductCard';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Smart Finds | Elevated Everyday Living',
  description: 'Curated products and smart finds for elevated everyday living.',
};

export default function ProductsIndexPage() {
  const products = getPublishableProducts();

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-serif font-bold text-brand-900 mb-4">Smart Finds</h1>
        <p className="text-lg text-brand-700 max-w-2xl">
          A curated collection of practical, beautiful, and highly-rated products that solve everyday problems. 
          Every item is rigorously checked against our editorial standards.
        </p>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-24 bg-white border border-brand-200 rounded-lg">
          <p className="text-brand-600">No products available at the moment.</p>
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
