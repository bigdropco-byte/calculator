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
 * Translation map of core calculation domain keywords to ensure zero calculators
 * display untranslated English titles in non-English languages.
 */
const TERM_TRANSLATIONS: Record<string, Partial<Record<Locale, string>>> = {
  'percentage increase': {
    hi: 'प्रतिशत वृद्धि', es: 'Aumento Porcentual', fr: 'Augmentation en Pourcentage', de: 'Prozentuale Steigerung', pt: 'Aumento Percentual', ar: 'زيادة النسبة المئوية', zh: '百分比增长', ja: 'パーセント増加', ru: 'Процентное увеличение',
  },
  'percentage decrease': {
    hi: 'प्रतिशत कमी', es: 'Disminución Porcentual', fr: 'Diminution en Pourcentage', de: 'Prozentuale Abnahme', pt: 'Diminuição Percentual', ar: 'انخفاض النسبة المئوية', zh: '百分比减少', ja: 'パーセント減少', ru: 'Процентное уменьшение',
  },
  'discount percentage': {
    hi: 'छूट प्रतिशत', es: 'Porcentaje de Descuento', fr: 'Pourcentage de Remise', de: 'Rabatt-Prozentsatz', pt: 'Porcentagem de Desconto', ar: 'نسبة الخصم', zh: '折扣百分比', ja: '割引率',
  },
  'win percentage': {
    hi: 'जीत प्रतिशत', es: 'Porcentaje de Victorias', fr: 'Pourcentage de Victoires', de: 'Siegquote', pt: 'Porcentagem de Vitórias', ar: 'نسبة الفوز', zh: '胜率', ja: '勝率',
  },
  'growth percentage': {
    hi: 'विकास दर प्रतिशत', es: 'Porcentaje de Crecimiento', fr: 'Pourcentage de Croissance', de: 'Wachstumsprozentsatz', pt: 'Porcentagem de Crescimento', ar: 'نسبة النمو', zh: '增长百分比', ja: '成長率',
  },
  'tax percentage': {
    hi: 'कर (टैक्स) प्रतिशत', es: 'Porcentaje de Impuestos', fr: 'Pourcentage de Taxe', de: 'Steuersatz', pt: 'Porcentagem de Imposto', ar: 'نسبة الضريبة', zh: '税率百分比', ja: '税率',
  },
  'vat percentage': {
    hi: 'वैट (VAT) प्रतिशत', es: 'Porcentaje de IVA', fr: 'Pourcentage de TVA', de: 'Mehrwertsteuer-Satz', pt: 'Porcentagem de IVA', ar: 'نسبة ضريبة القيمة المضافة', zh: '增值税率', ja: '付加価値税率',
  },
  'fat percentage': {
    hi: 'शारीरिक वसा प्रतिशत', es: 'Porcentaje de Grasa Corporal', fr: 'Pourcentage de Graisse', de: 'Körperfettanteil', pt: 'Porcentagem de Gordura', ar: 'نسبة الدهون', zh: '体脂率', ja: '体脂肪率',
  },
  'percentage': {
    hi: 'प्रतिशत', es: 'Porcentaje', fr: 'Pourcentage', de: 'Prozent', pt: 'Porcentagem', ar: 'النسبة المئوية', zh: '百分比', ja: 'パーセント', ru: 'Проценты',
  },
  'average': {
    hi: 'औसत', es: 'Promedio', fr: 'Moyenne', de: 'Durchschnitt', pt: 'Média', ar: 'المتوسط الحسابي', zh: '平均值', ja: '平均値', ru: 'Среднее значение',
  },
  'average time': {
    hi: 'औसत समय', es: 'Tiempo Promedio', fr: 'Temps Moyen', de: 'Durchschnittszeit', pt: 'Tempo Médio', ar: 'متوسط الوقت', zh: '平均时间', ja: '平均時間',
  },
  'date difference': {
    hi: 'तिथियों का अंतर', es: 'Diferencia de Fechas', fr: 'Différence de Dates', de: 'Datumsdifferenz', pt: 'Diferença de Datas', ar: 'فرق التاريخ', zh: '日期差', ja: '日付差', ru: 'Разница дат',
  },
  'date time': {
    hi: 'दिनांक व समय', es: 'Fecha y Hora', fr: 'Date et Heure', de: 'Datum und Uhrzeit', pt: 'Data e Hora', ar: 'التاريخ والوقت', zh: '日期时间', ja: '日時',
  },
  'date': {
    hi: 'दिनांक', es: 'Fecha', fr: 'Date', de: 'Datum', pt: 'Data', ar: 'التاريخ', zh: '日期', ja: '日付',
  },
  'time': {
    hi: 'समय', es: 'Tiempo', fr: 'Temps', de: 'Zeit', pt: 'Tempo', ar: 'الوقت', zh: '时间', ja: '時間',
  },
  'days': {
    hi: 'दिन', es: 'Días', fr: 'Jours', de: 'Tage', pt: 'Dias', ar: 'الأيام', zh: '天数', ja: '日数',
  },
  'weeks': {
    hi: 'सप्ताह', es: 'Semanas', fr: 'Semaines', de: 'Wochen', pt: 'Semanas', ar: 'الأسابيع', zh: '周数', ja: '週数',
  },
  'months': {
    hi: 'महीने', es: 'Meses', fr: 'Mois', de: 'Monate', pt: 'Meses', ar: 'الأشهر', zh: '月数', ja: '月数',
  },
  'years': {
    hi: 'वर्ष', es: 'Años', fr: 'Années', de: 'Jahre', pt: 'Anos', ar: 'السنوات', zh: '年数', ja: '年数',
  },
  'hours': {
    hi: 'कार्य घंटे', es: 'Horas', fr: 'Heures', de: 'Arbeitsstunden', pt: 'Horas', ar: 'ساعات العمل', zh: '工时', ja: '労働時間',
  },
  'day of the week': {
    hi: 'सप्ताह का दिन', es: 'Día de la Semana', fr: 'Jour de la Semaine', de: 'Wochentag', pt: 'Dia da Semana', ar: 'يوم الأسبوع', zh: '星期几', ja: '曜日',
  },
  'time card': {
    hi: 'टाइम कार्ड (हाजिरी)', es: 'Tarjeta de Horas', fr: 'Carte de Pointage', de: 'Stempelkarte', pt: 'Cartão de Ponto', ar: 'بطاقة الدوام', zh: '考勤卡', ja: 'タイムカード',
  },
  'payroll hours': {
    hi: 'पेरोल कार्य घंटे', es: 'Horas de Nómina', fr: 'Heures de Paie', de: 'Lohnabrechnungsstunden', pt: 'Horas da Folha', ar: 'ساعات جدول الرواتب', zh: '薪资工时', ja: '給与時間',
  },
  'paycheck': {
    hi: 'वेतन (पेचेक)', es: 'Nómina', fr: 'Fiche de Paie', de: 'Gehaltsabrechnung', pt: 'Salário Líquido', ar: 'شيك الراتب', zh: '工资单', ja: '給与',
  },
  'paycheck tax': {
    hi: 'पेचेक कर', es: 'Impuestos de Nómina', fr: 'Impôt sur la Paie', de: 'Lohnsteuer', pt: 'Imposto sobre Salário', ar: 'ضريبة الراتب', zh: '薪资税', ja: '給与税',
  },
  'salary tax': {
    hi: 'वेतन आयकर', es: 'Impuesto sobre el Salario', fr: 'Impôt sur le Salaire', de: 'Gehaltssteuer', pt: 'Imposto sobre Salário', ar: 'ضريبة الدخل', zh: '薪资所得税', ja: '給与所得税',
  },
  'overtime': {
    hi: 'ओवरटाइम', es: 'Horas Extras', fr: 'Heures Supplémentaires', de: 'Überstunden', pt: 'Horas Extras', ar: 'العمل الإضافي', zh: '加班费', ja: '残業代',
  },
  'pay raise': {
    hi: 'वेतन वृद्धि', es: 'Aumento Salarial', fr: 'Augmentation de Salaire', de: 'Gehaltserhöhung', pt: 'Aumento Salarial', ar: 'زيادة الراتب', zh: '加薪幅度', ja: '昇給',
  },
  'mortgage': {
    hi: 'गृह ऋण (होम लोन)', es: 'Hipotecas', fr: 'Prêt Immobilier', de: 'Baufinanzierung', pt: 'Financiamento Imobiliário', ar: 'التمويل العقاري', zh: '房屋贷款', ja: '住宅ローン',
  },
  'loan': {
    hi: 'ऋण (लोन)', es: 'Préstamos', fr: 'Prêt & Crédit', de: 'Kredite', pt: 'Empréstimos', ar: 'القروض', zh: '贷款', ja: 'ローン',
  },
  'compound interest': {
    hi: 'चक्रवृद्धि ब्याज', es: 'Interés Compuesto', fr: 'Intérêts Composés', de: 'Zinseszins', pt: 'Juros Compostos', ar: 'الفائدة المركبة', zh: '复利', ja: '複利',
  },
  'tip': {
    hi: 'टिप', es: 'Propinas', fr: 'Pourboire', de: 'Trinkgeld', pt: 'Gorjetas', ar: 'البقشيش', zh: '小费', ja: 'チップ',
  },
  'bmi': {
    hi: 'बीएमआई (BMI)', es: 'IMC (Índice Masa Corporal)', fr: 'IMC', de: 'BMI', pt: 'IMC', ar: 'مؤشر كتلة الجسم', zh: '身体质量指数(BMI)', ja: 'BMI',
  },
  'age': {
    hi: 'आयु', es: 'Edad', fr: 'Âge', de: 'Alter', pt: 'Idade', ar: 'العمر', zh: '年龄', ja: '年齢',
  },
  'birthday': {
    hi: 'जन्मदिन', es: 'Cumpleaños', fr: 'Anniversaire', de: 'Geburtstag', pt: 'Aniversário', ar: 'عيد الميلاد', zh: '生日', ja: '誕生日',
  },
  'birth year': {
    hi: 'जन्म वर्ष', es: 'Año de Nacimiento', fr: 'Année de Naissance', de: 'Geburtsjahr', pt: 'Ano de Nascimento', ar: 'سنة الميلاد', zh: '出生年份', ja: '誕生年',
  },
  'scientific': {
    hi: 'वैज्ञानिक', es: 'Científica', fr: 'Scientifique', de: 'Wissenschaftlicher', pt: 'Científica', ar: 'علمية', zh: '科学', ja: '関数',
  },
  'stock': {
    hi: 'स्टॉक व शेयर लाभ', es: 'Acciones y Bolsa', fr: 'Actions Bourse', de: 'Aktiengewinn', pt: 'Ações e Bolsa', ar: 'الأسهم والأرباح', zh: '股票收益', ja: '株式損益',
  },
  'roi': {
    hi: 'आरओआई (रिटर्न)', es: 'ROI (Retorno de Inversión)', fr: 'ROI', de: 'Kapitalrendite (ROI)', pt: 'Retorno sobre Investimento (ROI)', ar: 'عائد الاستثمار', zh: '投资回报率(ROI)', ja: '投資収益率(ROI)',
  },
  'fixed deposit': {
    hi: 'सावधि जमा (FD)', es: 'Depósito a Plazo Fijo', fr: 'Dépôt à Terme', de: 'Festgeld', pt: 'Depósito a Prazo Fixo', ar: 'الوديعة الثابتة', zh: '定期存款', ja: '定期預金',
  },
  'sip': {
    hi: 'एसआईपी (SIP) निवेश', es: 'Plan de Inversión Sistemática (SIP)', fr: 'Plan d’Investissement (SIP)', de: 'Fondssparplan (SIP)', pt: 'Investimento Sistemático (SIP)', ar: 'خطة الاستثمار المنهجي (SIP)', zh: '定投基金(SIP)', ja: '積立投資(SIP)',
  },
  'trip budget': {
    hi: 'यात्रा बजट', es: 'Presupuesto de Viaje', fr: 'Budget de Voyage', de: 'Reisebudget', pt: 'Orçamento de Viagem', ar: 'ميزانية الرحلة', zh: '旅行预算', ja: '旅行予算',
  },
  'density': {
    hi: 'घनत्व', es: 'Densidad', fr: 'Densité', de: 'Dichte', pt: 'Densidade', ar: 'الكثافة', zh: '密度', ja: '密度',
  },
  'water density': {
    hi: 'जल घनत्व', es: 'Densidad del Agua', fr: 'Densité de l’Eau', de: 'Wasserdichte', pt: 'Densidade da Água', ar: 'كثافة الماء', zh: '水密度', ja: '水の密度',
  },
  'air density': {
    hi: 'वायु घनत्व', es: 'Densidad del Aire', fr: 'Densité de l’Air', de: 'Luftdichte', pt: 'Densidade do Ar', ar: 'كثافة الهواء', zh: '空气密度', ja: '空気密度',
  },
  'pixel density': {
    hi: 'पिक्सेल घनत्व (PPI)', es: 'Densidad de Píxeles', fr: 'Densité de Pixels', de: 'Pixeldichte', pt: 'Densidade de Pixels', ar: 'كثافة البكسل', zh: '像素密度', ja: '画素密度',
  },
  'population density': {
    hi: 'जनसंख्या घनत्व', es: 'Densidad de Población', fr: 'Densité de Population', de: 'Bevölkerungsdichte', pt: 'Densidade Populacional', ar: 'الكثافة السكانية', zh: '人口密度', ja: '人口密度',
  },
  'thrust': {
    hi: 'प्रणोद (थ्रस्ट)', es: 'Empuje', fr: 'Poussée', de: 'Schub', pt: 'Empuxo', ar: 'الدفع', zh: '推力', ja: '推力',
  },
  'drone thrust': {
    hi: 'ड्रोन थ्रस्ट', es: 'Empuje de Drone', fr: 'Poussée de Drone', de: 'Drohnenschub', pt: 'Empuxo de Drone', ar: 'دفع الطائرات بدون طيار', zh: '无人机推力', ja: 'ドローン推力',
  },
  'rocket thrust': {
    hi: 'रॉकेट थ्रस्ट', es: 'Empuje de Cohete', fr: 'Poussée de Fusée', de: 'Raketenschub', pt: 'Empuxo de Foguete', ar: 'دفع الصواريخ', zh: '火箭推力', ja: 'ロケット推力',
  },
  'propeller': {
    hi: 'प्रोपेलर', es: 'Hélice', fr: 'Hélice', de: 'Propeller', pt: 'Hélice', ar: 'المروحة', zh: '螺旋桨', ja: 'プロペラ',
  },
  'concrete': {
    hi: 'कंक्रीट मात्रा', es: 'Hormigón', fr: 'Béton', de: 'Beton', pt: 'Concreto', ar: 'الخرسانة', zh: '混凝土', ja: 'コンクリート',
  },
  'quikrete': {
    hi: 'क्विक्रीट कंक्रीट', es: 'Quikrete Hormigón', fr: 'Quikrete Béton', de: 'Quikrete Beton', pt: 'Quikrete Concreto', ar: 'كويكريت خرسانة', zh: 'Quikrete混凝土', ja: 'Quikreteコンクリート',
  },
  'sakrete': {
    hi: 'साक्रीट कंक्रीट', es: 'Sakrete Hormigón', fr: 'Sakrete Béton', de: 'Sakrete Beton', pt: 'Sakrete Concreto', ar: 'ساكريت خرسانة', zh: 'Sakrete混凝土', ja: 'Sakreteコンクリート',
  },
  'gravel': {
    hi: 'बजरी (ग्रेवल)', es: 'Grava', fr: 'Gravier', de: 'Kies', pt: 'Cascalho', ar: 'الحصى', zh: '碎石', ja: '砂利',
  },
  'stone': {
    hi: 'पत्थर व रोड़ी', es: 'Piedra', fr: 'Pierre', de: 'Steine', pt: 'Pedra', ar: 'الحجارة', zh: '石材', ja: '石材',
  },
  'asphalt': {
    hi: 'डामर (एस्फाल्ट)', es: 'Asfalto', fr: 'Asphalte', de: 'Asphalt', pt: 'Asfalto', ar: 'الأسفلت', zh: '沥青', ja: 'アスファルト',
  },
  'lumber': {
    hi: 'इमारती लकड़ी (लंबर)', es: 'Madera de Construcción', fr: 'Bois de Charpente', de: 'Bauholz', pt: 'Madeira de Construção', ar: 'أخشاب البناء', zh: '木料板材', ja: '製材',
  },
  'firewood': {
    hi: 'जलाऊ लकड़ी', es: 'Leña', fr: 'Bois de Chauffage', de: 'Brennholz', pt: 'Lenha', ar: 'حطب التدفئة', zh: '木柴', ja: '薪',
  },
  'wood': {
    hi: 'लकड़ी (वुड)', es: 'Madera', fr: 'Bois', de: 'Holz', pt: 'Madeira', ar: 'الخشب', zh: '木材', ja: '木材',
  },
  'shed wood': {
    hi: 'शेड वुड', es: 'Madera para Cobertizo', fr: 'Bois d’Abri', de: 'Schuppenholz', pt: 'Madeira para Abrigo', ar: 'خشب السقيفة', zh: '棚屋木料', ja: '物置木材',
  },
  'dice': {
    hi: 'पासा प्रायिकता', es: 'Probabilidad de Dados', fr: 'Probabilité de Dés', de: 'Würfelwahrscheinlichkeit', pt: 'Probabilidade de Dados', ar: 'احتمالات النرد', zh: '骰子概率', ja: 'サイコロ確率',
  },
  'coin flip': {
    hi: 'सिक्का उछाल प्रायिकता', es: 'Probabilidad de Moneda', fr: 'Probabilité Pile ou Face', de: 'Münzwurf Wahrscheinlichkeit', pt: 'Probabilidade de Moeda', ar: 'احتمالات رمي العملة', zh: '抛硬币概率', ja: 'コイントス確率',
  },
  'probability': {
    hi: 'प्रायिकता (संभावना)', es: 'Probabilidad', fr: 'Probabilité', de: 'Wahrscheinlichkeit', pt: 'Probabilidade', ar: 'الاحتمالية', zh: '概率', ja: '確率',
  },
  'life path number': {
    hi: 'लाइफ पाथ नंबर', es: 'Número de Camino de Vida', fr: 'Numéro de Chemin de Vie', de: 'Lebenspfadnummer', pt: 'Número do Caminho de Vida', ar: 'رقم مسار الحياة', zh: '生命灵数', ja: 'ライフパスナンバー',
  },
  'twin flame': {
    hi: 'ट्विन फ्लेम', es: 'Llama Gemela', fr: 'Flamme Jumelle', de: 'Zwillingsflamme', pt: 'Chama Gêmea', ar: 'شعلة التوأم', zh: '双生火焰', ja: 'ツインレイ',
  },
  'sleep': {
    hi: 'नींद (स्लीप)', es: 'Sueño', fr: 'Sommeil', de: 'Schlaf', pt: 'Sono', ar: 'النوم', zh: '睡眠周期', ja: '睡眠サイクル',
  },
  'leap year': {
    hi: 'लीप वर्ष', es: 'Año Bisiesto', fr: 'Année Bissextile', de: 'Schaltjahr', pt: 'Ano Bissexto', ar: 'السنة الكبيسة', zh: '闰年', ja: 'うるう年',
  },
};

