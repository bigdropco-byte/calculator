/**
 * Pure Calculation Engine: Wood, Lumber, Decking & Firewood
 * Covers:
 * - Wood Calculator (Board Foot, linear feet, total cost)
 * - Framing Wood Calculator (wall studs, plates, headers, 16" vs 24" OC)
 * - Trestle Wood Calculator (timber trestle bents, bridge timbers)
 * - Weight of Wood Calculator (species density, green vs kiln dried)
 * - Deck Wood Calculator (deck boards, joists, screws, square footage)
 * - Cord Wood Calculator & Cord of Wood Calculator (128 cu ft stack, face cords)
 * - Cabinet Wood Calculator (4x8 plywood sheets, face frame board feet)
 * - Firewood Cord Calculator (weight, BTU heating content)
 * - Loose Cord Wood Calculator (thrown cords ~180 cu ft vs stacked, truck beds)
 * - Shed Wood Calculator (studs, floor joists, rafters, OSB sheathing)
 * - Fence Wood Calculator (posts, rails, pickets, concrete bags)
 * - Firewood Calculator (seasonal cords needed by home sq ft & climate)
 */

// 1. Wood Calculator (Board Feet & Pricing)
export interface WoodResult {
  thicknessInches: number;
  widthInches: number;
  lengthFeet: number;
  quantity: number;
  totalBoardFeet: number;
  totalLinearFeet: number;
  totalCubicFeet: number;
  totalCost: number;
}

export function calculateBoardFeet(
  thicknessInches: number,
  widthInches: number,
  lengthFeet: number,
  quantity: number = 1,
  pricePerBoardFoot: number = 0
): WoodResult {
  const t = Math.max(0, isNaN(thicknessInches) ? 0 : thicknessInches);
  const w = Math.max(0, isNaN(widthInches) ? 0 : widthInches);
  const l = Math.max(0, isNaN(lengthFeet) ? 0 : lengthFeet);
  const qty = Math.max(1, isNaN(quantity) ? 1 : quantity);
  const price = Math.max(0, isNaN(pricePerBoardFoot) ? 0 : pricePerBoardFoot);

  // 1 Board Foot = 1" thick x 12" wide x 12" long (144 cu in = 1/12 cu ft)
  const bfPerPiece = (t * w * l) / 12;
  const totalBf = Math.round(bfPerPiece * qty * 100) / 100;
  const totalLinearFeet = l * qty;
  const totalCuFt = Math.round((totalBf / 12) * 100) / 100;
  const totalCost = Math.round(totalBf * price * 100) / 100;

  return {
    thicknessInches: t,
    widthInches: w,
    lengthFeet: l,
    quantity: qty,
    totalBoardFeet: totalBf,
    totalLinearFeet,
    totalCubicFeet: totalCuFt,
    totalCost,
  };
}

// 2. Framing Wood Calculator
export interface FramingWoodResult {
  wallLengthFeet: number;
  wallHeightFeet: number;
  studSpacingInches: number;
  studsCount: number; // 2x4 or 2x6 studs including corners & intersections
  solePlatesCount: number; // bottom plate 16ft boards
  topPlatesCount: number; // double top plate 16ft boards
  totalPlatesLinearFeet: number;
  headerBoardFeet: number; // for doors/windows
  totalFramingLumberPieces: number;
  wastePercentage: number;
}

