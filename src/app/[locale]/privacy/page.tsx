import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';
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
  const title = `${ui.navPrivacy} – ${SITE_CONFIG.name}`;
  const canonicalUrl = getCanonicalUrl('/privacy/', locale as Locale);

  return {
    title,
    description: ui.privacyBadge,
    alternates: getCanonicalAlternates('/privacy/', locale as Locale),
    openGraph: {
      title,
      description: ui.privacyBadge,
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
      description: ui.privacyBadge,
    },
  };
}

export default async function LocalizedPrivacyPage({ params }: Props) {
  const { locale } = await params;
  if (!isValidLocale(locale)) {
    notFound();
  }

  const currentLocale = locale as Locale;
  const ui = getUiTranslations(currentLocale);

  const breadcrumbs = [
    { name: ui.breadcrumbsHome, url: getLocalizedPath('/', currentLocale) },
    { name: ui.navPrivacy, url: getLocalizedPath('/privacy/', currentLocale) },
  ];

  const pageSchema = generateWebPageSchema(
    ui.navPrivacy,
    ui.privacyBadge,
    '/privacy/',
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
          <span className="text-slate-800 font-medium">{ui.navPrivacy}</span>
        </nav>

        <header className="border-b border-slate-200 pb-5">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {ui.navPrivacy}
          </h1>
          <p className="text-xs text-slate-400 mt-1">Calculat.dev • {SITE_CONFIG.domain}</p>
        </header>

        <div className="bg-emerald-50 border border-emerald-200/80 rounded-xl p-5 flex items-start gap-3.5">
          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div className="text-sm text-emerald-900 leading-relaxed">
            <strong>{ui.privacyTitle}:</strong> {ui.privacyBadge}
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6 text-sm text-slate-700 leading-relaxed">
          <section>
            <h2 className="text-base font-bold text-slate-900 mb-2">1. Client-Side Processing</h2>
            <p>
              Calculat is engineered from the ground up to calculate locally within your web browser. When you enter numbers into our calculators, those values never leave your device. We do not store, harvest, or transmit your calculation parameters or financial figures to any backend server.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900 mb-2">2. Local Storage Usage</h2>
            <p>
              To improve your convenience, Calculat utilizes browser LocalStorage solely to retain your favorite tools and recently used calculations. This data lives exclusively inside your private browser profile and can be cleared at any time with a single click.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900 mb-2">3. Zero Advertising Tracking</h2>
            <p>
              We do not run third-party behavioral advertising networks or intrusive tracking cookies. Calculat remains an independent student initiative dedicated to distraction-free utility.
            </p>
          </section>
        </div>
      </article>
    </>
  );
}
