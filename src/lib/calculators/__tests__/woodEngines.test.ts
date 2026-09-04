import { describe, it, expect } from 'vitest';
import {
  calculateBoardFeet,
  calculateFramingWood,
  calculateTrestleWood,
  calculateWoodWeight,
  calculateDeckWood,
  calculateCordWood,
  calculateCabinetWood,
  calculateFirewoodCord,
  calculateLooseCord,
  calculateShedWood,
  calculateFenceWood,
  calculateSeasonalFirewood,
} from '../woodEngines';

describe('Wood, Lumber & Firewood Engines', () => {
  it('1. Board Foot Calculator: computes board feet, linear feet, and price', () => {
    // 2in thick x 6in wide x 10ft long (qty 5) -> BF per piece = (2*6*10)/12 = 10 BF. Total 50 BF.
    const res = calculateBoardFeet(2, 6, 10, 5, 4.5);
    expect(res.totalBoardFeet).toBe(50);
    expect(res.totalLinearFeet).toBe(50);
    expect(res.totalCost).toBe(225);
  });

  it('2. Framing Wood Calculator: calculates studs, plates, and headers', () => {
    // 24ft wall @ 16" OC
    const res = calculateFramingWood(24, 8, 16, 1, 1);
    expect(res.studsCount).toBeGreaterThan(25);
    expect(res.solePlatesCount).toBe(2);
    expect(res.topPlatesCount).toBe(3);
    expect(res.totalPlatesLinearFeet).toBe(72);
  });

  it('3. Trestle Wood Calculator: calculates timber bents, caps, and stringers', () => {
    // 100ft span, 18ft height, 14ft bent spacing
    const res = calculateTrestleWood(100, 18, 14);
    expect(res.numberOfBents).toBe(9);
    expect(res.timberPostsCount).toBe(36);
    expect(res.totalTrestleBoardFeet).toBeGreaterThan(15000);
    expect(res.estimatedDeadLoadWeightLbs).toBeGreaterThan(45000);
  });

  it('4. Weight of Wood Calculator: computes species weights for KD vs Green', () => {
    // 100 board feet (8.33 cu ft) of Red Oak (KD ~44 lbs/cu ft = 366.7 lbs, Green ~63 lbs/cu ft = 525 lbs)
    const kd = calculateWoodWeight(100, 'red_oak', 'kiln_dried');
    const green = calculateWoodWeight(100, 'red_oak', 'green');
    expect(kd.weightLbs).toBe(366.7);
    expect(green.weightLbs).toBe(525);
    expect(green.weightLbs).toBeGreaterThan(kd.weightLbs);
  });

  it('5. Deck Wood Calculator: calculates 5/4x6 decking boards and joists', () => {
    // 16ft x 12ft deck with 16ft boards
    const res = calculateDeckWood(16, 12, '5_4x6', 16, 16);
    expect(res.deckSquareFeet).toBe(192);
    expect(res.numberOfDeckBoards).toBeGreaterThan(25);
    expect(res.hiddenFastenersOrScrewsCount).toBeGreaterThan(600);
  });

  it('6. Cord Wood Calculator: computes standard full cords and face cords', () => {
    // 8ft long x 4ft high x 4ft wide = 128 cu ft = exactly 1 full cord
    const res1 = calculateCordWood(8, 4, 48);
    expect(res1.stackCubicFeet).toBe(128);
    expect(res1.fullCords).toBe(1);

    // 8ft long x 4ft high x 16in depth = 42.67 cu ft = 0.33 full cord = 1 face cord
    const res2 = calculateCordWood(8, 4, 16);
    expect(res2.faceCordsOrRicks).toBe(1);
    expect(res2.fullCords).toBe(0.33);
  });

  it('7. Cabinet Wood Calculator: calculates 4x8 plywood sheets and face frames', () => {
    // 4 standard 36" base cabinets
    const res = calculateCabinetWood(36, 34.5, 24, 4);
    expect(res.sheetGoods4x8PlywoodCount).toBeGreaterThanOrEqual(3);
    expect(res.faceFrameBoardFeet).toBeGreaterThan(5);
  });

  it('8. Firewood Cord Calculator: calculates seasoned weight and BTU energy', () => {
    // 2 cords of Oak
    const res = calculateFirewoodCord(2, 'oak');
    expect(res.seasonedWeightLbs).toBe(7600);
    expect(res.totalMillionBtu).toBe(51.4);
    expect(res.equivalentGallonsOfHeatingOil).toBeGreaterThan(350);
  });

  it('9. Loose Cord Wood Calculator: calculates thrown cord volume and truck beds', () => {
    // 180 cubic feet loose = 1.0 stacked cord
    const res = calculateLooseCord(180);
    expect(res.equivalentStackedCords).toBe(1.0);
    expect(res.pickupTruck8ftBeds).toBe(2.4);
  });

  it('10. Shed Wood Calculator: calculates wall, floor, and roof materials', () => {
    // 12x10 shed
    const res = calculateShedWood(12, 10, 8, 'gable');
    expect(res.wallStudsCount).toBeGreaterThan(40);
    expect(res.floorJoistsCount).toBeGreaterThan(12);
    expect(res.subfloorPlywoodSheets).toBeGreaterThanOrEqual(4);
  });

  it('11. Fence Wood Calculator: calculates posts, rails, pickets, and concrete', () => {
    // 100ft fence, 6ft high, 8ft spacing
    const res = calculateFenceWood(100, 6, 8, 5.5);
    expect(res.numberOfPosts).toBe(14);
    expect(res.numberOfHorizontalRails).toBe(39);
    expect(res.numberOfPickets).toBeGreaterThan(220);
    expect(res.totalConcreteBags).toBe(21);
  });

  it('12. Firewood Seasonal Calculator: estimates winter heating cords', () => {
    // 2000 sq ft home in moderate climate, primary heat
    const res = calculateSeasonalFirewood(2000, 'moderate', 'primary');
    expect(res.cordsNeededForWinter).toBe(5.0);
    expect(res.woodWeightLbs).toBe(18000);
  });
});
