# 📊 Scripts & Tracking Management Guide

## Übersicht

Alle externen Scripts (Analytics, Ads, Tracking) werden zentral über **Environment Variables** verwaltet.

---

## 🎯 Wie es funktioniert

### 1. **Analytics Component** (`components/Analytics.tsx`)
- Enthält alle Tracking-Scripts
- Lädt nur Scripts, wenn Environment Variable gesetzt ist
- Nutzt Next.js `<Script>` Component für optimale Performance

### 2. **Environment Variables**
- Werden in Vercel Dashboard gesetzt
- Nicht im Code (Security!)
- Pro Environment (Production, Preview, Development)

---

## 🚀 Neue Scripts hinzufügen

### Schritt 1: Environment Variable in Vercel setzen

**Im Vercel Dashboard:**
1. Project → Settings → Environment Variables
2. Add Variable:
   ```
   Key: NEXT_PUBLIC_GA_ID
   Value: G-XXXXXXXXXX
   Environments: Production, Preview, Development ✅
   ```

### Schritt 2: Script in Analytics Component

**Edit `components/Analytics.tsx`:**

```tsx
export default function Analytics() {
  const googleAnalyticsId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <>
      {googleAnalyticsId && (
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
          strategy="afterInteractive"
        />
      )}
    </>
  );
}
```

### Schritt 3: Redeploy

```bash
git add .
git commit -m "Add new tracking script"
git push
# Vercel deployed automatisch
```

---

## 📋 Aktuell unterstützte Scripts

### ✅ Google Analytics 4
```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### ✅ Google AdSense
```bash
NEXT_PUBLIC_ADSENSE_ID=ca-pub-XXXXXXXXXXXXXXXX
```

### ✅ Meta Pixel (Facebook)
```bash
NEXT_PUBLIC_META_PIXEL_ID=XXXXXXXXXXXXXXXX
```

### ✅ Pinterest Tag
```bash
NEXT_PUBLIC_PINTEREST_TAG=XXXXXXXXXXXXX
```

### ✅ Plausible Analytics (Self-Hosted)
```bash
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=lookenly.com
```

**Beispiel-Werte für verschiedene Sites:**
- lookenly.com → `NEXT_PUBLIC_PLAUSIBLE_DOMAIN=lookenly.com`
- trendsettertales.com → `NEXT_PUBLIC_PLAUSIBLE_DOMAIN=trendsettertales.com`
- couturechronicles.com → `NEXT_PUBLIC_PLAUSIBLE_DOMAIN=couturechronicles.com`

**Wichtig:** Der Plausible Server ist selbst-gehostet auf `stats.tripleadigital.de`. Das Script wird automatisch von dort geladen.

---

## 🛠️ Weitere Scripts hinzufügen

### Google Tag Manager (GTM)

**Environment Variable:**
```bash
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

**In `Analytics.tsx` hinzufügen:**
```tsx
const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

{gtmId && (
  <>
    <Script id="gtm" strategy="afterInteractive">
      {`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${gtmId}');
      `}
    </Script>
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
      />
    </noscript>
  </>
)}
```

---

### Hotjar

**Environment Variable:**
```bash
NEXT_PUBLIC_HOTJAR_ID=XXXXXXX
NEXT_PUBLIC_HOTJAR_SV=6
```

**In `Analytics.tsx` hinzufügen:**
```tsx
const hotjarId = process.env.NEXT_PUBLIC_HOTJAR_ID;
const hotjarSv = process.env.NEXT_PUBLIC_HOTJAR_SV;

{hotjarId && hotjarSv && (
  <Script id="hotjar" strategy="afterInteractive">
    {`
      (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:${hotjarId},hjsv:${hotjarSv}};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
      })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
    `}
  </Script>
)}
```

---

### Microsoft Clarity

**Environment Variable:**
```bash
NEXT_PUBLIC_CLARITY_ID=XXXXXXXXX
```