/**
 * Word for "Calculator" or prefix/suffix patterns across all 39 languages.
 */
const CALCULATOR_WORD: Record<Locale, { prefix?: string; suffix?: string }> = {
  en: { suffix: 'Calculator' },
  hi: { suffix: 'कैलकुलेटर' },
  es: { prefix: 'Calculadora de' },
  fr: { prefix: 'Calculateur de' },
  de: { suffix: 'Rechner' },
  pt: { prefix: 'Calculadora de' },
  ar: { prefix: 'حاسبة' },
  zh: { suffix: '计算器' },
  ja: { suffix: '計算機' },
  ru: { prefix: 'Калькулятор' },
  it: { prefix: 'Calcolatore di' },
  ko: { suffix: '계산기' },
  nl: { suffix: 'Rekenmachine' },
  tr: { suffix: 'Hesaplayıcı' },
  vi: { prefix: 'Máy tính' },
  th: { prefix: 'เครื่องคำนวณ' },
  pl: { prefix: 'Kalkulator' },
  id: { prefix: 'Kalkulator' },
  cs: { prefix: 'Kalkulačka' },
  da: { suffix: 'Lommeregner' },
  el: { prefix: 'Αριθμομηχανή' },
  fa: { prefix: 'ماشین حساب' },
  fi: { suffix: 'Laskin' },
  he: { prefix: 'מחשבון' },
  hr: { prefix: 'Kalkulator' },
  hu: { suffix: 'Számológép' },
  kk: { suffix: 'Калькуляторы' },
  ms: { prefix: 'Kalkulator' },
  nb: { suffix: 'Kalkulator' },
  ro: { prefix: 'Calculator' },
  sk: { prefix: 'Kalkulačka' },
  sr: { prefix: 'Калкулатор' },
  sv: { suffix: 'Kalkylator' },
  tl: { prefix: 'Kalkulator ng' },
  ur: { suffix: 'کیلکولیٹر' },
  uz: { suffix: 'Kalkulyatori' },
  az: { suffix: 'Kalkulyatoru' },
  bg: { prefix: 'Калкулатор за' },
  bn: { suffix: 'ক্যালকুলেটর' },
};

