import { CalculatorDefinition, CategoryDefinition, CategorySlug } from '../types';
import { DEFAULT_LOCALE, Locale } from './config';
import { UI_TRANSLATIONS, UiTranslations } from './translations/ui';
import { CATEGORY_TRANSLATIONS, LocalizedCategory } from './translations/categories';
import { POPULAR_CALCULATOR_TRANSLATIONS } from './translations/calculators';

/**
 * Returns UI strings for a given locale, defaulting to English if missing.
 */
export function getUiTranslations(locale: Locale): UiTranslations {
  return UI_TRANSLATIONS[locale] || UI_TRANSLATIONS[DEFAULT_LOCALE];
}

/**
 * Returns localized category strings for a given category slug and locale.
 */
export function getCategoryTranslation(locale: Locale, slug: CategorySlug): LocalizedCategory {
  const localeDict = CATEGORY_TRANSLATIONS[locale] || CATEGORY_TRANSLATIONS[DEFAULT_LOCALE];
  return localeDict?.[slug] || CATEGORY_TRANSLATIONS[DEFAULT_LOCALE]![slug];
}

/**
 * Returns a CategoryDefinition with its display name, short name, and description
 * localized for the specified locale.
 */
export function getLocalizedCategory(
  category: CategoryDefinition,
  locale: Locale
): CategoryDefinition {
  if (locale === DEFAULT_LOCALE) {
    return category;
  }

  const trans = getCategoryTranslation(locale, category.slug);
  if (!trans) return category;

  return {
    ...category,
    name: trans.name,
    shortName: trans.shortName,
    description: trans.description,
  };
}

/**
 * Generates fallback localized SEO metadata for any calculator that does not have
 * an explicit translation in POPULAR_CALCULATOR_TRANSLATIONS.
 */
