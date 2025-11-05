# AI Design Assistant - Instructions

## ⚠️ KRITISCHE REGELN - STRIKT BEFOLGEN!

### 1. Config-Struktur NIEMALS ändern!

**`config/site.config.ts` - NUR WERTE ändern, NICHT die Struktur!**

❌ ABSOLUT VERBOTEN:
```typescript
// FALSCH - Nutzt nicht-existierende Properties:
{ label: langConfig.nav.home, href: '/' }  // ❌ langConfig.nav existiert NICHT!

// FALSCH - Struktur geändert:
branding: { colors: {...} }  // ❌ Heißt brand, nicht branding!
```

✅ SO IST ES RICHTIG:
```typescript
// Nur WERTE ändern, Struktur beibehalten:
brand: {
  colors: {
    primary: "#1a1a1a",      // ✅ Nur Hex-Wert ändern
    secondary: "#f5f5f5",    // ✅ Nur Hex-Wert ändern
    // ...
  }
}

navigation: {
  header: [
    { label: "Home", href: "/" },        // ✅ Statischer Text
    { label: "Fashion", href: "/..." },  // ✅ Statischer Text
  ]
}
```

### 2. ERLAUBTE Änderungen in site.config.ts:

**NUR diese Werte darfst du ändern:**
- ✅ `brand.colors.*` - Hex-Farben (#RRGGBB)
- ✅ `brand.typography.*` - Font-Namen (z.B. "Playfair Display")
- ✅ `navigation.header[].label` - Menu-Text (statisch, z.B. "Home", "About")
- ✅ `hero.title` - Hero-Titel Text
- ✅ `hero.subtitle` - Hero-Untertitel Text

**NIEMALS ändern:**
- ❌ Interface SiteConfig
- ❌ Property-Namen (primary → primaryColor)
- ❌ Struktur (brand → branding)
- ❌ Nicht-existierende Properties (langConfig.nav.home)
- ❌ TypeScript Typen

## Tailwind CSS v4 - WICHTIG!

Diese Website nutzt **Tailwind CSS v4** mit einem NEUEN System:

### ⚠️ FARBEN ÄNDERN - Zwei Schritte erforderlich!

1. **`app/globals.css` - @theme Block**
   ```css
   @theme {
     --color-primary: #1a1a1a;
     --color-secondary: #f5f5f5;
     --color-accent: #d4af37;
     --color-bg-custom: #ffffff;
     --color-text-primary: #1a1a1a;
   }
   ```
   → Hier werden die CSS-Variablen definiert

2. **`config/site.config.ts` - brand.colors**
   ```typescript
   brand: {
     colors: {
       primary: "#1a1a1a",
       secondary: "#f5f5f5",
       accent: "#d4af37",
       // ...
     }
   }
   ```
   → Synchron halten mit globals.css!
   → NUR WERTE ändern, NICHT die Struktur!

### Farb-Klassen in Tailwind v4

- `bg-primary` → nutzt `--color-primary`
- `text-accent` → nutzt `--color-accent`
- `border-secondary` → nutzt `--color-secondary`

### Wichtige Dateien

**IMMER ändern bei Farb-Updates:**
- ✅ `app/globals.css` (@theme Block)
- ✅ `config/site.config.ts` (brand.colors)

**Optional ändern:**
- `app/layout.tsx` (Fonts, Meta, Footer Styling)
- `app/page.tsx` (Homepage Layout)
- Komponenten in `components/`

## Schriften ändern

1. **Google Fonts in `app/layout.tsx`:**
   ```tsx
   const playfairDisplay = Playfair_Display({
     subsets: ['latin'],
     variable: '--font-playfair'
   });
   ```

2. **Schrift-Klassen nutzen:**
   - `font-playfair` → Heading Font
   - `font-montserrat` → Body Font

3. **Config aktualisieren:**
   ```typescript
   typography: {
     headingFont: "Playfair Display",
     bodyFont: "Montserrat"
   }
   ```

## Image Assets

Verfügbare Bilder (falls vom User generiert):
- `/images/hero-bg.jpg` - Hero Background
- `/images/category-1.jpg` - 1. Kategorie
- `/images/category-2.jpg` - 2. Kategorie
- `/images/category-3.jpg` - 3. Kategorie
- `/images/author-portrait.jpg` - About Seite

User kann auch eigene Bilder in `public/user-images/` hochladen!

## Komponenten-Struktur

```
app/
  page.tsx          → Homepage
  layout.tsx        → Root Layout
  globals.css       → Tailwind @theme + Styles

components/
  Navigation.tsx    → Header Menu
  Footer.tsx        → Footer
  PostCard.tsx      → Blog Post Preview

config/
  site.config.ts    → Zentrale Config (WICHTIG!)
```

## Footer Styling ändern

Der Footer befindet sich in `app/layout.tsx` (Line ~83-121, inline im Layout).

⚠️ **WICHTIG: Footer nutzt Tailwind-Klassen wie `bg-primary`, `text-accent`!**
Diese Klassen greifen auf `@theme` Variablen in `app/globals.css` zu!

### Häufigste Anfrage: Footer-Text besser lesbar machen

**Problem:** Grauer Text auf hellem Hintergrund = schlechter Kontrast

**✅ EINFACHSTE LÖSUNG - Nur Textfarben ändern:**

Ändere in `app/layout.tsx` **ALLE** Text-Klassen im Footer-Block (Line ~83-121):
```tsx
{/* VORHER - Schlechter Kontrast */}
<footer className="bg-primary text-neutral-300 py-16">
  <h3 className="text-accent">...</h3>        {/* ← Ändern */}
  <p className="text-neutral-400">...</p>     {/* ← Ändern */}
  <h4 className="text-neutral-200">...</h4>   {/* ← Ändern */}
  <a className="text-neutral-400">...</a>     {/* ← Ändern */}
  <p className="text-neutral-500">...</p>     {/* ← Ändern */}
</footer>

{/* NACHHER - Besserer Kontrast */}
<footer className="bg-primary text-white py-16">
  <h3 className="text-white">...</h3>
  <p className="text-white">...</p>
  <h4 className="text-white">...</h4>
  <a className="text-white hover:text-accent">...</a>
  <p className="text-white">...</p>
</footer>
```

**Wichtig:** Ändere **alle 5 Text-Klassen** im Footer:
1. Site-Name h3: `text-accent` → `text-white`
2. Tagline p: `text-neutral-400` → `text-white`
3. Section h4: `text-neutral-200` → `text-white`
4. Links a: `text-neutral-400` → `text-white`
5. Copyright p: `text-neutral-500` → `text-white`

### Beispiel: Footer dunkler machen (Background ändern)

**❌ FALSCH - Nur layout.tsx ändern:**
```tsx
// Dies ändert NICHTS, weil bg-primary auf @theme verweist!
<footer className="bg-[#1a1a1a] text-white">
```

**✅ RICHTIG - Beide Dateien ändern:**

1. **`app/globals.css` - @theme Block ändern:**
```css
@theme {
  --color-primary: #1a1a1a;  /* Dunkler Hintergrund */
  --color-secondary: #f5f5f5;
  --color-accent: #d4af37;
  /* ... */
}
```

2. **`app/layout.tsx` - Footer-Textfarben anpassen:**
```tsx
<footer className="bg-primary text-white py-16">
  <h3 className="text-white">...</h3>
  <a className="text-white/70 hover:text-accent">...</a>
</footer>
```

### Was du ändern kannst:

**Farben (BEIDE Dateien!):**
- ✅ `app/globals.css` - @theme Variablen ändern
- ✅ `app/layout.tsx` - Tailwind-Klassen (z.B. `text-white`, `text-neutral-300`)

**Styling (nur layout.tsx):**
- ✅ **Schriften:** Font-Klassen (z.B. `font-playfair`, `font-montserrat`)
- ✅ **Schriftgrößen:** Text-Klassen (z.B. `text-sm`, `text-2xl`)
- ✅ **Layout:** Grid, Spacing, Alignment (z.B. `grid-cols-3`, `gap-12`, `py-16`)
- ✅ **Styling:** Shadows, Borders, Hover-Effekte

**Was du NICHT ändern darfst:**
- ❌ Footer-Links-Struktur (kommt aus `siteConfig.navigation.footer.sections`)
- ❌ Social-Links (kommen aus `siteConfig.social`)
- ❌ Site-Name (kommt aus `siteConfig.site.name`)

## Best Practices

1. **Token-Limit beachten:** Max 8.192 output tokens
   - Große Dateien einzeln ändern
   - Bei mehreren Dateien: Max 1-2 große Files pro Request

2. **Vollständigen Code zurückgeben:**
   - IMMER die komplette Datei, nicht nur Snippets

3. **Farben synchron halten:**
   - globals.css @theme → Tailwind Klassen
   - site.config.ts → Code-Generator beim nächsten Deploy

4. **User fragen bei Unsicherheit:**
   - Welche Farben genau?
   - Welchen Style (elegant, modern, playful)?
   - Layout-Präferenzen?
