import { describe, it, expect } from 'vitest';
import { calculatePercentOf, calculateIsWhatPercentOf, calculatePercentageChange } from '../percentage';
import { calculatePercentageIncrease } from '../percentageIncrease';
import { parseNumbers, calculateAverage } from '../average';
import { calculateAge } from '../age';
import { calculateDateDifference } from '../dateDifference';
import { calculateBmiMetric, calculateBmiImperial } from '../bmi';
import { calculateCompoundInterest } from '../compoundInterest';
import { calculateLoan } from '../loan';
import { calculateMortgage } from '../mortgage';
import { calculateTip } from '../tip';

describe('Percentage Calculators', () => {
  it('calculates percent of total correctly', () => {
    expect(calculatePercentOf(20, 150)).toBe(30);
    expect(calculatePercentOf(0, 100)).toBe(0);
    expect(calculatePercentOf(150, 200)).toBe(300);
  });

  it('calculates is-what-percent correctly', () => {
    expect(calculateIsWhatPercentOf(25, 100)).toBe(25);
    expect(calculateIsWhatPercentOf(50, 200)).toBe(25);
    expect(calculateIsWhatPercentOf(10, 0)).toBe(0); // Safe division by 0
  });

  it('calculates percentage change correctly', () => {
    const increase = calculatePercentageChange(100, 150);
    expect(increase.change).toBe(50);
    expect(increase.isIncrease).toBe(true);

    const decrease = calculatePercentageChange(100, 80);
    expect(decrease.change).toBe(20);
    expect(decrease.isIncrease).toBe(false);
  });

  it('calculates percentage increase details with multiplier', () => {
    const res = calculatePercentageIncrease(50, 75);
    expect(res.difference).toBe(25);
    expect(res.percentageChange).toBe(50);
    expect(res.isIncrease).toBe(true);
    expect(res.multiplier).toBe(1.5);
  });
});

describe('Average Calculator', () => {
  it('parses formatted number strings correctly', () => {
    expect(parseNumbers('10, 20, 30\n40 50')).toEqual([10, 20, 30, 40, 50]);
    expect(parseNumbers('')).toEqual([]);
  });

  it('computes mean, median, mode, range', () => {
    const res = calculateAverage([10, 20, 30, 40, 50]);
    expect(res.count).toBe(5);
    expect(res.sum).toBe(150);
    expect(res.mean).toBe(30);
    expect(res.median).toBe(30);
    expect(res.min).toBe(10);
    expect(res.max).toBe(50);
    expect(res.range).toBe(40);
  });

  it('computes even count median and multiple modes', () => {
    const res = calculateAverage([2, 4, 4, 6, 6, 8]);
    expect(res.median).toBe(5);
    expect(res.modes).toEqual([4, 6]);
  });
});

describe('Age Calculator', () => {
  it('calculates exact age correctly', () => {
    const res = calculateAge('2000-01-01', '2026-09-04');
    expect(res.years).toBe(26);
    expect(res.months).toBe(8);
    expect(res.days).toBe(3);
    expect(res.isInvalid).toBe(false);
    expect(res.totalDays).toBeGreaterThan(9700);
  });

  it('rejects future birthday dates', () => {
    const res = calculateAge('2030-01-01', '2026-01-01');
    expect(res.isInvalid).toBe(true);
    expect(res.errorMessage).toBe('Date of birth cannot be in the future');
  });
});

describe('Date Difference Calculator', () => {
  it('calculates calendar and business days', () => {
    // 2026-09-01 is Tuesday, 2026-09-08 is Tuesday (7 days)
    const res = calculateDateDifference('2026-09-01', '2026-09-08', false);
    expect(res.totalDays).toBe(7);
    expect(res.totalWeeks).toBe(1);
    expect(res.businessDays).toBe(5);
    expect(res.weekendDays).toBe(2);
  });

  it('handles include end date option', () => {
    const res = calculateDateDifference('2026-09-01', '2026-09-08', true);
    expect(res.totalDays).toBe(8);
  });
});

