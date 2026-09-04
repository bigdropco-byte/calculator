/**
 * Pure Calculation Engine: Payroll, Taxes, Wages & Earnings
 * Models Federal tax withholding, FICA, State/City taxes, and Wage conversions.
 */

export type PayFrequency = 'annual' | 'monthly' | 'semi-monthly' | 'bi-weekly' | 'weekly' | 'daily' | 'hourly';
export type FilingStatus = 'single' | 'married' | 'head_of_household';

export const FREQUENCY_FACTORS: Record<PayFrequency, number> = {
  annual: 1,
  monthly: 12,
  'semi-monthly': 24,
  'bi-weekly': 26,
  weekly: 52,
  daily: 260,
  hourly: 2080,
};

// 2025 Standard Deductions
export const STANDARD_DEDUCTION_2025: Record<FilingStatus, number> = {
  single: 15000,
  married: 30000,
  head_of_household: 22500,
};

// 2025 Federal Brackets (Single)
const FEDERAL_BRACKETS_SINGLE: [number, number][] = [
  [11925, 0.10],
  [48475, 0.12],
  [103350, 0.22],
  [197300, 0.24],
  [250525, 0.32],
  [626350, 0.35],
  [Infinity, 0.37],
];

// 2025 Federal Brackets (Married Filing Jointly)
const FEDERAL_BRACKETS_MARRIED: [number, number][] = [
  [23850, 0.10],
  [96950, 0.12],
  [206700, 0.22],
  [394600, 0.24],
  [501050, 0.32],
  [751600, 0.35],
  [Infinity, 0.37],
];

export function calculateFederalIncomeTax(annualGross: number, filingStatus: FilingStatus = 'single', preTaxDeductionsAnnual: number = 0): {
  taxableIncome: number;
  annualTax: number;
  effectiveRate: number;
  marginalRate: number;
} {
  const stdDeduction = STANDARD_DEDUCTION_2025[filingStatus];
  const taxable = Math.max(0, annualGross - preTaxDeductionsAnnual - stdDeduction);

  const brackets = filingStatus === 'married' ? FEDERAL_BRACKETS_MARRIED : FEDERAL_BRACKETS_SINGLE;
  let tax = 0;
  let prevLimit = 0;
  let marginalRate = 0.10;

  for (const [limit, rate] of brackets) {
    if (taxable > prevLimit) {
      const chunk = Math.min(taxable - prevLimit, limit - prevLimit);
      tax += chunk * rate;
      marginalRate = rate;
      prevLimit = limit;
    } else {
      break;
    }
  }

  const effectiveRate = annualGross > 0 ? (tax / annualGross) * 100 : 0;
  return {
    taxableIncome: Math.round(taxable),
    annualTax: Math.round(tax),
    effectiveRate: Number(effectiveRate.toFixed(2)),
    marginalRate: Number((marginalRate * 100).toFixed(1)),
  };
}

export function calculateFica(annualGross: number, filingStatus: FilingStatus = 'single'): {
  socialSecurity: number;
  medicare: number;
  additionalMedicare: number;
  totalFica: number;
} {
  const SS_CAP_2025 = 176100;
  const ssTaxable = Math.min(annualGross, SS_CAP_2025);
  const socialSecurity = ssTaxable * 0.062;

  const medicareBase = annualGross * 0.0145;
  const addMedicareThreshold = filingStatus === 'married' ? 250000 : 200000;
  const addMedicareTaxable = Math.max(0, annualGross - addMedicareThreshold);
  const additionalMedicare = addMedicareTaxable * 0.009;

  const medicare = medicareBase + additionalMedicare;
  const totalFica = socialSecurity + medicare;

  return {
    socialSecurity: Math.round(socialSecurity),
    medicare: Math.round(medicare),
    additionalMedicare: Math.round(additionalMedicare),
    totalFica: Math.round(totalFica),
  };
}

export type SupportedState =
  | 'CA' | 'TX' | 'FL' | 'NY' | 'NYC' | 'NJ' | 'IL' | 'Chicago'
  | 'PA' | 'OH' | 'GA' | 'CO' | 'IN' | 'NC' | 'MI';

