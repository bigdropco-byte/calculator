export interface PercentageIncreaseResult {
  initialValue: number;
  finalValue: number;
  difference: number;
  percentageChange: number;
  isIncrease: boolean;
  multiplier: number;
}

export function calculatePercentageIncrease(
  initialValue: number,
  finalValue: number
): PercentageIncreaseResult {
  if (isNaN(initialValue) || isNaN(finalValue)) {
    return {
      initialValue: 0,
      finalValue: 0,
      difference: 0,
      percentageChange: 0,
      isIncrease: true,
      multiplier: 1,
    };
  }

  const difference = finalValue - initialValue;

  if (initialValue === 0) {
    return {
      initialValue,
      finalValue,
      difference,
      percentageChange: finalValue === 0 ? 0 : 100,
      isIncrease: finalValue >= 0,
      multiplier: finalValue === 0 ? 1 : Infinity,
    };
  }

  const percentageChange = (difference / Math.abs(initialValue)) * 100;
  const multiplier = finalValue / initialValue;

  return {
    initialValue,
    finalValue,
    difference,
    percentageChange: Math.abs(percentageChange),
    isIncrease: difference >= 0,
    multiplier: isNaN(multiplier) ? 1 : multiplier,
  };
}
