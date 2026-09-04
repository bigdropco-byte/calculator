'use client';

import React, { useState } from 'react';
import {
  calculateDiscountPercentage,
  calculateWinPercentage,
  calculateYearlyPercentageIncrease,
  calculatePercentageDecrease,
  calculatePartTimePercentage,
  calculateTimePercentage,
  calculatePercentageOfTime,
  calculateReversePercentage,
  calculateGrowthPercentage,
  calculateTaxPercentage,
  calculateVatPercentage,
  calculateSluggingPercentage,
  calculateFatPercentage,
} from '@/lib/calculators/percentageEngines';
import { formatNumber, formatPercent } from '@/lib/formatting';
import { CalculatorActions } from '@/components/calculator/CalculatorActions';

// ==========================================
// 1. Discount Percentage Widget
// ==========================================
export const DiscountPercentageWidget: React.FC = () => {
  const [originalPrice, setOriginalPrice] = useState<number | ''>(100);
  const [discountPercent, setDiscountPercent] = useState<number | ''>(25);
  const [additionalDiscount, setAdditionalDiscount] = useState<number | ''>('');

  const res = calculateDiscountPercentage(
    Number(originalPrice) || 0,
    Number(discountPercent) || 0,
    Number(additionalDiscount) || 0
  );

  const getResultText = () =>
    `Discount: Original $${originalPrice}, Discount ${discountPercent}%${
      additionalDiscount ? ` + Extra ${additionalDiscount}%` : ''
    } -> Final Price: $${formatNumber(res.finalPrice)}, Total Saved: $${formatNumber(res.totalSavings)} (${res.effectiveDiscountPercent}%)`;

  const handleReset = () => {
    setOriginalPrice(100);
    setDiscountPercent(25);
    setAdditionalDiscount('');
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Original Price ($)
            </label>
            <input
              type="number"
              value={originalPrice}
              onChange={e => setOriginalPrice(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white"
              placeholder="e.g. 100"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Discount Percentage (%)
            </label>
            <input
              type="number"
              value={discountPercent}
              onChange={e => setDiscountPercent(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white"
              placeholder="e.g. 25"
            />
            <div className="flex flex-wrap gap-1.5 mt-2">
              {[10, 15, 20, 25, 30, 40, 50, 70].map(pct => (
                <button
                  key={pct}
                  type="button"
                  onClick={() => setDiscountPercent(pct)}
                  className="px-2 py-0.5 text-xs rounded bg-slate-100 hover:bg-sky-100 text-slate-700 font-medium"
                >
                  {pct}%
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Additional Stacked Discount (% optional)
            </label>
            <input
              type="number"
              value={additionalDiscount}
              onChange={e => setAdditionalDiscount(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white"
              placeholder="e.g. 10 (extra coupon/loyalty)"
            />
          </div>

          <CalculatorActions resultText={getResultText()} onReset={handleReset} />
        </div>

        <div className="bg-emerald-50/60 border border-emerald-100 rounded-xl p-6 flex flex-col justify-between h-full">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Final Sale Price
            </span>
            <div className="mt-3">
              <div className="text-4xl sm:text-5xl font-extrabold text-emerald-950 tracking-tight">
                ${formatNumber(res.finalPrice, 2)}
              </div>
              <p className="text-sm font-semibold text-emerald-700 mt-1">
                You save ${formatNumber(res.totalSavings, 2)} ({res.effectiveDiscountPercent}% off)
              </p>
            </div>

            <div className="mt-6 space-y-2.5 text-xs text-slate-700">
              <div className="flex justify-between py-1.5 border-b border-emerald-200/50">
                <span className="text-slate-500">Original Price:</span>
                <strong className="font-semibold text-slate-900">${formatNumber(res.originalPrice, 2)}</strong>
              </div>
              <div className="flex justify-between py-1.5 border-b border-emerald-200/50">
                <span className="text-slate-500">Primary Discount:</span>
                <strong className="font-semibold text-emerald-700">-${formatNumber(res.primarySavings, 2)} ({res.discountPercent}%)</strong>
              </div>
              {res.additionalDiscountPercent > 0 && (
                <div className="flex justify-between py-1.5 border-b border-emerald-200/50">
                  <span className="text-slate-500">Additional Stacked Discount:</span>
                  <strong className="font-semibold text-emerald-700">-${formatNumber(res.additionalSavings, 2)} ({res.additionalDiscountPercent}%)</strong>
                </div>
              )}
              <div className="flex justify-between py-1.5">
                <span className="text-slate-500">Total Out-of-Pocket Savings:</span>
                <strong className="font-semibold text-emerald-800">${formatNumber(res.totalSavings, 2)}</strong>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-emerald-200/60 text-xs text-slate-500">
            Formula: Final = Original - (Original × Discount%)
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 2. Win Percentage Widget
// ==========================================
export const WinPercentageWidget: React.FC = () => {
  const [wins, setWins] = useState<number | ''>(54);
  const [losses, setLosses] = useState<number | ''>(28);
  const [ties, setTies] = useState<number | ''>(0);

  const res = calculateWinPercentage(
    Number(wins) || 0,
    Number(losses) || 0,
    Number(ties) || 0
  );

  const getResultText = () =>
    `Record: ${wins}-${losses}${ties ? `-${ties}` : ''} | Win %: ${res.winPercentage}% (${res.decimalStanding}) | Games over .500: ${res.gamesOver500 >= 0 ? `+${res.gamesOver500}` : res.gamesOver500}`;

  const handleReset = () => {
    setWins(54);
    setLosses(28);
    setTies(0);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Wins
              </label>
              <input
                type="number"
                min="0"
                value={wins}
                onChange={e => setWins(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white"
                placeholder="54"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Losses
              </label>
              <input
                type="number"
                min="0"
                value={losses}
                onChange={e => setLosses(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white"
                placeholder="28"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Ties / Draws
              </label>
              <input
                type="number"
                min="0"
                value={ties}
                onChange={e => setTies(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white"
                placeholder="0"
              />
            </div>
          </div>

          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs text-slate-600">
            Note: In standard sports standings (NFL, NHL, Soccer), a tie or draw counts as 0.5 win and 0.5 loss.
          </div>

          <CalculatorActions resultText={getResultText()} onReset={handleReset} />
        </div>

        <div className="bg-sky-50/60 border border-sky-100 rounded-xl p-6 flex flex-col justify-between h-full">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-sky-800">
              Win Percentage & Standings
            </span>
            <div className="mt-3">
              <div className="text-4xl sm:text-5xl font-extrabold text-sky-950 tracking-tight">
                {res.winPercentage}%
              </div>
              <p className="text-base font-semibold text-sky-700 mt-1">
                Official Standing Format: <span className="font-mono font-bold text-slate-900">{res.decimalStanding}</span>
              </p>
            </div>

            <div className="mt-6 space-y-2.5 text-xs text-slate-700">
              <div className="flex justify-between py-1.5 border-b border-sky-200/50">
                <span className="text-slate-500">Record:</span>
                <strong className="font-semibold text-slate-900">{res.wins}W - {res.losses}L{res.ties > 0 ? ` - ${res.ties}T` : ''}</strong>
              </div>
              <div className="flex justify-between py-1.5 border-b border-sky-200/50">
                <span className="text-slate-500">Total Games Played:</span>
                <strong className="font-semibold text-slate-900">{res.totalGames}</strong>
              </div>
              <div className="flex justify-between py-1.5 border-b border-sky-200/50">
                <span className="text-slate-500">Games Above/Below .500:</span>
                <strong className={`font-semibold ${res.gamesOver500 >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
                  {res.gamesOver500 >= 0 ? `+${res.gamesOver500}` : res.gamesOver500}
                </strong>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-sky-200/60 text-xs text-slate-500">
            Formula: Win% = [(Wins + 0.5 × Ties) ÷ Total Games] × 100
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 3. Yearly Percentage Increase Widget
// ==========================================
export const YearlyPercentageIncreaseWidget: React.FC = () => {
  const [initialValue, setInitialValue] = useState<number | ''>(10000);
  const [finalValue, setFinalValue] = useState<number | ''>(17500);
  const [years, setYears] = useState<number | ''>(5);

  const res = calculateYearlyPercentageIncrease(
    Number(initialValue) || 0,
    Number(finalValue) || 0,
    Number(years) || 1
  );

  const getResultText = () =>
    `Yearly Increase: From $${initialValue} to $${finalValue} over ${years} years = ${res.cagr}% CAGR (Compound Annual Growth Rate) | Total Change: ${res.totalPercentageChange}%`;

  const handleReset = () => {
    setInitialValue(10000);
    setFinalValue(17500);
    setYears(5);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Initial Value (Start)
            </label>
            <input
              type="number"
              value={initialValue}
              onChange={e => setInitialValue(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white"
              placeholder="10000"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Final Value (End)
            </label>
            <input
              type="number"
              value={finalValue}
              onChange={e => setFinalValue(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white"
              placeholder="17500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Number of Years
            </label>
            <input
              type="number"
              min="0.1"
              step="0.5"
              value={years}
              onChange={e => setYears(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white"
              placeholder="5"
            />
          </div>

          <CalculatorActions resultText={getResultText()} onReset={handleReset} />
        </div>

        <div className="bg-indigo-50/60 border border-indigo-100 rounded-xl p-6 flex flex-col justify-between h-full">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-800">
              Compound Annual Growth Rate (CAGR)
            </span>
            <div className="mt-3">
              <div className="text-4xl sm:text-5xl font-extrabold text-indigo-950 tracking-tight">
                {res.cagr}%
                <span className="text-sm font-medium text-slate-600 ml-2">/ year</span>
              </div>
              <p className="text-sm font-semibold text-indigo-700 mt-1">
                Total Multi-Year Gain: {res.totalPercentageChange}% (+${formatNumber(res.absoluteChange)})
              </p>
            </div>

            <div className="mt-6 space-y-2.5 text-xs text-slate-700">
              <div className="flex justify-between py-1.5 border-b border-indigo-200/50">
                <span className="text-slate-500">Total Percentage Change:</span>
                <strong className="font-semibold text-slate-900">{res.totalPercentageChange}%</strong>
              </div>
              <div className="flex justify-between py-1.5 border-b border-indigo-200/50">
                <span className="text-slate-500">Absolute Net Difference:</span>
                <strong className="font-semibold text-slate-900">+${formatNumber(res.absoluteChange)}</strong>
              </div>
              <div className="flex justify-between py-1.5 border-b border-indigo-200/50">
                <span className="text-slate-500">Simple Annual Average:</span>
                <strong className="font-semibold text-slate-900">{res.simpleAnnualAverage}% / yr</strong>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-500">Time Horizon:</span>
                <strong className="font-semibold text-slate-900">{res.years} years</strong>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-indigo-200/60 text-xs text-slate-500">
            Formula: CAGR = [(Final ÷ Initial)^(1 ÷ Years) - 1] × 100
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 4. Percentage Decrease Widget
// ==========================================
export const PercentageDecreaseWidget: React.FC = () => {
  const [initialValue, setInitialValue] = useState<number | ''>(120);
  const [finalValue, setFinalValue] = useState<number | ''>(90);

  const res = calculatePercentageDecrease(
    Number(initialValue) || 0,
    Number(finalValue) || 0
  );

  const getResultText = () =>
    `Percentage Decrease: From ${initialValue} down to ${finalValue} is a ${res.percentageDecrease}% decrease (Absolute reduction of ${res.absoluteDifference})`;

  const handleReset = () => {
    setInitialValue(120);
    setFinalValue(90);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Initial Starting Value
            </label>
            <input
              type="number"
              value={initialValue}
              onChange={e => setInitialValue(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white"
              placeholder="120"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Final Ending Value
            </label>
            <input
              type="number"
              value={finalValue}
              onChange={e => setFinalValue(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white"
              placeholder="90"
            />
          </div>

          <CalculatorActions resultText={getResultText()} onReset={handleReset} />
        </div>

        <div className="bg-rose-50/60 border border-rose-100 rounded-xl p-6 flex flex-col justify-between h-full">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-800">
              Percentage Decrease Result
            </span>
            <div className="mt-3">
              <div className="text-4xl sm:text-5xl font-extrabold text-rose-950 tracking-tight flex items-baseline gap-2">
                {res.percentageDecrease}%
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border bg-rose-100 text-rose-800 border-rose-300">
                  {res.isDecrease ? 'Decrease ↓' : 'Increase ↑'}
                </span>
              </div>
              <p className="text-sm font-semibold text-rose-700 mt-1">
                Reduced by {formatNumber(res.absoluteDifference)} units
              </p>
            </div>

            <div className="mt-6 space-y-2.5 text-xs text-slate-700">
              <div className="flex justify-between py-1.5 border-b border-rose-200/50">
                <span className="text-slate-500">Original Value:</span>
                <strong className="font-semibold text-slate-900">{res.initialValue}</strong>
              </div>
              <div className="flex justify-between py-1.5 border-b border-rose-200/50">
                <span className="text-slate-500">New Value:</span>
                <strong className="font-semibold text-slate-900">{res.finalValue}</strong>
              </div>
              <div className="flex justify-between py-1.5 border-b border-rose-200/50">
                <span className="text-slate-500">Absolute Difference:</span>
                <strong className="font-semibold text-rose-700">-{formatNumber(res.absoluteDifference)}</strong>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-500">Remaining Proportion:</span>
                <strong className="font-semibold text-slate-900">{Math.round((Number(finalValue) / (Number(initialValue) || 1)) * 10000) / 100}% of original</strong>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-rose-200/60 text-xs text-slate-500">
            Formula: % Decrease = [(Initial - Final) ÷ Initial] × 100
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 5. Part Time Percentage Widget
// ==========================================
export const PartTimePercentageWidget: React.FC = () => {
  const [partTimeHours, setPartTimeHours] = useState<number | ''>(24);
  const [fullTimeHours, setFullTimeHours] = useState<number | ''>(40);
  const [fullTimeSalary, setFullTimeSalary] = useState<number | ''>(75000);

  const res = calculatePartTimePercentage(
    Number(partTimeHours) || 0,
    Number(fullTimeHours) || 40,
    fullTimeSalary ? Number(fullTimeSalary) : undefined
  );

  const getResultText = () =>
    `Part-Time Percentage: ${partTimeHours}h / ${fullTimeHours}h = ${res.partTimePercentage}% FTE (${res.fteRatio} FTE)${
      res.proRataSalary ? ` | Pro-rata Salary: $${formatNumber(res.proRataSalary)}` : ''
    }`;

  const handleReset = () => {
    setPartTimeHours(24);
    setFullTimeHours(40);
    setFullTimeSalary(75000);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Part-Time Weekly Hours
            </label>
            <input
              type="number"
              step="0.5"
              value={partTimeHours}
              onChange={e => setPartTimeHours(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white"
              placeholder="24"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Standard Full-Time Baseline Hours
            </label>
            <input
              type="number"
              step="0.5"
              value={fullTimeHours}
              onChange={e => setFullTimeHours(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white"
              placeholder="40 (or 37.5, 35)"
            />
            <div className="flex gap-2 mt-2">
              {[40, 37.5, 35, 32].map(h => (
                <button
                  key={h}
                  type="button"
                  onClick={() => setFullTimeHours(h)}
                  className="px-2 py-0.5 text-xs rounded bg-slate-100 hover:bg-sky-100 text-slate-700 font-medium"
                >
                  {h} hrs/wk
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Full-Time Annual Salary ($ optional)
            </label>
            <input
              type="number"
              value={fullTimeSalary}
              onChange={e => setFullTimeSalary(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white"
              placeholder="75000"
            />
          </div>

          <CalculatorActions resultText={getResultText()} onReset={handleReset} />
        </div>

        <div className="bg-teal-50/60 border border-teal-100 rounded-xl p-6 flex flex-col justify-between h-full">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-800">
              FTE & Part-Time Ratio
            </span>
            <div className="mt-3">
              <div className="text-4xl sm:text-5xl font-extrabold text-teal-950 tracking-tight">
                {res.partTimePercentage}%
              </div>
              <p className="text-base font-semibold text-teal-700 mt-1">
                Full-Time Equivalent (FTE): <strong className="text-slate-900">{res.fteRatio} FTE</strong>
              </p>
            </div>

            {res.proRataSalary !== undefined && (
              <div className="mt-4 p-3 bg-white/80 border border-teal-200 rounded-lg">
                <span className="text-xs text-slate-500 block">Pro-Rata Annual Compensation:</span>
                <span className="text-2xl font-bold text-slate-900">${formatNumber(res.proRataSalary, 2)}</span>
                <span className="text-xs text-slate-500 block mt-0.5">
                  (${formatNumber(res.proRataSalary / 12, 2)} / month)
                </span>
              </div>
            )}

            <div className="mt-6 space-y-2.5 text-xs text-slate-700">
              <div className="flex justify-between py-1.5 border-b border-teal-200/50">
                <span className="text-slate-500">Weekly Hours:</span>
                <strong className="font-semibold text-slate-900">{res.partTimeHours}h / {res.standardFullTimeHours}h</strong>
              </div>
              <div className="flex justify-between py-1.5 border-b border-teal-200/50">
                <span className="text-slate-500">Annual Hours Worked (52 wks):</span>
                <strong className="font-semibold text-slate-900">{res.annualPartTimeHours} hrs</strong>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-500">Full-Time Annual Baseline:</span>
                <span className="font-semibold text-slate-900">{res.annualFullTimeHours} hrs</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-teal-200/60 text-xs text-slate-500">
            Formula: Part-Time % = (Part-Time Hours ÷ Full-Time Hours) × 100
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 6. Time Percentage Widget
// ==========================================
export const TimePercentageWidget: React.FC = () => {
  const [spentHours, setSpentHours] = useState<number | ''>(6);
  const [spentMinutes, setSpentMinutes] = useState<number | ''>(30);
  const [totalHours, setTotalHours] = useState<number | ''>(24);
  const [totalMinutes, setTotalMinutes] = useState<number | ''>(0);

  const spentSec = (Number(spentHours) || 0) * 3600 + (Number(spentMinutes) || 0) * 60;
  const totalSec = (Number(totalHours) || 0) * 3600 + (Number(totalMinutes) || 0) * 60;

  const res = calculateTimePercentage(spentSec, totalSec);

  const getResultText = () =>
    `Time Percentage: ${res.spentFormatted} out of ${res.totalFormatted} is ${res.percentage}% (${res.remainingPercentage}% remaining)`;

  const handleReset = () => {
    setSpentHours(6);
    setSpentMinutes(30);
    setTotalHours(24);
    setTotalMinutes(0);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Elapsed / Spent Time
            </label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <input
                  type="number"
                  min="0"
                  value={spentHours}
                  onChange={e => setSpentHours(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
                  placeholder="Hours"
                />
                <span className="text-2xs text-slate-400">Hours</span>
              </div>
              <div>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={spentMinutes}
                  onChange={e => setSpentMinutes(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
                  placeholder="Minutes"
                />
                <span className="text-2xs text-slate-400">Minutes</span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Total Duration / Timeframe
            </label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <input
                  type="number"
                  min="0"
                  value={totalHours}
                  onChange={e => setTotalHours(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
                  placeholder="Hours"
                />
                <span className="text-2xs text-slate-400">Hours</span>
              </div>
              <div>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={totalMinutes}
                  onChange={e => setTotalMinutes(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
                  placeholder="Minutes"
                />
                <span className="text-2xs text-slate-400">Minutes</span>
              </div>
            </div>
            <div className="flex gap-2 mt-2">
              <button
                type="button"
                onClick={() => { setTotalHours(24); setTotalMinutes(0); }}
                className="px-2 py-0.5 text-xs rounded bg-slate-100 hover:bg-sky-100 text-slate-700"
              >
                1 Day (24h)
              </button>
              <button
                type="button"
                onClick={() => { setTotalHours(8); setTotalMinutes(0); }}
                className="px-2 py-0.5 text-xs rounded bg-slate-100 hover:bg-sky-100 text-slate-700"
              >
                Workday (8h)
              </button>
              <button
                type="button"
                onClick={() => { setTotalHours(168); setTotalMinutes(0); }}
                className="px-2 py-0.5 text-xs rounded bg-slate-100 hover:bg-sky-100 text-slate-700"
              >
                Week (168h)
              </button>
            </div>
          </div>

          <CalculatorActions resultText={getResultText()} onReset={handleReset} />
        </div>

        <div className="bg-violet-50/60 border border-violet-100 rounded-xl p-6 flex flex-col justify-between h-full">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-violet-800">
              Percentage of Time Completed
            </span>
            <div className="mt-3">
              <div className="text-4xl sm:text-5xl font-extrabold text-violet-950 tracking-tight">
                {res.percentage}%
              </div>
              <div className="w-full bg-slate-200 rounded-full h-3 mt-3 overflow-hidden">
                <div
                  className="bg-violet-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, res.percentage)}%` }}
                />
              </div>
              <p className="text-xs text-violet-700 font-semibold mt-2">
                {res.remainingPercentage}% left ({res.remainingFormatted})
              </p>
            </div>

            <div className="mt-6 space-y-2.5 text-xs text-slate-700">
              <div className="flex justify-between py-1.5 border-b border-violet-200/50">
                <span className="text-slate-500">Time Spent:</span>
                <strong className="font-semibold text-slate-900">{res.spentFormatted}</strong>
              </div>
              <div className="flex justify-between py-1.5 border-b border-violet-200/50">
                <span className="text-slate-500">Total Duration:</span>
                <strong className="font-semibold text-slate-900">{res.totalFormatted}</strong>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-500">Remaining Duration:</span>
                <strong className="font-semibold text-slate-900">{res.remainingFormatted}</strong>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-violet-200/60 text-xs text-slate-500">
            Formula: % = (Elapsed Duration ÷ Total Duration) × 100
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 7. Percentage of Time Widget
// ==========================================
export const PercentageOfTimeWidget: React.FC = () => {
  const [percentage, setPercentage] = useState<number | ''>(25);
  const [baseHours, setBaseHours] = useState<number | ''>(8);
  const [baseMinutes, setBaseMinutes] = useState<number | ''>(0);

  const res = calculatePercentageOfTime(
    Number(percentage) || 0,
    Number(baseHours) || 0,
    Number(baseMinutes) || 0
  );

  const getResultText = () =>
    `${percentage}% of ${baseHours}h ${baseMinutes}m is ${res.formattedDuration} (${res.hours} hours ${res.minutes} mins)`;

  const handleReset = () => {
    setPercentage(25);
    setBaseHours(8);
    setBaseMinutes(0);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Percentage Wanted (%)
            </label>
            <input
              type="number"
              min="0"
              max="1000"
              value={percentage}
              onChange={e => setPercentage(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white"
              placeholder="25"
            />
            <div className="flex flex-wrap gap-1.5 mt-2">
              {[5, 10, 15, 20, 25, 33.3, 50, 75].map(p => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPercentage(p)}
                  className="px-2 py-0.5 text-xs rounded bg-slate-100 hover:bg-sky-100 text-slate-700 font-medium"
                >
                  {p}%
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Base Time Duration
            </label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <input
                  type="number"
                  min="0"
                  value={baseHours}
                  onChange={e => setBaseHours(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
                  placeholder="8"
                />
                <span className="text-2xs text-slate-400">Hours</span>
              </div>
              <div>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={baseMinutes}
                  onChange={e => setBaseMinutes(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
                  placeholder="0"
                />
                <span className="text-2xs text-slate-400">Minutes</span>
              </div>
            </div>
            <div className="flex gap-2 mt-2">
              <button
                type="button"
                onClick={() => { setBaseHours(8); setBaseMinutes(0); }}
                className="px-2 py-0.5 text-xs rounded bg-slate-100 hover:bg-sky-100 text-slate-700"
              >
                8h Workday
              </button>
              <button
                type="button"
                onClick={() => { setBaseHours(24); setBaseMinutes(0); }}
                className="px-2 py-0.5 text-xs rounded bg-slate-100 hover:bg-sky-100 text-slate-700"
              >
                24h Day
              </button>
              <button
                type="button"
                onClick={() => { setBaseHours(40); setBaseMinutes(0); }}
                className="px-2 py-0.5 text-xs rounded bg-slate-100 hover:bg-sky-100 text-slate-700"
              >
                40h Week
              </button>
            </div>
          </div>

          <CalculatorActions resultText={getResultText()} onReset={handleReset} />
        </div>

        <div className="bg-amber-50/60 border border-amber-100 rounded-xl p-6 flex flex-col justify-between h-full">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
              Equivalent Duration
            </span>
            <div className="mt-3">
              <div className="text-4xl sm:text-5xl font-extrabold text-amber-950 tracking-tight">
                {res.formattedDuration}
              </div>
              <p className="text-sm font-semibold text-amber-800 mt-1">
                = {res.hours} hours, {res.minutes} minutes, {res.seconds} seconds
              </p>
            </div>

            <div className="mt-6 space-y-2.5 text-xs text-slate-700">
              <div className="flex justify-between py-1.5 border-b border-amber-200/50">
                <span className="text-slate-500">Same % of a 24-hour day:</span>
                <strong className="font-semibold text-slate-900">{res.ofDayHours} hours</strong>
              </div>
              <div className="flex justify-between py-1.5 border-b border-amber-200/50">
                <span className="text-slate-500">Same % of a 40-hour work week:</span>
                <strong className="font-semibold text-slate-900">{res.ofWorkWeekHours} hours</strong>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-500">Same % of a 365-day year:</span>
                <strong className="font-semibold text-slate-900">{res.ofYearDays} days</strong>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-amber-200/60 text-xs text-slate-500">
            Formula: Duration = Base Time × (Percentage ÷ 100)
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 8. Reverse Percentage Widget
// ==========================================
export const ReversePercentageWidget: React.FC = () => {
  const [finalValue, setFinalValue] = useState<number | ''>(120);
  const [percentageChange, setPercentageChange] = useState<number | ''>(20);
  const [type, setType] = useState<'increase' | 'decrease'>('increase');

  const res = calculateReversePercentage(
    Number(finalValue) || 0,
    Number(percentageChange) || 0,
    type
  );

  const getResultText = () =>
    `Reverse Percentage: If ${finalValue} is the result after a ${percentageChange}% ${type}, the original starting value was ${res.originalValue} (Difference: ${res.absoluteDifference})`;

  const handleReset = () => {
    setFinalValue(120);
    setPercentageChange(20);
    setType('increase');
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Direction of Prior Change
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setType('increase')}
                className={`py-2 px-3 text-sm font-semibold rounded-lg border transition-colors ${
                  type === 'increase'
                    ? 'bg-sky-600 text-white border-sky-600'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                After Increase (+%)
              </button>
              <button
                type="button"
                onClick={() => setType('decrease')}
                className={`py-2 px-3 text-sm font-semibold rounded-lg border transition-colors ${
                  type === 'decrease'
                    ? 'bg-rose-600 text-white border-rose-600'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                After Decrease (-%)
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Final Ending Value (Known Result)
            </label>
            <input
              type="number"
              value={finalValue}
              onChange={e => setFinalValue(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white"
              placeholder="120"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Percentage Applied (%)
            </label>
            <input
              type="number"
              value={percentageChange}
              onChange={e => setPercentageChange(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white"
              placeholder="20"
            />
          </div>

          <CalculatorActions resultText={getResultText()} onReset={handleReset} />
        </div>

        <div className="bg-sky-50/60 border border-sky-100 rounded-xl p-6 flex flex-col justify-between h-full">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-sky-800">
              Original Starting Value
            </span>
            <div className="mt-3">
              <div className="text-4xl sm:text-5xl font-extrabold text-sky-950 tracking-tight">
                {res.originalValue}
              </div>
              <p className="text-sm font-semibold text-sky-700 mt-1">
                Net change: {type === 'increase' ? `+${res.absoluteDifference}` : `-${res.absoluteDifference}`}
              </p>
            </div>

            <div className="mt-6 space-y-2.5 text-xs text-slate-700">
              <div className="flex justify-between py-1.5 border-b border-sky-200/50">
                <span className="text-slate-500">Calculation Factor:</span>
                <strong className="font-semibold text-slate-900">÷ {res.multiplier}</strong>
              </div>
              <div className="flex justify-between py-1.5 border-b border-sky-200/50">
                <span className="text-slate-500">Verification:</span>
                <span className="font-semibold text-slate-900">
                  {res.originalValue} {type === 'increase' ? '+' : '-'} {percentageChange}% = {finalValue}
                </span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-500">Absolute Difference:</span>
                <strong className="font-semibold text-slate-900">{res.absoluteDifference}</strong>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-sky-200/60 text-xs text-slate-500">
            Formula: Original = Final ÷ (1 {type === 'increase' ? '+' : '-'} %/100)
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 9. Growth Percentage Widget
// ==========================================
export const GrowthPercentageWidget: React.FC = () => {
  const [initialValue, setInitialValue] = useState<number | ''>(500);
  const [finalValue, setFinalValue] = useState<number | ''>(850);

  const res = calculateGrowthPercentage(
    Number(initialValue) || 0,
    Number(finalValue) || 0
  );

  const getResultText = () =>
    `Growth: From ${initialValue} to ${finalValue} is ${res.growthPercentage}% growth (${res.growthFactor}x multiple, +${res.absoluteGrowth} net gain)`;

  const handleReset = () => {
    setInitialValue(500);
    setFinalValue(850);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Initial Baseline Value
            </label>
            <input
              type="number"
              value={initialValue}
              onChange={e => setInitialValue(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white"
              placeholder="500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              New / Current Value
            </label>
            <input
              type="number"
              value={finalValue}
              onChange={e => setFinalValue(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white"
              placeholder="850"
            />
          </div>

          <CalculatorActions resultText={getResultText()} onReset={handleReset} />
        </div>

        <div className="bg-emerald-50/60 border border-emerald-100 rounded-xl p-6 flex flex-col justify-between h-full">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Growth Percentage
            </span>
            <div className="mt-3">
              <div className="text-4xl sm:text-5xl font-extrabold text-emerald-950 tracking-tight flex items-baseline gap-2">
                {res.growthPercentage >= 0 ? `+${res.growthPercentage}%` : `${res.growthPercentage}%`}
              </div>
              <p className="text-sm font-semibold text-emerald-700 mt-1">
                Growth Factor: <strong className="text-slate-900">{res.growthFactor}×</strong>
              </p>
            </div>

            <div className="mt-6 space-y-2.5 text-xs text-slate-700">
              <div className="flex justify-between py-1.5 border-b border-emerald-200/50">
                <span className="text-slate-500">Absolute Net Growth:</span>
                <strong className="font-semibold text-slate-900">+{formatNumber(res.absoluteGrowth)}</strong>
              </div>
              <div className="flex justify-between py-1.5 border-b border-emerald-200/50">
                <span className="text-slate-500">Growth Multiple:</span>
                <strong className="font-semibold text-slate-900">{res.growthFactor}×</strong>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-500">Projected Next Period (at same rate):</span>
                <strong className="font-semibold text-emerald-800">{formatNumber(res.projectedNextValue)}</strong>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-emerald-200/60 text-xs text-slate-500">
            Formula: Growth% = [(Current - Initial) ÷ Initial] × 100
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 10. Tax Percentage Widget
// ==========================================
export const TaxPercentageWidget: React.FC = () => {
  const [preTaxPrice, setPreTaxPrice] = useState<number | ''>(150);
  const [taxRate, setTaxRate] = useState<number | ''>(8.25);

  const res = calculateTaxPercentage(
    Number(preTaxPrice) || 0,
    Number(taxRate) || 0
  );

  const getResultText = () =>
    `Sales Tax: Pre-tax $${preTaxPrice} @ ${taxRate}% = Tax $${formatNumber(res.taxAmount)}, Total $${formatNumber(res.totalPrice)}`;

  const handleReset = () => {
    setPreTaxPrice(150);
    setTaxRate(8.25);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Pre-Tax Amount ($)
            </label>
            <input
              type="number"
              value={preTaxPrice}
              onChange={e => setPreTaxPrice(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white"
              placeholder="150"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Tax Percentage Rate (%)
            </label>
            <input
              type="number"
              step="0.01"
              value={taxRate}
              onChange={e => setTaxRate(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white"
              placeholder="8.25"
            />
            <div className="flex flex-wrap gap-1.5 mt-2">
              {[5, 6, 7, 7.25, 8.25, 8.875, 9.5, 10].map(r => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setTaxRate(r)}
                  className="px-2 py-0.5 text-xs rounded bg-slate-100 hover:bg-sky-100 text-slate-700 font-medium"
                >
                  {r}%
                </button>
              ))}
            </div>
          </div>

          <CalculatorActions resultText={getResultText()} onReset={handleReset} />
        </div>

        <div className="bg-blue-50/60 border border-blue-100 rounded-xl p-6 flex flex-col justify-between h-full">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-800">
              Total After Tax
            </span>
            <div className="mt-3">
              <div className="text-4xl sm:text-5xl font-extrabold text-blue-950 tracking-tight">
                ${formatNumber(res.totalPrice, 2)}
              </div>
              <p className="text-base font-semibold text-blue-700 mt-1">
                Sales Tax Due: <strong className="text-slate-900">${formatNumber(res.taxAmount, 2)}</strong>
              </p>
            </div>

            <div className="mt-6 space-y-2.5 text-xs text-slate-700">
              <div className="flex justify-between py-1.5 border-b border-blue-200/50">
                <span className="text-slate-500">Pre-Tax Amount:</span>
                <strong className="font-semibold text-slate-900">${formatNumber(res.preTaxPrice, 2)}</strong>
              </div>
              <div className="flex justify-between py-1.5 border-b border-blue-200/50">
                <span className="text-slate-500">Effective Tax Rate:</span>
                <strong className="font-semibold text-slate-900">{res.effectiveRate}%</strong>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-500">Total Charged:</span>
                <strong className="font-semibold text-blue-900">${formatNumber(res.totalPrice, 2)}</strong>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-blue-200/60 text-xs text-slate-500">
            Formula: Total = Pre-Tax + (Pre-Tax × Tax Rate %)
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 11. VAT Percentage Widget
// ==========================================
export const VatPercentageWidget: React.FC = () => {
  const [amount, setAmount] = useState<number | ''>(100);
  const [vatRate, setVatRate] = useState<number | ''>(20);
  const [mode, setMode] = useState<'add' | 'remove'>('add');

  const res = calculateVatPercentage(
    Number(amount) || 0,
    Number(vatRate) || 0,
    mode
  );

  const getResultText = () =>
    `VAT (${mode}): Net $${formatNumber(res.netAmount)}, VAT (${vatRate}%) $${formatNumber(res.vatAmount)}, Gross $${formatNumber(res.grossAmount)}`;

  const handleReset = () => {
    setAmount(100);
    setVatRate(20);
    setMode('add');
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Operation Mode
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setMode('add')}
                className={`py-2 px-3 text-sm font-semibold rounded-lg border transition-colors ${
                  mode === 'add'
                    ? 'bg-purple-600 text-white border-purple-600'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Add VAT (Net → Gross)
              </button>
              <button
                type="button"
                onClick={() => setMode('remove')}
                className={`py-2 px-3 text-sm font-semibold rounded-lg border transition-colors ${
                  mode === 'remove'
                    ? 'bg-purple-600 text-white border-purple-600'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Extract VAT (Gross → Net)
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              {mode === 'add' ? 'Net Amount (Excl. VAT)' : 'Gross Amount (Incl. VAT)'}
            </label>
            <input
              type="number"
              value={amount}
              onChange={e => setAmount(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white"
              placeholder="100"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              VAT Rate (%)
            </label>
            <input
              type="number"
              value={vatRate}
              onChange={e => setVatRate(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white"
              placeholder="20"
            />
            <div className="flex flex-wrap gap-1.5 mt-2">
              {[5, 7, 19, 20, 21, 23, 25].map(r => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setVatRate(r)}
                  className="px-2 py-0.5 text-xs rounded bg-slate-100 hover:bg-purple-100 text-slate-700 font-medium"
                >
                  {r}%
                </button>
              ))}
            </div>
          </div>

          <CalculatorActions resultText={getResultText()} onReset={handleReset} />
        </div>

        <div className="bg-purple-50/60 border border-purple-100 rounded-xl p-6 flex flex-col justify-between h-full">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-purple-800">
              {mode === 'add' ? 'Gross Amount with VAT' : 'Net Amount before VAT'}
            </span>
            <div className="mt-3">
              <div className="text-4xl sm:text-5xl font-extrabold text-purple-950 tracking-tight">
                ${formatNumber(mode === 'add' ? res.grossAmount : res.netAmount, 2)}
              </div>
              <p className="text-base font-semibold text-purple-700 mt-1">
                VAT Portion ({res.vatRate}%): <strong className="text-slate-900">${formatNumber(res.vatAmount, 2)}</strong>
              </p>
            </div>

            <div className="mt-6 space-y-2.5 text-xs text-slate-700">
              <div className="flex justify-between py-1.5 border-b border-purple-200/50">
                <span className="text-slate-500">Net (Excluding VAT):</span>
                <strong className="font-semibold text-slate-900">${formatNumber(res.netAmount, 2)}</strong>
              </div>
              <div className="flex justify-between py-1.5 border-b border-purple-200/50">
                <span className="text-slate-500">VAT Amount ({res.vatRate}%):</span>
                <strong className="font-semibold text-purple-800">${formatNumber(res.vatAmount, 2)}</strong>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-500">Gross (Including VAT):</span>
                <strong className="font-semibold text-slate-900">${formatNumber(res.grossAmount, 2)}</strong>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-purple-200/60 text-xs text-slate-500">
            {mode === 'add'
              ? 'Formula: Gross = Net × (1 + VAT/100)'
              : 'Formula: Net = Gross ÷ (1 + VAT/100)'}
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 12. Slugging Percentage Widget
// ==========================================
export const SluggingPercentageWidget: React.FC = () => {
  const [atBats, setAtBats] = useState<number | ''>(150);
  const [singles, setSingles] = useState<number | ''>(25);
  const [doubles, setDoubles] = useState<number | ''>(10);
  const [triples, setTriples] = useState<number | ''>(2);
  const [homeRuns, setHomeRuns] = useState<number | ''>(8);

  const res = calculateSluggingPercentage(
    Number(atBats) || 0,
    Number(singles) || 0,
    Number(doubles) || 0,
    Number(triples) || 0,
    Number(homeRuns) || 0
  );

  const getResultText = () =>
    `Baseball Stats: SLG ${res.formattedSlugging} (${res.totalBases} TB / ${res.atBats} AB) | BA: ${res.formattedBattingAverage} | ISO: .${Math.round(res.isolatedPower * 1000)}`;

  const handleReset = () => {
    setAtBats(150);
    setSingles(25);
    setDoubles(10);
    setTriples(2);
    setHomeRuns(8);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              At-Bats (AB)
            </label>
            <input
              type="number"
              min="0"
              value={atBats}
              onChange={e => setAtBats(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white"
              placeholder="150"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Singles (1B)
              </label>
              <input
                type="number"
                min="0"
                value={singles}
                onChange={e => setSingles(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
                placeholder="25"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Doubles (2B)
              </label>
              <input
                type="number"
                min="0"
                value={doubles}
                onChange={e => setDoubles(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
                placeholder="10"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Triples (3B)
              </label>
              <input
                type="number"
                min="0"
                value={triples}
                onChange={e => setTriples(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
                placeholder="2"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Home Runs (HR)
              </label>
              <input
                type="number"
                min="0"
                value={homeRuns}
                onChange={e => setHomeRuns(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
                placeholder="8"
              />
            </div>
          </div>

          <CalculatorActions resultText={getResultText()} onReset={handleReset} />
        </div>

        <div className="bg-emerald-50/60 border border-emerald-100 rounded-xl p-6 flex flex-col justify-between h-full">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Slugging Percentage (SLG)
            </span>
            <div className="mt-3">
              <div className="text-4xl sm:text-5xl font-mono font-extrabold text-emerald-950 tracking-tight">
                {res.formattedSlugging}
              </div>
              <p className="text-sm font-semibold text-emerald-700 mt-1">
                Batting Average: <span className="font-mono text-slate-900 font-bold">{res.formattedBattingAverage}</span> | ISO: <span className="font-mono text-slate-900 font-bold">{res.isolatedPower.toFixed(3).slice(1)}</span>
              </p>
            </div>

            <div className="mt-6 space-y-2.5 text-xs text-slate-700">
              <div className="flex justify-between py-1.5 border-b border-emerald-200/50">
                <span className="text-slate-500">Total Bases (TB):</span>
                <strong className="font-semibold text-slate-900">{res.totalBases} bases</strong>
              </div>
              <div className="flex justify-between py-1.5 border-b border-emerald-200/50">
                <span className="text-slate-500">Total Hits (H):</span>
                <strong className="font-semibold text-slate-900">{res.totalHits} hits</strong>
              </div>
              <div className="flex justify-between py-1.5 border-b border-emerald-200/50">
                <span className="text-slate-500">Extra-Base Hits (XBH):</span>
                <strong className="font-semibold text-slate-900">{res.doubles + res.triples + res.homeRuns}</strong>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-500">Official At-Bats:</span>
                <strong className="font-semibold text-slate-900">{res.atBats} AB</strong>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-emerald-200/60 text-xs text-slate-500">
            Formula: SLG = (1B + 2×2B + 3×3B + 4×HR) ÷ AB
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 13. Fat Percentage Widget
// ==========================================
export const FatPercentageWidget: React.FC = () => {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [unit, setUnit] = useState<'imperial' | 'metric'>('imperial');
  const [height, setHeight] = useState<number | ''>(70); // 70 inches ~ 178 cm
  const [weight, setWeight] = useState<number | ''>(175); // 175 lbs ~ 79.4 kg
  const [neck, setNeck] = useState<number | ''>(15.5); // 15.5 in ~ 39.4 cm
  const [waist, setWaist] = useState<number | ''>(34); // 34 in ~ 86.4 cm
  const [hip, setHip] = useState<number | ''>(38); // 38 in ~ 96.5 cm (women)

  const res = calculateFatPercentage({
    gender,
    unit,
    height: Number(height) || 0,
    weight: Number(weight) || 0,
    neck: Number(neck) || 0,
    waist: Number(waist) || 0,
    hip: gender === 'female' ? Number(hip) || 0 : undefined,
  });

  const getResultText = () =>
    `Body Fat: ${res.bodyFatPercentage}% (${res.category}) | Fat Mass: ${res.fatMass} ${res.weightUnit}, Lean Mass: ${res.leanMass} ${res.weightUnit} | BMI: ${res.bmi}`;

  const handleReset = () => {
    setGender('male');
    setUnit('imperial');
    setHeight(70);
    setWeight(175);
    setNeck(15.5);
    setWaist(34);
    setHip(38);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Biological Sex
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  type="button"
                  onClick={() => setGender('male')}
                  className={`py-1.5 px-2 text-xs font-semibold rounded-md border ${
                    gender === 'male'
                      ? 'bg-sky-600 text-white border-sky-600'
                      : 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  Male
                </button>
                <button
                  type="button"
                  onClick={() => setGender('female')}
                  className={`py-1.5 px-2 text-xs font-semibold rounded-md border ${
                    gender === 'female'
                      ? 'bg-sky-600 text-white border-sky-600'
                      : 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  Female
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Measurement System
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  type="button"
                  onClick={() => {
                    setUnit('imperial');
                    if (unit === 'metric') {
                      setHeight(70);
                      setWeight(175);
                      setNeck(15.5);
                      setWaist(34);
                      setHip(38);
                    }
                  }}
                  className={`py-1.5 px-2 text-xs font-semibold rounded-md border ${
                    unit === 'imperial'
                      ? 'bg-slate-800 text-white border-slate-800'
                      : 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  US (in, lbs)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setUnit('metric');
                    if (unit === 'imperial') {
                      setHeight(178);
                      setWeight(79);
                      setNeck(39);
                      setWaist(86);
                      setHip(97);
                    }
                  }}
                  className={`py-1.5 px-2 text-xs font-semibold rounded-md border ${
                    unit === 'metric'
                      ? 'bg-slate-800 text-white border-slate-800'
                      : 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  Metric (cm, kg)
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Height ({unit === 'imperial' ? 'inches' : 'cm'})
              </label>
              <input
                type="number"
                value={height}
                onChange={e => setHeight(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
                placeholder={unit === 'imperial' ? '70' : '178'}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Weight ({unit === 'imperial' ? 'lbs' : 'kg'})
              </label>
              <input
                type="number"
                value={weight}
                onChange={e => setWeight(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
                placeholder={unit === 'imperial' ? '175' : '79'}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Neck ({unit === 'imperial' ? 'inches' : 'cm'})
              </label>
              <input
                type="number"
                value={neck}
                onChange={e => setNeck(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
                placeholder={unit === 'imperial' ? '15.5' : '39'}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Waist ({unit === 'imperial' ? 'inches' : 'cm'})
              </label>
              <input
                type="number"
                value={waist}
                onChange={e => setWaist(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
                placeholder={unit === 'imperial' ? '34' : '86'}
              />
            </div>
          </div>

          {gender === 'female' && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Hip Circumference ({unit === 'imperial' ? 'inches' : 'cm'})
              </label>
              <input
                type="number"
                value={hip}
                onChange={e => setHip(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
                placeholder={unit === 'imperial' ? '38' : '97'}
              />
            </div>
          )}

          <CalculatorActions resultText={getResultText()} onReset={handleReset} />
        </div>

        <div className="bg-rose-50/60 border border-rose-100 rounded-xl p-6 flex flex-col justify-between h-full">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-800">
              U.S. Navy Body Fat Estimate
            </span>
            <div className="mt-3">
              <div className="text-4xl sm:text-5xl font-extrabold text-rose-950 tracking-tight flex items-baseline gap-2">
                {res.bodyFatPercentage}%
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border bg-rose-100 text-rose-800 border-rose-300">
                  {res.category}
                </span>
              </div>
              <p className="text-sm font-semibold text-rose-700 mt-1">
                Ideal Range: {res.idealBodyFatRange}
              </p>
            </div>

            <div className="mt-6 space-y-2.5 text-xs text-slate-700">
              <div className="flex justify-between py-1.5 border-b border-rose-200/50">
                <span className="text-slate-500">Fat Mass:</span>
                <strong className="font-semibold text-rose-800">{res.fatMass} {res.weightUnit}</strong>
              </div>
              <div className="flex justify-between py-1.5 border-b border-rose-200/50">
                <span className="text-slate-500">Lean Body Mass:</span>
                <strong className="font-semibold text-slate-900">{res.leanMass} {res.weightUnit}</strong>
              </div>
              <div className="flex justify-between py-1.5 border-b border-rose-200/50">
                <span className="text-slate-500">Calculated BMI:</span>
                <strong className="font-semibold text-slate-900">{res.bmi} kg/m²</strong>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-500">Standard Classification:</span>
                <strong className="font-semibold text-slate-900">ACE {res.category}</strong>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-rose-200/60 text-xs text-slate-500">
            Formula: U.S. Navy Body Density & Siri equation based on waist/neck/height.
          </div>
        </div>
      </div>
    </div>
  );
};
