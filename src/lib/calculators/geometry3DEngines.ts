/**
 * 3D Geometry Calculation Engines
 * Volume, Total Surface Area, Lateral Area, Slant Heights, Space Diagonals
 */

export interface CubeResult {
  side: number;
  volume: number;
  surfaceArea: number;
  lateralArea: number;
  spaceDiagonal: number;
  faceDiagonal: number;
  inradius: number;
  circumradius: number;
  steps: string[];
}

export function calculateCube(side: number): CubeResult {
  const s = Math.max(0, side);
  const volume = Math.pow(s, 3);
  const surfaceArea = 6 * Math.pow(s, 2);
  const lateralArea = 4 * Math.pow(s, 2);
  const spaceDiagonal = s * Math.sqrt(3);
  const faceDiagonal = s * Math.SQRT2;
  const inradius = s / 2;
  const circumradius = (s * Math.sqrt(3)) / 2;

  const steps = [
    `Side length: s = ${s}`,
    `Volume: V = s³ = ${s}³ = ${Number(volume.toFixed(4))}`,
    `Total Surface Area: A = 6s² = 6 × (${s})² = ${Number(surfaceArea.toFixed(4))}`,
    `Lateral Surface Area: A_lat = 4s² = 4 × (${s})² = ${Number(lateralArea.toFixed(4))}`,
    `Space Diagonal: d = s√3 = ${s} × 1.73205 = ${Number(spaceDiagonal.toFixed(4))}`,
    `Face Diagonal: d_face = s√2 = ${s} × 1.41421 = ${Number(faceDiagonal.toFixed(4))}`,
    `Inscribed Sphere Radius: r = s / 2 = ${Number(inradius.toFixed(4))}`,
    `Circumscribed Sphere Radius: R = (s√3) / 2 = ${Number(circumradius.toFixed(4))}`,
  ];

  return {
    side: s,
    volume: Number(volume.toFixed(4)),
    surfaceArea: Number(surfaceArea.toFixed(4)),
    lateralArea: Number(lateralArea.toFixed(4)),
    spaceDiagonal: Number(spaceDiagonal.toFixed(4)),
    faceDiagonal: Number(faceDiagonal.toFixed(4)),
    inradius: Number(inradius.toFixed(4)),
    circumradius: Number(circumradius.toFixed(4)),
    steps,
  };
}

export interface CuboidResult {
  length: number;
  width: number;
  height: number;
  volume: number;
  surfaceArea: number;
  lateralArea: number;
  spaceDiagonal: number;
  steps: string[];
}

export function calculateCuboid(length: number, width: number, height: number): CuboidResult {
  const l = Math.max(0, length);
  const w = Math.max(0, width);
  const h = Math.max(0, height);

  const volume = l * w * h;
  const surfaceArea = 2 * (l * w + l * h + w * h);
  const lateralArea = 2 * h * (l + w);
  const spaceDiagonal = Math.sqrt(l * l + w * w + h * h);

  const steps = [
    `Dimensions: length = ${l}, width = ${w}, height = ${h}`,
    `Volume: V = l × w × h = ${l} × ${w} × ${h} = ${Number(volume.toFixed(4))}`,
    `Total Surface Area: A = 2(lw + lh + wh) = 2(${l * w} + ${l * h} + ${w * h}) = ${Number(surfaceArea.toFixed(4))}`,
    `Lateral Surface Area: A_lat = 2h(l + w) = 2 × ${h} × (${l} + ${w}) = ${Number(lateralArea.toFixed(4))}`,
    `Space Diagonal: d = √(l² + w² + h²) = √(${l * l} + ${w * w} + ${h * h}) = ${Number(spaceDiagonal.toFixed(4))}`,
  ];

  return {
    length: l,
    width: w,
    height: h,
    volume: Number(volume.toFixed(4)),
    surfaceArea: Number(surfaceArea.toFixed(4)),
    lateralArea: Number(lateralArea.toFixed(4)),
    spaceDiagonal: Number(spaceDiagonal.toFixed(4)),
    steps,
  };
}

export interface CylinderResult {
  radius: number;
  diameter: number;
  height: number;
  volume: number;
  lateralArea: number;
  baseArea: number;
  totalSurfaceArea: number;
  steps: string[];
}

