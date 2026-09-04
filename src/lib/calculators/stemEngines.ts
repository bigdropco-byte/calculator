/**
 * Pure STEM Calculation Engines
 * Calculat.dev - Science, Technology, Engineering & Math Suite
 */

// ==========================================
// 1. Sphere Packing Calculator
// ==========================================
export interface SpherePackingInput {
  containerType: 'box' | 'cylinder' | 'sphere';
  sphereRadius: number; // in / cm
  // Box dimensions
  boxLength?: number;
  boxWidth?: number;
  boxHeight?: number;
  // Cylinder dimensions
  cylinderRadius?: number;
  cylinderHeight?: number;
  // Sphere container dimensions
  containerRadius?: number;
}

export interface SpherePackingResult {
  containerVolume: number;
  sphereVolume: number;
  maxTheoreticalCount: number; // Kepler conjecture FCC/HCP (~74.05%)
  randomCloseCount: number; // Random close packing (~64%)
  simpleCubicCount: number; // Simple cubic grid (~52.36%)
  estimatedFitCount: number; // Practical discrete fit
  fccPackingFraction: number; // 0.7405
  rcpPackingFraction: number; // 0.64
  packingEfficiencyPercent: number;
  emptySpaceVolume: number;
}

export function calculateSpherePacking(input: SpherePackingInput): SpherePackingResult {
  const r = Math.max(0.0001, input.sphereRadius);
  const sphereVol = (4 / 3) * Math.PI * Math.pow(r, 3);
  let containerVol = 0;
  let estimatedFit = 0;

  if (input.containerType === 'box') {
    const L = Math.max(0, input.boxLength || 0);
    const W = Math.max(0, input.boxWidth || 0);
    const H = Math.max(0, input.boxHeight || 0);
    containerVol = L * W * H;

    const nx = Math.floor(L / (2 * r));
    const ny = Math.floor(W / (2 * r));
    const nz = Math.floor(H / (2 * r));
    const simpleCount = Math.max(0, nx * ny * nz);

    const fccCount = Math.max(simpleCount, Math.floor(simpleCount * 1.3));
    estimatedFit = Math.min(Math.floor((containerVol * 0.74048) / sphereVol), fccCount);
  } else if (input.containerType === 'cylinder') {
    const cr = Math.max(0, input.cylinderRadius || 0);
    const ch = Math.max(0, input.cylinderHeight || 0);
    containerVol = Math.PI * Math.pow(cr, 2) * ch;
    estimatedFit = Math.max(0, Math.floor((containerVol * 0.64) / sphereVol));
  } else {
    const R = Math.max(0, input.containerRadius || 0);
    containerVol = (4 / 3) * Math.PI * Math.pow(R, 3);
    if (R < r) {
      estimatedFit = 0;
    } else {
      estimatedFit = Math.max(0, Math.floor((containerVol * 0.64) / sphereVol));
    }
  }

  const fccFraction = 0.74048;
  const rcpFraction = 0.64;
  const simpleFraction = Math.PI / 6; // ~0.5236

  const maxTheoretical = containerVol > 0 ? Math.floor((containerVol * fccFraction) / sphereVol) : 0;
  const randomClose = containerVol > 0 ? Math.floor((containerVol * rcpFraction) / sphereVol) : 0;
  const simpleCubic = containerVol > 0 ? Math.floor((containerVol * simpleFraction) / sphereVol) : 0;

  const actualPackedVol = estimatedFit * sphereVol;
  const efficiency = containerVol > 0 ? (actualPackedVol / containerVol) * 100 : 0;
  const emptySpace = Math.max(0, containerVol - actualPackedVol);

  return {
    containerVolume: Number(containerVol.toFixed(3)),
    sphereVolume: Number(sphereVol.toFixed(4)),
    maxTheoreticalCount: maxTheoretical,
    randomCloseCount: randomClose,
    simpleCubicCount: simpleCubic,
    estimatedFitCount: estimatedFit,
    fccPackingFraction: fccFraction,
    rcpPackingFraction: rcpFraction,
    packingEfficiencyPercent: Number(efficiency.toFixed(2)),
    emptySpaceVolume: Number(emptySpace.toFixed(3)),
  };
}

// ==========================================
// 2. Cube Root Calculator
// ==========================================
export interface CubeRootResult {
  inputNumber: number;
  principalRoot: number;
  isPerfectCube: boolean;
  nearestLowerPerfectCube: number;
  nearestHigherPerfectCube: number;
  nearestLowerRoot: number;
  nearestHigherRoot: number;
  radicalExpression: string;
  complexRoots: { real: number; imag: number }[];
}

