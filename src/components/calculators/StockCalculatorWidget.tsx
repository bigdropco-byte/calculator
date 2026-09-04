'use client';

import React, { useState } from 'react';
import { calculateStockProfit } from '@/lib/calculators/investments';
import { formatCurrency, formatNumber } from '@/lib/formatting';
import { CalculatorActions } from '@/components/calculator/CalculatorActions';
import { TrendingUp, TrendingDown, DollarSign, Percent, BarChart3 } from 'lucide-react';

export const StockCalculatorWidget: React.FC = () => {
  const [buyPrice, setBuyPrice] = useState<number | ''>(50);
  const [sellPrice, setSellPrice] = useState<number | ''>(68);
  const [shares, setShares] = useState<number | ''>(100);
  const [buyCommission, setBuyCommission] = useState<number | ''>(0);
  const [sellCommission, setSellCommission] = useState<number | ''>(0);

  const res = calculateStockProfit(
    Number(buyPrice) || 0,
    Number(sellPrice) || 0,
    Number(shares) || 0,
    Number(buyCommission) || 0,
    Number(sellCommission) || 0
  );

  const getResultText = () => {
    return `Stock Profit/Loss Summary: Buy: ${shares} shares @ ${formatCurrency(
      Number(buyPrice) || 0
    )} (Total: ${formatCurrency(res.totalBuyCost)}). Sell: @ ${formatCurrency(
      Number(sellPrice) || 0
    )} (Total: ${formatCurrency(res.totalSellRevenue)}). Net Profit: ${formatCurrency(
      res.netProfit
    )} (ROI: ${res.roiPercentage}%). Break-Even: ${formatCurrency(res.breakEvenPrice)}.`;
  };

  const handleReset = () => {
    setBuyPrice(50);
    setSellPrice(68);
    setShares(100);
    setBuyCommission(0);
    setSellCommission(0);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Form Inputs */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Buy Price ($/share)
              </label>
              <input
                type="number"
                min={0}
                step={0.01}
                value={buyPrice}
                onChange={e => setBuyPrice(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Sell Price ($/share)
              </label>
              <input
                type="number"
                min={0}
                step={0.01}
                value={sellPrice}
                onChange={e => setSellPrice(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Number of Shares
            </label>
            <input
              type="number"
              min={1}
              value={shares}
              onChange={e => setShares(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white font-medium"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Buy Commission ($)
              </label>
              <input
                type="number"
                min={0}
                value={buyCommission}
                onChange={e => setBuyCommission(e.target.value === '' ? '' : Number(e.target.value))}
                placeholder="0"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Sell Commission ($)
              </label>
              <input
                type="number"
                min={0}
                value={sellCommission}
                onChange={e => setSellCommission(e.target.value === '' ? '' : Number(e.target.value))}
                placeholder="0"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white"
              />
            </div>
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
                Net Return on Trade
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
                <span className="text-slate-500">Total Purchase Cost:</span>
                <strong className="text-slate-900">{formatCurrency(res.totalBuyCost)}</strong>
              </div>
              <div className="p-3 bg-white rounded-lg border border-slate-200/80 flex justify-between">
                <span className="text-slate-500">Total Net Revenue:</span>
                <strong className="text-slate-900">{formatCurrency(res.totalSellRevenue)}</strong>
              </div>
              <div className="p-3 bg-white rounded-lg border border-slate-200/80 flex justify-between">
                <span className="text-slate-500">Break-Even Share Price:</span>
                <strong className="text-slate-900">{formatCurrency(res.breakEvenPrice)}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
