import { describe, it, expect } from 'vitest';
import {
  calculateSingleCountryTax,
  calculateForeignTaxCredit,
  generateGlobalCountryComparisons,
  COUNTRY_PROFILES,
} from '../internationalTax';

describe('International Tax Calculator Engine', () => {
  it('calculates 0% tax for UAE expats', () => {
    const result = calculateSingleCountryTax('AE', 100000);
    expect(result.incomeTaxLocal).toBe(0);
    expect(result.socialSecurityLocal).toBe(0);
    expect(result.netIncomeLocal).toBe(100000);
    expect(result.effectiveTaxRate).toBe(0);
  });

  it('calculates US standard tax vs FEIE exclusion', () => {
    const standard = calculateSingleCountryTax('US', 100000, false);
    expect(standard.incomeTaxLocal).toBeGreaterThan(10000);
    expect(standard.socialSecurityLocal).toBeGreaterThan(5000);

    const feie = calculateSingleCountryTax('US', 100000, true);
    // Under $126,500 FEIE, taxable income is $0
    expect(feie.incomeTaxLocal).toBe(0);
    expect(feie.socialSecurityLocal).toBe(0);
    expect(feie.netIncomeLocal).toBe(100000);
  });

  it('calculates UK tax brackets and national insurance', () => {
    const res = calculateSingleCountryTax('GB', 50000);
    expect(res.incomeTaxLocal).toBeGreaterThan(0);
    expect(res.socialSecurityLocal).toBeGreaterThan(0);
    expect(res.netIncomeLocal).toBeLessThan(50000);
    expect(res.netIncomeLocal).toBeGreaterThan(35000);
  });

  it('handles Spain standard vs Beckham Law flat 24% regime', () => {
    const standard = calculateSingleCountryTax('ES', 100000, false);
    const beckham = calculateSingleCountryTax('ES', 100000, true);

    // Beckham law flat 24% tax should be exactly 24,000 income tax
    expect(beckham.incomeTaxLocal).toBe(24000);
    // Standard progressive tax for €100,000 in Spain is higher than 24%
    expect(standard.incomeTaxLocal).toBeGreaterThan(beckham.incomeTaxLocal);
  });

  it('handles Netherlands standard vs 30% Ruling', () => {
    const standard = calculateSingleCountryTax('NL', 80000, false);
    const ruling30 = calculateSingleCountryTax('NL', 80000, true);

    expect(ruling30.netIncomeLocal).toBeGreaterThan(standard.netIncomeLocal);
  });

  it('computes Foreign Tax Credit relief correctly', () => {
    // US citizen earning $100k working in the UK
    const dual = calculateForeignTaxCredit('US', 'GB', 100000);
    expect(dual.foreignTaxCreditUSD).toBeGreaterThan(0);
    expect(dual.doubleTaxationSavedUSD).toBeGreaterThan(0);
    expect(dual.netTakeHomeUSD).toBeGreaterThan(50000);
  });

  it('generates global comparisons ranked by take-home pay', () => {
    const comparisons = generateGlobalCountryComparisons(100000, 'US');
    expect(comparisons.length).toBe(10);
    // UAE should rank at or near the top due to 0% tax
    expect(comparisons[0].countryCode).toBe('AE');
    expect(comparisons[0].netAnnualUSD).toBe(100000);
  });

  it('contains valid configurations for all registered countries', () => {
    const codes = Object.keys(COUNTRY_PROFILES);
    expect(codes.length).toBeGreaterThanOrEqual(14);
    for (const code of codes) {
      const calc = calculateSingleCountryTax(code, 75000);
      expect(calc.netIncomeLocal).toBeGreaterThan(0);
      expect(calc.effectiveTaxRate).toBeGreaterThanOrEqual(0);
      expect(calc.effectiveTaxRate).toBeLessThan(100);
    }
  });
});
