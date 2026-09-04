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

interface CalculatorRendererProps {
  slug: string;
}

export const CalculatorRenderer: React.FC<CalculatorRendererProps> = ({ slug }) => {
  switch (slug) {
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

    // 15 New Numerology, Twin Flame, and Career Calculators
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

    default:
      return (
        <div className="p-8 bg-white border border-slate-200 rounded-xl text-center">
          <p className="text-base font-semibold text-slate-800">Calculator module is loading</p>
        </div>
      );
  }
};
