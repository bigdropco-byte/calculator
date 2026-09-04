import { describe, it, expect } from 'vitest';
import {
  calculateStockProfit,
  calculateRoi,
  calculateFixedDeposit,
  calculateSip,
  calculateStp,
  calculateXrpProfit,
  calculateLtp,
} from '../investments';

describe('Investments & Wealth Planning Calculation Engine', () => {
  describe('Stock Profit Calculator', () => {
    it('calculates stock profit with commissions and break-even', () => {
      // 100 shares at $50 buy, $75 sell, $10 buy commission, $10 sell commission
      // Total buy = 5000 + 10 = 5010
      // Total sell = 7500 - 10 = 7490
      // Net profit = 7490 - 5010 = 2480
      const res = calculateStockProfit(50, 75, 100, 10, 10);
      expect(res.totalBuyCost).toBe(5010);
      expect(res.totalSellRevenue).toBe(7490);
      expect(res.netProfit).toBe(2480);
      expect(res.isProfit).toBe(true);
      expect(res.breakEvenPrice).toBe(50.2);
    });
  });

  describe('ROI Calculator', () => {
    it('calculates total ROI and annualized CAGR', () => {
      // $10,000 to $20,000 in 3 years -> 100% total ROI, CAGR ~25.99%
      const res = calculateRoi(10000, 20000, 3);
      expect(res.netGain).toBe(10000);
      expect(res.totalRoiPercentage).toBe(100);
      expect(res.annualizedRoi).toBe(25.99);
      expect(res.multiplier).toBe(2.0);
    });
  });

  describe('Fixed Deposit (FD) Calculator', () => {
    it('computes compound interest maturity and interest earned', () => {
      // $10,000 at 7% quarterly for 5 years
      const res = calculateFixedDeposit(10000, 7, 5, 'quarterly');
      expect(res.maturityAmount).toBeGreaterThan(14000);
      expect(res.totalInterestEarned).toBe(res.maturityAmount - 10000);
    });
  });

  describe('SIP Calculator', () => {
    it('computes future value for monthly systematic investment', () => {
      // $500/mo at 12% for 10 years (120 months)
      // Total invested = $60,000
      const res = calculateSip(500, 12, 10);
      expect(res.totalInvested).toBe(60000);
      expect(res.totalMaturityValue).toBeGreaterThan(115000);
      expect(res.estimatedReturns).toBe(res.totalMaturityValue - 60000);
    });
  });

  describe('STP Calculator', () => {
    it('simulates monthly transfer from debt fund to equity fund', () => {
      const res = calculateStp(50000, 1000, 6, 12, 36);
      expect(res.totalTransferred).toBe(36000);
      expect(res.totalCombinedCorpus).toBeGreaterThan(50000);
      expect(res.totalProfit).toBeGreaterThan(0);
    });
  });

  describe('XRP Profit Calculator', () => {
    it('calculates cryptocurrency gains and fee deductions', () => {
      // 1000 XRP bought at $1.00, sold at $2.50 with 0.1% fee
      const res = calculateXrpProfit(1.00, 2.50, 1000, false, 0.1);
      expect(res.totalInvestment).toBe(1000);
      expect(res.netProfit).toBeGreaterThan(1490);
      expect(res.roiPercentage).toBeGreaterThan(145);
      expect(res.isProfit).toBe(true);
    });
  });

  describe('LTP Calculator', () => {
    it('computes unrealized P&L and risk-reward ratio', () => {
      // Entry: $100, LTP: $108, Target: $120, StopLoss: $95, Shares: 50
      const res = calculateLtp(100, 108, 120, 95, 50);
      expect(res.unrealizedPnL).toBe(400); // (108 - 100) * 50
      expect(res.unrealizedPnLPct).toBe(8);
      // Reward per share = 20, Risk per share = 5 -> R:R = 4.0
      expect(res.riskRewardRatio).toBe(4.0);
      expect(res.potentialProfit).toBe(1000);
      expect(res.potentialLoss).toBe(250);
    });
  });
});
