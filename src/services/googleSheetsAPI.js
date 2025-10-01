// src/services/googleSheetsAPI.js

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxUJS-VNU057UWFWAykP-LMGBV1q-GJw8Ns7Pq-HMe8STV7sfPx-VJsnf_6EPTjsS0frQ/exec';

// Enhanced getAllProducts function with sorting
export const getAllProducts = async (sortBy = 'featured') => {
  try {
    const response = await fetch(`${APPS_SCRIPT_URL}?action=getAllProducts&sortBy=${encodeURIComponent(sortBy)}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    if (data.error) {
      throw new Error(data.error);
    }

    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Enhanced search function with sorting
export const searchProducts = async (searchTerm, sortBy = 'featured') => {
  try {
    const response = await fetch(`${APPS_SCRIPT_URL}?action=searchProducts&searchTerm=${encodeURIComponent(searchTerm)}&sortBy=${encodeURIComponent(sortBy)}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    if (data.error) {
      throw new Error(data.error);
    }

    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error searching products:', error);
    throw error;
  }
};

// Enhanced category function with sorting
export const getProductsByCategory = async (category, sortBy = 'featured') => {
  try {
    const response = await fetch(`${APPS_SCRIPT_URL}?action=getProductsByCategory&category=${encodeURIComponent(category)}&sortBy=${encodeURIComponent(sortBy)}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    if (data.error) {
      throw new Error(data.error);
    }

    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching products by category:', error);
    throw error;
  }
};

class GoogleSheetsAPI {
  constructor() {
    this.baseURL = APPS_SCRIPT_URL;
    this.requestQueue = [];
    this.isProcessingQueue = false;
    this.maxRetries = 3;
    this.retryDelay = 1000;
  }

  // Request queuing to prevent API rate limiting
  async queueRequest(requestFn) {
    return new Promise((resolve, reject) => {
      this.requestQueue.push({ requestFn, resolve, reject });
      this.processQueue();
    });
  }

  async processQueue() {
    if (this.isProcessingQueue || this.requestQueue.length === 0) {
      return;
    }

    this.isProcessingQueue = true;

    while (this.requestQueue.length > 0) {
      const { requestFn, resolve, reject } = this.requestQueue.shift();
      
      try {
        const result = await requestFn();
        resolve(result);
      } catch (error) {
        reject(error);
      }

      // Small delay between requests to prevent rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    this.isProcessingQueue = false;
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

  // Enhanced GET request with retry logic
  async makeGetRequest(action, params = {}) {
    return this.queueRequest(async () => {
      let lastError;
      
      for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
        try {
          const url = this.buildURL(action, params);
          console.log(`🌐 Making GET request (attempt ${attempt}): ${action}`, { url, params });

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

          return result;

        } catch (error) {
          lastError = error;
          console.warn(`❌ Attempt ${attempt} failed for ${action}:`, error.message);
          
          if (attempt < this.maxRetries) {
            await new Promise(resolve => setTimeout(resolve, this.retryDelay * attempt));
          }
        }
      }

      console.error(`❌ All attempts failed for ${action}:`, lastError);
      return {
        error: lastError.message,
        action: action,
        timestamp: new Date().toISOString()
      };
    });
  }

  // Enhanced POST request with retry logic
  async makePostRequest(action, data = {}) {
    return this.queueRequest(async () => {
      let lastError;
      
      for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
        try {
          console.log(`🌐 Making POST request (attempt ${attempt}): ${action}`, data);

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
          lastError = error;
          console.warn(`❌ Attempt ${attempt} failed for ${action}:`, error.message);
          
          if (attempt < this.maxRetries) {
            await new Promise(resolve => setTimeout(resolve, this.retryDelay * attempt));
          }
        }
      }

      console.error(`❌ All attempts failed for ${action}:`, lastError);
      return {
        error: lastError.message,
        action: action,
        timestamp: new Date().toISOString()
      };
    });
  }

  // Get all products with rich text formatting and sorting
  async getAllProducts(sortBy = 'featured') {
    return await this.makeGetRequest('getAllProducts', { sortBy });
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

  // Get products by category with sorting
  async getProductsByCategory(category, sortBy = 'featured') {
    return await this.makeGetRequest('getProductsByCategory', { category, sortBy });
  }

  // Search products with sorting
  async searchProducts(searchTerm, sortBy = 'featured') {
    return await this.makeGetRequest('searchProducts', { searchTerm, sortBy });
  }

  // Get all categories
  async getCategories() {
    return await this.makeGetRequest('getCategories');
  }

  // Fix sheet structure
  async fixSheet() {
    return await this.makeGetRequest('fixSheet');
  }

  // Test connection with rich text support info
  async testConnection() {
    return await this.makeGetRequest('test');
  }
}

export default GoogleSheetsAPI;
