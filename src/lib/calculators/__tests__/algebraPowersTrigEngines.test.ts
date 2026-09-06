import { describe, it, expect } from 'vitest';
import {
  solveLinearEquationDetailed,
  solveQuadraticEquationDetailed,
  solveSystem2x2Detailed,
  solveSystem3x3Detailed,
  calculateArithmeticMean,
  calculateWeightedMean,
  calculatePower,
  calculateSquareNumber,
  calculateCubeNumber,
  calculateSquareRoot,
  calculateNthRoot,
  calculateTrigonometric,
  calculateLogarithm,
  calculateNaturalLogarithm,
  calculateCommonLogarithm,
} from '../algebraPowersTrigEngines';

describe('Algebra, Powers, Roots, Trig, and Log Engines', () => {
  it('solves linear equations ax + b = c', () => {
    const lin1 = solveLinearEquationDetailed(2, -4, 10);
    expect(lin1.solution).toBe(7);
    expect(lin1.status).toBe('unique');

    const linInf = solveLinearEquationDetailed(0, 5, 5);
    expect(linInf.status).toBe('infinite');

    const linNone = solveLinearEquationDetailed(0, 5, 10);
    expect(linNone.status).toBe('none');
  });

  it('solves quadratic equations with real and complex roots', () => {
    // x² - 5x + 6 = 0 -> roots 3, 2
    const quadReal = solveQuadraticEquationDetailed(1, -5, 6);
    expect(quadReal.roots.length).toBe(2);
    expect(quadReal.roots[0].real).toBe(3);
    expect(quadReal.roots[1].real).toBe(2);
    expect(quadReal.discriminant).toBe(1);

    // Repeated root: x² - 4x + 4 = 0 -> root 2
    const quadRep = solveQuadraticEquationDetailed(1, -4, 4);
    expect(quadRep.roots.length).toBe(1);
    expect(quadRep.roots[0].real).toBe(2);

    // Complex roots: x² + 1 = 0 -> roots ±i
    const quadComp = solveQuadraticEquationDetailed(1, 0, 1);
    expect(quadComp.natureOfRoots).toBe('complex');
    expect(quadComp.roots[0].imag).toBe(1);
    expect(quadComp.roots[1].imag).toBe(-1);
  });

  it('solves 2x2 and 3x3 systems of linear equations', () => {
    // 2x + y = 7
    // x + 3y = 11
    // Solution: x = 2, y = 3
    const sys2 = solveSystem2x2Detailed(2, 1, 7, 1, 3, 11);
    expect(sys2.status).toBe('unique');
    expect(sys2.x).toBe(2);
    expect(sys2.y).toBe(3);

    // 3x3 system:
    // x + y + z = 6
    // 2y + 5z = -4
    // 2x + 5y - z = 27
    const sys3 = solveSystem3x3Detailed([
      [1, 1, 1, 6],
      [0, 2, 5, -4],
      [2, 5, -1, 27],
    ]);
    expect(sys3.status).toBe('unique');
    expect(sys3.x).toBe(5);
    expect(sys3.y).toBe(3);
    expect(sys3.z).toBe(-2);
  });

  it('calculates arithmetic mean and weighted mean', () => {
    const meanRes = calculateArithmeticMean([10, 20, 30, 40, 50]);
    expect(meanRes.mean).toBe(30);
    expect(meanRes.median).toBe(30);
    expect(meanRes.sum).toBe(150);

    const weighted = calculateWeightedMean([
      { value: 80, weight: 0.2 },
      { value: 90, weight: 0.3 },
      { value: 100, weight: 0.5 },
    ]);
    expect(weighted.weightedMean).toBe(93);
    expect(weighted.totalWeight).toBe(1);
  });

  it('calculates powers and roots correctly', () => {
    expect(calculateSquareNumber(12).result).toBe(144);
    expect(calculateCubeNumber(5).result).toBe(125);
    expect(calculatePower(2, 8).result).toBe(256);
    expect(calculatePower(2, -3).result).toBe(0.125);

    const sqRoot = calculateSquareRoot(49);
    expect(sqRoot.principalRoot).toBe(7);
    expect(sqRoot.isPerfect).toBe(true);

    const negSqRoot = calculateSquareRoot(-16);
    expect(negSqRoot.isReal).toBe(false);
    expect(negSqRoot.complexRoot).toBe('±4i');

    const nthRoot = calculateNthRoot(32, 5);
    expect(nthRoot.principalRoot).toBe(2);
    expect(nthRoot.isPerfect).toBe(true);
  });

  it('calculates trigonometric functions with exact special angles', () => {
    const sin30 = calculateTrigonometric('sin', 30, 'deg');
    expect(sin30.value).toBe(0.5);
    expect(sin30.exactValueLabel).toBe('1/2');

    const cos60 = calculateTrigonometric('cos', 60, 'deg');
    expect(cos60.value).toBe(0.5);
    expect(cos60.exactValueLabel).toBe('1/2');

    const tan45 = calculateTrigonometric('tan', 45, 'deg');
    expect(tan45.value).toBe(1);
    expect(tan45.exactValueLabel).toBe('1');

    const tan90 = calculateTrigonometric('tan', 90, 'deg');
    expect(tan90.isUndefined).toBe(true);

    const cot45 = calculateTrigonometric('cot', 45, 'deg');
    expect(cot45.value).toBe(1);
  });

  it('calculates logarithms, ln, and log10', () => {
    const log2_8 = calculateLogarithm(8, 2);
    expect(log2_8.result).toBe(3);

    const lnE = calculateNaturalLogarithm(Math.E);
    expect(lnE.result).toBe(1);

    const log1000 = calculateCommonLogarithm(1000);
    expect(log1000.result).toBe(3);
  });
});