**In `Analytics.tsx` hinzufügen:**
```tsx
const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;

{clarityId && (
  <Script id="clarity" strategy="afterInteractive">
    {`
      (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "${clarityId}");
    `}
  </Script>
)}
```

---

## ⚙️ Script Loading Strategies

Next.js `<Script>` Component hat verschiedene Strategien:

### `strategy="afterInteractive"` (DEFAULT)
- Lädt nach Seite interaktiv ist
- **Best for:** Analytics, Ads
- **Performance:** Gut

### `strategy="beforeInteractive"`
- Lädt vor Seite interaktiv ist
- **Best for:** Critical Scripts (z.B. A/B Testing)
- **Performance:** Kann blocken

### `strategy="lazyOnload"`
- Lädt wenn Browser idle ist
- **Best for:** Non-critical Scripts (z.B. Chat Widgets)
- **Performance:** Beste

### `strategy="worker"` (Experimental)
- Lädt in Web Worker
- **Best for:** Heavy Scripts
- **Performance:** Experimentell

---

## 🔒 Security Best Practices

### ✅ DO:
- Environment Variables für alle IDs nutzen
- `NEXT_PUBLIC_` Prefix für Client-Side Variables
- Scripts nur laden wenn Variable gesetzt ist
- Content Security Policy (CSP) beachten

### ❌ DON'T:
- IDs direkt im Code hardcoden
- Sensitive Daten in Public Variables
- Zu viele Scripts gleichzeitig laden (Performance!)

---

## 📊 Performance Monitoring

### Scripts Impact testen:

**Chrome DevTools:**
1. F12 → Performance Tab
2. Record
3. Reload Page
4. Analyze "Scripting" Time

**Lighthouse:**
```bash
npm run build
npm run start
# Open Chrome DevTools → Lighthouse → Generate Report
```

**Target:**
- Total Blocking Time < 200ms
- Scripting < 2s

---

## 🧪 Testing

### Lokal testen (ohne Production IDs):

**`.env.local` (nicht in Git!):**
```bash
NEXT_PUBLIC_GA_ID=G-TEST123
NEXT_PUBLIC_ADSENSE_ID=ca-pub-test
```

### Production testen:

1. Deploy to Vercel
2. Chrome DevTools → Network Tab
3. Filter: `gtag` oder `adsbygoogle`
4. Check if scripts load ✅

---

## 📝 Changelog

### 2025-11-06
- ✅ Plausible Analytics Support hinzugefügt (Self-Hosted)

### 2025-01-12
- ✅ Analytics Component erstellt
- ✅ Google Analytics 4 Support
- ✅ Google AdSense Support
- ✅ Meta Pixel Support
- ✅ Pinterest Tag Support

---

## 🆘 Troubleshooting

### Problem: Scripts laden nicht

**Check:**
1. Environment Variables korrekt gesetzt? (Vercel Dashboard)
2. Redeploy nach Variable-Änderung?
3. Browser Cache löschen (Ctrl + Shift + R)

### Problem: Ad Blocker blockiert Scripts

**Normal!** Ad Blocker blockieren Tracking-Scripts. Test in:
- Incognito Mode (ohne Extensions)
- Oder deaktiviere Ad Blocker temporär

### Problem: Performance Issues

**Solution:**
- Weniger Scripts gleichzeitig
- `strategy="lazyOnload"` für non-critical Scripts
- Conditional Loading (nur auf bestimmten Seiten)

---

## 📚 Weitere Ressourcen

- [Next.js Script Component Docs](https://nextjs.org/docs/app/api-reference/components/script)
- [Google Analytics Setup](https://analytics.google.com)
- [Meta Pixel Setup](https://business.facebook.com/events_manager)
- [Pinterest Tag Setup](https://help.pinterest.com/en/business/article/track-conversions-with-pinterest-tag)

---

**Letzte Aktualisierung:** 2025-01-12
