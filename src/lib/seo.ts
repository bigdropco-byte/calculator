import { CalculatorDefinition } from './types';
import { CATEGORIES } from './categoryRegistry';

export const SITE_CONFIG = {
  name: 'Calculat',
  domain: 'calculat.dev',
  url: 'https://calculat.dev',
  tagline: 'Online Calculators for Everything',
  description:
    'Find free, fast, and accurate online calculators for math, finance, health, dates, everyday calculations, and more. Clean directory-first search engine for calculation tools.',
};

export function generateCalculatorSchema(calculator: CalculatorDefinition) {
  const categoryName = CATEGORIES[calculator.category]?.name || calculator.category;

  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: calculator.name,
    url: `${SITE_CONFIG.url}/calculators/${calculator.slug}`,
    description: calculator.shortDescription,
    applicationCategory: categoryName,
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    datePublished: calculator.addedDate,
    author: {
      '@type': 'Organization',
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
