/**
 * Aero, Drone, Rocket & Propulsion Thrust Calculation Engine
 * Covers TWR, static thrust, propeller thrust, rocket equation, drone sizing,
 * electric motor efficiency, fan thrust, RC aircraft, RPM translation, and jet engines.
 */

const G0 = 9.80665; // standard gravitational acceleration m/s^2
const RHO_SEA_LEVEL = 1.225; // kg/m^3 standard sea level air density

export interface ThrustToWeightResult {
  twr: number;
  totalThrustNewtons: number;
  totalWeightNewtons: number;
  totalThrustKg: number;
  totalWeightKg: number;
  totalThrustLbs: number;
  totalWeightLbs: number;
  excessThrustRatio: number;
  verticalAccelerationMs2: number;
  verticalAccelerationG: number;
  flightCapability: string;
}

export function calculateThrustToWeight(options: {
  thrust: number;
  weight: number;
  unit: 'kg' | 'lbs' | 'newtons';
}): ThrustToWeightResult {
  const rawThrust = Math.max(0, options.thrust);
  const rawWeight = Math.max(0.001, options.weight);

  let thrustN = 0;
  let weightN = 0;

  if (options.unit === 'newtons') {
    thrustN = rawThrust;
    weightN = rawWeight;
  } else if (options.unit === 'kg') {
    thrustN = rawThrust * G0;
    weightN = rawWeight * G0;
  } else {
    // lbs
    thrustN = rawThrust * 4.44822;
    weightN = rawWeight * 4.44822;
  }

  const twr = thrustN / weightN;
  const accelMs2 = Math.max(0, (twr - 1) * G0);
  const accelG = Math.max(0, twr - 1);

  let capability = '';
  if (twr < 0.8) capability = 'Insufficient for sustained climb / glide profile only';
  else if (twr < 1.0) capability = 'Capable of forward level flight, cannot hover vertically';
  else if (twr < 1.5) capability = 'Stable vertical takeoff, trainer drone or scale aircraft';
  else if (twr < 2.5) capability = 'Vigorous climb rate, sport aerobatics, photographic drone';
  else capability = 'Extreme 3D vertical punch-out, racing drone, space launch vehicle';

  return {
    twr: Number(twr.toFixed(2)),
    totalThrustNewtons: Number(thrustN.toFixed(2)),
    totalWeightNewtons: Number(weightN.toFixed(2)),
    totalThrustKg: Number((thrustN / G0).toFixed(2)),
    totalWeightKg: Number((weightN / G0).toFixed(2)),
    totalThrustLbs: Number((thrustN / 4.44822).toFixed(2)),
    totalWeightLbs: Number((weightN / 4.44822).toFixed(2)),
    excessThrustRatio: Number(Math.max(0, twr - 1).toFixed(2)),
    verticalAccelerationMs2: Number(accelMs2.toFixed(2)),
    verticalAccelerationG: Number(accelG.toFixed(2)),
    flightCapability: capability,
  };
}

export interface DroneThrustResult {
  allUpWeightGrams: number;
  motorCount: number;
  hoverThrustPerMotorGrams: number;
  hoverThrottlePercentage: number;
  totalMaxThrustRequiredGrams: number;
  maxThrustPerMotorGrams: number;
  targetTwr: number;
  payloadCapacityRemainingGrams: number;
}

export function calculateDroneThrust(options: {
  allUpWeightGrams: number;
  motorCount: 3 | 4 | 6 | 8;
  targetTwr?: number; // default 2.0:1 for camera drones, 3.5+:1 for freestyle/racing
  motorMaxThrustGrams?: number;
}): DroneThrustResult {
  const auw = Math.max(1, options.allUpWeightGrams);
  const motors = options.motorCount;
  const targetTwr = options.targetTwr || 2.0;

  const totalMaxThrustRequired = auw * targetTwr;
  const maxThrustPerMotor = totalMaxThrustRequired / motors;
  const hoverThrustPerMotor = auw / motors;
  const hoverThrottlePercentage = (1 / targetTwr) * 100;

  let payloadRemaining = 0;
  if (options.motorMaxThrustGrams && options.motorMaxThrustGrams > 0) {
    const installedTotalThrust = options.motorMaxThrustGrams * motors;
    const maxSafeAUW = installedTotalThrust / targetTwr;
    payloadRemaining = Math.max(0, maxSafeAUW - auw);
  }

  return {
    allUpWeightGrams: auw,
    motorCount: motors,
    hoverThrustPerMotorGrams: Math.round(hoverThrustPerMotor),
    hoverThrottlePercentage: Number(hoverThrottlePercentage.toFixed(1)),
    totalMaxThrustRequiredGrams: Math.round(totalMaxThrustRequired),
    maxThrustPerMotorGrams: Math.round(maxThrustPerMotor),
    targetTwr,
    payloadCapacityRemainingGrams: Math.round(payloadRemaining),
  };
}

export interface RocketThrustResult {
  totalThrustNewtons: number;
  totalThrustKilonewtons: number;
  totalThrustLbf: number;
  effectiveExhaustVelocityMs: number;
  momentumThrustNewtons: number;
  pressureThrustNewtons: number;
  massFlowRateKgPerSec: number;
  specificImpulseSec: number;
}

