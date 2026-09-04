/**
 * Pure Calculation Engine: Investments, Stock, Crypto & Wealth Planning
 * Covers Stock P&L, ROI/CAGR, Fixed Deposits, SIP, STP, XRP, and LTP.
 */

/**
 * 1. Stock Calculator
 */
export interface StockProfitResult {
  totalBuyCost: number;
  totalSellRevenue: number;
  netProfit: number;
  roiPercentage: number;
  breakEvenPrice: number;
  totalCommissions: number;
  isProfit: boolean;
}

export function calculateStockProfit(
  buyPrice: number,
  sellPrice: number,
  shares: number,
  buyCommission: number = 0,
  sellCommission: number = 0
): StockProfitResult {
  const q = Math.max(0, shares);
  const bPrice = Math.max(0, buyPrice);
  const sPrice = Math.max(0, sellPrice);
  const bComm = Math.max(0, buyCommission);
  const sComm = Math.max(0, sellCommission);

  const totalBuyCost = q * bPrice + bComm;
  const totalSellRevenue = q * sPrice - sComm;
  const netProfit = totalSellRevenue - totalBuyCost;
  const roiPercentage = totalBuyCost > 0 ? (netProfit / totalBuyCost) * 100 : 0;
  const totalCommissions = bComm + sComm;
  const breakEvenPrice = q > 0 ? (q * bPrice + totalCommissions) / q : 0;

  return {
    totalBuyCost: Math.round(totalBuyCost * 100) / 100,
    totalSellRevenue: Math.round(totalSellRevenue * 100) / 100,
    netProfit: Math.round(netProfit * 100) / 100,
    roiPercentage: Number(roiPercentage.toFixed(2)),
    breakEvenPrice: Number(breakEvenPrice.toFixed(2)),
    totalCommissions: Math.round(totalCommissions * 100) / 100,
    isProfit: netProfit >= 0,
  };
}

/**
 * 2. ROI & Annualized CAGR Calculator
 */
export interface RoiResult {
  netGain: number;
  totalRoiPercentage: number;
  annualizedRoi: number; // CAGR
  multiplier: number;
}

export function calculateRoi(
  initialInvestment: number,
  finalValue: number,
  years: number = 1
): RoiResult {
  const init = Math.max(0.01, initialInvestment);
  const end = Math.max(0, finalValue);
  const duration = Math.max(0.1, years);

  const netGain = end - init;
  const totalRoiPercentage = (netGain / init) * 100;
  const multiplier = end / init;
  const annualizedRoi = (Math.pow(end / init, 1 / duration) - 1) * 100;

  return {
    netGain: Math.round(netGain * 100) / 100,
    totalRoiPercentage: Number(totalRoiPercentage.toFixed(2)),
    annualizedRoi: Number(annualizedRoi.toFixed(2)),
    multiplier: Number(multiplier.toFixed(2)),
  };
}

/**
 * 3. Fixed Deposit (FD) Calculator
 */
export interface FixedDepositResult {
  totalPrincipal: number;
  maturityAmount: number;
  totalInterestEarned: number;
  effectiveAnnualYield: number;
}

export function calculateFixedDeposit(
  principal: number,
  annualInterestRatePct: number,
  tenureYears: number,
  compoundingFrequency: 'monthly' | 'quarterly' | 'semi-annually' | 'annually' = 'quarterly'
): FixedDepositResult {
  const p = Math.max(0, principal);
  const r = Math.max(0, annualInterestRatePct) / 100;
  const t = Math.max(0.08, tenureYears); // minimum 1 month

  const freqMap: Record<string, number> = {
    monthly: 12,
    quarterly: 4,
    'semi-annually': 2,
    annually: 1,
  };
  const n = freqMap[compoundingFrequency] || 4;

  // A = P * (1 + r/n)^(n*t)
  const maturityAmount = p * Math.pow(1 + r / n, n * t);
  const totalInterestEarned = maturityAmount - p;
  const effectiveAnnualYield = (Math.pow(1 + r / n, n) - 1) * 100;

  return {
    totalPrincipal: Math.round(p),
    maturityAmount: Math.round(maturityAmount),
    totalInterestEarned: Math.round(totalInterestEarned),
    effectiveAnnualYield: Number(effectiveAnnualYield.toFixed(2)),
  };
}

