# WordPress + Next.js Setup Guide für Lookenly

Diese Anleitung zeigt dir Schritt für Schritt, wie du deine WordPress-Installation mit deinem Next.js Frontend verbindest.

---

## Voraussetzungen

- Eine laufende WordPress-Installation
- Admin-Zugang zu WordPress
- FTP oder Hosting-Panel Zugang (für CORS-Konfiguration)

---

## Schritt 1: WPGraphQL Plugin installieren

### 1.1 Plugin herunterladen und installieren

**Option A: Über WordPress Admin (empfohlen)**

1. Gehe zu **Plugins → Neu hinzufügen**
2. Suche nach **"WPGraphQL"**
3. Klicke auf **"Jetzt installieren"** beim Plugin "WPGraphQL" von WPGraphQL
4. Nach der Installation klicke auf **"Aktivieren"**

**Option B: Manueller Download**

1. Lade das Plugin von https://wordpress.org/plugins/wp-graphql/ herunter
2. Entpacke die ZIP-Datei
3. Lade den Ordner `wp-graphql` per FTP in `/wp-content/plugins/` hoch
4. Aktiviere das Plugin im WordPress Admin unter **Plugins**

### 1.2 Plugin-Einstellungen

Nach der Aktivierung:

1. Gehe zu **GraphQL → Einstellungen** im WordPress Admin
2. Stelle sicher, dass der **GraphQL Endpoint** aktiviert ist
3. Standard-Endpunkt ist: `https://deine-wordpress-seite.de/graphql`

---

## Schritt 2: CORS (Cross-Origin Resource Sharing) konfigurieren

Damit dein Next.js Frontend auf die WordPress GraphQL API zugreifen kann, musst du CORS-Header einrichten.

### Option A: Per Plugin (Einfacher)

1. Installiere das Plugin **"WPGraphQL CORS"**
   - Gehe zu **Plugins → Neu hinzufügen**
   - Suche nach "WPGraphQL CORS"
   - Installiere und aktiviere es

2. Gehe zu **GraphQL → Einstellungen → CORS**

3. Füge deine Next.js URL hinzu:
   - Für lokale Entwicklung: `http://localhost:3002`
   - Für Produktion: `https://deine-domain.com`

### Option B: Manuell in wp-config.php (Fortgeschritten)

Füge folgenden Code **vor** der Zeile `/* That's all, stop editing! */` in deine `wp-config.php` ein:

```php
// CORS Header für GraphQL API
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
```

**⚠️ Wichtig für Produktion:** Ersetze `*` durch deine spezifische Domain:

```php
header('Access-Control-Allow-Origin: https://deine-domain.com');
```

---

## Schritt 3: WordPress Kategorien erstellen

Erstelle die drei Hauptkategorien, die dein Frontend erwartet:

1. Gehe zu **Beiträge → Kategorien**

2. Erstelle folgende Kategorien:

   **Fashion**
   - Name: `Fashion`
   - Slug: `fashion` (automatisch)
   - Beschreibung: `Timeless Elegance`

   **Beauty**
   - Name: `Beauty`
   - Slug: `beauty` (automatisch)
   - Beschreibung: `Refined Grace`

   **Lifestyle**
   - Name: `Lifestyle`
   - Slug: `lifestyle` (automatisch)
   - Beschreibung: `Curated Living`

---

## Schritt 4: Next.js .env.local konfigurieren

1. Öffne die Datei `.env.local` in deinem `fashion-blog` Ordner

2. Ersetze die Platzhalter-URL durch deine echte WordPress-URL:

```bash
# WordPress GraphQL API Endpoint
NEXT_PUBLIC_WORDPRESS_API_URL=https://deine-wordpress-seite.de/graphql

# Optional: Deine öffentliche Site URL für Pinterest Sharing
NEXT_PUBLIC_SITE_URL=https://deine-domain.com
```

**Beispiel:**
```bash
NEXT_PUBLIC_WORDPRESS_API_URL=https://meinblog.de/graphql
NEXT_PUBLIC_SITE_URL=https://lookenly.com
```

3. Speichere die Datei

4. **Starte den Next.js Dev-Server neu:**
   ```bash
   # Beende den aktuellen Server (Strg+C)
   # Starte neu:
   npm run dev
   ```

---

## Schritt 5: Verbindung testen

### 5.1 GraphQL Endpoint im Browser testen

1. Öffne in deinem Browser:
   ```
   https://deine-wordpress-seite.de/graphql
   ```

2. Du solltest eine GraphQL IDE (GraphiQL) sehen

3. Teste eine einfache Query:
   ```graphql
   query {
     posts(first: 5) {
       nodes {
         id
         title
         slug
       }
     }
   }
   ```

4. Wenn du Ergebnisse siehst, funktioniert die GraphQL API! ✅

### 5.2 Next.js Verbindung testen

1. Öffne dein Next.js Frontend im Browser:
   ```
   http://localhost:3002
   ```

2. Öffne die Browser-Konsole (F12)

3. Schaue nach:
   - ✅ **Keine Fehler:** WordPress ist verbunden, Posts werden geladen
   - ❌ **"Error fetching posts"**: Überprüfe `.env.local` und CORS-Einstellungen
   - ❌ **CORS-Fehler:** Füge CORS-Header hinzu (siehe Schritt 2)

---

## Schritt 6: Ersten Blog-Post erstellen

1. Gehe zu **Beiträge → Erstellen** in WordPress

