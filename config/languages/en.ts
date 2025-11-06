/**
 * English Language Configuration
 */

import type { LanguageConfig } from './index';

export const enConfig: LanguageConfig = {
  code: 'en',
  name: 'English',
  nativeName: 'English',

  legalPages: {
    privacy: {
      slug: 'privacy',
      title: 'Privacy Policy',
      menuLabel: 'Privacy Policy',
    },
    terms: {
      slug: 'terms',
      title: 'Terms of Service',
      menuLabel: 'Terms of Service',
    },
    disclaimer: {
      slug: 'disclaimer',
      title: 'Disclaimer',
      menuLabel: 'Disclaimer',
    },
  },

  ui: {
    navigation: {
      home: 'Home',
      about: 'About',
      search: 'Search',
      categories: 'Categories',
    },
    blog: {
      readMore: 'Read More',
      relatedPosts: 'Related Posts',
      shareOn: 'Share on',
      publishedOn: 'Published on',
      by: 'by',
      in: 'in',
      tags: 'Tags',
      minutes: 'minutes',
      minRead: 'min read',
    },
    search: {
      placeholder: 'Search articles...',
      noResults: 'No results found',
      resultsFor: 'Results for',
      searching: 'Searching...',
    },
    footer: {
      allRightsReserved: 'All Rights Reserved',
      legal: 'Legal',
      explore: 'Explore',
      follow: 'Follow',
    },
  },
};
