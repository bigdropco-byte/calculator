'use client';

import React, { useState } from 'react';
import {
  convertOvenToAirFryer,
  AIR_FRYER_PRESETS,
  QUICK_CONVERSION_CHART,
  TempUnit,
  CrispinessPreference,
  FoodCategory,
  AirFryerFoodPreset,
} from '@/lib/calculators/airFryer';
import { CalculatorActions } from '@/components/calculator/CalculatorActions';
import { Flame, Clock, Zap, Sparkles, CheckCircle2, RotateCcw } from 'lucide-react';

export const AirFryerCalculatorWidget: React.FC = () => {
  // Active view: 'converter' | 'presets'
  const [activeTab, setActiveTab] = useState<'converter' | 'presets'>('converter');

  // Converter state
  const [unit, setUnit] = useState<TempUnit>('F');
  const [ovenTemp, setOvenTemp] = useState<number>(400);
  const [ovenTime, setOvenTime] = useState<number>(30);
  const [crispiness, setCrispiness] = useState<CrispinessPreference>('normal');
  const [isFrozen, setIsFrozen] = useState<boolean>(false);

  // Preset filter state
  const [selectedCategory, setSelectedCategory] = useState<FoodCategory | 'all'>('all');
  const [selectedPreset, setSelectedPreset] = useState<AirFryerFoodPreset | null>(null);

  // Run calculation
  const result = convertOvenToAirFryer({
    ovenTemp,
    ovenTimeMinutes: ovenTime,
    unit,
    crispiness,
    isFrozen,
  });

  const handleUnitToggle = (newUnit: TempUnit) => {
    if (newUnit === unit) return;
    if (newUnit === 'C') {
      // 400F -> 200C
      setOvenTemp(Math.round(((ovenTemp - 32) * 5) / 9 / 5) * 5);
    } else {
      // 200C -> 400F
      setOvenTemp(Math.round(((ovenTemp * 9) / 5 + 32) / 5) * 5);
    }
    setUnit(newUnit);
  };

  const handleApplyPreset = (preset: AirFryerFoodPreset) => {
    setSelectedPreset(preset);
    if (unit === 'F') {
      setOvenTemp(preset.tempF + 25);
    } else {
      setOvenTemp(preset.tempC + 15);
    }
    setOvenTime(Math.round(preset.targetTime / 0.8));
    setIsFrozen(false);
    setActiveTab('converter');
  };

  const handleReset = () => {
    setUnit('F');
    setOvenTemp(400);
    setOvenTime(30);
    setCrispiness('normal');
    setIsFrozen(false);
    setSelectedPreset(null);
  };

  const getResultText = () => {
    return `Air Fryer Settings: Cook at ${result.airFryerTemp}°${result.unit} (${result.airFryerTempAlternateUnit}°${
      result.unit === 'F' ? 'C' : 'F'
    }) for ${result.targetTimeMinutes} mins (Range: ${result.minTimeMinutes}-${result.maxTimeMinutes} mins). Shake or flip at ${
      result.shakeCheckpointMinutes
    } mins. Saves ${result.timeSavedMinutes} mins compared to oven!`;
  };

  const filteredPresets =
    selectedCategory === 'all'
      ? AIR_FRYER_PRESETS
      : AIR_FRYER_PRESETS.filter(p => p.category === selectedCategory);

  const fahrenheitPresets = [350, 375, 400, 425, 450];
  const celsiusPresets = [175, 190, 200, 220, 230];

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Main Calculator Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
        {/* Navigation Tabs & Unit Selector */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          {/* Mode Switcher */}
          <div className="flex bg-slate-100 p-1 rounded-xl w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setActiveTab('converter')}
              className={`flex-1 sm:flex-none px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all flex items-center justify-center gap-2 ${
                activeTab === 'converter'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Flame className="w-4 h-4 text-orange-500" />
              Oven to Air Fryer Converter
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('presets')}
              className={`flex-1 sm:flex-none px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all flex items-center justify-center gap-2 ${
                activeTab === 'presets'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-4 h-4 text-sky-600" />
              Food Preset Guide ({AIR_FRYER_PRESETS.length})
            </button>
          </div>

          {/* Unit Toggle (°F / °C) */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <span className="text-xs font-semibold text-slate-700">Temp Unit:</span>
            <div className="inline-flex bg-slate-100 p-0.5 rounded-lg border border-slate-200">
              <button
                type="button"
                onClick={() => handleUnitToggle('F')}
                className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${
                  unit === 'F'
                    ? 'bg-sky-700 text-white shadow-2xs'
                    : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                °F (Fahrenheit)
              </button>
              <button
                type="button"
                onClick={() => handleUnitToggle('C')}
                className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${
                  unit === 'C'
                    ? 'bg-sky-700 text-white shadow-2xs'
                    : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                °C (Celsius)
              </button>
            </div>
          </div>
        </div>

        {/* Tab 1: Converter Mode */}
        {activeTab === 'converter' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-6">
            {/* Left Inputs (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {selectedPreset && (
                <div className="p-3 bg-sky-50 border border-sky-200 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-700 shrink-0" />
                    <span className="text-xs text-sky-950 font-medium">
                      Loaded from: <strong>{selectedPreset.name}</strong>
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedPreset(null)}
                    className="text-xs text-sky-700 hover:text-sky-900 font-semibold"
                  >
                    Clear Preset
                  </button>
                </div>
              )}

              {/* Conventional Oven Temperature */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Original Oven Temperature
                  </label>
                  <span className="text-sm font-extrabold text-slate-900 bg-slate-100 px-2.5 py-0.5 rounded-md">
                    {ovenTemp}°{unit}
                  </span>
                </div>

                <input
                  type="range"
                  min={unit === 'F' ? 250 : 120}
                  max={unit === 'F' ? 475 : 245}
                  step={5}
                  value={ovenTemp}
                  onChange={e => setOvenTemp(Number(e.target.value))}
                  className="w-full accent-sky-700 h-2 bg-slate-200 rounded-lg cursor-pointer"
                />

                {/* Preset Pills */}
                <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
                  <span className="text-[11px] text-slate-700 font-medium mr-1">Quick Oven Temp:</span>
                  {(unit === 'F' ? fahrenheitPresets : celsiusPresets).map(val => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setOvenTemp(val)}
                      className={`px-2 py-0.5 text-xs rounded-md border font-medium transition-colors ${
                        ovenTemp === val
                          ? 'bg-sky-50 text-sky-700 border-sky-300 font-bold'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {val}°{unit}
                    </button>
                  ))}
                </div>
              </div>

              {/* Conventional Oven Cooking Time */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Original Oven Cooking Time
                  </label>
                  <span className="text-sm font-extrabold text-slate-900 bg-slate-100 px-2.5 py-0.5 rounded-md">
                    {ovenTime} mins
                  </span>
                </div>

                <input
                  type="range"
                  min={5}
                  max={120}
                  step={1}
                  value={ovenTime}
                  onChange={e => setOvenTime(Number(e.target.value))}
                  className="w-full accent-sky-700 h-2 bg-slate-200 rounded-lg cursor-pointer"
                />

                {/* Time Quick Pills */}
                <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
                  <span className="text-[11px] text-slate-700 font-medium mr-1">Quick Time:</span>
                  {[15, 20, 30, 45, 60].map(m => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setOvenTime(m)}
                      className={`px-2 py-0.5 text-xs rounded-md border font-medium transition-colors ${
                        ovenTime === m
                          ? 'bg-sky-50 text-sky-700 border-sky-300 font-bold'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {m}m
                    </button>
                  ))}
                </div>
              </div>

              {/* Desired Texture / Crispiness */}
              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                  Texture Preference
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'tender', label: 'Tender / Juicy', sub: '-5% time' },
                    { id: 'normal', label: 'Standard', sub: 'Golden brown' },
                    { id: 'crispy', label: 'Extra Crispy', sub: '+5% time' },
                  ].map(item => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setCrispiness(item.id as CrispinessPreference)}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        crispiness === item.id
                          ? 'bg-sky-50 border-sky-400 text-sky-950 ring-1 ring-sky-300'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="text-xs font-bold">{item.label}</div>
                      <div className="text-[10px] text-slate-600 mt-0.5">{item.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Fresh vs Frozen Toggle */}
              <div className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                <div>
                  <span className="text-xs font-bold text-slate-900 block">Cooking from Frozen?</span>
                  <span className="text-[11px] text-slate-600">
                    Automatically adds ~15% cooking time for frozen wings, patties, or fries
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsFrozen(!isFrozen)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                    isFrozen ? 'bg-sky-700' : 'bg-slate-300'
                  }`}
                  role="switch"
                  aria-checked={isFrozen}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                      isFrozen ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              <CalculatorActions resultText={getResultText()} onReset={handleReset} />
            </div>

            {/* Right Output Card (5 cols) */}
            <div className="lg:col-span-5 bg-linear-to-br from-orange-50/70 via-amber-50/40 to-sky-50/40 border border-orange-200/80 rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-2xs">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-orange-900 flex items-center gap-1.5">
                    <Flame className="w-4 h-4 text-orange-600 fill-orange-500" />
                    Recommended Air Fryer Settings
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                    20/20 Rule Applied
                  </span>
                </div>

                {/* Main Converted Numbers */}
                <div className="grid grid-cols-2 gap-4 py-3">
                  {/* Temperature */}
                  <div className="bg-white/90 backdrop-blur-xs p-4 rounded-xl border border-orange-100 shadow-2xs">
                    <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block">
                      Air Fryer Temp
                    </span>
                    <div className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight mt-1">
                      {result.airFryerTemp}°{result.unit}
                    </div>
                    <span className="text-xs text-orange-700 font-semibold mt-1 block">
                      ({result.airFryerTempAlternateUnit}°{result.unit === 'F' ? 'C' : 'F'}) • -{result.tempReduction}°
                    </span>
                  </div>

                  {/* Cooking Time */}
                  <div className="bg-white/90 backdrop-blur-xs p-4 rounded-xl border border-orange-100 shadow-2xs">
                    <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block">
                      Air Fryer Time
                    </span>
                    <div className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight mt-1">
                      {result.targetTimeMinutes}{' '}
                      <span className="text-sm font-bold text-slate-600">min</span>
                    </div>
                    <span className="text-xs text-slate-600 font-medium mt-1 block">
                      Range: {result.minTimeMinutes}–{result.maxTimeMinutes} min
                    </span>
                  </div>
                </div>

                {/* Efficiency & Saved Time Metric */}
                <div className="mt-4 p-3.5 bg-emerald-50/90 border border-emerald-200 rounded-xl space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-emerald-950 font-bold flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-emerald-700" />
                      Time Saved vs Oven:
                    </span>
                    <strong className="text-emerald-800 font-extrabold">
                      +{result.timeSavedMinutes} mins faster ({result.percentTimeSaved}% faster)
                    </strong>
                  </div>
                  <div className="flex items-center justify-between text-xs pt-1 border-t border-emerald-200/60">
                    <span className="text-emerald-950 font-bold flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-amber-600" />
                      Energy Conserved:
                    </span>
                    <strong className="text-emerald-800 font-extrabold">
                      ~{result.estimatedEnergySavedPercent}% less electricity
                    </strong>
                  </div>
                </div>

                {/* Midpoint Shake / Flip Checkpoint */}
                <div className="mt-4 p-3.5 bg-sky-50/90 border border-sky-200 rounded-xl">
                  <div className="flex items-center gap-2">
                    <RotateCcw className="w-4 h-4 text-sky-700 shrink-0" />
                    <div>
                      <span className="text-xs font-bold text-sky-950 block">
                        Midpoint Checkpoint: {result.shakeCheckpointMinutes} Minutes
                      </span>
                      <span className="text-[11px] text-sky-900 leading-relaxed block mt-0.5">
                        Open the air fryer basket at minute {result.shakeCheckpointMinutes} to shake or flip your food for uniform crispiness.
                      </span>
                    </div>
                  </div>
                </div>

                {/* Internal doneness if preset is active */}
                {selectedPreset?.internalTempF && (
                  <div className="mt-3 text-xs p-2.5 bg-amber-50 border border-amber-200 rounded-lg text-amber-950 font-medium">
                    🎯 <strong>USDA Safe Internal Temp:</strong> {selectedPreset.internalTempF}°F (
                    {selectedPreset.internalTempC}°C) at thickest part.
                  </div>
                )}
              </div>

              {/* Chef Note */}
              <div className="mt-4 pt-3 border-t border-orange-200/70 text-xs text-slate-700 leading-relaxed italic">
                💡 {result.tip}
              </div>
            </div>
          </div>
        ) : (
          /* Tab 2: Food Preset Master Guide */
          <div className="pt-6 space-y-6">
            {/* Category Filter Buttons */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: 'All Foods' },
                { id: 'poultry', label: '🍗 Poultry' },
                { id: 'meat', label: '🥩 Meat & Pork' },
                { id: 'seafood', label: '🍤 Seafood' },
                { id: 'veggies', label: '🥦 Veggies & Potatoes' },
                { id: 'snacks', label: '🍕 Snacks & Baking' },
              ].map(cat => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id as FoodCategory | 'all')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
                    selectedCategory === cat.id
                      ? 'bg-sky-700 text-white border-sky-800 shadow-2xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Presets Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPresets.map(preset => (
                <div
                  key={preset.id}
                  className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs hover:border-sky-400 hover:shadow-xs transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4 className="text-sm font-bold text-slate-900 line-clamp-1">{preset.name}</h4>
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 shrink-0">
                        {preset.category}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 my-3 text-center">
                      <div className="p-2 bg-orange-50/70 border border-orange-100 rounded-lg">
                        <span className="text-[10px] text-slate-600 block uppercase font-semibold">
                          Temperature
                        </span>
                        <strong className="text-sm font-black text-slate-900">
                          {unit === 'F' ? `${preset.tempF}°F` : `${preset.tempC}°C`}
                        </strong>
                        <span className="text-[10px] text-orange-700 block">
                          ({unit === 'F' ? `${preset.tempC}°C` : `${preset.tempF}°F`})
                        </span>
                      </div>

                      <div className="p-2 bg-sky-50/70 border border-sky-100 rounded-lg">
                        <span className="text-[10px] text-slate-600 block uppercase font-semibold">
                          Time
                        </span>
                        <strong className="text-sm font-black text-slate-900">
                          {preset.minTime}–{preset.maxTime} min
                        </strong>
                        <span className="text-[10px] text-sky-700 block">
                          Flip at {preset.flipCheckpointTime}m
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-700 line-clamp-2 leading-relaxed mb-3">
                      {preset.notes}
                    </p>

                    {preset.internalTempF && (
                      <div className="text-[11px] text-emerald-800 font-semibold mb-3 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                        Safe Temp: {unit === 'F' ? `${preset.internalTempF}°F` : `${preset.internalTempC}°C`}
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleApplyPreset(preset)}
                    className="w-full py-1.5 px-3 bg-slate-100 hover:bg-sky-50 hover:text-sky-700 hover:border-sky-300 border border-slate-200 text-slate-800 rounded-lg text-xs font-bold transition-colors"
                  >
                    Load into Converter →
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Quick Reference Conversion Table */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <Flame className="w-5 h-5 text-orange-600" />
              Oven to Air Fryer Quick Conversion Reference
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              General rule: Drop oven temperature by 25°F (15°C) and reduce cooking time by 20% to 25%.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto border border-slate-200 rounded-xl">
          <table className="min-w-full border-collapse text-left text-xs sm:text-sm">
            <thead className="bg-slate-100 text-slate-800 font-semibold border-b border-slate-200">
              <tr>
                <th className="px-4 py-2.5 border-r border-slate-200">Conventional Oven Temp</th>
                <th className="px-4 py-2.5 border-r border-slate-200 text-orange-900 font-bold bg-orange-50/50">
                  Air Fryer Temp (-25°F / -15°C)
                </th>
                <th className="px-4 py-2.5 border-r border-slate-200">Oven Time</th>
                <th className="px-4 py-2.5 text-emerald-800 font-bold bg-emerald-50/50">
                  Air Fryer Time (-20% to -25%)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {QUICK_CONVERSION_CHART.map((row, idx) => (
                <tr key={idx} className="hover:bg-sky-50/40 transition-colors">
                  <td className="px-4 py-2.5 font-medium border-r border-slate-100">{row.ovenF}</td>
                  <td className="px-4 py-2.5 font-bold text-orange-800 border-r border-slate-100 bg-orange-50/20">
                    {row.airFryerF}
                  </td>
                  <td className="px-4 py-2.5 border-r border-slate-100">{row.ovenTime}</td>
                  <td className="px-4 py-2.5 font-bold text-emerald-800 bg-emerald-50/20">
                    {row.airFryerTime}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between text-xs text-slate-700 pt-3 border-t border-slate-100 gap-2">
          <span>* Always verify poultry reaches 165°F (74°C) and pork reaches 145°F (63°C) with an instant-read meat thermometer.</span>
          <span className="font-semibold text-sky-700">Calculat Kitchen Guide</span>
        </div>
      </div>
    </div>
  );
};
