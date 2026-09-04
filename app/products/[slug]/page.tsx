import { getProductBySlug, getPublishableProducts } from '@/lib/data';
import { notFound } from 'next/navigation';
import { AffiliateButton } from '@/components/ui/AffiliateButton';
import { Badge } from '@/components/ui/Badge';
import { Metadata } from 'next';

export async function generateStaticParams() {
  const products = getPublishableProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = getProductBySlug(params.slug);
  if (!product) return {};
  
  return {
    title: `${product.name} | Elevated Everyday Living`,
    description: product.shortDescription,
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const formattedDate = new Date(product.verification.lastChecked).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row gap-12">
        {/* Left Column: Image */}
        <div className="w-full md:w-1/2">
          <div className="aspect-square bg-white border border-brand-200 rounded-lg overflow-hidden flex items-center justify-center p-8">
            <img 
              src={product.productImage || "/placeholder.jpg"} 
              alt={product.name}
              className="object-contain w-full h-full"
            />
          </div>
        </div>

        {/* Right Column: Details */}
        <div className="w-full md:w-1/2 flex flex-col">
          <div className="mb-2">
            <span className="text-sm font-semibold tracking-wider text-brand-500 uppercase">{product.brand}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-brand-900 mb-4 leading-tight">
            {product.name}
          </h1>
          
          <div className="flex flex-wrap gap-2 mb-6">
            <Badge variant="secondary">{product.category}</Badge>
            <Badge variant="outline">{product.subcategory}</Badge>
            {product.featured && <Badge>Editorial Pick</Badge>}
          </div>

          <p className="text-lg text-brand-800 mb-8 leading-relaxed">
            {product.shortDescription}
          </p>

          <div className="bg-brand-50 rounded-lg p-6 mb-8 border border-brand-100">
            <div className="flex items-center justify-between mb-4">
              <div className="text-3xl font-bold text-brand-900">
                {product.price.currency === 'INR' ? '₹' : '$'}{product.price.current.toLocaleString()}
              </div>
              <AffiliateButton product={product} size="lg" />
            </div>
            <p className="text-xs text-brand-600 text-center">
              Price last checked: {formattedDate}. Prices may change.
            </p>
          </div>

          <div className="space-y-8">
            {product.problemSolved && (
              <div>
                <h3 className="text-xl font-bold text-brand-900 mb-2">Problem it solves</h3>
                <p className="text-brand-700">{product.problemSolved}</p>
              </div>
            )}
            
            {product.whyWeRecommend && (
              <div>
                <h3 className="text-xl font-bold text-brand-900 mb-2">Why we selected it</h3>
                <p className="text-brand-700">{product.whyWeRecommend}</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {product.pros && product.pros.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-green-800 mb-3">Pros</h3>
                  <ul className="space-y-2">
                    {product.pros.map((pro, i) => (
                      <li key={i} className="flex items-start text-brand-700">
                        <span className="text-green-600 mr-2">✓</span>
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {product.cons && product.cons.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-red-800 mb-3">Cons</h3>
                  <ul className="space-y-2">
                    {product.cons.map((con, i) => (
                      <li key={i} className="flex items-start text-brand-700">
                        <span className="text-red-500 mr-2">✕</span>
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Verification Box */}
          <div className="mt-12 border-t border-brand-200 pt-8">
            <h3 className="text-sm font-bold text-brand-900 uppercase tracking-wider mb-4">Verification & Sources</h3>
            <div className="bg-white border border-brand-200 rounded-md p-4 text-sm text-brand-700">
              <ul className="space-y-2">
                <li><strong>Safety Checked:</strong> {product.verification.safetyChecked ? 'Yes' : 'No'}</li>
                <li><strong>Seller Verified:</strong> {product.verification.sellerVerified ? 'Yes' : 'No'}</li>
                <li><strong>Review Quality:</strong> {product.reviewQuality}</li>
                <li><strong>Product Information Verified:</strong> {formattedDate}</li>
              </ul>
              {product.verification.sources.length > 0 && (
                <div className="mt-4 pt-4 border-t border-brand-100">
                  <strong>Sources:</strong>
                  <ul className="mt-2 list-disc pl-5">
                    {product.verification.sources.map((s, idx) => (
                      <li key={idx}><a href={s.url} target="_blank" rel="nofollow noreferrer" className="underline">{s.name}</a> ({s.type})</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