export function calculateCubeRoot(x: number, decimals: number = 6): CubeRootResult {
  const sign = x < 0 ? -1 : 1;
  const absX = Math.abs(x);
  const rawRoot = sign * Math.cbrt(absX);
  const roundedRoot = Math.round(rawRoot);
  const isPerfect = Math.pow(roundedRoot, 3) === x;

  const floorRoot = Math.floor(rawRoot);
  const ceilRoot = Math.ceil(rawRoot);

  const nearestLowerRoot = isPerfect ? roundedRoot : floorRoot;
  const nearestHigherRoot = isPerfect ? roundedRoot : ceilRoot;

  const lowerCube = Math.pow(nearestLowerRoot, 3);
  const higherCube = Math.pow(nearestHigherRoot, 3);

  const compReal = Number((-0.5 * rawRoot).toFixed(decimals));
  const compImag = Number(((Math.sqrt(3) / 2) * Math.abs(rawRoot)).toFixed(decimals));

  return {
    inputNumber: x,
    principalRoot: Number(rawRoot.toFixed(decimals)),
    isPerfectCube: isPerfect,
    nearestLowerPerfectCube: lowerCube,
    nearestHigherPerfectCube: higherCube,
    nearestLowerRoot,
    nearestHigherRoot,
    radicalExpression: `\\sqrt[3]{${x}} = ${Number(rawRoot.toFixed(decimals))}`,
    complexRoots: [
      { real: compReal, imag: compImag },
      { real: compReal, imag: -compImag },
    ],
  };
}

// ==========================================
// 3. Scientific Calculator Engine
// ==========================================
export interface ScientificOperationInput {
  operation:
    | 'sin'
    | 'cos'
    | 'tan'
    | 'asin'
    | 'acos'
    | 'atan'
    | 'sinh'
    | 'cosh'
    | 'tanh'
    | 'ln'
    | 'log10'
    | 'log2'
    | 'sqrt'
    | 'cbrt'
    | 'square'
    | 'cube'
    | 'exp'
    | 'factorial'
    | 'reciprocal';
  val: number;
  angleMode?: 'deg' | 'rad';
}

export function calculateScientificUnary(input: ScientificOperationInput): {
  result: number;
  error?: string;
} {
  const { operation, val, angleMode = 'deg' } = input;
  const toRad = angleMode === 'deg' ? (Math.PI / 180) : 1;
  const fromRad = angleMode === 'deg' ? (180 / Math.PI) : 1;

  try {
    switch (operation) {
      case 'sin': {
        const rad = val * toRad;
        const res = Math.sin(rad);
        return { result: Math.abs(res) < 1e-15 ? 0 : Number(res.toFixed(10)) };
      }
      case 'cos': {
        const rad = val * toRad;
        const res = Math.cos(rad);
        return { result: Math.abs(res) < 1e-15 ? 0 : Number(res.toFixed(10)) };
      }
      case 'tan': {
        const rad = val * toRad;
        if (Math.abs(Math.cos(rad)) < 1e-15) {
          return { result: NaN, error: 'Tangent undefined (vertical asymptote)' };
        }
        return { result: Number(Math.tan(rad).toFixed(10)) };
      }
      case 'asin': {
        if (val < -1 || val > 1) return { result: NaN, error: 'Domain error: [-1, 1]' };
        return { result: Number((Math.asin(val) * fromRad).toFixed(10)) };
      }
      case 'acos': {
        if (val < -1 || val > 1) return { result: NaN, error: 'Domain error: [-1, 1]' };
        return { result: Number((Math.acos(val) * fromRad).toFixed(10)) };
      }
      case 'atan': {
        return { result: Number((Math.atan(val) * fromRad).toFixed(10)) };
      }
      case 'sinh':
        return { result: Number(Math.sinh(val).toFixed(10)) };
      case 'cosh':
        return { result: Number(Math.cosh(val).toFixed(10)) };
      case 'tanh':
        return { result: Number(Math.tanh(val).toFixed(10)) };
      case 'ln':
        if (val <= 0) return { result: NaN, error: 'Natural log undefined for x <= 0' };
        return { result: Number(Math.log(val).toFixed(10)) };
      case 'log10':
        if (val <= 0) return { result: NaN, error: 'Log10 undefined for x <= 0' };
        return { result: Number(Math.log10(val).toFixed(10)) };
      case 'log2':
        if (val <= 0) return { result: NaN, error: 'Log2 undefined for x <= 0' };
        return { result: Number(Math.log2(val).toFixed(10)) };
      case 'sqrt':
        if (val < 0) return { result: NaN, error: 'Square root of negative number is complex' };
        return { result: Number(Math.sqrt(val).toFixed(10)) };
      case 'cbrt':
        return { result: Number(Math.cbrt(val).toFixed(10)) };
      case 'square':
        return { result: Number(Math.pow(val, 2).toFixed(10)) };
      case 'cube':
        return { result: Number(Math.pow(val, 3).toFixed(10)) };
      case 'exp':
        return { result: Number(Math.exp(val).toFixed(10)) };
      case 'reciprocal':
        if (val === 0) return { result: NaN, error: 'Division by zero' };
        return { result: Number((1 / val).toFixed(10)) };
      case 'factorial': {
        if (val < 0 || !Number.isInteger(val)) return { result: NaN, error: 'Factorial defined for non-negative integers' };
        if (val > 170) return { result: Infinity, error: 'Overflow (> 170!)' };
        let fact = 1;
        for (let i = 2; i <= val; i++) fact *= i;
        return { result: fact };
      }
      default:
        return { result: val };
    }
  } catch (err: any) {
    return { result: NaN, error: err.message };
  }
}

