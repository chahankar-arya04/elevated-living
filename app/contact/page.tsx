import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Elevated Everyday Living",
  description: "Get in touch with the Elevated Everyday Living editorial team.",
};

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-serif font-bold text-brand-900 mb-6">Contact</h1>

      <div className="prose max-w-none text-brand-800 space-y-6 leading-relaxed">
        <p className="text-lg">
          We would love to hear from you.
        </p>

        <div className="bg-brand-50 border border-brand-200 rounded-lg p-6 space-y-4">
          <div>
            <h2 className="text-lg font-bold text-brand-900 mb-1">Product Safety Concerns</h2>
            <p className="text-sm text-brand-700">
              If you believe a product we have featured has a safety issue or has been recalled,
              please notify us immediately so our editorial team can investigate and update the product status.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-brand-900 mb-1">General Enquiries</h2>
            <p className="text-sm text-brand-700">
              For general questions, partnership enquiries, or feedback, please use the email on our
              GitHub profile or social media channels.
            </p>
          </div>
        </div>

        <p className="text-sm text-brand-600">
          We aim to respond to all enquiries within 3–5 business days.
        </p>
      </div>
    </div>
  );
}
