/**
 * Pure Fitness & Military Calculation Engines
 * Calculat.dev - Wilks, APFT, ACFT & Bench Press 1RM
 */

// ==========================================
// 1. Wilks Calculator
// ==========================================
export interface WilksInput {
  bodyWeight: number; // in kg or lbs
  totalLifted: number; // in kg or lbs (Squat + Bench + Deadlift)
  weightUnit: 'kg' | 'lbs';
  gender: 'male' | 'female';
  formulaVersion?: 'original' | 'wilks2020';
}

export interface WilksResult {
  bodyWeightKg: number;
  totalLiftedKg: number;
  gender: 'male' | 'female';
  coefficient: number;
  wilksScore: number;
  wilks2020Score: number;
  strengthLevel: 'Beginner' | 'Novice' | 'Intermediate' | 'Advanced' | 'Elite' | 'International Class';
}

export function calculateWilks(input: WilksInput): WilksResult {
  const isLbs = input.weightUnit === 'lbs';
  const bwKg = isLbs ? input.bodyWeight * 0.45359237 : input.bodyWeight;
  const totalKg = isLbs ? input.totalLifted * 0.45359237 : input.totalLifted;

  const x = Math.max(30, Math.min(250, bwKg));

  // Original Wilks (1995/1997)
  let coeffOriginal = 0;
  if (input.gender === 'male') {
    const a = -216.0475144;
    const b = 16.2606339;
    const c = -0.002388645;
    const d = -0.00113732;
    const e = 7.01863e-6;
    const f = -1.291e-8;
    const denom = a + b * x + c * Math.pow(x, 2) + d * Math.pow(x, 3) + e * Math.pow(x, 4) + f * Math.pow(x, 5);
    coeffOriginal = denom !== 0 ? 500 / denom : 0;
  } else {
    const a = 594.31747775582;
    const b = -27.23842536447;
    const c = 0.82112226871;
    const d = -0.00930733913;
    const e = 4.731582e-5;
    const f = -9.054e-8;
    const denom = a + b * x + c * Math.pow(x, 2) + d * Math.pow(x, 3) + e * Math.pow(x, 4) + f * Math.pow(x, 5);
    coeffOriginal = denom !== 0 ? 500 / denom : 0;
  }

  // Wilks 2020 updated polynomial (Numerator = 600)
  let coeff2020 = 0;
  if (input.gender === 'male') {
    const a = 47.4617885411949;
    const b = 8.47206137941125;
    const c = 0.073694103462609;
    const d = -0.00139583381094385;
    const e = 0.00000707665973070743;
    const f = -0.0000000120804336482315;
    const denom = a + b * x + c * Math.pow(x, 2) + d * Math.pow(x, 3) + e * Math.pow(x, 4) + f * Math.pow(x, 5);
    coeff2020 = denom !== 0 ? 600 / denom : 0;
  } else {
    const a = -125.4255398;
    const b = 13.7121941940668;
    const c = -0.0330725063103405;
    const d = -0.0010504000506583;
    const e = 0.00000938773881462799;
    const f = -0.000000023334613884954;
    const denom = a + b * x + c * Math.pow(x, 2) + d * Math.pow(x, 3) + e * Math.pow(x, 4) + f * Math.pow(x, 5);
    coeff2020 = denom !== 0 ? 600 / denom : 0;
  }

  const scoreOriginal = totalKg * coeffOriginal;
  const score2020 = totalKg * coeff2020;

  const score = input.formulaVersion === 'wilks2020' ? score2020 : scoreOriginal;
  const coeff = input.formulaVersion === 'wilks2020' ? coeff2020 : coeffOriginal;

  let level: 'Beginner' | 'Novice' | 'Intermediate' | 'Advanced' | 'Elite' | 'International Class' = 'Beginner';
  if (score >= 500) level = 'International Class';
  else if (score >= 425) level = 'Elite';
  else if (score >= 350) level = 'Advanced';
  else if (score >= 275) level = 'Intermediate';
  else if (score >= 200) level = 'Novice';

  return {
    bodyWeightKg: Number(bwKg.toFixed(1)),
    totalLiftedKg: Number(totalKg.toFixed(1)),
    gender: input.gender,
    coefficient: Number(coeff.toFixed(5)),
    wilksScore: Number(scoreOriginal.toFixed(2)),
    wilks2020Score: Number(score2020.toFixed(2)),
    strengthLevel: level,
  };
}