// ==========================================
// 4. Equation Solver Engine
// ==========================================
export type EquationSolverMode = 'linear' | 'quadratic' | 'system2x2';

export interface LinearEquationInput {
  a: number; // ax + b = 0
  b: number;
}

export interface QuadraticEquationInput {
  a: number; // ax^2 + bx + c = 0
  b: number;
  c: number;
}

export interface System2x2Input {
  a1: number; // a1*x + b1*y = c1
  b1: number;
  c1: number;
  a2: number; // a2*x + b2*y = c2
  b2: number;
  c2: number;
}

export interface EquationSolverResult {
  mode: EquationSolverMode;
  equationString: string;
  roots: {
    label: string;
    real: number;
    imag?: number;
    formatted: string;
  }[];
  discriminant?: number;
  steps: string[];
  status: 'unique' | 'infinite' | 'none' | 'complex';
}

export function solveLinearEquation(input: LinearEquationInput): EquationSolverResult {
  const { a, b } = input;
  const eq = `${a}x + (${b}) = 0`;
  const steps: string[] = [
    `Original equation: ${a}x + (${b}) = 0`,
    `Subtract ${b} from both sides: ${a}x = ${-b}`,
  ];

  if (a === 0) {
    if (b === 0) {
      return {
        mode: 'linear',
        equationString: eq,
        roots: [],
        steps: [...steps, `0 = 0 is always true.`],
        status: 'infinite',
      };
    } else {
      return {
        mode: 'linear',
        equationString: eq,
        roots: [],
        steps: [...steps, `0x = ${-b} has no solution.`],
        status: 'none',
      };
    }
  }

  const x = -b / a;
  steps.push(`Divide by ${a}: x = ${-b} / ${a} = ${Number(x.toFixed(6))}`);

  return {
    mode: 'linear',
    equationString: eq,
    roots: [{ label: 'x', real: Number(x.toFixed(6)), formatted: String(Number(x.toFixed(6))) }],
    steps,
    status: 'unique',
  };
}

export function solveQuadraticEquation(input: QuadraticEquationInput): EquationSolverResult {
  const { a, b, c } = input;
  const eq = `${a}x² + (${b})x + (${c}) = 0`;

  if (a === 0) {
    const lin = solveLinearEquation({ a: b, b: c });
    return { ...lin, mode: 'quadratic', equationString: eq };
  }

  const delta = Math.pow(b, 2) - 4 * a * c;
  const steps: string[] = [
    `Equation: ${a}x² + (${b})x + (${c}) = 0`,
    `Compute discriminant Δ = b² - 4ac = (${b})² - 4(${a})(${c}) = ${delta}`,
  ];

  if (delta > 0) {
    const sqrtD = Math.sqrt(delta);
    const x1 = (-b + sqrtD) / (2 * a);
    const x2 = (-b - sqrtD) / (2 * a);
    steps.push(`Δ > 0: Two distinct real roots.`);
    steps.push(`x₁ = (-(${b}) + √${delta}) / (2 · ${a}) = ${Number(x1.toFixed(6))}`);
    steps.push(`x₂ = (-(${b}) - √${delta}) / (2 · ${a}) = ${Number(x2.toFixed(6))}`);
    return {
      mode: 'quadratic',
      equationString: eq,
      discriminant: delta,
      roots: [
        { label: 'x₁', real: Number(x1.toFixed(6)), formatted: String(Number(x1.toFixed(6))) },
        { label: 'x₂', real: Number(x2.toFixed(6)), formatted: String(Number(x2.toFixed(6))) },
      ],
      steps,
      status: 'unique',
    };
  } else if (delta === 0) {
    const x = -b / (2 * a);
    steps.push(`Δ = 0: One repeated real root.`);
    steps.push(`x = -(${b}) / (2 · ${a}) = ${Number(x.toFixed(6))}`);
    return {
      mode: 'quadratic',
      equationString: eq,
      discriminant: delta,
      roots: [{ label: 'x', real: Number(x.toFixed(6)), formatted: String(Number(x.toFixed(6))) }],
      steps,
      status: 'unique',
    };
  } else {
    const realPart = -b / (2 * a);
    const imagPart = Math.sqrt(-delta) / (2 * Math.abs(a));
    const rFormatted = Number(realPart.toFixed(6));
    const iFormatted = Number(imagPart.toFixed(6));
    steps.push(`Δ < 0: Two complex conjugate roots.`);
    steps.push(`x = (-(${b}) ± i√${-delta}) / (2 · ${a})`);
    steps.push(`x₁ = ${rFormatted} + ${iFormatted}i`);
    steps.push(`x₂ = ${rFormatted} - ${iFormatted}i`);
    return {
      mode: 'quadratic',
      equationString: eq,
      discriminant: delta,
      roots: [
        { label: 'x₁', real: rFormatted, imag: iFormatted, formatted: `${rFormatted} + ${iFormatted}i` },
        { label: 'x₂', real: rFormatted, imag: -iFormatted, formatted: `${rFormatted} - ${iFormatted}i` },
      ],
      steps,
      status: 'complex',
    };
  }
}

