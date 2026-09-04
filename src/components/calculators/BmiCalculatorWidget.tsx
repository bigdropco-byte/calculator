'use client';

import React, { useState } from 'react';
import { calculateBmiMetric, calculateBmiImperial, BmiUnit } from '@/lib/calculators/bmi';
import { formatNumber } from '@/lib/formatting';
import { CalculatorActions } from '@/components/calculator/CalculatorActions';

export const BmiCalculatorWidget: React.FC = () => {
  const [unit, setUnit] = useState<BmiUnit>('metric');

  // Metric state
  const [weightKg, setWeightKg] = useState<number | ''>(70);
  const [heightCm, setHeightCm] = useState<number | ''>(175);

  // Imperial state
  const [weightLbs, setWeightLbs] = useState<number | ''>(154);
  const [heightFeet, setHeightFeet] = useState<number | ''>(5);
  const [heightInches, setHeightInches] = useState<number | ''>(9);

  const res =
    unit === 'metric'
      ? calculateBmiMetric(Number(weightKg) || 0, Number(heightCm) || 0)
      : calculateBmiImperial(
          Number(weightLbs) || 0,
          Number(heightFeet) || 0,
          Number(heightInches) || 0
        );

  const getResultText = () => {
    return `BMI: ${res.bmi} (${res.category}). Healthy weight range: ${res.healthyWeightMin} – ${
      res.healthyWeightMax
    } ${unit === 'metric' ? 'kg' : 'lbs'}.`;
  };

  const handleReset = () => {
    if (unit === 'metric') {
      setWeightKg(70);
      setHeightCm(175);
    } else {
      setWeightLbs(154);
      setHeightFeet(5);
      setHeightInches(9);
    }
  };

  const getCategoryColor = (catClass: string) => {
    switch (catClass) {
      case 'underweight':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'normal':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'overweight':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      default:
        return 'bg-rose-100 text-rose-800 border-rose-300';
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      {/* Unit switch */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
        <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
          Measurement System:
        </span>
        <div className="flex items-center p-0.5 bg-slate-100 rounded-lg border border-slate-200">
          <button
            type="button"
            onClick={() => setUnit('metric')}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
              unit === 'metric' ? 'bg-white text-sky-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Metric (kg, cm)
          </button>
          <button
            type="button"
            onClick={() => setUnit('imperial')}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
              unit === 'imperial' ? 'bg-white text-sky-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Imperial (lbs, ft/in)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Form Inputs */}
        <div className="space-y-4">
          {unit === 'metric' ? (
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Height (cm)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={heightCm}
                    onChange={e => setHeightCm(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white"
                    placeholder="e.g. 175"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-semibold">
                    cm
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Weight (kg)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={weightKg}
                    onChange={e => setWeightKg(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white"
                    placeholder="e.g. 70"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-semibold">
                    kg
                  </span>
                </div>
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Height (Feet &amp; Inches)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <input
                      type="number"
                      value={heightFeet}
                      onChange={e => setHeightFeet(e.target.value === '' ? '' : Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white"
                      placeholder="5"
                    />
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-semibold">
                      ft
                    </span>
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      value={heightInches}
                      onChange={e => setHeightInches(e.target.value === '' ? '' : Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white"
                      placeholder="9"
                    />
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-semibold">
                      in
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Weight (Pounds)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={weightLbs}
                    onChange={e => setWeightLbs(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white"
                    placeholder="e.g. 154"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-semibold">
                    lbs
                  </span>
                </div>
              </div>
            </>
          )}

          <CalculatorActions resultText={getResultText()} onReset={handleReset} />
        </div>

        {/* Results Display */}
        <div className="bg-sky-50/60 border border-sky-100 rounded-xl p-6 flex flex-col justify-between h-full">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-sky-800">
              Body Mass Index Score
            </span>

            <div className="mt-2 flex items-baseline gap-3">
              <span className="text-4xl sm:text-5xl font-extrabold text-sky-950 tracking-tight">
                {res.bmi || 0}
              </span>
              <span
                className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border ${getCategoryColor(
                  res.categoryClass
                )}`}
              >
                {res.category}
              </span>
            </div>

            {/* Visual Color Scale Bar */}
            <div className="mt-5 space-y-1.5">
              <div className="h-2.5 w-full rounded-full flex overflow-hidden">
                <div className="bg-blue-400 flex-[18.5]" title="Underweight (<18.5)" />
                <div className="bg-emerald-500 flex-[6.4]" title="Normal (18.5-24.9)" />
                <div className="bg-amber-400 flex-[5]" title="Overweight (25-29.9)" />
                <div className="bg-rose-500 flex-[10]" title="Obese (≥30)" />
              </div>
              <div className="flex justify-between text-[10px] text-slate-400 font-semibold px-0.5">
                <span>18.5</span>
                <span>25.0</span>
                <span>30.0</span>
              </div>
            </div>

            {/* Target weight range */}
            <div className="mt-5 p-3 bg-white border border-sky-200/80 rounded-lg text-xs space-y-1">
              <span className="text-slate-500 font-medium block">
                Recommended Healthy Weight Range:
              </span>
              <p className="text-sm font-bold text-slate-900">
                {formatNumber(res.healthyWeightMin)} – {formatNumber(res.healthyWeightMax)}{' '}
                {unit === 'metric' ? 'kg' : 'lbs'}
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-sky-200/60 text-[11px] text-slate-500 leading-normal">
            Note: BMI is a screening metric. It does not directly quantify body fat percentage or lean muscle mass.
          </div>
        </div>
      </div>
    </div>
  );
};