// ==========================================
// 2. APFT Calculator (Army Physical Fitness Test)
// ==========================================
export interface ApftInput {
  gender: 'male' | 'female';
  ageBracket: '17-21' | '22-26' | '27-31' | '32-36' | '37-41' | '42-46' | '47-51' | '52-56' | '57-61' | '62+';
  pushups: number;
  situps: number;
  twoMileRunMinutes: number;
  twoMileRunSeconds: number;
}

export interface ApftResult {
  pushupScore: number;
  situpScore: number;
  runScore: number;
  totalScore: number;
  passed: boolean;
  earnedBadge: boolean;
  pushupPass: boolean;
  situpPass: boolean;
  runPass: boolean;
}

export function calculateApft(input: ApftInput): ApftResult {
  const isMale = input.gender === 'male';

  let puMax = isMale ? 71 : 42;
  let puMin = isMale ? 42 : 19;
  let suMax = isMale ? 78 : 78;
  let suMin = isMale ? 53 : 53;
  let runMaxSec = isMale ? 13 * 60 : 15 * 60 + 36;
  let runMinSec = isMale ? 15 * 60 + 54 : 18 * 60 + 54;

  const age = input.ageBracket;
  if (age === '27-31') {
    puMax -= 2; puMin -= 3; runMaxSec += 18; runMinSec += 36;
  } else if (age === '32-36') {
    puMax -= 5; puMin -= 6; runMaxSec += 42; runMinSec += 78;
  } else if (age === '37-41') {
    puMax -= 8; puMin -= 8; runMaxSec += 72; runMinSec += 126;
  } else if (age === '42-46' || age === '47-51') {
    puMax -= 12; puMin -= 12; runMaxSec += 108; runMinSec += 180;
  } else if (age === '52-56' || age === '57-61' || age === '62+') {
    puMax -= 18; puMin -= 18; runMaxSec += 150; runMinSec += 240;
  }

  function getScore(actual: number, minReq: number, maxReq: number): number {
    if (actual >= maxReq) return 100;
    if (actual < minReq) {
      const fraction = Math.max(0, actual / minReq);
      return Math.floor(fraction * 59);
    }
    const fraction = (actual - minReq) / (maxReq - minReq);
    return Math.floor(60 + fraction * 40);
  }

  function getRunScore(totalSec: number, fastSec: number, slowSec: number): number {
    if (totalSec <= fastSec) return 100;
    if (totalSec > slowSec) {
      const excess = totalSec - slowSec;
      return Math.max(0, Math.floor(59 - (excess / 120) * 59));
    }
    const fraction = (slowSec - totalSec) / (slowSec - fastSec);
    return Math.floor(60 + fraction * 40);
  }

  const puScore = getScore(input.pushups, puMin, puMax);
  const suScore = getScore(input.situps, suMin, suMax);
  const totalRunSec = input.twoMileRunMinutes * 60 + input.twoMileRunSeconds;
  const runScore = getRunScore(totalRunSec, runMaxSec, runMinSec);

  const puPass = puScore >= 60;
  const suPass = suScore >= 60;
  const rPass = runScore >= 60;
  const overallPassed = puPass && suPass && rPass;
  const badge = puScore >= 90 && suScore >= 90 && runScore >= 90;

  return {
    pushupScore: puScore,
    situpScore: suScore,
    runScore: runScore,
    totalScore: puScore + suScore + runScore,
    passed: overallPassed,
    earnedBadge: badge,
    pushupPass: puPass,
    situpPass: suPass,
    runPass: rPass,
  };
}

