/**
 * German Language Configuration
 *
 * Note: German sites require "Impressum" and "Datenschutz" instead of
 * Privacy Policy and Terms of Service (legal requirement in Germany/EU)
 */

import type { LanguageConfig } from './index';

export const deConfig: LanguageConfig = {
  code: 'de',
  name: 'German',
  nativeName: 'Deutsch',

  legalPages: {
    privacy: {
      slug: 'datenschutz',
      title: 'Datenschutzerklärung',
      menuLabel: 'Datenschutz',
    },
    terms: {
      slug: 'impressum',
      title: 'Impressum',
      menuLabel: 'Impressum',
    },
    disclaimer: {
      slug: 'haftungsausschluss',
      title: 'Haftungsausschluss',
      menuLabel: 'Haftungsausschluss',
    },
  },

  ui: {
    navigation: {
      home: 'Startseite',
      about: 'Über uns',
      search: 'Suche',
      categories: 'Kategorien',
    },
    blog: {
      readMore: 'Weiterlesen',
      relatedPosts: 'Ähnliche Beiträge',
      shareOn: 'Teilen auf',
      publishedOn: 'Veröffentlicht am',
      by: 'von',
      in: 'in',
      tags: 'Tags',
      minutes: 'Minuten',
      minRead: 'Min. Lesezeit',
    },
    search: {
      placeholder: 'Artikel suchen...',
      noResults: 'Keine Ergebnisse gefunden',
      resultsFor: 'Ergebnisse für',
      searching: 'Suche läuft...',
    },
    footer: {
      allRightsReserved: 'Alle Rechte vorbehalten',
      legal: 'Rechtliches',
      explore: 'Entdecken',
      follow: 'Folgen',
    },
  },
};
