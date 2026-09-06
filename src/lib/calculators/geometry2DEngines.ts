/**
 * 2D Geometry Calculation Engines
 * Area, Perimeter, Diagonals, Radii, and Step-by-Step Geometry
 */

export interface CircleResult {
  radius: number;
  diameter: number;
  circumference: number;
  area: number;
  arcLength?: number;
  sectorArea?: number;
  steps: string[];
}

export function calculateCircle(params: {
  radius?: number;
  diameter?: number;
  circumference?: number;
  area?: number;
  centralAngleDeg?: number;
}): CircleResult {
  let r = 0;
  const steps: string[] = [];

  if (params.radius !== undefined && params.radius > 0) {
    r = params.radius;
    steps.push(`Given radius r = ${r}`);
  } else if (params.diameter !== undefined && params.diameter > 0) {
    r = params.diameter / 2;
    steps.push(`Given diameter d = ${params.diameter} → radius r = d / 2 = ${r}`);
  } else if (params.circumference !== undefined && params.circumference > 0) {
    r = params.circumference / (2 * Math.PI);
    steps.push(`Given circumference C = ${params.circumference} → radius r = C / (2π) = ${Number(r.toFixed(4))}`);
  } else if (params.area !== undefined && params.area > 0) {
    r = Math.sqrt(params.area / Math.PI);
    steps.push(`Given area A = ${params.area} → radius r = √(A / π) = ${Number(r.toFixed(4))}`);
  } else {
    r = 1; // default fallback
    steps.push(`Default radius r = 1`);
  }

  const d = 2 * r;
  const c = 2 * Math.PI * r;
  const a = Math.PI * Math.pow(r, 2);

  steps.push(`Diameter: d = 2r = 2 × ${Number(r.toFixed(4))} = ${Number(d.toFixed(4))}`);
  steps.push(`Circumference: C = 2πr = 2 × π × ${Number(r.toFixed(4))} = ${Number(c.toFixed(4))}`);
  steps.push(`Area: A = πr² = π × (${Number(r.toFixed(4))})² = ${Number(a.toFixed(4))}`);

  let arcLength: number | undefined;
  let sectorArea: number | undefined;

  if (params.centralAngleDeg !== undefined && params.centralAngleDeg > 0) {
    const angle = params.centralAngleDeg;
    arcLength = (angle / 360) * c;
    sectorArea = (angle / 360) * a;
    steps.push(`For central angle θ = ${angle}°:`);
    steps.push(`Arc Length: s = (θ / 360°) × 2πr = (${angle} / 360) × ${Number(c.toFixed(4))} = ${Number(arcLength.toFixed(4))}`);
    steps.push(`Sector Area: A_sector = (θ / 360°) × πr² = (${angle} / 360) × ${Number(a.toFixed(4))} = ${Number(sectorArea.toFixed(4))}`);
  }

  return {
    radius: Number(r.toFixed(4)),
    diameter: Number(d.toFixed(4)),
    circumference: Number(c.toFixed(4)),
    area: Number(a.toFixed(4)),
    arcLength: arcLength !== undefined ? Number(arcLength.toFixed(4)) : undefined,
    sectorArea: sectorArea !== undefined ? Number(sectorArea.toFixed(4)) : undefined,
    steps,
  };
}

export interface TriangleResult {
  area: number;
  perimeter: number;
  semiperimeter: number;
  sideA: number;
  sideB: number;
  sideC: number;
  heightA?: number;
  inradius?: number;
  circumradius?: number;
  isValid: boolean;
  triangleType: 'equilateral' | 'isosceles' | 'scalene' | 'right' | 'invalid';
  steps: string[];
}

