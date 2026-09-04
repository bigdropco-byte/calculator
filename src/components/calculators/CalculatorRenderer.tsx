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
    default:
      return (
        <div className="p-8 bg-white border border-slate-200 rounded-xl text-center">
          <p className="text-base font-semibold text-slate-800">Calculator module is loading</p>
        </div>
      );
  }
};
