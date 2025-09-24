// src/services/ProductManager.js

import GoogleSheetsAPI from './googleSheetsAPI.js';

class ProductManager {
  constructor() {
    this.localProducts = null;
    this.lastSync = null;
    this.syncInterval = 5 * 60 * 1000; // 5 minutes
    this.isOnline = navigator.onLine;
    this.isInitialized = false;

    // Monitor online status
    window.addEventListener('online', () => {
      this.isOnline = true;
      console.log('Connection restored - online');
    });

    window.addEventListener('offline', () => {
      this.isOnline = false;
      console.log('Connection lost - offline');
    });

    // Auto-sync every 5 minutes when online
    this.startAutoSync();
  }

  // Initialize product data with description and details support
  async initialize() {
    if (this.isInitialized) {
      return { success: true, cached: true };
    }

    try {
      console.log('Initializing ProductManager with description and details support...');

      // Always load from localStorage first for fast startup
      this.loadFromLocalStorage();

      // Then try to sync from sheets if online
      if (this.isOnline) {
        try {
          await this.syncFromSheets();
        } catch (syncError) {
          console.warn('Initial sync failed, using local data:', syncError.message);
        }
      } else {
        console.log('Offline - using local data only');
      }

      this.isInitialized = true;
      return { success: true };

    } catch (error) {
      console.error('Failed to initialize ProductManager:', error);
      // Ensure we have at least empty array
      if (!this.localProducts) {
        this.localProducts = [];
      }
      this.isInitialized = true;
      return { error: error.message, fallback: true };
    }
  }

  // Load products from local storage
  loadFromLocalStorage() {
    try {
      const stored = localStorage.getItem('productManager_products');
      const lastSync = localStorage.getItem('productManager_lastSync');

      if (stored) {
        this.localProducts = JSON.parse(stored);
        this.lastSync = lastSync;
        console.log(`Loaded ${this.localProducts.length} products from localStorage`);
      } else {
        this.localProducts = [];
        console.log('No products found in localStorage');
      }
    } catch (error) {
      console.error('Error loading from localStorage:', error);
      this.localProducts = [];
    }
  }

