import { useState, useEffect, useCallback, useMemo } from 'react';
import GoogleSheetsAPI from '../services/googleSheetsAPI.js';

/* =========================================================
   CACHE CONFIG (ONLY FOR PRODUCTS)
========================================================= */
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes
const PRODUCTS_CACHE_KEY = 'triovation_products_cache';

/* =========================================================
   CACHE HELPERS
========================================================= */
const getCachedProducts = (sortBy) => {
  try {
    const raw = localStorage.getItem(`${PRODUCTS_CACHE_KEY}_${sortBy}`);
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    const expired = Date.now() - parsed.timestamp > CACHE_TTL;

    if (expired) {
      localStorage.removeItem(`${PRODUCTS_CACHE_KEY}_${sortBy}`);
      return null;
    }

    return parsed.data;
  } catch {
    return null;
  }
};

const setCachedProducts = (sortBy, data) => {
  localStorage.setItem(
    `${PRODUCTS_CACHE_KEY}_${sortBy}`,
    JSON.stringify({
      timestamp: Date.now(),
      data,
    })
  );
};

/* =========================================================
   HOOK
========================================================= */
export const useProductManager = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [currentSortBy, setCurrentSortBy] = useState('featured');

  // Single Google API instance
  const googleAPI = useMemo(() => new GoogleSheetsAPI(), []);

  /* =========================================================
     PRICE PARSER
  ========================================================= */
  const parsePrice = useCallback((priceString) => {
    if (!priceString) return 0;
    const numericValue = priceString
      .toString()
      .replace(/[₹$€£¥,\s]/g, '')
      .replace(/[^\d.-]/g, '');
    const parsed = parseFloat(numericValue);
    return isNaN(parsed) ? 0 : parsed;
  }, []);

  /* =========================================================
     LOCAL SORT
  ========================================================= */
  const sortProductsLocally = useCallback(
    (productsToSort, sortBy = 'featured') => {
      if (!Array.isArray(productsToSort)) return [];

      const sorted = [...productsToSort];

      switch (sortBy) {
        case 'price-low-high':
          return sorted.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));

        case 'price-high-low':
          return sorted.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));

        case 'name':
        case 'alphabetical':
          return sorted.sort((a, b) =>
            (a.name || '').localeCompare(b.name || '')
          );

        case 'newest':
        case 'latest':
          return sorted.sort(
            (a, b) => (parseInt(b.id) || 0) - (parseInt(a.id) || 0)
          );

        case 'category':
          return sorted.sort((a, b) =>
            (a.category || '').localeCompare(b.category || '')
          );

        case 'featured':
        default:
          return sorted;
      }
    },
    [parsePrice]
  );

  /* =========================================================
     BACKGROUND REFRESH (NO LOADER)
  ========================================================= */
  const refreshFromServer = useCallback(
    async (sortBy) => {
      try {
        console.log('🌐 Refreshing products from Google Sheets...');
        let result;

        try {
          result = await googleAPI.getAllProducts(sortBy);
        } catch {
          result = await googleAPI.getAllProducts();
        }

        if (Array.isArray(result)) {
          const finalProducts =
            sortBy === 'featured'
              ? result
              : sortProductsLocally(result, sortBy);

          setProducts(finalProducts);
          setCachedProducts(sortBy, finalProducts);
          setCurrentSortBy(sortBy);
          setLastUpdated(new Date().toISOString());
        }
      } catch (err) {
        console.error('❌ Background refresh failed:', err);
      }
    },
    [googleAPI, sortProductsLocally]
  );

  /* =========================================================
     FETCH PRODUCTS (CACHED)
  ========================================================= */
  const fetchProducts = useCallback(
    async (sortBy = 'featured') => {
      try {
        setError(null);

        // 1️⃣ Use cache instantly
        const cached = getCachedProducts(sortBy);
        if (cached) {
          console.log('⚡ Using cached products');
          setProducts(cached);
          setCurrentSortBy(sortBy);
          setLoading(false);

          // 2️⃣ Background refresh
          setTimeout(() => refreshFromServer(sortBy), 0);
          return;
        }

        // 3️⃣ No cache → normal fetch
        setLoading(true);
        await refreshFromServer(sortBy);
      } catch (err) {
        console.error('❌ Fetch failed:', err);
        setError(err.message);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    },
    [refreshFromServer]
  );

  /* =========================================================
     FETCH CATEGORIES (NO CACHE — AS REQUESTED)
  ========================================================= */
  const fetchCategories = useCallback(async () => {
    try {
      const result = await googleAPI.getCategories();
      setCategories(Array.isArray(result) ? result : []);
    } catch (err) {
      console.warn('Category fetch failed:', err);
      setCategories([]);
    }
  }, [googleAPI]);

  /* =========================================================
     CRUD (UNCHANGED)
  ========================================================= */
  const addProduct = useCallback(
    async (productData) => {
      const result = await googleAPI.addProduct(productData);
      if (result?.success) await fetchProducts(currentSortBy);
      return result;
    },
    [googleAPI, fetchProducts, currentSortBy]
  );

  const updateProduct = useCallback(
    async (productId, productData) => {
      const result = await googleAPI.updateProduct(productId, productData);
      if (result?.success) await fetchProducts(currentSortBy);
      return result;
    },
    [googleAPI, fetchProducts, currentSortBy]
  );

  const deleteProduct = useCallback(
    async (productId) => {
      const result = await googleAPI.deleteProduct(productId);
      if (result?.success) await fetchProducts(currentSortBy);
      return result;
    },
    [googleAPI, fetchProducts, currentSortBy]
  );

  /* =========================================================
     SEARCH & CATEGORY (NOT CACHED)
  ========================================================= */
  const searchProducts = useCallback(
    async (searchTerm, sortBy = currentSortBy) => {
      if (!searchTerm) return products;

      let result;
      try {
        result = await googleAPI.searchProducts(searchTerm, sortBy);
      } catch {
        result = await googleAPI.searchProducts(searchTerm);
      }

      return sortBy === 'featured'
        ? result
        : sortProductsLocally(result, sortBy);
    },
    [googleAPI, products, sortProductsLocally, currentSortBy]
  );

  const getProductsByCategory = useCallback(
    async (category, sortBy = currentSortBy) => {
      let result;
      try {
        result = await googleAPI.getProductsByCategory(category, sortBy);
      } catch {
        result = await googleAPI.getProductsByCategory(category);
      }

      return sortBy === 'featured'
        ? result
        : sortProductsLocally(result, sortBy);
    },
    [googleAPI, sortProductsLocally, currentSortBy]
  );

  /* =========================================================
     INIT LOAD
  ========================================================= */
  useEffect(() => {
    fetchProducts('featured');
    fetchCategories();
  }, [fetchProducts, fetchCategories]);

  /* =========================================================
     AUTO REFRESH (5 MIN)
  ========================================================= */
  useEffect(() => {
    if (loading) return;

    const interval = setInterval(() => {
      if (document.visibilityState === 'visible') {
        refreshFromServer(currentSortBy);
      }
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [refreshFromServer, currentSortBy, loading]);

  /* =========================================================
     PUBLIC API
  ========================================================= */
  return {
    products,
    categories,
    loading,
    error,
    lastUpdated,
    currentSortBy,

    refreshProducts: fetchProducts,
    sortCurrentProducts: (sortBy) => {
      const sorted = sortProductsLocally(products, sortBy);
      setProducts(sorted);
      setCurrentSortBy(sortBy);
      setCachedProducts(sortBy, sorted);
    },

    addProduct,
    updateProduct,
    deleteProduct,
    searchProducts,
    getProductsByCategory,

    productCount: products.length,
    hasProducts: products.length > 0,
    isConnected: !loading && !error,
  };
};
