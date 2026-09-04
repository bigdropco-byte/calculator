import { ImageResponse } from 'next/og';
import { getCalculatorBySlug, getAllPublishedCalculators } from '@/lib/calculatorRegistry';
import { CATEGORIES } from '@/lib/categoryRegistry';

export const dynamic = 'force-static';

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export async function generateStaticParams() {
  const calcs = getAllPublishedCalculators();
  return calcs.map(c => ({
    slug: c.slug,
  }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const calc = getCalculatorBySlug(slug);

  const title = calc ? calc.name : 'Free Online Calculator';
  const categoryName = calc ? CATEGORIES[calc.category]?.name || calc.category : 'Calculator';
  const description = calc
    ? calc.shortDescription
    : 'Free, fast, and accurate calculation tool running locally in your browser.';

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #0369a1 55%, #0284c7 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          padding: '70px 80px',
          fontFamily: 'sans-serif',
          color: 'white',
        }}
      >
        {/* Top bar: Brand & Category Badge */}
        <div
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <svg
            width="52"
            height="52"
            viewBox="0 0 512 512"
            style={{ borderRadius: '14px' }}
          >
            <defs>
              <linearGradient id="og-grad-slug" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#1d4ed8" />
              </linearGradient>
            </defs>
            <rect width="512" height="512" rx="115" ry="115" fill="url(#og-grad-slug)" />
            <rect
              x="136"
              y="90"
              width="240"
              height="332"
              rx="40"
              ry="40"
              fill="none"
              stroke="#ffffff"
              strokeWidth="26"
            />
            <rect x="168" y="132" width="176" height="44" rx="10" ry="10" fill="#ffffff" />
            <rect x="168" y="202" width="46" height="44" rx="10" ry="10" fill="#ffffff" />
            <rect x="233" y="202" width="46" height="44" rx="10" ry="10" fill="#ffffff" />
            <rect x="298" y="202" width="46" height="44" rx="10" ry="10" fill="#ffffff" />
            <rect x="168" y="264" width="46" height="44" rx="10" ry="10" fill="#ffffff" />
            <rect x="233" y="264" width="46" height="44" rx="10" ry="10" fill="#ffffff" />
            <rect x="168" y="326" width="46" height="44" rx="10" ry="10" fill="#ffffff" />
            <rect x="233" y="326" width="46" height="44" rx="10" ry="10" fill="#ffffff" />
            <rect x="298" y="264" width="46" height="106" rx="12" ry="12" fill="#ffffff" />
          </svg>
            <span style={{ fontSize: '32px', fontWeight: '900', letterSpacing: '-0.02em' }}>
              Calculat<span style={{ color: '#38bdf8' }}>.dev</span>
            </span>
          </div>

          <div
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              padding: '8px 20px',
              borderRadius: '999px',
              fontSize: '18px',
              fontWeight: '700',
              color: '#e0f2fe',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            {categoryName}
          </div>
        </div>

        {/* Main Content Area */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', maxWidth: '950px' }}>
          <h1
            style={{
              fontSize: '56px',
              fontWeight: '900',
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
              margin: 0,
            }}
          >
            {title}
          </h1>
          <p
            style={{
              fontSize: '22px',
              color: '#e0f2fe',
              lineHeight: 1.45,
              margin: 0,
            }}
          >
            {description}
          </p>
        </div>

        {/* Footer Feature Badges */}
        <div
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid rgba(255, 255, 255, 0.2)',
            paddingTop: '24px',
            fontSize: '17px',
            color: '#bae6fd',
            fontWeight: '600',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <span>⚡ Instant &amp; Free</span>
            <span>•</span>
            <span>🔒 Browser Privacy</span>
            <span>•</span>
            <span>🚫 Ad-Free</span>
          </div>
          <span style={{ color: '#ffffff', opacity: 0.9 }}>
            🎓 Independent Student Project
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
