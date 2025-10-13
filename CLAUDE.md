# Lookenly - Projekt Dokumentation für Claude

Diese Datei enthält alle wichtigen Informationen über das Lookenly-Projekt für zukünftige Arbeit mit Claude.

---

## 📋 Projekt-Übersicht

**Projekt:** Lookenly
**Typ:** Fashion, Beauty & Lifestyle Blog
**Architektur:** Headless WordPress + Next.js
**Status:** Live auf wp.lookenly.com (WordPress) + In Entwicklung (Next.js Frontend)

### Vision & Ziel

Ein hochwertiger, eleganter Fashion/Beauty/Lifestyle Blog mit:
- **Pinterest-Optimierung** als Hauptfokus
- **Luxuriösem, zeitlosem Design** (Vogue/Harper's Bazaar Aesthetic)
- **WordPress als CMS** (bestehende Make.com Szenarien bleiben aktiv)
- **Next.js als Frontend** (moderne, schnelle Website)

---

## 🎨 Design-Philosophie

### Farbpalette
- **Primär:** Schwarz (#000000)
- **Sekundär:** Neutral/Beige/Cream (#f5f5f4, #d6d3d1, #a8a29e)
- **Akzent:** Gold/Amber (#f59e0b, #fbbf24)
- **Hintergrund:** Off-White (#fafaf9)

### Typografie
- **Überschriften:** Playfair Display (Serif) - elegant, klassisch
- **Body Text:** Montserrat (Sans-Serif) - clean, lesbar
- **Stil:** Uppercase mit letter-spacing für Buttons/Labels

### Design-Prinzipien
- ✅ Minimalistisch mit viel Weißraum
- ✅ Hochauflösende Bilder (3:2 Ratio - horizontal für Pinterest)
- ✅ Subtile Animationen (scale, fade, underlines)
- ✅ Schwarz-Gold Kontrast für Eleganz
- ❌ Keine grellen Farben
- ❌ Keine überladenen Layouts
- ❌ Keine Comic Sans (obviously 😄)

---

## 🏗️ Technische Architektur

### Stack
```
WordPress (Headless CMS)
    ↓ WPGraphQL
Next.js 15 (App Router)
    ↓ Server-Side Rendering
User's Browser
```

### Wichtige Dependencies
- **next**: 15.5.4 (React Framework)
- **graphql-request**: GraphQL Client
- **tailwindcss**: Utility-first CSS
- **typescript**: Type Safety

### Umgebungsvariablen (.env.local)
```bash
NEXT_PUBLIC_WORDPRESS_API_URL=https://wp.lookenly.com/graphql
NEXT_PUBLIC_SITE_URL=https://lookenly.com
```

**Wichtig:** WordPress läuft auf Subdomain `wp.lookenly.com` mit WPGraphQL und CORS-Konfiguration.

---

## 📁 Projekt-Struktur

```
fashion-blog/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root Layout (Fonts, Navigation, Footer)
│   ├── page.tsx                 # Homepage (Hero, Categories, Posts)
│   ├── about/
│   │   └── page.tsx            # About-Seite
│   ├── post/[slug]/
│   │   └── page.tsx            # Einzelner Blog-Post (SSG)
│   ├── category/[slug]/
│   │   └── page.tsx            # Kategorie-Archiv (SSG)
│   └── tag/[slug]/
│       └── page.tsx            # Tag-Archiv (SSG)
├── components/
│   ├── Navigation.tsx           # Header Navigation mit Logo
│   ├── PinterestImage.tsx       # Next.js Image Wrapper
│   ├── PinterestShareButton.tsx # Pinterest Share Button
│   ├── ContentWithPinterestButtons.tsx # Dynamische Pin Buttons auf Content-Bildern
│   └── RelatedPostsSidebar.tsx  # Sticky Sidebar mit verwandten Posts
├── lib/
│   └── wordpress.ts             # GraphQL Queries & API Calls
├── types/
│   └── index.ts                 # TypeScript Interfaces
├── public/
│   └── images/                  # Statische Bilder
│       ├── hero-bg.jpg         # Hero Background
│       ├── fashion-category.jpg
│       ├── beauty-category.jpg
│       ├── lifestyle-category.jpg
│       ├── post-1.jpg          # Mock Post Bilder
│       ├── post-2.jpg
│       ├── post-3.jpg
│       └── author-portrait.jpg
├── .env.local                   # Environment Variables (nicht in Git!)
├── claude.md                    # Diese Datei
├── WORDPRESS-SETUP.md          # WordPress Verbindungsanleitung
└── README.md                    # Projekt README

```

---

## 🔌 WordPress Integration

### Benötigte WordPress Plugins
- ✅ **WPGraphQL** - GraphQL API für WordPress (ESSENTIELL)
- ✅ **WPGraphQL CORS** - Cross-Origin Requests erlauben
- ⚠️ **Wordfence Security** - Sicherheit (behalten!)
- ⚠️ **ShortPixel/Smush** - Bildoptimierung (optional)
- ❌ **WP Rocket** - Nicht mehr nötig (Next.js übernimmt Caching)
- ❌ **Yoast/Rank Math** - Optional, wenn SEO-Daten in Next.js genutzt werden sollen

### WordPress Kategorien
Erstelle diese 3 Hauptkategorien:
1. **Fashion** (slug: `fashion`)
2. **Beauty** (slug: `beauty`)
3. **Lifestyle** (slug: `lifestyle`)

### GraphQL Queries
Alle Queries sind in `lib/wordpress.ts`:
- `getPosts()` - Alle Posts abrufen
- `getPostBySlug(slug)` - Einzelnen Post abrufen
- `getCategories()` - Alle Kategorien
- `getPostsByCategory(slug)` - Posts nach Kategorie
- `getTags()` - Alle Tags
- `getPostsByTag(slug)` - Posts nach Tag
- `getRelatedPosts(categorySlug, currentPostId, limit)` - Verwandte Posts aus derselben Kategorie

### CORS Konfiguration
WordPress CORS wird über `wp-config.php` konfiguriert (nicht Plugin):
```php
header('Access-Control-Allow-Origin: https://lookenly.com');
header('Access-Control-Allow-Origin: http://localhost:3002');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
```

---

## 🎯 Funktionale Features

### Aktuell implementiert
- ✅ **WordPress-Verbindung:** Live auf wp.lookenly.com mit WPGraphQL
- ✅ **Server-Side Rendering (SSR)** für dynamische Inhalte
- ✅ **Static Site Generation (SSG)** für Posts/Kategorien/Tags
- ✅ **Pinterest Integration:**
  - Share Button auf jedem Post
  - Dynamische "Pin it!" Buttons auf allen Content-Bildern (≥300px)
  - Pinterest Red (#E60023) mit Icon
  - Filter für gebrochene Bilder und Hero-Image
- ✅ **Responsive Design** (Mobile, Tablet, Desktop)
- ✅ **Image Optimization** (Next.js Image Component)
- ✅ **SEO-freundliche URLs** (slug-basiert)
- ✅ **SEO-Optimierung:**
  - Umfassende Meta Tags für alle Seiten
  - Open Graph Tags für Social Media
  - Twitter Card Support
  - Canonical URLs
  - Strukturierte Daten (Article Schema)
- ✅ **Table of Contents** (automatisch aus H2-Überschriften generiert)
- ✅ **Search Functionality** (Suchleiste in Navigation + Suchergebnisseite)
- ✅ **Related Posts Sidebar** (sticky, gefiltert nach Kategorie)
- ✅ **WordPress Gutenberg Styling** (erzwungene Typografie mit !important)
- ✅ **Next.js 15 Kompatibilität** (await params in dynamic routes)
- ✅ **Smooth Scrolling** mit Offset für Ankerlinks

### Geplant / To-Do
- ⏳ Newsletter-Integration (Formular funktioniert noch nicht)
- ⏳ Tag-Wolke auf Sidebar
- ⏳ Author Bio Pages
- ⏳ Kommentar-System (optional)
- ⏳ Analytics Integration (Google Analytics / Plausible)
- ⏳ Internal Link Injection ("Das könnte Dich auch interessieren")
- ⏳ Deployment auf Vercel

---

## 📝 Content-Strategie

### Post-Anforderungen
- **Featured Image:** Mind. 900x600px (3:2 Ratio - horizontal!)
- **Kategorien:** Immer eine der 3 Hauptkategorien zuweisen
- **Tags:** Optional, aber empfohlen für bessere Auffindbarkeit
- **Excerpt:** Kurze Zusammenfassung (wird auf Übersichtsseiten gezeigt)

### Bild-Guidelines
- **Format:** JPG oder WebP (für Web optimiert)
- **Auflösung:** Mind. 900x600px (3:2), besser 1800x1200px
- **Farben:** Gedämpft, neutral, elegant (keine grellen Farben)
- **Stil:** Editorial, minimalistisch, hochwertig
- **Komprimierung:** Mit TinyPNG oder ShortPixel vor Upload
- **Pinterest Buttons:** Erscheinen automatisch auf Content-Bildern ≥300px

---

## 🚀 Development Workflow

### Lokale Entwicklung starten
```bash
cd fashion-blog
npm run dev
```
→ Öffnet auf `http://localhost:3002` (oder nächster freier Port)

### Build für Produktion
```bash
npm run build    # Erstellt Production Build
npm run start    # Startet Production Server
```

### Neue Komponente hinzufügen
1. Erstelle Datei in `components/` (z.B. `RelatedPosts.tsx`)
2. Verwende TypeScript und React Functional Components
3. Nutze Tailwind CSS für Styling
4. Folge dem bestehenden Design-System (Farben, Schriften)

### Neue WordPress Query hinzufügen
1. Öffne `lib/wordpress.ts`
2. Erstelle neue async function
3. Definiere GraphQL Query als Template String
4. Nutze `graphQLClient.request(query, variables)`
5. Füge Error Handling hinzu (try/catch)

---

## 🐛 Bekannte Probleme & Lösungen

### Problem: "Error fetching posts" in Console
**Grund:** WordPress noch nicht verbunden oder CORS-Fehler
**Lösung:** Siehe `WORDPRESS-SETUP.md` Schritt 2 (CORS) und Schritt 4 (.env.local)

### Problem: Bilder werden nicht geladen
**Grund:** WordPress-Bilder haben andere Domain, CORS oder Next.js Config
**Lösung:** `next.config.ts` hat bereits `remotePatterns` mit `hostname: '**'`

### Problem: Port 3000 bereits in Verwendung
**Grund:** Anderer Next.js Server läuft bereits
**Lösung:** Next.js wählt automatisch Port 3002 (oder beende anderen Server)

### Problem: WordPress Gutenberg Blocks haben keine Typografie
**Grund:** WordPress Block-HTML hat eigene Klassen (`.wp-block-paragraph`, `.wp-block-heading`)
**Lösung:**
- CSS mit `!important` in `app/globals.css` erzwingen
- Target beide: `.blog-content p` UND `.blog-content .wp-block-paragraph`
- Beispiel: `font-family: var(--font-montserrat), sans-serif !important;`

### Problem: Pinterest Buttons erscheinen auf jedem Bild (auch Hero)
**Grund:** JavaScript query selector zu weit gefasst
**Lösung:**
- Query auf `.blog-content img` beschränken (nicht `article img`)
- Hero-Image ist außerhalb `.blog-content` div

### Problem: Route "/category/[slug]" used `params.slug` without await
**Grund:** Next.js 15 Breaking Change - params muss await sein
**Lösung:**
```typescript
// ALT (funktioniert nicht mehr)
const slug = params.slug;

// NEU (Next.js 15)
const { slug } = await params;
```

### Problem: Änderungen werden nicht angezeigt trotz Server-Restart
**Grund:** Next.js Cache (.next Folder) oder Browser Cache
**Lösung:**
1. `.next` Ordner löschen
2. Alte Node-Prozesse beenden (`taskkill /PID <pid>`)
3. Server neu starten
4. Browser in Incognito-Modus testen

---

## 🔒 Sicherheit & Best Practices

### Environment Variables
- ❌ **NIE** `.env.local` in Git committen!
- ✅ `.env.local` ist in `.gitignore`
- ✅ Bei Deployment: Environment Variables im Hosting-Panel setzen

### WordPress Security
- ✅ Wordfence Security Plugin aktiv halten
- ✅ WordPress & Plugins regelmäßig updaten
- ✅ Starke Admin-Passwörter verwenden
- ✅ SSL-Zertifikat (HTTPS) verwenden

### Next.js Best Practices
- ✅ Server Components wo möglich (default in App Router)
- ✅ Client Components nur wenn nötig (`'use client'`)
- ✅ Image Optimization nutzen (Next.js Image Component)
- ✅ `dangerouslySetInnerHTML` nur für vertrauenswürdigen WordPress-Content

---

## 🔄 Make.com Integration

**Wichtig:** Die bestehenden Make.com HTTP-Request Szenarien funktionieren **ohne Änderungen** weiter!

### Wie es funktioniert:
```
Make.com → WordPress REST API → WordPress Datenbank
                                       ↓
                                 WPGraphQL API
                                       ↓
                                  Next.js Frontend
```

- **Make.com schreibt:** Nutzt WordPress REST API (wie bisher)
- **Next.js liest:** Nutzt WPGraphQL API (neu)
- **Beide parallel:** Keine Konflikte, keine Änderungen nötig

---

## 📊 Performance-Ziele

### Ziel-Metriken
- **First Contentful Paint:** < 1.5s
- **Largest Contentful Paint:** < 2.5s
- **Time to Interactive:** < 3.5s
- **Cumulative Layout Shift:** < 0.1

### Optimierungen
- ✅ Static Site Generation für Posts/Kategorien
- ✅ Image Optimization (Next.js)
- ✅ Code Splitting (automatisch durch Next.js)
- ⏳ CDN für statische Assets (nach Deployment)
- ⏳ ISR (Incremental Static Regeneration) für häufige Updates

---

## 🚢 Deployment Checkliste

### Vor dem Deployment
- [ ] WordPress ist live und erreichbar
- [ ] WPGraphQL Plugin aktiviert und getestet
- [ ] CORS korrekt konfiguriert (für Production-Domain)
- [ ] Mindestens 3-5 Posts veröffentlicht
- [ ] Alle 3 Kategorien erstellt
- [ ] Featured Images bei allen Posts gesetzt
- [ ] `.env.local` Werte überprüft

### Deployment auf Vercel (empfohlen)
1. GitHub Repository erstellen und Code pushen
2. Vercel Account verbinden
3. Projekt importieren
4. Environment Variables setzen:
   - `NEXT_PUBLIC_WORDPRESS_API_URL`
   - `NEXT_PUBLIC_SITE_URL`
5. Domain verbinden
6. Deploy!

### Nach dem Deployment
- [ ] Alle Seiten testen (Home, Posts, Kategorien)
- [ ] Pinterest Share Button testen
- [ ] Mobile Ansicht überprüfen
- [ ] Lighthouse Score prüfen (Performance, SEO, Accessibility)
- [ ] WordPress CORS für Production-Domain aktualisieren

---

## 📞 Wichtige Links & Ressourcen

### Dokumentation
- **Next.js Docs:** https://nextjs.org/docs
- **WPGraphQL Docs:** https://www.wpgraphql.com/docs
- **Tailwind CSS:** https://tailwindcss.com/docs
- **Vercel Deployment:** https://vercel.com/docs

### Design-Inspiration
- **Pinterest:** Hauptplattform für Inspiration
- **Vogue:** https://www.vogue.com (Editorial Style)
- **Harper's Bazaar:** https://www.harpersbazaar.com (Luxury Aesthetic)

### Tools
- **TinyPNG:** https://tinypng.com (Bildkomprimierung)
- **Google Fonts:** https://fonts.google.com
- **Lighthouse:** Chrome DevTools (Performance Testing)

---

## 🎓 Wichtige Konzepte für Claude

### Wenn du an diesem Projekt weiterarbeitest:

1. **Design bleibt konsistent:** Schwarz-Gold-Beige, Playfair+Montserrat, minimalistisch
2. **Keine grellen Farben:** User hat explizit elegant/hochwertig gewünscht
3. **Pinterest first:** 3:2 Bilder (horizontal!), Share-Funktionalität wichtig
4. **WordPress ist CMS:** Alle Content-Änderungen passieren in WordPress, nicht in Next.js
5. **WordPress Gutenberg:** Blocks brauchen spezielle CSS-Selektoren mit !important
6. **Make.com bleibt:** Bestehende Szenarien nicht ändern, die laufen parallel
7. **Next.js 15:** params MUSS awaited werden in dynamic routes

### Code-Konventionen
- **TypeScript:** Immer verwenden, Types definieren
- **Funktionale Komponenten:** Keine Class Components
- **Tailwind CSS:** Keine custom CSS-Dateien (außer globals.css)
- **Async/Await:** Für GraphQL Requests
- **Error Handling:** Try/Catch bei allen API Calls

---

## 📝 Changelog

### 2025-01-10 - Initial Setup & WordPress Integration
- ✅ Next.js 15 Projekt erstellt
- ✅ Design-System von grell → elegant umgestellt (Schwarz-Gold-Beige)
- ✅ Alle Templates erstellt (Home, About, Post, Category, Tag)
- ✅ WPGraphQL Integration implementiert
- ✅ 8 Bilder integriert (Hero, Kategorien, Posts, Author)
- ✅ Site von "ÉLÉGANCE" zu "Lookenly" umbenannt
- ✅ WordPress Setup Guide erstellt
- ✅ WordPress live auf wp.lookenly.com
- ✅ CORS Konfiguration via wp-config.php

### 2025-01-10 - Typography & Pinterest Features
- ✅ WordPress Gutenberg Block Styling (globals.css mit !important)
- ✅ Typografie Fix: H2 (36px), H3 (30px), Paragraphs (18px)
- ✅ Pinterest Button Redesign: Red (#E60023), "Pin it!" Text, Icon
- ✅ Pinterest Button Filter: Nur auf Bildern ≥300px, keine broken Images
- ✅ Hero Image exclusion (nur Content-Bilder haben Pin Buttons)
- ✅ Related Posts Sidebar implementiert (sticky, nach Kategorie gefiltert)
- ✅ `getRelatedPosts()` GraphQL Query hinzugefügt
- ✅ Image Aspect Ratio von 3:4 → 3:2 korrigiert
- ✅ Next.js 15 params await Fix in allen dynamic routes

### Next Steps
- ⏳ Typography User-Testing (aktuell in Progress)
- ⏳ Newsletter-Integration
- ⏳ Production Deployment auf Vercel

---

## 💡 Tipps für zukünftige Features

### Pinterest Button zu neuem Bild-Element hinzufügen
Der `ContentWithPinterestButtons` Component fügt automatisch Buttons zu allen `.blog-content img` Elementen hinzu:
```typescript
// In components/ContentWithPinterestButtons.tsx
useEffect(() => {
  const images = document.querySelectorAll('.blog-content img');
  images.forEach((img) => {
    // Skip wenn Button bereits existiert
    if (htmlImg.parentElement?.classList.contains('pinterest-image-wrapper')) return;

    // Skip broken images
    if (!htmlImg.complete || htmlImg.naturalWidth === 0) return;

    // Skip kleine Bilder (<300px)
    if (htmlImg.naturalWidth < 300 && htmlImg.naturalHeight < 300) return;

    // Wrapper + Button erstellen...
  });
}, [content]);
```

**Wichtig:** Query selector muss `.blog-content img` sein, um Hero-Image auszuschließen!

### Newsletter Integration
- **ConvertKit** oder **Mailchimp** empfohlen
- API-Route in `app/api/newsletter/route.ts` erstellen
- Form in Footer/About-Page anbinden

### Suche implementieren
- **WPGraphQL** unterstützt Search Queries
- Suchleiste in Navigation hinzufügen
- Dedizierte `/search` Route mit Ergebnisseite

---

**Viel Erfolg mit Lookenly! 🎨✨**

---

*Letzte Aktualisierung: 2025-01-10 (Typography & Pinterest Features)*
*Projektstart: 2025-01-10*

---

## 📌 Wichtige Dateien mit letzten Änderungen

### `app/globals.css` (Lines 28-119)
Erzwingt WordPress Gutenberg Block Styling mit `!important`:
- `.blog-content h2`, `.blog-content .wp-block-heading h2` → 36px, Playfair, Bold
- `.blog-content h3` → 30px, Playfair, Bold
- `.blog-content p`, `.blog-content .wp-block-paragraph` → 18px, Montserrat
- `.blog-content ul`, `.blog-content .wp-block-list` → Listen mit Montserrat
- `.blog-content a` → Amber (#f59e0b) mit underline
- `.blog-content .wp-block-image` → Bild-Styling + Captions

### `components/ContentWithPinterestButtons.tsx`
Client Component für dynamische Pinterest Buttons:
- Query selector: `.blog-content img` (excludes hero)
- Skip wenn: bereits geaddet, broken image, <300px
- Button: Pinterest Red (#E60023), "Pin it!" Text, Icon
- Creates wrapper div mit `pinterest-image-wrapper` class

### `components/RelatedPostsSidebar.tsx`
Sticky Sidebar mit verwandten Posts:
- `lg:sticky lg:top-24 lg:self-start` für sticky positioning
- Zeigt bis zu 5 Posts aus derselben Kategorie
- Featured Image (3:2), Titel, Datum

### `lib/wordpress.ts`
GraphQL Query `getRelatedPosts(categorySlug, currentPostId, limit)`:
- Filtert Posts nach Kategorie
- Excludet aktuellen Post via ID filter
- Returns array von Post objects

### `app/post/[slug]/page.tsx` (Lines 46-52, 134-158)
- Fixed: `const { slug } = await params;` (Next.js 15)
- Fetches related posts: `await getRelatedPosts(category.slug, post.id, 5)`
- Layout: `lg:grid-cols-12` mit `lg:col-span-8` (content) + `lg:col-span-4` (sidebar)
- Prose classes für Content-Typografie

### `app/category/[slug]/page.tsx` & `app/tag/[slug]/page.tsx`
- Fixed: `const { slug } = await params;`
- Image aspect ratio: `aspect-[3/2]` (horizontal)
- Width/Height props: `900x600`