export function calculateFramingWood(
  wallLengthFeet: number,
  wallHeightFeet: number = 8,
  studSpacingInches: number = 16,
  doorsCount: number = 1,
  windowsCount: number = 2
): FramingWoodResult {
  const l = Math.max(0, isNaN(wallLengthFeet) ? 0 : wallLengthFeet);
  const h = Math.max(0, isNaN(wallHeightFeet) ? 8 : wallHeightFeet);
  const spacing = studSpacingInches === 24 ? 24 : 16;
  const wastePct = 15; // standard 15% framing cut/cull waste

  // Base field studs
  const baseStuds = Math.ceil((l * 12) / spacing) + 1;
  // Corner posts (3 studs per corner) + partition tee studs (3 per tee)
  const cornerStuds = 4 * 2; // typical 4 corners for a room/structure
  // Openings (king studs + jack/trimmer studs + cripples): ~4 studs per door, ~4 per window
  const openingStuds = (doorsCount * 4) + (windowsCount * 4);

  const totalStuds = Math.ceil((baseStuds + cornerStuds + openingStuds) * (1 + wastePct / 100));

  // Plates: 1 bottom sole plate + 2 double top plates = 3 rows of plates
  const totalPlatesLinear = l * 3;
  // Using 16-ft framing plates
  const plates16ft = Math.ceil(totalPlatesLinear / 16);
  const solePlates = Math.ceil(l / 16);
  const topPlates = Math.ceil((l * 2) / 16);

  // Headers (e.g. 2x10 or 2x12 for 3ft door / 4ft window)
  const headerLinFt = (doorsCount * 3.5 * 2) + (windowsCount * 4.5 * 2);
  const headerBf = Math.round((headerLinFt * 1.5 * 9.25 / 12) * 10) / 10;

  return {
    wallLengthFeet: l,
    wallHeightFeet: h,
    studSpacingInches: spacing,
    studsCount: totalStuds,
    solePlatesCount: solePlates,
    topPlatesCount: topPlates,
    totalPlatesLinearFeet: Math.round(totalPlatesLinear),
    headerBoardFeet: headerBf,
    totalFramingLumberPieces: totalStuds + plates16ft,
    wastePercentage: wastePct,
  };
}

// 3. Trestle Wood Calculator
export interface TrestleWoodResult {
  spanLengthFeet: number;
  trestleHeightFeet: number;
  numberOfBents: number;
  timberPostsCount: number; // 10x10 or 12x12 posts
  capBeamsBoardFeet: number; // 12x12 cap beams
  stringersBoardFeet: number; // 8x16 or 9x18 longitudinal stringers
  crossBracingBoardFeet: number; // 3x10 sway bracing
  totalTrestleBoardFeet: number;
  estimatedDeadLoadWeightLbs: number;
}

export function calculateTrestleWood(
  spanLengthFeet: number,
  trestleHeightFeet: number,
  bentSpacingFeet: number = 14
): TrestleWoodResult {
  const span = Math.max(0, isNaN(spanLengthFeet) ? 0 : spanLengthFeet);
  const height = Math.max(0, isNaN(trestleHeightFeet) ? 0 : trestleHeightFeet);
  const spacing = Math.max(8, isNaN(bentSpacingFeet) ? 14 : bentSpacingFeet);

  const numBents = Math.ceil(span / spacing) + 1;
  // Standard 4-post or 5-post timber bent (4 posts for <20ft height, 6 posts for >20ft)
  const postsPerBent = height > 20 ? 6 : 4;
  const totalPosts = numBents * postsPerBent;

  // Post board feet (12x12 timbers = 12 BF per linear foot)
  const postBf = totalPosts * height * 12;
  // Cap beam (12x12 x 16ft cap per bent) = 16 * 12 BF = 192 BF per bent
  const capBf = numBents * 192;
  // Stringers (4 chords across each span bay, 8x16 timbers = 10.67 BF/ft)
  const numBays = numBents - 1;
  const stringerLinFt = numBays * spacing * 4;
  const stringerBf = stringerLinFt * ((8 * 16) / 12);
  // Cross/sway bracing: 3x10 timbers on each bent face
  const bracingBf = numBents * (Math.sqrt(Math.pow(height, 2) + 256) * 2 * ((3 * 10) / 12));

  const totalBf = Math.round(postBf + capBf + stringerBf + bracingBf);
  // Heavy timber treated douglas fir density ~38 lbs/cu ft = 3.17 lbs per BF
  const deadLoadLbs = Math.round(totalBf * 3.17);

  return {
    spanLengthFeet: span,
    trestleHeightFeet: height,
    numberOfBents: numBents,
    timberPostsCount: totalPosts,
    capBeamsBoardFeet: Math.round(capBf),
    stringersBoardFeet: Math.round(stringerBf),
    crossBracingBoardFeet: Math.round(bracingBf),
    totalTrestleBoardFeet: totalBf,
    estimatedDeadLoadWeightLbs: deadLoadLbs,
  };
}

