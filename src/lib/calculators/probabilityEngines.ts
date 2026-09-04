/**
 * Pure calculation engines for the Probability Calculators Suite
 */

// Helper: factorial with safe cache
const FACTORIAL_CACHE: number[] = [1, 1];
export function factorial(n: number): number {
  if (n < 0 || !Number.isInteger(n)) return NaN;
  if (n > 170) return Infinity; // JS 64-bit float overflows above 170!
  if (FACTORIAL_CACHE[n] !== undefined) return FACTORIAL_CACHE[n];
  let res = FACTORIAL_CACHE[FACTORIAL_CACHE.length - 1];
  for (let i = FACTORIAL_CACHE.length; i <= n; i++) {
    res *= i;
    FACTORIAL_CACHE[i] = res;
  }
  return res;
}

// Helper: combinations nCr = n! / (r! * (n-r)!)
export function combinations(n: number, r: number): number {
  if (r < 0 || r > n || !Number.isInteger(n) || !Number.isInteger(r)) return 0;
  if (r === 0 || r === n) return 1;
  if (r > n / 2) r = n - r;

  let result = 1;
  for (let i = 1; i <= r; i++) {
    result = (result * (n - i + 1)) / i;
  }
  return Math.round(result);
}

// Helper: permutations nPr = n! / (n-r)!
export function permutations(n: number, r: number): number {
  if (r < 0 || r > n || !Number.isInteger(n) || !Number.isInteger(r)) return 0;
  if (r === 0) return 1;
  let result = 1;
  for (let i = 0; i < r; i++) {
    result *= n - i;
  }
  return result;
}

// Helper: standard normal error function erf(x) via Abramowitz & Stegun 7.1.26
export function erf(x: number): number {
  const sign = x >= 0 ? 1 : -1;
  const absX = Math.abs(x);
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;

  const t = 1.0 / (1.0 + p * absX);
  const y = 1.0 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-absX * absX);
  return sign * y;
}

// Standard Normal CDF: Phi(z) = 0.5 * (1 + erf(z / sqrt(2)))
export function normalCdf(z: number): number {
  return 0.5 * (1 + erf(z / Math.SQRT2));
}

// -------------------------------------------------------------
// 1. General Probability Engine
// -------------------------------------------------------------
export interface GeneralProbabilityInput {
  mode: 'single' | 'union' | 'intersection' | 'conditional' | 'complement';
  favorable?: number;
  total?: number;
  probA?: number; // 0 to 1
  probB?: number; // 0 to 1
  probIntersection?: number; // P(A and B)
  probBgivenA?: number; // P(B|A)
  isMutuallyExclusive?: boolean;
  isIndependent?: boolean;
}

export interface GeneralProbabilityResult {
  probability: number; // 0 to 1
  percentage: number; // 0 to 100%
  oddsInFavor: string;
  oddsAgainst: string;
  fraction: string;
  steps: string[];
}

