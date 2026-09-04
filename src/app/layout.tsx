import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Header } from '@/components/navigation/Header';
import { StudentBanner } from '@/components/navigation/StudentBanner';
import { Footer } from '@/components/navigation/Footer';
import { CookieConsent } from '@/components/ui/CookieConsent';
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
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
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: ['/favicon.ico'],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  appleWebApp: {
    title: 'Calculat',
    statusBarStyle: 'default',
    capable: true,
  },
};

export const viewport: Viewport = {
  themeColor: '#2563eb',
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
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

  return (
    <html lang="en">
      <head>
        <link rel="icon" href={`${basePath}/icon.svg`} type="image/svg+xml" />
        <link rel="icon" href={`${basePath}/favicon.ico`} sizes="any" />
        <link rel="icon" href={`${basePath}/favicon-48x48.png`} sizes="48x48" type="image/png" />
        <link rel="icon" href={`${basePath}/favicon-32x32.png`} sizes="32x32" type="image/png" />
        <link rel="icon" href={`${basePath}/favicon-16x16.png`} sizes="16x16" type="image/png" />
        <link rel="apple-touch-icon" href={`${basePath}/apple-touch-icon.png`} sizes="180x180" />
        <link rel="manifest" href={`${basePath}/site.webmanifest`} />
        <meta name="theme-color" content="#2563eb" />
        <meta name="apple-mobile-web-app-title" content="Calculat" />
        <meta name="application-name" content="Calculat" />
        <meta name="msapplication-TileColor" content="#2563eb" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body className="bg-slate-50 text-slate-900 min-h-screen flex flex-col antialiased">
        <GoogleAnalytics />
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
