import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Elevated Everyday Living",
  description: "We are a small editorial team passionate about helping people create beautiful, functional everyday spaces.",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-serif font-bold text-brand-900 mb-6">About Elevated Everyday Living</h1>

      <div className="prose max-w-none text-brand-800 space-y-6 text-lg leading-relaxed">
        <p>
          Elevated Everyday Living is an editorial platform dedicated to helping people create more beautiful,
          organised, and intentional everyday spaces — without spending a fortune.
        </p>
        <p>
          We research, curate, and recommend products and ideas across home organisation, everyday rituals,
          small-space living, and more. Everything we feature goes through a structured editorial and safety
          review process before we publish it.
        </p>
        <h2 className="text-2xl font-serif font-bold text-brand-900 mt-10 mb-4">What We Stand For</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Honesty — we do not fabricate reviews or ratings.</li>
          <li>Safety — products with confirmed safety issues or recalls are never promoted.</li>
          <li>Usefulness first — our primary question is always: does this genuinely help?</li>
          <li>Transparency — we clearly disclose when we may earn a commission.</li>
        </ul>
        <p>
          Read more about our product selection methodology on the{" "}
          <a href="/how-we-choose" className="underline text-brand-700 hover:text-brand-900">
            How We Choose
          </a>{" "}
          page.
        </p>
      </div>
    </div>
  );
}
