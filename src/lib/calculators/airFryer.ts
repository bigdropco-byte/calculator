export type TempUnit = 'F' | 'C';
export type CrispinessPreference = 'tender' | 'normal' | 'crispy';
export type FoodCategory = 'poultry' | 'meat' | 'seafood' | 'veggies' | 'snacks';

export interface AirFryerConversionInput {
  ovenTemp: number;
  ovenTimeMinutes: number;
  unit?: TempUnit;
  crispiness?: CrispinessPreference;
  isFrozen?: boolean;
}

export interface AirFryerConversionResult {
  airFryerTemp: number;
  airFryerTempAlternateUnit: number;
  unit: TempUnit;
  tempReduction: number;
  targetTimeMinutes: number;
  minTimeMinutes: number;
  maxTimeMinutes: number;
  timeSavedMinutes: number;
  percentTimeSaved: number;
  shakeCheckpointMinutes: number;
  estimatedEnergySavedPercent: number;
  tip: string;
}

export interface AirFryerFoodPreset {
  id: string;
  name: string;
  category: FoodCategory;
  tempF: number;
  tempC: number;
  minTime: number;
  maxTime: number;
  targetTime: number;
  flipCheckpointTime: number;
  internalTempF?: number;
  internalTempC?: number;
  notes: string;
}

export function fahrenheitToCelsius(f: number): number {
  return Math.round(((f - 32) * 5) / 9);
}

export function celsiusToFahrenheit(c: number): number {
  return Math.round((c * 9) / 5 + 32);
}

/**
 * Standard Oven-to-Air Fryer 20/20 & 25/25 Rule of Thumb:
 * - Reduce temperature by 25°F (approx 15°C) to account for rapid convection airflow.
 * - Reduce cooking time by 20% to 25% (multiply by 0.75 - 0.80).
 * - Clamped to standard air fryer operating ranges (160°F–450°F / 70°C–230°C).
 */
export function convertOvenToAirFryer({
  ovenTemp,
  ovenTimeMinutes,
  unit = 'F',
  crispiness = 'normal',
  isFrozen = false,
}: AirFryerConversionInput): AirFryerConversionResult {
  const safeOvenTime = Math.max(1, Math.min(300, Number(ovenTimeMinutes) || 1));

  let airFryerTemp: number;
  let tempReduction: number;
  let alternateTemp: number;

  if (unit === 'F') {
    const safeOvenTemp = Math.max(180, Math.min(500, Number(ovenTemp) || 400));
    tempReduction = 25;
    // Round to nearest 5 degrees standard for air fryers
    airFryerTemp = Math.round((safeOvenTemp - tempReduction) / 5) * 5;
    airFryerTemp = Math.max(160, Math.min(450, airFryerTemp));
    alternateTemp = fahrenheitToCelsius(airFryerTemp);
  } else {
    const safeOvenTemp = Math.max(80, Math.min(260, Number(ovenTemp) || 200));
    tempReduction = 15;
    // Round to nearest 5 degrees standard for Celsius air fryers
    airFryerTemp = Math.round((safeOvenTemp - tempReduction) / 5) * 5;
    airFryerTemp = Math.max(70, Math.min(230, airFryerTemp));
    alternateTemp = celsiusToFahrenheit(airFryerTemp);
  }

  // Time reduction factors
  // Standard: 20% reduction (multiplier 0.80)
  // Min time: 25% reduction (multiplier 0.75)
  // Max time: 15% reduction (multiplier 0.85)
  let baseMultiplier = 0.80;
  let minMultiplier = 0.75;
  let maxMultiplier = 0.85;

  if (crispiness === 'crispy') {
    baseMultiplier += 0.05;
    minMultiplier += 0.05;
    maxMultiplier += 0.05;
  } else if (crispiness === 'tender') {
    baseMultiplier -= 0.05;
    minMultiplier -= 0.05;
    maxMultiplier -= 0.05;
  }

  if (isFrozen) {
    // Frozen items take ~15-20% longer than thawed in air fryer
    baseMultiplier += 0.15;
    minMultiplier += 0.15;
    maxMultiplier += 0.15;
  }

  const targetTimeMinutes = Math.max(1, Math.round(safeOvenTime * baseMultiplier));
  const minTimeMinutes = Math.max(1, Math.round(safeOvenTime * minMultiplier));
  const maxTimeMinutes = Math.max(minTimeMinutes, Math.round(safeOvenTime * maxMultiplier));

  const timeSavedMinutes = Math.max(0, safeOvenTime - targetTimeMinutes);
  const percentTimeSaved = Math.round((timeSavedMinutes / safeOvenTime) * 100);

  // Checkpoint to shake basket or flip food
  const shakeCheckpointMinutes = Math.max(1, Math.round(targetTimeMinutes / 2));

  // Energy savings calculation: 1,500W air fryer vs 3,500W oven with no 15m preheat
  const estimatedEnergySavedPercent = Math.min(80, Math.max(45, Math.round(55 + (timeSavedMinutes / safeOvenTime) * 20)));

  let tip = 'Flip or shake the basket halfway through cooking for maximum crispiness and uniform heat distribution.';
  if (isFrozen) {
    tip = 'For frozen foods, do not overcrowd the basket to prevent steaming; mist lightly with oil for crisp texture.';
  } else if (crispiness === 'crispy') {
    tip = 'For extra crunch, spray lightly with high-smoke-point oil (avocado or canola) 2 minutes before cooking finishes.';
  }

  return {
    airFryerTemp,
    airFryerTempAlternateUnit: alternateTemp,
    unit,
    tempReduction,
    targetTimeMinutes,
    minTimeMinutes,
    maxTimeMinutes,
    timeSavedMinutes,
    percentTimeSaved,
    shakeCheckpointMinutes,
    estimatedEnergySavedPercent,
    tip,
  };
}

