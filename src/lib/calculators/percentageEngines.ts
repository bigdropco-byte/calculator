/**
 * Pure Calculation Engine: Percentage Suite
 * Covers Discount Percentage, Win Percentage, Yearly Percentage Increase,
 * Percentage Decrease, Part Time Percentage, Time Percentage, Percentage of Time,
 * Reverse Percentage, Growth Percentage, Tax Percentage, VAT Percentage,
 * Slugging Percentage, and Body Fat Percentage.
 */

// 1. Discount Percentage
export interface DiscountPercentageResult {
  originalPrice: number;
  discountPercent: number;
  additionalDiscountPercent: number;
  primarySavings: number;
  additionalSavings: number;
  totalSavings: number;
  finalPrice: number;
  effectiveDiscountPercent: number;
}

export function calculateDiscountPercentage(
  originalPrice: number,
  discountPercent: number,
  additionalDiscountPercent: number = 0
): DiscountPercentageResult {
  if (isNaN(originalPrice) || originalPrice <= 0) {
    return {
      originalPrice: 0,
      discountPercent: 0,
      additionalDiscountPercent: 0,
      primarySavings: 0,
      additionalSavings: 0,
      totalSavings: 0,
      finalPrice: 0,
      effectiveDiscountPercent: 0,
    };
  }

  const d1 = Math.max(0, Math.min(100, isNaN(discountPercent) ? 0 : discountPercent));
  const d2 = Math.max(0, Math.min(100, isNaN(additionalDiscountPercent) ? 0 : additionalDiscountPercent));

  const primarySavings = originalPrice * (d1 / 100);
  const intermediatePrice = originalPrice - primarySavings;
  const additionalSavings = intermediatePrice * (d2 / 100);
  const totalSavings = primarySavings + additionalSavings;
  const finalPrice = Math.max(0, originalPrice - totalSavings);
  const effectiveDiscountPercent = (totalSavings / originalPrice) * 100;

  return {
    originalPrice,
    discountPercent: d1,
    additionalDiscountPercent: d2,
    primarySavings: Math.round(primarySavings * 100) / 100,
    additionalSavings: Math.round(additionalSavings * 100) / 100,
    totalSavings: Math.round(totalSavings * 100) / 100,
    finalPrice: Math.round(finalPrice * 100) / 100,
    effectiveDiscountPercent: Math.round(effectiveDiscountPercent * 100) / 100,
  };
}

// 2. Win Percentage
export interface WinPercentageResult {
  wins: number;
  losses: number;
  ties: number;
  totalGames: number;
  winPercentage: number; // 0 to 100
  decimalStanding: string; // e.g. ".750" or "1.000"
  gamesOver500: number; // Wins - Losses
}

export function calculateWinPercentage(
  wins: number,
  losses: number,
  ties: number = 0
): WinPercentageResult {
  const w = Math.max(0, isNaN(wins) ? 0 : wins);
  const l = Math.max(0, isNaN(losses) ? 0 : losses);
  const t = Math.max(0, isNaN(ties) ? 0 : ties);
  const totalGames = w + l + t;

  if (totalGames === 0) {
    return {
      wins: 0,
      losses: 0,
      ties: 0,
      totalGames: 0,
      winPercentage: 0,
      decimalStanding: '.000',
      gamesOver500: 0,
    };
  }

  // Standard sports rule: ties count as 0.5 win
  const effectiveWins = w + 0.5 * t;
  const rawRatio = effectiveWins / totalGames;
  const winPercentage = Math.round(rawRatio * 10000) / 100; // 2 decimal places %

  let decimalStanding = rawRatio.toFixed(3);
  if (decimalStanding.startsWith('0.')) {
    decimalStanding = decimalStanding.slice(1);
  }

  return {
    wins: w,
    losses: l,
    ties: t,
    totalGames,
    winPercentage,
    decimalStanding,
    gamesOver500: w - l,
  };
}

