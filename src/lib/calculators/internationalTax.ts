/**
 * Pure Calculation Engine: International Tax & Expat Income Tax
 * Models personal income tax brackets, social contributions, special expat tax regimes,
 * foreign tax credits, and cross-border salary comparisons for 15+ major economies.
 */

export interface CountryTaxProfile {
  code: string;
  name: string;
  currency: string;
  currencySymbol: string;
  flag: string;
  exchangeRateToUSD: number; // 1 Foreign Currency = X USD (approx baseline)
  hasExpatRegime: boolean;
  expatRegimeName?: string;
  expatRegimeDescription?: string;
  calculateTax: (annualGrossLocal: number, useExpatRegime?: boolean) => {
    incomeTax: number;
    socialSecurity: number;
    effectiveTaxRate: number;
    marginalTaxRate: number;
    netIncome: number;
  };
}

export interface TaxCalculationResult {
  countryCode: string;
  countryName: string;
  currency: string;
  currencySymbol: string;
  flag: string;
  grossIncomeLocal: number;
  grossIncomeUSD: number;
  incomeTaxLocal: number;
  incomeTaxUSD: number;
  socialSecurityLocal: number;
  socialSecurityUSD: number;
  totalDeductionsLocal: number;
  totalDeductionsUSD: number;
  netIncomeLocal: number;
  netIncomeUSD: number;
  monthlyNetLocal: number;
  monthlyNetUSD: number;
  effectiveTaxRate: number; // total deductions / gross
  incomeTaxRate: number;
  socialSecurityRate: number;
  marginalRate: number;
  usedExpatRegime: boolean;
  expatRegimeName?: string;
}

export interface DualCountryTaxResult {
  residenceTax: TaxCalculationResult;
  sourceTax?: TaxCalculationResult;
  foreignTaxCreditUSD: number;
  netTaxPaidUSD: number;
  doubleTaxationSavedUSD: number;
  netTakeHomeUSD: number;
}

export interface CountryComparisonItem {
  countryCode: string;
  countryName: string;
  flag: string;
  currency: string;
  currencySymbol: string;
  grossLocal: number;
  netAnnualLocal: number;
  netMonthlyLocal: number;
  netAnnualUSD: number;
  netMonthlyUSD: number;
  totalTaxUSD: number;
  effectiveTaxRate: number;
  differenceVsSelectedUSD: number; // positive = more take-home than selected
}

// ---------------------------------------------------------------------------
// Country Tax Profiles
// ---------------------------------------------------------------------------

