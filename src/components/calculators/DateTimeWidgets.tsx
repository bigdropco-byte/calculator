'use client';

import React, { useState } from 'react';
import {
  calculateDateDifference,
  calculateDateAddSubtract,
  checkLeapYear,
  convertMilitaryTime,
  secondsToTime,
  calculateAverageTime,
} from '@/lib/calculators/dateTimeEngines';
import { formatNumber } from '@/lib/formatting';
import { CalculatorActions } from '@/components/calculator/CalculatorActions';
import { Calendar, Clock, ArrowRight, Plus, Minus, CheckCircle, HelpCircle, CalendarDays, Timer, Sun, Moon } from 'lucide-react';

// ==========================================
// 1. DATE CALCULATOR
// ==========================================
export const DateCalculatorWidget: React.FC = () => {
  const today = new Date().toISOString().split('T')[0];
  const [mode, setMode] = useState<'addSubtract' | 'difference'>('addSubtract');
  const [startDate, setStartDate] = useState<string>(today);
  const [operation, setOperation] = useState<'add' | 'subtract'>('add');
  const [years, setYears] = useState<number>(0);
  const [months, setMonths] = useState<number>(0);
  const [weeks, setWeeks] = useState<number>(0);
  const [days, setDays] = useState<number>(30);

  // For difference mode
  const [endDate, setEndDate] = useState<string>(new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0]);
  const [includeEnd, setIncludeEnd] = useState<boolean>(false);

  const addSubResult = calculateDateAddSubtract(startDate, years, months, weeks, days, operation);
  const diffResult = calculateDateDifference(startDate, endDate, includeEnd);

  const getResultText = () => {
    if (mode === 'addSubtract') {
      return `Date ${operation === 'add' ? 'plus' : 'minus'} ${years}y, ${months}m, ${weeks}w, ${days}d from ${startDate} = ${addSubResult.formattedDate} (${addSubResult.dayOfWeek}).`;
    }
    return `Difference between ${startDate} and ${endDate}: ${diffResult.totalDays} days (${diffResult.summaryText}), ${diffResult.businessDays} business days.`;
  };

  const handleReset = () => {
    setStartDate(today);
    setYears(0);
    setMonths(0);
    setWeeks(0);
    setDays(30);
    setOperation('add');
    setEndDate(new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0]);
    setIncludeEnd(false);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      {/* Mode switcher */}
      <div className="flex gap-2 p-1 bg-slate-100 rounded-xl mb-6 max-w-sm">
        <button
          type="button"
          onClick={() => setMode('addSubtract')}
          className={`flex-1 py-2 px-3 text-xs font-bold rounded-lg transition-all ${
            mode === 'addSubtract' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Add / Subtract Days
        </button>
        <button
          type="button"
          onClick={() => setMode('difference')}
          className={`flex-1 py-2 px-3 text-xs font-bold rounded-lg transition-all ${
            mode === 'difference' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Days Between Dates
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {mode === 'addSubtract' ? (
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Operation
                </label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setOperation('add')}
                    className={`flex-1 py-2 px-3 rounded-lg border text-sm font-semibold flex items-center justify-center gap-2 ${
                      operation === 'add'
                        ? 'bg-indigo-50 border-indigo-300 text-indigo-700'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Plus className="w-4 h-4" /> Add (+)
                  </button>
                  <button
                    type="button"
                    onClick={() => setOperation('subtract')}
                    className={`flex-1 py-2 px-3 rounded-lg border text-sm font-semibold flex items-center justify-center gap-2 ${
                      operation === 'subtract'
                        ? 'bg-indigo-50 border-indigo-300 text-indigo-700'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Minus className="w-4 h-4" /> Subtract (-)
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Years</label>
                  <input
                    type="number"
                    min="0"
                    value={years || ''}
                    onChange={e => setYears(Math.max(0, parseInt(e.target.value) || 0))}
                    placeholder="0"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Months</label>
                  <input
                    type="number"
                    min="0"
                    value={months || ''}
                    onChange={e => setMonths(Math.max(0, parseInt(e.target.value) || 0))}
                    placeholder="0"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Weeks</label>
                  <input
                    type="number"
                    min="0"
                    value={weeks || ''}
                    onChange={e => setWeeks(Math.max(0, parseInt(e.target.value) || 0))}
                    placeholder="0"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Days</label>
                  <input
                    type="number"
                    min="0"
                    value={days || ''}
                    onChange={e => setDays(Math.max(0, parseInt(e.target.value) || 0))}
                    placeholder="0"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  End Date
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={e => setEndDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="includeEndDate"
                  checked={includeEnd}
                  onChange={e => setIncludeEnd(e.target.checked)}
                  className="w-4 h-4 text-indigo-600 rounded border-slate-300"
                />
                <label htmlFor="includeEndDate" className="text-xs text-slate-700 cursor-pointer font-medium">
                  Include end date in calculation (+1 day)
                </label>
              </div>
            </>
          )}

          <CalculatorActions resultText={getResultText()} onReset={handleReset} />
        </div>

        {/* Results */}
        <div className="bg-indigo-50/60 border border-indigo-100 rounded-xl p-6 flex flex-col justify-between h-full">
          {mode === 'addSubtract' ? (
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-800">
                Calculated Date
              </span>
              <div className="mt-2">
                <div className="text-3xl sm:text-4xl font-extrabold text-indigo-950 tracking-tight">
                  {addSubResult.formattedDate}
                </div>
                <div className="mt-1 text-base font-semibold text-indigo-700">
                  {addSubResult.dayOfWeek}
                </div>
                <p className="text-xs text-slate-600 mt-3">
                  ISO Format: <code className="bg-white px-2 py-0.5 rounded border border-indigo-200">{addSubResult.targetDate}</code>
                </p>
              </div>

              <div className="mt-6 p-4 bg-white border border-indigo-200/80 rounded-xl space-y-2 text-xs text-slate-700">
                <div className="flex justify-between">
                  <span className="text-slate-500">Starting point:</span>
                  <span className="font-semibold">{startDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Operation:</span>
                  <span className="font-semibold capitalize">{operation} {years}y {months}m {weeks}w {days}d</span>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-800">
                Total Duration
              </span>
              <div className="mt-2">
                <div className="text-4xl sm:text-5xl font-extrabold text-indigo-950 tracking-tight">
                  {formatNumber(diffResult.totalDays)}{' '}
                  <span className="text-lg font-bold text-indigo-800">days</span>
                </div>
                <p className="text-xs text-slate-600 mt-2 font-medium">
                  Equivalent to <strong>{diffResult.summaryText}</strong>
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-6">
                <div className="p-3 bg-white border border-indigo-200 rounded-lg">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase block">Business Days</span>
                  <p className="text-2xl font-bold text-slate-900">{formatNumber(diffResult.businessDays)}</p>
                  <span className="text-[11px] text-slate-400">Mon – Fri</span>
                </div>
                <div className="p-3 bg-white border border-indigo-200 rounded-lg">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase block">Weekend Days</span>
                  <p className="text-2xl font-bold text-slate-900">{formatNumber(diffResult.weekendDays)}</p>
                  <span className="text-[11px] text-slate-400">Sat & Sun</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 2. TIME CALCULATOR & TIME ADDITION / SUBTRACTION
// ==========================================
export const TimeCalculatorWidget: React.FC = () => {
  const [h1, setH1] = useState<number>(2);
  const [m1, setM1] = useState<number>(45);
  const [s1, setS1] = useState<number>(0);
  const [op, setOp] = useState<'+' | '-'>('+');
  const [h2, setH2] = useState<number>(1);
  const [m2, setM2] = useState<number>(30);
  const [s2, setS2] = useState<number>(0);

  const totalSec1 = h1 * 3600 + m1 * 60 + s1;
  const totalSec2 = h2 * 3600 + m2 * 60 + s2;
  const resultSec = op === '+' ? totalSec1 + totalSec2 : Math.max(0, totalSec1 - totalSec2);

  const res = secondsToTime(resultSec);

  const getResultText = () => {
    return `${h1}h ${m1}m ${s1}s ${op} ${h2}h ${m2}m ${s2}s = ${res.formattedHms} (${res.decimalHours.toFixed(2)} hours)`;
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Time 1
            </label>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <span className="text-[11px] text-slate-500 block mb-1">Hours</span>
                <input
                  type="number"
                  min="0"
                  value={h1}
                  onChange={e => setH1(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
                />
              </div>
              <div>
                <span className="text-[11px] text-slate-500 block mb-1">Minutes</span>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={m1}
                  onChange={e => setM1(Math.min(59, Math.max(0, parseInt(e.target.value) || 0)))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
                />
              </div>
              <div>
                <span className="text-[11px] text-slate-500 block mb-1">Seconds</span>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={s1}
                  onChange={e => setS1(Math.min(59, Math.max(0, parseInt(e.target.value) || 0)))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <button
              type="button"
              onClick={() => setOp('+')}
              className={`px-6 py-2 rounded-lg font-bold text-sm border flex items-center gap-2 ${
                op === '+' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-slate-50 text-slate-700 border-slate-200'
              }`}
            >
              <Plus className="w-4 h-4" /> Add (+)
            </button>
            <button
              type="button"
              onClick={() => setOp('-')}
              className={`px-6 py-2 rounded-lg font-bold text-sm border flex items-center gap-2 ${
                op === '-' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-slate-50 text-slate-700 border-slate-200'
              }`}
            >
              <Minus className="w-4 h-4" /> Subtract (-)
            </button>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Time 2
            </label>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <span className="text-[11px] text-slate-500 block mb-1">Hours</span>
                <input
                  type="number"
                  min="0"
                  value={h2}
                  onChange={e => setH2(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
                />
              </div>
              <div>
                <span className="text-[11px] text-slate-500 block mb-1">Minutes</span>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={m2}
                  onChange={e => setM2(Math.min(59, Math.max(0, parseInt(e.target.value) || 0)))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
                />
              </div>
              <div>
                <span className="text-[11px] text-slate-500 block mb-1">Seconds</span>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={s2}
                  onChange={e => setS2(Math.min(59, Math.max(0, parseInt(e.target.value) || 0)))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
                />
              </div>
            </div>
          </div>

          <CalculatorActions
            resultText={getResultText()}
            onReset={() => {
              setH1(2);
              setM1(45);
              setS1(0);
              setH2(1);
              setM2(30);
              setS2(0);
              setOp('+');
            }}
          />
        </div>

        <div className="bg-indigo-50/60 border border-indigo-100 rounded-xl p-6 flex flex-col justify-between h-full">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-800">
              Total Resulting Time
            </span>
            <div className="mt-3">
              <div className="text-4xl sm:text-5xl font-extrabold text-indigo-950 font-mono tracking-tight">
                {res.formattedHms}
              </div>
              <p className="text-xs text-slate-600 mt-2">
                {res.hours} hour{res.hours !== 1 ? 's' : ''}, {res.minutes} minute{res.minutes !== 1 ? 's' : ''}, {res.seconds} second{res.seconds !== 1 ? 's' : ''}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-6">
              <div className="p-3 bg-white border border-indigo-200 rounded-lg">
                <span className="text-[11px] font-semibold text-slate-500 uppercase block">Decimal Hours</span>
                <p className="text-2xl font-bold text-slate-900">{res.decimalHours.toFixed(4)}</p>
                <span className="text-[11px] text-slate-400">hrs</span>
              </div>
              <div className="p-3 bg-white border border-indigo-200 rounded-lg">
                <span className="text-[11px] font-semibold text-slate-500 uppercase block">Total Seconds</span>
                <p className="text-2xl font-bold text-slate-900">{formatNumber(res.totalSeconds)}</p>
                <span className="text-[11px] text-slate-400">secs</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 3. DATE TIME CALCULATOR
// ==========================================
export const DateTimeCalculatorWidget: React.FC = () => {
  const now = new Date();
  const pad = (n: number) => n.toString().padStart(2, '0');
  const defaultDt1 = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}`;
  
  const future = new Date(now.getTime() + 48 * 3600000);
  const defaultDt2 = `${future.getFullYear()}-${pad(future.getMonth() + 1)}-${pad(future.getDate())}T${pad(future.getHours())}:${pad(future.getMinutes())}`;

  const [dt1, setDt1] = useState<string>(defaultDt1);
  const [dt2, setDt2] = useState<string>(defaultDt2);

  const t1 = new Date(dt1).getTime();
  const t2 = new Date(dt2).getTime();
  const diffMs = Math.abs(t2 - t1);
  const diffSec = Math.floor(diffMs / 1000);

  const days = Math.floor(diffSec / 86400);
  const remSecAfterDays = diffSec % 86400;
  const hours = Math.floor(remSecAfterDays / 3600);
  const minutes = Math.floor((remSecAfterDays % 3600) / 60);
  const seconds = remSecAfterDays % 60;

  const totalHours = (diffSec / 3600).toFixed(2);
  const totalMinutes = Math.floor(diffSec / 60);

  const getResultText = () => {
    return `Span between ${dt1} and ${dt2}: ${days} days, ${hours} hours, ${minutes} minutes (${totalHours} total hours).`;
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Start Date & Time
            </label>
            <input
              type="datetime-local"
              value={dt1}
              onChange={e => setDt1(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              End Date & Time
            </label>
            <input
              type="datetime-local"
              value={dt2}
              onChange={e => setDt2(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
            />
          </div>

          <CalculatorActions
            resultText={getResultText()}
            onReset={() => {
              setDt1(defaultDt1);
              setDt2(defaultDt2);
            }}
          />
        </div>

        <div className="bg-indigo-50/60 border border-indigo-100 rounded-xl p-6 flex flex-col justify-between h-full">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-800">
              Total Elapsed Time
            </span>
            <div className="mt-3">
              <div className="text-3xl sm:text-4xl font-extrabold text-indigo-950 tracking-tight">
                {days}d {hours}h {minutes}m
              </div>
              <p className="text-xs text-slate-600 mt-2 font-medium">
                {days} days, {hours} hours, {minutes} minutes, {seconds} seconds
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-6">
              <div className="p-3 bg-white border border-indigo-200 rounded-lg">
                <span className="text-[11px] font-semibold text-slate-500 uppercase block">Total Hours</span>
                <p className="text-2xl font-bold text-slate-900">{totalHours}</p>
                <span className="text-[11px] text-slate-400">hours</span>
              </div>
              <div className="p-3 bg-white border border-indigo-200 rounded-lg">
                <span className="text-[11px] font-semibold text-slate-500 uppercase block">Total Minutes</span>
                <p className="text-2xl font-bold text-slate-900">{formatNumber(totalMinutes)}</p>
                <span className="text-[11px] text-slate-400">mins</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 4. TIME ADDITION / SUBTRACTION CALCULATOR
// ==========================================
export const TimeAdditionSubtractionCalculatorWidget: React.FC = () => {
  const [times, setTimes] = useState<{ id: number; hours: number; minutes: number; op: '+' | '-' }[]>([
    { id: 1, hours: 2, minutes: 30, op: '+' },
    { id: 2, hours: 1, minutes: 45, op: '+' },
    { id: 3, hours: 0, minutes: 40, op: '-' },
  ]);

  const addRow = () => {
    setTimes(prev => [...prev, { id: Date.now(), hours: 1, minutes: 0, op: '+' }]);
  };

  const removeRow = (id: number) => {
    if (times.length > 1) {
      setTimes(prev => prev.filter(t => t.id !== id));
    }
  };

  const updateRow = (id: number, field: string, val: any) => {
    setTimes(prev =>
      prev.map(t => (t.id === id ? { ...t, [field]: val } : t))
    );
  };

  let totalMinutes = 0;
  times.forEach(t => {
    const mins = t.hours * 60 + t.minutes;
    if (t.op === '+') totalMinutes += mins;
    else totalMinutes -= mins;
  });

  const isNegative = totalMinutes < 0;
  const absMinutes = Math.abs(totalMinutes);
  const outHours = Math.floor(absMinutes / 60);
  const outMins = absMinutes % 60;
  const outDecimal = (totalMinutes / 60).toFixed(2);

  const getResultText = () => {
    return `Calculated cumulative time: ${isNegative ? '-' : ''}${outHours}h ${outMins}m (${outDecimal} hrs)`;
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Time Entries
            </span>
            <button
              type="button"
              onClick={addRow}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> Add Time Row
            </button>
          </div>

          <div className="space-y-2.5">
            {times.map((item, idx) => (
              <div key={item.id} className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                <select
                  value={item.op}
                  onChange={e => updateRow(item.id, 'op', e.target.value)}
                  className="px-2 py-1.5 bg-white border border-slate-300 rounded font-bold text-indigo-700 text-sm"
                >
                  <option value="+">+</option>
                  <option value="-">-</option>
                </select>
                <div className="flex items-center gap-1 flex-1">
                  <input
                    type="number"
                    min="0"
                    value={item.hours}
                    onChange={e => updateRow(item.id, 'hours', Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-16 px-2 py-1.5 bg-white border border-slate-300 rounded text-center text-sm font-semibold"
                  />
                  <span className="text-xs text-slate-500 font-medium">h</span>
                  <input
                    type="number"
                    min="0"
                    max="59"
                    value={item.minutes}
                    onChange={e => updateRow(item.id, 'minutes', Math.min(59, Math.max(0, parseInt(e.target.value) || 0)))}
                    className="w-16 px-2 py-1.5 bg-white border border-slate-300 rounded text-center text-sm font-semibold"
                  />
                  <span className="text-xs text-slate-500 font-medium">m</span>
                </div>
                {times.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeRow(item.id)}
                    className="text-rose-500 hover:text-rose-700 p-1 text-xs"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>

          <CalculatorActions
            resultText={getResultText()}
            onReset={() => {
              setTimes([
                { id: 1, hours: 2, minutes: 30, op: '+' },
                { id: 2, hours: 1, minutes: 45, op: '+' },
              ]);
            }}
          />
        </div>

        <div className="bg-indigo-50/60 border border-indigo-100 rounded-xl p-6 flex flex-col justify-between h-full">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-800">
              Net Cumulative Duration
            </span>
            <div className="mt-3">
              <div className="text-4xl sm:text-5xl font-extrabold text-indigo-950 font-mono tracking-tight">
                {isNegative ? '-' : ''}{outHours}h {outMins}m
              </div>
              <p className="text-xs text-slate-600 mt-2 font-medium">
                Total Decimal: <strong>{outDecimal} hours</strong>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-6">
              <div className="p-3 bg-white border border-indigo-200 rounded-lg">
                <span className="text-[11px] font-semibold text-slate-500 uppercase block">Total Minutes</span>
                <p className="text-2xl font-bold text-slate-900">{formatNumber(totalMinutes)}</p>
                <span className="text-[11px] text-slate-400">minutes</span>
              </div>
              <div className="p-3 bg-white border border-indigo-200 rounded-lg">
                <span className="text-[11px] font-semibold text-slate-500 uppercase block">Total Seconds</span>
                <p className="text-2xl font-bold text-slate-900">{formatNumber(totalMinutes * 60)}</p>
                <span className="text-[11px] text-slate-400">seconds</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 5. HOURS CALCULATOR
// ==========================================
export const HoursCalculatorWidget: React.FC = () => {
  const [startTime, setStartTime] = useState<string>('09:00');
  const [endTime, setEndTime] = useState<string>('17:30');
  const [breakMins, setBreakMins] = useState<number>(30);
  const [hourlyWage, setHourlyWage] = useState<number>(25);

  const [sH, sM] = startTime.split(':').map(Number);
  const [eH, eM] = endTime.split(':').map(Number);

  let rawMinutes = (eH * 60 + eM) - (sH * 60 + sM);
  if (rawMinutes < 0) rawMinutes += 24 * 60; // Overnight shift

  const workedMinutes = Math.max(0, rawMinutes - breakMins);
  const hours = Math.floor(workedMinutes / 60);
  const minutes = workedMinutes % 60;
  const decimalHours = workedMinutes / 60;
  const grossPay = decimalHours * hourlyWage;

  const getResultText = () => {
    return `Hours worked from ${startTime} to ${endTime} (${breakMins}m break): ${hours}h ${minutes}m (${decimalHours.toFixed(2)} decimal hours). Gross pay: $${grossPay.toFixed(2)}.`;
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Start Time
              </label>
              <input
                type="time"
                value={startTime}
                onChange={e => setStartTime(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                End Time
              </label>
              <input
                type="time"
                value={endTime}
                onChange={e => setEndTime(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Unpaid Break (Minutes)
            </label>
            <input
              type="number"
              min="0"
              max="240"
              value={breakMins}
              onChange={e => setBreakMins(Math.max(0, parseInt(e.target.value) || 0))}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Hourly Wage ($ optional)
            </label>
            <input
              type="number"
              min="0"
              step="0.5"
              value={hourlyWage || ''}
              onChange={e => setHourlyWage(Math.max(0, parseFloat(e.target.value) || 0))}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
            />
          </div>

          <CalculatorActions
            resultText={getResultText()}
            onReset={() => {
              setStartTime('09:00');
              setEndTime('17:30');
              setBreakMins(30);
              setHourlyWage(25);
            }}
          />
        </div>

        <div className="bg-indigo-50/60 border border-indigo-100 rounded-xl p-6 flex flex-col justify-between h-full">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-800">
              Total Hours Worked
            </span>
            <div className="mt-3">
              <div className="text-4xl sm:text-5xl font-extrabold text-indigo-950 font-mono tracking-tight">
                {hours}h {minutes}m
              </div>
              <p className="text-xs text-slate-600 mt-2 font-medium">
                Decimal: <strong>{decimalHours.toFixed(2)} hours</strong>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-6">
              <div className="p-3 bg-white border border-indigo-200 rounded-lg">
                <span className="text-[11px] font-semibold text-slate-500 uppercase block">Gross Pay</span>
                <p className="text-2xl font-bold text-emerald-600">${grossPay.toFixed(2)}</p>
                <span className="text-[11px] text-slate-400">@ ${hourlyWage}/hr</span>
              </div>
              <div className="p-3 bg-white border border-indigo-200 rounded-lg">
                <span className="text-[11px] font-semibold text-slate-500 uppercase block">Total Minutes</span>
                <p className="text-2xl font-bold text-slate-900">{formatNumber(workedMinutes)}</p>
                <span className="text-[11px] text-slate-400">net minutes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 6. DAYS CALCULATOR
// ==========================================
export const DaysCalculatorWidget: React.FC = () => {
  const today = new Date().toISOString().split('T')[0];
  const nextQuarter = new Date(Date.now() + 90 * 86400000).toISOString().split('T')[0];

  const [startDate, setStartDate] = useState<string>(today);
  const [endDate, setEndDate] = useState<string>(nextQuarter);
  const [includeEnd, setIncludeEnd] = useState<boolean>(true);

  const res = calculateDateDifference(startDate, endDate, includeEnd);

  const getResultText = () => {
    return `Days between ${startDate} and ${endDate}: ${res.totalDays} calendar days (${res.businessDays} business days, ${res.weekendDays} weekend days).`;
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              End Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
            />
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="daysIncludeEnd"
              checked={includeEnd}
              onChange={e => setIncludeEnd(e.target.checked)}
              className="w-4 h-4 text-indigo-600 rounded border-slate-300"
            />
            <label htmlFor="daysIncludeEnd" className="text-xs text-slate-700 cursor-pointer font-medium">
              Include End Date in calculation (+1 day)
            </label>
          </div>

          <div className="pt-2">
            <span className="text-xs text-slate-500 font-medium block mb-2">Quick Presets:</span>
            <div className="flex flex-wrap gap-2">
              {[30, 60, 90, 180, 365].map(d => (
                <button
                  key={d}
                  type="button"
                  onClick={() => {
                    const s = new Date(startDate);
                    const t = new Date(s.getTime() + d * 86400000);
                    setEndDate(t.toISOString().split('T')[0]);
                  }}
                  className="px-2.5 py-1 text-xs rounded-md bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 border border-slate-200 text-slate-700 font-medium"
                >
                  +{d} Days
                </button>
              ))}
            </div>
          </div>

          <CalculatorActions
            resultText={getResultText()}
            onReset={() => {
              setStartDate(today);
              setEndDate(nextQuarter);
              setIncludeEnd(true);
            }}
          />
        </div>

        <div className="bg-indigo-50/60 border border-indigo-100 rounded-xl p-6 flex flex-col justify-between h-full">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-800">
              Calendar Days Count
            </span>
            <div className="mt-3">
              <div className="text-4xl sm:text-5xl font-extrabold text-indigo-950 tracking-tight">
                {formatNumber(res.totalDays)}{' '}
                <span className="text-lg font-bold text-indigo-800">days</span>
              </div>
              <p className="text-xs text-slate-600 mt-2 font-medium">
                Breakdown: <strong>{res.summaryText}</strong>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-6">
              <div className="p-3 bg-white border border-indigo-200 rounded-lg">
                <span className="text-[11px] font-semibold text-slate-500 uppercase block">Working / Business</span>
                <p className="text-2xl font-bold text-slate-900">{formatNumber(res.businessDays)}</p>
                <span className="text-[11px] text-slate-400">Mon - Fri</span>
              </div>
              <div className="p-3 bg-white border border-indigo-200 rounded-lg">
                <span className="text-[11px] font-semibold text-slate-500 uppercase block">Weekend Days</span>
                <p className="text-2xl font-bold text-slate-900">{formatNumber(res.weekendDays)}</p>
                <span className="text-[11px] text-slate-400">Sat - Sun</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 7. WEEKS CALCULATOR
// ==========================================
export const WeeksCalculatorWidget: React.FC = () => {
  const [weeksInput, setWeeksInput] = useState<number>(12);

  const totalDays = weeksInput * 7;
  const totalHours = totalDays * 24;
  const totalMinutes = totalHours * 60;
  const totalSeconds = totalMinutes * 60;
  const approxMonths = (weeksInput / 4.34524).toFixed(1);

  const getResultText = () => {
    return `${weeksInput} weeks = ${totalDays} days, ${formatNumber(totalHours)} hours, ${formatNumber(totalMinutes)} minutes.`;
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Number of Weeks
            </label>
            <input
              type="number"
              min="0"
              value={weeksInput || ''}
              onChange={e => setWeeksInput(Math.max(0, parseInt(e.target.value) || 0))}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
            />
          </div>

          <div className="pt-2">
            <span className="text-xs text-slate-500 font-medium block mb-2">Common Milestone Durations:</span>
            <div className="flex flex-wrap gap-2">
              {[2, 4, 6, 8, 12, 26, 40, 52].map(w => (
                <button
                  key={w}
                  type="button"
                  onClick={() => setWeeksInput(w)}
                  className="px-2.5 py-1 text-xs rounded-md bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 border border-slate-200 text-slate-700 font-medium"
                >
                  {w} wks {w === 40 ? '(Pregnancy)' : w === 52 ? '(1 Yr)' : ''}
                </button>
              ))}
            </div>
          </div>

          <CalculatorActions resultText={getResultText()} onReset={() => setWeeksInput(12)} />
        </div>

        <div className="bg-indigo-50/60 border border-indigo-100 rounded-xl p-6 flex flex-col justify-between h-full">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-800">
              Total Days & Months
            </span>
            <div className="mt-3">
              <div className="text-4xl sm:text-5xl font-extrabold text-indigo-950 tracking-tight">
                {formatNumber(totalDays)}{' '}
                <span className="text-lg font-bold text-indigo-800">days</span>
              </div>
              <p className="text-xs text-slate-600 mt-2 font-medium">
                Approx <strong>{approxMonths} months</strong>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-6">
              <div className="p-3 bg-white border border-indigo-200 rounded-lg">
                <span className="text-[11px] font-semibold text-slate-500 uppercase block">Total Hours</span>
                <p className="text-2xl font-bold text-slate-900">{formatNumber(totalHours)}</p>
                <span className="text-[11px] text-slate-400">hours</span>
              </div>
              <div className="p-3 bg-white border border-indigo-200 rounded-lg">
                <span className="text-[11px] font-semibold text-slate-500 uppercase block">Total Minutes</span>
                <p className="text-2xl font-bold text-slate-900">{formatNumber(totalMinutes)}</p>
                <span className="text-[11px] text-slate-400">mins</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 8. MONTHS CALCULATOR
// ==========================================
export const MonthsCalculatorWidget: React.FC = () => {
  const [monthsCount, setMonthsCount] = useState<number>(6);
  const [startDate, setStartDate] = useState<string>(new Date().toISOString().split('T')[0]);

  const target = calculateDateAddSubtract(startDate, 0, monthsCount, 0, 0, 'add');

  const approxWeeks = (monthsCount * 4.34524).toFixed(1);
  const approxDays = Math.round(monthsCount * 30.4375);

  const getResultText = () => {
    return `${monthsCount} months from ${startDate} lands on ${target.formattedDate} (~${approxDays} days).`;
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Number of Months to Add
            </label>
            <input
              type="number"
              min="0"
              value={monthsCount || ''}
              onChange={e => setMonthsCount(Math.max(0, parseInt(e.target.value) || 0))}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
            />
          </div>

          <div className="pt-2">
            <span className="text-xs text-slate-500 font-medium block mb-2">Presets:</span>
            <div className="flex flex-wrap gap-2">
              {[1, 3, 6, 9, 12, 18, 24].map(m => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMonthsCount(m)}
                  className="px-2.5 py-1 text-xs rounded-md bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 border border-slate-200 text-slate-700 font-medium"
                >
                  {m} {m === 1 ? 'Month' : 'Months'}
                </button>
              ))}
            </div>
          </div>

          <CalculatorActions
            resultText={getResultText()}
            onReset={() => {
              setStartDate(new Date().toISOString().split('T')[0]);
              setMonthsCount(6);
            }}
          />
        </div>

        <div className="bg-indigo-50/60 border border-indigo-100 rounded-xl p-6 flex flex-col justify-between h-full">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-800">
              Projected Date
            </span>
            <div className="mt-3">
              <div className="text-3xl sm:text-4xl font-extrabold text-indigo-950 tracking-tight">
                {target.formattedDate}
              </div>
              <div className="mt-1 text-base font-semibold text-indigo-700">
                {target.dayOfWeek}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-6">
              <div className="p-3 bg-white border border-indigo-200 rounded-lg">
                <span className="text-[11px] font-semibold text-slate-500 uppercase block">Approximate Days</span>
                <p className="text-2xl font-bold text-slate-900">{approxDays}</p>
                <span className="text-[11px] text-slate-400">calendar days</span>
              </div>
              <div className="p-3 bg-white border border-indigo-200 rounded-lg">
                <span className="text-[11px] font-semibold text-slate-500 uppercase block">Approximate Weeks</span>
                <p className="text-2xl font-bold text-slate-900">{approxWeeks}</p>
                <span className="text-[11px] text-slate-400">weeks</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 9. YEARS CALCULATOR
// ==========================================
export const YearsCalculatorWidget: React.FC = () => {
  const [startYearDate, setStartYearDate] = useState<string>('2015-06-15');
  const [endYearDate, setEndYearDate] = useState<string>(new Date().toISOString().split('T')[0]);

  const diff = calculateDateDifference(startYearDate, endYearDate, false);
  const decimalYears = (diff.totalDays / 365.25).toFixed(2);

  const getResultText = () => {
    return `Span from ${startYearDate} to ${endYearDate}: ${diff.years} years, ${diff.months} months, ${diff.days} days (${decimalYears} decimal years).`;
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              From Date
            </label>
            <input
              type="date"
              value={startYearDate}
              onChange={e => setStartYearDate(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              To Date
            </label>
            <input
              type="date"
              value={endYearDate}
              onChange={e => setEndYearDate(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
            />
          </div>

          <CalculatorActions
            resultText={getResultText()}
            onReset={() => {
              setStartYearDate('2015-06-15');
              setEndYearDate(new Date().toISOString().split('T')[0]);
            }}
          />
        </div>

        <div className="bg-indigo-50/60 border border-indigo-100 rounded-xl p-6 flex flex-col justify-between h-full">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-800">
              Total Elapsed Years
            </span>
            <div className="mt-3">
              <div className="text-4xl sm:text-5xl font-extrabold text-indigo-950 tracking-tight">
                {diff.years}{' '}
                <span className="text-lg font-bold text-indigo-800">years</span>
              </div>
              <p className="text-xs text-slate-600 mt-2 font-medium">
                {diff.years} years, {diff.months} months, {diff.days} days
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-6">
              <div className="p-3 bg-white border border-indigo-200 rounded-lg">
                <span className="text-[11px] font-semibold text-slate-500 uppercase block">Decimal Years</span>
                <p className="text-2xl font-bold text-slate-900">{decimalYears}</p>
                <span className="text-[11px] text-slate-400">years</span>
              </div>
              <div className="p-3 bg-white border border-indigo-200 rounded-lg">
                <span className="text-[11px] font-semibold text-slate-500 uppercase block">Total Days</span>
                <p className="text-2xl font-bold text-slate-900">{formatNumber(diff.totalDays)}</p>
                <span className="text-[11px] text-slate-400">days</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 10. DAY OF THE WEEK CALCULATOR
// ==========================================
export const DayOfTheWeekCalculatorWidget: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>('1969-07-20');

  const d = new Date(`${selectedDate}T00:00:00Z`);
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayName = isNaN(d.getTime()) ? 'Invalid Date' : daysOfWeek[d.getUTCDay()];

  let dayOfYear = 0;
  if (!isNaN(d.getTime())) {
    const startYear = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    dayOfYear = Math.floor((d.getTime() - startYear.getTime()) / 86400000) + 1;
  }

  const isWeekend = dayName === 'Saturday' || dayName === 'Sunday';

  const getResultText = () => {
    return `${selectedDate} was a ${dayName} (Day ${dayOfYear} of ${d.getUTCFullYear()}).`;
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Select Any Date (Past or Future)
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={e => setSelectedDate(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
            />
          </div>

          <div className="pt-2">
            <span className="text-xs text-slate-500 font-medium block mb-2">Famous Historical Dates:</span>
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'Apollo 11 Moon Landing', date: '1969-07-20' },
                { label: 'Y2K Millenium', date: '2000-01-01' },
                { label: 'US Bicentennial', date: '1976-07-04' },
                { label: 'WWII End (Europe)', date: '1945-05-08' },
              ].map(item => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setSelectedDate(item.date)}
                  className="px-2.5 py-1 text-xs rounded-md bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 border border-slate-200 text-slate-700 font-medium"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <CalculatorActions resultText={getResultText()} onReset={() => setSelectedDate('1969-07-20')} />
        </div>

        <div className="bg-indigo-50/60 border border-indigo-100 rounded-xl p-6 flex flex-col justify-between h-full">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-800">
              Day of the Week
            </span>
            <div className="mt-3">
              <div className="text-4xl sm:text-5xl font-extrabold text-indigo-950 tracking-tight">
                {dayName}
              </div>
              <p className="text-xs text-slate-600 mt-2 font-medium">
                {isWeekend ? 'Weekend day' : 'Weekday / Business day'}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-6">
              <div className="p-3 bg-white border border-indigo-200 rounded-lg">
                <span className="text-[11px] font-semibold text-slate-500 uppercase block">Day of Year</span>
                <p className="text-2xl font-bold text-slate-900">#{dayOfYear}</p>
                <span className="text-[11px] text-slate-400">out of 365/366</span>
              </div>
              <div className="p-3 bg-white border border-indigo-200 rounded-lg">
                <span className="text-[11px] font-semibold text-slate-500 uppercase block">Year</span>
                <p className="text-2xl font-bold text-slate-900">{d.getUTCFullYear()}</p>
                <span className="text-[11px] text-slate-400">CE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 11. SECONDS TO TIME CALCULATOR
// ==========================================
export const SecondsToTimeCalculatorWidget: React.FC = () => {
  const [secondsInput, setSecondsInput] = useState<number>(86400);

  const res = secondsToTime(secondsInput);

  const days = Math.floor(res.totalSeconds / 86400);
  const remHours = res.hours % 24;

  const getResultText = () => {
    return `${formatNumber(secondsInput)} seconds = ${res.formattedHms} (${res.decimalHours.toFixed(2)} hours, ${res.totalMinutes.toFixed(1)} minutes).`;
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Enter Seconds
            </label>
            <input
              type="number"
              min="0"
              value={secondsInput || ''}
              onChange={e => setSecondsInput(Math.max(0, parseInt(e.target.value) || 0))}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
            />
          </div>

          <div className="pt-2">
            <span className="text-xs text-slate-500 font-medium block mb-2">Quick Presets:</span>
            <div className="flex flex-wrap gap-2">
              {[
                { label: '1 Hour (3,600s)', val: 3600 },
                { label: '1 Day (86,400s)', val: 86400 },
                { label: '1 Week (604,800s)', val: 604800 },
                { label: '1 Million Seconds', val: 1000000 },
              ].map(p => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => setSecondsInput(p.val)}
                  className="px-2.5 py-1 text-xs rounded-md bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 border border-slate-200 text-slate-700 font-medium"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <CalculatorActions resultText={getResultText()} onReset={() => setSecondsInput(86400)} />
        </div>

        <div className="bg-indigo-50/60 border border-indigo-100 rounded-xl p-6 flex flex-col justify-between h-full">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-800">
              Formatted Time (HH:MM:SS)
            </span>
            <div className="mt-3">
              <div className="text-4xl sm:text-5xl font-extrabold text-indigo-950 font-mono tracking-tight">
                {res.formattedHms}
              </div>
              {days > 0 && (
                <p className="text-sm font-semibold text-indigo-700 mt-2">
                  = {days} day{days > 1 ? 's' : ''}, {remHours} hour{remHours !== 1 ? 's' : ''}, {res.minutes} min, {res.seconds} sec
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3 mt-6">
              <div className="p-3 bg-white border border-indigo-200 rounded-lg">
                <span className="text-[11px] font-semibold text-slate-500 uppercase block">Decimal Hours</span>
                <p className="text-2xl font-bold text-slate-900">{res.decimalHours.toFixed(2)}</p>
                <span className="text-[11px] text-slate-400">hours</span>
              </div>
              <div className="p-3 bg-white border border-indigo-200 rounded-lg">
                <span className="text-[11px] font-semibold text-slate-500 uppercase block">Total Minutes</span>
                <p className="text-2xl font-bold text-slate-900">{formatNumber(Math.floor(res.totalMinutes))}</p>
                <span className="text-[11px] text-slate-400">minutes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 12. AVERAGE TIME CALCULATOR
// ==========================================
export const AverageTimeCalculatorWidget: React.FC = () => {
  const [times, setTimes] = useState<string[]>(['01:30', '02:00', '01:45', '01:55']);
  const [newTime, setNewTime] = useState<string>('02:10');

  const addTime = () => {
    if (newTime.trim()) {
      setTimes(prev => [...prev, newTime.trim()]);
      setNewTime('');
    }
  };

  const removeTime = (index: number) => {
    setTimes(prev => prev.filter((_, i) => i !== index));
  };

  const res = calculateAverageTime(times);

  const getResultText = () => {
    return `Average of ${res.totalEntries} times: ${res.averageHms} (${res.averageSeconds.toFixed(1)} seconds per lap/entry).`;
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Add Time (MM:SS or HH:MM:SS)
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. 01:45 or 01:22:30"
                value={newTime}
                onChange={e => setNewTime(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addTime();
                  }
                }}
                className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
              />
              <button
                type="button"
                onClick={addTime}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg text-sm"
              >
                Add
              </button>
            </div>
          </div>

          <div>
            <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider block mb-2">
              Entries ({times.length})
            </span>
            <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto p-2 bg-slate-50 border border-slate-200 rounded-lg">
              {times.map((t, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-slate-200 rounded-md text-xs font-mono font-medium text-slate-800"
                >
                  #{idx + 1}: {t}
                  <button
                    type="button"
                    onClick={() => removeTime(idx)}
                    className="text-slate-400 hover:text-rose-600 font-bold"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <CalculatorActions
            resultText={getResultText()}
            onReset={() => setTimes(['01:30', '02:00', '01:45', '01:55'])}
          />
        </div>

        <div className="bg-indigo-50/60 border border-indigo-100 rounded-xl p-6 flex flex-col justify-between h-full">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-800">
              Average Time
            </span>
            <div className="mt-3">
              <div className="text-4xl sm:text-5xl font-extrabold text-indigo-950 font-mono tracking-tight">
                {res.averageHms}
              </div>
              <p className="text-xs text-slate-600 mt-2 font-medium">
                Average seconds: <strong>{res.averageSeconds.toFixed(1)}s</strong>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-6">
              <div className="p-3 bg-white border border-indigo-200 rounded-lg">
                <span className="text-[11px] font-semibold text-slate-500 uppercase block">Total Laps / Items</span>
                <p className="text-2xl font-bold text-slate-900">{res.totalEntries}</p>
                <span className="text-[11px] text-slate-400">entries</span>
              </div>
              <div className="p-3 bg-white border border-indigo-200 rounded-lg">
                <span className="text-[11px] font-semibold text-slate-500 uppercase block">Cumulative Total</span>
                <p className="text-xl font-bold text-slate-900 font-mono">{res.totalHms}</p>
                <span className="text-[11px] text-slate-400">sum of times</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 13. LEAP YEAR CALCULATOR
// ==========================================
export const LeapYearCalculatorWidget: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState<number>(currentYear);

  const res = checkLeapYear(year);

  const getResultText = () => {
    return `${year} is ${res.isLeapYear ? 'a LEAP YEAR (366 days)' : 'a COMMON YEAR (365 days)'}. ${res.reason}`;
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Enter Year
            </label>
            <input
              type="number"
              value={year || ''}
              onChange={e => setYear(parseInt(e.target.value) || 0)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base font-semibold"
            />
          </div>

          <div className="pt-2">
            <span className="text-xs text-slate-500 font-medium block mb-2">Test Historical & Future Years:</span>
            <div className="flex flex-wrap gap-2">
              {[2000, 2020, 2024, 2028, 2100, 2400].map(y => (
                <button
                  key={y}
                  type="button"
                  onClick={() => setYear(y)}
                  className="px-2.5 py-1 text-xs rounded-md bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 border border-slate-200 text-slate-700 font-medium"
                >
                  {y} {y === 2100 ? '(Not Leap!)' : ''}
                </button>
              ))}
            </div>
          </div>

          <CalculatorActions resultText={getResultText()} onReset={() => setYear(currentYear)} />
        </div>

        <div className={`border rounded-xl p-6 flex flex-col justify-between h-full ${
          res.isLeapYear ? 'bg-emerald-50/70 border-emerald-200' : 'bg-slate-50 border-slate-200'
        }`}>
          <div>
            <span className={`text-xs font-bold uppercase tracking-wider ${
              res.isLeapYear ? 'text-emerald-800' : 'text-slate-700'
            }`}>
              Leap Year Verification
            </span>
            <div className="mt-3">
              <div className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
                res.isLeapYear ? 'text-emerald-950' : 'text-slate-900'
              }`}>
                {res.isLeapYear ? '🎉 Yes, Leap Year!' : '🗓️ Common Year (Not Leap)'}
              </div>
              <p className="text-xs text-slate-600 mt-2 font-medium">
                {res.reason}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-6">
              <div className="p-3 bg-white border border-slate-200 rounded-lg">
                <span className="text-[11px] font-semibold text-slate-500 uppercase block">Next Leap Year</span>
                <p className="text-2xl font-bold text-indigo-600">{res.nextLeapYear}</p>
                <span className="text-[11px] text-slate-400">future</span>
              </div>
              <div className="p-3 bg-white border border-slate-200 rounded-lg">
                <span className="text-[11px] font-semibold text-slate-500 uppercase block">Previous Leap Year</span>
                <p className="text-2xl font-bold text-slate-800">{res.previousLeapYear}</p>
                <span className="text-[11px] text-slate-400">past</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 14. MILITARY TIME CONVERTER
// ==========================================
export const MilitaryTimeConverterWidget: React.FC = () => {
  const [timeInput, setTimeInput] = useState<string>('02:45 PM');

  const res = convertMilitaryTime(timeInput);

  const getResultText = () => {
    return `${timeInput} converts to ${res.military} hours military time (${res.pronunciation}). Standard 12-hour: ${res.standard12}.`;
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Enter Time (12-hr AM/PM or 24-hr)
            </label>
            <input
              type="text"
              placeholder="e.g. 02:45 PM or 1445 or 14:45"
              value={timeInput}
              onChange={e => setTimeInput(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base font-mono"
            />
          </div>

          <div className="pt-2">
            <span className="text-xs text-slate-500 font-medium block mb-2">Quick Time Examples:</span>
            <div className="flex flex-wrap gap-2">
              {['12:00 AM', '06:30 AM', '12:00 PM', '05:15 PM', '23:59'].map(t => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTimeInput(t)}
                  className="px-2.5 py-1 text-xs rounded-md bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 border border-slate-200 text-slate-700 font-medium"
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <CalculatorActions resultText={getResultText()} onReset={() => setTimeInput('02:45 PM')} />
        </div>

        <div className="bg-indigo-50/60 border border-indigo-100 rounded-xl p-6 flex flex-col justify-between h-full">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-800">
              Military Time (24-Hour)
            </span>
            <div className="mt-3">
              <div className="text-4xl sm:text-5xl font-extrabold text-indigo-950 font-mono tracking-tight">
                {res.military} <span className="text-lg font-bold text-indigo-800">hours</span>
              </div>
              <p className="text-xs text-slate-600 mt-2 font-medium">
                Pronounced: &ldquo;<strong>{res.pronunciation}</strong>&rdquo;
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-6">
              <div className="p-3 bg-white border border-indigo-200 rounded-lg">
                <span className="text-[11px] font-semibold text-slate-500 uppercase block">Standard 12-Hour</span>
                <p className="text-xl font-bold text-slate-900">{res.standard12}</p>
                <span className="text-[11px] text-slate-400">AM / PM</span>
              </div>
              <div className="p-3 bg-white border border-indigo-200 rounded-lg">
                <span className="text-[11px] font-semibold text-slate-500 uppercase block">24-Hour Coloned</span>
                <p className="text-xl font-bold text-slate-900 font-mono">{res.coloned}</p>
                <span className="text-[11px] text-slate-400">HH:MM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
