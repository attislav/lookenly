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

        {/* Dynamic Theme Colors and Fonts from site.config.ts */}
        <style dangerouslySetInnerHTML={{
          __html: `
            :root {
              --color-primary: ${siteConfig.brand.colors.primary};
              --color-secondary: ${siteConfig.brand.colors.secondary};
              --color-accent: ${siteConfig.brand.colors.accent};
              --color-background: ${siteConfig.brand.colors.background};
              --color-text: ${siteConfig.brand.colors.text};
              --color-text-secondary: ${siteConfig.brand.colors.textSecondary || siteConfig.brand.colors.text};
              --font-heading: '${siteConfig.brand.typography.headingFont}', serif;
              --font-body: '${siteConfig.brand.typography.bodyFont}', sans-serif;
            }
          `
        }} />

        {/* Custom Head Scripts */}
        {siteConfig.customScripts?.headScripts && (
          <div dangerouslySetInnerHTML={{ __html: siteConfig.customScripts.headScripts }} />
        )}
      </head>
      <body className={`${playfair.variable} ${montserrat.variable} font-sans antialiased bg-bg-custom`}>
        {/* Custom Body Start Scripts */}
        {siteConfig.customScripts?.bodyStartScripts && (
          <div dangerouslySetInnerHTML={{ __html: siteConfig.customScripts.bodyStartScripts }} />
        )}

        <Analytics />
        <Navigation />
        {children}
        <ScrollToTop />
        <footer className="bg-primary text-text-secondary py-16 border-t border-primary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
              <div>
                <h3 className="font-playfair text-2xl font-bold mb-4 text-accent tracking-wider">
                  {siteConfig.site.name}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {siteConfig.site.tagline}
                </p>
              </div>
              {siteConfig.navigation.footer.sections.map((section, index) => (
                <div key={section.title}>
                  <h4 className="font-montserrat text-sm font-semibold mb-4 tracking-widest uppercase text-text-secondary">
                    {section.title}
                  </h4>
                  {section.title === 'Follow' ? (
                    // Social Media Icons
                    <div className="flex gap-4">
                      {section.links.map((link) => {
                        const getSocialIcon = (label: string) => {
                          switch(label.toLowerCase()) {
                            case 'pinterest':
                              return (
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                                </svg>
                              );
                            case 'instagram':
                              return (
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                              );
                            case 'facebook':
                              return (
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                </svg>
                              );
                            case 'twitter':
                              return (
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                              );
                            case 'youtube':
                              return (
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                </svg>
                              );
                            case 'tiktok':
                              return (
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                                </svg>
                              );
                            case 'email':
                              return (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                              );
                            default:
                              return null;
                          }
                        };
                        return (
                          <a
                            key={link.href}
                            href={link.href}
                            className="text-text-secondary hover:text-accent transition-colors duration-200"
                            aria-label={link.label}
                            {...(link.external && { target: "_blank", rel: "noopener noreferrer" })}
                          >
                            {getSocialIcon(link.label)}
                          </a>
                        );
                      })}
                    </div>
                  ) : (
                    // Regular text links
                    <ul className="space-y-3 text-sm">
                      {section.links.map((link) => (
                        <li key={link.href}>
                          <a
                            href={link.href}
                            className="text-text-secondary hover:text-accent transition-colors duration-200"
                            {...(link.external && { target: "_blank", rel: "noopener noreferrer" })}
                          >
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
            <div className="border-t border-primary pt-8">
              <p className="text-text-secondary text-xs tracking-wider text-center">
                &copy; {new Date().getFullYear()} {siteConfig.site.name}. All rights reserved.
              </p>
            </div>
          </div>
        </footer>

        {/* Custom Body End Scripts */}
        {siteConfig.customScripts?.bodyEndScripts && (
          <div dangerouslySetInnerHTML={{ __html: siteConfig.customScripts.bodyEndScripts }} />
        )}
      </body>
    </html>
  );
}