function getFallbackCalculatorMeta(
  calc: CalculatorDefinition,
  locale: Locale
): { name: string; shortDescription: string; seoTitle: string; seoDescription: string; keywords: string[] } {
  const ui = getUiTranslations(locale);

  switch (locale) {
    case 'es':
      return {
        name: calc.name,
        shortDescription: calc.shortDescription,
        seoTitle: `${calc.name} – Calculadora Online Gratuita | Calculat`,
        seoDescription: `${calc.shortDescription} Herramienta online gratuita y precisa sin registro en Calculat.dev.`,
        keywords: [calc.name.toLowerCase(), 'calculadora online', 'herramienta de calculo', 'calculat'],
      };
    case 'fr':
      return {
        name: calc.name,
        shortDescription: calc.shortDescription,
        seoTitle: `${calc.name} – Calculateur en Ligne Gratuit | Calculat`,
        seoDescription: `${calc.shortDescription} Outil de calcul en ligne rapide et gratuit sur Calculat.dev.`,
        keywords: [calc.name.toLowerCase(), 'calculateur en ligne', 'outil de calcul gratuit', 'calculat'],
      };
    case 'de':
      return {
        name: calc.name,
        shortDescription: calc.shortDescription,
        seoTitle: `${calc.name} – Kostenloser Online-Rechner | Calculat`,
        seoDescription: `${calc.shortDescription} Kostenloses und schnelles Online-Rechenwerkzeug auf Calculat.dev.`,
        keywords: [calc.name.toLowerCase(), 'online rechner', 'kostenlos berechnen', 'calculat'],
      };
    case 'pt':
      return {
        name: calc.name,
        shortDescription: calc.shortDescription,
        seoTitle: `${calc.name} – Calculadora Online Grátis | Calculat`,
        seoDescription: `${calc.shortDescription} Ferramenta online gratuita e rápida sem necessidade de cadastro no Calculat.dev.`,
        keywords: [calc.name.toLowerCase(), 'calculadora online', 'ferramenta de calculo gratis', 'calculat'],
      };
    case 'hi':
      return {
        name: calc.name,
        shortDescription: calc.shortDescription,
        seoTitle: `${calc.name} – मुफ्त ऑनलाइन कैलकुलेटर | Calculat`,
        seoDescription: `${calc.shortDescription} Calculat.dev पर तेज, सटीक और मुफ्त ऑनलाइन गणना उपकरण।`,
        keywords: [calc.name.toLowerCase(), 'मुफ्त कैलकुलेटर', 'ऑनलाइन कैलकुलेटर', 'calculat'],
      };
    case 'zh':
      return {
        name: calc.name,
        shortDescription: calc.shortDescription,
        seoTitle: `${calc.name} – 在线免费计算器 | Calculat`,
        seoDescription: `${calc.shortDescription} 在 Calculat.dev 上体验快速、纯净、无广告的在线计算工具。`,
        keywords: [calc.name.toLowerCase(), '在线计算器', '免费计算工具', 'calculat'],
      };
    case 'ja':
      return {
        name: calc.name,
        shortDescription: calc.shortDescription,
        seoTitle: `${calc.name} – 無料オンライン計算機 | Calculat`,
        seoDescription: `${calc.shortDescription} Calculat.dev の高速・高精度・広告なしオンライン計算ツール。`,
        keywords: [calc.name.toLowerCase(), '無料計算機', 'オンライン計算ツール', 'calculat'],
      };
    case 'ru':
      return {
        name: calc.name,
        shortDescription: calc.shortDescription,
        seoTitle: `${calc.name} – Бесплатный онлайн калькулятор | Calculat`,
        seoDescription: `${calc.shortDescription} Быстрый и точный расчет онлайн без рекламы на Calculat.dev.`,
        keywords: [calc.name.toLowerCase(), 'онлайн калькулятор', 'расчет онлайн', 'calculat'],
      };
    case 'ar':
      return {
        name: calc.name,
        shortDescription: calc.shortDescription,
        seoTitle: `${calc.name} – حاسبة مجانية عبر الإنترنت | Calculat`,
        seoDescription: `${calc.shortDescription} أداة حساب سريعة ودقيقة ومجانية بدون إعلانات على Calculat.dev.`,
        keywords: [calc.name.toLowerCase(), 'حاسبة مجانية', 'حساب اون لاين', 'calculat'],
      };
    default:
      return {
        name: calc.name,
        shortDescription: calc.shortDescription,
        seoTitle: `${calc.name} – ${ui.calculate} | ${SITE_CONFIG.name}`,
        seoDescription: `${calc.shortDescription} ${ui.description}`,
        keywords: [calc.name.toLowerCase(), ui.calculate.toLowerCase(), ui.navCalculators.toLowerCase(), 'calculat'],
      };
  }
}

const SITE_CONFIG = {
  name: 'Calculat',
};

/**
 * Returns a CalculatorDefinition with localized name, description, SEO metadata, and keywords.
 */
export function getLocalizedCalculator(
  calc: CalculatorDefinition,
  locale: Locale
): CalculatorDefinition {
  if (locale === DEFAULT_LOCALE) {
    return calc;
  }

  const explicit = POPULAR_CALCULATOR_TRANSLATIONS[calc.slug]?.[locale];
  if (explicit) {
    return {
      ...calc,
      name: explicit.name,
      shortDescription: explicit.shortDescription,
      keywords: explicit.keywords || calc.keywords,
      seo: {
        title: explicit.seoTitle || `${explicit.name} | Calculat`,
        metaDescription: explicit.seoDescription || explicit.shortDescription,
        keywords: explicit.keywords || calc.seo.keywords,
      },
    };
  }

  const fallback = getFallbackCalculatorMeta(calc, locale);
  return {
    ...calc,
    name: fallback.name,
    shortDescription: fallback.shortDescription,
    keywords: fallback.keywords,
    seo: {
      title: fallback.seoTitle,
      metaDescription: fallback.seoDescription,
      keywords: fallback.keywords,
    },
  };
}
