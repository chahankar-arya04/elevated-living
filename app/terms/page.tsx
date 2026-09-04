import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Elevated Everyday Living",
  description: "Terms of Service for Elevated Everyday Living.",
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-serif font-bold text-brand-900 mb-6">Terms of Service</h1>
      <p className="text-sm text-brand-500 mb-10">Last updated: September 2026</p>

      <div className="prose max-w-none text-brand-800 space-y-8 leading-relaxed">
        <div className="bg-brand-50 border border-brand-200 rounded-lg p-4 text-sm text-brand-700">
          <strong>Note:</strong> This is a general terms document. It does not constitute legal advice.
          Please consult a qualified legal professional if you have specific requirements.
        </div>

        <section>
          <h2 className="text-2xl font-serif font-bold text-brand-900 mb-4">Use of This Website</h2>
          <p>
            By accessing Elevated Everyday Living, you agree to use the website for lawful purposes only.
            All editorial content is provided for informational and entertainment purposes.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-serif font-bold text-brand-900 mb-4">Affiliate Disclaimer</h2>
          <p>
            This website participates in affiliate marketing programmes. We may earn a commission if you click
            through and make a purchase. This does not affect the price you pay. See our full{" "}
            <a href="/affiliate-disclosure" className="underline hover:text-brand-700">Affiliate Disclosure</a>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-serif font-bold text-brand-900 mb-4">No Warranties</h2>
          <p>
            Product information is provided in good faith and is subject to change. We do not guarantee
            the accuracy, completeness, or availability of any product listing. Always verify product details
            directly with the retailer before purchasing.
          </p>
        </section>
      </div>
    </div>
  );
}
