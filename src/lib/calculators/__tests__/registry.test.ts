import { describe, it, expect } from 'vitest';
import { getAllCalculators, getAllPublishedCalculators, getCalculatorBySlug } from '../../calculatorRegistry';

describe('Calculator Registry Integrity', () => {
  const allCalcs = getAllCalculators();
  const published = getAllPublishedCalculators();

  it('has unique slugs across all calculators', () => {
    const slugs = allCalcs.map(c => c.slug);
    const uniqueSlugs = new Set(slugs);
    expect(slugs.length).toBe(uniqueSlugs.size);
  });

  it('verifies exact total count is 142 calculators', () => {
    expect(allCalcs.length).toBe(142);
    expect(published.length).toBe(142);
  });

  it('contains all 13 newly added percentage suite calculators', () => {
    const newSlugs = [
      'discount-percentage-calculator',
      'win-percentage-calculator',
      'yearly-percentage-increase-calculator',
      'percentage-decrease-calculator',
      'part-time-percentage-calculator',
      'time-percentage-calculator',
      'percentage-of-time-calculator',
      'reverse-percentage-calculator',
      'growth-percentage-calculator',
      'tax-percentage-calculator',
      'vat-percentage-calculator',
      'slugging-percentage-calculator',
      'fat-percentage-calculator',
    ];

    for (const slug of newSlugs) {
      const calc = getCalculatorBySlug(slug);
      expect(calc, `Expected calculator with slug "${slug}" to exist in registry`).toBeDefined();
      expect(calc?.editorial.faqs.length).toBe(4);
      expect(calc?.seo.title.length).toBeGreaterThan(10);
      expect(calc?.seo.metaDescription.length).toBeGreaterThan(30);
      expect(calc?.editorial.formula.expression.length).toBeGreaterThan(5);
    }
  });
});
