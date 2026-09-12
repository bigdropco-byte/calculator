import { describe, it, expect } from 'vitest';
import sitemap from '../../app/sitemap';
import { getCanonicalUrl } from '../seo';

describe('Sitemap Indexing Verification', () => {
  it('includes high-priority URLs with priority 0.9 for Googlebot', async () => {
    const entries = await sitemap();

    // 1. Check /about
    const aboutEntry = entries.find((e) => e.url === getCanonicalUrl('/about'));
    expect(aboutEntry).toBeDefined();
    expect(aboutEntry?.priority).toBe(0.9);
    expect(aboutEntry?.changeFrequency).toBe('weekly');

    // 2. Check /privacy-policy
    const privacyPolicyEntry = entries.find((e) => e.url === getCanonicalUrl('/privacy-policy'));
    expect(privacyPolicyEntry).toBeDefined();
    expect(privacyPolicyEntry?.priority).toBe(0.9);
    expect(privacyPolicyEntry?.changeFrequency).toBe('weekly');

    // 3. Check /tools
    const toolsEntry = entries.find((e) => e.url === getCanonicalUrl('/tools'));
    expect(toolsEntry).toBeDefined();
    expect(toolsEntry?.priority).toBe(0.9);
    expect(toolsEntry?.changeFrequency).toBe('daily');

    // 4. Check root
    const rootEntry = entries.find((e) => e.url === getCanonicalUrl('/'));
    expect(rootEntry).toBeDefined();
    expect(rootEntry?.priority).toBe(1.0);
  });
});
