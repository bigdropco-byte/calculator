import React from 'react';

interface CalculatLogoProps {
  className?: string;
  size?: number | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  withText?: boolean;
}

const SIZE_MAP = {
  xs: 20,
  sm: 28,
  md: 36,
  lg: 44,
  xl: 56,
};

export const CalculatLogoIcon: React.FC<{ size?: number | 'xs' | 'sm' | 'md' | 'lg' | 'xl'; className?: string }> = ({
  size = 'md',
  className = '',
}) => {
  const pixelSize = typeof size === 'number' ? size : SIZE_MAP[size] || 36;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width={pixelSize}
      height={pixelSize}
      className={`shrink-0 select-none shadow-xs rounded-[22%] transition-transform group-hover:scale-105 ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="logo-bg-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
      </defs>
      {/* Squircle Background */}
      <rect width="512" height="512" rx="115" ry="115" fill="url(#logo-bg-grad)" />

      {/* Outer Calculator Frame */}
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
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Screen */}
      <rect x="168" y="132" width="176" height="44" rx="10" ry="10" fill="#ffffff" />

      {/* Keypad Row 1 */}
      <rect x="168" y="202" width="46" height="44" rx="10" ry="10" fill="#ffffff" />
      <rect x="233" y="202" width="46" height="44" rx="10" ry="10" fill="#ffffff" />
      <rect x="298" y="202" width="46" height="44" rx="10" ry="10" fill="#ffffff" />

      {/* Keypad Row 2 */}
      <rect x="168" y="264" width="46" height="44" rx="10" ry="10" fill="#ffffff" />
      <rect x="233" y="264" width="46" height="44" rx="10" ry="10" fill="#ffffff" />

      {/* Keypad Row 3 */}
      <rect x="168" y="326" width="46" height="44" rx="10" ry="10" fill="#ffffff" />
      <rect x="233" y="326" width="46" height="44" rx="10" ry="10" fill="#ffffff" />

      {/* Tall Equals Button (Row 2 & 3 right) */}
      <rect x="298" y="264" width="46" height="106" rx="12" ry="12" fill="#ffffff" />
    </svg>
  );
};

export const CalculatLogo: React.FC<CalculatLogoProps> = ({
  className = '',
  size = 'md',
  withText = true,
}) => {
  return (
    <div className={`flex items-center gap-2.5 font-bold tracking-tight select-none ${className}`}>
      <CalculatLogoIcon size={size} />
      {withText && (
        <span className="flex items-center text-slate-900 text-xl font-bold">
          Calculat<span className="text-sky-600 font-semibold text-sm ml-0.5">.dev</span>
        </span>
      )}
    </div>
  );
};
