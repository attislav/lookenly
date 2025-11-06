# Performance Optimierung - Lookenly

## 🚀 Implementierte Optimierungen

### 1. Next.js Image Optimization

#### Was macht Next.js automatisch?
- **Automatische Formatkonvertierung:** JPEG/PNG → WebP/AVIF (bis zu 70% kleiner)
- **Responsive Bildgrößen:** Lädt nur die Größe die benötigt wird
- **Lazy Loading:** Bilder werden erst geladen wenn sie im Viewport sind
- **Blur Placeholder:** Smooth loading experience

#### Konfiguration (`next.config.ts`)
```typescript
images: {
  formats: ['image/avif', 'image/webp'],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  minimumCacheTTL: 60 * 60 * 24 * 365, // 1 Jahr
}
```

### 2. Optimierte `sizes` Attribute

#### Warum ist `sizes` wichtig?
Das `sizes` Attribut teilt dem Browser mit, wie groß das Bild auf verschiedenen Bildschirmgrößen sein wird. Der Browser lädt dann NUR die passende Größe.

#### Unsere Sizes-Strategien:

**Grid Thumbnails (Kategorie/Tag Seiten):**
```typescript
sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
```
- Mobile: 100% Breite
- Tablet: 50% Breite (2 Spalten)
- Desktop: 33% Breite (3 Spalten)
- Large Desktop: 25% Breite

**Hero Images (Post Seiten):**
```typescript
sizes="100vw"
priority={true}
quality={90}
```
- Immer 100% Viewport-Breite
- Priority = sofort laden (kein lazy loading)
- Höhere Qualität (90 statt 85)

**Sidebar Thumbnails:**
```typescript
sizes="(max-width: 1024px) 0vw, 20vw"
```
- Mobile/Tablet: 0vw (wird nicht angezeigt)
- Desktop: 20% Viewport-Breite

### 3. Quality Settings

**Standard:** `quality={85}` - Gute Balance
**Thumbnails:** `quality={80}` - Kleiner für Grid-Ansichten
**Hero Images:** `quality={90}` - Höchste Qualität für Featured Images

**Warum nicht 100?**
- 85-90 ist visuell identisch mit 100
- Aber 30-50% kleinere Dateigröße!

---

## 📊 Weitere Performance-Optimierungen

### WordPress Seite (wp.lookenly.com)

#### 1. Bildoptimierung vor Upload
**Empfohlene Tools:**
- **ShortPixel** (WordPress Plugin) - Automatische Komprimierung
- **Imagify** (WordPress Plugin) - Bulk-Optimierung
- **TinyPNG** (Online) - Manuell vor Upload

**Einstellungen:**
- Format: WebP (moderner Browser Support)
- Qualität: 85-90%
- Max. Breite: 2400px (Retina Display)

#### 2. Lazy Loading für Gutenberg Blocks
```php
// In WordPress functions.php
add_filter('wp_lazy_loading_enabled', '__return_true');
```

#### 3. CDN für WordPress Uploads
**Empfohlene CDNs:**
- **Cloudflare** (kostenlos, einfach)
- **BunnyCDN** (günstig, schnell)
- **Cloudinary** (spezialisiert auf Bilder)

### Next.js Frontend (lookenly.com)

#### 1. Static Site Generation (SSG)
✅ Bereits implementiert für:
- Posts (`/post/[slug]`)
- Kategorien (`/category/[slug]`)
- Tags (`/tag/[slug]`)

**Vorteil:** HTML wird beim Build generiert, nicht bei jedem Request

#### 2. Incremental Static Regeneration (ISR)
**Optional:** Posts nach 1 Stunde neu generieren

```typescript
// In app/post/[slug]/page.tsx
export const revalidate = 3600; // 1 Stunde
```

**Vorteil:** Neue Posts erscheinen automatisch ohne Re-Deploy

#### 3. Font Optimization
✅ Bereits implementiert mit `next/font`:
- Fonts werden lokal gehostet (keine Google Fonts CDN)
- Automatisches subsetting (nur benutzte Zeichen)
- Font-Display: swap (kein FOIT - Flash of Invisible Text)

---

## 🎯 Best Practices für Content-Erstellung

### Upload-Guidelines für WordPress

#### Featured Images (Beitragsbilder)
- **Format:** JPG oder WebP
- **Größe:** 1800 x 1200px (3:2 Ratio)
- **Dateigröße:** Max. 300KB nach Komprimierung
- **Alt-Text:** Immer ausfüllen (SEO + Accessibility)

#### Content Images (im Beitrag)
- **Format:** JPG oder WebP
- **Größe:** Min. 900 x 600px, Max. 2400 x 1600px
- **Dateigröße:** Max. 200KB pro Bild
- **Pinterest:** Mind. 300px Breite oder Höhe (für Pin Button)