/**
 * Derives a clean, localized calculator name for any calculator in any locale.
 */
export function getLocalizedCalculatorName(name: string, locale: Locale): string {
  if (locale === DEFAULT_LOCALE) return name;

  // 1. Strip 'Calculator' or 'Converter' or 'Counter' from the English name to isolate the topic
  const cleanTopic = name
    .replace(/\s*(Calculator|Converter|Counter|Generator|Finder|Estimator)$/i, '')
    .trim();

  // 2. Check direct match in TERM_TRANSLATIONS
  const lookupKey = cleanTopic.toLowerCase();
  const termEntry = TERM_TRANSLATIONS[lookupKey]?.[locale];

  const calcRule = CALCULATOR_WORD[locale] || { suffix: 'कैलकुलेटर' };

  if (termEntry) {
    if (calcRule.prefix) {
      return `${calcRule.prefix} ${termEntry}`;
    }
    return `${termEntry} ${calcRule.suffix || ''}`.trim();
  }

  // 3. Fallback: combine topic with the localized word for "Calculator"
  if (calcRule.prefix) {
    return `${calcRule.prefix} ${cleanTopic}`;
  }
  return `${cleanTopic} ${calcRule.suffix || ''}`.trim();
}

/**
 * Derives an informative, natural localized short description for any calculator.
 */
