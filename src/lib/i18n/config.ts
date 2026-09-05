export const SUPPORTED_LOCALES = ['en', 'es', 'fr', 'de', 'pt', 'hi'] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const NON_DEFAULT_LOCALES = ['es', 'fr', 'de', 'pt', 'hi'] as const;
export type NonDefaultLocale = (typeof NON_DEFAULT_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

export interface LocaleInfo {
  code: Locale;
  name: string;
  nativeName: string;
  flag: string;
  dir: 'ltr' | 'rtl';
}

export const LOCALES: Record<Locale, LocaleInfo> = {
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸',
    dir: 'ltr',
  },
  es: {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    flag: '🇪🇸',
    dir: 'ltr',
  },
  fr: {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    flag: '🇫🇷',
    dir: 'ltr',
  },
  de: {
    code: 'de',
    name: 'German',
    nativeName: 'Deutsch',
    flag: '🇩🇪',
    dir: 'ltr',
  },
  pt: {
    code: 'pt',
    name: 'Portuguese',
    nativeName: 'Português',
    flag: '🇧🇷',
    dir: 'ltr',
  },
  hi: {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    flag: '🇮🇳',
    dir: 'ltr',
  },
};

export function isValidLocale(val: string): val is Locale {
  return SUPPORTED_LOCALES.includes(val as Locale);
}

/**
 * Strips any leading locale prefix from a pathname.
 * Examples:
 *   /es/calculators/ -> { locale: 'es', pathWithoutLocale: '/calculators/' }
 *   /calculators/    -> { locale: 'en', pathWithoutLocale: '/calculators/' }
 *   /fr/             -> { locale: 'fr', pathWithoutLocale: '/' }
 *   /                -> { locale: 'en', pathWithoutLocale: '/' }
 */
export function stripLocaleFromPath(pathname: string): {
  locale: Locale;
  pathWithoutLocale: string;
} {
  if (!pathname || pathname === '/') {
    return { locale: DEFAULT_LOCALE, pathWithoutLocale: '/' };
  }

  // Remove origin if present
  let clean = pathname.replace(/^https?:\/\/[^\/]+/i, '');
  // Preserve query string or hash if needed, but inspect path
  const [pathPart, queryPart] = clean.split('?');
  const querySuffix = queryPart !== undefined ? `?${queryPart}` : '';

  const segments = pathPart.split('/').filter(Boolean);
  if (segments.length > 0 && isValidLocale(segments[0])) {
    const locale = segments[0] as Locale;
    const rest = segments.slice(1);
    const pathWithoutLocale = rest.length > 0 ? `/${rest.join('/')}/` : '/';
    return { locale, pathWithoutLocale: `${pathWithoutLocale}${querySuffix}` };
  }

  // Ensure trailing slash on path part
  const normalized = pathPart.endsWith('/') ? pathPart : `${pathPart}/`;
  return {
    locale: DEFAULT_LOCALE,
    pathWithoutLocale: `${normalized}${querySuffix}`,
  };
}

/**
 * Builds a clean, crawlable localized path for a given route.
 * English remains at root (/path/), while other locales use subpaths (/es/path/).
 */
export function getLocalizedPath(pathname: string, targetLocale: Locale): string {
  const { pathWithoutLocale } = stripLocaleFromPath(pathname);
  const cleanPath = pathWithoutLocale.replace(/^\/+|\/+$/g, '');

  if (targetLocale === DEFAULT_LOCALE) {
    return cleanPath ? `/${cleanPath}/` : '/';
  }

  return cleanPath ? `/${targetLocale}/${cleanPath}/` : `/${targetLocale}/`;
}
