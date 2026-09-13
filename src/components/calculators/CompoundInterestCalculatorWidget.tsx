'use client';

import React, { useState } from 'react';
import {
  calculateCompoundInterest,
  CompoundFrequency,
  DepositTiming,
} from '@/lib/calculators/compoundInterest';
import { formatCurrency, formatNumber } from '@/lib/formatting';
import { CalculatorActions } from '@/components/calculator/CalculatorActions';
import { TrendingUp, Sparkles, Clock, DollarSign } from 'lucide-react';

export const CompoundInterestCalculatorWidget: React.FC = () => {
  const [principal, setPrincipal] = useState<number | ''>(10000);
  const [rate, setRate] = useState<number | ''>(7);
  const [years, setYears] = useState<number | ''>(10);
  const [monthlyAddition, setMonthlyAddition] = useState<number | ''>(250);
  const [frequency, setFrequency] = useState<CompoundFrequency>(12);
  const [depositTiming, setDepositTiming] = useState<DepositTiming>('end');
  const [showSchedule, setShowSchedule] = useState(false);

  const res = calculateCompoundInterest(
    Number(principal) || 0,
    Number(rate) || 0,
    Number(years) || 1,
    Number(monthlyAddition) || 0,
    frequency,
    depositTiming
  );

  const getResultText = () => {
    return `Future Investment Value: ${formatCurrency(res.futureValue)} (Starting Principal: ${formatCurrency(
      res.totalPrincipal
    )}, Monthly Deposits: ${formatCurrency(res.totalContributions)}, Total Compound Interest Earned: ${formatCurrency(
      res.totalInterest
    )}) over ${years || 1} years at ${rate || 0}% compounded ${
      frequency === 12 ? 'monthly' : frequency === 365 ? 'daily' : frequency === 4 ? 'quarterly' : 'annually'
    }.`;
  };

  const handleReset = () => {
    setPrincipal(10000);
    setRate(7);
    setYears(10);
    setMonthlyAddition(250);
    setFrequency(12);
    setDepositTiming('end');
    setShowSchedule(false);
  };

  const monthlyPresets = [50, 100, 250, 500, 1000];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Input Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Starting Principal ($)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                $
              </span>
              <input
                type="number"
                value={principal}
                onChange={e => setPrincipal(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full pl-8 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white focus:outline-sky-600"
                placeholder="e.g. 10000 (can be 0)"
              />
            </div>
          </div>

          {/* Monthly Deposit Section (Primary Spotlight) */}
          <div className="p-4 bg-sky-50/50 border border-sky-100 rounded-xl space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-sky-950 uppercase tracking-wider">
                Monthly Deposit / Addition ($)
              </label>
              <span className="text-[11px] font-semibold text-sky-700 bg-sky-100/70 px-2 py-0.5 rounded-full">
                Recurring Growth
              </span>
            </div>

            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                $
              </span>
              <input
                type="number"
                value={monthlyAddition}
                onChange={e =>
                  setMonthlyAddition(e.target.value === '' ? '' : Number(e.target.value))
                }
                className="w-full pl-8 pr-3.5 py-2.5 bg-white border border-sky-200 rounded-lg text-slate-900 text-base font-semibold focus:bg-white focus:outline-sky-600 shadow-2xs"
                placeholder="e.g. 250"
              />
            </div>

            {/* Quick Presets */}
            <div className="flex items-center gap-1.5 flex-wrap pt-1">
              <span className="text-[11px] text-slate-500 font-medium mr-1">Presets:</span>
              {monthlyPresets.map(amt => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setMonthlyAddition(amt)}
                  className={`px-2 py-1 rounded text-xs font-semibold transition-colors ${
                    monthlyAddition === amt
                      ? 'bg-sky-700 text-white shadow-2xs'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  ${amt}
                </button>
              ))}
            </div>

            {/* Deposit Timing Toggle */}
            <div className="pt-2 border-t border-sky-100/80 flex items-center justify-between text-xs text-slate-600">
              <span className="font-medium text-slate-700">Deposit Timing:</span>
              <div className="inline-flex rounded-lg border border-slate-200 bg-white p-0.5 text-xs font-medium">
                <button
                  type="button"
                  onClick={() => setDepositTiming('end')}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    depositTiming === 'end'
                      ? 'bg-sky-700 text-white font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  End of Month
                </button>
                <button
                  type="button"
                  onClick={() => setDepositTiming('beginning')}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    depositTiming === 'beginning'
                      ? 'bg-sky-700 text-white font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Beginning of Month
                </button>
              </div>
            </div>
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
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white focus:outline-sky-600"
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
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white focus:outline-sky-600"
                placeholder="10"
              />
            </div>
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
              <option value={12}>Monthly (12 times/year)</option>
              <option value={365}>Daily (365 times/year)</option>
              <option value={4}>Quarterly (4 times/year)</option>
              <option value={2}>Semi-Annually (2 times/year)</option>
              <option value={1}>Annually (1 time/year)</option>
            </select>
          </div>

          <CalculatorActions resultText={getResultText()} onReset={handleReset} />
        </div>

        {/* Results Card */}
        <div className="bg-sky-50/60 border border-sky-100 rounded-xl p-6 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-800">
                Future Investment Value
              </span>
              <span className="text-xs font-semibold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-full flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-emerald-700" />
                {res.interestPercent}% from Interest
              </span>
            </div>

            <div className="mt-2">
              <div className="text-3xl sm:text-4xl font-extrabold text-sky-950 tracking-tight">
                {formatCurrency(res.futureValue)}
              </div>
              <p className="text-xs text-slate-600 mt-1">
                Projected total balance after <strong>{years || 1} years</strong> at{' '}
                <strong>{rate || 0}% annual return</strong>.
              </p>
            </div>

            {/* Visual Proportional Bar */}
            <div className="mt-5 space-y-2">
              <div className="text-[11px] font-semibold text-slate-600 flex justify-between">
                <span>Wealth Composition</span>
                <span>{formatCurrency(res.futureValue)}</span>
              </div>
              <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden flex shadow-inner">
                {res.principalPercent > 0 && (
                  <div
                    style={{ width: `${res.principalPercent}%` }}
                    className="bg-sky-600 transition-all duration-300"
                    title={`Principal: ${res.principalPercent}%`}
                  />
                )}
                {res.contributionsPercent > 0 && (
                  <div
                    style={{ width: `${res.contributionsPercent}%` }}
                    className="bg-indigo-600 transition-all duration-300"
                    title={`Monthly Contributions: ${res.contributionsPercent}%`}
                  />
                )}
                {res.interestPercent > 0 && (
                  <div
                    style={{ width: `${res.interestPercent}%` }}
                    className="bg-emerald-600 transition-all duration-300"
                    title={`Compound Interest: ${res.interestPercent}%`}
                  />
                )}
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-600 pt-1 flex-wrap gap-2">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-600" />
                  Principal ({res.principalPercent}%)
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
                  Monthly Deposits ({res.contributionsPercent}%)
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                  Interest ({res.interestPercent}%)
                </span>
              </div>
            </div>

            {/* Itemized Financial Breakdown */}
            <div className="mt-5 space-y-2 text-xs">
              <div className="flex justify-between py-2 border-b border-sky-200/50">
                <span className="text-slate-600">Starting Principal:</span>
                <strong className="text-slate-900 font-bold">{formatCurrency(res.totalPrincipal)}</strong>
              </div>
              <div className="flex justify-between py-2 border-b border-sky-200/50">
                <span className="text-slate-600">Total Monthly Deposits:</span>
                <strong className="text-indigo-900 font-bold">
                  {formatCurrency(res.totalContributions)}
                </strong>
              </div>
              <div className="flex justify-between py-2 border-b border-sky-200/50">
                <span className="text-slate-600">Total Interest Earned:</span>
                <strong className="text-emerald-700 font-bold">
                  +{formatCurrency(res.totalInterest)}
                </strong>
              </div>
            </div>

            {/* Monthly Deposit Supercharger Insight Card */}
            {Number(monthlyAddition) > 0 && (
              <div className="mt-4 p-3 bg-white border border-sky-200 rounded-xl text-xs space-y-1 text-slate-700 shadow-2xs">
                <div className="flex items-center gap-1.5 font-bold text-sky-950">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  Monthly Deposit Compounding Boost
                </div>
                <p className="text-[11px] leading-relaxed text-slate-600">
                  Your monthly deposits of <strong>${formatNumber(Number(monthlyAddition), 0)}/mo</strong> totaled{' '}
                  <strong>{formatCurrency(res.totalContributions)}</strong> in savings, generating an additional{' '}
                  <strong className="text-emerald-700 font-bold">
                    +{formatCurrency(res.interestFromMonthlyDeposits)}
                  </strong>{' '}
                  in compound interest alone!
                </p>
              </div>
            )}

            <button
              type="button"
              onClick={() => setShowSchedule(!showSchedule)}
              className="mt-4 text-xs font-semibold text-sky-700 hover:text-sky-900 underline block cursor-pointer"
            >
              {showSchedule ? 'Hide Annual Schedule Table' : 'View Annual Growth Schedule Table →'}
            </button>
          </div>

          <div className="pt-3 border-t border-sky-200/60 text-xs text-slate-500 flex items-center justify-between">
            <span>
              Rule of 72: At {rate || 7}%, principal doubles every{' '}
              <strong>{formatNumber(72 / (Number(rate) || 7), 1)} yrs</strong>.
            </span>
            <span className="text-sky-700 font-medium">
              Compounded {frequency === 12 ? 'Monthly' : frequency === 365 ? 'Daily' : 'Annually'}
            </span>
          </div>
        </div>
      </div>

      {/* Annual Schedule Table */}
      {showSchedule && (
        <div className="mt-8 pt-6 border-t border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Annual Growth &amp; Monthly Deposit Breakdown
            </h3>
            <span className="text-xs text-slate-500">
              {years || 1}-Year Projection (Compounded {frequency === 12 ? 'Monthly' : 'Annually'})
            </span>
          </div>

          <div className="overflow-x-auto max-h-80 border border-slate-200 rounded-xl shadow-2xs">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-100 text-slate-700 font-semibold sticky top-0 border-b border-slate-200">
                <tr>
                  <th className="p-2.5">Year</th>
                  <th className="p-2.5">Starting Balance</th>
                  <th className="p-2.5">Total Contributed</th>
                  <th className="p-2.5">Interest Earned (Year)</th>
                  <th className="p-2.5">Total Interest to Date</th>
                  <th className="p-2.5">Ending Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {res.schedule.map(row => (
                  <tr key={row.year} className="hover:bg-sky-50/50 transition-colors">
                    <td className="p-2.5 font-bold text-slate-900">Year {row.year}</td>
                    <td className="p-2.5 text-slate-700">{formatCurrency(row.startingBalance)}</td>
                    <td className="p-2.5 font-medium text-indigo-950">
                      {formatCurrency(row.totalContributed)}
                    </td>
                    <td className="p-2.5 text-emerald-700 font-medium">
                      +{formatCurrency(row.interestEarned)}
                    </td>
                    <td className="p-2.5 text-emerald-800 font-semibold">
                      +{formatCurrency(row.totalInterestToDate)}
                    </td>
                    <td className="p-2.5 font-bold text-slate-900">
                      {formatCurrency(row.endingBalance)}
                    </td>
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

