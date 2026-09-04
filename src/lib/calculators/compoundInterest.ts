export type CompoundFrequency = 1 | 2 | 4 | 12 | 365;

export interface CompoundYearSchedule {
  year: number;
  startingBalance: number;
  totalContributed: number;
  interestEarned: number;
  totalInterestToDate: number;
  endingBalance: number;
}

export interface CompoundInterestResult {
  futureValue: number;
  totalPrincipal: number;
  totalContributions: number;
  totalInterest: number;
  schedule: CompoundYearSchedule[];
}

export function calculateCompoundInterest(
  principal: number,
  annualRatePercent: number,
  years: number,
  monthlyContribution: number = 0,
  frequency: CompoundFrequency = 12
): CompoundInterestResult {
  const p = Math.max(0, principal || 0);
  const r = Math.max(0, annualRatePercent || 0) / 100;
  const t = Math.max(1, Math.min(100, Math.floor(years || 1)));
  const pmt = Math.max(0, monthlyContribution || 0);
  const n = frequency;

  let currentBalance = p;
  let totalContributed = p;
  let cumulativeInterest = 0;
  const schedule: CompoundYearSchedule[] = [];

  const ratePerPeriod = r / n;
  const periodsPerYear = n;
  // If monthly contribution, we convert monthly contribution to match frequency
  const contributionPerPeriod = (pmt * 12) / periodsPerYear;

  for (let year = 1; year <= t; year++) {
    const startingBalance = currentBalance;
    let yearInterest = 0;

    for (let period = 1; period <= periodsPerYear; period++) {
      const interestInPeriod = currentBalance * ratePerPeriod;
      yearInterest += interestInPeriod;
      currentBalance += interestInPeriod + contributionPerPeriod;
      totalContributed += contributionPerPeriod;
    }

    cumulativeInterest += yearInterest;

    schedule.push({
      year,
      startingBalance: Math.round(startingBalance * 100) / 100,
      totalContributed: Math.round(totalContributed * 100) / 100,
      interestEarned: Math.round(yearInterest * 100) / 100,
      totalInterestToDate: Math.round(cumulativeInterest * 100) / 100,
      endingBalance: Math.round(currentBalance * 100) / 100,
    });
  }

  const futureValue = Math.round(currentBalance * 100) / 100;
  const totalPrincipal = p;
  const totalAdditionalContributions = Math.round((totalContributed - p) * 100) / 100;
  const totalInterest = Math.round(cumulativeInterest * 100) / 100;

  return {
    futureValue,
    totalPrincipal,
    totalContributions: totalAdditionalContributions,
    totalInterest,
    schedule,
  };
}
