import { describe, it, expect } from 'vitest';
import {
  calculateDiscountPercentage,
  calculateWinPercentage,
  calculateYearlyPercentageIncrease,
  calculatePercentageDecrease,
  calculatePartTimePercentage,
  calculateTimePercentage,
  calculatePercentageOfTime,
  calculateReversePercentage,
  calculateGrowthPercentage,
  calculateTaxPercentage,
  calculateVatPercentage,
  calculateSluggingPercentage,
  calculateFatPercentage,
} from '../percentageEngines';

describe('Percentage Suite Engine Tests', () => {
  it('1. Discount Percentage: calculates single and stacked discounts', () => {
    // $100 item with 20% discount -> $80, saves $20
    const res1 = calculateDiscountPercentage(100, 20);
    expect(res1.finalPrice).toBe(80);
    expect(res1.totalSavings).toBe(20);
    expect(res1.effectiveDiscountPercent).toBe(20);

    // $100 item with 20% + additional 10% on remainder ($80 - $8 = $72, saves $28)
    const res2 = calculateDiscountPercentage(100, 20, 10);
    expect(res2.finalPrice).toBe(72);
    expect(res2.totalSavings).toBe(28);
    expect(res2.effectiveDiscountPercent).toBe(28);
  });

  it('2. Win Percentage: calculates wins, losses, ties and standings', () => {
    // 75 wins, 25 losses -> 75%, .750
    const res1 = calculateWinPercentage(75, 25, 0);
    expect(res1.winPercentage).toBe(75);
    expect(res1.decimalStanding).toBe('.750');
    expect(res1.gamesOver500).toBe(50);

    // 10 wins, 5 losses, 2 ties -> 11 effective wins / 17 games = 64.71%
    const res2 = calculateWinPercentage(10, 5, 2);
    expect(res2.winPercentage).toBe(64.71);
    expect(res2.totalGames).toBe(17);
  });

  it('3. Yearly Percentage Increase: calculates CAGR and total change', () => {
    // 1000 to 2000 in 3 years -> 100% total, ~25.99% CAGR
    const res = calculateYearlyPercentageIncrease(1000, 2000, 3);
    expect(res.totalPercentageChange).toBe(100);
    expect(res.cagr).toBe(25.99);
    expect(res.simpleAnnualAverage).toBe(33.33);
    expect(res.absoluteChange).toBe(1000);
  });

  it('4. Percentage Decrease: calculates drop from initial to final', () => {
    // Drop from 80 to 60 -> 20 drop, 25% decrease
    const res = calculatePercentageDecrease(80, 60);
    expect(res.absoluteDifference).toBe(20);
    expect(res.percentageDecrease).toBe(25);
    expect(res.isDecrease).toBe(true);
  });

  it('5. Part Time Percentage: calculates FTE and pro-rata salary', () => {
    // 20 hours out of 40 -> 0.5 FTE (50%), pro-rata of 80,000 is 40,000
    const res = calculatePartTimePercentage(20, 40, 80000);
    expect(res.fteRatio).toBe(0.5);
    expect(res.partTimePercentage).toBe(50);
    expect(res.proRataSalary).toBe(40000);
    expect(res.annualPartTimeHours).toBe(1040);
    expect(res.annualFullTimeHours).toBe(2080);
  });

  it('6. Time Percentage: calculates percentage of duration used', () => {
    // 3 hours (10800s) of 12 hours (43200s) = 25%
    const res = calculateTimePercentage(10800, 43200);
    expect(res.percentage).toBe(25);
    expect(res.remainingPercentage).toBe(75);
    expect(res.spentFormatted).toContain('3h');
  });

  it('7. Percentage of Time: calculates what is X% of a duration', () => {
    // 25% of 8 hours -> 2 hours (7200s)
    const res = calculatePercentageOfTime(25, 8, 0, 0);
    expect(res.hours).toBe(2);
    expect(res.minutes).toBe(0);
    expect(res.resultSeconds).toBe(7200);
    expect(res.ofDayHours).toBe(6); // 25% of 24h = 6h
  });

  it('8. Reverse Percentage: calculates original before increase/decrease', () => {
    // Final is $120 after 20% increase -> Original was $100
    const res1 = calculateReversePercentage(120, 20, 'increase');
    expect(res1.originalValue).toBe(100);
    expect(res1.absoluteDifference).toBe(20);

    // Final is $80 after 20% decrease -> Original was $100
    const res2 = calculateReversePercentage(80, 20, 'decrease');
    expect(res2.originalValue).toBe(100);
    expect(res2.absoluteDifference).toBe(20);
  });

  it('9. Growth Percentage: calculates rate and multiplier factor', () => {
    // From 50 to 75 -> 50% growth, 1.5x factor, projected next 112.5
    const res = calculateGrowthPercentage(50, 75);
    expect(res.growthPercentage).toBe(50);
    expect(res.growthFactor).toBe(1.5);
    expect(res.projectedNextValue).toBe(112.5);
  });

  it('10. Tax Percentage: calculates sales tax and total price', () => {
    // $200 with 7.5% tax -> $15 tax, $215 total
    const res = calculateTaxPercentage(200, 7.5);
    expect(res.taxAmount).toBe(15);
    expect(res.totalPrice).toBe(215);
    expect(res.effectiveRate).toBe(7.5);
  });

  it('11. VAT Percentage: handles both add VAT and extract VAT', () => {
    // Add 20% VAT to 100 net -> 120 gross, 20 VAT
    const addRes = calculateVatPercentage(100, 20, 'add');
    expect(addRes.grossAmount).toBe(120);
    expect(addRes.vatAmount).toBe(20);

    // Extract 20% VAT from 120 gross -> 100 net, 20 VAT
    const removeRes = calculateVatPercentage(120, 20, 'remove');
    expect(removeRes.netAmount).toBe(100);
    expect(removeRes.vatAmount).toBe(20);
  });

  it('12. Slugging Percentage: calculates MLB sabermetric SLG, BA, ISO', () => {
    // 100 AB, 15 1B, 5 2B, 1 3B, 4 HR
    // Total bases = 15*1 + 5*2 + 1*3 + 4*4 = 15 + 10 + 3 + 16 = 44 bases
    // Total hits = 15 + 5 + 1 + 4 = 25 hits
    // SLG = 44 / 100 = 0.440 (.440)
    // BA = 25 / 100 = 0.250 (.250)
    // ISO = 0.440 - 0.250 = 0.190
    const res = calculateSluggingPercentage(100, 15, 5, 1, 4);
    expect(res.totalBases).toBe(44);
    expect(res.totalHits).toBe(25);
    expect(res.sluggingPercentage).toBe(0.44);
    expect(res.formattedSlugging).toBe('.440');
    expect(res.battingAverage).toBe(0.25);
    expect(res.formattedBattingAverage).toBe('.250');
    expect(res.isolatedPower).toBe(0.19);
  });

  it('13. Body Fat Percentage: calculates U.S. Navy formula for male & female', () => {
    // Male: 178cm, 75kg, waist 85cm, neck 38cm
    const maleRes = calculateFatPercentage({
      gender: 'male',
      unit: 'metric',
      height: 178,
      weight: 75,
      neck: 38,
      waist: 85,
    });
    expect(maleRes.bodyFatPercentage).toBeGreaterThan(10);
    expect(maleRes.bodyFatPercentage).toBeLessThan(25);
    expect(maleRes.leanMass).toBeGreaterThan(50);
    expect(maleRes.category).toBeDefined();

    // Female: 165cm, 60kg, waist 72cm, neck 33cm, hip 96cm
    const femaleRes = calculateFatPercentage({
      gender: 'female',
      unit: 'metric',
      height: 165,
      weight: 60,
      neck: 33,
      waist: 72,
      hip: 96,
    });
    expect(femaleRes.bodyFatPercentage).toBeGreaterThan(15);
    expect(femaleRes.bodyFatPercentage).toBeLessThan(35);
    expect(femaleRes.category).toBeDefined();
  });
});
