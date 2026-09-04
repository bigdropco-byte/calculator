import { describe, it, expect } from 'vitest';
import {
  calculateConcreteYardage,
  calculateConcreteSlab,
  calculateConcreteBlock,
  calculateSakrete,
  calculateQuikrete,
  calculateGravelStone,
  calculateAsphalt,
  calculateMaterialBulk,
} from '../masonryEngines';

describe('Masonry, Concrete & Asphalt Engines', () => {
  it('1. Concrete Yardage: computes cubic yards and bags with 10% waste', () => {
    // 10ft x 10ft x 4in (0.333ft) = 33.33 cu ft -> 1.23 cu yds -> with 10% waste = 1.36 cu yds
    const res = calculateConcreteYardage(10, 10, 4, 10);
    expect(res.volumeCubicYards).toBe(1.23);
    expect(res.totalYardsWithWaste).toBe(1.36);
    expect(res.bags80lb).toBe(62); // 36.67 cu ft / 0.6 = 61.1 -> 62 bags
    expect(res.bags60lb).toBe(82);
  });

  it('2. Concrete Slab: computes rebar grid and gravel base', () => {
    // 20ft x 20ft slab, 4in thick, 4in gravel base
    const res = calculateConcreteSlab(20, 20, 4, 4, 18);
    expect(res.squareFeet).toBe(400);
    expect(res.concreteCubicYards).toBeGreaterThan(5);
    expect(res.gravelBaseTons).toBeGreaterThan(7);
    expect(res.rebarGridPieces).toBeGreaterThan(25);
  });

  it('3. Concrete Block: computes CMU blocks, mortar, and core fill', () => {
    // 40ft long x 8ft high wall = 320 sq ft
    // 320 * 1.125 = 360 blocks + 5% = 378 blocks
    const res = calculateConcreteBlock(40, 8, 32);
    expect(res.wallSquareFeet).toBe(320);
    expect(res.totalBlocks).toBe(378);
    expect(res.mortarBags70lb).toBe(13);
    expect(res.groutCubicYards).toBeGreaterThan(1);
  });

  it('4. Sakrete Calculator: computes exact bag requirements and water', () => {
    // 10ft x 10ft x 4in slab
    const res = calculateSakrete(10, 10, 4, 80, 'concrete');
    expect(res.bagsNeeded).toBe(62);
    expect(res.waterQuartsPerBag).toBe(3.5);
    expect(res.totalWaterGallons).toBeGreaterThan(50);
  });

  it('5. Quikrete Calculator: computes standard and fast-setting red bags', () => {
    // Post hole mode: 10" hole diameter, 4" post, 36" depth
    const res = calculateQuikrete(10, 4, 36, 'post_hole');
    expect(res.cubicFeet).toBeGreaterThan(1);
    expect(res.fastSettingBags50lb).toBeGreaterThanOrEqual(3);
  });

  it('6. Gravel & Stone Calculator: computes tons and cubic yards', () => {
    // 50ft x 10ft driveway x 3in depth = 500 sq ft x 0.25ft = 125 cu ft = 4.63 yds + 10% = 5.09 yds
    // 5.09 yds * 1.45 tons/yd = 7.38 tons
    const res = calculateGravelStone(50, 10, 3, 'crushed_stone');
    expect(res.squareFeet).toBe(500);
    expect(res.cubicYards).toBe(5.09);
    expect(res.tons).toBe(7.38);
    expect(res.standard50lbBags).toBe(296);
  });

  it('7. Asphalt Calculator: computes HMA and recycled RAP asphalt tonnage', () => {
    // 60ft x 20ft parking area = 1200 sq ft = 133.33 sq yds
    // 2.5in depth @ 112 lbs/sq yd/in = 37,333 lbs = 18.67 tons + 5% = 19.6 tons
    const res1 = calculateAsphalt(60, 20, 2.5, 'standard_hma');
    expect(res1.squareYards).toBe(133.3);
    expect(res1.tons).toBeGreaterThan(18);

    const res2 = calculateAsphalt(60, 20, 2.5, 'crushed_rap');
    expect(res2.tons).toBeLessThan(res1.tons); // RAP millings slightly lighter density
  });

  it('8. Material Calculator: bulk estimator for multiple materials', () => {
    const res = calculateMaterialBulk(20, 10, 4, 'gravel');
    expect(res.cubicYards).toBe(2.72);
    expect(res.tons).toBe(3.81);
    expect(res.bagsNeeded).toBe(153);
  });
});
