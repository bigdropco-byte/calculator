'use client';

import React from 'react';
import { StatePaycheckWidget } from './StatePaycheckWidget';

export const HourlyPaycheckWidget: React.FC = () => {
  return (
    <StatePaycheckWidget
      defaultFrequency="hourly"
      defaultGross={30}
      title="Hourly Paycheck Calculator"
    />
  );
};
