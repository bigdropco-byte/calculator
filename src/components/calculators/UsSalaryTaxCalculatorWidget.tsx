'use client';

import React from 'react';
import { StatePaycheckWidget } from './StatePaycheckWidget';

export const UsSalaryTaxCalculatorWidget: React.FC = () => {
  return (
    <StatePaycheckWidget
      defaultFrequency="annual"
      defaultGross={85000}
      title="US Salary Tax Calculator"
    />
  );
};
