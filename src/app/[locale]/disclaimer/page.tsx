import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';
import {
  SITE_CONFIG,
  generateBreadcrumbSchema,
  generateWebPageSchema,
  getCanonicalUrl,
  getCanonicalAlternates,
} from '@/lib/seo';
import { isValidLocale, NON_DEFAULT_LOCALES, Locale, getLocalizedPath } from '@/lib/i18n/config';
import { getUiTranslations } from '@/lib/i18n/translate';

interface Props {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return NON_DEFAULT_LOCALES.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  const ui = getUiTranslations(locale as Locale);
  const title = `${ui.navDisclaimer} – ${SITE_CONFIG.name}`;
  const canonicalUrl = getCanonicalUrl('/disclaimer/', locale as Locale);

  return {
    title,
    description: `Financial, medical, and legal disclaimer for ${SITE_CONFIG.name}.`,
    alternates: getCanonicalAlternates('/disclaimer/', locale as Locale),
    openGraph: {
      title,
      description: `Financial, medical, and legal disclaimer for ${SITE_CONFIG.name}.`,
      url: canonicalUrl,
      type: 'website',
      siteName: SITE_CONFIG.name,
      locale,
    },
    twitter: {
      card: 'summary',
      site: SITE_CONFIG.twitterHandle,
      creator: SITE_CONFIG.twitterHandle,
      title,
      description: `Disclaimer for ${SITE_CONFIG.name}.`,
    },
  };
}

export default async function LocalizedDisclaimerPage({ params }: Props) {
  const { locale } = await params;
  if (!isValidLocale(locale)) {
    notFound();
  }

  const currentLocale = locale as Locale;
  const ui = getUiTranslations(currentLocale);

  const breadcrumbs = [
    { name: ui.breadcrumbsHome, url: getLocalizedPath('/', currentLocale) },
    { name: ui.navDisclaimer, url: getLocalizedPath('/disclaimer/', currentLocale) },
  ];

  const pageSchema = generateWebPageSchema(
    ui.navDisclaimer,
    `Financial, medical, and computational disclaimer for ${SITE_CONFIG.name}`,
    '/disclaimer/',
    currentLocale
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema(breadcrumbs, currentLocale)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(pageSchema),
        }}
      />

      <article className="max-w-3xl mx-auto space-y-8">
        <nav aria-label="Breadcrumb" className="text-xs text-slate-500 flex items-center gap-1.5">
          <Link href={getLocalizedPath('/', currentLocale)} className="hover:text-sky-600 transition-colors">
            {ui.breadcrumbsHome}
          </Link>
          <span>/</span>
          <span className="text-slate-800 font-medium">{ui.navDisclaimer}</span>
        </nav>

        <header className="border-b border-slate-200 pb-5">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {ui.navDisclaimer}
          </h1>
          <p className="text-xs text-slate-400 mt-1">Calculat.dev • General Informational Notice</p>
        </header>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 flex items-start gap-3.5">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-sm text-amber-900 leading-relaxed">
            <strong>Notice:</strong> Calculators provided on Calculat.dev are intended solely for educational, research, and estimation purposes. They do not constitute formal financial, investment, legal, tax, or medical advice.
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6 text-sm text-slate-700 leading-relaxed">
          <section>
            <h2 className="text-base font-bold text-slate-900 mb-2">Financial Calculations</h2>
            <p>
              Loan amortizations, compound interest projections, mortgage comparisons, and investment estimates are approximations based upon user-supplied inputs and mathematical formulas. Real-world lending rates, tax brackets, fee structures, and market fluctuations can substantially alter actual obligations. Always consult a certified financial planner, CPA, or registered mortgage professional before making significant fiscal commitments.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900 mb-2">Health &amp; Fitness Calculations</h2>
            <p>
              Tools such as Body Mass Index (BMI), calorie estimations, and target heart rates are standardized population metrics and are not individualized clinical diagnoses. Consult a licensed physician or registered dietitian before initiating diet, exercise, or lifestyle changes.
            </p>
          </section>
        </div>
      </article>
    </>
  );
}