export function calculateGeneralProbability(input: GeneralProbabilityInput): GeneralProbabilityResult {
  let p = 0;
  const steps: string[] = [];

  if (input.mode === 'single') {
    const fav = Math.max(0, input.favorable ?? 1);
    const tot = Math.max(1, input.total ?? 1);
    p = Math.min(1, fav / tot);
    steps.push(`P(A) = \\frac{\\text{Favorable Outcomes}}{\\text{Total Outcomes}} = \\frac{${fav}}{${tot}} = ${p.toFixed(4)}`);
  } else if (input.mode === 'complement') {
    const pA = Math.max(0, Math.min(1, input.probA ?? 0.5));
    p = 1 - pA;
    steps.push(`P(A') = 1 - P(A) = 1 - ${pA.toFixed(4)} = ${p.toFixed(4)}`);
  } else if (input.mode === 'union') {
    const pA = Math.max(0, Math.min(1, input.probA ?? 0.5));
    const pB = Math.max(0, Math.min(1, input.probB ?? 0.5));
    if (input.isMutuallyExclusive) {
      p = Math.min(1, pA + pB);
      steps.push(`Mutually Exclusive Addition Rule: P(A \\cup B) = P(A) + P(B)`);
      steps.push(`P(A \\cup B) = ${pA.toFixed(4)} + ${pB.toFixed(4)} = ${p.toFixed(4)}`);
    } else {
      const pInter = input.probIntersection !== undefined
        ? Math.max(0, Math.min(Math.min(pA, pB), input.probIntersection))
        : pA * pB;
      p = Math.min(1, Math.max(0, pA + pB - pInter));
      steps.push(`General Addition Rule: P(A \\cup B) = P(A) + P(B) - P(A \\cap B)`);
      steps.push(`P(A \\cup B) = ${pA.toFixed(4)} + ${pB.toFixed(4)} - ${pInter.toFixed(4)} = ${p.toFixed(4)}`);
    }
  } else if (input.mode === 'intersection') {
    const pA = Math.max(0, Math.min(1, input.probA ?? 0.5));
    if (input.isIndependent) {
      const pB = Math.max(0, Math.min(1, input.probB ?? 0.5));
      p = pA * pB;
      steps.push(`Independent Events Multiplication Rule: P(A \\cap B) = P(A) \\times P(B)`);
      steps.push(`P(A \\cap B) = ${pA.toFixed(4)} \\times ${pB.toFixed(4)} = ${p.toFixed(4)}`);
    } else {
      const pBgivenA = Math.max(0, Math.min(1, input.probBgivenA ?? 0.5));
      p = pA * pBgivenA;
      steps.push(`Dependent Events Multiplication Rule: P(A \\cap B) = P(A) \\times P(B|A)`);
      steps.push(`P(A \\cap B) = ${pA.toFixed(4)} \\times ${pBgivenA.toFixed(4)} = ${p.toFixed(4)}`);
    }
  } else if (input.mode === 'conditional') {
    const pInter = Math.max(0, Math.min(1, input.probIntersection ?? 0.2));
    const pB = Math.max(0.000001, Math.min(1, input.probB ?? 0.4));
    p = Math.min(1, pInter / pB);
    steps.push(`Conditional Probability Formula: P(A|B) = \\frac{P(A \\cap B)}{P(B)}`);
    steps.push(`P(A|B) = \\frac{${pInter.toFixed(4)}}{${pB.toFixed(4)}} = ${p.toFixed(4)}`);
  }

  p = Math.max(0, Math.min(1, p));
  const percentage = p * 100;

  // Fraction simplification
  let fraction = `${p.toFixed(4)}`;
  if (p === 0) fraction = '0';
  else if (p === 1) fraction = '1';
  else {
    const denom = 10000;
    const numer = Math.round(p * denom);
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
    const divisor = gcd(numer, denom);
    fraction = `${numer / divisor} / ${denom / divisor}`;
  }

  // Odds formatting
  let oddsInFavor = '0 : 1';
  let oddsAgainst = '1 : 0';
  if (p >= 0.999999) {
    oddsInFavor = '∞ : 1';
    oddsAgainst = '0 : 1';
  } else if (p <= 0.000001) {
    oddsInFavor = '0 : 1';
    oddsAgainst = '∞ : 1';
  } else {
    const ratio = p / (1 - p);
    if (ratio >= 1) {
      oddsInFavor = `${ratio.toFixed(2)} : 1`;
      oddsAgainst = `1 : ${ratio.toFixed(2)}`;
    } else {
      const invRatio = (1 - p) / p;
      oddsInFavor = `1 : ${invRatio.toFixed(2)}`;
      oddsAgainst = `${invRatio.toFixed(2)} : 1`;
    }
  }

  return {
    probability: p,
    percentage,
    oddsInFavor,
    oddsAgainst,
    fraction,
    steps,
  };
}

// -------------------------------------------------------------
// 2. Permutations and Combinations Engine
// -------------------------------------------------------------
export interface PermCombResult {
  n: number;
  r: number;
  nPr: number; // Permutations without repetition
  nCr: number; // Combinations without repetition
  permWithRepetition: number; // n^r
  combWithRepetition: number; // C(n+r-1, r)
  nFactorial: number;
  rFactorial: number;
  nMinusRFactorial: number;
  formulaNPr: string;
  formulaNCr: string;
}

export function calculatePermutationsCombinations(n: number, r: number): PermCombResult {
  n = Math.max(0, Math.round(n));
  r = Math.max(0, Math.round(r));

  const nPr = permutations(n, r);
  const nCr = combinations(n, r);
  const permWithRepetition = Math.pow(n, r);
  const combWithRepetition = combinations(n + r - 1, r);

  return {
    n,
    r,
    nPr,
    nCr,
    permWithRepetition,
    combWithRepetition,
    nFactorial: factorial(n),
    rFactorial: factorial(r),
    nMinusRFactorial: factorial(Math.max(0, n - r)),
    formulaNPr: `P(${n}, ${r}) = \\frac{${n}!}{( ${n} - ${r} )!} = \\frac{${factorial(n)}}{${factorial(Math.max(0, n - r))}} = ${nPr}`,
    formulaNCr: `C(${n}, ${r}) = \\frac{${n}!}{${r}!( ${n} - ${r} )!} = \\frac{${factorial(n)}}{${factorial(r)} \\times ${factorial(Math.max(0, n - r))}} = ${nCr}`,
  };
}

