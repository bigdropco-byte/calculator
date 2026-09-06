/**
 * Algebra, Powers, Roots, Trigonometry, and Logarithms Calculation Engines
 */

// ==========================================
// 1. Equations Suite
// ==========================================

export interface LinearEquationDetailedResult {
  a: number;
  b: number;
  c: number;
  equationString: string;
  solution: number | null;
  status: 'unique' | 'infinite' | 'none';
  steps: string[];
}

export function solveLinearEquationDetailed(a: number, b: number, c: number = 0): LinearEquationDetailedResult {
  const steps: string[] = [];
  const eqStr = `${a}x + (${b}) = ${c}`;
  steps.push(`Original equation: ${eqStr}`);

  // ax + b = c  => ax = c - b
  const rhs = c - b;
  steps.push(`Subtract ${b} from both sides: ${a}x = ${c} - (${b}) = ${rhs}`);

  if (a === 0) {
    if (rhs === 0) {
      steps.push(`0 = 0 is an identity. There are infinitely many solutions (any real x).`);
      return { a, b, c, equationString: eqStr, solution: null, status: 'infinite', steps };
    } else {
      steps.push(`0x = ${rhs} is impossible. No solution exists.`);
      return { a, b, c, equationString: eqStr, solution: null, status: 'none', steps };
    }
  }

  const x = rhs / a;
  steps.push(`Divide both sides by ${a}: x = ${rhs} / ${a} = ${Number(x.toFixed(6))}`);

  return {
    a,
    b,
    c,
    equationString: eqStr,
    solution: Number(x.toFixed(6)),
    status: 'unique',
    steps,
  };
}

export interface QuadraticEquationDetailedResult {
  a: number;
  b: number;
  c: number;
  equationString: string;
  discriminant: number;
  vertex: { h: number; k: number };
  axisOfSymmetry: number;
  yIntercept: number;
  roots: {
    real: number;
    imag?: number;
    formatted: string;
  }[];
  natureOfRoots: 'two-real' | 'one-real' | 'complex';
  steps: string[];
}

export function solveQuadraticEquationDetailed(a: number, b: number, c: number): QuadraticEquationDetailedResult {
  const steps: string[] = [];
  const eqStr = `${a}x² + (${b})x + (${c}) = 0`;
  steps.push(`Standard form: ax² + bx + c = 0 → ${eqStr}`);

  if (a === 0) {
    throw new Error('Coefficient "a" cannot be zero in a quadratic equation.');
  }

  const delta = b * b - 4 * a * c;
  steps.push(`Discriminant: Δ = b² - 4ac = (${b})² - 4(${a})(${c}) = ${delta}`);

  const h = -b / (2 * a);
  const k = c - (b * b) / (4 * a);
  steps.push(`Vertex: (h, k) = (-b / 2a, f(h)) = (${Number(h.toFixed(4))}, ${Number(k.toFixed(4))})`);

  let nature: QuadraticEquationDetailedResult['natureOfRoots'] = 'two-real';
  const roots: QuadraticEquationDetailedResult['roots'] = [];

  if (delta > 0) {
    nature = 'two-real';
    const sqrtD = Math.sqrt(delta);
    const x1 = (-b + sqrtD) / (2 * a);
    const x2 = (-b - sqrtD) / (2 * a);
    steps.push(`Δ > 0: Two distinct real roots.`);
    steps.push(`x₁ = (-(${b}) + √${delta}) / (2 × ${a}) = ${Number(x1.toFixed(6))}`);
    steps.push(`x₂ = (-(${b}) - √${delta}) / (2 × ${a}) = ${Number(x2.toFixed(6))}`);
    roots.push({ real: Number(x1.toFixed(6)), formatted: String(Number(x1.toFixed(6))) });
    roots.push({ real: Number(x2.toFixed(6)), formatted: String(Number(x2.toFixed(6))) });
  } else if (delta === 0) {
    nature = 'one-real';
    const x = -b / (2 * a);
    steps.push(`Δ = 0: Exactly one repeated real root.`);
    steps.push(`x = -(${b}) / (2 × ${a}) = ${Number(x.toFixed(6))}`);
    roots.push({ real: Number(x.toFixed(6)), formatted: String(Number(x.toFixed(6))) });
  } else {
    nature = 'complex';
    const realPart = -b / (2 * a);
    const imagPart = Math.sqrt(-delta) / (2 * Math.abs(a));
    const rFormatted = Number(realPart.toFixed(6));
    const iFormatted = Number(imagPart.toFixed(6));
    steps.push(`Δ < 0: Two complex conjugate roots.`);
    steps.push(`x = (-(${b}) ± i√${-delta}) / (2 × ${a})`);
    steps.push(`x₁ = ${rFormatted} + ${iFormatted}i`);
    steps.push(`x₂ = ${rFormatted} - ${iFormatted}i`);
    roots.push({ real: rFormatted, imag: iFormatted, formatted: `${rFormatted} + ${iFormatted}i` });
    roots.push({ real: rFormatted, imag: -iFormatted, formatted: `${rFormatted} - ${iFormatted}i` });
  }

  return {
    a,
    b,
    c,
    equationString: eqStr,
    discriminant: delta,
    vertex: { h: Number(h.toFixed(4)), k: Number(k.toFixed(4)) },
    axisOfSymmetry: Number(h.toFixed(4)),
    yIntercept: c,
    roots,
    natureOfRoots: nature,
    steps,
  };
}

