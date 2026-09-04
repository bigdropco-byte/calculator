'use client';

import React, { useState } from 'react';
import { calculatePercentageIncrease } from '@/lib/calculators/percentageIncrease';
import { formatNumber, formatPercent } from '@/lib/formatting';
import { CalculatorActions } from '@/components/calculator/CalculatorActions';

export const PercentageIncreaseCalculatorWidget: React.FC = () => {
  const [initialValue, setInitialValue] = useState<number | ''>(50);
  const [finalValue, setFinalValue] = useState<number | ''>(75);

  const res = calculatePercentageIncrease(
    Number(initialValue) || 0,
    Number(finalValue) || 0
  );

  const getResultText = () => {
    return `From ${initialValue} to ${finalValue}: ${formatPercent(res.percentageChange)} ${
      res.isIncrease ? 'increase' : 'decrease'
    } (Difference: ${formatNumber(res.difference)}, Multiplier: ${formatNumber(res.multiplier, 2)}x)`;
  };

  const handleReset = () => {
    setInitialValue(50);
    setFinalValue(75);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Inputs */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Initial Value (Starting Point)
            </label>
            <input
              type="number"
              value={initialValue}
              onChange={e => setInitialValue(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white"
              placeholder="e.g. 50"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Final Value (Ending Point)
            </label>
            <input
              type="number"
              value={finalValue}
              onChange={e => setFinalValue(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white"
              placeholder="e.g. 75"
            />
          </div>

          {/* Quick presets */}
          <div>
            <span className="text-xs text-slate-500 font-medium block mb-2">
              Quick Final Value Presets:
            </span>
            <div className="flex flex-wrap gap-2">
              {[
                { label: '+10%', mult: 1.1 },
                { label: '+25%', mult: 1.25 },
                { label: '+50%', mult: 1.5 },
                { label: '+100% (2x)', mult: 2.0 },
                { label: '-20%', mult: 0.8 },
              ].map(preset => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => {
                    const init = Number(initialValue) || 100;
                    setFinalValue(Math.round(init * preset.mult * 100) / 100);
                  }}
                  className="px-2.5 py-1 text-xs rounded-md bg-slate-100 hover:bg-sky-50 hover:text-sky-700 border border-slate-200 text-slate-700 font-medium transition-colors"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          <CalculatorActions resultText={getResultText()} onReset={handleReset} />
        </div>

        {/* Results Card */}
        <div className="bg-sky-50/60 border border-sky-100 rounded-xl p-6 flex flex-col justify-between h-full">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-sky-800">
              Percentage Change Result
            </span>

            <div className="mt-3">
              <div className="text-4xl sm:text-5xl font-extrabold text-sky-950 tracking-tight flex items-baseline gap-2">
                {formatPercent(res.percentageChange)}
                <span
                  className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border ${
                    res.isIncrease
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                      : 'bg-rose-100 text-rose-800 border-rose-300'
                  }`}
                >
                  {res.isIncrease ? 'Increase ↑' : 'Decrease ↓'}
                </span>
              </div>
            </div>

            <div className="mt-6 space-y-2.5 text-xs text-slate-700">
              <div className="flex justify-between py-1.5 border-b border-sky-200/50">
                <span className="text-slate-500">Difference (Absolute):</span>
                <strong className="font-semibold text-slate-900">{formatNumber(res.difference)}</strong>
              </div>
              <div className="flex justify-between py-1.5 border-b border-sky-200/50">
                <span className="text-slate-500">Multiplier / Ratio:</span>
                <strong className="font-semibold text-slate-900">{formatNumber(res.multiplier, 3)}×</strong>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-500">Initial to Final:</span>
                <span className="font-semibold text-slate-900">{initialValue || 0} → {finalValue || 0}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-sky-200/60 text-xs text-slate-500">
            Formula: [({finalValue || 0} - {initialValue || 0}) ÷ |{initialValue || 0}|] × 100
          </div>
        </div>
      </div>
    </div>
  );
};
