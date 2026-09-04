/**
 * Pure Calculation Engine: Masonry, Concrete, Gravel & Asphalt
 * Covers:
 * - Concrete Calculator (cubic yards, cubic meters, premix bags, 10% margin)
 * - Concrete Slab Calculator (slab, rebar grid, gravel subbase)
 * - Concrete Block Calculator (CMU 8x8x16, mortar bags, core fill grout)
 * - Sakrete Calculator (40lb, 50lb, 60lb, 80lb bags, water ratio)
 * - Quikrete Calculator & Quikrete Concrete Calculator (standard, fast-setting, 5000 plus)
 * - Gravel Calculator & Stone Calculator (tons, cu yards, density, depth)
 * - Asphalt Calculator (HMA tons, lbs/sq yd)
 * - American Asphalt, Crushed Asphalt, Vulcan Asphalt, Hot Mix Asphalt, Recycled Asphalt
 * - Material Calculator (multi-material bulk estimator)
 */

// 1. General Concrete Yardage
export interface ConcreteYardageResult {
  volumeCubicFeet: number;
  volumeCubicYards: number;
  volumeCubicMeters: number;
  totalYardsWithWaste: number;
  wastePercentage: number;
  bags40lb: number;
  bags50lb: number;
  bags60lb: number;
  bags80lb: number;
}

export function calculateConcreteYardage(
  lengthFeet: number,
  widthFeet: number,
  thicknessInches: number,
  wastePercentage: number = 10
): ConcreteYardageResult {
  const l = Math.max(0, isNaN(lengthFeet) ? 0 : lengthFeet);
  const w = Math.max(0, isNaN(widthFeet) ? 0 : widthFeet);
  const t = Math.max(0, isNaN(thicknessInches) ? 0 : thicknessInches);
  const waste = Math.max(0, isNaN(wastePercentage) ? 10 : wastePercentage);

  const thicknessFeet = t / 12;
  const cuFt = l * w * thicknessFeet;
  const cuYds = cuFt / 27;
  const cuM = cuYds * 0.76455486;
  const totalYdsWithWaste = cuYds * (1 + waste / 100);

  // 80lb bag = 0.60 cu ft (45 bags/yd3)
  // 60lb bag = 0.45 cu ft (60 bags/yd3)
  // 50lb bag = 0.375 cu ft (72 bags/yd3)
  // 40lb bag = 0.30 cu ft (90 bags/yd3)
  const totalCuFtWithWaste = cuFt * (1 + waste / 100);
  const bags80 = Math.ceil(totalCuFtWithWaste / 0.60);
  const bags60 = Math.ceil(totalCuFtWithWaste / 0.45);
  const bags50 = Math.ceil(totalCuFtWithWaste / 0.375);
  const bags40 = Math.ceil(totalCuFtWithWaste / 0.30);

  return {
    volumeCubicFeet: Math.round(cuFt * 100) / 100,
    volumeCubicYards: Math.round(cuYds * 100) / 100,
    volumeCubicMeters: Math.round(cuM * 100) / 100,
    totalYardsWithWaste: Math.round(totalYdsWithWaste * 100) / 100,
    wastePercentage: waste,
    bags40lb: bags40,
    bags50lb: bags50,
    bags60lb: bags60,
    bags80lb: bags80,
  };
}

// 2. Concrete Slab with Rebar & Subbase
export interface ConcreteSlabResult {
  squareFeet: number;
  concreteCubicYards: number;
  concreteCubicMeters: number;
  gravelBaseCubicYards: number;
  gravelBaseTons: number;
  rebarGridPieces: number; // standard 20-ft #4 rebar sticks
  rebarGridSpacingInches: number;
  wireMeshRolls: number; // 500 sq ft rolls
  estimatedReadyMixTruckloads: number; // standard 10-yard truck
}

