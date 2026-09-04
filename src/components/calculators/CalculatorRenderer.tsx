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

// Marine Propeller Widgets
import { MarinePropellerWidget } from './MarinePropellerWidget';

// Thrust Widgets
import {
  ThrustToWeightWidget,
  DroneThrustWidget,
  RocketThrustWidget,
  GeneralThrustWidget,
} from './ThrustWidgets';

// Structural, Civil & Fitness Thrust Widgets
import {
  PipeThrustWidget,
  RafterThrustWidget,
  HipThrustWidget,
} from './StructuralThrustWidgets';

// Physics, Tech & Medical Density Widgets
import {
  GeneralDensityWidget,
  CubeDensityWidget,
  WaterDensityWidget,
  AirDensityWidget,
  PixelDensityWidget,
  PopulationDensityWidget,
  PsaDensityWidget,
} from './DensityPhysicsWidgets';

// Freight & Logistics Density Widgets
import { FreightDensityWidget } from './FreightDensityWidgets';

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

    // Marine Propellers
    case 'suzuki-prop-calculator':
      return <MarinePropellerWidget brand="suzuki" title="Suzuki Prop Calculator" />;
    case 'sailboat-propeller-calculator':
      return <MarinePropellerWidget brand="sailboat" title="Sailboat Propeller Calculator" />;
    case 'propeller-calculator':
      return <MarinePropellerWidget brand="general" title="Propeller Calculator" />;
    case 'mercury-propeller-calculator':
      return <MarinePropellerWidget brand="mercury" title="Mercury Propeller Calculator" />;
    case 'michigan-wheel-prop-calculator':
      return <MarinePropellerWidget brand="michigan-wheel" title="Michigan Wheel Prop Calculator" />;
    case 'acme-prop-calculator':
      return <MarinePropellerWidget brand="acme" title="Acme Prop Calculator" />;

    // Aero, Drone, Rocket & Propulsion Thrust
    case 'thrust-to-weight-ratio-calculator':
      return <ThrustToWeightWidget />;
    case 'thrust-calculator':
      return <GeneralThrustWidget type="general" title="Thrust Calculator" />;
    case 'propeller-thrust-calculator':
      return <GeneralThrustWidget type="propeller" title="Propeller Thrust Calculator" />;
    case 'rocket-thrust-calculator':
      return <RocketThrustWidget />;
    case 'drone-thrust-calculator':
      return <DroneThrustWidget />;
    case 'static-thrust-calculator':
      return <GeneralThrustWidget type="static" title="Static Thrust Calculator" />;
    case 'motor-thrust-calculator':
      return <GeneralThrustWidget type="motor" title="Motor Thrust Calculator" />;
    case 'fan-thrust-calculator':
      return <GeneralThrustWidget type="fan" title="Fan Thrust Calculator" />;
    case 'rc-thrust-calculator':
      return <GeneralThrustWidget type="rc" title="RC Thrust Calculator" />;
    case 'rpm-to-thrust-calculator':
      return <GeneralThrustWidget type="rpm" title="RPM to Thrust Calculator" />;
    case 'jet-engine-thrust-calculator':
      return <GeneralThrustWidget type="jet" title="Jet Engine Thrust Calculator" />;

    // Structural, Civil & Fitness Thrust
    case 'pipe-thrust-calculator':
      return <PipeThrustWidget />;
    case 'rafter-thrust-calculator':
      return <RafterThrustWidget />;
    case 'hip-thrust-calculator':
      return <HipThrustWidget />;

    // Physics, Tech, Demographics & Medical Density
    case 'density-calculator':
      return <GeneralDensityWidget />;
    case 'cube-density-calculator':
      return <CubeDensityWidget />;
    case 'water-density-calculator':
      return <WaterDensityWidget />;
    case 'air-density-calculator':
      return <AirDensityWidget />;
    case 'pixel-density-calculator':
      return <PixelDensityWidget />;
    case 'population-density-calculator':
      return <PopulationDensityWidget />;
    case 'psa-density-calculator':
      return <PsaDensityWidget />;

    // Logistics & Freight Density
    case 'freight-density-calculator':
      return <FreightDensityWidget carrier="generic" title="Freight Density Calculator" />;
    case 'ltl-density-calculator':
      return <FreightDensityWidget carrier="generic" title="LTL Density Calculator" />;
    case 'bluegrace-density-calculator':
      return <FreightDensityWidget carrier="bluegrace" title="BlueGrace Density Calculator" />;
    case 'saia-density-calculator':
      return <FreightDensityWidget carrier="saia" title="Saia Density Calculator" />;
    case 'xpo-density-calculator':
      return <FreightDensityWidget carrier="xpo" title="XPO Density Calculator" />;

    default:
      return (
        <div className="p-8 bg-white border border-slate-200 rounded-xl text-center">
          <p className="text-base font-semibold text-slate-800">Calculator module is loading</p>
        </div>
      );
  }
};
