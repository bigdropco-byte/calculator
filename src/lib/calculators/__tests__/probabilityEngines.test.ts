import { describe, it, expect } from 'vitest';
import {
  factorial,
  combinations,
  permutations,
  erf,
  normalCdf,
  calculateGeneralProbability,
  calculatePermutationsCombinations,
  calculateBinomialProbability,
  calculateDiceProbability,
  calculateCoinFlipProbability,
  calculateBayesTheorem,
  calculateNormalDistribution,
  calculatePoissonDistribution,
  calculateOddsProbability,
  calculateHypergeometricProbability,
  calculatePokerOdds,
  calculateLotteryOdds,
} from '../probabilityEngines';

describe('Probability Calculation Engines', () => {
  describe('Mathematical Combinatorics Helpers', () => {
    it('computes factorials correctly', () => {
      expect(factorial(0)).toBe(1);
      expect(factorial(1)).toBe(1);
      expect(factorial(5)).toBe(120);
      expect(factorial(7)).toBe(5040);
    });

    it('computes combinations nCr accurately', () => {
      expect(combinations(5, 2)).toBe(10);
      expect(combinations(10, 3)).toBe(120);
      expect(combinations(52, 5)).toBe(2598960);
      expect(combinations(5, 0)).toBe(1);
      expect(combinations(5, 5)).toBe(1);
      expect(combinations(5, 6)).toBe(0);
    });

    it('computes permutations nPr accurately', () => {
      expect(permutations(5, 2)).toBe(20);
      expect(permutations(6, 3)).toBe(120);
      expect(permutations(4, 0)).toBe(1);
    });

    it('evaluates normal distribution error function erf and CDF', () => {
      expect(erf(0)).toBeCloseTo(0, 5);
      expect(normalCdf(0)).toBeCloseTo(0.5, 4);
      // z = 1.96 corresponds to standard 97.5% two-tailed cutoff
      expect(normalCdf(1.96)).toBeCloseTo(0.975, 2);
      expect(normalCdf(-1.96)).toBeCloseTo(0.025, 2);
    });
  });

  describe('1. General Probability Engine', () => {
    it('computes single event probability and complement', () => {
      const single = calculateGeneralProbability({ mode: 'single', favorable: 1, total: 6 });
      expect(single.probability).toBeCloseTo(1 / 6, 4);
      expect(single.percentage).toBeCloseTo(16.6667, 2);
      expect(single.oddsAgainst).toBe('5.00 : 1');

      const comp = calculateGeneralProbability({ mode: 'complement', probA: 0.25 });
      expect(comp.probability).toBeCloseTo(0.75, 4);
      expect(comp.percentage).toBeCloseTo(75, 2);
    });

    it('computes union for mutually exclusive and independent events', () => {
      // Mutually exclusive: 0.2 + 0.3 = 0.5
      const unionME = calculateGeneralProbability({
        mode: 'union',
        probA: 0.2,
        probB: 0.3,
        isMutuallyExclusive: true,
      });
      expect(unionME.probability).toBeCloseTo(0.5, 4);

      // Non-mutually exclusive: P(A) + P(B) - P(A and B) = 0.5 + 0.4 - 0.2 = 0.7
      const unionGeneral = calculateGeneralProbability({
        mode: 'union',
        probA: 0.5,
        probB: 0.4,
        probIntersection: 0.2,
        isMutuallyExclusive: false,
      });
      expect(unionGeneral.probability).toBeCloseTo(0.7, 4);
    });

    it('computes intersection and conditional probability', () => {
      const interIndep = calculateGeneralProbability({
        mode: 'intersection',
        probA: 0.5,
        probB: 0.5,
        isIndependent: true,
      });
      expect(interIndep.probability).toBeCloseTo(0.25, 4);

      const cond = calculateGeneralProbability({
        mode: 'conditional',
        probIntersection: 0.15,
        probB: 0.3,
      });
      expect(cond.probability).toBeCloseTo(0.5, 4);
    });
  });

  describe('2. Permutations and Combinations', () => {
    it('calculates 4 variations of nPr and nCr', () => {
      const res = calculatePermutationsCombinations(5, 3);
      expect(res.nPr).toBe(60);
      expect(res.nCr).toBe(10);
      expect(res.permWithRepetition).toBe(125); // 5^3
      expect(res.combWithRepetition).toBe(35); // C(5+3-1, 3) = C(7, 3) = 35
    });
  });

  describe('3. Binomial Probability', () => {
    it('calculates exact and cumulative probabilities for fair coin 10 flips', () => {
      const res = calculateBinomialProbability(10, 0.5, 5);
      // P(X=5) = 252 / 1024 ~ 0.24609
      expect(res.exactProbability).toBeCloseTo(0.24609, 4);
      expect(res.mean).toBe(5);
      expect(res.variance).toBe(2.5);
      expect(res.stdDev).toBeCloseTo(Math.sqrt(2.5), 4);
      expect(res.cumulativeLessOrEqual).toBeGreaterThan(0.5);
    });
  });

  describe('4. Dice Probability', () => {
    it('computes standard 2d6 dice distribution', () => {
      const res = calculateDiceProbability(2, 6, 7);
      expect(res.totalOutcomes).toBe(36);
      expect(res.exactWays).toBe(6); // (1,6), (2,5), (3,4), (4,3), (5,2), (6,1)
      expect(res.exactProbability).toBeCloseTo(6 / 36, 4);
      expect(res.averageSum).toBe(7);
      expect(res.minSum).toBe(2);
      expect(res.maxSum).toBe(12);
    });
  });

  describe('5. Coin Flip Probability', () => {
    it('computes heads target and streak probabilities', () => {
      const res = calculateCoinFlipProbability(10, 0.5, 5, 3);
      expect(res.expectedHeads).toBe(5);
      expect(res.expectedTails).toBe(5);
      expect(res.exactProbability).toBeCloseTo(0.24609, 4);
      // Chance of getting at least 3 consecutive heads in 10 flips is ~ 50.78%
      expect(res.streakProbability).toBeGreaterThan(0.45);
      expect(res.streakProbability).toBeLessThan(0.60);
    });
  });

  describe('6. Bayes Theorem', () => {
    it('calculates classic rare disease false positive paradox', () => {
      // 1% prevalence, 95% sensitivity, 5% false positive rate
      const res = calculateBayesTheorem(0.01, 0.95, 0.05);
      // P(Disease | Positive) = (0.95 * 0.01) / (0.95 * 0.01 + 0.05 * 0.99) = 0.0095 / (0.0095 + 0.0495) ~ 16.1%
      expect(res.posteriorAgivenB).toBeCloseTo(0.1610, 3);
      expect(res.contingency10k.truePositives).toBe(95);
      expect(res.contingency10k.falsePositives).toBe(495);
    });
  });

  describe('7. Normal Distribution', () => {
    it('calculates left, right, and between interval areas', () => {
      const resLeft = calculateNormalDistribution(100, 15, 100, 115, 'left');
      expect(resLeft.probability).toBeCloseTo(0.5, 3);

      const resBetween = calculateNormalDistribution(100, 15, 85, 115, 'between');
      // Within 1 std dev of mean is ~68.27%
      expect(resBetween.probability).toBeCloseTo(0.6827, 2);
    });
  });

  describe('8. Poisson Distribution', () => {
    it('calculates exact and cumulative probabilities', () => {
      const res = calculatePoissonDistribution(4, 4);
      // P(X=4 | lambda=4) = 4^4 * e^-4 / 4! = 256 * 0.0183156 / 24 ~ 0.1954
      expect(res.exactProbability).toBeCloseTo(0.1954, 3);
      expect(res.mean).toBe(4);
      expect(res.variance).toBe(4);
      expect(res.stdDev).toBe(2);
    });
  });

  describe('9. Odds Probability Converter', () => {
    it('converts between American, decimal, and fractional formats', () => {
      // +200 American odds is 3.0 decimal, 2/1 fractional, 33.33% probability
      const fromAmerican = calculateOddsProbability('american', 200, 100);
      expect(fromAmerican.probabilityPercent).toBeCloseTo(33.333, 1);
      expect(fromAmerican.decimalOdds).toBe(3);
      expect(fromAmerican.profit).toBe(200);
      expect(fromAmerican.totalPayout).toBe(300);

      // -200 American odds is 1.5 decimal, 66.67% probability
      const fromMinus = calculateOddsProbability('american', -200, 100);
      expect(fromMinus.probabilityPercent).toBeCloseTo(66.666, 1);
      expect(fromMinus.decimalOdds).toBe(1.5);
      expect(fromMinus.profit).toBe(50);
    });
  });

  describe('10. Hypergeometric Distribution', () => {
    it('calculates drawing aces from standard 52-card deck', () => {
      // N=52, K=4 (aces), sample n=5, observed k=1 (exactly 1 ace)
      const res = calculateHypergeometricProbability(52, 4, 5, 1);
      // P(X=1) = (4 C 1 * 48 C 4) / 52 C 5 = (4 * 194580) / 2598960 ~ 0.2995
      expect(res.exactProbability).toBeCloseTo(0.2995, 3);
      expect(res.mean).toBeCloseTo((5 * 4) / 52, 4);
    });
  });

  describe('11. Poker Odds', () => {
    it('verifies 5-card poker hands match official combinatorial counts', () => {
      const res = calculatePokerOdds(9, 100, 20);
      expect(res.ranks.length).toBe(10);
      const rf = res.ranks.find(r => r.name === 'Royal Flush');
      expect(rf?.count).toBe(4);
      expect(rf?.percentage).toBeCloseTo(0.000154, 6);

      const onePair = res.ranks.find(r => r.name === 'One Pair');
      expect(onePair?.count).toBe(1098240);
      expect(onePair?.percentage).toBeCloseTo(42.2569, 2);

      // Pot odds analysis for flush draw (9 outs) on $100 pot facing $20 call:
      // Pot odds: 20 / 120 = 16.67%. Turn-to-river equity: 9 / 46 = 19.57%. Call is +EV!
      expect(res.potOddsAnalysis?.potOddsPercent).toBeCloseTo(16.667, 1);
      expect(res.potOddsAnalysis?.equityTurnToRiver).toBeCloseTo(19.565, 1);
      expect(res.potOddsAnalysis?.callVerdict).toContain('+EV');
    });
  });

  describe('12. Lottery Odds', () => {
    it('calculates Powerball 69/5 + 26 jackpot odds correctly', () => {
      const res = calculateLotteryOdds(69, 5, 26, true, 2, 100000000);
      // 69 C 5 = 11,238,513 * 26 = 292,201,338
      expect(res.jackpotOdds).toBe(292201338);
      expect(res.jackpotOddsFormatted).toBe('1 in 292,201,338');
      expect(res.overallOddsAnyPrize).toBeLessThan(30); // ~1 in 24.87
    });
  });
});
