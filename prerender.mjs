/**
 * prerender.mjs — Post-build SEO meta injection script
 *
 * After `vite build` produces the SPA in dist/, this script:
 *   1. Reads the route → meta tag mapping
 *   2. Creates a copy of index.html for each route
 *   3. Injects the correct <title>, meta description, OG tags, JSON-LD etc.
 *
 * This approach works on ANY environment (including Vercel's build servers)
 * because it does NOT require a headless browser.
 *
 * Usage:  node prerender.mjs
 * Called automatically by:  npm run build  (see package.json)
 */

import { readFile, writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.join(__dirname, 'dist');
const BASE_URL = 'https://www.triovation.com';

// ──────────── Route → SEO Meta Mapping ────────────
const ROUTES = [
  {
    path: '/About',
    title: 'About Us — Our Story & Mission | Triovation',
    description: 'Learn about Triovation — a creative design studio specializing in corporate gifting, custom merchandise, and design consultancy based in Mumbai, India.',
    keywords: 'about Triovation, design studio Mumbai, corporate gifting company, our story, mission',
  },
  {
    path: '/Products',
    title: 'Products — Corporate Gifting & Custom Merchandise | Triovation',
    description: 'Browse premium corporate gifting products, custom merchandise, festive hampers, home décor, and more at Triovation. Bulk orders available.',
    keywords: 'corporate gifts, custom merchandise, festive gifts, home decor, bulk orders, Triovation, Mumbai',
  },
  {
    path: '/Consultancy',
    title: 'Design Consultancy & Services | Triovation',
    description: 'Professional design consultancy services including branding, UI/UX, illustration, social media design, and more by Triovation.',
    keywords: 'design consultancy, branding services, UI/UX design, graphic design, Triovation',
  },
  {
    path: '/Education',
    title: 'Education & Workshops | Triovation',
    description: 'Join Triovation\'s educational workshops on design, branding, 3D printing, and creative skills. Learn from industry professionals.',
    keywords: 'design workshops, creative education, branding course, 3D printing workshop, Triovation',
  },
  {
    path: '/ContactUs',
    title: 'Contact Us | Triovation',
    description: 'Get in touch with Triovation for corporate gifting enquiries, design consultancy, or custom merchandise orders. Based in Mumbai, India.',
    keywords: 'contact Triovation, corporate gifting enquiry, design consultancy contact, Mumbai',
  },
  {
    path: '/cart',
    title: 'Your Cart | Triovation',
    description: 'Review your cart items at Triovation. Premium corporate gifts and custom merchandise.',
    keywords: 'shopping cart, checkout, Triovation',
  },
  {
    path: '/design-consultancy',
    title: 'Design Consultancy — Branding, UI/UX & More | Triovation',
    description: 'Comprehensive design consultancy services: brand identity, UI/UX, illustrations, social media design, business collateral, and more.',
    keywords: 'design consultancy, brand identity, UI/UX, illustration, business cards, Triovation',
  },
  {
    path: '/design-consultancy/brand-identity-design',
    title: 'Brand Identity Design | Triovation Design Consultancy',
    description: 'Professional brand identity design services — logos, color systems, typography, and complete visual identity by Triovation.',
    keywords: 'brand identity design, logo design, visual identity, branding, Triovation',
  },
  {
    path: '/design-consultancy/brand-manual-design',
    title: 'Brand Manual Design | Triovation Design Consultancy',
    description: 'Complete brand manual and guideline design services to maintain brand consistency across all touchpoints.',
    keywords: 'brand manual, brand guidelines, brand book, design system, Triovation',
  },
  {
    path: '/design-consultancy/digital-illustration-design',
    title: 'Digital Illustration Design | Triovation Design Consultancy',
    description: 'Custom digital illustration services for brands, publications, and marketing materials by Triovation.',
    keywords: 'digital illustration, custom illustration, art, design, Triovation',
  },
  {
    path: '/design-consultancy/business-collateral-design',
    title: 'Business Collateral Design | Triovation Design Consultancy',
    description: 'Professional business collateral design — visiting cards, letterheads, envelopes, and corporate stationery.',
    keywords: 'business cards, letterhead, stationery, corporate collateral, Triovation',
  },
  {
    path: '/design-consultancy/brand-campaigns-design',
    title: 'Brand Campaigns Design | Triovation Design Consultancy',
    description: 'Strategic brand campaign design services for digital and print marketing by Triovation.',
    keywords: 'brand campaigns, marketing design, advertising, campaign design, Triovation',
  },
  {
    path: '/design-consultancy/social-media-design',
    title: 'Social Media Design | Triovation Design Consultancy',
    description: 'Eye-catching social media post and content design for Instagram, Facebook, LinkedIn, and more.',
    keywords: 'social media design, Instagram posts, Facebook design, content creation, Triovation',
  },
  {
    path: '/design-consultancy/digital-painting-design',
    title: 'Digital Painting Design | Triovation Design Consultancy',
    description: 'Custom digital painting and artwork services for personal and commercial use by Triovation.',
    keywords: 'digital painting, digital art, custom artwork, portraits, Triovation',
  },
  {
    path: '/design-consultancy/website-uiux-design',
    title: 'Website UI/UX Design | Triovation Design Consultancy',
    description: 'Modern website UI/UX design services — wireframes, prototypes, and responsive web design by Triovation.',
    keywords: 'UI/UX design, website design, wireframes, prototyping, web design, Triovation',
  },
  {
    path: '/design-consultancy/book-magazine-zine-design',
    title: 'Book, Magazine & Zine Design | Triovation Design Consultancy',
    description: 'Professional layout and design services for books, magazines, zines, and print publications.',
    keywords: 'book design, magazine layout, zine design, publication design, Triovation',
  },
  {
    path: '/terms-condition',
    title: 'Terms & Conditions | Triovation',
    description: 'Read the terms and conditions for using Triovation\'s website and services.',
    keywords: 'terms and conditions, legal, Triovation',
  },
  {
    path: '/privacy-policies',
    title: 'Privacy Policy | Triovation',
    description: 'Read Triovation\'s privacy policy — how we collect, use, and protect your personal data.',
    keywords: 'privacy policy, data protection, Triovation',
  },
  {
    path: '/shipping-delivery',
    title: 'Shipping & Delivery Policy | Triovation',
    description: 'Learn about Triovation\'s shipping and delivery policies, timelines, and charges across India.',
    keywords: 'shipping policy, delivery, shipping charges, Triovation',
  },
  {
    path: '/cancellation-refund',
    title: 'Cancellation & Refund Policy | Triovation',
    description: 'Read Triovation\'s cancellation and refund policy for orders and services.',
    keywords: 'cancellation policy, refund policy, returns, Triovation',
  },
  {
    path: '/sitemap',
    title: 'Sitemap | Triovation',
    description: 'Navigate all pages and sections of the Triovation website.',
    keywords: 'sitemap, navigation, Triovation',
  },
  {
    path: '/bulkorder',
    title: 'Bulk Order & Corporate Gifting | Triovation',
    description: 'Place bulk orders for corporate gifts, event giveaways, joining kits, and custom merchandise. Contact Triovation for volume pricing.',
    keywords: 'bulk order, corporate gifting, event giveaways, joining kits, volume orders, Triovation',
  },
];

// ──────────── Inject meta tags into HTML ────────────
function injectMeta(html, route) {
  const url = `${BASE_URL}${route.path}`;
  const ogImage = route.ogImage || `${BASE_URL}/og-image.jpg`;

  // Replace <title>
  html = html.replace(
    /<title>[^<]*<\/title>/,
    `<title>${escapeHtml(route.title)}</title>`
  );

  // Replace or add meta description
  html = upsertMeta(html, 'name', 'description', route.description);
  html = upsertMeta(html, 'name', 'keywords', route.keywords);

  // Open Graph
  html = upsertMeta(html, 'property', 'og:title', route.title);
  html = upsertMeta(html, 'property', 'og:description', route.description);
  html = upsertMeta(html, 'property', 'og:url', url);
  html = upsertMeta(html, 'property', 'og:image', ogImage);
  html = upsertMeta(html, 'property', 'og:type', 'website');

  // Twitter Card
  html = upsertMeta(html, 'property', 'twitter:title', route.title);
  html = upsertMeta(html, 'property', 'twitter:description', route.description);
  html = upsertMeta(html, 'property', 'twitter:url', url);
  html = upsertMeta(html, 'property', 'twitter:image', ogImage);

  // Canonical URL
  html = html.replace(
    /<link rel="canonical" href="[^"]*"\s*\/?>/,
    `<link rel="canonical" href="${url}" />`
  );

  return html;
}

