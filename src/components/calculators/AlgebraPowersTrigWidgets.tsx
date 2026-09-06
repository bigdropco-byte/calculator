'use client';

import React, { useState } from 'react';
import {
  solveLinearEquationDetailed,
  solveQuadraticEquationDetailed,
  solveSystem2x2Detailed,
  solveSystem3x3Detailed,
  calculateArithmeticMean,
  calculateWeightedMean,
  calculateSquareNumber,
  calculateCubeNumber,
  calculatePower,
  calculateSquareRoot,
  calculateNthRoot,
  calculateTrigonometric,
  calculateLogarithm,
  calculateNaturalLogarithm,
  calculateCommonLogarithm,
} from '@/lib/calculators/algebraPowersTrigEngines';

// ----------------------------------------------------------------------
// 1. Linear Equation Widget (ax + b = c)
// ----------------------------------------------------------------------
export function LinearEquationWidget() {
  const [a, setA] = useState<number>(2);
  const [b, setB] = useState<number>(3);
  const [c, setC] = useState<number>(11);

  const res = solveLinearEquationDetailed(a, b, c);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Coefficient a</label>
          <input
            type="number"
            value={a}
            onChange={(e) => setA(Number(e.target.value))}
            className="w-full text-base px-3 py-2 bg-white border border-slate-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Constant b</label>
          <input
            type="number"
            value={b}
            onChange={(e) => setB(Number(e.target.value))}
            className="w-full text-base px-3 py-2 bg-white border border-slate-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Result c</label>
          <input
            type="number"
            value={c}
            onChange={(e) => setC(Number(e.target.value))}
            className="w-full text-base px-3 py-2 bg-white border border-slate-300 rounded-lg"
          />
        </div>
      </div>

      <div className="p-5 bg-sky-50 border border-sky-100 rounded-2xl">
        <div className="text-xs font-semibold text-sky-800 uppercase tracking-wider mb-2">Solution for x</div>
        <div className="text-2xl font-bold text-sky-900">
          {res.status === 'unique' ? `x = ${res.solution}` : res.status === 'infinite' ? 'Infinitely Many Solutions' : 'No Solution'}
        </div>
      </div>

      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5 text-xs">
        <div className="font-semibold text-slate-700">Step-by-Step Algebraic Deduction:</div>
        {res.steps.map((st, idx) => (
          <div key={idx} className="text-slate-600 font-mono">{st}</div>
        ))}
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// 2. Quadratic Equation Widget
// ----------------------------------------------------------------------
export function QuadraticEquationWidget() {
  const [a, setA] = useState<number>(1);
  const [b, setB] = useState<number>(-5);
  const [c, setC] = useState<number>(6);

  const res = solveQuadraticEquationDetailed(a || 1, b, c);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">a (x²)</label>
          <input
            type="number"
            value={a}
            onChange={(e) => setA(Number(e.target.value) || 1)}
            className="w-full text-base px-3 py-2 bg-white border border-slate-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">b (x)</label>
          <input
            type="number"
            value={b}
            onChange={(e) => setB(Number(e.target.value))}
            className="w-full text-base px-3 py-2 bg-white border border-slate-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">c (constant)</label>
          <input
            type="number"
            value={c}
            onChange={(e) => setC(Number(e.target.value))}
            className="w-full text-base px-3 py-2 bg-white border border-slate-300 rounded-lg"
          />
        </div>
      </div>

      <div className="p-5 bg-sky-50 border border-sky-100 rounded-2xl">
        <div className="text-xs font-semibold text-sky-800 uppercase tracking-wider mb-2">Roots & Discriminant</div>
        <div className="flex flex-wrap items-center gap-3 mb-3">
          {res.roots.map((r, i) => (
            <span key={i} className="px-3 py-1.5 bg-white border border-sky-200 rounded-lg text-lg font-bold text-sky-900">
              x{i + 1} = {r.formatted}
            </span>
          ))}
          <span className="text-xs px-2.5 py-1 bg-sky-200 text-sky-800 rounded-full font-semibold">
            Δ = {res.discriminant} ({res.natureOfRoots})
          </span>
        </div>
        <div className="text-xs text-slate-600">
          Parabola Vertex: ({res.vertex.h}, {res.vertex.k}) | Axis of Symmetry: x = {res.axisOfSymmetry}
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
// 3. System of Linear Equations Widget (2x2 & 3x3)
// ----------------------------------------------------------------------
export function SystemOfEquationsWidget() {
  const [systemType, setSystemType] = useState<'2x2' | '3x3'>('2x2');

  // 2x2
  const [a1, setA1] = useState<number>(2);
  const [b1, setB1] = useState<number>(1);
  const [c1, setC1] = useState<number>(7);
  const [a2, setA2] = useState<number>(1);
  const [b2, setB2] = useState<number>(3);
  const [c2, setC2] = useState<number>(11);

  // 3x3
  const [m, setM] = useState<number[][]>([
    [1, 1, 1, 6],
    [0, 2, 5, -4],
    [2, 5, -1, 27],
  ]);

  const res2 = solveSystem2x2Detailed(a1, b1, c1, a2, b2, c2);
  const res3 = solveSystem3x3Detailed(m);

  return (
    <div className="space-y-6">
      <div className="flex gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setSystemType('2x2')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
            systemType === '2x2' ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-700'
          }`}
        >
          2 Variables (2×2 System)
        </button>
        <button
          onClick={() => setSystemType('3x3')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
            systemType === '3x3' ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-700'
          }`}
        >
          3 Variables (3×3 System)
        </button>
      </div>

      {systemType === '2x2' ? (
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-3">
            <div><label className="text-xs text-slate-500">Eq 1: a₁</label><input type="number" value={a1} onChange={(e) => setA1(Number(e.target.value))} className="w-full p-2 border rounded-lg" /></div>
            <div><label className="text-xs text-slate-500">b₁</label><input type="number" value={b1} onChange={(e) => setB1(Number(e.target.value))} className="w-full p-2 border rounded-lg" /></div>
            <div><label className="text-xs text-slate-500">c₁</label><input type="number" value={c1} onChange={(e) => setC1(Number(e.target.value))} className="w-full p-2 border rounded-lg" /></div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div><label className="text-xs text-slate-500">Eq 2: a₂</label><input type="number" value={a2} onChange={(e) => setA2(Number(e.target.value))} className="w-full p-2 border rounded-lg" /></div>
            <div><label className="text-xs text-slate-500">b₂</label><input type="number" value={b2} onChange={(e) => setB2(Number(e.target.value))} className="w-full p-2 border rounded-lg" /></div>
            <div><label className="text-xs text-slate-500">c₂</label><input type="number" value={c2} onChange={(e) => setC2(Number(e.target.value))} className="w-full p-2 border rounded-lg" /></div>
          </div>

          <div className="p-5 bg-sky-50 border border-sky-100 rounded-2xl">
            <div className="text-xs font-semibold text-sky-800 uppercase tracking-wider mb-2">Solution (Cramer's Rule)</div>
            <div className="flex gap-4 text-xl font-bold text-sky-900">
              <div>x = {res2.x}</div>
              <div>y = {res2.y}</div>
            </div>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5 text-xs">
            <div className="font-semibold text-slate-700">Deduction Steps:</div>
            {res2.steps.map((st, idx) => (
              <div key={idx} className="text-slate-600 font-mono">{st}</div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="text-xs text-slate-500 font-semibold">Row coefficients: [a, b, c = d]</div>
          {m.map((row, rIdx) => (
            <div key={rIdx} className="grid grid-cols-4 gap-2">
              {row.map((val, cIdx) => (
                <input
                  key={cIdx}
                  type="number"
                  value={val}
                  onChange={(e) => {
                    const next = m.map((r, i) =>
                      i === rIdx ? r.map((c, j) => (j === cIdx ? Number(e.target.value) : c)) : r
                    );
                    setM(next);
                  }}
                  className="p-2 border rounded-lg text-sm text-center"
                />
              ))}
            </div>
          ))}

          <div className="p-5 bg-sky-50 border border-sky-100 rounded-2xl">
            <div className="text-xs font-semibold text-sky-800 uppercase tracking-wider mb-2">3×3 Solution</div>
            <div className="flex gap-4 text-xl font-bold text-sky-900">
              <div>x = {res3.x}</div>
              <div>y = {res3.y}</div>
              <div>z = {res3.z}</div>
            </div>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5 text-xs">
            <div className="font-semibold text-slate-700">Deduction Steps:</div>
            {res3.steps.map((st, idx) => (
              <div key={idx} className="text-slate-600 font-mono">{st}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ----------------------------------------------------------------------
// 4. Arithmetic Mean Widget
// ----------------------------------------------------------------------
export function ArithmeticMeanWidget() {
  const [input, setInput] = useState<string>('12, 15, 20, 24, 30, 45');
  const numbers = input
    .split(/[\s,]+/)
    .map((s) => parseFloat(s.trim()))
    .filter((n) => !isNaN(n));

  const res = calculateArithmeticMean(numbers);

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
          Enter Numbers (separated by commas or spaces)
        </label>
        <textarea
          rows={3}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full text-base px-3 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500"
          placeholder="e.g. 10, 20, 30, 40"
        />
      </div>

      <div className="p-5 bg-sky-50 border border-sky-100 rounded-2xl">
        <div className="text-xs font-semibold text-sky-800 uppercase tracking-wider mb-3">Mean & Statistical Summary</div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 bg-white rounded-xl border border-sky-200">
            <div className="text-xs text-slate-500">Arithmetic Mean (x̄)</div>
            <div className="text-2xl font-bold text-sky-900">{res.mean}</div>
          </div>
          <div className="p-3 bg-white rounded-xl border border-sky-200">
            <div className="text-xs text-slate-500">Median</div>
            <div className="text-xl font-bold text-sky-900">{res.median}</div>
          </div>
          <div className="p-3 bg-white rounded-xl border border-sky-200">
            <div className="text-xs text-slate-500">Sum (Σx)</div>
            <div className="text-xl font-bold text-sky-900">{res.sum}</div>
          </div>
          <div className="p-3 bg-white rounded-xl border border-sky-200">
            <div className="text-xs text-slate-500">Std Deviation (σ)</div>
            <div className="text-xl font-bold text-sky-900">{res.standardDeviation}</div>
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
// 5. Weighted Average Widget
// ----------------------------------------------------------------------
export function WeightedAverageWidget() {
  const [rows, setRows] = useState<{ value: number; weight: number }[]>([
    { value: 85, weight: 20 },
    { value: 92, weight: 30 },
    { value: 78, weight: 50 },
  ]);

  const addRow = () => setRows([...rows, { value: 0, weight: 1 }]);
  const removeRow = (idx: number) => {
    if (rows.length > 1) setRows(rows.filter((_, i) => i !== idx));
  };

  const updateRow = (idx: number, field: 'value' | 'weight', val: number) => {
    setRows(rows.map((r, i) => (i === idx ? { ...r, [field]: val } : r)));
  };

  const res = calculateWeightedMean(rows);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="grid grid-cols-12 gap-2 text-xs font-semibold text-slate-600 uppercase tracking-wider">
          <div className="col-span-5">Value (x)</div>
          <div className="col-span-5">Weight (w)</div>
          <div className="col-span-2">Action</div>
        </div>
        {rows.map((r, i) => (
          <div key={i} className="grid grid-cols-12 gap-2 items-center">
            <div className="col-span-5">
              <input
                type="number"
                value={r.value}
                onChange={(e) => updateRow(i, 'value', Number(e.target.value))}
                className="w-full px-3 py-2 border rounded-lg text-sm"
              />
            </div>
            <div className="col-span-5">
              <input
                type="number"
                min="0"
                value={r.weight}
                onChange={(e) => updateRow(i, 'weight', Math.max(0, Number(e.target.value)))}
                className="w-full px-3 py-2 border rounded-lg text-sm"
              />
            </div>
            <div className="col-span-2 text-center">
              <button
                onClick={() => removeRow(i)}
                className="text-xs text-rose-600 hover:text-rose-800 font-semibold"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        <button
          onClick={addRow}
          className="text-xs px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold"
        >
          + Add Data Pair
        </button>
      </div>

      <div className="p-5 bg-sky-50 border border-sky-100 rounded-2xl">
        <div className="text-xs font-semibold text-sky-800 uppercase tracking-wider mb-2">Weighted Arithmetic Mean</div>
        <div className="text-3xl font-bold text-sky-900">{res.weightedMean}</div>
        <div className="text-xs text-slate-600 mt-2">
          Total Weights: {res.totalWeight} | Sum of Products: {res.sumOfProducts}
        </div>
      </div>

      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5 text-xs">
        <div className="font-semibold text-slate-700">Calculation Steps:</div>
        {res.steps.map((st, idx) => (
          <div key={idx} className="text-slate-600 font-mono">{st}</div>
        ))}
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// 6. Square Power Widget (x²)
// ----------------------------------------------------------------------
export function SquarePowerWidget() {
  const [x, setX] = useState<number>(12);
  const res = calculateSquareNumber(x);

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Number to Square (x)</label>
        <input
          type="number"
          value={x}
          onChange={(e) => setX(Number(e.target.value))}
          className="w-full text-base px-3 py-2.5 bg-white border border-slate-300 rounded-lg"
        />
      </div>

      <div className="p-5 bg-sky-50 border border-sky-100 rounded-2xl">
        <div className="text-xs font-semibold text-sky-800 uppercase tracking-wider mb-2">Result: x²</div>
        <div className="text-3xl font-bold text-sky-900">{res.result}</div>
        <div className="text-xs text-slate-500 mt-1 font-mono">Scientific: {res.scientificNotation}</div>
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
// 7. Cube Power Widget (x³)
// ----------------------------------------------------------------------
export function CubePowerWidget() {
  const [x, setX] = useState<number>(7);
  const res = calculateCubeNumber(x);

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Number to Cube (x)</label>
        <input
          type="number"
          value={x}
          onChange={(e) => setX(Number(e.target.value))}
          className="w-full text-base px-3 py-2.5 bg-white border border-slate-300 rounded-lg"
        />
      </div>

      <div className="p-5 bg-sky-50 border border-sky-100 rounded-2xl">
        <div className="text-xs font-semibold text-sky-800 uppercase tracking-wider mb-2">Result: x³</div>
        <div className="text-3xl font-bold text-sky-900">{res.result}</div>
        <div className="text-xs text-slate-500 mt-1 font-mono">Scientific: {res.scientificNotation}</div>
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
// 8. Nth Power Widget (x^n)
// ----------------------------------------------------------------------
export function NthPowerWidget() {
  const [b, setB] = useState<number>(2);
  const [n, setN] = useState<number>(8);
  const res = calculatePower(b, n);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Base (x)</label>
          <input
            type="number"
            value={b}
            onChange={(e) => setB(Number(e.target.value))}
            className="w-full text-base px-3 py-2 bg-white border border-slate-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Exponent (n)</label>
          <input
            type="number"
            value={n}
            onChange={(e) => setN(Number(e.target.value))}
            className="w-full text-base px-3 py-2 bg-white border border-slate-300 rounded-lg"
          />
        </div>
      </div>

      <div className="p-5 bg-sky-50 border border-sky-100 rounded-2xl">
        <div className="text-xs font-semibold text-sky-800 uppercase tracking-wider mb-2">Power Result: {b}^{n}</div>
        <div className="text-3xl font-bold text-sky-900">{res.result}</div>
        <div className="text-xs text-slate-500 mt-1 font-mono">Scientific: {res.scientificNotation}</div>
      </div>

      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5 text-xs">
        <div className="font-semibold text-slate-700">Calculation Steps:</div>
        {res.steps.map((st, idx) => (
          <div key={idx} className="text-slate-600 font-mono">{st}</div>
        ))}
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// 9. Square Root Widget (√x)
// ----------------------------------------------------------------------
export function SquareRootWidget() {
  const [x, setX] = useState<number>(50);
  const res = calculateSquareRoot(x);

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Number (x)</label>
        <input
          type="number"
          value={x}
          onChange={(e) => setX(Number(e.target.value))}
          className="w-full text-base px-3 py-2.5 bg-white border border-slate-300 rounded-lg"
        />
      </div>

      <div className="p-5 bg-sky-50 border border-sky-100 rounded-2xl">
        <div className="text-xs font-semibold text-sky-800 uppercase tracking-wider mb-2">Square Root: √{x}</div>
        <div className="text-3xl font-bold text-sky-900">
          {res.isReal ? res.principalRoot : res.complexRoot}
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
// 10. Nth Root Widget (ⁿ√x)
// ----------------------------------------------------------------------
export function NthRootWidget() {
  const [x, setX] = useState<number>(32);
  const [n, setN] = useState<number>(5);
  const res = calculateNthRoot(x, n || 1);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Radicand (x)</label>
          <input
            type="number"
            value={x}
            onChange={(e) => setX(Number(e.target.value))}
            className="w-full text-base px-3 py-2 bg-white border border-slate-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Root Degree (n)</label>
          <input
            type="number"
            min="1"
            value={n}
            onChange={(e) => setN(Math.max(1, Number(e.target.value) || 1))}
            className="w-full text-base px-3 py-2 bg-white border border-slate-300 rounded-lg"
          />
        </div>
      </div>

      <div className="p-5 bg-sky-50 border border-sky-100 rounded-2xl">
        <div className="text-xs font-semibold text-sky-800 uppercase tracking-wider mb-2">
          {n}th Root: ⁿ√{x}
        </div>
        <div className="text-3xl font-bold text-sky-900">
          {res.isReal ? res.principalRoot : res.complexRoot}
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
// 11. Sine Calculator Widget
// ----------------------------------------------------------------------
export function SineCalculatorWidget() {
  const [angle, setAngle] = useState<number>(30);
  const [mode, setMode] = useState<'deg' | 'rad'>('deg');
  const res = calculateTrigonometric('sin', angle, mode);

  return (
    <div className="space-y-6">
      <div className="flex gap-4 items-end">
        <div className="flex-1">
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Angle (θ)</label>
          <input
            type="number"
            step="any"
            value={angle}
            onChange={(e) => setAngle(Number(e.target.value) || 0)}
            className="w-full text-base px-3 py-2.5 bg-white border border-slate-300 rounded-lg"
          />
        </div>
        <div className="flex bg-slate-100 p-1 rounded-lg">
          <button
            onClick={() => setMode('deg')}
            className={`px-3 py-2 text-xs font-bold rounded-md ${
              mode === 'deg' ? 'bg-white shadow text-sky-700' : 'text-slate-600'
            }`}
          >
            Degrees (°)
          </button>
          <button
            onClick={() => setMode('rad')}
            className={`px-3 py-2 text-xs font-bold rounded-md ${
              mode === 'rad' ? 'bg-white shadow text-sky-700' : 'text-slate-600'
            }`}
          >
            Radians
          </button>
        </div>
      </div>

      <div className="p-5 bg-sky-50 border border-sky-100 rounded-2xl">
        <div className="text-xs font-semibold text-sky-800 uppercase tracking-wider mb-2">sin({angle}{mode === 'deg' ? '°' : ' rad'})</div>
        <div className="flex items-baseline gap-3">
          <div className="text-3xl font-bold text-sky-900">{res.value}</div>
          {res.exactValueLabel && (
            <div className="text-lg font-semibold text-slate-600">Exact: {res.exactValueLabel}</div>
          )}
        </div>
        <div className="text-xs text-slate-500 mt-2 font-mono">
          Unit Circle (x, y) = ({res.unitCircleCoordinates.x}, {res.unitCircleCoordinates.y})
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
// 12. Cosine Calculator Widget
// ----------------------------------------------------------------------
export function CosineCalculatorWidget() {
  const [angle, setAngle] = useState<number>(60);
  const [mode, setMode] = useState<'deg' | 'rad'>('deg');
  const res = calculateTrigonometric('cos', angle, mode);

  return (
    <div className="space-y-6">
      <div className="flex gap-4 items-end">
        <div className="flex-1">
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Angle (θ)</label>
          <input
            type="number"
            step="any"
            value={angle}
            onChange={(e) => setAngle(Number(e.target.value) || 0)}
            className="w-full text-base px-3 py-2.5 bg-white border border-slate-300 rounded-lg"
          />
        </div>
        <div className="flex bg-slate-100 p-1 rounded-lg">
          <button
            onClick={() => setMode('deg')}
            className={`px-3 py-2 text-xs font-bold rounded-md ${
              mode === 'deg' ? 'bg-white shadow text-sky-700' : 'text-slate-600'
            }`}
          >
            Degrees (°)
          </button>
          <button
            onClick={() => setMode('rad')}
            className={`px-3 py-2 text-xs font-bold rounded-md ${
              mode === 'rad' ? 'bg-white shadow text-sky-700' : 'text-slate-600'
            }`}
          >
            Radians
          </button>
        </div>
      </div>

      <div className="p-5 bg-sky-50 border border-sky-100 rounded-2xl">
        <div className="text-xs font-semibold text-sky-800 uppercase tracking-wider mb-2">cos({angle}{mode === 'deg' ? '°' : ' rad'})</div>
        <div className="flex items-baseline gap-3">
          <div className="text-3xl font-bold text-sky-900">{res.value}</div>
          {res.exactValueLabel && (
            <div className="text-lg font-semibold text-slate-600">Exact: {res.exactValueLabel}</div>
          )}
        </div>
        <div className="text-xs text-slate-500 mt-2 font-mono">
          Unit Circle (x, y) = ({res.unitCircleCoordinates.x}, {res.unitCircleCoordinates.y})
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
// 13. Tangent Calculator Widget
// ----------------------------------------------------------------------
export function TangentCalculatorWidget() {
  const [angle, setAngle] = useState<number>(45);
  const [mode, setMode] = useState<'deg' | 'rad'>('deg');
  const res = calculateTrigonometric('tan', angle, mode);

  return (
    <div className="space-y-6">
      <div className="flex gap-4 items-end">
        <div className="flex-1">
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Angle (θ)</label>
          <input
            type="number"
            step="any"
            value={angle}
            onChange={(e) => setAngle(Number(e.target.value) || 0)}
            className="w-full text-base px-3 py-2.5 bg-white border border-slate-300 rounded-lg"
          />
        </div>
        <div className="flex bg-slate-100 p-1 rounded-lg">
          <button
            onClick={() => setMode('deg')}
            className={`px-3 py-2 text-xs font-bold rounded-md ${
              mode === 'deg' ? 'bg-white shadow text-sky-700' : 'text-slate-600'
            }`}
          >
            Degrees (°)
          </button>
          <button
            onClick={() => setMode('rad')}
            className={`px-3 py-2 text-xs font-bold rounded-md ${
              mode === 'rad' ? 'bg-white shadow text-sky-700' : 'text-slate-600'
            }`}
          >
            Radians
          </button>
        </div>
      </div>

      <div className="p-5 bg-sky-50 border border-sky-100 rounded-2xl">
        <div className="text-xs font-semibold text-sky-800 uppercase tracking-wider mb-2">tan({angle}{mode === 'deg' ? '°' : ' rad'})</div>
        <div className="text-3xl font-bold text-sky-900">
          {res.isUndefined ? 'Undefined (Asymptote)' : res.value}
        </div>
        {res.exactValueLabel && !res.isUndefined && (
          <div className="text-sm font-semibold text-slate-600 mt-1">Exact: {res.exactValueLabel}</div>
        )}
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
// 14. Cotangent Calculator Widget
// ----------------------------------------------------------------------
export function CotangentCalculatorWidget() {
  const [angle, setAngle] = useState<number>(45);
  const [mode, setMode] = useState<'deg' | 'rad'>('deg');
  const res = calculateTrigonometric('cot', angle, mode);

  return (
    <div className="space-y-6">
      <div className="flex gap-4 items-end">
        <div className="flex-1">
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Angle (θ)</label>
          <input
            type="number"
            step="any"
            value={angle}
            onChange={(e) => setAngle(Number(e.target.value) || 0)}
            className="w-full text-base px-3 py-2.5 bg-white border border-slate-300 rounded-lg"
          />
        </div>
        <div className="flex bg-slate-100 p-1 rounded-lg">
          <button
            onClick={() => setMode('deg')}
            className={`px-3 py-2 text-xs font-bold rounded-md ${
              mode === 'deg' ? 'bg-white shadow text-sky-700' : 'text-slate-600'
            }`}
          >
            Degrees (°)
          </button>
          <button
            onClick={() => setMode('rad')}
            className={`px-3 py-2 text-xs font-bold rounded-md ${
              mode === 'rad' ? 'bg-white shadow text-sky-700' : 'text-slate-600'
            }`}
          >
            Radians
          </button>
        </div>
      </div>

      <div className="p-5 bg-sky-50 border border-sky-100 rounded-2xl">
        <div className="text-xs font-semibold text-sky-800 uppercase tracking-wider mb-2">cot({angle}{mode === 'deg' ? '°' : ' rad'})</div>
        <div className="text-3xl font-bold text-sky-900">
          {res.isUndefined ? 'Undefined (Asymptote)' : res.value}
        </div>
        {res.exactValueLabel && !res.isUndefined && (
          <div className="text-sm font-semibold text-slate-600 mt-1">Exact: {res.exactValueLabel}</div>
        )}
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
// 15. Logarithm Calculator Widget (log_b(x))
// ----------------------------------------------------------------------
export function LogarithmCalculatorWidget() {
  const [x, setX] = useState<number>(100);
  const [base, setBase] = useState<number>(10);

  let res;
  let errorMsg: string | undefined;
  try {
    res = calculateLogarithm(x, base);
  } catch (err: any) {
    errorMsg = err.message;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Argument (x &gt; 0)</label>
          <input
            type="number"
            min="0.0001"
            step="any"
            value={x}
            onChange={(e) => setX(Math.max(0.0001, Number(e.target.value) || 0.0001))}
            className="w-full text-base px-3 py-2 bg-white border border-slate-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Base (b &gt; 0, b ≠ 1)</label>
          <input
            type="number"
            min="0.0001"
            step="any"
            value={base}
            onChange={(e) => setBase(Math.max(0.0001, Number(e.target.value) || 2))}
            className="w-full text-base px-3 py-2 bg-white border border-slate-300 rounded-lg"
          />
        </div>
      </div>

      {errorMsg ? (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-sm">{errorMsg}</div>
      ) : res ? (
        <>
          <div className="p-5 bg-sky-50 border border-sky-100 rounded-2xl">
            <div className="text-xs font-semibold text-sky-800 uppercase tracking-wider mb-2">log_{base}({x})</div>
            <div className="text-3xl font-bold text-sky-900">{res.result}</div>
            <div className="text-xs text-slate-600 mt-2 font-mono">Exponential relationship: {res.exponentialForm}</div>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5 text-xs">
            <div className="font-semibold text-slate-700">Deduction Steps:</div>
            {res.steps.map((st, idx) => (
              <div key={idx} className="text-slate-600 font-mono">{st}</div>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}

// ----------------------------------------------------------------------
// 16. Natural Logarithm Widget (ln(x))
// ----------------------------------------------------------------------
export function NaturalLogarithmWidget() {
  const [x, setX] = useState<number>(20);
  let res;
  let errorMsg: string | undefined;

  try {
    res = calculateNaturalLogarithm(x);
  } catch (err: any) {
    errorMsg = err.message;
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Argument (x &gt; 0)</label>
        <input
          type="number"
          min="0.0001"
          step="any"
          value={x}
          onChange={(e) => setX(Math.max(0.0001, Number(e.target.value) || 0.0001))}
          className="w-full text-base px-3 py-2.5 bg-white border border-slate-300 rounded-lg"
        />
      </div>

      {errorMsg ? (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-sm">{errorMsg}</div>
      ) : res ? (
        <>
          <div className="p-5 bg-sky-50 border border-sky-100 rounded-2xl">
            <div className="text-xs font-semibold text-sky-800 uppercase tracking-wider mb-2">ln({x}) = log_e({x})</div>
            <div className="text-3xl font-bold text-sky-900">{res.result}</div>
            <div className="text-xs text-slate-600 mt-2 font-mono">Euler's constant e ≈ 2.7182818</div>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5 text-xs">
            <div className="font-semibold text-slate-700">Deduction Steps:</div>
            {res.steps.map((st, idx) => (
              <div key={idx} className="text-slate-600 font-mono">{st}</div>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}

// ----------------------------------------------------------------------
// 17. Common Logarithm Widget (log10(x))
// ----------------------------------------------------------------------
export function CommonLogarithmWidget() {
  const [x, setX] = useState<number>(500);
  let res;
  let errorMsg: string | undefined;

  try {
    res = calculateCommonLogarithm(x);
  } catch (err: any) {
    errorMsg = err.message;
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Argument (x &gt; 0)</label>
        <input
          type="number"
          min="0.0001"
          step="any"
          value={x}
          onChange={(e) => setX(Math.max(0.0001, Number(e.target.value) || 0.0001))}
          className="w-full text-base px-3 py-2.5 bg-white border border-slate-300 rounded-lg"
        />
      </div>

      {errorMsg ? (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-sm">{errorMsg}</div>
      ) : res ? (
        <>
          <div className="p-5 bg-sky-50 border border-sky-100 rounded-2xl">
            <div className="text-xs font-semibold text-sky-800 uppercase tracking-wider mb-2">log₁₀({x})</div>
            <div className="text-3xl font-bold text-sky-900">{res.result}</div>
            <div className="text-xs text-slate-600 mt-2 font-mono">10^({res.result}) ≈ {x}</div>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5 text-xs">
            <div className="font-semibold text-slate-700">Deduction Steps:</div>
            {res.steps.map((st, idx) => (
              <div key={idx} className="text-slate-600 font-mono">{st}</div>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
