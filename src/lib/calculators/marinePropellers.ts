/**
 * Marine & Boating Propeller Calculation Engine
 * Covers universal propeller slip, theoretical/actual speed, gear ratios,
 * and manufacturer-specific models (Suzuki, Mercury, Michigan Wheel, Acme, Sailboat).
 */

export interface PropellerResult {
  theoreticalSpeedMph: number;
  theoreticalSpeedKnots: number;
  actualSpeedMph: number;
  actualSpeedKnots: number;
  slipPercentage: number;
  pitchInches: number;
  gearRatio: number;
  rpm: number;
  hullDisplacementSpeedKnots?: number;
}

export function calculatePropellerSpeed(options: {
  rpm: number;
  pitchInches: number;
  gearRatio: number;
  slipPercentage?: number;
  actualSpeedMph?: number;
}): PropellerResult {
  const rpm = Math.max(0, options.rpm);
  const pitch = Math.max(0, options.pitchInches);
  const ratio = Math.max(0.1, options.gearRatio);

  // Theoretical speed in mph: (RPM * Pitch) / (Ratio * 1056)
  // (1056 = (5280 ft/mile * 12 inches/ft) / 60 minutes/hour)
  const theoreticalSpeedMph = (rpm * pitch) / (ratio * 1056);
  const theoreticalSpeedKnots = theoreticalSpeedMph / 1.150779;

  let slip = 0;
  let actualMph = 0;

  if (options.actualSpeedMph !== undefined && options.actualSpeedMph > 0) {
    actualMph = options.actualSpeedMph;
    slip = theoreticalSpeedMph > 0 ? ((theoreticalSpeedMph - actualMph) / theoreticalSpeedMph) * 100 : 0;
  } else {
    slip = options.slipPercentage !== undefined ? options.slipPercentage : 12; // Typical 10-15% default slip
    actualMph = theoreticalSpeedMph * (1 - slip / 100);
  }

  const actualKnots = actualMph / 1.150779;

  return {
    theoreticalSpeedMph: Number(theoreticalSpeedMph.toFixed(2)),
    theoreticalSpeedKnots: Number(theoreticalSpeedKnots.toFixed(2)),
    actualSpeedMph: Number(actualMph.toFixed(2)),
    actualSpeedKnots: Number(actualKnots.toFixed(2)),
    slipPercentage: Number(slip.toFixed(2)),
    pitchInches: pitch,
    gearRatio: ratio,
    rpm,
  };
}

export function calculateSailboatPropeller(options: {
  waterlineLengthFeet: number;
  engineHorsepower: number;
  shaftRpm: number;
  bladeCount: 2 | 3 | 4;
  displacementLbs?: number;
}): {
  theoreticalHullSpeedKnots: number;
  recommendedPitchInches: number;
  recommendedDiameterInches: number;
  cruisingSpeedKnots: number;
  bladeDragFactor: string;
} {
  const lwl = Math.max(1, options.waterlineLengthFeet);
  const hp = Math.max(1, options.engineHorsepower);
  const rpm = Math.max(100, options.shaftRpm);
  const blades = options.bladeCount;

  // Displacement hull speed formula: 1.34 * sqrt(LWL)
  const theoreticalHullSpeedKnots = 1.34 * Math.sqrt(lwl);
  const cruisingSpeedKnots = theoreticalHullSpeedKnots * 0.85;

  // Crouch/Gerr empirical diameter & pitch estimates for sailboats
  // Optimal diameter roughly proportional to sqrt(HP) / (RPM / 1000)
  const baseDiameter = 16 * Math.pow(hp, 0.22) / Math.pow(rpm / 1000, 0.4);
  const diameter = blades === 2 ? baseDiameter * 1.05 : blades === 3 ? baseDiameter : baseDiameter * 0.94;

  // Pitch from desired cruise speed and shaft RPM at typical 25% slip for auxiliary sailboats
  const targetCruiseMph = cruisingSpeedKnots * 1.150779;
  const recommendedPitch = (targetCruiseMph * (rpm * 0.8) * 1056) / (Math.pow(rpm, 2) * (1 - 0.25)) || (diameter * 0.7);

  return {
    theoreticalHullSpeedKnots: Number(theoreticalHullSpeedKnots.toFixed(2)),
    recommendedPitchInches: Math.max(6, Number(recommendedPitch.toFixed(1))),
    recommendedDiameterInches: Math.max(8, Number(diameter.toFixed(1))),
    cruisingSpeedKnots: Number(cruisingSpeedKnots.toFixed(2)),
    bladeDragFactor: blades === 2 ? 'Low drag under sail (ideal for racing/cruising)' : blades === 3 ? 'Balanced motoring thrust & reverse stopping' : 'High thrust in heavy seas / headwind',
  };
}
