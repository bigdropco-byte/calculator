import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { Calculator, ShieldCheck, Zap, Layers } from 'lucide-react';
import { SocialLinks } from '@/components/navigation/SocialLinks';
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
  const title = `${ui.navAbout} – ${SITE_CONFIG.name}`;
  const canonicalUrl = getCanonicalUrl('/about/', locale as Locale);

  return {
    title,
    description: ui.description,
    alternates: getCanonicalAlternates('/about/', locale as Locale),
    openGraph: {
      title,
      description: ui.description,
      url: canonicalUrl,
      type: 'website',
      siteName: SITE_CONFIG.name,
      locale,
    },
    twitter: {
      card: 'summary_large_image',
      site: SITE_CONFIG.twitterHandle,
      creator: SITE_CONFIG.twitterHandle,
      title,
      description: ui.description,
    },
  };
}

export default async function LocalizedAboutPage({ params }: Props) {
  const { locale } = await params;
  if (!isValidLocale(locale)) {
    notFound();
  }

  const currentLocale = locale as Locale;
  const ui = getUiTranslations(currentLocale);

  const breadcrumbs = [
    { name: ui.breadcrumbsHome, url: getLocalizedPath('/', currentLocale) },
    { name: ui.navAbout, url: getLocalizedPath('/about/', currentLocale) },
  ];

  const pageSchema = generateWebPageSchema(
    ui.navAbout,
    ui.description,
    '/about/',
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
          <span className="text-slate-800 font-medium">{ui.navAbout}</span>
        </nav>

        <header className="border-b border-slate-200 pb-6">
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {ui.navAbout} Calculat.dev
          </h1>
          <p className="text-base text-slate-600 mt-2 leading-relaxed">
            {ui.description}
          </p>
        </header>

        <section className="bg-sky-50 border border-sky-200/80 rounded-2xl p-6 sm:p-8">
          <h2 className="text-lg font-bold text-sky-950 mb-2">🎓 {ui.studentBadge}</h2>
          <p className="text-sm text-sky-900 leading-relaxed">
            {ui.studentNote}
          </p>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
            <div className="p-2.5 rounded-lg bg-sky-50 text-sky-600 w-fit mb-3">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">{ui.instantFastTitle}</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              {ui.instantFastDesc}
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
            <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-600 w-fit mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">{ui.privacyTitle}</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              {ui.privacyDesc}
            </p>
          </div>
        </section>

        <section className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs">
          <h2 className="text-base font-bold text-slate-900 mb-3">{ui.connectFollow}</h2>
          <SocialLinks size="lg" />
        </section>
      </article>
    </>
  );
}
