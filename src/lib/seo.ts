import { CalculatorDefinition } from './types';
import { CATEGORIES } from './categoryRegistry';

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
 * Guaranteed properties:
 * - Always starts with SITE_CONFIG.url (https://calculat.dev)
 * - Strips query strings (?sort=popular, ?utm_source=...) and hash anchors (#section)
 * - Preserves file extensions without trailing slash (/sitemap.xml, /favicon.ico)
 * - Always appends a single trailing slash to web pages (/calculators/, /about/, /calculators/percentage-calculator/)
 * - Handles root path as https://calculat.dev/
 */
export function getCanonicalUrl(path: string = ''): string {
  if (!path || path === '/' || path === SITE_CONFIG.url || path === `${SITE_CONFIG.url}/`) {
    return `${SITE_CONFIG.url}/`;
  }

  // Strip origin / protocol / host if present
  let clean = path.replace(/^https?:\/\/[^\/]+/i, '');
  // Strip query parameters and fragments (canonical URLs must never contain query strings)
  clean = clean.replace(/[?#].*$/, '');
  // Trim surrounding slashes and whitespace
  clean = clean.trim().replace(/^\/+|\/+$/g, '');

  if (!clean) {
    return `${SITE_CONFIG.url}/`;
  }

  // If path ends with a file extension, do not append a trailing slash
  if (/\.[a-zA-Z0-9]+$/.test(clean)) {
    return `${SITE_CONFIG.url}/${clean}`;
  }

  return `${SITE_CONFIG.url}/${clean}/`;
}

/**
 * Generates standard Next.js alternates metadata with self-referencing canonical
 * and hreflang annotations (en-US, x-default) for comprehensive search engine clarity.
 */
export function getCanonicalAlternates(path: string = '') {
  const canonicalUrl = getCanonicalUrl(path);
  return {
    canonical: canonicalUrl,
    languages: {
      'en-US': canonicalUrl,
      'x-default': canonicalUrl,
    },
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

export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_CONFIG.url}/#website`,
    name: SITE_CONFIG.name,
    url: `${SITE_CONFIG.url}/`,
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

export function generateCalculatorSchema(calculator: CalculatorDefinition) {
  const categoryName = CATEGORIES[calculator.category]?.name || calculator.category;
  const canonicalUrl = getCanonicalUrl(`/calculators/${calculator.slug}`);

  return {
    '@context': 'https://schema.org',
    '@type': ['WebApplication', 'SoftwareApplication'],
    '@id': `${canonicalUrl}#software`,
    name: calculator.name,
    url: canonicalUrl,
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
  items: { name: string; url: string; description?: string }[]
) {
  const canonicalUrl = getCanonicalUrl(url);
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${canonicalUrl}#webpage`,
    name: title,
    description,
    url: canonicalUrl,
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
        url: getCanonicalUrl(item.url),
      })),
    },
  };
}

export function generateWebPageSchema(title: string, description: string, url: string) {
  const canonicalUrl = getCanonicalUrl(url);
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${canonicalUrl}#webpage`,
    name: title,
    description,
    url: canonicalUrl,
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${SITE_CONFIG.url}/#website`,
      name: SITE_CONFIG.name,
      url: `${SITE_CONFIG.url}/`,
    },
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: getCanonicalUrl(item.url),
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