export interface System3x3Result {
  x: number | null;
  y: number | null;
  z?: number | null;
  detD: number;
  status: 'unique' | 'infinite' | 'none';
  steps: string[];
}

export function solveSystem2x2Detailed(
  a1: number,
  b1: number,
  c1: number,
  a2: number,
  b2: number,
  c2: number
): System3x3Result {
  const steps: string[] = [];
  steps.push(`System of 2 linear equations:`);
  steps.push(`(1) ${a1}x + ${b1}y = ${c1}`);
  steps.push(`(2) ${a2}x + ${b2}y = ${c2}`);

  const D = a1 * b2 - a2 * b1;
  const Dx = c1 * b2 - c2 * b1;
  const Dy = a1 * c2 - a2 * c1;

  steps.push(`Main Determinant D = (${a1})(${b2}) - (${a2})(${b1}) = ${D}`);
  steps.push(`x-Determinant Dx = (${c1})(${b2}) - (${c2})(${b1}) = ${Dx}`);
  steps.push(`y-Determinant Dy = (${a1})(${c2}) - (${a2})(${c1}) = ${Dy}`);

  if (D === 0) {
    if (Dx === 0 && Dy === 0) {
      steps.push(`Since D = 0 and Dx = Dy = 0, there are infinitely many solutions (coincident lines).`);
      return { x: null, y: null, detD: 0, status: 'infinite', steps };
    } else {
      steps.push(`Since D = 0 but Dx, Dy ≠ 0, there is no solution (parallel lines).`);
      return { x: null, y: null, detD: 0, status: 'none', steps };
    }
  }

  const x = Dx / D;
  const y = Dy / D;

  steps.push(`Apply Cramer's Rule:`);
  steps.push(`x = Dx / D = ${Dx} / ${D} = ${Number(x.toFixed(6))}`);
  steps.push(`y = Dy / D = ${Dy} / ${D} = ${Number(y.toFixed(6))}`);

  return {
    x: Number(x.toFixed(6)),
    y: Number(y.toFixed(6)),
    detD: D,
    status: 'unique',
    steps,
  };
}

