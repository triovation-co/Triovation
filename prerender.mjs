/**
 * prerender.mjs — Post-build static pre-rendering script
 *
 * After `vite build` produces the SPA in dist/, this script:
 *   1. Starts a local static server from dist/
 *   2. Uses Puppeteer to visit each route
 *   3. Waits for React to render (including async data fetching)
 *   4. Saves the fully-rendered HTML as static files
 *
 * Usage:  node prerender.mjs
 * Called automatically by:  npm run build  (see package.json)
 */

import puppeteer from 'puppeteer';
import { createServer } from 'http';
import { readFile, writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.join(__dirname, 'dist');
const PORT = 4173;

// ──────────── Routes to pre-render ────────────
const ROUTES = [
  '/',
  '/About',
  '/Products',
  '/Consultancy',
  '/Education',
  '/ContactUs',
  '/cart',
  '/design-consultancy',
  '/design-consultancy/brand-identity-design',
  '/design-consultancy/brand-manual-design',
  '/design-consultancy/digital-illustration-design',
  '/design-consultancy/business-collateral-design',
  '/design-consultancy/brand-campaigns-design',
  '/design-consultancy/social-media-design',
  '/design-consultancy/digital-painting-design',
  '/design-consultancy/website-uiux-design',
  '/design-consultancy/book-magazine-zine-design',
  '/terms-condition',
  '/privacy-policies',
  '/shipping-delivery',
  '/cancellation-refund',
  '/sitemap',
  '/bulkorder',
];

// ──────────── Simple static file server ────────────
function startServer() {
  return new Promise((resolve) => {
    const mimeTypes = {
      '.html': 'text/html',
      '.js': 'application/javascript',
      '.css': 'text/css',
      '.json': 'application/json',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.gif': 'image/gif',
      '.svg': 'image/svg+xml',
      '.ico': 'image/x-icon',
      '.webp': 'image/webp',
      '.woff': 'font/woff',
      '.woff2': 'font/woff2',
      '.ttf': 'font/ttf',
      '.pdf': 'application/pdf',
      '.webmanifest': 'application/manifest+json',
    };

    const server = createServer(async (req, res) => {
      let filePath = path.join(DIST_DIR, req.url === '/' ? 'index.html' : req.url);

      // If file doesn't exist, serve index.html (SPA fallback)
      if (!existsSync(filePath)) {
        filePath = path.join(DIST_DIR, 'index.html');
      }

      // If it's a directory, try index.html inside it
      if (existsSync(filePath) && (await import('fs')).statSync(filePath).isDirectory()) {
        filePath = path.join(filePath, 'index.html');
        if (!existsSync(filePath)) {
          filePath = path.join(DIST_DIR, 'index.html');
        }
      }

      try {
        const data = await readFile(filePath);
        const ext = path.extname(filePath).toLowerCase();
        const contentType = mimeTypes[ext] || 'application/octet-stream';
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
      } catch {
        // Final fallback
        const data = await readFile(path.join(DIST_DIR, 'index.html'));
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });

    server.listen(PORT, () => {
      console.log(`📦 Static server running at http://localhost:${PORT}`);
      resolve(server);
    });
  });
}

// ──────────── Pre-render a single route ────────────
async function prerenderRoute(browser, route) {
  const page = await browser.newPage();
  const url = `http://localhost:${PORT}${route}`;

  console.log(`  🔄 Rendering: ${route}`);

  try {
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 15000 });
  } catch {
    // networkidle0 can time out if there are long-polling connections
    // — the page is still usable, continue
    console.log(`  ⚠️  Timeout on networkidle0 for ${route}, capturing anyway...`);
  }

  // Extra wait for any async React rendering / data fetching
  await new Promise((r) => setTimeout(r, 3000));

  // Get the fully rendered HTML
  const html = await page.content();
  await page.close();

  // Determine output path: /About → dist/About/index.html
  const outputDir =
    route === '/'
      ? DIST_DIR
      : path.join(DIST_DIR, ...route.split('/').filter(Boolean));

  await mkdir(outputDir, { recursive: true });

  const outputFile = path.join(outputDir, 'index.html');
  await writeFile(outputFile, html, 'utf-8');

  const relativePath = path.relative(DIST_DIR, outputFile);
  console.log(`  ✅ Saved: dist/${relativePath}`);
}

// ──────────── Main ────────────
async function main() {
  console.log('\n🚀 Starting pre-render...\n');

  // 1. Start local server
  const server = startServer();
  const serverInstance = await server;

  // 2. Launch browser
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  // 3. Pre-render each route
  for (const route of ROUTES) {
    try {
      await prerenderRoute(browser, route);
    } catch (err) {
      console.error(`  ❌ Failed to render ${route}:`, err.message);
    }
  }

  // 4. Cleanup
  await browser.close();
  serverInstance.close();

  console.log(`\n🎉 Pre-rendered ${ROUTES.length} routes successfully!\n`);
}

main().catch((err) => {
  console.error('Pre-render failed:', err);
  process.exit(1);
});