describe('BMI Calculator', () => {
  it('calculates metric BMI correctly', () => {
    const res = calculateBmiMetric(70, 175);
    expect(res.bmi).toBe(22.9);
    expect(res.category).toBe('Normal weight');
    expect(res.categoryClass).toBe('normal');
    expect(res.healthyWeightMin).toBeCloseTo(56.7, 1);
  });

  it('calculates imperial BMI correctly', () => {
    const res = calculateBmiImperial(154, 5, 9); // 154 lbs, 5'9"
    expect(res.bmi).toBeCloseTo(22.7, 0);
    expect(res.category).toBe('Normal weight');
  });

  it('identifies obesity categories', () => {
    const res = calculateBmiMetric(110, 170); // BMI ~38
    expect(res.categoryClass).toBe('obese2');
  });
});

describe('Compound Interest Calculator', () => {
  it('calculates future balance and interest correctly', () => {
    // $10,000 at 7% annual, 10 years, monthly compounding
    const res = calculateCompoundInterest(10000, 7, 10, 0, 12);
    expect(res.futureValue).toBeCloseTo(20096.61, 0);
    expect(res.totalPrincipal).toBe(10000);
    expect(res.totalInterest).toBeCloseTo(10096.61, 0);
    expect(res.schedule.length).toBe(10);
  });

  it('handles periodic monthly additions', () => {
    const res = calculateCompoundInterest(1000, 5, 2, 100, 12);
    expect(res.totalContributions).toBe(2400);
    expect(res.futureValue).toBeGreaterThan(3500);
  });
});

describe('Loan Calculator', () => {
  it('calculates standard loan monthly payments', () => {
    // $200,000 at 6% for 30 years = $1,199.10/mo
    const res = calculateLoan(200000, 6, 30);
    expect(res.monthlyPayment).toBeCloseTo(1199.10, 1);
    expect(res.totalPayment).toBeCloseTo(431676, 0);
    expect(res.totalInterest).toBeCloseTo(231676, 0);
    expect(res.annualSchedule.length).toBe(30);
  });

  it('handles 0% interest loan gracefully', () => {
    const res = calculateLoan(12000, 0, 1);
    expect(res.monthlyPayment).toBe(1000);
    expect(res.totalInterest).toBe(0);
  });
});

describe('Mortgage Calculator', () => {
  it('calculates monthly mortgage breakdown', () => {
    const res = calculateMortgage({
      homePrice: 400000,
      downPayment: 20,
      isDownPaymentPercent: true,
      interestRate: 6.5,
      loanTermYears: 30,
      annualPropertyTaxRate: 1.2,
      annualHomeInsurance: 1200,
      monthlyHoa: 100,
    });

    expect(res.downPaymentAmount).toBe(80000);
    expect(res.loanAmount).toBe(320000);
    expect(res.monthlyPrincipalAndInterest).toBeCloseTo(2022.62, 1);
    expect(res.monthlyPropertyTax).toBe(400); // 400,000 * 0.012 / 12
    expect(res.monthlyHomeInsurance).toBe(100); // 1200 / 12
    expect(res.monthlyHoa).toBe(100);
    expect(res.monthlyPmi).toBe(0); // 20% down means no PMI
    expect(res.totalMonthlyPayment).toBeCloseTo(2622.62, 1);
  });

  it('applies PMI when down payment is less than 20%', () => {
    const res = calculateMortgage({
      homePrice: 400000,
      downPayment: 10,
      isDownPaymentPercent: true,
      interestRate: 6.5,
      loanTermYears: 30,
    });
    expect(res.monthlyPmi).toBeGreaterThan(0);
  });
});

describe('Tip Calculator', () => {
  it('calculates tip and totals accurately', () => {
    const res = calculateTip({
      billAmount: 100,
      tipPercent: 20,
      splitCount: 1,
    });
    expect(res.tipAmount).toBe(20);
    expect(res.totalAmount).toBe(120);
    expect(res.tipPerPerson).toBe(20);
    expect(res.totalPerPerson).toBe(120);
  });

  it('splits bill between multiple people', () => {
    const res = calculateTip({
      billAmount: 120,
      tipPercent: 20,
      splitCount: 4,
    });
    expect(res.tipAmount).toBe(24);
    expect(res.totalAmount).toBe(144);
    expect(res.tipPerPerson).toBe(6);
    expect(res.totalPerPerson).toBe(36);
  });

  it('handles round up total option', () => {
    const res = calculateTip({
      billAmount: 52.30,
      tipPercent: 15, // $7.845 -> total $60.145 -> round up to $61.00
      splitCount: 1,
      roundUpTotal: true,
    });
    expect(res.totalAmount).toBe(61);
    expect(res.tipAmount).toBe(8.7);
  });
});
