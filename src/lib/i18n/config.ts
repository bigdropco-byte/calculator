export const SUPPORTED_LOCALES = [
  'en',
  'ar',
  'az',
  'bg',
  'bn',
  'cs',
  'da',
  'de',
  'el',
  'es',
  'fa',
  'fi',
  'fr',
  'he',
  'hi',
  'hr',
  'hu',
  'id',
  'it',
  'ja',
  'kk',
  'ko',
  'ms',
  'nb',
  'nl',
  'pl',
  'pt',
  'ro',
  'ru',
  'sk',
  'sr',
  'sv',
  'th',
  'tl',
  'tr',
  'ur',
  'uz',
  'vi',
  'zh',
] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const NON_DEFAULT_LOCALES = [
  'ar',
  'az',
  'bg',
  'bn',
  'cs',
  'da',
  'de',
  'el',
  'es',
  'fa',
  'fi',
  'fr',
  'he',
  'hi',
  'hr',
  'hu',
  'id',
  'it',
  'ja',
  'kk',
  'ko',
  'ms',
  'nb',
  'nl',
  'pl',
  'pt',
  'ro',
  'ru',
  'sk',
  'sr',
  'sv',
  'th',
  'tl',
  'tr',
  'ur',
  'uz',
  'vi',
  'zh',
] as const;

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
  en: { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸', dir: 'ltr' },
  ar: { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', dir: 'rtl' },
  az: { code: 'az', name: 'Azerbaijani', nativeName: 'Azərbaycanca', flag: '🇦🇿', dir: 'ltr' },
  bg: { code: 'bg', name: 'Bulgarian', nativeName: 'Български', flag: '🇧🇬', dir: 'ltr' },
  bn: { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇧🇩', dir: 'ltr' },
  cs: { code: 'cs', name: 'Czech', nativeName: 'Čeština', flag: '🇨🇿', dir: 'ltr' },
  da: { code: 'da', name: 'Danish', nativeName: 'Dansk', flag: '🇩🇰', dir: 'ltr' },
  de: { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', dir: 'ltr' },
  el: { code: 'el', name: 'Greek', nativeName: 'Ελληνικά', flag: '🇬🇷', dir: 'ltr' },
  es: { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', dir: 'ltr' },
  fa: { code: 'fa', name: 'Persian', nativeName: 'فارسی', flag: '🇮🇷', dir: 'rtl' },
  fi: { code: 'fi', name: 'Finnish', nativeName: 'Suomi', flag: '🇫🇮', dir: 'ltr' },
  fr: { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', dir: 'ltr' },
  he: { code: 'he', name: 'Hebrew', nativeName: 'עברית', flag: '🇮🇱', dir: 'rtl' },
  hi: { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳', dir: 'ltr' },
  hr: { code: 'hr', name: 'Croatian', nativeName: 'Hrvatski', flag: '🇭🇷', dir: 'ltr' },
  hu: { code: 'hu', name: 'Hungarian', nativeName: 'Magyar', flag: '🇭🇺', dir: 'ltr' },
  id: { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia', flag: '🇮🇩', dir: 'ltr' },
  it: { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹', dir: 'ltr' },
  ja: { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵', dir: 'ltr' },
  kk: { code: 'kk', name: 'Kazakh', nativeName: 'Қазақша', flag: '🇰🇿', dir: 'ltr' },
  ko: { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷', dir: 'ltr' },
  ms: { code: 'ms', name: 'Malay', nativeName: 'Bahasa Melayu', flag: '🇲🇾', dir: 'ltr' },
  nb: { code: 'nb', name: 'Norwegian Bokmål', nativeName: 'Norsk bokmål', flag: '🇳🇴', dir: 'ltr' },
  nl: { code: 'nl', name: 'Dutch', nativeName: 'Nederlands', flag: '🇳🇱', dir: 'ltr' },
  pl: { code: 'pl', name: 'Polish', nativeName: 'Polski', flag: '🇵🇱', dir: 'ltr' },
  pt: { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇧🇷', dir: 'ltr' },
  ro: { code: 'ro', name: 'Romanian', nativeName: 'Română', flag: '🇷🇴', dir: 'ltr' },
  ru: { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺', dir: 'ltr' },
  sk: { code: 'sk', name: 'Slovak', nativeName: 'Slovenčina', flag: '🇸🇰', dir: 'ltr' },
  sr: { code: 'sr', name: 'Serbian', nativeName: 'Српски', flag: '🇷🇸', dir: 'ltr' },
  sv: { code: 'sv', name: 'Swedish', nativeName: 'Svenska', flag: '🇸🇪', dir: 'ltr' },
  th: { code: 'th', name: 'Thai', nativeName: 'ไทย', flag: '🇹🇭', dir: 'ltr' },
  tl: { code: 'tl', name: 'Tagalog', nativeName: 'Tagalog', flag: '🇵🇭', dir: 'ltr' },
  tr: { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷', dir: 'ltr' },
  ur: { code: 'ur', name: 'Urdu', nativeName: 'اردو', flag: '🇵🇰', dir: 'rtl' },
  uz: { code: 'uz', name: 'Uzbek', nativeName: 'Oʻzbekcha', flag: '🇺🇿', dir: 'ltr' },
  vi: { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', flag: '🇻🇳', dir: 'ltr' },
  zh: { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳', dir: 'ltr' },
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
 * English remains at root (/path/), while other locales use subpaths (/[locale]/path/).
 */
export function getLocalizedPath(pathname: string, targetLocale: Locale): string {
  const { pathWithoutLocale } = stripLocaleFromPath(pathname);
  const cleanPath = pathWithoutLocale.replace(/^\/+|\/+$/g, '');

  if (targetLocale === DEFAULT_LOCALE) {
    return cleanPath ? `/${cleanPath}/` : '/';
  }

  return cleanPath ? `/${targetLocale}/${cleanPath}/` : `/${targetLocale}/`;
}
