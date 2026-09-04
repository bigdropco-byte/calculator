'use client';

import React, { useState } from 'react';
import { calculateXrpProfit } from '@/lib/calculators/investments';
import { formatCurrency, formatNumber } from '@/lib/formatting';
import { CalculatorActions } from '@/components/calculator/CalculatorActions';
import { Coins, TrendingUp, TrendingDown, Percent } from 'lucide-react';

export const XrpProfitCalculatorWidget: React.FC = () => {
  const [buyPrice, setBuyPrice] = useState<number | ''>(0.55);
  const [sellPrice, setSellPrice] = useState<number | ''>(2.40);
  const [quantity, setQuantity] = useState<number | ''>(2000);
  const [isAmountMode, setIsAmountMode] = useState<boolean>(false);
  const [feePct, setFeePct] = useState<number | ''>(0.1);

  const res = calculateXrpProfit(
    Number(buyPrice) || 0,
    Number(sellPrice) || 0,
    Number(quantity) || 0,
    isAmountMode,
    Number(feePct) || 0
  );

  const getResultText = () => {
    return `XRP Profit Calculator: Buy: ${res.tokenQuantity} XRP @ $${buyPrice} (Investment: ${formatCurrency(
      res.totalInvestment
    )}). Exit: @ $${sellPrice} (Net Exit: ${formatCurrency(res.totalExitValue)}). Net Profit: ${formatCurrency(
      res.netProfit
    )} (ROI: ${res.roiPercentage}%). Trading Fees: ${formatCurrency(res.feeAmount)}.`;
  };

  const handleReset = () => {
    setBuyPrice(0.55);
    setSellPrice(2.40);
    setQuantity(2000);
    setIsAmountMode(false);
    setFeePct(0.1);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Form Inputs */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Buy Price ($/XRP)
              </label>
              <input
                type="number"
                min={0}
                step={0.001}
                value={buyPrice}
                onChange={e => setBuyPrice(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Sell Price ($/XRP)
              </label>
              <input
                type="number"
                min={0}
                step={0.001}
                value={sellPrice}
                onChange={e => setSellPrice(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white font-medium"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                {isAmountMode ? 'Total Invested ($)' : 'XRP Token Quantity'}
              </label>
              <button
                type="button"
                onClick={() => setIsAmountMode(!isAmountMode)}
                className="text-[11px] text-sky-600 hover:text-sky-700 font-semibold"
              >
                Switch to {isAmountMode ? 'Tokens' : 'Fiat ($)'}
              </button>
            </div>
            <input
              type="number"
              min={0}
              value={quantity}
              onChange={e => setQuantity(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white font-medium"
              placeholder={isAmountMode ? '1000' : '2000'}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Exchange Fee (%)
            </label>
            <input
              type="number"
              min={0}
              step={0.05}
              value={feePct}
              onChange={e => setFeePct(e.target.value === '' ? '' : Number(e.target.value))}
              placeholder="0.1"
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white"
            />
          </div>

          <CalculatorActions resultText={getResultText()} onReset={handleReset} />
        </div>

        {/* Results Display */}
        <div
          className={`border rounded-xl p-6 flex flex-col justify-between h-full ${
            res.isProfit ? 'bg-emerald-50/50 border-emerald-100' : 'bg-rose-50/50 border-rose-100'
          }`}
        >
          <div>
            <div className="flex items-center justify-between">
              <span
                className={`text-xs font-bold uppercase tracking-wider ${
                  res.isProfit ? 'text-emerald-800' : 'text-rose-800'
                }`}
              >
                Net Crypto Profit / Loss
              </span>
              <span
                className={`text-xs font-extrabold px-2.5 py-0.5 rounded-full border ${
                  res.isProfit
                    ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                    : 'bg-rose-100 text-rose-900 border-rose-300'
                }`}
              >
                {res.roiPercentage >= 0 ? `+${res.roiPercentage}%` : `${res.roiPercentage}%`} ROI
              </span>
            </div>

            <div className="mt-3 flex items-baseline gap-2">
              <span
                className={`text-4xl sm:text-5xl font-black tracking-tight ${
                  res.isProfit ? 'text-emerald-950' : 'text-rose-950'
                }`}
              >
                {res.netProfit >= 0 ? `+${formatCurrency(res.netProfit)}` : formatCurrency(res.netProfit)}
              </span>
            </div>

            <div className="mt-5 space-y-2 text-xs">
              <div className="p-3 bg-white rounded-lg border border-slate-200/80 flex justify-between">
                <span className="text-slate-500">XRP Tokens:</span>
                <strong className="text-slate-900 font-mono font-bold">{formatNumber(res.tokenQuantity)} XRP</strong>
              </div>
              <div className="p-3 bg-white rounded-lg border border-slate-200/80 flex justify-between">
                <span className="text-slate-500">Total Purchase Cost:</span>
                <strong className="text-slate-900">{formatCurrency(res.totalInvestment)}</strong>
              </div>
              <div className="p-3 bg-white rounded-lg border border-slate-200/80 flex justify-between">
                <span className="text-slate-500">Net Exit Value:</span>
                <strong className="text-slate-900">{formatCurrency(res.totalExitValue)}</strong>
              </div>
              <div className="p-3 bg-white rounded-lg border border-slate-200/80 flex justify-between">
                <span className="text-slate-500">Trading Fees Paid:</span>
                <strong className="text-slate-700">{formatCurrency(res.feeAmount)}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
