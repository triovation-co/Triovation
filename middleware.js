// Vercel Edge Middleware — intercepts bot requests and proxies them to Prerender.io
// Docs: https://docs.prerender.io/docs/vercel

const BOT_AGENTS = [
  'googlebot',
  'yahoo! slurp',
  'bingbot',
  'yandex',
  'baiduspider',
  'facebookexternalhit',
  'twitterbot',
  'rogerbot',
  'linkedinbot',
  'embedly',
  'quora link preview',
  'showyoubot',
  'outbrain',
  'pinterest/0.',
  'developers.google.com/+/web/snippet',
  'slackbot',
  'vkshare',
  'w3c_validator',
  'redditbot',
  'applebot',
  'whatsapp',
  'flipboard',
  'tumblr',
  'bitlybot',
  'skypeuripreview',
  'nuzzel',
  'discordbot',
  'google page speed',
  'qwantify',
  'pinterestbot',
  'bitrix link preview',
  'xing-contenttabreceiver',
  'chrome-lighthouse',
  'telegrambot',
  'google-inspectiontool',
];

// File extensions that should never be prerendered
const IGNORED_EXTENSIONS = [
  '.js', '.css', '.xml', '.less', '.png', '.jpg', '.jpeg', '.gif',
  '.pdf', '.doc', '.txt', '.ico', '.rss', '.zip', '.mp3', '.rar',
  '.exe', '.wmv', '.doc', '.avi', '.ppt', '.mpg', '.mpeg', '.tif',
  '.wav', '.mov', '.psd', '.ai', '.xls', '.mp4', '.m4a', '.swf',
  '.dat', '.dmg', '.iso', '.flv', '.m4v', '.torrent', '.ttf',
  '.woff', '.woff2', '.svg', '.eot', '.webp', '.avif', '.webm',
];

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - api routes
     * - _next static files
     * - _next image optimization
     * - static files in /public
     */
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
};

export default async function middleware(request) {
  const userAgent = (request.headers.get('user-agent') || '').toLowerCase();
  const url = new URL(request.url);
  const pathname = url.pathname.toLowerCase();

  // Skip prerendering for file extensions (static assets)
  const hasExtension = IGNORED_EXTENSIONS.some((ext) => pathname.endsWith(ext));
  if (hasExtension) {
    return; // Let Vercel handle normally
  }

  // Check if the request is from a bot
  const isBot = BOT_AGENTS.some((bot) => userAgent.includes(bot));

  if (!isBot) {
    return; // Not a bot — serve the normal React SPA
  }

  // Get Prerender token from environment variable
  const prerenderToken = process.env.PRERENDER_TOKEN;

  if (!prerenderToken) {
    console.warn('PRERENDER_TOKEN is not set. Bot request served without prerendering.');
    return; // Fallback to normal SPA if token is missing
  }

  // Build the Prerender.io URL
  const prerenderUrl = `https://service.prerender.io/${request.url}`;

  try {
    const prerenderResponse = await fetch(prerenderUrl, {
      headers: {
        'X-Prerender-Token': prerenderToken,
        'X-Prerender-Int-Type': 'vercel-edge',
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
        'Cache-Control': 'public, max-age=86400, s-maxage=86400', // Cache for 24 hours
      },
    });
  } catch (error) {
    console.error('Prerender.io request failed:', error);
    return; // Fallback to normal SPA on error
  }
}
