import { CategorySlug } from '../../types';
import { Locale } from '../config';

export interface LocalizedCategory {
  name: string;
  shortName: string;
  description: string;
}

export const CATEGORY_TRANSLATIONS: Record<Locale, Record<CategorySlug, LocalizedCategory>> = {
  en: {
    math: {
      name: 'Math Calculators',
      shortName: 'Math',
      description: 'Solve arithmetic, percentages, averages, algebra, geometry, and advanced mathematics problems.',
    },
    finance: {
      name: 'Finance Calculators',
      shortName: 'Finance',
      description: 'Calculate loans, mortgages, compound interest, investments, savings, and retirement planning.',
    },
    health: {
      name: 'Health Calculators',
      shortName: 'Health',
      description: 'Monitor your body mass index (BMI), calories, ideal weight, body fat, and wellness metrics.',
    },
    'date-time': {
      name: 'Date & Time Calculators',
      shortName: 'Date & Time',
      description: 'Calculate exact age, days between dates, time durations, work days, and countdowns.',
    },
    everyday: {
      name: 'Everyday Calculators',
      shortName: 'Everyday',
      description: 'Everyday utilities including restaurant tip splitting, discounts, gas mileage, and cooking conversions.',
    },
    business: {
      name: 'Business Calculators',
      shortName: 'Business',
      description: 'Calculate profit margins, markup, customer acquisition cost (CAC), runway, and breakeven points.',
    },
    education: {
      name: 'Education Calculators',
      shortName: 'Education',
      description: 'GPA calculators, test score curves, grade predictors, study hours, and academic tools.',
    },
    conversion: {
      name: 'Unit Conversion Calculators',
      shortName: 'Conversion',
      description: 'Convert between metric and imperial units for length, weight, temperature, volume, and area.',
    },
    science: {
      name: 'Science Calculators',
      shortName: 'Science',
      description: 'Physics equations, chemistry molecular weights, speed, acceleration, and thermodynamic formulas.',
    },
    technology: {
      name: 'Technology Calculators',
      shortName: 'Technology',
      description: 'Data storage, download speeds, bandwidth estimation, binary/hex conversion, and cloud costs.',
    },
    construction: {
      name: 'Construction Calculators',
      shortName: 'Construction',
      description: 'Square footage, concrete slab volume, paint coverage, roofing, tile, and framing estimates.',
    },
    fitness: {
      name: 'Fitness Calculators',
      shortName: 'Fitness',
      description: 'Target heart rates, one-rep max, running pace, macro splits, and workout calorie burn.',
    },
    statistics: {
      name: 'Statistics Calculators',
      shortName: 'Statistics',
      description: 'Standard deviation, variance, z-score, sample size, confidence intervals, and regression.',
    },
    probability: {
      name: 'Probability Calculators',
      shortName: 'Probability',
      description: 'Permutations, combinations, coin tosses, dice odds, Bayes theorem, and odds ratios.',
    },
    sports: {
      name: 'Sports Calculators',
      shortName: 'Sports',
      description: 'Batting averages, quarterback ratings, golf handicap, tournament brackets, and splits.',
    },
    travel: {
      name: 'Travel Calculators',
      shortName: 'Travel',
      description: 'Time zone differences, jet lag schedules, road trip fuel cost, and packing weight.',
    },
    numerology: {
      name: 'Numerology & Spiritual Calculators',
      shortName: 'Numerology',
      description: 'Calculate life path numbers, expression numbers, soul urge, personality numbers, and twin flame resonance charts.',
    },
  },

  es: {
    math: {
      name: 'Calculadoras de Matemáticas',
      shortName: 'Matemáticas',
      description: 'Resuelve operaciones aritméticas, porcentajes, promedios, álgebra, geometría y matemáticas avanzadas.',
    },
    finance: {
      name: 'Calculadoras de Finanzas',
      shortName: 'Finanzas',
      description: 'Calcula préstamos, hipotecas, interés compuesto, inversiones, ahorro y planificación de jubilación.',
    },
    health: {
      name: 'Calculadoras de Salud',
      shortName: 'Salud',
      description: 'Calcula tu índice de masa corporal (IMC), calorías diarias, peso ideal, grasa corporal y bienestar.',
    },
    'date-time': {
      name: 'Calculadoras de Fecha y Hora',
      shortName: 'Fecha y Hora',
      description: 'Calcula edad exacta, días entre fechas, duraciones horarias, días hábiles y cuentas regresivas.',
    },
    everyday: {
      name: 'Calculadoras de Uso Diario',
      shortName: 'Uso Diario',
      description: 'Herramientas cotidianas como propinas, descuentos de compras, consumo de combustible y cocina.',
    },
    business: {
      name: 'Calculadoras de Negocios',
      shortName: 'Negocios',
      description: 'Calcula márgenes de beneficio, precios de venta, coste de adquisición (CAC) y punto de equilibrio.',
    },
    education: {
      name: 'Calculadoras Educativas',
      shortName: 'Educación',
      description: 'Calculadoras de promedio escolar (GPA), curvas de exámenes, notas finales y herramientas académicas.',
    },
    conversion: {
      name: 'Convertidores de Unidades',
      shortName: 'Conversión',
      description: 'Convierte entre unidades métricas e imperiales de longitud, masa, temperatura, volumen y área.',
    },
    science: {
      name: 'Calculadoras Científicas',
      shortName: 'Ciencia',
      description: 'Fórmulas de física, masa molecular química, velocidad, aceleración y termodinámica.',
    },
    technology: {
      name: 'Calculadoras de Tecnología',
      shortName: 'Tecnología',
      description: 'Almacenamiento de datos, tiempos de descarga, ancho de banda, binario/hexadecimal y costes cloud.',
    },
    construction: {
      name: 'Calculadoras de Construcción',
      shortName: 'Construcción',
      description: 'Metros cuadrados, volumen de hormigón, cálculo de pintura, tejados, azulejos y estructuras.',
    },
    fitness: {
      name: 'Calculadoras de Fitness',
      shortName: 'Fitness',
      description: 'Frecuencia cardíaca ideal, repetición máxima (1RM), ritmo de carrera y quema de calorías.',
    },
    statistics: {
      name: 'Calculadoras de Estadística',
      shortName: 'Estadística',
      description: 'Desviación estándar, varianza, puntuación Z, tamaño de muestra e intervalos de confianza.',
    },
    probability: {
      name: 'Calculadoras de Probabilidad',
      shortName: 'Probabilidad',
      description: 'Permutaciones, combinaciones, lanzamientos de monedas, dados, teorema de Bayes y cuotas.',
    },
    sports: {
      name: 'Calculadoras Deportivas',
      shortName: 'Deportes',
      description: 'Promedios de bateo, índices deportivos, tiempos de competición y divisiones de ritmo.',
    },
    travel: {
      name: 'Calculadoras de Viaje',
      shortName: 'Viajes',
      description: 'Diferencias horarias, adaptación de jet lag, gasto de gasolina en ruta y peso de equipaje.',
    },
    numerology: {
      name: 'Calculadoras de Numerología',
      shortName: 'Numerología',
      description: 'Calcula número de camino de vida, número de expresión, impulso del alma y compatibilidad.',
    },
  },

  fr: {
    math: {
      name: 'Calculateurs Mathématiques',
      shortName: 'Maths',
      description: 'Résolvez calculs arithmétiques, pourcentages, moyennes, algèbre, géométrie et maths avancées.',
    },
    finance: {
      name: 'Calculateurs Financiers',
      shortName: 'Finance',
      description: 'Calculez prêts, crédits immobiliers, intérêts composés, épargne, investissements et retraite.',
    },
    health: {
      name: 'Calculateurs de Santé',
      shortName: 'Santé',
      description: 'Suivez votre indice de masse corporelle (IMC), vos calories, votre poids idéal et taux de graisse.',
    },
    'date-time': {
      name: 'Calculateurs de Date et Heure',
      shortName: 'Date & Heure',
      description: 'Calculez votre âge précis, l’écart entre deux dates, durées en heures et jours ouvrés.',
    },
    everyday: {
      name: 'Calculateurs du Quotidien',
      shortName: 'Quotidien',
      description: 'Outils pratiques : pourboires, soldes et réductions, consommation d’essence et cuisine.',
    },
    business: {
      name: 'Calculateurs pour Entreprises',
      shortName: 'Entreprise',
      description: 'Calculez marge commerciale, taux de marque, coût d’acquisition client (CAC) et seuil de rentabilité.',
    },
    education: {
      name: 'Calculateurs pour Étudiants',
      shortName: 'Éducation',
      description: 'Calcul de moyenne générale, barèmes d’examens, prédiction de notes et temps d’étude.',
    },
    conversion: {
      name: 'Convertisseurs d’Unités',
      shortName: 'Conversion',
      description: 'Convertissez entre unités métriques et impériales : longueur, poids, température et volume.',
    },
    science: {
      name: 'Calculateurs Scientifiques',
      shortName: 'Sciences',
      description: 'Équations physiques, masse molaire chimique, vitesse, accélération et lois thermodynamiques.',
    },
    technology: {
      name: 'Calculateurs Technologiques',
      shortName: 'Tech',
      description: 'Stockage de données, vitesse de téléchargement, bande passante, hexadécimal et cloud.',
    },
    construction: {
      name: 'Calculateurs de Chantier',
      shortName: 'BTP & Travaux',
      description: 'Mètres carrés, volume de béton, quantité de peinture, toiture, carrelage et charpente.',
    },
    fitness: {
      name: 'Calculateurs de Sport & Fitness',
      shortName: 'Fitness',
      description: 'Fréquence cardiaque cible, 1RM (max répétition), allure de course et dépenses caloriques.',
    },
    statistics: {
      name: 'Calculateurs Statistiques',
      shortName: 'Statistiques',
      description: 'Écart-type, variance, score Z, taille d’échantillon, intervalles de confiance et régression.',
    },
    probability: {
      name: 'Calculateurs de Probabilités',
      shortName: 'Probabilités',
      description: 'Permutations, combinaisons, tirages à pile ou face, dés, théorème de Bayes et cotes.',
    },
    sports: {
      name: 'Calculateurs de Sport',
      shortName: 'Sports',
      description: 'Performances athlétiques, handicaps de golf, tableaux de tournois et temps de passage.',
    },
    travel: {
      name: 'Calculateurs de Voyage',
      shortName: 'Voyage',
      description: 'Fuseaux horaires, gestion du décalage horaire, budget essence routier et poids des bagages.',
    },
    numerology: {
      name: 'Calculateurs de Numérologie',
      shortName: 'Numérologie',
      description: 'Calculez chemin de vie, nombre d’expression, élan spirituel et résonance de flammes jumelles.',
    },
  },

  de: {
    math: {
      name: 'Mathematik-Rechner',
      shortName: 'Mathematik',
      description: 'Lösen Sie Grundrechenarten, Prozentrechnung, Mittelwerte, Algebra, Geometrie und höhere Mathematik.',
    },
    finance: {
      name: 'Finanzrechner',
      shortName: 'Finanzen',
      description: 'Berechnen Sie Kredite, Baufinanzierung, Zinseszinsen, Sparpläne, Investitionen und Altersvorsorge.',
    },
    health: {
      name: 'Gesundheitsrechner',
      shortName: 'Gesundheit',
      description: 'Ermitteln Sie Ihren BMI (Body-Mass-Index), Kalorienbedarf, Idealgewicht und Körperfettanteil.',
    },
    'date-time': {
      name: 'Datum- & Zeitrechner',
      shortName: 'Datum & Zeit',
      description: 'Berechnen Sie exaktes Alter, Tage zwischen Daten, Zeitspannen, Arbeitstage und Countdowns.',
    },
    everyday: {
      name: 'Alltagsrechner',
      shortName: 'Alltag',
      description: 'Nützliche Hilfen für Trinkgeld, Rabatte, Spritverbrauch beim Auto und Küchenmaße.',
    },
    business: {
      name: 'Business- & Firmenrechner',
      shortName: 'Business',
      description: 'Berechnen Sie Gewinnmargen, Aufschläge, Kundengewinnungskosten (CAC) und Break-Even-Punkte.',
    },
    education: {
      name: 'Bildungs- & Schulrechner',
      shortName: 'Bildung',
      description: 'Notendurchschnittsrechner, Prüfungskurven, Notenprognosen und Lernzeitplaner.',
    },
    conversion: {
      name: 'Einheiten-Umrechner',
      shortName: 'Umrechnung',
      description: 'Rechnen Sie zwischen metrischen und imperialen Einheiten für Länge, Masse, Temperatur und Volumen um.',
    },
    science: {
      name: 'Wissenschaftliche Rechner',
      shortName: 'Wissenschaft',
      description: 'Physikalische Formeln, chemische Molmassen, Geschwindigkeit, Beschleunigung und Thermodynamik.',
    },
    technology: {
      name: 'Technik- & IT-Rechner',
      shortName: 'Technik',
      description: 'Speicherplatz, Downloadzeiten, Bandbreitenbedarf, Binär-/Hexadezimalumwandlung und Cloudkosten.',
    },
    construction: {
      name: 'Bau- & Handwerkerrechner',
      shortName: 'Bau & Handwerk',
      description: 'Quadratmeter, Betonvolumen, Farbverbrauch, Dachflächen, Fliesen und Trockenbau.',
    },
    fitness: {
      name: 'Fitness- & Trainingsrechner',
      shortName: 'Fitness',
      description: 'Zielherzfrequenz, Maximalkraft (1RM), Lauftempo (Pace) und Kalorienverbrauch beim Sport.',
    },
    statistics: {
      name: 'Statistik-Rechner',
      shortName: 'Statistik',
      description: 'Standardabweichung, Varianz, Z-Score, Stichprobengröße, Konfidenzintervalle und Regression.',
    },
    probability: {
      name: 'Wahrscheinlichkeitsrechner',
      shortName: 'Wahrscheinlichkeit',
      description: 'Permutationen, Kombinationen, Münzwürfe, Würfelchancen, Satz von Bayes und Quoten.',
    },
    sports: {
      name: 'Sport-Rechner',
      shortName: 'Sport',
      description: 'Leistungswerte, Golf-Handicap, Turnierpläne, Rennabschnitte und Split-Zeiten.',
    },
    travel: {
      name: 'Reise-Rechner',
      shortName: 'Reisen',
      description: 'Zeitzonenrechner, Jetlag-Planung, Fahrtkosten und Gepäckgewichtsberechnung.',
    },
    numerology: {
      name: 'Numerologie-Rechner',
      shortName: 'Numerologie',
      description: 'Berechnen Sie Lebenszahl, Ausdruckszahl, Seelendrang und Seelenpartner-Resonanz.',
    },
  },

  pt: {
    math: {
      name: 'Calculadoras de Matemática',
      shortName: 'Matemática',
      description: 'Resolva aritmética, porcentagens, médias, álgebra, geometria e problemas matemáticos avançados.',
    },
    finance: {
      name: 'Calculadoras Financeiras',
      shortName: 'Finanças',
      description: 'Calcule empréstimos, financiamentos, juros compostos, investimentos, poupança e aposentadoria.',
    },
    health: {
      name: 'Calculadoras de Saúde',
      shortName: 'Saúde',
      description: 'Acompanhe seu índice de massa corporal (IMC), calorias, peso ideal, gordura corporal e bem-estar.',
    },
    'date-time': {
      name: 'Calculadoras de Data e Hora',
      shortName: 'Data e Hora',
      description: 'Calcule idade exata, dias entre datas, durações de tempo, dias úteis e contagens regressivas.',
    },
    everyday: {
      name: 'Calculadoras do Dia a Dia',
      shortName: 'Dia a Dia',
      description: 'Ferramentas práticas como divisão de gorjeta, descontos em compras, consumo de combustível e receitas.',
    },
    business: {
      name: 'Calculadoras de Negócios',
      shortName: 'Negócios',
      description: 'Calcule margens de lucro, markup, custo de aquisição de clientes (CAC) e ponto de equilíbrio.',
    },
    education: {
      name: 'Calculadoras Educacionais',
      shortName: 'Educação',
      description: 'Cálculo de média escolar, curvas de notas em provas, previsão acadêmica e horas de estudo.',
    },
    conversion: {
      name: 'Conversores de Unidades',
      shortName: 'Conversão',
      description: 'Converta entre unidades métricas e imperiais para comprimento, peso, temperatura, volume e área.',
    },
    science: {
      name: 'Calculadoras Científicas',
      shortName: 'Ciência',
      description: 'Equações de física, peso molecular químico, velocidade, aceleração e termodinâmica.',
    },
    technology: {
      name: 'Calculadoras de Tecnologia',
      shortName: 'Tecnologia',
      description: 'Armazenamento de dados, velocidade de download, largura de banda, binário/hex e nuvem.',
    },
    construction: {
      name: 'Calculadoras de Construção',
      shortName: 'Construção',
      description: 'Metros quadrados, volume de concreto, rendimento de tinta, telhado, piso e alvenaria.',
    },
    fitness: {
      name: 'Calculadoras de Fitness',
      shortName: 'Fitness',
      description: 'Frequência cardíaca alvo, repetição máxima (1RM), ritmo de corrida e queima calórica.',
    },
    statistics: {
      name: 'Calculadoras de Estatística',
      shortName: 'Estatística',
      description: 'Desvio padrão, variância, escore Z, tamanho amostral, intervalos de confiança e regressão.',
    },
    probability: {
      name: 'Calculadoras de Probabilidade',
      shortName: 'Probabilidade',
      description: 'Permutações, combinações, lançamentos de moeda, dados, teorema de Bayes e probabilidades.',
    },
    sports: {
      name: 'Calculadoras Esportivas',
      shortName: 'Esportes',
      description: 'Médias de rendimento, handicap esportivo, tabelas de torneio e parciais de tempo.',
    },
    travel: {
      name: 'Calculadoras de Viagem',
      shortName: 'Viagem',
      description: 'Fuso horário, prevenção de jet lag, custo de combustível e limite de bagagem.',
    },
    numerology: {
      name: 'Calculadoras de Numerologia',
      shortName: 'Numerologia',
      description: 'Calcule caminho de vida, número de expressão, desejo da alma e compatibilidade.',
    },
  },

  hi: {
    math: {
      name: 'गणित कैलकुलेटर',
      shortName: 'गणित',
      description: 'अंकगणित, प्रतिशत, औसत, बीजगणित, ज्यामिति और उन्नत गणित की समस्याओं को हल करें।',
    },
    finance: {
      name: 'वित्तीय कैलकुलेटर',
      shortName: 'वित्त',
      description: 'ऋण, ईएमआई, चक्रवृद्धि ब्याज, निवेश, बचत और सेवानिवृत्ति योजना की गणना करें।',
    },
    health: {
      name: 'स्वास्थ्य कैलकुलेटर',
      shortName: 'स्वास्थ्य',
      description: 'बॉडी मास इंडेक्स (बीएमआई), कैलोरी, आदर्श वजन और स्वास्थ्य मेट्रिक्स की निगरानी करें।',
    },
    'date-time': {
      name: 'दिनांक और समय कैलकुलेटर',
      shortName: 'दिनांक और समय',
      description: 'सटीक आयु, तिथियों के बीच के दिन, समय अवधि, कार्य दिवस और उलटी गिनती की गणना करें।',
    },
    everyday: {
      name: 'दैनिक उपयोग कैलकुलेटर',
      shortName: 'दैनिक जीवन',
      description: 'रेस्तरां टिप विभाजन, छूट, वाहन माइलेज और रसोई माप सहित रोजमर्रा की गणनाएं।',
    },
    business: {
      name: 'व्यापार कैलकुलेटर',
      shortName: 'व्यापार',
      description: 'लाभ मार्जिन, मार्कअप, ग्राहक अधिग्रहण लागत (CAC) और ब्रेक-ईवन बिंदु की गणना करें।',
    },
    education: {
      name: 'शैक्षणिक कैलकुलेटर',
      shortName: 'शिक्षा',
      description: 'ग्रेड प्वाइंट (GPA), परीक्षा स्कोर वक्र, ग्रेड भविष्यवाणी और अध्ययन उपकरण।',
    },
    conversion: {
      name: 'इकाई परिवर्तक',
      shortName: 'परिवर्तन',
      description: 'लंबाई, वजन, तापमान, आयतन और क्षेत्रफल के लिए मीट्रिक और इंपीरियल इकाइयों को बदलें।',
    },
    science: {
      name: 'वैज्ञानिक कैलकुलेटर',
      shortName: 'विज्ञान',
      description: 'भौतिकी समीकरण, रसायन विज्ञान आणविक भार, गति, त्वरण और थर्मोडायनामिक्स सूत्र।',
    },
    technology: {
      name: 'प्रौद्योगिकी कैलकुलेटर',
      shortName: 'तकनीक',
      description: 'डेटा स्टोरेज, डाउनलोड गति, बैंडविड्थ अनुमान, बाइनरी/हेक्स और क्लाउड लागत।',
    },
    construction: {
      name: 'निर्माण कैलकुलेटर',
      shortName: 'निर्माण',
      description: 'वर्ग फुट, कंक्रीट स्लैब की मात्रा, पेंट कवरेज, टाइल और निर्माण सामग्री का अनुमान।',
    },
    fitness: {
      name: 'फिटनेस कैलकुलेटर',
      shortName: 'फिटनेस',
      description: 'लक्षित हृदय गति, वन-रेप मैक्स (1RM), दौड़ने की गति और वर्कआउट कैलोरी बर्न।',
    },
    statistics: {
      name: 'सांख्यिकी कैलकुलेटर',
      shortName: 'सांख्यिकी',
      description: 'मानक विचलन, प्रसरण, जेड-स्कोर, नमूना आकार, विश्वास अंतराल और प्रतिगमन।',
    },
    probability: {
      name: 'प्रायिकता कैलकुलेटर',
      shortName: 'प्रायिकता',
      description: 'क्रमचय, संचय, सिक्का उछाल, पासा संभावना, बेयस प्रमेय और ऑड्स अनुपात।',
    },
    sports: {
      name: 'खेल कैलकुलेटर',
      shortName: 'खेल',
      description: 'बल्लेबाजी औसत, खेल स्कोर, टूर्नामेंट ब्रैकेट और स्प्लिट समय।',
    },
    travel: {
      name: 'यात्रा कैलकुलेटर',
      shortName: 'यात्रा',
      description: 'समय क्षेत्र अंतर, जेट लैग शेड्यूल, यात्रा ईंधन लागत और पैकिंग वजन।',
    },
    numerology: {
      name: 'अंकशास्त्र एवं आध्यात्मिक कैलकुलेटर',
      shortName: 'अंकशास्त्र',
      description: 'मूलांक, भाग्यांक, आत्मा प्रेरणा संख्या, व्यक्तित्व संख्या और जीवन पथ की गणना करें।',
    },
  },
};