// ==========================================
// 3. ACFT Calculator (Army Combat Fitness Test)
// ==========================================
export interface AcftInput {
  gender: 'male' | 'female';
  ageBracket: '17-21' | '22-26' | '27-31' | '32-36' | '37-41' | '42-46' | '47-51' | '52-56' | '57-61' | '62+';
  mdlLbs: number;
  sptMeters: number;
  hrpReps: number;
  sdcMinutes: number;
  sdcSeconds: number;
  plkMinutes: number;
  plkSeconds: number;
  twoMileMinutes: number;
  twoMileSeconds: number;
}

export interface AcftResult {
  mdlScore: number;
  sptScore: number;
  hrpScore: number;
  sdcScore: number;
  plkScore: number;
  twoMileScore: number;
  totalScore: number;
  passed: boolean;
  isPhysicalFitnessExcellence: boolean;
  eventPassStatus: {
    mdl: boolean;
    spt: boolean;
    hrp: boolean;
    sdc: boolean;
    plk: boolean;
    twoMile: boolean;
  };
}

export function calculateAcft(input: AcftInput): AcftResult {
  const isMale = input.gender === 'male';

  let mdlMin = isMale ? 140 : 120;
  let mdlMax = isMale ? 340 : 230;

  let sptMin = isMale ? 6.0 : 4.0;
  let sptMax = isMale ? 13.0 : 9.0;

  let hrpMin = isMale ? 10 : 10;
  let hrpMax = isMale ? 60 : 45;

  let sdcMinSec = isMale ? 3 * 60 : 3 * 60 + 30;
  let sdcMaxSec = isMale ? 1 * 60 + 30 : 1 * 60 + 55;

  let plkMinSec = 1 * 60 + 10;
  let plkMaxSec = 3 * 60 + 30;

  let runMinSec = isMale ? 21 * 60 : 23 * 60 + 30;
  let runMaxSec = isMale ? 13 * 60 + 30 : 15 * 60 + 30;

  function scoreHigherBetter(val: number, minReq: number, maxReq: number): number {
    if (val >= maxReq) return 100;
    if (val < minReq) return Math.max(0, Math.floor((val / minReq) * 59));
    return Math.floor(60 + ((val - minReq) / (maxReq - minReq)) * 40);
  }

  function scoreLowerBetter(valSec: number, minPassSec: number, max100Sec: number): number {
    if (valSec <= max100Sec) return 100;
    if (valSec > minPassSec) {
      const diff = valSec - minPassSec;
      return Math.max(0, Math.floor(59 - (diff / 120) * 59));
    }
    return Math.floor(60 + ((minPassSec - valSec) / (minPassSec - max100Sec)) * 40);
  }

  const sdcSec = input.sdcMinutes * 60 + input.sdcSeconds;
  const plkSec = input.plkMinutes * 60 + input.plkSeconds;
  const runSec = input.twoMileMinutes * 60 + input.twoMileSeconds;

  const mdlScore = scoreHigherBetter(input.mdlLbs, mdlMin, mdlMax);
  const sptScore = scoreHigherBetter(input.sptMeters, sptMin, sptMax);
  const hrpScore = scoreHigherBetter(input.hrpReps, hrpMin, hrpMax);
  const sdcScore = scoreLowerBetter(sdcSec, sdcMinSec, sdcMaxSec);
  const plkScore = scoreHigherBetter(plkSec, plkMinSec, plkMaxSec);
  const runScore = scoreLowerBetter(runSec, runMinSec, runMaxSec);

  const passed =
    mdlScore >= 60 &&
    sptScore >= 60 &&
    hrpScore >= 60 &&
    sdcScore >= 60 &&
    plkScore >= 60 &&
    runScore >= 60;

  const total = mdlScore + sptScore + hrpScore + sdcScore + plkScore + runScore;
  const excellence =
    total >= 540 &&
    mdlScore >= 90 &&
    sptScore >= 90 &&
    hrpScore >= 90 &&
    sdcScore >= 90 &&
    plkScore >= 90 &&
    runScore >= 90;

  return {
    mdlScore,
    sptScore,
    hrpScore,
    sdcScore,
    plkScore,
    twoMileScore: runScore,
    totalScore: total,
    passed,
    isPhysicalFitnessExcellence: excellence,
    eventPassStatus: {
      mdl: mdlScore >= 60,
      spt: sptScore >= 60,
      hrp: hrpScore >= 60,
      sdc: sdcScore >= 60,
      plk: plkScore >= 60,
      twoMile: runScore >= 60,
    },
  };
}