// 3. Yearly Percentage Increase (Compound Annual Growth Rate & Simple Annual)
export interface YearlyPercentageIncreaseResult {
  initialValue: number;
  finalValue: number;
  years: number;
  totalPercentageChange: number;
  cagr: number; // Compound Annual Growth Rate %
  simpleAnnualAverage: number; // Simple % per year
  absoluteChange: number;
}

export function calculateYearlyPercentageIncrease(
  initialValue: number,
  finalValue: number,
  years: number
): YearlyPercentageIncreaseResult {
  if (isNaN(initialValue) || isNaN(finalValue) || isNaN(years) || years <= 0 || initialValue === 0) {
    return {
      initialValue: 0,
      finalValue: 0,
      years: Math.max(1, years || 1),
      totalPercentageChange: 0,
      cagr: 0,
      simpleAnnualAverage: 0,
      absoluteChange: 0,
    };
  }

  const absoluteChange = finalValue - initialValue;
  const totalPercentageChange = (absoluteChange / Math.abs(initialValue)) * 100;
  const simpleAnnualAverage = totalPercentageChange / years;

  let cagr = 0;
  if (initialValue > 0 && finalValue > 0) {
    cagr = (Math.pow(finalValue / initialValue, 1 / years) - 1) * 100;
  } else if (initialValue < 0 && finalValue < 0) {
    // For negative base metrics
    cagr = -1 * (Math.pow(Math.abs(finalValue) / Math.abs(initialValue), 1 / years) - 1) * 100;
  }

  return {
    initialValue,
    finalValue,
    years,
    totalPercentageChange: Math.round(totalPercentageChange * 100) / 100,
    cagr: Math.round(cagr * 100) / 100,
    simpleAnnualAverage: Math.round(simpleAnnualAverage * 100) / 100,
    absoluteChange: Math.round(absoluteChange * 100) / 100,
  };
}

// 4. Percentage Decrease
export interface PercentageDecreaseResult {
  initialValue: number;
  finalValue: number;
  absoluteDifference: number;
  percentageDecrease: number;
  isDecrease: boolean;
}

export function calculatePercentageDecrease(
  initialValue: number,
  finalValue: number
): PercentageDecreaseResult {
  if (isNaN(initialValue) || isNaN(finalValue) || initialValue === 0) {
    return {
      initialValue: 0,
      finalValue: 0,
      absoluteDifference: 0,
      percentageDecrease: 0,
      isDecrease: true,
    };
  }

  const diff = initialValue - finalValue;
  const percentageDecrease = (diff / Math.abs(initialValue)) * 100;
  const isDecrease = diff >= 0;

  return {
    initialValue,
    finalValue,
    absoluteDifference: Math.round(Math.abs(diff) * 100) / 100,
    percentageDecrease: Math.round(Math.abs(percentageDecrease) * 100) / 100,
    isDecrease,
  };
}

// 5. Part Time Percentage (FTE & Pro-Rata Salary)
export interface PartTimePercentageResult {
  partTimeHours: number;
  standardFullTimeHours: number;
  fteRatio: number; // e.g. 0.8
  partTimePercentage: number; // e.g. 80%
  proRataSalary?: number;
  annualPartTimeHours: number;
  annualFullTimeHours: number;
}

export function calculatePartTimePercentage(
  partTimeHours: number,
  standardFullTimeHours: number = 40,
  fullTimeSalary?: number
): PartTimePercentageResult {
  const pt = Math.max(0, isNaN(partTimeHours) ? 0 : partTimeHours);
  const ft = Math.max(1, isNaN(standardFullTimeHours) ? 40 : standardFullTimeHours);

  const fteRatio = pt / ft;
  const partTimePercentage = Math.round(fteRatio * 10000) / 100;
  const annualPartTimeHours = Math.round(pt * 52);
  const annualFullTimeHours = Math.round(ft * 52);

  let proRataSalary: number | undefined;
  if (typeof fullTimeSalary === 'number' && !isNaN(fullTimeSalary) && fullTimeSalary > 0) {
    proRataSalary = Math.round(fullTimeSalary * fteRatio * 100) / 100;
  }

  return {
    partTimeHours: pt,
    standardFullTimeHours: ft,
    fteRatio: Math.round(fteRatio * 1000) / 1000,
    partTimePercentage,
    proRataSalary,
    annualPartTimeHours,
    annualFullTimeHours,
  };
}

