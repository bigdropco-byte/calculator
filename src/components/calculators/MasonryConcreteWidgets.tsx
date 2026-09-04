'use client';

import React, { useState } from 'react';
import {
  calculateConcreteYardage,
  calculateConcreteSlab,
  calculateConcreteBlock,
  calculateSakrete,
  calculateQuikrete,
  calculateGravelStone,
  calculateAsphalt,
  calculateMaterialBulk,
} from '@/lib/calculators/masonryEngines';
import { formatNumber } from '@/lib/formatting';
import { CalculatorActions } from '@/components/calculator/CalculatorActions';

// 1. Concrete Calculator Widget
export const ConcreteCalculatorWidget: React.FC = () => {
  const [length, setLength] = useState<number | ''>(12);
  const [width, setWidth] = useState<number | ''>(10);
  const [thickness, setThickness] = useState<number | ''>(4);
  const [waste, setWaste] = useState<number | ''>(10);

  const res = calculateConcreteYardage(
    Number(length) || 0,
    Number(width) || 0,
    Number(thickness) || 0,
    Number(waste) || 0
  );

  const getResultText = () =>
    `Concrete Needed: ${res.totalYardsWithWaste} cu yds (${res.volumeCubicMeters} m³) with ${waste}% waste | Bags: ${res.bags80lb} (80-lb) or ${res.bags60lb} (60-lb)`;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Length (Feet)</label>
              <input
                type="number"
                value={length}
                onChange={e => setLength(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
                placeholder="12"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Width (Feet)</label>
              <input
                type="number"
                value={width}
                onChange={e => setWidth(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
                placeholder="10"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Thickness (Inches)</label>
              <input
                type="number"
                step="0.5"
                value={thickness}
                onChange={e => setThickness(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
                placeholder="4"
              />
              <div className="flex gap-1.5 mt-1.5">
                {[3.5, 4, 5, 6].map(t => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setThickness(t)}
                    className="px-2 py-0.5 text-xs rounded bg-slate-100 hover:bg-sky-100 text-slate-700"
                  >
                    {t}&quot;
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Safety / Waste Margin (%)</label>
              <input
                type="number"
                value={waste}
                onChange={e => setWaste(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
                placeholder="10"
              />
            </div>
          </div>

          <CalculatorActions resultText={getResultText()} onReset={() => { setLength(12); setWidth(10); setThickness(4); setWaste(10); }} />
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 flex flex-col justify-between h-full">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600">Total Concrete Volume</span>
            <div className="mt-3">
              <div className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
                {res.totalYardsWithWaste} <span className="text-xl font-normal text-slate-500">cu yds</span>
              </div>
              <p className="text-sm font-semibold text-sky-700 mt-1">
                = {res.volumeCubicMeters} m³ ({res.volumeCubicFeet} cu ft net)
              </p>
            </div>

            <div className="mt-6 space-y-2.5 text-xs text-slate-700">
              <div className="flex justify-between py-1.5 border-b border-slate-200">
                <span className="text-slate-500">80 lb Premix Bags:</span>
                <strong className="font-semibold text-slate-900">{res.bags80lb} bags</strong>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-200">
                <span className="text-slate-500">60 lb Premix Bags:</span>
                <strong className="font-semibold text-slate-900">{res.bags60lb} bags</strong>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-200">
                <span className="text-slate-500">50 lb Premix Bags:</span>
                <strong className="font-semibold text-slate-900">{res.bags50lb} bags</strong>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-500">40 lb Premix Bags:</span>
                <strong className="font-semibold text-slate-900">{res.bags40lb} bags</strong>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200 text-xs text-slate-500">
            Formula: Cu Yds = (Length × Width × Thickness) ÷ 27 × (1 + Waste%)
          </div>
        </div>
      </div>
    </div>
  );
};

// 2. Concrete Slab Widget
export const ConcreteSlabWidget: React.FC = () => {
  const [length, setLength] = useState<number | ''>(24);
  const [width, setWidth] = useState<number | ''>(24);
  const [thickness, setThickness] = useState<number | ''>(4);
  const [gravelBase, setGravelBase] = useState<number | ''>(4);
  const [rebarSpacing, setRebarSpacing] = useState<number | ''>(18);

  const res = calculateConcreteSlab(
    Number(length) || 0,
    Number(width) || 0,
    Number(thickness) || 4,
    Number(gravelBase) || 4,
    Number(rebarSpacing) || 18
  );

  const getResultText = () =>
    `Slab ${length}'x${width}': Concrete ${res.concreteCubicYards} cu yds | Gravel Base ${res.gravelBaseTons} tons | Rebar #4 (20ft): ${res.rebarGridPieces} sticks`;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Slab Length (ft)</label>
              <input
                type="number"
                value={length}
                onChange={e => setLength(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
                placeholder="24"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Slab Width (ft)</label>
              <input
                type="number"
                value={width}
                onChange={e => setWidth(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
                placeholder="24"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Slab Depth</label>
              <input
                type="number"
                value={thickness}
                onChange={e => setThickness(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
                placeholder="4 in"
              />
              <span className="text-2xs text-slate-400">Inches</span>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Gravel Base</label>
              <input
                type="number"
                value={gravelBase}
                onChange={e => setGravelBase(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
                placeholder="4 in"
              />
              <span className="text-2xs text-slate-400">Inches</span>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Rebar Grid</label>
              <input
                type="number"
                value={rebarSpacing}
                onChange={e => setRebarSpacing(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
                placeholder="18 in"
              />
              <span className="text-2xs text-slate-400">Spacing</span>
            </div>
          </div>

          <CalculatorActions resultText={getResultText()} onReset={() => { setLength(24); setWidth(24); setThickness(4); setGravelBase(4); setRebarSpacing(18); }} />
        </div>

        <div className="bg-stone-50 border border-stone-200 rounded-xl p-6 flex flex-col justify-between h-full">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-stone-700">Concrete Slab Materials</span>
            <div className="mt-3">
              <div className="text-4xl font-extrabold text-stone-950">
                {res.concreteCubicYards} <span className="text-lg font-normal text-stone-600">cu yds Ready-Mix</span>
              </div>
              <p className="text-xs font-semibold text-stone-600 mt-1">
                Area: {res.squareFeet} sq ft | ~{res.estimatedReadyMixTruckloads} Ready-Mix Truckloads (10-yd)
              </p>
            </div>

            <div className="mt-6 space-y-2 text-xs text-stone-800">
              <div className="flex justify-between py-1.5 border-b border-stone-200">
                <span>Crushed Gravel Subbase:</span>
                <strong>{res.gravelBaseTons} tons ({res.gravelBaseCubicYards} cu yds)</strong>
              </div>
              <div className="flex justify-between py-1.5 border-b border-stone-200">
                <span>#4 Rebar (20-ft sticks @ {res.rebarGridSpacingInches}&quot; OC):</span>
                <strong>{res.rebarGridPieces} sticks</strong>
              </div>
              <div className="flex justify-between py-1.5">
                <span>Alternative Wire Mesh (500 sq ft rolls):</span>
                <strong>{res.wireMeshRolls} rolls</strong>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-stone-200 text-xs text-stone-500">
            Calculated with standard 10% concrete waste and 15% gravel compaction allowance.
          </div>
        </div>
      </div>
    </div>
  );
};

// 3. Concrete Block Widget
export const ConcreteBlockWidget: React.FC = () => {
  const [length, setLength] = useState<number | ''>(30);
  const [height, setHeight] = useState<number | ''>(8);
  const [coreInterval, setCoreInterval] = useState<number | ''>(32);

  const res = calculateConcreteBlock(
    Number(length) || 0,
    Number(height) || 0,
    Number(coreInterval) || 32
  );

  const getResultText = () =>
    `Block Wall (${length}'x${height}'): ${res.totalBlocks} CMU blocks (8x8x16) | Mortar: ${res.mortarBags70lb} (70lb bags) | Grout: ${res.groutCubicYards} cu yds`;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Wall Length (ft)</label>
              <input
                type="number"
                value={length}
                onChange={e => setLength(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
                placeholder="30"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Wall Height (ft)</label>
              <input
                type="number"
                value={height}
                onChange={e => setHeight(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
                placeholder="8"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Vertical Core Reinforcement Interval</label>
            <div className="flex gap-2">
              {[16, 24, 32, 48].map(ci => (
                <button
                  key={ci}
                  type="button"
                  onClick={() => setCoreInterval(ci)}
                  className={`px-3 py-1.5 text-xs rounded-lg font-semibold border ${
                    coreInterval === ci ? 'bg-sky-600 text-white border-sky-600' : 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  {ci}&quot; OC
                </button>
              ))}
            </div>
          </div>

          <CalculatorActions resultText={getResultText()} onReset={() => { setLength(30); setHeight(8); setCoreInterval(32); }} />
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 flex flex-col justify-between h-full">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600">CMU Masonry Materials</span>
            <div className="mt-3">
              <div className="text-4xl font-extrabold text-slate-900">
                {res.totalBlocks} <span className="text-lg font-normal text-slate-500">CMU Blocks</span>
              </div>
              <p className="text-xs font-semibold text-slate-600 mt-1">
                Standard 8&quot; × 8&quot; × 16&quot; Stretcher Blocks (Includes 5% waste)
              </p>
            </div>

            <div className="mt-6 space-y-2 text-xs text-slate-800">
              <div className="flex justify-between py-1.5 border-b border-slate-200">
                <span>Type S / N Mortar (70-lb bags):</span>
                <strong>{res.mortarBags70lb} bags</strong>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-200">
                <span>Core Fill Grout Volume:</span>
                <strong>{res.groutCubicYards} cu yds</strong>
              </div>
              <div className="flex justify-between py-1.5">
                <span>Vertical Rebar (20-ft sticks):</span>
                <strong>{res.rebarVertical20ftSticks} sticks</strong>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200 text-xs text-slate-500">
            Standard wall area: {res.wallSquareFeet} sq ft (1.125 blocks per sq ft of wall).
          </div>
        </div>
      </div>
    </div>
  );
};

// 4. Sakrete Calculator Widget
export const SakreteCalculatorWidget: React.FC = () => {
  const [length, setLength] = useState<number | ''>(10);
  const [width, setWidth] = useState<number | ''>(8);
  const [thickness, setThickness] = useState<number | ''>(4);
  const [bagSize, setBagSize] = useState<40 | 50 | 60 | 80>(80);
  const [mixType, setMixType] = useState<'concrete' | 'sand_mix' | 'mortar' | '5000_plus'>('concrete');

  const res = calculateSakrete(
    Number(length) || 0,
    Number(width) || 0,
    Number(thickness) || 0,
    bagSize,
    mixType
  );

  const getResultText = () =>
    `Sakrete Required: ${res.bagsNeeded} bags (${res.recommendedBagSize}) | Water: ${res.totalWaterGallons} gallons | Compressive Strength: ${res.compressiveStrengthPsi} PSI`;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Length (ft)</label>
              <input
                type="number"
                value={length}
                onChange={e => setLength(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
                placeholder="10"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Width (ft)</label>
              <input
                type="number"
                value={width}
                onChange={e => setWidth(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
                placeholder="8"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Depth (in)</label>
              <input
                type="number"
                value={thickness}
                onChange={e => setThickness(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
                placeholder="4"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Sakrete Bag Weight</label>
            <div className="flex gap-2">
              {([80, 60, 50, 40] as const).map(bw => (
                <button
                  key={bw}
                  type="button"
                  onClick={() => setBagSize(bw)}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-lg border ${
                    bagSize === bw ? 'bg-amber-600 text-white border-amber-600' : 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  {bw} lb Bag
                </button>
              ))}
            </div>
          </div>

          <CalculatorActions resultText={getResultText()} onReset={() => { setLength(10); setWidth(8); setThickness(4); setBagSize(80); }} />
        </div>

        <div className="bg-amber-50/60 border border-amber-200 rounded-xl p-6 flex flex-col justify-between h-full">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800">Sakrete Premix Bags Needed</span>
            <div className="mt-3">
              <div className="text-4xl font-extrabold text-amber-950">
                {res.bagsNeeded} <span className="text-lg font-normal text-amber-700">Bags ({bagSize} lbs)</span>
              </div>
              <p className="text-xs font-semibold text-amber-800 mt-1">
                Volume: {res.volumeCubicFeet} cu ft ({res.volumeCubicYards} cu yds)
              </p>
            </div>

            <div className="mt-6 space-y-2 text-xs text-slate-800">
              <div className="flex justify-between py-1.5 border-b border-amber-200">
                <span>Clean Water Mixing Requirement:</span>
                <strong>{res.totalWaterGallons} Gallons ({res.waterQuartsPerBag} qts/bag)</strong>
              </div>
              <div className="flex justify-between py-1.5 border-b border-amber-200">
                <span>Design Compressive Strength:</span>
                <strong>{res.compressiveStrengthPsi} PSI @ 28 Days</strong>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-amber-200 text-xs text-slate-500">
            Yield: 80-lb bag = 0.60 cu ft (45 bags / cu yd); 60-lb bag = 0.45 cu ft.
          </div>
        </div>
      </div>
    </div>
  );
};

// 5. Quikrete Calculator & Quikrete Concrete Widget
export const QuikreteCalculatorWidget: React.FC<{ title?: string }> = ({ title = 'Quikrete Calculator' }) => {
  const [length, setLength] = useState<number | ''>(10);
  const [width, setWidth] = useState<number | ''>(10);
  const [depth, setDepth] = useState<number | ''>(4);
  const [appType, setAppType] = useState<'slab' | 'post_hole' | 'footing'>('slab');

  const res = calculateQuikrete(
    Number(length) || 0,
    Number(width) || 0,
    Number(depth) || 0,
    appType
  );

  const getResultText = () =>
    `Quikrete Needed: ${res.standardBags80lb} bags (80-lb) or ${res.standardBags60lb} bags (60-lb) | Fast-Setting Red Bag: ${res.fastSettingBags50lb} bags (50-lb) | Volume: ${res.cubicYards} cu yds`;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Project Type</label>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { id: 'slab', label: 'Slab / Patio' },
                { id: 'post_hole', label: 'Post Hole' },
                { id: 'footing', label: 'Footing' },
              ].map(t => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setAppType(t.id as any)}
                  className={`py-1.5 px-2 text-xs font-semibold rounded-md border ${
                    appType === t.id ? 'bg-yellow-500 text-slate-950 border-yellow-500' : 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                {appType === 'post_hole' ? 'Hole Dia (in)' : 'Length (ft)'}
              </label>
              <input
                type="number"
                value={length}
                onChange={e => setLength(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
                placeholder="10"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                {appType === 'post_hole' ? 'Post Dia (in)' : 'Width (ft)'}
              </label>
              <input
                type="number"
                value={width}
                onChange={e => setWidth(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
                placeholder="10"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Depth (in)</label>
              <input
                type="number"
                value={depth}
                onChange={e => setDepth(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
                placeholder="4"
              />
            </div>
          </div>

          <CalculatorActions resultText={getResultText()} onReset={() => { setLength(10); setWidth(10); setDepth(4); setAppType('slab'); }} />
        </div>

        <div className="bg-yellow-50/60 border border-yellow-200 rounded-xl p-6 flex flex-col justify-between h-full">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-yellow-900">Quikrete Concrete Estimate</span>
            <div className="mt-3">
              <div className="text-4xl font-extrabold text-slate-950">
                {res.standardBags80lb} <span className="text-lg font-normal text-slate-700">Bags (80 lb)</span>
              </div>
              <p className="text-xs font-semibold text-yellow-900 mt-1">
                Volume: {res.cubicFeet} cu ft ({res.cubicYards} cu yds)
              </p>
            </div>

            <div className="mt-6 space-y-2 text-xs text-slate-800">
              <div className="flex justify-between py-1.5 border-b border-yellow-200">
                <span>Standard 60 lb Bags:</span>
                <strong>{res.standardBags60lb} bags</strong>
              </div>
              <div className="flex justify-between py-1.5 border-b border-yellow-200">
                <span>Fast-Setting Concrete (Red Bag, 50 lb):</span>
                <strong className="text-amber-800">{res.fastSettingBags50lb} bags (Sets in 20-40 min)</strong>
              </div>
              <div className="flex justify-between py-1.5">
                <span>Total Clean Water Needed:</span>
                <strong>~{res.waterGallonsTotal} gallons</strong>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-yellow-200 text-xs text-slate-500">
            For post setting, Fast-Setting Quikrete can be poured dry into hole and soaked with water.
          </div>
        </div>
      </div>
    </div>
  );
};

// 6. Gravel & Stone Calculator Widget
export const GravelStoneCalculatorWidget: React.FC<{ title?: string; defaultType?: 'crushed_stone' | 'pea_gravel' }> = ({
  title = 'Gravel & Stone Calculator',
  defaultType = 'crushed_stone',
}) => {
  const [length, setLength] = useState<number | ''>(40);
  const [width, setWidth] = useState<number | ''>(12);
  const [depth, setDepth] = useState<number | ''>(3);
  const [materialType, setMaterialType] = useState<'pea_gravel' | 'crushed_stone' | 'river_rock' | 'dense_grade'>(defaultType);

  const res = calculateGravelStone(
    Number(length) || 0,
    Number(width) || 0,
    Number(depth) || 0,
    materialType
  );

  const getResultText = () =>
    `Gravel/Stone: ${res.tons} Tons (${res.cubicYards} cu yds) for ${length}'x${width}' @ ${depth}" depth | ${res.standard50lbBags} bags (50-lb)`;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Aggregate Type</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'crushed_stone', label: '#57 Crushed Stone' },
                { id: 'pea_gravel', label: 'Pea Gravel' },
                { id: 'river_rock', label: 'River Rock' },
                { id: 'dense_grade', label: 'Road Base (DGA)' },
              ].map(m => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setMaterialType(m.id as any)}
                  className={`py-1.5 px-2 text-xs font-semibold rounded-md border ${
                    materialType === m.id ? 'bg-sky-600 text-white border-sky-600' : 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Length (ft)</label>
              <input
                type="number"
                value={length}
                onChange={e => setLength(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
                placeholder="40"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Width (ft)</label>
              <input
                type="number"
                value={width}
                onChange={e => setWidth(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
                placeholder="12"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Depth (in)</label>
              <input
                type="number"
                value={depth}
                onChange={e => setDepth(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
                placeholder="3"
              />
            </div>
          </div>

          <CalculatorActions resultText={getResultText()} onReset={() => { setLength(40); setWidth(12); setDepth(3); setMaterialType(defaultType); }} />
        </div>

        <div className="bg-stone-50 border border-stone-200 rounded-xl p-6 flex flex-col justify-between h-full">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-stone-700">Estimated Weight & Volume</span>
            <div className="mt-3">
              <div className="text-4xl font-extrabold text-stone-950">
                {res.tons} <span className="text-lg font-normal text-stone-600">US Tons</span>
              </div>
              <p className="text-xs font-semibold text-stone-700 mt-1">
                = {res.cubicYards} Cubic Yards ({res.metricTonnes} Metric Tonnes)
              </p>
            </div>

            <div className="mt-6 space-y-2 text-xs text-stone-800">
              <div className="flex justify-between py-1.5 border-b border-stone-200">
                <span>Standard 50-lb Retail Bags:</span>
                <strong>{res.standard50lbBags} bags</strong>
              </div>
              <div className="flex justify-between py-1.5 border-b border-stone-200">
                <span>Dump Truckloads (~15 Ton dump truck):</span>
                <strong>~{res.truckloads15Ton} loads</strong>
              </div>
              <div className="flex justify-between py-1.5">
                <span>Total Surface Coverage Area:</span>
                <strong>{res.squareFeet} sq ft</strong>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-stone-200 text-xs text-stone-500">
            Calculated with 10% compaction & grade variance allowance.
          </div>
        </div>
      </div>
    </div>
  );
};

// 7. Asphalt Suite Widget (Handles Asphalt, American, Crushed, Vulcan, Hot Mix, Recycled)
export const AsphaltCalculatorWidget: React.FC<{
  type?: 'standard_hma' | 'american' | 'crushed_rap' | 'vulcan' | 'recycled';
  title?: string;
}> = ({ type = 'standard_hma', title = 'Asphalt Tonnage Calculator' }) => {
  const [length, setLength] = useState<number | ''>(50);
  const [width, setWidth] = useState<number | ''>(20);
  const [depth, setDepth] = useState<number | ''>(2.5);

  const res = calculateAsphalt(
    Number(length) || 0,
    Number(width) || 0,
    Number(depth) || 2.5,
    type
  );

  const getResultText = () =>
    `Asphalt (${title}): ${res.tons} Tons (${res.squareYards} sq yds @ ${depth}" depth) | Triaxle Truckloads: ~${res.triaxleTruckloads20Ton}`;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Length (Feet)</label>
              <input
                type="number"
                value={length}
                onChange={e => setLength(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
                placeholder="50"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Width (Feet)</label>
              <input
                type="number"
                value={width}
                onChange={e => setWidth(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
                placeholder="20"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Compacted Depth (Inches)</label>
            <input
              type="number"
              step="0.5"
              value={depth}
              onChange={e => setDepth(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
              placeholder="2.5"
            />
            <div className="flex gap-2 mt-2">
              {[2, 2.5, 3, 4].map(d => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDepth(d)}
                  className="px-2.5 py-1 text-xs rounded bg-slate-100 hover:bg-sky-100 text-slate-700 font-medium"
                >
                  {d}&quot; {d <= 2.5 ? '(Driveway)' : '(Commercial)'}
                </button>
              ))}
            </div>
          </div>

          <CalculatorActions resultText={getResultText()} onReset={() => { setLength(50); setWidth(20); setDepth(2.5); }} />
        </div>

        <div className="bg-zinc-900 text-white rounded-xl p-6 flex flex-col justify-between h-full">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Total Asphalt Required</span>
            <div className="mt-3">
              <div className="text-4xl font-extrabold text-white">
                {res.tons} <span className="text-lg font-normal text-zinc-400">US Tons</span>
              </div>
              <p className="text-xs font-semibold text-amber-400 mt-1">
                = {res.metricTonnes} Metric Tonnes ({res.cubicYards} cu yds)
              </p>
            </div>

            <div className="mt-6 space-y-2 text-xs text-zinc-300">
              <div className="flex justify-between py-1.5 border-b border-zinc-800">
                <span>Paving Area (Square Yards):</span>
                <strong className="text-white">{res.squareYards} sq yds ({res.squareFeet} sq ft)</strong>
              </div>
              <div className="flex justify-between py-1.5 border-b border-zinc-800">
                <span>Tri-Axle Truckloads (~20 Tons):</span>
                <strong className="text-amber-400">~{res.triaxleTruckloads20Ton} loads</strong>
              </div>
              <div className="flex justify-between py-1.5">
                <span>Mix Specification:</span>
                <span className="text-zinc-300 text-right">{res.specSummary}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-zinc-800 text-xs text-zinc-500">
            Density: ~110-115 lbs per sq yard per inch of compacted thickness.
          </div>
        </div>
      </div>
    </div>
  );
};

// 8. Material Calculator (Universal Bulk Estimator)
export const MaterialCalculatorWidget: React.FC = () => {
  const [length, setLength] = useState<number | ''>(20);
  const [width, setWidth] = useState<number | ''>(10);
  const [depth, setDepth] = useState<number | ''>(4);
  const [material, setMaterial] = useState<'concrete' | 'gravel' | 'asphalt' | 'mulch' | 'topsoil' | 'sand'>('gravel');

  const res = calculateMaterialBulk(
    Number(length) || 0,
    Number(width) || 0,
    Number(depth) || 0,
    material
  );

  const getResultText = () =>
    `Bulk Material (${res.materialName}): ${res.cubicYards} cu yds (${res.tons} tons) for ${length}'x${width}' @ ${depth}" depth | ${res.bagsNeeded} bags`;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Select Material</label>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { id: 'gravel', label: 'Gravel / Stone' },
                { id: 'concrete', label: 'Concrete' },
                { id: 'asphalt', label: 'Asphalt' },
                { id: 'mulch', label: 'Bark Mulch' },
                { id: 'topsoil', label: 'Topsoil' },
                { id: 'sand', label: 'Sand' },
              ].map(m => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setMaterial(m.id as any)}
                  className={`py-1.5 px-2 text-xs font-semibold rounded-md border ${
                    material === m.id ? 'bg-sky-600 text-white border-sky-600' : 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Length (ft)</label>
              <input
                type="number"
                value={length}
                onChange={e => setLength(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
                placeholder="20"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Width (ft)</label>
              <input
                type="number"
                value={width}
                onChange={e => setWidth(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
                placeholder="10"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Depth (in)</label>
              <input
                type="number"
                value={depth}
                onChange={e => setDepth(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
                placeholder="4"
              />
            </div>
          </div>

          <CalculatorActions resultText={getResultText()} onReset={() => { setLength(20); setWidth(10); setDepth(4); setMaterial('gravel'); }} />
        </div>

        <div className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-6 flex flex-col justify-between h-full">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">{res.materialName} Estimate</span>
            <div className="mt-3">
              <div className="text-4xl font-extrabold text-emerald-950">
                {res.cubicYards} <span className="text-lg font-normal text-emerald-700">Cubic Yards</span>
              </div>
              <p className="text-xs font-semibold text-emerald-800 mt-1">
                = {res.tons} US Tons ({res.cubicFeet} Cubic Feet)
              </p>
            </div>

            <div className="mt-6 space-y-2 text-xs text-slate-800">
              <div className="flex justify-between py-1.5 border-b border-emerald-200">
                <span>Retail Bags Estimate:</span>
                <strong>{res.bagsNeeded} bags</strong>
              </div>
              <div className="flex justify-between py-1.5 border-b border-emerald-200">
                <span>Material Bulk Density:</span>
                <strong>{res.densityLbsPerCuYd} lbs / cu yd</strong>
              </div>
              <div className="flex justify-between py-1.5">
                <span>Surface Area:</span>
                <strong>{res.squareFeet} sq ft</strong>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-emerald-200 text-xs text-slate-500">
            Calculated with 10% material settling and cutting contingency.
          </div>
        </div>
      </div>
    </div>
  );
};
