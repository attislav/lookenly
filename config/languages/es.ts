/**
 * Spanish Language Configuration
 */

import type { LanguageConfig } from './index';

export const esConfig: LanguageConfig = {
  code: 'es',
  name: 'Spanish',
  nativeName: 'Español',

  legalPages: {
    privacy: {
      slug: 'privacidad',
      title: 'Política de Privacidad',
      menuLabel: 'Privacidad',
    },
    terms: {
      slug: 'terminos',
      title: 'Términos de Servicio',
      menuLabel: 'Términos',
    },
    disclaimer: {
      slug: 'aviso-legal',
      title: 'Aviso Legal',
      menuLabel: 'Aviso Legal',
    },
  },

  ui: {
    navigation: {
      home: 'Inicio',
      about: 'Acerca de',
      search: 'Buscar',
      categories: 'Categorías',
    },
    blog: {
      readMore: 'Leer más',
      relatedPosts: 'Artículos relacionados',
      shareOn: 'Compartir en',
      publishedOn: 'Publicado el',
      by: 'por',
      in: 'en',
      tags: 'Etiquetas',
      minutes: 'minutos',
      minRead: 'min de lectura',
    },
    search: {
      placeholder: 'Buscar artículos...',
      noResults: 'No se encontraron resultados',
      resultsFor: 'Resultados para',
      searching: 'Buscando...',
    },
    footer: {
      allRightsReserved: 'Todos los derechos reservados',
      legal: 'Legal',
      explore: 'Explorar',
      follow: 'Seguir',
    },
  },
};
