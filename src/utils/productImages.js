/**
 * Product Image Utility
 * 
 * Maps product IDs to local image paths stored in /public/products/.
 * Falls back to original remote URL if local image is not found in the map.
 * 
 * Naming convention:
 *   - Main image:  /products/{id}.png (or .jpg)
 *   - Extra images: /products/{id}_2.png, /products/{id}_3.png, etc.
 */

import imageMap from './productImageMap.json';

/**
 * Get the local path for a product's main image.
 * @param {string} productId - The product ID (e.g., "T0001")
 * @param {string} [fallbackUrl] - Original remote URL to use if not found locally
 * @returns {string} Local path or fallback URL
 */
export const getLocalProductImage = (productId, fallbackUrl = '') => {
  const id = productId?.toString().trim();
  if (!id) return fallbackUrl;

  const entry = imageMap[id];
  if (entry?.main) {
    return entry.main;
  }

  return fallbackUrl;
};

/**
 * Get all local paths for a product's images (main + extras).
 * @param {string} productId - The product ID
 * @param {string} [fallbackMainUrl] - Fallback URL for main image
 * @param {string[]} [fallbackExtraUrls] - Fallback URLs for extra images
 * @returns {string[]} Array of local paths or fallback URLs
 */
export const getLocalProductImages = (productId, fallbackMainUrl = '', fallbackExtraUrls = []) => {
  const id = productId?.toString().trim();
  if (!id) return [fallbackMainUrl, ...fallbackExtraUrls].filter(Boolean);

  const entry = imageMap[id];
  if (!entry) return [fallbackMainUrl, ...fallbackExtraUrls].filter(Boolean);

  const images = [];
  if (entry.main) {
    images.push(entry.main);
  } else if (fallbackMainUrl) {
    images.push(fallbackMainUrl);
  }

  if (entry.extras && entry.extras.length > 0) {
    images.push(...entry.extras);
  } else if (fallbackExtraUrls.length > 0) {
    images.push(...fallbackExtraUrls);
  }

  return images.length > 0 ? images : [fallbackMainUrl, ...fallbackExtraUrls].filter(Boolean);
};

/**
 * Transform a product object to use local image paths.
 * Modifies `image` and `images` fields in-place.
 * @param {Object} product - Product object from API
 * @returns {Object} Product with local image paths
 */
export const transformProductImages = (product) => {
  if (!product || !product.id) return product;

  const id = product.id.toString().trim();
  const entry = imageMap[id];

  if (!entry) return product;

  return {
    ...product,
    image: entry.main || product.image,
    images: (entry.extras && entry.extras.length > 0)
      ? entry.extras
      : (product.images || []),
  };
};

/**
 * Transform an array of products to use local image paths.
 * @param {Object[]} products - Array of product objects
 * @returns {Object[]} Products with local image paths
 */
export const transformAllProductImages = (products) => {
  if (!Array.isArray(products)) return products;
  return products.map(transformProductImages);
};

export default imageMap;
