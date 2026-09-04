import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Calculator, ShieldCheck, Zap, Layers } from 'lucide-react';
import { SITE_CONFIG, generateBreadcrumbSchema, generateWebPageSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'About Calculat – The Free Online Calculator Directory',
  description:
    'Learn about Calculat.dev, our mission to build the internet’s cleanest, fastest, and most comprehensive directory of calculation tools.',
  alternates: {
    canonical: `${SITE_CONFIG.url}/about`,
  },
  openGraph: {
    title: 'About Calculat – The Free Online Calculator Directory',
    description:
      'Learn about Calculat.dev, our mission to build the internet’s cleanest, fastest, and most comprehensive directory of calculation tools.',
    url: `${SITE_CONFIG.url}/about`,
    type: 'website',
    siteName: SITE_CONFIG.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Calculat – Free Online Calculator Directory',
    description:
      'Learn about Calculat.dev and our independent student mission to build an ad-free calculator platform.',
  },
};

export default function AboutPage() {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'About', url: '/about' },
  ];

  const pageSchema = generateWebPageSchema(
    'About Calculat',
    'Mission, architecture, and story behind Calculat.dev',
    '/about'
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema(breadcrumbs)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(pageSchema),
        }}
      />
      <div className="max-w-3xl mx-auto space-y-8">
      <div className="border-b border-slate-200 pb-5">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">About Calculat</h1>
        <p className="text-sm text-slate-600 mt-2 leading-relaxed">
          Find the Right Calculator. Get the Answer.
        </p>
      </div>

      <div className="prose prose-slate max-w-none space-y-6 text-sm sm:text-base text-slate-700 leading-relaxed">
        <p>
          <strong>Calculat.dev</strong> was created with a straightforward purpose: to provide the internet with a clean, fast, and structured directory of high-accuracy calculation tools without marketing bloat, intrusive ads, or forced sign-ups.
        </p>

        <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">Our Core Philosophy</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose my-6">
          <div className="p-4 bg-white border border-slate-200 rounded-xl">
            <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center mb-2">
              <Zap className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Search-First Utility</h3>
            <p className="text-xs text-slate-500 mt-1">
              When you need an answer, you shouldn&apos;t have to read 2,000 words of filler before finding the input boxes. The calculator always comes first.
            </p>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Client-Side Privacy</h3>
            <p className="text-xs text-slate-500 mt-1">
              Your numbers are your business. Calculations run locally in your web browser whenever feasible. We do not store or monetize your private financial or health inputs.
            </p>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-2">
              <Layers className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Directory Architecture</h3>
            <p className="text-xs text-slate-500 mt-1">
              Built as a scalable taxonomy spanning math, finance, health, date &amp; time, engineering, statistics, and everyday calculations.
            </p>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center mb-2">
              <Calculator className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Rigorous Accuracy</h3>
            <p className="text-xs text-slate-500 mt-1">
              Every formula is verified against mathematical benchmarks and validated with comprehensive automated test suites.
            </p>
          </div>
        </div>

        <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">The Story: An Independent Student Project</h2>
        <p>
          Calculat was founded by a college student who got tired of watching simple web utilities turn into bloated corporate ad-farms. Doing problem sets and coursework shouldn&apos;t require dodging five autoplay video banners and popups just to find a percentage change or mortgage payment.
        </p>
        <p>
          Instead of building yet another closed SaaS or ad-cluttered tool, Calculat was started as a personal passion project: an open directory of fast, beautiful, and mathematically rigorous calculators that anyone can use for free, without accounts or intrusive trackers.
        </p>
        <p>
          Every calculator is coded in between classes and over weekends. If you find Calculat helpful, the best way to support this project is simply to <strong>press ⌘+D to bookmark the site</strong>, use it whenever you have a calculation need, and share it with a classmate or coworker!
        </p>

        <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">Our Commitment</h2>
        <p>
          Calculat will always prioritize clean usability, privacy, and mathematical accuracy over marketing clutter. We continuously write new calculator modules and expand our directory based on direct suggestions from our visitors.
        </p>

        <div className="pt-6 border-t border-slate-200 flex items-center gap-4">
          <Link
            href="/calculators"
            className="px-4 py-2 bg-sky-600 text-white rounded-lg text-xs font-semibold hover:bg-sky-700 transition-colors"
          >
            Explore Directory
          </Link>
          <Link
            href="/contact"
            className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-xs font-semibold hover:bg-slate-50 transition-colors"
          >
            Suggest a Calculator
          </Link>
        </div>
      </div>
    </div>
    </>
  );
}
