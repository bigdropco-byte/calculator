/**
 * Structural, Civil & Athletic Thrust Calculation Engine
 * Covers pipe bend hydrostatic thrust block force, roof rafter outward thrust,
 * and barbell hip thrust 1RM & volume metrics.
 */

export interface PipeThrustResult {
  thrustForceLbs: number;
  thrustForceKn: number;
  pipeAreaSqIn: number;
  deflectionAngleDeg: number;
  testPressurePsi: number;
  minBearingAreaSqFt: number;
  fittingType: string;
}

export function calculatePipeThrust(options: {
  pipeDiameterInches: number;
  internalPressurePsi: number;
  deflectionAngleDegrees: number; // e.g. 90, 45, 22.5, 11.25, or 180 for dead end
  soilBearingCapacityPsf?: number; // e.g. 2000 psf for sand, 3000 for clay, 4000 for hardpan
  safetyFactor?: number; // typical 1.5
}): PipeThrustResult {
  const d = Math.max(0.5, options.pipeDiameterInches);
  const p = Math.max(0, options.internalPressurePsi);
  const theta = Math.max(0, Math.min(180, options.deflectionAngleDegrees));
  const soilCapacity = options.soilBearingCapacityPsf || 2000;
  const sf = options.safetyFactor || 1.5;

  // Cross-sectional water area A = pi * D^2 / 4
  const areaSqIn = (Math.PI * Math.pow(d, 2)) / 4;

  // Thrust force equation: T = 2 * P * A * sin(theta / 2)
  const rad = (theta * Math.PI) / 180;
  const thrustLbs = 2 * p * areaSqIn * Math.sin(rad / 2);
  const thrustKn = (thrustLbs * 4.44822) / 1000;

  // Required thrust block bearing area: A_block = (T * SF) / Soil_Capacity
  const minBearingAreaSqFt = soilCapacity > 0 ? (thrustLbs * sf) / soilCapacity : 0;

  let fitting = `${theta}° Bend`;
  if (theta === 90) fitting = '90° Elbow Bend';
  else if (theta === 45) fitting = '45° Bend';
  else if (theta === 180) fitting = 'Dead-End Plug / Cap / Inline Valve';

  return {
    thrustForceLbs: Math.round(thrustLbs),
    thrustForceKn: Number(thrustKn.toFixed(2)),
    pipeAreaSqIn: Number(areaSqIn.toFixed(2)),
    deflectionAngleDeg: theta,
    testPressurePsi: p,
    minBearingAreaSqFt: Number(minBearingAreaSqFt.toFixed(2)),
    fittingType: fitting,
  };
}

export interface RafterThrustResult {
  horizontalThrustLbs: number;
  verticalReactionLbs: number;
  totalRoofLoadLbs: number;
  pitchAngleDeg: number;
  rafterLengthFeet: number;
  requiresTiesWarning: boolean;
}

export function calculateRafterThrust(options: {
  spanFeet: number; // Building clear span width between exterior walls
  riseInchesPerFoot: number; // Roof slope, e.g. 4/12, 6/12, 8/12
  totalUniformLoadPsf: number; // Dead + Live/Snow load (e.g. 30 to 50 psf)
  rafterSpacingInches?: number; // 16" or 24" o.c.
  roofLengthFeet?: number;
}): RafterThrustResult {
  const span = Math.max(4, options.spanFeet);
  const slope = Math.max(1, options.riseInchesPerFoot);
  const loadPsf = Math.max(5, options.totalUniformLoadPsf);
  const spacingFt = (options.rafterSpacingInches || 24) / 12;
  const roofLen = options.roofLengthFeet || 1;

  // Roof pitch angle in degrees: theta = arctan(rise / 12)
  const pitchRad = Math.atan(slope / 12);
  const pitchDeg = (pitchRad * 180) / Math.PI;

  // Height of ridge above plate line (feet): h = (span / 2) * (slope / 12)
  const ridgeHeightFt = (span / 2) * (slope / 12);

  // Rafter slope length (feet): sqrt((span/2)^2 + h^2)
  const rafterLength = Math.sqrt(Math.pow(span / 2, 2) + Math.pow(ridgeHeightFt, 2));

  // Load per rafter pair or per foot of roof length:
  const tributaryArea = span * spacingFt;
  const totalLoad = tributaryArea * loadPsf;

  // Vertical reaction at each wall per rafter: V = W / 2
  const verticalReaction = totalLoad / 2;

  // Horizontal outward thrust: H = (W * span) / (8 * ridgeHeight) = V / tan(theta)
  const horizontalThrust = ridgeHeightFt > 0 ? (totalLoad * span) / (8 * ridgeHeightFt) : 0;

  return {
    horizontalThrustLbs: Math.round(horizontalThrust),
    verticalReactionLbs: Math.round(verticalReaction),
    totalRoofLoadLbs: Math.round(totalLoad),
    pitchAngleDeg: Number(pitchDeg.toFixed(1)),
    rafterLengthFeet: Number(rafterLength.toFixed(2)),
    requiresTiesWarning: slope < 4 || horizontalThrust > 800,
  };
}

export interface HipThrustResult {
  oneRepMaxBrzycki: number;
  oneRepMaxEpley: number;
  oneRepMaxAverage: number;
  weightLifted: number;
  repsPerformed: number;
  bodyweightMultiple: number;
  totalVolume: number;
  trainingPercentages: {
    percentage: number;
    weight: number;
    targetReps: string;
  }[];
}

export function calculateHipThrust(options: {
  weightLifted: number;
  reps: number;
  userBodyweight?: number;
  sets?: number;
}): HipThrustResult {
  const w = Math.max(1, options.weightLifted);
  const r = Math.max(1, Math.min(30, options.reps));
  const bw = options.userBodyweight && options.userBodyweight > 0 ? options.userBodyweight : 0;
  const sets = Math.max(1, options.sets || 1);

  // Brzycki formula: 1RM = w / (1.0278 - 0.0278 * r)
  const brzycki = r === 1 ? w : w / (1.0278 - 0.0278 * r);
  // Epley formula: 1RM = w * (1 + r / 30)
  const epley = r === 1 ? w : w * (1 + r / 30);
  const average1Rm = (brzycki + epley) / 2;

  const bwMultiple = bw > 0 ? average1Rm / bw : 0;
  const totalVolume = w * r * sets;

  const pctTiers = [
    { pct: 95, reps: '1–2 reps (Heavy Strength / Peaking)' },
    { pct: 90, reps: '3–4 reps (Maximal Strength)' },
    { pct: 85, reps: '5–6 reps (Strength & Hypertrophy)' },
    { pct: 80, reps: '7–8 reps (Hypertrophy Anchor)' },
    { pct: 75, reps: '9–10 reps (Glute Growth)' },
    { pct: 70, reps: '11–12 reps (Endurance & Hypertrophy)' },
  ];

  const trainingPercentages = pctTiers.map(t => ({
    percentage: t.pct,
    weight: Math.round(average1Rm * (t.pct / 100)),
    targetReps: t.reps,
  }));

  return {
    oneRepMaxBrzycki: Math.round(brzycki),
    oneRepMaxEpley: Math.round(epley),
    oneRepMaxAverage: Math.round(average1Rm),
    weightLifted: w,
    repsPerformed: r,
    bodyweightMultiple: Number(bwMultiple.toFixed(2)),
    totalVolume: Math.round(totalVolume),
    trainingPercentages,
  };
}
