'use client';

import React from 'react';
import { StatePaycheckWidget } from './StatePaycheckWidget';

export const WeeklyPaycheckWidget: React.FC = () => {
  return (
    <StatePaycheckWidget
      defaultFrequency="weekly"
      defaultGross={1300}
      title="Weekly Paycheck Calculator"
    />
  );
};
