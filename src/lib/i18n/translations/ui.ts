import { Locale } from '../config';

export interface UiTranslations {
  // Navigation
  navCalculators: string;
  navCategories: string;
  navPopular: string;
  navNew: string;
  navAbout: string;
  navContact: string;
  navPrivacy: string;
  navTerms: string;
  navDisclaimer: string;

  // Brand & Tagline
  tagline: string;
  description: string;
  studentBadge: string;
  studentNote: string;
  privacyBadge: string;
  connectFollow: string;

  // Search
  searchPlaceholder: string;
  searchHeader: string;
  searchSubheader: string;
  pressK: string;
  noResults: string;
  searchSuggestions: string;
  escToClose: string;
  selectToOpen: string;

  // Actions
  calculate: string;
  reset: string;
  copyResult: string;
  copied: string;
  share: string;
  shared: string;
  addToFavorites: string;
  savedToFavorites: string;
  favorites: string;
  recentlyUsed: string;
  clear: string;

  // Sections
  popularTitle: string;
  popularSubtitle: string;
  viewAllPopular: string;
  browseByCategory: string;
  exploreCategories: string;
  viewAllCategories: string;
  recentlyAddedTitle: string;
  recentlyAddedSubtitle: string;
  viewNewTools: string;
  howItWorksTitle: string;
  whyCalculatTitle: string;
  whyCalculatSubtitle: string;
  instantFastTitle: string;
  instantFastDesc: string;
  privacyTitle: string;
  privacyDesc: string;
  directoryTitle: string;
  directoryDesc: string;
  alwaysFreeTitle: string;
  alwaysFreeDesc: string;

  // Directory UI
  directoryHeader: string;
  directorySubheader: string;
  allCategoriesFilter: string;
  sortBy: string;
  sortPopular: string;
  sortAlpha: string;
  sortNewest: string;
  searchInDirectory: string;
  viewGrid: string;
  viewList: string;
  toolsCount: (count: number) => string;
  comingSoon: string;

  // Calculator Page
  formulaAndMethod: string;
  workedExample: string;
  faqsTitle: string;
  relatedCalculators: string;
  breadcrumbsHome: string;
  backToCalculators: string;
  readFullStory: string;
  suggestTool: string;
  language: string;
}

