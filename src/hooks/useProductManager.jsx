import { useState, useEffect, useCallback } from 'react';
import GoogleSheetsAPI from '../services/googleSheetsAPI.js';

export const useProductManager = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [currentSortBy, setCurrentSortBy] = useState('featured'); // Track current sort

  const googleAPI = new GoogleSheetsAPI();

  // Parse price to numeric value for local sorting
  const parsePrice = useCallback((priceString) => {
    if (!priceString) return 0;
    
    // Handle price strings with currency symbols, commas, etc.
    const numericValue = priceString.toString()
      .replace(/[₹$€£¥,\s]/g, '') // Remove currency symbols and commas
      .replace(/[^\d.-]/g, ''); // Keep only digits, dots, and minus signs
    
    const parsed = parseFloat(numericValue);
    return isNaN(parsed) ? 0 : parsed;
  }, []);

  // Sort products locally (fallback for when server sorting isn't available)
  const sortProductsLocally = useCallback((productsToSort, sortBy = 'featured') => {
    if (!productsToSort || !Array.isArray(productsToSort)) {
      return [];
    }
    
    const sortedProducts = [...productsToSort]; // Create a copy to avoid mutating original
    
    switch (sortBy.toLowerCase()) {
      case 'price-low-high':
      case 'price_low_high':
        return sortedProducts.sort((a, b) => {
          const priceA = parsePrice(a.price);
          const priceB = parsePrice(b.price);
          return priceA - priceB;
        });
        
      case 'price-high-low':
      case 'price_high_low':
        return sortedProducts.sort((a, b) => {
          const priceA = parsePrice(a.price);
          const priceB = parsePrice(b.price);
          return priceB - priceA;
        });
        
      case 'name':
      case 'alphabetical':
        return sortedProducts.sort((a, b) => {
          const nameA = (a.name || '').toLowerCase();
          const nameB = (b.name || '').toLowerCase();
          return nameA.localeCompare(nameB);
        });
        
      case 'newest':
      case 'latest':
        return sortedProducts.sort((a, b) => {
          // Assuming newer products have higher IDs
          const idA = parseInt(a.id) || 0;
          const idB = parseInt(b.id) || 0;
          return idB - idA;
        });
        
      case 'category':
        return sortedProducts.sort((a, b) => {
          const catA = (a.category || '').toLowerCase();
          const catB = (b.category || '').toLowerCase();
          return catA.localeCompare(catB);
        });
        
      case 'featured':
      default:
        // Default ordering (keep original order or by ID)
        return sortedProducts.sort((a, b) => {
          const idA = parseInt(a.id) || 0;
          const idB = parseInt(b.id) || 0;
          return idA - idB;
        });
    }
  }, [parsePrice]);

  // Fetch products from Google Sheets with rich text formatting and sorting
  const fetchProducts = useCallback(async (sortBy = 'featured') => {
    try {
      setLoading(true);
      setError(null);
      console.log('🔄 Fetching products from Google Sheets with description, details, and sorting...');

      // Try to get products with sorting from server first
      let result;
      try {
        // Check if the API supports sorting by trying with sortBy parameter
        result = await googleAPI.getAllProducts(sortBy);
      } catch (serverSortError) {
        console.warn('Server-side sorting not available, falling back to client-side sorting');
        // Fallback to getting all products without sorting
        result = await googleAPI.getAllProducts();
      }

      if (result.error) {
        throw new Error(result.error);
      }

      let finalProducts = Array.isArray(result) ? result : [];
      
      // If server didn't sort (or sorting failed), sort locally
      if (sortBy !== 'featured' && finalProducts.length > 0) {
        // Check if products are actually sorted by looking at the first few prices
        const isSorted = sortBy.includes('price') ? checkIfSorted(finalProducts, sortBy) : false;
        
        if (!isSorted) {
          console.log('🔄 Applying local sorting...');
          finalProducts = sortProductsLocally(finalProducts, sortBy);
        }
      }

      console.log('✅ Products fetched successfully with formatting and sorting:', finalProducts);
      setProducts(finalProducts);
      setCurrentSortBy(sortBy);
      setLastUpdated(new Date().toISOString());

    } catch (err) {
      console.error('❌ Error fetching products:', err);
      setError(err.message);
      setProducts([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  }, [googleAPI, sortProductsLocally]);

  // Helper function to check if products are sorted by price
  const checkIfSorted = useCallback((products, sortBy) => {
    if (products.length < 2) return true;
    
    const prices = products.slice(0, 5).map(p => parsePrice(p.price)); // Check first 5 products
    
    if (sortBy === 'price-low-high') {
      for (let i = 1; i < prices.length; i++) {
        if (prices[i] < prices[i - 1]) return false;
      }
      return true;
    } else if (sortBy === 'price-high-low') {
      for (let i = 1; i < prices.length; i++) {
        if (prices[i] > prices[i - 1]) return false;
      }
      return true;
    }
    
    return false;
  }, [parsePrice]);

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
  }, [googleAPI]);

  // Add new product
  const addProduct = useCallback(async (productData) => {
    try {
      const result = await googleAPI.addProduct(productData);
      if (result.success) {
        await fetchProducts(currentSortBy); // Refresh products list with current sorting
        return result;
      } else {
        throw new Error(result.error || 'Failed to add product');
      }
    } catch (err) {
      console.error('Error adding product:', err);
      throw err;
    }
  }, [fetchProducts, currentSortBy, googleAPI]);

  // Update existing product
  const updateProduct = useCallback(async (productId, productData) => {
    try {
      const result = await googleAPI.updateProduct(productId, productData);
      if (result.success) {
        await fetchProducts(currentSortBy); // Refresh products list with current sorting
        return result;
      } else {
        throw new Error(result.error || 'Failed to update product');
      }
    } catch (err) {
      console.error('Error updating product:', err);
      throw err;
    }
  }, [fetchProducts, currentSortBy, googleAPI]);

  // Delete product
  const deleteProduct = useCallback(async (productId) => {
    try {
      const result = await googleAPI.deleteProduct(productId);
      if (result.success) {
        await fetchProducts(currentSortBy); // Refresh products list with current sorting
        return result;
      } else {
        throw new Error(result.error || 'Failed to delete product');
      }
    } catch (err) {
      console.error('Error deleting product:', err);
      throw err;
    }
  }, [fetchProducts, currentSortBy, googleAPI]);

  // Upload multiple images
  const uploadProductImages = useCallback(async (productId, files) => {
    try {
      const result = await googleAPI.uploadMultipleImages(productId, files);
      if (result.success) {
        await fetchProducts(currentSortBy); // Refresh products list with current sorting
        return result;
      } else {
        throw new Error(result.error || 'Failed to upload images');
      }
    } catch (err) {
      console.error('Error uploading images:', err);
      throw err;
    }
  }, [fetchProducts, currentSortBy, googleAPI]);

  // Search products with sorting
  const searchProducts = useCallback(async (searchTerm, sortBy = currentSortBy) => {
    try {
      if (!searchTerm || searchTerm.trim() === '') {
        // If no search term, return current products with current sorting
        return sortProductsLocally(products, sortBy);
      }

      let result;
      try {
        // Try server-side search with sorting
        result = await googleAPI.searchProducts(searchTerm, sortBy);
      } catch (serverError) {
        console.warn('Server-side search sorting not available, using local sorting');
        result = await googleAPI.searchProducts(searchTerm);
      }

      if (result.error) {
        throw new Error(result.error);
      }

      let searchResults = Array.isArray(result) ? result : [];
      
      // Apply local sorting if needed
      if (sortBy !== 'featured' && searchResults.length > 0) {
        searchResults = sortProductsLocally(searchResults, sortBy);
      }

      return searchResults;
    } catch (err) {
      console.error('Error searching products:', err);
      return [];
    }
  }, [products, currentSortBy, googleAPI, sortProductsLocally]);

  // Get products by category with sorting
  const getProductsByCategory = useCallback(async (category, sortBy = currentSortBy) => {
    try {
      let result;
      try {
        // Try server-side category filtering with sorting
        result = await googleAPI.getProductsByCategory(category, sortBy);
      } catch (serverError) {
        console.warn('Server-side category sorting not available, using local sorting');
        result = await googleAPI.getProductsByCategory(category);
      }

      if (result.error) {
        throw new Error(result.error);
      }

      let categoryProducts = Array.isArray(result) ? result : [];
      
      // Apply local sorting if needed
      if (sortBy !== 'featured' && categoryProducts.length > 0) {
        categoryProducts = sortProductsLocally(categoryProducts, sortBy);
      }

      return categoryProducts;
    } catch (err) {
      console.error('Error getting products by category:', err);
      return [];
    }
  }, [currentSortBy, googleAPI, sortProductsLocally]);

  // Refresh products with specific sorting (public method)
  const refreshProducts = useCallback(async (sortBy = currentSortBy) => {
    await fetchProducts(sortBy);
  }, [fetchProducts, currentSortBy]);

  // Sort current products without refetching
  const sortCurrentProducts = useCallback((sortBy) => {
    if (products.length > 0) {
      const sortedProducts = sortProductsLocally(products, sortBy);
      setProducts(sortedProducts);
      setCurrentSortBy(sortBy);
      console.log(`🔄 Products re-sorted locally by: ${sortBy}`);
    }
  }, [products, sortProductsLocally]);

  // Test connection
  const testConnection = useCallback(async () => {
    try {
      const result = await googleAPI.testConnection();
      return result;
    } catch (err) {
      console.error('Connection test failed:', err);
      return { error: err.message };
    }
  }, [googleAPI]);

  // Initial load
  useEffect(() => {
    fetchProducts('featured'); // Start with featured sorting
    fetchCategories();
  }, [fetchProducts, fetchCategories]);

  // Auto-refresh every 5 minutes when component is active
  useEffect(() => {
    const interval = setInterval(() => {
      if (!loading && document.visibilityState === 'visible') {
        console.log('🔄 Auto-refreshing products with description, details, and current sorting...');
        fetchProducts(currentSortBy);
      }
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(interval);
  }, [fetchProducts, loading, currentSortBy]);

  return {
    // Data
    products,
    categories,
    loading,
    error,
    lastUpdated,
    currentSortBy,

    // Actions
    refreshProducts,
    sortCurrentProducts, // New: Sort without refetching
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
    hasProducts: products.length > 0,
    
    // Sorting utilities
    availableSortOptions: [
      { value: 'featured', label: 'Featured' },
      { value: 'price-low-high', label: 'Price: Low to High' },
      { value: 'price-high-low', label: 'Price: High to Low' },
      { value: 'name', label: 'Alphabetical' },
      { value: 'newest', label: 'Newest' },
      { value: 'category', label: 'Category' }
    ]
  };
};
