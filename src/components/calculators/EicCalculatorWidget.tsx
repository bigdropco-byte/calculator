'use client';

import React, { useState } from 'react';
import { calculateEic, FilingStatus } from '@/lib/calculators/payroll';
import { formatCurrency } from '@/lib/formatting';
import { CalculatorActions } from '@/components/calculator/CalculatorActions';
import { Landmark, Users, CheckCircle2, AlertCircle } from 'lucide-react';

export const EicCalculatorWidget: React.FC = () => {
  const [earnedIncome, setEarnedIncome] = useState<number | ''>(28000);
  const [filingStatus, setFilingStatus] = useState<FilingStatus>('single');
  const [qualifyingChildren, setQualifyingChildren] = useState<number>(2);

  const res = calculateEic(
    Number(earnedIncome) || 0,
    filingStatus,
    qualifyingChildren
  );

  const getResultText = () => {
    return `Earned Income Credit (EIC) Estimate: ${formatCurrency(
      res.estimatedCredit
    )} (Status: ${filingStatus}, Children: ${qualifyingChildren}, Earned Income: ${formatCurrency(
      Number(earnedIncome) || 0
    )}). Maximum possible credit for your family size: ${formatCurrency(
      res.maxCredit
    )}. Details: ${res.explanation}`;
  };

  const handleReset = () => {
    setEarnedIncome(28000);
    setFilingStatus('single');
    setQualifyingChildren(2);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Form Inputs */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Annual Earned Income (W-2 Wages &amp; Net Business Income)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">
                $
              </span>
              <input
                type="number"
                min={0}
                step={500}
                value={earnedIncome}
                onChange={e => setEarnedIncome(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full pl-8 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white font-medium"
                placeholder="28000"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Filing Status
              </label>
              <select
                value={filingStatus}
                onChange={e => setFilingStatus(e.target.value as FilingStatus)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white"
              >
                <option value="single">Single / HoH</option>
                <option value="married">Married Filing Jointly</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Qualifying Children
              </label>
              <select
                value={qualifyingChildren}
                onChange={e => setQualifyingChildren(Number(e.target.value))}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white"
              >
                <option value={0}>0 Children</option>
                <option value={1}>1 Child</option>
                <option value={2}>2 Children</option>
                <option value={3}>3 or More Children</option>
              </select>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-100 text-xs text-blue-950 space-y-1">
            <span className="font-bold flex items-center gap-1.5">
              <Landmark className="w-4 h-4 text-blue-600" />
              Fully Refundable Tax Credit
            </span>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              The EITC is one of the largest federal refundable tax credits. Even if you owe zero federal income tax, the IRS pays you the full credit amount as a cash refund check.
            </p>
          </div>

          <CalculatorActions resultText={getResultText()} onReset={handleReset} />
        </div>

        {/* Results Display */}
        <div className="bg-blue-50/40 border border-blue-100 rounded-xl p-6 flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-800">
                Estimated Federal EIC Refund
              </span>
              <span
                className={`text-xs font-extrabold px-2.5 py-0.5 rounded-full border ${
                  res.isEligible
                    ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                    : 'bg-slate-100 text-slate-700 border-slate-300'
                }`}
              >
                {res.isEligible ? 'Eligible for Refund' : 'Income Phaseout'}
              </span>
            </div>

            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-black text-blue-950 tracking-tight">
                {formatCurrency(res.estimatedCredit)}
              </span>
              <span className="text-xs font-semibold text-slate-500">
                (Max: {formatCurrency(res.maxCredit)})
              </span>
            </div>

            <div className="mt-5 p-3.5 bg-white border border-blue-100 rounded-xl space-y-2 text-xs">
              <span className="font-bold text-slate-900 block">Eligibility Breakdown</span>
              <p className="text-slate-700 leading-relaxed text-[11px]">{res.explanation}</p>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 bg-white rounded-lg border border-blue-100">
                <span className="text-[10px] text-slate-400 font-semibold block uppercase">
                  Phaseout Threshold
                </span>
                <strong className="text-slate-900 font-bold">{formatCurrency(res.phaseOutThreshold)}</strong>
              </div>
              <div className="p-2.5 bg-white rounded-lg border border-blue-100">
                <span className="text-[10px] text-slate-400 font-semibold block uppercase">
                  Max Income Limit
                </span>
                <strong className="text-slate-900 font-bold">{formatCurrency(res.incomeLimit)}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
