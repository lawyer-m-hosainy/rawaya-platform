// Cloudflare Pages Function — injects per-article SEO meta tags server-side
// so non-JS crawlers (WhatsApp, Facebook, Twitter, and Googlebot's first pass)
// see the real article title/image instead of the generic homepage defaults.
// Runs on every route except static assets; only rewrites /article/:slug responses.
//
// HTMLRewriter is a Cloudflare Workers runtime global, not a DOM/Node type, so
// the project's tsconfig (lib: ES2022 + DOM) doesn't know about it. Rather than
// pull in the full @cloudflare/workers-types package (which also redefines
// Request/Response/fetch and could conflict with the DOM lib types the rest of
// the app already relies on), declare just the minimal shape used below.
declare global {
  class HTMLRewriter {
    on(selector: string, handlers: { element?(element: any): void }): HTMLRewriter;
    transform(response: Response): Response;
  }
}

export async function onRequest(context: any) {
  const { request, env, next } = context;
  const url = new URL(request.url);
  const path = url.pathname;

  // Let static assets pass through untouched
  if (path.match(/\.(css|js|png|jpg|jpeg|gif|svg|webp|woff2?|ico|json|xml|txt)$/)) {
    return next();
  }

  const response = await next();

  const contentType = response.headers.get('content-type');
  if (!contentType || !contentType.includes('text/html')) {
    return response;
  }

  // Only articles have per-page dynamic content today (see src/App.tsx routes).
  // Everything else (home, 404, etc.) keeps the static tags already in index.html.
  if (!path.startsWith('/article/')) {
    return response;
  }

  const SUPABASE_URL = env.VITE_SUPABASE_URL;
  const SUPABASE_ANON_KEY = env.VITE_SUPABASE_ANON_KEY;
  const slug = path.split('/')[2];

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY || !slug) {
    return response;
  }

  let ogTitle: string | null = null;
  let ogDesc = '';
  let ogImage = 'https://rawaya.site/og-image.jpg';
  let jsonLd = '';

  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/articles?slug=eq.${encodeURIComponent(slug)}&is_published=eq.true&select=title,excerpt,cover_image,author,created_at,category`,
      { headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` } }
    );
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) {
      const a = data[0];
      ogTitle = `${a.title} | رَوَايَا`;
      ogDesc = a.excerpt || '';
      if (a.cover_image) ogImage = a.cover_image;
      // JSON.stringify does not escape "<", so a title containing "</script>"
      // could break out of the script tag. Escape it to keep the output inert.
      const safeJson = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: a.title,
      description: ogDesc,
      image: [ogImage],
      datePublished: a.created_at,
      dateModified: a.created_at,
      author: { '@type': 'Person', name: a.author },
      publisher: {
        '@type': 'Organization',
        name: 'رَوَايَا',
        logo: { '@type': 'ImageObject', url: 'https://rawaya.site/logo.png' },
      },
      }).replace(/</g, '\\u003c');
      jsonLd = `<script type="application/ld+json">${safeJson}</script>`;
    }
  } catch (e) {
    // Network/parse failure — fall through and keep the default HTML untouched
  }

  // Article not found or unpublished: don't fabricate tags, just serve the page as-is
  // (React will render the "المقال غير موجود" state on the client).
  if (!ogTitle) {
    return response;
  }

  class MetaHandler {
    element(el: any) {
      if (el.tagName === 'title') {
        el.setInnerContent(ogTitle!);
        return;
      }
      const name = el.getAttribute('name');
      const property = el.getAttribute('property');

      if (name === 'description' || property === 'og:description' || name === 'twitter:description') {
        el.setAttribute('content', ogDesc);
      } else if (property === 'og:title' || name === 'twitter:title') {
        el.setAttribute('content', ogTitle!);
      } else if (property === 'og:image' || name === 'twitter:image') {
        el.setAttribute('content', ogImage);
      } else if (property === 'og:url') {
        el.setAttribute('content', `https://rawaya.site${path}`);
      }
    }
  }

  class HeadHandler {
    element(el: any) {
      if (jsonLd) {
        el.append(jsonLd, { html: true });
      }
      el.append(`<link rel="canonical" href="https://rawaya.site${path}" />`, { html: true });
    }
  }

  return new HTMLRewriter()
    .on('title', new MetaHandler())
    .on('meta[name="description"]', new MetaHandler())
    .on('meta[property^="og:"]', new MetaHandler())
    .on('meta[name^="twitter:"]', new MetaHandler())
    .on('head', new HeadHandler())
    .transform(response);
}