export function calculateConcreteSlab(
  lengthFeet: number,
  widthFeet: number,
  thicknessInches: number = 4,
  gravelBaseInches: number = 4,
  rebarSpacingInches: number = 18
): ConcreteSlabResult {
  const l = Math.max(0, isNaN(lengthFeet) ? 0 : lengthFeet);
  const w = Math.max(0, isNaN(widthFeet) ? 0 : widthFeet);
  const t = Math.max(0, isNaN(thicknessInches) ? 4 : thicknessInches);
  const gb = Math.max(0, isNaN(gravelBaseInches) ? 4 : gravelBaseInches);
  const spacing = Math.max(6, isNaN(rebarSpacingInches) ? 18 : rebarSpacingInches);

  const sqFt = l * w;
  const concreteCuYds = (sqFt * (t / 12) / 27) * 1.10; // with 10% safety margin
  const concreteCuM = concreteCuYds * 0.76455486;

  // Gravel subbase (typical compacted density 1.4 tons/yd3)
  const gravelCuYds = (sqFt * (gb / 12) / 27) * 1.15; // 15% compaction & waste
  const gravelTons = gravelCuYds * 1.4;

  // Rebar grid: #4 rebar (1/2" diameter), 20-foot standard lengths
  const spacingFeet = spacing / 12;
  const numLongitudinalBars = Math.ceil(w / spacingFeet) + 1;
  const numTransverseBars = Math.ceil(l / spacingFeet) + 1;
  const totalRebarLinearFeet = (numLongitudinalBars * l) + (numTransverseBars * w);
  // Add 10% for lap splices (minimum 15-inch lap) and corners
  const rebarPieces = Math.ceil((totalRebarLinearFeet * 1.10) / 20);

  // Wire mesh alternative: 5ft x 100ft roll (500 sq ft) with 10% overlap
  const wireMeshRolls = Math.ceil((sqFt * 1.10) / 500);

  const truckloads = Math.ceil((concreteCuYds / 10) * 10) / 10;

  return {
    squareFeet: Math.round(sqFt * 10) / 10,
    concreteCubicYards: Math.round(concreteCuYds * 100) / 100,
    concreteCubicMeters: Math.round(concreteCuM * 100) / 100,
    gravelBaseCubicYards: Math.round(gravelCuYds * 100) / 100,
    gravelBaseTons: Math.round(gravelTons * 100) / 100,
    rebarGridPieces: rebarPieces,
    rebarGridSpacingInches: spacing,
    wireMeshRolls,
    estimatedReadyMixTruckloads: truckloads,
  };
}

// 3. Concrete Block (CMU 8x8x16)
export interface ConcreteBlockResult {
  wallLengthFeet: number;
  wallHeightFeet: number;
  wallSquareFeet: number;
  totalBlocks: number; // CMU 8x8x16 with 5% waste
  mortarBags70lb: number; // 70lb bags of Type S/N
  mortarBags80lb: number; // 80lb bags
  groutCubicYards: number; // core fill grout
  rebarVertical20ftSticks: number;
}

export function calculateConcreteBlock(
  wallLengthFeet: number,
  wallHeightFeet: number,
  coreFillIntervalInches: number = 32 // vertical core fill every 32" (standard) or 0 for solid
): ConcreteBlockResult {
  const l = Math.max(0, isNaN(wallLengthFeet) ? 0 : wallLengthFeet);
  const h = Math.max(0, isNaN(wallHeightFeet) ? 0 : wallHeightFeet);

  const sqFt = l * h;
  // Standard 8x8x16 block has 0.8889 sq ft face area -> 1.125 blocks per sq ft
  const baseBlocks = sqFt * 1.125;
  const totalBlocks = Math.ceil(baseBlocks * 1.05); // 5% cuts & breakage

  // Mortar: approximately 3.3 bags (70lb) per 100 blocks
  const mortarBags70 = Math.ceil((totalBlocks / 100) * 3.3);
  const mortarBags80 = Math.ceil((totalBlocks / 100) * 2.9);

  // Core fill grout: Each 8" CMU has two cores (~0.125 cu ft each = 0.25 cu ft per block)
  // If coreFillIntervalInches is 32", 1 out of 2 blocks has reinforced grouted cores (50% filled)
  let fillFraction = 0.5;
  if (coreFillIntervalInches <= 16) fillFraction = 1.0; // fully grouted
  else if (coreFillIntervalInches <= 24) fillFraction = 0.67;
  else if (coreFillIntervalInches <= 48) fillFraction = 0.33;

  const groutedBlocks = totalBlocks * fillFraction;
  const groutCuFt = groutedBlocks * 0.25;
  const groutCuYards = Math.round((groutCuFt / 27) * 1.10 * 100) / 100;

  // Vertical rebar every interval
  const rebarRuns = Math.ceil((l * 12) / (coreFillIntervalInches || 32)) + 1;
  const totalVerticalRebarFeet = rebarRuns * h * 1.15; // 15% lap & footing dowels
  const rebarSticks = Math.ceil(totalVerticalRebarFeet / 20);

  return {
    wallLengthFeet: l,
    wallHeightFeet: h,
    wallSquareFeet: Math.round(sqFt * 10) / 10,
    totalBlocks,
    mortarBags70lb: mortarBags70,
    mortarBags80lb: mortarBags80,
    groutCubicYards: groutCuYards,
    rebarVertical20ftSticks: rebarSticks,
  };
}

