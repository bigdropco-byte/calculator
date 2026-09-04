import { describe, it, expect } from 'vitest';
import {
  calculateSpherePacking,
  calculateCubeRoot,
  calculateScientificUnary,
  solveLinearEquation,
  solveQuadraticEquation,
  solveSystem2x2,
  calculatePartialFraction,
  calculateGrade,
  calculateStudentT,
  calculateChiSquare,
  calculateHeatIndex,
  convertInchToCm,
  convertCmToInch,
  calculateIpSubnet,
  calculateBinPacking,
} from '../stemEngines';

describe('STEM Calculation Engines', () => {
  it('calculates sphere packing in a box', () => {
    const res = calculateSpherePacking({
      containerType: 'box',
      sphereRadius: 1, // diameter = 2
      boxLength: 10,
      boxWidth: 10,
      boxHeight: 10,
    });
    expect(res.containerVolume).toBe(1000);
    expect(res.maxTheoreticalCount).toBeGreaterThan(150);
    expect(res.packingEfficiencyPercent).toBeGreaterThan(40);
  });

  it('calculates cube roots correctly', () => {
    const res27 = calculateCubeRoot(27);
    expect(res27.principalRoot).toBe(3);
    expect(res27.isPerfectCube).toBe(true);

    const resNeg8 = calculateCubeRoot(-8);
    expect(resNeg8.principalRoot).toBe(-2);
    expect(resNeg8.isPerfectCube).toBe(true);

    const resNonPerf = calculateCubeRoot(50);
    expect(resNonPerf.isPerfectCube).toBe(false);
    expect(resNonPerf.principalRoot).toBeCloseTo(3.684031, 4);
  });

  it('evaluates scientific unary operations', () => {
    expect(calculateScientificUnary({ operation: 'sin', val: 90, angleMode: 'deg' }).result).toBe(1);
    expect(calculateScientificUnary({ operation: 'cos', val: 0, angleMode: 'deg' }).result).toBe(1);
    expect(calculateScientificUnary({ operation: 'sqrt', val: 144 }).result).toBe(12);
    expect(calculateScientificUnary({ operation: 'factorial', val: 5 }).result).toBe(120);
    expect(calculateScientificUnary({ operation: 'ln', val: Math.E }).result).toBe(1);
  });

  it('solves linear, quadratic and 2x2 system equations', () => {
    const lin = solveLinearEquation({ a: 2, b: -8 });
    expect(lin.roots[0].real).toBe(4);

    const quad = solveQuadraticEquation({ a: 1, b: -5, c: 6 });
    expect(quad.roots.map(r => r.real).sort()).toEqual([2, 3]);

    const sys = solveSystem2x2({ a1: 2, b1: 1, c1: 8, a2: 1, b2: -1, c2: 1 });
    expect(sys.roots.find(r => r.label === 'x')?.real).toBe(3);
    expect(sys.roots.find(r => r.label === 'y')?.real).toBe(2);
  });

  it('decomposes partial fractions', () => {
    // 3x + 5 / ((x - 1)(x - 2))
    const pf = calculatePartialFraction({ p1: 3, p0: 5, r1: 1, r2: 2 });
    expect(pf.coefficientA).toBe(-8); // (3(1)+5)/(1-2) = 8/-1 = -8
    expect(pf.coefficientB).toBe(11); // (3(2)+5)/(2-1) = 11/1 = 11
  });

  it('calculates weighted grades and final exam needed', () => {
    const res = calculateGrade({
      items: [
        { name: 'HW', gradePercent: 90, weightPercent: 30 },
        { name: 'Midterm', gradePercent: 80, weightPercent: 30 },
      ],
      targetGradePercent: 85,
      finalExamWeightPercent: 40,
    });
    expect(res.currentWeightedAverage).toBe(85);
    expect(res.finalGradeNeeded).toBe(85);
  });

  it('calculates Student t critical values and chi-square', () => {
    const tRes = calculateStudentT({ df: 10, alpha: 0.05, tailType: 'two-tailed' });
    expect(tRes.criticalT).toBeGreaterThan(2.0);
    expect(tRes.criticalT).toBeLessThan(2.3);

    const chi = calculateChiSquare({
      observed: [
        [20, 30],
        [30, 20],
      ],
    });
    expect(chi.df).toBe(1);
    expect(chi.chiSquare).toBeGreaterThan(0);
  });

  it('calculates heat index and inch/cm conversion', () => {
    const hi = calculateHeatIndex({ temperature: 95, humidity: 60, unit: 'F' });
    expect(hi.heatIndexF).toBeGreaterThan(110);
    expect(hi.dangerCategory).toBe('Danger');

    const inToCm = convertInchToCm(10);
    expect(inToCm.centimeters).toBe(25.4);
    const cmToIn = convertCmToInch(25.4);
    expect(cmToIn.inches).toBe(10);
  });

  it('calculates IP subnets and 1D bin packing', () => {
    const ip = calculateIpSubnet({ ipAddress: '192.168.1.100', cidrPrefix: 24 });
    expect(ip.networkAddress).toBe('192.168.1.0');
    expect(ip.broadcastAddress).toBe('192.168.1.255');
    expect(ip.usableHosts).toBe(254);
    expect(ip.subnetMask).toBe('255.255.255.0');
    expect(ip.scope).toBe('Private (RFC 1918)');

    const bp = calculateBinPacking({ binCapacity: 10, itemWeights: [5, 4, 3, 2, 7, 8, 1] });
    expect(bp.ffdCount).toBeLessThanOrEqual(bp.firstFitCount);
    expect(bp.theoreticalMinBins).toBe(3); // sum = 30 / 10 = 3
  });
});
