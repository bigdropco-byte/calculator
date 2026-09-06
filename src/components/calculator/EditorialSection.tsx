import React from 'react';
import { CalculatorDefinition } from '@/lib/types';
import { getRelatedCalculators } from '@/lib/calculatorRegistry';
import { CalculatorCard } from '@/components/directory/CalculatorCard';
import { BookOpen, HelpCircle, Lightbulb, Calculator as CalcIcon } from 'lucide-react';

interface EditorialSectionProps {
  calculator: CalculatorDefinition;
}

export const EditorialSection: React.FC<EditorialSectionProps> = ({ calculator }) => {
  const { editorial } = calculator;
  const related = getRelatedCalculators(calculator, 3);

  return (
    <div className="mt-12 space-y-12 border-t border-slate-200 pt-12">
      {/* Overview & What is */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-2xs">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2.5">
          <BookOpen className="w-5 h-5 text-sky-700" />
          What Is a {calculator.name}?
        </h2>
        <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
          {editorial.whatIs}
        </p>

        {/* How to use */}
        <div className="mt-6 pt-6 border-t border-slate-100">
          <h3 className="text-base font-semibold text-slate-900 mb-3">
            How to Use This Calculator
          </h3>
          <ol className="space-y-2 text-sm text-slate-600 list-decimal list-inside">
            {editorial.howToUse.map((step, idx) => (
              <li key={idx} className="leading-relaxed">
                {step}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Formula & Example Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Formula */}
        <section className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
              <CalcIcon className="w-4 h-4 text-sky-700" />
              {editorial.formula.title}
            </h2>
            <div className="my-4 p-4 bg-slate-50 border border-slate-200 rounded-lg text-center overflow-x-auto">
              <code className="text-sm font-mono font-bold text-sky-900">
                {editorial.formula.expression}
              </code>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {editorial.formula.explanation}
            </p>
          </div>
        </section>

        {/* Worked Example */}
        <section className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs">
          <h2 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-amber-500" />
            Worked Example
          </h2>
          <p className="text-xs font-semibold text-slate-700 mb-2">
            Scenario: {editorial.example.scenario}
          </p>
          <div className="space-y-1.5 my-3 text-xs text-slate-600 pl-3 border-l-2 border-amber-300">
            {editorial.example.steps.map((st, i) => (
              <p key={i}>{st}</p>
            ))}
          </div>
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-md text-xs text-amber-900 font-medium mt-3">
            <strong>Result:</strong> {editorial.example.result}
          </div>
        </section>
      </div>

      {/* Tips */}
      {editorial.tips.length > 0 && (
        <section className="bg-sky-50/70 border border-sky-200/80 rounded-xl p-6">
          <h2 className="text-base font-bold text-sky-950 mb-3 flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-sky-700" />
            Tips &amp; Key Notes
          </h2>
          <ul className="space-y-2 text-xs sm:text-sm text-sky-900 list-disc list-inside">
            {editorial.tips.map((tip, idx) => (
              <li key={idx} className="leading-relaxed">
                {tip}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* FAQs */}
      {editorial.faqs.length > 0 && (
        <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-2xs">
          <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2.5">
            <HelpCircle className="w-5 h-5 text-sky-700" />
            Frequently Asked Questions
          </h2>
          <div className="divide-y divide-slate-100">
            {editorial.faqs.map((faq, index) => (
              <div key={index} className="py-4 first:pt-0 last:pb-0">
                <h3 className="text-base font-semibold text-slate-900 mb-1.5">
                  {faq.question}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Related Calculators */}
      {related.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-slate-900">Related Calculators</h2>
            <span className="text-xs text-slate-600">Explore similar tools</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {related.map(relCalc => (
              <CalculatorCard key={relCalc.slug} calculator={relCalc} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