export const UI_TRANSLATIONS: Record<Locale, UiTranslations> = {
  en: {
    navCalculators: 'Calculators',
    navCategories: 'Categories',
    navPopular: 'Popular',
    navNew: 'New',
    navAbout: 'About',
    navContact: 'Contact',
    navPrivacy: 'Privacy Policy',
    navTerms: 'Terms of Service',
    navDisclaimer: 'Disclaimer',

    tagline: 'All Calculators, One Place.',
    description:
      'Free, fast, and accurate online calculator directory. Clean directory-first search engine for calculation tools.',
    studentBadge: 'Independent Student Project:',
    studentNote: '100% free, no ads, no paywalls. Bookmark (⌘D) and share with a friend!',
    privacyBadge: 'Calculations are performed locally in your browser. Zero tracking of your numbers.',
    connectFollow: 'Connect & Follow:',

    searchPlaceholder: 'What do you want to calculate? (e.g. mortgage, percentage, bmi)',
    searchHeader: 'Search Calculators',
    searchSubheader: 'Search across titles, categories, formulas, and keywords',
    pressK: 'Press ⌘K',
    noResults: 'No calculators found',
    searchSuggestions: 'Try searching for percentage, mortgage, age, or browse by category.',
    escToClose: 'ESC to close',
    selectToOpen: '↵ to open',

    calculate: 'Calculate',
    reset: 'Reset',
    copyResult: 'Copy Result',
    copied: 'Copied!',
    share: 'Share',
    shared: 'Link copied!',
    addToFavorites: 'Add to Favorites',
    savedToFavorites: 'Saved to Favorites',
    favorites: 'Favorites:',
    recentlyUsed: 'Recently Used:',
    clear: 'Clear',

    popularTitle: 'Popular Calculators',
    popularSubtitle: 'The most frequently used tools in our directory',
    viewAllPopular: 'View all popular',
    browseByCategory: 'Browse by Category',
    exploreCategories: 'Explore calculators organized across 16 primary categories',
    viewAllCategories: 'View All 16 Categories →',
    recentlyAddedTitle: 'Recently Added',
    recentlyAddedSubtitle: 'Latest calculation utilities added to Calculat.dev',
    viewNewTools: 'View new tools',
    howItWorksTitle: 'How Calculat Works',
    whyCalculatTitle: 'Why Use Calculat?',
    whyCalculatSubtitle: 'Calculat is designed as a fast, distraction-free calculation engine and utility directory.',
    instantFastTitle: 'Instant & Fast',
    instantFastDesc: 'Calculations execute in real-time as you type, with zero server round-trips or loading delays.',
    privacyTitle: '100% Privacy Friendly',
    privacyDesc: 'Your financial, health, and personal numbers stay exclusively inside your browser. No data logging.',
    directoryTitle: 'Directory First',
    directoryDesc: 'Organized logically by topic. Search by name, formula, keyword, or browse by domain category.',
    alwaysFreeTitle: 'Always Free',
    alwaysFreeDesc: 'No accounts, no paywalls, and no deceptive ads placed over inputs or results.',

    directoryHeader: 'All Calculators Directory',
    directorySubheader: 'Comprehensive directory of free online calculators for math, finance, health, dates, and everyday use.',
    allCategoriesFilter: 'All Categories',
    sortBy: 'Sort by:',
    sortPopular: 'Popular',
    sortAlpha: 'A–Z',
    sortNewest: 'Newest',
    searchInDirectory: 'Filter by title, formula, or keyword...',
    viewGrid: 'Grid',
    viewList: 'List',
    toolsCount: (c: number) => `${c} tool${c === 1 ? '' : 's'} available`,
    comingSoon: 'Coming soon',

    formulaAndMethod: 'Formula & Method',
    workedExample: 'Step-by-Step Worked Example',
    faqsTitle: 'Frequently Asked Questions',
    relatedCalculators: 'Related Calculators',
    breadcrumbsHome: 'Home',
    backToCalculators: 'Browse All Calculators',
    readFullStory: 'Read the full story',
    suggestTool: 'Need a different tool? Suggest it',
    language: 'Language',
  },

  es: {
    navCalculators: 'Calculadoras',
    navCategories: 'Categorías',
    navPopular: 'Populares',
    navNew: 'Nuevas',
    navAbout: 'Acerca de',
    navContact: 'Contacto',
    navPrivacy: 'Política de Privacidad',
    navTerms: 'Términos de Servicio',
    navDisclaimer: 'Aviso Legal',

    tagline: 'Todas las calculadoras en un solo lugar.',
    description:
      'Directorio de calculadoras online gratuitas, rápidas y precisas. Herramientas limpias sin publicidad invasiva.',
    studentBadge: 'Proyecto Estudiantil Independiente:',
    studentNote: '100% gratis, sin anuncios ni muros de pago. ¡Guarda en marcadores (⌘D) y comparte!',
    privacyBadge: 'Los cálculos se realizan localmente en tu navegador. Cero rastreo de tus datos.',
    connectFollow: 'Conéctate y síguenos:',

    searchPlaceholder: '¿Qué deseas calcular? (ej. hipoteca, porcentaje, imc)',
    searchHeader: 'Buscar Calculadoras',
    searchSubheader: 'Busca por títulos, categorías, fórmulas y palabras clave',
    pressK: 'Presiona ⌘K',
    noResults: 'No se encontraron calculadoras',
    searchSuggestions: 'Intenta buscar porcentaje, hipoteca, edad o explora por categoría.',
    escToClose: 'ESC para cerrar',
    selectToOpen: '↵ para abrir',

    calculate: 'Calcular',
    reset: 'Restablecer',
    copyResult: 'Copiar Resultado',
    copied: '¡Copiado!',
    share: 'Compartir',
    shared: '¡Enlace copiado!',
    addToFavorites: 'Añadir a Favoritos',
    savedToFavorites: 'Guardado en Favoritos',
    favorites: 'Favoritos:',
    recentlyUsed: 'Usadas Recientemente:',
    clear: 'Limpiar',

    popularTitle: 'Calculadoras Populares',
    popularSubtitle: 'Las herramientas más utilizadas de nuestro directorio',
    viewAllPopular: 'Ver todas las populares',
    browseByCategory: 'Explorar por Categoría',
    exploreCategories: 'Calculadoras organizadas en 16 categorías principales',
    viewAllCategories: 'Ver las 16 Categorías →',
    recentlyAddedTitle: 'Añadidas Recientemente',
    recentlyAddedSubtitle: 'Últimas utilidades añadidas a Calculat.dev',
    viewNewTools: 'Ver herramientas nuevas',
    howItWorksTitle: 'Cómo Funciona Calculat',
    whyCalculatTitle: '¿Por Qué Usar Calculat?',
    whyCalculatSubtitle: 'Calculat fue diseñado como un motor de cálculo rápido, limpio y sin distracciones.',
    instantFastTitle: 'Instantáneo y Rápido',
    instantFastDesc: 'Los cálculos se ejecutan en tiempo real al escribir, sin demoras de carga del servidor.',
    privacyTitle: '100% Privado',
    privacyDesc: 'Tus cifras financieras y personales permanecen en tu navegador. Sin registro de datos.',
    directoryTitle: 'Directorio Ordenado',
    directoryDesc: 'Organizado lógicamente por tema. Busca por nombre, fórmula o categoría.',
    alwaysFreeTitle: 'Siempre Gratis',
    alwaysFreeDesc: 'Sin cuentas, sin muros de pago y sin anuncios molestos sobre los resultados.',

    directoryHeader: 'Directorio de Todas las Calculadoras',
    directorySubheader: 'Directorio exhaustivo de calculadoras online para matemáticas, finanzas, salud y vida diaria.',
    allCategoriesFilter: 'Todas las Categorías',
    sortBy: 'Ordenar por:',
    sortPopular: 'Populares',
    sortAlpha: 'A–Z',
    sortNewest: 'Más Nuevas',
    searchInDirectory: 'Filtrar por título, fórmula o palabra clave...',
    viewGrid: 'Cuadrícula',
    viewList: 'Lista',
    toolsCount: (c: number) => `${c} herramienta${c === 1 ? '' : 's'} disponible${c === 1 ? '' : 's'}`,
    comingSoon: 'Próximamente',

    formulaAndMethod: 'Fórmula y Método',
    workedExample: 'Ejemplo Paso a Paso',
    faqsTitle: 'Preguntas Frecuentes',
    relatedCalculators: 'Calculadoras Relacionadas',
    breadcrumbsHome: 'Inicio',
    backToCalculators: 'Ver Todas las Calculadoras',
    readFullStory: 'Leer la historia completa',
    suggestTool: '¿Necesitas otra herramienta? Sugiérela',
    language: 'Idioma',
  },

  fr: {
    navCalculators: 'Calculateurs',
    navCategories: 'Catégories',
    navPopular: 'Populaires',
    navNew: 'Nouveautés',
    navAbout: 'À propos',
    navContact: 'Contact',
    navPrivacy: 'Politique de Confidentialité',
    navTerms: 'Conditions d’Utilisation',
    navDisclaimer: 'Avertissement Légal',

    tagline: 'Tous les calculateurs en un seul endroit.',
    description:
      'Répertoire de calculateurs en ligne gratuits, rapides et précis. Des outils clairs sans publicités intrusives.',
    studentBadge: 'Projet Étudiant Indépendant :',
    studentNote: '100% gratuit, sans pub ni abonnement. Ajoutez aux favoris (⌘D) et partagez !',
    privacyBadge: 'Les calculs sont effectués localement dans votre navigateur. Zéro suivi de vos chiffres.',
    connectFollow: 'Suivez-nous :',

    searchPlaceholder: 'Que voulez-vous calculer ? (ex. prêt, pourcentage, imc)',
    searchHeader: 'Rechercher un Calculateur',
    searchSubheader: 'Recherchez par titre, catégorie, formule et mots-clés',
    pressK: 'Appuyez sur ⌘K',
    noResults: 'Aucun calculateur trouvé',
    searchSuggestions: 'Essayez pourcentage, prêt immobilier, âge ou explorez par catégorie.',
    escToClose: 'ÉCHAP pour fermer',
    selectToOpen: '↵ pour ouvrir',

    calculate: 'Calculer',
    reset: 'Réinitialiser',
    copyResult: 'Copier le Résultat',
    copied: 'Copié !',
    share: 'Partager',
    shared: 'Lien copié !',
    addToFavorites: 'Ajouter aux Favoris',
    savedToFavorites: 'Enregistré dans les Favoris',
    favorites: 'Favoris :',
    recentlyUsed: 'Récemment Utilisés :',
    clear: 'Effacer',

    popularTitle: 'Calculateurs Populaires',
    popularSubtitle: 'Les outils les plus consultés de notre répertoire',
    viewAllPopular: 'Voir tous les populaires',
    browseByCategory: 'Parcourir par Catégorie',
    exploreCategories: 'Calculateurs organisés en 16 catégories thématiques',
    viewAllCategories: 'Voir les 16 Catégories →',
    recentlyAddedTitle: 'Récemment Ajoutés',
    recentlyAddedSubtitle: 'Dernières fonctionnalités ajoutées à Calculat.dev',
    viewNewTools: 'Voir les nouveautés',
    howItWorksTitle: 'Comment Fonctionne Calculat',
    whyCalculatTitle: 'Pourquoi Choisir Calculat ?',
    whyCalculatSubtitle: 'Calculat est conçu comme un moteur de calcul rapide, épuré et sans distraction.',
    instantFastTitle: 'Instantané et Rapide',
    instantFastDesc: 'Calculs en temps réel dès la saisie, sans attente de serveur.',
    privacyTitle: '100% Confidentiel',
    privacyDesc: 'Vos données personnelles et financières restent dans votre navigateur.',
    directoryTitle: 'Répertoire Structuré',
    directoryDesc: 'Classé par domaine. Recherche immédiate par mot-clé ou formule.',
    alwaysFreeTitle: 'Toujours Gratuit',
    alwaysFreeDesc: 'Sans compte obligatoire, sans paiement caché et sans bannières publicitaires gênantes.',

    directoryHeader: 'Répertoire de Tous les Calculateurs',
    directorySubheader: 'Calculateurs gratuits pour les mathématiques, la finance, la santé et le quotidien.',
    allCategoriesFilter: 'Toutes les Catégories',
    sortBy: 'Trier par :',
    sortPopular: 'Populaire',
    sortAlpha: 'A–Z',
    sortNewest: 'Plus Récents',
    searchInDirectory: 'Filtrer par nom, formule ou mot-clé...',
    viewGrid: 'Grille',
    viewList: 'Liste',
    toolsCount: (c: number) => `${c} outil${c === 1 ? '' : 's'} disponible${c === 1 ? '' : 's'}`,
    comingSoon: 'Bientôt disponible',

    formulaAndMethod: 'Formule et Méthode',
    workedExample: 'Exemple Détaillé Pas à Pas',
    faqsTitle: 'Questions Fréquentes (FAQ)',
    relatedCalculators: 'Calculateurs Associés',
    breadcrumbsHome: 'Accueil',
    backToCalculators: 'Voir Tous les Calculateurs',
    readFullStory: 'Lire toute l’histoire',
    suggestTool: 'Besoin d’un autre outil ? Suggérez-le',
    language: 'Langue',
  },

  de: {
    navCalculators: 'Rechner',
    navCategories: 'Kategorien',
    navPopular: 'Beliebt',
    navNew: 'Neu',
    navAbout: 'Über uns',
    navContact: 'Kontakt',
    navPrivacy: 'Datenschutz',
    navTerms: 'Nutzungsbedingungen',
    navDisclaimer: 'Haftungsausschluss',

    tagline: 'Alle Rechner an einem Ort.',
    description:
      'Kostenloses, schnelles und präzises Online-Rechner-Verzeichnis. Klare Werkzeuge ohne störende Werbung.',
    studentBadge: 'Unabhängiges Studentenprojekt:',
    studentNote: '100% kostenlos, werbefrei, ohne Paywall. Als Lesezeichen speichern (⌘D) und teilen!',
    privacyBadge: 'Berechnungen erfolgen lokal in Ihrem Browser. Keine Speicherung Ihrer Daten.',
    connectFollow: 'Folgen Sie uns:',

    searchPlaceholder: 'Was möchten Sie berechnen? (z.B. Zinsen, Prozent, BMI)',
    searchHeader: 'Rechner Suchen',
    searchSubheader: 'Suche nach Namen, Kategorien, Formeln und Stichwörtern',
    pressK: 'Drücke ⌘K',
    noResults: 'Keine Rechner gefunden',
    searchSuggestions: 'Versuchen Sie Prozent, Kredit, Alter oder durchsuchen Sie die Kategorien.',
    escToClose: 'ESC zum Schließen',
    selectToOpen: '↵ zum Öffnen',

    calculate: 'Berechnen',
    reset: 'Zurücksetzen',
    copyResult: 'Ergebnis Kopieren',
    copied: 'Kopiert!',
    share: 'Teilen',
    shared: 'Link kopiert!',
    addToFavorites: 'Zu Favoriten hinzufügen',
    savedToFavorites: 'In Favoriten gespeichert',
    favorites: 'Favoriten:',
    recentlyUsed: 'Zuletzt Verwendet:',
    clear: 'Löschen',

    popularTitle: 'Beliebte Rechner',
    popularSubtitle: 'Die am häufigsten genutzten Werkzeuge in unserem Verzeichnis',
    viewAllPopular: 'Alle beliebten anzeigen',
    browseByCategory: 'Nach Kategorie Durchsuchen',
    exploreCategories: 'Rechner übersichtlich gegliedert in 16 Hauptbereiche',
    viewAllCategories: 'Alle 16 Kategorien anzeigen →',
    recentlyAddedTitle: 'Kürzlich Hinzugefügt',
    recentlyAddedSubtitle: 'Neue Rechenwerkzeuge auf Calculat.dev',
    viewNewTools: 'Neue Rechner ansehen',
    howItWorksTitle: 'So Funktioniert Calculat',
    whyCalculatTitle: 'Warum Calculat Nutzen?',
    whyCalculatSubtitle: 'Calculat ist auf maximale Geschwindigkeit, Übersicht und Benutzerfreundlichkeit ausgelegt.',
    instantFastTitle: 'Sofort und Schnell',
    instantFastDesc: 'Berechnungen erfolgen in Echtzeit bei der Eingabe – ohne Server-Wartezeiten.',
    privacyTitle: '100% Datenschutz',
    privacyDesc: 'Ihre Finanz- und Gesundheitsdaten bleiben stets sicher auf Ihrem Gerät.',
    directoryTitle: 'Übersichtliches Verzeichnis',
    directoryDesc: 'Logisch strukturiert nach Fachgebieten. Schnelle Suche nach Formel oder Name.',
    alwaysFreeTitle: 'Dauerhaft Kostenlos',
    alwaysFreeDesc: 'Keine Registrierung, keine versteckten Kosten und keine störenden Werbebanner.',

    directoryHeader: 'Verzeichnis Aller Rechner',
    directorySubheader: 'Umfassende Sammlung kostenloser Rechner für Mathematik, Finanzen, Gesundheit und Alltag.',
    allCategoriesFilter: 'Alle Kategorien',
    sortBy: 'Sortieren nach:',
    sortPopular: 'Beliebtheit',
    sortAlpha: 'A–Z',
    sortNewest: 'Neueste',
    searchInDirectory: 'Nach Titel, Formel oder Stichwort filtern...',
    viewGrid: 'Raster',
    viewList: 'Liste',
    toolsCount: (c: number) => `${c} Rechner verfügbar`,
    comingSoon: 'Demnächst verfügbar',

    formulaAndMethod: 'Formel & Methode',
    workedExample: 'Schritt-für-Schritt Beispiel',
    faqsTitle: 'Häufig Gestellte Fragen (FAQ)',
    relatedCalculators: 'Ähnliche Rechner',
    breadcrumbsHome: 'Startseite',
    backToCalculators: 'Alle Rechner Durchsuchen',
    readFullStory: 'Die ganze Geschichte lesen',
    suggestTool: 'Fehlt ein Rechner? Jetzt vorschlagen',
    language: 'Sprache',
  },

  pt: {
    navCalculators: 'Calculadoras',
    navCategories: 'Categorias',
    navPopular: 'Populares',
    navNew: 'Novas',
    navAbout: 'Sobre',
    navContact: 'Contato',
    navPrivacy: 'Privacidade',
    navTerms: 'Termos de Uso',
    navDisclaimer: 'Aviso Legal',

    tagline: 'Todas as calculadoras em um só lugar.',
    description:
      'Diretório de calculadoras online gratuitas, rápidas e precisas. Ferramentas limpas sem anúncios invasivos.',
    studentBadge: 'Projeto Estudantil Independente:',
    studentNote: '100% gratuito, sem anúncios ou mensalidades. Salve nos favoritos (⌘D) e compartilhe!',
    privacyBadge: 'Os cálculos são feitos localmente no seu navegador. Zero rastreamento dos seus dados.',
    connectFollow: 'Conecte-se e siga:',

    searchPlaceholder: 'O que você quer calcular? (ex. financiamento, porcentagem, imc)',
    searchHeader: 'Buscar Calculadoras',
    searchSubheader: 'Pesquise por títulos, categorias, fórmulas e palavras-chave',
    pressK: 'Pressione ⌘K',
    noResults: 'Nenhuma calculadora encontrada',
    searchSuggestions: 'Tente porcentagem, financiamento, idade ou navegue pelas categorias.',
    escToClose: 'ESC para fechar',
    selectToOpen: '↵ para abrir',

    calculate: 'Calcular',
    reset: 'Redefinir',
    copyResult: 'Copiar Resultado',
    copied: 'Copiado!',
    share: 'Compartilhar',
    shared: 'Link copiado!',
    addToFavorites: 'Adicionar aos Favoritos',
    savedToFavorites: 'Salvo nos Favoritos',
    favorites: 'Favoritos:',
    recentlyUsed: 'Usadas Recentemente:',
    clear: 'Limpar',

    popularTitle: 'Calculadoras Populares',
    popularSubtitle: 'As ferramentas mais utilizadas do nosso diretório',
    viewAllPopular: 'Ver todas as populares',
    browseByCategory: 'Navegar por Categoria',
    exploreCategories: 'Calculadoras organizadas em 16 categorias principais',
    viewAllCategories: 'Ver Todas as 16 Categorias →',
    recentlyAddedTitle: 'Adicionadas Recentemente',
    recentlyAddedSubtitle: 'Novas ferramentas adicionadas ao Calculat.dev',
    viewNewTools: 'Ver novidades',
    howItWorksTitle: 'Como o Calculat Funciona',
    whyCalculatTitle: 'Por Que Usar o Calculat?',
    whyCalculatSubtitle: 'Calculat foi desenvolvido como um motor de cálculo rápido, limpo e direto ao ponto.',
    instantFastTitle: 'Instantâneo e Rápido',
    instantFastDesc: 'Cálculos em tempo real enquanto você digita, sem atrasos de carregamento de servidor.',
    privacyTitle: '100% Privado',
    privacyDesc: 'Seus dados financeiros e de saúde ficam apenas no seu navegador.',
    directoryTitle: 'Diretório Estruturado',
    directoryDesc: 'Organizado por tópicos. Busca rápida por nome, fórmula ou palavra-chave.',
    alwaysFreeTitle: 'Sempre Gratuito',
    alwaysFreeDesc: 'Sem necessidade de cadastro, sem taxas e sem anúncios que atrapalham os resultados.',

    directoryHeader: 'Diretório de Todas as Calculadoras',
    directorySubheader: 'Coleção completa de calculadoras online para matemática, finanças, saúde e dia a dia.',
    allCategoriesFilter: 'Todas as Categorias',
    sortBy: 'Ordenar por:',
    sortPopular: 'Populares',
    sortAlpha: 'A–Z',
    sortNewest: 'Mais Recentes',
    searchInDirectory: 'Filtrar por nome, fórmula ou palavra-chave...',
    viewGrid: 'Grade',
    viewList: 'Lista',
    toolsCount: (c: number) => `${c} calculadora${c === 1 ? '' : 's'} disponível${c === 1 ? '' : 's'}`,
    comingSoon: 'Em breve',

    formulaAndMethod: 'Fórmula e Método',
    workedExample: 'Exemplo Passo a Passo',
    faqsTitle: 'Perguntas Frequentes',
    relatedCalculators: 'Calculadoras Relacionadas',
    breadcrumbsHome: 'Início',
    backToCalculators: 'Ver Todas as Calculadoras',
    readFullStory: 'Ler a história completa',
    suggestTool: 'Precisa de outra ferramenta? Sugira aqui',
    language: 'Idioma',
  },

  hi: {
    navCalculators: 'कैलकुलेटर',
    navCategories: 'श्रेणियां',
    navPopular: 'लोकप्रिय',
    navNew: 'नए',
    navAbout: 'हमारे बारे में',
    navContact: 'संपर्क',
    navPrivacy: 'गोपनीयता नीति',
    navTerms: 'सेवा की शर्तें',
    navDisclaimer: 'अस्वीकरण',

    tagline: 'सभी कैलकुलेटर, एक ही स्थान पर।',
    description:
      'मुफ्त, तेज और सटीक ऑनलाइन कैलकुलेटर डायरेक्टरी। बिना किसी विज्ञापन के स्वच्छ गणना उपकरण।',
    studentBadge: 'स्वतंत्र छात्र परियोजना:',
    studentNote: '100% मुफ्त, कोई विज्ञापन नहीं, कोई शुल्क नहीं। बुकमार्क करें (⌘D) और साझा करें!',
    privacyBadge: 'गणना सीधे आपके ब्राउज़र में होती है। आपके नंबरों का शून्य डेटा ट्रैकिंग।',
    connectFollow: 'जुड़ें और फॉलो करें:',

    searchPlaceholder: 'आप क्या गणना करना चाहते हैं? (उदा. ब्याज, प्रतिशत, बीएमआई)',
    searchHeader: 'कैलकुलेटर खोजें',
    searchSubheader: 'शीर्षक, श्रेणी, सूत्र और कीवर्ड द्वारा खोजें',
    pressK: 'दबाएं ⌘K',
    noResults: 'कोई कैलकुलेटर नहीं मिला',
    searchSuggestions: 'प्रतिशत, गृह ऋण, आयु या श्रेणी द्वारा खोजने का प्रयास करें।',
    escToClose: 'बंद करने के लिए ESC दबाएं',
    selectToOpen: 'खोलने के लिए ↵ दबाएं',

    calculate: 'गणना करें',
    reset: 'रीसेट',
    copyResult: 'परिणाम कॉपी करें',
    copied: 'कॉपी हो गया!',
    share: 'साझा करें',
    shared: 'लिंक कॉपी हो गया!',
    addToFavorites: 'पसंदीदा में जोड़ें',
    savedToFavorites: 'पसंदीदा में सहेजा गया',
    favorites: 'पसंदीदा:',
    recentlyUsed: 'हाल ही में प्रयुक्त:',
    clear: 'हटाएं',

    popularTitle: 'लोकप्रिय कैलकुलेटर',
    popularSubtitle: 'हमारी डायरेक्टरी में सबसे अधिक उपयोग किए जाने वाले उपकरण',
    viewAllPopular: 'सभी लोकप्रिय देखें',
    browseByCategory: 'श्रेणी के अनुसार देखें',
    exploreCategories: '16 प्रमुख श्रेणियों में व्यवस्थित कैलकुलेटर देखें',
    viewAllCategories: 'सभी 16 श्रेणियां देखें →',
    recentlyAddedTitle: 'हाल ही में जोड़े गए',
    recentlyAddedSubtitle: 'Calculat.dev पर जोड़ी गई नवीनतम गणना सुविधाएं',
    viewNewTools: 'नए उपकरण देखें',
    howItWorksTitle: 'Calculat कैसे काम करता है',
    whyCalculatTitle: 'Calculat का उपयोग क्यों करें?',
    whyCalculatSubtitle: 'Calculat को एक तेज, स्वच्छ और व्याकुलता-मुक्त गणना इंजन के रूप में डिज़ाइन किया गया है।',
    instantFastTitle: 'त्वरित और तेज',
    instantFastDesc: 'टाइप करते ही तुरंत परिणाम, सर्वर पर प्रतीक्षा करने की कोई आवश्यकता नहीं।',
    privacyTitle: '100% गोपनीयता सुरक्षित',
    privacyDesc: 'आपकी वित्तीय और व्यक्तिगत संख्याएं केवल आपके ब्राउज़र में रहती हैं।',
    directoryTitle: 'सुव्यवस्थित डायरेक्टरी',
    directoryDesc: 'विषयों के अनुसार तार्किक रूप से व्यवस्थित। नाम या सूत्र द्वारा तुरंत खोजें।',
    alwaysFreeTitle: 'सदैव मुफ्त',
    alwaysFreeDesc: 'कोई खाता बनाने की आवश्यकता नहीं, कोई छुपा हुआ शुल्क नहीं।',

    directoryHeader: 'सभी कैलकुलेटर डायरेक्टरी',
    directorySubheader: 'गणित, वित्त, स्वास्थ्य और दैनिक जीवन के लिए मुफ्त ऑनलाइन कैलकुलेटर की विस्तृत सूची।',
    allCategoriesFilter: 'सभी श्रेणियां',
    sortBy: 'क्रमबद्ध करें:',
    sortPopular: 'लोकप्रिय',
    sortAlpha: 'अ–ह',
    sortNewest: 'नवीनतम',
    searchInDirectory: 'शीर्षक, सूत्र या कीवर्ड द्वारा फ़िल्टर करें...',
    viewGrid: 'ग्रिड',
    viewList: 'सूची',
    toolsCount: (c: number) => `${c} कैलकुलेटर उपलब्ध`,
    comingSoon: 'शीघ्र उपलब्ध होगा',

    formulaAndMethod: 'सूत्र एवं विधि',
    workedExample: 'चरण-दर-चरण हल किया गया उदाहरण',
    faqsTitle: 'अक्सर पूछे जाने वाले प्रश्न (FAQ)',
    relatedCalculators: 'संबंधित कैलकुलेटर',
    breadcrumbsHome: 'होम',
    backToCalculators: 'सभी कैलकुलेटर देखें',
    readFullStory: 'पूरी कहानी पढ़ें',
    suggestTool: 'क्या किसी अन्य उपकरण की आवश्यकता है? सुझाव दें',
    language: 'भाषा',
  },
};