export function solveSystem3x3Detailed(
  m: number[][] // 3 rows, 4 columns: [a, b, c, d] for ax + by + cz = d
): System3x3Result {
  const steps: string[] = [];
  steps.push(`3x3 System of equations using Cramer's Rule`);

  // Determinant of 3x3 matrix
  const det3 = (a: number[][]): number => {
    return (
      a[0][0] * (a[1][1] * a[2][2] - a[1][2] * a[2][1]) -
      a[0][1] * (a[1][0] * a[2][2] - a[1][2] * a[2][0]) +
      a[0][2] * (a[1][0] * a[2][1] - a[1][1] * a[2][0])
    );
  };

  const matA = [
    [m[0][0], m[0][1], m[0][2]],
    [m[1][0], m[1][1], m[1][2]],
    [m[2][0], m[2][1], m[2][2]],
  ];

  const D = det3(matA);
  steps.push(`Coefficient Determinant D = ${D}`);

  const matX = [
    [m[0][3], m[0][1], m[0][2]],
    [m[1][3], m[1][1], m[1][2]],
    [m[2][3], m[2][1], m[2][2]],
  ];
  const matY = [
    [m[0][0], m[0][3], m[0][2]],
    [m[1][0], m[1][3], m[1][2]],
    [m[2][0], m[2][3], m[2][2]],
  ];
  const matZ = [
    [m[0][0], m[0][1], m[0][3]],
    [m[1][0], m[1][1], m[1][3]],
    [m[2][0], m[2][1], m[2][3]],
  ];

  const Dx = det3(matX);
  const Dy = det3(matY);
  const Dz = det3(matZ);

  steps.push(`Dx = ${Dx}, Dy = ${Dy}, Dz = ${Dz}`);

  if (Math.abs(D) < 1e-12) {
    if (Math.abs(Dx) < 1e-12 && Math.abs(Dy) < 1e-12 && Math.abs(Dz) < 1e-12) {
      steps.push(`D = 0 and Dx = Dy = Dz = 0: System has infinitely many solutions.`);
      return { x: null, y: null, z: null, detD: 0, status: 'infinite', steps };
    }
    steps.push(`D = 0: System is inconsistent and has no solution.`);
    return { x: null, y: null, z: null, detD: 0, status: 'none', steps };
  }

  const x = Dx / D;
  const y = Dy / D;
  const z = Dz / D;

  steps.push(`x = Dx / D = ${Dx} / ${D} = ${Number(x.toFixed(6))}`);
  steps.push(`y = Dy / D = ${Dy} / ${D} = ${Number(y.toFixed(6))}`);
  steps.push(`z = Dz / D = ${Dz} / ${D} = ${Number(z.toFixed(6))}`);

  return {
    x: Number(x.toFixed(6)),
    y: Number(y.toFixed(6)),
    z: Number(z.toFixed(6)),
    detD: D,
    status: 'unique',
    steps,
  };
}

// ==========================================
// 2. Average Suite
// ==========================================

export interface ArithmeticMeanResult {
  count: number;
  sum: number;
  mean: number;
  median: number;
  variance: number;
  standardDeviation: number;
  steps: string[];
}

export function calculateArithmeticMean(numbers: number[]): ArithmeticMeanResult {
  const steps: string[] = [];
  const valid = numbers.filter((n) => !isNaN(n));
  const n = valid.length;

  if (n === 0) {
    return { count: 0, sum: 0, mean: 0, median: 0, variance: 0, standardDeviation: 0, steps: ['No valid numbers provided.'] };
  }

  const sum = valid.reduce((acc, v) => acc + v, 0);
  const mean = sum / n;

  steps.push(`Total items (n) = ${n}`);
  steps.push(`Sum of elements: Σx = ${valid.join(' + ')} = ${sum}`);
  steps.push(`Arithmetic Mean: x̄ = (Σx) / n = ${sum} / ${n} = ${Number(mean.toFixed(6))}`);

  // Median
  const sorted = [...valid].sort((a, b) => a - b);
  let median = 0;
  if (n % 2 === 1) {
    median = sorted[Math.floor(n / 2)];
  } else {
    median = (sorted[n / 2 - 1] + sorted[n / 2]) / 2;
  }
  steps.push(`Sorted dataset: [${sorted.join(', ')}] → Median = ${median}`);

  // Variance & standard deviation
  const sumSqDiff = valid.reduce((acc, v) => acc + Math.pow(v - mean, 2), 0);
  const variance = sumSqDiff / n;
  const stdDev = Math.sqrt(variance);

  steps.push(`Population Variance: σ² = (Σ(x - x̄)²) / n = ${Number(variance.toFixed(6))}`);
  steps.push(`Standard Deviation: σ = √σ² = ${Number(stdDev.toFixed(6))}`);

  return {
    count: n,
    sum: Number(sum.toFixed(6)),
    mean: Number(mean.toFixed(6)),
    median: Number(median.toFixed(6)),
    variance: Number(variance.toFixed(6)),
    standardDeviation: Number(stdDev.toFixed(6)),
    steps,
  };
}

export interface WeightedMeanResult {
  items: { value: number; weight: number; product: number; normalizedWeightPercent: number }[];
  totalWeight: number;
  sumOfProducts: number;
  weightedMean: number;
  steps: string[];
}

