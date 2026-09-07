/**
 * prerender.mjs — Post-build SEO meta injection script
 *
 * After `vite build` produces the SPA in dist/, this script:
 *   1. Reads the route → meta tag mapping for static pages
 *   2. Fetches all products from the Google Sheets API
 *   3. Creates a copy of index.html for each route (static + product detail)
 *   4. Injects the correct <title>, meta description, OG tags, JSON-LD etc.
 *   5. Injects an <h1> tag and <noscript> content so crawlers see meaningful HTML
 *   6. For product pages, injects JSON-LD Product structured data
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

// Google Sheets API endpoint (same one used by the frontend)
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzWRo8Fr7j9Kk9tfDVYs0s9I2tJnQmXzdmRrwHvp0zSvxyKZxtXhyMuquHhODy-pOIl/exec';

// ──────────── Route → SEO Meta Mapping (Static Pages) ────────────
const ROUTES = [
  {
    path: '/About',
    title: 'About Us — Our Story & Mission | Triovation',
    description: 'Learn about Triovation — a creative design studio specializing in corporate gifting, custom merchandise, and design consultancy based in Mumbai, India.',
    keywords: 'about Triovation, design studio Mumbai, corporate gifting company, our story, mission',
    h1: 'About Us — Our Story & Mission',
    noscriptContent: 'Learn about Triovation, a creative design studio based in Mumbai specializing in corporate gifting, custom merchandise, design consultancy, and educational workshops. Founded in 2025, we bring together Design, Gifting, and Startup Ventures under one roof.',
  },
  {
    path: '/Products',
    title: 'Products — Corporate Gifting & Custom Merchandise | Triovation',
    description: 'Browse premium corporate gifting products, custom merchandise, festive hampers, home décor, and more at Triovation. Bulk orders available.',
    keywords: 'corporate gifts, custom merchandise, festive gifts, home decor, bulk orders, Triovation, Mumbai',
    h1: 'Products — Corporate Gifting & Custom Merchandise',
    noscriptContent: 'Browse Triovation\'s premium corporate gifting products including festive season hampers, corporate gifts, customisation products, home décor items, and more. Bulk orders available for businesses across India.',
  },
  {
    path: '/Consultancy',
    title: 'Design Consultancy & Services | Triovation',
    description: 'Professional design consultancy services including branding, UI/UX, illustration, social media design, and more by Triovation.',
    keywords: 'design consultancy, branding services, UI/UX design, graphic design, Triovation',
    h1: 'Design Consultancy & Services',
    noscriptContent: 'Triovation offers professional design consultancy services including brand identity, UI/UX design, digital illustration, business collateral, social media design, brand campaigns, and startup venture support.',
  },
  {
    path: '/Education',
    title: 'Education & Workshops | Triovation',
    description: 'Join Triovation\'s educational workshops on design, branding, 3D printing, and creative skills. Learn from industry professionals.',
    keywords: 'design workshops, creative education, branding course, 3D printing workshop, Triovation',
    h1: 'Education & Workshops',
    noscriptContent: 'Explore Triovation\'s educational workshops covering design fundamentals, branding, 3D printing, creative skills, and product development. Hands-on learning experiences for students, professionals, and aspiring designers.',
  },
  {
    path: '/ContactUs',
    title: 'Contact Us | Triovation',
    description: 'Get in touch with Triovation for corporate gifting enquiries, design consultancy, or custom merchandise orders. Based in Mumbai, India.',
    keywords: 'contact Triovation, corporate gifting enquiry, design consultancy contact, Mumbai',
    h1: 'Contact Us',
    noscriptContent: 'Contact Triovation for corporate gifting enquiries, design consultancy, bulk orders, or custom merchandise. Based in Mumbai, India. Email: Triovation.co@gmail.com',
  },
  {
    path: '/cart',
    title: 'Your Cart | Triovation',
    description: 'Review your cart items at Triovation. Premium corporate gifts and custom merchandise.',
    keywords: 'shopping cart, checkout, Triovation',
    h1: 'Your Shopping Cart',
    noIndex: true,
  },
  {
    path: '/design-consultancy',
    title: 'Design Consultancy — Branding, UI/UX & More | Triovation',
    description: 'Comprehensive design consultancy services: brand identity, UI/UX, illustrations, social media design, business collateral, and more by Triovation.',
    keywords: 'design consultancy, brand identity, UI/UX, illustration, business cards, Triovation',
    h1: 'Design Consultancy — Branding, UI/UX & More',
    noscriptContent: 'Triovation Design Consultancy offers comprehensive creative services including brand identity design, brand manual design, digital illustration, business collateral, brand campaigns, social media design, digital painting, website UI/UX design, and book/magazine/zine design.',
  },
  {
    path: '/design-consultancy/brand-identity-design',
    title: 'Brand Identity Design | Triovation Design Consultancy',
    description: 'Professional brand identity design services — logos, color systems, typography, and complete visual identity by Triovation.',
    keywords: 'brand identity design, logo design, visual identity, branding, Triovation',
    h1: 'Brand Identity Design',
    noscriptContent: 'Professional brand identity design services by Triovation. We create compelling logos, color systems, typography guides, and complete visual identities that help your brand stand out and connect with your audience.',
  },
  {
    path: '/design-consultancy/brand-manual-design',
    title: 'Brand Manual Design | Triovation Design Consultancy',
    description: 'Complete brand manual and guideline design services to maintain brand consistency across all touchpoints.',
    keywords: 'brand manual, brand guidelines, brand book, design system, Triovation',
    h1: 'Brand Manual Design',
    noscriptContent: 'Complete brand manual and guideline design by Triovation. Ensure brand consistency across all touchpoints with comprehensive guidelines covering logo usage, color palettes, typography, imagery, and tone of voice.',
  },
  {
    path: '/design-consultancy/digital-illustration-design',
    title: 'Digital Illustration Design | Triovation Design Consultancy',
    description: 'Custom digital illustration services for brands, publications, and marketing materials by Triovation.',
    keywords: 'digital illustration, custom illustration, art, design, Triovation',
    h1: 'Digital Illustration Design',
    noscriptContent: 'Custom digital illustration services by Triovation for brands, publications, and marketing materials. From character design to editorial illustrations, we bring your vision to life with unique, hand-crafted digital artwork.',
  },
  {
    path: '/design-consultancy/business-collateral-design',
    title: 'Business Collateral Design | Triovation Design Consultancy',
    description: 'Professional business collateral design — visiting cards, letterheads, envelopes, and corporate stationery.',
    keywords: 'business cards, letterhead, stationery, corporate collateral, Triovation',
    h1: 'Business Collateral Design',
    noscriptContent: 'Professional business collateral design by Triovation including visiting cards, letterheads, envelopes, corporate stationery, and branded materials that make a lasting impression.',
  },
  {
    path: '/design-consultancy/brand-campaigns-design',
    title: 'Brand Campaigns Design | Triovation Design Consultancy',
    description: 'Strategic brand campaign design services for digital and print marketing by Triovation.',
    keywords: 'brand campaigns, marketing design, advertising, campaign design, Triovation',
    h1: 'Brand Campaigns Design',
    noscriptContent: 'Strategic brand campaign design services by Triovation. We create impactful digital and print marketing campaigns that drive engagement, build brand awareness, and deliver measurable results.',
  },
  {
    path: '/design-consultancy/social-media-design',
    title: 'Social Media Design | Triovation Design Consultancy',
    description: 'Eye-catching social media post and content design for Instagram, Facebook, LinkedIn, and more.',
    keywords: 'social media design, Instagram posts, Facebook design, content creation, Triovation',
    h1: 'Social Media Design',
    noscriptContent: 'Eye-catching social media design services by Triovation for Instagram, Facebook, LinkedIn, and more. We create engaging posts, stories, reels, and content that grow your social presence and drive engagement.',
  },
  {
    path: '/design-consultancy/digital-painting-design',
    title: 'Digital Painting Design | Triovation Design Consultancy',
    description: 'Custom digital painting and artwork services for personal and commercial use by Triovation.',
    keywords: 'digital painting, digital art, custom artwork, portraits, Triovation',
    h1: 'Digital Painting Design',
    noscriptContent: 'Custom digital painting and artwork services by Triovation for personal and commercial use. From portraits to landscapes, abstract art to detailed illustrations, we create stunning digital paintings tailored to your vision.',
  },
  {
    path: '/design-consultancy/website-uiux-design',
    title: 'Website UI/UX Design | Triovation Design Consultancy',
    description: 'Modern website UI/UX design services — wireframes, prototypes, and responsive web design by Triovation.',
    keywords: 'UI/UX design, website design, wireframes, prototyping, web design, Triovation',
    h1: 'Website UI/UX Design',
    noscriptContent: 'Modern website UI/UX design services by Triovation including wireframes, prototypes, responsive web design, and user experience optimization. We create intuitive, beautiful websites that convert visitors into customers.',
  },
  {
    path: '/design-consultancy/book-magazine-zine-design',
    title: 'Book, Magazine & Zine Design | Triovation Design Consultancy',
    description: 'Professional layout and design services for books, magazines, zines, and print publications.',
    keywords: 'book design, magazine layout, zine design, publication design, Triovation',
    h1: 'Book, Magazine & Zine Design',
    noscriptContent: 'Professional layout and design services by Triovation for books, magazines, zines, and print publications. We handle typography, page layouts, cover design, and print-ready production.',
  },
  // ──────────── Category Pages ────────────
  {
    path: '/Category_page/FestiveSeason',
    title: 'Festive Season Gifts & Hampers | Triovation',
    description: 'Explore premium festive season gifts, curated hampers, and celebration essentials by Triovation. Perfect for Diwali, Christmas, New Year, and more.',
    keywords: 'festive season gifts, Diwali gifts, Christmas hampers, celebration gifts, Triovation',
    h1: 'Festive Season Gifts & Hampers',
    noscriptContent: 'Browse Triovation\'s festive season collection including curated gift hampers, celebration essentials, and premium festive gifts perfect for Diwali, Christmas, New Year, and other special occasions.',
  },
  {
    path: '/Category_page/corporateGiftingProducts',
    title: 'Corporate Gifting Products | Triovation',
    description: 'Premium corporate gifting products for businesses — employee appreciation gifts, client gifts, event giveaways, and branded merchandise by Triovation.',
    keywords: 'corporate gifts, employee gifts, client gifts, branded merchandise, corporate gifting, Triovation',
    h1: 'Corporate Gifting Products',
    noscriptContent: 'Explore Triovation\'s corporate gifting range including employee appreciation gifts, client gifts, event giveaways, joining kits, and branded merchandise. Customizable products for businesses of all sizes.',
  },
  {
    path: '/Category_page/customisationProducts',
    title: 'Customisation Products | Triovation',
    description: 'Personalised and customisable products by Triovation — acrylic lamps, custom gifts, and bespoke merchandise tailored to your needs.',
    keywords: 'custom products, personalised gifts, acrylic lamps, bespoke merchandise, Triovation',
    h1: 'Customisation Products',
    noscriptContent: 'Discover Triovation\'s customisation products including personalised acrylic lamps, custom gifts, and bespoke merchandise. Every product can be tailored to your unique design, text, or branding requirements.',
  },
  {
    path: '/Category_page/homeDecorProducts',
    title: 'Home Décor Products | Triovation',
    description: 'Beautiful home décor products by Triovation — handcrafted items, artistic pieces, and modern home accessories for every space.',
    keywords: 'home decor, handcrafted decor, artistic home items, modern accessories, Triovation',
    h1: 'Home Décor Products',
    noscriptContent: 'Browse Triovation\'s home décor collection featuring handcrafted items, artistic pieces, and modern accessories designed to elevate any living space.',
  },
  // ──────────── Utility Pages ────────────
  {
    path: '/Customize_product',
    title: 'Customize Your Product | Triovation',
    description: 'Design and customize your own product at Triovation — choose designs, colors, and personalization options for unique gifts and merchandise.',
    keywords: 'customize product, personalize gift, custom design, Triovation',
    h1: 'Customize Your Product',
    noscriptContent: 'Use Triovation\'s product customization tool to design your own unique gifts and merchandise. Choose from various design templates, colors, lighting options, and personalization features.',
  },
  {
    path: '/order-success',
    title: 'Order Placed Successfully | Triovation',
    description: 'Your order has been placed successfully with Triovation. Our team will contact you shortly to confirm payment and delivery details.',
    keywords: 'order success, order confirmation, Triovation',
    h1: 'Order Placed Successfully',
    noIndex: true,
  },
  {
    path: '/thank-you',
    title: 'Thank You for Your Enquiry | Triovation',
    description: 'Thank you for contacting Triovation. Our team has received your message and will get back to you shortly.',
    keywords: 'thank you, enquiry received, Triovation',
    h1: 'Thank You for Your Enquiry',
    noIndex: true,
  },
  {
    path: '/bulkorder',
    title: 'Bulk Order & Corporate Gifting | Triovation',
    description: 'Place bulk orders for corporate gifts, event giveaways, joining kits, and custom merchandise. Contact Triovation for volume pricing and personalized solutions.',
    keywords: 'bulk order, corporate gifting, event giveaways, joining kits, volume orders, Triovation',
    h1: 'Bulk Order & Corporate Gifting',
    noscriptContent: 'Place bulk orders with Triovation for corporate gifts, event giveaways, joining kits, and custom merchandise. We offer volume pricing, personalized solutions, and end-to-end project management for businesses across India.',
  },
  // ──────────── Legal / Footer Pages ────────────
  {
    path: '/terms-condition',
    title: 'Terms & Conditions | Triovation',
    description: 'Read the terms and conditions for using Triovation\'s website and services.',
    keywords: 'terms and conditions, legal, Triovation',
    h1: 'Terms & Conditions',
  },
  {
    path: '/privacy-policies',
    title: 'Privacy Policy | Triovation',
    description: 'Read Triovation\'s privacy policy — how we collect, use, and protect your personal data.',
    keywords: 'privacy policy, data protection, Triovation',
    h1: 'Privacy Policy',
  },
  {
    path: '/shipping-delivery',
    title: 'Shipping & Delivery Policy | Triovation',
    description: 'Learn about Triovation\'s shipping and delivery policies, timelines, and charges across India.',
    keywords: 'shipping policy, delivery, shipping charges, Triovation',
    h1: 'Shipping & Delivery Policy',
  },
  {
    path: '/cancellation-refund',
    title: 'Cancellation & Refund Policy | Triovation',
    description: 'Read Triovation\'s cancellation and refund policy for orders and services.',
    keywords: 'cancellation policy, refund policy, returns, Triovation',
    h1: 'Cancellation & Refund Policy',
  },
  {
    path: '/sitemap',
    title: 'Sitemap | Triovation',
    description: 'Navigate all pages and sections of the Triovation website.',
    keywords: 'sitemap, navigation, Triovation',
    h1: 'Sitemap',
  },
];

// ──────────── Category Label Mapping ────────────
const CATEGORY_LABELS = {
  'FestiveSeason': 'Festive Season Gifts',
  'corporateGiftingProducts': 'Corporate Gifting',
  'customisationProducts': 'Customisation & Merchandising',
  'homeDecorProducts': 'Home Décor',
  'mechanicalProducts': 'Mechanical Products',
  'designConsultancyProducts': 'Design & Consultancy',
  'educationWorkshopsProducts': 'Education & Workshops',
};

// ──────────── Fetch Products from Google Sheets API ────────────
async function fetchProductsFromAPI() {
  const MAX_RETRIES = 3;
  const RETRY_DELAY = 2000;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      console.log(`  📡 Fetching products from Google Sheets API (attempt ${attempt})...`);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout

      const response = await fetch(
        `${APPS_SCRIPT_URL}?action=getAllProducts&sortBy=featured`,
        {
          method: 'GET',
          headers: { 'Accept': 'application/json' },
          signal: controller.signal,
        }
      );

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(`API error: ${data.error}`);
      }

      if (!Array.isArray(data)) {
        throw new Error('API did not return an array');
      }

      console.log(`  ✅ Fetched ${data.length} products from API`);
      return data;

    } catch (err) {
      console.warn(`  ⚠️  Attempt ${attempt} failed: ${err.message}`);
      if (attempt < MAX_RETRIES) {
        console.log(`  ⏳ Retrying in ${RETRY_DELAY / 1000}s...`);
        await new Promise(r => setTimeout(r, RETRY_DELAY * attempt));
      }
    }
  }

  console.error('  ❌ All API fetch attempts failed. Product pages will not be pre-rendered.');
  return [];
}

// ──────────── Convert Product to Route Config ────────────
function stripHtml(html) {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '').replace(/&[^;]+;/g, ' ').trim();
}

function truncate(str, maxLen) {
  if (!str) return '';
  const clean = str.replace(/\s+/g, ' ').trim();
  if (clean.length <= maxLen) return clean;
  return clean.slice(0, maxLen - 3).trim() + '...';
}

function productToRoute(product) {
  const id = product.id?.toString().trim();
  if (!id) return null;

  const name = product.name || `Product ${id}`;
  const rawDescription = stripHtml(product.description || product.shortDescription || '');
  const description = truncate(rawDescription, 160) ||
    `Buy ${name} online at Triovation. Premium corporate gifting and custom merchandise.`;
  const category = product.category || '';
  const categoryLabel = CATEGORY_LABELS[category] || category.replace(/([A-Z])/g, ' $1').trim();
  const price = product.price;
  const image = product.image || '';

  // Format price for display
  const priceStr = price
    ? `₹${typeof price === 'number' ? price.toLocaleString('en-IN') : price}`
    : '';

  // Build noscript content with product details
  const noscriptParts = [`${name} by Triovation.`];
  if (priceStr) noscriptParts.push(`Price: ${priceStr}.`);
  if (categoryLabel) noscriptParts.push(`Category: ${categoryLabel}.`);
  if (rawDescription) noscriptParts.push(truncate(rawDescription, 300));
  noscriptParts.push('Available for purchase and bulk orders across India.');

  // Build JSON-LD Product structured data
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: name,
    description: truncate(rawDescription, 500) || description,
    url: `${BASE_URL}/product/${id}`,
    brand: {
      '@type': 'Brand',
      name: 'Triovation',
    },
    offers: {
      '@type': 'Offer',
      url: `${BASE_URL}/product/${id}`,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'Triovation',
      },
    },
  };

  // Add price to offers if available
  if (price) {
    const numPrice = typeof price === 'string' ? parseFloat(price.replace(/[₹,\s]/g, '')) : price;
    if (!isNaN(numPrice) && numPrice > 0) {
      productJsonLd.offers.price = numPrice;
    }
  }

  // Add image if available
  if (image) {
    productJsonLd.image = image;
  }

  // Add category as additional property
  if (categoryLabel) {
    productJsonLd.category = categoryLabel;
  }

  return {
    path: `/product/${id}`,
    title: `${name} | Triovation`,
    description: description,
    keywords: `${name}, ${categoryLabel}, corporate gifting, buy online, Triovation`.replace(/, ,/g, ','),
    h1: name,
    ogImage: image || undefined,
    ogType: 'product',
    noscriptContent: noscriptParts.join(' '),
    productJsonLd: productJsonLd,
  };
}

// ──────────── Inject meta tags into HTML ────────────
function injectMeta(html, route) {
  const url = `${BASE_URL}${route.path}`;
  const ogImage = route.ogImage || `${BASE_URL}/og-image.jpg`;
  const ogType = route.ogType || 'website';

  // Replace <title>
  html = html.replace(
    /<title>[^<]*<\/title>/,
    `<title>${escapeHtml(route.title)}</title>`
  );

  // Replace or add meta tags
  html = upsertMeta(html, 'name', 'title', route.title);
  html = upsertMeta(html, 'name', 'description', route.description);
  html = upsertMeta(html, 'name', 'keywords', route.keywords);

  // Open Graph
  html = upsertMeta(html, 'property', 'og:title', route.title);
  html = upsertMeta(html, 'property', 'og:description', route.description);
  html = upsertMeta(html, 'property', 'og:url', url);
  html = upsertMeta(html, 'property', 'og:image', ogImage);
  html = upsertMeta(html, 'property', 'og:type', ogType);

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

  // NoIndex for transactional pages
  if (route.noIndex) {
    html = upsertMeta(html, 'name', 'robots', 'noindex, nofollow');
  }

  // ──────── Inject JSON-LD Product schema (product pages only) ────────
  if (route.productJsonLd) {
    const jsonLdScript = `<script type="application/ld+json">${JSON.stringify(route.productJsonLd)}</script>`;
    html = html.replace(
      '</head>',
      `  ${jsonLdScript}\n</head>`
    );
  }

  // ──────── Inject H1 + noscript content into <div id="root"> ────────
  const h1Tag = route.h1
    ? `<h1 style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0">${escapeHtml(route.h1)}</h1>`
    : '';

  const noscriptBlock = route.noscriptContent
    ? `<noscript><div style="padding:2rem;max-width:800px;margin:0 auto"><h2>${escapeHtml(route.title)}</h2><p>${escapeHtml(route.noscriptContent)}</p><p>Visit <a href="${url}">${url}</a> for the full experience.</p></div></noscript>`
    : '';

  html = html.replace(
    '<div id="root"></div>',
    `<div id="root">${h1Tag}${noscriptBlock}</div>`
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

  // ═══════════ PHASE 1: Static Pages ═══════════
  console.log('📄 Phase 1: Pre-rendering static pages...\n');

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

  console.log(`\n  📄 ${count} static pages pre-rendered.\n`);

  // ═══════════ PHASE 2: Product Detail Pages ═══════════
  console.log('🛍️  Phase 2: Pre-rendering product detail pages...\n');

  const products = await fetchProductsFromAPI();
  let productCount = 0;

  if (products.length === 0) {
    console.warn('  ⚠️  No products fetched — skipping product page pre-rendering.');
  } else {
    for (const product of products) {
      const route = productToRoute(product);
      if (!route) {
        console.warn(`  ⚠️  Skipping product with missing ID`);
        continue;
      }

      // Create output directory: dist/product/{id}/
      const outputDir = path.join(DIST_DIR, 'product', product.id.toString().trim());
      await mkdir(outputDir, { recursive: true });

      // Inject product-specific meta tags
      const html = injectMeta(baseHtml, route);

      // Write the file
      const outputFile = path.join(outputDir, 'index.html');
      await writeFile(outputFile, html, 'utf-8');

      const relativePath = path.relative(DIST_DIR, outputFile);
      console.log(`  ✅ ${route.path} → dist/${relativePath}`);
      productCount++;
    }
  }

  const total = count + productCount;
  console.log(`\n  🛍️  ${productCount} product pages pre-rendered.`);
  console.log(`\n🎉 Pre-rendered ${total} total routes with SEO meta tags!\n`);
}

main().catch((err) => {
  console.error('Pre-render failed:', err);
  process.exit(1);
});
