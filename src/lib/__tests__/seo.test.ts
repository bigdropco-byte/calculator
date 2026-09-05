import { describe, it, expect } from 'vitest';
import {
  getCanonicalUrl,
  getCanonicalAlternates,
  generateCalculatorSchema,
  generateCollectionPageSchema,
  generateWebPageSchema,
  generateBreadcrumbSchema,
  SITE_CONFIG,
} from '../seo';

describe('SEO & Canonical URL Utilities', () => {
  it('normalizes root and empty paths to canonical root with trailing slash', () => {
    expect(getCanonicalUrl('')).toBe('https://calculat.dev/');
    expect(getCanonicalUrl('/')).toBe('https://calculat.dev/');
    expect(getCanonicalUrl('https://calculat.dev')).toBe('https://calculat.dev/');
    expect(getCanonicalUrl('https://calculat.dev/')).toBe('https://calculat.dev/');
  });

  it('normalizes directory routes with trailing slash', () => {
    expect(getCanonicalUrl('/calculators')).toBe('https://calculat.dev/calculators/');
    expect(getCanonicalUrl('/calculators/')).toBe('https://calculat.dev/calculators/');
    expect(getCanonicalUrl('calculators')).toBe('https://calculat.dev/calculators/');
    expect(getCanonicalUrl('/categories')).toBe('https://calculat.dev/categories/');
    expect(getCanonicalUrl('/categories/math')).toBe('https://calculat.dev/categories/math/');
    expect(getCanonicalUrl('/categories/math/')).toBe('https://calculat.dev/categories/math/');
  });

  it('normalizes calculator slug routes with trailing slash', () => {
    expect(getCanonicalUrl('/calculators/percentage-calculator')).toBe(
      'https://calculat.dev/calculators/percentage-calculator/'
    );
    expect(getCanonicalUrl('https://calculat.dev/calculators/bmi-calculator')).toBe(
      'https://calculat.dev/calculators/bmi-calculator/'
    );
  });

  it('strips query parameters and hashes from canonical URLs', () => {
    expect(getCanonicalUrl('/calculators?sort=popular')).toBe('https://calculat.dev/calculators/');
    expect(getCanonicalUrl('/calculators/?ref=google&utm_source=test#top')).toBe(
      'https://calculat.dev/calculators/'
    );
  });

  it('preserves file extensions without trailing slash', () => {
    expect(getCanonicalUrl('/sitemap.xml')).toBe('https://calculat.dev/sitemap.xml');
    expect(getCanonicalUrl('/favicon.ico')).toBe('https://calculat.dev/favicon.ico');
    expect(getCanonicalUrl('/calculat-logo.png')).toBe('https://calculat.dev/calculat-logo.png');
  });

  it('generates hreflang alternates correctly', () => {
    const alternates = getCanonicalAlternates('/calculators/tip-calculator');
    expect(alternates.canonical).toBe('https://calculat.dev/calculators/tip-calculator/');
    expect(alternates.languages['en-US']).toBe('https://calculat.dev/calculators/tip-calculator/');
    expect(alternates.languages['x-default']).toBe('https://calculat.dev/calculators/tip-calculator/');
  });

  it('generates interconnected Schema.org JSON-LD with canonical @id and URLs', () => {
    const mockCalc: any = {
      slug: 'percentage-calculator',
      name: 'Percentage Calculator',
      category: 'math',
      shortDescription: 'Calculate percentages',
      addedDate: '2026-09-01',
    };

    const schema: any = generateCalculatorSchema(mockCalc);
    expect(schema['@id']).toBe('https://calculat.dev/calculators/percentage-calculator/#software');
    expect(schema.url).toBe('https://calculat.dev/calculators/percentage-calculator/');
    expect(schema.mainEntityOfPage['@id']).toBe('https://calculat.dev/calculators/percentage-calculator/#webpage');
    expect(schema.isPartOf['@id']).toBe('https://calculat.dev/#website');
  });

  it('generates breadcrumbs with canonical URLs', () => {
    const breadcrumbs = [
      { name: 'Home', url: '/' },
      { name: 'Calculators', url: '/calculators' },
      { name: 'Math', url: '/categories/math' },
      { name: 'Percentage Calculator', url: '/calculators/percentage-calculator' },
    ];

    const schema = generateBreadcrumbSchema(breadcrumbs);
    expect(schema.itemListElement[0].item).toBe('https://calculat.dev/');
    expect(schema.itemListElement[1].item).toBe('https://calculat.dev/calculators/');
    expect(schema.itemListElement[2].item).toBe('https://calculat.dev/categories/math/');
    expect(schema.itemListElement[3].item).toBe('https://calculat.dev/calculators/percentage-calculator/');
  });
});
