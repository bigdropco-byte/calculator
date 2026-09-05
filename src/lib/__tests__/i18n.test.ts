import { describe, it, expect } from 'vitest';
import {
  SUPPORTED_LOCALES,
  NON_DEFAULT_LOCALES,
  DEFAULT_LOCALE,
  stripLocaleFromPath,
  getLocalizedPath,
  isValidLocale,
  LOCALES,
  Locale,
} from '../i18n/config';
import {
  getUiTranslations,
  getCategoryTranslation,
  getLocalizedCategory,
  getLocalizedCalculator,
} from '../i18n/translate';
import { CATEGORIES } from '../categoryRegistry';
import { CALCULATORS } from '../calculatorRegistry';
import { getCanonicalUrl, getCanonicalAlternates } from '../seo';

describe('i18n Configuration & Helpers', () => {
  it('defines 39 supported locales with en as default', () => {
    expect(SUPPORTED_LOCALES.length).toBe(39);
    expect(NON_DEFAULT_LOCALES.length).toBe(38);
    expect(DEFAULT_LOCALE).toBe('en');
    expect(SUPPORTED_LOCALES).toContain('en');
    expect(SUPPORTED_LOCALES).toContain('ar');
    expect(SUPPORTED_LOCALES).toContain('zh');
    expect(SUPPORTED_LOCALES).toContain('ja');
    expect(SUPPORTED_LOCALES).toContain('ur');
    expect(SUPPORTED_LOCALES).toContain('he');
    expect(SUPPORTED_LOCALES).toContain('fa');
    expect(SUPPORTED_LOCALES).toContain('nb');
  });

  it('correctly sets RTL direction for RTL languages', () => {
    const rtlLocales: Locale[] = ['ar', 'fa', 'he', 'ur'];
    for (const loc of rtlLocales) {
      expect(LOCALES[loc].dir).toBe('rtl');
    }
    // Check some LTR locales
    expect(LOCALES.en.dir).toBe('ltr');
    expect(LOCALES.es.dir).toBe('ltr');
    expect(LOCALES.ja.dir).toBe('ltr');
    expect(LOCALES.zh.dir).toBe('ltr');
  });

  it('validates locales correctly', () => {
    expect(isValidLocale('en')).toBe(true);
    expect(isValidLocale('es')).toBe(true);
    expect(isValidLocale('fr')).toBe(true);
    expect(isValidLocale('de')).toBe(true);
    expect(isValidLocale('pt')).toBe(true);
    expect(isValidLocale('hi')).toBe(true);
    expect(isValidLocale('ja')).toBe(true);
    expect(isValidLocale('ar')).toBe(true);
    expect(isValidLocale('zh')).toBe(true);
    expect(isValidLocale('ur')).toBe(true);
    expect(isValidLocale('unknown')).toBe(false);
  });

  it('strips locale from various path formats', () => {
    expect(stripLocaleFromPath('/')).toEqual({
      locale: 'en',
      pathWithoutLocale: '/',
    });
    expect(stripLocaleFromPath('/es/')).toEqual({
      locale: 'es',
      pathWithoutLocale: '/',
    });
    expect(stripLocaleFromPath('/ar/calculators/percentage-calculator/')).toEqual({
      locale: 'ar',
      pathWithoutLocale: '/calculators/percentage-calculator/',
    });
    expect(stripLocaleFromPath('/calculators/percentage-calculator/')).toEqual({
      locale: 'en',
      pathWithoutLocale: '/calculators/percentage-calculator/',
    });
  });

  it('builds localized paths preserving trailing slash', () => {
    expect(getLocalizedPath('/', 'en')).toBe('/');
    expect(getLocalizedPath('/', 'es')).toBe('/es/');
    expect(getLocalizedPath('/calculators/', 'de')).toBe('/de/calculators/');
    expect(getLocalizedPath('/calculators/percentage-calculator/', 'ja')).toBe(
      '/ja/calculators/percentage-calculator/'
    );
    // Switching from one locale to another
    expect(getLocalizedPath('/es/calculators/', 'pt')).toBe('/pt/calculators/');
    expect(getLocalizedPath('/de/calculators/', 'en')).toBe('/calculators/');
  });
});

