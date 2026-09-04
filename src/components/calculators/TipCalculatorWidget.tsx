'use client';

import React, { useState } from 'react';
import { calculateTip } from '@/lib/calculators/tip';
import { formatCurrency, formatPercent } from '@/lib/formatting';
import { CalculatorActions } from '@/components/calculator/CalculatorActions';
import { Users, Minus, Plus } from 'lucide-react';

export const TipCalculatorWidget: React.FC = () => {
  const [bill, setBill] = useState<number | ''>(84);
  const [tipPercent, setTipPercent] = useState<number>(20);
  const [splitCount, setSplitCount] = useState<number>(3);
  const [roundUp, setRoundUp] = useState<boolean>(false);

  const res = calculateTip({
    billAmount: Number(bill) || 0,
    tipPercent,
    splitCount,
    roundUpTotal: roundUp,
  });

  const getResultText = () => {
    return `Bill: ${formatCurrency(res.billAmount)}, Tip: ${formatCurrency(res.tipAmount)} (${formatPercent(
      res.effectiveTipPercent
    )}), Total: ${formatCurrency(res.totalAmount)}. Split ${res.splitCount} ways: ${formatCurrency(
      res.totalPerPerson
    )} per person (Tip: ${formatCurrency(res.tipPerPerson)}/person).`;
  };

  const handleReset = () => {
    setBill(84);
    setTipPercent(20);
    setSplitCount(3);
    setRoundUp(false);
  };

  const tipPresets = [10, 15, 18, 20, 22, 25];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Input Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Bill Amount ($)
            </label>
            <input
              type="number"
              step="0.01"
              value={bill}
              onChange={e => setBill(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white"
              placeholder="e.g. 84.00"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Tip Percentage (%)
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-2">
              {tipPresets.map(preset => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setTipPercent(preset)}
                  className={`py-2 text-xs font-bold rounded-lg border transition-colors ${
                    tipPercent === preset
                      ? 'bg-sky-600 text-white border-sky-600 shadow-2xs'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  {preset}%
                </button>
              ))}
            </div>
            <div className="relative mt-2">
              <input
                type="number"
                value={tipPercent}
                onChange={e => setTipPercent(Math.max(0, Number(e.target.value) || 0))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800"
                placeholder="Custom tip percentage"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold">
                % custom
              </span>
            </div>
          </div>

          {/* Number of People */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Split Between (Number of People)
            </label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setSplitCount(Math.max(1, splitCount - 1))}
                className="p-2.5 rounded-lg border border-slate-200 bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                aria-label="Decrease person count"
              >
                <Minus className="w-4 h-4" />
              </button>
              <div className="flex-1 flex items-center justify-center gap-2 py-2 bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-900 text-base">
                <Users className="w-4 h-4 text-slate-400" />
                <span>{splitCount} {splitCount === 1 ? 'person' : 'people'}</span>
              </div>
              <button
                type="button"
                onClick={() => setSplitCount(splitCount + 1)}
                className="p-2.5 rounded-lg border border-slate-200 bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                aria-label="Increase person count"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Round up option */}
          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="roundUp"
              checked={roundUp}
              onChange={e => setRoundUp(e.target.checked)}
              className="w-4 h-4 text-sky-600 rounded border-slate-300 focus:ring-sky-500 cursor-pointer"
            />
            <label htmlFor="roundUp" className="text-xs text-slate-700 font-medium cursor-pointer">
              Round Up Total Bill to Nearest Dollar
            </label>
          </div>

          <CalculatorActions resultText={getResultText()} onReset={handleReset} />
        </div>

        {/* Results Card */}
        <div className="bg-sky-50/60 border border-sky-100 rounded-xl p-6 flex flex-col justify-between h-full">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-sky-800">
              {splitCount > 1 ? 'Amount Per Person' : 'Total Amount Due'}
            </span>

            <div className="mt-2">
              <div className="text-4xl sm:text-5xl font-extrabold text-sky-950 tracking-tight">
                {formatCurrency(res.totalPerPerson)}
              </div>
              {splitCount > 1 && (
                <p className="text-xs text-slate-600 mt-1">
                  Includes <strong>{formatCurrency(res.tipPerPerson)}</strong> tip per person.
                </p>
              )}
            </div>

            {/* Total breakdown */}
            <div className="mt-6 space-y-2 text-xs">
              <div className="flex justify-between py-2 border-b border-sky-200/50">
                <span className="text-slate-600">Base Bill:</span>
                <strong className="text-slate-900 font-bold">{formatCurrency(res.billAmount)}</strong>
              </div>
              <div className="flex justify-between py-2 border-b border-sky-200/50">
                <span className="text-slate-600">
                  Tip Amount ({formatPercent(res.effectiveTipPercent)}):
                </span>
                <strong className="text-emerald-700 font-bold">+{formatCurrency(res.tipAmount)}</strong>
              </div>
              <div className="flex justify-between py-2 border-b border-sky-200/50">
                <span className="text-slate-600">Total Check:</span>
                <strong className="text-slate-900 font-bold">{formatCurrency(res.totalAmount)}</strong>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-sky-200/60 text-xs text-slate-500">
            Split across {splitCount} {splitCount === 1 ? 'diner' : 'diners'}.
          </div>
        </div>
      </div>
    </div>
  );
};
