// Cloudflare Pages Function for generating a dynamic sitemap
export async function onRequest(context: any) {
  // Use the environment variables from Cloudflare
  const SUPABASE_URL = context.env.VITE_SUPABASE_URL;
  const SUPABASE_ANON_KEY = context.env.VITE_SUPABASE_ANON_KEY;

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    return new Response('Missing Supabase credentials', { status: 500 });
  }

  try {
    // Fetch published articles
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/articles?is_published=eq.true&select=slug,updated_at`,
      {
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        },
      }
    );

    const articles = await response.json();

    const baseUrl = 'https://rawaya.site';
    const currentDate = new Date().toISOString().split('T')[0];

    // Build the XML
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    // Add static homepage
    xml += `  <url>\n`;
    xml += `    <loc>${baseUrl}/</loc>\n`;
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += `    <changefreq>daily</changefreq>\n`;
    xml += `    <priority>1.0</priority>\n`;
    xml += `  </url>\n`;

    // Add dynamic articles
    if (Array.isArray(articles)) {
      articles.forEach((article: any) => {
        const lastmod = article.updated_at ? article.updated_at.split('T')[0] : currentDate;
        xml += `  <url>\n`;
        xml += `    <loc>${baseUrl}/article/${article.slug}</loc>\n`;
        xml += `    <lastmod>${lastmod}</lastmod>\n`;
        xml += `    <changefreq>weekly</changefreq>\n`;
        xml += `    <priority>0.8</priority>\n`;
        xml += `  </url>\n`;
      });
    }

    xml += `</urlset>`;

    return new Response(xml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    return new Response('Error generating sitemap', { status: 500 });
  }
}