// -------------------------------------------------------------
// 3. Binomial Probability Engine
// -------------------------------------------------------------
export interface BinomialResult {
  n: number;
  p: number;
  k: number;
  exactProbability: number; // P(X = k)
  cumulativeLessOrEqual: number; // P(X <= k)
  cumulativeLessThan: number; // P(X < k)
  cumulativeGreaterOrEqual: number; // P(X >= k)
  cumulativeGreaterThan: number; // P(X > k)
  mean: number;
  variance: number;
  stdDev: number;
  distribution: { x: number; prob: number; cumulative: number }[];
}

export function calculateBinomialProbability(n: number, p: number, k: number): BinomialResult {
  n = Math.max(1, Math.min(200, Math.round(n)));
  p = Math.max(0, Math.min(1, p));
  k = Math.max(0, Math.min(n, Math.round(k)));

  const pmf = (trials: number, prob: number, successes: number): number => {
    if (successes < 0 || successes > trials) return 0;
    if (prob === 0) return successes === 0 ? 1 : 0;
    if (prob === 1) return successes === trials ? 1 : 0;
    const c = combinations(trials, successes);
    return c * Math.pow(prob, successes) * Math.pow(1 - prob, trials - successes);
  };

  const exactProbability = pmf(n, p, k);

  let cumulativeLessOrEqual = 0;
  let cumulativeLessThan = 0;
  const distribution: { x: number; prob: number; cumulative: number }[] = [];

  const maxPoints = Math.min(n, 50);
  for (let i = 0; i <= n; i++) {
    const probI = pmf(n, p, i);
    if (i <= k) cumulativeLessOrEqual += probI;
    if (i < k) cumulativeLessThan += probI;
    if (i <= maxPoints) {
      distribution.push({ x: i, prob: probI, cumulative: cumulativeLessOrEqual });
    }
  }

  const cumulativeGreaterOrEqual = Math.max(0, Math.min(1, 1 - cumulativeLessThan));
  const cumulativeGreaterThan = Math.max(0, Math.min(1, 1 - cumulativeLessOrEqual));

  const mean = n * p;
  const variance = n * p * (1 - p);
  const stdDev = Math.sqrt(variance);

  return {
    n,
    p,
    k,
    exactProbability,
    cumulativeLessOrEqual: Math.min(1, cumulativeLessOrEqual),
    cumulativeLessThan: Math.min(1, cumulativeLessThan),
    cumulativeGreaterOrEqual,
    cumulativeGreaterThan,
    mean,
    variance,
    stdDev,
    distribution,
  };
}

// -------------------------------------------------------------
// 4. Dice Probability Engine
// -------------------------------------------------------------
export interface DiceProbabilityResult {
  numDice: number;
  sides: number;
  targetSum: number;
  totalOutcomes: number;
  exactWays: number;
  exactProbability: number;
  atLeastWays: number;
  atLeastProbability: number;
  atMostWays: number;
  atMostProbability: number;
  minSum: number;
  maxSum: number;
  averageSum: number;
  distribution: { sum: number; ways: number; prob: number }[];
}

export function calculateDiceProbability(numDice: number, sides: number, targetSum: number): DiceProbabilityResult {
  numDice = Math.max(1, Math.min(10, Math.round(numDice)));
  sides = Math.max(2, Math.min(100, Math.round(sides)));

  const minSum = numDice;
  const maxSum = numDice * sides;
  targetSum = Math.max(minSum, Math.min(maxSum, Math.round(targetSum)));

  // DP table for number of combinations
  let dp: number[] = new Array(sides + 1).fill(0);
  for (let s = 1; s <= sides; s++) dp[s] = 1;

  for (let d = 2; d <= numDice; d++) {
    const nextDp: number[] = new Array(d * sides + 1).fill(0);
    for (let sum = d - 1; sum <= (d - 1) * sides; sum++) {
      if (!dp[sum]) continue;
      for (let s = 1; s <= sides; s++) {
        nextDp[sum + s] += dp[sum];
      }
    }
    dp = nextDp;
  }

  const totalOutcomes = Math.pow(sides, numDice);
  const exactWays = dp[targetSum] || 0;
  const exactProbability = exactWays / totalOutcomes;

  let atLeastWays = 0;
  let atMostWays = 0;
  const distribution: { sum: number; ways: number; prob: number }[] = [];

  for (let sum = minSum; sum <= maxSum; sum++) {
    const ways = dp[sum] || 0;
    if (sum >= targetSum) atLeastWays += ways;
    if (sum <= targetSum) atMostWays += ways;
    distribution.push({ sum, ways, prob: ways / totalOutcomes });
  }

  return {
    numDice,
    sides,
    targetSum,
    totalOutcomes,
    exactWays,
    exactProbability,
    atLeastWays,
    atLeastProbability: atLeastWays / totalOutcomes,
    atMostWays,
    atMostProbability: atMostWays / totalOutcomes,
    minSum,
    maxSum,
    averageSum: (numDice * (sides + 1)) / 2,
    distribution,
  };
}

