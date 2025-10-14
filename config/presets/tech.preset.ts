/**
 * Tech/Software/Programming Blog Preset
 *
 * Design: Modern, sleek, professional
 * Colors: Dark Navy, Electric Purple, Cyan
 * Target Audience: Developers, tech enthusiasts
 * Primary Platform: Twitter/X, LinkedIn, Dev.to
 */

import { SiteConfig } from '../site.config';

export const techPreset: Partial<SiteConfig> = {
  site: {
    name: "TechName", // Placeholder - will be customized
    tagline: "Tech, Code & Innovation",
    description: "Expert insights on software development, tech trends, and programming tutorials.",
    url: "https://example.com",
    wordpressUrl: "https://wp.example.com",
    language: "en",
    locale: "en_US",
  },

  brand: {
    colors: {
      primary: "#1e293b",      // Dark Navy - professional, tech
      secondary: "#8b5cf6",    // Electric Purple - innovation
      accent: "#06b6d4",       // Cyan - digital, modern
      background: "#f8fafc",   // Very light blue-gray
      text: "#0f172a",         // Dark slate
    },
    typography: {
      headingFont: "JetBrains Mono",  // Monospace - code-like
      bodyFont: "Inter",              // Modern, highly readable
    },
    logo: {
      text: "SITENAME",
      subtitle: "Tech & Development",
    },
  },

  content: {
    postsPerPage: 10,
    relatedPostsCount: 5,
    excerptLength: 180,
    featuredImageRatio: "16:9", // Wide format - tech/video standard
    showAuthor: true,
    showDate: true,
    showCategories: true,
    showTags: true,
  },

  navigation: {
    header: [
      { label: "Home", href: "/" },
      { label: "Tutorials", href: "/category/tutorials" },
      { label: "Reviews", href: "/category/reviews" },
      { label: "News", href: "/category/news" },
      { label: "About", href: "/about" },
    ],
    footer: {
      sections: [
        {
          title: "Content",
          links: [
            { label: "Tutorials", href: "/category/tutorials" },
            { label: "Reviews", href: "/category/reviews" },
            { label: "Tech News", href: "/category/news" },
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
          title: "Social",
          links: [
            { label: "Twitter", href: "https://twitter.com/username", external: true },
            { label: "GitHub", href: "https://github.com/username", external: true },
          ],
        },
      ],
    },
  },

  hero: {
    title: "Code. Learn. Innovate.",
    subtitle: "Expert Tech Insights & Programming Tutorials",
    backgroundImage: "/images/hero-bg.jpg",
    cta: {
      text: "Start Learning",
      href: "#tutorials",
    },
  },

  seo: {
    titleTemplate: "%s | SiteName",
    defaultTitle: "SiteName - Tech, Code & Innovation",
    defaultDescription: "Expert insights on software development, programming tutorials, tech reviews, and the latest industry trends.",
  },
};
