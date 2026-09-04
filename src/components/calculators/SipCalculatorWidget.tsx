'use client';

import React, { useState } from 'react';
import { calculateSip } from '@/lib/calculators/investments';
import { formatCurrency, formatNumber } from '@/lib/formatting';
import { CalculatorActions } from '@/components/calculator/CalculatorActions';
import { TrendingUp, Sparkles, Layers, DollarSign } from 'lucide-react';

export const SipCalculatorWidget: React.FC = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState<number | ''>(500);
  const [expectedReturn, setExpectedReturn] = useState<number | ''>(12);
  const [years, setYears] = useState<number | ''>(15);

  const res = calculateSip(
    Number(monthlyInvestment) || 0,
    Number(expectedReturn) || 0,
    Number(years) || 1
  );

  const getResultText = () => {
    return `SIP Wealth Projection: Monthly Deposit: ${formatCurrency(
      Number(monthlyInvestment) || 0
    )} @ ${expectedReturn}% return for ${years} years -> Total Invested: ${formatCurrency(
      res.totalInvested
    )}, Estimated Wealth Gain: ${formatCurrency(res.estimatedReturns)}, Total Maturity Value: ${formatCurrency(
      res.totalMaturityValue
    )} (${res.wealthMultiplier}x wealth multiplier).`;
  };

  const handleReset = () => {
    setMonthlyInvestment(500);
    setExpectedReturn(12);
    setYears(15);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Form Inputs */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Monthly Investment Amount ($)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">
                $
              </span>
              <input
                type="number"
                min={10}
                step={50}
                value={monthlyInvestment}
                onChange={e => setMonthlyInvestment(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full pl-8 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Expected Annual Return (%)
              </label>
              <input
                type="number"
                min={1}
                step={0.5}
                value={expectedReturn}
                onChange={e => setExpectedReturn(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Time Horizon (Years)
              </label>
              <input
                type="number"
                min={1}
                max={50}
                value={years}
                onChange={e => setYears(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white font-medium"
              />
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-violet-50/70 border border-violet-100 text-xs text-violet-950 space-y-1">
            <span className="font-bold flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-violet-600" />
              Rupee/Dollar Cost Averaging
            </span>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Systematic Investment Plans (SIPs) automatically buy more shares when markets dip and fewer when prices peak, smoothing volatility through disciplined monthly compounding.
            </p>
          </div>

          <CalculatorActions resultText={getResultText()} onReset={handleReset} />
        </div>

        {/* Results Display */}
        <div className="bg-violet-50/50 border border-violet-100 rounded-xl p-6 flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-violet-800">
                Projected Maturity Wealth
              </span>
              <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-violet-100 text-violet-900 border border-violet-300">
                {res.wealthMultiplier}x Multiplier
              </span>
            </div>

            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-black text-violet-950 tracking-tight">
                {formatCurrency(res.totalMaturityValue)}
              </span>
            </div>

            <div className="mt-5 space-y-2.5 text-xs">
              <div className="p-3.5 bg-white rounded-xl border border-violet-200/80 flex justify-between items-center">
                <span className="text-slate-600 font-medium">Total Amount Invested:</span>
                <strong className="text-slate-900 text-sm font-bold">{formatCurrency(res.totalInvested)}</strong>
              </div>

              <div className="p-3.5 bg-white rounded-xl border border-violet-200/80 flex justify-between items-center">
                <span className="text-slate-600 font-medium">Estimated Wealth Gain:</span>
                <strong className="text-emerald-700 text-base font-black">+{formatCurrency(res.estimatedReturns)}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
