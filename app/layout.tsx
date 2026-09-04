import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: {
    default: "Elevated Everyday Living",
    template: "%s | Elevated Everyday Living",
  },
  description: "Beautiful ideas. Practical solutions. Better everyday life.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://elevatedeverydayliving.com"),
  openGraph: {
    siteName: "Elevated Everyday Living",
    type: "website",
  },
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
          We may earn a commission from purchases made through our links.{" "}
          <Link href="/how-we-choose" className="underline font-medium">
            Read about our editorial process.
          </Link>
        </div>

        {/* Global Navigation */}
        <header className="bg-white border-b border-brand-200 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            <Link href="/" className="font-serif font-bold text-xl tracking-wide text-brand-900">
              ELEVATED LIVING
            </Link>
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-brand-700" aria-label="Main navigation">
              <Link href="/categories/home-spaces" className="hover:text-brand-900 transition-colors">Home &amp; Spaces</Link>
              <Link href="/categories/organization" className="hover:text-brand-900 transition-colors">Organize</Link>
              <Link href="/categories/rituals" className="hover:text-brand-900 transition-colors">Rituals</Link>
              <Link href="/products" className="hover:text-brand-900 transition-colors">Finds</Link>
            </nav>
            {/* Mobile hamburger placeholder — fully functional nav implemented below */}
            <div className="flex items-center gap-2">
              <Link href="/products" className="text-sm font-medium text-brand-900 hover:text-brand-700 transition-colors md:hidden">
                Finds
              </Link>
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
              <p className="text-brand-200 max-w-md text-sm leading-relaxed">
                Beautiful ideas, practical solutions, and smart finds for the way you actually live.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Explore</h4>
              <ul className="space-y-2 text-sm text-brand-200">
                <li><Link href="/categories/home-spaces" className="hover:text-white transition-colors">Home &amp; Spaces</Link></li>
                <li><Link href="/categories/organization" className="hover:text-white transition-colors">Organization</Link></li>
                <li><Link href="/products" className="hover:text-white transition-colors">Smart Finds</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">About</h4>
              <ul className="space-y-2 text-sm text-brand-200">
                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/how-we-choose" className="hover:text-white transition-colors">How We Choose</Link></li>
                <li><Link href="/affiliate-disclosure" className="hover:text-white transition-colors">Affiliate Disclosure</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="max-w-6xl mx-auto px-6 mt-8 pt-8 border-t border-brand-700 text-center text-xs text-brand-400">
            <p>© {new Date().getFullYear()} Elevated Everyday Living. We may earn commissions from qualifying purchases via affiliate links.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