// 6. Time Percentage (What % of a duration has passed / been used)
export interface TimePercentageResult {
  spentSeconds: number;
  totalSeconds: number;
  percentage: number;
  remainingSeconds: number;
  remainingPercentage: number;
  spentFormatted: string;
  totalFormatted: string;
  remainingFormatted: string;
}

function formatSecondsToHMS(totalSec: number): string {
  const isNeg = totalSec < 0;
  const sec = Math.abs(Math.round(totalSec));
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  const parts: string[] = [];
  if (h > 0) parts.push(`${h}h`);
  if (m > 0 || h > 0) parts.push(`${m}m`);
  parts.push(`${s}s`);
  return (isNeg ? '-' : '') + parts.join(' ');
}

export function calculateTimePercentage(
  spentSeconds: number,
  totalSeconds: number
): TimePercentageResult {
  const spent = Math.max(0, isNaN(spentSeconds) ? 0 : spentSeconds);
  const total = Math.max(0, isNaN(totalSeconds) ? 0 : totalSeconds);

  if (total === 0) {
    return {
      spentSeconds: 0,
      totalSeconds: 0,
      percentage: 0,
      remainingSeconds: 0,
      remainingPercentage: 0,
      spentFormatted: '0s',
      totalFormatted: '0s',
      remainingFormatted: '0s',
    };
  }

  const rawPercent = (spent / total) * 100;
  const percentage = Math.round(rawPercent * 100) / 100;
  const remainingSeconds = Math.max(0, total - spent);
  const remainingPercentage = Math.max(0, Math.round((100 - percentage) * 100) / 100);

  return {
    spentSeconds: spent,
    totalSeconds: total,
    percentage,
    remainingSeconds,
    remainingPercentage,
    spentFormatted: formatSecondsToHMS(spent),
    totalFormatted: formatSecondsToHMS(total),
    remainingFormatted: formatSecondsToHMS(remainingSeconds),
  };
}

// 7. Percentage of Time (What is X% of a duration?)
export interface PercentageOfTimeResult {
  percentage: number;
  baseSeconds: number;
  resultSeconds: number;
  hours: number;
  minutes: number;
  seconds: number;
  formattedDuration: string;
  ofDayHours: number; // e.g. X% of 24 hours
  ofWorkWeekHours: number; // e.g. X% of 40 hours
  ofYearDays: number; // e.g. X% of 365 days
}

export function calculatePercentageOfTime(
  percentage: number,
  baseHours: number,
  baseMinutes: number = 0,
  baseSeconds: number = 0
): PercentageOfTimeResult {
  const p = Math.max(0, isNaN(percentage) ? 0 : percentage);
  const h = Math.max(0, isNaN(baseHours) ? 0 : baseHours);
  const m = Math.max(0, isNaN(baseMinutes) ? 0 : baseMinutes);
  const s = Math.max(0, isNaN(baseSeconds) ? 0 : baseSeconds);

  const baseTotalSeconds = h * 3600 + m * 60 + s;
  const resultSeconds = Math.round(baseTotalSeconds * (p / 100));

  const resH = Math.floor(resultSeconds / 3600);
  const resM = Math.floor((resultSeconds % 3600) / 60);
  const resS = resultSeconds % 60;

  // Comparison benchmarks:
  // 24-hour day
  const ofDayHours = Math.round(24 * (p / 100) * 100) / 100;
  // 40-hour work week
  const ofWorkWeekHours = Math.round(40 * (p / 100) * 100) / 100;
  // 365-day year
  const ofYearDays = Math.round(365 * (p / 100) * 10) / 10;

  return {
    percentage: p,
    baseSeconds: baseTotalSeconds,
    resultSeconds,
    hours: resH,
    minutes: resM,
    seconds: resS,
    formattedDuration: formatSecondsToHMS(resultSeconds),
    ofDayHours,
    ofWorkWeekHours,
    ofYearDays,
  };
}

