import React from 'react';

export interface SocialProfile {
  name: string;
  url: string;
  label: string;
  iconPath: string;
  hoverColor: string;
  brandColor: string;
}

export const SOCIAL_PROFILES: SocialProfile[] = [
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/calculat.dev',
    label: 'Follow Calculat on Facebook',
    iconPath:
      'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
    hoverColor: 'hover:text-[#1877F2] hover:border-[#1877F2]/40 hover:bg-[#1877F2]/5',
    brandColor: '#1877F2',
  },
  {
    name: 'Reddit',
    url: 'https://www.reddit.com/user/Calculat_dev',
    label: 'Join Calculat on Reddit',
    iconPath:
      'M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.197-2.512-.73a.326.326 0 0 0-.232-.095z',
    hoverColor: 'hover:text-[#FF4500] hover:border-[#FF4500]/40 hover:bg-[#FF4500]/5',
    brandColor: '#FF4500',
  },
  {
    name: 'X (Twitter)',
    url: 'https://x.com/calculat_dev',
    label: 'Follow Calculat on X (Twitter)',
    iconPath:
      'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
    hoverColor: 'hover:text-slate-900 hover:border-slate-400 hover:bg-slate-100',
    brandColor: '#000000',
  },
  {
    name: 'Pinterest',
    url: 'https://www.pinterest.com/calculat_dev',
    label: 'Follow Calculat on Pinterest',
    iconPath:
      'M12 0a12 12 0 0 0-4.37 23.18c-.07-.98-.13-2.48.03-3.55.14-.98.92-6.52.92-6.52s-.23-.47-.23-1.17c0-1.1.64-1.92 1.43-1.92.68 0 1 .51 1 1.12 0 .68-.43 1.7-.66 2.64-.19.79.4 1.44 1.18 1.44 1.41 0 2.5-1.49 2.5-3.64 0-1.9-1.37-3.23-3.32-3.23-2.26 0-3.59 1.7-3.59 3.45 0 .68.26 1.42.59 1.82.06.08.07.15.05.23-.08.31-.25 1.02-.28 1.16-.05.18-.15.22-.35.13-1.3-.6-2.11-2.49-2.11-4.01 0-3.26 2.37-6.26 6.84-6.26 3.6 0 6.39 2.56 6.39 5.99 0 3.57-2.25 6.44-5.38 6.44-1.05 0-2.04-.55-2.38-1.19l-.65 2.47c-.24.9-.88 2.03-1.31 2.73A12 12 0 1 0 12 0z',
    hoverColor: 'hover:text-[#BD081C] hover:border-[#BD081C]/40 hover:bg-[#BD081C]/5',
    brandColor: '#BD081C',
  },
  {
    name: 'YouTube',
    url: 'https://www.youtube.com/@calculat_dev',
    label: 'Subscribe to Calculat on YouTube',
    iconPath:
      'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
    hoverColor: 'hover:text-[#FF0000] hover:border-[#FF0000]/40 hover:bg-[#FF0000]/5',
    brandColor: '#FF0000',
  },
];

interface SocialLinksProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showLabels?: boolean;
}

export const SocialLinks: React.FC<SocialLinksProps> = ({
  className = '',
  size = 'md',
  showLabels = false,
}) => {
  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const buttonSizes = {
    sm: 'p-1.5 rounded-md',
    md: 'p-2 rounded-lg',
    lg: 'p-2.5 rounded-xl',
  };

  return (
    <div className={`flex items-center gap-2 flex-wrap ${className}`} role="list" aria-label="Social media links">
      {SOCIAL_PROFILES.map((profile) => (
        <a
          key={profile.name}
          href={profile.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={profile.label}
          title={profile.label}
          className={`inline-flex items-center gap-1.5 text-slate-500 bg-white border border-slate-200 transition-all duration-200 shadow-2xs hover:shadow-xs hover:scale-105 active:scale-95 ${buttonSizes[size]} ${profile.hoverColor}`}
          role="listitem"
        >
          <svg
            className={`${iconSizes[size]} shrink-0 fill-current`}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d={profile.iconPath} />
          </svg>
          {showLabels && (
            <span className="text-xs font-semibold text-slate-700">{profile.name}</span>
          )}
        </a>
      ))}
    </div>
  );
};
