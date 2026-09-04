'use client';

import React, { useState } from 'react';
import { calculatePercentOf, calculateIsWhatPercentOf, calculatePercentageChange } from '@/lib/calculators/percentage';
import { formatNumber, formatPercent } from '@/lib/formatting';
import { CalculatorActions } from '@/components/calculator/CalculatorActions';

export const PercentageCalculatorWidget: React.FC = () => {
  // Mode 1: What is X% of Y?
  const [p1, setP1] = useState<number | ''>(15);
  const [total1, setTotal1] = useState<number | ''>(80);

  // Mode 2: X is what % of Y?
  const [val2, setVal2] = useState<number | ''>(25);
  const [total2, setTotal2] = useState<number | ''>(200);

  // Mode 3: Percentage change
  const [from3, setFrom3] = useState<number | ''>(50);
  const [to3, setTo3] = useState<number | ''>(75);

  const [activeTab, setActiveTab] = useState<'percentOf' | 'isWhatPercent' | 'change'>('percentOf');

  // Calculations
  const res1 = calculatePercentOf(Number(p1) || 0, Number(total1) || 0);
  const res2 = calculateIsWhatPercentOf(Number(val2) || 0, Number(total2) || 0);
  const res3 = calculatePercentageChange(Number(from3) || 0, Number(to3) || 0);

  const getResultText = () => {
    if (activeTab === 'percentOf') {
      return `${p1}% of ${total1} is ${formatNumber(res1)}`;
    } else if (activeTab === 'isWhatPercent') {
      return `${val2} is ${formatPercent(res2)} of ${total2}`;
    } else {
      return `From ${from3} to ${to3} is a ${formatPercent(res3.change)} ${res3.isIncrease ? 'increase' : 'decrease'}`;
    }
  };

  const handleReset = () => {
    if (activeTab === 'percentOf') {
      setP1(15);
      setTotal1(80);
    } else if (activeTab === 'isWhatPercent') {
      setVal2(25);
      setTotal2(200);
    } else {
      setFrom3(50);
      setTo3(75);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      {/* Mode Switcher Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl mb-6 overflow-x-auto text-xs sm:text-sm font-medium">
        <button
          type="button"
          onClick={() => setActiveTab('percentOf')}
          className={`px-3.5 py-2 rounded-lg transition-all shrink-0 ${
            activeTab === 'percentOf'
              ? 'bg-white text-sky-700 shadow-xs font-semibold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          What is X% of Y?
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('isWhatPercent')}
          className={`px-3.5 py-2 rounded-lg transition-all shrink-0 ${
            activeTab === 'isWhatPercent'
              ? 'bg-white text-sky-700 shadow-xs font-semibold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          X is what % of Y?
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('change')}
          className={`px-3.5 py-2 rounded-lg transition-all shrink-0 ${
            activeTab === 'change'
              ? 'bg-white text-sky-700 shadow-xs font-semibold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Percentage Change
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Input Form */}
        <div className="space-y-4">
          {activeTab === 'percentOf' && (
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Percentage (%)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={p1}
                    onChange={e => setP1(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white"
                    placeholder="e.g. 15"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                    %
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Of Total Number (Y)
                </label>
                <input
                  type="number"
                  value={total1}
                  onChange={e => setTotal1(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white"
                  placeholder="e.g. 80"
                />
              </div>
            </>
          )}

          {activeTab === 'isWhatPercent' && (
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Value (X)
                </label>
                <input
                  type="number"
                  value={val2}
                  onChange={e => setVal2(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white"
                  placeholder="e.g. 25"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Of Total Number (Y)
                </label>
                <input
                  type="number"
                  value={total2}
                  onChange={e => setTotal2(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white"
                  placeholder="e.g. 200"
                />
              </div>
            </>
          )}

          {activeTab === 'change' && (
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Initial Value (From)
                </label>
                <input
                  type="number"
                  value={from3}
                  onChange={e => setFrom3(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white"
                  placeholder="e.g. 50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Final Value (To)
                </label>
                <input
                  type="number"
                  value={to3}
                  onChange={e => setTo3(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white"
                  placeholder="e.g. 75"
                />
              </div>
            </>
          )}

          <CalculatorActions resultText={getResultText()} onReset={handleReset} />
        </div>

        {/* Results Card */}
        <div className="bg-sky-50/60 border border-sky-100 rounded-xl p-6 flex flex-col justify-between h-full">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-sky-800">
              Calculation Result
            </span>

            {activeTab === 'percentOf' && (
              <div className="mt-3">
                <div className="text-4xl sm:text-5xl font-extrabold text-sky-950 tracking-tight">
                  {formatNumber(res1)}
                </div>
                <p className="text-xs text-slate-600 mt-2">
                  <strong>{p1}%</strong> of <strong>{total1}</strong> is equal to{' '}
                  <span className="font-semibold text-sky-900">{formatNumber(res1)}</span>
                </p>
                <div className="mt-4 pt-4 border-t border-sky-200/60 text-xs text-slate-500">
                  <span>Step: ({p1} ÷ 100) × {total1} = {formatNumber(res1)}</span>
                </div>
              </div>
            )}

            {activeTab === 'isWhatPercent' && (
              <div className="mt-3">
                <div className="text-4xl sm:text-5xl font-extrabold text-sky-950 tracking-tight">
                  {formatPercent(res2)}
                </div>
                <p className="text-xs text-slate-600 mt-2">
                  <strong>{val2}</strong> is{' '}
                  <span className="font-semibold text-sky-900">{formatPercent(res2)}</span> of{' '}
                  <strong>{total2}</strong>
                </p>
                <div className="mt-4 pt-4 border-t border-sky-200/60 text-xs text-slate-500">
                  <span>Step: ({val2} ÷ {total2}) × 100 = {formatPercent(res2)}</span>
                </div>
              </div>
            )}

            {activeTab === 'change' && (
              <div className="mt-3">
                <div className="text-4xl sm:text-5xl font-extrabold text-sky-950 tracking-tight flex items-baseline gap-2">
                  {formatPercent(res3.change)}
                  <span className="text-sm font-semibold uppercase tracking-wide px-2 py-0.5 rounded-md bg-white border border-sky-200 text-sky-800">
                    {res3.isIncrease ? 'Increase ↑' : 'Decrease ↓'}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-2">
                  From <strong>{from3}</strong> to <strong>{to3}</strong> represents an absolute difference of{' '}
                  <strong>{formatNumber(Math.abs((Number(to3) || 0) - (Number(from3) || 0)))}</strong>.
                </p>
                <div className="mt-4 pt-4 border-t border-sky-200/60 text-xs text-slate-500">
                  <span>Step: [({to3} - {from3}) ÷ |{from3}|] × 100</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