// 8. Reverse Percentage (Find original value before increase/decrease)
export interface ReversePercentageResult {
  finalValue: number;
  percentageChange: number;
  type: 'increase' | 'decrease';
  originalValue: number;
  absoluteDifference: number;
  multiplier: number;
}

export function calculateReversePercentage(
  finalValue: number,
  percentageChange: number,
  type: 'increase' | 'decrease'
): ReversePercentageResult {
  if (isNaN(finalValue) || isNaN(percentageChange)) {
    return {
      finalValue: 0,
      percentageChange: 0,
      type,
      originalValue: 0,
      absoluteDifference: 0,
      multiplier: 1,
    };
  }

  const p = Math.max(0, percentageChange);
  let multiplier = 1;
  let originalValue = 0;

  if (type === 'increase') {
    multiplier = 1 + p / 100;
    originalValue = multiplier > 0 ? finalValue / multiplier : 0;
  } else {
    // decrease
    multiplier = 1 - p / 100;
    originalValue = multiplier > 0 ? finalValue / multiplier : 0;
  }

  const roundedOrig = Math.round(originalValue * 100) / 100;
  const absoluteDifference = Math.round(Math.abs(finalValue - roundedOrig) * 100) / 100;

  return {
    finalValue,
    percentageChange: p,
    type,
    originalValue: roundedOrig,
    absoluteDifference,
    multiplier: Math.round(multiplier * 10000) / 10000,
  };
}

// 9. Growth Percentage (Between two periods + multiple factor + next period)
export interface GrowthPercentageResult {
  initialValue: number;
  finalValue: number;
  absoluteGrowth: number;
  growthPercentage: number;
  growthFactor: number; // e.g. 1.5x
  projectedNextValue: number; // at same growth rate
}

export function calculateGrowthPercentage(
  initialValue: number,
  finalValue: number
): GrowthPercentageResult {
  if (isNaN(initialValue) || isNaN(finalValue) || initialValue === 0) {
    return {
      initialValue: 0,
      finalValue: 0,
      absoluteGrowth: 0,
      growthPercentage: 0,
      growthFactor: 1,
      projectedNextValue: 0,
    };
  }

  const absoluteGrowth = finalValue - initialValue;
  const growthRate = absoluteGrowth / Math.abs(initialValue);
  const growthPercentage = Math.round(growthRate * 10000) / 100;
  const growthFactor = Math.round((finalValue / initialValue) * 1000) / 1000;
  const projectedNextValue = Math.round(finalValue * (1 + growthRate) * 100) / 100;

  return {
    initialValue,
    finalValue,
    absoluteGrowth: Math.round(absoluteGrowth * 100) / 100,
    growthPercentage,
    growthFactor,
    projectedNextValue,
  };
}

// 10. Tax Percentage
export interface TaxPercentageResult {
  preTaxPrice: number;
  taxRate: number; // in %
  taxAmount: number;
  totalPrice: number;
  effectiveRate: number;
}

export function calculateTaxPercentage(
  preTaxPrice: number,
  taxRate: number
): TaxPercentageResult {
  const p = Math.max(0, isNaN(preTaxPrice) ? 0 : preTaxPrice);
  const r = Math.max(0, isNaN(taxRate) ? 0 : taxRate);

  const taxAmount = Math.round(p * (r / 100) * 100) / 100;
  const totalPrice = Math.round((p + taxAmount) * 100) / 100;
  const effectiveRate = p > 0 ? Math.round((taxAmount / p) * 10000) / 100 : r;

  return {
    preTaxPrice: p,
    taxRate: r,
    taxAmount,
    totalPrice,
    effectiveRate,
  };
}

