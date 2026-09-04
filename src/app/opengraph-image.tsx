import { ImageResponse } from 'next/og';
import { SITE_CONFIG } from '@/lib/seo';

export const dynamic = 'force-static';

export const alt = 'Calculat.dev – Online Calculators for Everything';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #0369a1 60%, #0284c7 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          padding: '80px',
          fontFamily: 'sans-serif',
          color: 'white',
        }}
      >
        {/* Brand Top */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <svg
            width="64"
            height="64"
            viewBox="0 0 512 512"
            style={{ borderRadius: '16px' }}
          >
            <defs>
              <linearGradient id="og-grad-home" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#1d4ed8" />
              </linearGradient>
            </defs>
            <rect width="512" height="512" rx="115" ry="115" fill="url(#og-grad-home)" />
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
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '36px', fontWeight: '900', letterSpacing: '-0.03em' }}>
              Calculat<span style={{ color: '#38bdf8' }}>.dev</span>
            </span>
            <span style={{ fontSize: '18px', color: '#94a3b8', fontWeight: '500' }}>
              The Free Online Calculator Directory
            </span>
          </div>
        </div>

        {/* Center Headline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '900px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(255,255,255,0.15)',
              padding: '8px 18px',
              borderRadius: '999px',
              fontSize: '18px',
              fontWeight: '600',
              color: '#bae6fd',
            }}
          >
            <span>🎓 Built with care by an independent student developer</span>
          </div>
          <h1
            style={{
              fontSize: '64px',
              fontWeight: '900',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              margin: 0,
            }}
          >
            Online Calculators for Everything
          </h1>
          <p style={{ fontSize: '24px', color: '#e0f2fe', lineHeight: 1.4, margin: 0 }}>
            Find free calculators for math, finance, health, business, dates, and everyday life.
          </p>
        </div>

        {/* Bottom Feature Pill List */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            fontSize: '18px',
            color: '#bae6fd',
            fontWeight: '600',
          }}
        >
          <span>⚡ Instant Calculations</span>
          <span>•</span>
          <span>🔒 100% Browser Privacy</span>
          <span>•</span>
          <span>🚫 Zero Annoying Ads</span>
          <span>•</span>
          <span>✨ 100% Free Forever</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