// -------------------------------------------------------------
// 5. Coin Flip Probability Engine
// -------------------------------------------------------------
export interface CoinFlipResult {
  numFlips: number;
  probHeads: number;
  targetHeads: number;
  streakLength: number;
  exactProbability: number;
  atLeastProbability: number;
  atMostProbability: number;
  streakProbability: number; // Prob of at least M consecutive heads
  expectedHeads: number;
  expectedTails: number;
}

export function calculateCoinFlipProbability(
  numFlips: number,
  probHeads: number,
  targetHeads: number,
  streakLength: number
): CoinFlipResult {
  numFlips = Math.max(1, Math.min(500, Math.round(numFlips)));
  probHeads = Math.max(0, Math.min(1, probHeads));
  targetHeads = Math.max(0, Math.min(numFlips, Math.round(targetHeads)));
  streakLength = Math.max(1, Math.min(numFlips, Math.round(streakLength)));

  const bin = calculateBinomialProbability(numFlips, probHeads, targetHeads);

  // Consecutive streak probability calculation via DP
  // dp[i][j] = prob of flip sequence of length i having current streak of j heads and never reaching streakLength
  let streakProb = 0;
  if (streakLength > numFlips) {
    streakProb = 0;
  } else if (probHeads === 0) {
    streakProb = 0;
  } else if (probHeads === 1) {
    streakProb = 1;
  } else {
    // DP over length n
    let state = new Array(streakLength).fill(0);
    state[0] = 1.0; // 0 heads streak to start

    for (let step = 0; step < numFlips; step++) {
      const nextState = new Array(streakLength).fill(0);
      const probTails = 1 - probHeads;
      // Any flip getting tails resets current streak to 0
      let sumExisting = 0;
      for (let j = 0; j < streakLength; j++) {
        sumExisting += state[j];
      }
      nextState[0] = sumExisting * probTails;

      // Getting heads increments streak
      for (let j = 0; j < streakLength - 1; j++) {
        nextState[j + 1] = state[j] * probHeads;
      }
      state = nextState;
    }

    const probNeverHitStreak = state.reduce((acc, val) => acc + val, 0);
    streakProb = Math.max(0, Math.min(1, 1 - probNeverHitStreak));
  }

  return {
    numFlips,
    probHeads,
    targetHeads,
    streakLength,
    exactProbability: bin.exactProbability,
    atLeastProbability: bin.cumulativeGreaterOrEqual,
    atMostProbability: bin.cumulativeLessOrEqual,
    streakProbability: streakProb,
    expectedHeads: numFlips * probHeads,
    expectedTails: numFlips * (1 - probHeads),
  };
}

// -------------------------------------------------------------
// 6. Bayes' Theorem Engine
// -------------------------------------------------------------
export interface BayesTheoremResult {
  priorA: number; // P(A)
  priorNotA: number; // P(A')
  sensitivity: number; // P(B|A) (True positive rate)
  falseNegativeRate: number; // P(B'|A) = 1 - P(B|A)
  falsePositiveRate: number; // P(B|A')
  specificity: number; // P(B'|A') = 1 - P(B|A')
  marginalB: number; // P(B) total positive tests
  posteriorAgivenB: number; // P(A|B) Positive Predictive Value
  posteriorNotAgivenNotB: number; // P(A'|B') Negative Predictive Value
  contingency10k: {
    truePositives: number;
    falsePositives: number;
    falseNegatives: number;
    trueNegatives: number;
    totalPositives: number;
    totalNegatives: number;
  };
}