export function calculateStateTax(state: SupportedState, annualGross: number): {
  stateTax: number;
  localTax: number;
  stateDisability: number;
  stateEffectiveRate: number;
  stateName: string;
} {
  let stateTax = 0;
  let localTax = 0;
  let stateDisability = 0;
  let stateName: string = state;

  switch (state) {
    case 'TX':
      stateName = 'Texas';
      // 0% state tax
      break;
    case 'FL':
      stateName = 'Florida';
      // 0% state tax
      break;
    case 'CA':
      stateName = 'California';
      // CA progressive: approx 1% to 12.3% (effective ~4.5% on median, higher on upper)
      if (annualGross < 20000) stateTax = annualGross * 0.015;
      else if (annualGross < 60000) stateTax = 300 + (annualGross - 20000) * 0.04;
      else if (annualGross < 120000) stateTax = 1900 + (annualGross - 60000) * 0.065;
      else stateTax = 5800 + (annualGross - 120000) * 0.093;
      stateDisability = Math.min(annualGross * 0.011, 1680); // CA SDI ~1.1%
      break;
    case 'NY':
      stateName = 'New York';
      if (annualGross < 30000) stateTax = annualGross * 0.04;
      else if (annualGross < 80000) stateTax = 1200 + (annualGross - 30000) * 0.055;
      else stateTax = 3950 + (annualGross - 80000) * 0.065;
      break;
    case 'NYC':
      stateName = 'New York City';
      // NY State
      if (annualGross < 30000) stateTax = annualGross * 0.04;
      else if (annualGross < 80000) stateTax = 1200 + (annualGross - 30000) * 0.055;
      else stateTax = 3950 + (annualGross - 80000) * 0.065;
      // NYC Resident local tax ~3.078% to 3.876%
      localTax = annualGross * 0.035;
      break;
    case 'NJ':
      stateName = 'New Jersey';
      if (annualGross < 20000) stateTax = annualGross * 0.014;
      else if (annualGross < 50000) stateTax = 280 + (annualGross - 20000) * 0.0175;
      else if (annualGross < 75000) stateTax = 805 + (annualGross - 50000) * 0.035;
      else stateTax = 1680 + (annualGross - 75000) * 0.05525;
      stateDisability = Math.min(annualGross * 0.0042, 650); // NJ SUI/FLI
      break;
    case 'IL':
      stateName = 'Illinois';
      stateTax = annualGross * 0.0495; // Flat 4.95%
      break;
    case 'Chicago':
      stateName = 'Chicago (Illinois)';
      stateTax = annualGross * 0.0495; // IL flat 4.95%
      break;
    case 'PA':
      stateName = 'Pennsylvania';
      stateTax = annualGross * 0.0307; // Flat 3.07%
      localTax = annualGross * 0.015; // Local EIT avg 1.5%
      break;
    case 'OH':
      stateName = 'Ohio';
      if (annualGross > 26050) stateTax = Math.min(annualGross * 0.0275, 4500);
      localTax = annualGross * 0.018; // Municipal income tax avg 1.8%
      break;
    case 'GA':
      stateName = 'Georgia';
      stateTax = Math.max(0, annualGross - 12000) * 0.0549; // Flat 5.49% above personal exemption
      break;
    case 'CO':
      stateName = 'Colorado';
      stateTax = annualGross * 0.044; // Flat 4.4%
      stateDisability = Math.min(annualGross * 0.0045, 750); // CO FAMLI 0.45%
      break;
    case 'IN':
      stateName = 'Indiana';
      stateTax = annualGross * 0.0305; // Flat 3.05%
      localTax = annualGross * 0.015; // County income tax avg 1.5%
      break;
    case 'NC':
      stateName = 'North Carolina';
      stateTax = annualGross * 0.045; // Flat 4.5%
      break;
    case 'MI':
      stateName = 'Michigan';
      stateTax = annualGross * 0.0425; // Flat 4.25%
      break;
  }

  const totalStateDeduction = stateTax + localTax + stateDisability;
  const stateEffectiveRate = annualGross > 0 ? (totalStateDeduction / annualGross) * 100 : 0;

  return {
    stateTax: Math.round(stateTax),
    localTax: Math.round(localTax),
    stateDisability: Math.round(stateDisability),
    stateEffectiveRate: Number(stateEffectiveRate.toFixed(2)),
    stateName,
  };
}

