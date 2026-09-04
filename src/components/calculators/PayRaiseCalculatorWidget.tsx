'use client';

import React, { useState } from 'react';
import { calculatePayRaise } from '@/lib/calculators/payroll';
import { formatCurrency, formatNumber } from '@/lib/formatting';
import { CalculatorActions } from '@/components/calculator/CalculatorActions';
import { TrendingUp, ArrowUpRight, DollarSign, Calendar } from 'lucide-react';

export const PayRaiseCalculatorWidget: React.FC = () => {
  const [currentPay, setCurrentPay] = useState<number | ''>(65000);
  const [raiseType, setRaiseType] = useState<'percent' | 'amount'>('percent');
  const [raiseValue, setRaiseValue] = useState<number | ''>(6);
  const [frequency, setFrequency] = useState<'annual' | 'hourly'>('annual');

  const res = calculatePayRaise(
    Number(currentPay) || 0,
    raiseType,
    Number(raiseValue) || 0,
    frequency
  );

  const getResultText = () => {
    return `Pay Raise Summary: Old Pay: ${formatCurrency(res.oldPay)} -> New Pay: ${formatCurrency(
      res.newPay
    )} (${res.percentageIncrease}% increase). Total Annual Gain: +${formatCurrency(
      res.differenceAnnual
    )} (+${formatCurrency(res.differenceMonthly)}/month, +${formatCurrency(
      res.differenceBiWeekly
    )}/bi-weekly, +${formatCurrency(res.differenceHourly)}/hr).`;
  };

  const handleReset = () => {
    setCurrentPay(65000);
    setRaiseType('percent');
    setRaiseValue(6);
    setFrequency('annual');
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Form Inputs */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Pay Type
            </span>
            <div className="flex items-center p-0.5 bg-slate-100 rounded-lg border border-slate-200">
              <button
                type="button"
                onClick={() => {
                  setFrequency('annual');
                  if (Number(currentPay) < 200) setCurrentPay(65000);
                }}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                  frequency === 'annual' ? 'bg-white text-emerald-700 shadow-2xs' : 'text-slate-600'
                }`}
              >
                Annual Salary
              </button>
              <button
                type="button"
                onClick={() => {
                  setFrequency('hourly');
                  if (Number(currentPay) > 500) setCurrentPay(32);
                }}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                  frequency === 'hourly' ? 'bg-white text-emerald-700 shadow-2xs' : 'text-slate-600'
                }`}
              >
                Hourly Wage
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Current {frequency === 'annual' ? 'Salary ($/year)' : 'Wage ($/hour)'}
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">
                $
              </span>
              <input
                type="number"
                min={0}
                value={currentPay}
                onChange={e => setCurrentPay(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full pl-8 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Raise Type
              </label>
              <select
                value={raiseType}
                onChange={e => setRaiseType(e.target.value as 'percent' | 'amount')}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white"
              >
                <option value="percent">Percentage (%)</option>
                <option value="amount">Dollar Amount ($)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Raise Value ({raiseType === 'percent' ? '%' : '$'})
              </label>
              <input
                type="number"
                min={0}
                step={raiseType === 'percent' ? 0.5 : 1}
                value={raiseValue}
                onChange={e => setRaiseValue(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white font-medium"
                placeholder={raiseType === 'percent' ? '5' : '3000'}
              />
            </div>
          </div>

          <div className="p-3.5 bg-emerald-50/70 border border-emerald-100 rounded-xl text-xs text-emerald-950 space-y-1">
            <span className="font-bold flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              Compounding Career Growth
            </span>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              A 5% or 10% raise doesn&apos;t just impact your next paycheck—it increases the compounding base for all future bonuses, 401(k) matches, and next job negotiations.
            </p>
          </div>

          <CalculatorActions resultText={getResultText()} onReset={handleReset} />
        </div>

        {/* Results Display */}
        <div className="bg-emerald-50/40 border border-emerald-100 rounded-xl p-6 flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                New Projected Pay
              </span>
              <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-200">
                +{res.percentageIncrease}% Raise
              </span>
            </div>

            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-black text-emerald-950 tracking-tight">
                {formatCurrency(res.newPay)}
              </span>
              <span className="text-xs font-bold text-emerald-700">
                / {frequency === 'annual' ? 'year' : 'hr'}
              </span>
            </div>

            {/* Difference breakdown */}
            <div className="mt-5 p-3.5 bg-white border border-emerald-200/80 rounded-xl space-y-2">
              <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                Additional Income Earned
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 bg-emerald-50/60 rounded">
                  <span className="text-slate-500 text-[10px] block">Per Year:</span>
                  <strong className="text-emerald-900 text-sm font-black">
                    +{formatCurrency(res.differenceAnnual)}
                  </strong>
                </div>
                <div className="p-2 bg-emerald-50/60 rounded">
                  <span className="text-slate-500 text-[10px] block">Per Month:</span>
                  <strong className="text-emerald-900 text-sm font-black">
                    +{formatCurrency(res.differenceMonthly)}
                  </strong>
                </div>
                <div className="p-2 bg-emerald-50/60 rounded">
                  <span className="text-slate-500 text-[10px] block">Per Bi-Weekly Check:</span>
                  <strong className="text-emerald-900 text-sm font-black">
                    +{formatCurrency(res.differenceBiWeekly)}
                  </strong>
                </div>
                <div className="p-2 bg-emerald-50/60 rounded">
                  <span className="text-slate-500 text-[10px] block">Per Hour Worked:</span>
                  <strong className="text-emerald-900 text-sm font-black">
                    +{formatCurrency(res.differenceHourly)}/hr
                  </strong>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-white/80 rounded-lg border border-emerald-100 flex justify-between text-xs text-slate-600">
              <span>Old Annual: {formatCurrency(res.oldAnnual)}</span>
              <span className="font-bold text-slate-900">New Annual: {formatCurrency(res.newAnnual)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