export const COUNTRY_PROFILES: Record<string, CountryTaxProfile> = {
  US: {
    code: 'US',
    name: 'United States',
    currency: 'USD',
    currencySymbol: '$',
    flag: '🇺🇸',
    exchangeRateToUSD: 1.0,
    hasExpatRegime: true,
    expatRegimeName: 'FEIE (Foreign Earned Income Exclusion)',
    expatRegimeDescription: 'Excludes up to $126,500 of foreign earned income for qualifying US expats living abroad.',
    calculateTax: (gross, useExpatRegime) => {
      // 2025 Standard deduction
      const stdDeduction = 15000;
      const feieLimit = 126500;
      const excluded = useExpatRegime ? Math.min(gross, feieLimit) : 0;
      const taxable = Math.max(0, gross - excluded - stdDeduction);

      // Progressive 2025 Federal Brackets
      const brackets: [number, number][] = [
        [11925, 0.10],
        [48475, 0.12],
        [103350, 0.22],
        [197300, 0.24],
        [250525, 0.32],
        [626350, 0.35],
        [Infinity, 0.37],
      ];

      let federalTax = 0;
      let prev = 0;
      let marginalRate = 0.10;

      for (const [limit, rate] of brackets) {
        if (taxable > prev) {
          const chunk = Math.min(taxable - prev, limit - prev);
          federalTax += chunk * rate;
          marginalRate = rate;
        }
        prev = limit;
      }

      // FICA: Social Security (6.2% up to $176,100) + Medicare (1.45% + 0.9% over $200k)
      const ssTax = useExpatRegime ? 0 : Math.min(gross, 176100) * 0.062;
      const medTax = useExpatRegime ? 0 : gross * 0.0145 + (gross > 200000 ? (gross - 200000) * 0.009 : 0);
      const socialSecurity = ssTax + medTax;

      // Average state tax assumption (4.5%)
      const stateTax = useExpatRegime ? 0 : Math.max(0, gross - stdDeduction) * 0.045;
      const totalIncomeTax = federalTax + stateTax;

      const totalDeductions = totalIncomeTax + socialSecurity;
      const net = Math.max(0, gross - totalDeductions);
      const effectiveRate = gross > 0 ? (totalDeductions / gross) * 100 : 0;

      return {
        incomeTax: totalIncomeTax,
        socialSecurity,
        effectiveTaxRate: effectiveRate,
        marginalTaxRate: marginalRate * 100,
        netIncome: net,
      };
    },
  },

  GB: {
    code: 'GB',
    name: 'United Kingdom',
    currency: 'GBP',
    currencySymbol: '£',
    flag: '🇬🇧',
    exchangeRateToUSD: 1.30,
    hasExpatRegime: false,
    calculateTax: (gross) => {
      // Personal allowance: £12,570 (phased out £1 for every £2 above £100,000)
      let personalAllowance = 12570;
      if (gross > 100000) {
        const reduction = (gross - 100000) / 2;
        personalAllowance = Math.max(0, personalAllowance - reduction);
      }

      const taxable = Math.max(0, gross - personalAllowance);
      let incomeTax = 0;
      let marginalRate = 0.20;

      // Basic: 20% (£0 to £37,700 taxable, i.e., up to £50,270 total)
      if (taxable > 0) {
        const basicChunk = Math.min(taxable, 37700);
        incomeTax += basicChunk * 0.20;
      }
      // Higher: 40% (£37,701 to £125,140 total)
      if (taxable > 37700) {
        const higherChunk = Math.min(taxable - 37700, 125140 - 50270);
        incomeTax += higherChunk * 0.40;
        marginalRate = 0.40;
      }
      // Additional: 45% (above £125,140 total)
      if (gross > 125140) {
        incomeTax += (gross - 125140) * 0.45;
        marginalRate = 0.45;
      }

      // National Insurance (Class 1 Employee: 8% on £12,570 - £50,270; 2% above)
      let ni = 0;
      if (gross > 12570) {
        const niBand = Math.min(gross, 50270) - 12570;
        ni += niBand * 0.08;
      }
      if (gross > 50270) {
        ni += (gross - 50270) * 0.02;
      }

      const totalDeductions = incomeTax + ni;
      const net = Math.max(0, gross - totalDeductions);
      const effectiveRate = gross > 0 ? (totalDeductions / gross) * 100 : 0;

      return {
        incomeTax,
        socialSecurity: ni,
        effectiveTaxRate: effectiveRate,
        marginalTaxRate: marginalRate * 100,
        netIncome: net,
      };
    },
  },

  DE: {
    code: 'DE',
    name: 'Germany',
    currency: 'EUR',
    currencySymbol: '€',
    flag: '🇩🇪',
    exchangeRateToUSD: 1.08,
    hasExpatRegime: false,
    calculateTax: (gross) => {
      // Basic tax-free allowance: €11,784
      const allowance = 11784;
      const taxable = Math.max(0, gross - allowance);
      let incomeTax = 0;
      let marginalRate = 0.14;

      if (taxable > 0) {
        if (taxable <= 17005) {
          incomeTax = taxable * 0.14;
          marginalRate = 0.14;
        } else if (taxable <= 66760) {
          incomeTax = 2380 + (taxable - 17005) * 0.32;
          marginalRate = 0.42;
        } else if (taxable <= 277825) {
          incomeTax = 18300 + (taxable - 66760) * 0.42;
          marginalRate = 0.42;
        } else {
          incomeTax = 106947 + (taxable - 277825) * 0.45;
          marginalRate = 0.45;
        }
      }

      // Solidarity surcharge (applies to higher earners, approx 5.5% of tax)
      if (incomeTax > 18130) {
        incomeTax += (incomeTax - 18130) * 0.055;
      }

      // Social security (Pension 9.3%, Health ~8%, Care 2.2%, Unemployment 1.3% = ~20.8% capped)
      const ssCappedGross = Math.min(gross, 90600);
      const healthCappedGross = Math.min(gross, 62100);
      const socialSecurity = (ssCappedGross * 0.106) + (healthCappedGross * 0.102);

      const totalDeductions = incomeTax + socialSecurity;
      const net = Math.max(0, gross - totalDeductions);
      const effectiveRate = gross > 0 ? (totalDeductions / gross) * 100 : 0;

      return {
        incomeTax,
        socialSecurity,
        effectiveTaxRate: effectiveRate,
        marginalTaxRate: marginalRate * 100,
        netIncome: net,
      };
    },
  },

  AE: {
    code: 'AE',
    name: 'United Arab Emirates (Dubai)',
    currency: 'AED',
    currencySymbol: 'AED',
    flag: '🇦🇪',
    exchangeRateToUSD: 0.272,
    hasExpatRegime: true,
    expatRegimeName: '0% Personal Tax Shield',
    expatRegimeDescription: 'Zero personal income tax, zero capital gains tax, and zero social security for foreign expats.',
    calculateTax: (gross) => {
      // 0% personal tax, 0% social security for foreign nationals
      return {
        incomeTax: 0,
        socialSecurity: 0,
        effectiveTaxRate: 0,
        marginalTaxRate: 0,
        netIncome: gross,
      };
    },
  },

  SG: {
    code: 'SG',
    name: 'Singapore',
    currency: 'SGD',
    currencySymbol: 'S$',
    flag: '🇸🇬',
    exchangeRateToUSD: 0.76,
    hasExpatRegime: true,
    expatRegimeName: 'Foreign Resident Exemption (0% CPF)',
    expatRegimeDescription: 'Expats enjoy low progressive tax rates (0-24%) and 0% mandatory Central Provident Fund deductions.',
    calculateTax: (gross) => {
      // Progressive resident tax brackets
      const brackets: [number, number][] = [
        [20000, 0.0],
        [30000, 0.02],
        [40000, 0.035],
        [80000, 0.07],
        [120000, 0.115],
        [160000, 0.15],
        [200000, 0.18],
        [240000, 0.19],
        [280000, 0.195],
        [320000, 0.20],
        [500000, 0.22],
        [1000000, 0.23],
        [Infinity, 0.24],
      ];

      let incomeTax = 0;
      let prev = 0;
      let marginalRate = 0;

      for (const [limit, rate] of brackets) {
        if (gross > prev) {
          const chunk = Math.min(gross - prev, limit - prev);
          incomeTax += chunk * rate;
          marginalRate = rate;
        }
        prev = limit;
      }

      // Foreigners do not pay CPF social contributions
      const socialSecurity = 0;
      const totalDeductions = incomeTax + socialSecurity;
      const net = Math.max(0, gross - totalDeductions);
      const effectiveRate = gross > 0 ? (totalDeductions / gross) * 100 : 0;

      return {
        incomeTax,
        socialSecurity,
        effectiveTaxRate: effectiveRate,
        marginalTaxRate: marginalRate * 100,
        netIncome: net,
      };
    },
  },

  ES: {
    code: 'ES',
    name: 'Spain',
    currency: 'EUR',
    currencySymbol: '€',
    flag: '🇪🇸',
    exchangeRateToUSD: 1.08,
    hasExpatRegime: true,
    expatRegimeName: 'Beckham Law (Special Expat Regime)',
    expatRegimeDescription: 'Flat 24% tax rate on employment income up to €600,000 for qualifying foreign workers and digital nomads for 6 years.',
    calculateTax: (gross, useExpatRegime) => {
      let incomeTax = 0;
      let marginalRate = 0.24;

      if (useExpatRegime) {
        // Beckham Law: Flat 24% up to €600,000; 47% above
        if (gross <= 600000) {
          incomeTax = gross * 0.24;
          marginalRate = 0.24;
        } else {
          incomeTax = 600000 * 0.24 + (gross - 600000) * 0.47;
          marginalRate = 0.47;
        }
      } else {
        // Standard progressive personal tax (combining state + typical autonomous community)
        const brackets: [number, number][] = [
          [12450, 0.19],
          [20200, 0.24],
          [35200, 0.30],
          [60000, 0.37],
          [300000, 0.45],
          [Infinity, 0.47],
        ];
        let prev = 0;
        for (const [limit, rate] of brackets) {
          if (gross > prev) {
            const chunk = Math.min(gross - prev, limit - prev);
            incomeTax += chunk * rate;
            marginalRate = rate;
          }
          prev = limit;
        }
      }

      // Social security: ~6.35% employee contribution capped at approx €4,720/month base
      const ssBase = Math.min(gross, 56640);
      const socialSecurity = ssBase * 0.0635;

      const totalDeductions = incomeTax + socialSecurity;
      const net = Math.max(0, gross - totalDeductions);
      const effectiveRate = gross > 0 ? (totalDeductions / gross) * 100 : 0;

      return {
        incomeTax,
        socialSecurity,
        effectiveTaxRate: effectiveRate,
        marginalTaxRate: marginalRate * 100,
        netIncome: net,
      };
    },
  },

  PT: {
    code: 'PT',
    name: 'Portugal',
    currency: 'EUR',
    currencySymbol: '€',
    flag: '🇵🇹',
    exchangeRateToUSD: 1.08,
    hasExpatRegime: true,
    expatRegimeName: 'NHR / Digital Nomad Tax Regime (IFICI)',
    expatRegimeDescription: 'Flat 20% income tax rate on qualifying scientific, artistic, high-value, and startup employment income.',
    calculateTax: (gross, useExpatRegime) => {
      let incomeTax = 0;
      let marginalRate = 0.20;

      if (useExpatRegime) {
        incomeTax = gross * 0.20;
        marginalRate = 0.20;
      } else {
        // Standard progressive Portuguese IRS brackets
        const brackets: [number, number][] = [
          [7703, 0.1325],
          [11623, 0.18],
          [16472, 0.23],
          [21321, 0.26],
          [27146, 0.3275],
          [39791, 0.37],
          [51997, 0.435],
          [81199, 0.45],
          [Infinity, 0.48],
        ];
        let prev = 0;
        for (const [limit, rate] of brackets) {
          if (gross > prev) {
            const chunk = Math.min(gross - prev, limit - prev);
            incomeTax += chunk * rate;
            marginalRate = rate;
          }
          prev = limit;
        }
      }

      // Social security: 11% employee contribution
      const socialSecurity = gross * 0.11;

      const totalDeductions = incomeTax + socialSecurity;
      const net = Math.max(0, gross - totalDeductions);
      const effectiveRate = gross > 0 ? (totalDeductions / gross) * 100 : 0;

      return {
        incomeTax,
        socialSecurity,
        effectiveTaxRate: effectiveRate,
        marginalTaxRate: marginalRate * 100,
        netIncome: net,
      };
    },
  },

  CA: {
    code: 'CA',
    name: 'Canada',
    currency: 'CAD',
    currencySymbol: 'CA$',
    flag: '🇨🇦',
    exchangeRateToUSD: 0.74,
    hasExpatRegime: false,
    calculateTax: (gross) => {
      const basicPersonal = 15705;
      const taxable = Math.max(0, gross - basicPersonal);

      // Federal Brackets 2025
      const fedBrackets: [number, number][] = [
        [55867, 0.15],
        [111733, 0.205],
        [173205, 0.26],
        [246752, 0.29],
        [Infinity, 0.33],
      ];

      let fedTax = 0;
      let prev = 0;
      let marginalRate = 0.15;

      for (const [limit, rate] of fedBrackets) {
        if (taxable > prev) {
          const chunk = Math.min(taxable - prev, limit - prev);
          fedTax += chunk * rate;
          marginalRate = rate;
        }
        prev = limit;
      }

      // Average provincial tax (Ontario benchmark ~9.5%)
      const provTax = taxable * 0.095;
      const incomeTax = fedTax + provTax;

      // CPP & EI capped contributions (~$5,100 total)
      const cpp = Math.min(gross * 0.0595, 3867);
      const ei = Math.min(gross * 0.0166, 1049);
      const socialSecurity = cpp + ei;

      const totalDeductions = incomeTax + socialSecurity;
      const net = Math.max(0, gross - totalDeductions);
      const effectiveRate = gross > 0 ? (totalDeductions / gross) * 100 : 0;

      return {
        incomeTax,
        socialSecurity,
        effectiveTaxRate: effectiveRate,
        marginalTaxRate: (marginalRate + 0.095) * 100,
        netIncome: net,
      };
    },
  },

  AU: {
    code: 'AU',
    name: 'Australia',
    currency: 'AUD',
    currencySymbol: 'A$',
    flag: '🇦🇺',
    exchangeRateToUSD: 0.66,
    hasExpatRegime: false,
    calculateTax: (gross) => {
      // 2024/2025 Stage 3 Tax Cuts
      let incomeTax = 0;
      let marginalRate = 0.16;

      if (gross > 18200) {
        const chunk1 = Math.min(gross, 45000) - 18200;
        incomeTax += chunk1 * 0.16;
        marginalRate = 0.16;
      }
      if (gross > 45000) {
        const chunk2 = Math.min(gross, 135000) - 45000;
        incomeTax += chunk2 * 0.30;
        marginalRate = 0.30;
      }
      if (gross > 135000) {
        const chunk3 = Math.min(gross, 190000) - 135000;
        incomeTax += chunk3 * 0.37;
        marginalRate = 0.37;
      }
      if (gross > 190000) {
        const chunk4 = gross - 190000;
        incomeTax += chunk4 * 0.45;
        marginalRate = 0.45;
      }

      // Medicare Levy: 2% of taxable income
      const medicare = gross > 26000 ? gross * 0.02 : 0;
      const totalDeductions = incomeTax + medicare;
      const net = Math.max(0, gross - totalDeductions);
      const effectiveRate = gross > 0 ? (totalDeductions / gross) * 100 : 0;

      return {
        incomeTax,
        socialSecurity: medicare,
        effectiveTaxRate: effectiveRate,
        marginalTaxRate: (marginalRate + 0.02) * 100,
        netIncome: net,
      };
    },
  },

  NL: {
    code: 'NL',
    name: 'Netherlands',
    currency: 'EUR',
    currencySymbol: '€',
    flag: '🇳🇱',
    exchangeRateToUSD: 1.08,
    hasExpatRegime: true,
    expatRegimeName: '30% Ruling',
    expatRegimeDescription: '30% of gross salary is granted completely tax-free as an allowance for international skilled talent.',
    calculateTax: (gross, useExpatRegime) => {
      const taxable = useExpatRegime ? gross * 0.70 : gross;
      let incomeTax = 0;
      let marginalRate = 0.3697;

      // Box 1 Brackets (2024/2025: 36.97% up to €75,518; 49.50% above)
      if (taxable <= 75518) {
        incomeTax = taxable * 0.3697;
      } else {
        incomeTax = 75518 * 0.3697 + (taxable - 75518) * 0.4950;
        marginalRate = 0.4950;
      }

      // General tax credit reduction (heffingskorting)
      const taxCredit = Math.max(0, 3362 - (taxable * 0.066));
      incomeTax = Math.max(0, incomeTax - taxCredit);

      // Social national insurance is included in the first bracket (volksverzekeringen)
      const socialSecurity = 0;
      const totalDeductions = incomeTax;
      const net = Math.max(0, gross - totalDeductions);
      const effectiveRate = gross > 0 ? (totalDeductions / gross) * 100 : 0;

      return {
        incomeTax,
        socialSecurity,
        effectiveTaxRate: effectiveRate,
        marginalTaxRate: marginalRate * 100,
        netIncome: net,
      };
    },
  },

  CH: {
    code: 'CH',
    name: 'Switzerland',
    currency: 'CHF',
    currencySymbol: 'CHF',
    flag: '🇨🇭',
    exchangeRateToUSD: 1.15,
    hasExpatRegime: false,
    calculateTax: (gross) => {
      // Federal tax + Cantonal average (Zurich/Geneva/Zug mix ~18% combined)
      let taxRate = 0.12;
      if (gross > 150000) taxRate = 0.18;
      if (gross > 250000) taxRate = 0.22;
      const incomeTax = gross * taxRate;

      // AHV/IV/EO Social Security (5.3% employee share uncapped)
      const socialSecurity = gross * 0.053;

      const totalDeductions = incomeTax + socialSecurity;
      const net = Math.max(0, gross - totalDeductions);
      const effectiveRate = gross > 0 ? (totalDeductions / gross) * 100 : 0;

      return {
        incomeTax,
        socialSecurity,
        effectiveTaxRate: effectiveRate,
        marginalTaxRate: (taxRate + 0.053) * 100,
        netIncome: net,
      };
    },
  },

  FR: {
    code: 'FR',
    name: 'France',
    currency: 'EUR',
    currencySymbol: '€',
    flag: '🇫🇷',
    exchangeRateToUSD: 1.08,
    hasExpatRegime: false,
    calculateTax: (gross) => {
      // Social charges (~20% employee contributions) deducted before income tax
      const socialSecurity = gross * 0.20;
      const taxable = Math.max(0, gross - socialSecurity - 11294);

      // Progressive scale
      const brackets: [number, number][] = [
        [17503, 0.11], // 11,295 - 28,797
        [53544, 0.30], // 28,798 - 82,341
        [94765, 0.41], // 82,342 - 177,106
        [Infinity, 0.45],
      ];

      let incomeTax = 0;
      let prev = 0;
      let marginalRate = 0.11;

      for (const [limit, rate] of brackets) {
        if (taxable > prev) {
          const chunk = Math.min(taxable - prev, limit - prev);
          incomeTax += chunk * rate;
          marginalRate = rate;
        }
        prev = limit;
      }

      const totalDeductions = incomeTax + socialSecurity;
      const net = Math.max(0, gross - totalDeductions);
      const effectiveRate = gross > 0 ? (totalDeductions / gross) * 100 : 0;

      return {
        incomeTax,
        socialSecurity,
        effectiveTaxRate: effectiveRate,
        marginalTaxRate: (marginalRate + 0.20) * 100,
        netIncome: net,
      };
    },
  },

  IE: {
    code: 'IE',
    name: 'Ireland',
    currency: 'EUR',
    currencySymbol: '€',
    flag: '🇮🇪',
    exchangeRateToUSD: 1.08,
    hasExpatRegime: false,
    calculateTax: (gross) => {
      // Standard rate 20% up to €42,000; 40% above
      let incomeTax = 0;
      if (gross <= 42000) {
        incomeTax = gross * 0.20;
      } else {
        incomeTax = 42000 * 0.20 + (gross - 42000) * 0.40;
      }

      // Universal Social Charge (USC: 0.5% to 8%) ~ 4% average
      const usc = gross * 0.04;
      // PRSI: 4%
      const prsi = gross * 0.04;
      const socialSecurity = usc + prsi;

      const totalDeductions = incomeTax + socialSecurity;
      const net = Math.max(0, gross - totalDeductions);
      const effectiveRate = gross > 0 ? (totalDeductions / gross) * 100 : 0;

      return {
        incomeTax,
        socialSecurity,
        effectiveTaxRate: effectiveRate,
        marginalTaxRate: 48,
        netIncome: net,
      };
    },
  },

  IN: {
    code: 'IN',
    name: 'India',
    currency: 'INR',
    currencySymbol: '₹',
    flag: '🇮🇳',
    exchangeRateToUSD: 0.012,
    hasExpatRegime: false,
    calculateTax: (gross) => {
      // New Tax Regime 2024/2025: Standard deduction ₹75,000
      const taxable = Math.max(0, gross - 75000);
      let incomeTax = 0;

      if (taxable > 300000) incomeTax += Math.min(taxable - 300000, 400000) * 0.05; // 3L - 7L
      if (taxable > 700000) incomeTax += Math.min(taxable - 700000, 300000) * 0.10; // 7L - 10L
      if (taxable > 1000000) incomeTax += Math.min(taxable - 1000000, 200000) * 0.15; // 10L - 12L
      if (taxable > 1200000) incomeTax += Math.min(taxable - 1200000, 300000) * 0.20; // 12L - 15L
      if (taxable > 1500000) incomeTax += (taxable - 1500000) * 0.30; // Above 15L

      // Section 87A rebate: if taxable <= ₹700,000, zero tax
      if (taxable <= 700000) {
        incomeTax = 0;
      } else {
        // 4% Health & Education Cess
        incomeTax += incomeTax * 0.04;
      }

      // EPF (Provident fund ~12% capped at ₹1,800/mo = ₹21,600/yr)
      const epf = Math.min(gross * 0.12, 21600);

      const totalDeductions = incomeTax + epf;
      const net = Math.max(0, gross - totalDeductions);
      const effectiveRate = gross > 0 ? (totalDeductions / gross) * 100 : 0;

      return {
        incomeTax,
        socialSecurity: epf,
        effectiveTaxRate: effectiveRate,
        marginalTaxRate: 31.2,
        netIncome: net,
      };
    },
  },
};

