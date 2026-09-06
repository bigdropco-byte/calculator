import { Metadata } from 'next';
import { SITE_CONFIG, getCanonicalUrl, getCanonicalAlternates } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Search Calculators – Calculat.dev',
  description: 'Search across 240+ free online calculators for math, finance, health, and more.',
  alternates: getCanonicalAlternates('/search'),
  robots: {
    index: false,
    follow: true,
    googleBot: {
      index: false,
      follow: true,
    },
  },
};

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
