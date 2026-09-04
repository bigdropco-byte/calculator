import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Header } from '@/components/navigation/Header';
import { StudentBanner } from '@/components/navigation/StudentBanner';
import { Footer } from '@/components/navigation/Footer';
import { CookieConsent } from '@/components/ui/CookieConsent';
import { SITE_CONFIG, generateOrganizationSchema } from '@/lib/seo';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: `${SITE_CONFIG.name} – ${SITE_CONFIG.tagline}`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    'calculators',
    'online calculators',
    'free calculator directory',
    'math calculators',
    'finance calculators',
    'percentage calculator',
    'mortgage calculator',
    'bmi calculator',
  ],
  authors: [{ name: SITE_CONFIG.name, url: SITE_CONFIG.url }],
  creator: SITE_CONFIG.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: `${SITE_CONFIG.name} – ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.name} – ${SITE_CONFIG.tagline}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_CONFIG.name} – ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
    images: ['/opengraph-image'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: '#0284c7',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const orgSchema = generateOrganizationSchema();

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body className="bg-slate-50 text-slate-900 min-h-screen flex flex-col antialiased">
        <StudentBanner />
        <Header />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {children}
        </main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
