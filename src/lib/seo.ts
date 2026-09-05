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
};

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
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

export function generateCalculatorSchema(calculator: CalculatorDefinition) {
  const categoryName = CATEGORIES[calculator.category]?.name || calculator.category;

  return {
    '@context': 'https://schema.org',
    '@type': ['WebApplication', 'SoftwareApplication'],
    name: calculator.name,
    url: `${SITE_CONFIG.url}/calculators/${calculator.slug}`,
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
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
  };
}

export function generateCollectionPageSchema(
  title: string,
  description: string,
  url: string,
  items: { name: string; url: string; description?: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: title,
    description,
    url: url.startsWith('http') ? url : `${SITE_CONFIG.url}${url}`,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: items.length,
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        description: item.description,
        url: item.url.startsWith('http') ? item.url : `${SITE_CONFIG.url}${item.url}`,
      })),
    },
  };
}

export function generateWebPageSchema(title: string, description: string, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: url.startsWith('http') ? url : `${SITE_CONFIG.url}${url}`,
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
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
      item: item.url.startsWith('http') ? item.url : `${SITE_CONFIG.url}${item.url}`,
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