export interface PaycheckResult {
  grossPayPerPeriod: number;
  netPayPerPeriod: number;
  federalTaxPerPeriod: number;
  ficaPerPeriod: number;
  socialSecurityPerPeriod: number;
  medicarePerPeriod: number;
  stateTaxPerPeriod: number;
  localTaxPerPeriod: number;
  otherStateDeductionsPerPeriod: number;
  preTaxDeductionsPerPeriod: number;
  annualGross: number;
  annualNet: number;
  annualFederalTax: number;
  annualFica: number;
  annualStateTax: number;
  totalTaxBurden: number;
  effectiveTaxRate: number;
  payFrequency: PayFrequency;
}

export function calculateComprehensivePaycheck(options: {
  grossPay: number;
  frequency: PayFrequency;
  filingStatus?: FilingStatus;
  state?: SupportedState | 'none';
  preTax401k?: number; // per period
  preTaxHealth?: number; // per period
}): PaycheckResult {
  const {
    grossPay,
    frequency,
    filingStatus = 'single',
    state = 'none',
    preTax401k = 0,
    preTaxHealth = 0,
  } = options;

  const periodsPerYear = FREQUENCY_FACTORS[frequency];
  const annualGross = frequency === 'annual' ? grossPay : grossPay * periodsPerYear;
  const preTaxPerPeriod = preTax401k + preTaxHealth;
  const preTaxAnnual = preTaxPerPeriod * periodsPerYear;

  // Federal Tax
  const fed = calculateFederalIncomeTax(annualGross, filingStatus, preTaxAnnual);

  // FICA
  const fica = calculateFica(annualGross, filingStatus);

  // State Tax
  const st = state !== 'none' ? calculateStateTax(state, annualGross) : { stateTax: 0, localTax: 0, stateDisability: 0, stateEffectiveRate: 0, stateName: 'None' };

  const annualFederalTax = fed.annualTax;
  const annualFica = fica.totalFica;
  const annualStateTax = st.stateTax + st.localTax + st.stateDisability;

  const totalAnnualTaxes = annualFederalTax + annualFica + annualStateTax;
  const annualNet = Math.max(0, annualGross - preTaxAnnual - totalAnnualTaxes);

  const netPayPerPeriod = annualNet / periodsPerYear;
  const federalTaxPerPeriod = annualFederalTax / periodsPerYear;
  const ficaPerPeriod = annualFica / periodsPerYear;
  const socialSecurityPerPeriod = fica.socialSecurity / periodsPerYear;
  const medicarePerPeriod = fica.medicare / periodsPerYear;
  const stateTaxPerPeriod = st.stateTax / periodsPerYear;
  const localTaxPerPeriod = st.localTax / periodsPerYear;
  const otherStateDeductionsPerPeriod = st.stateDisability / periodsPerYear;

  const effectiveTaxRate = annualGross > 0 ? (totalAnnualTaxes / annualGross) * 100 : 0;

  return {
    grossPayPerPeriod: Math.round(grossPay * 100) / 100,
    netPayPerPeriod: Math.round(netPayPerPeriod * 100) / 100,
    federalTaxPerPeriod: Math.round(federalTaxPerPeriod * 100) / 100,
    ficaPerPeriod: Math.round(ficaPerPeriod * 100) / 100,
    socialSecurityPerPeriod: Math.round(socialSecurityPerPeriod * 100) / 100,
    medicarePerPeriod: Math.round(medicarePerPeriod * 100) / 100,
    stateTaxPerPeriod: Math.round(stateTaxPerPeriod * 100) / 100,
    localTaxPerPeriod: Math.round(localTaxPerPeriod * 100) / 100,
    otherStateDeductionsPerPeriod: Math.round(otherStateDeductionsPerPeriod * 100) / 100,
    preTaxDeductionsPerPeriod: Math.round(preTaxPerPeriod * 100) / 100,
    annualGross: Math.round(annualGross),
    annualNet: Math.round(annualNet),
    annualFederalTax: Math.round(annualFederalTax),
    annualFica: Math.round(annualFica),
    annualStateTax: Math.round(annualStateTax),
    totalTaxBurden: Math.round(totalAnnualTaxes),
    effectiveTaxRate: Number(effectiveTaxRate.toFixed(2)),
    payFrequency: frequency,
  };
}

/**
 * Frequency Breakdown Generator
 */
