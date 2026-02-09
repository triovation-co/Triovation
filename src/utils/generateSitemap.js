// src/utils/generateSitemap.js
// Client-side sitemap generator for React app
// This generates the sitemap dynamically from your Google Sheets products

import GoogleSheetsAPI from '../services/googleSheetsAPI';

export async function generateSitemap() {
  const googleAPI = new GoogleSheetsAPI();
  const today = new Date().toISOString().split('T')[0];
  
  try {
    // Fetch products and categories
    console.log('Fetching products...');
    const products = await googleAPI.getAllProducts();
    
    console.log('Fetching categories...');
    const categories = await googleAPI.getCategories();
    
    // Generate sitemap XML
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  
  <!-- Main Pages -->
  <url>
    <loc>https://www.triovation.com/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  
  <url>
    <loc>https://www.triovation.com/About</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <url>
    <loc>https://www.triovation.com/Products</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  
  <url>
    <loc>https://www.triovation.com/Consultancy</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>https://www.triovation.com/Education</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <url>
    <loc>https://www.triovation.com/ContactUs</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <!-- E-commerce Pages -->
  <url>
    <loc>https://www.triovation.com/cart</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
  </url>
  
  <url>
    <loc>https://www.triovation.com/Customize_product</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <!-- Design Consultancy Pages -->
  <url>
    <loc>https://www.triovation.com/design-consultancy</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <url>
    <loc>https://www.triovation.com/design-consultancy/brand-identity-design</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <url>
    <loc>https://www.triovation.com/design-consultancy/brand-manual-design</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <url>
    <loc>https://www.triovation.com/design-consultancy/digital-illustration-design</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <url>
    <loc>https://www.triovation.com/design-consultancy/business-collateral-design</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <url>
    <loc>https://www.triovation.com/design-consultancy/brand-campaigns-design</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <url>
    <loc>https://www.triovation.com/design-consultancy/social-media-design</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <url>
    <loc>https://www.triovation.com/design-consultancy/digital-painting-design</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <url>
    <loc>https://www.triovation.com/design-consultancy/website-uiux-design</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <url>
    <loc>https://www.triovation.com/design-consultancy/book-magazine-zine-design</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <!-- Legal/Footer Pages -->
  <url>
    <loc>https://www.triovation.com/terms-condition</loc>
    <lastmod>${today}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  
  <url>
    <loc>https://www.triovation.com/privacy-policies</loc>
    <lastmod>${today}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  
  <url>
    <loc>https://www.triovation.com/shipping-delivery</loc>
    <lastmod>${today}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  
  <url>
    <loc>https://www.triovation.com/cancellation-refund</loc>
    <lastmod>${today}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
`;

    // Add category pages
    if (Array.isArray(categories) && categories.length > 0) {
      sitemap += `\n  <!-- Category Pages -->\n`;
      categories.forEach(category => {
        const categorySlug = encodeURIComponent(category);
        sitemap += `  <url>
    <loc>https://www.triovation.com/Category_page/${categorySlug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
`;
      });
    }

    // Add product pages
    if (Array.isArray(products) && products.length > 0) {
      sitemap += `\n  <!-- Product Pages (${products.length} products) -->\n`;
      products.forEach(product => {
        if (product && product.id) {
          sitemap += `  <url>
    <loc>https://www.triovation.com/product/${product.id}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>
`;
        }
      });
    }

    sitemap += `\n</urlset>`;
    
    console.log(`✅ Sitemap generated with ${products.length} products and ${categories.length} categories`);
    return sitemap;
    
  } catch (error) {
    console.error('Error generating sitemap:', error);
    throw error;
  }
}

// Function to download sitemap as file
export function downloadSitemap(sitemapXml) {
  const blob = new Blob([sitemapXml], { type: 'application/xml' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'sitemap.xml';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}