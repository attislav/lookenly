/**
 * Site Configuration
 *
 * This file contains all site-specific settings that can be customized
 * for different niches (Fashion, Fitness, Food, Tech, etc.)
 *
 * For the generator tool: This entire config can be generated/customized
 * based on user input and niche selection.
 */

export interface SiteConfig {
  // Basic Site Information
  site: {
    name: string;
    tagline: string;
    description: string;
    url: string;
    wordpressUrl: string;
    language: string;
    locale: string;
  };

  // Brand Identity
  brand: {
    colors: {
      primary: string;
      secondary: string;
      accent: string;
      background: string;
      text: string;
    };
    typography: {
      headingFont: string;
      bodyFont: string;
    };
    logo?: {
      text: string;
      subtitle?: string;
    };
  };

  // Content Settings
  content: {
    postsPerPage: number;
    relatedPostsCount: number;
    excerptLength: number;
    featuredImageRatio: string; // e.g., "3:2", "16:9", "4:3"
    showAuthor: boolean;
    showDate: boolean;
    showCategories: boolean;
    showTags: boolean;
  };

  // Navigation
  navigation: {
    header: Array<{
      label: string;
      href: string;
      external?: boolean;
    }>;
    footer: {
      sections: Array<{
        title: string;
        links: Array<{
          label: string;
          href: string;
          external?: boolean;
        }>;
      }>;
    };
  };

  // Social Media
  social: {
    pinterest?: string;
    instagram?: string;
    facebook?: string;
    twitter?: string;
    youtube?: string;
    tiktok?: string;
  };

  // Analytics & Tracking
  analytics: {
    googleAnalytics?: string;
    googleAdsense?: string;
    facebookPixel?: string;
    pinterestTag?: string;
  };

  // Legal Information
  legal: {
    companyName: string;
    contactEmail: string;
    country: string;
    jurisdiction: string;
  };

  // Hero Section (Homepage)
  hero: {
    title: string;
    subtitle: string;
    backgroundImage: string;
    cta?: {
      text: string;
      href: string;
    };
  };

  // Features / Highlights
  features?: Array<{
    title: string;
    description: string;
    icon?: string;
  }>;

  // SEO Defaults
  seo: {
    titleTemplate: string; // e.g., "%s | Site Name"
    defaultTitle: string;
    defaultDescription: string;
    twitterHandle?: string;
  };
}

/**
 * Current Site Configuration (Lookenly - Fashion Blog)
 */
export const siteConfig: SiteConfig = {
  site: {
    name: "Lookenly",
    tagline: "Fashion, Beauty & Lifestyle",
    description: "Discover the latest trends in fashion, beauty tips, and lifestyle inspiration.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://lookenly.com",
    wordpressUrl: process.env.NEXT_PUBLIC_WORDPRESS_API_URL?.replace('/graphql', '') || "https://wp.lookenly.com",
    language: "en",
    locale: "en_US",
  },

  brand: {
    colors: {
      primary: "#000000",      // Black
      secondary: "#f5f5f4",    // Off-white/Neutral
      accent: "#f59e0b",       // Gold/Amber
      background: "#fafaf9",   // Very light beige
      text: "#171717",         // Near-black for text
    },
    typography: {
      headingFont: "Playfair Display",
      bodyFont: "Montserrat",
    },
    logo: {
      text: "LOOKENLY",
      subtitle: "Fashion & Lifestyle",
    },
  },

  content: {
    postsPerPage: 12,
    relatedPostsCount: 5,
    excerptLength: 160,
    featuredImageRatio: "3:2", // Horizontal format (Pinterest optimized)
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
            { label: "Pinterest", href: "https://pinterest.com/lookenly", external: true },
            { label: "Instagram", href: "https://instagram.com/lookenly", external: true },
          ],
        },
      ],
    },
  },

  social: {
    pinterest: "https://pinterest.com/lookenly",
    instagram: "https://instagram.com/lookenly",
    // facebook: "",
    // twitter: "",
    // youtube: "",
    // tiktok: "",
  },

  analytics: {
    // googleAnalytics: "G-XXXXXXXXXX",
    // googleAdsense: "ca-pub-XXXXXXXXXXXXXXXX",
    // facebookPixel: "XXXXXXXXXXXXXXXX",
    // pinterestTag: "XXXXXXXXXXXXX",
  },

  legal: {
    companyName: "Triple A Digital",
    contactEmail: "hey@lookenly.com",
    country: "Germany",
    jurisdiction: "Germany",
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
    titleTemplate: "%s | Lookenly",
    defaultTitle: "Lookenly - Fashion, Beauty & Lifestyle",
    defaultDescription: "Discover the latest trends in fashion, beauty tips, and lifestyle inspiration. Your daily dose of style and elegance.",
    // twitterHandle: "@lookenly",
  },
};

/**
 * Helper function to get nested config values safely
 */
export function getConfigValue<T>(path: string, defaultValue?: T): T | undefined {
  const keys = path.split('.');
  let value: any = siteConfig;

  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = value[key];
    } else {
      return defaultValue;
    }
  }

  return value as T;
}
