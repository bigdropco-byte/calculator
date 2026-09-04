'use client';

import React from 'react';
import { StatePaycheckWidget } from './StatePaycheckWidget';

export const PaycheckCalculatorWidget: React.FC = () => {
  return (
    <StatePaycheckWidget
      defaultFrequency="bi-weekly"
      defaultGross={3000}
      title="US Paycheck Calculator"
    />
  );
};
