'use client';

import React, { useState } from 'react';
import { calculateOvertime } from '@/lib/calculators/payroll';
import { formatCurrency } from '@/lib/formatting';
import { CalculatorActions } from '@/components/calculator/CalculatorActions';
import { Clock, DollarSign, TrendingUp, Briefcase } from 'lucide-react';

export const OvertimeCalculatorWidget: React.FC = () => {
  const [hourlyRate, setHourlyRate] = useState<number | ''>(28);
  const [regularHours, setRegularHours] = useState<number | ''>(40);
  const [overtimeHours, setOvertimeHours] = useState<number | ''>(10);
  const [doubleTimeHours, setDoubleTimeHours] = useState<number | ''>(2);

  const res = calculateOvertime(
    Number(hourlyRate) || 0,
    Number(regularHours) || 0,
    Number(overtimeHours) || 0,
    Number(doubleTimeHours) || 0
  );

  const getResultText = () => {
    return `Overtime Pay Breakdown: Regular Pay: ${formatCurrency(res.regularPay)} (${regularHours}h @ ${formatCurrency(
      Number(hourlyRate) || 0
    )}). Overtime (1.5x): ${formatCurrency(res.overtimePay)} (${overtimeHours}h @ ${formatCurrency(
      res.overtimeRate
    )}). Double Time (2.0x): ${formatCurrency(res.doubleTimePay)} (${doubleTimeHours}h @ ${formatCurrency(
      res.doubleTimeRate
    )}). Total Gross Pay: ${formatCurrency(res.totalGrossPay)} (Effective Rate: ${formatCurrency(
      res.effectiveHourlyRate
    )}/hr).`;
  };

  const handleReset = () => {
    setHourlyRate(28);
    setRegularHours(40);
    setOvertimeHours(10);
    setDoubleTimeHours(2);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Form Inputs */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Base Hourly Wage ($/hour)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">
                $
              </span>
              <input
                type="number"
                min={0}
                step={0.5}
                value={hourlyRate}
                onChange={e => setHourlyRate(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full pl-8 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white"
                placeholder="28"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2.5">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Regular (1.0x)
              </label>
              <input
                type="number"
                min={0}
                value={regularHours}
                onChange={e => setRegularHours(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white text-center font-bold"
                placeholder="40"
              />
              <span className="text-[10px] text-slate-400 text-center block mt-0.5">Hours</span>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Overtime (1.5x)
              </label>
              <input
                type="number"
                min={0}
                value={overtimeHours}
                onChange={e => setOvertimeHours(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white text-center font-bold text-amber-900"
                placeholder="10"
              />
              <span className="text-[10px] text-slate-400 text-center block mt-0.5">Hours</span>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Double (2.0x)
              </label>
              <input
                type="number"
                min={0}
                value={doubleTimeHours}
                onChange={e => setDoubleTimeHours(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white text-center font-bold text-indigo-900"
                placeholder="2"
              />
              <span className="text-[10px] text-slate-400 text-center block mt-0.5">Hours</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/70 text-xs text-amber-900 space-y-1">
            <span className="font-bold text-amber-950 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-600" />
              FLSA Overtime Law
            </span>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Under the Federal Fair Labor Standards Act (FLSA), covered non-exempt employees must receive overtime pay for hours worked over 40 in a workweek at a rate of at least 1.5 times regular rates.
            </p>
          </div>

          <CalculatorActions resultText={getResultText()} onReset={handleReset} />
        </div>

        {/* Results Display */}
        <div className="bg-amber-50/40 border border-amber-100 rounded-xl p-6 flex flex-col justify-between h-full">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
              Total Gross Earnings
            </span>

            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-black text-amber-950 tracking-tight">
                {formatCurrency(res.totalGrossPay)}
              </span>
              <span className="text-xs font-semibold text-slate-500">
                ({Number(regularHours || 0) + Number(overtimeHours || 0) + Number(doubleTimeHours || 0)} Total Hours)
              </span>
            </div>

            <div className="mt-5 space-y-2 text-xs">
              <div className="p-3 bg-white rounded-lg border border-amber-100 flex justify-between items-center">
                <div>
                  <strong className="text-slate-800 block">Regular Pay (1.0x)</strong>
                  <span className="text-[11px] text-slate-500">
                    {regularHours || 0} hrs @ {formatCurrency(Number(hourlyRate) || 0)}/hr
                  </span>
                </div>
                <span className="font-bold text-slate-900 text-sm">{formatCurrency(res.regularPay)}</span>
              </div>

              <div className="p-3 bg-white rounded-lg border border-amber-100 flex justify-between items-center">
                <div>
                  <strong className="text-amber-900 block">Overtime Pay (1.5x)</strong>
                  <span className="text-[11px] text-slate-500">
                    {overtimeHours || 0} hrs @ {formatCurrency(res.overtimeRate)}/hr
                  </span>
                </div>
                <span className="font-bold text-amber-800 text-sm">+{formatCurrency(res.overtimePay)}</span>
              </div>

              {Number(doubleTimeHours) > 0 && (
                <div className="p-3 bg-white rounded-lg border border-amber-100 flex justify-between items-center">
                  <div>
                    <strong className="text-indigo-900 block">Double Time Pay (2.0x)</strong>
                    <span className="text-[11px] text-slate-500">
                      {doubleTimeHours} hrs @ {formatCurrency(res.doubleTimeRate)}/hr
                    </span>
                  </div>
                  <span className="font-bold text-indigo-800 text-sm">+{formatCurrency(res.doubleTimePay)}</span>
                </div>
              )}
            </div>

            <div className="mt-5 p-3.5 bg-amber-100/60 rounded-xl border border-amber-200/80 flex justify-between items-center text-xs">
              <span className="text-amber-950 font-medium">Blended Effective Hourly Rate:</span>
              <strong className="text-base font-extrabold text-amber-950">
                {formatCurrency(res.effectiveHourlyRate)}/hr
              </strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
