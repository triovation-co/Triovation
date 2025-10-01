// src/services/googleSheetsAPI.js

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxUJS-VNU057UWFWAykP-LMGBV1q-GJw8Ns7Pq-HMe8STV7sfPx-VJsnf_6EPTjsS0frQ/exec';

class GoogleSheetsAPI {
  constructor() {
    this.baseURL = APPS_SCRIPT_URL;
  }

  // Helper method to build URL with parameters
  buildURL(action, params = {}) {
    const url = new URL(this.baseURL);
    url.searchParams.append('action', action);
    Object.keys(params).forEach(key => {
      if (params[key] !== null && params[key] !== undefined) {
        url.searchParams.append(key, params[key].toString());
      }
    });
    return url.toString();
  }

  // Enhanced GET request with better error handling
  async makeGetRequest(action, params = {}) {
    try {
      const url = this.buildURL(action, params);
      console.log(`🌐 Making GET request: ${action}`, { url, params });

      const response = await fetch(url, {
        method: 'GET',
        cache: 'no-cache',
        headers: {
          'Accept': 'application/json,text/plain,*/*'
        }
      });

      console.log(`📡 Response status: ${response.status}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log(`✅ ${action} result:`, result);

      // Enhanced logging for products with rich text and details
      if (action === 'getAllProducts' && Array.isArray(result)) {
        result.forEach(product => {
          if (product.description && product.description.includes('<')) {
            console.log(`Product ${product.id} has HTML-formatted description`);
          }
          if (product.details && product.details.includes('<')) {
            console.log(`Product ${product.id} has HTML-formatted details`);
          }
          if (product.images && product.images.length > 0) {
            console.log(`Product ${product.id} has ${product.images.length} additional images`);
          }
        });
      }

      return result;

    } catch (error) {
      console.error(`❌ Error in ${action}:`, error);
      return {
        error: error.message,
        action: action,
        timestamp: new Date().toISOString()
      };
    }
  }

  // Enhanced POST request
  async makePostRequest(action, data = {}) {
    try {
      console.log(`🌐 Making POST request: ${action}`, data);

      const response = await fetch(this.baseURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          action: action,
          ...data
        })
      });

      console.log(`📡 Response status: ${response.status}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log(`✅ ${action} result:`, result);

      return result;

    } catch (error) {
      console.error(`❌ Error in ${action}:`, error);
      return {
        error: error.message,
        action: action,
        timestamp: new Date().toISOString()
      };
    }
  }

  // Get all products with rich text formatting
  async getAllProducts() {
    return await this.makeGetRequest('getAllProducts');
  }

  // Get single product by ID with rich text formatting
  async getProductById(productId) {
    return await this.makeGetRequest('getProductById', { productId });
  }

  // Add new product
  async addProduct(productData) {
    return await this.makePostRequest('addProduct', { productData });
  }

  // Update existing product
  async updateProduct(productId, productData) {
    return await this.makePostRequest('updateProduct', { productId, productData });
  }

  // Delete product
  async deleteProduct(productId) {
    return await this.makePostRequest('deleteProduct', { productId });
  }

  // Get products by category
  async getProductsByCategory(category) {
    return await this.makeGetRequest('getProductsByCategory', { category });
  }

  // Search products
  async searchProducts(searchTerm) {
    return await this.makeGetRequest('searchProducts', { searchTerm });
  }

  // Get all categories
  async getCategories() {
    return await this.makeGetRequest('getCategories');
  }

  // Bulk update products
  async bulkUpdateProducts(updates) {
    return await this.makePostRequest('bulkUpdate', { updates });
  }

  // Get product statistics
  async getProductStats() {
    return await this.makeGetRequest('getStats');
  }

  // Validate image URLs
  async validateImageURLs() {
    return await this.makeGetRequest('validateURLs');
  }

  // Debug sheet structure
  async debugSheet() {
    return await this.makeGetRequest('debugSheet');
  }

  // Fix sheet structure
  async fixSheet() {
    return await this.makeGetRequest('fixSheet');
  }

  // Test images column specifically
  async testImagesColumn() {
    return await this.makeGetRequest('testImages');
  }

  // Test connection with rich text support info
  async testConnection() {
    return await this.makeGetRequest('test');
  }
}

export default GoogleSheetsAPI;