export function generateWageFrequencies(annualGross: number, annualNet: number): {
  frequency: PayFrequency;
  label: string;
  gross: number;
  net: number;
}[] {
  return [
    { frequency: 'annual', label: 'Yearly', gross: Math.round(annualGross), net: Math.round(annualNet) },
    { frequency: 'monthly', label: 'Monthly (12x/yr)', gross: Math.round(annualGross / 12), net: Math.round(annualNet / 12) },
    { frequency: 'semi-monthly', label: 'Semi-Monthly (24x/yr)', gross: Math.round(annualGross / 24), net: Math.round(annualNet / 24) },
    { frequency: 'bi-weekly', label: 'Bi-Weekly (26x/yr)', gross: Math.round(annualGross / 26), net: Math.round(annualNet / 26) },
    { frequency: 'weekly', label: 'Weekly (52x/yr)', gross: Math.round(annualGross / 52), net: Math.round(annualNet / 52) },
    { frequency: 'daily', label: 'Daily (260 work days)', gross: Math.round(annualGross / 260), net: Math.round(annualNet / 260) },
    { frequency: 'hourly', label: 'Hourly (2,080 hrs)', gross: Number((annualGross / 2080).toFixed(2)), net: Number((annualNet / 2080).toFixed(2)) },
  ];
}

/**
 * Overtime Calculator
 */
export interface OvertimeResult {
  regularPay: number;
  overtimePay: number;
  doubleTimePay: number;
  totalGrossPay: number;
  effectiveHourlyRate: number;
  overtimeRate: number;
  doubleTimeRate: number;
}

export function calculateOvertime(
  hourlyRate: number,
  regularHours: number = 40,
  overtimeHours: number = 0,
  doubleTimeHours: number = 0,
  overtimeMultiplier: number = 1.5,
  doubleTimeMultiplier: number = 2.0
): OvertimeResult {
  const rate = Math.max(0, hourlyRate);
  const regHours = Math.max(0, regularHours);
  const otHours = Math.max(0, overtimeHours);
  const dtHours = Math.max(0, doubleTimeHours);

  const overtimeRate = rate * overtimeMultiplier;
  const doubleTimeRate = rate * doubleTimeMultiplier;

  const regularPay = regHours * rate;
  const overtimePay = otHours * overtimeRate;
  const doubleTimePay = dtHours * doubleTimeRate;
  const totalGrossPay = regularPay + overtimePay + doubleTimePay;

  const totalHours = regHours + otHours + dtHours;
  const effectiveHourlyRate = totalHours > 0 ? totalGrossPay / totalHours : rate;

  return {
    regularPay: Math.round(regularPay * 100) / 100,
    overtimePay: Math.round(overtimePay * 100) / 100,
    doubleTimePay: Math.round(doubleTimePay * 100) / 100,
    totalGrossPay: Math.round(totalGrossPay * 100) / 100,
    effectiveHourlyRate: Number(effectiveHourlyRate.toFixed(2)),
    overtimeRate: Number(overtimeRate.toFixed(2)),
    doubleTimeRate: Number(doubleTimeRate.toFixed(2)),
  };
}

/**
 * Pay Raise Calculator
 */
export interface PayRaiseResult {
  oldPay: number;
  newPay: number;
  percentageIncrease: number;
  differenceAnnual: number;
  differenceMonthly: number;
  differenceBiWeekly: number;
  differenceHourly: number;
  oldAnnual: number;
  newAnnual: number;
}

export function calculatePayRaise(
  currentPay: number,
  raiseType: 'percent' | 'amount',
  raiseValue: number,
  frequency: 'annual' | 'hourly' = 'annual'
): PayRaiseResult {
  const old = Math.max(0, currentPay);
  let newAmount = old;
  let pct = 0;

  if (raiseType === 'percent') {
    pct = Math.max(0, raiseValue);
    newAmount = old * (1 + pct / 100);
  } else {
    newAmount = old + Math.max(0, raiseValue);
    pct = old > 0 ? ((newAmount - old) / old) * 100 : 0;
  }

  const factor = frequency === 'hourly' ? 2080 : 1;
  const oldAnnual = old * factor;
  const newAnnual = newAmount * factor;
  const diffAnnual = newAnnual - oldAnnual;

  return {
    oldPay: Number(old.toFixed(2)),
    newPay: Number(newAmount.toFixed(2)),
    percentageIncrease: Number(pct.toFixed(2)),
    differenceAnnual: Math.round(diffAnnual),
    differenceMonthly: Math.round(diffAnnual / 12),
    differenceBiWeekly: Math.round(diffAnnual / 26),
    differenceHourly: Number((diffAnnual / 2080).toFixed(2)),
    oldAnnual: Math.round(oldAnnual),
    newAnnual: Math.round(newAnnual),
  };
}

