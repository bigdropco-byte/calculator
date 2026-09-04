import { describe, it, expect } from 'vitest';
import { calculateFreightDensity, getNmfcClass } from '../freightDensity';

describe('Freight & LTL Density Engine', () => {
  it('correctly maps PCF to NMFC freight classes', () => {
    expect(getNmfcClass(0.5).nmfcClass).toBe(500);
    expect(getNmfcClass(3.5).nmfcClass).toBe(300);
    expect(getNmfcClass(7.2).nmfcClass).toBe(175);
    expect(getNmfcClass(11.0).nmfcClass).toBe(100);
    expect(getNmfcClass(16.5).nmfcClass).toBe(70);
    expect(getNmfcClass(32.0).nmfcClass).toBe(60);
    expect(getNmfcClass(55.0).nmfcClass).toBe(50);
  });

  it('calculates standard pallet cubic feet, density, and class', () => {
    // 1 standard 48x40x48 inch pallet weighing 500 lbs
    const res = calculateFreightDensity({
      lengthInches: 48,
      widthInches: 40,
      heightInches: 48,
      weightLbsPerUnit: 500,
      quantity: 1,
    });
    // Cu ft = (48 * 40 * 48) / 1728 = 92160 / 1728 = 53.33 cu ft
    expect(res.totalCubicFeet).toBeCloseTo(53.3, 1);
    // PCF = 500 / 53.33 = 9.375 PCF
    expect(res.densityPcf).toBeCloseTo(9.38, 2);
    // PCF 9.38 -> Class 125
    expect(res.nmfcClass).toBe(125);
  });

  it('detects carrier cubic capacity rule triggers for low-density large shipments', () => {
    // 15 large lightweight pallets (800 cu ft, 3 PCF)
    const res = calculateFreightDensity({
      lengthInches: 48,
      widthInches: 40,
      heightInches: 60,
      weightLbsPerUnit: 200,
      quantity: 15,
      carrier: 'saia',
    });
    expect(res.totalCubicFeet).toBeGreaterThan(750);
    expect(res.densityPcf).toBeLessThan(6);
    expect(res.cubicCapacityRuleTriggered).toBe(true);
    expect(res.carrierNote).toContain('Saia Cubic Capacity');
  });
});