describe('SEO Canonical & Alternates', () => {
  it('generates canonical URL for English at root with trailing slash', () => {
    expect(getCanonicalUrl('/')).toBe('https://calculat.dev/');
    expect(getCanonicalUrl('/calculators/percentage-calculator/')).toBe(
      'https://calculat.dev/calculators/percentage-calculator/'
    );
  });

  it('generates canonical URL for non-default locales with subpaths', () => {
    expect(getCanonicalUrl('/', 'es')).toBe('https://calculat.dev/es/');
    expect(getCanonicalUrl('/calculators/percentage-calculator/', 'ar')).toBe(
      'https://calculat.dev/ar/calculators/percentage-calculator/'
    );
    expect(getCanonicalUrl('/calculators/percentage-calculator/', 'zh')).toBe(
      'https://calculat.dev/zh/calculators/percentage-calculator/'
    );
  });

  it('generates bidirectional alternates for all 39 languages with x-default', () => {
    const alternates = getCanonicalAlternates('/calculators/percentage-calculator/', 'ar');

    // Self-referencing canonical
    expect(alternates.canonical).toBe(
      'https://calculat.dev/ar/calculators/percentage-calculator/'
    );

    // All 39 supported languages + en-US + x-default
    for (const loc of SUPPORTED_LOCALES) {
      expect(alternates.languages[loc]).toBeDefined();
    }
    expect(alternates.languages['en-US']).toBe(
      'https://calculat.dev/calculators/percentage-calculator/'
    );
    expect(alternates.languages['x-default']).toBe(
      'https://calculat.dev/calculators/percentage-calculator/'
    );
  });
});

describe('UI and Category Translations', () => {
  it('has translations for all 39 locales', () => {
    for (const loc of SUPPORTED_LOCALES) {
      const ui = getUiTranslations(loc);
      expect(ui.calculate).toBeDefined();
      expect(ui.tagline).toBeDefined();
      expect(ui.directoryHeader).toBeDefined();
      expect(ui.toolsCount(5)).toContain('5');
    }
  });

  it('has category translations for all 17 categories across all 39 locales', () => {
    const categories = Object.keys(CATEGORIES);
    expect(categories.length).toBe(17);

    for (const loc of SUPPORTED_LOCALES) {
      for (const cat of categories) {
        const trans = getCategoryTranslation(loc, cat as any);
        expect(trans).toBeDefined();
        expect(trans.name).toBeTruthy();
        expect(trans.shortName).toBeTruthy();
        expect(trans.description).toBeTruthy();
      }
    }

    // Specific verification for Thai (th)
    const thMath = getCategoryTranslation('th', 'math');
    expect(thMath.name).toBe('เครื่องคำนวณคณิตศาสตร์');
    expect(thMath.shortName).toBe('คณิตศาสตร์');

    const thFinance = getCategoryTranslation('th', 'finance');
    expect(thFinance.name).toBe('เครื่องคำนวณการเงิน');
    expect(thFinance.shortName).toBe('การเงิน');

    const mathCat = CATEGORIES.math;
    const localizedMath = getLocalizedCategory(mathCat, 'th');
    expect(localizedMath.name).toBe('เครื่องคำนวณคณิตศาสตร์');
    expect(localizedMath.shortName).toBe('คณิตศาสตร์');
    expect(localizedMath.description).toContain('แก้โจทย์เลขคณิต');
  });

  it('localizes calculators with explicit translations and graceful fallback', () => {
    const pctCalc = CALCULATORS.find(c => c.slug === 'percentage-calculator')!;
    const esCalc = getLocalizedCalculator(pctCalc, 'es');
    expect(esCalc.name).toBe('Calculadora de Porcentajes');

    const arCalc = getLocalizedCalculator(pctCalc, 'ar');
    expect(arCalc.name).toBeTruthy();

    // Calculator without explicit translation gets universal fallback
    const otherCalc = CALCULATORS.find(c => c.slug === 'sphere-packing-calculator');
    if (otherCalc) {
      const deCalc = getLocalizedCalculator(otherCalc, 'de');
      expect(deCalc.seo.title).toContain('Calculat');
      const jaCalc = getLocalizedCalculator(otherCalc, 'ja');
      expect(jaCalc.seo.title).toContain('Calculat');
    }
  });
});
