/**
 * Language Configuration System
 *
 * Provides translations and language-specific content for the site.
 * Supports: English (en), German (de), Spanish (es)
 */

export interface LanguageConfig {
  code: string; // ISO 639-1 code
  name: string; // Language name in English
  nativeName: string; // Language name in native language

  // Legal Pages Configuration
  legalPages: {
    // Privacy-related page
    privacy: {
      slug: string; // URL slug (e.g., "privacy", "datenschutz", "privacidad")
      title: string; // Page title
      menuLabel: string; // Navigation label
    };

    // Terms/Impressum page
    terms: {
      slug: string;
      title: string;
      menuLabel: string;
    };

    // Disclaimer/Additional legal page
    disclaimer?: {
      slug: string;
      title: string;
      menuLabel: string;
    };
  };

  // Common UI translations
  ui: {
    navigation: {
      home: string;
      about: string;
      search: string;
      categories: string;
    };
    blog: {
      readMore: string;
      relatedPosts: string;
      shareOn: string;
      publishedOn: string;
      by: string;
      in: string;
      tags: string;
      minutes: string;
      minRead: string;
    };
    search: {
      placeholder: string;
      noResults: string;
      resultsFor: string;
      searching: string;
    };
    footer: {
      allRightsReserved: string;
      legal: string;
      explore: string;
      follow: string;
    };
  };
}

// Import language configurations
import { enConfig } from './en';
import { deConfig } from './de';
import { esConfig } from './es';

export const languages = {
  en: enConfig,
  de: deConfig,
  es: esConfig,
} as const;

export type SupportedLanguage = keyof typeof languages;

/**
 * Get language configuration by code
 */
export function getLanguageConfig(code: SupportedLanguage): LanguageConfig {
  return languages[code];
}

/**
 * Get all supported languages
 */
export function getSupportedLanguages(): SupportedLanguage[] {
  return Object.keys(languages) as SupportedLanguage[];
}

/**
 * Check if language is supported
 */
export function isLanguageSupported(code: string): code is SupportedLanguage {
  return code in languages;
}