/**
 * 4. SIP (Systematic Investment Plan) Calculator
 */
export interface SipResult {
  totalInvested: number;
  estimatedReturns: number;
  totalMaturityValue: number;
  wealthMultiplier: number;
}

export function calculateSip(
  monthlyInvestment: number,
  expectedAnnualReturnRatePct: number,
  tenureYears: number
): SipResult {
  const p = Math.max(0, monthlyInvestment);
  const annualRate = Math.max(0, expectedAnnualReturnRatePct) / 100;
  const i = annualRate / 12; // monthly rate
  const n = Math.max(1, Math.round(tenureYears * 12)); // total months

  // Future Value of SIP: M = P * [((1 + i)^n - 1) / i] * (1 + i)
  let maturityValue = 0;
  if (i > 0) {
    maturityValue = p * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
  } else {
    maturityValue = p * n;
  }

  const totalInvested = p * n;
  const estimatedReturns = Math.max(0, maturityValue - totalInvested);
  const wealthMultiplier = totalInvested > 0 ? maturityValue / totalInvested : 1;

  return {
    totalInvested: Math.round(totalInvested),
    estimatedReturns: Math.round(estimatedReturns),
    totalMaturityValue: Math.round(maturityValue),
    wealthMultiplier: Number(wealthMultiplier.toFixed(2)),
  };
}

/**
 * 5. STP (Systematic Transfer Plan) Calculator
 */
export interface StpResult {
  initialSourceLumpSum: number;
  monthlyTransferAmount: number;
  totalTransferred: number;
  remainingSourceBalance: number;
  finalTargetBalance: number;
  totalCombinedCorpus: number;
  totalProfit: number;
}

export function calculateStp(
  sourceLumpSum: number,
  monthlyTransfer: number,
  sourceAnnualReturnPct: number = 6.0, // e.g. liquid debt fund
  targetAnnualReturnPct: number = 12.0, // e.g. equity fund
  months: number = 36
): StpResult {
  let sourceBal = Math.max(0, sourceLumpSum);
  let targetBal = 0;
  const transfer = Math.max(0, monthlyTransfer);
  const totalMonths = Math.max(1, Math.round(months));

  const sourceMonthlyRate = Math.max(0, sourceAnnualReturnPct) / 100 / 12;
  const targetMonthlyRate = Math.max(0, targetAnnualReturnPct) / 100 / 12;

  let totalActualTransferred = 0;

  for (let m = 0; m < totalMonths; m++) {
    // Grow source
    sourceBal *= 1 + sourceMonthlyRate;
    // Transfer amount
    const actualTransfer = Math.min(sourceBal, transfer);
    sourceBal -= actualTransfer;
    totalActualTransferred += actualTransfer;

    // Add to target and grow target
    targetBal = (targetBal + actualTransfer) * (1 + targetMonthlyRate);
  }

  const combined = sourceBal + targetBal;
  const profit = combined - sourceLumpSum;

  return {
    initialSourceLumpSum: Math.round(sourceLumpSum),
    monthlyTransferAmount: Math.round(transfer),
    totalTransferred: Math.round(totalActualTransferred),
    remainingSourceBalance: Math.round(sourceBal),
    finalTargetBalance: Math.round(targetBal),
    totalCombinedCorpus: Math.round(combined),
    totalProfit: Math.round(profit),
  };
}

/**
 * 6. XRP Profit Calculator
 */