export function calculateCylinder(radius: number, height: number): CylinderResult {
  const r = Math.max(0, radius);
  const h = Math.max(0, height);

  const baseArea = Math.PI * Math.pow(r, 2);
  const lateralArea = 2 * Math.PI * r * h;
  const totalSurfaceArea = 2 * baseArea + lateralArea;
  const volume = baseArea * h;

  const steps = [
    `Radius r = ${r}, Height h = ${h}`,
    `Diameter: d = 2r = ${2 * r}`,
    `Base Area (Single): A_base = πr² = π × (${r})² = ${Number(baseArea.toFixed(4))}`,
    `Lateral (Curved) Surface Area: A_lat = 2πrh = 2 × π × ${r} × ${h} = ${Number(lateralArea.toFixed(4))}`,
    `Total Surface Area: A_total = 2A_base + A_lat = 2(${Number(baseArea.toFixed(4))}) + ${Number(lateralArea.toFixed(4))} = ${Number(totalSurfaceArea.toFixed(4))}`,
    `Volume: V = πr²h = ${Number(baseArea.toFixed(4))} × ${h} = ${Number(volume.toFixed(4))}`,
  ];

  return {
    radius: r,
    diameter: 2 * r,
    height: h,
    volume: Number(volume.toFixed(4)),
    lateralArea: Number(lateralArea.toFixed(4)),
    baseArea: Number(baseArea.toFixed(4)),
    totalSurfaceArea: Number(totalSurfaceArea.toFixed(4)),
    steps,
  };
}

export interface ConeResult {
  radius: number;
  height: number;
  slantHeight: number;
  volume: number;
  lateralArea: number;
  baseArea: number;
  totalSurfaceArea: number;
  steps: string[];
}

export function calculateCone(radius: number, height: number): ConeResult {
  const r = Math.max(0, radius);
  const h = Math.max(0, height);

  const slantHeight = Math.sqrt(r * r + h * h);
  const baseArea = Math.PI * Math.pow(r, 2);
  const lateralArea = Math.PI * r * slantHeight;
  const totalSurfaceArea = baseArea + lateralArea;
  const volume = (1 / 3) * Math.PI * Math.pow(r, 2) * h;

  const steps = [
    `Radius r = ${r}, Height h = ${h}`,
    `Slant Height: l = √(r² + h²) = √(${r * r} + ${h * h}) = ${Number(slantHeight.toFixed(4))}`,
    `Base Area: A_base = πr² = π × (${r})² = ${Number(baseArea.toFixed(4))}`,
    `Lateral (Conical) Area: A_lat = πrl = π × ${r} × ${Number(slantHeight.toFixed(4))} = ${Number(lateralArea.toFixed(4))}`,
    `Total Surface Area: A_total = πr(r + l) = ${Number(totalSurfaceArea.toFixed(4))}`,
    `Volume: V = ⅓πr²h = ⅓ × π × (${r})² × ${h} = ${Number(volume.toFixed(4))}`,
  ];

  return {
    radius: r,
    height: h,
    slantHeight: Number(slantHeight.toFixed(4)),
    volume: Number(volume.toFixed(4)),
    lateralArea: Number(lateralArea.toFixed(4)),
    baseArea: Number(baseArea.toFixed(4)),
    totalSurfaceArea: Number(totalSurfaceArea.toFixed(4)),
    steps,
  };
}

export interface SphereResult {
  radius: number;
  diameter: number;
  circumference: number;
  volume: number;
  surfaceArea: number;
  steps: string[];
}

export function calculateSphere(radius: number): SphereResult {
  const r = Math.max(0, radius);
  const diameter = 2 * r;
  const circumference = 2 * Math.PI * r;
  const surfaceArea = 4 * Math.PI * Math.pow(r, 2);
  const volume = (4 / 3) * Math.PI * Math.pow(r, 3);

  const steps = [
    `Radius r = ${r}`,
    `Diameter: d = 2r = ${Number(diameter.toFixed(4))}`,
    `Great Circle Circumference: C = 2πr = ${Number(circumference.toFixed(4))}`,
    `Surface Area: A = 4πr² = 4 × π × (${r})² = ${Number(surfaceArea.toFixed(4))}`,
    `Volume: V = ⁴⁄₃πr³ = ⁴⁄₃ × π × (${r})³ = ${Number(volume.toFixed(4))}`,
  ];

  return {
    radius: r,
    diameter: Number(diameter.toFixed(4)),
    circumference: Number(circumference.toFixed(4)),
    volume: Number(volume.toFixed(4)),
    surfaceArea: Number(surfaceArea.toFixed(4)),
    steps,
  };
}

export interface PrismResult {
  baseType: 'triangular' | 'rectangular' | 'hexagonal';
  baseArea: number;
  basePerimeter: number;
  height: number;
  volume: number;
  lateralArea: number;
  totalSurfaceArea: number;
  steps: string[];
}