export function solveSystem2x2(input: System2x2Input): EquationSolverResult {
  const { a1, b1, c1, a2, b2, c2 } = input;
  const eq = `${a1}x + ${b1}y = ${c1} ; ${a2}x + ${b2}y = ${c2}`;
  const D = a1 * b2 - a2 * b1;
  const Dx = c1 * b2 - c2 * b1;
  const Dy = a1 * c2 - a2 * c1;

  const steps: string[] = [
    `System: (1) ${a1}x + ${b1}y = ${c1} , (2) ${a2}x + ${b2}y = ${c2}`,
    `Cramer's Rule determinant D = (${a1})(${b2}) - (${a2})(${b1}) = ${D}`,
    `Dx = (${c1})(${b2}) - (${c2})(${b1}) = ${Dx}`,
    `Dy = (${a1})(${c2}) - (${a2})(${c1}) = ${Dy}`,
  ];

  if (D === 0) {
    if (Dx === 0 && Dy === 0) {
      steps.push(`D = 0 and Dx = Dy = 0: Infinitely many solutions.`);
      return { mode: 'system2x2', equationString: eq, roots: [], steps, status: 'infinite' };
    } else {
      steps.push(`D = 0 and Dx, Dy ≠ 0: No solution (parallel lines).`);
      return { mode: 'system2x2', equationString: eq, roots: [], steps, status: 'none' };
    }
  }

  const x = Dx / D;
  const y = Dy / D;
  steps.push(`x = Dx / D = ${Dx} / ${D} = ${Number(x.toFixed(6))}`);
  steps.push(`y = Dy / D = ${Dy} / ${D} = ${Number(y.toFixed(6))}`);

  return {
    mode: 'system2x2',
    equationString: eq,
    roots: [
      { label: 'x', real: Number(x.toFixed(6)), formatted: String(Number(x.toFixed(6))) },
      { label: 'y', real: Number(y.toFixed(6)), formatted: String(Number(y.toFixed(6))) },
    ],
    steps,
    status: 'unique',
  };
}

// ==========================================
// 5. Partial Fraction Decomposition
// ==========================================
export interface PartialFractionInput {
  p1: number; // P(x) = p1*x + p0
  p0: number;
  r1: number; // Q(x) = (x - r1)(x - r2)
  r2: number;
}

export interface PartialFractionResult {
  numeratorStr: string;
  denominatorStr: string;
  decompositionLatex: string;
  coefficientA: number;
  coefficientB: number;
  steps: string[];
  isRepeatedRoot: boolean;
}

export function calculatePartialFraction(input: PartialFractionInput): PartialFractionResult {
  const { p1, p0, r1, r2 } = input;
  const numStr = p1 === 0 ? `${p0}` : `${p1}x ${p0 >= 0 ? '+ ' + p0 : '- ' + Math.abs(p0)}`;
  const denStr = `(x - ${r1})(x - ${r2})`;

  const steps: string[] = [
    `Original rational expression: \\frac{${numStr}}{${denStr}}`,
  ];

  if (r1 === r2) {
    const A = p1;
    const B = p0 + A * r1;
    steps.push(`Denominator has repeated root r = ${r1}. Form: \\frac{A}{x - ${r1}} + \\frac{B}{(x - ${r1})^2}`);
    steps.push(`Comparing coefficients: A = ${A}, B = ${p0} + (${A})(${r1}) = ${B}`);
    const latex = `\\frac{${A}}{x - ${r1}} + \\frac{${B}}{(x - ${r1})^2}`;
    return {
      numeratorStr: numStr,
      denominatorStr: `(x - ${r1})^2`,
      decompositionLatex: latex,
      coefficientA: Number(A.toFixed(4)),
      coefficientB: Number(B.toFixed(4)),
      steps,
      isRepeatedRoot: true,
    };
  }

  const P_r1 = p1 * r1 + p0;
  const P_r2 = p1 * r2 + p0;
  const A = P_r1 / (r1 - r2);
  const B = P_r2 / (r2 - r1);

  steps.push(`Distinct linear roots: r₁ = ${r1}, r₂ = ${r2}. Form: \\frac{A}{x - ${r1}} + \\frac{B}{x - ${r2}}`);
  steps.push(`Heaviside Cover-up for A at x = ${r1}: A = \\frac{P(${r1})}{${r1} - ${r2}} = \\frac{${P_r1}}{${r1 - r2}} = ${Number(A.toFixed(4))}`);
  steps.push(`Heaviside Cover-up for B at x = ${r2}: B = \\frac{P(${r2})}{${r2} - ${r1}} = \\frac{${P_r2}}{${r2 - r1}} = ${Number(B.toFixed(4))}`);

  const signB = B >= 0 ? '+' : '-';
  const absB = Math.abs(Number(B.toFixed(4)));
  const latex = `\\frac{${Number(A.toFixed(4))}}{x - ${r1}} ${signB} \\frac{${absB}}{x - ${r2}}`;

  return {
    numeratorStr: numStr,
    denominatorStr: denStr,
    decompositionLatex: latex,
    coefficientA: Number(A.toFixed(4)),
    coefficientB: Number(B.toFixed(4)),
    steps,
    isRepeatedRoot: false,
  };
}

// ==========================================
// 6. Grade Calculator Engine
// ==========================================
export interface GradeItem {
  name: string;
  gradePercent: number;
  weightPercent: number;
}

