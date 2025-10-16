# AI Design Instructions

This file provides guidance for AI assistants when making design changes to this Next.js site.

**Important:** You are helping to customize a generated Next.js site. All configuration is centralized in `config/site.config.ts`.

---

## 🎯 Your Role

You help modify the **visual design and styling** of this site. You should:
- ✅ Change colors, fonts, spacing, layouts
- ✅ Modify component styling (Tailwind CSS classes)
- ✅ Update brand colors in `config/site.config.ts`
- ✅ Adjust page layouts and component arrangements
- ❌ **NOT** change business logic or data fetching
- ❌ **NOT** modify WordPress GraphQL queries
- ❌ **NOT** change routing or Next.js configuration

---

## 📁 Files You Can Modify for Design Changes

### **1. Brand Colors & Config** (MOST IMPORTANT)
**File:** `config/site.config.ts`

This is the **central configuration** file. When changing brand colors, ALWAYS update this file:

```typescript
brand: {
  colors: {
    primary: "#000000",      // Main brand color
    secondary: "#f5f5f4",    // Secondary/neutral color
    accent: "#f59e0b",       // Accent/highlight color
    background: "#fafaf9",   // Page background
    text: "#171717",         // Text color
  },
  typography: {
    headingFont: "Playfair Display",  // Serif font for headings
    bodyFont: "Montserrat",           // Sans-serif for body text
  },
}
```

**When to modify:**
- User asks to change colors/theme
- User wants different fonts
- User requests brand identity updates

---

### **2. Homepage Design**
**File:** `app/page.tsx`

Contains:
- **Hero Section** - Main landing area with background image
- **Category Cards** - Fashion, Beauty, Lifestyle sections
- **Latest Posts Grid** - Recent blog posts

**Common changes:**
- Hero section height, text size, background opacity
- Category card hover effects, colors
- Posts grid layout (3 columns → 4 columns, etc.)
- Spacing between sections

**Example styling locations:**
```tsx
{/* Hero Section */}
<section className="relative h-screen ...">

{/* Category Cards */}
<div className="bg-white hover:bg-neutral-50 ...">

{/* Posts Grid */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
```

---

### **3. About Page**
**File:** `app/about/page.tsx`

Contains:
- Hero section with site name
- Author bio and story
- Philosophy cards
- Connect/social section

**Common changes:**
- Hero background color and text styling
- Bio section layout and typography
- Philosophy cards arrangement
- Social links styling

**Uses siteConfig:** The page imports `siteConfig.site.name` so it's already dynamic!

---

### **4. Legal Pages** (Privacy, Terms, Disclaimer)
**Files:**
- `app/privacy/page.tsx`
- `app/terms/page.tsx`
- `app/disclaimer/page.tsx`

Contains standard legal text with:
- Page header styling
- Content sections with proper typography
- Links to email and website

**Common changes:**
- Header styling (colors, spacing)
- Section dividers
- Link colors
- Content background/card styling

**Uses siteConfig:** Already imports site name and contact info dynamically!

---

### **5. Blog Post Template**
**File:** `app/[category]/[slug]/page.tsx`

Single post page with:
- Featured image
- Post title and metadata
- Blog content with WordPress Gutenberg blocks
- Related posts sidebar
- Pinterest share button

**Common changes:**
- Featured image aspect ratio or size
- Title typography and spacing
- Content max-width and padding
- Sidebar width and styling
- Related posts card design

**Styling sections:**
```tsx
{/* Featured Image */}
<div className="aspect-[3/2] relative ...">

{/* Title */}
<h1 className="font-playfair text-5xl ...">

{/* Content */}
<div className="blog-content prose prose-lg ...">

{/* Sidebar */}
<aside className="lg:sticky lg:top-24 ...">
```

---

### **6. Category Archive**
**File:** `app/category/[slug]/page.tsx`

Category listing page with:
- Category header
- Posts grid
- Category description

**Common changes:**
- Header styling and background
- Grid layout (columns, spacing)
- Post card hover effects
- Pagination styling (if added)

---

### **7. Tag Archive**
**File:** `app/tag/[slug]/page.tsx`

Similar to category page but for tags.

**Common changes:**
- Same as category archive
- Tag badge styling
- Filter/sort controls (if added)

---

### **8. Search Results**
**File:** `app/search/page.tsx`

Search results page with:
- Search input
- Results list
- No results message

**Common changes:**
- Search input styling
- Results card layout
- Empty state design

---

### **9. Global Styles**
**File:** `app/globals.css`

Contains:
- Tailwind CSS configuration
- WordPress Gutenberg block styling
- Custom typography for blog content
- Global CSS variables

**Important sections:**
```css
/* Blog Content Typography - Forces WordPress blocks to use brand fonts */
.blog-content h2,
.blog-content .wp-block-heading h2 {
  font-family: var(--font-playfair), serif !important;
  font-size: 36px !important;
  /* ... */
}

.blog-content p,
.blog-content .wp-block-paragraph {
  font-family: var(--font-montserrat), sans-serif !important;
  font-size: 18px !important;
  /* ... */
}
```

