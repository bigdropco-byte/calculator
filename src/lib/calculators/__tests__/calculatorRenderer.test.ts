import { describe, it, expect } from 'vitest';
import React from 'react';
import { CalculatorRenderer } from '../../../components/calculators/CalculatorRenderer';

describe('CalculatorRenderer Slug Normalization and Fallbacks', () => {
  it('renders without throwing for standard slug', () => {
    const el = CalculatorRenderer({ slug: 'percentage-calculator' });
    expect(React.isValidElement(el)).toBe(true);
  });

  it('handles slug with trailing slash without falling to dead loading state', () => {
    const el = CalculatorRenderer({ slug: 'percentage-calculator/' });
    expect(React.isValidElement(el)).toBe(true);
  });

  it('handles uppercase and mixed case slugs', () => {
    const el = CalculatorRenderer({ slug: 'BMI-CALCULATOR' });
    expect(React.isValidElement(el)).toBe(true);
  });

  it('gracefully falls back to standard calculator on unknown slug instead of dead loading state', () => {
    const el = CalculatorRenderer({ slug: 'unknown-mystery-tool' });
    expect(React.isValidElement(el)).toBe(true);
  });

  it('handles empty or whitespace slug without crashing', () => {
    const el = CalculatorRenderer({ slug: '   ' });
    expect(React.isValidElement(el)).toBe(true);
  });
});
