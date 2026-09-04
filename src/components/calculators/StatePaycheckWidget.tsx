'use client';

import React, { useState } from 'react';
import {
  calculateComprehensivePaycheck,
  PayFrequency,
  FilingStatus,
  SupportedState,
  generateWageFrequencies,
} from '@/lib/calculators/payroll';
import { formatCurrency, formatNumber } from '@/lib/formatting';
import { CalculatorActions } from '@/components/calculator/CalculatorActions';
import { DollarSign, Building2, ShieldCheck, PieChart, Landmark } from 'lucide-react';

interface StatePaycheckWidgetProps {
  defaultState?: SupportedState | 'none';
  defaultGross?: number;
  defaultFrequency?: PayFrequency;
  fixedState?: boolean;
  title?: string;
}

export const StatePaycheckWidget: React.FC<StatePaycheckWidgetProps> = ({
  defaultState = 'none',
  defaultGross = 75000,
  defaultFrequency = 'annual',
  fixedState = false,
  title,
}) => {
  const [grossPay, setGrossPay] = useState<number | ''>(defaultGross);
  const [frequency, setFrequency] = useState<PayFrequency>(defaultFrequency);
  const [filingStatus, setFilingStatus] = useState<FilingStatus>('single');
  const [selectedState, setSelectedState] = useState<SupportedState | 'none'>(defaultState);
  const [preTax401k, setPreTax401k] = useState<number | ''>(0);
  const [preTaxHealth, setPreTaxHealth] = useState<number | ''>(0);

  const res = calculateComprehensivePaycheck({
    grossPay: Number(grossPay) || 0,
    frequency,
    filingStatus,
    state: selectedState,
    preTax401k: Number(preTax401k) || 0,
    preTaxHealth: Number(preTaxHealth) || 0,
  });

  const wageTable = generateWageFrequencies(res.annualGross, res.annualNet);

  const getResultText = () => {
    return `Paycheck Summary (${selectedState !== 'none' ? selectedState : 'US'}): Gross Pay per ${frequency}: ${formatCurrency(
      res.grossPayPerPeriod
    )} -> Net Take-Home Pay: ${formatCurrency(
      res.netPayPerPeriod
    )} (Annual Net: ${formatCurrency(res.annualNet)}). Federal Tax: ${formatCurrency(
      res.federalTaxPerPeriod
    )}, FICA: ${formatCurrency(res.ficaPerPeriod)}, State/Local Tax: ${formatCurrency(
      res.stateTaxPerPeriod + res.localTaxPerPeriod + res.otherStateDeductionsPerPeriod
    )}. Effective Tax Rate: ${res.effectiveTaxRate}%.`;
  };

  const handleReset = () => {
    setGrossPay(defaultGross);
    setFrequency(defaultFrequency);
    setFilingStatus('single');
    setSelectedState(defaultState);
    setPreTax401k(0);
    setPreTaxHealth(0);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      {title && (
        <div className="mb-6 pb-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Landmark className="w-5 h-5 text-sky-600" />
            {title}
          </h2>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200">
            2025/2026 Tax Rules
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Form Inputs */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Gross Pay ({frequency === 'annual' ? 'Annual Salary' : frequency})
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">
                $
              </span>
              <input
                type="number"
                min={0}
                step={100}
                value={grossPay}
                onChange={e => setGrossPay(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full pl-8 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 font-medium"
                placeholder="75000"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Pay Frequency
              </label>
              <select
                value={frequency}
                onChange={e => setFrequency(e.target.value as PayFrequency)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
              >
                <option value="annual">Yearly (Annual)</option>
                <option value="monthly">Monthly (12x)</option>
                <option value="semi-monthly">Semi-Monthly (24x)</option>
                <option value="bi-weekly">Bi-Weekly (26x)</option>
                <option value="weekly">Weekly (52x)</option>
                <option value="daily">Daily (260x)</option>
                <option value="hourly">Hourly (2080h)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Filing Status
              </label>
              <select
                value={filingStatus}
                onChange={e => setFilingStatus(e.target.value as FilingStatus)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
              >
                <option value="single">Single</option>
                <option value="married">Married Joint</option>
                <option value="head_of_household">Head of Household</option>
              </select>
            </div>
          </div>

          {!fixedState && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                State / Jurisdiction
              </label>
              <select
                value={selectedState}
                onChange={e => setSelectedState(e.target.value as SupportedState | 'none')}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
              >
                <option value="none">None / Federal Only</option>
                <option value="CA">California (CA)</option>
                <option value="TX">Texas (TX - 0% State Tax)</option>
                <option value="FL">Florida (FL - 0% State Tax)</option>
                <option value="NY">New York (NY State)</option>
                <option value="NYC">New York City (NY State + NYC Tax)</option>
                <option value="NJ">New Jersey (NJ)</option>
                <option value="IL">Illinois (IL - Flat 4.95%)</option>
                <option value="Chicago">Chicago (IL State)</option>
                <option value="PA">Pennsylvania (PA - Flat 3.07% + Local)</option>
                <option value="OH">Ohio (OH)</option>
                <option value="GA">Georgia (GA)</option>
                <option value="CO">Colorado (CO - Flat 4.4% + FAMLI)</option>
                <option value="IN">Indiana (IN - Flat 3.05% + County)</option>
                <option value="NC">North Carolina (NC - Flat 4.5%)</option>
                <option value="MI">Michigan (MI - Flat 4.25%)</option>
              </select>
            </div>
          )}

          {/* Pre-tax deductions */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2.5">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
              Pre-Tax Deductions (Per Paycheck)
            </span>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-slate-500 mb-1">401(k) / Retirement ($)</label>
                <input
                  type="number"
                  min={0}
                  value={preTax401k}
                  onChange={e => setPreTax401k(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="0"
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded text-slate-900 text-base"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-500 mb-1">Health Insurance ($)</label>
                <input
                  type="number"
                  min={0}
                  value={preTaxHealth}
                  onChange={e => setPreTaxHealth(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="0"
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded text-slate-900 text-base"
                />
              </div>
            </div>
          </div>

          <CalculatorActions resultText={getResultText()} onReset={handleReset} />
        </div>

        {/* Results Display */}
        <div className="bg-sky-50/50 border border-sky-100 rounded-xl p-6 flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-800">
                Net Take-Home Pay ({frequency})
              </span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-200">
                {res.effectiveTaxRate}% Effective Tax
              </span>
            </div>

            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-black text-sky-950 tracking-tight">
                {formatCurrency(res.netPayPerPeriod)}
              </span>
              <span className="text-xs font-bold text-sky-700">/ {frequency}</span>
            </div>

            {/* Deductions Breakdown */}
            <div className="mt-5 space-y-2 text-xs">
              <div className="flex justify-between items-center py-1.5 border-b border-sky-100">
                <span className="text-slate-600 font-medium">Gross Pay:</span>
                <strong className="text-slate-900">{formatCurrency(res.grossPayPerPeriod)}</strong>
              </div>

              <div className="flex justify-between items-center py-1.5 border-b border-sky-100">
                <span className="text-slate-600 font-medium">Federal Income Tax:</span>
                <strong className="text-rose-700">-{formatCurrency(res.federalTaxPerPeriod)}</strong>
              </div>

              <div className="flex justify-between items-center py-1.5 border-b border-sky-100">
                <span className="text-slate-600 font-medium">FICA Social Security (6.2%):</span>
                <strong className="text-rose-700">-{formatCurrency(res.socialSecurityPerPeriod)}</strong>
              </div>

              <div className="flex justify-between items-center py-1.5 border-b border-sky-100">
                <span className="text-slate-600 font-medium">FICA Medicare (1.45%):</span>
                <strong className="text-rose-700">-{formatCurrency(res.medicarePerPeriod)}</strong>
              </div>

              {(res.stateTaxPerPeriod > 0 || res.localTaxPerPeriod > 0 || res.otherStateDeductionsPerPeriod > 0) && (
                <div className="flex justify-between items-center py-1.5 border-b border-sky-100">
                  <span className="text-slate-600 font-medium">
                    State &amp; Local Tax ({selectedState}):
                  </span>
                  <strong className="text-rose-700">
                    -{formatCurrency(res.stateTaxPerPeriod + res.localTaxPerPeriod + res.otherStateDeductionsPerPeriod)}
                  </strong>
                </div>
              )}

              {res.preTaxDeductionsPerPeriod > 0 && (
                <div className="flex justify-between items-center py-1.5 border-b border-sky-100">
                  <span className="text-slate-600 font-medium">Pre-Tax Deductions (401k/Health):</span>
                  <strong className="text-amber-700">-{formatCurrency(res.preTaxDeductionsPerPeriod)}</strong>
                </div>
              )}
            </div>

            {/* Multi-frequency table */}
            <div className="mt-5 p-3.5 bg-white border border-sky-200/80 rounded-xl space-y-2">
              <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                Equivalent Paycheck Rates
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 bg-slate-50 rounded">
                  <span className="text-slate-500 text-[10px] block">Annual Net:</span>
                  <strong className="text-slate-900 font-bold">{formatCurrency(res.annualNet)}</strong>
                </div>
                <div className="p-2 bg-slate-50 rounded">
                  <span className="text-slate-500 text-[10px] block">Monthly Net:</span>
                  <strong className="text-slate-900 font-bold">{formatCurrency(res.annualNet / 12)}</strong>
                </div>
                <div className="p-2 bg-slate-50 rounded">
                  <span className="text-slate-500 text-[10px] block">Bi-Weekly Net:</span>
                  <strong className="text-slate-900 font-bold">{formatCurrency(res.annualNet / 26)}</strong>
                </div>
                <div className="p-2 bg-slate-50 rounded">
                  <span className="text-slate-500 text-[10px] block">Hourly Take-Home:</span>
                  <strong className="text-slate-900 font-bold">{formatCurrency(res.annualNet / 2080)}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
