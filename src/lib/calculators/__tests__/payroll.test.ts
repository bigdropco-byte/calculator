import { describe, it, expect } from 'vitest';
import {
  calculateFederalIncomeTax,
  calculateFica,
  calculateStateTax,
  calculateComprehensivePaycheck,
  calculateOvertime,
  calculatePayRaise,
  calculateEic,
  generateWageFrequencies,
} from '../payroll';

describe('Payroll Calculation Engine', () => {
  describe('Federal Income Tax', () => {
    it('calculates federal tax for single filer within standard deduction', () => {
      const res = calculateFederalIncomeTax(12000, 'single');
      expect(res.taxableIncome).toBe(0);
      expect(res.annualTax).toBe(0);
      expect(res.effectiveRate).toBe(0);
    });

    it('calculates federal tax for single filer with income above standard deduction', () => {
      // $65,000 gross, std deduction $15,000 -> taxable $50,000
      // 10% on first $11,925 = $1,192.50
      // 12% on $48,475 - $11,925 = $36,550 * 0.12 = $4,386.00
      // 22% on $50,000 - $48,475 = $1,525 * 0.22 = $335.50
      // Total tax = 1192.5 + 4386 + 335.5 = $5,914
      const res = calculateFederalIncomeTax(65000, 'single');
      expect(res.taxableIncome).toBe(50000);
      expect(res.annualTax).toBe(5914);
      expect(res.marginalRate).toBe(22);
    });
  });

  describe('FICA Calculations', () => {
    it('computes 6.2% Social Security and 1.45% Medicare under wage base', () => {
      const res = calculateFica(100000, 'single');
      expect(res.socialSecurity).toBe(6200);
      expect(res.medicare).toBe(1450);
      expect(res.additionalMedicare).toBe(0);
      expect(res.totalFica).toBe(7650);
    });

    it('caps Social Security at $176,100 limit and applies Additional Medicare over $200k', () => {
      const res = calculateFica(250000, 'single');
      expect(res.socialSecurity).toBe(Math.round(176100 * 0.062));
      // Base medicare = 250,000 * 0.0145 = 3,625
      // Addl medicare = (250,000 - 200,000) * 0.009 = 450
      // Total medicare = 4,075
      expect(res.additionalMedicare).toBe(450);
      expect(res.medicare).toBe(4075);
    });
  });

  describe('State Tax Modules', () => {
    it('applies 0% state tax for Texas and Florida', () => {
      expect(calculateStateTax('TX', 80000).stateTax).toBe(0);
      expect(calculateStateTax('FL', 80000).stateTax).toBe(0);
    });

    it('applies flat 4.95% state tax for Illinois and Chicago', () => {
      const il = calculateStateTax('IL', 100000);
      expect(il.stateTax).toBe(4950);
      const chi = calculateStateTax('Chicago', 100000);
      expect(chi.stateTax).toBe(4950);
    });

    it('calculates California state tax with SDI disability insurance', () => {
      const ca = calculateStateTax('CA', 100000);
      expect(ca.stateTax).toBeGreaterThan(3000);
      expect(ca.stateDisability).toBe(1100);
    });
  });

  describe('Comprehensive Paycheck', () => {
    it('computes net take-home pay across pay frequencies', () => {
      const biweekly = calculateComprehensivePaycheck({
        grossPay: 3000,
        frequency: 'bi-weekly',
        filingStatus: 'single',
        state: 'TX',
      });
      expect(biweekly.annualGross).toBe(78000);
      expect(biweekly.netPayPerPeriod).toBeGreaterThan(2000);
      expect(biweekly.netPayPerPeriod).toBeLessThan(3000);
      expect(biweekly.annualStateTax).toBe(0); // TX zero tax
    });

    it('generates multi-frequency table from annual gross and net', () => {
      const frequencies = generateWageFrequencies(100000, 75000);
      expect(frequencies).toHaveLength(7);
      expect(frequencies[0].gross).toBe(100000);
      expect(frequencies[1].gross).toBe(Math.round(100000 / 12));
    });
  });

  describe('Overtime & Pay Raise', () => {
    it('calculates 1.5x overtime and 2.0x double time accurately', () => {
      const res = calculateOvertime(30, 40, 10, 5);
      // Regular: 40 * 30 = 1200
      // OT: 10 * 45 = 450
      // DT: 5 * 60 = 300
      // Total: 1950
      expect(res.regularPay).toBe(1200);
      expect(res.overtimePay).toBe(450);
      expect(res.doubleTimePay).toBe(300);
      expect(res.totalGrossPay).toBe(1950);
      expect(res.effectiveHourlyRate).toBe(Number((1950 / 55).toFixed(2)));
    });

    it('computes percentage and dollar amount pay raises', () => {
      const pctRaise = calculatePayRaise(60000, 'percent', 10, 'annual');
      expect(pctRaise.newAnnual).toBe(66000);
      expect(pctRaise.differenceAnnual).toBe(6000);

      const hourlyRaise = calculatePayRaise(25, 'amount', 5, 'hourly');
      expect(hourlyRaise.newPay).toBe(30);
      expect(hourlyRaise.percentageIncrease).toBe(20);
    });
  });

  describe('Earned Income Credit (EIC)', () => {
    it('calculates EIC for eligible family with children', () => {
      const res = calculateEic(25000, 'single', 2);
      expect(res.isEligible).toBe(true);
      expect(res.estimatedCredit).toBeGreaterThan(5000);
    });

    it('returns ineligible when income exceeds statutory limit', () => {
      const res = calculateEic(80000, 'single', 1);
      expect(res.isEligible).toBe(false);
      expect(res.estimatedCredit).toBe(0);
    });
  });
});
