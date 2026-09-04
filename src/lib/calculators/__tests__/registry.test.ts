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

  it('verifies exact total count is 198 calculators', () => {
    expect(allCalcs.length).toBe(198);
    expect(published.length).toBe(198);
  });

  it('contains all 29 construction, wood, masonry, and pocket calculators', () => {
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

  it('contains all 27 newly added STEM, fitness, packaging, and character calculators', () => {
    const stemSlugs = [
      'sphere-packing-calculator',
      'asq-calculator',
      'grade-calculator',
      'student-t-value-calculator',
      'wilks-calculator',
      'apft-calculator',
      'acft-calculator',
      'shipping-box-size-calculator',
      'heat-index-calculator',
      'inch-to-cm-converter',
      'chi-square-calculator',
      'word-counter',
      'packing-calculator',
      'cube-root-calculator',
      'best-scientific-calculator',
      'box-packing-calculator',
      'korean-character-counter',
      'japanese-character-counter',
      'twitter-character-counter',
      'chinese-character-counter',
      'solver',
      'partial-fraction-decomposition-calculator',
      'bench-press-calculator',
      'age-difference-calculator',
      'video-speed-calculator',
      'bin-packing-calculator',
      'ip-subnet-calculator',
    ];

    expect(stemSlugs.length).toBe(27);

    for (const slug of stemSlugs) {
      const calc = getCalculatorBySlug(slug);
      expect(calc, `Expected calculator with slug "${slug}" to exist in registry`).toBeDefined();
      expect(calc?.editorial.faqs.length).toBe(4);
      expect(calc?.seo.title.length).toBeGreaterThan(10);
      expect(calc?.seo.metaDescription.length).toBeGreaterThan(30);
      expect(calc?.editorial.formula.expression.length).toBeGreaterThan(5);
    }
  });
});
