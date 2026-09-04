import React from 'react';
import { Metadata } from 'next';
import { AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Financial & Medical Disclaimer – Calculat.dev',
  description:
    'Important informational disclaimers regarding financial estimates, medical guidelines, and general calculations provided on Calculat.dev.',
};

export default function DisclaimerPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6 text-sm text-slate-700 leading-relaxed">
      <div className="border-b border-slate-200 pb-5">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Disclaimer &amp; Important Notice
        </h1>
        <p className="text-xs text-slate-500 mt-1">Last updated: January 2025</p>
      </div>

      <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-xs leading-relaxed">
          <strong className="font-semibold block text-sm mb-0.5">Informational Use Only:</strong>
          Calculat.dev provides mathematical calculation tools strictly for general educational and informational illustration. Nothing on this website constitutes certified financial, investment, legal, tax, or medical advice.
        </div>
      </div>

      <h2 className="text-lg font-bold text-slate-900 pt-2">1. Financial Calculations Disclaimer</h2>
      <p>
        Calculators related to loans, mortgages, compound interest, investments, and taxes generate estimates based on standard formulas and user-supplied parameters. Actual lender interest rates, APR disclosures, amortization methodologies, closing costs, insurance premiums, and tax liabilities depend on individual credit profiles, local regulations, and specific financial institutions.
      </p>
      <p>
        Always consult a licensed financial advisor, Certified Public Accountant (CPA), or authorized lending professional prior to entering into any financial contracts.
      </p>

      <h2 className="text-lg font-bold text-slate-900 pt-2">2. Health &amp; Medical Disclaimer</h2>
      <p>
        Calculators relating to Body Mass Index (BMI), calories, body metrics, or pregnancy are screening utilities based on population-level benchmarks (such as World Health Organization criteria). They do not constitute a medical diagnosis, clinical evaluation, or individualized treatment plan.
      </p>
      <p>
        Always consult a qualified physician, registered dietitian, or certified healthcare provider regarding any health condition, medical questions, or weight management regimen.
      </p>

      <h2 className="text-lg font-bold text-slate-900 pt-2">3. Mathematical &amp; Technical Accuracy</h2>
      <p>
        While we strive for absolute accuracy through automated unit test suites and standardized formulas, Calculat does not guarantee that computations are free of unintended typographical or algorithmic discrepancies. Users should independently verify critical calculations before relying on them for construction, engineering, or legal agreements.
      </p>
    </div>
  );
}