// ──────────── Helpers ────────────
function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function upsertMeta(html, attr, name, content) {
  const escapedContent = escapeHtml(content);
  const regex = new RegExp(`<meta ${attr}="${name}"[^>]*>`, 'i');

  if (regex.test(html)) {
    return html.replace(regex, `<meta ${attr}="${name}" content="${escapedContent}" />`);
  } else {
    // Insert before </head>
    return html.replace(
      '</head>',
      `  <meta ${attr}="${name}" content="${escapedContent}" />\n</head>`
    );
  }
}

// ──────────── Main ────────────
async function main() {
  console.log('\n🚀 Starting meta injection pre-render...\n');

  // Read the base index.html
  const indexPath = path.join(DIST_DIR, 'index.html');
  if (!existsSync(indexPath)) {
    console.error('❌ dist/index.html not found. Run `vite build` first.');
    process.exit(1);
  }

  const baseHtml = await readFile(indexPath, 'utf-8');
  let count = 0;

  for (const route of ROUTES) {
    // Create output directory
    const outputDir = path.join(DIST_DIR, ...route.path.split('/').filter(Boolean));
    await mkdir(outputDir, { recursive: true });

    // Inject route-specific meta tags
    const html = injectMeta(baseHtml, route);

    // Write the file
    const outputFile = path.join(outputDir, 'index.html');
    await writeFile(outputFile, html, 'utf-8');

    const relativePath = path.relative(DIST_DIR, outputFile);
    console.log(`  ✅ ${route.path} → dist/${relativePath}`);
    count++;
  }

  console.log(`\n🎉 Pre-rendered ${count} routes with SEO meta tags!\n`);
}

main().catch((err) => {
  console.error('Pre-render failed:', err);
  process.exit(1);
});
