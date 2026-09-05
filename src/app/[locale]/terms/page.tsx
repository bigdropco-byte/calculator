import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
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
  const title = `${ui.navTerms} – ${SITE_CONFIG.name}`;
  const canonicalUrl = getCanonicalUrl('/terms/', locale as Locale);

  return {
    title,
    description: `Terms of service and conditions for using ${SITE_CONFIG.name}.`,
    alternates: getCanonicalAlternates('/terms/', locale as Locale),
    openGraph: {
      title,
      description: `Terms of service and conditions for using ${SITE_CONFIG.name}.`,
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
      description: `Terms of service for using ${SITE_CONFIG.name}.`,
    },
  };
}

export default async function LocalizedTermsPage({ params }: Props) {
  const { locale } = await params;
  if (!isValidLocale(locale)) {
    notFound();
  }

  const currentLocale = locale as Locale;
  const ui = getUiTranslations(currentLocale);

  const breadcrumbs = [
    { name: ui.breadcrumbsHome, url: getLocalizedPath('/', currentLocale) },
    { name: ui.navTerms, url: getLocalizedPath('/terms/', currentLocale) },
  ];

  const pageSchema = generateWebPageSchema(
    ui.navTerms,
    `Terms of service and conditions for using ${SITE_CONFIG.name}`,
    '/terms/',
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
          <span className="text-slate-800 font-medium">{ui.navTerms}</span>
        </nav>

        <header className="border-b border-slate-200 pb-5">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {ui.navTerms}
          </h1>
          <p className="text-xs text-slate-400 mt-1">Calculat.dev • {SITE_CONFIG.domain}</p>
        </header>

        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6 text-sm text-slate-700 leading-relaxed">
          <section>
            <h2 className="text-base font-bold text-slate-900 mb-2">1. Educational &amp; General Purpose Use</h2>
            <p>
              Calculat.dev provides computational utilities for educational, personal, and professional estimation purposes. All tools and results are provided &quot;as is&quot; without warranties of any kind.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900 mb-2">2. Free Access</h2>
            <p>
              Access to Calculat is completely free and requires no registration, subscriptions, or payments. You may use our tools as frequently as you wish without restriction.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900 mb-2">3. Intellectual Property</h2>
            <p>
              The design, layout, code architecture, and editorial guides of Calculat.dev are copyrighted works of the independent student creator. Public mathematical formulas and standard algorithms remain open knowledge.
            </p>
          </section>
        </div>
      </article>
    </>
  );
}
