'use client';

import React, { useState } from 'react';
import { calculateLoan } from '@/lib/calculators/loan';
import { formatCurrency } from '@/lib/formatting';
import { CalculatorActions } from '@/components/calculator/CalculatorActions';

export const LoanCalculatorWidget: React.FC = () => {
  const [amount, setAmount] = useState<number | ''>(20000);
  const [rate, setRate] = useState<number | ''>(6.5);
  const [termYears, setTermYears] = useState<number | ''>(5);
  const [showAmortization, setShowAmortization] = useState(false);

  const res = calculateLoan(
    Number(amount) || 0,
    Number(rate) || 0,
    Number(termYears) || 1
  );

  const getResultText = () => {
    return `Monthly Payment: ${formatCurrency(res.monthlyPayment)}, Total Loan Cost: ${formatCurrency(
      res.totalPayment
    )}, Total Interest Paid: ${formatCurrency(res.totalInterest)}.`;
  };

  const handleReset = () => {
    setAmount(20000);
    setRate(6.5);
    setTermYears(5);
    setShowAmortization(false);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Form Inputs */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Loan Amount ($)
            </label>
            <input
              type="number"
              value={amount}
              onChange={e => setAmount(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white"
              placeholder="e.g. 20000"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Interest Rate (%)
              </label>
              <input
                type="number"
                step="0.1"
                value={rate}
                onChange={e => setRate(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white"
                placeholder="6.5"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Loan Term (Years)
              </label>
              <input
                type="number"
                min="1"
                max="40"
                value={termYears}
                onChange={e => setTermYears(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white"
                placeholder="5"
              />
            </div>
          </div>

          {/* Quick presets */}
          <div>
            <span className="text-xs text-slate-500 font-medium block mb-2">Common Terms:</span>
            <div className="flex flex-wrap gap-2">
              {[
                { label: '3 Years (Auto)', years: 3 },
                { label: '5 Years (Personal)', years: 5 },
                { label: '7 Years (Large)', years: 7 },
                { label: '10 Years', years: 10 },
              ].map(preset => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => setTermYears(preset.years)}
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
              Monthly Payment
            </span>

            <div className="mt-2">
              <div className="text-4xl sm:text-5xl font-extrabold text-sky-950 tracking-tight">
                {formatCurrency(res.monthlyPayment)}
              </div>
              <p className="text-xs text-slate-600 mt-1">
                Fixed payment for {(Number(termYears) || 1) * 12} consecutive months.
              </p>
            </div>

            {/* Breakdown summary */}
            <div className="mt-6 space-y-2 text-xs">
              <div className="flex justify-between py-2 border-b border-sky-200/50">
                <span className="text-slate-600">Total Principal:</span>
                <strong className="text-slate-900 font-bold">{formatCurrency(res.loanAmount)}</strong>
              </div>
              <div className="flex justify-between py-2 border-b border-sky-200/50">
                <span className="text-slate-600">Total Interest:</span>
                <strong className="text-rose-700 font-bold">{formatCurrency(res.totalInterest)}</strong>
              </div>
              <div className="flex justify-between py-2 border-b border-sky-200/50">
                <span className="text-slate-600">Total Payments:</span>
                <strong className="text-slate-900 font-bold">{formatCurrency(res.totalPayment)}</strong>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowAmortization(!showAmortization)}
              className="mt-4 text-xs font-semibold text-sky-700 hover:text-sky-900 underline block"
            >
              {showAmortization ? 'Hide Amortization Table' : 'View Annual Amortization Table →'}
            </button>
          </div>

          <div className="mt-6 pt-4 border-t border-sky-200/60 text-xs text-slate-500">
            Formula: M = P [ r(1+r)^n ÷ ((1+r)^n - 1) ]
          </div>
        </div>
      </div>

      {/* Amortization Table */}
      {showAmortization && (
        <div className="mt-8 pt-6 border-t border-slate-200">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
            Annual Loan Payoff Amortization
          </h3>
          <div className="overflow-x-auto max-h-64 border border-slate-200 rounded-lg">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-700 font-semibold sticky top-0">
                <tr>
                  <th className="p-2.5">Year</th>
                  <th className="p-2.5">Principal Paid</th>
                  <th className="p-2.5">Interest Paid</th>
                  <th className="p-2.5">Remaining Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {res.annualSchedule.map(row => (
                  <tr key={row.year} className="hover:bg-sky-50/40">
                    <td className="p-2.5 font-medium">{row.year}</td>
                    <td className="p-2.5 text-emerald-700 font-medium">{formatCurrency(row.principalPaid)}</td>
                    <td className="p-2.5 text-rose-700">{formatCurrency(row.interestPaid)}</td>
                    <td className="p-2.5 font-bold">{formatCurrency(row.remainingBalance)}</td>
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