export function calculateBayesTheorem(
  priorA: number,
  sensitivity: number,
  falsePositiveRate: number
): BayesTheoremResult {
  priorA = Math.max(0.00001, Math.min(0.99999, priorA));
  sensitivity = Math.max(0.00001, Math.min(0.99999, sensitivity));
  falsePositiveRate = Math.max(0.00001, Math.min(0.99999, falsePositiveRate));

  const priorNotA = 1 - priorA;
  const falseNegativeRate = 1 - sensitivity;
  const specificity = 1 - falsePositiveRate;

  // Law of Total Probability: P(B) = P(B|A)P(A) + P(B|A')P(A')
  const marginalB = sensitivity * priorA + falsePositiveRate * priorNotA;

  // Bayes' Rule: P(A|B) = [P(B|A) * P(A)] / P(B)
  const posteriorAgivenB = (sensitivity * priorA) / marginalB;

  // NPV: P(A'|B') = [P(B'|A') * P(A')] / P(B')
  const marginalNotB = 1 - marginalB;
  const posteriorNotAgivenNotB = (specificity * priorNotA) / marginalNotB;

  // 10,000 population projection
  const pop = 10000;
  const truePositives = Math.round(pop * priorA * sensitivity);
  const falseNegatives = Math.round(pop * priorA * falseNegativeRate);
  const falsePositives = Math.round(pop * priorNotA * falsePositiveRate);
  const trueNegatives = pop - truePositives - falseNegatives - falsePositives;

  return {
    priorA,
    priorNotA,
    sensitivity,
    falseNegativeRate,
    falsePositiveRate,
    specificity,
    marginalB,
    posteriorAgivenB,
    posteriorNotAgivenNotB,
    contingency10k: {
      truePositives,
      falsePositives,
      falseNegatives,
      trueNegatives,
      totalPositives: truePositives + falsePositives,
      totalNegatives: falseNegatives + trueNegatives,
    },
  };
}

// -------------------------------------------------------------
// 7. Normal Distribution Engine
// -------------------------------------------------------------
export interface NormalDistributionResult {
  mean: number;
  stdDev: number;
  x1: number;
  x2: number;
  mode: 'left' | 'right' | 'between' | 'outside';
  z1: number;
  z2: number;
  probability: number;
  percentage: number;
}

export function calculateNormalDistribution(
  mean: number,
  stdDev: number,
  x1: number,
  x2: number,
  mode: 'left' | 'right' | 'between' | 'outside'
): NormalDistributionResult {
  stdDev = Math.max(0.0001, stdDev);
  const z1 = (x1 - mean) / stdDev;
  const z2 = (x2 - mean) / stdDev;

  const phiZ1 = normalCdf(z1);
  const phiZ2 = normalCdf(z2);

  let probability = 0;
  if (mode === 'left') {
    probability = phiZ1;
  } else if (mode === 'right') {
    probability = 1 - phiZ1;
  } else if (mode === 'between') {
    probability = Math.abs(phiZ2 - phiZ1);
  } else if (mode === 'outside') {
    probability = 1 - Math.abs(phiZ2 - phiZ1);
  }

  probability = Math.max(0, Math.min(1, probability));

  return {
    mean,
    stdDev,
    x1,
    x2,
    mode,
    z1,
    z2,
    probability,
    percentage: probability * 100,
  };
}

// -------------------------------------------------------------
// 8. Poisson Distribution Engine
// -------------------------------------------------------------
export interface PoissonResult {
  lambda: number;
  k: number;
  timeScale: number;
  effectiveLambda: number;
  exactProbability: number;
  cumulativeLessOrEqual: number;
  cumulativeLessThan: number;
  cumulativeGreaterOrEqual: number;
  cumulativeGreaterThan: number;
  mean: number;
  variance: number;
  stdDev: number;
}

export function calculatePoissonDistribution(lambda: number, k: number, timeScale: number = 1): PoissonResult {
  lambda = Math.max(0.0001, lambda);
  timeScale = Math.max(0.0001, timeScale);
  k = Math.max(0, Math.round(k));

  const effLambda = lambda * timeScale;

  const poissonPmf = (l: number, x: number): number => {
    if (x < 0) return 0;
    // Log space computation to prevent floating overflow on x!
    let logP = -l + x * Math.log(l);
    for (let i = 1; i <= x; i++) {
      logP -= Math.log(i);
    }
    return Math.exp(logP);
  };

  const exactProbability = poissonPmf(effLambda, k);

  let cumulativeLessOrEqual = 0;
  let cumulativeLessThan = 0;

  for (let i = 0; i <= k; i++) {
    const pI = poissonPmf(effLambda, i);
    cumulativeLessOrEqual += pI;
    if (i < k) cumulativeLessThan += pI;
  }

  const cumulativeGreaterOrEqual = Math.max(0, 1 - cumulativeLessThan);
  const cumulativeGreaterThan = Math.max(0, 1 - cumulativeLessOrEqual);

  return {
    lambda,
    k,
    timeScale,
    effectiveLambda: effLambda,
    exactProbability,
    cumulativeLessOrEqual: Math.min(1, cumulativeLessOrEqual),
    cumulativeLessThan: Math.min(1, cumulativeLessThan),
    cumulativeGreaterOrEqual: Math.min(1, cumulativeGreaterOrEqual),
    cumulativeGreaterThan: Math.min(1, cumulativeGreaterThan),
    mean: effLambda,
    variance: effLambda,
    stdDev: Math.sqrt(effLambda),
  };
}