// 4. Weight of Wood Calculator
export interface WoodWeightResult {
  speciesName: string;
  boardFeet: number;
  cubicFeet: number;
  condition: 'kiln_dried' | 'green';
  densityLbsPerCuFt: number;
  weightLbs: number;
  weightKg: number;
}

export function calculateWoodWeight(
  boardFeet: number,
  species: 'douglas_fir' | 'southern_pine' | 'white_oak' | 'red_oak' | 'hard_maple' | 'walnut' | 'cedar' | 'white_pine' = 'red_oak',
  condition: 'kiln_dried' | 'green' = 'kiln_dried'
): WoodWeightResult {
  const bf = Math.max(0, isNaN(boardFeet) ? 0 : boardFeet);
  const cuFt = bf / 12;

  // Species densities in lbs/cu ft (Kiln Dried ~12% MC vs Green)
  const database: Record<string, { name: string; kd: number; green: number }> = {
    douglas_fir: { name: 'Douglas Fir', kd: 32, green: 40 },
    southern_pine: { name: 'Southern Yellow Pine', kd: 36, green: 55 },
    white_oak: { name: 'White Oak', kd: 47, green: 62 },
    red_oak: { name: 'Red Oak', kd: 44, green: 63 },
    hard_maple: { name: 'Hard Maple (Sugar Maple)', kd: 44, green: 54 },
    walnut: { name: 'Black Walnut', kd: 38, green: 58 },
    cedar: { name: 'Western Red Cedar', kd: 23, green: 28 },
    white_pine: { name: 'Eastern White Pine', kd: 25, green: 36 },
  };

  const item = database[species] || database.red_oak;
  const density = condition === 'green' ? item.green : item.kd;
  const weightLbs = Math.round(cuFt * density * 10) / 10;
  const weightKg = Math.round(weightLbs * 0.453592 * 10) / 10;

  return {
    speciesName: item.name,
    boardFeet: bf,
    cubicFeet: Math.round(cuFt * 100) / 100,
    condition,
    densityLbsPerCuFt: density,
    weightLbs,
    weightKg,
  };
}

// 5. Deck Wood Calculator
export interface DeckWoodResult {
  deckSquareFeet: number;
  deckBoardSize: string;
  numberOfDeckBoards: number; // based on chosen length (e.g. 16ft)
  totalDeckingLinearFeet: number;
  joistsCount: number; // 16" or 12" OC joists
  rimJoistsLinearFeet: number;
  hiddenFastenersOrScrewsCount: number;
  wastePercentage: number;
}

export function calculateDeckWood(
  lengthFeet: number,
  widthFeet: number,
  boardSize: '5_4x6' | '2x6' = '5_4x6',
  boardLengthFeet: number = 16,
  joistSpacingInches: number = 16
): DeckWoodResult {
  const l = Math.max(0, isNaN(lengthFeet) ? 0 : lengthFeet);
  const w = Math.max(0, isNaN(widthFeet) ? 0 : widthFeet);
  const bLen = Math.max(8, isNaN(boardLengthFeet) ? 16 : boardLengthFeet);

  const sqFt = l * w;
  // Actual width: 5.5 inches for both 5/4x6 and 2x6, with 1/8" (0.125") gap = 5.625"
  const boardCoverageFeet = 5.625 / 12;
  const rowsOfBoards = Math.ceil(w / boardCoverageFeet);
  const totalDeckingLinear = Math.ceil(rowsOfBoards * l * 1.10); // 10% cutting waste
  const numberOfBoards = Math.ceil(totalDeckingLinear / bLen);

  // Joists: spaced 16" (1.333 ft) or 12" (1.0 ft) OC
  const joistSpacingFeet = joistSpacingInches === 12 ? 1.0 : 1.3333;
  const joists = Math.ceil(l / joistSpacingFeet) + 1;
  const rimJoists = Math.ceil((l * 2) + (w * 2));

  // Screws: approx 3.5 screws per square foot (2 screws per joist crossing)
  const screwsCount = Math.ceil(sqFt * 3.5);

  return {
    deckSquareFeet: Math.round(sqFt * 10) / 10,
    deckBoardSize: boardSize === '5_4x6' ? '5/4 × 6 Premium Decking (5.5" actual)' : '2 × 6 Framing/Decking (5.5" actual)',
    numberOfDeckBoards: numberOfBoards,
    totalDeckingLinearFeet: totalDeckingLinear,
    joistsCount: joists,
    rimJoistsLinearFeet: rimJoists,
    hiddenFastenersOrScrewsCount: screwsCount,
    wastePercentage: 10,
  };
}

