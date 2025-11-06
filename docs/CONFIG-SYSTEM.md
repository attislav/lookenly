# Site Configuration System

## Overview

The config system allows you to customize every aspect of your blog without touching the codebase. This is the foundation for the **Multi-Niche Website Generator Tool**.

---

## File Structure

```
config/
├── site.config.ts          # Main configuration file
└── presets/
    ├── index.ts            # Preset registry & helpers
    ├── fashion.preset.ts   # Fashion/Beauty blog preset
    ├── fitness.preset.ts   # Fitness/Health blog preset
    ├── food.preset.ts      # Food/Recipe blog preset
    └── tech.preset.ts      # Tech/Programming blog preset
```

---

## Configuration Sections

### 1. Site Information
```typescript
site: {
  name: string;              // Site name (e.g., "Lookenly")
  tagline: string;           // Tagline/subtitle
  description: string;       // Site description
  url: string;               // Production URL
  wordpressUrl: string;      // WordPress API URL
  language: string;          // Language code (e.g., "en", "de")
  locale: string;            // Locale (e.g., "en_US", "de_DE")
}
```

### 2. Brand Identity
```typescript
brand: {
  colors: {
    primary: string;         // Main brand color (hex)
    secondary: string;       // Secondary color
    accent: string;          // Accent/highlight color
    background: string;      // Background color
    text: string;            // Text color
  };
  typography: {
    headingFont: string;     // Google Font for headings
    bodyFont: string;        // Google Font for body text
  };
  logo?: {
    text: string;            // Logo text
    subtitle?: string;       // Optional subtitle
  };
}
```

### 3. Content Settings
```typescript
content: {
  postsPerPage: number;           // Posts per page (pagination)
  relatedPostsCount: number;      // Related posts sidebar/footer
  excerptLength: number;          // Excerpt length (characters)
  featuredImageRatio: string;     // Image ratio ("3:2", "16:9", "4:3")
  showAuthor: boolean;            // Show author info
  showDate: boolean;              // Show publish date
  showCategories: boolean;        // Show category labels
  showTags: boolean;              // Show tag labels
}
```

### 4. Navigation
```typescript
navigation: {
  header: Array<{
    label: string;           // Menu item label
    href: string;            // Link URL
    external?: boolean;      // Is external link?
  }>;
  footer: {
    sections: Array<{
      title: string;         // Footer section title
      links: Array<{
        label: string;       // Link label
        href: string;        // Link URL
        external?: boolean;  // Is external link?
      }>;
    }>;
  };
}
```

### 5. Social Media
```typescript
social: {
  pinterest?: string;        // Pinterest profile URL
  instagram?: string;        // Instagram profile URL
  facebook?: string;         // Facebook profile URL
  twitter?: string;          // Twitter/X profile URL
  youtube?: string;          // YouTube channel URL
  tiktok?: string;           // TikTok profile URL
}
```

### 6. Analytics & Tracking
```typescript
analytics: {
  googleAnalytics?: string;  // GA tracking ID (G-XXXXXXXXXX)
  googleAdsense?: string;    // AdSense ID
  facebookPixel?: string;    // Meta Pixel ID
  pinterestTag?: string;     // Pinterest Tag ID
}
```

### 7. Legal Information
```typescript
legal: {
  companyName: string;       // Company/business name
  contactEmail: string;      // Contact email
  country: string;           // Country
  jurisdiction: string;      // Legal jurisdiction
}
```

### 8. Hero Section
```typescript
hero: {
  title: string;             // Hero title
  subtitle: string;          // Hero subtitle
  backgroundImage: string;   // Hero background image path
  cta?: {
    text: string;            // Call-to-action button text
    href: string;            // CTA link
  };
}
```

### 9. SEO Defaults
```typescript
seo: {
  titleTemplate: string;     // Title template ("%s | Site Name")
  defaultTitle: string;      // Default page title
  defaultDescription: string;// Default meta description
  twitterHandle?: string;    // Twitter handle (@username)
}
```

---

## Using the Config System

### In React Components

```typescript
import { siteConfig } from '@/config/site.config';

export default function MyComponent() {
  return (
    <div>
      <h1>{siteConfig.site.name}</h1>
      <p>{siteConfig.site.tagline}</p>
    </div>
  );
}
```

### With Presets

```typescript
import { fashionPreset } from '@/config/presets';
import { SiteConfig } from '@/config/site.config';

// Merge preset with custom values
const config: SiteConfig = {
  ...fashionPreset,
  site: {
    ...fashionPreset.site,
    name: "My Fashion Blog",
    url: "https://myfashionblog.com"
  }
};
```

### Dynamic Preset Loading

```typescript
import { getPreset } from '@/config/presets';

const preset = await getPreset('fitness'); // Load fitness preset
```

---

## Available Presets

### 1. Fashion Preset
- **Colors:** Black, Gold, Beige
- **Typography:** Playfair Display + Montserrat
- **Vibe:** Elegant, luxurious, minimalist
- **Platform:** Pinterest-optimized
- **Image Ratio:** 3:2 (horizontal)