// -------------------------------------------------------------
// 9. Odds Probability Engine
// -------------------------------------------------------------
export interface OddsResult {
  probabilityPercent: number; // 0 to 100
  probabilityDecimal: number; // 0 to 1
  oddsInFavor: string; // e.g. "3 : 1"
  oddsAgainst: string; // e.g. "1 : 3"
  decimalOdds: number; // European format e.g. 4.00
  fractionalOdds: string; // UK format e.g. "3/1"
  americanOdds: string; // US format e.g. "+300" or "-200"
  stake: number;
  profit: number;
  totalPayout: number;
}

export function calculateOddsProbability(
  inputType: 'probability' | 'oddsRatio' | 'decimal' | 'fractional' | 'american',
  value: string | number,
  stake: number = 100
): OddsResult {
  stake = Math.max(1, stake);
  let p = 0.5; // Probability 0 to 1

  if (inputType === 'probability') {
    const num = typeof value === 'number' ? value : parseFloat(value);
    p = Math.max(0.001, Math.min(99.999, isNaN(num) ? 50 : num)) / 100;
  } else if (inputType === 'decimal') {
    const dec = typeof value === 'number' ? value : parseFloat(value);
    if (!isNaN(dec) && dec > 1.0) {
      p = 1 / dec;
    }
  } else if (inputType === 'american') {
    const am = typeof value === 'number' ? value : parseFloat(value);
    if (!isNaN(am) && am !== 0) {
      if (am > 0) {
        p = 100 / (am + 100);
      } else {
        p = Math.abs(am) / (Math.abs(am) + 100);
      }
    }
  } else if (inputType === 'fractional' || inputType === 'oddsRatio') {
    const str = String(value).trim();
    const parts = str.split(/[/:]/).map(s => parseFloat(s.trim()));
    if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1]) && parts[1] > 0) {
      // In fractional odds A/B: profit is A on stake B -> decimal is (A+B)/B -> p = B / (A+B)
      p = parts[1] / (parts[0] + parts[1]);
    }
  }

  p = Math.max(0.0001, Math.min(0.9999, p));

  const decimalOdds = 1 / p;
  const profitPerUnit = decimalOdds - 1;
  const profit = stake * profitPerUnit;
  const totalPayout = stake + profit;

  // American odds format
  let americanOdds = '';
  if (p <= 0.5) {
    const val = Math.round((100 / p) - 100);
    americanOdds = `+${val}`;
  } else {
    const val = Math.round((100 * p) / (1 - p));
    americanOdds = `-${val}`;
  }

  // Fractional odds format approximation
  const denom = 100;
  const numer = Math.round(profitPerUnit * denom);
  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
  const divisor = gcd(numer, denom);
  const fractionalOdds = `${numer / divisor}/${denom / divisor}`;

  // Odds in favor ratio
  const ratio = p / (1 - p);
  const oddsInFavor = ratio >= 1 ? `${ratio.toFixed(2)} : 1` : `1 : ${(1 / ratio).toFixed(2)}`;
  const oddsAgainst = ratio >= 1 ? `1 : ${ratio.toFixed(2)}` : `${(1 / ratio).toFixed(2)} : 1`;

  return {
    probabilityPercent: p * 100,
    probabilityDecimal: p,
    oddsInFavor,
    oddsAgainst,
    decimalOdds: parseFloat(decimalOdds.toFixed(2)),
    fractionalOdds,
    americanOdds,
    stake,
    profit: parseFloat(profit.toFixed(2)),
    totalPayout: parseFloat(totalPayout.toFixed(2)),
  };
}

// -------------------------------------------------------------
// 10. Hypergeometric Distribution Engine
// -------------------------------------------------------------
export interface HypergeometricResult {
  populationN: number;
  successK: number;
  sampleN: number;
  observedK: number;
  exactProbability: number;
  cumulativeLessOrEqual: number;
  cumulativeGreaterOrEqual: number;
  mean: number;
  variance: number;
  stdDev: number;
}

