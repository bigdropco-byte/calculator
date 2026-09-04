'use client';

import React, { useState, useMemo } from 'react';
import { parseNumbers, calculateAverage } from '@/lib/calculators/average';
import { formatNumber } from '@/lib/formatting';
import { CalculatorActions } from '@/components/calculator/CalculatorActions';

export const AverageCalculatorWidget: React.FC = () => {
  const [rawInput, setRawInput] = useState<string>('85, 90, 75, 90, 100');

  const numbers = useMemo(() => parseNumbers(rawInput), [rawInput]);
  const stats = useMemo(() => calculateAverage(numbers), [numbers]);

  const getResultText = () => {
    return `Mean (Average): ${formatNumber(stats.mean)}, Median: ${formatNumber(stats.median)}, Mode: ${
      stats.modes.length > 0 ? stats.modes.join(', ') : 'None'
    }, Range: ${formatNumber(stats.range)}, Sum: ${formatNumber(stats.sum)}, Count: ${stats.count}`;
  };

  const handleReset = () => {
    setRawInput('85, 90, 75, 90, 100');
  };

  const loadSample = (sample: string) => {
    setRawInput(sample);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Input */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Enter Numbers (separated by commas, spaces, or lines)
            </label>
            <textarea
              rows={5}
              value={rawInput}
              onChange={e => setRawInput(e.target.value)}
              placeholder="e.g. 12, 18, 24, 30, 42"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-sm font-mono focus:bg-white resize-y"
            />
          </div>

          {/* Sample datasets */}
          <div>
            <span className="text-xs text-slate-500 font-medium block mb-2">Load Sample Data:</span>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => loadSample('85, 90, 75, 90, 100')}
                className="px-2.5 py-1 text-xs rounded-md bg-slate-100 hover:bg-sky-50 hover:text-sky-700 border border-slate-200 text-slate-700 font-medium transition-colors"
              >
                Exam Scores
              </button>
              <button
                type="button"
                onClick={() => loadSample('45000, 52000, 68000, 72000, 120000')}
                className="px-2.5 py-1 text-xs rounded-md bg-slate-100 hover:bg-sky-50 hover:text-sky-700 border border-slate-200 text-slate-700 font-medium transition-colors"
              >
                Salaries (Outlier)
              </button>
              <button
                type="button"
                onClick={() => loadSample('72, 75, 68, 70, 74, 72, 69')}
                className="px-2.5 py-1 text-xs rounded-md bg-slate-100 hover:bg-sky-50 hover:text-sky-700 border border-slate-200 text-slate-700 font-medium transition-colors"
              >
                Temperatures (°F)
              </button>
            </div>
          </div>

          <CalculatorActions resultText={getResultText()} onReset={handleReset} />
        </div>

        {/* Results Card */}
        <div className="bg-sky-50/60 border border-sky-100 rounded-xl p-6 flex flex-col justify-between h-full">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-sky-800">
              Mean (Arithmetic Average)
            </span>

            <div className="mt-2">
              <div className="text-4xl sm:text-5xl font-extrabold text-sky-950 tracking-tight">
                {formatNumber(stats.mean, 2)}
              </div>
              <p className="text-xs text-slate-600 mt-1">
                Calculated across <strong>{stats.count}</strong> numbers with total sum of{' '}
                <strong>{formatNumber(stats.sum)}</strong>.
              </p>
            </div>

            {/* Detailed Statistical Metrics Grid */}
            <div className="grid grid-cols-2 gap-3 mt-6">
              <div className="p-2.5 bg-white border border-sky-200/60 rounded-lg">
                <span className="text-[11px] font-semibold text-slate-500 uppercase">Median (Middle)</span>
                <p className="text-base font-bold text-slate-900 mt-0.5">{formatNumber(stats.median, 2)}</p>
              </div>

              <div className="p-2.5 bg-white border border-sky-200/60 rounded-lg">
                <span className="text-[11px] font-semibold text-slate-500 uppercase">Mode (Frequent)</span>
                <p className="text-base font-bold text-slate-900 mt-0.5 truncate">
                  {stats.modes.length > 0 ? stats.modes.join(', ') : 'None'}
                </p>
              </div>

              <div className="p-2.5 bg-white border border-sky-200/60 rounded-lg">
                <span className="text-[11px] font-semibold text-slate-500 uppercase">Range (Max - Min)</span>
                <p className="text-base font-bold text-slate-900 mt-0.5">{formatNumber(stats.range, 2)}</p>
              </div>

              <div className="p-2.5 bg-white border border-sky-200/60 rounded-lg">
                <span className="text-[11px] font-semibold text-slate-500 uppercase">Min / Max</span>
                <p className="text-base font-bold text-slate-900 mt-0.5">
                  {formatNumber(stats.min, 2)} / {formatNumber(stats.max, 2)}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-sky-200/60 text-xs text-slate-500">
            Formula: Mean = Sum ÷ Count ({formatNumber(stats.sum)} ÷ {stats.count})
          </div>
        </div>
      </div>
    </div>
  );
};