export const AIR_FRYER_PRESETS: AirFryerFoodPreset[] = [
  // Poultry
  {
    id: 'chicken-breast',
    name: 'Boneless Chicken Breast (6-8 oz)',
    category: 'poultry',
    tempF: 375,
    tempC: 190,
    minTime: 12,
    maxTime: 16,
    targetTime: 14,
    flipCheckpointTime: 7,
    internalTempF: 165,
    internalTempC: 74,
    notes: 'Pound to uniform thickness for even juiciness; flip at 7 minutes.',
  },
  {
    id: 'chicken-wings',
    name: 'Crispy Chicken Wings (1 lb)',
    category: 'poultry',
    tempF: 400,
    tempC: 205,
    minTime: 20,
    maxTime: 25,
    targetTime: 22,
    flipCheckpointTime: 11,
    internalTempF: 165,
    internalTempC: 74,
    notes: 'Pat completely dry with paper towels; shake basket every 6-7 minutes.',
  },
  {
    id: 'chicken-thighs',
    name: 'Bone-in Chicken Thighs',
    category: 'poultry',
    tempF: 380,
    tempC: 195,
    minTime: 20,
    maxTime: 24,
    targetTime: 22,
    flipCheckpointTime: 11,
    internalTempF: 165,
    internalTempC: 74,
    notes: 'Start skin-side down, flip skin-side up for the final 10 minutes to crisp.',
  },
  {
    id: 'chicken-tenders',
    name: 'Breaded Chicken Tenders / Strips',
    category: 'poultry',
    tempF: 390,
    tempC: 200,
    minTime: 10,
    maxTime: 13,
    targetTime: 12,
    flipCheckpointTime: 6,
    internalTempF: 165,
    internalTempC: 74,
    notes: 'Flip once halfway. If frozen, add 3 additional minutes.',
  },
  {
    id: 'whole-chicken',
    name: 'Whole Roast Chicken (3-4 lbs)',
    category: 'poultry',
    tempF: 360,
    tempC: 180,
    minTime: 50,
    maxTime: 60,
    targetTime: 55,
    flipCheckpointTime: 30,
    internalTempF: 165,
    internalTempC: 74,
    notes: 'Cook breast-side down for 30 min, flip breast-side up for remaining 25 min.',
  },

  // Meat & Pork
  {
    id: 'steak-ribeye',
    name: 'Steak (1-inch Ribeye / NY Strip)',
    category: 'meat',
    tempF: 400,
    tempC: 205,
    minTime: 9,
    maxTime: 12,
    targetTime: 10,
    flipCheckpointTime: 5,
    internalTempF: 135,
    internalTempC: 57,
    notes: 'Bring steak to room temp for 20m before cooking; rest 5m after cooking.',
  },
  {
    id: 'pork-chops',
    name: 'Pork Chops (1-inch Thick)',
    category: 'meat',
    tempF: 380,
    tempC: 195,
    minTime: 12,
    maxTime: 15,
    targetTime: 14,
    flipCheckpointTime: 7,
    internalTempF: 145,
    internalTempC: 63,
    notes: 'Lightly rub with olive oil and spices; rest 3 minutes before slicing.',
  },
  {
    id: 'bacon',
    name: 'Bacon (Thick Cut, 4-6 slices)',
    category: 'meat',
    tempF: 360,
    tempC: 180,
    minTime: 8,
    maxTime: 11,
    targetTime: 10,
    flipCheckpointTime: 5,
    notes: 'Lay flat in single layer. Pour a tablespoon of water into drawer to reduce smoke.',
  },
  {
    id: 'beef-burgers',
    name: 'Beef Burger Patties (1/3 lb)',
    category: 'meat',
    tempF: 380,
    tempC: 195,
    minTime: 10,
    maxTime: 12,
    targetTime: 11,
    flipCheckpointTime: 6,
    internalTempF: 160,
    internalTempC: 71,
    notes: 'Add cheese during the final 1 minute of cooking with the air fryer off.',
  },
  {
    id: 'meatballs',
    name: 'Meatballs (Homemade or Frozen)',
    category: 'meat',
    tempF: 380,
    tempC: 195,
    minTime: 10,
    maxTime: 12,
    targetTime: 11,
    flipCheckpointTime: 6,
    internalTempF: 165,
    internalTempC: 74,
    notes: 'Shake the basket halfway through to keep meatballs spherical.',
  },

  // Seafood
  {
    id: 'salmon-fillet',
    name: 'Salmon Fillet (6 oz)',
    category: 'seafood',
    tempF: 390,
    tempC: 200,
    minTime: 7,
    maxTime: 10,
    targetTime: 8,
    flipCheckpointTime: 5,
    internalTempF: 145,
    internalTempC: 63,
    notes: 'Place skin-side down; no need to flip delicate fillets. Flakes easily with a fork.',
  },
  {
    id: 'shrimp',
    name: 'Jumbo Shrimp (Peeled & Deveined)',
    category: 'seafood',
    tempF: 380,
    tempC: 195,
    minTime: 5,
    maxTime: 8,
    targetTime: 6,
    flipCheckpointTime: 3,
    internalTempF: 145,
    internalTempC: 63,
    notes: 'Cooks very quickly; shake basket at 3 minutes to avoid rubbery texture.',
  },
  {
    id: 'white-fish',
    name: 'White Fish (Cod / Haddock / Tilapia)',
    category: 'seafood',
    tempF: 380,
    tempC: 195,
    minTime: 8,
    maxTime: 11,
    targetTime: 10,
    flipCheckpointTime: 5,
    internalTempF: 145,
    internalTempC: 63,
    notes: 'Use a perforated parchment liner to prevent delicate fish from sticking.',
  },

  // Vegetables & Potatoes
  {
    id: 'french-fries-fresh',
    name: 'Fresh Hand-Cut French Fries',
    category: 'veggies',
    tempF: 380,
    tempC: 195,
    minTime: 16,
    maxTime: 20,
    targetTime: 18,
    flipCheckpointTime: 9,
    notes: 'Soak cut potatoes in cold water 20m, pat completely dry, toss with 1 tsp oil.',
  },
  {
    id: 'french-fries-frozen',
    name: 'Frozen French Fries',
    category: 'veggies',
    tempF: 400,
    tempC: 205,
    minTime: 12,
    maxTime: 16,
    targetTime: 14,
    flipCheckpointTime: 7,
    notes: 'Cook directly from frozen. Shake basket vigorously every 5 minutes.',
  },
  {
    id: 'baked-potato',
    name: 'Baked Russet Potato (Medium)',
    category: 'veggies',
    tempF: 400,
    tempC: 205,
    minTime: 35,
    maxTime: 45,
    targetTime: 40,
    flipCheckpointTime: 20,
    internalTempF: 205,
    internalTempC: 96,
    notes: 'Poke with fork 6 times, rub skin with oil and coarse salt; flip at 20 minutes.',
  },
  {
    id: 'roasted-broccoli',
    name: 'Roasted Broccoli Florets',
    category: 'veggies',
    tempF: 375,
    tempC: 190,
    minTime: 7,
    maxTime: 10,
    targetTime: 8,
    flipCheckpointTime: 4,
    notes: 'Toss with 1 tbsp olive oil, garlic, and salt; shake halfway for charred tips.',
  },
  {
    id: 'brussels-sprouts',
    name: 'Brussels Sprouts (Halved)',
    category: 'veggies',
    tempF: 375,
    tempC: 190,
    minTime: 12,
    maxTime: 15,
    targetTime: 14,
    flipCheckpointTime: 7,
    notes: 'Place cut-side down initially; crispy caramelized outer leaves are delicious.',
  },
  {
    id: 'asparagus',
    name: 'Asparagus Spears',
    category: 'veggies',
    tempF: 390,
    tempC: 200,
    minTime: 6,
    maxTime: 8,
    targetTime: 7,
    flipCheckpointTime: 4,
    notes: 'Trim woody ends, spray lightly with oil and lemon zest.',
  },

  // Snacks & Baking
  {
    id: 'pizza-reheat',
    name: 'Reheating Pizza Slices',
    category: 'snacks',
    tempF: 350,
    tempC: 175,
    minTime: 3,
    maxTime: 5,
    targetTime: 4,
    flipCheckpointTime: 2,
    notes: 'Restores crispy crust and gooey cheese far better than a soggy microwave.',
  },
  {
    id: 'mozzarella-sticks',
    name: 'Frozen Mozzarella Sticks',
    category: 'snacks',
    tempF: 380,
    tempC: 195,
    minTime: 6,
    maxTime: 8,
    targetTime: 7,
    flipCheckpointTime: 4,
    notes: 'Do not overcook or cheese will burst through breading; watch after 5 mins.',
  },
  {
    id: 'cookies',
    name: 'Chocolate Chip Cookies (Chilled Dough)',
    category: 'snacks',
    tempF: 320,
    tempC: 160,
    minTime: 7,
    maxTime: 9,
    targetTime: 8,
    flipCheckpointTime: 5,
    notes: 'Line basket with air fryer parchment paper; cookies will set as they cool.',
  },
];

export const QUICK_CONVERSION_CHART = [
  { ovenF: '300°F (150°C)', airFryerF: '275°F (135°C)', ovenTime: '30 min', airFryerTime: '24 min' },
  { ovenF: '325°F (165°C)', airFryerF: '300°F (150°C)', ovenTime: '30 min', airFryerTime: '24 min' },
  { ovenF: '350°F (175°C)', airFryerF: '325°F (160°C)', ovenTime: '25 min', airFryerTime: '20 min' },
  { ovenF: '375°F (190°C)', airFryerF: '350°F (175°C)', ovenTime: '25 min', airFryerTime: '20 min' },
  { ovenF: '400°F (205°C)', airFryerF: '375°F (190°C)', ovenTime: '20 min', airFryerTime: '16 min' },
  { ovenF: '425°F (220°C)', airFryerF: '400°F (205°C)', ovenTime: '20 min', airFryerTime: '15 min' },
  { ovenF: '450°F (230°C)', airFryerF: '425°F (220°C)', ovenTime: '15 min', airFryerTime: '12 min' },
];