export function calculateTriangle(params: {
  sideA?: number;
  sideB?: number;
  sideC?: number;
  base?: number;
  height?: number;
}): TriangleResult {
  const steps: string[] = [];

  if (params.base && params.height && (!params.sideA || !params.sideB || !params.sideC)) {
    const b = params.base;
    const h = params.height;
    const area = 0.5 * b * h;
    steps.push(`Given base b = ${b} and height h = ${h}`);
    steps.push(`Area: A = ½ × b × h = 0.5 × ${b} × ${h} = ${Number(area.toFixed(4))}`);
    return {
      area: Number(area.toFixed(4)),
      perimeter: b * 3, // indicative
      semiperimeter: (b * 3) / 2,
      sideA: b,
      sideB: b,
      sideC: b,
      isValid: true,
      triangleType: 'scalene',
      steps,
    };
  }

  const a = params.sideA || 3;
  const b = params.sideB || 4;
  const c = params.sideC || 5;

  steps.push(`Sides: a = ${a}, b = ${b}, c = ${c}`);

  // Triangle inequality theorem
  if (a + b <= c || a + c <= b || b + c <= a) {
    steps.push(`Triangle inequality failed: sum of any two sides must exceed the third side.`);
    return {
      area: 0,
      perimeter: a + b + c,
      semiperimeter: (a + b + c) / 2,
      sideA: a,
      sideB: b,
      sideC: c,
      isValid: false,
      triangleType: 'invalid',
      steps,
    };
  }

  const p = a + b + c;
  const s = p / 2;
  const areaSq = s * (s - a) * (s - b) * (s - c);
  const area = Math.sqrt(Math.max(0, areaSq));

  steps.push(`Perimeter: P = a + b + c = ${a} + ${b} + ${c} = ${p}`);
  steps.push(`Semi-perimeter: s = P / 2 = ${p} / 2 = ${s}`);
  steps.push(`Heron's Formula: A = √(s(s - a)(s - b)(s - c))`);
  steps.push(`A = √(${s} × (${s} - ${a}) × (${s} - ${b}) × (${s} - ${c})) = √(${Number(areaSq.toFixed(4))}) = ${Number(area.toFixed(4))}`);

  const inradius = area / s;
  const circumradius = (a * b * c) / (4 * area);
  const heightA = (2 * area) / a;

  let triangleType: TriangleResult['triangleType'] = 'scalene';
  const sidesSorted = [a, b, c].sort((x, y) => x - y);
  const isRight = Math.abs(Math.pow(sidesSorted[0], 2) + Math.pow(sidesSorted[1], 2) - Math.pow(sidesSorted[2], 2)) < 1e-4;

  if (a === b && b === c) {
    triangleType = 'equilateral';
  } else if (isRight) {
    triangleType = 'right';
  } else if (a === b || b === c || a === c) {
    triangleType = 'isosceles';
  }

  steps.push(`Incircle radius: r = A / s = ${Number(inradius.toFixed(4))}`);
  steps.push(`Circumcircle radius: R = (abc) / (4A) = ${Number(circumradius.toFixed(4))}`);
  steps.push(`Classification: ${triangleType.toUpperCase()}`);

  return {
    area: Number(area.toFixed(4)),
    perimeter: Number(p.toFixed(4)),
    semiperimeter: Number(s.toFixed(4)),
    sideA: a,
    sideB: b,
    sideC: c,
    heightA: Number(heightA.toFixed(4)),
    inradius: Number(inradius.toFixed(4)),
    circumradius: Number(circumradius.toFixed(4)),
    isValid: true,
    triangleType,
    steps,
  };
}

export interface RightTriangleResult {
  legA: number;
  legB: number;
  hypotenuse: number;
  area: number;
  perimeter: number;
  altitude: number;
  angleADeg: number;
  angleBDeg: number;
  steps: string[];
}

