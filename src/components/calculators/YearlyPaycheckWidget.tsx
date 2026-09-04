'use client';

import React from 'react';
import { StatePaycheckWidget } from './StatePaycheckWidget';

export const YearlyPaycheckWidget: React.FC = () => {
  return (
    <StatePaycheckWidget
      defaultFrequency="annual"
      defaultGross={75000}
      title="Yearly Paycheck Calculator"
    />
  );
};
