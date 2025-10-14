/**
 * Fashion/Beauty/Lifestyle Blog Preset
 *
 * Design: Elegant, luxurious, minimalist
 * Colors: Black, Gold, Beige
 * Target Audience: Fashion-conscious, style-oriented
 * Primary Platform: Pinterest
 */

import { SiteConfig } from '../site.config';

export const fashionPreset: Partial<SiteConfig> = {
  site: {
    name: "StyleName", // Placeholder - will be customized
    tagline: "Fashion, Beauty & Lifestyle",
    description: "Discover the latest trends in fashion, beauty tips, and lifestyle inspiration.",
    url: "https://example.com",
    wordpressUrl: "https://wp.example.com",
    language: "en",
    locale: "en_US",
  },

  brand: {
    colors: {
      primary: "#000000",      // Black - elegant, timeless
      secondary: "#f5f5f4",    // Off-white/Stone
      accent: "#f59e0b",       // Gold/Amber - luxury
      background: "#fafaf9",   // Very light warm gray
      text: "#171717",         // Near-black
    },
    typography: {
      headingFont: "Playfair Display", // Serif - elegant
      bodyFont: "Montserrat",          // Sans-serif - clean
    },
    logo: {
      text: "SITENAME",
      subtitle: "Fashion & Lifestyle",
    },
  },

  content: {
    postsPerPage: 12,
    relatedPostsCount: 5,
    excerptLength: 160,
    featuredImageRatio: "3:2", // Horizontal - Pinterest optimized
    showAuthor: true,
    showDate: true,
    showCategories: true,
    showTags: true,
  },

  navigation: {
    header: [
      { label: "Home", href: "/" },
      { label: "Fashion", href: "/category/fashion" },
      { label: "Beauty", href: "/category/beauty" },
      { label: "Lifestyle", href: "/category/lifestyle" },
      { label: "About", href: "/about" },
    ],
    footer: {
      sections: [
        {
          title: "Explore",
          links: [
            { label: "Fashion", href: "/category/fashion" },
            { label: "Beauty", href: "/category/beauty" },
            { label: "Lifestyle", href: "/category/lifestyle" },
            { label: "About", href: "/about" },
          ],
        },
        {
          title: "Legal",
          links: [
            { label: "Privacy Policy", href: "/privacy" },
            { label: "Terms of Service", href: "/terms" },
            { label: "Disclaimer", href: "/disclaimer" },
          ],
        },
        {
          title: "Follow",
          links: [
            { label: "Pinterest", href: "https://pinterest.com/username", external: true },
            { label: "Instagram", href: "https://instagram.com/username", external: true },
          ],
        },
      ],
    },
  },

  hero: {
    title: "Discover Your Style",
    subtitle: "Fashion, Beauty & Lifestyle Inspiration",
    backgroundImage: "/images/hero-bg.jpg",
    cta: {
      text: "Explore Now",
      href: "#categories",
    },
  },

  seo: {
    titleTemplate: "%s | SiteName",
    defaultTitle: "SiteName - Fashion, Beauty & Lifestyle",
    defaultDescription: "Discover the latest trends in fashion, beauty tips, and lifestyle inspiration. Your daily dose of style and elegance.",
  },
};
