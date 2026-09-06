'use client';

import React, { useState } from 'react';
import {
  calculateCube,
  calculateCuboid,
  calculateCylinder,
  calculateCone,
  calculateSphere,
  calculatePrism,
  calculatePyramid,
} from '@/lib/calculators/geometry3DEngines';

// ----------------------------------------------------------------------
// 1. Cube Calculator Widget
// ----------------------------------------------------------------------
export function CubeCalculatorWidget() {
  const [side, setSide] = useState<number>(4);
  const res = calculateCube(side);

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
          Cube Side Length (s)
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
        <div className="text-xs font-semibold text-sky-800 uppercase tracking-wider mb-3">Cube Calculations</div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 bg-white rounded-xl border border-sky-200">
            <div className="text-xs text-slate-500">Volume (V)</div>
            <div className="text-xl font-bold text-sky-900">{res.volume}</div>
          </div>
          <div className="p-3 bg-white rounded-xl border border-sky-200">
            <div className="text-xs text-slate-500">Total Surface Area</div>
            <div className="text-xl font-bold text-sky-900">{res.surfaceArea}</div>
          </div>
          <div className="p-3 bg-white rounded-xl border border-sky-200">
            <div className="text-xs text-slate-500">Lateral Surface Area</div>
            <div className="text-xl font-bold text-sky-900">{res.lateralArea}</div>
          </div>
          <div className="p-3 bg-white rounded-xl border border-sky-200">
            <div className="text-xs text-slate-500">Space Diagonal</div>
            <div className="text-xl font-bold text-sky-900">{res.spaceDiagonal}</div>
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
// 2. Cuboid Calculator Widget
// ----------------------------------------------------------------------
export function CuboidCalculatorWidget() {
  const [l, setL] = useState<number>(6);
  const [w, setW] = useState<number>(4);
  const [h, setH] = useState<number>(5);
  const res = calculateCuboid(l, w, h);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Length (l)</label>
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
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Width (w)</label>
          <input
            type="number"
            min="0.1"
            step="any"
            value={w}
            onChange={(e) => setW(Math.max(0.1, Number(e.target.value) || 0))}
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
        <div className="text-xs font-semibold text-sky-800 uppercase tracking-wider mb-3">Cuboid Results</div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 bg-white rounded-xl border border-sky-200">
            <div className="text-xs text-slate-500">Volume</div>
            <div className="text-xl font-bold text-sky-900">{res.volume}</div>
          </div>
          <div className="p-3 bg-white rounded-xl border border-sky-200">
            <div className="text-xs text-slate-500">Total Surface Area</div>
            <div className="text-xl font-bold text-sky-900">{res.surfaceArea}</div>
          </div>
          <div className="p-3 bg-white rounded-xl border border-sky-200">
            <div className="text-xs text-slate-500">Lateral Surface Area</div>
            <div className="text-xl font-bold text-sky-900">{res.lateralArea}</div>
          </div>
          <div className="p-3 bg-white rounded-xl border border-sky-200">
            <div className="text-xs text-slate-500">Space Diagonal</div>
            <div className="text-xl font-bold text-sky-900">{res.spaceDiagonal}</div>
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
// 3. Cylinder Calculator Widget
// ----------------------------------------------------------------------
export function CylinderCalculatorWidget() {
  const [r, setR] = useState<number>(3);
  const [h, setH] = useState<number>(8);
  const res = calculateCylinder(r, h);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Radius (r)</label>
          <input
            type="number"
            min="0.1"
            step="any"
            value={r}
            onChange={(e) => setR(Math.max(0.1, Number(e.target.value) || 0))}
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
        <div className="text-xs font-semibold text-sky-800 uppercase tracking-wider mb-3">Cylinder Geometry</div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 bg-white rounded-xl border border-sky-200">
            <div className="text-xs text-slate-500">Volume</div>
            <div className="text-xl font-bold text-sky-900">{res.volume}</div>
          </div>
          <div className="p-3 bg-white rounded-xl border border-sky-200">
            <div className="text-xs text-slate-500">Total Surface Area</div>
            <div className="text-xl font-bold text-sky-900">{res.totalSurfaceArea}</div>
          </div>
          <div className="p-3 bg-white rounded-xl border border-sky-200">
            <div className="text-xs text-slate-500">Curved (Lateral) Area</div>
            <div className="text-xl font-bold text-sky-900">{res.lateralArea}</div>
          </div>
          <div className="p-3 bg-white rounded-xl border border-sky-200">
            <div className="text-xs text-slate-500">Base Area (Single)</div>
            <div className="text-xl font-bold text-sky-900">{res.baseArea}</div>
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
// 4. Cone Calculator Widget
// ----------------------------------------------------------------------
export function ConeCalculatorWidget() {
  const [r, setR] = useState<number>(4);
  const [h, setH] = useState<number>(6);
  const res = calculateCone(r, h);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Radius (r)</label>
          <input
            type="number"
            min="0.1"
            step="any"
            value={r}
            onChange={(e) => setR(Math.max(0.1, Number(e.target.value) || 0))}
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
        <div className="text-xs font-semibold text-sky-800 uppercase tracking-wider mb-3">Cone Measurements</div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 bg-white rounded-xl border border-sky-200">
            <div className="text-xs text-slate-500">Volume</div>
            <div className="text-xl font-bold text-sky-900">{res.volume}</div>
          </div>
          <div className="p-3 bg-white rounded-xl border border-sky-200">
            <div className="text-xs text-slate-500">Slant Height (l)</div>
            <div className="text-xl font-bold text-sky-900">{res.slantHeight}</div>
          </div>
          <div className="p-3 bg-white rounded-xl border border-sky-200">
            <div className="text-xs text-slate-500">Total Surface Area</div>
            <div className="text-xl font-bold text-sky-900">{res.totalSurfaceArea}</div>
          </div>
          <div className="p-3 bg-white rounded-xl border border-sky-200">
            <div className="text-xs text-slate-500">Lateral (Conical) Area</div>
            <div className="text-xl font-bold text-sky-900">{res.lateralArea}</div>
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
// 5. Sphere Calculator Widget
// ----------------------------------------------------------------------
export function SphereCalculatorWidget() {
  const [r, setR] = useState<number>(5);
  const res = calculateSphere(r);

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Radius (r)</label>
        <input
          type="number"
          min="0.1"
          step="any"
          value={r}
          onChange={(e) => setR(Math.max(0.1, Number(e.target.value) || 0))}
          className="w-full text-base px-3 py-2.5 bg-white border border-slate-300 rounded-lg"
        />
      </div>

      <div className="p-5 bg-sky-50 border border-sky-100 rounded-2xl">
        <div className="text-xs font-semibold text-sky-800 uppercase tracking-wider mb-3">Sphere Outputs</div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 bg-white rounded-xl border border-sky-200">
            <div className="text-xs text-slate-500">Volume</div>
            <div className="text-xl font-bold text-sky-900">{res.volume}</div>
          </div>
          <div className="p-3 bg-white rounded-xl border border-sky-200">
            <div className="text-xs text-slate-500">Surface Area</div>
            <div className="text-xl font-bold text-sky-900">{res.surfaceArea}</div>
          </div>
          <div className="p-3 bg-white rounded-xl border border-sky-200">
            <div className="text-xs text-slate-500">Diameter</div>
            <div className="text-xl font-bold text-sky-900">{res.diameter}</div>
          </div>
          <div className="p-3 bg-white rounded-xl border border-sky-200">
            <div className="text-xs text-slate-500">Circumference</div>
            <div className="text-xl font-bold text-sky-900">{res.circumference}</div>
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
// 6. Prism Calculator Widget
// ----------------------------------------------------------------------
export function PrismCalculatorWidget() {
  const [baseType, setBaseType] = useState<'triangular' | 'rectangular' | 'hexagonal'>('triangular');
  const [dim1, setDim1] = useState<number>(4);
  const [dim2, setDim2] = useState<number>(5);
  const [height, setHeight] = useState<number>(10);

  const res = calculatePrism({
    baseType,
    baseDimension1: dim1,
    baseDimension2: dim2,
    prismHeight: height,
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Base Cross-Section</label>
          <select
            value={baseType}
            onChange={(e) => setBaseType(e.target.value as any)}
            className="w-full text-base px-3 py-2 bg-white border border-slate-300 rounded-lg"
          >
            <option value="triangular">Triangular Base</option>
            <option value="rectangular">Rectangular Base</option>
            <option value="hexagonal">Regular Hexagonal Base</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Prism Height (H)</label>
          <input
            type="number"
            min="0.1"
            step="any"
            value={height}
            onChange={(e) => setHeight(Math.max(0.1, Number(e.target.value) || 0))}
            className="w-full text-base px-3 py-2 bg-white border border-slate-300 rounded-lg"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
            {baseType === 'rectangular' ? 'Base Length' : 'Base Side / Leg 1'}
          </label>
          <input
            type="number"
            min="0.1"
            step="any"
            value={dim1}
            onChange={(e) => setDim1(Math.max(0.1, Number(e.target.value) || 0))}
            className="w-full text-base px-3 py-2 bg-white border border-slate-300 rounded-lg"
          />
        </div>
        {baseType !== 'hexagonal' && (
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              {baseType === 'rectangular' ? 'Base Width' : 'Base Leg 2'}
            </label>
            <input
              type="number"
              min="0.1"
              step="any"
              value={dim2}
              onChange={(e) => setDim2(Math.max(0.1, Number(e.target.value) || 0))}
              className="w-full text-base px-3 py-2 bg-white border border-slate-300 rounded-lg"
            />
          </div>
        )}
      </div>

      <div className="p-5 bg-sky-50 border border-sky-100 rounded-2xl">
        <div className="text-xs font-semibold text-sky-800 uppercase tracking-wider mb-3">Prism Results</div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 bg-white rounded-xl border border-sky-200">
            <div className="text-xs text-slate-500">Volume</div>
            <div className="text-xl font-bold text-sky-900">{res.volume}</div>
          </div>
          <div className="p-3 bg-white rounded-xl border border-sky-200">
            <div className="text-xs text-slate-500">Total Surface Area</div>
            <div className="text-xl font-bold text-sky-900">{res.totalSurfaceArea}</div>
          </div>
          <div className="p-3 bg-white rounded-xl border border-sky-200">
            <div className="text-xs text-slate-500">Lateral Area</div>
            <div className="text-xl font-bold text-sky-900">{res.lateralArea}</div>
          </div>
          <div className="p-3 bg-white rounded-xl border border-sky-200">
            <div className="text-xs text-slate-500">Base Area (Single)</div>
            <div className="text-xl font-bold text-sky-900">{res.baseArea}</div>
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
// 7. Pyramid Calculator Widget
// ----------------------------------------------------------------------
export function PyramidCalculatorWidget() {
  const [l, setL] = useState<number>(6);
  const [w, setW] = useState<number>(6);
  const [h, setH] = useState<number>(4);
  const res = calculatePyramid(l, w, h);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Base Length</label>
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
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Base Width</label>
          <input
            type="number"
            min="0.1"
            step="any"
            value={w}
            onChange={(e) => setW(Math.max(0.1, Number(e.target.value) || 0))}
            className="w-full text-base px-3 py-2 bg-white border border-slate-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Vertical Height</label>
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
        <div className="text-xs font-semibold text-sky-800 uppercase tracking-wider mb-3">Pyramid Measurements</div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 bg-white rounded-xl border border-sky-200">
            <div className="text-xs text-slate-500">Volume</div>
            <div className="text-xl font-bold text-sky-900">{res.volume}</div>
          </div>
          <div className="p-3 bg-white rounded-xl border border-sky-200">
            <div className="text-xs text-slate-500">Total Surface Area</div>
            <div className="text-xl font-bold text-sky-900">{res.totalSurfaceArea}</div>
          </div>
          <div className="p-3 bg-white rounded-xl border border-sky-200">
            <div className="text-xs text-slate-500">Lateral Area</div>
            <div className="text-xl font-bold text-sky-900">{res.lateralArea}</div>
          </div>
          <div className="p-3 bg-white rounded-xl border border-sky-200">
            <div className="text-xs text-slate-500">Slant Height</div>
            <div className="text-xl font-bold text-sky-900">{res.slantHeightLength}</div>
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
