/**
 * Food/Recipe/Cooking Blog Preset
 *
 * Design: Warm, inviting, appetizing
 * Colors: Warm Orange, Earthy Brown, Cream
 * Target Audience: Home cooks, food lovers
 * Primary Platform: Pinterest, Instagram
 */

import { SiteConfig } from '../site.config';

export const foodPreset: Partial<SiteConfig> = {
  site: {
    name: "FoodName", // Placeholder - will be customized
    tagline: "Recipes, Cooking & Food",
    description: "Discover delicious recipes, cooking tips, and culinary inspiration for every occasion.",
    url: "https://example.com",
    wordpressUrl: "https://wp.example.com",
    language: "en",
    locale: "en_US",
  },

  brand: {
    colors: {
      primary: "#ea580c",      // Warm Orange - appetite, warmth
      secondary: "#78716c",    // Stone Brown - earthy, natural
      accent: "#84cc16",       // Fresh Green - herbs, freshness
      background: "#fffbeb",   // Warm cream - inviting
      text: "#292524",         // Dark brown
    },
    typography: {
      headingFont: "Merriweather",  // Serif - traditional, trustworthy
      bodyFont: "Open Sans",        // Clean, easy to read (recipes!)
    },
    logo: {
      text: "SITENAME",
      subtitle: "Recipes & Cooking",
    },
  },

  content: {
    postsPerPage: 12,
    relatedPostsCount: 6,
    excerptLength: 140,
    featuredImageRatio: "4:3", // Square-ish - food photography standard
    showAuthor: true,
    showDate: true,
    showCategories: true,
    showTags: true,
  },

  navigation: {
    header: [
      { label: "Home", href: "/" },
      { label: "Recipes", href: "/category/recipes" },
      { label: "Cooking Tips", href: "/category/cooking-tips" },
      { label: "Desserts", href: "/category/desserts" },
      { label: "About", href: "/about" },
    ],
    footer: {
      sections: [
        {
          title: "Browse",
          links: [
            { label: "All Recipes", href: "/category/recipes" },
            { label: "Cooking Tips", href: "/category/cooking-tips" },
            { label: "Desserts", href: "/category/desserts" },
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
    title: "Cooking Made Simple",
    subtitle: "Delicious Recipes for Every Occasion",
    backgroundImage: "/images/hero-bg.jpg",
    cta: {
      text: "Browse Recipes",
      href: "#recipes",
    },
  },

  seo: {
    titleTemplate: "%s | SiteName",
    defaultTitle: "SiteName - Recipes, Cooking & Food",
    defaultDescription: "Discover delicious recipes, expert cooking tips, and culinary inspiration. From quick weeknight dinners to impressive desserts.",
  },
};
