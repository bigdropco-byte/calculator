import { CalculatorDefinition } from './types';
import { CATEGORIES } from './categoryRegistry';
import { DEFAULT_LOCALE, getLocalizedPath, Locale, stripLocaleFromPath, SUPPORTED_LOCALES } from './i18n/config';

export const SOCIAL_LINKS = {
  facebook: 'https://www.facebook.com/calculat.dev',
  reddit: 'https://www.reddit.com/user/Calculat_dev',
  x: 'https://x.com/calculat_dev',
  twitter: 'https://x.com/calculat_dev',
  pinterest: 'https://www.pinterest.com/calculat_dev',
  youtube: 'https://www.youtube.com/@calculat_dev',
};

export const SITE_CONFIG = {
  name: 'Calculat',
  domain: 'calculat.dev',
  url: 'https://calculat.dev',
  tagline: 'All Calculators, One Place.',
  description:
    'Find free, fast, and accurate online calculators for math, finance, health, dates, everyday calculations, and more. Clean directory-first search engine for calculation tools.',
  creator: 'Calculat Independent Student Project',
  social: SOCIAL_LINKS,
  twitterHandle: '@calculat_dev',
};

/**
 * Normalizes any route path, relative link, or full URL to an absolute canonical URL
 * conforming to Next.js trailingSlash: true static export configuration.
 *
 * If a locale is provided, formats the URL according to that locale's subpath
 * (English at root https://calculat.dev/, others at https://calculat.dev/[locale]/).
 */
export function getCanonicalUrl(path: string = '', locale?: Locale): string {
  // Strip origin if present
  let clean = path.replace(/^https?:\/\/[^\/]+/i, '');
  // Strip query parameters and fragments
  clean = clean.replace(/[?#].*$/, '').trim();

  // If path ends with a file extension, do not append a trailing slash or localize
  if (/\.[a-zA-Z0-9]+$/.test(clean)) {
    clean = clean.replace(/^\/+/, '');
    return `${SITE_CONFIG.url}/${clean}`;
  }

  // Determine effective locale and base path
  const parsed = stripLocaleFromPath(clean);
  const targetLocale = locale !== undefined ? locale : parsed.locale;
  const localizedPath = getLocalizedPath(parsed.pathWithoutLocale, targetLocale);

  if (localizedPath === '/') {
    return `${SITE_CONFIG.url}/`;
  }

  const trimmed = localizedPath.replace(/^\/+|\/+$/g, '');
  return `${SITE_CONFIG.url}/${trimmed}/`;
}

/**
 * Generates standard Next.js alternates metadata with self-referencing canonical
 * and full multilingual hreflang annotations (en, es, fr, de, pt, hi, x-default)
 * adhering strictly to Google Search Central internationalization requirements.
 */
export function getCanonicalAlternates(path: string = '', currentLocale: Locale = DEFAULT_LOCALE) {
  const { pathWithoutLocale } = stripLocaleFromPath(path);
  const canonicalUrl = getCanonicalUrl(pathWithoutLocale, currentLocale);

  const languages: Record<string, string> = {};
  for (const loc of SUPPORTED_LOCALES) {
    languages[loc] = getCanonicalUrl(pathWithoutLocale, loc);
  }
  // Also provide en-US and x-default for international targeting
  languages['en-US'] = getCanonicalUrl(pathWithoutLocale, DEFAULT_LOCALE);
  languages['x-default'] = getCanonicalUrl(pathWithoutLocale, DEFAULT_LOCALE);

  return {
    canonical: canonicalUrl,
    languages,
  };
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_CONFIG.url}/#organization`,
    name: SITE_CONFIG.name,
    url: `${SITE_CONFIG.url}/`,
    logo: `${SITE_CONFIG.url}/calculat-logo.png`,
    image: `${SITE_CONFIG.url}/calculat-logo.png`,
    slogan: SITE_CONFIG.tagline,
    description: SITE_CONFIG.description,
    founder: {
      '@type': 'Person',
      name: 'Independent Student Developer',
    },
    sameAs: [
      'https://www.facebook.com/calculat.dev',
      'https://www.reddit.com/user/Calculat_dev',
      'https://x.com/calculat_dev',
      'https://www.pinterest.com/calculat_dev',
      'https://www.youtube.com/@calculat_dev',
      'https://github.com/bigdropco-byte/calculator',
    ],
  };
}

export function generateWebSiteSchema(locale: Locale = DEFAULT_LOCALE) {
  const rootUrl = getCanonicalUrl('/', locale);
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${rootUrl}#website`,
    name: SITE_CONFIG.name,
    url: rootUrl,
    inLanguage: locale,
    description: SITE_CONFIG.description,
    publisher: {
      '@id': `${SITE_CONFIG.url}/#organization`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_CONFIG.url}/search/?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function generateCalculatorSchema(calculator: CalculatorDefinition, locale: Locale = DEFAULT_LOCALE) {
  const categoryName = CATEGORIES[calculator.category]?.name || calculator.category;
  const canonicalUrl = getCanonicalUrl(`/calculators/${calculator.slug}/`, locale);

  return {
    '@context': 'https://schema.org',
    '@type': ['WebApplication', 'SoftwareApplication'],
    '@id': `${canonicalUrl}#software`,
    name: calculator.name,
    url: canonicalUrl,
    inLanguage: locale,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${canonicalUrl}#webpage`,
      url: canonicalUrl,
    },
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${SITE_CONFIG.url}/#website`,
      name: SITE_CONFIG.name,
      url: `${SITE_CONFIG.url}/`,
    },
    description: calculator.shortDescription,
    applicationCategory: categoryName,
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    softwareVersion: '1.0',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    datePublished: calculator.addedDate,
    author: {
      '@type': 'Organization',
      '@id': `${SITE_CONFIG.url}/#organization`,
      name: SITE_CONFIG.name,
      url: `${SITE_CONFIG.url}/`,
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${SITE_CONFIG.url}/#organization`,
      name: SITE_CONFIG.name,
      url: `${SITE_CONFIG.url}/`,
    },
  };
}

export function generateCollectionPageSchema(
  title: string,
  description: string,
  url: string,
  items: { name: string; url: string; description?: string }[],
  locale: Locale = DEFAULT_LOCALE
) {
  const canonicalUrl = getCanonicalUrl(url, locale);
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${canonicalUrl}#webpage`,
    name: title,
    description,
    url: canonicalUrl,
    inLanguage: locale,
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${SITE_CONFIG.url}/#website`,
      name: SITE_CONFIG.name,
      url: `${SITE_CONFIG.url}/`,
    },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: items.length,
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        description: item.description,
        url: getCanonicalUrl(item.url, locale),
      })),
    },
  };
}

export function generateWebPageSchema(title: string, description: string, url: string, locale: Locale = DEFAULT_LOCALE) {
  const canonicalUrl = getCanonicalUrl(url, locale);
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${canonicalUrl}#webpage`,
    name: title,
    description,
    url: canonicalUrl,
    inLanguage: locale,
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${SITE_CONFIG.url}/#website`,
      name: SITE_CONFIG.name,
      url: `${SITE_CONFIG.url}/`,
    },
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[], locale: Locale = DEFAULT_LOCALE) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: getCanonicalUrl(item.url, locale),
    })),
  };
}

export function generateFaqSchema(faqs: { question: string; answer: string }[]) {
  if (!faqs || faqs.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}
