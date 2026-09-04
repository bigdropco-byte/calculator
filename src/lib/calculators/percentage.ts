export interface PercentageResult {
  percentOf: number; // What is X% of Y?
  isWhatPercentOf: number; // X is what % of Y?
  percentChange: number; // % change from X to Y
  isIncrease: boolean;
}

export function calculatePercentOf(percent: number, total: number): number {
  if (isNaN(percent) || isNaN(total)) return 0;
  return (percent / 100) * total;
}

export function calculateIsWhatPercentOf(value: number, total: number): number {
  if (isNaN(value) || isNaN(total) || total === 0) return 0;
  return (value / total) * 100;
}

export function calculatePercentageChange(from: number, to: number): { change: number; isIncrease: boolean } {
  if (isNaN(from) || isNaN(to) || from === 0) {
    return { change: 0, isIncrease: to >= from };
  }
  const diff = to - from;
  const change = (diff / Math.abs(from)) * 100;
  return {
    change: Math.abs(change),
    isIncrease: diff >= 0,
  };
}
