'use client';

import React, { useState } from 'react';
import { calculateMortgage } from '@/lib/calculators/mortgage';
import { formatCurrency, formatPercent } from '@/lib/formatting';
import { CalculatorActions } from '@/components/calculator/CalculatorActions';

export const MortgageCalculatorWidget: React.FC = () => {
  const [homePrice, setHomePrice] = useState<number | ''>(400000);
  const [downPayment, setDownPayment] = useState<number | ''>(20);
  const [isPercent, setIsPercent] = useState<boolean>(true);
  const [interestRate, setInterestRate] = useState<number | ''>(6.5);
  const [loanTerm, setLoanTerm] = useState<number>(30);
  const [taxRate, setTaxRate] = useState<number | ''>(1.2);
  const [insurance, setInsurance] = useState<number | ''>(1200);
  const [hoa, setHoa] = useState<number | ''>(0);

  const res = calculateMortgage({
    homePrice: Number(homePrice) || 0,
    downPayment: Number(downPayment) || 0,
    isDownPaymentPercent: isPercent,
    interestRate: Number(interestRate) || 0,
    loanTermYears: loanTerm,
    annualPropertyTaxRate: Number(taxRate) || 0,
    annualHomeInsurance: Number(insurance) || 0,
    monthlyHoa: Number(hoa) || 0,
  });

  const getResultText = () => {
    return `Estimated Total Monthly Mortgage Payment: ${formatCurrency(
      res.totalMonthlyPayment
    )} (Principal & Interest: ${formatCurrency(res.monthlyPrincipalAndInterest)}, Taxes: ${formatCurrency(
      res.monthlyPropertyTax
    )}, Insurance: ${formatCurrency(res.monthlyHomeInsurance)}${
      res.monthlyPmi > 0 ? `, PMI: ${formatCurrency(res.monthlyPmi)}` : ''
    })`;
  };

  const handleReset = () => {
    setHomePrice(400000);
    setDownPayment(20);
    setIsPercent(true);
    setInterestRate(6.5);
    setLoanTerm(30);
    setTaxRate(1.2);
    setInsurance(1200);
    setHoa(0);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Form Inputs */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Home Purchase Price ($)
            </label>
            <input
              type="number"
              value={homePrice}
              onChange={e => setHomePrice(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white"
              placeholder="e.g. 400000"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Down Payment
              </label>
              <div className="flex items-center text-xs p-0.5 bg-slate-100 rounded border border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsPercent(true)}
                  className={`px-2 py-0.5 rounded font-semibold ${
                    isPercent ? 'bg-white text-sky-700 shadow-2xs' : 'text-slate-500'
                  }`}
                >
                  %
                </button>
                <button
                  type="button"
                  onClick={() => setIsPercent(false)}
                  className={`px-2 py-0.5 rounded font-semibold ${
                    !isPercent ? 'bg-white text-sky-700 shadow-2xs' : 'text-slate-500'
                  }`}
                >
                  $
                </button>
              </div>
            </div>
            <div className="relative">
              <input
                type="number"
                value={downPayment}
                onChange={e => setDownPayment(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white"
                placeholder={isPercent ? '20' : '80000'}
              />
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                {isPercent ? `${formatCurrency(res.downPaymentAmount)}` : `${formatPercent((Number(downPayment) / (Number(homePrice) || 1)) * 100)}`}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Interest Rate (%)
              </label>
              <input
                type="number"
                step="0.05"
                value={interestRate}
                onChange={e => setInterestRate(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white"
                placeholder="6.5"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Loan Term
              </label>
              <select
                value={loanTerm}
                onChange={e => setLoanTerm(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-sm focus:bg-white cursor-pointer"
              >
                <option value={30}>30 Years Fixed</option>
                <option value={20}>20 Years Fixed</option>
                <option value={15}>15 Years Fixed</option>
                <option value={10}>10 Years Fixed</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 uppercase mb-1">
                Property Tax (%)
              </label>
              <input
                type="number"
                step="0.1"
                value={taxRate}
                onChange={e => setTaxRate(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                placeholder="1.2"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 uppercase mb-1">
                Insurance ($/yr)
              </label>
              <input
                type="number"
                value={insurance}
                onChange={e => setInsurance(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                placeholder="1200"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 uppercase mb-1">
                HOA ($/mo)
              </label>
              <input
                type="number"
                value={hoa}
                onChange={e => setHoa(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                placeholder="0"
              />
            </div>
          </div>

          <CalculatorActions resultText={getResultText()} onReset={handleReset} />
        </div>

        {/* Results Card */}
        <div className="bg-sky-50/60 border border-sky-100 rounded-xl p-6 flex flex-col justify-between h-full">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-sky-800">
              Total Monthly Payment (PITI)
            </span>

            <div className="mt-2">
              <div className="text-4xl sm:text-5xl font-extrabold text-sky-950 tracking-tight">
                {formatCurrency(res.totalMonthlyPayment)}
              </div>
              <p className="text-xs text-slate-600 mt-1">
                Loan balance: <strong>{formatCurrency(res.loanAmount)}</strong> after{' '}
                <strong>{formatCurrency(res.downPaymentAmount)}</strong> down.
              </p>
            </div>

            {/* Itemized monthly breakdown */}
            <div className="mt-5 space-y-2 text-xs">
              <div className="flex justify-between py-1.5 border-b border-sky-200/50">
                <span className="text-slate-600">Principal &amp; Interest:</span>
                <strong className="text-slate-900 font-bold">{formatCurrency(res.monthlyPrincipalAndInterest)}</strong>
              </div>
              <div className="flex justify-between py-1.5 border-b border-sky-200/50">
                <span className="text-slate-600">Property Taxes:</span>
                <strong className="text-slate-900 font-bold">{formatCurrency(res.monthlyPropertyTax)}</strong>
              </div>
              <div className="flex justify-between py-1.5 border-b border-sky-200/50">
                <span className="text-slate-600">Homeowners Insurance:</span>
                <strong className="text-slate-900 font-bold">{formatCurrency(res.monthlyHomeInsurance)}</strong>
              </div>
              {res.monthlyHoa > 0 && (
                <div className="flex justify-between py-1.5 border-b border-sky-200/50">
                  <span className="text-slate-600">HOA Dues:</span>
                  <strong className="text-slate-900 font-bold">{formatCurrency(res.monthlyHoa)}</strong>
                </div>
              )}
              {res.monthlyPmi > 0 && (
                <div className="flex justify-between py-1.5 border-b border-rose-200/50 text-rose-800">
                  <span>PMI (Down payment &lt; 20%):</span>
                  <strong className="font-bold">{formatCurrency(res.monthlyPmi)}</strong>
                </div>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-sky-200/50 text-xs flex justify-between text-slate-600">
              <span>Total Interest Paid over {loanTerm} yrs:</span>
              <strong className="text-slate-900 font-bold">{formatCurrency(res.totalInterestPaid)}</strong>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-sky-200/60 text-xs text-slate-500">
            {res.monthlyPmi === 0
              ? '✓ No PMI required (Down payment is 20% or more).'
              : 'Tip: Reaching 20% down payment will eliminate the monthly PMI.'}
          </div>
        </div>
      </div>
    </div>
  );
};