export function calculateRightTriangle(params: {
  legA?: number;
  legB?: number;
  hypotenuse?: number;
}): RightTriangleResult {
  const steps: string[] = [];
  let a = params.legA || 0;
  let b = params.legB || 0;
  let c = params.hypotenuse || 0;

  if (a > 0 && b > 0) {
    c = Math.sqrt(a * a + b * b);
    steps.push(`Given legs a = ${a}, b = ${b}`);
    steps.push(`Pythagorean theorem: c = √(a² + b²) = √(${a * a} + ${b * b}) = √(${a * a + b * b}) = ${Number(c.toFixed(4))}`);
  } else if (c > 0 && a > 0) {
    if (c <= a) throw new Error('Hypotenuse c must be strictly greater than leg a.');
    b = Math.sqrt(c * c - a * a);
    steps.push(`Given hypotenuse c = ${c} and leg a = ${a}`);
    steps.push(`Missing leg: b = √(c² - a²) = √(${c * c} - ${a * a}) = √(${c * c - a * a}) = ${Number(b.toFixed(4))}`);
  } else if (c > 0 && b > 0) {
    if (c <= b) throw new Error('Hypotenuse c must be strictly greater than leg b.');
    a = Math.sqrt(c * c - b * b);
    steps.push(`Given hypotenuse c = ${c} and leg b = ${b}`);
    steps.push(`Missing leg: a = √(c² - b²) = √(${c * c} - ${b * b}) = √(${c * c - b * b}) = ${Number(a.toFixed(4))}`);
  } else {
    a = 3;
    b = 4;
    c = 5;
    steps.push(`Default standard 3-4-5 right triangle`);
  }

  const area = 0.5 * a * b;
  const perimeter = a + b + c;
  const altitude = (a * b) / c;
  const angleADeg = (Math.atan(a / b) * 180) / Math.PI;
  const angleBDeg = 90 - angleADeg;

  steps.push(`Area: A = ½ × a × b = 0.5 × ${Number(a.toFixed(4))} × ${Number(b.toFixed(4))} = ${Number(area.toFixed(4))}`);
  steps.push(`Perimeter: P = a + b + c = ${Number(perimeter.toFixed(4))}`);
  steps.push(`Altitude to hypotenuse: h = (a × b) / c = ${Number(altitude.toFixed(4))}`);
  steps.push(`Acute angles: α = arctan(a/b) = ${Number(angleADeg.toFixed(2))}°, β = 90° - α = ${Number(angleBDeg.toFixed(2))}°`);

  return {
    legA: Number(a.toFixed(4)),
    legB: Number(b.toFixed(4)),
    hypotenuse: Number(c.toFixed(4)),
    area: Number(area.toFixed(4)),
    perimeter: Number(perimeter.toFixed(4)),
    altitude: Number(altitude.toFixed(4)),
    angleADeg: Number(angleADeg.toFixed(2)),
    angleBDeg: Number(angleBDeg.toFixed(2)),
    steps,
  };
}

export interface SquareResult {
  side: number;
  area: number;
  perimeter: number;
  diagonal: number;
  inradius: number;
  circumradius: number;
  steps: string[];
}

export function calculateSquare(side: number): SquareResult {
  const s = Math.max(0, side);
  const area = s * s;
  const perimeter = 4 * s;
  const diagonal = s * Math.SQRT2;
  const inradius = s / 2;
  const circumradius = diagonal / 2;

  const steps = [
    `Side length: s = ${s}`,
    `Area: A = s² = ${s}² = ${Number(area.toFixed(4))}`,
    `Perimeter: P = 4s = 4 × ${s} = ${Number(perimeter.toFixed(4))}`,
    `Diagonal: d = s√2 = ${s} × 1.414214 = ${Number(diagonal.toFixed(4))}`,
    `Inradius: r = s / 2 = ${Number(inradius.toFixed(4))}`,
    `Circumradius: R = d / 2 = ${Number(circumradius.toFixed(4))}`,
  ];

  return {
    side: s,
    area: Number(area.toFixed(4)),
    perimeter: Number(perimeter.toFixed(4)),
    diagonal: Number(diagonal.toFixed(4)),
    inradius: Number(inradius.toFixed(4)),
    circumradius: Number(circumradius.toFixed(4)),
    steps,
  };
}

export interface RectangleResult {
  length: number;
  width: number;
  area: number;
  perimeter: number;
  diagonal: number;
  aspectRatio: string;
  steps: string[];
}

export function calculateRectangle(length: number, width: number): RectangleResult {
  const l = Math.max(0, length);
  const w = Math.max(0, width);
  const area = l * w;
  const perimeter = 2 * (l + w);
  const diagonal = Math.sqrt(l * l + w * w);

  // GCD for simplified aspect ratio
  const gcd = (x: number, y: number): number => (!y ? x : gcd(y, x % y));
  const lInt = Math.round(l * 100);
  const wInt = Math.round(w * 100);
  const g = gcd(lInt, wInt) || 1;
  const aspect = `${lInt / g}:${wInt / g}`;

  const steps = [
    `Dimensions: length l = ${l}, width w = ${w}`,
    `Area: A = l × w = ${l} × ${w} = ${Number(area.toFixed(4))}`,
    `Perimeter: P = 2(l + w) = 2(${l} + ${w}) = ${Number(perimeter.toFixed(4))}`,
    `Diagonal: d = √(l² + w²) = √(${l * l} + ${w * w}) = ${Number(diagonal.toFixed(4))}`,
    `Aspect Ratio: ${aspect}`,
  ];

  return {
    length: l,
    width: w,
    area: Number(area.toFixed(4)),
    perimeter: Number(perimeter.toFixed(4)),
    diagonal: Number(diagonal.toFixed(4)),
    aspectRatio: aspect,
    steps,
  };
}

