'use client';

import React from 'react';
import { StatePaycheckWidget } from './StatePaycheckWidget';

export const PaycheckTaxCalculatorWidget: React.FC = () => {
  return (
    <StatePaycheckWidget
      defaultFrequency="annual"
      defaultGross={70000}
      title="Paycheck Tax Calculator (Federal & State Tax Breakdown)"
    />
  );
};
