'use client';

import React from 'react';
import { StatePaycheckWidget } from './StatePaycheckWidget';

export const DailyPaycheckWidget: React.FC = () => {
  return (
    <StatePaycheckWidget
      defaultFrequency="daily"
      defaultGross={260}
      title="Daily Paycheck Calculator"
    />
  );
};