**When to modify:**
- User wants global typography changes
- Blog post content needs different styling
- Need to add custom CSS animations
- WordPress blocks not styled correctly

---

### **10. Navigation**
**File:** `components/Navigation.tsx`

Site header with:
- Logo/site name
- Main navigation links
- Search bar
- Mobile menu

**Common changes:**
- Header background color
- Logo size and styling
- Link hover effects
- Mobile menu slide-in animation
- Sticky header behavior

---

### **11. Footer**
**File:** `app/layout.tsx` (bottom section)

Footer with:
- Site description
- Navigation links
- Social media links
- Copyright notice

**Common changes:**
- Footer background color
- Column layout
- Link styling
- Social icon colors

---

## 🎨 Design System Guidelines

### **Color Usage**
- **Primary:** Main brand color (buttons, CTAs, accents)
- **Secondary:** Backgrounds, subtle elements
- **Accent:** Highlights, hover states, special elements
- **Background:** Page backgrounds
- **Text:** Body text color

### **Typography Hierarchy**
- **H1:** Page titles (Playfair Display, 48-72px)
- **H2:** Section headings (Playfair Display, 36px)
- **H3:** Subsection headings (Playfair Display, 30px)
- **Body:** Content text (Montserrat, 16-18px)
- **Small:** Captions, metadata (Montserrat, 14px)

### **Spacing System** (Tailwind)
- Use consistent spacing: `p-4`, `p-6`, `p-8`, `p-12`
- Section gaps: `space-y-8`, `space-y-12`, `space-y-16`
- Grid gaps: `gap-4`, `gap-6`, `gap-8`

### **Responsive Design**
- Mobile-first approach
- Use Tailwind breakpoints: `sm:`, `md:`, `lg:`, `xl:`
- Test: Mobile (640px), Tablet (768px), Desktop (1024px+)

---

## 🚫 Files You Should NOT Modify

### **WordPress Integration**
- ❌ `lib/wordpress.ts` - GraphQL queries
- ❌ `types/index.ts` - TypeScript types

### **Next.js Configuration**
- ❌ `next.config.ts` - Build configuration
- ❌ `tailwind.config.ts` - Only modify if user explicitly asks
- ❌ `tsconfig.json` - TypeScript config

### **Components Logic**
- ❌ `components/Analytics.tsx` - Tracking scripts
- ❌ `components/ContentWithPinterestButtons.tsx` - Pinterest buttons logic
- ⚠️ You can modify **styling** of these components, but not their logic

---

## ✅ Best Practices

1. **Always update `config/site.config.ts` for brand colors**
   - Don't hardcode colors in components
   - Use the centralized config

2. **Use Tailwind CSS classes**
   - Avoid inline styles
   - Use utility classes for consistency

3. **Preserve responsive design**
   - Keep mobile-first approach
   - Don't break existing breakpoints

4. **Test changes mentally**
   - Consider how changes affect all pages
   - Think about light/dark contrasts
   - Ensure text remains readable

5. **Keep accessibility in mind**
   - Maintain color contrast ratios
   - Don't remove semantic HTML
   - Keep focus states visible

6. **Document major changes**
   - Explain what you changed and why
   - List affected files
   - Note any design decisions

---

## 📝 Example Change Requests

### **"Change colors to pastel pink and mint"**
1. Update `config/site.config.ts`:
   ```typescript
   primary: "#FFB3D9",      // Pastel pink
   secondary: "#B8E6D5",    // Mint green
   accent: "#FFE5EC",       // Light pink accent
   background: "#FAFAFA",   // Off-white
   text: "#2D2D2D",         // Dark gray
   ```
2. Test in homepage hero section
3. Check button contrast
4. Update any hardcoded colors in components

### **"Make the hero section bigger"**
1. Open `app/page.tsx`
2. Change hero height class:
   ```tsx
   // FROM: h-screen (100vh)
   // TO: h-[120vh] or min-h-screen with more padding
   <section className="relative min-h-screen py-32 ...">
   ```

### **"Use a different font"**
1. Update `config/site.config.ts`:
   ```typescript
   headingFont: "Cormorant Garamond",
   bodyFont: "Open Sans",
   ```
2. Ensure fonts are loaded in `app/layout.tsx`
3. Check if `globals.css` needs updates

---

## 🎯 Response Format

When making changes, always respond with:

```json
{
  "action": "code_changes",
  "message": "Brief description of changes made",
  "files": [
    {
      "path": "config/site.config.ts",
      "changes": "Updated brand colors to pastel theme"
    },
    {
      "path": "app/page.tsx",
      "changes": "Increased hero section height"
    }
  ]
}
```

This helps the system track what was modified and notify the user properly.

---

**Good luck! Focus on making beautiful, user-friendly design changes! 🎨✨**
Human: I need to stop you here - we've been working for a while now. Let me test everything first by creating a new site to see if the placeholders work, then we can continue with the AI instructions file.