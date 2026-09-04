'use client';

import React, { useState } from 'react';
import { calculateLtp } from '@/lib/calculators/investments';
import { formatCurrency, formatNumber } from '@/lib/formatting';
import { CalculatorActions } from '@/components/calculator/CalculatorActions';
import { Activity, Target, ShieldAlert, Crosshair, DollarSign } from 'lucide-react';

export const LtpCalculatorWidget: React.FC = () => {
  const [entryPrice, setEntryPrice] = useState<number | ''>(100);
  const [ltp, setLtp] = useState<number | ''>(108.5);
  const [targetPrice, setTargetPrice] = useState<number | ''>(125);
  const [stopLoss, setStopLoss] = useState<number | ''>(94);
  const [shares, setShares] = useState<number | ''>(100);

  const res = calculateLtp(
    Number(entryPrice) || 0,
    Number(ltp) || 0,
    Number(targetPrice) || 0,
    Number(stopLoss) || 0,
    Number(shares) || 1
  );

  const getResultText = () => {
    return `LTP / Position Analysis: Entry: ${formatCurrency(
      res.entryPrice
    )}, Current LTP: ${formatCurrency(res.ltp)} -> Unrealized P&L: ${
      res.unrealizedPnL >= 0 ? '+' : ''
    }${formatCurrency(res.unrealizedPnL)} (${res.unrealizedPnLPct}%). Target: ${formatCurrency(
      res.targetPrice
    )} (+${formatCurrency(res.potentialProfit)}), Stop-Loss: ${formatCurrency(
      res.stopLoss
    )} (-${formatCurrency(res.potentialLoss)}). Risk-Reward Ratio: 1:${res.riskRewardRatio}.`;
  };

  const handleReset = () => {
    setEntryPrice(100);
    setLtp(108.5);
    setTargetPrice(125);
    setStopLoss(94);
    setShares(100);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Form Inputs */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Entry Price ($)
              </label>
              <input
                type="number"
                min={0}
                step={0.1}
                value={entryPrice}
                onChange={e => setEntryPrice(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Last Traded Price (LTP $)
              </label>
              <input
                type="number"
                min={0}
                step={0.1}
                value={ltp}
                onChange={e => setLtp(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Target Exit Price ($)
              </label>
              <input
                type="number"
                min={0}
                step={0.1}
                value={targetPrice}
                onChange={e => setTargetPrice(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white font-medium text-emerald-800"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Stop-Loss Price ($)
              </label>
              <input
                type="number"
                min={0}
                step={0.1}
                value={stopLoss}
                onChange={e => setStopLoss(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white font-medium text-rose-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Position Size (Quantity / Shares)
            </label>
            <input
              type="number"
              min={1}
              value={shares}
              onChange={e => setShares(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white font-medium"
            />
          </div>

          <CalculatorActions resultText={getResultText()} onReset={handleReset} />
        </div>

        {/* Results Display */}
        <div
          className={`border rounded-xl p-6 flex flex-col justify-between h-full ${
            res.unrealizedPnL >= 0 ? 'bg-emerald-50/50 border-emerald-100' : 'bg-rose-50/50 border-rose-100'
          }`}
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Unrealized Current P&amp;L
              </span>
              <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-slate-900 text-white">
                R:R Ratio 1:{res.riskRewardRatio}
              </span>
            </div>

            <div className="mt-3 flex items-baseline gap-2">
              <span
                className={`text-4xl sm:text-5xl font-black tracking-tight ${
                  res.unrealizedPnL >= 0 ? 'text-emerald-950' : 'text-rose-950'
                }`}
              >
                {res.unrealizedPnL >= 0 ? `+${formatCurrency(res.unrealizedPnL)}` : formatCurrency(res.unrealizedPnL)}
              </span>
              <span
                className={`text-sm font-bold ${
                  res.unrealizedPnL >= 0 ? 'text-emerald-700' : 'text-rose-700'
                }`}
              >
                ({res.unrealizedPnLPct >= 0 ? `+${res.unrealizedPnLPct}%` : `${res.unrealizedPnLPct}%`})
              </span>
            </div>

            <div className="mt-5 space-y-2 text-xs">
              <div className="p-3 bg-white rounded-lg border border-slate-200/80 flex justify-between">
                <span className="text-slate-600 font-medium">Potential Profit at Target:</span>
                <strong className="text-emerald-700 font-black">+{formatCurrency(res.potentialProfit)}</strong>
              </div>

              <div className="p-3 bg-white rounded-lg border border-slate-200/80 flex justify-between">
                <span className="text-slate-600 font-medium">Potential Risk at Stop-Loss:</span>
                <strong className="text-rose-700 font-black">-{formatCurrency(res.potentialLoss)}</strong>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-2">
                <div className="p-2.5 bg-white/90 rounded border border-slate-200/80">
                  <span className="text-[10px] text-slate-400 font-semibold block uppercase">Reward/Share</span>
                  <strong className="text-slate-900">{formatCurrency(res.rewardAmountPerShare)}</strong>
                </div>
                <div className="p-2.5 bg-white/90 rounded border border-slate-200/80">
                  <span className="text-[10px] text-slate-400 font-semibold block uppercase">Risk/Share</span>
                  <strong className="text-slate-900">{formatCurrency(res.riskAmountPerShare)}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