export function calculateWeightedMean(data: { value: number; weight: number }[]): WeightedMeanResult {
  const steps: string[] = [];
  const valid = data.filter((d) => !isNaN(d.value) && !isNaN(d.weight) && d.weight >= 0);

  const totalWeight = valid.reduce((acc, d) => acc + d.weight, 0);
  const sumOfProducts = valid.reduce((acc, d) => acc + d.value * d.weight, 0);

  if (totalWeight === 0) {
    return { items: [], totalWeight: 0, sumOfProducts: 0, weightedMean: 0, steps: ['Total weight must be greater than zero.'] };
  }

  const weightedMean = sumOfProducts / totalWeight;

  steps.push(`Sum of products: Σ(w_i × x_i) = ${Number(sumOfProducts.toFixed(4))}`);
  steps.push(`Total weights: Σw_i = ${Number(totalWeight.toFixed(4))}`);
  steps.push(`Weighted Arithmetic Mean: x̄_w = (Σ(w_i × x_i)) / (Σw_i) = ${Number(sumOfProducts.toFixed(4))} / ${Number(totalWeight.toFixed(4))} = ${Number(weightedMean.toFixed(6))}`);

  const items = valid.map((d) => ({
    value: d.value,
    weight: d.weight,
    product: Number((d.value * d.weight).toFixed(4)),
    normalizedWeightPercent: Number(((d.weight / totalWeight) * 100).toFixed(2)),
  }));

  return {
    items,
    totalWeight: Number(totalWeight.toFixed(4)),
    sumOfProducts: Number(sumOfProducts.toFixed(4)),
    weightedMean: Number(weightedMean.toFixed(6)),
    steps,
  };
}

// ==========================================
// 3. Powers and Roots Suite
// ==========================================

export interface PowerResult {
  base: number;
  exponent: number;
  result: number;
  scientificNotation: string;
  isNegativeBase: boolean;
  steps: string[];
}

export function calculatePower(base: number, exponent: number): PowerResult {
  const res = Math.pow(base, exponent);
  const steps: string[] = [];

  steps.push(`Base b = ${base}, Exponent n = ${exponent}`);
  if (exponent === 2) {
    steps.push(`Squaring: ${base}² = ${base} × ${base} = ${res}`);
  } else if (exponent === 3) {
    steps.push(`Cubing: ${base}³ = ${base} × ${base} × ${base} = ${res}`);
  } else if (exponent === 0) {
    steps.push(`Any non-zero number raised to the power of 0 equals 1: ${base}⁰ = 1`);
  } else if (exponent < 0) {
    steps.push(`Negative exponent rule: b^(-n) = 1 / b^n`);
    steps.push(`${base}^(${exponent}) = 1 / (${base}^${Math.abs(exponent)}) = ${res}`);
  } else {
    steps.push(`Power rule: ${base}^${exponent} = ${res}`);
  }

  return {
    base,
    exponent,
    result: res,
    scientificNotation: res.toExponential(4),
    isNegativeBase: base < 0,
    steps,
  };
}

export function calculateSquareNumber(x: number): PowerResult {
  return calculatePower(x, 2);
}

export function calculateCubeNumber(x: number): PowerResult {
  return calculatePower(x, 3);
}

export interface RootResult {
  radicand: number;
  degree: number;
  principalRoot: number;
  isPerfect: boolean;
  isReal: boolean;
  simplifiedRadical?: string;
  complexRoot?: string;
  steps: string[];
}

export function calculateSquareRoot(x: number): RootResult {
  const steps: string[] = [];

  if (x < 0) {
    const absX = Math.abs(x);
    const rootAbs = Math.sqrt(absX);
    steps.push(`Negative radicand x = ${x}`);
    steps.push(`Principal imaginary root: √(${x}) = √(-1 × ${absX}) = i√${absX} = ${Number(rootAbs.toFixed(6))}i`);

    return {
      radicand: x,
      degree: 2,
      principalRoot: NaN,
      isPerfect: false,
      isReal: false,
      complexRoot: `±${Number(rootAbs.toFixed(6))}i`,
      steps,
    };
  }

  const root = Math.sqrt(x);
  const rounded = Math.round(root);
  const isPerfect = rounded * rounded === x;

  steps.push(`Radicand x = ${x}`);
  steps.push(`Principal Square Root: √${x} = ${Number(root.toFixed(6))}`);
  if (isPerfect) {
    steps.push(`${x} is a perfect square (${rounded}² = ${x}).`);
  } else {
    // Simplify radical
    let outside = 1;
    let inside = Math.round(x);
    if (Number.isInteger(x)) {
      for (let i = 2; i * i <= inside; i++) {
        while (inside % (i * i) === 0) {
          outside *= i;
          inside /= i * i;
        }
      }
    }
    if (outside > 1) {
      steps.push(`Simplified radical form: ${outside}√${inside}`);
    }
  }

  return {
    radicand: x,
    degree: 2,
    principalRoot: Number(root.toFixed(6)),
    isPerfect,
    isReal: true,
    steps,
  };
}

