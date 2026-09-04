'use client';

import React from 'react';
import { PercentageCalculatorWidget } from './PercentageCalculatorWidget';
import { PercentageIncreaseCalculatorWidget } from './PercentageIncreaseCalculatorWidget';
import { AverageCalculatorWidget } from './AverageCalculatorWidget';
import { AgeCalculatorWidget } from './AgeCalculatorWidget';
import { DateDifferenceCalculatorWidget } from './DateDifferenceCalculatorWidget';
import { BmiCalculatorWidget } from './BmiCalculatorWidget';
import { CompoundInterestCalculatorWidget } from './CompoundInterestCalculatorWidget';
import { LoanCalculatorWidget } from './LoanCalculatorWidget';
import { MortgageCalculatorWidget } from './MortgageCalculatorWidget';
import { TipCalculatorWidget } from './TipCalculatorWidget';

// 15 Numerology & Twin Flame Widgets
import { LifePathCalculatorWidget } from './LifePathCalculatorWidget';
import { SunNumberCalculatorWidget } from './SunNumberCalculatorWidget';
import { AttitudeNumberCalculatorWidget } from './AttitudeNumberCalculatorWidget';
import { ExpressionNumberCalculatorWidget } from './ExpressionNumberCalculatorWidget';
import { SoulUrgeCalculatorWidget } from './SoulUrgeCalculatorWidget';
import { PersonalityNumberCalculatorWidget } from './PersonalityNumberCalculatorWidget';
import { BalanceNumberCalculatorWidget } from './BalanceNumberCalculatorWidget';
import { MaturityNumberCalculatorWidget } from './MaturityNumberCalculatorWidget';
import { LuckyColourCalculatorWidget } from './LuckyColourCalculatorWidget';
import { CareerCalculatorWidget } from './CareerCalculatorWidget';
import { TwinFlameCalculatorWidget } from './TwinFlameCalculatorWidget';
import { TwinFlameLifePathWidget } from './TwinFlameLifePathWidget';
import { TwinFlameNumerologyWidget } from './TwinFlameNumerologyWidget';
import { TwinFlameLoveWidget } from './TwinFlameLoveWidget';
import { TwinFlameBirthChartWidget } from './TwinFlameBirthChartWidget';

// 33 New Payroll, Tax, Investment & Travel Widgets
import {
  CaliforniaPaycheckWidget,
  TexasPaycheckWidget,
  FloridaPaycheckWidget,
  NewYorkCityPaycheckWidget,
  NewJerseyPaycheckWidget,
  IllinoisPaycheckWidget,
  ChicagoPaycheckWidget,
  PennsylvaniaPaycheckWidget,
  OhioPaycheckWidget,
  GeorgiaPaycheckWidget,
  ColoradoPaycheckWidget,
  IndianaPaycheckWidget,
  NorthCarolinaPaycheckWidget,
  MichiganHourlyPaycheckWidget,
} from './StatePaycheckWidgets';
import { PaycheckCalculatorWidget } from './PaycheckCalculatorWidget';
import { PaycheckTaxCalculatorWidget } from './PaycheckTaxCalculatorWidget';
import { UsSalaryTaxCalculatorWidget } from './UsSalaryTaxCalculatorWidget';
import { HourlyPaycheckWidget } from './HourlyPaycheckWidget';
import { DailyPaycheckWidget } from './DailyPaycheckWidget';
import { WeeklyPaycheckWidget } from './WeeklyPaycheckWidget';
import { MonthlyPaycheckWidget } from './MonthlyPaycheckWidget';
import { YearlyPaycheckWidget } from './YearlyPaycheckWidget';
import { OvertimeCalculatorWidget } from './OvertimeCalculatorWidget';
import { PayRaiseCalculatorWidget } from './PayRaiseCalculatorWidget';
import { EicCalculatorWidget } from './EicCalculatorWidget';

import { StockCalculatorWidget } from './StockCalculatorWidget';
import { RoiCalculatorWidget } from './RoiCalculatorWidget';
import { FixedDepositCalculatorWidget } from './FixedDepositCalculatorWidget';
import { SipCalculatorWidget } from './SipCalculatorWidget';
import { StpCalculatorWidget } from './StpCalculatorWidget';
import { XrpProfitCalculatorWidget } from './XrpProfitCalculatorWidget';
import { LtpCalculatorWidget } from './LtpCalculatorWidget';

import { TripBudgetCalculatorWidget } from './TripBudgetCalculatorWidget';

interface CalculatorRendererProps {
  slug: string;
}