// 11. VAT Percentage (Add or Remove VAT)
export interface VatPercentageResult {
  netAmount: number;
  vatRate: number; // in %
  vatAmount: number;
  grossAmount: number;
  mode: 'add' | 'remove';
}

export function calculateVatPercentage(
  amount: number,
  vatRate: number,
  mode: 'add' | 'remove' = 'add'
): VatPercentageResult {
  const amt = Math.max(0, isNaN(amount) ? 0 : amount);
  const r = Math.max(0, isNaN(vatRate) ? 0 : vatRate);

  if (mode === 'add') {
    const netAmount = amt;
    const vatAmount = Math.round(netAmount * (r / 100) * 100) / 100;
    const grossAmount = Math.round((netAmount + vatAmount) * 100) / 100;
    return {
      netAmount,
      vatRate: r,
      vatAmount,
      grossAmount,
      mode: 'add',
    };
  } else {
    // remove VAT from gross
    const grossAmount = amt;
    const divisor = 1 + r / 100;
    const netAmount = divisor > 0 ? Math.round((grossAmount / divisor) * 100) / 100 : 0;
    const vatAmount = Math.round((grossAmount - netAmount) * 100) / 100;
    return {
      netAmount,
      vatRate: r,
      vatAmount,
      grossAmount,
      mode: 'remove',
    };
  }
}

// 12. Slugging Percentage
export interface SluggingPercentageResult {
  atBats: number;
  singles: number;
  doubles: number;
  triples: number;
  homeRuns: number;
  totalHits: number;
  totalBases: number;
  sluggingPercentage: number; // raw e.g. 0.550
  formattedSlugging: string; // e.g. ".550"
  battingAverage: number;
  formattedBattingAverage: string;
  isolatedPower: number; // ISO = SLG - BA
}

export function calculateSluggingPercentage(
  atBats: number,
  singles: number,
  doubles: number,
  triples: number,
  homeRuns: number
): SluggingPercentageResult {
  const ab = Math.max(0, isNaN(atBats) ? 0 : atBats);
  const s = Math.max(0, isNaN(singles) ? 0 : singles);
  const d = Math.max(0, isNaN(doubles) ? 0 : doubles);
  const t = Math.max(0, isNaN(triples) ? 0 : triples);
  const hr = Math.max(0, isNaN(homeRuns) ? 0 : homeRuns);

  const totalHits = s + d + t + hr;
  const totalBases = s * 1 + d * 2 + t * 3 + hr * 4;

  if (ab === 0) {
    return {
      atBats: 0,
      singles: s,
      doubles: d,
      triples: t,
      homeRuns: hr,
      totalHits,
      totalBases,
      sluggingPercentage: 0,
      formattedSlugging: '.000',
      battingAverage: 0,
      formattedBattingAverage: '.000',
      isolatedPower: 0,
    };
  }

  const rawSlg = totalBases / ab;
  const rawBa = totalHits / ab;
  const rawIso = Math.max(0, rawSlg - rawBa);

  const formatStat = (val: number): string => {
    let str = val.toFixed(3);
    if (str.startsWith('0.')) {
      str = str.slice(1);
    }
    return str;
  };

  return {
    atBats: ab,
    singles: s,
    doubles: d,
    triples: t,
    homeRuns: hr,
    totalHits,
    totalBases,
    sluggingPercentage: Math.round(rawSlg * 1000) / 1000,
    formattedSlugging: formatStat(rawSlg),
    battingAverage: Math.round(rawBa * 1000) / 1000,
    formattedBattingAverage: formatStat(rawBa),
    isolatedPower: Math.round(rawIso * 1000) / 1000,
  };
}

