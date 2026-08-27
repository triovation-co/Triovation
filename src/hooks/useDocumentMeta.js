import { useEffect, useRef } from 'react';

/**
 * useDocumentMeta — Dynamically updates document head for SEO
 *
 * Sets <title>, <meta> (description, keywords, robots),
 * Open Graph tags, Twitter Card tags, canonical URL, and
 * Product structured data (JSON-LD).
 *
 * When the component unmounts, all injected tags are removed
 * and the original <title> is restored.
 *
 * @param {Object} options
 * @param {string} options.title        — Page title
 * @param {string} options.description  — Meta description
 * @param {string} options.keywords     — Meta keywords (comma-separated)
 * @param {string} options.canonicalUrl — Canonical URL for this page
 * @param {string} options.ogImage      — Open Graph image URL
 * @param {string} options.ogType       — Open Graph type (default: "website")
 * @param {Object} options.product      — Product structured data (optional)
 * @param {string} options.product.name
 * @param {string} options.product.description
 * @param {string} options.product.image
 * @param {string|number} options.product.price
 * @param {string} options.product.currency — default "INR"
 * @param {string} options.product.availability — default "InStock"
 * @param {string} options.product.url
 * @param {string} options.product.brand — default "Triovation"
 * @param {string} options.product.category
 */
const useDocumentMeta = ({
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage,
  ogType = 'website',
  product = null,
} = {}) => {
  const originalTitle = useRef(document.title);
  const injectedElements = useRef([]);

  useEffect(() => {
    // Store original title on first run
    originalTitle.current = document.title;
  }, []);

  useEffect(() => {
    // Remove previously injected tags
    injectedElements.current.forEach((el) => {
      if (el && el.parentNode) {
        el.parentNode.removeChild(el);
      }
    });
    injectedElements.current = [];

    // ──────────── Title ────────────
    if (title) {
      document.title = title;
    }

    // ──────────── Helper: upsert <meta> ────────────
    const setMeta = (attr, attrValue, content) => {
      if (!content) return;

      let el = document.querySelector(`meta[${attr}="${attrValue}"]`);
      if (el) {
        el.setAttribute('content', content);
      } else {
        el = document.createElement('meta');
        el.setAttribute(attr, attrValue);
        el.setAttribute('content', content);
        document.head.appendChild(el);
        injectedElements.current.push(el);
      }
    };

    // ──────────── Standard Meta ────────────
    setMeta('name', 'description', description);
    setMeta('name', 'keywords', keywords);

    // ──────────── Open Graph ────────────
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:type', ogType);
    setMeta('property', 'og:url', canonicalUrl);
    setMeta('property', 'og:image', ogImage);

    // ──────────── Twitter Card ────────────
    setMeta('property', 'twitter:title', title);
    setMeta('property', 'twitter:description', description);
    setMeta('property', 'twitter:image', ogImage);
    setMeta('property', 'twitter:url', canonicalUrl);

    // ──────────── Canonical URL ────────────
    if (canonicalUrl) {
      let link = document.querySelector('link[rel="canonical"]');
      if (link) {
        link.setAttribute('href', canonicalUrl);
      } else {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        link.setAttribute('href', canonicalUrl);
        document.head.appendChild(link);
        injectedElements.current.push(link);
      }
    }

    // ──────────── Product Structured Data (JSON-LD) ────────────
    if (product && product.name) {
      // Remove any existing product structured data
      const existingScript = document.querySelector(
        'script[data-meta="product-jsonld"]'
      );
      if (existingScript) {
        existingScript.parentNode.removeChild(existingScript);
      }

      const parsePrice = (priceStr) => {
        if (!priceStr) return 0;
        const num = priceStr.toString().replace(/[₹$€£¥,\s]/g, '').replace(/[^\d.-]/g, '');
        return parseFloat(num) || 0;
      };

      const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        description: product.description || description || '',
        image: product.image || ogImage || '',
        brand: {
          '@type': 'Brand',
          name: product.brand || 'Triovation',
        },
        offers: {
          '@type': 'Offer',
          priceCurrency: product.currency || 'INR',
          price: parsePrice(product.price),
          availability: `https://schema.org/${product.availability || 'InStock'}`,
          url: product.url || canonicalUrl || '',
          seller: {
            '@type': 'Organization',
            name: 'Triovation',
          },
        },
      };

      if (product.category) {
        structuredData.category = product.category;
      }

      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-meta', 'product-jsonld');
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
      injectedElements.current.push(script);
    }

    // ──────────── Cleanup on unmount ────────────
    return () => {
      document.title = originalTitle.current;
      injectedElements.current.forEach((el) => {
        if (el && el.parentNode) {
          el.parentNode.removeChild(el);
        }
      });
      injectedElements.current = [];
    };
  }, [title, description, keywords, canonicalUrl, ogImage, ogType, product]);
};

export default useDocumentMeta;