// 6. Cord Wood & Cord of Wood Calculator
export interface CordWoodResult {
  lengthFeet: number;
  heightFeet: number;
  logLengthInches: number; // depth of stack (typically 16" for firewood)
  stackCubicFeet: number;
  fullCords: number; // 1 full cord = 128 cu ft
  faceCordsOrRicks: number; // 1 face cord = 4ft x 8ft x 16" = 42.67 cu ft (1/3 cord)
  approximateWeightLbs: number; // seasoned hardwood ~3,600 lbs/cord
}

export function calculateCordWood(
  lengthFeet: number,
  heightFeet: number,
  logLengthInches: number = 16
): CordWoodResult {
  const l = Math.max(0, isNaN(lengthFeet) ? 0 : lengthFeet);
  const h = Math.max(0, isNaN(heightFeet) ? 0 : heightFeet);
  const depth = Math.max(6, isNaN(logLengthInches) ? 16 : logLengthInches);

  const depthFeet = depth / 12;
  const cuFt = l * h * depthFeet;
  const fullCords = Math.round((cuFt / 128) * 100) / 100;
  // Face cord is typically a 4ft x 8ft pile of 16-inch cuts = 42.67 cu ft
  const faceCords = Math.round((cuFt / 42.6667) * 100) / 100;
  const weightLbs = Math.round(fullCords * 3600);

  return {
    lengthFeet: l,
    heightFeet: h,
    logLengthInches: depth,
    stackCubicFeet: Math.round(cuFt * 10) / 10,
    fullCords,
    faceCordsOrRicks: faceCords,
    approximateWeightLbs: weightLbs,
  };
}

// 7. Cabinet Wood Calculator (Plywood sheet optimization & face frames)
export interface CabinetWoodResult {
  cabinetWidthInches: number;
  cabinetHeightInches: number;
  cabinetDepthInches: number;
  quantity: number;
  sheetGoods4x8PlywoodCount: number; // 3/4" cabinet grade plywood sheets
  faceFrameBoardFeet: number; // 1x2 hardwood stiles & rails
  drawerBoxesMaterialSquareFeet: number;
  edgeBandingLinearFeet: number;
}

export function calculateCabinetWood(
  cabinetWidthInches: number = 36,
  cabinetHeightInches: number = 34.5,
  cabinetDepthInches: number = 24,
  quantity: number = 4
): CabinetWoodResult {
  const w = Math.max(6, isNaN(cabinetWidthInches) ? 36 : cabinetWidthInches);
  const h = Math.max(6, isNaN(cabinetHeightInches) ? 34.5 : cabinetHeightInches);
  const d = Math.max(6, isNaN(cabinetDepthInches) ? 24 : cabinetDepthInches);
  const qty = Math.max(1, isNaN(quantity) ? 1 : quantity);

  // Each carcass has: 2 sides (H x D), 1 bottom (W x D), 1 back (W x H, usually 1/4"), 2 top stretchers (W x 4")
  const sideSqIn = 2 * (h * d);
  const bottomSqIn = w * d;
  const stretcherSqIn = 2 * (w * 4);
  const shelfSqIn = w * (d - 1); // 1 adjustable shelf
  const totalCarcassSqInPerBox = sideSqIn + bottomSqIn + stretcherSqIn + shelfSqIn;
  const totalCarcassSqFt = ((totalCarcassSqInPerBox / 144) * qty) * 1.15; // 15% kerf/cut waste

  // Standard 4ft x 8ft sheet = 32 sq ft
  const sheetsPlywood = Math.ceil(totalCarcassSqFt / 32);

  // Hardwood face frame: 2 stiles (H), 2 rails (W) using 1x2 (actual 0.75" x 1.5")
  const faceFrameLinInches = (2 * h + 2 * w) * qty;
  const faceFrameLinFeet = faceFrameLinInches / 12;
  // 1x2 board feet = (1 * 2 * LinFt) / 12 = 0.1667 BF per linear foot
  const faceFrameBf = Math.round((faceFrameLinFeet * 0.1667 * 1.15) * 10) / 10;

  // Drawer boxes (approx 2 drawers per base cabinet)
  const drawerSqFt = Math.round((qty * 2 * 6.5) * 10) / 10;
  // Edge banding: front edges of exposed plywood
  const edgeBandingLinFt = Math.round((faceFrameLinFeet * 1.10) * 10) / 10;

  return {
    cabinetWidthInches: w,
    cabinetHeightInches: h,
    cabinetDepthInches: d,
    quantity: qty,
    sheetGoods4x8PlywoodCount: sheetsPlywood,
    faceFrameBoardFeet: faceFrameBf,
    drawerBoxesMaterialSquareFeet: drawerSqFt,
    edgeBandingLinearFeet: edgeBandingLinFt,
  };
}