export function calculateRocketThrust(options: {
  massFlowRateKgPerSec: number;
  specificImpulseSec: number;
  exitPressureKpa?: number;
  ambientPressureKpa?: number;
  exitAreaM2?: number;
}): RocketThrustResult {
  const mdot = Math.max(0.0001, options.massFlowRateKgPerSec);
  const isp = Math.max(1, options.specificImpulseSec);

  // v_e = Isp * g0
  const ve = isp * G0;
  const momentumThrust = mdot * ve;

  const pExit = (options.exitPressureKpa || 0) * 1000;
  const pAmb = (options.ambientPressureKpa !== undefined ? options.ambientPressureKpa : 101.325) * 1000;
  const area = options.exitAreaM2 || 0;

  const pressureThrust = area > 0 ? (pExit - pAmb) * area : 0;
  const totalThrustN = momentumThrust + pressureThrust;

  return {
    totalThrustNewtons: Math.round(totalThrustN),
    totalThrustKilonewtons: Number((totalThrustN / 1000).toFixed(2)),
    totalThrustLbf: Number((totalThrustN / 4.44822).toFixed(1)),
    effectiveExhaustVelocityMs: Number(ve.toFixed(1)),
    momentumThrustNewtons: Math.round(momentumThrust),
    pressureThrustNewtons: Math.round(pressureThrust),
    massFlowRateKgPerSec: mdot,
    specificImpulseSec: isp,
  };
}

export interface PropellerThrustResult {
  thrustGrams: number;
  thrustNewtons: number;
  thrustLbs: number;
  exitAirspeedKmh: number;
  exitAirspeedMph: number;
  powerAbsorbedWatts: number;
}

export function calculatePropellerThrust(options: {
  diameterInches: number;
  pitchInches: number;
  rpm: number;
  airDensityKgM3?: number;
}): PropellerThrustResult {
  const d = Math.max(1, options.diameterInches);
  const p = Math.max(0.5, options.pitchInches);
  const rpm = Math.max(0, options.rpm);
  const rho = options.airDensityKgM3 || RHO_SEA_LEVEL;

  // Empirical static thrust estimation:
  // T (Newtons) ~ 0.5 * rho * A * (v_pitch)^2
  // Pitch speed in m/s:
  const vPitchMs = (rpm * (p * 0.0254)) / 60;
  const dMeters = d * 0.0254;
  const area = (Math.PI / 4) * Math.pow(dMeters, 2);

  // Thrust in Newtons using momentum theory with standard prop factor
  const thrustN = (Math.PI / 2) * Math.pow(dMeters / 2, 2) * rho * Math.pow(vPitchMs * 0.85, 2);
  const thrustGrams = (thrustN / G0) * 1000;
  const thrustLbs = thrustN / 4.44822;

  // Approximate mechanical shaft power absorbed: P (Watts) ~ K * pitch * RPM^3 * D^4
  const powerWatts = 1.31 * p * Math.pow(rpm / 1000, 3) * Math.pow(d / 10, 4);

  const speedKmh = vPitchMs * 3.6;
  const speedMph = speedKmh / 1.60934;

  return {
    thrustGrams: Math.round(thrustGrams),
    thrustNewtons: Number(thrustN.toFixed(2)),
    thrustLbs: Number(thrustLbs.toFixed(2)),
    exitAirspeedKmh: Number(speedKmh.toFixed(1)),
    exitAirspeedMph: Number(speedMph.toFixed(1)),
    powerAbsorbedWatts: Math.round(powerWatts),
  };
}

export interface JetEngineThrustResult {
  grossThrustKn: number;
  netThrustKn: number;
  ramDragKn: number;
  totalThrustLbf: number;
  coreThrustKn: number;
  fanBypassThrustKn: number;
  tsfc: number; // Thrust Specific Fuel Consumption (kg/kN-hr)
}

export function calculateJetEngineThrust(options: {
  airMassFlowKgPerSec: number;
  exhaustVelocityMs: number;
  flightVelocityMs?: number;
  bypassRatio?: number; // 0 for pure turbojet, 5-10 for high-bypass commercial
  fuelFlowKgPerSec?: number;
}): JetEngineThrustResult {
  const mAir = Math.max(1, options.airMassFlowKgPerSec);
  const vExit = Math.max(10, options.exhaustVelocityMs);
  const v0 = Math.max(0, options.flightVelocityMs || 0);
  const bpr = Math.max(0, options.bypassRatio || 0);
  const mFuel = options.fuelFlowKgPerSec || mAir * 0.02;

  // Net thrust F = m_air * (v_exit - v_0) + m_fuel * v_exit
  const grossThrustN = (mAir + mFuel) * vExit;
  const ramDragN = mAir * v0;
  const netThrustN = grossThrustN - ramDragN;

  const coreShare = 1 / (1 + bpr);
  const fanShare = bpr / (1 + bpr);

  const netKn = netThrustN / 1000;
  const tsfc = netKn > 0 ? (mFuel * 3600) / netKn : 0;

  return {
    grossThrustKn: Number((grossThrustN / 1000).toFixed(2)),
    netThrustKn: Number(netKn.toFixed(2)),
    ramDragKn: Number((ramDragN / 1000).toFixed(2)),
    totalThrustLbf: Number((netThrustN / 4.44822).toFixed(1)),
    coreThrustKn: Number((netKn * coreShare).toFixed(2)),
    fanBypassThrustKn: Number((netKn * fanShare).toFixed(2)),
    tsfc: Number(tsfc.toFixed(3)),
  };
}
