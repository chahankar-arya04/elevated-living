import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found | Elevated Everyday Living",
};

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6 py-16">
      <div className="text-7xl mb-6 select-none">404</div>
      <h1 className="text-3xl font-serif font-bold text-brand-900 mb-4">
        This page could not be found.
      </h1>
      <p className="text-brand-700 max-w-md mb-10 leading-relaxed">
        The page you&apos;re looking for may have moved, been renamed, or may no longer exist.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Link
          href="/"
          className="px-6 py-3 bg-brand-800 text-white rounded-md font-medium hover:bg-brand-900 transition-colors"
        >
          Go Home
        </Link>
        <Link
          href="/products"
          className="px-6 py-3 bg-white text-brand-900 border border-brand-200 rounded-md font-medium hover:bg-brand-50 transition-colors"
        >
          Browse Finds
        </Link>
      </div>
    </div>
  );
}
