'use client';

import React from 'react';
import { StatePaycheckWidget } from './StatePaycheckWidget';

export const CaliforniaPaycheckWidget: React.FC = () => (
  <StatePaycheckWidget
    defaultState="CA"
    defaultGross={85000}
    fixedState
    title="California Paycheck Calculator (CA SDI & Progressive Tax)"
  />
);

export const TexasPaycheckWidget: React.FC = () => (
  <StatePaycheckWidget
    defaultState="TX"
    defaultGross={75000}
    fixedState
    title="Texas Paycheck Calculator (0% State Income Tax)"
  />
);

export const FloridaPaycheckWidget: React.FC = () => (
  <StatePaycheckWidget
    defaultState="FL"
    defaultGross={75000}
    fixedState
    title="Florida Paycheck Calculator (0% State Income Tax)"
  />
);

export const NewYorkCityPaycheckWidget: React.FC = () => (
  <StatePaycheckWidget
    defaultState="NYC"
    defaultGross={90000}
    fixedState
    title="New York City Paycheck Calculator (NY State + NYC Resident Tax)"
  />
);

export const NewJerseyPaycheckWidget: React.FC = () => (
  <StatePaycheckWidget
    defaultState="NJ"
    defaultGross={85000}
    fixedState
    title="New Jersey Paycheck Calculator (NJ Gross Income Tax & SUI/FLI)"
  />
);

export const IllinoisPaycheckWidget: React.FC = () => (
  <StatePaycheckWidget
    defaultState="IL"
    defaultGross={75000}
    fixedState
    title="Illinois Paycheck Calculator (Flat 4.95% State Tax)"
  />
);

export const ChicagoPaycheckWidget: React.FC = () => (
  <StatePaycheckWidget
    defaultState="Chicago"
    defaultGross={78000}
    fixedState
    title="Chicago Paycheck Calculator (Illinois 4.95% State Tax)"
  />
);

export const PennsylvaniaPaycheckWidget: React.FC = () => (
  <StatePaycheckWidget
    defaultState="PA"
    defaultGross={70000}
    fixedState
    title="Pennsylvania Paycheck Tax Calculator (Flat 3.07% + Local EIT)"
  />
);

export const OhioPaycheckWidget: React.FC = () => (
  <StatePaycheckWidget
    defaultState="OH"
    defaultGross={68000}
    fixedState
    title="Ohio Paycheck Tax Calculator (State & Municipal Taxes)"
  />
);

export const GeorgiaPaycheckWidget: React.FC = () => (
  <StatePaycheckWidget
    defaultState="GA"
    defaultGross={70000}
    fixedState
    title="Georgia Paycheck Calculator (5.49% State Income Tax)"
  />
);

export const ColoradoPaycheckWidget: React.FC = () => (
  <StatePaycheckWidget
    defaultState="CO"
    defaultGross={80000}
    fixedState
    title="Colorado Paycheck Calculator (Flat 4.4% State Tax & FAMLI)"
  />
);

export const IndianaPaycheckWidget: React.FC = () => (
  <StatePaycheckWidget
    defaultState="IN"
    defaultGross={65000}
    fixedState
    title="Indiana Paycheck Calculator (Flat 3.05% State Tax & County Tax)"
  />
);

export const NorthCarolinaPaycheckWidget: React.FC = () => (
  <StatePaycheckWidget
    defaultState="NC"
    defaultGross={70000}
    fixedState
    title="North Carolina Paycheck Calculator (Flat 4.5% State Tax)"
  />
);

export const MichiganHourlyPaycheckWidget: React.FC = () => (
  <StatePaycheckWidget
    defaultState="MI"
    defaultGross={32}
    defaultFrequency="hourly"
    fixedState
    title="Michigan Hourly Paycheck Calculator (Flat 4.25% State Tax)"
  />
);
