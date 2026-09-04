/**
 * Physics, Medical & Demographics Density Calculation Engine
 * Covers universal density, cube density, water density, air density,
 * pixel density (PPI), population density, and PSA density.
 */

export interface GeneralDensityResult {
  densityKgM3: number;
  densityGCm3: number;
  densityLbsFt3: number;
  densityLbsIn3: number;
  massKg: number;
  volumeM3: number;
}

export function calculateGeneralDensity(options: {
  massValue: number;
  massUnit: 'kg' | 'g' | 'mg' | 'lbs' | 'oz';
  volumeValue: number;
  volumeUnit: 'm3' | 'cm3' | 'liters' | 'ml' | 'ft3' | 'in3' | 'gallons';
}): GeneralDensityResult {
  const mVal = Math.max(0, options.massValue);
  const vVal = Math.max(0.000001, options.volumeValue);

  // Convert mass to kg
  const massToKgMap: Record<string, number> = {
    kg: 1,
    g: 0.001,
    mg: 0.000001,
    lbs: 0.453592,
    oz: 0.0283495,
  };
  const massKg = mVal * (massToKgMap[options.massUnit] || 1);

  // Convert volume to m^3
  const volToM3Map: Record<string, number> = {
    m3: 1,
    cm3: 0.000001,
    liters: 0.001,
    ml: 0.000001,
    ft3: 0.0283168,
    in3: 0.0000163871,
    gallons: 0.00378541,
  };
  const volumeM3 = vVal * (volToM3Map[options.volumeUnit] || 1);

  const densityKgM3 = massKg / volumeM3;
  const densityGCm3 = densityKgM3 / 1000;
  const densityLbsFt3 = densityKgM3 * 0.062428;
  const densityLbsIn3 = densityLbsFt3 / 1728;

  return {
    densityKgM3: Number(densityKgM3.toFixed(2)),
    densityGCm3: Number(densityGCm3.toFixed(4)),
    densityLbsFt3: Number(densityLbsFt3.toFixed(2)),
    densityLbsIn3: Number(densityLbsIn3.toFixed(5)),
    massKg: Number(massKg.toFixed(4)),
    volumeM3: Number(volumeM3.toFixed(6)),
  };
}

export interface WaterDensityResult {
  densityKgM3: number;
  densityGCm3: number;
  densityLbsFt3: number;
  specificGravity: number;
  temperatureCelsius: number;
  salinityPsu: number;
  waterType: string;
}

export function calculateWaterDensity(options: {
  temperatureCelsius: number;
  salinityPsu?: number; // 0 for pure freshwater, ~35 PSU for ocean seawater
}): WaterDensityResult {
  const t = Math.max(-5, Math.min(100, options.temperatureCelsius));
  const s = Math.max(0, Math.min(45, options.salinityPsu || 0));

  // Kell (1975) freshwater formulation approximation:
  // rho_0 = 999.83952 + 16.945176*t - 7.9870401e-3*t^2 - 46.170461e-6*t^3 + 105.56302e-9*t^4 - 280.54253e-12*t^5) / (1 + 16.897850e-3*t)
  const num = 999.83952 + 16.945176 * t - 7.9870401e-3 * Math.pow(t, 2) - 46.170461e-6 * Math.pow(t, 3) + 105.56302e-9 * Math.pow(t, 4) - 280.54253e-12 * Math.pow(t, 5);
  const den = 1 + 16.89785e-3 * t;
  let rhoFresh = num / den;

  // UNESCO salinity correction: rho(S, T) = rho_fresh + S * (0.824493 - 4.0899e-3 * T + 7.6438e-5 * T^2 - 8.2467e-7 * T^3)
  const salCorrection = s * (0.824493 - 4.0899e-3 * t + 7.6438e-5 * Math.pow(t, 2) - 8.2467e-7 * Math.pow(t, 3));
  const rhoTotal = rhoFresh + salCorrection;

  const gCm3 = rhoTotal / 1000;
  const lbsFt3 = rhoTotal * 0.062428;
  const sg = rhoTotal / 1000; // relative to 4°C freshwater

  let waterType = 'Freshwater (0 PSU)';
  if (s > 30) waterType = 'Ocean Seawater (~35 PSU)';
  else if (s > 5) waterType = 'Brackish Estuary Water';

  return {
    densityKgM3: Number(rhoTotal.toFixed(2)),
    densityGCm3: Number(gCm3.toFixed(4)),
    densityLbsFt3: Number(lbsFt3.toFixed(2)),
    specificGravity: Number(sg.toFixed(4)),
    temperatureCelsius: t,
    salinityPsu: s,
    waterType,
  };
}

export interface AirDensityResult {
  densityKgM3: number;
  densityLbsFt3: number;
  relativeDensityPct: number;
  dewPointCelsius: number;
  vaporPressureKpa: number;
  altitudeMeters: number;
}