export interface GradeCalculatorInput {
  items: GradeItem[];
  targetGradePercent?: number;
  finalExamWeightPercent?: number;
}

export interface GradeCalculatorResult {
  currentWeightedAverage: number;
  totalWeightEntered: number;
  letterGrade: string;
  gpaEquivalent: number;
  finalGradeNeeded?: number;
  isAchievable?: boolean;
}

export function calculateGrade(input: GradeCalculatorInput): GradeCalculatorResult {
  let totalWeightedScore = 0;
  let totalWeight = 0;

  for (const item of input.items) {
    if (item.weightPercent > 0) {
      totalWeightedScore += (item.gradePercent * item.weightPercent);
      totalWeight += item.weightPercent;
    }
  }

  const currentAverage = totalWeight > 0 ? totalWeightedScore / totalWeight : 0;

  let letter = 'F';
  let gpa = 0.0;
  if (currentAverage >= 93) { letter = 'A'; gpa = 4.0; }
  else if (currentAverage >= 90) { letter = 'A-'; gpa = 3.7; }
  else if (currentAverage >= 87) { letter = 'B+'; gpa = 3.3; }
  else if (currentAverage >= 83) { letter = 'B'; gpa = 3.0; }
  else if (currentAverage >= 80) { letter = 'B-'; gpa = 2.7; }
  else if (currentAverage >= 77) { letter = 'C+'; gpa = 2.3; }
  else if (currentAverage >= 73) { letter = 'C'; gpa = 2.0; }
  else if (currentAverage >= 70) { letter = 'C-'; gpa = 1.7; }
  else if (currentAverage >= 60) { letter = 'D'; gpa = 1.0; }

  let needed: number | undefined;
  let achievable: boolean | undefined;

  if (input.targetGradePercent !== undefined && input.finalExamWeightPercent && input.finalExamWeightPercent > 0) {
    const fw = input.finalExamWeightPercent;
    const currentWeightFraction = (100 - fw) / 100;
    needed = (input.targetGradePercent - (currentAverage * currentWeightFraction)) / (fw / 100);
    achievable = needed <= 100 && needed >= 0;
  }

  return {
    currentWeightedAverage: Number(currentAverage.toFixed(2)),
    totalWeightEntered: Number(totalWeight.toFixed(2)),
    letterGrade: letter,
    gpaEquivalent: gpa,
    finalGradeNeeded: needed !== undefined ? Number(needed.toFixed(2)) : undefined,
    isAchievable: achievable,
  };
}

// ==========================================
// 7. Student T Value Calculator
// ==========================================
export interface StudentTInput {
  df: number;
  alpha: number;
  tailType: 'one-tailed' | 'two-tailed';
  sampleT?: number;
}

export interface StudentTResult {
  df: number;
  alpha: number;
  tailType: 'one-tailed' | 'two-tailed';
  criticalT: number;
  pValue?: number;
}

function normalQuantile(p: number): number {
  if (p <= 0 || p >= 1) return 0;
  const a = [2.50662823884, -18.61500062529, 41.39119773534, -25.44106049637];
  const b = [-8.47351093090, 23.08336743743, -21.06224101826, 3.13082909833];
  const c = [0.33747548227, 0.97616901909, 0.16079797149, 0.02764388103, 0.00384057293, 0.00039518965, 0.00003217678];

  const y = p - 0.5;
  if (Math.abs(y) < 0.42) {
    const r = y * y;
    const num = y * (((a[3] * r + a[2]) * r + a[1]) * r + a[0]);
    const den = ((((b[3] * r + b[2]) * r + b[1]) * r + b[0]) * r + 1);
    return num / den;
  }
  let r = p > 0.5 ? 1 - p : p;
  r = Math.log(-Math.log(r));
  let x = c[0];
  for (let i = 1; i < c.length; i++) x += c[i] * Math.pow(r, i);
  return p > 0.5 ? x : -x;
}

export function calculateStudentT(input: StudentTInput): StudentTResult {
  const df = Math.max(1, input.df);
  const effectiveAlpha = input.tailType === 'two-tailed' ? input.alpha / 2 : input.alpha;
  const p = 1 - effectiveAlpha;

  const z = normalQuantile(p);
  const z2 = z * z;
  const z3 = z2 * z;
  const z5 = z3 * z2;

  const term1 = z;
  const term2 = (z3 + z) / (4 * df);
  const term3 = (5 * z5 + 16 * z3 + 3 * z) / (96 * Math.pow(df, 2));
  const critT = term1 + term2 + term3;

  let pVal: number | undefined;
  if (input.sampleT !== undefined) {
    const t = Math.abs(input.sampleT);
    const x = df / (df + t * t);
    const pOne = 0.5 * Math.pow(x, df / 2);
    pVal = input.tailType === 'two-tailed' ? Math.min(1, 2 * pOne) : pOne;
  }

  return {
    df,
    alpha: input.alpha,
    tailType: input.tailType,
    criticalT: Number(critT.toFixed(4)),
    pValue: pVal !== undefined ? Number(pVal.toFixed(4)) : undefined,
  };
}