function getLocalizedDescription(
  calc: CalculatorDefinition,
  localizedName: string,
  locale: Locale
): string {
  const ui = getUiTranslations(locale);

  switch (locale) {
    case 'hi':
      return `${localizedName} – त्वरित, सटीक और उपयोग में आसान। Calculat.dev पर बिना किसी विज्ञापन के मुफ्त ऑनलाइन गणना उपकरण।`;
    case 'es':
      return `${localizedName} – Rápida, precisa y gratuita. Herramienta de cálculo online sin anuncios en Calculat.dev.`;
    case 'fr':
      return `${localizedName} – Rapide, précis et gratuit. Outil de calcul en ligne sans publicité sur Calculat.dev.`;
    case 'de':
      return `${localizedName} – Schnell, präzise und kostenlos. Online-Rechner ohne Werbung auf Calculat.dev.`;
    case 'pt':
      return `${localizedName} – Rápida, precisa e gratuita. Ferramenta de cálculo online no Calculat.dev.`;
    case 'ar':
      return `${localizedName} – أداة حساب سريعة ودقيقة ومجانية بدون إعلانات على Calculat.dev.`;
    case 'zh':
      return `${localizedName} – 快速、精准且免费。Calculat.dev 上的无广告在线计算工具。`;
    case 'ja':
      return `${localizedName} – 高速・高精度・無料。Calculat.dev の広告なしオンライン計算ツール。`;
    case 'ru':
      return `${localizedName} – Быстрый, точный и бесплатный расчет онлайн на Calculat.dev.`;
    case 'it':
      return `${localizedName} – Calcolo online rapido, preciso e gratuito senza pubblicità su Calculat.dev.`;
    case 'ko':
      return `${localizedName} – 빠르고 정확하며 무료인 온라인 계산 도구 Calculat.dev.`;
    default:
      return `${localizedName} – ${ui.calculate}. ${ui.tagline}. ${ui.description}`;
  }
}

