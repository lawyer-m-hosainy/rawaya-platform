const BASE_URL = 'https://rawaya.site';
const SITEMAP_NAMESPACE = 'http://www.sitemaps.org/schemas/sitemap/0.9';

interface ArticleSitemapEntry {
  slug: string;
  updated_at?: string | null;
}

function escapeXml(value: string) {
  return value.replace(/[<>&'"]/g, (character) => {
    const entities: Record<string, string> = {
      '<': '&lt;',
      '>': '&gt;',
      '&': '&amp;',
      "'": '&apos;',
      '"': '&quot;',
    };
    return entities[character];
  });
}

function formatDate(value: string | null | undefined, fallback: string) {
  if (!value) return fallback;
  const timestamp = Date.parse(value);
  return Number.isNaN(timestamp) ? fallback : new Date(timestamp).toISOString().slice(0, 10);
}

function createSitemap(articles: ArticleSitemapEntry[], currentDate: string) {
  const urls = [
    `  <url>\n    <loc>${BASE_URL}/</loc>\n    <lastmod>${currentDate}</lastmod>\n    <changefreq>daily</changefreq>\n    <priority>1.0</priority>\n  </url>`,
    ...articles
      .filter((article) => typeof article.slug === 'string' && article.slug.length > 0)
      .map((article) => {
        const location = `${BASE_URL}/article/${encodeURIComponent(article.slug)}`;
        const lastmod = formatDate(article.updated_at, currentDate);
        return `  <url>\n    <loc>${escapeXml(location)}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>`;
      }),
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="${SITEMAP_NAMESPACE}">\n${urls.join('\n')}\n</urlset>`;
}

function sitemapResponse(articles: ArticleSitemapEntry[], isFallback = false) {
  const currentDate = new Date().toISOString().slice(0, 10);
  return new Response(createSitemap(articles, currentDate), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': isFallback ? 'public, max-age=60' : 'public, max-age=3600',
      ...(isFallback ? { 'X-Sitemap-Status': 'fallback' } : {}),
    },
  });
}

export async function onRequest(context: any) {
  const { VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY } = context.env;
  if (!VITE_SUPABASE_URL || !VITE_SUPABASE_ANON_KEY) {
    console.error('Sitemap: Supabase configuration is missing; serving the static sitemap.');
    return sitemapResponse([], true);
  }

  try {
    const response = await fetch(
      `${VITE_SUPABASE_URL}/rest/v1/articles?is_published=eq.true&select=slug,updated_at`,
      {
        headers: {
          apikey: VITE_SUPABASE_ANON_KEY,
          Authorization: `Bearer ${VITE_SUPABASE_ANON_KEY}`,
        },
      },
    );
    if (!response.ok) {
      console.error(`Sitemap: article request failed with status ${response.status}; serving the static sitemap.`);
      return sitemapResponse([], true);
    }

    const articles: unknown = await response.json();
    if (!Array.isArray(articles)) {
      console.error('Sitemap: article response was not an array; serving the static sitemap.');
      return sitemapResponse([], true);
    }

    const validArticles = articles.filter(
      (article): article is ArticleSitemapEntry =>
        typeof article === 'object'
        && article !== null
        && typeof (article as ArticleSitemapEntry).slug === 'string',
    );
    return sitemapResponse(validArticles);
  } catch (error) {
    console.error('Sitemap: failed to generate dynamic entries; serving the static sitemap.', error);
    return sitemapResponse([], true);
  }
}