export const CalculatorRenderer: React.FC<CalculatorRendererProps> = ({ slug }) => {
  switch (slug) {
    // Initial 10
    case 'percentage-calculator':
      return <PercentageCalculatorWidget />;
    case 'percentage-increase-calculator':
      return <PercentageIncreaseCalculatorWidget />;
    case 'average-calculator':
      return <AverageCalculatorWidget />;
    case 'age-calculator':
      return <AgeCalculatorWidget />;
    case 'date-difference-calculator':
      return <DateDifferenceCalculatorWidget />;
    case 'bmi-calculator':
      return <BmiCalculatorWidget />;
    case 'compound-interest-calculator':
      return <CompoundInterestCalculatorWidget />;
    case 'loan-calculator':
      return <LoanCalculatorWidget />;
    case 'mortgage-calculator':
      return <MortgageCalculatorWidget />;
    case 'tip-calculator':
      return <TipCalculatorWidget />;

    // 15 Numerology & Twin Flame
    case 'life-path-number-calculator':
      return <LifePathCalculatorWidget />;
    case 'sun-number-calculator':
      return <SunNumberCalculatorWidget />;
    case 'attitude-number-calculator':
      return <AttitudeNumberCalculatorWidget />;
    case 'expression-number-calculator':
      return <ExpressionNumberCalculatorWidget />;
    case 'soul-urge-number-calculator':
      return <SoulUrgeCalculatorWidget />;
    case 'personality-number-calculator':
      return <PersonalityNumberCalculatorWidget />;
    case 'balance-number-calculator':
      return <BalanceNumberCalculatorWidget />;
    case 'maturity-number-calculator':
      return <MaturityNumberCalculatorWidget />;
    case 'lucky-colour-calculator':
      return <LuckyColourCalculatorWidget />;
    case 'career-calculator':
      return <CareerCalculatorWidget />;
    case 'twin-flame-calculator':
      return <TwinFlameCalculatorWidget />;
    case 'twin-flame-life-path-number-calculator':
      return <TwinFlameLifePathWidget />;
    case 'twin-flame-numerology-calculator':
      return <TwinFlameNumerologyWidget />;
    case 'twin-flame-love-calculator':
      return <TwinFlameLoveWidget />;
    case 'twin-flame-birth-chart-calculator':
      return <TwinFlameBirthChartWidget />;

    // 14 State & City Paycheck
    case 'california-paycheck-calculator':
      return <CaliforniaPaycheckWidget />;
    case 'texas-paycheck-calculator':
      return <TexasPaycheckWidget />;
    case 'florida-paycheck-calculator':
      return <FloridaPaycheckWidget />;
    case 'new-york-city-paycheck-calculator':
      return <NewYorkCityPaycheckWidget />;
    case 'new-jersey-paycheck-calculator':
      return <NewJerseyPaycheckWidget />;
    case 'illinois-paycheck-calculator':
      return <IllinoisPaycheckWidget />;
    case 'chicago-paycheck-calculator':
      return <ChicagoPaycheckWidget />;
    case 'pennsylvania-paycheck-tax-calculator':
      return <PennsylvaniaPaycheckWidget />;
    case 'ohio-paycheck-tax-calculator':
      return <OhioPaycheckWidget />;
    case 'georgia-paycheck-calculator':
      return <GeorgiaPaycheckWidget />;
    case 'colorado-paycheck-calculator':
      return <ColoradoPaycheckWidget />;
    case 'indiana-paycheck-calculator':
      return <IndianaPaycheckWidget />;
    case 'north-carolina-paycheck-calculator':
      return <NorthCarolinaPaycheckWidget />;
    case 'michigan-hourly-paycheck-calculator':
      return <MichiganHourlyPaycheckWidget />;

    // Wage Frequencies & Tax
    case 'paycheck-calculator':
      return <PaycheckCalculatorWidget />;
    case 'paycheck-tax-calculator':
      return <PaycheckTaxCalculatorWidget />;
    case 'us-salary-tax-calculator':
      return <UsSalaryTaxCalculatorWidget />;
    case 'hourly-paycheck-calculator':
      return <HourlyPaycheckWidget />;
    case 'daily-paycheck-calculator':
      return <DailyPaycheckWidget />;
    case 'weekly-paycheck-calculator':
      return <WeeklyPaycheckWidget />;
    case 'monthly-paycheck-calculator':
      return <MonthlyPaycheckWidget />;
    case 'yearly-paycheck-calculator':
      return <YearlyPaycheckWidget />;
    case 'overtime-calculator':
      return <OvertimeCalculatorWidget />;
    case 'pay-raise-calculator':
      return <PayRaiseCalculatorWidget />;
    case 'eic-calculator':
      return <EicCalculatorWidget />;

    // Investments & Wealth
    case 'stock-calculator':
      return <StockCalculatorWidget />;
    case 'roi-calculator':
      return <RoiCalculatorWidget />;
    case 'fixed-deposit-calculator':
      return <FixedDepositCalculatorWidget />;
    case 'sip-calculator':
      return <SipCalculatorWidget />;
    case 'stp-calculator':
      return <StpCalculatorWidget />;
    case 'xrp-profit-calculator':
      return <XrpProfitCalculatorWidget />;
    case 'ltp-calculator':
      return <LtpCalculatorWidget />;

    // Travel
    case 'trip-budget-calculator':
      return <TripBudgetCalculatorWidget />;

    default:
      return (
        <div className="p-8 bg-white border border-slate-200 rounded-xl text-center">
          <p className="text-base font-semibold text-slate-800">Calculator module is loading</p>
        </div>
      );
  }
};