export function calculateNthRoot(radicand: number, degree: number): RootResult {
  const n = degree;
  const x = radicand;
  const steps: string[] = [];

  if (n === 0) throw new Error('Degree of root cannot be 0.');

  steps.push(`Radicand x = ${x}, Degree n = ${n}`);

  if (x < 0 && n % 2 === 0) {
    steps.push(`Even root of a negative number has no real solution; roots are complex numbers.`);
    return {
      radicand: x,
      degree: n,
      principalRoot: NaN,
      isPerfect: false,
      isReal: false,
      complexRoot: 'Complex',
      steps,
    };
  }

  const sign = x < 0 ? -1 : 1;
  const root = sign * Math.pow(Math.abs(x), 1 / n);
  const rounded = Math.round(root);
  const isPerfect = Math.pow(rounded, n) === x;

  steps.push(`Principal root: ⁿ√x = x^(1/n) = ${Number(root.toFixed(6))}`);
  if (isPerfect) {
    steps.push(`${x} is an exact ${n}th power (${rounded}^${n} = ${x}).`);
  }

  return {
    radicand: x,
    degree: n,
    principalRoot: Number(root.toFixed(6)),
    isPerfect,
    isReal: true,
    steps,
  };
}

// ==========================================
// 4. Trigonometric Suite
// ==========================================

export interface TrigResult {
  functionName: 'sin' | 'cos' | 'tan' | 'cot';
  angleInput: number;
  angleMode: 'deg' | 'rad';
  angleInDegrees: number;
  angleInRadians: number;
  value: number;
  isUndefined: boolean;
  exactValueLabel?: string;
  unitCircleCoordinates: { x: number; y: number };
  steps: string[];
}

