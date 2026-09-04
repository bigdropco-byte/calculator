export interface MortgageInputs {
  homePrice: number;
  downPayment: number;
  isDownPaymentPercent: boolean;
  interestRate: number;
  loanTermYears: number;
  annualPropertyTaxRate?: number; // e.g. 1.2%
  annualHomeInsurance?: number; // e.g. $1,200
  monthlyHoa?: number; // e.g. $0
}

export interface MortgageResult {
  homePrice: number;
  downPaymentAmount: number;
  loanAmount: number;
  monthlyPrincipalAndInterest: number;
  monthlyPropertyTax: number;
  monthlyHomeInsurance: number;
  monthlyHoa: number;
  monthlyPmi: number;
  totalMonthlyPayment: number;
  totalLoanPayments: number;
  totalInterestPaid: number;
}

export function calculateMortgage(inputs: MortgageInputs): MortgageResult {
  const price = Math.max(0, inputs.homePrice || 0);
  let downPaymentAmount = 0;
  if (inputs.isDownPaymentPercent) {
    downPaymentAmount = (price * Math.min(100, Math.max(0, inputs.downPayment || 0))) / 100;
  } else {
    downPaymentAmount = Math.min(price, Math.max(0, inputs.downPayment || 0));
  }

  const loanAmount = Math.max(0, price - downPaymentAmount);
  const r = Math.max(0, inputs.interestRate || 0) / 100 / 12;
  const n = Math.max(1, (inputs.loanTermYears || 30) * 12);

  let monthlyPrincipalAndInterest = 0;
  if (loanAmount > 0) {
    if (r === 0) {
      monthlyPrincipalAndInterest = loanAmount / n;
    } else {
      monthlyPrincipalAndInterest =
        (loanAmount * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);
    }
  }

  // Monthly property tax
  const taxRate = inputs.annualPropertyTaxRate !== undefined ? inputs.annualPropertyTaxRate : 1.2;
  const monthlyPropertyTax = (price * (taxRate / 100)) / 12;

  // Monthly home insurance
  const insuranceAnnual = inputs.annualHomeInsurance !== undefined ? inputs.annualHomeInsurance : 1200;
  const monthlyHomeInsurance = insuranceAnnual / 12;

  // HOA
  const monthlyHoa = inputs.monthlyHoa || 0;

  // PMI: usually around 0.5% - 1% of loan amount if down payment < 20%
  const downPaymentPercent = price > 0 ? (downPaymentAmount / price) * 100 : 0;
  let monthlyPmi = 0;
  if (downPaymentPercent < 20 && loanAmount > 0) {
    monthlyPmi = (loanAmount * 0.0075) / 12; // 0.75% per year
  }

  const totalMonthlyPayment =
    monthlyPrincipalAndInterest +
    monthlyPropertyTax +
    monthlyHomeInsurance +
    monthlyHoa +
    monthlyPmi;

  const totalLoanPayments = monthlyPrincipalAndInterest * n;
  const totalInterestPaid = Math.max(0, totalLoanPayments - loanAmount);

  return {
    homePrice: price,
    downPaymentAmount: Math.round(downPaymentAmount * 100) / 100,
    loanAmount: Math.round(loanAmount * 100) / 100,
    monthlyPrincipalAndInterest: Math.round(monthlyPrincipalAndInterest * 100) / 100,
    monthlyPropertyTax: Math.round(monthlyPropertyTax * 100) / 100,
    monthlyHomeInsurance: Math.round(monthlyHomeInsurance * 100) / 100,
    monthlyHoa: Math.round(monthlyHoa * 100) / 100,
    monthlyPmi: Math.round(monthlyPmi * 100) / 100,
    totalMonthlyPayment: Math.round(totalMonthlyPayment * 100) / 100,
    totalLoanPayments: Math.round(totalLoanPayments * 100) / 100,
    totalInterestPaid: Math.round(totalInterestPaid * 100) / 100,
  };
}