// 4. Sakrete Calculator (Bagged concrete & mortar coverage)
export interface SakreteResult {
  volumeCubicFeet: number;
  volumeCubicYards: number;
  recommendedBagSize: string;
  bagsNeeded: number;
  waterQuartsPerBag: number;
  totalWaterGallons: number;
  compressiveStrengthPsi: number;
}

export function calculateSakrete(
  lengthFeet: number,
  widthFeet: number,
  thicknessInches: number,
  bagWeight: 40 | 50 | 60 | 80 = 80,
  mixType: 'concrete' | 'sand_mix' | 'mortar' | '5000_plus' = 'concrete'
): SakreteResult {
  const l = Math.max(0, isNaN(lengthFeet) ? 0 : lengthFeet);
  const w = Math.max(0, isNaN(widthFeet) ? 0 : widthFeet);
  const t = Math.max(0, isNaN(thicknessInches) ? 0 : thicknessInches);

  const cuFt = l * w * (t / 12) * 1.10; // 10% waste
  const cuYds = cuFt / 27;

  // Yield per bag:
  let yieldPerBag = 0.60;
  let waterQuarts = 3.5;
  let psi = 4000;

  if (bagWeight === 80) yieldPerBag = 0.60;
  else if (bagWeight === 60) yieldPerBag = 0.45;
  else if (bagWeight === 50) yieldPerBag = 0.375;
  else if (bagWeight === 40) yieldPerBag = 0.30;

  if (mixType === '5000_plus') {
    psi = 5000;
  } else if (mixType === 'mortar') {
    psi = 1800;
    waterQuarts = 4.0;
  } else if (mixType === 'sand_mix') {
    psi = 5000;
  }

  const bagsNeeded = Math.ceil(cuFt / yieldPerBag);
  const totalWaterGallons = Math.round(((bagsNeeded * waterQuarts) / 4) * 10) / 10;

  return {
    volumeCubicFeet: Math.round(cuFt * 100) / 100,
    volumeCubicYards: Math.round(cuYds * 100) / 100,
    recommendedBagSize: `${bagWeight} lb Sakrete ${mixType.replace('_', ' ').toUpperCase()}`,
    bagsNeeded,
    waterQuartsPerBag: waterQuarts,
    totalWaterGallons,
    compressiveStrengthPsi: psi,
  };
}

// 5. Quikrete Calculator & Quikrete Concrete Calculator
export interface QuikreteResult {
  cubicFeet: number;
  cubicYards: number;
  applicationType: 'slab' | 'post_hole' | 'footing';
  standardBags80lb: number;
  standardBags60lb: number;
  standardBags50lb: number;
  fastSettingBags50lb: number; // Red bag Fast-Setting (sets in 20-40 mins)
  waterGallonsTotal: number;
}

export function calculateQuikrete(
  lengthFeet: number,
  widthFeet: number,
  thicknessInches: number,
  applicationType: 'slab' | 'post_hole' | 'footing' = 'slab'
): QuikreteResult {
  const l = Math.max(0, isNaN(lengthFeet) ? 0 : lengthFeet);
  const w = Math.max(0, isNaN(widthFeet) ? 0 : widthFeet);
  const t = Math.max(0, isNaN(thicknessInches) ? 0 : thicknessInches);

  let cuFt = 0;
  if (applicationType === 'post_hole') {
    // Length is hole diameter in inches, width is post diameter in inches, thickness is depth in inches
    const holeRadiusFt = (l / 2) / 12;
    const postRadiusFt = (w / 2) / 12;
    const depthFt = t / 12;
    const holeVol = Math.PI * Math.pow(holeRadiusFt, 2) * depthFt;
    const postVol = Math.PI * Math.pow(postRadiusFt, 2) * depthFt;
    cuFt = Math.max(0, holeVol - postVol);
  } else {
    cuFt = l * w * (t / 12);
  }

  // 10% contingency
  const totalCuFt = cuFt * 1.10;
  const cuYds = totalCuFt / 27;

  const bags80 = Math.ceil(totalCuFt / 0.60);
  const bags60 = Math.ceil(totalCuFt / 0.45);
  const bags50 = Math.ceil(totalCuFt / 0.375);
  const fastSetting50 = Math.ceil(totalCuFt / 0.375);
  const waterGallons = Math.round((bags80 * 0.75) * 10) / 10; // ~3 qts per 80lb bag

  return {
    cubicFeet: Math.round(totalCuFt * 100) / 100,
    cubicYards: Math.round(cuYds * 100) / 100,
    applicationType,
    standardBags80lb: bags80,
    standardBags60lb: bags60,
    standardBags50lb: bags50,
    fastSettingBags50lb: fastSetting50,
    waterGallonsTotal: waterGallons,
  };
}