export function calculateTrigonometric(
  fn: 'sin' | 'cos' | 'tan' | 'cot',
  angle: number,
  mode: 'deg' | 'rad' = 'deg'
): TrigResult {
  const steps: string[] = [];
  const deg = mode === 'deg' ? angle : (angle * 180) / Math.PI;
  const rad = mode === 'rad' ? angle : (angle * Math.PI) / 180;

  // Normalized angle [0, 360)
  const normDeg = ((deg % 360) + 360) % 360;

  steps.push(`Input: ${fn}(${angle}${mode === 'deg' ? '°' : ' rad'})`);
  steps.push(`Equivalent: ${Number(deg.toFixed(4))}° = ${Number(rad.toFixed(4))} rad`);

  const cosVal = Math.cos(rad);
  const sinVal = Math.sin(rad);

  const cleanCos = Math.abs(cosVal) < 1e-15 ? 0 : cosVal;
  const cleanSin = Math.abs(sinVal) < 1e-15 ? 0 : sinVal;

  let val = 0;
  let isUndefined = false;
  let exactLabel: string | undefined;

  // Special angle exact labels
  const specialAngles: Record<number, { sin: string; cos: string; tan: string; cot: string }> = {
    0: { sin: '0', cos: '1', tan: '0', cot: 'Undefined' },
    30: { sin: '1/2', cos: '√3/2', tan: '√3/3', cot: '√3' },
    45: { sin: '√2/2', cos: '√2/2', tan: '1', cot: '1' },
    60: { sin: '√3/2', cos: '1/2', tan: '√3', cot: '√3/3' },
    90: { sin: '1', cos: '0', tan: 'Undefined', cot: '0' },
    180: { sin: '0', cos: '-1', tan: '0', cot: 'Undefined' },
    270: { sin: '-1', cos: '0', tan: 'Undefined', cot: '0' },
    360: { sin: '0', cos: '1', tan: '0', cot: 'Undefined' },
  };

  const roundedDeg = Math.round(normDeg);
  if (Math.abs(normDeg - roundedDeg) < 1e-4 && specialAngles[roundedDeg]) {
    exactLabel = specialAngles[roundedDeg][fn];
  }

  if (fn === 'sin') {
    val = cleanSin;
    steps.push(`sin(θ) = y-coordinate on unit circle = ${Number(val.toFixed(6))}`);
  } else if (fn === 'cos') {
    val = cleanCos;
    steps.push(`cos(θ) = x-coordinate on unit circle = ${Number(val.toFixed(6))}`);
  } else if (fn === 'tan') {
    if (Math.abs(cleanCos) < 1e-12) {
      isUndefined = true;
      val = NaN;
      steps.push(`cos(θ) = 0 → tan(θ) = sin(θ)/cos(θ) is undefined (vertical asymptote).`);
    } else {
      val = cleanSin / cleanCos;
      steps.push(`tan(θ) = sin(θ) / cos(θ) = ${Number(cleanSin.toFixed(4))} / ${Number(cleanCos.toFixed(4))} = ${Number(val.toFixed(6))}`);
    }
  } else if (fn === 'cot') {
    if (Math.abs(cleanSin) < 1e-12) {
      isUndefined = true;
      val = NaN;
      steps.push(`sin(θ) = 0 → cot(θ) = cos(θ)/sin(θ) is undefined (vertical asymptote).`);
    } else {
      val = cleanCos / cleanSin;
      steps.push(`cot(θ) = cos(θ) / sin(θ) = 1 / tan(θ) = ${Number(cleanCos.toFixed(4))} / ${Number(cleanSin.toFixed(4))} = ${Number(val.toFixed(6))}`);
    }
  }

  if (exactLabel) {
    steps.push(`Exact Value: ${exactLabel}`);
  }

  return {
    functionName: fn,
    angleInput: angle,
    angleMode: mode,
    angleInDegrees: Number(deg.toFixed(4)),
    angleInRadians: Number(rad.toFixed(4)),
    value: isUndefined ? NaN : Number(val.toFixed(6)),
    isUndefined,
    exactValueLabel: exactLabel,
    unitCircleCoordinates: {
      x: Number(cleanCos.toFixed(4)),
      y: Number(cleanSin.toFixed(4)),
    },
    steps,
  };
}

// ==========================================
// 5. Logarithms Suite
// ==========================================

export interface LogarithmResult {
  argument: number;
  base: number;
  result: number;
  naturalLogOfArg: number;
  naturalLogOfBase: number;
  exponentialForm: string;
  steps: string[];
}

export function calculateLogarithm(x: number, base: number = 10): LogarithmResult {
  const steps: string[] = [];

  if (x <= 0) {
    throw new Error('Logarithm argument x must be strictly greater than 0.');
  }
  if (base <= 0 || base === 1) {
    throw new Error('Logarithm base must be positive and not equal to 1.');
  }

  const lnX = Math.log(x);
  const lnBase = Math.log(base);
  const result = lnX / lnBase;

  steps.push(`Expression: log_${base}(${x})`);
  steps.push(`Change of Base Formula: log_b(x) = ln(x) / ln(b)`);
  steps.push(`ln(${x}) = ${Number(lnX.toFixed(6))}`);
  steps.push(`ln(${base}) = ${Number(lnBase.toFixed(6))}`);
  steps.push(`log_${base}(${x}) = ${Number(lnX.toFixed(6))} / ${Number(lnBase.toFixed(6))} = ${Number(result.toFixed(6))}`);
  steps.push(`Equivalent exponential form: ${base}^(${Number(result.toFixed(6))}) ≈ ${x}`);

  return {
    argument: x,
    base,
    result: Number(result.toFixed(6)),
    naturalLogOfArg: Number(lnX.toFixed(6)),
    naturalLogOfBase: Number(lnBase.toFixed(6)),
    exponentialForm: `${base}^(${Number(result.toFixed(6))}) = ${x}`,
    steps,
  };
}

export function calculateNaturalLogarithm(x: number): LogarithmResult {
  return calculateLogarithm(x, Math.E);
}

export function calculateCommonLogarithm(x: number): LogarithmResult {
  return calculateLogarithm(x, 10);
}
