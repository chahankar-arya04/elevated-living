import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

import Link from "next/link";

export const metadata: Metadata = {
  title: "Elevated Everyday Living",
  description: "Beautiful ideas. Practical solutions. Better everyday life.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-brand-50 text-brand-950 flex flex-col min-h-screen`}>
        {/* Affiliate Disclosure Banner */}
        <div className="bg-brand-100 text-brand-900 text-xs py-2 text-center px-4">
          We may earn a commission from purchases made through our links. <Link href="/how-we-choose" className="underline font-medium">Read about our editorial process.</Link>
        </div>

        {/* Global Navigation */}
        <header className="bg-white border-b border-brand-200 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            <Link href="/" className="font-serif font-bold text-xl tracking-wide text-brand-900">
              ELEVATED LIVING
            </Link>
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-brand-700">
              <Link href="/categories/home" className="hover:text-brand-900">Home & Spaces</Link>
              <Link href="/categories/organization" className="hover:text-brand-900">Organize</Link>
              <Link href="/categories/rituals" className="hover:text-brand-900">Rituals</Link>
              <Link href="/products" className="hover:text-brand-900">Finds</Link>
            </nav>
            <div className="flex items-center">
              {/* Search placeholder */}
              <button className="text-brand-900 p-2">Search</button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow">
          {children}
        </main>

        {/* Global Footer */}
        <footer className="bg-brand-900 text-brand-100 py-12 mt-auto">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="font-serif font-bold text-2xl tracking-wide text-white mb-4">
                ELEVATED LIVING
              </div>
              <p className="text-brand-200 max-w-md">
                Beautiful ideas, practical solutions, and smart finds for the way you actually live.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Explore</h4>
              <ul className="space-y-2 text-sm text-brand-200">
                <li><Link href="/categories/home" className="hover:text-white">Home & Spaces</Link></li>
                <li><Link href="/categories/organization" className="hover:text-white">Organization</Link></li>
                <li><Link href="/products" className="hover:text-white">Smart Finds</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">About</h4>
              <ul className="space-y-2 text-sm text-brand-200">
                <li><Link href="/how-we-choose" className="hover:text-white">How We Choose</Link></li>
                <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
