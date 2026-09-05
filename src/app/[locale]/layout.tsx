import React from 'react';
import { notFound } from 'next/navigation';
import { isValidLocale, NON_DEFAULT_LOCALES, Locale } from '@/lib/i18n/config';
import { LocaleDocumentSetter } from '@/components/navigation/LocaleDocumentSetter';

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<any>;
}

export function generateStaticParams() {
  return NON_DEFAULT_LOCALES.map(locale => ({ locale }));
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const resolvedParams = await params;
  const locale = resolvedParams?.locale || '';

  if (!isValidLocale(locale)) {
    notFound();
  }

  return (
    <>
      <LocaleDocumentSetter locale={locale as Locale} />
      {children}
    </>
  );
}
