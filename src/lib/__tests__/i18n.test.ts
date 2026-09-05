import { describe, it, expect } from 'vitest';
import {
  SUPPORTED_LOCALES,
  NON_DEFAULT_LOCALES,
  DEFAULT_LOCALE,
  stripLocaleFromPath,
  getLocalizedPath,
  isValidLocale,
  LOCALES,
} from '../i18n/config';
import {
  getUiTranslations,
  getCategoryTranslation,
  getLocalizedCategory,
  getLocalizedCalculator,
} from '../i18n/translate';
import { UI_TRANSLATIONS } from '../i18n/translations/ui';
import { CATEGORY_TRANSLATIONS } from '../i18n/translations/categories';
import { CATEGORIES } from '../categoryRegistry';
import { CALCULATORS } from '../calculatorRegistry';
import { getCanonicalUrl, getCanonicalAlternates } from '../seo';

describe('i18n Configuration & Helpers', () => {
  it('defines 6 supported locales with en as default', () => {
    expect(SUPPORTED_LOCALES).toEqual(['en', 'es', 'fr', 'de', 'pt', 'hi']);
    expect(NON_DEFAULT_LOCALES).toEqual(['es', 'fr', 'de', 'pt', 'hi']);
    expect(DEFAULT_LOCALE).toBe('en');
  });

  it('validates locales correctly', () => {
    expect(isValidLocale('en')).toBe(true);
    expect(isValidLocale('es')).toBe(true);
    expect(isValidLocale('fr')).toBe(true);
    expect(isValidLocale('de')).toBe(true);
    expect(isValidLocale('pt')).toBe(true);
    expect(isValidLocale('hi')).toBe(true);
    expect(isValidLocale('ja')).toBe(false);
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
    expect(stripLocaleFromPath('/fr/calculators/percentage-calculator/')).toEqual({
      locale: 'fr',
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
    expect(getLocalizedPath('/calculators/percentage-calculator/', 'fr')).toBe(
      '/fr/calculators/percentage-calculator/'
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
    expect(getCanonicalUrl('/calculators/percentage-calculator/', 'fr')).toBe(
      'https://calculat.dev/fr/calculators/percentage-calculator/'
    );
    expect(getCanonicalUrl('/calculators/percentage-calculator/', 'hi')).toBe(
      'https://calculat.dev/hi/calculators/percentage-calculator/'
    );
  });

  it('generates bidirectional alternates with x-default', () => {
    const alternates = getCanonicalAlternates('/calculators/percentage-calculator/', 'es');

    // Self-referencing canonical
    expect(alternates.canonical).toBe(
      'https://calculat.dev/es/calculators/percentage-calculator/'
    );

    // All supported languages + x-default
    expect(alternates.languages.en).toBe(
      'https://calculat.dev/calculators/percentage-calculator/'
    );
    expect(alternates.languages.es).toBe(
      'https://calculat.dev/es/calculators/percentage-calculator/'
    );
    expect(alternates.languages.fr).toBe(
      'https://calculat.dev/fr/calculators/percentage-calculator/'
    );
    expect(alternates.languages.de).toBe(
      'https://calculat.dev/de/calculators/percentage-calculator/'
    );
    expect(alternates.languages.pt).toBe(
      'https://calculat.dev/pt/calculators/percentage-calculator/'
    );
    expect(alternates.languages.hi).toBe(
      'https://calculat.dev/hi/calculators/percentage-calculator/'
    );
    expect(alternates.languages['x-default']).toBe(
      'https://calculat.dev/calculators/percentage-calculator/'
    );
  });
});

describe('UI and Category Translations', () => {
  it('has translations for all 6 locales', () => {
    for (const loc of SUPPORTED_LOCALES) {
      const ui = getUiTranslations(loc);
      expect(ui.calculate).toBeDefined();
      expect(ui.tagline).toBeDefined();
      expect(ui.directoryHeader).toBeDefined();
      expect(ui.toolsCount(5)).toContain('5');
    }
  });

  it('has category translations for all 17 categories in all 6 locales', () => {
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
  });

  it('localizes calculators with explicit translations and graceful fallback', () => {
    const pctCalc = CALCULATORS.find(c => c.slug === 'percentage-calculator')!;
    const esCalc = getLocalizedCalculator(pctCalc, 'es');
    expect(esCalc.name).toBe('Calculadora de Porcentajes');

    const hiCalc = getLocalizedCalculator(pctCalc, 'hi');
    expect(hiCalc.name).toBe('प्रतिशत कैलकुलेटर');

    // Calculator without explicit translation gets fallback
    const otherCalc = CALCULATORS.find(c => c.slug === 'sphere-packing-calculator');
    if (otherCalc) {
      const deCalc = getLocalizedCalculator(otherCalc, 'de');
      expect(deCalc.seo.title).toContain('Calculat');
    }
  });
});
