import { useState, useEffect, useCallback } from 'react';
import GoogleSheetsAPI from '../services/googleSheetsAPI.js';

export const useProductManager = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const googleAPI = new GoogleSheetsAPI();

  // Fetch products from Google Sheets
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('🔄 Fetching products from Google Sheets...');
      const result = await googleAPI.getAllProducts();

      if (result.error) {
        throw new Error(result.error);
      }

      console.log('✅ Products fetched successfully:', result);
      setProducts(Array.isArray(result) ? result : []);
      setLastUpdated(new Date().toISOString());

    } catch (err) {
      console.error('❌ Error fetching products:', err);
      setError(err.message);
      setProducts([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch categories
  const fetchCategories = useCallback(async () => {
    try {
      const result = await googleAPI.getCategories();
      if (result.error) {
        console.warn('Could not fetch categories:', result.error);
        setCategories([]);
      } else {
        setCategories(Array.isArray(result) ? result : []);
      }
    } catch (err) {
      console.warn('Error fetching categories:', err);
      setCategories([]);
    }
  }, []);

  // Add new product
  const addProduct = useCallback(async (productData) => {
    try {
      const result = await googleAPI.addProduct(productData);
      if (result.success) {
        await fetchProducts(); // Refresh products list
        return result;
      } else {
        throw new Error(result.error || 'Failed to add product');
      }
    } catch (err) {
      console.error('Error adding product:', err);
      throw err;
    }
  }, [fetchProducts]);

  // Update existing product
  const updateProduct = useCallback(async (productId, productData) => {
    try {
      const result = await googleAPI.updateProduct(productId, productData);
      if (result.success) {
        await fetchProducts(); // Refresh products list
        return result;
      } else {
        throw new Error(result.error || 'Failed to update product');
      }
    } catch (err) {
      console.error('Error updating product:', err);
      throw err;
    }
  }, [fetchProducts]);

  // Delete product
  const deleteProduct = useCallback(async (productId) => {
    try {
      const result = await googleAPI.deleteProduct(productId);
      if (result.success) {
        await fetchProducts(); // Refresh products list
        return result;
      } else {
        throw new Error(result.error || 'Failed to delete product');
      }
    } catch (err) {
      console.error('Error deleting product:', err);
      throw err;
    }
  }, [fetchProducts]);

  // Upload multiple images
  const uploadProductImages = useCallback(async (productId, files) => {
    try {
      const result = await googleAPI.uploadMultipleImages(productId, files);
      if (result.success) {
        await fetchProducts(); // Refresh products list
        return result;
      } else {
        throw new Error(result.error || 'Failed to upload images');
      }
    } catch (err) {
      console.error('Error uploading images:', err);
      throw err;
    }
  }, [fetchProducts]);

  // Search products
  const searchProducts = useCallback(async (searchTerm) => {
    try {
      if (!searchTerm || searchTerm.trim() === '') {
        return products;
      }
      
      const result = await googleAPI.searchProducts(searchTerm);
      if (result.error) {
        throw new Error(result.error);
      }
      
      return Array.isArray(result) ? result : [];
    } catch (err) {
      console.error('Error searching products:', err);
      return [];
    }
  }, [products]);

  // Get products by category
  const getProductsByCategory = useCallback(async (category) => {
    try {
      const result = await googleAPI.getProductsByCategory(category);
      if (result.error) {
        throw new Error(result.error);
      }
      
      return Array.isArray(result) ? result : [];
    } catch (err) {
      console.error('Error getting products by category:', err);
      return [];
    }
  }, []);

  // Refresh products (public method)
  const refreshProducts = useCallback(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Test connection
  const testConnection = useCallback(async () => {
    try {
      const result = await googleAPI.testConnection();
      return result;
    } catch (err) {
      console.error('Connection test failed:', err);
      return { error: err.message };
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [fetchProducts, fetchCategories]);

  // Auto-refresh every 5 minutes when component is active
  useEffect(() => {
    const interval = setInterval(() => {
      if (!loading && document.visibilityState === 'visible') {
        console.log('🔄 Auto-refreshing products...');
        fetchProducts();
      }
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(interval);
  }, [fetchProducts, loading]);

  return {
    // Data
    products,
    categories,
    loading,
    error,
    lastUpdated,
    
    // Actions
    refreshProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    uploadProductImages,
    searchProducts,
    getProductsByCategory,
    testConnection,
    
    // Utilities
    isConnected: !error && !loading,
    productCount: products.length,
    hasProducts: products.length > 0
  };
};