// 8. Firewood Cord Calculator (Seasoned weight & heat energy)
export interface FirewoodCordResult {
  fullCords: number;
  seasonedWeightLbs: number;
  greenWeightLbs: number;
  totalMillionBtu: number;
  equivalentGallonsOfHeatingOil: number;
  speciesName: string;
}

export function calculateFirewoodCord(
  fullCords: number,
  species: 'oak' | 'maple' | 'ash' | 'birch' | 'hickory' | 'pine' = 'oak'
): FirewoodCordResult {
  const cords = Math.max(0, isNaN(fullCords) ? 0 : fullCords);

  // Density & BTU per cord database:
  const speciesData: Record<string, { name: string; kdWeight: number; greenWeight: number; mBtu: number }> = {
    hickory: { name: 'Shagbark Hickory', kdWeight: 4200, greenWeight: 5600, mBtu: 28.5 },
    oak: { name: 'White / Red Oak', kdWeight: 3800, greenWeight: 5500, mBtu: 25.7 },
    ash: { name: 'White Ash', kdWeight: 3400, greenWeight: 4800, mBtu: 24.2 },
    maple: { name: 'Sugar Maple', kdWeight: 3700, greenWeight: 5000, mBtu: 24.0 },
    birch: { name: 'Yellow Birch', kdWeight: 3200, greenWeight: 4600, mBtu: 21.8 },
    pine: { name: 'White Pine', kdWeight: 2200, greenWeight: 3600, mBtu: 16.0 },
  };

  const item = speciesData[species] || speciesData.oak;
  const kdWeight = Math.round(cords * item.kdWeight);
  const greenWeight = Math.round(cords * item.greenWeight);
  const totalBtu = Math.round(cords * item.mBtu * 10) / 10;
  // 1 gallon of #2 heating oil ≈ 138,500 BTU (0.1385 Million BTU)
  const oilGallons = Math.round((totalBtu * 1000000) / 138500);

  return {
    fullCords: cords,
    seasonedWeightLbs: kdWeight,
    greenWeightLbs: greenWeight,
    totalMillionBtu: totalBtu,
    equivalentGallonsOfHeatingOil: oilGallons,
    speciesName: item.name,
  };
}

// 9. Loose Cord Wood Calculator (Thrown cords vs stacked cords)
export interface LooseCordResult {
  looseCubicFeet: number;
  equivalentStackedCords: number; // 1 loose cord ≈ 180 cu ft thrown = 128 cu ft stacked (0.71 ratio)
  pickupTruck8ftBeds: number; // 8-ft truck bed holds ~75 cu ft loose (0.42 cord)
  pickupTruck6ftBeds: number; // 6.5-ft truck bed holds ~55 cu ft loose (0.31 cord)
  volumeExpansionFactor: number;
}