export function calculatePrism(params: {
  baseType: 'triangular' | 'rectangular' | 'hexagonal';
  baseDimension1: number; // triangle: base or side, rect: length, hex: side
  baseDimension2?: number; // triangle: height, rect: width
  prismHeight: number;
}): PrismResult {
  const h = Math.max(0, params.prismHeight);
  const d1 = Math.max(0, params.baseDimension1);
  const d2 = Math.max(0, params.baseDimension2 || 0);

  let baseArea = 0;
  let basePerimeter = 0;
  const steps: string[] = [];

  if (params.baseType === 'triangular') {
    // Equilateral or right triangle if d2 provided
    if (d2 > 0) {
      baseArea = 0.5 * d1 * d2;
      const hyp = Math.sqrt(d1 * d1 + d2 * d2);
      basePerimeter = d1 + d2 + hyp;
      steps.push(`Triangular Base: legs = ${d1}, ${d2} → Area = ½ × ${d1} × ${d2} = ${Number(baseArea.toFixed(4))}`);
    } else {
      // Equilateral triangle
      baseArea = (Math.sqrt(3) / 4) * Math.pow(d1, 2);
      basePerimeter = 3 * d1;
      steps.push(`Equilateral Triangular Base: side = ${d1} → Area = (√3/4)s² = ${Number(baseArea.toFixed(4))}`);
    }
  } else if (params.baseType === 'hexagonal') {
    baseArea = ((3 * Math.sqrt(3)) / 2) * Math.pow(d1, 2);
    basePerimeter = 6 * d1;
    steps.push(`Regular Hexagonal Base: side = ${d1} → Area = (3√3/2)s² = ${Number(baseArea.toFixed(4))}`);
  } else {
    // Rectangular
    baseArea = d1 * (d2 || d1);
    basePerimeter = 2 * (d1 + (d2 || d1));
    steps.push(`Rectangular Base: ${d1} × ${d2 || d1} → Area = ${Number(baseArea.toFixed(4))}`);
  }

  const volume = baseArea * h;
  const lateralArea = basePerimeter * h;
  const totalSurfaceArea = 2 * baseArea + lateralArea;

  steps.push(`Prism Height H = ${h}`);
  steps.push(`Base Perimeter: P = ${Number(basePerimeter.toFixed(4))}`);
  steps.push(`Volume: V = Base Area × H = ${Number(baseArea.toFixed(4))} × ${h} = ${Number(volume.toFixed(4))}`);
  steps.push(`Lateral Surface Area: A_lat = P × H = ${Number(basePerimeter.toFixed(4))} × ${h} = ${Number(lateralArea.toFixed(4))}`);
  steps.push(`Total Surface Area: A_total = 2 × Base Area + A_lat = 2(${Number(baseArea.toFixed(4))}) + ${Number(lateralArea.toFixed(4))} = ${Number(totalSurfaceArea.toFixed(4))}`);

  return {
    baseType: params.baseType,
    baseArea: Number(baseArea.toFixed(4)),
    basePerimeter: Number(basePerimeter.toFixed(4)),
    height: h,
    volume: Number(volume.toFixed(4)),
    lateralArea: Number(lateralArea.toFixed(4)),
    totalSurfaceArea: Number(totalSurfaceArea.toFixed(4)),
    steps,
  };
}

export interface PyramidResult {
  baseLength: number;
  baseWidth: number;
  height: number;
  slantHeightLength: number;
  slantHeightWidth: number;
  baseArea: number;
  lateralArea: number;
  totalSurfaceArea: number;
  volume: number;
  steps: string[];
}

export function calculatePyramid(baseLength: number, baseWidth: number, height: number): PyramidResult {
  const l = Math.max(0, baseLength);
  const w = Math.max(0, baseWidth);
  const h = Math.max(0, height);

  const baseArea = l * w;
  const volume = (1 / 3) * baseArea * h;

  // Slant heights to edges
  const slantHeightL = Math.sqrt(h * h + Math.pow(w / 2, 2));
  const slantHeightW = Math.sqrt(h * h + Math.pow(l / 2, 2));

  const lateralArea = l * slantHeightL + w * slantHeightW;
  const totalSurfaceArea = baseArea + lateralArea;

  const steps = [
    `Base: length = ${l}, width = ${w}; Height = ${h}`,
    `Base Area: A_base = l × w = ${l} × ${w} = ${Number(baseArea.toFixed(4))}`,
    `Volume: V = ⅓ × A_base × h = ⅓ × ${Number(baseArea.toFixed(4))} × ${h} = ${Number(volume.toFixed(4))}`,
    `Slant Height (along length): s_l = √(h² + (w/2)²) = ${Number(slantHeightL.toFixed(4))}`,
    `Slant Height (along width): s_w = √(h² + (l/2)²) = ${Number(slantHeightW.toFixed(4))}`,
    `Lateral Surface Area: A_lat = (l × s_l) + (w × s_w) = ${Number(lateralArea.toFixed(4))}`,
    `Total Surface Area: A_total = A_base + A_lat = ${Number(totalSurfaceArea.toFixed(4))}`,
  ];

  return {
    baseLength: l,
    baseWidth: w,
    height: h,
    slantHeightLength: Number(slantHeightL.toFixed(4)),
    slantHeightWidth: Number(slantHeightW.toFixed(4)),
    baseArea: Number(baseArea.toFixed(4)),
    lateralArea: Number(lateralArea.toFixed(4)),
    totalSurfaceArea: Number(totalSurfaceArea.toFixed(4)),
    volume: Number(volume.toFixed(4)),
    steps,
  };
}