export function calculateHypergeometricProbability(
  populationN: number,
  successK: number,
  sampleN: number,
  observedK: number
): HypergeometricResult {
  populationN = Math.max(2, Math.min(1000, Math.round(populationN)));
  successK = Math.max(0, Math.min(populationN, Math.round(successK)));
  sampleN = Math.max(1, Math.min(populationN, Math.round(sampleN)));
  observedK = Math.max(0, Math.min(sampleN, Math.min(successK, Math.round(observedK))));

  const minK = Math.max(0, sampleN - (populationN - successK));
  const maxK = Math.min(sampleN, successK);

  const hyperPmf = (N: number, K: number, n: number, k: number): number => {
    if (k < minK || k > maxK) return 0;
    const num = combinations(K, k) * combinations(N - K, n - k);
    const den = combinations(N, n);
    return den === 0 ? 0 : num / den;
  };

  const exactProbability = hyperPmf(populationN, successK, sampleN, observedK);

  let cumulativeLessOrEqual = 0;
  let cumulativeLessThan = 0;

  for (let i = minK; i <= maxK; i++) {
    const pI = hyperPmf(populationN, successK, sampleN, i);
    if (i <= observedK) cumulativeLessOrEqual += pI;
    if (i < observedK) cumulativeLessThan += pI;
  }

  const cumulativeGreaterOrEqual = Math.max(0, 1 - cumulativeLessThan);

  const mean = (sampleN * successK) / populationN;
  const variance =
    populationN > 1
      ? sampleN *
        (successK / populationN) *
        ((populationN - successK) / populationN) *
        ((populationN - sampleN) / (populationN - 1))
      : 0;

  return {
    populationN,
    successK,
    sampleN,
    observedK,
    exactProbability,
    cumulativeLessOrEqual: Math.min(1, cumulativeLessOrEqual),
    cumulativeGreaterOrEqual: Math.min(1, cumulativeGreaterOrEqual),
    mean,
    variance,
    stdDev: Math.sqrt(variance),
  };
}

// -------------------------------------------------------------
// 11. Poker Odds Engine
// -------------------------------------------------------------
export interface PokerRankOdds {
  name: string;
  count: number;
  probability: number;
  percentage: number;
  oddsAgainst: string;
}

export interface PokerOddsResult {
  ranks: PokerRankOdds[];
  potOddsAnalysis?: {
    outs: number;
    potSize: number;
    callAmount: number;
    potOddsPercent: number;
    equityTurnToRiver: number;
    equityFlopToRiver: number;
    callVerdict: string;
  };
}

export function calculatePokerOdds(outs?: number, potSize?: number, callAmount?: number): PokerOddsResult {
  const TOTAL_HANDS = 2598960; // 52 C 5

  const ranks: PokerRankOdds[] = [
    { name: 'Royal Flush', count: 4, probability: 4 / TOTAL_HANDS, percentage: (4 / TOTAL_HANDS) * 100, oddsAgainst: '649,739 : 1' },
    { name: 'Straight Flush', count: 36, probability: 36 / TOTAL_HANDS, percentage: (36 / TOTAL_HANDS) * 100, oddsAgainst: '72,192 : 1' },
    { name: 'Four of a Kind', count: 624, probability: 624 / TOTAL_HANDS, percentage: (624 / TOTAL_HANDS) * 100, oddsAgainst: '4,164 : 1' },
    { name: 'Full House', count: 3744, probability: 3744 / TOTAL_HANDS, percentage: (3744 / TOTAL_HANDS) * 100, oddsAgainst: '693 : 1' },
    { name: 'Flush', count: 5108, probability: 5108 / TOTAL_HANDS, percentage: (5108 / TOTAL_HANDS) * 100, oddsAgainst: '508 : 1' },
    { name: 'Straight', count: 10200, probability: 10200 / TOTAL_HANDS, percentage: (10200 / TOTAL_HANDS) * 100, oddsAgainst: '254 : 1' },
    { name: 'Three of a Kind', count: 54912, probability: 54912 / TOTAL_HANDS, percentage: (54912 / TOTAL_HANDS) * 100, oddsAgainst: '46.3 : 1' },
    { name: 'Two Pair', count: 123552, probability: 123552 / TOTAL_HANDS, percentage: (123552 / TOTAL_HANDS) * 100, oddsAgainst: '20.0 : 1' },
    { name: 'One Pair', count: 1098240, probability: 1098240 / TOTAL_HANDS, percentage: (1098240 / TOTAL_HANDS) * 100, oddsAgainst: '1.37 : 1' },
    { name: 'High Card', count: 1302540, probability: 1302540 / TOTAL_HANDS, percentage: (1302540 / TOTAL_HANDS) * 100, oddsAgainst: '0.995 : 1' },
  ];

  let potOddsAnalysis;
  if (outs !== undefined && potSize !== undefined && callAmount !== undefined) {
    outs = Math.max(0, Math.min(46, outs));
    potSize = Math.max(0, potSize);
    callAmount = Math.max(0.01, callAmount);

    const totalPot = potSize + callAmount;
    const potOddsPercent = (callAmount / totalPot) * 100;

    // Turn to river probability (46 unseen cards)
    const equityTurnToRiver = (outs / 46) * 100;

    // Flop to river probability (47 unseen cards): 1 - ((47-outs)/47 * (46-outs)/46)
    const missFlop = (47 - outs) / 47;
    const missTurn = (46 - outs) / 46;
    const equityFlopToRiver = (1 - missFlop * missTurn) * 100;

    let callVerdict = 'FOLD: Negative Expected Value (-EV)';
    if (equityTurnToRiver >= potOddsPercent) {
      callVerdict = 'CLEAR CALL: High Positive Expected Value (+EV)';
    } else if (equityFlopToRiver >= potOddsPercent) {
      callVerdict = 'PROFITABLE CALL (if seeing both Turn & River)';
    }

    potOddsAnalysis = {
      outs,
      potSize,
      callAmount,
      potOddsPercent,
      equityTurnToRiver,
      equityFlopToRiver,
      callVerdict,
    };
  }

  return { ranks, potOddsAnalysis };
}

