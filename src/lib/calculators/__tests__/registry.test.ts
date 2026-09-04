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

  it('verifies exact total count is 171 calculators', () => {
    expect(allCalcs.length).toBe(171);
    expect(published.length).toBe(171);
  });

  it('contains all 29 newly added construction, wood, masonry, and pocket calculators', () => {
    const newSlugs = [
      'sakrete-calculator',
      'quikrete-calculator',
      'concrete-calculator',
      'calculator',
      'gravel-calculator',
      'stone-calculator',
      'asphalt-calculator',
      'american-asphalt',
      'crushed-asphalt',
      'vulcan-asphalt',
      'hot-mix-asphalt',
      'recycled-asphalt',
      'framing-wood',
      'wood-calculator',
      'trestle-wood',
      'weight-of-wood',
      'deck-wood',
      'cord-wood',
      'cord-of-wood',
      'cabinet-wood',
      'firewood-cord',
      'loose-cord-wood',
      'shed-wood',
      'fence-wood',
      'firewood-calculator',
      'concrete-slab',
      'concrete-block',
      'quikrete-concrete',
      'material-calculator',
    ];

    expect(newSlugs.length).toBe(29);

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
