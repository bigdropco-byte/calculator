'use client';

import React, { useState } from 'react';
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
} from '@/lib/calculators/stemEngines';

// ----------------------------------------------------------------------
// 1. Sphere Packing Widget
// ----------------------------------------------------------------------
export function SpherePackingWidget() {
  const [containerType, setContainerType] = useState<'box' | 'cylinder' | 'sphere'>('box');
  const [sphereRadius, setSphereRadius] = useState<number>(1);
  const [boxL, setBoxL] = useState<number>(10);
  const [boxW, setBoxW] = useState<number>(10);
  const [boxH, setBoxH] = useState<number>(10);
  const [cylR, setCylR] = useState<number>(6);
  const [cylH, setCylH] = useState<number>(12);
  const [sphereR, setSphereR] = useState<number>(8);

  const res = calculateSpherePacking({
    containerType,
    sphereRadius,
    boxLength: boxL,
    boxWidth: boxW,
    boxHeight: boxH,
    cylinderRadius: cylR,
    cylinderHeight: cylH,
    containerRadius: sphereR,
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
            Container Geometry
          </label>
          <select
            value={containerType}
            onChange={(e) => setContainerType(e.target.value as any)}
            className="w-full text-base px-3 py-2.5 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
          >
            <option value="box">Rectangular Box / Crate</option>
            <option value="cylinder">Cylinder / Drum</option>
            <option value="sphere">Spherical Vessel</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
            Sphere Radius (r)
          </label>
          <input
            type="number"
            min="0.1"
            step="0.1"
            value={sphereRadius}
            onChange={(e) => setSphereRadius(Number(e.target.value))}
            className="w-full text-base px-3 py-2.5 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
          />
        </div>
      </div>

      {containerType === 'box' && (
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Length</label>
            <input
              type="number"
              value={boxL}
              onChange={(e) => setBoxL(Number(e.target.value))}
              className="w-full text-base px-3 py-2 bg-white border border-slate-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Width</label>
            <input
              type="number"
              value={boxW}
              onChange={(e) => setBoxW(Number(e.target.value))}
              className="w-full text-base px-3 py-2 bg-white border border-slate-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Height</label>
            <input
              type="number"
              value={boxH}
              onChange={(e) => setBoxH(Number(e.target.value))}
              className="w-full text-base px-3 py-2 bg-white border border-slate-300 rounded-lg"
            />
          </div>
        </div>
      )}

      {containerType === 'cylinder' && (
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Cylinder Radius</label>
            <input
              type="number"
              value={cylR}
              onChange={(e) => setCylR(Number(e.target.value))}
              className="w-full text-base px-3 py-2 bg-white border border-slate-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Cylinder Height</label>
            <input
              type="number"
              value={cylH}
              onChange={(e) => setCylH(Number(e.target.value))}
              className="w-full text-base px-3 py-2 bg-white border border-slate-300 rounded-lg"
            />
          </div>
        </div>
      )}

      {containerType === 'sphere' && (
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">Container Sphere Radius</label>
          <input
            type="number"
            value={sphereR}
            onChange={(e) => setSphereR(Number(e.target.value))}
            className="w-full text-base px-3 py-2 bg-white border border-slate-300 rounded-lg"
          />
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
        <div className="p-4 bg-sky-50 rounded-xl border border-sky-100 text-center">
          <div className="text-xs text-slate-500 font-medium">Estimated Fit</div>
          <div className="text-2xl font-bold text-sky-700 mt-1">{res.estimatedFitCount.toLocaleString()}</div>
          <div className="text-[11px] text-sky-600 mt-0.5">spheres</div>
        </div>
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
          <div className="text-xs text-slate-500 font-medium">Kepler Bound (FCC)</div>
          <div className="text-2xl font-bold text-slate-800 mt-1">{res.maxTheoreticalCount.toLocaleString()}</div>
          <div className="text-[11px] text-slate-500 mt-0.5">74.05% max density</div>
        </div>
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
          <div className="text-xs text-slate-500 font-medium">Random Close (RCP)</div>
          <div className="text-2xl font-bold text-slate-800 mt-1">{res.randomCloseCount.toLocaleString()}</div>
          <div className="text-[11px] text-slate-500 mt-0.5">~64% pour density</div>
        </div>
        <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 text-center">
          <div className="text-xs text-emerald-700 font-medium">Volume Filled</div>
          <div className="text-2xl font-bold text-emerald-800 mt-1">{res.packingEfficiencyPercent}%</div>
          <div className="text-[11px] text-emerald-600 mt-0.5">{res.emptySpaceVolume} void vol</div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// 2. Cube Root Widget
// ----------------------------------------------------------------------
export function CubeRootWidget() {
  const [val, setVal] = useState<number>(64);
  const res = calculateCubeRoot(val);

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
          Number (x)
        </label>
        <input
          type="number"
          step="any"
          value={val}
          onChange={(e) => setVal(Number(e.target.value))}
          className="w-full text-base px-3 py-2.5 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
        />
      </div>

      <div className="p-5 bg-sky-50 border border-sky-100 rounded-2xl text-center">
        <div className="text-xs font-semibold text-sky-800 uppercase tracking-wider">Principal Cube Root</div>
        <div className="text-4xl font-extrabold text-sky-700 my-2">∛{val} = {res.principalRoot}</div>
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-sky-200 rounded-full text-xs font-medium text-sky-800">
          {res.isPerfectCube ? '✓ Perfect Cube' : 'Non-perfect Cube'}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
          <div className="text-xs text-slate-500">Nearest Lower Perfect Cube</div>
          <div className="text-lg font-bold text-slate-800 mt-1">{res.nearestLowerPerfectCube}</div>
          <div className="text-xs text-slate-500">{res.nearestLowerRoot}³ = {res.nearestLowerPerfectCube}</div>
        </div>
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
          <div className="text-xs text-slate-500">Nearest Higher Perfect Cube</div>
          <div className="text-lg font-bold text-slate-800 mt-1">{res.nearestHigherPerfectCube}</div>
          <div className="text-xs text-slate-500">{res.nearestHigherRoot}³ = {res.nearestHigherPerfectCube}</div>
        </div>
      </div>

      <div className="p-4 bg-white border border-slate-200 rounded-xl text-xs space-y-1 text-slate-600">
        <div className="font-semibold text-slate-700">Complex Conjugate Roots:</div>
        <div>Root 2: {res.complexRoots[0].real} + {res.complexRoots[0].imag}i</div>
        <div>Root 3: {res.complexRoots[1].real} - {Math.abs(res.complexRoots[1].imag)}i</div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// 3. Best Scientific Calculator Widget
// ----------------------------------------------------------------------
export function BestScientificCalculatorWidget() {
  const [display, setDisplay] = useState<string>('0');
  const [memory, setMemory] = useState<number>(0);
  const [angleMode, setAngleMode] = useState<'deg' | 'rad'>('deg');
  const [history, setHistory] = useState<string[]>([]);

  const handleDigit = (d: string) => {
    setDisplay((prev) => (prev === '0' || prev === 'Error' ? d : prev + d));
  };

  const handleOp = (op: string) => {
    setDisplay((prev) => prev + ' ' + op + ' ');
  };

  const handleClear = () => {
    setDisplay('0');
  };

  const handleScientificUnary = (op: any) => {
    const num = parseFloat(display.trim().split(' ').pop() || '0');
    const res = calculateScientificUnary({ operation: op, val: num, angleMode });
    if (res.error) {
      setDisplay('Error');
    } else {
      setDisplay(String(res.result));
      setHistory((h) => [`${op}(${num}) = ${res.result}`, ...h.slice(0, 4)]);
    }
  };

  const handleEquals = () => {
    try {
      const sanitized = display.replace(/×/g, '*').replace(/÷/g, '/').replace(/\^/g, '**');
      // eslint-disable-next-line no-eval
      const evalRes = Function(`'use strict'; return (${sanitized})`)();
      const rounded = Number(Number(evalRes).toFixed(8));
      setHistory((h) => [`${display} = ${rounded}`, ...h.slice(0, 4)]);
      setDisplay(String(rounded));
    } catch {
      setDisplay('Error');
    }
  };

  return (
    <div className="space-y-4 max-w-lg mx-auto bg-slate-900 text-white p-5 rounded-3xl shadow-xl">
      <div className="flex items-center justify-between text-xs text-slate-400 px-2">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setAngleMode(angleMode === 'deg' ? 'rad' : 'deg')}
            className="px-2 py-1 bg-slate-800 rounded font-semibold text-amber-400 hover:bg-slate-700"
          >
            {angleMode.toUpperCase()}
          </button>
          {memory !== 0 && <span className="px-2 py-1 bg-sky-900/60 text-sky-300 rounded">M: {memory}</span>}
        </div>
        <div className="text-right text-[11px] text-slate-400 truncate max-w-[200px]">
          {history[0] || 'Calculat Scientific'}
        </div>
      </div>

      <div className="p-4 bg-slate-950 rounded-2xl text-right">
        <div className="text-3xl sm:text-4xl font-mono tracking-tight text-emerald-400 overflow-x-auto">
          {display}
        </div>
      </div>

      <div className="grid grid-cols-5 gap-2 text-sm font-semibold">
        {/* Scientific Row 1 */}
        <button type="button" onClick={() => handleScientificUnary('sin')} className="p-2.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-sky-300">sin</button>
        <button type="button" onClick={() => handleScientificUnary('cos')} className="p-2.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-sky-300">cos</button>
        <button type="button" onClick={() => handleScientificUnary('tan')} className="p-2.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-sky-300">tan</button>
        <button type="button" onClick={() => handleScientificUnary('ln')} className="p-2.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-sky-300">ln</button>
        <button type="button" onClick={() => handleScientificUnary('log10')} className="p-2.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-sky-300">log</button>

        {/* Scientific Row 2 */}
        <button type="button" onClick={() => handleScientificUnary('sqrt')} className="p-2.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-sky-300">√x</button>
        <button type="button" onClick={() => handleScientificUnary('cbrt')} className="p-2.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-sky-300">∛x</button>
        <button type="button" onClick={() => handleScientificUnary('square')} className="p-2.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-sky-300">x²</button>
        <button type="button" onClick={() => handleOp('^')} className="p-2.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-sky-300">xʸ</button>
        <button type="button" onClick={() => handleScientificUnary('factorial')} className="p-2.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-sky-300">n!</button>

        {/* Standard Keypad */}
        <button type="button" onClick={() => setDisplay((d) => (d === '0' ? '3.14159265' : d + '3.14159265'))} className="p-2.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-purple-300">π</button>
        <button type="button" onClick={() => setDisplay((d) => (d === '0' ? '2.71828182' : d + '2.71828182'))} className="p-2.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-purple-300">e</button>
        <button type="button" onClick={() => handleDigit('(')} className="p-2.5 bg-slate-800 hover:bg-slate-700 rounded-lg">(</button>
        <button type="button" onClick={() => handleDigit(')')} className="p-2.5 bg-slate-800 hover:bg-slate-700 rounded-lg">)</button>
        <button type="button" onClick={handleClear} className="p-2.5 bg-rose-900/80 hover:bg-rose-800 rounded-lg text-rose-200">AC</button>

        <button type="button" onClick={() => handleDigit('7')} className="p-3 bg-slate-700/60 hover:bg-slate-600 rounded-lg text-lg">7</button>
        <button type="button" onClick={() => handleDigit('8')} className="p-3 bg-slate-700/60 hover:bg-slate-600 rounded-lg text-lg">8</button>
        <button type="button" onClick={() => handleDigit('9')} className="p-3 bg-slate-700/60 hover:bg-slate-600 rounded-lg text-lg">9</button>
        <button type="button" onClick={() => handleOp('÷')} className="p-3 bg-amber-600/80 hover:bg-amber-600 rounded-lg text-lg">÷</button>
        <button type="button" onClick={() => setMemory((m) => m + parseFloat(display || '0'))} className="p-3 bg-slate-800 text-xs">M+</button>

        <button type="button" onClick={() => handleDigit('4')} className="p-3 bg-slate-700/60 hover:bg-slate-600 rounded-lg text-lg">4</button>
        <button type="button" onClick={() => handleDigit('5')} className="p-3 bg-slate-700/60 hover:bg-slate-600 rounded-lg text-lg">5</button>
        <button type="button" onClick={() => handleDigit('6')} className="p-3 bg-slate-700/60 hover:bg-slate-600 rounded-lg text-lg">6</button>
        <button type="button" onClick={() => handleOp('×')} className="p-3 bg-amber-600/80 hover:bg-amber-600 rounded-lg text-lg">×</button>
        <button type="button" onClick={() => setDisplay(String(memory))} className="p-3 bg-slate-800 text-xs">MR</button>

        <button type="button" onClick={() => handleDigit('1')} className="p-3 bg-slate-700/60 hover:bg-slate-600 rounded-lg text-lg">1</button>
        <button type="button" onClick={() => handleDigit('2')} className="p-3 bg-slate-700/60 hover:bg-slate-600 rounded-lg text-lg">2</button>
        <button type="button" onClick={() => handleDigit('3')} className="p-3 bg-slate-700/60 hover:bg-slate-600 rounded-lg text-lg">3</button>
        <button type="button" onClick={() => handleOp('-')} className="p-3 bg-amber-600/80 hover:bg-amber-600 rounded-lg text-lg">−</button>
        <button type="button" onClick={() => setMemory(0)} className="p-3 bg-slate-800 text-xs">MC</button>

        <button type="button" onClick={() => handleDigit('0')} className="p-3 bg-slate-700/60 hover:bg-slate-600 rounded-lg text-lg">0</button>
        <button type="button" onClick={() => handleDigit('.')} className="p-3 bg-slate-700/60 hover:bg-slate-600 rounded-lg text-lg">.</button>
        <button type="button" onClick={() => setDisplay((d) => (d.startsWith('-') ? d.slice(1) : '-' + d))} className="p-3 bg-slate-700/60 text-base">±</button>
        <button type="button" onClick={() => handleOp('+')} className="p-3 bg-amber-600/80 hover:bg-amber-600 rounded-lg text-lg">+</button>
        <button type="button" onClick={handleEquals} className="p-3 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-lg font-bold">=</button>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// 4. Equation Solver Widget
// ----------------------------------------------------------------------
export function EquationSolverWidget() {
  const [mode, setMode] = useState<'linear' | 'quadratic' | 'system2x2'>('quadratic');
  // Quadratic
  const [qa, setQa] = useState<number>(1);
  const [qb, setQb] = useState<number>(-5);
  const [qc, setQc] = useState<number>(6);
  // Linear
  const [la, setLa] = useState<number>(2);
  const [lb, setLb] = useState<number>(-8);
  // System
  const [a1, setA1] = useState<number>(2);
  const [b1, setB1] = useState<number>(1);
  const [c1, setC1] = useState<number>(8);
  const [a2, setA2] = useState<number>(1);
  const [b2, setB2] = useState<number>(-1);
  const [c2, setC2] = useState<number>(1);

  let res;
  if (mode === 'quadratic') res = solveQuadraticEquation({ a: qa, b: qb, c: qc });
  else if (mode === 'linear') res = solveLinearEquation({ a: la, b: lb });
  else res = solveSystem2x2({ a1, b1, c1, a2, b2, c2 });

  return (
    <div className="space-y-6">
      <div className="flex gap-2 border-b border-slate-200 pb-2">
        {(['quadratic', 'linear', 'system2x2'] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors ${
              mode === m ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {m === 'quadratic' ? 'ax² + bx + c = 0' : m === 'linear' ? 'ax + b = 0' : '2x2 System'}
          </button>
        ))}
      </div>

      {mode === 'quadratic' && (
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">a (x²)</label>
            <input type="number" value={qa} onChange={(e) => setQa(Number(e.target.value))} className="w-full text-base px-3 py-2 border rounded-lg" />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">b (x)</label>
            <input type="number" value={qb} onChange={(e) => setQb(Number(e.target.value))} className="w-full text-base px-3 py-2 border rounded-lg" />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">c (constant)</label>
            <input type="number" value={qc} onChange={(e) => setQc(Number(e.target.value))} className="w-full text-base px-3 py-2 border rounded-lg" />
          </div>
        </div>
      )}

      {mode === 'linear' && (
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">a (slope/coeff)</label>
            <input type="number" value={la} onChange={(e) => setLa(Number(e.target.value))} className="w-full text-base px-3 py-2 border rounded-lg" />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">b (constant)</label>
            <input type="number" value={lb} onChange={(e) => setLb(Number(e.target.value))} className="w-full text-base px-3 py-2 border rounded-lg" />
          </div>
        </div>
      )}

      {mode === 'system2x2' && (
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-3">
            <div><label className="text-xs text-slate-500">Eq 1: a₁</label><input type="number" value={a1} onChange={(e) => setA1(Number(e.target.value))} className="w-full text-base p-2 border rounded-lg" /></div>
            <div><label className="text-xs text-slate-500">b₁</label><input type="number" value={b1} onChange={(e) => setB1(Number(e.target.value))} className="w-full text-base p-2 border rounded-lg" /></div>
            <div><label className="text-xs text-slate-500">c₁</label><input type="number" value={c1} onChange={(e) => setC1(Number(e.target.value))} className="w-full text-base p-2 border rounded-lg" /></div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div><label className="text-xs text-slate-500">Eq 2: a₂</label><input type="number" value={a2} onChange={(e) => setA2(Number(e.target.value))} className="w-full text-base p-2 border rounded-lg" /></div>
            <div><label className="text-xs text-slate-500">b₂</label><input type="number" value={b2} onChange={(e) => setB2(Number(e.target.value))} className="w-full text-base p-2 border rounded-lg" /></div>
            <div><label className="text-xs text-slate-500">c₂</label><input type="number" value={c2} onChange={(e) => setC2(Number(e.target.value))} className="w-full text-base p-2 border rounded-lg" /></div>
          </div>
        </div>
      )}

      <div className="p-4 bg-sky-50 border border-sky-100 rounded-xl">
        <div className="text-xs font-semibold text-sky-800 uppercase tracking-wider mb-2">Roots & Solution</div>
        <div className="flex flex-wrap gap-3">
          {res.roots.map((r, i) => (
            <div key={i} className="px-3 py-1.5 bg-white border border-sky-200 rounded-lg text-sm font-bold text-sky-700">
              {r.label} = {r.formatted}
            </div>
          ))}
          {res.roots.length === 0 && <span className="text-sm font-semibold text-slate-700">Status: {res.status}</span>}
        </div>
      </div>

      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1.5">
        <div className="font-semibold text-slate-700">Step-by-Step Solution:</div>
        {res.steps.map((s, idx) => (
          <div key={idx} className="text-slate-600 font-mono">{s}</div>
        ))}
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// 5. Partial Fraction Decomposition Widget
// ----------------------------------------------------------------------
export function PartialFractionWidget() {
  const [p1, setP1] = useState<number>(3);
  const [p0, setP0] = useState<number>(5);
  const [r1, setR1] = useState<number>(1);
  const [r2, setR2] = useState<number>(2);

  const res = calculatePartialFraction({ p1, p0, r1, r2 });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
          <div className="text-xs font-bold text-slate-700">Numerator P(x) = p₁x + p₀</div>
          <div><label className="text-xs text-slate-500">p₁ (x coeff)</label><input type="number" value={p1} onChange={(e) => setP1(Number(e.target.value))} className="w-full text-base p-2 border rounded-lg" /></div>
          <div><label className="text-xs text-slate-500">p₀ (constant)</label><input type="number" value={p0} onChange={(e) => setP0(Number(e.target.value))} className="w-full text-base p-2 border rounded-lg" /></div>
        </div>
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
          <div className="text-xs font-bold text-slate-700">Denominator Q(x) = (x - r₁)(x - r₂)</div>
          <div><label className="text-xs text-slate-500">r₁ (root 1)</label><input type="number" value={r1} onChange={(e) => setR1(Number(e.target.value))} className="w-full text-base p-2 border rounded-lg" /></div>
          <div><label className="text-xs text-slate-500">r₂ (root 2)</label><input type="number" value={r2} onChange={(e) => setR2(Number(e.target.value))} className="w-full text-base p-2 border rounded-lg" /></div>
        </div>
      </div>

      <div className="p-5 bg-sky-50 border border-sky-100 rounded-2xl text-center">
        <div className="text-xs font-semibold text-sky-800 uppercase tracking-wider mb-2">Partial Fraction Decomposition</div>
        <div className="text-xl font-mono font-bold text-sky-800 bg-white p-3 border border-sky-200 rounded-xl inline-block">
          {res.decompositionLatex}
        </div>
        <div className="mt-3 text-xs text-slate-500">
          A = {res.coefficientA} , B = {res.coefficientB}
        </div>
      </div>

      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1.5">
        <div className="font-semibold text-slate-700">Derivation Steps (Cover-Up Method):</div>
        {res.steps.map((s, idx) => (
          <div key={idx} className="text-slate-600 font-mono">{s}</div>
        ))}
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// 6. Grade Calculator Widget
// ----------------------------------------------------------------------
export function GradeCalculatorWidget() {
  const [items, setItems] = useState<{ name: string; gradePercent: number; weightPercent: number }[]>([
    { name: 'Homework & Problem Sets', gradePercent: 92, weightPercent: 20 },
    { name: 'Midterm Exam 1', gradePercent: 84, weightPercent: 25 },
    { name: 'Midterm Exam 2', gradePercent: 88, weightPercent: 25 },
  ]);
  const [target, setTarget] = useState<number>(90);
  const [finalWeight, setFinalWeight] = useState<number>(30);

  const res = calculateGrade({
    items,
    targetGradePercent: target,
    finalExamWeightPercent: finalWeight,
  });

  const updateItem = (idx: number, field: string, val: any) => {
    const next = [...items];
    (next[idx] as any)[field] = val;
    setItems(next);
  };

  const addItem = () => {
    setItems([...items, { name: `Assignment ${items.length + 1}`, gradePercent: 85, weightPercent: 10 }]);
  };

  const removeItem = (idx: number) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== idx));
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Completed Coursework</div>
          <button type="button" onClick={addItem} className="text-xs font-semibold text-sky-600 hover:text-sky-700">+ Add Assignment</button>
        </div>
        {items.map((it, idx) => (
          <div key={idx} className="grid grid-cols-12 gap-2 items-center">
            <input
              type="text"
              value={it.name}
              onChange={(e) => updateItem(idx, 'name', e.target.value)}
              className="col-span-6 text-sm px-3 py-2 border rounded-lg"
              placeholder="Category name"
            />
            <div className="col-span-3 flex items-center gap-1">
              <input
                type="number"
                value={it.gradePercent}
                onChange={(e) => updateItem(idx, 'gradePercent', Number(e.target.value))}
                className="w-full text-sm px-2 py-2 border rounded-lg"
              />
              <span className="text-xs text-slate-500">%</span>
            </div>
            <div className="col-span-2 flex items-center gap-1">
              <input
                type="number"
                value={it.weightPercent}
                onChange={(e) => updateItem(idx, 'weightPercent', Number(e.target.value))}
                className="w-full text-sm px-2 py-2 border rounded-lg"
              />
              <span className="text-xs text-slate-500">wt%</span>
            </div>
            <button type="button" onClick={() => removeItem(idx)} className="col-span-1 text-slate-400 hover:text-rose-600 font-bold">×</button>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 border border-slate-200 rounded-xl">
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">Target Desired Grade (%)</label>
          <input
            type="number"
            value={target}
            onChange={(e) => setTarget(Number(e.target.value))}
            className="w-full text-base px-3 py-2 bg-white border rounded-lg"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">Final Exam Weight (%)</label>
          <input
            type="number"
            value={finalWeight}
            onChange={(e) => setFinalWeight(Number(e.target.value))}
            className="w-full text-base px-3 py-2 bg-white border rounded-lg"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 bg-sky-50 rounded-xl border border-sky-100 text-center">
          <div className="text-xs text-slate-500">Current Average</div>
          <div className="text-2xl font-bold text-sky-700 mt-1">{res.currentWeightedAverage}%</div>
          <div className="text-xs text-sky-600 mt-0.5">{res.letterGrade} ({res.gpaEquivalent} GPA)</div>
        </div>
        <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-center col-span-2 sm:col-span-3">
          <div className="text-xs text-amber-800 font-semibold">Final Exam Score Needed for {target}%</div>
          <div className="text-3xl font-extrabold text-amber-900 mt-1">
            {res.finalGradeNeeded !== undefined ? `${res.finalGradeNeeded}%` : 'N/A'}
          </div>
          <div className="text-xs text-amber-700 mt-0.5">
            {res.isAchievable ? '✓ Mathematically achievable on the final exam' : 'Requires > 100% or extra credit'}
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// 7. Student T Value Widget
// ----------------------------------------------------------------------
export function StudentTWidget() {
  const [df, setDf] = useState<number>(10);
  const [alpha, setAlpha] = useState<number>(0.05);
  const [tailType, setTailType] = useState<'one-tailed' | 'two-tailed'>('two-tailed');
  const [sampleT, setSampleT] = useState<string>('2.15');

  const res = calculateStudentT({
    df,
    alpha,
    tailType,
    sampleT: sampleT ? Number(sampleT) : undefined,
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
            Degrees of Freedom (df)
          </label>
          <input
            type="number"
            min="1"
            value={df}
            onChange={(e) => setDf(Number(e.target.value))}
            className="w-full text-base px-3 py-2.5 bg-white border border-slate-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
            Significance Level (α)
          </label>
          <select
            value={alpha}
            onChange={(e) => setAlpha(Number(e.target.value))}
            className="w-full text-base px-3 py-2.5 bg-white border border-slate-300 rounded-lg"
          >
            <option value="0.01">0.01 (99% Confidence)</option>
            <option value="0.05">0.05 (95% Confidence)</option>
            <option value="0.10">0.10 (90% Confidence)</option>
            <option value="0.001">0.001 (99.9% Confidence)</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
            Hypothesis Tail
          </label>
          <select
            value={tailType}
            onChange={(e) => setTailType(e.target.value as any)}
            className="w-full text-base px-3 py-2.5 bg-white border border-slate-300 rounded-lg"
          >
            <option value="two-tailed">Two-Tailed (≠)</option>
            <option value="one-tailed">One-Tailed (&gt; or &lt;)</option>
          </select>
        </div>
      </div>

      <div className="p-5 bg-sky-50 border border-sky-100 rounded-2xl text-center">
        <div className="text-xs font-semibold text-sky-800 uppercase tracking-wider">Critical t* Value</div>
        <div className="text-4xl font-extrabold text-sky-700 my-2">t* = {res.criticalT}</div>
        <div className="text-xs text-sky-800">
          Reject null hypothesis H₀ if |t| &gt; {res.criticalT} at α = {alpha} ({tailType})
        </div>
      </div>

      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
        <div className="text-xs font-bold text-slate-700">Compute P-Value from Sample t-Statistic:</div>
        <div className="flex items-center gap-3">
          <input
            type="number"
            step="any"
            value={sampleT}
            onChange={(e) => setSampleT(e.target.value)}
            className="text-base px-3 py-2 bg-white border rounded-lg max-w-xs"
            placeholder="e.g. 2.228"
          />
          <div className="text-sm font-semibold text-slate-800">
            p-value = {res.pValue !== undefined ? res.pValue : 'N/A'}
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// 8. Chi Square Widget
// ----------------------------------------------------------------------
export function ChiSquareWidget() {
  const [a, setA] = useState<number>(30);
  const [b, setB] = useState<number>(20);
  const [c, setC] = useState<number>(15);
  const [d, setD] = useState<number>(35);

  const res = calculateChiSquare({
    observed: [
      [a, b],
      [c, d],
    ],
  });

  return (
    <div className="space-y-6">
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
        <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">2x2 Contingency Table (Observed Counts)</div>
        <div className="grid grid-cols-2 gap-3 max-w-sm">
          <div>
            <label className="text-xs text-slate-500">Cell A (Row 1, Col 1)</label>
            <input type="number" value={a} onChange={(e) => setA(Number(e.target.value))} className="w-full text-base p-2 border rounded-lg" />
          </div>
          <div>
            <label className="text-xs text-slate-500">Cell B (Row 1, Col 2)</label>
            <input type="number" value={b} onChange={(e) => setB(Number(e.target.value))} className="w-full text-base p-2 border rounded-lg" />
          </div>
          <div>
            <label className="text-xs text-slate-500">Cell C (Row 2, Col 1)</label>
            <input type="number" value={c} onChange={(e) => setC(Number(e.target.value))} className="w-full text-base p-2 border rounded-lg" />
          </div>
          <div>
            <label className="text-xs text-slate-500">Cell D (Row 2, Col 2)</label>
            <input type="number" value={d} onChange={(e) => setD(Number(e.target.value))} className="w-full text-base p-2 border rounded-lg" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 bg-sky-50 rounded-xl border border-sky-100 text-center">
          <div className="text-xs text-slate-500">Chi-Square (χ²)</div>
          <div className="text-2xl font-bold text-sky-700 mt-1">{res.chiSquare}</div>
          <div className="text-xs text-sky-600 mt-0.5">df = {res.df}</div>
        </div>
        <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 text-center">
          <div className="text-xs text-emerald-700">p-value</div>
          <div className="text-2xl font-bold text-emerald-800 mt-1">{res.pValue}</div>
          <div className="text-[11px] text-emerald-600 mt-0.5">{res.isSignificant ? 'Significant (p < 0.05)' : 'Not Significant'}</div>
        </div>
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
          <div className="text-xs text-slate-500">Cramer's V</div>
          <div className="text-2xl font-bold text-slate-800 mt-1">{res.cramersV}</div>
          <div className="text-[11px] text-slate-500 mt-0.5">effect size</div>
        </div>
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
          <div className="text-xs text-slate-500">Sample Size (N)</div>
          <div className="text-2xl font-bold text-slate-800 mt-1">{res.grandTotal}</div>
          <div className="text-[11px] text-slate-500 mt-0.5">observations</div>
        </div>
      </div>

      <div className="p-4 bg-white border border-slate-200 rounded-xl text-xs space-y-1">
        <div className="font-semibold text-slate-700">Expected Cell Counts:</div>
        <div>E(A): {res.expected[0][0]} | E(B): {res.expected[0][1]}</div>
        <div>E(C): {res.expected[1][0]} | E(D): {res.expected[1][1]}</div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// 9. Heat Index Widget
// ----------------------------------------------------------------------
export function HeatIndexWidget() {
  const [temp, setTemp] = useState<number>(92);
  const [humidity, setHumidity] = useState<number>(65);
  const [unit, setUnit] = useState<'F' | 'C'>('F');

  const res = calculateHeatIndex({ temperature: temp, humidity, unit });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Temperature</label>
          <div className="flex gap-1">
            <input
              type="number"
              value={temp}
              onChange={(e) => setTemp(Number(e.target.value))}
              className="w-full text-base px-3 py-2.5 bg-white border rounded-lg"
            />
            <button
              type="button"
              onClick={() => setUnit(unit === 'F' ? 'C' : 'F')}
              className="px-3 bg-slate-100 border rounded-lg font-bold text-slate-700"
            >
              °{unit}
            </button>
          </div>
        </div>
        <div className="sm:col-span-2">
          <div className="flex justify-between text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
            <span>Relative Humidity</span>
            <span>{humidity}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={humidity}
            onChange={(e) => setHumidity(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg cursor-pointer accent-amber-500 mt-2"
          />
        </div>
      </div>

      <div className={`p-6 rounded-2xl border text-center ${
        res.dangerCategory === 'Extreme Danger' ? 'bg-rose-100 border-rose-300 text-rose-950' :
        res.dangerCategory === 'Danger' ? 'bg-orange-100 border-orange-300 text-orange-950' :
        res.dangerCategory === 'Extreme Caution' ? 'bg-amber-100 border-amber-300 text-amber-950' :
        res.dangerCategory === 'Caution' ? 'bg-yellow-50 border-yellow-200 text-yellow-950' :
        'bg-sky-50 border-sky-100 text-sky-950'
      }`}>
        <div className="text-xs font-semibold uppercase tracking-wider">NOAA Heat Index ("Feels Like")</div>
        <div className="text-4xl sm:text-5xl font-extrabold my-2">
          {res.heatIndexF}°F <span className="text-2xl font-semibold opacity-75">({res.heatIndexC}°C)</span>
        </div>
        <div className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/80 border mt-1">
          Category: {res.dangerCategory}
        </div>
        <p className="text-xs mt-3 max-w-md mx-auto">{res.warningMessage}</p>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// 10. Inch to CM Converter Widget
// ----------------------------------------------------------------------
export function InchCmWidget() {
  const [val, setVal] = useState<number>(10);
  const [mode, setMode] = useState<'inToCm' | 'cmToIn'>('inToCm');

  const res = mode === 'inToCm' ? convertInchToCm(val) : convertCmToInch(val);

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setMode('inToCm')}
          className={`flex-1 py-2 rounded-lg text-xs font-bold uppercase tracking-wider ${
            mode === 'inToCm' ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-700'
          }`}
        >
          Inches → Centimeters
        </button>
        <button
          type="button"
          onClick={() => setMode('cmToIn')}
          className={`flex-1 py-2 rounded-lg text-xs font-bold uppercase tracking-wider ${
            mode === 'cmToIn' ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-700'
          }`}
        >
          Centimeters → Inches
        </button>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
          Value ({mode === 'inToCm' ? 'Inches' : 'Centimeters'})
        </label>
        <input
          type="number"
          step="any"
          value={val}
          onChange={(e) => setVal(Number(e.target.value))}
          className="w-full text-base px-3 py-2.5 bg-white border border-slate-300 rounded-lg"
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 bg-sky-50 rounded-xl border border-sky-100 text-center">
          <div className="text-xs text-slate-500">Centimeters</div>
          <div className="text-2xl font-bold text-sky-700 mt-1">{res.centimeters} cm</div>
          <div className="text-[11px] text-sky-600 mt-0.5">{res.millimeters} mm</div>
        </div>
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
          <div className="text-xs text-slate-500">Decimal Inches</div>
          <div className="text-2xl font-bold text-slate-800 mt-1">{res.inches}"</div>
          <div className="text-[11px] text-slate-500 mt-0.5">{res.feetAndInches}</div>
        </div>
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
          <div className="text-xs text-slate-500">Nearest 1/16"</div>
          <div className="text-2xl font-bold text-slate-800 mt-1">{res.nearestFractionSixteenth}</div>
          <div className="text-[11px] text-slate-500 mt-0.5">tape measure</div>
        </div>
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
          <div className="text-xs text-slate-500">Meters</div>
          <div className="text-2xl font-bold text-slate-800 mt-1">{res.meters} m</div>
          <div className="text-[11px] text-slate-500 mt-0.5">SI metric</div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// 11. IP Subnet Calculator Widget
// ----------------------------------------------------------------------
export function IpSubnetWidget() {
  const [ip, setIp] = useState<string>('192.168.1.100');
  const [cidr, setCidr] = useState<number>(24);

  let res;
  let errorMsg = '';
  try {
    res = calculateIpSubnet({ ipAddress: ip, cidrPrefix: cidr });
  } catch (err: any) {
    errorMsg = err.message || 'Invalid IP';
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">IPv4 Address</label>
          <input
            type="text"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            className="w-full text-base px-3 py-2.5 bg-white border border-slate-300 rounded-lg font-mono"
            placeholder="192.168.1.1"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">CIDR Prefix</label>
          <select
            value={cidr}
            onChange={(e) => setCidr(Number(e.target.value))}
            className="w-full text-base px-3 py-2.5 bg-white border border-slate-300 rounded-lg font-mono"
          >
            {Array.from({ length: 33 }, (_, i) => (
              <option key={i} value={i}>/{i} (255...)</option>
            ))}
          </select>
        </div>
      </div>

      {errorMsg ? (
        <div className="p-4 bg-rose-50 text-rose-700 border border-rose-200 rounded-xl text-sm">{errorMsg}</div>
      ) : res ? (
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 bg-sky-50 rounded-xl border border-sky-100 text-center font-mono">
              <div className="text-xs text-slate-500 font-sans">Network Address</div>
              <div className="text-base font-bold text-sky-700 mt-1 truncate">{res.networkAddress}</div>
              <div className="text-xs text-sky-600 font-sans">/{res.cidrPrefix}</div>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center font-mono">
              <div className="text-xs text-slate-500 font-sans">Broadcast Address</div>
              <div className="text-base font-bold text-slate-800 mt-1 truncate">{res.broadcastAddress}</div>
              <div className="text-xs text-slate-500 font-sans">all 1s host</div>
            </div>
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 text-center">
              <div className="text-xs text-emerald-700">Usable Hosts</div>
              <div className="text-2xl font-bold text-emerald-800 mt-1">{res.usableHosts.toLocaleString()}</div>
              <div className="text-[11px] text-emerald-600">{res.totalHosts.toLocaleString()} total</div>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
              <div className="text-xs text-slate-500">Scope & Class</div>
              <div className="text-sm font-bold text-slate-800 mt-1">{res.ipClass}</div>
              <div className="text-[11px] text-slate-500">{res.scope}</div>
            </div>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs space-y-1.5 text-slate-700">
            <div><span className="text-slate-400 font-sans">Usable Host Range:</span> {res.firstUsableIp} – {res.lastUsableIp}</div>
            <div><span className="text-slate-400 font-sans">Subnet Mask:</span> {res.subnetMask} (Wildcard: {res.wildcardMask})</div>
            <div><span className="text-slate-400 font-sans">Binary Mask:</span> {res.binarySubnetMask}</div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

// ----------------------------------------------------------------------
// 12. Bin Packing Widget
// ----------------------------------------------------------------------
export function BinPackingWidget() {
  const [cap, setCap] = useState<number>(10);
  const [itemsStr, setItemsStr] = useState<string>('5, 4, 3, 2, 7, 8, 1, 6, 2, 4');

  const parsedItems = itemsStr
    .split(/[\s,]+/)
    .map(Number)
    .filter((n) => !isNaN(n) && n > 0);

  const res = calculateBinPacking({ binCapacity: cap, itemWeights: parsedItems });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Bin Capacity (C)</label>
          <input
            type="number"
            min="1"
            value={cap}
            onChange={(e) => setCap(Number(e.target.value))}
            className="w-full text-base px-3 py-2.5 bg-white border border-slate-300 rounded-lg"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Item Sizes / Weights (Comma-Separated)</label>
          <input
            type="text"
            value={itemsStr}
            onChange={(e) => setItemsStr(e.target.value)}
            className="w-full text-base px-3 py-2.5 bg-white border border-slate-300 rounded-lg"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 bg-sky-50 rounded-xl border border-sky-100 text-center">
          <div className="text-xs text-slate-500">FFD Bins Used</div>
          <div className="text-2xl font-bold text-sky-700 mt-1">{res.ffdCount}</div>
          <div className="text-xs text-sky-600 mt-0.5">Best heuristic</div>
        </div>
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
          <div className="text-xs text-slate-500">Theoretical Min</div>
          <div className="text-2xl font-bold text-slate-800 mt-1">{res.theoreticalMinBins}</div>
          <div className="text-xs text-slate-500">⌈Σw / C⌉ bound</div>
        </div>
        <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 text-center">
          <div className="text-xs text-emerald-700">Efficiency</div>
          <div className="text-2xl font-bold text-emerald-800 mt-1">{res.ffdEfficiencyPercent}%</div>
          <div className="text-[11px] text-emerald-600">volume filled</div>
        </div>
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
          <div className="text-xs text-slate-500">Total Items</div>
          <div className="text-2xl font-bold text-slate-800 mt-1">{res.totalItems}</div>
          <div className="text-[11px] text-slate-500">Σ weight = {res.totalWeight}</div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">Packed Bins Breakdown (FFD):</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {res.firstFitDecreasingBins.map((bin) => (
            <div key={bin.binIndex} className="p-3 bg-white border border-slate-200 rounded-xl flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-slate-800 mr-2">Bin #{bin.binIndex}:</span>
                <span className="font-mono text-slate-600">[{bin.items.join(', ')}]</span>
              </div>
              <div className="text-right">
                <div className="font-semibold text-sky-700">{bin.usedCapacity} / {cap}</div>
                <div className="text-[10px] text-slate-400">{bin.freeCapacity} free</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