2. Erstelle einen Post:
   - **Titel:** z.B. "The Art of Timeless Elegance"
   - **Inhalt:** Schreibe deinen Blog-Content
   - **Kategorie:** Wähle "Fashion", "Beauty" oder "Lifestyle"
   - **Beitragsbild:** Lade ein hochauflösendes Bild (mind. 800x1200px, Ratio 3:4) hoch

3. Klicke auf **"Veröffentlichen"**

4. Gehe zu deinem Next.js Frontend - der Post sollte nun erscheinen! 🎉

---

## Schritt 7: Bilder optimieren (Optional aber empfohlen)

### WordPress Beitragsbilder Einstellungen

1. Gehe zu **Einstellungen → Medien**

2. Empfohlene Bildgrößen für Pinterest-Optimierung:
   - **Große Größe:** 800 x 1200 (3:4 Ratio)
   - **Mittlere Größe:** 600 x 800
   - **Thumbnail:** 300 x 400

### Plugin für Bildoptimierung (optional)

Falls du noch kein Bildoptimierungs-Plugin nutzt:
- **ShortPixel** oder **Smush** bleiben empfehlenswert
- Komprimiere Bilder vor dem Upload für schnellere Ladezeiten

---

## Fehlerbehebung

### Problem: "Error fetching posts" in der Konsole

**Lösung 1: Überprüfe .env.local**
```bash
# Stelle sicher, dass die URL korrekt ist
NEXT_PUBLIC_WORDPRESS_API_URL=https://deine-seite.de/graphql
```

**Lösung 2: Überprüfe GraphQL Endpoint**
- Öffne `https://deine-seite.de/graphql` im Browser
- Du solltest GraphiQL sehen, nicht eine 404-Seite

**Lösung 3: Server neu starten**
```bash
# Beende den Server (Strg+C)
npm run dev
```

---

### Problem: CORS-Fehler in der Browser-Konsole

**Fehlermeldung:**
```
Access to fetch at 'https://...' from origin 'http://localhost:3002'
has been blocked by CORS policy
```

**Lösung:**
1. Installiere "WPGraphQL CORS" Plugin (siehe Schritt 2)
2. ODER füge CORS-Header in `wp-config.php` hinzu
3. Stelle sicher, dass `http://localhost:3002` als erlaubte Origin eingetragen ist

---

### Problem: Keine Beitragsbilder werden angezeigt

**Lösung 1: Remote Patterns prüfen**
- `next.config.ts` sollte bereits konfiguriert sein:
```typescript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: '**',
    },
  ],
}
```

**Lösung 2: Beitragsbild in WordPress setzen**
- Öffne den Post in WordPress
- Setze ein **"Beitragsbild"** (Featured Image) rechts in der Sidebar

---

### Problem: Mock-Posts werden weiterhin angezeigt

**Grund:** WordPress liefert keine Posts zurück

**Lösung:**
1. Erstelle mindestens 1 Post in WordPress
2. Stelle sicher, dass der Post **veröffentlicht** ist (nicht "Entwurf")
3. Überprüfe die GraphQL API im Browser
4. Refresh die Next.js Seite

---

## Zusätzliche empfohlene Plugins

Diese Plugins sind **optional**, aber hilfreich:

### Für SEO
- **Yoast SEO** oder **Rank Math**
  - Optimiert deine Posts für Suchmaschinen
  - WPGraphQL unterstützt SEO-Daten automatisch

### Für erweiterte Felder
- **Advanced Custom Fields (ACF)**
  - Falls du später Custom Fields brauchst
  - WPGraphQL unterstützt ACF mit dem "WPGraphQL for ACF" Plugin

### Für Sicherheit
- **Wordfence Security** (behalten!)
  - Schützt deine WordPress-Installation

---

## Make.com Szenarien - Keine Änderungen nötig!

Deine bestehenden Make.com Szenarien, die per HTTP-Request Posts zu WordPress hinzufügen, funktionieren **ohne Änderungen** weiter:

- Make.com schreibt Daten zu WordPress (REST API)
- Next.js liest Daten von WordPress (GraphQL API)
- Beide Systeme arbeiten parallel und beeinflussen sich nicht

✅ **Alles bleibt wie bisher - kein Eingriff in Make.com nötig!**

---

## Wichtige URLs für Referenz

| Was | URL |
|-----|-----|
| GraphQL Endpoint | `https://deine-seite.de/graphql` |
| WordPress Admin | `https://deine-seite.de/wp-admin` |
| Next.js Lokal | `http://localhost:3002` |
| WPGraphQL Docs | https://www.wpgraphql.com/docs |

---

## Nächste Schritte nach erfolgreicher Verbindung

1. **Content Migration:**
   - Kopiere bestehende Posts von alter Seite (falls vorhanden)
   - Oder erstelle neue Posts direkt in WordPress

2. **Custom Domain Setup:**
   - Verbinde deine Domain mit dem Next.js Hosting (Vercel empfohlen)
   - Update `NEXT_PUBLIC_SITE_URL` in `.env.local`

3. **Produktion Build:**
   ```bash
   npm run build
   npm run start
   ```

4. **Deployment:**
   - Deploye auf Vercel, Netlify oder einem anderen Next.js Host
   - Stelle sicher, dass die Environment Variables dort auch gesetzt sind

---

## Hilfe benötigt?

Falls du Probleme hast:

1. **Überprüfe die Browser-Konsole** (F12) auf Fehlermeldungen
2. **Teste den GraphQL Endpoint** direkt im Browser
3. **Überprüfe WordPress Error Logs** im Hosting-Panel
4. **Server neu starten** nach .env.local Änderungen

---

Viel Erfolg mit deinem neuen Lookenly Blog! 🎨✨
