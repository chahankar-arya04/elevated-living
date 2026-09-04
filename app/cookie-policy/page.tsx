import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy | Elevated Everyday Living",
  description: "How Elevated Everyday Living uses cookies.",
};

export default function CookiePolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-serif font-bold text-brand-900 mb-6">Cookie Policy</h1>
      <p className="text-sm text-brand-500 mb-10">Last updated: September 2026</p>

      <div className="prose max-w-none text-brand-800 space-y-8 leading-relaxed">
        <section>
          <h2 className="text-2xl font-serif font-bold text-brand-900 mb-4">What Are Cookies</h2>
          <p>
            Cookies are small text files stored on your device by your browser. They are used to remember
            preferences and analyse website usage.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-serif font-bold text-brand-900 mb-4">How We Use Cookies</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Analytics:</strong> We may use analytics tools to understand how visitors use this site.</li>
            <li><strong>Affiliate tracking:</strong> When you click a product link, affiliate partners may set cookies to track purchases for commission purposes.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-serif font-bold text-brand-900 mb-4">Managing Cookies</h2>
          <p>
            You can control and delete cookies through your browser settings. Disabling cookies may affect
            some functionality of this website. For more information, consult your browser&apos;s help section.
          </p>
        </section>
      </div>
    </div>
  );
}