#### Sidebar/Thumbnail Images
- **Format:** JPG oder WebP
- **Größe:** 600 x 400px
- **Dateigröße:** Max. 100KB

### Checkliste vor Upload:
- [ ] Bild auf korrekte Größe skalieren (nicht 5000px hochladen!)
- [ ] Mit TinyPNG oder ShortPixel komprimieren
- [ ] Alt-Text hinzufügen
- [ ] WebP Format bevorzugen (wenn möglich)

---

## 📈 Monitoring & Testing

### Tools zum Testen

**Lighthouse (Chrome DevTools):**
```bash
1. Chrome öffnen → F12 → Lighthouse Tab
2. "Analyze page load" klicken
3. Ziel: Performance Score > 90
```

**WebPageTest:**
- URL: https://www.webpagetest.org
- Test von verschiedenen Locations
- Waterfall-Analyse für Bilder

**PageSpeed Insights:**
- URL: https://pagespeed.web.dev
- Google's offizielle Scores
- Mobile + Desktop Testing

### Ziel-Metriken

**Core Web Vitals:**
- **LCP (Largest Contentful Paint):** < 2.5s ✅
- **FID (First Input Delay):** < 100ms ✅
- **CLS (Cumulative Layout Shift):** < 0.1 ✅

**Weitere Metriken:**
- **FCP (First Contentful Paint):** < 1.5s
- **TTI (Time to Interactive):** < 3.5s
- **Speed Index:** < 3.0s

---

## 🔧 Troubleshooting

### Problem: Bilder laden langsam
**Lösung:**
1. WordPress Plugin "ShortPixel" installieren
2. Bulk-Optimierung für bestehende Bilder
3. Zukünftige Uploads automatisch optimieren

### Problem: Layout Shift (CLS) zu hoch
**Lösung:**
- Immer `width` und `height` Props angeben
- Next.js Image Component benutzen (macht das automatisch)
- Aspect-Ratio Wrapper verwenden

### Problem: Mobile Performance schlecht
**Lösung:**
- `sizes` Attribut überprüfen (zu große Bilder auf Mobile?)
- Quality auf Mobile reduzieren: `quality={75}`
- Lazy Loading aktivieren (außer Hero Images)

### Problem: WordPress Bilder zu groß
**Lösung:**
```php
// In WordPress functions.php
add_filter('big_image_size_threshold', function() {
    return 2400; // Max. 2400px Breite
});
```

---

## 🚀 Deployment Optimierungen

### Vercel (empfohlen)
✅ Automatische Image Optimization
✅ Global CDN
✅ Edge Caching
✅ Brotli Compression

**Environment Variables:**
```bash
NEXT_PUBLIC_WORDPRESS_API_URL=https://wp.lookenly.com/graphql
NEXT_PUBLIC_SITE_URL=https://lookenly.com
```

### Cloudflare (Optional vor Vercel)
- DNS auf Cloudflare
- "Orange Cloud" aktivieren (Proxy)
- Auto Minify: HTML, CSS, JS
- Brotli Compression aktivieren
- Browser Cache TTL: 1 Jahr

---

## 📝 Checkliste vor Production

### WordPress
- [ ] ShortPixel oder Imagify Plugin installiert
- [ ] Bestehende Bilder bulk-optimiert
- [ ] Max. Upload-Größe überprüft
- [ ] CDN konfiguriert (optional)
- [ ] Lazy Loading aktiviert

### Next.js
- [ ] `next.config.ts` mit Image Settings
- [ ] Alle Images nutzen `<Image>` Component
- [ ] `sizes` Attribute überall gesetzt
- [ ] `priority` auf Hero Images
- [ ] Build testen: `npm run build`

### Testing
- [ ] Lighthouse Score > 90
- [ ] Mobile Performance checken
- [ ] WebP/AVIF Support testen
- [ ] Verschiedene Bildschirmgrößen testen
- [ ] Network Throttling (Slow 3G) testen

---

## 💡 Advanced Optimierungen (Optional)

### 1. Blur Placeholder
```typescript
<Image
  src={...}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

### 2. Bildvorschau von WordPress
WordPress kann Blur Placeholder generieren (Plugin: "Blur Hash")

### 3. Service Worker für Offline
```typescript
// next.config.ts
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
});

module.exports = withPWA(nextConfig);
```

### 4. Prefetching für Navigation
✅ Next.js macht das automatisch für `<Link>` Components

---

**Letzte Aktualisierung:** 2025-01-10
**Ziel:** PageSpeed Score > 95 auf Mobile & Desktop
