import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How We Choose | Elevated Everyday Living',
  description: 'Our editorial methodology for recommending products.',
};

export default function HowWeChoosePage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-serif font-bold text-brand-900 mb-6">How We Choose Products</h1>
      
      <div className="prose prose-brand max-w-none text-brand-800 space-y-6">
        <p className="text-lg">
          At Elevated Everyday Living, our mission is to help you create a better home and life. 
          The products we recommend are selected through a strict editorial process focused on usefulness, safety, and value.
        </p>

        <h2 className="text-2xl font-bold text-brand-900 mt-10">Our Selection Criteria</h2>
        <ul className="list-disc pl-6 space-y-3">
          <li><strong>Usefulness & Practicality:</strong> We prioritize products that genuinely solve an everyday problem or elevate a daily ritual.</li>
          <li><strong>Safety First:</strong> We do not recommend products with unresolved safety concerns or active recalls. We maintain a strict internal safety gate.</li>
          <li><strong>Seller Reliability:</strong> A good product from a fraudulent seller is a bad recommendation. We verify seller trust.</li>
          <li><strong>Authentic Reviews:</strong> We look beyond the star rating to identify manipulated reviews and ensure the feedback is from real users.</li>
          <li><strong>Value:</strong> Expensive isn&apos;t always better. We highlight products that provide excellent value for the price.</li>
        </ul>

        <h2 className="text-2xl font-bold text-brand-900 mt-10">Our Affiliate Policy</h2>
        <p>
          We may earn a commission if you purchase through our links. However, our editorial recommendations 
          are never dictated by affiliate commission rates. We frequently recommend products that offer no commission 
          simply because they are the right choice for the problem.
        </p>

        <div className="bg-brand-50 p-6 rounded-lg border border-brand-200 mt-12">
          <h3 className="font-bold text-brand-900 mb-2">Notice a problem?</h3>
          <p className="text-sm">
            If you believe a product we've recommended has been recalled or is no longer up to standard, 
            please contact us immediately so our editorial team can investigate and update the safety status.
          </p>
        </div>
      </div>
    </div>
  );
}