  // Save products to local storage
  saveToLocalStorage() {
    try {
      if (this.localProducts) {
        localStorage.setItem('productManager_products', JSON.stringify(this.localProducts));
        localStorage.setItem('productManager_lastSync', new Date().toISOString());
        console.log(`Saved ${this.localProducts.length} products to localStorage`);
      }
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }

  // Sync from Google Sheets with description and details formatting
  async syncFromSheets() {
    try {
      console.log('Syncing from Google Sheets with description and details...');
      const response = await GoogleSheetsAPI.getAllProducts(); // This now includes description and details

      if (response && response.error) {
        throw new Error(response.error);
      }

      // Handle different response formats
      let products = [];
      if (Array.isArray(response)) {
        products = response;
      } else if (response && Array.isArray(response.data)) {
        products = response.data;
      } else if (response && response.success && Array.isArray(response.products)) {
        products = response.products;
      }

      // Convert products to app format (now includes description and details)
      this.localProducts = products.map(product => this.convertToAppFormat(product));
      this.lastSync = new Date().toISOString();
      this.saveToLocalStorage();

      console.log(`Successfully synced ${this.localProducts.length} products with description and details from sheets`);
      return { success: true, count: this.localProducts.length };

    } catch (error) {
      console.error('Error syncing from sheets:', error);
      // Don't throw - let the app continue with local data
      return { error: error.message, fallback: true };
    }
  }

  // Get all products
  async getAllProducts() {
    if (!this.isInitialized) {
      await this.initialize();
    }

    return this.localProducts || [];
  }

  // Add new product
  async addProduct(productData) {
    try {
      // Validate required fields
      if (!productData.name || !productData.price) {
        return { error: 'Name and price are required' };
      }

      console.log('Adding product:', productData.name);

      let result;
      if (this.isOnline) {
        // Convert to sheet format
        const sheetData = this.convertToSheetFormat(productData);
        result = await GoogleSheetsAPI.addProduct(sheetData);

        if (result && result.success) {
          // Sync to get updated data with proper ID
          await this.syncFromSheets();
        } else if (result && result.error) {
          return result;
        }
      } else {
        // Add to local storage for offline mode
        const newId = Date.now();
        const newProduct = {
          id: newId,
          ...this.convertToAppFormat(productData)
        };

        this.localProducts = this.localProducts || [];
        this.localProducts.push(newProduct);
        this.saveToLocalStorage();
        result = { success: true, id: newId, product: newProduct };
      }

      return result;

    } catch (error) {
      console.error('Error adding product:', error);
      return { error: error.message };
    }
  }

  // Update product
  async updateProduct(productId, productData) {
    try {
      console.log('Updating product:', productId);

      let result;
      if (this.isOnline) {
        // Convert to sheet format
        const sheetData = this.convertToSheetFormat(productData);
        result = await GoogleSheetsAPI.updateProduct(productId, sheetData);

        if (result && result.success) {
          // Sync to get updated data
          await this.syncFromSheets();
        } else if (result && result.error) {
          return result;
        }
      } else {
        // Update in local storage for offline mode
        if (this.localProducts) {
          const index = this.localProducts.findIndex(p => p.id.toString() === productId.toString());
          if (index !== -1) {
            this.localProducts[index] = {
              ...this.localProducts[index],
              ...this.convertToAppFormat(productData)
            };
            this.saveToLocalStorage();
            result = { success: true, productId };
          } else {
            return { error: 'Product not found' };
          }
        } else {
          return { error: 'No products loaded' };
        }
      }

      return result;

    } catch (error) {
      console.error('Error updating product:', error);
      return { error: error.message };
    }
  }

  // Delete product
  async deleteProduct(productId) {
    try {
      console.log('Deleting product:', productId);

      let result;
      if (this.isOnline) {
        result = await GoogleSheetsAPI.deleteProduct(productId);

        if (result && result.success) {
          // Sync to get updated data
          await this.syncFromSheets();
        } else if (result && result.error) {
          return result;
        }
      } else {
        // Delete from local storage for offline mode
        if (this.localProducts) {
          const index = this.localProducts.findIndex(p => p.id.toString() === productId.toString());
          if (index !== -1) {
            this.localProducts.splice(index, 1);
            this.saveToLocalStorage();
            result = { success: true, deletedId: productId };
          } else {
            return { error: 'Product not found' };
          }
        } else {
          return { error: 'No products loaded' };
        }
      }

      return result;

    } catch (error) {
      console.error('Error deleting product:', error);
      return { error: error.message };
    }
  }

  // Search products (now includes details in search)
  async searchProducts(searchTerm) {
    try {
      const products = await this.getAllProducts();
      const term = searchTerm.toLowerCase();
      return products.filter(product =>
        (product.name && product.name.toLowerCase().includes(term)) ||
        (product.description && product.description.toLowerCase().includes(term)) ||
        (product.details && product.details.toLowerCase().includes(term)) ||
        (product.category && product.category.toLowerCase().includes(term))
      );
    } catch (error) {
      console.error('Error searching products:', error);
      return [];
    }
  }

  // Get products by category
  async getProductsByCategory(category) {
    try {
      const products = await this.getAllProducts();
      return products.filter(product =>
        product.category && product.category.toLowerCase() === category.toLowerCase()
      );
    } catch (error) {
      console.error('Error getting products by category:', error);
      return [];
    }
  }

  // Get unique categories
  async getCategories() {
    try {
      const products = await this.getAllProducts();
      const categories = [...new Set(products
        .map(product => product.category)
        .filter(category => category && category.trim() !== '')
      )];
      return categories.sort();
    } catch (error) {
      console.error('Error getting categories:', error);
      return [];
    }
  }

  // Force sync with Google Sheets
  async forceSync() {
    if (!this.isOnline) {
      return { error: 'Cannot sync while offline' };
    }

    try {
      console.log('Force syncing with description and details support...');
      const result = await this.syncFromSheets();
      return { success: true, message: 'Sync completed successfully', ...result };
    } catch (error) {
      console.error('Force sync failed:', error);
      return { error: error.message };
    }
  }

  // Get sync status
  getSyncStatus() {
    return {
      isOnline: this.isOnline,
      lastSync: this.lastSync,
      hasLocalData: !!(this.localProducts && this.localProducts.length > 0),
      productCount: this.localProducts ? this.localProducts.length : 0,
      isInitialized: this.isInitialized
    };
  }

  // Start auto-sync
  startAutoSync() {
    setInterval(async () => {
      if (this.isOnline && this.isInitialized) {
        try {
          console.log('Auto-sync running with description and details support...');
          await this.syncFromSheets();
        } catch (error) {
          console.error('Auto-sync failed:', error);
        }
      }
    }, this.syncInterval);
  }

  // Test connection to Google Sheets
  async testConnection() {
    try {
      if (!this.isOnline) {
        return { error: 'Device is offline' };
      }

      const result = await GoogleSheetsAPI.testConnection();
      return result;
    } catch (error) {
      console.error('Connection test failed:', error);
      return { error: error.message };
    }
  }

  // Convert sheet product format to app format (now handles description and details)
  convertToAppFormat(sheetProduct) {
    return {
      id: sheetProduct.id || Date.now(),
      name: sheetProduct.name || '',
      description: sheetProduct.description || sheetProduct.descriptionPlain || `${sheetProduct.name || 'Product'} - Perfect for your needs.`, // Rich text description
      descriptionPlain: sheetProduct.descriptionPlain || sheetProduct.description || '', // Fallback plain text
      details: sheetProduct.details || sheetProduct.detailsPlain || '', // Rich text details
      detailsPlain: sheetProduct.detailsPlain || sheetProduct.details || '', // Fallback plain text for details
      price: parseFloat(sheetProduct.price) || 0,
      originalPrice: sheetProduct.originalPrice ? parseFloat(sheetProduct.originalPrice) : null,
      discount: sheetProduct.discount || null,
      rating: sheetProduct.rating ? parseFloat(sheetProduct.rating) : null,
      reviews: sheetProduct.reviews ? parseInt(sheetProduct.reviews) : null,
      image: sheetProduct.image || '/api/placeholder/300/300',
      images: sheetProduct.images || [], // Additional images array
      category: sheetProduct.category || 'General',
      buyNowText: "BUY NOW",
      savePercent: sheetProduct.savePercent || (sheetProduct.originalPrice && sheetProduct.price ?
        Math.round(((sheetProduct.originalPrice - sheetProduct.price) / sheetProduct.originalPrice) * 100) : null)
    };
  }

  // Convert app format to sheet format
  convertToSheetFormat(appProduct) {
    return {
      name: appProduct.name,
      description: appProduct.description || appProduct.descriptionPlain, // Send description
      details: appProduct.details || appProduct.detailsPlain, // Send details
      price: appProduct.price ? appProduct.price.toString() : '0',
      originalPrice: appProduct.originalPrice ? appProduct.originalPrice.toString() : '',
      image: appProduct.image || '',
      images: appProduct.images || [], // Include images array
      category: appProduct.category || 'General',
      savePercent: appProduct.savePercent ? appProduct.savePercent.toString() : ''
    };
  }

  // Clear all local data
  clearLocalData() {
    try {
      localStorage.removeItem('productManager_products');
      localStorage.removeItem('productManager_lastSync');
      this.localProducts = [];
      this.lastSync = null;
      console.log('Local data cleared');
    } catch (error) {
      console.error('Error clearing local data:', error);
    }
  }
}

export default new ProductManager();