export interface RhombusResult {
  diagonal1: number;
  diagonal2: number;
  side: number;
  area: number;
  perimeter: number;
  height: number;
  inradius: number;
  steps: string[];
}

export function calculateRhombus(params: {
  diagonal1?: number;
  diagonal2?: number;
  side?: number;
  height?: number;
}): RhombusResult {
  const steps: string[] = [];
  let d1 = params.diagonal1 || 0;
  let d2 = params.diagonal2 || 0;
  let s = params.side || 0;
  let h = params.height || 0;

  if (d1 > 0 && d2 > 0) {
    s = Math.sqrt(Math.pow(d1 / 2, 2) + Math.pow(d2 / 2, 2));
    const area = 0.5 * d1 * d2;
    h = area / s;
    steps.push(`Given diagonals d₁ = ${d1}, d₂ = ${d2}`);
    steps.push(`Side: s = √((d₁/2)² + (d₂/2)²) = √(${Math.pow(d1 / 2, 2)} + ${Math.pow(d2 / 2, 2)}) = ${Number(s.toFixed(4))}`);
    steps.push(`Area: A = ½ × d₁ × d₂ = 0.5 × ${d1} × ${d2} = ${Number(area.toFixed(4))}`);
    steps.push(`Perimeter: P = 4s = 4 × ${Number(s.toFixed(4))} = ${Number((4 * s).toFixed(4))}`);
    steps.push(`Height: h = A / s = ${Number(h.toFixed(4))}`);

    return {
      diagonal1: d1,
      diagonal2: d2,
      side: Number(s.toFixed(4)),
      area: Number(area.toFixed(4)),
      perimeter: Number((4 * s).toFixed(4)),
      height: Number(h.toFixed(4)),
      inradius: Number((h / 2).toFixed(4)),
      steps,
    };
  }

  // Fallback: side and height
  s = s || 5;
  h = h || 4;
  const area = s * h;
  steps.push(`Given side s = ${s} and height h = ${h}`);
  steps.push(`Area: A = s × h = ${s} × ${h} = ${area}`);
  steps.push(`Perimeter: P = 4s = ${4 * s}`);

  return {
    diagonal1: 0,
    diagonal2: 0,
    side: s,
    area,
    perimeter: 4 * s,
    height: h,
    inradius: Number((h / 2).toFixed(4)),
    steps,
  };
}

export interface ParallelogramResult {
  base: number;
  side: number;
  height: number;
  area: number;
  perimeter: number;
  steps: string[];
}

export function calculateParallelogram(params: {
  base: number;
  side?: number;
  height: number;
}): ParallelogramResult {
  const b = Math.max(0, params.base);
  const h = Math.max(0, params.height);
  const s = params.side && params.side >= h ? params.side : h;
  const area = b * h;
  const perimeter = 2 * (b + s);

  const steps = [
    `Base b = ${b}, Height h = ${h}, Slant side a = ${s}`,
    `Area: A = b × h = ${b} × ${h} = ${Number(area.toFixed(4))}`,
    `Perimeter: P = 2(a + b) = 2(${s} + ${b}) = ${Number(perimeter.toFixed(4))}`,
  ];

  return {
    base: b,
    side: s,
    height: h,
    area: Number(area.toFixed(4)),
    perimeter: Number(perimeter.toFixed(4)),
    steps,
  };
}

export interface TrapeziumResult {
  baseA: number;
  baseB: number;
  height: number;
  legC: number;
  legD: number;
  area: number;
  perimeter: number;
  midSegment: number;
  steps: string[];
}