// ==========================================
// 8. Chi Square Calculator
// ==========================================
export interface ChiSquareInput {
  observed: number[][];
}

export interface ChiSquareResult {
  chiSquare: number;
  df: number;
  pValue: number;
  cramersV: number;
  expected: number[][];
  rowTotals: number[];
  colTotals: number[];
  grandTotal: number;
  isSignificant: boolean;
}

export function calculateChiSquare(input: ChiSquareInput): ChiSquareResult {
  const obs = input.observed;
  const numRows = obs.length;
  const numCols = obs[0].length;

  const rowTotals = obs.map(row => row.reduce((acc, val) => acc + val, 0));
  const colTotals = Array(numCols).fill(0);
  let grandTotal = 0;

  for (let r = 0; r < numRows; r++) {
    for (let c = 0; c < numCols; c++) {
      colTotals[c] += obs[r][c];
      grandTotal += obs[r][c];
    }
  }

  const expected: number[][] = [];
  let chiSquare = 0;

  for (let r = 0; r < numRows; r++) {
    expected[r] = [];
    for (let c = 0; c < numCols; c++) {
      const exp = grandTotal > 0 ? (rowTotals[r] * colTotals[c]) / grandTotal : 0;
      expected[r][c] = Number(exp.toFixed(2));
      if (exp > 0) {
        chiSquare += Math.pow(obs[r][c] - exp, 2) / exp;
      }
    }
  }

  const df = (numRows - 1) * (numCols - 1);

  let pVal = 0.5;
  if (df > 0 && chiSquare > 0) {
    const s = 2 / (9 * df);
    const z = (Math.pow(chiSquare / df, 1 / 3) - (1 - s)) / Math.sqrt(s);
    const cdf = 0.5 * (1 + Math.sign(z) * Math.sqrt(1 - Math.exp(-2 * z * z / Math.PI)));
    pVal = Math.max(0, Math.min(1, 1 - cdf));
  }

  const minDim = Math.min(numRows - 1, numCols - 1);
  const cramersV = (grandTotal > 0 && minDim > 0)
    ? Math.sqrt(chiSquare / (grandTotal * minDim))
    : 0;

  return {
    chiSquare: Number(chiSquare.toFixed(4)),
    df,
    pValue: Number(pVal.toFixed(4)),
    cramersV: Number(cramersV.toFixed(4)),
    expected,
    rowTotals,
    colTotals,
    grandTotal,
    isSignificant: pVal < 0.05,
  };
}

// ==========================================
// 9. Heat Index Calculator
// ==========================================
export interface HeatIndexInput {
  temperature: number;
  humidity: number;
  unit?: 'F' | 'C';
}

export interface HeatIndexResult {
  heatIndexF: number;
  heatIndexC: number;
  dangerCategory: 'Normal' | 'Caution' | 'Extreme Caution' | 'Danger' | 'Extreme Danger';
  warningMessage: string;
  symptoms: string;
}

export function calculateHeatIndex(input: HeatIndexInput): HeatIndexResult {
  const unit = input.unit || 'F';
  let tF = unit === 'C' ? (input.temperature * 9) / 5 + 32 : input.temperature;
  const rh = Math.max(0, Math.min(100, input.humidity));

  let hiF = tF;

  if (tF < 80) {
    hiF = 0.5 * (tF + 61.0 + ((tF - 68.0) * 1.2) + (rh * 0.094));
  } else {
    hiF =
      -42.379 +
      2.04901523 * tF +
      10.14333127 * rh -
      0.22475541 * tF * rh -
      0.00683783 * Math.pow(tF, 2) -
      0.05481717 * Math.pow(rh, 2) +
      0.00122874 * Math.pow(tF, 2) * rh +
      0.00085282 * tF * Math.pow(rh, 2) -
      0.00000199 * Math.pow(tF, 2) * Math.pow(rh, 2);

    if (rh < 13 && tF >= 80 && tF <= 112) {
      const adj = ((13 - rh) / 4) * Math.sqrt((17 - Math.abs(tF - 95)) / 17);
      hiF -= adj;
    } else if (rh > 85 && tF >= 80 && tF <= 87) {
      const adj = ((rh - 85) / 10) * ((87 - tF) / 5);
      hiF += adj;
    }
  }

  const hiC = ((hiF - 32) * 5) / 9;

  let danger: 'Normal' | 'Caution' | 'Extreme Caution' | 'Danger' | 'Extreme Danger' = 'Normal';
  let warning = 'Normal conditions. Low risk of heat-related illness.';
  let symptoms = 'Minimal physiological stress during ordinary activity.';

  if (hiF >= 125) {
    danger = 'Extreme Danger';
    warning = 'Heat stroke imminent! Cease outdoor physical labor immediately.';
    symptoms = 'High probability of heat stroke or sunstroke with continued exposure.';
  } else if (hiF >= 104) {
    danger = 'Danger';
    warning = 'Heat cramps and heat exhaustion likely. Heat stroke possible with prolonged activity.';
    symptoms = 'Severe fatigue, dizziness, headache, nausea, rapid pulse.';
  } else if (hiF >= 91) {
    danger = 'Extreme Caution';
    warning = 'Heat cramps and heat exhaustion possible with prolonged exposure and physical activity.';
    symptoms = 'Profuse sweating, muscle spasms, thirst, lightheadedness.';
  } else if (hiF >= 80) {
    danger = 'Caution';
    warning = 'Fatigue possible with prolonged exposure and activity.';
    symptoms = 'Discomfort, lethargy, increased dehydration risk.';
  }

  return {
    heatIndexF: Number(hiF.toFixed(1)),
    heatIndexC: Number(hiC.toFixed(1)),
    dangerCategory: danger,
    warningMessage: warning,
    symptoms,
  };
}

