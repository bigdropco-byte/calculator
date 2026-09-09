'use client';

import React, { useState } from 'react';
import {
  COUNTRY_PROFILES,
  calculateSingleCountryTax,
  calculateForeignTaxCredit,
  generateGlobalCountryComparisons,
} from '@/lib/calculators/internationalTax';
import { formatCurrency, formatNumber, formatPercent } from '@/lib/formatting';
import { CalculatorActions } from '@/components/calculator/CalculatorActions';
import { Globe, ArrowRightLeft, ShieldCheck, Sparkles, TrendingUp, HelpCircle } from 'lucide-react';

export const InternationalTaxCalculatorWidget: React.FC = () => {
  const [calcMode, setCalcMode] = useState<'single' | 'dual'>('single');
  const [grossSalary, setGrossSalary] = useState<number | ''>(100000);
  const [selectedCountry, setSelectedCountry] = useState<string>('US');
  const [sourceCountry, setSourceCountry] = useState<string>('GB');
  const [useExpatRegime, setUseExpatRegime] = useState<boolean>(false);
  const [useSourceExpatRegime, setUseSourceExpatRegime] = useState<boolean>(false);

  const numericGross = Number(grossSalary) || 0;
  const currentProfile = COUNTRY_PROFILES[selectedCountry] || COUNTRY_PROFILES.US;
  const sourceProfile = COUNTRY_PROFILES[sourceCountry] || COUNTRY_PROFILES.GB;

  // Single Country Result
  const singleResult = calculateSingleCountryTax(
    selectedCountry,
    numericGross,
    useExpatRegime
  );

  // Dual Country (FTC) Result
  // For dual country mode, input is treated as USD for common cross-border baseline
  const dualResult = calculateForeignTaxCredit(
    selectedCountry,
    sourceCountry,
    numericGross,
    useExpatRegime,
    useSourceExpatRegime
  );

  // Global Comparison List
  const comparisons = generateGlobalCountryComparisons(
    singleResult.grossIncomeUSD,
    selectedCountry
  );

  const handleReset = () => {
    setGrossSalary(100000);
    setSelectedCountry('US');
    setSourceCountry('GB');
    setUseExpatRegime(false);
    setUseSourceExpatRegime(false);
    setCalcMode('single');
  };

  const getResultText = () => {
    if (calcMode === 'single') {
      return `International Tax Summary for ${currentProfile.name}: Gross Income: ${currentProfile.currencySymbol}${formatNumber(
        singleResult.grossIncomeLocal,
        0
      )} | Total Tax & Deductions: ${currentProfile.currencySymbol}${formatNumber(
        singleResult.totalDeductionsLocal,
        0
      )} (${formatPercent(singleResult.effectiveTaxRate, 1)}) | Net Take-Home Pay: ${currentProfile.currencySymbol}${formatNumber(
        singleResult.netIncomeLocal,
        0
      )}/yr (${currentProfile.currencySymbol}${formatNumber(singleResult.monthlyNetLocal, 0)}/mo)`;
    } else {
      return `Cross-Border Tax Summary (Residence: ${currentProfile.name}, Source: ${sourceProfile.name}): Gross: $${formatNumber(
        numericGross,
        0
      )} USD | Foreign Tax Credit Relief: $${formatNumber(
        dualResult.foreignTaxCreditUSD,
        0
      )} | Total Net Tax: $${formatNumber(
        dualResult.netTaxPaidUSD,
        0
      )} | Net Take-Home Pay: $${formatNumber(dualResult.netTakeHomeUSD, 0)} USD`;
    }
  };

  const salaryPresets = [50000, 75000, 100000, 150000, 200000, 300000];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      {/* Mode Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-6 border-b border-slate-200">
        <div className="flex rounded-lg bg-slate-100 p-1 border border-slate-200/80">
          <button
            type="button"
            onClick={() => setCalcMode('single')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              calcMode === 'single'
                ? 'bg-white text-sky-800 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Country Income Tax & Take-Home
          </button>
          <button
            type="button"
            onClick={() => setCalcMode('dual')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5 ${
              calcMode === 'dual'
                ? 'bg-white text-sky-800 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ArrowRightLeft className="w-3.5 h-3.5 text-sky-700" />
            Cross-Border (Double Tax Relief / FTC)
          </button>
        </div>

        <span className="text-xs text-slate-600 font-medium flex items-center gap-1">
          <Globe className="w-3.5 h-3.5 text-sky-700" /> 15+ Tax Systems Supported
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form Controls */}
        <div className="lg:col-span-6 space-y-5">
          {/* Salary Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Annual Gross Salary ({calcMode === 'single' ? currentProfile.currency : 'USD $'})
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 font-semibold text-base">
                {calcMode === 'single' ? currentProfile.currencySymbol : '$'}
              </span>
              <input
                type="number"
                min="0"
                step="1000"
                value={grossSalary}
                onChange={(e) =>
                  setGrossSalary(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))
                }
                className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-semibold text-base focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-600"
                placeholder="e.g. 100000"
              />
            </div>

            {/* Quick Presets */}
            <div className="flex flex-wrap gap-1.5 mt-2.5">
              <span className="text-[11px] text-slate-600 font-medium self-center mr-1">Quick:</span>
              {salaryPresets.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setGrossSalary(preset)}
                  className={`text-xs px-2.5 py-1 rounded-md border font-medium transition-colors ${
                    numericGross === preset
                      ? 'bg-sky-50 border-sky-300 text-sky-800 font-semibold'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {currentProfile.currencySymbol}
                  {preset / 1000}k
                </button>
              ))}
            </div>
          </div>

          {/* Primary Country Selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              {calcMode === 'single' ? 'Tax Residence Country' : 'Country of Tax Residence (Home)'}
            </label>
            <select
              value={selectedCountry}
              onChange={(e) => {
                setSelectedCountry(e.target.value);
                setUseExpatRegime(false);
              }}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-600"
            >
              {Object.values(COUNTRY_PROFILES).map((country) => (
                <option key={country.code} value={country.code}>
                  {country.flag} {country.name} ({country.currency})
                </option>
              ))}
            </select>
          </div>

          {/* Special Expat Regime Toggle (if supported) */}
          {currentProfile.hasExpatRegime && (
            <div className="p-3.5 bg-sky-50/60 border border-sky-200 rounded-xl">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={useExpatRegime}
                  onChange={(e) => setUseExpatRegime(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-slate-300 text-sky-700 focus:ring-sky-600"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-sky-900">
                      {currentProfile.expatRegimeName}
                    </span>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.2 bg-sky-200 text-sky-800 rounded">
                      Expat Perk
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 mt-0.5 leading-relaxed">
                    {currentProfile.expatRegimeDescription}
                  </p>
                </div>
              </label>
            </div>
          )}

          {/* Dual-Country Source Country Selection (when in dual mode) */}
          {calcMode === 'dual' && (
            <div className="space-y-4 pt-4 border-t border-slate-200">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Income Source Country (Foreign Host Country)
                </label>
                <select
                  value={sourceCountry}
                  onChange={(e) => {
                    setSourceCountry(e.target.value);
                    setUseSourceExpatRegime(false);
                  }}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-600"
                >
                  {Object.values(COUNTRY_PROFILES).map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.flag} {country.name} ({country.currency})
                    </option>
                  ))}
                </select>
                <p className="text-xs text-slate-600 mt-1">
                  Source country holds primary taxing rights. Home country grants a credit up to its own tax liability.
                </p>
              </div>

              {sourceProfile.hasExpatRegime && (
                <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={useSourceExpatRegime}
                      onChange={(e) => setUseSourceExpatRegime(e.target.checked)}
                      className="mt-0.5 h-4 w-4 rounded border-slate-300 text-amber-700 focus:ring-amber-600"
                    />
                    <div>
                      <span className="text-xs font-bold text-amber-900">
                        Apply {sourceProfile.name} Expat Regime ({sourceProfile.expatRegimeName})
                      </span>
                    </div>
                  </label>
                </div>
              )}
            </div>
          )}

          {/* Action buttons */}
          <CalculatorActions
            resultText={getResultText()}
            onReset={handleReset}
          />
        </div>

        {/* Right Column: Output KPI Dashboard */}
        <div className="lg:col-span-6 space-y-6">
          {calcMode === 'single' ? (
            /* Single Country Summary */
            <div className="space-y-4">
              {/* Primary Net Take-Home Card */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-6 shadow-sm border border-slate-700">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    {currentProfile.flag} {currentProfile.name} Net Take-Home
                  </span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                    {formatPercent(100 - singleResult.effectiveTaxRate, 1)} Kept
                  </span>
                </div>

                <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  {currentProfile.currencySymbol}
                  {formatNumber(singleResult.netIncomeLocal, 0)}
                  <span className="text-sm font-normal text-slate-400 ml-1.5">/year</span>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-700/80 flex items-center justify-between text-sm">
                  <span className="text-slate-300">Monthly Net Pay:</span>
                  <span className="text-white font-bold">
                    {currentProfile.currencySymbol}
                    {formatNumber(singleResult.monthlyNetLocal, 0)}/mo
                  </span>
                </div>

                {currentProfile.currency !== 'USD' && (
                  <div className="text-xs text-slate-400 mt-1">
                    ≈ ${formatNumber(singleResult.netIncomeUSD, 0)} USD/year (${formatNumber(singleResult.monthlyNetUSD, 0)}/mo)
                  </div>
                )}
              </div>

              {/* Stacked Visual Bar */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <div className="flex justify-between items-center text-xs font-semibold text-slate-700 mb-2">
                  <span>Salary Allocation</span>
                  <span>Effective Tax: {formatPercent(singleResult.effectiveTaxRate, 1)}</span>
                </div>

                {/* Progress bar */}
                <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden flex">
                  <div
                    style={{ width: `${Math.max(0, 100 - singleResult.effectiveTaxRate)}%` }}
                    className="bg-emerald-600 h-full transition-all"
                    title={`Take-Home: ${formatPercent(100 - singleResult.effectiveTaxRate, 1)}`}
                  />
                  <div
                    style={{ width: `${singleResult.incomeTaxRate}%` }}
                    className="bg-rose-500 h-full transition-all"
                    title={`Income Tax: ${formatPercent(singleResult.incomeTaxRate, 1)}`}
                  />
                  <div
                    style={{ width: `${singleResult.socialSecurityRate}%` }}
                    className="bg-sky-500 h-full transition-all"
                    title={`Social Security: ${formatPercent(singleResult.socialSecurityRate, 1)}`}
                  />
                </div>

                {/* Bar Legend */}
                <div className="flex flex-wrap gap-4 mt-3 text-xs text-slate-600 font-medium">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                    <span>Net Pay ({formatPercent(100 - singleResult.effectiveTaxRate, 1)})</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                    <span>Income Tax ({formatPercent(singleResult.incomeTaxRate, 1)})</span>
                  </div>
                  {singleResult.socialSecurityLocal > 0 && (
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-sky-500" />
                      <span>Social/Health ({formatPercent(singleResult.socialSecurityRate, 1)})</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Line-item Deductions Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="text-[11px] font-semibold uppercase text-slate-600 tracking-wider block">
                    Income Tax
                  </span>
                  <div className="text-lg font-bold text-slate-900 mt-0.5">
                    {currentProfile.currencySymbol}
                    {formatNumber(singleResult.incomeTaxLocal, 0)}
                  </div>
                  <span className="text-xs text-slate-600">
                    {formatPercent(singleResult.incomeTaxRate, 1)} effective
                  </span>
                </div>

                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="text-[11px] font-semibold uppercase text-slate-600 tracking-wider block">
                    Social & Pension
                  </span>
                  <div className="text-lg font-bold text-slate-900 mt-0.5">
                    {currentProfile.currencySymbol}
                    {formatNumber(singleResult.socialSecurityLocal, 0)}
                  </div>
                  <span className="text-xs text-slate-600">
                    {formatPercent(singleResult.socialSecurityRate, 1)} effective
                  </span>
                </div>
              </div>
            </div>
          ) : (
            /* Cross-Border Dual Country Summary */
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-6 shadow-sm border border-slate-700">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Net Take-Home Pay (Worldwide)
                  </span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                    After Foreign Tax Credit
                  </span>
                </div>

                <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  ${formatNumber(dualResult.netTakeHomeUSD, 0)}
                  <span className="text-sm font-normal text-slate-400 ml-1.5">USD/year</span>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-700/80 flex items-center justify-between text-sm">
                  <span className="text-slate-300">Monthly Net Income:</span>
                  <span className="text-white font-bold">
                    ${formatNumber(dualResult.netTakeHomeUSD / 12, 0)} USD/mo
                  </span>
                </div>
              </div>

              {/* Double Tax Relief Highlight */}
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
                  <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
                  Double Taxation Prevented
                </div>
                <p className="text-xs text-emerald-800 mt-1 leading-relaxed">
                  Under the Double Tax Avoidance Treaty (DTT), you claim a <strong>Foreign Tax Credit of ${formatNumber(dualResult.foreignTaxCreditUSD, 0)}</strong>, saving you from paying taxes twice on the same earned income.
                </p>
              </div>

              {/* Cross-border Breakdown Table */}
              <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
                <div className="bg-slate-100 px-3.5 py-2 font-semibold text-slate-700 border-b border-slate-200">
                  Cross-Border Tax Flow Breakdown
                </div>
                <div className="divide-y divide-slate-100 bg-white">
                  <div className="px-3.5 py-2 flex justify-between">
                    <span className="text-slate-600">Source Country ({sourceProfile.name}) Tax Paid:</span>
                    <span className="font-semibold text-slate-900">
                      ${formatNumber(dualResult.sourceTax?.incomeTaxUSD || 0, 0)} USD
                    </span>
                  </div>
                  <div className="px-3.5 py-2 flex justify-between">
                    <span className="text-slate-600">Residence Country ({currentProfile.name}) Tax Base:</span>
                    <span className="font-semibold text-slate-900">
                      ${formatNumber(dualResult.residenceTax.incomeTaxUSD, 0)} USD
                    </span>
                  </div>
                  <div className="px-3.5 py-2 flex justify-between text-emerald-700 font-semibold bg-emerald-50/50">
                    <span>Less: Foreign Tax Credit (FTC):</span>
                    <span>-${formatNumber(dualResult.foreignTaxCreditUSD, 0)} USD</span>
                  </div>
                  <div className="px-3.5 py-2 flex justify-between font-bold text-slate-900">
                    <span>Total Net Worldwide Tax:</span>
                    <span>${formatNumber(dualResult.netTaxPaidUSD, 0)} USD</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Global Take-Home Comparison Table */}
      <div className="mt-10 pt-8 border-t border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-sky-700" />
              Global Take-Home Pay Comparison (for ${formatNumber(singleResult.grossIncomeUSD, 0)} USD Gross)
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">
              Ranked by net take-home salary across top expat, digital nomad, and executive destinations.
            </p>
          </div>
          <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md shrink-0">
            Base: ${formatNumber(singleResult.grossIncomeUSD, 0)} USD
          </span>
        </div>

        <div className="overflow-x-auto border border-slate-200 rounded-xl">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold">
                <th className="py-2.5 px-3">Country</th>
                <th className="py-2.5 px-3">Effective Tax %</th>
                <th className="py-2.5 px-3">Net Annual Pay (USD)</th>
                <th className="py-2.5 px-3">Net Monthly Pay</th>
                <th className="py-2.5 px-3">Difference vs {currentProfile.name}</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {comparisons.map((item) => {
                const isSelected = item.countryCode === selectedCountry;
                const isBetter = item.differenceVsSelectedUSD > 0;
                return (
                  <tr
                    key={item.countryCode}
                    className={`transition-colors ${
                      isSelected ? 'bg-sky-50/60 font-medium' : 'hover:bg-slate-50/70'
                    }`}
                  >
                    <td className="py-2.5 px-3 flex items-center gap-2 font-semibold text-slate-900">
                      <span className="text-base">{item.flag}</span>
                      <span>{item.countryName}</span>
                      {isSelected && (
                        <span className="text-[10px] uppercase px-1.5 py-0.2 bg-sky-200 text-sky-900 rounded font-bold">
                          Selected
                        </span>
                      )}
                    </td>
                    <td className="py-2.5 px-3 text-slate-700">
                      <span
                        className={`inline-block px-1.5 py-0.5 rounded font-semibold text-[11px] ${
                          item.effectiveTaxRate === 0
                            ? 'bg-emerald-100 text-emerald-800'
                            : item.effectiveTaxRate < 20
                            ? 'bg-sky-100 text-sky-800'
                            : item.effectiveTaxRate < 35
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {formatPercent(item.effectiveTaxRate, 1)}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 font-bold text-slate-900">
                      ${formatNumber(item.netAnnualUSD, 0)}
                    </td>
                    <td className="py-2.5 px-3 text-slate-600 font-medium">
                      ${formatNumber(item.netMonthlyUSD, 0)}/mo
                    </td>
                    <td className="py-2.5 px-3 font-semibold">
                      {isSelected ? (
                        <span className="text-slate-500">—</span>
                      ) : (
                        <span className={isBetter ? 'text-emerald-700' : 'text-rose-700'}>
                          {isBetter ? '+' : ''}${formatNumber(item.differenceVsSelectedUSD, 0)}/yr
                        </span>
                      )}
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      {!isSelected ? (
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedCountry(item.countryCode);
                            setUseExpatRegime(false);
                          }}
                          className="px-2.5 py-1 text-[11px] font-semibold text-sky-700 bg-sky-50 hover:bg-sky-100 border border-sky-200 rounded transition-colors"
                        >
                          Select
                        </button>
                      ) : (
                        <span className="text-[11px] text-emerald-700 font-bold">Active</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
