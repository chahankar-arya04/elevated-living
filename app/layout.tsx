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
  description:
    "Practical guides, beauty discoveries, problem-solving finds and destination ideas to help you make better everyday choices.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://elevatedeverydayliving.com"
  ),
  openGraph: {
    siteName: "Elevated Everyday Living",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const NAV_LINKS = [
  { href: "/skin", label: "Skin" },
  { href: "/hair", label: "Hair" },
  { href: "/style", label: "Style" },
  { href: "/travel", label: "Travel" },
  { href: "/trending", label: "Trending" },
  { href: "/useful-finds", label: "Useful Finds" },
];

const FOOTER_EXPLORE = [
  { href: "/skin", label: "Skincare" },
  { href: "/hair", label: "Haircare" },
  { href: "/style", label: "Style & Outfits" },
  { href: "/travel", label: "Travel" },
  { href: "/trending", label: "Trending" },
  { href: "/useful-finds", label: "Useful Finds" },
];

const FOOTER_ABOUT = [
  { href: "/about", label: "About" },
  { href: "/how-we-choose", label: "How We Choose" },
  { href: "/affiliate-disclosure", label: "Affiliate Disclosure" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
];

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-brand-50 text-brand-950 flex flex-col min-h-screen`}
      >
        {/* Affiliate Disclosure Banner */}
        <div className="bg-brand-100 text-brand-800 text-xs py-2 text-center px-4 border-b border-brand-200">
          We may earn a commission from qualifying purchases via affiliate links.{" "}
          <Link href="/affiliate-disclosure" className="underline font-medium hover:text-brand-900">
            Learn more.
          </Link>
        </div>

        {/* Header */}
        <header className="bg-white border-b border-brand-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
            <Link
              href="/"
              className="font-serif font-bold text-lg tracking-wide text-brand-900 whitespace-nowrap shrink-0"
            >
              ELEVATED LIVING
            </Link>

            <nav
              className="hidden md:flex items-center gap-1 text-sm font-medium text-brand-700"
              aria-label="Main navigation"
            >
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-1.5 rounded-md hover:bg-brand-100 hover:text-brand-900 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2 shrink-0">
              <Link
                href="/products"
                className="hidden sm:inline-flex items-center gap-1 text-xs font-medium text-brand-700 hover:text-brand-900 border border-brand-200 rounded-md px-3 py-1.5 transition-colors hover:bg-brand-50"
              >
                All Finds
              </Link>
              <details className="md:hidden relative">
                <summary className="list-none cursor-pointer p-2 rounded-md hover:bg-brand-100 text-brand-900 select-none">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </svg>
                </summary>
                <div className="absolute right-0 top-full mt-1 w-52 bg-white border border-brand-200 rounded-lg shadow-lg py-2 z-50">
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block px-4 py-2 text-sm text-brand-800 hover:bg-brand-50 hover:text-brand-900"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="border-t border-brand-100 mt-2 pt-2">
                    <Link
                      href="/products"
                      className="block px-4 py-2 text-sm text-brand-800 hover:bg-brand-50 hover:text-brand-900"
                    >
                      All Finds
                    </Link>
                  </div>
                </div>
              </details>
            </div>
          </div>
        </header>

        <main className="flex-grow">{children}</main>

        {/* Footer */}
        <footer className="bg-brand-950 text-brand-200 pt-12 pb-6 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
              <div className="col-span-2">
                <div className="font-serif font-bold text-xl tracking-wide text-white mb-3">
                  ELEVATED LIVING
                </div>
                <p className="text-brand-400 text-sm leading-relaxed max-w-xs">
                  Practical guides, beauty discoveries, outfit ideas and useful finds to help you
                  make better everyday choices.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-4">
                  Explore
                </h4>
                <ul className="space-y-2">
                  {FOOTER_EXPLORE.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="text-sm text-brand-400 hover:text-white transition-colors"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-4">
                  About
                </h4>
                <ul className="space-y-2">
                  {FOOTER_ABOUT.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="text-sm text-brand-400 hover:text-white transition-colors"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-t border-brand-800 pt-6 text-center text-xs text-brand-600">
              &copy; {new Date().getFullYear()} Elevated Everyday Living. Content is for
              informational purposes. We may earn commissions from affiliate links.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
