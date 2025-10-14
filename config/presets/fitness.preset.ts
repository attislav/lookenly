/**
 * Fitness/Health/Wellness Blog Preset
 *
 * Design: Energetic, motivating, clean
 * Colors: Electric Blue, Bright Green, White
 * Target Audience: Fitness enthusiasts, health-conscious
 * Primary Platform: Instagram, YouTube
 */

import { SiteConfig } from '../site.config';

export const fitnessPreset: Partial<SiteConfig> = {
  site: {
    name: "FitName", // Placeholder - will be customized
    tagline: "Fitness, Health & Wellness",
    description: "Transform your body and mind with expert fitness tips, workout routines, and wellness advice.",
    url: "https://example.com",
    wordpressUrl: "https://wp.example.com",
    language: "en",
    locale: "en_US",
  },

  brand: {
    colors: {
      primary: "#0ea5e9",      // Electric Blue - energy, trust
      secondary: "#10b981",    // Bright Green - health, vitality
      accent: "#f59e0b",       // Orange - motivation, action
      background: "#ffffff",   // Pure white - clean, fresh
      text: "#0f172a",         // Dark slate
    },
    typography: {
      headingFont: "Bebas Neue",  // Bold, impactful sans-serif
      bodyFont: "Inter",          // Modern, highly readable
    },
    logo: {
      text: "SITENAME",
      subtitle: "Fitness & Wellness",
    },
  },

  content: {
    postsPerPage: 12,
    relatedPostsCount: 6,
    excerptLength: 150,
    featuredImageRatio: "16:9", // Wide format - video-friendly
    showAuthor: true,
    showDate: true,
    showCategories: true,
    showTags: true,
  },

  navigation: {
    header: [
      { label: "Home", href: "/" },
      { label: "Workouts", href: "/category/workouts" },
      { label: "Nutrition", href: "/category/nutrition" },
      { label: "Wellness", href: "/category/wellness" },
      { label: "About", href: "/about" },
    ],
    footer: {
      sections: [
        {
          title: "Explore",
          links: [
            { label: "Workouts", href: "/category/workouts" },
            { label: "Nutrition", href: "/category/nutrition" },
            { label: "Wellness", href: "/category/wellness" },
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
          title: "Connect",
          links: [
            { label: "Instagram", href: "https://instagram.com/username", external: true },
            { label: "YouTube", href: "https://youtube.com/@username", external: true },
          ],
        },
      ],
    },
  },

  hero: {
    title: "Transform Your Life",
    subtitle: "Fitness, Nutrition & Wellness for a Better You",
    backgroundImage: "/images/hero-bg.jpg",
    cta: {
      text: "Start Now",
      href: "#workouts",
    },
  },

  seo: {
    titleTemplate: "%s | SiteName",
    defaultTitle: "SiteName - Fitness, Health & Wellness",
    defaultDescription: "Transform your body and mind with expert fitness tips, workout routines, nutrition advice, and wellness strategies.",
  },
};