export function calculateLooseCord(looseCubicFeet: number): LooseCordResult {
  const looseFt = Math.max(0, isNaN(looseCubicFeet) ? 0 : looseCubicFeet);

  // In forestry standards (US Forest Service & state weights/measures):
  // 1 cord of stacked firewood (128 cu ft) expands to ~180 cu ft when dumped/thrown loosely.
  const stackedCords = Math.round((looseFt / 180) * 100) / 100;
  // Standard 8ft bed (level full): ~75 cu ft loose
  const truck8ft = Math.round((looseFt / 75) * 10) / 10;
  // Standard 6.5ft bed (level full): ~55 cu ft loose
  const truck6ft = Math.round((looseFt / 55) * 10) / 10;

  return {
    looseCubicFeet: looseFt,
    equivalentStackedCords: stackedCords,
    pickupTruck8ftBeds: truck8ft,
    pickupTruck6ftBeds: truck6ft,
    volumeExpansionFactor: 1.40,
  };
}

// 10. Shed Wood Calculator
export interface ShedWoodResult {
  shedLengthFeet: number;
  shedWidthFeet: number;
  wallStudsCount: number; // 2x4 studs for all 4 walls @ 16" OC
  floorJoistsCount: number; // 2x6 floor joists @ 12" OC
  subfloorPlywoodSheets: number; // 3/4" T&G plywood sheets (4x8)
  roofRaftersOrTrussesCount: number;
  roofSheathingOsbSheets: number; // 1/2" OSB 4x8 sheets
  sidingSquareFeet: number;
}

export function calculateShedWood(
  shedLengthFeet: number = 12,
  shedWidthFeet: number = 10,
  wallHeightFeet: number = 8,
  roofPitch: 'gable' | 'lean_to' = 'gable'
): ShedWoodResult {
  const l = Math.max(4, isNaN(shedLengthFeet) ? 12 : shedLengthFeet);
  const w = Math.max(4, isNaN(shedWidthFeet) ? 10 : shedWidthFeet);
  const h = Math.max(6, isNaN(wallHeightFeet) ? 8 : wallHeightFeet);

  // 4 walls perimeter
  const perimeter = 2 * (l + w);
  // Studs @ 16" OC for 4 walls + double corners + door opening
  const baseStuds = Math.ceil((perimeter * 12) / 16) + 1;
  const totalStuds = Math.ceil((baseStuds + 12) * 1.10); // 10% waste

  // Floor: 2x6 joists @ 12" OC across the shorter dimension
  const floorJoists = Math.ceil(l / 1.0) + 2; // + rim joists
  // Subfloor 4x8 sheets (32 sq ft per sheet)
  const floorSqFt = l * w;
  const subfloorSheets = Math.ceil((floorSqFt * 1.10) / 32);

  // Roof: Gable roof with 1-ft overhangs has slope factor ~1.20 (4/12 or 5/12 pitch)
  const roofSqFt = (l + 2) * (w + 2) * (roofPitch === 'gable' ? 1.20 : 1.15);
  const roofSheathingSheets = Math.ceil(roofSqFt / 32);
  const raftersCount = (Math.ceil(l / 2.0) + 1) * 2; // pairs of rafters @ 24" OC

  // Siding: perimeter x wall height + gable triangles
  const sidingSqFt = Math.round((perimeter * h + (w * 2.5)) * 1.08);

  return {
    shedLengthFeet: l,
    shedWidthFeet: w,
    wallStudsCount: totalStuds,
    floorJoistsCount: floorJoists,
    subfloorPlywoodSheets: subfloorSheets,
    roofRaftersOrTrussesCount: raftersCount,
    roofSheathingOsbSheets: roofSheathingSheets,
    sidingSquareFeet: sidingSqFt,
  };
}

// 11. Fence Wood Calculator
export interface FenceWoodResult {
  fenceLengthFeet: number;
  fenceHeightFeet: number;
  postSpacingFeet: number;
  numberOfPosts: number; // 4x4 treated posts
  numberOfHorizontalRails: number; // 2x4 rails (2 or 3 per bay)
  numberOfPickets: number; // dog-ear pickets (e.g. 1x6)
  concreteBagsPerPost: number;
  totalConcreteBags: number;
}