// ==========================================
// 10. Inch to CM Converter
// ==========================================
export interface InchCmResult {
  inches: number;
  centimeters: number;
  millimeters: number;
  meters: number;
  feetAndInches: string;
  nearestFractionSixteenth: string;
  nearestFractionThirtySecond: string;
}

export function convertInchToCm(inches: number): InchCmResult {
  const cm = inches * 2.54;
  const mm = cm * 10;
  const m = cm / 100;

  const totalInches = Math.abs(inches);
  const ft = Math.floor(totalInches / 12);
  const remInches = totalInches % 12;

  const wholeInches = Math.floor(totalInches);
  const remainder = totalInches - wholeInches;
  const sixteenths = Math.round(remainder * 16);
  const frac16 = sixteenths === 16 ? `${wholeInches + 1}"` : sixteenths > 0 ? `${wholeInches} ${sixteenths}/16"` : `${wholeInches}"`;

  const thirtySeconds = Math.round(remainder * 32);
  const frac32 = thirtySeconds === 32 ? `${wholeInches + 1}"` : thirtySeconds > 0 ? `${wholeInches} ${thirtySeconds}/32"` : `${wholeInches}"`;

  return {
    inches: Number(inches.toFixed(4)),
    centimeters: Number(cm.toFixed(4)),
    millimeters: Number(mm.toFixed(2)),
    meters: Number(m.toFixed(5)),
    feetAndInches: `${ft}' ${Number(remInches.toFixed(2))}"`,
    nearestFractionSixteenth: frac16,
    nearestFractionThirtySecond: frac32,
  };
}

export function convertCmToInch(cm: number): InchCmResult {
  const inches = cm / 2.54;
  return convertInchToCm(inches);
}

// ==========================================
// 11. IP Subnet Calculator
// ==========================================
export interface IpSubnetInput {
  ipAddress: string;
  cidrPrefix: number;
}

export interface IpSubnetResult {
  ipAddress: string;
  cidrPrefix: number;
  subnetMask: string;
  wildcardMask: string;
  networkAddress: string;
  broadcastAddress: string;
  firstUsableIp: string;
  lastUsableIp: string;
  totalHosts: number;
  usableHosts: number;
  ipClass: string;
  scope: 'Private (RFC 1918)' | 'Public' | 'Loopback' | 'Link-Local' | 'Carrier-Grade NAT';
  binarySubnetMask: string;
}

function ipToLong(ip: string): number {
  const parts = ip.trim().split('.').map(Number);
  if (parts.length !== 4 || parts.some(p => isNaN(p) || p < 0 || p > 255)) {
    throw new Error('Invalid IPv4 address format');
  }
  return ((parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3]) >>> 0;
}

function longToIp(long: number): string {
  return [
    (long >>> 24) & 255,
    (long >>> 16) & 255,
    (long >>> 8) & 255,
    long & 255,
  ].join('.');
}

export function calculateIpSubnet(input: IpSubnetInput): IpSubnetResult {
  const prefix = Math.max(0, Math.min(32, input.cidrPrefix));
  const ipLong = ipToLong(input.ipAddress);

  const maskLong = prefix === 0 ? 0 : ((~0 << (32 - prefix)) >>> 0);
  const wildcardLong = (~maskLong) >>> 0;

  const networkLong = (ipLong & maskLong) >>> 0;
  const broadcastLong = (networkLong | wildcardLong) >>> 0;

  let firstUsableLong = networkLong;
  let lastUsableLong = broadcastLong;
  let totalHosts = Math.pow(2, 32 - prefix);
  let usableHosts = 0;

  if (prefix <= 30) {
    firstUsableLong = (networkLong + 1) >>> 0;
    lastUsableLong = (broadcastLong - 1) >>> 0;
    usableHosts = totalHosts - 2;
  } else if (prefix === 31) {
    firstUsableLong = networkLong;
    lastUsableLong = broadcastLong;
    usableHosts = 2;
  } else {
    firstUsableLong = networkLong;
    lastUsableLong = networkLong;
    usableHosts = 1;
  }

  const firstOctet = (ipLong >>> 24) & 255;
  let ipClass = 'Class A';
  if (firstOctet >= 128 && firstOctet <= 191) ipClass = 'Class B';
  else if (firstOctet >= 192 && firstOctet <= 223) ipClass = 'Class C';
  else if (firstOctet >= 224 && firstOctet <= 239) ipClass = 'Class D (Multicast)';
  else if (firstOctet >= 240) ipClass = 'Class E (Experimental)';

  let scope: 'Private (RFC 1918)' | 'Public' | 'Loopback' | 'Link-Local' | 'Carrier-Grade NAT' = 'Public';
  if (firstOctet === 10) scope = 'Private (RFC 1918)';
  else if (firstOctet === 172 && ((ipLong >>> 16) & 255) >= 16 && ((ipLong >>> 16) & 255) <= 31) scope = 'Private (RFC 1918)';
  else if (firstOctet === 192 && ((ipLong >>> 16) & 255) === 168) scope = 'Private (RFC 1918)';
  else if (firstOctet === 127) scope = 'Loopback';
  else if (firstOctet === 169 && ((ipLong >>> 16) & 255) === 254) scope = 'Link-Local';
  else if (firstOctet === 100 && ((ipLong >>> 16) & 255) >= 64 && ((ipLong >>> 16) & 255) <= 127) scope = 'Carrier-Grade NAT';

  const binaryMask = [
    ((maskLong >>> 24) & 255).toString(2).padStart(8, '0'),
    ((maskLong >>> 16) & 255).toString(2).padStart(8, '0'),
    ((maskLong >>> 8) & 255).toString(2).padStart(8, '0'),
    (maskLong & 255).toString(2).padStart(8, '0'),
  ].join('.');

  return {
    ipAddress: longToIp(ipLong),
    cidrPrefix: prefix,
    subnetMask: longToIp(maskLong),
    wildcardMask: longToIp(wildcardLong),
    networkAddress: longToIp(networkLong),
    broadcastAddress: longToIp(broadcastLong),
    firstUsableIp: longToIp(firstUsableLong),
    lastUsableIp: longToIp(lastUsableLong),
    totalHosts,
    usableHosts,
    ipClass,
    scope,
    binarySubnetMask: binaryMask,
  };
}

