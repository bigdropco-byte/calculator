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

  it('verifies exact total count is 246 calculators', () => {
    expect(allCalcs.length).toBe(246);
    expect(published.length).toBe(246);
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

  it('contains all 27 STEM, fitness, packaging, and character calculators', () => {
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

  it('contains all 12 newly added probability suite calculators', () => {
    const probSlugs = [
      'probability-calculator',
      'permutations-and-combinations-calculator',
      'binomial-probability-calculator',
      'dice-probability-calculator',
      'coin-flip-probability-calculator',
      'bayes-theorem-calculator',
      'normal-distribution-calculator',
      'poisson-probability-calculator',
      'odds-probability-calculator',
      'hypergeometric-calculator',
      'poker-odds-calculator',
      'lottery-odds-calculator',
    ];

    expect(probSlugs.length).toBe(12);

    for (const slug of probSlugs) {
      const calc = getCalculatorBySlug(slug);
      expect(calc, `Expected calculator with slug "${slug}" to exist in registry`).toBeDefined();
      expect(calc?.category).toBe('probability');
      expect(calc?.editorial.faqs.length).toBe(4);
      expect(calc?.seo.title.length).toBeGreaterThan(10);
      expect(calc?.seo.metaDescription.length).toBeGreaterThan(30);
      expect(calc?.editorial.formula.expression.length).toBeGreaterThan(5);
    }
  });

  it('contains all 36 newly added math suite calculators', () => {
    const mathSlugs = [
      // Equations (3)
      'linear-equation-calculator',
      'quadratic-equation-calculator',
      'system-of-linear-equations-calculator',
      // 2D Geometry (12)
      'circle-calculator',
      'triangle-calculator',
      'right-triangle-calculator',
      'square-calculator',
      'rectangle-calculator',
      'rhombus-calculator',
      'parallelogram-calculator',
      'trapezium-calculator',
      'pentagon-calculator',
      'hexagon-calculator',
      'polygon-calculator',
      'pythagorean-theorem-calculator',
      // 3D Geometry (7)
      'cube-calculator',
      'cuboid-calculator',
      'cylinder-calculator',
      'cone-calculator',
      'sphere-calculator',
      'prism-calculator',
      'pyramid-calculator',
      // Average (2)
      'arithmetic-mean-calculator',
      'weighted-average-calculator',
      // Powers & Roots (5)
      'square-power-calculator',
      'cube-power-calculator',
      'nth-power-calculator',
      'square-root-calculator',
      'nth-root-calculator',
      // Trigonometric Functions (4)
      'sine-calculator',
      'cosine-calculator',
      'tangent-calculator',
      'cotangent-calculator',
      // Logarithms (3)
      'logarithm-calculator',
      'natural-logarithm-calculator',
      'common-logarithm-calculator',
    ];

    expect(mathSlugs.length).toBe(36);

    for (const slug of mathSlugs) {
      const calc = getCalculatorBySlug(slug);
      expect(calc, `Expected calculator with slug "${slug}" to exist in registry`).toBeDefined();
      expect(calc?.category).toBe('math');
      expect(calc?.editorial.faqs.length).toBe(4);
      expect(calc?.seo.title.length).toBeGreaterThan(10);
      expect(calc?.seo.metaDescription.length).toBeGreaterThan(30);
      expect(calc?.editorial.formula.expression.length).toBeGreaterThan(5);
    }
  });
});