export function calculateAirDensity(options: {
  temperatureCelsius: number;
  pressureHpa?: number; // default 1013.25 hPa
  relativeHumidityPct?: number; // 0 to 100%
  altitudeMeters?: number;
}): AirDensityResult {
  const t = options.temperatureCelsius;
  const tKelvin = t + 273.15;
  const rh = Math.max(0, Math.min(100, options.relativeHumidityPct || 0)) / 100;
  const alt = Math.max(0, options.altitudeMeters || 0);

  // Pressure at altitude if not explicitly overridden:
  const p = options.pressureHpa !== undefined ? options.pressureHpa * 100 : 101325 * Math.pow(1 - (0.0065 * alt) / 288.15, 5.255);

  // Saturation vapor pressure (Tetens equation) in Pascals:
  const es = 610.78 * Math.exp((17.27 * t) / (t + 237.3));
  const pv = rh * es; // actual vapor pressure
  const pd = p - pv; // dry air partial pressure

  const Rd = 287.058; // specific gas constant dry air J/(kg*K)
  const Rv = 461.495; // specific gas constant water vapor J/(kg*K)

  // Moist air density rho = pd / (Rd * T) + pv / (Rv * T)
  const rho = pd / (Rd * tKelvin) + pv / (Rv * tKelvin);
  const lbsFt3 = rho * 0.062428;
  const relDensity = (rho / 1.225) * 100;

  // Approximate dew point:
  const a = 17.27;
  const b = 237.7;
  const alpha = ((a * t) / (b + t)) + Math.log(Math.max(0.01, rh));
  const dewPoint = (b * alpha) / (a - alpha);

  return {
    densityKgM3: Number(rho.toFixed(4)),
    densityLbsFt3: Number(lbsFt3.toFixed(4)),
    relativeDensityPct: Number(relDensity.toFixed(1)),
    dewPointCelsius: Number(dewPoint.toFixed(1)),
    vaporPressureKpa: Number((pv / 1000).toFixed(3)),
    altitudeMeters: Math.round(alt),
  };
}

export interface PixelDensityResult {
  ppi: number;
  totalPixels: number;
  megapixels: number;
  aspectRatio: string;
  dotPitchMm: number;
}

export function calculatePixelDensity(options: {
  horizontalPixels: number;
  verticalPixels: number;
  screenDiagonalInches: number;
}): PixelDensityResult {
  const w = Math.max(1, options.horizontalPixels);
  const h = Math.max(1, options.verticalPixels);
  const d = Math.max(0.1, options.screenDiagonalInches);

  // PPI = sqrt(w^2 + h^2) / diagonal
  const diagonalPixels = Math.sqrt(Math.pow(w, 2) + Math.pow(h, 2));
  const ppi = diagonalPixels / d;
  const dotPitch = 25.4 / ppi; // mm per pixel

  const totalPixels = w * h;
  const megapixels = totalPixels / 1000000;

  // Aspect ratio simplified
  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
  const divisor = gcd(w, h);
  const aspectW = w / divisor;
  const aspectH = h / divisor;
  const aspectStr = (aspectW <= 32 && aspectH <= 32) ? `${aspectW}:${aspectH}` : `${(w / h).toFixed(2)}:1`;

  return {
    ppi: Number(ppi.toFixed(1)),
    totalPixels,
    megapixels: Number(megapixels.toFixed(2)),
    aspectRatio: aspectStr,
    dotPitchMm: Number(dotPitch.toFixed(4)),
  };
}

export interface PopulationDensityResult {
  densityPerSqMile: number;
  densityPerSqKm: number;
  totalPopulation: number;
  landAreaSqMiles: number;
  landAreaSqKm: number;
  areaPerPersonSqMeters: number;
}

export function calculatePopulationDensity(options: {
  population: number;
  landArea: number;
  areaUnit: 'sq_miles' | 'sq_km';
}): PopulationDensityResult {
  const pop = Math.max(0, options.population);
  const area = Math.max(0.001, options.landArea);

  let sqMiles = 0;
  let sqKm = 0;

  if (options.areaUnit === 'sq_miles') {
    sqMiles = area;
    sqKm = area * 2.58999;
  } else {
    sqKm = area;
    sqMiles = area / 2.58999;
  }

  const densityPerSqMile = pop / sqMiles;
  const densityPerSqKm = pop / sqKm;
  const areaPerPersonM2 = pop > 0 ? (sqKm * 1000000) / pop : 0;

  return {
    densityPerSqMile: Math.round(densityPerSqMile),
    densityPerSqKm: Math.round(densityPerSqKm),
    totalPopulation: pop,
    landAreaSqMiles: Number(sqMiles.toFixed(2)),
    landAreaSqKm: Number(sqKm.toFixed(2)),
    areaPerPersonSqMeters: Math.round(areaPerPersonM2),
  };
}

export interface PsaDensityResult {
  psaDensity: number; // ng/mL/cc
  totalPsaNgMl: number;
  prostateVolumeCc: number;
  riskCategory: 'Low / Favorable' | 'Elevated Risk (Threshold Exceeded)';
  clinicalRecommendation: string;
}

export function calculatePsaDensity(options: {
  totalPsaNgMl: number;
  prostateVolumeCc: number; // calculated from ultrasound D1 * D2 * D3 * 0.523 or direct volume
}): PsaDensityResult {
  const psa = Math.max(0, options.totalPsaNgMl);
  const vol = Math.max(1, options.prostateVolumeCc);

  // PSAD = Total PSA / Prostate Volume (cc or cm^3)
  const psad = psa / vol;

  // Standard urological clinical cutoff is 0.15 ng/mL/cc
  const isHigh = psad >= 0.15;

  return {
    psaDensity: Number(psad.toFixed(3)),
    totalPsaNgMl: psa,
    prostateVolumeCc: vol,
    riskCategory: isHigh ? 'Elevated Risk (Threshold Exceeded)' : 'Low / Favorable',
    clinicalRecommendation: isHigh
      ? 'PSA Density ≥ 0.15 ng/mL/cc suggests elevated risk for clinically significant prostate carcinoma. Multiparametric MRI (mpMRI) or targeted prostate biopsy is frequently recommended by urologists.'
      : 'PSA Density < 0.15 ng/mL/cc is reassuring and commonly associated with benign prostatic hyperplasia (BPH) or normal glandular enlargement rather than aggressive malignancy.',
  };
}
