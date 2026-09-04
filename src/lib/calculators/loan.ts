export interface LoanAmortizationYear {
  year: number;
  principalPaid: number;
  interestPaid: number;
  remainingBalance: number;
}

export interface LoanResult {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  loanAmount: number;
  annualSchedule: LoanAmortizationYear[];
}

export function calculateLoan(
  principal: number,
  annualInterestRate: number,
  termYears: number
): LoanResult {
  const p = Math.max(0, principal || 0);
  const r = Math.max(0, annualInterestRate || 0) / 100 / 12;
  const n = Math.max(1, Math.round(termYears * 12));

  if (p === 0) {
    return {
      monthlyPayment: 0,
      totalPayment: 0,
      totalInterest: 0,
      loanAmount: 0,
      annualSchedule: [],
    };
  }

  let monthlyPayment = 0;
  if (r === 0) {
    monthlyPayment = p / n;
  } else {
    monthlyPayment = (p * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);
  }

  let balance = p;
  const annualSchedule: LoanAmortizationYear[] = [];
  let totalInterest = 0;
  let yearPrincipal = 0;
  let yearInterest = 0;

  for (let month = 1; month <= n; month++) {
    const interestMonth = balance * r;
    const principalMonth = monthlyPayment - interestMonth;
    balance = Math.max(0, balance - principalMonth);

    yearPrincipal += principalMonth;
    yearInterest += interestMonth;
    totalInterest += interestMonth;

    if (month % 12 === 0 || month === n) {
      annualSchedule.push({
        year: Math.ceil(month / 12),
        principalPaid: Math.round(yearPrincipal * 100) / 100,
        interestPaid: Math.round(yearInterest * 100) / 100,
        remainingBalance: Math.round(balance * 100) / 100,
      });
      yearPrincipal = 0;
      yearInterest = 0;
    }
  }

  const totalPayment = p + totalInterest;

  return {
    monthlyPayment: Math.round(monthlyPayment * 100) / 100,
    totalPayment: Math.round(totalPayment * 100) / 100,
    totalInterest: Math.round(totalInterest * 100) / 100,
    loanAmount: p,
    annualSchedule,
  };
}
