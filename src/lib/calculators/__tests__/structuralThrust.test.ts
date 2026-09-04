import { describe, it, expect } from 'vitest';
import {
  calculatePipeThrust,
  calculateRafterThrust,
  calculateHipThrust,
} from '../structuralThrust';

describe('Structural, Civil & Fitness Thrust Engine', () => {
  it('calculates pipe thrust block force on a 90 degree elbow bend', () => {
    // 8-inch pipe, 150 psi internal pressure, 90-degree bend
    const res = calculatePipeThrust({
      pipeDiameterInches: 8,
      internalPressurePsi: 150,
      deflectionAngleDegrees: 90,
      soilBearingCapacityPsf: 2000,
      safetyFactor: 1.5,
    });
    // Area = pi * 4^2 = 50.265 sq in
    // Thrust = 2 * 150 * 50.265 * sin(45°) = 300 * 50.265 * 0.7071 = 10,663 lbs
    expect(res.thrustForceLbs).toBeCloseTo(10663, -2);
    expect(res.minBearingAreaSqFt).toBeGreaterThan(5);
  });

  it('calculates rafter horizontal thrust on exterior walls', () => {
    // 24 ft span, 4/12 pitch, 40 psf total load, 24" spacing
    const res = calculateRafterThrust({
      spanFeet: 24,
      riseInchesPerFoot: 4,
      totalUniformLoadPsf: 40,
      rafterSpacingInches: 24,
    });
    // Tributary area = 24 * 2 = 48 sq ft
    // Total load = 48 * 40 = 1920 lbs
    // Vertical reaction = 960 lbs
    expect(res.verticalReactionLbs).toBe(960);
    expect(res.horizontalThrustLbs).toBeGreaterThan(1000);
    expect(res.pitchAngleDeg).toBeCloseTo(18.4, 1);
  });

  it('calculates barbell hip thrust 1RM and volume', () => {
    const res = calculateHipThrust({
      weightLifted: 315,
      reps: 8,
      userBodyweight: 180,
      sets: 3,
    });
    // 8 reps with 315 lbs -> ~390 lbs 1RM
    expect(res.oneRepMaxAverage).toBeGreaterThan(380);
    expect(res.bodyweightMultiple).toBeGreaterThan(2.0);
    expect(res.totalVolume).toBe(315 * 8 * 3);
    expect(res.trainingPercentages.length).toBe(6);
  });
});