// ---------------------------------------------------------------------------
// Calculation Helpers
// ---------------------------------------------------------------------------

export function calculateSingleCountryTax(
  countryCode: string,
  grossLocal: number,
  useExpatRegime: boolean = false
): TaxCalculationResult {
  const profile = COUNTRY_PROFILES[countryCode] || COUNTRY_PROFILES.US;
  const validGross = Math.max(0, Number(grossLocal) || 0);

  const { incomeTax, socialSecurity, effectiveTaxRate, marginalTaxRate, netIncome } =
    profile.calculateTax(validGross, useExpatRegime && profile.hasExpatRegime);

  const fx = profile.exchangeRateToUSD;
  const grossUSD = validGross * fx;
  const incomeTaxUSD = incomeTax * fx;
  const socialSecurityUSD = socialSecurity * fx;
  const totalDeductionsLocal = incomeTax + socialSecurity;
  const totalDeductionsUSD = totalDeductionsLocal * fx;
  const netUSD = netIncome * fx;

  return {
    countryCode: profile.code,
    countryName: profile.name,
    currency: profile.currency,
    currencySymbol: profile.currencySymbol,
    flag: profile.flag,
    grossIncomeLocal: validGross,
    grossIncomeUSD: grossUSD,
    incomeTaxLocal: incomeTax,
    incomeTaxUSD: incomeTaxUSD,
    socialSecurityLocal: socialSecurity,
    socialSecurityUSD: socialSecurityUSD,
    totalDeductionsLocal,
    totalDeductionsUSD,
    netIncomeLocal: netIncome,
    netIncomeUSD: netUSD,
    monthlyNetLocal: netIncome / 12,
    monthlyNetUSD: netUSD / 12,
    effectiveTaxRate,
    incomeTaxRate: validGross > 0 ? (incomeTax / validGross) * 100 : 0,
    socialSecurityRate: validGross > 0 ? (socialSecurity / validGross) * 100 : 0,
    marginalRate: marginalTaxRate,
    usedExpatRegime: Boolean(useExpatRegime && profile.hasExpatRegime),
    expatRegimeName: profile.expatRegimeName,
  };
}