// ==========================================
// 12. Bin Packing Calculator (1D)
// ==========================================
export interface BinPackingInput {
  binCapacity: number;
  itemWeights: number[];
}

export interface PackedBin {
  binIndex: number;
  items: number[];
  usedCapacity: number;
  freeCapacity: number;
}

export interface BinPackingResult {
  binCapacity: number;
  totalItems: number;
  totalWeight: number;
  theoreticalMinBins: number;
  firstFitBins: PackedBin[];
  firstFitDecreasingBins: PackedBin[];
  bestFitDecreasingBins: PackedBin[];
  firstFitCount: number;
  ffdCount: number;
  bfdCount: number;
  ffdEfficiencyPercent: number;
}

export function calculateBinPacking(input: BinPackingInput): BinPackingResult {
  const cap = Math.max(1, input.binCapacity);
  const items = input.itemWeights.filter(w => w > 0 && w <= cap);
  const totalWeight = items.reduce((a, b) => a + b, 0);
  const minBins = Math.ceil(totalWeight / cap);

  function runFirstFit(arr: number[]): PackedBin[] {
    const bins: { items: number[]; used: number }[] = [];
    for (const w of arr) {
      let placed = false;
      for (const bin of bins) {
        if (bin.used + w <= cap) {
          bin.items.push(w);
          bin.used += w;
          placed = true;
          break;
        }
      }
      if (!placed) {
        bins.push({ items: [w], used: w });
      }
    }
    return bins.map((b, i) => ({
      binIndex: i + 1,
      items: b.items,
      usedCapacity: Number(b.used.toFixed(2)),
      freeCapacity: Number((cap - b.used).toFixed(2)),
    }));
  }

  const sortedDesc = [...items].sort((a, b) => b - a);
  const ffdBins = runFirstFit(sortedDesc);
  const ffBins = runFirstFit(items);

  function runBestFitDecreasing(arr: number[]): PackedBin[] {
    const bins: { items: number[]; used: number }[] = [];
    for (const w of arr) {
      let bestIndex = -1;
      let minRemaining = Infinity;

      for (let i = 0; i < bins.length; i++) {
        const rem = cap - (bins[i].used + w);
        if (rem >= 0 && rem < minRemaining) {
          minRemaining = rem;
          bestIndex = i;
        }
      }

      if (bestIndex !== -1) {
        bins[bestIndex].items.push(w);
        bins[bestIndex].used += w;
      } else {
        bins.push({ items: [w], used: w });
      }
    }
    return bins.map((b, i) => ({
      binIndex: i + 1,
      items: b.items,
      usedCapacity: Number(b.used.toFixed(2)),
      freeCapacity: Number((cap - b.used).toFixed(2)),
    }));
  }

  const bfdBins = runBestFitDecreasing(sortedDesc);
  const ffdCount = ffdBins.length;
  const totalCapacityUsed = ffdCount * cap;
  const efficiency = totalCapacityUsed > 0 ? (totalWeight / totalCapacityUsed) * 100 : 0;

  return {
    binCapacity: cap,
    totalItems: items.length,
    totalWeight: Number(totalWeight.toFixed(2)),
    theoreticalMinBins: minBins,
    firstFitBins: ffBins,
    firstFitDecreasingBins: ffdBins,
    bestFitDecreasingBins: bfdBins,
    firstFitCount: ffBins.length,
    ffdCount,
    bfdCount: bfdBins.length,
    ffdEfficiencyPercent: Number(efficiency.toFixed(2)),
  };
}