export function calculateTrapezium(params: {
  baseA: number;
  baseB: number;
  height: number;
  legC?: number;
  legD?: number;
}): TrapeziumResult {
  const a = Math.max(0, params.baseA);
  const b = Math.max(0, params.baseB);
  const h = Math.max(0, params.height);

  // If legs are not provided, estimate using symmetric trapezoid
  const diff = Math.abs(a - b) / 2;
  const defaultLeg = Math.sqrt(h * h + diff * diff);
  const c = params.legC && params.legC >= h ? params.legC : defaultLeg;
  const d = params.legD && params.legD >= h ? params.legD : defaultLeg;

  const area = 0.5 * (a + b) * h;
  const perimeter = a + b + c + d;
  const midSegment = (a + b) / 2;

  const steps = [
    `Parallel bases a = ${a}, b = ${b}; Height h = ${h}`,
    `Legs c = ${Number(c.toFixed(4))}, d = ${Number(d.toFixed(4))}`,
    `Mid-segment (median): m = (a + b) / 2 = (${a} + ${b}) / 2 = ${Number(midSegment.toFixed(4))}`,
    `Area: A = ½(a + b)h = m × h = ${Number(midSegment.toFixed(4))} × ${h} = ${Number(area.toFixed(4))}`,
    `Perimeter: P = a + b + c + d = ${Number(perimeter.toFixed(4))}`,
  ];

  return {
    baseA: a,
    baseB: b,
    height: h,
    legC: Number(c.toFixed(4)),
    legD: Number(d.toFixed(4)),
    area: Number(area.toFixed(4)),
    perimeter: Number(perimeter.toFixed(4)),
    midSegment: Number(midSegment.toFixed(4)),
    steps,
  };
}

export interface RegularPolygonResult {
  sides: number;
  sideLength: number;
  perimeter: number;
  area: number;
  apothem: number;
  circumradius: number;
  interiorAngleDeg: number;
  exteriorAngleDeg: number;
  steps: string[];
}

export function calculateRegularPolygon(sides: number, sideLength: number): RegularPolygonResult {
  const n = Math.max(3, Math.round(sides));
  const s = Math.max(0, sideLength);

  const perimeter = n * s;
  const interiorAngleDeg = ((n - 2) * 180) / n;
  const exteriorAngleDeg = 360 / n;
  const apothem = s / (2 * Math.tan(Math.PI / n));
  const circumradius = s / (2 * Math.sin(Math.PI / n));
  const area = (n * s * apothem) / 2;

  const steps = [
    `Regular polygon with n = ${n} sides, side length s = ${s}`,
    `Perimeter: P = n × s = ${n} × ${s} = ${Number(perimeter.toFixed(4))}`,
    `Interior Angle: ((n - 2) × 180°) / n = ((${n} - 2) × 180) / ${n} = ${Number(interiorAngleDeg.toFixed(2))}°`,
    `Exterior Angle: 360° / n = 360 / ${n} = ${Number(exteriorAngleDeg.toFixed(2))}°`,
    `Apothem (inradius): a = s / (2 · tan(π/n)) = ${Number(apothem.toFixed(4))}`,
    `Circumradius: R = s / (2 · sin(π/n)) = ${Number(circumradius.toFixed(4))}`,
    `Area: A = ½ × P × a = 0.5 × ${Number(perimeter.toFixed(4))} × ${Number(apothem.toFixed(4))} = ${Number(area.toFixed(4))}`,
  ];

  return {
    sides: n,
    sideLength: s,
    perimeter: Number(perimeter.toFixed(4)),
    area: Number(area.toFixed(4)),
    apothem: Number(apothem.toFixed(4)),
    circumradius: Number(circumradius.toFixed(4)),
    interiorAngleDeg: Number(interiorAngleDeg.toFixed(2)),
    exteriorAngleDeg: Number(exteriorAngleDeg.toFixed(2)),
    steps,
  };
}

export function calculatePentagon(sideLength: number): RegularPolygonResult {
  return calculateRegularPolygon(5, sideLength);
}

