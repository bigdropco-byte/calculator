import { describe, it, expect } from 'vitest';
import {
  calculateThrustToWeight,
  calculateDroneThrust,
  calculateRocketThrust,
  calculatePropellerThrust,
  calculateJetEngineThrust,
} from '../thrustPhysics';

describe('Thrust & Propulsion Physics Engine', () => {
  it('calculates Thrust-to-Weight Ratio and vertical acceleration', () => {
    const twrRes = calculateThrustToWeight({
      thrust: 2000,
      weight: 1000,
      unit: 'kg',
    });
    expect(twrRes.twr).toBe(2.0);
    expect(twrRes.verticalAccelerationG).toBe(1.0);
    expect(twrRes.verticalAccelerationMs2).toBeCloseTo(9.81, 1);
  });

  it('calculates multirotor drone hover and max thrust requirements', () => {
    // 1200g quadcopter (4 motors), target 2.0 TWR
    const droneRes = calculateDroneThrust({
      allUpWeightGrams: 1200,
      motorCount: 4,
      targetTwr: 2.0,
      motorMaxThrustGrams: 800,
    });
    expect(droneRes.hoverThrustPerMotorGrams).toBe(300);
    expect(droneRes.maxThrustPerMotorGrams).toBe(600);
    expect(droneRes.totalMaxThrustRequiredGrams).toBe(2400);
    expect(droneRes.hoverThrottlePercentage).toBe(50);
    expect(droneRes.payloadCapacityRemainingGrams).toBeGreaterThan(0);
  });

  it('calculates rocket thrust from mass flow and specific impulse', () => {
    // 50 kg/s mass flow, 300s Isp (typical kerolox sea level engine)
    const rocketRes = calculateRocketThrust({
      massFlowRateKgPerSec: 50,
      specificImpulseSec: 300,
    });
    // v_e = 300 * 9.80665 = 2942 m/s
    // F = 50 * 2942 = 147,100 N = 147.1 kN
    expect(rocketRes.totalThrustKilonewtons).toBeCloseTo(147.1, 0);
  });

  it('calculates aerodynamic propeller thrust', () => {
    const propRes = calculatePropellerThrust({
      diameterInches: 10,
      pitchInches: 4.5,
      rpm: 8000,
    });
    expect(propRes.thrustGrams).toBeGreaterThan(500);
    expect(propRes.exitAirspeedMph).toBeGreaterThan(30);
    expect(propRes.powerAbsorbedWatts).toBeGreaterThan(50);
  });

  it('calculates jet engine thrust and bypass sharing', () => {
    const jetRes = calculateJetEngineThrust({
      airMassFlowKgPerSec: 200,
      exhaustVelocityMs: 400,
      flightVelocityMs: 150,
      bypassRatio: 5,
    });
    expect(jetRes.netThrustKn).toBeGreaterThan(50);
    expect(jetRes.fanBypassThrustKn).toBeGreaterThan(jetRes.coreThrustKn);
  });
});