export interface XrpProfitResult {
  tokenQuantity: number;
  totalInvestment: number;
  totalExitValue: number;
  netProfit: number;
  roiPercentage: number;
  priceDifference: number;
  feeAmount: number;
  isProfit: boolean;
}

export function calculateXrpProfit(
  buyPrice: number,
  sellPrice: number,
  tokensOrAmount: number,
  isAmountMode: boolean = false,
  tradingFeePct: number = 0.1
): XrpProfitResult {
  const bPrice = Math.max(0.000001, buyPrice);
  const sPrice = Math.max(0, sellPrice);
  const feeRate = Math.max(0, tradingFeePct) / 100;

  let tokens = 0;
  let totalInvested = 0;

  if (isAmountMode) {
    totalInvested = Math.max(0, tokensOrAmount);
    tokens = totalInvested / bPrice;
  } else {
    tokens = Math.max(0, tokensOrAmount);
    totalInvested = tokens * bPrice;
  }

  const grossExit = tokens * sPrice;
  const buyFee = totalInvested * feeRate;
  const sellFee = grossExit * feeRate;
  const totalFees = buyFee + sellFee;

  const netExit = grossExit - sellFee;
  const netProfit = netExit - (totalInvested + buyFee);
  const roiPercentage = totalInvested > 0 ? (netProfit / totalInvested) * 100 : 0;
  const priceDifference = sPrice - bPrice;

  return {
    tokenQuantity: Number(tokens.toFixed(4)),
    totalInvestment: Math.round(totalInvested * 100) / 100,
    totalExitValue: Math.round(netExit * 100) / 100,
    netProfit: Math.round(netProfit * 100) / 100,
    roiPercentage: Number(roiPercentage.toFixed(2)),
    priceDifference: Number(priceDifference.toFixed(4)),
    feeAmount: Math.round(totalFees * 100) / 100,
    isProfit: netProfit >= 0,
  };
}

/**
 * 7. LTP (Last Traded Price) Calculator
 */
export interface LtpResult {
  entryPrice: number;
  ltp: number;
  targetPrice: number;
  stopLoss: number;
  shares: number;
  unrealizedPnL: number;
  unrealizedPnLPct: number;
  riskRewardRatio: number;
  potentialProfit: number;
  potentialLoss: number;
  riskAmountPerShare: number;
  rewardAmountPerShare: number;
}

export function calculateLtp(
  entryPrice: number,
  currentLtp: number,
  targetPrice: number,
  stopLoss: number,
  shares: number = 100
): LtpResult {
  const entry = Math.max(0.01, entryPrice);
  const ltp = Math.max(0, currentLtp);
  const target = Math.max(0, targetPrice);
  const sl = Math.max(0, stopLoss);
  const qty = Math.max(1, shares);

  const unrealizedPnL = (ltp - entry) * qty;
  const unrealizedPnLPct = ((ltp - entry) / entry) * 100;

  const rewardPerShare = Math.max(0, target - entry);
  const riskPerShare = Math.max(0, entry - sl);

  const potentialProfit = rewardPerShare * qty;
  const potentialLoss = riskPerShare * qty;

  const riskRewardRatio = riskPerShare > 0 ? rewardPerShare / riskPerShare : 0;

  return {
    entryPrice: Number(entry.toFixed(2)),
    ltp: Number(ltp.toFixed(2)),
    targetPrice: Number(target.toFixed(2)),
    stopLoss: Number(sl.toFixed(2)),
    shares: qty,
    unrealizedPnL: Math.round(unrealizedPnL * 100) / 100,
    unrealizedPnLPct: Number(unrealizedPnLPct.toFixed(2)),
    riskRewardRatio: Number(riskRewardRatio.toFixed(2)),
    potentialProfit: Math.round(potentialProfit * 100) / 100,
    potentialLoss: Math.round(potentialLoss * 100) / 100,
    riskAmountPerShare: Number(riskPerShare.toFixed(2)),
    rewardAmountPerShare: Number(rewardPerShare.toFixed(2)),
  };
}
