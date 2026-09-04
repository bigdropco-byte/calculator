'use client';

import React, { useState } from 'react';
import {
  calculateBoardFeet,
  calculateFramingWood,
  calculateTrestleWood,
  calculateWoodWeight,
  calculateDeckWood,
  calculateCordWood,
  calculateCabinetWood,
  calculateFirewoodCord,
  calculateLooseCord,
  calculateShedWood,
  calculateFenceWood,
  calculateSeasonalFirewood,
} from '@/lib/calculators/woodEngines';
import { formatNumber } from '@/lib/formatting';
import { CalculatorActions } from '@/components/calculator/CalculatorActions';

// 1. Wood Calculator Widget (Board Feet)
export const WoodCalculatorWidget: React.FC = () => {
  const [thickness, setThickness] = useState<number | ''>(2);
  const [width, setWidth] = useState<number | ''>(6);
  const [length, setLength] = useState<number | ''>(10);
  const [quantity, setQuantity] = useState<number | ''>(10);
  const [pricePerBf, setPricePerBf] = useState<number | ''>(4.5);

  const res = calculateBoardFeet(
    Number(thickness) || 0,
    Number(width) || 0,
    Number(length) || 0,
    Number(quantity) || 1,
    Number(pricePerBf) || 0
  );

  const getResultText = () =>
    `Lumber: ${res.totalBoardFeet} Board Feet (${res.totalLinearFeet} Linear Feet, ${res.totalCubicFeet} cu ft) | Total Cost: $${formatNumber(res.totalCost, 2)}`;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Thickness (in)</label>
              <input
                type="number"
                step="0.25"
                value={thickness}
                onChange={e => setThickness(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
                placeholder="2"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Width (in)</label>
              <input
                type="number"
                step="0.25"
                value={width}
                onChange={e => setWidth(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
                placeholder="6"
              />
            </div>
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
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Pieces (Quantity)</label>
              <input
                type="number"
                value={quantity}
                onChange={e => setQuantity(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
                placeholder="10"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Price / Board Foot ($)</label>
              <input
                type="number"
                step="0.1"
                value={pricePerBf}
                onChange={e => setPricePerBf(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
                placeholder="4.50"
              />
            </div>
          </div>

          <CalculatorActions resultText={getResultText()} onReset={() => { setThickness(2); setWidth(6); setLength(10); setQuantity(10); setPricePerBf(4.5); }} />
        </div>

        <div className="bg-amber-50/60 border border-amber-200 rounded-xl p-6 flex flex-col justify-between h-full">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-900">Board Feet (BF) Volume</span>
            <div className="mt-3">
              <div className="text-4xl sm:text-5xl font-extrabold text-amber-950 tracking-tight">
                {res.totalBoardFeet} <span className="text-xl font-normal text-amber-700">BF</span>
              </div>
              <p className="text-sm font-semibold text-amber-800 mt-1">
                Estimated Lumber Cost: <strong className="text-slate-900">${formatNumber(res.totalCost, 2)}</strong>
              </p>
            </div>

            <div className="mt-6 space-y-2.5 text-xs text-slate-800">
              <div className="flex justify-between py-1.5 border-b border-amber-200">
                <span>Total Linear Feet:</span>
                <strong>{res.totalLinearFeet} LF</strong>
              </div>
              <div className="flex justify-between py-1.5 border-b border-amber-200">
                <span>Total Wood Volume:</span>
                <strong>{res.totalCubicFeet} Cubic Feet</strong>
              </div>
              <div className="flex justify-between py-1.5">
                <span>Volume per Board:</span>
                <strong>{Math.round((res.totalBoardFeet / (quantity || 1)) * 100) / 100} BF / board</strong>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-amber-200 text-xs text-slate-500">
            Formula: Board Feet = (Thickness in × Width in × Length ft) ÷ 12
          </div>
        </div>
      </div>
    </div>
  );
};

// 2. Framing Wood Widget
export const FramingWoodWidget: React.FC = () => {
  const [length, setLength] = useState<number | ''>(24);
  const [height, setHeight] = useState<number | ''>(8);
  const [spacing, setSpacing] = useState<number | ''>(16);
  const [doors, setDoors] = useState<number | ''>(1);
  const [windows, setWindows] = useState<number | ''>(2);

  const res = calculateFramingWood(
    Number(length) || 0,
    Number(height) || 8,
    Number(spacing) || 16,
    Number(doors) || 0,
    Number(windows) || 0
  );

  const getResultText = () =>
    `Wall Framing (${length}'x${height}'): ${res.studsCount} studs @ ${spacing}" OC | Plates: ${res.solePlatesCount} bottom, ${res.topPlatesCount} double top (16ft boards)`;

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
                placeholder="24"
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

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Stud Spacing</label>
              <div className="flex gap-1">
                {[16, 24].map(s => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSpacing(s)}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded-md border ${
                      spacing === s ? 'bg-sky-600 text-white border-sky-600' : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    {s}&quot; OC
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Doors</label>
              <input
                type="number"
                value={doors}
                onChange={e => setDoors(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
                placeholder="1"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Windows</label>
              <input
                type="number"
                value={windows}
                onChange={e => setWindows(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
                placeholder="2"
              />
            </div>
          </div>

          <CalculatorActions resultText={getResultText()} onReset={() => { setLength(24); setHeight(8); setSpacing(16); setDoors(1); setWindows(2); }} />
        </div>

        <div className="bg-amber-50/60 border border-amber-200 rounded-xl p-6 flex flex-col justify-between h-full">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-900">Framing Lumber Estimate</span>
            <div className="mt-3">
              <div className="text-4xl font-extrabold text-amber-950">
                {res.studsCount} <span className="text-lg font-normal text-amber-800">Wall Studs</span>
              </div>
              <p className="text-xs font-semibold text-amber-800 mt-1">
                Includes field studs, double corners, trimmer/king studs & 15% waste
              </p>
            </div>

            <div className="mt-6 space-y-2 text-xs text-slate-800">
              <div className="flex justify-between py-1.5 border-b border-amber-200">
                <span>Bottom Sole Plate (16-ft):</span>
                <strong>{res.solePlatesCount} boards</strong>
              </div>
              <div className="flex justify-between py-1.5 border-b border-amber-200">
                <span>Double Top Plates (16-ft):</span>
                <strong>{res.topPlatesCount} boards</strong>
              </div>
              <div className="flex justify-between py-1.5 border-b border-amber-200">
                <span>Total Plates Linear Feet:</span>
                <strong>{res.totalPlatesLinearFeet} LF</strong>
              </div>
              <div className="flex justify-between py-1.5">
                <span>Door/Window Headers:</span>
                <strong>~{res.headerBoardFeet} Board Feet</strong>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-amber-200 text-xs text-slate-500">
            Standard residential code: 2x4 framing @ 16&quot; OC or 2x6 framing @ 24&quot; OC.
          </div>
        </div>
      </div>
    </div>
  );
};

// 3. Trestle Wood Widget
export const TrestleWoodWidget: React.FC = () => {
  const [span, setSpan] = useState<number | ''>(80);
  const [height, setHeight] = useState<number | ''>(16);
  const [bentSpacing, setBentSpacing] = useState<number | ''>(14);

  const res = calculateTrestleWood(
    Number(span) || 0,
    Number(height) || 0,
    Number(bentSpacing) || 14
  );

  const getResultText = () =>
    `Trestle Timber (${span}' span, ${height}' high): ${res.totalTrestleBoardFeet} BF | ${res.numberOfBents} Bents (${res.timberPostsCount} heavy posts) | Dead Load: ~${res.estimatedDeadLoadWeightLbs} lbs`;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Span Length (ft)</label>
              <input
                type="number"
                value={span}
                onChange={e => setSpan(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
                placeholder="80"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Trestle Height (ft)</label>
              <input
                type="number"
                value={height}
                onChange={e => setHeight(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
                placeholder="16"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Bent Spacing (ft)</label>
              <input
                type="number"
                value={bentSpacing}
                onChange={e => setBentSpacing(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
                placeholder="14"
              />
            </div>
          </div>

          <CalculatorActions resultText={getResultText()} onReset={() => { setSpan(80); setHeight(16); setBentSpacing(14); }} />
        </div>

        <div className="bg-amber-50/60 border border-amber-200 rounded-xl p-6 flex flex-col justify-between h-full">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-900">Heavy Timber Trestle Specs</span>
            <div className="mt-3">
              <div className="text-4xl font-extrabold text-amber-950">
                {res.totalTrestleBoardFeet} <span className="text-lg font-normal text-amber-800">Board Feet</span>
              </div>
              <p className="text-xs font-semibold text-amber-800 mt-1">
                Estimated Structural Dead Load: ~{formatNumber(res.estimatedDeadLoadWeightLbs)} lbs
              </p>
            </div>

            <div className="mt-6 space-y-2 text-xs text-slate-800">
              <div className="flex justify-between py-1.5 border-b border-amber-200">
                <span>Number of Timber Bents:</span>
                <strong>{res.numberOfBents} bents ({res.timberPostsCount} posts)</strong>
              </div>
              <div className="flex justify-between py-1.5 border-b border-amber-200">
                <span>12x12 Cap Beams:</span>
                <strong>{res.capBeamsBoardFeet} BF</strong>
              </div>
              <div className="flex justify-between py-1.5 border-b border-amber-200">
                <span>Longitudinal Stringers:</span>
                <strong>{res.stringersBoardFeet} BF</strong>
              </div>
              <div className="flex justify-between py-1.5">
                <span>3x10 Sway Bracing:</span>
                <strong>{res.crossBracingBoardFeet} BF</strong>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-amber-200 text-xs text-slate-500">
            Standard timber trestle design based on American Railway Engineering (AREMA) guidelines.
          </div>
        </div>
      </div>
    </div>
  );
};

// 4. Weight of Wood Widget
export const WeightOfWoodWidget: React.FC = () => {
  const [boardFeet, setBoardFeet] = useState<number | ''>(500);
  const [species, setSpecies] = useState<'douglas_fir' | 'southern_pine' | 'white_oak' | 'red_oak' | 'hard_maple' | 'walnut' | 'cedar' | 'white_pine'>('red_oak');
  const [condition, setCondition] = useState<'kiln_dried' | 'green'>('kiln_dried');

  const res = calculateWoodWeight(
    Number(boardFeet) || 0,
    species,
    condition
  );

  const getResultText = () =>
    `Weight of Wood (${res.speciesName}, ${condition === 'green' ? 'Green' : 'Kiln Dried'}): ${res.weightLbs} lbs (${res.weightKg} kg) for ${boardFeet} BF (${res.densityLbsPerCuFt} lbs/cu ft)`;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Wood Species</label>
            <div className="grid grid-cols-2 gap-1.5">
              {[
                { id: 'red_oak', label: 'Red Oak' },
                { id: 'white_oak', label: 'White Oak' },
                { id: 'douglas_fir', label: 'Douglas Fir' },
                { id: 'southern_pine', label: 'Southern Pine' },
                { id: 'hard_maple', label: 'Hard Maple' },
                { id: 'walnut', label: 'Black Walnut' },
                { id: 'cedar', label: 'Western Red Cedar' },
                { id: 'white_pine', label: 'Eastern White Pine' },
              ].map(s => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSpecies(s.id as any)}
                  className={`py-1.5 px-2 text-xs font-semibold rounded-md border ${
                    species === s.id ? 'bg-amber-700 text-white border-amber-700' : 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Board Feet (BF)</label>
              <input
                type="number"
                value={boardFeet}
                onChange={e => setBoardFeet(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
                placeholder="500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Moisture Content</label>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => setCondition('kiln_dried')}
                  className={`flex-1 py-2 text-xs font-semibold rounded-md border ${
                    condition === 'kiln_dried' ? 'bg-slate-800 text-white border-slate-800' : 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  Kiln Dried
                </button>
                <button
                  type="button"
                  onClick={() => setCondition('green')}
                  className={`flex-1 py-2 text-xs font-semibold rounded-md border ${
                    condition === 'green' ? 'bg-emerald-700 text-white border-emerald-700' : 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  Green / Wet
                </button>
              </div>
            </div>
          </div>

          <CalculatorActions resultText={getResultText()} onReset={() => { setBoardFeet(500); setSpecies('red_oak'); setCondition('kiln_dried'); }} />
        </div>

        <div className="bg-amber-50/60 border border-amber-200 rounded-xl p-6 flex flex-col justify-between h-full">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-900">{res.speciesName} Weight</span>
            <div className="mt-3">
              <div className="text-4xl font-extrabold text-amber-950">
                {res.weightLbs} <span className="text-lg font-normal text-amber-800">lbs</span>
              </div>
              <p className="text-sm font-semibold text-amber-800 mt-1">
                = {res.weightKg} kg ({res.cubicFeet} Cubic Feet)
              </p>
            </div>

            <div className="mt-6 space-y-2 text-xs text-slate-800">
              <div className="flex justify-between py-1.5 border-b border-amber-200">
                <span>Species Density:</span>
                <strong>{res.densityLbsPerCuFt} lbs / cu ft</strong>
              </div>
              <div className="flex justify-between py-1.5 border-b border-amber-200">
                <span>Moisture State:</span>
                <strong className="capitalize">{condition.replace('_', ' ')}</strong>
              </div>
              <div className="flex justify-between py-1.5">
                <span>Weight per Board Foot:</span>
                <strong>{Math.round((res.densityLbsPerCuFt / 12) * 100) / 100} lbs / BF</strong>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-amber-200 text-xs text-slate-500">
            Green lumber contains higher water content and weighs up to 60% more than kiln-dried stock.
          </div>
        </div>
      </div>
    </div>
  );
};

// 5. Deck Wood Widget
export const DeckWoodWidget: React.FC = () => {
  const [length, setLength] = useState<number | ''>(16);
  const [width, setWidth] = useState<number | ''>(12);
  const [boardLength, setBoardLength] = useState<number | ''>(16);
  const [joistSpacing, setJoistSpacing] = useState<number | ''>(16);

  const res = calculateDeckWood(
    Number(length) || 0,
    Number(width) || 0,
    '5_4x6',
    Number(boardLength) || 16,
    Number(joistSpacing) || 16
  );

  const getResultText = () =>
    `Deck Materials (${length}'x${width}'): ${res.numberOfDeckBoards} Deck Boards (${boardLength}ft) | Joists: ${res.joistsCount} | Fasteners: ~${res.hiddenFastenersOrScrewsCount} screws`;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Deck Length (ft)</label>
              <input
                type="number"
                value={length}
                onChange={e => setLength(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
                placeholder="16"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Deck Width (ft)</label>
              <input
                type="number"
                value={width}
                onChange={e => setWidth(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
                placeholder="12"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Deck Board Length (ft)</label>
              <select
                value={boardLength}
                onChange={e => setBoardLength(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
              >
                <option value={12}>12 Feet</option>
                <option value={16}>16 Feet (Standard)</option>
                <option value={20}>20 Feet</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Joist Spacing</label>
              <div className="flex gap-1">
                {[16, 12].map(s => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setJoistSpacing(s)}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded-md border ${
                      joistSpacing === s ? 'bg-sky-600 text-white border-sky-600' : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    {s}&quot; OC
                  </button>
                ))}
              </div>
            </div>
          </div>

          <CalculatorActions resultText={getResultText()} onReset={() => { setLength(16); setWidth(12); setBoardLength(16); setJoistSpacing(16); }} />
        </div>

        <div className="bg-amber-50/60 border border-amber-200 rounded-xl p-6 flex flex-col justify-between h-full">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-900">Deck Materials Required</span>
            <div className="mt-3">
              <div className="text-4xl font-extrabold text-amber-950">
                {res.numberOfDeckBoards} <span className="text-lg font-normal text-amber-800">Boards ({boardLength} ft)</span>
              </div>
              <p className="text-xs font-semibold text-amber-800 mt-1">
                {res.totalDeckingLinearFeet} Total Linear Feet (Includes 10% cutting waste)
              </p>
            </div>

            <div className="mt-6 space-y-2 text-xs text-slate-800">
              <div className="flex justify-between py-1.5 border-b border-amber-200">
                <span>Floor Joists (@ {joistSpacing}&quot; OC):</span>
                <strong>{res.joistsCount} joists</strong>
              </div>
              <div className="flex justify-between py-1.5 border-b border-amber-200">
                <span>Rim Joists / Band Board:</span>
                <strong>{res.rimJoistsLinearFeet} Linear Feet</strong>
              </div>
              <div className="flex justify-between py-1.5">
                <span>Deck Screws / Hidden Fasteners:</span>
                <strong>~{res.hiddenFastenersOrScrewsCount} fasteners</strong>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-amber-200 text-xs text-slate-500">
            Total deck surface area: {res.deckSquareFeet} sq ft.
          </div>
        </div>
      </div>
    </div>
  );
};

// 6. Cord Wood & Cord of Wood Widget
export const CordWoodWidget: React.FC<{ title?: string }> = ({ title = 'Cord Wood Calculator' }) => {
  const [length, setLength] = useState<number | ''>(8);
  const [height, setHeight] = useState<number | ''>(4);
  const [logLength, setLogLength] = useState<number | ''>(16);

  const res = calculateCordWood(
    Number(length) || 0,
    Number(height) || 0,
    Number(logLength) || 16
  );

  const getResultText = () =>
    `Wood Pile (${length}'x${height}'x${logLength}"): ${res.fullCords} Full Cords (${res.faceCordsOrRicks} Face Cords/Ricks) | Volume: ${res.stackCubicFeet} cu ft | ~${res.approximateWeightLbs} lbs`;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Pile Length (ft)</label>
              <input
                type="number"
                value={length}
                onChange={e => setLength(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
                placeholder="8"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Pile Height (ft)</label>
              <input
                type="number"
                value={height}
                onChange={e => setHeight(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
                placeholder="4"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Log Length (in)</label>
              <input
                type="number"
                value={logLength}
                onChange={e => setLogLength(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
                placeholder="16"
              />
            </div>
          </div>

          <CalculatorActions resultText={getResultText()} onReset={() => { setLength(8); setHeight(4); setLogLength(16); }} />
        </div>

        <div className="bg-amber-50/60 border border-amber-200 rounded-xl p-6 flex flex-col justify-between h-full">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-900">Firewood Cords Volume</span>
            <div className="mt-3">
              <div className="text-4xl font-extrabold text-amber-950">
                {res.fullCords} <span className="text-lg font-normal text-amber-800">Full Cords</span>
              </div>
              <p className="text-sm font-semibold text-amber-800 mt-1">
                = {res.faceCordsOrRicks} Face Cords (Ricks)
              </p>
            </div>

            <div className="mt-6 space-y-2 text-xs text-slate-800">
              <div className="flex justify-between py-1.5 border-b border-amber-200">
                <span>Stacked Volume:</span>
                <strong>{res.stackCubicFeet} Cubic Feet</strong>
              </div>
              <div className="flex justify-between py-1.5 border-b border-amber-200">
                <span>Standard Full Cord:</span>
                <strong>128 cu ft (4&apos; × 4&apos; × 8&apos;)</strong>
              </div>
              <div className="flex justify-between py-1.5">
                <span>Estimated Seasoned Weight:</span>
                <strong>~{formatNumber(res.approximateWeightLbs)} lbs</strong>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-amber-200 text-xs text-slate-500">
            A standard face cord (rick) is a single 4ft × 8ft row of 16-inch split logs (one-third of a full cord).
          </div>
        </div>
      </div>
    </div>
  );
};

// 7. Cabinet Wood Widget
export const CabinetWoodWidget: React.FC = () => {
  const [width, setWidth] = useState<number | ''>(36);
  const [height, setHeight] = useState<number | ''>(34.5);
  const [depth, setDepth] = useState<number | ''>(24);
  const [quantity, setQuantity] = useState<number | ''>(4);

  const res = calculateCabinetWood(
    Number(width) || 36,
    Number(height) || 34.5,
    Number(depth) || 24,
    Number(quantity) || 4
  );

  const getResultText = () =>
    `Cabinets (${quantity} boxes): ${res.sheetGoods4x8PlywoodCount} Plywood Sheets (4x8) | Face Frame: ${res.faceFrameBoardFeet} BF hardwood | Drawer Material: ${res.drawerBoxesMaterialSquareFeet} sq ft`;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Width (in)</label>
              <input
                type="number"
                value={width}
                onChange={e => setWidth(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
                placeholder="36"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Height (in)</label>
              <input
                type="number"
                value={height}
                onChange={e => setHeight(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
                placeholder="34.5"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Depth (in)</label>
              <input
                type="number"
                value={depth}
                onChange={e => setDepth(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
                placeholder="24"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Number of Cabinets</label>
            <input
              type="number"
              value={quantity}
              onChange={e => setQuantity(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
              placeholder="4"
            />
          </div>

          <CalculatorActions resultText={getResultText()} onReset={() => { setWidth(36); setHeight(34.5); setDepth(24); setQuantity(4); }} />
        </div>

        <div className="bg-amber-50/60 border border-amber-200 rounded-xl p-6 flex flex-col justify-between h-full">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-900">Cabinet Sheet & Frame Lumber</span>
            <div className="mt-3">
              <div className="text-4xl font-extrabold text-amber-950">
                {res.sheetGoods4x8PlywoodCount} <span className="text-lg font-normal text-amber-800">Sheets (4×8 Plywood)</span>
              </div>
              <p className="text-xs font-semibold text-amber-800 mt-1">
                Standard 3/4&quot; cabinet grade plywood for carcass and shelves
              </p>
            </div>

            <div className="mt-6 space-y-2 text-xs text-slate-800">
              <div className="flex justify-between py-1.5 border-b border-amber-200">
                <span>Hardwood Face Frame (1x2):</span>
                <strong>{res.faceFrameBoardFeet} Board Feet</strong>
              </div>
              <div className="flex justify-between py-1.5 border-b border-amber-200">
                <span>Drawer Boxes Subtotal:</span>
                <strong>~{res.drawerBoxesMaterialSquareFeet} sq ft</strong>
              </div>
              <div className="flex justify-between py-1.5">
                <span>Edge Banding Tape:</span>
                <strong>{res.edgeBandingLinearFeet} Linear Feet</strong>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-amber-200 text-xs text-slate-500">
            Includes 15% table saw kerf and cutting layout contingency.
          </div>
        </div>
      </div>
    </div>
  );
};

// 8. Firewood Cord Widget
export const FirewoodCordWidget: React.FC = () => {
  const [cords, setCords] = useState<number | ''>(2);
  const [species, setSpecies] = useState<'oak' | 'maple' | 'ash' | 'birch' | 'hickory' | 'pine'>('oak');

  const res = calculateFirewoodCord(
    Number(cords) || 0,
    species
  );

  const getResultText = () =>
    `Firewood Cord (${res.speciesName}): ${cords} Cords = ${res.totalMillionBtu} Million BTU | Weight: ${res.seasonedWeightLbs} lbs seasoned | ~${res.equivalentGallonsOfHeatingOil} gal heating oil equivalent`;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Firewood Species</label>
            <div className="grid grid-cols-2 gap-1.5">
              {[
                { id: 'oak', label: 'Oak' },
                { id: 'hickory', label: 'Hickory' },
                { id: 'ash', label: 'Ash' },
                { id: 'maple', label: 'Sugar Maple' },
                { id: 'birch', label: 'Yellow Birch' },
                { id: 'pine', label: 'White Pine' },
              ].map(s => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSpecies(s.id as any)}
                  className={`py-1.5 px-2 text-xs font-semibold rounded-md border ${
                    species === s.id ? 'bg-amber-800 text-white border-amber-800' : 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Number of Full Cords</label>
            <input
              type="number"
              step="0.5"
              value={cords}
              onChange={e => setCords(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
              placeholder="2"
            />
          </div>

          <CalculatorActions resultText={getResultText()} onReset={() => { setCords(2); setSpecies('oak'); }} />
        </div>

        <div className="bg-amber-50/60 border border-amber-200 rounded-xl p-6 flex flex-col justify-between h-full">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-900">Heating Value & Weight</span>
            <div className="mt-3">
              <div className="text-4xl font-extrabold text-amber-950">
                {res.totalMillionBtu} <span className="text-lg font-normal text-amber-800">Million BTU</span>
              </div>
              <p className="text-xs font-semibold text-amber-800 mt-1">
                Equivalent to ~{res.equivalentGallonsOfHeatingOil} gallons of #2 heating oil
              </p>
            </div>

            <div className="mt-6 space-y-2 text-xs text-slate-800">
              <div className="flex justify-between py-1.5 border-b border-amber-200">
                <span>Seasoned Air-Dry Weight:</span>
                <strong>{formatNumber(res.seasonedWeightLbs)} lbs</strong>
              </div>
              <div className="flex justify-between py-1.5 border-b border-amber-200">
                <span>Green Fresh-Cut Weight:</span>
                <strong>{formatNumber(res.greenWeightLbs)} lbs</strong>
              </div>
              <div className="flex justify-between py-1.5">
                <span>Wood Variety:</span>
                <strong>{res.speciesName}</strong>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-amber-200 text-xs text-slate-500">
            Seasoned firewood has less than 20% moisture content and burns significantly cleaner.
          </div>
        </div>
      </div>
    </div>
  );
};

// 9. Loose Cord Wood Widget
export const LooseCordWoodWidget: React.FC = () => {
  const [looseCuFt, setLooseCuFt] = useState<number | ''>(180);

  const res = calculateLooseCord(Number(looseCuFt) || 0);

  const getResultText = () =>
    `Loose Wood (${looseCuFt} cu ft thrown): ~${res.equivalentStackedCords} Stacked Cords | ~${res.pickupTruck8ftBeds} full 8ft truck beds`;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Dumped / Thrown Wood Volume (Cubic Feet)
            </label>
            <input
              type="number"
              value={looseCuFt}
              onChange={e => setLooseCuFt(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
              placeholder="180"
            />
            <div className="flex flex-wrap gap-1.5 mt-2">
              {[75, 150, 180, 360, 540].map(v => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setLooseCuFt(v)}
                  className="px-2 py-0.5 text-xs rounded bg-slate-100 hover:bg-amber-100 text-slate-700"
                >
                  {v} cu ft
                </button>
              ))}
            </div>
          </div>

          <CalculatorActions resultText={getResultText()} onReset={() => setLooseCuFt(180)} />
        </div>

        <div className="bg-amber-50/60 border border-amber-200 rounded-xl p-6 flex flex-col justify-between h-full">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-900">Equivalent Stacked Cords</span>
            <div className="mt-3">
              <div className="text-4xl font-extrabold text-amber-950">
                {res.equivalentStackedCords} <span className="text-lg font-normal text-amber-800">Stacked Cords</span>
              </div>
              <p className="text-xs font-semibold text-amber-800 mt-1">
                Air voids increase loose thrown volume by 40% (180 cu ft thrown = 128 cu ft stacked)
              </p>
            </div>

            <div className="mt-6 space-y-2 text-xs text-slate-800">
              <div className="flex justify-between py-1.5 border-b border-amber-200">
                <span>Standard 8-ft Pickup Truck Bed:</span>
                <strong>~{res.pickupTruck8ftBeds} Level Loads (~75 cu ft each)</strong>
              </div>
              <div className="flex justify-between py-1.5 border-b border-amber-200">
                <span>Short 6.5-ft Truck Bed:</span>
                <strong>~{res.pickupTruck6ftBeds} Level Loads (~55 cu ft each)</strong>
              </div>
              <div className="flex justify-between py-1.5">
                <span>Expansion Factor:</span>
                <strong>1.40× multiplier</strong>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-amber-200 text-xs text-slate-500">
            Legal standard for buying wood: Always measure in true stacked cords after stacking.
          </div>
        </div>
      </div>
    </div>
  );
};

// 10. Shed Wood Widget
export const ShedWoodWidget: React.FC = () => {
  const [length, setLength] = useState<number | ''>(12);
  const [width, setWidth] = useState<number | ''>(10);
  const [height, setHeight] = useState<number | ''>(8);

  const res = calculateShedWood(
    Number(length) || 12,
    Number(width) || 10,
    Number(height) || 8,
    'gable'
  );

  const getResultText = () =>
    `Shed Wood (${length}'x${width}'): ${res.wallStudsCount} Wall Studs | ${res.floorJoistsCount} Floor Joists | ${res.subfloorPlywoodSheets} Subfloor Sheets | ${res.roofSheathingOsbSheets} Roof OSB Sheets`;

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
                placeholder="12"
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

          <CalculatorActions resultText={getResultText()} onReset={() => { setLength(12); setWidth(10); setHeight(8); }} />
        </div>

        <div className="bg-amber-50/60 border border-amber-200 rounded-xl p-6 flex flex-col justify-between h-full">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-900">Shed Framing & Sheathing</span>
            <div className="mt-3">
              <div className="text-4xl font-extrabold text-amber-950">
                {res.wallStudsCount} <span className="text-lg font-normal text-amber-800">Wall Studs (2x4)</span>
              </div>
              <p className="text-xs font-semibold text-amber-800 mt-1">
                Floor: {res.floorJoistsCount} Joists (2x6) + {res.subfloorPlywoodSheets} Subfloor Plywood (4x8)
              </p>
            </div>

            <div className="mt-6 space-y-2 text-xs text-slate-800">
              <div className="flex justify-between py-1.5 border-b border-amber-200">
                <span>Roof Rafters / Trusses:</span>
                <strong>{res.roofRaftersOrTrussesCount} rafters</strong>
              </div>
              <div className="flex justify-between py-1.5 border-b border-amber-200">
                <span>Roof OSB Sheathing Sheets:</span>
                <strong>{res.roofSheathingOsbSheets} sheets (4×8)</strong>
              </div>
              <div className="flex justify-between py-1.5">
                <span>Exterior Wall Siding Area:</span>
                <strong>~{res.sidingSquareFeet} sq ft</strong>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-amber-200 text-xs text-slate-500">
            Framing layout spaced at standard 16&quot; OC on walls and 12&quot; OC on floor joists.
          </div>
        </div>
      </div>
    </div>
  );
};

// 11. Fence Wood Widget
export const FenceWoodWidget: React.FC = () => {
  const [length, setLength] = useState<number | ''>(100);
  const [height, setHeight] = useState<number | ''>(6);
  const [spacing, setSpacing] = useState<number | ''>(8);
  const [picketWidth, setPicketWidth] = useState<3.5 | 5.5>(5.5);

  const res = calculateFenceWood(
    Number(length) || 0,
    Number(height) || 6,
    Number(spacing) || 8,
    picketWidth
  );

  const getResultText = () =>
    `Fence (${length}' long, ${height}' high): ${res.numberOfPosts} Posts (4x4) | ${res.numberOfHorizontalRails} Rails (2x4) | ${res.numberOfPickets} Pickets | ${res.totalConcreteBags} Bags Concrete`;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Fence Length (ft)</label>
              <input
                type="number"
                value={length}
                onChange={e => setLength(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
                placeholder="100"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Fence Height (ft)</label>
              <input
                type="number"
                value={height}
                onChange={e => setHeight(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
                placeholder="6"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Post Spacing</label>
              <div className="flex gap-1">
                {[8, 6].map(s => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSpacing(s)}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded-md border ${
                      spacing === s ? 'bg-amber-800 text-white border-amber-800' : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    {s} Feet
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Picket Width</label>
              <div className="flex gap-1">
                {[
                  { w: 5.5, label: '1x6 (5.5")' },
                  { w: 3.5, label: '1x4 (3.5")' },
                ].map(p => (
                  <button
                    key={p.w}
                    type="button"
                    onClick={() => setPicketWidth(p.w as any)}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded-md border ${
                      picketWidth === p.w ? 'bg-amber-800 text-white border-amber-800' : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <CalculatorActions resultText={getResultText()} onReset={() => { setLength(100); setHeight(6); setSpacing(8); setPicketWidth(5.5); }} />
        </div>

        <div className="bg-amber-50/60 border border-amber-200 rounded-xl p-6 flex flex-col justify-between h-full">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-900">Fence Lumber & Concrete</span>
            <div className="mt-3">
              <div className="text-4xl font-extrabold text-amber-950">
                {res.numberOfPickets} <span className="text-lg font-normal text-amber-800">Pickets</span>
              </div>
              <p className="text-xs font-semibold text-amber-800 mt-1">
                {res.numberOfPosts} Posts (4x4) + {res.numberOfHorizontalRails} Horizontal Rails (2x4)
              </p>
            </div>

            <div className="mt-6 space-y-2 text-xs text-slate-800">
              <div className="flex justify-between py-1.5 border-b border-amber-200">
                <span>4x4 Treated Wood Posts:</span>
                <strong>{res.numberOfPosts} posts</strong>
              </div>
              <div className="flex justify-between py-1.5 border-b border-amber-200">
                <span>2x4 Rails (8-ft or 10-ft):</span>
                <strong>{res.numberOfHorizontalRails} boards</strong>
              </div>
              <div className="flex justify-between py-1.5">
                <span>Fast-Setting Concrete Bags:</span>
                <strong>{res.totalConcreteBags} bags (1.5 bags/post)</strong>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-amber-200 text-xs text-slate-500">
            For 6-ft fences, 3 horizontal 2x4 rails are recommended to prevent picket warping.
          </div>
        </div>
      </div>
    </div>
  );
};

// 12. Firewood Seasonal Calculator Widget
export const FirewoodCalculatorWidget: React.FC = () => {
  const [sqFt, setSqFt] = useState<number | ''>(2000);
  const [climate, setClimate] = useState<'mild' | 'moderate' | 'cold' | 'harsh'>('moderate');
  const [usage, setUsage] = useState<'primary' | 'supplemental' | 'occasional_fireplace'>('primary');

  const res = calculateSeasonalFirewood(
    Number(sqFt) || 2000,
    climate,
    usage
  );

  const getResultText = () =>
    `Seasonal Firewood (${sqFt} sq ft, ${res.climateZone}): ~${res.cordsNeededForWinter} Cords needed for winter (${res.woodWeightLbs} lbs, ${res.totalSeasonalBtuMillions} Million BTU)`;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Home Living Area (Square Feet)</label>
            <input
              type="number"
              value={sqFt}
              onChange={e => setSqFt(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
              placeholder="2000"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Winter Climate Zone</label>
            <div className="grid grid-cols-2 gap-1.5">
              {[
                { id: 'mild', label: 'Mild (South)' },
                { id: 'moderate', label: 'Moderate (Midwest)' },
                { id: 'cold', label: 'Cold (Northern US)' },
                { id: 'harsh', label: 'Harsh (Rockies/Canada)' },
              ].map(c => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setClimate(c.id as any)}
                  className={`py-1.5 px-2 text-xs font-semibold rounded-md border ${
                    climate === c.id ? 'bg-amber-800 text-white border-amber-800' : 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Heating Role</label>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { id: 'primary', label: 'Primary Heat' },
                { id: 'supplemental', label: 'Supplemental' },
                { id: 'occasional_fireplace', label: 'Fireplace' },
              ].map(u => (
                <button
                  key={u.id}
                  type="button"
                  onClick={() => setUsage(u.id as any)}
                  className={`py-1.5 px-2 text-xs font-semibold rounded-md border ${
                    usage === u.id ? 'bg-amber-800 text-white border-amber-800' : 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  {u.label}
                </button>
              ))}
            </div>
          </div>

          <CalculatorActions resultText={getResultText()} onReset={() => { setSqFt(2000); setClimate('moderate'); setUsage('primary'); }} />
        </div>

        <div className="bg-amber-50/60 border border-amber-200 rounded-xl p-6 flex flex-col justify-between h-full">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-900">Winter Season Firewood Needed</span>
            <div className="mt-3">
              <div className="text-4xl font-extrabold text-amber-950">
                {res.cordsNeededForWinter} <span className="text-lg font-normal text-amber-800">Cords</span>
              </div>
              <p className="text-xs font-semibold text-amber-800 mt-1">
                Estimated Winter Energy: {res.totalSeasonalBtuMillions} Million BTU
              </p>
            </div>

            <div className="mt-6 space-y-2 text-xs text-slate-800">
              <div className="flex justify-between py-1.5 border-b border-amber-200">
                <span>Total Stored Wood Weight:</span>
                <strong>~{formatNumber(res.woodWeightLbs)} lbs ({Math.round(res.woodWeightLbs / 2000)} tons)</strong>
              </div>
              <div className="flex justify-between py-1.5 border-b border-amber-200">
                <span>Climate Profile:</span>
                <strong>{res.climateZone}</strong>
              </div>
              <div className="flex justify-between py-1.5">
                <span>Heating System:</span>
                <strong className="capitalize">{usage.replace('_', ' ')}</strong>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-amber-200 text-xs text-slate-500">
            Based on a high-efficiency EPA wood stove burning seasoned hardwood.
          </div>
        </div>
      </div>
    </div>
  );
};
