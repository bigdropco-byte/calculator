import { Locale } from '../config';

export interface LocalizedCalculatorMeta {
  name: string;
  shortDescription: string;
  seoTitle?: string;
  seoDescription?: string;
  keywords?: string[];
}

export const POPULAR_CALCULATOR_TRANSLATIONS: Record<string, Partial<Record<Locale, LocalizedCalculatorMeta>>> = {
  'percentage-calculator': {
    es: {
      name: 'Calculadora de Porcentajes',
      shortDescription: 'Calcula porcentajes rápidamente, halla qué porcentaje representa un número de otro y obtén aumentos o disminuciones porcentuales.',
      seoTitle: 'Calculadora de Porcentajes – Calcular Porcentaje Online Gratis',
      seoDescription: 'Calculadora de porcentajes online gratuita. Calcula el X% de Y, diferencias porcentuales y aumentos con explicaciones paso a paso.',
      keywords: ['calculadora de porcentajes', 'calcular porcentaje', 'porcentaje online', 'sacar porcentaje'],
    },
    fr: {
      name: 'Calculateur de Pourcentage',
      shortDescription: 'Calculez rapidement un pourcentage, découvrez quelle proportion représente une valeur et calculez les évolutions en pourcent.',
      seoTitle: 'Calculateur de Pourcentage – Calculer un Pourcentage en Ligne Gratuit',
      seoDescription: 'Calculateur de pourcentage gratuit en ligne. Calculez X% de Y, des remises, hausses et pourcentages inverses instantanément.',
      keywords: ['calculateur de pourcentage', 'calculer pourcentage', 'calcul pourcent', 'outil pourcentage gratuit'],
    },
    de: {
      name: 'Prozentrechner',
      shortDescription: 'Berechnen Sie schnell Prozentsätze, Anteile und prozentuale Veränderungen mit detaillierten Schritten.',
      seoTitle: 'Prozentrechner – Prozentrechnung Online Kostenlos',
      seoDescription: 'Kostenloser Online-Prozentrechner. Berechnen Sie wie viel X% von Y ist, prozentuale Steigerungen und Nachlässe in Echtzeit.',
      keywords: ['prozentrechner', 'prozent berechnen', 'prozentrechnung online', 'rabatt berechnen'],
    },
    pt: {
      name: 'Calculadora de Porcentagem',
      shortDescription: 'Calcule porcentagens rapidamente, descubra que porcentagem um número representa de outro e variações percentuais.',
      seoTitle: 'Calculadora de Porcentagem – Calcular Porcentagem Online Grátis',
      seoDescription: 'Calculadora de porcentagem online gratuita. Descubra quanto é X% de Y, descontos, aumentos e diferenças percentuais.',
      keywords: ['calculadora de porcentagem', 'calcular porcentagem', 'porcentagem online', 'regra de tres porcentagem'],
    },
    hi: {
      name: 'प्रतिशत कैलकुलेटर',
      shortDescription: 'प्रतिशत की त्वरित गणना करें, जानें कि कोई संख्या दूसरी का कितना प्रतिशत है और प्रतिशत परिवर्तन निकालें।',
      seoTitle: 'प्रतिशत कैलकुलेटर – मुफ्त ऑनलाइन प्रतिशत गणना',
      seoDescription: 'मुफ्त ऑनलाइन प्रतिशत कैलकुलेटर। तुरंत निकालें Y का X%, प्रतिशत अंतर और छूट, चरण-दर-चरण गणित के साथ।',
      keywords: ['प्रतिशत कैलकुलेटर', 'प्रतिशत कैसे निकालें', 'प्रतिशत गणना', 'मुफ्त प्रतिशत टूल'],
    },
  },

  'mortgage-calculator': {
    es: {
      name: 'Calculadora de Hipotecas',
      shortDescription: 'Calcula las cuotas mensuales de tu hipoteca, el total de intereses y el cuadro de amortización completo.',
      seoTitle: 'Calculadora de Hipotecas – Cuota Mensual y Amortización Online',
      seoDescription: 'Calculadora de hipotecas gratuita. Estima pagos mensuales, tasas de interés, amortización y costes totales de tu vivienda.',
      keywords: ['calculadora de hipotecas', 'cuota hipoteca', 'simulador hipoteca', 'calcular prestamo hipotecario'],
    },
    fr: {
      name: 'Calculateur de Prêt Immobilier',
      shortDescription: 'Estimez vos mensualités de crédit immobilier, le coût total des intérêts et consultez le tableau d’amortissement.',
      seoTitle: 'Calculateur de Prêt Immobilier – Mensualités et Simulation Gratuit',
      seoDescription: 'Simulateur de crédit immobilier en ligne. Calculez vos mensualités, taux d’intérêt et tableau d’amortissement complet.',
      keywords: ['calculateur pret immobilier', 'simulateur credit', 'mensualite pret', 'taux interet immobilier'],
    },
    de: {
      name: 'Baufinanzierungsrechner',
      shortDescription: 'Berechnen Sie monatliche Raten für Ihre Baufinanzierung, Zinskosten und den Tilgungsplan.',
      seoTitle: 'Baufinanzierungsrechner – Monatsrate & Tilgungsplan Online',
      seoDescription: 'Kostenloser Baufinanzierungsrechner. Berechnen Sie Monatsraten, Restschuld und Zinsen für Ihr Eigenheim oder Darlehen.',
      keywords: ['baufinanzierungsrechner', 'kreditrechner immobilien', 'monatsrate berechnen', 'tilgungsplan'],
    },
    pt: {
      name: 'Calculadora de Financiamento Imobiliário',
      shortDescription: 'Calcule o valor das parcelas mensais do seu financiamento, juros acumulados e tabela de amortização.',
      seoTitle: 'Calculadora de Financiamento Imobiliário – Simulação Online Grátis',
      seoDescription: 'Simule seu financiamento imobiliário. Calcule parcelas mensais, juros, saldo devedor e custo total do imóvel.',
      keywords: ['calculadora financiamento imobiliario', 'simulador habitacional', 'parcela financiamento', 'amortizacao'],
    },
    hi: {
      name: 'गृह ऋण (होम लोन) कैलकुलेटर',
      shortDescription: 'अपने होम लोन की मासिक ईएमआई, कुल ब्याज और ऋण परिशोधन अनुसूची की सटीक गणना करें।',
      seoTitle: 'होम लोन ईएमआई कैलकुलेटर – मासिक किस्त व ब्याज की गणना',
      seoDescription: 'मुफ्त ऑनलाइन होम लोन कैलकुलेटर। मासिक ईएमआई, ब्याज दर और कुल पुनर्भुगतान अनुसूची की तुरंत जांच करें।',
      keywords: ['होम लोन कैलकुलेटर', 'गृह ऋण ईएमआई', 'लोन किस्त कैलकुलेटर', 'ब्याज दर गणना'],
    },
  },

  'bmi-calculator': {
    es: {
      name: 'Calculadora de IMC',
      shortDescription: 'Calcula tu índice de masa corporal (IMC) para conocer tu categoría de peso saludable y rango ideal.',
      seoTitle: 'Calculadora de IMC – Índice de Masa Corporal Online Gratis',
      seoDescription: 'Calcula tu índice de masa corporal (IMC) al instante. Conoce tu peso ideal según los estándares de la OMS.',
      keywords: ['calculadora de imc', 'calcular imc', 'indice de masa corporal', 'peso ideal'],
    },
    fr: {
      name: 'Calculateur d’IMC',
      shortDescription: 'Calculez votre indice de masse corporelle (IMC) et découvrez votre tranche de corpulence selon l’OMS.',
      seoTitle: 'Calculateur d’IMC – Calculez votre Indice de Masse Corporelle',
      seoDescription: 'Calculateur d’IMC gratuit. Évaluez votre corpulence, votre poids idéal et recevez des conseils de santé selon l’OMS.',
      keywords: ['calculateur imc', 'calculer imc', 'indice de masse corporelle', 'poids ideal femme homme'],
    },
    de: {
      name: 'BMI-Rechner',
      shortDescription: 'Ermitteln Sie Ihren Body-Mass-Index (BMI) und erfahren Sie Ihre persönliche Gewichtskategorie laut WHO.',
      seoTitle: 'BMI-Rechner – Body-Mass-Index Online Berechnen',
      seoDescription: 'Kostenloser BMI-Rechner für Erwachsene und Jugendliche. Berechnen Sie Ihren Body-Mass-Index und Ihr Idealgewicht.',
      keywords: ['bmi rechner', 'body mass index berechnen', 'idealgewicht rechner', 'normalgewicht'],
    },
    pt: {
      name: 'Calculadora de IMC',
      shortDescription: 'Calcule seu Índice de Massa Corporal (IMC) e saiba se você está no peso ideal de acordo com a OMS.',
      seoTitle: 'Calculadora de IMC – Calcule seu Índice de Massa Corporal Grátis',
      seoDescription: 'Calcule seu IMC em segundos. Descubra sua faixa de peso, peso ideal e orientações de saúde personalizadas.',
      keywords: ['calculadora de imc', 'calcular imc', 'indice de massa corporal', 'tabela imc'],
    },
    hi: {
      name: 'बीएमआई (BMI) कैलकुलेटर',
      shortDescription: 'अपने बॉडी मास इंडेक्स (BMI) की गणना करें और जानें कि क्या आपका वजन स्वस्थ और सामान्य श्रेणी में है।',
      seoTitle: 'बीएमआई कैलकुलेटर – बॉडी मास इंडेक्स ऑनलाइन जांचें',
      seoDescription: 'मुफ्त बीएमआई कैलकुलेटर। डब्ल्यूएचओ मानकों के अनुसार अपना बॉडी मास इंडेक्स, आदर्श वजन और स्वास्थ्य श्रेणी तुरंत जानें।',
      keywords: ['बीएमआई कैलकुलेटर', 'बॉडी मास इंडेक्स', 'आदर्श वजन', 'स्वस्थ वजन कैलकुलेटर'],
    },
  },

  'age-calculator': {
    es: {
      name: 'Calculadora de Edad',
      shortDescription: 'Calcula tu edad exacta en años, meses, días, horas y minutos a partir de tu fecha de nacimiento.',
      seoTitle: 'Calculadora de Edad – Calcular Edad Exacta Online Gratis',
      seoDescription: 'Calculadora de edad cronológica gratuita. Descubre exactamente cuántos años, meses, días y minutos has vivido.',
      keywords: ['calculadora de edad', 'calcular edad exacta', 'cuantos anos tengo', 'edad por fecha de nacimiento'],
    },
    fr: {
      name: 'Calculateur d’Âge',
      shortDescription: 'Calculez votre âge précis en années, mois, jours, heures et secondes à partir de votre date de naissance.',
      seoTitle: 'Calculateur d’Âge – Calculer son Âge Exact en Ligne',
      seoDescription: 'Calculateur d’âge précis et gratuit. Connaissez votre âge en années, mois, jours et le temps restant avant votre anniversaire.',
      keywords: ['calculateur age', 'calculer mon age', 'age exact date naissance', 'combien de jours ai-je'],
    },
    de: {
      name: 'Altersrechner',
      shortDescription: 'Berechnen Sie Ihr exaktes Alter in Jahren, Monaten, Tagen, Stunden und Minuten ab Ihrem Geburtsdatum.',
      seoTitle: 'Altersrechner – Exaktes Alter Online Berechnen',
      seoDescription: 'Kostenloser Altersrechner. Finden Sie sekundengenau heraus, wie alt Sie in Jahren, Monaten und Tagen sind.',
      keywords: ['altersrechner', 'wie alt bin ich', 'alter berechnen geburtsdatum', 'lebensalter rechner'],
    },
    pt: {
      name: 'Calculadora de Idade',
      shortDescription: 'Calcule sua idade exata em anos, meses, dias, horas e minutos com base na data do seu nascimento.',
      seoTitle: 'Calculadora de Idade – Calcular Idade Exata Online Grátis',
      seoDescription: 'Calculadora de idade exata. Descubra quantos anos, meses, dias e minutos de vida você tem com facilidade.',
      keywords: ['calculadora de idade', 'calcular idade exata', 'quantos anos eu tenho', 'idade por data de nascimento'],
    },
    hi: {
      name: 'आयु कैलकुलेटर',
      shortDescription: 'अपनी जन्मतिथि से वर्षों, महीनों, दिनों, घंटों और मिनटों में अपनी सटीक आयु की गणना करें।',
      seoTitle: 'आयु कैलकुलेटर – जन्मतिथि से सटीक उम्र की गणना करें',
      seoDescription: 'मुफ्त ऑनलाइन आयु कैलकुलेटर। जन्मतिथि दर्ज करें और जानें कि आप कितने वर्ष, माह और दिन के हो चुके हैं।',
      keywords: ['आयु कैलकुलेटर', 'उम्र कैलकुलेटर', 'जन्मतिथि से उम्र', 'सटीक आयु निकालें'],
    },
  },

  'compound-interest-calculator': {
    es: {
      name: 'Calculadora de Interés Compuesto',
      shortDescription: 'Simula el crecimiento de tus inversiones y ahorros gracias al poder del interés compuesto a lo largo del tiempo.',
      seoTitle: 'Calculadora de Interés Compuesto – Crecimiento de Ahorro Online',
      seoDescription: 'Calcula el interés compuesto de tus ahorros e inversiones. Visualiza gráficos de crecimiento con aportaciones periódicas.',
      keywords: ['calculadora interes compuesto', 'interes compuesto online', 'calcular rendimiento inversion', 'formula interes compuesto'],
    },
    fr: {
      name: 'Calculateur d’Intérêts Composés',
      shortDescription: 'Visualisez la croissance de votre capital et de vos investissements grâce à la puissance des intérêts composés.',
      seoTitle: 'Calculateur d’Intérêts Composés – Épargne & Rendement en Ligne',
      seoDescription: 'Simulateur d’intérêts composés gratuit. Calculez la fructification de votre épargne avec versements mensuels.',
      keywords: ['calculateur interets composes', 'interet compose formule', 'calcul epargne', 'rendement placement'],
    },
    de: {
      name: 'Zinseszinsrechner',
      shortDescription: 'Berechnen Sie das exponentielle Wachstum Ihrer Ersparnisse und Geldanlagen durch den Zinseszinseffekt.',
      seoTitle: 'Zinseszinsrechner – Vermögensaufbau & Sparplan Online',
      seoDescription: 'Kostenloser Zinseszinsrechner mit Sparplan-Funktion. Berechnen Sie Endkapital, Zinsgewinne und Wertentwicklung.',
      keywords: ['zinseszinsrechner', 'zinseszins berechnen', 'sparplan rechner', 'vermoegensaufbau online'],
    },
    pt: {
      name: 'Calculadora de Juros Compostos',
      shortDescription: 'Calcule o crescimento do seu dinheiro e investimentos ao longo dos anos com o efeito dos juros sobre juros.',
      seoTitle: 'Calculadora de Juros Compostos – Simule Investimentos Online',
      seoDescription: 'Calculadora de juros compostos online grátis. Veja quanto seus aportes mensais e investimentos vão render no futuro.',
      keywords: ['calculadora juros compostos', 'simulador juros compostos', 'calcular rendimento poupanca', 'formula juros compostos'],
    },
    hi: {
      name: 'चक्रवृद्धि ब्याज कैलकुलेटर',
      shortDescription: 'समय के साथ चक्रवृद्धि ब्याज की शक्ति से अपने निवेश और बचत की वृद्धि का सटीक अनुमान लगाएं।',
      seoTitle: 'चक्रवृद्धि ब्याज कैलकुलेटर – कंपाउंड इंटरेस्ट ऑनलाइन गणना',
      seoDescription: 'मुफ्त चक्रवृद्धि ब्याज कैलकुलेटर। मासिक जमा और विभिन्न ब्याज दरों के साथ अपने निवेश का भविष्य मूल्य देखें।',
      keywords: ['चक्रवृद्धि ब्याज कैलकुलेटर', 'कंपाउंड इंटरेस्ट कैलकुलेटर', 'निवेश रिटर्न', 'बचत योजना कैलकुलेटर'],
    },
  },

  'tip-calculator': {
    es: {
      name: 'Calculadora de Propinas',
      shortDescription: 'Calcula rápidamente la propina adecuada y divide la cuenta entre amigos de manera justa y sencilla.',
      seoTitle: 'Calculadora de Propinas – Dividir Cuenta de Restaurante Online',
      seoDescription: 'Calcula la propina perfecta y divide el total de la cuenta entre comensales en segundos. Gratis y sin complicaciones.',
      keywords: ['calculadora de propinas', 'calcular propina', 'dividir cuenta restaurante', 'cuanto dar de propina'],
    },
    fr: {
      name: 'Calculateur de Pourboire',
      shortDescription: 'Calculez le pourboire adéquat et partagez facilement l’addition entre amis au restaurant.',
      seoTitle: 'Calculateur de Pourboire – Partager l’Addition en Ligne',
      seoDescription: 'Calculateur de pourboire gratuit. Déterminez le pourboire et répartissez la note du restaurant par personne instantanément.',
      keywords: ['calculateur de pourboire', 'calculer pourboire', 'partager addition restaurant', 'pourboire par personne'],
    },
    de: {
      name: 'Trinkgeldrechner',
      shortDescription: 'Berechnen Sie das passende Trinkgeld und teilen Sie die Restaurantrechnung fair unter allen Personen auf.',
      seoTitle: 'Trinkgeldrechner – Restaurantrechnung Fair Teilen Online',
      seoDescription: 'Kostenloser Trinkgeldrechner. Berechnen Sie den angemessenen Trinkgeldbetrag und teilen Sie Rechnungen schnell auf.',
      keywords: ['trinkgeldrechner', 'trinkgeld berechnen', 'rechnung teilen restaurant', 'wieviel trinkgeld'],
    },
    pt: {
      name: 'Calculadora de Gorjeta',
      shortDescription: 'Calcule a gorjeta ideal e divida a conta do restaurante ou bar entre amigos com facilidade.',
      seoTitle: 'Calculadora de Gorjeta – Dividir Conta de Bar e Restaurante',
      seoDescription: 'Calculadora de gorjeta grátis. Calcule os 10% ou qualquer porcentagem de serviço e divida o valor por pessoa.',
      keywords: ['calculadora de gorjeta', 'calcular gorjeta', 'dividir conta restaurante', 'taxa de servico'],
    },
    hi: {
      name: 'टिप कैलकुलेटर',
      shortDescription: 'उचित टिप की गणना करें और रेस्तरां बिल को दोस्तों के बीच आसानी और निष्पक्षता से विभाजित करें।',
      seoTitle: 'टिप कैलकुलेटर – रेस्तरां बिल विभाजन ऑनलाइन टूल',
      seoDescription: 'मुफ्त टिप कैलकुलेटर। कुल बिल, टिप प्रतिशत और प्रति व्यक्ति हिस्सा तुरंत और आसानी से निकालें।',
      keywords: ['टिप कैलकुलेटर', 'रेस्तरां बिल विभाजन', 'टिप राशि गणना', 'प्रति व्यक्ति बिल'],
    },
  },

  'loan-calculator': {
    es: {
      name: 'Calculadora de Préstamos',
      shortDescription: 'Calcula cuotas mensuales, tasas de interés efectivas y el coste total de cualquier préstamo personal o comercial.',
      seoTitle: 'Calculadora de Préstamos – Cuota Mensual y Coste Total Online',
      seoDescription: 'Simula cualquier préstamo personal, automotriz o de consumo. Conoce el desglose exacto de cuotas e intereses.',
      keywords: ['calculadora de prestamos', 'simulador de credito', 'calcular cuota prestamo', 'tabla amortizacion prestamo'],
    },
    fr: {
      name: 'Calculateur de Prêt & Crédit',
      shortDescription: 'Calculez le montant de vos mensualités, le coût total du crédit et la répartition du capital et des intérêts.',
      seoTitle: 'Calculateur de Prêt – Simulation de Crédit et Mensualités',
      seoDescription: 'Simulateur de crédit gratuit. Calculez les mensualités, les intérêts totaux et le coût réel de votre emprunt.',
      keywords: ['calculateur de pret', 'simulation credit', 'mensualite credit consommation', 'cout emprunt'],
    },
    de: {
      name: 'Kreditrechner',
      shortDescription: 'Berechnen Sie Monatsraten, Gesamtzinsen und Laufzeiten für Ratenkredite, Autokredite und Konsumentendarlehen.',
      seoTitle: 'Kreditrechner – Monatliche Raten & Zinsen Online Berechnen',
      seoDescription: 'Kostenloser Kreditrechner für Ratenkredite und Darlehen. Ermitteln Sie die monatliche Belastung und Gesamtkosten.',
      keywords: ['kreditrechner', 'darlehensrechner', 'kreditrate berechnen', 'zinsen kredit'],
    },
    pt: {
      name: 'Calculadora de Empréstimo',
      shortDescription: 'Simule parcelas mensais, taxa de juros e o custo efetivo total de qualquer empréstimo ou crédito pessoal.',
      seoTitle: 'Calculadora de Empréstimo – Simulação de Crédito e Parcelas',
      seoDescription: 'Calcule parcelas de empréstimo pessoal ou consignado. Saiba o total a pagar e o impacto dos juros no seu orçamento.',
      keywords: ['calculadora de emprestimo', 'simulador de credito', 'calcular parcela emprestimo', 'juros de emprestimo'],
    },
    hi: {
      name: 'ऋण (लोन) कैलकुलेटर',
      shortDescription: 'व्यक्तिगत या व्यावसायिक ऋण की मासिक ईएमआई, ब्याज दर और कुल पुनर्भुगतान लागत की गणना करें।',
      seoTitle: 'ऋण कैलकुलेटर – पर्सनल व बिजनेस लोन ईएमआई गणना',
      seoDescription: 'मुफ्त ऑनलाइन लोन कैलकुलेटर। अपने ऋण की मासिक किस्त, कुल ब्याज और पुनर्भुगतान अनुसूची की तुरंत जांच करें।',
      keywords: ['लोन कैलकुलेटर', 'ऋण ईएमआई', 'पर्सनल लोन किस्त', 'ब्याज दर कैलकुलेटर'],
    },
  },

  'scientific-calculator': {
    es: {
      name: 'Calculadora Científica',
      shortDescription: 'Calculadora científica avanzada con trigonometría, logaritmos, exponentes, constantes y funciones algebraicas.',
      seoTitle: 'Calculadora Científica Online Gratis – Funciones Matemáticas Completas',
      seoDescription: 'Calculadora científica online completa. Resuelve trigonometría (sin, cos, tan), logaritmos, raíces y potencias gratis.',
      keywords: ['calculadora cientifica', 'calculadora cientifica online', 'seno coseno tangente', 'calculadora matematica'],
    },
    fr: {
      name: 'Calculatrice Scientifique',
      shortDescription: 'Calculatrice scientifique avancée avec trigonométrie, logarithmes, exposants et constantes mathématiques.',
      seoTitle: 'Calculatrice Scientifique en Ligne Gratuite – Fonctions Complètes',
      seoDescription: 'Calculatrice scientifique complète en ligne. Fonctions trigonométriques, logarithmiques, puissances et racines carrées.',
      keywords: ['calculatrice scientifique', 'calculatrice en ligne', 'trigonometrie en ligne', 'sinus cosinus'],
    },
    de: {
      name: 'Wissenschaftlicher Rechner',
      shortDescription: 'Fortgeschrittener wissenschaftlicher Rechner mit Trigonometrie, Logarithmen, Potenzen und mathematischen Konstanten.',
      seoTitle: 'Wissenschaftlicher Rechner Online – Kostenlos & Präzise',
      seoDescription: 'Kostenloser wissenschaftlicher Online-Rechner. Trigonometrische Funktionen (sin, cos, tan), Logarithmen, Wurzeln und Potenzen.',
      keywords: ['wissenschaftlicher rechner', 'taschenrechner online', 'trigonometrie rechner', 'schulrechner online'],
    },
    pt: {
      name: 'Calculadora Científica',
      shortDescription: 'Calculadora científica online completa com trigonometria, logaritmos, expoentes e funções matemáticas avançadas.',
      seoTitle: 'Calculadora Científica Online Grátis – Funções Matemáticas Avançadas',
      seoDescription: 'Calculadora científica gratuita e completa. Calcule seno, cosseno, tangente, logaritmos, raízes e potências no navegador.',
      keywords: ['calculadora cientifica', 'calculadora cientifica online', 'seno cosseno', 'calculadora de funcoes'],
    },
    hi: {
      name: 'वैज्ञानिक कैलकुलेटर',
      shortDescription: 'त्रिकोणमिति, लघुगणक (लॉग), घातांक और उन्नत गणितीय कार्यों के साथ पूर्ण वैज्ञानिक कैलकुलेटर।',
      seoTitle: 'वैज्ञानिक कैलकुलेटर ऑनलाइन मुफ्त – त्रिकोणमिति व बीजगणित टूल',
      seoDescription: 'पूर्ण ऑनलाइन वैज्ञानिक कैलकुलेटर। sin, cos, tan, लॉग, वर्गमूल और घातांक की मुफ्त और त्वरित गणना करें।',
      keywords: ['वैज्ञानिक कैलकुलेटर', 'साइंटिफिक कैलकुलेटर', 'त्रिकोणमिति कैलकुलेटर', 'ऑनलाइन गणित कैलकुलेटर'],
    },
  },

  'gpa-calculator': {
    es: {
      name: 'Calculadora de Promedio (GPA)',
      shortDescription: 'Calcula tu promedio ponderado de calificaciones (GPA o escala de notas) según créditos y calificaciones de asignaturas.',
      seoTitle: 'Calculadora de GPA y Promedio – Calcular Calificaciones Online',
      seoDescription: 'Calcula tu promedio escolar o universitario ponderado fácilmente. Soporta escalas de 4.0, 5.0 y 10.',
      keywords: ['calculadora de gpa', 'calcular promedio notas', 'promedio ponderado universidad', 'escala de calificaciones'],
    },
    fr: {
      name: 'Calculateur de Moyenne & GPA',
      shortDescription: 'Calculez votre moyenne générale pondérée et votre GPA universitaire selon les coefficients et crédits ECTS.',
      seoTitle: 'Calculateur de Moyenne et GPA – Calcul Universitaire & Scolaire',
      seoDescription: 'Calculateur de moyenne gratuit pour lycée et université. Calculez votre moyenne avec coefficients et équivalence GPA.',
      keywords: ['calculateur de moyenne', 'calculer moyenne generale', 'calcul gpa', 'moyenne avec coefficients'],
    },
    de: {
      name: 'Notendurchschnittsrechner (GPA)',
      shortDescription: 'Berechnen Sie Ihren Notendurchschnitt an Schule oder Hochschule unter Berücksichtigung von Leistungspunkten (ECTS).',
      seoTitle: 'Notendurchschnittsrechner – GPA & Noten Berechnen Online',
      seoDescription: 'Kostenloser Notendurchschnittsrechner für Abitur, Studium und Ausbildung. Gewichtung nach ECTS-Punkten und Credits.',
      keywords: ['notendurchschnittsrechner', 'notenschnitt berechnen', 'gpa rechner', 'ects rechner'],
    },
    pt: {
      name: 'Calculadora de Média Escolar (GPA)',
      shortDescription: 'Calcule sua média ponderada escolar ou acadêmica (GPA/CR) com base nas notas e carga horária das disciplinas.',
      seoTitle: 'Calculadora de Média e GPA – Calcular Coeficiente de Rendimento',
      seoDescription: 'Calcule sua média escolar e coeficiente de rendimento universitário com pesos e créditos de forma simples.',
      keywords: ['calculadora de media', 'calcular gpa', 'coeficiente de rendimento', 'media ponderada faculdade'],
    },
    hi: {
      name: 'जीपीए (GPA) व ग्रेड कैलकुलेटर',
      shortDescription: 'विषय क्रेडिट और प्राप्त ग्रेड के आधार पर अपने भारित ग्रेड प्वाइंट औसत (GPA) की गणना करें।',
      seoTitle: 'जीपीए कैलकुलेटर – कॉलेज व स्कूल ग्रेड औसत निकालें',
      seoDescription: 'मुफ्त जीपीए और ग्रेड कैलकुलेटर। अपने सेमेस्टर या डिग्री का भारित औसत और सीजीपीए तुरंत निकालें।',
      keywords: ['जीपीए कैलकुलेटर', 'ग्रेड प्वाइंट औसत', 'सीजीपीए कैलकुलेटर', 'कॉलेज मार्क्स एवरेज'],
    },
  },

  'time-calculator': {
    es: {
      name: 'Calculadora de Tiempo',
      shortDescription: 'Suma, resta y calcula intervalos de horas, minutos y segundos entre diferentes marcas temporales.',
      seoTitle: 'Calculadora de Tiempo – Sumar y Restar Horas Online',
      seoDescription: 'Calculadora de tiempo online. Suma y resta horas, minutos y segundos para calcular jornadas de trabajo y duraciones.',
      keywords: ['calculadora de tiempo', 'sumar horas', 'restar tiempo', 'calcular horas trabajadas'],
    },
    fr: {
      name: 'Calculateur de Temps & Heures',
      shortDescription: 'Additionnez, soustrayez et calculez les intervalles d’heures, minutes et secondes avec précision.',
      seoTitle: 'Calculateur de Temps – Additionner et Soustraire des Heures',
      seoDescription: 'Outil gratuit pour calculer le temps. Additionnez et soustrayez heures, minutes et secondes pour vos feuilles d’heures.',
      keywords: ['calculateur de temps', 'calculer des heures', 'additionner des heures', 'calcul temps de travail'],
    },
    de: {
      name: 'Zeitrechner',
      shortDescription: 'Addieren, subtrahieren und berechnen Sie Zeitspannen in Stunden, Minuten und Sekunden präzise.',
      seoTitle: 'Zeitrechner – Stunden und Minuten Berechnen Online',
      seoDescription: 'Kostenloser Zeitrechner zum Addieren und Subtrahieren von Arbeitszeiten, Stunden, Minuten und Sekunden.',
      keywords: ['zeitrechner', 'stunden zusammenrechnen', 'arbeitszeit rechner', 'minuten addieren'],
    },
    pt: {
      name: 'Calculadora de Tempo',
      shortDescription: 'Some, subtraia e calcule intervalos de horas, minutos e segundos com total exatidão.',
      seoTitle: 'Calculadora de Tempo – Somar e Subtrair Horas Online',
      seoDescription: 'Calculadora de tempo online grátis. Some horas trabalhadas, converta minutos e calcule durações facilmente.',
      keywords: ['calculadora de tempo', 'somar horas', 'subtrair minutos', 'calcular horas extras'],
    },
    hi: {
      name: 'समय कैलकुलेटर',
      shortDescription: 'घंटों, मिनटों और सेकंडों को जोड़ें, घटाएं और समय अंतरालों की सटीक गणना करें।',
      seoTitle: 'समय कैलकुलेटर – घंटे व मिनट जोड़ें और घटाएं ऑनलाइन',
      seoDescription: 'मुफ्त ऑनलाइन समय कैलकुलेटर। कार्य घंटे, समय अंतर और अवधि की तुरंत और सटीक गणना करें।',
      keywords: ['समय कैलकुलेटर', 'घंटे जोड़ें', 'समय का अंतर', 'कार्य समय कैलकुलेटर'],
    },
  },

  'word-counter': {
    es: {
      name: 'Contador de Palabras y Caracteres',
      shortDescription: 'Cuenta palabras, caracteres con y sin espacios, oraciones, párrafos y tiempo estimado de lectura en tiempo real.',
      seoTitle: 'Contador de Palabras y Caracteres Online Gratis',
      seoDescription: 'Herramienta online gratuita para contar palabras y caracteres en cualquier texto. Incluye tiempo de lectura y estadísticas.',
      keywords: ['contador de palabras', 'contar caracteres', 'contador de texto', 'longitud de texto'],
    },
    fr: {
      name: 'Compteur de Mots et Caractères',
      shortDescription: 'Comptez instantanément le nombre de mots, caractères (avec ou sans espaces), phrases et temps de lecture.',
      seoTitle: 'Compteur de Mots et Caractères en Ligne Gratuit',
      seoDescription: 'Compteur de mots gratuit. Analysez la longueur de vos textes, articles et devoirs en temps réel.',
      keywords: ['compteur de mots', 'compter les caracteres', 'nombre de mots en ligne', 'statistiques texte'],
    },
    de: {
      name: 'Wort- und Zeichenzähler',
      shortDescription: 'Zählen Sie Wörter, Zeichen mit und ohne Leerzeichen, Sätze, Absätze und Lesezeit in Echtzeit.',
      seoTitle: 'Wort- und Zeichenzähler Online – Kostenlos & Direkt',
      seoDescription: 'Kostenloser Online-Wortzähler. Ermitteln Sie die genaue Anzahl an Wörtern und Zeichen für Ihre Texte und Hausarbeiten.',
      keywords: ['wortzaehler', 'zeichen zaehlen', 'woerter zaehlen online', 'zeichenanzahl'],
    },
    pt: {
      name: 'Contador de Palavras e Caracteres',
      shortDescription: 'Conte palavras, caracteres com e sem espaços, frases, parágrafos e tempo estimado de leitura em tempo real.',
      seoTitle: 'Contador de Palavras e Caracteres Online Grátis',
      seoDescription: 'Contador de palavras e caracteres gratuito. Analise seus textos, redações e publicações para redes sociais.',
      keywords: ['contador de palavras', 'contar caracteres', 'contagem de palavras online', 'tamanho de texto'],
    },
    hi: {
      name: 'शब्द एवं वर्ण (अक्षर) गणक',
      shortDescription: 'अपने पाठ में शब्दों, वर्णों, वाक्यों, पैराग्राफ और अनुमानित पढ़ने के समय की वास्तविक समय में गणना करें।',
      seoTitle: 'शब्द व अक्षर गणक – ऑनलाइन वर्ड व कैरेक्टर काउंटर',
      seoDescription: 'मुफ्त ऑनलाइन शब्द गणक। अपने निबंध, लेख या पोस्ट में शब्दों और अक्षरों की सटीक संख्या तुरंत जांचें।',
      keywords: ['शब्द गणक', 'वर्ड काउंटर', 'अक्षर गणक', 'शब्दों की संख्या'],
    },
  },

  'ip-subnet-calculator': {
    es: {
      name: 'Calculadora de Subredes IP',
      shortDescription: 'Calcula rangos de red, máscaras de subred CIDR, dirección de broadcast, IPs utilizables y comodines.',
      seoTitle: 'Calculadora de Subredes IP (CIDR) Online Gratis',
      seoDescription: 'Herramienta de cálculo de subredes IPv4. Obtén máscara de red, primer y último host, broadcast y notación CIDR.',
      keywords: ['calculadora de subredes', 'subnet calculator', 'mascara de subred', 'calculo cidr ip'],
    },
    fr: {
      name: 'Calculateur de Sous-Réseau IP',
      shortDescription: 'Calculez les plages d’adresses IP, les masques CIDR, l’adresse de broadcast et le nombre d’hôtes disponibles.',
      seoTitle: 'Calculateur de Sous-Réseau IP (CIDR) en Ligne',
      seoDescription: 'Calculateur de sous-réseau IPv4 gratuit. Calculez masque réseau, broadcast et plages d’adresses IP utilisables.',
      keywords: ['calculateur sous reseau', 'calcul masque ip', 'plage ip cidr', 'calculateur ipv4'],
    },
    de: {
      name: 'IP-Subnetzrechner',
      shortDescription: 'Berechnen Sie Netzwerkadressen, CIDR-Subnetzmasken, Broadcast-Adressen und nutzbare Host-Bereiche für IPv4.',
      seoTitle: 'IP-Subnetzrechner – CIDR & Subnetting Online Berechnen',
      seoDescription: 'Kostenloser IP-Subnetzrechner. Ermitteln Sie Netzmaske, Broadcast, Hostanzahl und IP-Bereiche für IPv4-Netzwerke.',
      keywords: ['subnetzrechner', 'ip subnetz berechnen', 'cidr rechner', 'netzmaske berechnen'],
    },
    pt: {
      name: 'Calculadora de Sub-rede IP',
      shortDescription: 'Calcule faixas de IP, máscara de sub-rede CIDR, endereço de broadcast e quantidade de hosts válidos.',
      seoTitle: 'Calculadora de Sub-rede IP (CIDR) Online Grátis',
      seoDescription: 'Calculadora de sub-redes IPv4 gratuita. Obtenha máscara de sub-rede, IP de rede, broadcast e faixa de hosts utilizáveis.',
      keywords: ['calculadora de sub-rede', 'calcular mascara ip', 'notacao cidr', 'calculo subnet ipv4'],
    },
    hi: {
      name: 'आईपी सबनेट कैलकुलेटर',
      shortDescription: 'IPv4 के लिए नेटवर्क पता, CIDR सबनेट मास्क, ब्रॉडकास्ट पता और प्रयोग करने योग्य होस्ट श्रेणी की गणना करें।',
      seoTitle: 'आईपी सबनेट कैलकुलेटर – CIDR व नेटवर्क एड्रेस टूल',
      seoDescription: 'मुफ्त ऑनलाइन आईपी सबनेट कैलकुलेटर। सीआईडीआर संकेतन, नेटमास्क और उपयोगी आईपी पतों की तुरंत गणना करें।',
      keywords: ['आईपी सबनेट कैलकुलेटर', 'सबनेटिंग टूल', 'सीआईडीआर कैलकुलेटर', 'नेटवर्क एड्रेस'],
    },
  },
};
