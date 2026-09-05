import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { ContactForm } from '@/components/content/ContactForm';
import { SocialLinks } from '@/components/navigation/SocialLinks';
import {
  SITE_CONFIG,
  generateBreadcrumbSchema,
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
  const title = `${ui.navContact} – ${SITE_CONFIG.name}`;
  const canonicalUrl = getCanonicalUrl('/contact/', locale as Locale);

  return {
    title,
    description: ui.suggestTool,
    alternates: getCanonicalAlternates('/contact/', locale as Locale),
    openGraph: {
      title,
      description: ui.suggestTool,
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
      description: ui.suggestTool,
    },
  };
}

export default async function LocalizedContactPage({ params }: Props) {
  const { locale } = await params;
  if (!isValidLocale(locale)) {
    notFound();
  }

  const currentLocale = locale as Locale;
  const ui = getUiTranslations(currentLocale);

  const breadcrumbs = [
    { name: ui.breadcrumbsHome, url: getLocalizedPath('/', currentLocale) },
    { name: ui.navContact, url: getLocalizedPath('/contact/', currentLocale) },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema(breadcrumbs, currentLocale)),
        }}
      />

      <div className="max-w-2xl mx-auto space-y-8">
        <nav aria-label="Breadcrumb" className="text-xs text-slate-500 flex items-center gap-1.5">
          <Link href={getLocalizedPath('/', currentLocale)} className="hover:text-sky-600 transition-colors">
            {ui.breadcrumbsHome}
          </Link>
          <span>/</span>
          <span className="text-slate-800 font-medium">{ui.navContact}</span>
        </nav>

        <header className="border-b border-slate-200 pb-5">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {ui.navContact} &amp; Feedback
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
            {ui.suggestTool}
          </p>
        </header>

        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs">
          <ContactForm />
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs">
          <h2 className="text-sm font-bold text-slate-900 mb-2">{ui.connectFollow}</h2>
          <SocialLinks size="md" />
        </div>
      </div>
    </>
  );
}
