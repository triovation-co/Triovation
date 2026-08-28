export const config = {
  runtime: 'edge',
};

export default async function handler(request) {
  const url = new URL(request.url);
  const path = url.searchParams.get('path') || '/';

  // Get Prerender token from environment variable (set in Vercel Dashboard)
  const prerenderToken = process.env.PRERENDER_TOKEN;

  if (!prerenderToken) {
    // No token — serve the normal SPA by fetching index.html
    return fetch(new URL('/index.html', url.origin));
  }

  // Build the full URL to prerender
  const targetUrl = `${url.origin}${path.startsWith('/') ? path : '/' + path}`;

  // Build the Prerender.io URL
  const prerenderUrl = `https://service.prerender.io/${targetUrl}`;

  try {
    const prerenderResponse = await fetch(prerenderUrl, {
      headers: {
        'X-Prerender-Token': prerenderToken,
        'X-Prerender-Int-Type': 'vercel',
      },
      redirect: 'manual',
    });

    // Handle redirects from prerender
    if (prerenderResponse.status === 301 || prerenderResponse.status === 302) {
      const location = prerenderResponse.headers.get('location');
      if (location) {
        return Response.redirect(location, prerenderResponse.status);
      }
    }

    // Return the prerendered HTML
    const body = await prerenderResponse.text();

    return new Response(body, {
      status: prerenderResponse.status,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'X-Prerendered': 'true',
        'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      },
    });
  } catch (error) {
    // Fallback — serve the normal SPA
    return fetch(new URL('/index.html', url.origin));
  }
}
