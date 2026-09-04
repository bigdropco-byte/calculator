'use client';

import React, { useState } from 'react';
import { calculateStp } from '@/lib/calculators/investments';
import { formatCurrency, formatNumber } from '@/lib/formatting';
import { CalculatorActions } from '@/components/calculator/CalculatorActions';
import { ArrowRightLeft, Landmark, TrendingUp } from 'lucide-react';

export const StpCalculatorWidget: React.FC = () => {
  const [sourceLumpSum, setSourceLumpSum] = useState<number | ''>(50000);
  const [monthlyTransfer, setMonthlyTransfer] = useState<number | ''>(1000);
  const [sourceRate, setSourceRate] = useState<number | ''>(6.0);
  const [targetRate, setTargetRate] = useState<number | ''>(12.0);
  const [months, setMonths] = useState<number | ''>(36);

  const res = calculateStp(
    Number(sourceLumpSum) || 0,
    Number(monthlyTransfer) || 0,
    Number(sourceRate) || 0,
    Number(targetRate) || 0,
    Number(months) || 1
  );

  const getResultText = () => {
    return `STP Summary: Initial Debt Fund: ${formatCurrency(
      res.initialSourceLumpSum
    )} -> Monthly Transfer of ${formatCurrency(
      res.monthlyTransferAmount
    )} into Equity Fund over ${months} months. Final Combined Corpus: ${formatCurrency(
      res.totalCombinedCorpus
    )} (Net Profit: +${formatCurrency(
      res.totalProfit
    )}). Remaining in Debt Fund: ${formatCurrency(
      res.remainingSourceBalance
    )}, Accumulated in Equity Fund: ${formatCurrency(res.finalTargetBalance)}.`;
  };

  const handleReset = () => {
    setSourceLumpSum(50000);
    setMonthlyTransfer(1000);
    setSourceRate(6.0);
    setTargetRate(12.0);
    setMonths(36);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Form Inputs */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Initial Lump Sum ($)
              </label>
              <input
                type="number"
                min={0}
                step={1000}
                value={sourceLumpSum}
                onChange={e => setSourceLumpSum(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Monthly Transfer ($)
              </label>
              <input
                type="number"
                min={0}
                step={100}
                value={monthlyTransfer}
                onChange={e => setMonthlyTransfer(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Source Debt Rate (%)
              </label>
              <input
                type="number"
                min={0}
                step={0.5}
                value={sourceRate}
                onChange={e => setSourceRate(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Target Equity Rate (%)
              </label>
              <input
                type="number"
                min={0}
                step={0.5}
                value={targetRate}
                onChange={e => setTargetRate(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Duration (Months)
            </label>
            <input
              type="number"
              min={1}
              max={120}
              value={months}
              onChange={e => setMonths(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white font-medium"
            />
          </div>

          <CalculatorActions resultText={getResultText()} onReset={handleReset} />
        </div>

        {/* Results Display */}
        <div className="bg-teal-50/50 border border-teal-100 rounded-xl p-6 flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-800">
                Total Combined Corpus
              </span>
              <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-900 border border-teal-300">
                +{formatCurrency(res.totalProfit)} Profit
              </span>
            </div>

            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-black text-teal-950 tracking-tight">
                {formatCurrency(res.totalCombinedCorpus)}
              </span>
            </div>

            <div className="mt-5 space-y-2.5 text-xs">
              <div className="p-3 bg-white rounded-lg border border-teal-200/80 flex justify-between">
                <span className="text-slate-500">Accumulated Target Equity Fund:</span>
                <strong className="text-teal-950 font-bold">{formatCurrency(res.finalTargetBalance)}</strong>
              </div>

              <div className="p-3 bg-white rounded-lg border border-teal-200/80 flex justify-between">
                <span className="text-slate-500">Remaining Source Debt Fund:</span>
                <strong className="text-teal-950 font-bold">{formatCurrency(res.remainingSourceBalance)}</strong>
              </div>

              <div className="p-3 bg-white rounded-lg border border-teal-200/80 flex justify-between">
                <span className="text-slate-500">Total Transferred Across {months} Months:</span>
                <strong className="text-slate-900 font-bold">{formatCurrency(res.totalTransferred)}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
