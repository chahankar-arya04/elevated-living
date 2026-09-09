import { Badge } from '@/components/ui/Badge';
import { AffiliateButton } from '@/components/ui/AffiliateButton';
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = getProductBySlug(params.slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      type: "website",
    },
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  // TypeScript: after notFound(), we know product is not null.
  // We use a const re-assignment to narrow the type.
  const p = product;

  const hasAffiliate =
    p.affiliate?.status === "ACTIVE" && p.affiliate?.url && p.affiliate.url.startsWith("http");

  const formattedVerifiedDate = p.verification?.lastChecked
    ? new Date(p.verification.lastChecked).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Not verified";

  const formattedPriceDate = p.price?.lastChecked
    ? new Date(p.price.lastChecked).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Not verified";

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Breadcrumb */}
      <nav className="text-sm text-brand-500 mb-8" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 flex-wrap">
          <li><a href="/" className="hover:text-brand-700">Home</a></li>
          <li aria-hidden="true">›</li>
          <li><a href="/products" className="hover:text-brand-700">Finds</a></li>
          <li aria-hidden="true">›</li>
          <li className="text-brand-900 font-medium">{p.name}</li>
        </ol>
      </nav>

      <div className="flex flex-col md:flex-row gap-12">
        {/* Left Column: Image */}
        <div className="w-full md:w-1/2">
          <div className="aspect-square bg-white border border-brand-200 rounded-lg overflow-hidden flex items-center justify-center p-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.productImage || "/placeholder.svg"}
              alt={p.name}
              className="object-contain w-full h-full"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/placeholder.svg";
              }}
            />
          </div>
        </div>

        {/* Right Column: Details */}
        <div className="w-full md:w-1/2 flex flex-col">
          <div className="mb-2">
            <span className="text-sm font-semibold tracking-wider text-brand-500 uppercase">
              {p.brand}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-brand-900 mb-4 leading-tight">
            {p.name}
          </h1>

          <div className="flex flex-wrap gap-2 mb-6">
            <Badge variant="secondary">{p.category}</Badge>
            <Badge variant="outline">{p.subcategory}</Badge>
            {p.featured && <Badge>Editorial Pick</Badge>}
          </div>

          <p className="text-lg text-brand-800 mb-8 leading-relaxed">{p.shortDescription}</p>

          {/* Price + CTA Box */}
          <div className="bg-brand-50 rounded-lg p-6 mb-8 border border-brand-100">
            <div className="flex items-center justify-between mb-4 gap-4">
              <div className="text-3xl font-bold text-brand-900">
                {p.price.current > 0
                  ? `${p.price.currency === "INR" ? "₹" : "$"}${p.price.current.toLocaleString()}`
                  : "Check Price"}
              </div>
              {hasAffiliate ? (
                <AffiliateButton product={p} size="lg" />
              ) : (
                <span className="text-sm text-brand-500 italic">Link currently unavailable</span>
              )}
            </div>
            <p className="text-xs text-brand-600 text-center">
              Price last checked: {formattedPriceDate}. Prices may vary — always verify on the retailer&apos;s website.
            </p>
          </div>

          <div className="space-y-8">
            {p.problemSolved && (
              <div>
                <h2 className="text-xl font-bold text-brand-900 mb-2">Problem it solves</h2>
                <p className="text-brand-700">{p.problemSolved}</p>
              </div>
            )}

            {p.whyWeRecommend && (
              <div>
                <h2 className="text-xl font-bold text-brand-900 mb-2">Why we selected it</h2>
                <p className="text-brand-700">{p.whyWeRecommend}</p>
              </div>
            )}

            {(p.pros?.length > 0 || p.cons?.length > 0) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {p.pros?.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold text-green-800 mb-3">Pros</h3>
                    <ul className="space-y-2">
                      {p.pros.map((pro, i) => (
                        <li key={i} className="flex items-start text-brand-700">
                          <span className="text-green-600 mr-2 flex-shrink-0">✓</span>
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {p.cons?.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold text-red-800 mb-3">Cons</h3>
                    <ul className="space-y-2">
                      {p.cons.map((con, i) => (
                        <li key={i} className="flex items-start text-brand-700">
                          <span className="text-red-500 mr-2 flex-shrink-0">✕</span>
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Verification Box */}
          <div className="mt-12 border-t border-brand-200 pt-8">
            <h3 className="text-sm font-bold text-brand-900 uppercase tracking-wider mb-4">
              Verification &amp; Sources
            </h3>
            <div className="bg-white border border-brand-200 rounded-md p-4 text-sm text-brand-700">
              <ul className="space-y-2">
                <li>
                  <strong>Safety Checked:</strong>{" "}
                  {p.verification?.safetyChecked ? "Yes" : "Not yet"}
                </li>
                <li>
                  <strong>Seller Verified:</strong>{" "}
                  {p.verification?.sellerVerified ? "Yes" : "Not yet"}
                </li>
                <li>
                  <strong>Review Quality:</strong> {p.reviewQuality ?? "Not verified"}
                </li>
                <li>
                  <strong>Information last checked:</strong> {formattedVerifiedDate}
                </li>
              </ul>
              {p.verification?.sources && p.verification.sources.length > 0 && (
                <div className="mt-4 pt-4 border-t border-brand-100">
                  <strong>Sources:</strong>
                  <ul className="mt-2 list-disc pl-5">
                    {p.verification.sources.map((s, idx) => (
                      <li key={idx}>
                        <a
                          href={s.url}
                          target="_blank"
                          rel="nofollow noreferrer"
                          className="underline hover:text-brand-900"
                        >
                          {s.name}
                        </a>{" "}
                        ({s.type})
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <p className="text-xs text-brand-500 mt-4">
              <a href="/how-we-choose" className="underline hover:text-brand-700">
                Learn how we select and verify products →
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