// -------------------------------------------------------------
// 12. Lottery Odds Engine
// -------------------------------------------------------------
export interface LotteryTier {
  matchWhite: number;
  matchBonus: boolean;
  ways: number;
  oddsAgainst: number;
  oddsFormatted: string;
}

export interface LotteryOddsResult {
  jackpotOdds: number;
  jackpotOddsFormatted: string;
  overallOddsAnyPrize: number;
  overallOddsFormatted: string;
  expectedValue?: number;
  tiers: LotteryTier[];
}

export function calculateLotteryOdds(
  poolWhite: number,
  pickWhite: number,
  poolBonus: number = 1,
  hasBonus: boolean = true,
  ticketPrice: number = 2,
  jackpotAnnuity: number = 20000000
): LotteryOddsResult {
  poolWhite = Math.max(10, Math.min(100, Math.round(poolWhite)));
  pickWhite = Math.max(3, Math.min(10, Math.round(pickWhite)));
  poolBonus = hasBonus ? Math.max(1, Math.min(50, Math.round(poolBonus))) : 1;

  const totalWhiteCombos = combinations(poolWhite, pickWhite);
  const totalCombos = hasBonus ? totalWhiteCombos * poolBonus : totalWhiteCombos;

  const tiers: LotteryTier[] = [];
  let totalWinningWays = 0;

  for (let match = pickWhite; match >= 0; match--) {
    const bonusOptions = hasBonus ? [true, false] : [false];
    for (const matchB of bonusOptions) {
      if (match === 0 && !matchB) continue; // No prize

      const whiteWays = combinations(pickWhite, match) * combinations(poolWhite - pickWhite, pickWhite - match);
      const bonusWays = hasBonus ? (matchB ? 1 : poolBonus - 1) : 1;
      const ways = whiteWays * bonusWays;

      if (ways > 0 && ways <= totalCombos) {
        const oddsAgainst = Math.round(totalCombos / ways);
        tiers.push({
          matchWhite: match,
          matchBonus: matchB,
          ways,
          oddsAgainst,
          oddsFormatted: `1 in ${oddsAgainst.toLocaleString()}`,
        });
        totalWinningWays += ways;
      }
    }
  }

  const jackpotOdds = totalCombos;
  const overallOddsAnyPrize = totalWinningWays > 0 ? Math.round(totalCombos / totalWinningWays) : totalCombos;

  // Expected value estimate based on jackpot
  const ev = (jackpotAnnuity / totalCombos) - ticketPrice;

  return {
    jackpotOdds,
    jackpotOddsFormatted: `1 in ${jackpotOdds.toLocaleString()}`,
    overallOddsAnyPrize,
    overallOddsFormatted: `1 in ${overallOddsAnyPrize.toLocaleString()}`,
    expectedValue: parseFloat(ev.toFixed(2)),
    tiers,
  };
}
