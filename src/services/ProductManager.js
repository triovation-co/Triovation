import { useState, useEffect, useCallback, useMemo } from 'react';
import GoogleSheetsAPI from '../services/googleSheetsAPI.js';

export const useProductManager = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [currentSortBy, setCurrentSortBy] = useState('featured');

  // FIXED: Create googleAPI instance only once using useMemo
  const googleAPI = useMemo(() => new GoogleSheetsAPI(), []);

  // Parse price to numeric value for local sorting
  const parsePrice = useCallback((priceString) => {
    if (!priceString) return 0;
    const numericValue = priceString.toString()
      .replace(/[â‚¹$â‚¬Â£Â¥,\s]/g, '')
      .replace(/[^\d.-]/g, '');
    const parsed = parseFloat(numericValue);
    return isNaN(parsed) ? 0 : parsed;
  }, []);

  // FIXED: Complete sortProductsLocally function with proper closing
  const sortProductsLocally = useCallback((productsToSort, sortBy = 'featured') => {
    if (!productsToSort || !Array.isArray(productsToSort)) {
      return [];
    }

    const sortedProducts = [...productsToSort];
    
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
        return sortedProducts.sort((a, b) => {
          const idA = parseInt(a.id) || 0;
          const idB = parseInt(b.id) || 0;
          return idA - idB;
        });
    }
  }, [parsePrice]); // FIXED: Added proper closing brace and dependency

  // FIXED: Fetch categories with proper dependencies
  const fetchCategories = useCallback(async () => {
    try {
      console.log('ðŸ·ï¸ Fetching categories from Google Sheets...');
      const result = await googleAPI.getCategories();
      if (result.error) {
        console.warn('Could not fetch categories:', result.error);
        setCategories([]);
      } else {
        console.log('âœ… Categories fetched successfully:', result);
        setCategories(Array.isArray(result) ? result : []);
      }
    } catch (err) {
      console.warn('Error fetching categories:', err);
      setCategories([]);
    }
  }, [googleAPI]);

  // FIXED: Fetch products with proper dependencies
  const fetchProducts = useCallback(async (sortBy = 'featured') => {
    try {
      setLoading(true);
      setError(null);
      console.log('ðŸ“¦ Fetching products from Google Sheets with sorting:', sortBy);
      
      let result;
      try {
        result = await googleAPI.getAllProducts(sortBy);
      } catch (serverSortError) {
        console.warn('Server-side sorting not available, falling back to client-side sorting');
        result = await googleAPI.getAllProducts();
      }
      
      if (result.error) {
        throw new Error(result.error);
      }

      let finalProducts = Array.isArray(result) ? result : [];
      
      // Apply local sorting if needed
      if (sortBy !== 'featured' && finalProducts.length > 0) {
        const isSorted = sortBy.includes('price') ? checkIfSorted(finalProducts, sortBy) : false;
        if (!isSorted) {
          console.log('ðŸ”„ Applying local sorting...');
          finalProducts = sortProductsLocally(finalProducts, sortBy);
        }
      }

      console.log('âœ… Products fetched successfully:', finalProducts.length);
      setProducts(finalProducts);
      setCurrentSortBy(sortBy);
      setLastUpdated(new Date().toISOString());
      
    } catch (err) {
      console.error('âŒ Error fetching products:', err);
      setError(err.message);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [googleAPI, sortProductsLocally]);

  // Helper function to check if products are sorted by price
  const checkIfSorted = useCallback((products, sortBy) => {
    if (products.length < 2) return true;
    const prices = products.slice(0, 5).map(p => parsePrice(p.price));
    
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

  // Other functions with proper dependencies
  const addProduct = useCallback(async (productData) => {
    try {
      const result = await googleAPI.addProduct(productData);
      if (result.success) {
        await fetchProducts(currentSortBy);
        return result;
      } else {
        throw new Error(result.error || 'Failed to add product');
      }
    } catch (err) {
      console.error('Error adding product:', err);
      throw err;
    }
  }, [fetchProducts, currentSortBy, googleAPI]);

  const updateProduct = useCallback(async (productId, productData) => {
    try {
      const result = await googleAPI.updateProduct(productId, productData);
      if (result.success) {
        await fetchProducts(currentSortBy);
        return result;
      } else {
        throw new Error(result.error || 'Failed to update product');
      }
    } catch (err) {
      console.error('Error updating product:', err);
      throw err;
    }
  }, [fetchProducts, currentSortBy, googleAPI]);

  const deleteProduct = useCallback(async (productId) => {
    try {
      const result = await googleAPI.deleteProduct(productId);
      if (result.success) {
        await fetchProducts(currentSortBy);
        return result;
      } else {
        throw new Error(result.error || 'Failed to delete product');
      }
    } catch (err) {
      console.error('Error deleting product:', err);
      throw err;
    }
  }, [fetchProducts, currentSortBy, googleAPI]);

  const searchProducts = useCallback(async (searchTerm, sortBy = currentSortBy) => {
    try {
      if (!searchTerm || !searchTerm.trim()) {
        return sortProductsLocally(products, sortBy);
      }

      let result;
      try {
        result = await googleAPI.searchProducts(searchTerm, sortBy);
      } catch (serverError) {
        console.warn('Server-side search sorting not available, using local sorting');
        result = await googleAPI.searchProducts(searchTerm);
      }

      if (result.error) {
        throw new Error(result.error);
      }

      let searchResults = Array.isArray(result) ? result : [];
      
      if (sortBy !== 'featured' && searchResults.length > 0) {
        searchResults = sortProductsLocally(searchResults, sortBy);
      }

      return searchResults;
    } catch (err) {
      console.error('Error searching products:', err);
      return [];
    }
  }, [products, currentSortBy, googleAPI, sortProductsLocally]);

  const getProductsByCategory = useCallback(async (category, sortBy = currentSortBy) => {
    try {
      let result;
      try {
        result = await googleAPI.getProductsByCategory(category, sortBy);
      } catch (serverError) {
        console.warn('Server-side category sorting not available, using local sorting');
        result = await googleAPI.getProductsByCategory(category);
      }

      if (result.error) {
        throw new Error(result.error);
      }

      let categoryProducts = Array.isArray(result) ? result : [];
      
      if (sortBy !== 'featured' && categoryProducts.length > 0) {
        categoryProducts = sortProductsLocally(categoryProducts, sortBy);
      }

      return categoryProducts;
    } catch (err) {
      console.error('Error getting products by category:', err);
      return [];
    }
  }, [currentSortBy, googleAPI, sortProductsLocally]);

  const refreshProducts = useCallback(async (sortBy = currentSortBy) => {
    await fetchProducts(sortBy);
  }, [fetchProducts, currentSortBy]);

  const sortCurrentProducts = useCallback((sortBy) => {
    if (products.length > 0) {
      const sortedProducts = sortProductsLocally(products, sortBy);
      setProducts(sortedProducts);
      setCurrentSortBy(sortBy);
      console.log('ðŸ”„ Products re-sorted locally by:', sortBy);
    }
  }, [products, sortProductsLocally]);

  const testConnection = useCallback(async () => {
    try {
      const result = await googleAPI.testConnection();
      return result;
    } catch (err) {
      console.error('Connection test failed:', err);
      return { error: err.message };
    }
  }, [googleAPI]);

  // FIXED: Initial load with proper dependencies and cleanup
  useEffect(() => {
    let isMounted = true;
    
    const initializeData = async () => {
      console.log('ðŸš€ Initializing product manager...');
      
      try {
        if (isMounted) {
          await fetchProducts('featured');
        }
        
        if (isMounted) {
          await fetchCategories();
        }
      } catch (error) {
        console.error('âŒ Error during initialization:', error);
        if (isMounted) {
          setError(error.message);
          setLoading(false);
        }
      }
    };

    initializeData();

    return () => {
      isMounted = false;
    };
  }, [fetchProducts, fetchCategories]);

  // FIXED: Auto-refresh with proper cleanup
  useEffect(() => {
    if (loading) return;

    const interval = setInterval(async () => {
      if (document.visibilityState === 'visible') {
        console.log('ðŸ”„ Auto-refreshing products...');
        try {
          await fetchProducts(currentSortBy);
          await fetchCategories();
        } catch (error) {
          console.error('âŒ Auto-refresh failed:', error);
        }
      }
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [fetchProducts, fetchCategories, loading, currentSortBy]);

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
    sortCurrentProducts,
    addProduct,
    updateProduct,
    deleteProduct,
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