// 6. Gravel & Stone Calculator
export interface GravelStoneResult {
  squareFeet: number;
  depthInches: number;
  cubicYards: number;
  cubicFeet: number;
  tons: number;
  metricTonnes: number;
  standard50lbBags: number;
  truckloads15Ton: number;
}

export function calculateGravelStone(
  lengthFeet: number,
  widthFeet: number,
  depthInches: number,
  materialType: 'pea_gravel' | 'crushed_stone' | 'river_rock' | 'dense_grade' = 'crushed_stone'
): GravelStoneResult {
  const l = Math.max(0, isNaN(lengthFeet) ? 0 : lengthFeet);
  const w = Math.max(0, isNaN(widthFeet) ? 0 : widthFeet);
  const d = Math.max(0, isNaN(depthInches) ? 0 : depthInches);

  const sqFt = l * w;
  const cuFt = sqFt * (d / 12);
  // Add 10% compaction & grade variance
  const totalCuYards = (cuFt / 27) * 1.10;

  // Material densities (tons per cu yard):
  // Pea gravel: ~1.4 tons/yd3
  // #57 Crushed Stone: ~1.45 tons/yd3
  // River Rock: ~1.35 tons/yd3
  // Dense Grade Aggregate (DGA / Road Base): ~1.55 tons/yd3
  let tonsPerYd = 1.45;
  if (materialType === 'pea_gravel') tonsPerYd = 1.40;
  else if (materialType === 'river_rock') tonsPerYd = 1.35;
  else if (materialType === 'dense_grade') tonsPerYd = 1.55;

  const tons = Math.round(totalCuYards * tonsPerYd * 100) / 100;
  const tonnes = Math.round(tons * 0.907185 * 100) / 100;
  const bags50 = Math.ceil((tons * 2000) / 50);
  const truckloads = Math.ceil((tons / 15) * 10) / 10;

  return {
    squareFeet: Math.round(sqFt * 10) / 10,
    depthInches: d,
    cubicYards: Math.round(totalCuYards * 100) / 100,
    cubicFeet: Math.round(cuFt * 100) / 100,
    tons,
    metricTonnes: tonnes,
    standard50lbBags: bags50,
    truckloads15Ton: truckloads,
  };
}

// 7. Asphalt Suite
export interface AsphaltResult {
  squareFeet: number;
  squareYards: number;
  compactedDepthInches: number;
  cubicYards: number;
  tons: number;
  metricTonnes: number;
  triaxleTruckloads20Ton: number;
  specSummary: string;
}

