import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Elevated Everyday Living",
  description: "How Elevated Everyday Living handles your data and privacy.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-serif font-bold text-brand-900 mb-6">Privacy Policy</h1>
      <p className="text-sm text-brand-500 mb-10">Last updated: September 2026</p>

      <div className="prose max-w-none text-brand-800 space-y-8 leading-relaxed">
        <div className="bg-brand-50 border border-brand-200 rounded-lg p-4 text-sm text-brand-700">
          <strong>Note:</strong> This is a general privacy notice. This document does not constitute legal advice.
          If you have specific legal requirements, please consult a qualified professional.
        </div>

        <section>
          <h2 className="text-2xl font-serif font-bold text-brand-900 mb-4">Information We Collect</h2>
          <p>
            We may collect basic analytics information (such as page views and general location data) through
            third-party analytics tools. We do not intentionally collect personal identifying information unless
            you voluntarily provide it (such as via a newsletter signup).
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-serif font-bold text-brand-900 mb-4">Affiliate Links</h2>
          <p>
            This website participates in affiliate programmes. When you click a product link and make a purchase,
            we may earn a commission at no extra cost to you. Affiliate partners may set cookies for tracking
            purposes in accordance with their own privacy policies.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-serif font-bold text-brand-900 mb-4">Cookies</h2>
          <p>
            We may use cookies for analytics and affiliate tracking. You can control cookie settings through
            your browser settings. For more information, see our{" "}
            <a href="/cookie-policy" className="underline hover:text-brand-700">Cookie Policy</a>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-serif font-bold text-brand-900 mb-4">Contact</h2>
          <p>
            If you have any privacy-related questions, please use our{" "}
            <a href="/contact" className="underline hover:text-brand-700">contact page</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
