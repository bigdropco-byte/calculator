import React from 'react';
import Image from 'next/image';
import {
  Sparkles,
  Search,
  MousePointerClick,
  SlidersHorizontal,
  Zap,
  CheckCircle2,
  Share2,
  Gift,
  ShieldCheck,
  Smartphone,
  RefreshCw,
} from 'lucide-react';

const STEPS = [
  {
    number: '1',
    title: 'Search or Browse',
    description: 'Find the calculator you need using search or explore categories & popular tools.',
    icon: Search,
    color: 'text-sky-600 bg-sky-50 border-sky-200',
  },
  {
    number: '2',
    title: 'Choose a Calculator',
    description: 'Select any calculator that matches your need. Each tool is designed to be simple and easy to use.',
    icon: MousePointerClick,
    color: 'text-indigo-600 bg-indigo-50 border-indigo-200',
  },
  {
    number: '3',
    title: 'Enter Your Values',
    description: 'Input the required numbers or details. Our calculators support real-time validation for accuracy.',
    icon: SlidersHorizontal,
    color: 'text-blue-600 bg-blue-50 border-blue-200',
  },
  {
    number: '4',
    title: 'Calculate Instantly',
    description: 'Click the calculate button and get instant, accurate results in a fraction of a second.',
    icon: Zap,
    color: 'text-amber-600 bg-amber-50 border-amber-200',
  },
  {
    number: '5',
    title: 'View Results',
    description: 'See your results clearly displayed with explanations (when available) to help you understand better.',
    icon: CheckCircle2,
    color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
  },
  {
    number: '6',
    title: 'Use, Save & Share',
    description: 'Use the results, reset for new calculations, or share with others if needed.',
    icon: Share2,
    color: 'text-purple-600 bg-purple-50 border-purple-200',
  },
];

const HIGHLIGHTS = [
  {
    title: '100% Free',
    description: 'All calculators are completely free to use.',
    icon: Gift,
  },
  {
    title: 'Fast & Accurate',
    description: 'Get instant results with high accuracy.',
    icon: Zap,
  },
  {
    title: 'Privacy Friendly',
    description: "We don't store your data. Your privacy is safe.",
    icon: ShieldCheck,
  },
  {
    title: 'Mobile Friendly',
    description: 'Works perfectly on desktop, tablet, and mobile devices.',
    icon: Smartphone,
  },
  {
    title: 'Always Updated',
    description: 'New calculators added regularly.',
    icon: RefreshCw,
  },
];

export const HowItWorksSection: React.FC = () => {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-title"
      className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-2xs space-y-8"
    >
      {/* Section Header */}
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-semibold mb-2.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Quick &amp; Easy Guide</span>
        </div>
        <h2
          id="how-it-works-title"
          className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight"
        >
          How Calculat Works
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
          Powerful calculators, instant results, and 100% free with complete privacy. Follow these easy steps to get accurate results in seconds.
        </p>
      </div>

      {/* Infographic Graphic with SEO Alt Text and Semantic Schema Reference */}
      <figure className="relative w-full rounded-xl sm:rounded-2xl overflow-hidden border border-slate-200/80 bg-slate-50 shadow-xs">
        <Image
          src="/how-calculat-works.jpg"
          alt="How Calculat.dev Works: 6-step infographic guide explaining how to search or browse calculators, enter values, calculate instantly, view accurate results, and save or share calculations for math, finance, health, and everyday use"
          title="Calculat.dev - How It Works: Powerful Calculators, Instant Results, 100% Free"
          width={1024}
          height={512}
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1024px"
          className="w-full h-auto object-contain block select-none"
          loading="lazy"
          decoding="async"
        />
        <figcaption className="sr-only">
          Calculat.dev How It Works 6-step process: 
          1. Search or Browse: Find the calculator you need using search or explore categories and popular tools. 
          2. Choose a Calculator: Select any calculator that matches your need. Each tool is designed to be simple and easy to use. 
          3. Enter Your Values: Input the required numbers or details. Our calculators support real-time validation for accuracy. 
          4. Calculate Instantly: Click the calculate button and get instant, accurate results in a fraction of a second. 
          5. View Results: See your results clearly displayed with explanations to help you understand better. 
          6. Use, Save &amp; Share: Use the results, reset for new calculations, or share with others if needed. 
          Highlights: 100% Free, Fast &amp; Accurate, Privacy Friendly, Mobile Friendly, and Always Updated.
        </figcaption>
      </figure>

      {/* 6-Step Accessible Grid */}
      <div>
        <div className="mb-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
            6 Simple Steps to Instant Answers
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {STEPS.map(step => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="p-4 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-white hover:border-sky-200 hover:shadow-xs transition-all flex items-start gap-3.5"
              >
                <div
                  className={`w-9 h-9 rounded-lg border flex items-center justify-center shrink-0 font-bold text-xs ${step.color}`}
                >
                  <span>{step.number}</span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <Icon className="w-3.5 h-3.5 text-slate-400" />
                    <h4 className="text-sm font-semibold text-slate-900">{step.title}</h4>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Feature Badges */}
      <div className="pt-2 border-t border-slate-100">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {HIGHLIGHTS.map(item => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-md bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h5 className="text-xs font-semibold text-slate-900">{item.title}</h5>
                  <p className="text-[11px] text-slate-500 leading-snug mt-0.5">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