export function calculateAsphalt(
  lengthFeet: number,
  widthFeet: number,
  compactedDepthInches: number = 2.5,
  asphaltType: 'standard_hma' | 'american' | 'crushed_rap' | 'vulcan' | 'recycled' = 'standard_hma'
): AsphaltResult {
  const l = Math.max(0, isNaN(lengthFeet) ? 0 : lengthFeet);
  const w = Math.max(0, isNaN(widthFeet) ? 0 : widthFeet);
  const depth = Math.max(0, isNaN(compactedDepthInches) ? 2.5 : compactedDepthInches);

  const sqFt = l * w;
  const sqYds = sqFt / 9;
  const cuYds = (sqFt * (depth / 12)) / 27;

  // Compacted asphalt weight:
  // Standard Hot Mix Asphalt (HMA): ~112 lbs per sq yard per inch of thickness (145 lbs/cu ft = 2.0 tons/yd3)
  // American Asphalt mix: ~110-115 lbs/sq yd/in
  // Crushed Asphalt / RAP millings: compacted ~100-105 lbs/sq yd/in (1.85 tons/yd3)
  // Vulcan materials binder/surface: ~113 lbs/sq yd/in
  // Recycled RAP base: ~102 lbs/sq yd/in
  let lbsPerSqYdPerInch = 112;
  let spec = 'Standard Hot Mix Asphalt (HMA) Surface Course';

  if (asphaltType === 'american') {
    lbsPerSqYdPerInch = 114;
    spec = 'American Asphalt Premium Commercial/Residential Paving Mix';
  } else if (asphaltType === 'crushed_rap') {
    lbsPerSqYdPerInch = 104;
    spec = 'Crushed Asphalt Millings (RAP - Reclaimed Asphalt Pavement)';
  } else if (asphaltType === 'vulcan') {
    lbsPerSqYdPerInch = 113;
    spec = 'Vulcan Materials High-Performance Hot-Mix Asphalt Specification';
  } else if (asphaltType === 'recycled') {
    lbsPerSqYdPerInch = 102;
    spec = 'Recycled Asphalt Base / Subbase Aggregate Mix';
  }

  // Total weight with 5% job site compaction / grade variance
  const totalLbs = sqYds * depth * lbsPerSqYdPerInch * 1.05;
  const tons = Math.round((totalLbs / 2000) * 100) / 100;
  const tonnes = Math.round(tons * 0.907185 * 100) / 100;
  const truckloads = Math.ceil((tons / 20) * 10) / 10;

  return {
    squareFeet: Math.round(sqFt * 10) / 10,
    squareYards: Math.round(sqYds * 10) / 10,
    compactedDepthInches: depth,
    cubicYards: Math.round(cuYds * 100) / 100,
    tons,
    metricTonnes: tonnes,
    triaxleTruckloads20Ton: truckloads,
    specSummary: spec,
  };
}

// 8. Universal Material Bulk Estimator
export interface MaterialCalculatorResult {
  squareFeet: number;
  depthInches: number;
  cubicFeet: number;
  cubicYards: number;
  tons: number;
  bagsNeeded: number;
  materialName: string;
  densityLbsPerCuYd: number;
}

export function calculateMaterialBulk(
  lengthFeet: number,
  widthFeet: number,
  depthInches: number,
  material: 'concrete' | 'gravel' | 'asphalt' | 'mulch' | 'topsoil' | 'sand'
): MaterialCalculatorResult {
  const l = Math.max(0, isNaN(lengthFeet) ? 0 : lengthFeet);
  const w = Math.max(0, isNaN(widthFeet) ? 0 : widthFeet);
  const d = Math.max(0, isNaN(depthInches) ? 0 : depthInches);

  const sqFt = l * w;
  const cuFt = sqFt * (d / 12);
  const cuYds = Math.round((cuFt / 27) * 1.10 * 100) / 100; // 10% contingency

  const densities: Record<string, { name: string; lbsPerYd: number; bagSizeLbs: number }> = {
    concrete: { name: 'Pre-Mix Concrete', lbsPerYd: 4000, bagSizeLbs: 80 },
    gravel: { name: 'Crushed Stone & Gravel', lbsPerYd: 2800, bagSizeLbs: 50 },
    asphalt: { name: 'Hot Mix Asphalt', lbsPerYd: 3950, bagSizeLbs: 50 },
    mulch: { name: 'Landscape Bark Mulch', lbsPerYd: 700, bagSizeLbs: 40 }, // 2 cu ft bag
    topsoil: { name: 'Screened Topsoil', lbsPerYd: 2200, bagSizeLbs: 40 },
    sand: { name: 'Masonry / Play Sand', lbsPerYd: 2700, bagSizeLbs: 50 },
  };

  const info = densities[material] || densities.gravel;
  const totalLbs = cuYds * info.lbsPerYd;
  const tons = Math.round((totalLbs / 2000) * 100) / 100;

  let bags = 0;
  if (material === 'mulch') {
    // 2 cu ft bags of mulch
    bags = Math.ceil(cuFt / 2);
  } else {
    bags = Math.ceil(totalLbs / info.bagSizeLbs);
  }

  return {
    squareFeet: Math.round(sqFt * 10) / 10,
    depthInches: d,
    cubicFeet: Math.round(cuFt * 100) / 100,
    cubicYards: cuYds,
    tons,
    bagsNeeded: bags,
    materialName: info.name,
    densityLbsPerCuYd: info.lbsPerYd,
  };
}
