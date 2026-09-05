import React from 'react';
import { Metadata } from 'next';
import { ContactForm } from '@/components/content/ContactForm';
import { SocialLinks } from '@/components/navigation/SocialLinks';
import { SITE_CONFIG, generateBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Contact & Calculator Requests – Calculat.dev',
  description:
    'Suggest a calculator, report a formula calculation issue, or request custom features for Calculat.dev free calculator directory.',
  alternates: {
    canonical: `${SITE_CONFIG.url}/contact`,
  },
  openGraph: {
    title: 'Contact & Calculator Requests – Calculat.dev',
    description:
      'Suggest a calculator or report a formula calculation issue for Calculat.dev.',
    url: `${SITE_CONFIG.url}/contact`,
    type: 'website',
    siteName: SITE_CONFIG.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact & Calculator Requests – Calculat.dev',
    description: 'Suggest a calculator or contact the independent student developer.',
  },
};

export default function ContactPage() {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Contact', url: '/contact' },
  ];

  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact & Calculator Requests',
    url: `${SITE_CONFIG.url}/contact`,
    description: 'Submit calculator requests or feedback directly to the developer.',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema(breadcrumbs)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(contactSchema),
        }}
      />

      <div className="max-w-2xl mx-auto space-y-6">
        <div className="border-b border-slate-200 pb-5">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Contact &amp; Requests</h1>
          <p className="text-sm text-slate-600 mt-1.5 leading-relaxed">
            Need a specific calculator that isn&apos;t in our directory yet? Have feedback on an existing formula? Let us know.
          </p>
        </div>

        <ContactForm />

        {/* Official Social Media Channels */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
          <h2 className="text-base font-bold text-slate-900">Official Social Media &amp; Community</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Follow Calculat across our official social channels for new tool announcements, calculation tips, updates, and feedback discussions.
          </p>
          <div className="pt-2">
            <SocialLinks size="md" showLabels />
          </div>
        </div>
      </div>
    </>
  );
}