### 2. Fitness Preset
- **Colors:** Electric Blue, Bright Green, Orange
- **Typography:** Bebas Neue + Inter
- **Vibe:** Energetic, motivating, clean
- **Platform:** Instagram, YouTube
- **Image Ratio:** 16:9 (wide)

### 3. Food Preset
- **Colors:** Warm Orange, Earthy Brown, Cream
- **Typography:** Merriweather + Open Sans
- **Vibe:** Warm, inviting, appetizing
- **Platform:** Pinterest, Instagram
- **Image Ratio:** 4:3 (square-ish)

### 4. Tech Preset
- **Colors:** Dark Navy, Electric Purple, Cyan
- **Typography:** JetBrains Mono + Inter
- **Vibe:** Modern, sleek, professional
- **Platform:** Twitter, LinkedIn, Dev.to
- **Image Ratio:** 16:9 (wide)

---

## For the Generator Tool

### 1. User Selects Niche
```typescript
// User picks: "Fitness"
const selectedPreset = await getPreset('fitness');
```

### 2. User Customizes Values
```typescript
// UI form collects:
const userInput = {
  siteName: "FitLife Pro",
  siteUrl: "https://fitlifepro.com",
  wordpressUrl: "https://wp.fitlifepro.com",
  contactEmail: "hello@fitlifepro.com",
  companyName: "FitLife Inc.",
  // ... etc
};
```

### 3. Generate Config File
```typescript
const finalConfig = {
  ...selectedPreset,
  site: {
    ...selectedPreset.site,
    name: userInput.siteName,
    url: userInput.siteUrl,
    wordpressUrl: userInput.wordpressUrl,
  },
  legal: {
    ...selectedPreset.legal,
    companyName: userInput.companyName,
    contactEmail: userInput.contactEmail,
  },
  // ... merge all user inputs
};

// Write to config/site.config.ts
fs.writeFileSync(
  'config/site.config.ts',
  `export const siteConfig = ${JSON.stringify(finalConfig, null, 2)};`
);
```

### 4. Deploy to FTP/Git
- Upload customized project to user's hosting
- Or commit to GitHub repo for Vercel deployment

---

## Color Palette Guidelines

### Fashion/Beauty
- **Primary:** Black (#000000) - timeless, elegant
- **Accent:** Gold/Amber (#f59e0b) - luxury
- **Background:** Off-white (#fafaf9) - clean

### Fitness/Health
- **Primary:** Electric Blue (#0ea5e9) - energy, trust
- **Accent:** Bright Green (#10b981) - health, vitality
- **Background:** White (#ffffff) - clean, fresh

### Food/Recipes
- **Primary:** Warm Orange (#ea580c) - appetite, warmth
- **Accent:** Fresh Green (#84cc16) - herbs, freshness
- **Background:** Warm Cream (#fffbeb) - inviting

### Tech/Programming
- **Primary:** Dark Navy (#1e293b) - professional, tech
- **Accent:** Electric Purple (#8b5cf6) - innovation
- **Background:** Light Blue-Gray (#f8fafc) - modern

---

## Font Pairing Guidelines

### Serif + Sans-Serif (Classic)
- **Fashion:** Playfair Display + Montserrat
- **Food:** Merriweather + Open Sans

### Sans-Serif + Sans-Serif (Modern)
- **Fitness:** Bebas Neue + Inter
- **Tech:** JetBrains Mono + Inter

---

## Environment Variables

Config system uses these environment variables:

```bash
# .env.local
NEXT_PUBLIC_WORDPRESS_API_URL=https://wp.example.com/graphql
NEXT_PUBLIC_SITE_URL=https://example.com
```

These are referenced in `siteConfig.site.url` and `siteConfig.site.wordpressUrl`.

---

## Testing the Config System

### Switch Between Presets
```bash
# 1. Backup current config
cp config/site.config.ts config/site.config.backup.ts

# 2. Test fitness preset
# Replace siteConfig with fitnessPreset in site.config.ts

# 3. Restart dev server
npm run dev

# 4. Check site appearance - should look like fitness blog!
```

### Verify All Pages
- ✅ Homepage: Hero, categories, posts
- ✅ Navigation: Logo, menu items
- ✅ Footer: Sections, links, copyright
- ✅ About page: Site name, description
- ✅ Legal pages: Company info, email

---

## Components Using Config

### Core Components
- `app/layout.tsx` - Metadata, footer
- `components/Navigation.tsx` - Logo, menu
- `app/page.tsx` - Hero, about section
- Legal pages - Company info

### Planned
- Category colors (per-category branding)
- Dynamic theme switching
- User-selectable color schemes

---

## Next Steps for Generator

1. **UI for Config Generation:**
   - Form inputs for all config fields
   - Niche preset selector
   - Live preview of design

2. **Automation:**
   - Generate `site.config.ts` from user input
   - Upload to FTP or push to Git
   - Create WordPress instance via API

3. **WordPress Integration:**
   - Auto-create categories based on niche
   - Install required plugins (WPGraphQL)
   - Configure CORS settings

4. **Testing:**
   - Validate all config fields
   - Test across different niches
   - Ensure deployment works

---

**Last Updated:** 2025-01-13
**Status:** Complete - Ready for Generator Integration
