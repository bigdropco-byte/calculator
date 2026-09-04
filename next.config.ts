import type { NextConfig } from 'next';

const isGitHubActions = process.env.GITHUB_ACTIONS === 'true';
// Support NEXT_PUBLIC_BASE_PATH if provided by actions/configure-pages or workflow env,
// or fallback to /calculator if running in GitHub Actions without a custom domain.
const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH !== undefined
    ? process.env.NEXT_PUBLIC_BASE_PATH
    : isGitHubActions && !process.env.CUSTOM_DOMAIN
    ? '/calculator'
    : '';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: basePath,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
