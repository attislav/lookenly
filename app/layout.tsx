import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import ScrollToTop from "@/components/ScrollToTop";
import Analytics from "@/components/Analytics";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lookenly | Fashion, Beauty & Lifestyle Blog",
  description: "Entdecke inspirierende Fashion-Trends, Beauty-Tipps und Lifestyle-Inspiration. Lookenly - Dein Blog für zeitlosen Stil und elegante Lebensart.",
  keywords: ["Fashion Blog", "Beauty Tipps", "Lifestyle", "Style Inspiration", "Mode Trends", "Lookenly", "Pinterest Fashion"],
  authors: [{ name: "Lookenly Team" }],
  openGraph: {
    title: "Lookenly | Fashion, Beauty & Lifestyle Blog",
    description: "Entdecke inspirierende Fashion-Trends, Beauty-Tipps und Lifestyle-Inspiration für zeitlosen Stil.",
    type: "website",
    siteName: "Lookenly",
    locale: "de_DE",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lookenly | Fashion, Beauty & Lifestyle Blog",
    description: "Entdecke inspirierende Fashion-Trends, Beauty-Tipps und Lifestyle-Inspiration.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: '', // Add Google Search Console verification here
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <head>
        {/* Pinterest Domain Verification - Optional */}
        <meta name="pinterest-rich-pin" content="true" />
      </head>
      <body className={`${playfair.variable} ${montserrat.variable} font-sans antialiased bg-neutral-50`}>
        <Analytics />
        <Navigation />
        {children}
        <ScrollToTop />
        <footer className="bg-black text-neutral-300 py-16 border-t border-neutral-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
              <div>
                <h3 className="font-playfair text-2xl font-bold mb-4 text-amber-100 tracking-wider">
                  Lookenly
                </h3>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  Where sophistication meets style
                </p>
              </div>
              <div>
                <h4 className="font-montserrat text-sm font-semibold mb-4 tracking-widest uppercase text-neutral-200">Categories</h4>
                <ul className="space-y-3 text-sm">
                  <li><a href="/category/fashion" className="text-neutral-400 hover:text-amber-200 transition-colors duration-200">Fashion</a></li>
                  <li><a href="/category/beauty" className="text-neutral-400 hover:text-amber-200 transition-colors duration-200">Beauty</a></li>
                  <li><a href="/category/lifestyle" className="text-neutral-400 hover:text-amber-200 transition-colors duration-200">Lifestyle</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-montserrat text-sm font-semibold mb-4 tracking-widest uppercase text-neutral-200">Connect</h4>
                <div className="flex gap-6 text-sm">
                  <a href="#" className="text-neutral-400 hover:text-amber-200 transition-colors duration-200">Pinterest</a>
                  <a href="#" className="text-neutral-400 hover:text-amber-200 transition-colors duration-200">Instagram</a>
                </div>
              </div>
            </div>
            <div className="border-t border-neutral-800 pt-8">
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 mb-4">
                <a href="/privacy" className="text-neutral-400 hover:text-amber-200 transition-colors duration-200 text-sm">
                  Privacy Policy
                </a>
                <a href="/terms" className="text-neutral-400 hover:text-amber-200 transition-colors duration-200 text-sm">
                  Terms of Service
                </a>
                <a href="/disclaimer" className="text-neutral-400 hover:text-amber-200 transition-colors duration-200 text-sm">
                  Disclaimer
                </a>
              </div>
              <p className="text-neutral-500 text-xs tracking-wider text-center">&copy; 2025 Lookenly. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
