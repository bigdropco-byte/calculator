/**
 * Logistics & LTL Freight Density Calculation Engine
 * Covers freight PCF (pounds per cubic foot), standard NMFC freight classification,
 * trailer linear feet utilization, and carrier models (BlueGrace, Saia, XPO, general LTL).
 */

export interface FreightClassMatch {
  pcfRange: string;
  nmfcClass: number;
  description: string;
}

export const NMFC_CLASS_TABLE: FreightClassMatch[] = [
  { pcfRange: 'Less than 1', nmfcClass: 500, description: 'Very low density (bags of gold dust, ping pong balls, taxidermy)' },
  { pcfRange: '1 to 2', nmfcClass: 400, description: 'Extremely light (deer antlers, light fixtures, kayaks)' },
  { pcfRange: '2 to 4', nmfcClass: 300, description: 'Model aircraft, assembled furniture, hollow plastic items' },
  { pcfRange: '4 to 6', nmfcClass: 250, description: 'Bamboo furniture, plasma screens, mattresses' },
  { pcfRange: '6 to 8', nmfcClass: 175, description: 'Clothing, retail displays, padded furniture' },
  { pcfRange: '8 to 10', nmfcClass: 125, description: 'Small appliances, computer equipment, wine cases' },
  { pcfRange: '10 to 12', nmfcClass: 100, description: 'Boat covers, car parts, vacuum cleaners, bulk paper' },
  { pcfRange: '12 to 15', nmfcClass: 85, description: 'Crated machinery, transmissions, engine components' },
  { pcfRange: '15 to 22.5', nmfcClass: 70, description: 'Automobile engines, packaged paper goods, food supplies' },
  { pcfRange: '22.5 to 30', nmfcClass: 65, description: 'Dense machinery, bottled beverages, ceramics' },
  { pcfRange: '30 to 35', nmfcClass: 60, description: 'Car batteries, chemical drums, dense hardware' },
  { pcfRange: '35 to 50', nmfcClass: 55, description: 'Bricks, mortar, steel bolts, iron castings' },
  { pcfRange: 'Over 50', nmfcClass: 50, description: 'Highest density freight (clean steel sheets, cast iron bars, lead)' },
];

export function getNmfcClass(pcf: number): FreightClassMatch {
  if (pcf < 1) return NMFC_CLASS_TABLE[0];
  if (pcf < 2) return NMFC_CLASS_TABLE[1];
  if (pcf < 4) return NMFC_CLASS_TABLE[2];
  if (pcf < 6) return NMFC_CLASS_TABLE[3];
  if (pcf < 8) return NMFC_CLASS_TABLE[4];
  if (pcf < 10) return NMFC_CLASS_TABLE[5];
  if (pcf < 12) return NMFC_CLASS_TABLE[6];
  if (pcf < 15) return NMFC_CLASS_TABLE[7];
  if (pcf < 22.5) return NMFC_CLASS_TABLE[8];
  if (pcf < 30) return NMFC_CLASS_TABLE[9];
  if (pcf < 35) return NMFC_CLASS_TABLE[10];
  if (pcf < 50) return NMFC_CLASS_TABLE[11];
  return NMFC_CLASS_TABLE[12];
}

export interface FreightDensityResult {
  totalCubicFeet: number;
  totalWeightLbs: number;
  densityPcf: number;
  nmfcClass: number;
  classDescription: string;
  cubicYards: number;
  linearFeetTrailer: number;
  cubicCapacityRuleTriggered: boolean;
  carrierNote: string;
}

export function calculateFreightDensity(options: {
  lengthInches: number;
  widthInches: number;
  heightInches: number;
  weightLbsPerUnit: number;
  quantity?: number; // pallet count or carton count
  isStackable?: boolean;
  carrier?: 'generic' | 'bluegrace' | 'saia' | 'xpo';
}): FreightDensityResult {
  const l = Math.max(1, options.lengthInches);
  const w = Math.max(1, options.widthInches);
  const hRaw = Math.max(1, options.heightInches);
  const qty = Math.max(1, options.quantity || 1);
  const unitWeight = Math.max(0.1, options.weightLbsPerUnit);
  const carrier = options.carrier || 'generic';
  const stackable = options.isStackable ?? true;

  // If non-stackable, carriers (Saia, XPO, BlueGrace) often bump height to trailer height (96") for cube minimums
  const hEffective = stackable ? hRaw : Math.max(hRaw, 84);

  // Total cubic feet: (L * W * H / 1728) * Quantity
  const cubicFeetPerUnit = (l * w * hEffective) / 1728;
  const totalCubicFeet = cubicFeetPerUnit * qty;
  const totalWeightLbs = unitWeight * qty;

  const densityPcf = totalCubicFeet > 0 ? totalWeightLbs / totalCubicFeet : 0;
  const match = getNmfcClass(densityPcf);

  // Standard 53ft trailer is 102" wide (usable 96-98") and 53ft long
  // 2 standard 48x40 pallets fit side by side.
  // Linear feet occupied:
  const palletsPerRow = Math.floor(96 / w) || 1;
  const rows = Math.ceil(qty / palletsPerRow);
  const linearFeet = (rows * l) / 12;

  // Cubic capacity rules: Saia and XPO trigger cubic capacity / capacity surcharge when:
  // Volume >= 750 cubic feet and density < 6 PCF (or 3-4 linear spots)
  const isCubicRule = totalCubicFeet >= 750 && densityPcf < 6;

  let carrierNote = 'Standard NMFC density-based rating applies.';
  if (carrier === 'bluegrace') {
    carrierNote = isCubicRule
      ? 'BlueGrace Alert: Exceeds 750 cu ft with sub-6 PCF density. Carrier Capacity Surcharge (extreme density rule) may apply.'
      : 'BlueGrace Preferred: Density matches standard Class ' + match.nmfcClass + ' tariff tier.';
  } else if (carrier === 'saia') {
    carrierNote = isCubicRule
      ? 'Saia Cubic Capacity and Density (CCD) rule applies (Item 111-13). Minimum rating will be adjusted to Class 150/175.'
      : 'Saia Standard: Complies with standard density tier Class ' + match.nmfcClass + '.';
  } else if (carrier === 'xpo') {
    carrierNote = isCubicRule
      ? 'XPO Capacity Load Rule (Item 390) applies due to high volume (>750 cu ft) and low density (<6 PCF).'
      : 'XPO Direct: Rated at Class ' + match.nmfcClass + ' based on actual pallet dimensions.';
  }

  return {
    totalCubicFeet: Number(totalCubicFeet.toFixed(1)),
    totalWeightLbs: Math.round(totalWeightLbs),
    densityPcf: Number(densityPcf.toFixed(2)),
    nmfcClass: match.nmfcClass,
    classDescription: match.description,
    cubicYards: Number((totalCubicFeet / 27).toFixed(2)),
    linearFeetTrailer: Number(linearFeet.toFixed(1)),
    cubicCapacityRuleTriggered: isCubicRule,
    carrierNote,
  };
}
