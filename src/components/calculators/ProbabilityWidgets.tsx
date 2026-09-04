'use client';

import React, { useState, useId } from 'react';
import {
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
} from '@/lib/calculators/probabilityEngines';

// -------------------------------------------------------------
// 1. General Probability Widget
// -------------------------------------------------------------
export function ProbabilityWidget() {
  const [mode, setMode] = useState<'single' | 'union' | 'intersection' | 'conditional' | 'complement'>('single');
  const [favorable, setFavorable] = useState('1');
  const [total, setTotal] = useState('6');
  const [probA, setProbA] = useState('0.5');
  const [probB, setProbB] = useState('0.5');
  const [probIntersection, setProbIntersection] = useState('0.2');
  const [probBgivenA, setProbBgivenA] = useState('0.4');
  const [isMutuallyExclusive, setIsMutuallyExclusive] = useState(false);
  const [isIndependent, setIsIndependent] = useState(true);

  const res = calculateGeneralProbability({
    mode,
    favorable: parseFloat(favorable) || 0,
    total: parseFloat(total) || 1,
    probA: parseFloat(probA) || 0,
    probB: parseFloat(probB) || 0,
    probIntersection: parseFloat(probIntersection) || 0,
    probBgivenA: parseFloat(probBgivenA) || 0,
    isMutuallyExclusive,
    isIndependent,
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {(['single', 'union', 'intersection', 'conditional', 'complement'] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              mode === m ? 'bg-sky-600 text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {m === 'single' && 'Single Event P(A)'}
            {m === 'union' && 'Union P(A ∪ B)'}
            {m === 'intersection' && 'Intersection P(A ∩ B)'}
            {m === 'conditional' && 'Conditional P(A|B)'}
            {m === 'complement' && "Complement P(A')"}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mode === 'single' && (
          <>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Favorable Outcomes (A)</label>
              <input
                type="number"
                min="0"
                value={favorable}
                onChange={(e) => setFavorable(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-base"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Total Possible Outcomes (S)</label>
              <input
                type="number"
                min="1"
                value={total}
                onChange={(e) => setTotal(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-base"
              />
            </div>
          </>
        )}

        {mode === 'complement' && (
          <div className="col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1">Probability P(A) (0 to 1)</label>
            <input
              type="number"
              step="0.01"
              min="0"
              max="1"
              value={probA}
              onChange={(e) => setProbA(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-base"
            />
          </div>
        )}

        {mode === 'union' && (
          <>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Probability P(A)</label>
              <input
                type="number"
                step="0.05"
                min="0"
                max="1"
                value={probA}
                onChange={(e) => setProbA(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-base"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Probability P(B)</label>
              <input
                type="number"
                step="0.05"
                min="0"
                max="1"
                value={probB}
                onChange={(e) => setProbB(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-base"
              />
            </div>
            <div className="col-span-2 flex items-center gap-2">
              <input
                type="checkbox"
                id="mut-excl"
                checked={isMutuallyExclusive}
                onChange={(e) => setIsMutuallyExclusive(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-sky-600"
              />
              <label htmlFor="mut-excl" className="text-sm font-medium text-slate-700">
                Events are Mutually Exclusive (cannot happen together)
              </label>
            </div>
            {!isMutuallyExclusive && (
              <div className="col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">Joint Probability P(A ∩ B)</label>
                <input
                  type="number"
                  step="0.05"
                  min="0"
                  max="1"
                  value={probIntersection}
                  onChange={(e) => setProbIntersection(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-base"
                />
              </div>
            )}
          </>
        )}

        {mode === 'intersection' && (
          <>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Probability P(A)</label>
              <input
                type="number"
                step="0.05"
                min="0"
                max="1"
                value={probA}
                onChange={(e) => setProbA(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-base"
              />
            </div>
            <div className="flex items-center gap-2 pt-6">
              <input
                type="checkbox"
                id="indep-event"
                checked={isIndependent}
                onChange={(e) => setIsIndependent(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-sky-600"
              />
              <label htmlFor="indep-event" className="text-sm font-medium text-slate-700">
                Independent Events
              </label>
            </div>
            {isIndependent ? (
              <div className="col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">Probability P(B)</label>
                <input
                  type="number"
                  step="0.05"
                  min="0"
                  max="1"
                  value={probB}
                  onChange={(e) => setProbB(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-base"
                />
              </div>
            ) : (
              <div className="col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">Conditional Probability P(B|A)</label>
                <input
                  type="number"
                  step="0.05"
                  min="0"
                  max="1"
                  value={probBgivenA}
                  onChange={(e) => setProbBgivenA(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-base"
                />
              </div>
            )}
          </>
        )}

        {mode === 'conditional' && (
          <>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Joint Probability P(A ∩ B)</label>
              <input
                type="number"
                step="0.05"
                min="0"
                max="1"
                value={probIntersection}
                onChange={(e) => setProbIntersection(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-base"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Given Condition P(B)</label>
              <input
                type="number"
                step="0.05"
                min="0.0001"
                max="1"
                value={probB}
                onChange={(e) => setProbB(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-base"
              />
            </div>
          </>
        )}
      </div>

      <div className="p-5 bg-sky-50 border border-sky-200 rounded-xl space-y-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-sky-800">Result Probability</div>
          <div className="text-4xl font-extrabold text-sky-950 mt-1">
            {res.percentage.toFixed(2)}%
          </div>
          <div className="text-sm font-medium text-sky-700 mt-0.5">
            Decimal: {res.probability.toFixed(6)} • Fraction: {res.fraction}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-sky-200 text-sm">
          <div>
            <span className="text-slate-600">Odds in Favor:</span>{' '}
            <strong className="text-slate-900">{res.oddsInFavor}</strong>
          </div>
          <div>
            <span className="text-slate-600">Odds Against:</span>{' '}
            <strong className="text-slate-900">{res.oddsAgainst}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 2. Permutations & Combinations Widget
// -------------------------------------------------------------
export function PermutationsCombinationsWidget() {
  const [n, setN] = useState('8');
  const [r, setR] = useState('3');

  const res = calculatePermutationsCombinations(parseFloat(n) || 0, parseFloat(r) || 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Total Set Size (n)</label>
          <input
            type="number"
            min="0"
            max="100"
            value={n}
            onChange={(e) => setN(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-base"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Subset / Sample Chosen (r)</label>
          <input
            type="number"
            min="0"
            max={n}
            value={r}
            onChange={(e) => setR(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-base"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 bg-sky-50 border border-sky-200 rounded-xl">
          <div className="text-xs font-semibold text-sky-800 uppercase tracking-wider">Combinations nCr (Order Does Not Matter)</div>
          <div className="text-3xl font-extrabold text-sky-950 mt-1">{res.nCr.toLocaleString()}</div>
          <div className="text-xs text-sky-700 mt-1">Teams, lottery draws, hand of cards</div>
        </div>
        <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-xl">
          <div className="text-xs font-semibold text-indigo-800 uppercase tracking-wider">Permutations nPr (Order Matters)</div>
          <div className="text-3xl font-extrabold text-indigo-950 mt-1">{res.nPr.toLocaleString()}</div>
          <div className="text-xs text-indigo-700 mt-1">Podium finishes, passcodes, seating order</div>
        </div>
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
          <div className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Permutations with Repetition (nʳ)</div>
          <div className="text-2xl font-bold text-slate-900 mt-1">
            {res.permWithRepetition > 1e12 ? res.permWithRepetition.toExponential(4) : res.permWithRepetition.toLocaleString()}
          </div>
        </div>
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
          <div className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Combinations with Repetition</div>
          <div className="text-2xl font-bold text-slate-900 mt-1">{res.combWithRepetition.toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 3. Binomial Probability Widget
// -------------------------------------------------------------
export function BinomialWidget() {
  const [n, setN] = useState('10');
  const [p, setP] = useState('0.5');
  const [k, setK] = useState('5');

  const res = calculateBinomialProbability(parseFloat(n) || 1, parseFloat(p) || 0, parseFloat(k) || 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Number of Trials (n)</label>
          <input
            type="number"
            min="1"
            max="150"
            value={n}
            onChange={(e) => setN(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-base"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Probability of Success (p)</label>
          <input
            type="number"
            step="0.05"
            min="0"
            max="1"
            value={p}
            onChange={(e) => setP(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-base"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Target Successes (k)</label>
          <input
            type="number"
            min="0"
            max={n}
            value={k}
            onChange={(e) => setK(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-base"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-sky-50 border border-sky-200 rounded-xl">
          <div className="text-xs font-semibold text-sky-800 uppercase">Exact P(X = {res.k})</div>
          <div className="text-3xl font-extrabold text-sky-950 mt-1">{(res.exactProbability * 100).toFixed(2)}%</div>
          <div className="text-xs text-sky-700 mt-1">{res.exactProbability.toFixed(5)}</div>
        </div>
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
          <div className="text-xs font-semibold text-slate-600 uppercase">At Least P(X ≥ {res.k})</div>
          <div className="text-2xl font-bold text-slate-900 mt-1">{(res.cumulativeGreaterOrEqual * 100).toFixed(2)}%</div>
        </div>
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
          <div className="text-xs font-semibold text-slate-600 uppercase">At Most P(X ≤ {res.k})</div>
          <div className="text-2xl font-bold text-slate-900 mt-1">{(res.cumulativeLessOrEqual * 100).toFixed(2)}%</div>
        </div>
      </div>

      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-wrap justify-between text-sm">
        <div><span className="text-slate-500">Mean (μ = np):</span> <strong>{res.mean.toFixed(2)}</strong></div>
        <div><span className="text-slate-500">Variance (σ²):</span> <strong>{res.variance.toFixed(2)}</strong></div>
        <div><span className="text-slate-500">Std Dev (σ):</span> <strong>{res.stdDev.toFixed(2)}</strong></div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 4. Dice Probability Widget
// -------------------------------------------------------------
export function DiceProbabilityWidget() {
  const [numDice, setNumDice] = useState('2');
  const [sides, setSides] = useState('6');
  const [targetSum, setTargetSum] = useState('7');

  const res = calculateDiceProbability(parseFloat(numDice) || 1, parseFloat(sides) || 6, parseFloat(targetSum) || 7);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Number of Dice</label>
          <input
            type="number"
            min="1"
            max="10"
            value={numDice}
            onChange={(e) => setNumDice(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-base"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Die Type</label>
          <select
            value={sides}
            onChange={(e) => setSides(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-base bg-white"
          >
            <option value="4">d4 (4-sided)</option>
            <option value="6">d6 (Standard 6-sided)</option>
            <option value="8">d8 (8-sided)</option>
            <option value="10">d10 (10-sided)</option>
            <option value="12">d12 (12-sided)</option>
            <option value="20">d20 (20-sided / D&D)</option>
            <option value="100">d100 (Percentile)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Target Sum ({res.minSum} to {res.maxSum})</label>
          <input
            type="number"
            min={res.minSum}
            max={res.maxSum}
            value={targetSum}
            onChange={(e) => setTargetSum(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-base"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-sky-50 border border-sky-200 rounded-xl">
          <div className="text-xs font-semibold text-sky-800 uppercase">Exact Sum = {res.targetSum}</div>
          <div className="text-3xl font-extrabold text-sky-950 mt-1">{(res.exactProbability * 100).toFixed(2)}%</div>
          <div className="text-xs text-sky-700 mt-1">{res.exactWays} of {res.totalOutcomes} combinations</div>
        </div>
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
          <div className="text-xs font-semibold text-slate-600 uppercase">At Least Sum ≥ {res.targetSum}</div>
          <div className="text-2xl font-bold text-slate-900 mt-1">{(res.atLeastProbability * 100).toFixed(2)}%</div>
          <div className="text-xs text-slate-500 mt-1">{res.atLeastWays} combinations</div>
        </div>
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
          <div className="text-xs font-semibold text-slate-600 uppercase">At Most Sum ≤ {res.targetSum}</div>
          <div className="text-2xl font-bold text-slate-900 mt-1">{(res.atMostProbability * 100).toFixed(2)}%</div>
          <div className="text-xs text-slate-500 mt-1">{res.atMostWays} combinations</div>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 5. Coin Flip Probability Widget
// -------------------------------------------------------------
export function CoinFlipWidget() {
  const [flips, setFlips] = useState('10');
  const [prob, setProb] = useState('0.5');
  const [targetHeads, setTargetHeads] = useState('5');
  const [streak, setStreak] = useState('3');

  const res = calculateCoinFlipProbability(
    parseFloat(flips) || 1,
    parseFloat(prob) || 0.5,
    parseFloat(targetHeads) || 0,
    parseFloat(streak) || 1
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Total Flips (n)</label>
          <input
            type="number"
            min="1"
            max="500"
            value={flips}
            onChange={(e) => setFlips(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-base"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Coin Bias (P(Heads))</label>
          <input
            type="number"
            step="0.05"
            min="0"
            max="1"
            value={prob}
            onChange={(e) => setProb(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-base"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Target Heads (k)</label>
          <input
            type="number"
            min="0"
            max={flips}
            value={targetHeads}
            onChange={(e) => setTargetHeads(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-base"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Consecutive Streak (m)</label>
          <input
            type="number"
            min="1"
            max={flips}
            value={streak}
            onChange={(e) => setStreak(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-base"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-sky-50 border border-sky-200 rounded-xl">
          <div className="text-xs font-semibold text-sky-800 uppercase">Exact {res.targetHeads} Heads</div>
          <div className="text-3xl font-extrabold text-sky-950 mt-1">{(res.exactProbability * 100).toFixed(2)}%</div>
          <div className="text-xs text-sky-700 mt-1">Expected: {res.expectedHeads.toFixed(1)} heads</div>
        </div>
        <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-xl">
          <div className="text-xs font-semibold text-indigo-800 uppercase">Streak ≥ {res.streakLength} In a Row</div>
          <div className="text-3xl font-extrabold text-indigo-950 mt-1">{(res.streakProbability * 100).toFixed(2)}%</div>
          <div className="text-xs text-indigo-700 mt-1">Probability of consecutive streak</div>
        </div>
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
          <div className="text-xs font-semibold text-slate-600 uppercase">At Least ≥ {res.targetHeads} Heads</div>
          <div className="text-2xl font-bold text-slate-900 mt-1">{(res.atLeastProbability * 100).toFixed(2)}%</div>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 6. Bayes' Theorem Widget
// -------------------------------------------------------------
export function BayesTheoremWidget() {
  const [prior, setPrior] = useState('0.01'); // 1%
  const [sensitivity, setSensitivity] = useState('0.95'); // 95%
  const [falsePos, setFalsePos] = useState('0.05'); // 5%

  const res = calculateBayesTheorem(parseFloat(prior) || 0.01, parseFloat(sensitivity) || 0.95, parseFloat(falsePos) || 0.05);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Base Rate / Prior P(A)</label>
          <input
            type="number"
            step="0.005"
            min="0.0001"
            max="0.99"
            value={prior}
            onChange={(e) => setPrior(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-base"
          />
          <p className="text-xs text-slate-500 mt-1">e.g. 0.01 = 1% prevalence</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Sensitivity P(B|A)</label>
          <input
            type="number"
            step="0.01"
            min="0.01"
            max="0.99"
            value={sensitivity}
            onChange={(e) => setSensitivity(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-base"
          />
          <p className="text-xs text-slate-500 mt-1">True positive detection rate</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">False Positive Rate P(B|A&apos;)</label>
          <input
            type="number"
            step="0.01"
            min="0.001"
            max="0.99"
            value={falsePos}
            onChange={(e) => setFalsePos(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-base"
          />
          <p className="text-xs text-slate-500 mt-1">1 - Specificity</p>
        </div>
      </div>

      <div className="p-5 bg-sky-50 border border-sky-200 rounded-xl">
        <div className="text-xs font-semibold text-sky-800 uppercase tracking-wider">
          Posterior Probability P(A|B) [Positive Predictive Value]
        </div>
        <div className="text-4xl font-extrabold text-sky-950 mt-1">
          {(res.posteriorAgivenB * 100).toFixed(2)}%
        </div>
        <p className="text-sm text-sky-800 mt-1">
          If you test positive, the probability you genuinely have condition A is <strong>{(res.posteriorAgivenB * 100).toFixed(1)}%</strong>.
        </p>
      </div>

      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
        <h4 className="text-sm font-bold text-slate-800">10,000 Person Population Breakdown</h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-sm pt-2">
          <div className="p-2 bg-emerald-50 border border-emerald-200 rounded-lg">
            <div className="text-xs text-emerald-700 font-semibold">True Positives</div>
            <div className="text-lg font-bold text-emerald-950">{res.contingency10k.truePositives}</div>
          </div>
          <div className="p-2 bg-rose-50 border border-rose-200 rounded-lg">
            <div className="text-xs text-rose-700 font-semibold">False Positives</div>
            <div className="text-lg font-bold text-rose-950">{res.contingency10k.falsePositives}</div>
          </div>
          <div className="p-2 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="text-xs text-amber-700 font-semibold">False Negatives</div>
            <div className="text-lg font-bold text-amber-950">{res.contingency10k.falseNegatives}</div>
          </div>
          <div className="p-2 bg-slate-100 border border-slate-300 rounded-lg">
            <div className="text-xs text-slate-700 font-semibold">True Negatives</div>
            <div className="text-lg font-bold text-slate-950">{res.contingency10k.trueNegatives}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 7. Normal Distribution Widget
// -------------------------------------------------------------
export function NormalDistributionWidget() {
  const [mean, setMean] = useState('100');
  const [stdDev, setStdDev] = useState('15');
  const [x1, setX1] = useState('100');
  const [x2, setX2] = useState('115');
  const [mode, setMode] = useState<'left' | 'right' | 'between' | 'outside'>('between');

  const res = calculateNormalDistribution(
    parseFloat(mean) || 0,
    parseFloat(stdDev) || 1,
    parseFloat(x1) || 0,
    parseFloat(x2) || 0,
    mode
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Mean (μ)</label>
          <input
            type="number"
            value={mean}
            onChange={(e) => setMean(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-base"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Standard Deviation (σ)</label>
          <input
            type="number"
            min="0.001"
            value={stdDev}
            onChange={(e) => setStdDev(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-base"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {(['left', 'right', 'between', 'outside'] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              mode === m ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {m === 'left' && 'Left-Tailed P(X ≤ x₁)'}
            {m === 'right' && 'Right-Tailed P(X ≥ x₁)'}
            {m === 'between' && 'Between P(x₁ ≤ X ≤ x₂)'}
            {m === 'outside' && 'Outside (Tails)'}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Value x₁</label>
          <input
            type="number"
            value={x1}
            onChange={(e) => setX1(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-base"
          />
        </div>
        {(mode === 'between' || mode === 'outside') && (
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Value x₂</label>
            <input
              type="number"
              value={x2}
              onChange={(e) => setX2(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-base"
            />
          </div>
        )}
      </div>

      <div className="p-5 bg-sky-50 border border-sky-200 rounded-xl">
        <div className="text-xs font-semibold text-sky-800 uppercase tracking-wider">Calculated Probability</div>
        <div className="text-4xl font-extrabold text-sky-950 mt-1">{res.percentage.toFixed(4)}%</div>
        <div className="text-sm text-sky-700 mt-1">
          z₁ score: <strong>{res.z1.toFixed(3)}</strong>
          {(mode === 'between' || mode === 'outside') && <> • z₂ score: <strong>{res.z2.toFixed(3)}</strong></>}
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 8. Poisson Distribution Widget
// -------------------------------------------------------------
export function PoissonWidget() {
  const [lambda, setLambda] = useState('4');
  const [k, setK] = useState('4');
  const [scale, setScale] = useState('1');

  const res = calculatePoissonDistribution(parseFloat(lambda) || 1, parseFloat(k) || 0, parseFloat(scale) || 1);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Average Rate (λ)</label>
          <input
            type="number"
            step="0.5"
            min="0.01"
            value={lambda}
            onChange={(e) => setLambda(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-base"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Observed Events (k)</label>
          <input
            type="number"
            min="0"
            value={k}
            onChange={(e) => setK(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-base"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Time Scale Multiplier</label>
          <input
            type="number"
            step="0.5"
            min="0.1"
            value={scale}
            onChange={(e) => setScale(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-base"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-sky-50 border border-sky-200 rounded-xl">
          <div className="text-xs font-semibold text-sky-800 uppercase">Exact P(X = {res.k})</div>
          <div className="text-3xl font-extrabold text-sky-950 mt-1">{(res.exactProbability * 100).toFixed(2)}%</div>
        </div>
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
          <div className="text-xs font-semibold text-slate-600 uppercase">At Least P(X ≥ {res.k})</div>
          <div className="text-2xl font-bold text-slate-900 mt-1">{(res.cumulativeGreaterOrEqual * 100).toFixed(2)}%</div>
        </div>
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
          <div className="text-xs font-semibold text-slate-600 uppercase">At Most P(X ≤ {res.k})</div>
          <div className="text-2xl font-bold text-slate-900 mt-1">{(res.cumulativeLessOrEqual * 100).toFixed(2)}%</div>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 9. Odds Probability Widget
// -------------------------------------------------------------
export function OddsProbabilityWidget() {
  const [format, setFormat] = useState<'probability' | 'decimal' | 'fractional' | 'american'>('american');
  const [val, setVal] = useState('+150');
  const [stake, setStake] = useState('100');

  const res = calculateOddsProbability(format, val, parseFloat(stake) || 100);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Odds Format</label>
          <select
            value={format}
            onChange={(e) => {
              const f = e.target.value as any;
              setFormat(f);
              if (f === 'american') setVal('+150');
              else if (f === 'decimal') setVal('2.50');
              else if (f === 'probability') setVal('40');
              else if (f === 'fractional') setVal('3/2');
            }}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-base bg-white"
          >
            <option value="american">American (+/- Moneyline)</option>
            <option value="decimal">Decimal (European)</option>
            <option value="fractional">Fractional (UK)</option>
            <option value="probability">Implied Probability (%)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Enter Odds / Value</label>
          <input
            type="text"
            value={val}
            onChange={(e) => setVal(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-base font-semibold"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Stake Amount ($)</label>
          <input
            type="number"
            min="1"
            value={stake}
            onChange={(e) => setStake(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-base"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3 bg-sky-50 border border-sky-200 rounded-xl text-center">
          <div className="text-xs font-semibold text-sky-800 uppercase">Implied Probability</div>
          <div className="text-2xl font-extrabold text-sky-950 mt-1">{res.probabilityPercent.toFixed(2)}%</div>
        </div>
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
          <div className="text-xs font-semibold text-slate-600 uppercase">Decimal Odds</div>
          <div className="text-2xl font-bold text-slate-900 mt-1">{res.decimalOdds.toFixed(2)}</div>
        </div>
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
          <div className="text-xs font-semibold text-slate-600 uppercase">Fractional Odds</div>
          <div className="text-2xl font-bold text-slate-900 mt-1">{res.fractionalOdds}</div>
        </div>
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
          <div className="text-xs font-semibold text-slate-600 uppercase">American Moneyline</div>
          <div className="text-2xl font-bold text-slate-900 mt-1">{res.americanOdds}</div>
        </div>
      </div>

      <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex justify-between items-center">
        <div>
          <div className="text-xs font-semibold text-emerald-800 uppercase">Potential Profit on ${res.stake}</div>
          <div className="text-2xl font-extrabold text-emerald-950 mt-0.5">${res.profit.toFixed(2)}</div>
        </div>
        <div className="text-right">
          <div className="text-xs font-semibold text-slate-600 uppercase">Total Payout (Stake + Profit)</div>
          <div className="text-xl font-bold text-slate-900 mt-0.5">${res.totalPayout.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 10. Hypergeometric Distribution Widget
// -------------------------------------------------------------
export function HypergeometricWidget() {
  const [popN, setPopN] = useState('52');
  const [successK, setSuccessK] = useState('4');
  const [sampleN, setSampleN] = useState('5');
  const [obsK, setObsK] = useState('1');

  const res = calculateHypergeometricProbability(
    parseFloat(popN) || 52,
    parseFloat(successK) || 4,
    parseFloat(sampleN) || 5,
    parseFloat(obsK) || 0
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Population (N)</label>
          <input
            type="number"
            min="2"
            value={popN}
            onChange={(e) => setPopN(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-base"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Target States (K)</label>
          <input
            type="number"
            min="0"
            max={popN}
            value={successK}
            onChange={(e) => setSuccessK(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-base"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Sample Drawn (n)</label>
          <input
            type="number"
            min="1"
            max={popN}
            value={sampleN}
            onChange={(e) => setSampleN(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-base"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Observed (k)</label>
          <input
            type="number"
            min="0"
            max={sampleN}
            value={obsK}
            onChange={(e) => setObsK(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-base"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-sky-50 border border-sky-200 rounded-xl">
          <div className="text-xs font-semibold text-sky-800 uppercase">Exact P(X = {res.observedK})</div>
          <div className="text-3xl font-extrabold text-sky-950 mt-1">{(res.exactProbability * 100).toFixed(2)}%</div>
        </div>
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
          <div className="text-xs font-semibold text-slate-600 uppercase">At Least P(X ≥ {res.observedK})</div>
          <div className="text-2xl font-bold text-slate-900 mt-1">{(res.cumulativeGreaterOrEqual * 100).toFixed(2)}%</div>
        </div>
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
          <div className="text-xs font-semibold text-slate-600 uppercase">At Most P(X ≤ {res.observedK})</div>
          <div className="text-2xl font-bold text-slate-900 mt-1">{(res.cumulativeLessOrEqual * 100).toFixed(2)}%</div>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 11. Poker Odds Widget
// -------------------------------------------------------------
export function PokerOddsWidget() {
  const [outs, setOuts] = useState('9'); // flush draw
  const [pot, setPot] = useState('100');
  const [call, setCall] = useState('25');

  const res = calculatePokerOdds(parseFloat(outs) || 0, parseFloat(pot) || 0, parseFloat(call) || 1);

  return (
    <div className="space-y-6">
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
        <h3 className="text-base font-bold text-slate-900">Texas Hold&apos;em Pot Odds & Equity Analysis</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Number of Outs</label>
            <input
              type="number"
              min="0"
              max="46"
              value={outs}
              onChange={(e) => setOuts(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-base"
            />
            <p className="text-xs text-slate-500 mt-1">e.g. 9 outs for flush draw</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Pot Size ($)</label>
            <input
              type="number"
              min="0"
              value={pot}
              onChange={(e) => setPot(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-base"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Amount to Call ($)</label>
            <input
              type="number"
              min="1"
              value={call}
              onChange={(e) => setCall(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-base"
            />
          </div>
        </div>

        {res.potOddsAnalysis && (
          <div className="p-4 bg-sky-50 border border-sky-200 rounded-lg space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-700">Pot Odds:</span>
              <strong className="text-slate-900">{res.potOddsAnalysis.potOddsPercent.toFixed(1)}%</strong>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-700">Hand Equity (Turn to River):</span>
              <strong className="text-slate-900">{res.potOddsAnalysis.equityTurnToRiver.toFixed(1)}%</strong>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-700">Hand Equity (Flop to River):</span>
              <strong className="text-slate-900">{res.potOddsAnalysis.equityFlopToRiver.toFixed(1)}%</strong>
            </div>
            <div className="pt-2 border-t border-sky-200 text-sm font-bold text-sky-950">
              Verdict: {res.potOddsAnalysis.callVerdict}
            </div>
          </div>
        )}
      </div>

      <div className="border border-slate-200 rounded-xl overflow-hidden">
        <div className="bg-slate-100 px-4 py-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
          5-Card Poker Hand Probabilities (52-Card Deck)
        </div>
        <div className="divide-y divide-slate-200 text-sm">
          {res.ranks.map((r) => (
            <div key={r.name} className="px-4 py-2.5 flex justify-between items-center hover:bg-slate-50">
              <span className="font-medium text-slate-900">{r.name}</span>
              <div className="text-right">
                <span className="font-semibold text-slate-800">{r.percentage < 0.01 ? r.percentage.toFixed(4) : r.percentage.toFixed(2)}%</span>
                <span className="text-xs text-slate-500 ml-2">({r.oddsAgainst})</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 12. Lottery Odds Widget
// -------------------------------------------------------------
export function LotteryOddsWidget() {
  const [whitePool, setWhitePool] = useState('69');
  const [whitePick, setWhitePick] = useState('5');
  const [bonusPool, setBonusPool] = useState('26');
  const [hasBonus, setHasBonus] = useState(true);
  const [ticketPrice, setTicketPrice] = useState('2');
  const [jackpot, setJackpot] = useState('20000000');

  const res = calculateLotteryOdds(
    parseFloat(whitePool) || 69,
    parseFloat(whitePick) || 5,
    parseFloat(bonusPool) || 26,
    hasBonus,
    parseFloat(ticketPrice) || 2,
    parseFloat(jackpot) || 20000000
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => { setWhitePool('69'); setWhitePick('5'); setBonusPool('26'); setHasBonus(true); }}
          className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold"
        >
          Preset: US Powerball (5/69 + 1/26)
        </button>
        <button
          type="button"
          onClick={() => { setWhitePool('70'); setWhitePick('5'); setBonusPool('25'); setHasBonus(true); }}
          className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold"
        >
          Preset: Mega Millions (5/70 + 1/25)
        </button>
        <button
          type="button"
          onClick={() => { setWhitePool('49'); setWhitePick('6'); setHasBonus(false); }}
          className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold"
        >
          Preset: Classic 6/49 (Lotto)
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">White Ball Pool</label>
          <input
            type="number"
            min="10"
            max="100"
            value={whitePool}
            onChange={(e) => setWhitePool(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-base"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">White Balls Drawn</label>
          <input
            type="number"
            min="3"
            max="10"
            value={whitePick}
            onChange={(e) => setWhitePick(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-base"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Bonus Ball Pool</label>
          <input
            type="number"
            min="1"
            max="50"
            disabled={!hasBonus}
            value={bonusPool}
            onChange={(e) => setBonusPool(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-base disabled:bg-slate-100"
          />
        </div>
        <div className="flex items-center gap-2 pt-6">
          <input
            type="checkbox"
            id="has-bonus-opt"
            checked={hasBonus}
            onChange={(e) => setHasBonus(e.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-sky-600"
          />
          <label htmlFor="has-bonus-opt" className="text-sm font-medium text-slate-700">
            Has Bonus Ball
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 bg-sky-50 border border-sky-200 rounded-xl">
          <div className="text-xs font-semibold text-sky-800 uppercase">Jackpot Odds</div>
          <div className="text-3xl font-extrabold text-sky-950 mt-1">{res.jackpotOddsFormatted}</div>
        </div>
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
          <div className="text-xs font-semibold text-emerald-800 uppercase">Overall Odds (Any Prize)</div>
          <div className="text-3xl font-extrabold text-emerald-950 mt-1">{res.overallOddsFormatted}</div>
        </div>
      </div>
    </div>
  );
}