export function calculateFenceWood(
  fenceLengthFeet: number = 100,
  fenceHeightFeet: number = 6,
  postSpacingFeet: number = 8,
  picketWidthInches: 3.5 | 5.5 = 5.5
): FenceWoodResult {
  const l = Math.max(0, isNaN(fenceLengthFeet) ? 0 : fenceLengthFeet);
  const h = Math.max(3, isNaN(fenceHeightFeet) ? 6 : fenceHeightFeet);
  const spacing = Math.max(4, isNaN(postSpacingFeet) ? 8 : postSpacingFeet);

  const bays = Math.ceil(l / spacing);
  const posts = bays + 1; // + end post

  // Rails: 2 rails for <=4ft, 3 rails for 6ft, 4 rails for 8ft fence
  let railsPerBay = 3;
  if (h <= 4) railsPerBay = 2;
  else if (h >= 8) railsPerBay = 4;
  const totalRails = bays * railsPerBay;

  // Pickets: 5.5" width = 0.4583 ft per picket, 3.5" = 0.2917 ft
  const picketWidthFt = picketWidthInches / 12;
  const pickets = Math.ceil((l / picketWidthFt) * 1.05); // 5% cuts/waste

  // Concrete: 1.5 bags (50lb Fast-Setting) per post
  const bagsPerPost = 1.5;
  const totalBags = Math.ceil(posts * bagsPerPost);

  return {
    fenceLengthFeet: l,
    fenceHeightFeet: h,
    postSpacingFeet: spacing,
    numberOfPosts: posts,
    numberOfHorizontalRails: totalRails,
    numberOfPickets: pickets,
    concreteBagsPerPost: bagsPerPost,
    totalConcreteBags: totalBags,
  };
}

// 12. Firewood Calculator (Seasonal Home Heating Estimator)
export interface FirewoodEstimateResult {
  homeSquareFeet: number;
  climateZone: string;
  heatingRequirement: 'primary' | 'supplemental' | 'occasional_fireplace';
  cordsNeededForWinter: number;
  woodWeightLbs: number;
  totalSeasonalBtuMillions: number;
}

export function calculateSeasonalFirewood(
  homeSquareFeet: number = 2000,
  climateZone: 'mild' | 'moderate' | 'cold' | 'harsh' = 'moderate',
  heatingRequirement: 'primary' | 'supplemental' | 'occasional_fireplace' = 'primary'
): FirewoodEstimateResult {
  const sqFt = Math.max(500, isNaN(homeSquareFeet) ? 2000 : homeSquareFeet);

  // Baseline cords per 1,000 sq ft for primary heating:
  // Mild (South): 1.5 cords / 1000 sq ft
  // Moderate (Mid-Atlantic/Midwest): 2.5 cords / 1000 sq ft
  // Cold (Northern US/Canada): 3.5 cords / 1000 sq ft
  // Harsh (Alaska/High Rockies): 5.0 cords / 1000 sq ft
  const climateFactors: Record<string, { name: string; ratePer1k: number }> = {
    mild: { name: 'Mild Climate (Zone 3-4)', ratePer1k: 1.5 },
    moderate: { name: 'Moderate Climate (Zone 5-6)', ratePer1k: 2.5 },
    cold: { name: 'Cold Climate (Zone 7-8)', ratePer1k: 3.5 },
    harsh: { name: 'Harsh Arctic/Mountain (Zone 9+)', ratePer1k: 5.0 },
  };

  const info = climateFactors[climateZone] || climateFactors.moderate;
  let baseCords = (sqFt / 1000) * info.ratePer1k;

  if (heatingRequirement === 'supplemental') {
    baseCords *= 0.40; // 40% of primary
  } else if (heatingRequirement === 'occasional_fireplace') {
    baseCords = Math.min(1.5, baseCords * 0.15); // weekend ambiance fires
  }

  const cords = Math.round(baseCords * 10) / 10;
  const weight = Math.round(cords * 3600);
  const btu = Math.round(cords * 24.5 * 10) / 10;

  return {
    homeSquareFeet: sqFt,
    climateZone: info.name,
    heatingRequirement,
    cordsNeededForWinter: cords,
    woodWeightLbs: weight,
    totalSeasonalBtuMillions: btu,
  };
}
