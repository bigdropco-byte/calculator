export type CategorySlug =
  | 'math'
  | 'finance'
  | 'health'
  | 'date-time'
  | 'business'
  | 'education'
  | 'conversion'
  | 'science'
  | 'technology'
  | 'everyday'
  | 'construction'
  | 'fitness'
  | 'statistics'
  | 'probability'
  | 'sports'
  | 'travel'
  | 'numerology';

export interface CategoryDefinition {
  slug: CategorySlug;
  name: string;
  shortName: string;
  description: string;
  icon: string;
  featured?: boolean;
}

export interface CalculatorEditorial {
  whatIs: string;
  howToUse: string[];
  formula: {
    title: string;
    expression: string;
    explanation: string;
  };
  example: {
    scenario: string;
    steps: string[];
    result: string;
  };
  tips: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export interface CalculatorDefinition {
  slug: string;
  name: string;
  shortDescription: string;
  category: CategorySlug;
  secondaryCategories?: CategorySlug[];
  keywords: string[];
  tags: string[];
  icon: string;
  status: 'published' | 'draft';
  featured?: boolean;
  popular?: boolean;
  addedDate: string; // YYYY-MM-DD
  seo: {
    title: string;
    metaDescription: string;
    keywords?: string[];
  };
  relatedCalculators?: string[];
  editorial: CalculatorEditorial;
}

export interface SearchResultItem {
  slug: string;
  name: string;
  shortDescription: string;
  category: CategorySlug;
  categoryName: string;
  icon: string;
  matchScore: number;
  highlight?: string;
}
