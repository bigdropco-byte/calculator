import { describe, it, expect } from 'vitest';
import {
  calculateCircle,
  calculateTriangle,
  calculateRightTriangle,
  calculateSquare,
  calculateRectangle,
  calculateRhombus,
  calculateParallelogram,
  calculateTrapezium,
  calculateRegularPolygon,
  calculatePentagon,
  calculateHexagon,
  calculatePythagoreanTheorem,
} from '../geometry2DEngines';
import {
  calculateCube,
  calculateCuboid,
  calculateCylinder,
  calculateCone,
  calculateSphere,
  calculatePrism,
  calculatePyramid,
} from '../geometry3DEngines';

describe('2D Geometry Calculation Engines', () => {
  it('calculates circle properties accurately', () => {
    const res = calculateCircle({ radius: 5, centralAngleDeg: 90 });
    expect(res.diameter).toBe(10);
    expect(res.circumference).toBeCloseTo(31.4159, 3);
    expect(res.area).toBeCloseTo(78.5398, 3);
    expect(res.arcLength).toBeCloseTo(7.854, 2);
    expect(res.sectorArea).toBeCloseTo(19.635, 2);
  });

  it('calculates triangle Heron formula and classification', () => {
    const equilateral = calculateTriangle({ sideA: 6, sideB: 6, sideC: 6 });
    expect(equilateral.isValid).toBe(true);
    expect(equilateral.triangleType).toBe('equilateral');
    expect(equilateral.perimeter).toBe(18);
    expect(equilateral.area).toBeCloseTo(15.5885, 3);

    const invalid = calculateTriangle({ sideA: 1, sideB: 2, sideC: 10 });
    expect(invalid.isValid).toBe(false);
  });

  it('calculates right triangle sides and angles', () => {
    const rt = calculateRightTriangle({ legA: 3, legB: 4 });
    expect(rt.hypotenuse).toBe(5);
    expect(rt.area).toBe(6);
    expect(rt.perimeter).toBe(12);
    expect(rt.angleADeg).toBeCloseTo(36.87, 1);
    expect(rt.angleBDeg).toBeCloseTo(53.13, 1);
  });

  it('calculates square and rectangle', () => {
    const sq = calculateSquare(4);
    expect(sq.area).toBe(16);
    expect(sq.perimeter).toBe(16);
    expect(sq.diagonal).toBeCloseTo(5.6569, 3);

    const rect = calculateRectangle(5, 10);
    expect(rect.area).toBe(50);
    expect(rect.perimeter).toBe(30);
    expect(rect.diagonal).toBeCloseTo(11.1803, 3);
  });

  it('calculates rhombus, parallelogram, trapezium', () => {
    const rhomb = calculateRhombus({ diagonal1: 6, diagonal2: 8 });
    expect(rhomb.area).toBe(24);
    expect(rhomb.side).toBe(5);
    expect(rhomb.perimeter).toBe(20);

    const para = calculateParallelogram({ base: 10, height: 6, side: 8 });
    expect(para.area).toBe(60);
    expect(para.perimeter).toBe(36);

    const trap = calculateTrapezium({ baseA: 10, baseB: 6, height: 4 });
    expect(trap.area).toBe(32);
    expect(trap.midSegment).toBe(8);
  });

  it('calculates regular polygons, pentagon, and hexagon', () => {
    const pent = calculatePentagon(4);
    expect(pent.sides).toBe(5);
    expect(pent.perimeter).toBe(20);
    expect(pent.interiorAngleDeg).toBe(108);

    const hex = calculateHexagon(6);
    expect(hex.sides).toBe(6);
    expect(hex.perimeter).toBe(36);
    expect(hex.interiorAngleDeg).toBe(120);
    expect(hex.longDiagonal).toBe(12);
    expect(hex.shortDiagonal).toBeCloseTo(10.3923, 3);

    const poly8 = calculateRegularPolygon(8, 5);
    expect(poly8.interiorAngleDeg).toBe(135);
  });

  it('calculates Pythagorean theorem with radical reduction', () => {
    const pythHyp = calculatePythagoreanTheorem({ legA: 6, legB: 8 });
    expect(pythHyp.hypotenuse).toBe(10);
    expect(pythHyp.radicalExact).toBe('10');

    const pythLeg = calculatePythagoreanTheorem({ hypotenuse: 13, legA: 5 });
    expect(pythLeg.legB).toBe(12);
  });
});

describe('3D Geometry Calculation Engines', () => {
  it('calculates cube volume and surface area', () => {
    const cube = calculateCube(3);
    expect(cube.volume).toBe(27);
    expect(cube.surfaceArea).toBe(54);
    expect(cube.lateralArea).toBe(36);
    expect(cube.spaceDiagonal).toBeCloseTo(5.1962, 3);
  });

  it('calculates cuboid volume and surface area', () => {
    const cuboid = calculateCuboid(2, 3, 4);
    expect(cuboid.volume).toBe(24);
    expect(cuboid.surfaceArea).toBe(52);
    expect(cuboid.spaceDiagonal).toBeCloseTo(5.3852, 3);
  });

  it('calculates cylinder and cone properties', () => {
    const cyl = calculateCylinder(3, 5);
    expect(cyl.volume).toBeCloseTo(141.3717, 3);
    expect(cyl.lateralArea).toBeCloseTo(94.2478, 3);

    const cone = calculateCone(3, 4);
    expect(cone.slantHeight).toBe(5);
    expect(cone.volume).toBeCloseTo(37.6991, 3);
    expect(cone.lateralArea).toBeCloseTo(47.1239, 3);
  });

  it('calculates sphere, prism, and pyramid', () => {
    const sph = calculateSphere(3);
    expect(sph.diameter).toBe(6);
    expect(sph.volume).toBeCloseTo(113.0973, 3);
    expect(sph.surfaceArea).toBeCloseTo(113.0973, 3);

    const prism = calculatePrism({
      baseType: 'rectangular',
      baseDimension1: 4,
      baseDimension2: 5,
      prismHeight: 10,
    });
    expect(prism.volume).toBe(200);
    expect(prism.lateralArea).toBe(180);

    const pyr = calculatePyramid(6, 6, 4);
    expect(pyr.volume).toBe(48);
    expect(pyr.slantHeightLength).toBe(5);
  });
});