// 13. Body Fat Percentage (U.S. Navy Method)
export interface FatPercentageInput {
  gender: 'male' | 'female';
  unit: 'metric' | 'imperial';
  height: number; // cm if metric, inches if imperial
  weight: number; // kg if metric, lbs if imperial
  neck: number; // cm if metric, inches if imperial
  waist: number; // cm if metric, inches if imperial
  hip?: number; // cm if metric, inches if imperial (women only)
}

export interface FatPercentageResult {
  bodyFatPercentage: number;
  fatMass: number; // in user unit
  leanMass: number; // in user unit
  unit: 'metric' | 'imperial';
  weightUnit: string;
  category: 'Essential Fat' | 'Athletes' | 'Fitness' | 'Average' | 'Obese';
  bmi: number;
  idealBodyFatRange: string;
}

export function calculateFatPercentage(input: FatPercentageInput): FatPercentageResult {
  const { gender, unit, height, weight, neck, waist, hip = 0 } = input;
  const weightUnit = unit === 'metric' ? 'kg' : 'lbs';

  if (!height || !weight || !neck || !waist || (gender === 'female' && !hip)) {
    return {
      bodyFatPercentage: 0,
      fatMass: 0,
      leanMass: 0,
      unit,
      weightUnit,
      category: 'Average',
      bmi: 0,
      idealBodyFatRange: gender === 'male' ? '10% - 20%' : '18% - 28%',
    };
  }

  // Convert dimensions to centimeters for Navy formula calculation
  const toCm = (val: number) => (unit === 'imperial' ? val * 2.54 : val);
  const heightCm = toCm(height);
  const waistCm = toCm(waist);
  const neckCm = toCm(neck);
  const hipCm = toCm(hip);

  // Convert weight to kg for BMI
  const weightKg = unit === 'imperial' ? weight * 0.45359237 : weight;
  const heightM = heightCm / 100;
  const bmi = heightM > 0 ? Math.round((weightKg / (heightM * heightM)) * 10) / 10 : 0;

  let bodyFat = 0;
  if (gender === 'male') {
    const diff = waistCm - neckCm;
    if (diff > 0 && heightCm > 0) {
      // Hodgdon and Beckett (1984) metric body density for men
      const density = 1.0324 - 0.19077 * Math.log10(diff) + 0.15456 * Math.log10(heightCm);
      if (density > 0) {
        // Siri equation
        bodyFat = (495 / density) - 450;
      }
    }
  } else {
    const sumDiff = waistCm + hipCm - neckCm;
    if (sumDiff > 0 && heightCm > 0) {
      // Hodgdon and Beckett (1984) metric body density for women
      const density = 1.29579 - 0.35004 * Math.log10(sumDiff) + 0.22100 * Math.log10(heightCm);
      if (density > 0) {
        // Siri equation
        bodyFat = (495 / density) - 450;
      }
    }
  }

  const roundedFat = Math.max(2, Math.min(70, Math.round(bodyFat * 10) / 10));
  const fatMass = Math.round(weight * (roundedFat / 100) * 10) / 10;
  const leanMass = Math.round((weight - fatMass) * 10) / 10;

  // ACE classification categories
  let category: FatPercentageResult['category'] = 'Average';
  if (gender === 'male') {
    if (roundedFat < 6) category = 'Essential Fat';
    else if (roundedFat <= 13) category = 'Athletes';
    else if (roundedFat <= 17) category = 'Fitness';
    else if (roundedFat <= 24) category = 'Average';
    else category = 'Obese';
  } else {
    if (roundedFat < 14) category = 'Essential Fat';
    else if (roundedFat <= 20) category = 'Athletes';
    else if (roundedFat <= 24) category = 'Fitness';
    else if (roundedFat <= 31) category = 'Average';
    else category = 'Obese';
  }

  return {
    bodyFatPercentage: roundedFat,
    fatMass,
    leanMass,
    unit,
    weightUnit,
    category,
    bmi,
    idealBodyFatRange: gender === 'male' ? '10% - 20%' : '18% - 28%',
  };
}
