'use client';

import React, { useState } from 'react';
import { calculateFixedDeposit } from '@/lib/calculators/investments';
import { formatCurrency, formatNumber } from '@/lib/formatting';
import { CalculatorActions } from '@/components/calculator/CalculatorActions';
import { Landmark, Percent, Calendar, ShieldCheck } from 'lucide-react';

export const FixedDepositCalculatorWidget: React.FC = () => {
  const [principal, setPrincipal] = useState<number | ''>(10000);
  const [rate, setRate] = useState<number | ''>(6.8);
  const [years, setYears] = useState<number | ''>(5);
  const [compounding, setCompounding] = useState<'monthly' | 'quarterly' | 'semi-annually' | 'annually'>('quarterly');

  const res = calculateFixedDeposit(
    Number(principal) || 0,
    Number(rate) || 0,
    Number(years) || 1,
    compounding
  );

  const getResultText = () => {
    return `Fixed Deposit (FD) Summary: Principal: ${formatCurrency(
      res.totalPrincipal
    )} @ ${rate}% for ${years} years (${compounding} compounding) -> Maturity Value: ${formatCurrency(
      res.maturityAmount
    )}. Total Interest Earned: ${formatCurrency(res.totalInterestEarned)}. APY Yield: ${res.effectiveAnnualYield}%.`;
  };

  const handleReset = () => {
    setPrincipal(10000);
    setRate(6.8);
    setYears(5);
    setCompounding('quarterly');
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Form Inputs */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Initial Deposit Principal ($)
            </label>
            <input
              type="number"
              min={0}
              step={500}
              value={principal}
              onChange={e => setPrincipal(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white font-medium"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Annual Interest Rate (%)
              </label>
              <input
                type="number"
                min={0}
                step={0.1}
                value={rate}
                onChange={e => setRate(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Tenure (Years)
              </label>
              <input
                type="number"
                min={0.25}
                step={0.5}
                value={years}
                onChange={e => setYears(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Compounding Frequency
            </label>
            <select
              value={compounding}
              onChange={e => setCompounding(e.target.value as any)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white"
            >
              <option value="quarterly">Quarterly (Most Common)</option>
              <option value="monthly">Monthly</option>
              <option value="semi-annually">Semi-Annually</option>
              <option value="annually">Annually</option>
            </select>
          </div>

          <CalculatorActions resultText={getResultText()} onReset={handleReset} />
        </div>

        {/* Results Display */}
        <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-6 flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-800">
                Guaranteed Maturity Value
              </span>
              <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-900 border border-indigo-300">
                {res.effectiveAnnualYield}% APY
              </span>
            </div>

            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-black text-indigo-950 tracking-tight">
                {formatCurrency(res.maturityAmount)}
              </span>
            </div>

            <div className="mt-5 space-y-2.5 text-xs">
              <div className="p-3.5 bg-white rounded-xl border border-indigo-200/80 flex justify-between items-center">
                <span className="text-slate-600 font-medium">Principal Invested:</span>
                <strong className="text-slate-900 text-sm font-bold">{formatCurrency(res.totalPrincipal)}</strong>
              </div>

              <div className="p-3.5 bg-white rounded-xl border border-indigo-200/80 flex justify-between items-center">
                <span className="text-slate-600 font-medium">Total Interest Earned:</span>
                <strong className="text-emerald-700 text-base font-black">+{formatCurrency(res.totalInterestEarned)}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
