import { ImageResponse } from 'next/og';
import { getCalculatorBySlug, getAllPublishedCalculators } from '@/lib/calculatorRegistry';
import { CATEGORIES } from '@/lib/categoryRegistry';

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
            <div
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '14px',
                background: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '28px',
              }}
            >
              🧮
            </div>
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
