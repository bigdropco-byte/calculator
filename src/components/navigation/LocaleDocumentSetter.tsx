'use client';

import { useEffect } from 'react';
import { Locale, LOCALES } from '@/lib/i18n/config';

export function LocaleDocumentSetter({ locale }: { locale: Locale }) {
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale;
      document.documentElement.dir = LOCALES[locale]?.dir || 'ltr';
    }
  }, [locale]);

  return null;
}
