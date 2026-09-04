export interface AverageResult {
  count: number;
  sum: number;
  mean: number;
  median: number;
  modes: number[];
  min: number;
  max: number;
  range: number;
  values: number[];
}

export function parseNumbers(input: string): number[] {
  if (!input || !input.trim()) return [];
  // Split on commas, whitespace, tabs, newlines
  const parts = input.trim().split(/[\s,]+/);
  const numbers: number[] = [];
  for (const part of parts) {
    const clean = part.replace(/[^\d.-]/g, '');
    if (clean && !isNaN(Number(clean))) {
      numbers.push(Number(clean));
    }
  }
  return numbers;
}

export function calculateAverage(values: number[]): AverageResult {
  if (!values || values.length === 0) {
    return {
      count: 0,
      sum: 0,
      mean: 0,
      median: 0,
      modes: [],
      min: 0,
      max: 0,
      range: 0,
      values: [],
    };
  }

  const sorted = [...values].sort((a, b) => a - b);
  const count = sorted.length;
  const sum = sorted.reduce((acc, curr) => acc + curr, 0);
  const mean = sum / count;

  // Median
  let median = 0;
  const mid = Math.floor(count / 2);
  if (count % 2 === 0) {
    median = (sorted[mid - 1] + sorted[mid]) / 2;
  } else {
    median = sorted[mid];
  }

  // Modes
  const freqMap: Record<number, number> = {};
  let maxFreq = 0;
  for (const val of sorted) {
    freqMap[val] = (freqMap[val] || 0) + 1;
    if (freqMap[val] > maxFreq) {
      maxFreq = freqMap[val];
    }
  }

  let modes: number[] = [];
  if (maxFreq > 1) {
    modes = Object.keys(freqMap)
      .map(Number)
      .filter(num => freqMap[num] === maxFreq)
      .sort((a, b) => a - b);
  }

  const min = sorted[0];
  const max = sorted[count - 1];
  const range = max - min;

  return {
    count,
    sum,
    mean,
    median,
    modes,
    min,
    max,
    range,
    values: sorted,
  };
}