export function calculateForeignTaxCredit(
  residenceCode: string,
  sourceCode: string,
  grossUSD: number,
  useResidenceExpatRegime: boolean = false,
  useSourceExpatRegime: boolean = false
): DualCountryTaxResult {
  const resProfile = COUNTRY_PROFILES[residenceCode] || COUNTRY_PROFILES.US;
  const srcProfile = COUNTRY_PROFILES[sourceCode] || COUNTRY_PROFILES.GB;

  // Convert USD to each local currency
  const grossResLocal = grossUSD / resProfile.exchangeRateToUSD;
  const grossSrcLocal = grossUSD / srcProfile.exchangeRateToUSD;

  const resTax = calculateSingleCountryTax(residenceCode, grossResLocal, useResidenceExpatRegime);
  const srcTax = calculateSingleCountryTax(sourceCode, grossSrcLocal, useSourceExpatRegime);

  // Foreign Tax Credit (FTC) logic:
  // Source country has primary taxing rights. Home country gives credit for foreign tax paid
  // up to the home country's liability on that same income.
  const sourceTaxPaidUSD = srcTax.incomeTaxUSD;
  const residenceTaxLiabilityUSD = resTax.incomeTaxUSD;

  const ftcAllowedUSD = Math.min(sourceTaxPaidUSD, residenceTaxLiabilityUSD);
  const remainingResidenceTaxUSD = Math.max(0, residenceTaxLiabilityUSD - ftcAllowedUSD);

  const totalNetTaxUSD = sourceTaxPaidUSD + remainingResidenceTaxUSD + resTax.socialSecurityUSD;
  const doubleTaxSavedUSD = ftcAllowedUSD;
  const netTakeHomeUSD = Math.max(0, grossUSD - totalNetTaxUSD);

  return {
    residenceTax: resTax,
    sourceTax: srcTax,
    foreignTaxCreditUSD: ftcAllowedUSD,
    netTaxPaidUSD: totalNetTaxUSD,
    doubleTaxationSavedUSD: doubleTaxSavedUSD,
    netTakeHomeUSD,
  };
}