// ==========================================
// 4. Bench Press Calculator (1RM Estimator)
// ==========================================
export interface BenchPressInput {
  weightLifted: number;
  repetitions: number;
  bodyWeight?: number;
  unit?: 'lbs' | 'kg';
}

export interface BenchPressResult {
  oneRepMax: number;
  epley1RM: number;
  brzycki1RM: number;
  lander1RM: number;
  lombardi1RM: number;
  mayhew1RM: number;
  percentageTable: { percent: number; weight: number; estimatedReps: number }[];
  strengthToWeightRatio?: number;
  classification?: 'Untrained' | 'Novice' | 'Intermediate' | 'Advanced' | 'Elite';
}

export function calculateBenchPress(input: BenchPressInput): BenchPressResult {
  const w = Math.max(1, input.weightLifted);
  const r = Math.max(1, Math.min(30, input.repetitions));

  if (r === 1) {
    const table = [100, 95, 90, 85, 80, 75, 70, 65, 60, 55, 50].map(pct => ({
      percent: pct,
      weight: Number((w * (pct / 100)).toFixed(1)),
      estimatedReps: pct === 100 ? 1 : Math.round((100 - pct) / 2.5) + 1,
    }));

    let ratio = input.bodyWeight && input.bodyWeight > 0 ? w / input.bodyWeight : undefined;
    let cls: 'Untrained' | 'Novice' | 'Intermediate' | 'Advanced' | 'Elite' | undefined;
    if (ratio) {
      if (ratio >= 2.0) cls = 'Elite';
      else if (ratio >= 1.5) cls = 'Advanced';
      else if (ratio >= 1.15) cls = 'Intermediate';
      else if (ratio >= 0.8) cls = 'Novice';
      else cls = 'Untrained';
    }

    return {
      oneRepMax: w,
      epley1RM: w,
      brzycki1RM: w,
      lander1RM: w,
      lombardi1RM: w,
      mayhew1RM: w,
      percentageTable: table,
      strengthToWeightRatio: ratio ? Number(ratio.toFixed(2)) : undefined,
      classification: cls,
    };
  }

  const epley = w * (1 + r / 30);
  const brzycki = r < 37 ? w * (36 / (37 - r)) : epley;
  const lander = (100 * w) / (101.3 - 2.67123 * r);
  const lombardi = w * Math.pow(r, 0.10);
  const mayhew = (100 * w) / (52.2 + 41.9 * Math.exp(-0.055 * r));

  const avg1RM = (epley + brzycki + lander + lombardi + mayhew) / 5;

  const table = [100, 95, 90, 85, 80, 75, 70, 65, 60, 55, 50].map(pct => ({
    percent: pct,
    weight: Number((avg1RM * (pct / 100)).toFixed(1)),
    estimatedReps: pct === 100 ? 1 : Math.round((100 - pct) / 2.5) + 1,
  }));

  let ratio = input.bodyWeight && input.bodyWeight > 0 ? avg1RM / input.bodyWeight : undefined;
  let cls: 'Untrained' | 'Novice' | 'Intermediate' | 'Advanced' | 'Elite' | undefined;
  if (ratio) {
    if (ratio >= 2.0) cls = 'Elite';
    else if (ratio >= 1.5) cls = 'Advanced';
    else if (ratio >= 1.15) cls = 'Intermediate';
    else if (ratio >= 0.8) cls = 'Novice';
    else cls = 'Untrained';
  }

  return {
    oneRepMax: Number(avg1RM.toFixed(1)),
    epley1RM: Number(epley.toFixed(1)),
    brzycki1RM: Number(brzycki.toFixed(1)),
    lander1RM: Number(lander.toFixed(1)),
    lombardi1RM: Number(lombardi.toFixed(1)),
    mayhew1RM: Number(mayhew.toFixed(1)),
    percentageTable: table,
    strengthToWeightRatio: ratio ? Number(ratio.toFixed(2)) : undefined,
    classification: cls,
  };
}
