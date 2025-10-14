import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import ScrollToTop from "@/components/ScrollToTop";
import Analytics from "@/components/Analytics";
import { siteConfig } from "@/config/site.config";

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
  title: siteConfig.seo.defaultTitle,
  description: siteConfig.seo.defaultDescription,
  keywords: ["Fashion Blog", "Beauty Tips", "Lifestyle", "Style Inspiration", siteConfig.site.name],
  authors: [{ name: `${siteConfig.site.name} Team` }],
  openGraph: {
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.defaultDescription,
    type: "website",
    siteName: siteConfig.site.name,
    locale: siteConfig.site.locale,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.defaultDescription,
    handle: siteConfig.seo.twitterHandle,
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
    <html lang={siteConfig.site.language}>
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
                  {siteConfig.site.name}
                </h3>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  {siteConfig.site.tagline}
                </p>
              </div>
              {siteConfig.navigation.footer.sections.map((section, index) => (
                <div key={section.title}>
                  <h4 className="font-montserrat text-sm font-semibold mb-4 tracking-widest uppercase text-neutral-200">
                    {section.title}
                  </h4>
                  <ul className="space-y-3 text-sm">
                    {section.links.map((link) => (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          className="text-neutral-400 hover:text-amber-200 transition-colors duration-200"
                          {...(link.external && { target: "_blank", rel: "noopener noreferrer" })}
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="border-t border-neutral-800 pt-8">
              <p className="text-neutral-500 text-xs tracking-wider text-center">
                &copy; {new Date().getFullYear()} {siteConfig.site.name}. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
