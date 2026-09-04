import { describe, it, expect } from 'vitest';
import { calculatePropellerSpeed, calculateSailboatPropeller } from '../marinePropellers';

describe('Marine Propeller Engine', () => {
  it('calculates theoretical speed and actual speed with 12% slip', () => {
    // 5000 RPM, 19 inch pitch, 2.0:1 gear ratio
    const result = calculatePropellerSpeed({
      rpm: 5000,
      pitchInches: 19,
      gearRatio: 2.0,
      slipPercentage: 12,
    });
    // Theoretical = (5000 * 19) / (2.0 * 1056) = 95000 / 2112 = 44.98 mph
    expect(result.theoreticalSpeedMph).toBeCloseTo(44.98, 1);
    // Actual = 44.98 * 0.88 = 39.58 mph
    expect(result.actualSpeedMph).toBeCloseTo(39.58, 1);
    expect(result.slipPercentage).toBe(12);
  });

  it('calculates propeller slip from observed GPS speed', () => {
    const result = calculatePropellerSpeed({
      rpm: 5500,
      pitchInches: 21,
      gearRatio: 1.85,
      actualSpeedMph: 52,
    });
    // Theoretical = (5500 * 21) / (1.85 * 1056) = 115500 / 1953.6 = 59.12 mph
    expect(result.theoreticalSpeedMph).toBeCloseTo(59.12, 1);
    // Slip = (59.12 - 52) / 59.12 * 100 = 12.04%
    expect(result.slipPercentage).toBeCloseTo(12.04, 1);
  });

  it('calculates sailboat displacement hull speed', () => {
    const res = calculateSailboatPropeller({
      waterlineLengthFeet: 25,
      engineHorsepower: 20,
      shaftRpm: 1200,
      bladeCount: 3,
    });
    // 1.34 * sqrt(25) = 1.34 * 5 = 6.70 knots
    expect(res.theoreticalHullSpeedKnots).toBe(6.7);
    expect(res.cruisingSpeedKnots).toBeCloseTo(5.7, 1);
    expect(res.recommendedDiameterInches).toBeGreaterThan(10);
    expect(res.recommendedPitchInches).toBeGreaterThan(6);
  });
});
