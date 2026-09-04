'use client';

import React from 'react';
import { StatePaycheckWidget } from './StatePaycheckWidget';

export const MonthlyPaycheckWidget: React.FC = () => {
  return (
    <StatePaycheckWidget
      defaultFrequency="monthly"
      defaultGross={5500}
      title="Monthly Paycheck Calculator"
    />
  );
};
