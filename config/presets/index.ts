/**
 * Niche Presets for Site Generator
 *
 * Each preset contains niche-specific configurations including:
 * - Brand colors and typography
 * - Navigation structure
 * - Content settings
 * - SEO defaults
 *
 * Usage:
 * ```typescript
 * import { fashionPreset, fitnessPreset } from '@/config/presets';
 * import { SiteConfig } from '@/config/site.config';
 *
 * // Merge preset with custom values
 * const config: SiteConfig = {
 *   ...fashionPreset,
 *   site: {
 *     ...fashionPreset.site,
 *     name: "My Fashion Blog"
 *   }
 * };
 * ```
 */

export { fashionPreset } from './fashion.preset';
export { fitnessPreset } from './fitness.preset';
export { foodPreset } from './food.preset';
export { techPreset } from './tech.preset';

/**
 * Available niche types
 */
export type NicheType = 'fashion' | 'fitness' | 'food' | 'tech';

/**
 * Preset registry for dynamic loading
 */
export const presets = {
  fashion: () => import('./fashion.preset').then(m => m.fashionPreset),
  fitness: () => import('./fitness.preset').then(m => m.fitnessPreset),
  food: () => import('./food.preset').then(m => m.foodPreset),
  tech: () => import('./tech.preset').then(m => m.techPreset),
} as const;

/**
 * Get preset by niche type
 */
export async function getPreset(niche: NicheType) {
  const loader = presets[niche];
  if (!loader) {
    throw new Error(`Unknown niche type: ${niche}`);
  }
  return await loader();
}

/**
 * Niche metadata for UI/Generator
 */
export const nicheMetadata = {
  fashion: {
    label: "Fashion & Beauty",
    description: "Elegant design for fashion, beauty, and lifestyle blogs",
    primaryPlatform: "Pinterest",
    colorScheme: "Black, Gold, Beige",
    targetAudience: "Fashion-conscious, style-oriented",
  },
  fitness: {
    label: "Fitness & Health",
    description: "Energetic design for fitness, health, and wellness blogs",
    primaryPlatform: "Instagram, YouTube",
    colorScheme: "Blue, Green, Orange",
    targetAudience: "Fitness enthusiasts, health-conscious",
  },
  food: {
    label: "Food & Recipes",
    description: "Warm design for food, recipe, and cooking blogs",
    primaryPlatform: "Pinterest, Instagram",
    colorScheme: "Orange, Brown, Cream",
    targetAudience: "Home cooks, food lovers",
  },
  tech: {
    label: "Tech & Code",
    description: "Modern design for tech, software, and programming blogs",
    primaryPlatform: "Twitter, LinkedIn",
    colorScheme: "Navy, Purple, Cyan",
    targetAudience: "Developers, tech enthusiasts",
  },
} as const;
