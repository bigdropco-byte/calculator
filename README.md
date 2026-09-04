# Calculat.dev – Scalable Online Calculator Directory

Calculat is a modern, search-first, directory-first calculator platform built with **Next.js 16 (App Router)**, **TypeScript**, and **Tailwind CSS**.

- **Domain:** `calculat.dev`
- **Tagline:** Online Calculators for Everything
- **Privacy:** 100% Client-side mathematical execution in the browser. Zero server logging of user calculations.
- **Architecture:** Directory-first registry system supporting hundreds of calculators without refactoring.

---

## Quick Start

```bash
# Navigate to the project
cd /Users/sachinmacmini/.gemini/antigravity/scratch/calculat

# Install dependencies (already installed)
npm install

# Run the local development server
npm run dev

# Run automated calculation tests (Vitest)
npm test

# Build for production
npm run build
```

---

## Directory Architecture

```text
src/
├── app/
│   ├── layout.tsx                # Global Shell (Header, Navigation, Footer, SEO metadata)
│   ├── page.tsx                  # Homepage (Hero search, Popular, Categories, Newest, Recents)
│   ├── calculators/
│   │   ├── page.tsx              # /calculators directory (Filters, Sorting, A–Z jump, View toggle)
│   │   └── [slug]/
│   │       └── page.tsx          # Dynamic canonical calculator page (SSG, JSON-LD Schema, Editorial)
│   ├── categories/
│   │   ├── page.tsx              # /categories directory (All 16 categories with live tool counts)
│   │   └── [category]/
│   │       └── page.tsx          # Category hub page (Filtered tools, Category FAQ, Related categories)
│   ├── search/
│   │   └── page.tsx              # Utility search fallback page (robots: noindex)
│   ├── about/, contact/, privacy/, terms/, disclaimer/ # Static policy & company pages
│   ├── sitemap.ts                # Automated XML sitemap from calculator & populated category registry
│   └── robots.ts                 # Robots.txt with search query exclusions
│
├── components/
│   ├── calculator/               # Reusable calculator shell, actions (Copy/Reset), editorial sections, AdSlot
│   ├── calculators/              # 10 interactive calculator widgets + dynamic CalculatorRenderer
│   ├── directory/                # CalculatorCard, CategoryCard, DirectoryFilter, RecentTray
│   ├── navigation/               # Header, Footer
│   ├── search/                   # SearchModal (Cmd+K, live scoring, pills), HeroSearch
│   └── ui/                       # Lucide icon mapper
│
└── lib/
    ├── calculatorRegistry.ts     # Single source of truth for all calculators
    ├── categoryRegistry.ts       # 16 domain categories
    ├── calculatorSearch.ts       # In-memory search scoring algorithm
    ├── storage.ts                # Client localStorage for Recent Calculators & Favorites
    ├── seo.ts                    # Schema.org WebApplication, BreadcrumbList, FAQPage builders
    ├── formatting.ts             # Currency, percentage, number formatting, clipboard utilities
    └── calculators/              # Pure mathematical engines with 100% test coverage
```

---

## How to Add Calculator #11 through #500

Adding a new calculator takes less than 5 minutes and automatically updates the entire platform:

### Step 1: Create the pure calculation engine
Create `src/lib/calculators/<your-tool>.ts`:
```typescript
export function calculateMyTool(inputA: number, inputB: number) {
  // Pure mathematical logic
  return { result: inputA * inputB };
}
```
Add unit tests in `src/lib/calculators/__tests__/calculators.test.ts`.

### Step 2: Create the interactive widget
Create `src/components/calculators/<YourTool>Widget.tsx` and register it in `CalculatorRenderer.tsx`.

### Step 3: Add to the Registry
Add one entry to `src/lib/calculatorRegistry.ts`:
```typescript
{
  slug: 'my-calculator',
  name: 'My Calculator',
  shortDescription: '...',
  category: 'math', // or finance, health, etc.
  keywords: ['...'],
  tags: ['...'],
  icon: 'Calculator',
  status: 'published',
  popular: false,
  addedDate: '2025-03-05',
  seo: {
    title: '...',
    metaDescription: '...',
  },
  editorial: {
    whatIs: '...',
    howToUse: ['...'],
    formula: { title: '...', expression: '...', explanation: '...' },
    example: { scenario: '...', steps: ['...'], result: '...' },
    tips: ['...'],
    faqs: [{ question: '...', answer: '...' }],
  },
}
```

### What the platform automatically handles:
- ✅ Generates `/calculators/my-calculator` canonical SSG page
- ✅ Inserts `WebApplication`, `BreadcrumbList`, and `FAQPage` JSON-LD Schema
- ✅ Adds to `/calculators` directory grid, list, and A–Z jump index
- ✅ Adds to category page `/categories/<category>`
- ✅ Indexes in the global `Cmd+K` live search engine
- ✅ Appends to `/sitemap.xml`
- ✅ Suggests in related calculators across complementary tools
- ✅ Enables browser-based favorites and recently used tracking