export function calculateHexagon(sideLength: number): RegularPolygonResult & {
  shortDiagonal: number;
  longDiagonal: number;
} {
  const base = calculateRegularPolygon(6, sideLength);
  const s = base.sideLength;
  const longDiagonal = 2 * s;
  const shortDiagonal = s * Math.sqrt(3);

  base.steps.push(`Long diagonal (d_long): 2s = ${Number(longDiagonal.toFixed(4))}`);
  base.steps.push(`Short diagonal (d_short): s√3 = ${Number(shortDiagonal.toFixed(4))}`);

  return {
    ...base,
    longDiagonal: Number(longDiagonal.toFixed(4)),
    shortDiagonal: Number(shortDiagonal.toFixed(4)),
  };
}

export interface PythagoreanTheoremResult {
  legA: number;
  legB: number;
  hypotenuse: number;
  solvedFor: 'a' | 'b' | 'c';
  radicalExact: string;
  decimalValue: number;
  steps: string[];
}

export function calculatePythagoreanTheorem(params: {
  legA?: number;
  legB?: number;
  hypotenuse?: number;
}): PythagoreanTheoremResult {
  const steps: string[] = [];
  let a = params.legA;
  let b = params.legB;
  let c = params.hypotenuse;

  // Simplify radical helper
  const simplifyRadical = (n: number): string => {
    const roundN = Math.round(n);
    if (Math.abs(n - roundN) > 1e-4) return `√${Number(n.toFixed(2))}`;
    let outside = 1;
    let inside = roundN;
    for (let i = 2; i * i <= inside; i++) {
      while (inside % (i * i) === 0) {
        outside *= i;
        inside /= i * i;
      }
    }
    if (inside === 1) return `${outside}`;
    if (outside === 1) return `√${inside}`;
    return `${outside}√${inside}`;
  };

  if (a !== undefined && a > 0 && b !== undefined && b > 0) {
    const cSq = a * a + b * b;
    const cVal = Math.sqrt(cSq);
    const radical = simplifyRadical(cSq);

    steps.push(`Formula: c² = a² + b²`);
    steps.push(`Substitute: c² = (${a})² + (${b})² = ${a * a} + ${b * b} = ${cSq}`);
    steps.push(`Solve: c = √${cSq} = ${radical} ≈ ${Number(cVal.toFixed(4))}`);

    return {
      legA: a,
      legB: b,
      hypotenuse: Number(cVal.toFixed(4)),
      solvedFor: 'c',
      radicalExact: radical,
      decimalValue: Number(cVal.toFixed(4)),
      steps,
    };
  } else if (c !== undefined && c > 0 && a !== undefined && a > 0) {
    if (c <= a) throw new Error('Hypotenuse c must be greater than leg a.');
    const bSq = c * c - a * a;
    const bVal = Math.sqrt(bSq);
    const radical = simplifyRadical(bSq);

    steps.push(`Formula: b² = c² - a²`);
    steps.push(`Substitute: b² = (${c})² - (${a})² = ${c * c} - ${a * a} = ${bSq}`);
    steps.push(`Solve: b = √${bSq} = ${radical} ≈ ${Number(bVal.toFixed(4))}`);

    return {
      legA: a,
      legB: Number(bVal.toFixed(4)),
      hypotenuse: c,
      solvedFor: 'b',
      radicalExact: radical,
      decimalValue: Number(bVal.toFixed(4)),
      steps,
    };
  } else if (c !== undefined && c > 0 && b !== undefined && b > 0) {
    if (c <= b) throw new Error('Hypotenuse c must be greater than leg b.');
    const aSq = c * c - b * b;
    const aVal = Math.sqrt(aSq);
    const radical = simplifyRadical(aSq);

    steps.push(`Formula: a² = c² - b²`);
    steps.push(`Substitute: a² = (${c})² - (${b})² = ${c * c} - ${b * b} = ${aSq}`);
    steps.push(`Solve: a = √${aSq} = ${radical} ≈ ${Number(aVal.toFixed(4))}`);

    return {
      legA: Number(aVal.toFixed(4)),
      legB: b,
      hypotenuse: c,
      solvedFor: 'a',
      radicalExact: radical,
      decimalValue: Number(aVal.toFixed(4)),
      steps,
    };
  }

  // Default 3-4-5
  return calculatePythagoreanTheorem({ legA: 3, legB: 4 });
}
