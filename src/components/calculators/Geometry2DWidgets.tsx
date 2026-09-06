'use client';

import React, { useState } from 'react';
import {
  calculateCircle,
  calculateTriangle,
  calculateRightTriangle,
  calculateSquare,
  calculateRectangle,
  calculateRhombus,
  calculateParallelogram,
  calculateTrapezium,
  calculatePentagon,
  calculateHexagon,
  calculateRegularPolygon,
  calculatePythagoreanTheorem,
} from '@/lib/calculators/geometry2DEngines';

// ----------------------------------------------------------------------
// 1. Circle Calculator Widget
// ----------------------------------------------------------------------
export function CircleCalculatorWidget() {
  const [radius, setRadius] = useState<number>(5);
  const [angle, setAngle] = useState<number>(90);
  const res = calculateCircle({ radius, centralAngleDeg: angle });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
            Radius (r)
          </label>
          <input
            type="number"
            min="0.001"
            step="any"
            value={radius}
            onChange={(e) => setRadius(Math.max(0.001, Number(e.target.value) || 0))}
            className="w-full text-base px-3 py-2.5 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
            Central Sector Angle (θ in degrees)
          </label>
          <input
            type="number"
            min="0"
            max="360"
            value={angle}
            onChange={(e) => setAngle(Number(e.target.value) || 0)}
            className="w-full text-base px-3 py-2.5 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
          />
        </div>
      </div>

      <div className="p-5 bg-sky-50 border border-sky-100 rounded-2xl">
        <div className="text-xs font-semibold text-sky-800 uppercase tracking-wider mb-3">Circle Calculations</div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 bg-white rounded-xl border border-sky-200">
            <div className="text-xs text-slate-500">Area</div>
            <div className="text-xl font-bold text-sky-900">{res.area}</div>
          </div>
          <div className="p-3 bg-white rounded-xl border border-sky-200">
            <div className="text-xs text-slate-500">Circumference</div>
            <div className="text-xl font-bold text-sky-900">{res.circumference}</div>
          </div>
          <div className="p-3 bg-white rounded-xl border border-sky-200">
            <div className="text-xs text-slate-500">Diameter</div>
            <div className="text-xl font-bold text-sky-900">{res.diameter}</div>
          </div>
          <div className="p-3 bg-white rounded-xl border border-sky-200">
            <div className="text-xs text-slate-500">Sector Area ({angle}°)</div>
            <div className="text-xl font-bold text-sky-900">{res.sectorArea}</div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5 text-xs">
        <div className="font-semibold text-slate-700">Step-by-Step Mathematical Deduction:</div>
        {res.steps.map((s, idx) => (
          <div key={idx} className="text-slate-600 font-mono">{s}</div>
        ))}
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// 2. Triangle Calculator Widget
// ----------------------------------------------------------------------
export function TriangleCalculatorWidget() {
  const [a, setA] = useState<number>(5);
  const [b, setB] = useState<number>(6);
  const [c, setC] = useState<number>(7);

  const res = calculateTriangle({ sideA: a, sideB: b, sideC: c });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Side a</label>
          <input
            type="number"
            min="0.1"
            step="any"
            value={a}
            onChange={(e) => setA(Math.max(0.1, Number(e.target.value) || 0))}
            className="w-full text-base px-3 py-2 bg-white border border-slate-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Side b</label>
          <input
            type="number"
            min="0.1"
            step="any"
            value={b}
            onChange={(e) => setB(Math.max(0.1, Number(e.target.value) || 0))}
            className="w-full text-base px-3 py-2 bg-white border border-slate-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Side c</label>
          <input
            type="number"
            min="0.1"
            step="any"
            value={c}
            onChange={(e) => setC(Math.max(0.1, Number(e.target.value) || 0))}
            className="w-full text-base px-3 py-2 bg-white border border-slate-300 rounded-lg"
          />
        </div>
      </div>

      <div className="p-5 bg-sky-50 border border-sky-100 rounded-2xl">
        <div className="flex justify-between items-center mb-3">
          <div className="text-xs font-semibold text-sky-800 uppercase tracking-wider">Triangle Geometry</div>
          <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase bg-sky-200 text-sky-800">
            {res.triangleType}
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 bg-white rounded-xl border border-sky-200">
            <div className="text-xs text-slate-500">Area (Heron's)</div>
            <div className="text-xl font-bold text-sky-900">{res.area}</div>
          </div>
          <div className="p-3 bg-white rounded-xl border border-sky-200">
            <div className="text-xs text-slate-500">Perimeter</div>
            <div className="text-xl font-bold text-sky-900">{res.perimeter}</div>
          </div>
          <div className="p-3 bg-white rounded-xl border border-sky-200">
            <div className="text-xs text-slate-500">Inradius (r)</div>
            <div className="text-xl font-bold text-sky-900">{res.inradius || '-'}</div>
          </div>
          <div className="p-3 bg-white rounded-xl border border-sky-200">
            <div className="text-xs text-slate-500">Circumradius (R)</div>
            <div className="text-xl font-bold text-sky-900">{res.circumradius || '-'}</div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5 text-xs">
        <div className="font-semibold text-slate-700">Deduction Steps:</div>
        {res.steps.map((s, idx) => (
          <div key={idx} className="text-slate-600 font-mono">{s}</div>
        ))}
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// 3. Right-Angled Triangle Widget
// ----------------------------------------------------------------------
export function RightTriangleWidget() {
  const [legA, setLegA] = useState<number>(3);
  const [legB, setLegB] = useState<number>(4);
  const res = calculateRightTriangle({ legA, legB });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
            Leg a (Base)
          </label>
          <input
            type="number"
            min="0.1"
            step="any"
            value={legA}
            onChange={(e) => setLegA(Math.max(0.1, Number(e.target.value) || 0))}
            className="w-full text-base px-3 py-2 bg-white border border-slate-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
            Leg b (Height)
          </label>
          <input
            type="number"
            min="0.1"
            step="any"
            value={legB}
            onChange={(e) => setLegB(Math.max(0.1, Number(e.target.value) || 0))}
            className="w-full text-base px-3 py-2 bg-white border border-slate-300 rounded-lg"
          />
        </div>
      </div>

      <div className="p-5 bg-sky-50 border border-sky-100 rounded-2xl">
        <div className="text-xs font-semibold text-sky-800 uppercase tracking-wider mb-3">Right Triangle Solution</div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 bg-white rounded-xl border border-sky-200">
            <div className="text-xs text-slate-500">Hypotenuse (c)</div>
            <div className="text-xl font-bold text-sky-900">{res.hypotenuse}</div>
          </div>
          <div className="p-3 bg-white rounded-xl border border-sky-200">
            <div className="text-xs text-slate-500">Area</div>
            <div className="text-xl font-bold text-sky-900">{res.area}</div>
          </div>
          <div className="p-3 bg-white rounded-xl border border-sky-200">
            <div className="text-xs text-slate-500">Angle α</div>
            <div className="text-xl font-bold text-sky-900">{res.angleADeg}°</div>
          </div>
          <div className="p-3 bg-white rounded-xl border border-sky-200">
            <div className="text-xs text-slate-500">Angle β</div>
            <div className="text-xl font-bold text-sky-900">{res.angleBDeg}°</div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5 text-xs">
        <div className="font-semibold text-slate-700">Calculation Steps:</div>
        {res.steps.map((s, idx) => (
          <div key={idx} className="text-slate-600 font-mono">{s}</div>
        ))}
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// 4. Square Calculator Widget
// ----------------------------------------------------------------------
export function SquareCalculatorWidget() {
  const [side, setSide] = useState<number>(6);
  const res = calculateSquare(side);

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
          Side Length (a)
        </label>
        <input
          type="number"
          min="0.1"
          step="any"
          value={side}
          onChange={(e) => setSide(Math.max(0.1, Number(e.target.value) || 0))}
          className="w-full text-base px-3 py-2.5 bg-white border border-slate-300 rounded-lg"
        />
      </div>

      <div className="p-5 bg-sky-50 border border-sky-100 rounded-2xl">
        <div className="text-xs font-semibold text-sky-800 uppercase tracking-wider mb-3">Square Properties</div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 bg-white rounded-xl border border-sky-200">
            <div className="text-xs text-slate-500">Area</div>
            <div className="text-xl font-bold text-sky-900">{res.area}</div>
          </div>
          <div className="p-3 bg-white rounded-xl border border-sky-200">
            <div className="text-xs text-slate-500">Perimeter</div>
            <div className="text-xl font-bold text-sky-900">{res.perimeter}</div>
          </div>
          <div className="p-3 bg-white rounded-xl border border-sky-200">
            <div className="text-xs text-slate-500">Diagonal (d)</div>
            <div className="text-xl font-bold text-sky-900">{res.diagonal}</div>
          </div>
          <div className="p-3 bg-white rounded-xl border border-sky-200">
            <div className="text-xs text-slate-500">Inradius</div>
            <div className="text-xl font-bold text-sky-900">{res.inradius}</div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5 text-xs">
        <div className="font-semibold text-slate-700">Deduction Steps:</div>
        {res.steps.map((s, idx) => (
          <div key={idx} className="text-slate-600 font-mono">{s}</div>
        ))}
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// 5. Rectangle Calculator Widget
// ----------------------------------------------------------------------
export function RectangleCalculatorWidget() {
  const [l, setL] = useState<number>(8);
  const [w, setW] = useState<number>(5);
  const res = calculateRectangle(l, w);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Length</label>
          <input
            type="number"
            min="0.1"
            step="any"
            value={l}
            onChange={(e) => setL(Math.max(0.1, Number(e.target.value) || 0))}
            className="w-full text-base px-3 py-2 bg-white border border-slate-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Width</label>
          <input
            type="number"
            min="0.1"
            step="any"
            value={w}
            onChange={(e) => setW(Math.max(0.1, Number(e.target.value) || 0))}
            className="w-full text-base px-3 py-2 bg-white border border-slate-300 rounded-lg"
          />
        </div>
      </div>

      <div className="p-5 bg-sky-50 border border-sky-100 rounded-2xl">
        <div className="text-xs font-semibold text-sky-800 uppercase tracking-wider mb-3">Rectangle Outputs</div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 bg-white rounded-xl border border-sky-200">
            <div className="text-xs text-slate-500">Area</div>
            <div className="text-xl font-bold text-sky-900">{res.area}</div>
          </div>
          <div className="p-3 bg-white rounded-xl border border-sky-200">
            <div className="text-xs text-slate-500">Perimeter</div>
            <div className="text-xl font-bold text-sky-900">{res.perimeter}</div>
          </div>
          <div className="p-3 bg-white rounded-xl border border-sky-200">
            <div className="text-xs text-slate-500">Diagonal</div>
            <div className="text-xl font-bold text-sky-900">{res.diagonal}</div>
          </div>
          <div className="p-3 bg-white rounded-xl border border-sky-200">
            <div className="text-xs text-slate-500">Aspect Ratio</div>
            <div className="text-xl font-bold text-sky-900">{res.aspectRatio}</div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5 text-xs">
        <div className="font-semibold text-slate-700">Deduction Steps:</div>
        {res.steps.map((s, idx) => (
          <div key={idx} className="text-slate-600 font-mono">{s}</div>
        ))}
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// 6. Rhombus Calculator Widget
// ----------------------------------------------------------------------
export function RhombusCalculatorWidget() {
  const [d1, setD1] = useState<number>(10);
  const [d2, setD2] = useState<number>(8);
  const res = calculateRhombus({ diagonal1: d1, diagonal2: d2 });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Diagonal 1 (d₁)</label>
          <input
            type="number"
            min="0.1"
            step="any"
            value={d1}
            onChange={(e) => setD1(Math.max(0.1, Number(e.target.value) || 0))}
            className="w-full text-base px-3 py-2 bg-white border border-slate-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Diagonal 2 (d₂)</label>
          <input
            type="number"
            min="0.1"
            step="any"
            value={d2}
            onChange={(e) => setD2(Math.max(0.1, Number(e.target.value) || 0))}
            className="w-full text-base px-3 py-2 bg-white border border-slate-300 rounded-lg"
          />
        </div>
      </div>

      <div className="p-5 bg-sky-50 border border-sky-100 rounded-2xl">
        <div className="text-xs font-semibold text-sky-800 uppercase tracking-wider mb-3">Rhombus Metrics</div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 bg-white rounded-xl border border-sky-200">
            <div className="text-xs text-slate-500">Area</div>
            <div className="text-xl font-bold text-sky-900">{res.area}</div>
          </div>
          <div className="p-3 bg-white rounded-xl border border-sky-200">
            <div className="text-xs text-slate-500">Side Length</div>
            <div className="text-xl font-bold text-sky-900">{res.side}</div>
          </div>
          <div className="p-3 bg-white rounded-xl border border-sky-200">
            <div className="text-xs text-slate-500">Perimeter</div>
            <div className="text-xl font-bold text-sky-900">{res.perimeter}</div>
          </div>
          <div className="p-3 bg-white rounded-xl border border-sky-200">
            <div className="text-xs text-slate-500">Height (Altitude)</div>
            <div className="text-xl font-bold text-sky-900">{res.height}</div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5 text-xs">
        <div className="font-semibold text-slate-700">Deduction Steps:</div>
        {res.steps.map((s, idx) => (
          <div key={idx} className="text-slate-600 font-mono">{s}</div>
        ))}
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// 7. Parallelogram Calculator Widget
// ----------------------------------------------------------------------
export function ParallelogramCalculatorWidget() {
  const [b, setB] = useState<number>(12);
  const [h, setH] = useState<number>(7);
  const [s, setS] = useState<number>(9);
  const res = calculateParallelogram({ base: b, height: h, side: s });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Base (b)</label>
          <input
            type="number"
            min="0.1"
            step="any"
            value={b}
            onChange={(e) => setB(Math.max(0.1, Number(e.target.value) || 0))}
            className="w-full text-base px-3 py-2 bg-white border border-slate-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Height (h)</label>
          <input
            type="number"
            min="0.1"
            step="any"
            value={h}
            onChange={(e) => setH(Math.max(0.1, Number(e.target.value) || 0))}
            className="w-full text-base px-3 py-2 bg-white border border-slate-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Side (a)</label>
          <input
            type="number"
            min="0.1"
            step="any"
            value={s}
            onChange={(e) => setS(Math.max(0.1, Number(e.target.value) || 0))}
            className="w-full text-base px-3 py-2 bg-white border border-slate-300 rounded-lg"
          />
        </div>
      </div>

      <div className="p-5 bg-sky-50 border border-sky-100 rounded-2xl">
        <div className="text-xs font-semibold text-sky-800 uppercase tracking-wider mb-3">Parallelogram Results</div>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-white rounded-xl border border-sky-200">
            <div className="text-xs text-slate-500">Area</div>
            <div className="text-2xl font-bold text-sky-900">{res.area}</div>
          </div>
          <div className="p-3 bg-white rounded-xl border border-sky-200">
            <div className="text-xs text-slate-500">Perimeter</div>
            <div className="text-2xl font-bold text-sky-900">{res.perimeter}</div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5 text-xs">
        <div className="font-semibold text-slate-700">Deduction Steps:</div>
        {res.steps.map((st, idx) => (
          <div key={idx} className="text-slate-600 font-mono">{st}</div>
        ))}
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// 8. Trapezium Calculator Widget
// ----------------------------------------------------------------------
export function TrapeziumCalculatorWidget() {
  const [a, setA] = useState<number>(10);
  const [b, setB] = useState<number>(6);
  const [h, setH] = useState<number>(5);
  const res = calculateTrapezium({ baseA: a, baseB: b, height: h });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Base a</label>
          <input
            type="number"
            min="0.1"
            step="any"
            value={a}
            onChange={(e) => setA(Math.max(0.1, Number(e.target.value) || 0))}
            className="w-full text-base px-3 py-2 bg-white border border-slate-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Base b</label>
          <input
            type="number"
            min="0.1"
            step="any"
            value={b}
            onChange={(e) => setB(Math.max(0.1, Number(e.target.value) || 0))}
            className="w-full text-base px-3 py-2 bg-white border border-slate-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Height (h)</label>
          <input
            type="number"
            min="0.1"
            step="any"
            value={h}
            onChange={(e) => setH(Math.max(0.1, Number(e.target.value) || 0))}
            className="w-full text-base px-3 py-2 bg-white border border-slate-300 rounded-lg"
          />
        </div>
      </div>

      <div className="p-5 bg-sky-50 border border-sky-100 rounded-2xl">
        <div className="text-xs font-semibold text-sky-800 uppercase tracking-wider mb-3">Trapezium Measurements</div>
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3 bg-white rounded-xl border border-sky-200">
            <div className="text-xs text-slate-500">Area</div>
            <div className="text-xl font-bold text-sky-900">{res.area}</div>
          </div>
          <div className="p-3 bg-white rounded-xl border border-sky-200">
            <div className="text-xs text-slate-500">Mid-segment (m)</div>
            <div className="text-xl font-bold text-sky-900">{res.midSegment}</div>
          </div>
          <div className="p-3 bg-white rounded-xl border border-sky-200">
            <div className="text-xs text-slate-500">Perimeter</div>
            <div className="text-xl font-bold text-sky-900">{res.perimeter}</div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5 text-xs">
        <div className="font-semibold text-slate-700">Deduction Steps:</div>
        {res.steps.map((st, idx) => (
          <div key={idx} className="text-slate-600 font-mono">{st}</div>
        ))}
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// 9. Pentagon Calculator Widget
// ----------------------------------------------------------------------
export function PentagonCalculatorWidget() {
  const [s, setS] = useState<number>(5);
  const res = calculatePentagon(s);

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
          Side Length (s) of Regular Pentagon
        </label>
        <input
          type="number"
          min="0.1"
          step="any"
          value={s}
          onChange={(e) => setS(Math.max(0.1, Number(e.target.value) || 0))}
          className="w-full text-base px-3 py-2.5 bg-white border border-slate-300 rounded-lg"
        />
      </div>

      <div className="p-5 bg-sky-50 border border-sky-100 rounded-2xl">
        <div className="text-xs font-semibold text-sky-800 uppercase tracking-wider mb-3">Regular Pentagon Dimensions</div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 bg-white rounded-xl border border-sky-200">
            <div className="text-xs text-slate-500">Area</div>
            <div className="text-xl font-bold text-sky-900">{res.area}</div>
          </div>
          <div className="p-3 bg-white rounded-xl border border-sky-200">
            <div className="text-xs text-slate-500">Perimeter</div>
            <div className="text-xl font-bold text-sky-900">{res.perimeter}</div>
          </div>
          <div className="p-3 bg-white rounded-xl border border-sky-200">
            <div className="text-xs text-slate-500">Apothem</div>
            <div className="text-xl font-bold text-sky-900">{res.apothem}</div>
          </div>
          <div className="p-3 bg-white rounded-xl border border-sky-200">
            <div className="text-xs text-slate-500">Interior Angle</div>
            <div className="text-xl font-bold text-sky-900">{res.interiorAngleDeg}°</div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5 text-xs">
        <div className="font-semibold text-slate-700">Deduction Steps:</div>
        {res.steps.map((st, idx) => (
          <div key={idx} className="text-slate-600 font-mono">{st}</div>
        ))}
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// 10. Hexagon Calculator Widget
// ----------------------------------------------------------------------
export function HexagonCalculatorWidget() {
  const [s, setS] = useState<number>(6);
  const res = calculateHexagon(s);

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
          Side Length (s) of Regular Hexagon
        </label>
        <input
          type="number"
          min="0.1"
          step="any"
          value={s}
          onChange={(e) => setS(Math.max(0.1, Number(e.target.value) || 0))}
          className="w-full text-base px-3 py-2.5 bg-white border border-slate-300 rounded-lg"
        />
      </div>

      <div className="p-5 bg-sky-50 border border-sky-100 rounded-2xl">
        <div className="text-xs font-semibold text-sky-800 uppercase tracking-wider mb-3">Regular Hexagon Geometry</div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 bg-white rounded-xl border border-sky-200">
            <div className="text-xs text-slate-500">Area</div>
            <div className="text-xl font-bold text-sky-900">{res.area}</div>
          </div>
          <div className="p-3 bg-white rounded-xl border border-sky-200">
            <div className="text-xs text-slate-500">Perimeter</div>
            <div className="text-xl font-bold text-sky-900">{res.perimeter}</div>
          </div>
          <div className="p-3 bg-white rounded-xl border border-sky-200">
            <div className="text-xs text-slate-500">Long Diagonal (2s)</div>
            <div className="text-xl font-bold text-sky-900">{res.longDiagonal}</div>
          </div>
          <div className="p-3 bg-white rounded-xl border border-sky-200">
            <div className="text-xs text-slate-500">Short Diagonal (s√3)</div>
            <div className="text-xl font-bold text-sky-900">{res.shortDiagonal}</div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5 text-xs">
        <div className="font-semibold text-slate-700">Deduction Steps:</div>
        {res.steps.map((st, idx) => (
          <div key={idx} className="text-slate-600 font-mono">{st}</div>
        ))}
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// 11. Polygon Calculator Widget
// ----------------------------------------------------------------------
export function PolygonCalculatorWidget() {
  const [sides, setSides] = useState<number>(8);
  const [sideLength, setSideLength] = useState<number>(5);
  const res = calculateRegularPolygon(sides, sideLength);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Number of Sides (n)</label>
          <input
            type="number"
            min="3"
            max="100"
            value={sides}
            onChange={(e) => setSides(Math.max(3, Math.round(Number(e.target.value) || 3)))}
            className="w-full text-base px-3 py-2 bg-white border border-slate-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Side Length (s)</label>
          <input
            type="number"
            min="0.1"
            step="any"
            value={sideLength}
            onChange={(e) => setSideLength(Math.max(0.1, Number(e.target.value) || 0))}
            className="w-full text-base px-3 py-2 bg-white border border-slate-300 rounded-lg"
          />
        </div>
      </div>

      <div className="p-5 bg-sky-50 border border-sky-100 rounded-2xl">
        <div className="text-xs font-semibold text-sky-800 uppercase tracking-wider mb-3">Regular {sides}-gon Properties</div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 bg-white rounded-xl border border-sky-200">
            <div className="text-xs text-slate-500">Area</div>
            <div className="text-xl font-bold text-sky-900">{res.area}</div>
          </div>
          <div className="p-3 bg-white rounded-xl border border-sky-200">
            <div className="text-xs text-slate-500">Perimeter</div>
            <div className="text-xl font-bold text-sky-900">{res.perimeter}</div>
          </div>
          <div className="p-3 bg-white rounded-xl border border-sky-200">
            <div className="text-xs text-slate-500">Apothem (r)</div>
            <div className="text-xl font-bold text-sky-900">{res.apothem}</div>
          </div>
          <div className="p-3 bg-white rounded-xl border border-sky-200">
            <div className="text-xs text-slate-500">Interior Angle</div>
            <div className="text-xl font-bold text-sky-900">{res.interiorAngleDeg}°</div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5 text-xs">
        <div className="font-semibold text-slate-700">Deduction Steps:</div>
        {res.steps.map((st, idx) => (
          <div key={idx} className="text-slate-600 font-mono">{st}</div>
        ))}
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// 12. Pythagorean Theorem Widget
// ----------------------------------------------------------------------
export function PythagoreanTheoremWidget() {
  const [solveFor, setSolveFor] = useState<'c' | 'b'>('c');
  const [a, setA] = useState<number>(6);
  const [b, setB] = useState<number>(8);
  const [c, setC] = useState<number>(10);

  const res =
    solveFor === 'c'
      ? calculatePythagoreanTheorem({ legA: a, legB: b })
      : calculatePythagoreanTheorem({ hypotenuse: c, legA: a });

  return (
    <div className="space-y-6">
      <div className="flex gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setSolveFor('c')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
            solveFor === 'c' ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          Find Hypotenuse (c)
        </button>
        <button
          onClick={() => setSolveFor('b')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
            solveFor === 'b' ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          Find Leg (b)
        </button>
      </div>

      {solveFor === 'c' ? (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Leg a</label>
            <input
              type="number"
              min="0.1"
              step="any"
              value={a}
              onChange={(e) => setA(Math.max(0.1, Number(e.target.value) || 0))}
              className="w-full text-base px-3 py-2 bg-white border border-slate-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Leg b</label>
            <input
              type="number"
              min="0.1"
              step="any"
              value={b}
              onChange={(e) => setB(Math.max(0.1, Number(e.target.value) || 0))}
              className="w-full text-base px-3 py-2 bg-white border border-slate-300 rounded-lg"
            />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Hypotenuse c</label>
            <input
              type="number"
              min="0.1"
              step="any"
              value={c}
              onChange={(e) => setC(Math.max(a + 0.1, Number(e.target.value) || 0))}
              className="w-full text-base px-3 py-2 bg-white border border-slate-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Leg a</label>
            <input
              type="number"
              min="0.1"
              step="any"
              value={a}
              onChange={(e) => setA(Math.max(0.1, Number(e.target.value) || 0))}
              className="w-full text-base px-3 py-2 bg-white border border-slate-300 rounded-lg"
            />
          </div>
        </div>
      )}

      <div className="p-5 bg-sky-50 border border-sky-100 rounded-2xl">
        <div className="text-xs font-semibold text-sky-800 uppercase tracking-wider mb-2">Pythagorean Result</div>
        <div className="flex flex-wrap items-baseline gap-4">
          <div className="text-3xl font-extrabold text-sky-900">
            {res.solvedFor} = {res.radicalExact}
          </div>
          {res.radicalExact.includes('√') && (
            <div className="text-lg font-semibold text-slate-600">≈ {res.decimalValue}</div>
          )}
        </div>
      </div>

      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5 text-xs">
        <div className="font-semibold text-slate-700">Deduction Steps:</div>
        {res.steps.map((st, idx) => (
          <div key={idx} className="text-slate-600 font-mono">{st}</div>
        ))}
      </div>
    </div>
  );
}
