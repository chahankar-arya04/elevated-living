import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Affiliate Disclosure | Elevated Everyday Living",
  description: "Our affiliate disclosure and how we earn commissions from product recommendations.",
};

export default function AffiliateDisclosurePage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-serif font-bold text-brand-900 mb-6">Affiliate Disclosure</h1>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-10">
        <p className="text-amber-900 font-medium">
          Elevated Everyday Living participates in affiliate marketing programmes. When you click a product
          link on this site and make a qualifying purchase, we may earn a small commission at no additional
          cost to you.
        </p>
      </div>

      <div className="prose max-w-none text-brand-800 space-y-8 leading-relaxed">
        <section>
          <h2 className="text-2xl font-serif font-bold text-brand-900 mb-4">What This Means</h2>
          <p>
            This means that some of the links on this website are affiliate links. If you click on these
            links and subsequently make a purchase, we may receive a commission from the retailer.
          </p>
          <p>
            These commissions help us maintain the website, continue researching and curating products,
            and provide free content to our readers.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-serif font-bold text-brand-900 mb-4">Our Editorial Independence</h2>
          <p>
            Our editorial recommendations are never determined by affiliate commission rates. We frequently
            highlight products that offer little or no affiliate commission simply because they are the best
            solution for our readers.
          </p>
          <p>
            Commission availability does not influence which products we include, exclude, or how we
            rate them.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-serif font-bold text-brand-900 mb-4">Affiliate Programmes</h2>
          <p>
            We may participate in affiliate programmes including but not limited to Amazon Associates and
            other retail affiliate networks. The specific programme for each product is documented in our
            internal product data.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-serif font-bold text-brand-900 mb-4">Questions</h2>
          <p>
            If you have any questions about our affiliate relationships, please{" "}
            <a href="/contact" className="underline hover:text-brand-700">contact us</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