export function generateGlobalCountryComparisons(
  grossUSD: number,
  selectedCountryCode: string,
  comparisonMode: 'standard' | 'expat' = 'standard'
): CountryComparisonItem[] {
  const targetCodes = ['AE', 'SG', 'CH', 'US', 'GB', 'ES', 'CA', 'AU', 'DE', 'NL'];
  const baseProfile = COUNTRY_PROFILES[selectedCountryCode] || COUNTRY_PROFILES.US;
  const baseResult = calculateSingleCountryTax(
    selectedCountryCode,
    grossUSD / baseProfile.exchangeRateToUSD
  );

  return targetCodes
    .map((code) => {
      const profile = COUNTRY_PROFILES[code];
      const localGross = grossUSD / profile.exchangeRateToUSD;

      // In standard mode, show authentic standard resident taxes & social contributions.
      // In expat mode, enable qualifying inbound expat regimes (e.g. Beckham Law in Spain, 30% Ruling in NL, 0% in UAE).
      // Note: US FEIE only applies to Americans residing abroad; domestic US residents pay standard federal + state + FICA.
      const useExpat = comparisonMode === 'expat' && code !== 'US' && profile.hasExpatRegime;
      const calc = calculateSingleCountryTax(code, localGross, useExpat);

      return {
        countryCode: code,
        countryName: profile.name,
        flag: profile.flag,
        currency: profile.currency,
        currencySymbol: profile.currencySymbol,
        grossLocal: localGross,
        netAnnualLocal: calc.netIncomeLocal,
        netMonthlyLocal: calc.monthlyNetLocal,
        netAnnualUSD: calc.netIncomeUSD,
        netMonthlyUSD: calc.monthlyNetUSD,
        totalTaxUSD: calc.totalDeductionsUSD,
        effectiveTaxRate: calc.effectiveTaxRate,
        differenceVsSelectedUSD: calc.netIncomeUSD - baseResult.netIncomeUSD,
      };
    })
    .sort((a, b) => b.netAnnualUSD - a.netAnnualUSD);
}
