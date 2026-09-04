'use client';

import React, { useState } from 'react';
import { calculateCompoundInterest, CompoundFrequency } from '@/lib/calculators/compoundInterest';
import { formatCurrency, formatNumber } from '@/lib/formatting';
import { CalculatorActions } from '@/components/calculator/CalculatorActions';

export const CompoundInterestCalculatorWidget: React.FC = () => {
  const [principal, setPrincipal] = useState<number | ''>(10000);
  const [rate, setRate] = useState<number | ''>(7);
  const [years, setYears] = useState<number | ''>(10);
  const [monthlyAddition, setMonthlyAddition] = useState<number | ''>(100);
  const [frequency, setFrequency] = useState<CompoundFrequency>(12);
  const [showSchedule, setShowSchedule] = useState(false);

  const res = calculateCompoundInterest(
    Number(principal) || 0,
    Number(rate) || 0,
    Number(years) || 1,
    Number(monthlyAddition) || 0,
    frequency
  );

  const getResultText = () => {
    return `Future Investment Value: ${formatCurrency(res.futureValue)} (Principal: ${formatCurrency(
      res.totalPrincipal
    )}, Additional Contributions: ${formatCurrency(res.totalContributions)}, Total Interest Earned: ${formatCurrency(
      res.totalInterest
    )})`;
  };

  const handleReset = () => {
    setPrincipal(10000);
    setRate(7);
    setYears(10);
    setMonthlyAddition(100);
    setFrequency(12);
    setShowSchedule(false);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Input Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Initial Principal ($)
            </label>
            <input
              type="number"
              value={principal}
              onChange={e => setPrincipal(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white"
              placeholder="e.g. 10000"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Annual Rate (%)
              </label>
              <input
                type="number"
                step="0.1"
                value={rate}
                onChange={e => setRate(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white"
                placeholder="7"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Years to Grow
              </label>
              <input
                type="number"
                min="1"
                max="100"
                value={years}
                onChange={e => setYears(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white"
                placeholder="10"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Monthly Contribution ($)
            </label>
            <input
              type="number"
              value={monthlyAddition}
              onChange={e => setMonthlyAddition(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white"
              placeholder="e.g. 100"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Compounding Frequency
            </label>
            <select
              value={frequency}
              onChange={e => setFrequency(Number(e.target.value) as CompoundFrequency)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-sm focus:bg-white cursor-pointer"
            >
              <option value={365}>Daily (365 times/year)</option>
              <option value={12}>Monthly (12 times/year)</option>
              <option value={4}>Quarterly (4 times/year)</option>
              <option value={2}>Semi-Annually (2 times/year)</option>
              <option value={1}>Annually (1 time/year)</option>
            </select>
          </div>

          <CalculatorActions resultText={getResultText()} onReset={handleReset} />
        </div>

        {/* Results Card */}
        <div className="bg-sky-50/60 border border-sky-100 rounded-xl p-6 flex flex-col justify-between h-full">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-sky-800">
              Future Investment Value
            </span>

            <div className="mt-2">
              <div className="text-3xl sm:text-4xl font-extrabold text-sky-950 tracking-tight">
                {formatCurrency(res.futureValue)}
              </div>
              <p className="text-xs text-slate-600 mt-1">
                Projected total balance after <strong>{years || 1} years</strong>.
              </p>
            </div>

            {/* Financial Breakdown */}
            <div className="mt-6 space-y-2 text-xs">
              <div className="flex justify-between py-2 border-b border-sky-200/50">
                <span className="text-slate-600">Starting Principal:</span>
                <strong className="text-slate-900 font-bold">{formatCurrency(res.totalPrincipal)}</strong>
              </div>
              <div className="flex justify-between py-2 border-b border-sky-200/50">
                <span className="text-slate-600">Additional Contributions:</span>
                <strong className="text-slate-900 font-bold">{formatCurrency(res.totalContributions)}</strong>
              </div>
              <div className="flex justify-between py-2 border-b border-sky-200/50">
                <span className="text-slate-600">Total Interest Earned:</span>
                <strong className="text-emerald-700 font-bold">+{formatCurrency(res.totalInterest)}</strong>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowSchedule(!showSchedule)}
              className="mt-4 text-xs font-semibold text-sky-700 hover:text-sky-900 underline block"
            >
              {showSchedule ? 'Hide Annual Schedule' : 'View Annual Schedule Table →'}
            </button>
          </div>

          <div className="mt-6 pt-4 border-t border-sky-200/60 text-xs text-slate-500">
            Rule of 72: At {rate || 7}%, your money doubles approximately every{' '}
            {formatNumber(72 / (Number(rate) || 7), 1)} years.
          </div>
        </div>
      </div>

      {/* Annual Schedule Modal / Drawer Table */}
      {showSchedule && (
        <div className="mt-8 pt-6 border-t border-slate-200">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
            Annual Growth Breakdown Schedule
          </h3>
          <div className="overflow-x-auto max-h-72 border border-slate-200 rounded-lg">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-700 font-semibold sticky top-0">
                <tr>
                  <th className="p-2.5">Year</th>
                  <th className="p-2.5">Starting Balance</th>
                  <th className="p-2.5">Total Contributed</th>
                  <th className="p-2.5">Interest Earned</th>
                  <th className="p-2.5">Ending Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {res.schedule.map(row => (
                  <tr key={row.year} className="hover:bg-sky-50/40">
                    <td className="p-2.5 font-medium">{row.year}</td>
                    <td className="p-2.5">{formatCurrency(row.startingBalance)}</td>
                    <td className="p-2.5">{formatCurrency(row.totalContributed)}</td>
                    <td className="p-2.5 text-emerald-700 font-medium">+{formatCurrency(row.interestEarned)}</td>
                    <td className="p-2.5 font-bold">{formatCurrency(row.endingBalance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
