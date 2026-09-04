'use client';

import React, { useState } from 'react';
import { calculateRoi } from '@/lib/calculators/investments';
import { formatCurrency, formatNumber } from '@/lib/formatting';
import { CalculatorActions } from '@/components/calculator/CalculatorActions';
import { TrendingUp, Percent, Award, Sparkles } from 'lucide-react';

export const RoiCalculatorWidget: React.FC = () => {
  const [initialInvestment, setInitialInvestment] = useState<number | ''>(10000);
  const [finalValue, setFinalValue] = useState<number | ''>(17500);
  const [years, setYears] = useState<number | ''>(3);

  const res = calculateRoi(
    Number(initialInvestment) || 0,
    Number(finalValue) || 0,
    Number(years) || 1
  );

  const getResultText = () => {
    return `ROI Summary: Initial: ${formatCurrency(
      Number(initialInvestment) || 0
    )} -> Final: ${formatCurrency(Number(finalValue) || 0)} over ${years} years. Net Gain: ${formatCurrency(
      res.netGain
    )}. Total ROI: ${res.totalRoiPercentage}%. Annualized ROI (CAGR): ${res.annualizedRoi}%. Investment Multiplier: ${
      res.multiplier
    }x.`;
  };

  const handleReset = () => {
    setInitialInvestment(10000);
    setFinalValue(17500);
    setYears(3);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Form Inputs */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Initial Investment Amount ($)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">
                $
              </span>
              <input
                type="number"
                min={0}
                value={initialInvestment}
                onChange={e => setInitialInvestment(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full pl-8 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Final Ending Value ($)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">
                $
              </span>
              <input
                type="number"
                min={0}
                value={finalValue}
                onChange={e => setFinalValue(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full pl-8 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Investment Holding Period (Years)
            </label>
            <input
              type="number"
              min={0.1}
              step={0.5}
              value={years}
              onChange={e => setYears(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white font-medium"
            />
          </div>

          <CalculatorActions resultText={getResultText()} onReset={handleReset} />
        </div>

        {/* Results Display */}
        <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-6 flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                Total Return on Investment
              </span>
              <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300">
                {res.multiplier}x Multiplier
              </span>
            </div>

            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-black text-emerald-950 tracking-tight">
                +{res.totalRoiPercentage}%
              </span>
            </div>

            <div className="mt-5 space-y-2.5 text-xs">
              <div className="p-3.5 bg-white rounded-xl border border-emerald-200/80 flex justify-between items-center">
                <span className="text-slate-600 font-medium">Annualized Compound Return (CAGR):</span>
                <strong className="text-emerald-900 text-base font-black">+{res.annualizedRoi}% / yr</strong>
              </div>

              <div className="p-3.5 bg-white rounded-xl border border-emerald-200/80 flex justify-between items-center">
                <span className="text-slate-600 font-medium">Net Dollar Gain:</span>
                <strong className="text-emerald-900 text-base font-black">+{formatCurrency(res.netGain)}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