const SITE_CONFIG = {
  name: 'Calculat',
};

/**
 * Generates fallback localized SEO metadata for any calculator that does not have
 * an explicit translation in POPULAR_CALCULATOR_TRANSLATIONS.
 */
function getFallbackCalculatorMeta(
  calc: CalculatorDefinition,
  locale: Locale
): { name: string; shortDescription: string; seoTitle: string; seoDescription: string; keywords: string[] } {
  const ui = getUiTranslations(locale);
  const localizedName = getLocalizedCalculatorName(calc.name, locale);
  const localizedDesc = getLocalizedDescription(calc, localizedName, locale);

  switch (locale) {
    case 'es':
      return {
        name: localizedName,
        shortDescription: localizedDesc,
        seoTitle: `${localizedName} – Calculadora Online Gratuita | Calculat`,
        seoDescription: `${localizedDesc} Herramienta online gratuita y precisa sin registro en Calculat.dev.`,
        keywords: [localizedName.toLowerCase(), 'calculadora online', 'herramienta de calculo', 'calculat'],
      };
    case 'fr':
      return {
        name: localizedName,
        shortDescription: localizedDesc,
        seoTitle: `${localizedName} – Calculateur en Ligne Gratuit | Calculat`,
        seoDescription: `${localizedDesc} Outil de calcul en ligne rapide et gratuit sur Calculat.dev.`,
        keywords: [localizedName.toLowerCase(), 'calculateur en ligne', 'outil de calcul gratuit', 'calculat'],
      };
    case 'de':
      return {
        name: localizedName,
        shortDescription: localizedDesc,
        seoTitle: `${localizedName} – Kostenloser Online-Rechner | Calculat`,
        seoDescription: `${localizedDesc} Kostenloses und schnelles Online-Rechenwerkzeug auf Calculat.dev.`,
        keywords: [localizedName.toLowerCase(), 'online rechner', 'kostenlos berechnen', 'calculat'],
      };
    case 'pt':
      return {
        name: localizedName,
        shortDescription: localizedDesc,
        seoTitle: `${localizedName} – Calculadora Online Grátis | Calculat`,
        seoDescription: `${localizedDesc} Ferramenta online gratuita e rápida sem necessidade de cadastro no Calculat.dev.`,
        keywords: [localizedName.toLowerCase(), 'calculadora online', 'ferramenta de calculo gratis', 'calculat'],
      };
    case 'hi':
      return {
        name: localizedName,
        shortDescription: localizedDesc,
        seoTitle: `${localizedName} – मुफ्त ऑनलाइन कैलकुलेटर | Calculat`,
        seoDescription: `${localizedDesc} Calculat.dev पर तेज, सटीक और मुफ्त ऑनलाइन गणना उपकरण।`,
        keywords: [localizedName.toLowerCase(), 'मुफ्त कैलकुलेटर', 'ऑनलाइन कैलकुलेटर', 'calculat'],
      };
    case 'zh':
      return {
        name: localizedName,
        shortDescription: localizedDesc,
        seoTitle: `${localizedName} – 在线免费计算器 | Calculat`,
        seoDescription: `${localizedDesc} 在 Calculat.dev 上体验快速、纯净、无广告的在线计算工具。`,
        keywords: [localizedName.toLowerCase(), '在线计算器', '免费计算工具', 'calculat'],
      };
    case 'ja':
      return {
        name: localizedName,
        shortDescription: localizedDesc,
        seoTitle: `${localizedName} – 無料オンライン計算機 | Calculat`,
        seoDescription: `${localizedDesc} Calculat.dev の高速・高精度・広告なしオンライン計算ツール。`,
        keywords: [localizedName.toLowerCase(), '無料計算機', 'オンライン計算ツール', 'calculat'],
      };
    case 'ru':
      return {
        name: localizedName,
        shortDescription: localizedDesc,
        seoTitle: `${localizedName} – Бесплатный онлайн калькулятор | Calculat`,
        seoDescription: `${localizedDesc} Быстрый и точный расчет онлайн без рекламы на Calculat.dev.`,
        keywords: [localizedName.toLowerCase(), 'онлайн калькулятор', 'расчет онлайн', 'calculat'],
      };
    case 'ar':
      return {
        name: localizedName,
        shortDescription: localizedDesc,
        seoTitle: `${localizedName} – حاسبة مجانية عبر الإنترنت | Calculat`,
        seoDescription: `${localizedDesc} أداة حساب سريعة ودقيقة ومجانية بدون إعلانات على Calculat.dev.`,
        keywords: [localizedName.toLowerCase(), 'حاسبة مجانية', 'حساب اون لاين', 'calculat'],
      };
    default:
      return {
        name: localizedName,
        shortDescription: localizedDesc,
        seoTitle: `${localizedName} – ${ui.calculate} | ${SITE_CONFIG.name}`,
        seoDescription: `${localizedDesc} ${ui.description}`,
        keywords: [localizedName.toLowerCase(), ui.calculate.toLowerCase(), ui.navCalculators.toLowerCase(), 'calculat'],
      };
  }
}

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
