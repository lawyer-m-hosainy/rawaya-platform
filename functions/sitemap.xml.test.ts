import { afterEach, describe, expect, it, vi } from 'vitest';
import { onRequest } from './sitemap.xml';

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('sitemap Pages Function', () => {
  it('serves valid homepage XML when Supabase configuration is unavailable', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});

    const response = await onRequest({ env: {} });
    const body = await response.text();

    expect(response.status).toBe(200);
    expect(response.headers.get('content-type')).toContain('application/xml');
    expect(response.headers.get('x-sitemap-status')).toBe('fallback');
    expect(body).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
    expect(body).toContain('<loc>https://rawaya.site/</loc>');
    expect(body).toContain('</urlset>');
    expect(new DOMParser().parseFromString(body, 'application/xml').querySelector('parsererror')).toBeNull();
  });

  it('returns escaped sitemap XML for published articles', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify([
      { slug: 'law&order', updated_at: '2026-09-25T12:00:00Z' },
      { slug: "lawyer's-story", updated_at: 'invalid-date' },
      { slug: '<script>"x"</script>', updated_at: 'invalid-date' },
    ]), { status: 200 })));

    const response = await onRequest({
      env: { VITE_SUPABASE_URL: 'https://example.supabase.co', VITE_SUPABASE_ANON_KEY: 'public-key' },
    });
    const body = await response.text();

    expect(response.status).toBe(200);
    expect(response.headers.get('x-sitemap-status')).toBeNull();
    expect(body).toContain('/article/law%26order');
    expect(body).toContain('/article/lawyer&apos;s-story');
    expect(body).toContain('/article/%3Cscript%3E%22x%22%3C%2Fscript%3E');
    expect(body).toContain('<lastmod>2026-09-25</lastmod>');
    expect(body).not.toContain('<script>');
    expect(new DOMParser().parseFromString(body, 'application/xml').querySelector('parsererror')).toBeNull();
  });

  it('returns fallback XML and logs when the article API fails', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('unavailable', { status: 503 })));

    const response = await onRequest({
      env: { VITE_SUPABASE_URL: 'https://example.supabase.co', VITE_SUPABASE_ANON_KEY: 'public-key' },
    });

    expect(response.status).toBe(200);
    expect(response.headers.get('x-sitemap-status')).toBe('fallback');
    expect(await response.text()).toContain('</urlset>');
    expect(console.error).toHaveBeenCalled();
  });
});