/**
 * Earned Income Credit (EIC / EITC) Calculator
 * 2025/2026 Statutory Parameters
 */
export interface EicResult {
  qualifyingChildren: number;
  filingStatus: FilingStatus;
  maxCredit: number;
  estimatedCredit: number;
  phaseOutThreshold: number;
  incomeLimit: number;
  isEligible: boolean;
  explanation: string;
}

export function calculateEic(
  earnedIncome: number,
  filingStatus: FilingStatus = 'single',
  qualifyingChildren: number = 0
): EicResult {
  const children = Math.max(0, Math.min(3, Math.floor(qualifyingChildren)));
  const isMarried = filingStatus === 'married';

  // 2025 EIC Parameters
  // [Max Credit, PhaseIn Rate, PhaseIn End, PhaseOut Single, PhaseOut Married, PhaseOut Rate, Income Limit Single, Income Limit Married]
  const PARAMS: Record<number, {
    maxCredit: number;
    phaseInRate: number;
    phaseInEnd: number;
    phaseOutSingle: number;
    phaseOutMarried: number;
    phaseOutRate: number;
    limitSingle: number;
    limitMarried: number;
  }> = {
    0: { maxCredit: 649, phaseInRate: 0.0765, phaseInEnd: 8490, phaseOutSingle: 10620, phaseOutMarried: 17720, phaseOutRate: 0.0765, limitSingle: 19100, limitMarried: 26200 },
    1: { maxCredit: 4328, phaseInRate: 0.34, phaseInEnd: 12730, phaseOutSingle: 23340, phaseOutMarried: 30440, phaseOutRate: 0.1598, limitSingle: 50430, limitMarried: 57530 },
    2: { maxCredit: 7152, phaseInRate: 0.40, phaseInEnd: 17880, phaseOutSingle: 23340, phaseOutMarried: 30440, phaseOutRate: 0.2106, limitSingle: 57300, limitMarried: 64400 },
    3: { maxCredit: 8046, phaseInRate: 0.45, phaseInEnd: 17880, phaseOutSingle: 23340, phaseOutMarried: 30440, phaseOutRate: 0.2106, limitSingle: 61400, limitMarried: 68500 },
  };

  const p = PARAMS[children];
  const incomeLimit = isMarried ? p.limitMarried : p.limitSingle;
  const phaseOutStart = isMarried ? p.phaseOutMarried : p.phaseOutSingle;

  if (earnedIncome <= 0 || earnedIncome >= incomeLimit) {
    return {
      qualifyingChildren: children,
      filingStatus,
      maxCredit: p.maxCredit,
      estimatedCredit: 0,
      phaseOutThreshold: phaseOutStart,
      incomeLimit,
      isEligible: false,
      explanation: earnedIncome >= incomeLimit
        ? `Your earned income exceeds the $${incomeLimit.toLocaleString()} maximum eligibility limit for ${children} qualifying children.`
        : 'Earned income must be greater than $0 to claim the Earned Income Credit.',
    };
  }

  // Calculate Credit
  let credit = Math.min(p.maxCredit, earnedIncome * p.phaseInRate);
  if (earnedIncome > phaseOutStart) {
    const excess = earnedIncome - phaseOutStart;
    credit = Math.max(0, credit - (excess * p.phaseOutRate));
  }

  const finalCredit = Math.round(credit);

  return {
    qualifyingChildren: children,
    filingStatus,
    maxCredit: p.maxCredit,
    estimatedCredit: finalCredit,
    phaseOutThreshold: phaseOutStart,
    incomeLimit,
    isEligible: finalCredit > 0,
    explanation: finalCredit > 0
      ? `Based on an earned income of $${earnedIncome.toLocaleString()} with ${children} qualifying children (${filingStatus}), your estimated 2025 EIC is $${finalCredit.toLocaleString()}.`
      : 'Credit phased down to $0 based on phaseout income.',
  };
}
