import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProductManager } from '../hooks/useProductManager.jsx';

const CustomizableProductGrid = () => {
  const { 
    products: sheetProducts, 
    loading: productsLoading, 
    error: productsError,
    debugInfo,
    isConnected,
    hasProducts
  } = useProductManager();

  const [visibleColumns, setVisibleColumns] = useState({
    id: true,
    name: true,
    description: true,
    details: false,
    price: true,
    image: true,
    images: false,
    category: true,
    customSpecifications: true
  });

  const [gridLayout, setGridLayout] = useState('2');
  const [sortBy, setSortBy] = useState('name');
  const [filterCategory, setFilterCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSpecs, setExpandedSpecs] = useState({});

  // Debug logging
  useEffect(() => {
    console.log('🔍 CustomizableProductGrid Debug Info:', {
      sheetProducts: sheetProducts?.length || 0,
      productsLoading,
      productsError,
      debugInfo,
      isConnected,
      hasProducts,
      sampleProduct: sheetProducts?.[0]
    });
  }, [sheetProducts, productsLoading, productsError, debugInfo, isConnected, hasProducts]);

  // Extract categories safely
  const categories = React.useMemo(() => {
    if (!sheetProducts || !Array.isArray(sheetProducts)) {
      return [];
    }
    return [...new Set(sheetProducts.map(product => product.category).filter(Boolean))];
  }, [sheetProducts]);

  // Filter and sort products safely
  const filteredProducts = React.useMemo(() => {
    if (!sheetProducts || !Array.isArray(sheetProducts)) {
      return [];
    }

    return sheetProducts.filter(product => {
      if (!product) return false;
      
      const matchesSearch = searchTerm === '' || 
        (product.name && product.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (product.category && product.category.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCategory = filterCategory === '' || product.category === filterCategory;

      return matchesSearch && matchesCategory;
    }).sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return (a.name || '').localeCompare(b.name || '');
        case 'price':
          return parseFloat(a.price || 0) - parseFloat(b.price || 0);
        case 'category':
          return (a.category || '').localeCompare(b.category || '');
        case 'id':
          return (a.id || '').toString().localeCompare((b.id || '').toString());
        default:
          return 0;
      }
    });
  }, [sheetProducts, searchTerm, filterCategory, sortBy]);

  const toggleColumn = (columnName) => {
    setVisibleColumns(prev => ({
      ...prev,
      [columnName]: !prev[columnName]
    }));
  };

  const toggleSpecExpansion = (productId) => {
    setExpandedSpecs(prev => ({
      ...prev,
      [productId]: !prev[productId]
    }));
  };

  const formatPrice = (price) => {
    if (!price || price === '') return 'Price not set';
    return `₹${parseFloat(price).toLocaleString('en-IN')}`;
  };

  const getImageSrc = (imageUrl) => {
    if (!imageUrl || imageUrl.trim() === '') {
      return '/api/placeholder/300/300';
    }
    return imageUrl;
  };

  const parseHtmlContent = (htmlContent) => {
    if (!htmlContent) return '';
    // Remove HTML tags but preserve line breaks
    return htmlContent
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<[^>]*>/g, '')
      .trim();
  };

  // Enhanced specifications rendering to match your image layout
  const renderSpecifications = (customSpecs, productId, isExpanded = false) => {
    if (!customSpecs || Object.keys(customSpecs).length === 0) {
      return (
        <div className="text-sm text-gray-500 italic bg-gray-50 p-3 rounded">
          No specifications available
        </div>
      );
    }

    const specSections = Object.keys(customSpecs);
    const totalSpecs = specSections.reduce((count, section) => {
      return count + (typeof customSpecs[section] === 'object' ? Object.keys(customSpecs[section]).length : 1);
    }, 0);

    if (!isExpanded) {
      return (
        <div className="space-y-2">
          <div className="text-sm font-medium text-blue-600">
            📋 {totalSpecs} specifications across {specSections.length} sections
          </div>
          <button 
            onClick={(e) => {
              e.preventDefault();
              toggleSpecExpansion(productId);
            }}
            className="text-xs text-blue-500 hover:text-blue-700 underline"
          >
            View Details →
          </button>
        </div>
      );
    }

    return (
      <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
        <div className="flex justify-between items-center">
          <h4 className="font-semibold text-gray-800">Product Specifications</h4>
          <button 
            onClick={(e) => {
              e.preventDefault();
              toggleSpecExpansion(productId);
            }}
            className="text-xs text-gray-500 hover:text-gray-700"
          >
            ✕ Close
          </button>
        </div>

        {/* Render sections in a grid layout like your image */}
        <div className="grid md:grid-cols-2 gap-6">
          {specSections.map((sectionName, sectionIndex) => {
            const sectionData = customSpecs[sectionName];
            
            return (
              <div key={sectionIndex} className="space-y-3">
                <h5 className="text-sm font-semibold text-gray-700 border-b border-gray-200 pb-1">
                  {sectionName}
                </h5>
                
                {typeof sectionData === 'object' && sectionData !== null ? (
                  <div className="space-y-2">
                    {Object.entries(sectionData).map(([key, value], index) => (
                      <div key={index} className="flex justify-between items-start text-sm">
                        <span className="text-gray-600 font-medium mr-3 flex-shrink-0">
                          {key}:
                        </span>
                        <span className="text-gray-800 text-right flex-grow">
                          {value || 'Not specified'}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-gray-700">
                    {sectionData || 'No details available'}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Demo details section if available */}
        {customSpecs['demo details'] && (
          <div className="border-t pt-4 mt-4">
            <h5 className="text-sm font-semibold text-gray-700 mb-2">Demo Details</h5>
            {typeof customSpecs['demo details'] === 'object' ? (
              <div className="space-y-2">
                {Object.entries(customSpecs['demo details']).map(([key, value], index) => (
                  <div key={index} className="flex justify-between items-start text-sm">
                    <span className="text-gray-600 font-medium mr-3 flex-shrink-0">
                      {key}:
                    </span>
                    <span className="text-gray-800 text-right flex-grow">
                      {value || 'Not specified'}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-gray-700">
                {customSpecs['demo details']}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  // Loading state
  if (productsLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products from Google Sheets...</p>
          {debugInfo && (
            <p className="text-xs text-gray-400 mt-2">
              Render #{debugInfo.renderCount} | Instance: {debugInfo.instanceId}
            </p>
          )}
        </div>
      </div>
    );
  }

  // Error state
  if (productsError) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-semibold">Error loading products</h3>
            <p className="text-sm text-gray-600 mt-2">{productsError}</p>
          </div>
          {debugInfo && (
            <div className="text-xs text-gray-400 mt-4 p-4 bg-gray-50 rounded">
              <p>Debug Info:</p>
              <p>Renders: {debugInfo.renderCount} | Subscribers: {debugInfo.subscriberCount}</p>
              <p>Instance: {debugInfo.instanceId}</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // No products state
  if (!hasProducts || filteredProducts.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">
          <div className="text-gray-500 mb-4">
            <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8l-7 7-7-7" />
            </svg>
            <h3 className="text-lg font-semibold">
              {sheetProducts?.length > 0 ? 'No products match your filters' : 'No products found'}
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              {sheetProducts?.length > 0 
                ? 'Try adjusting your search or filter criteria' 
                : 'Check your Google Sheets connection and data'}
            </p>
            {sheetProducts?.length > 0 && (
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setFilterCategory('');
                }}
                className="mt-4 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
              >
                Clear Filters
              </button>
            )}
          </div>
          {debugInfo && (
            <div className="text-xs text-gray-400 mt-4 p-4 bg-gray-50 rounded">
              <p>Total products in sheets: {sheetProducts?.length || 0}</p>
              <p>Filtered products: {filteredProducts.length}</p>
              <p>Connection: {isConnected ? '✅ Connected' : '❌ Disconnected'}</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Product Grid - Google Sheets Integration
        </h1>
        <p className="text-gray-600">
          View and customize your Google Sheets product data with flexible specifications
        </p>
        {debugInfo && (
          <p className="text-xs text-gray-400 mt-2">
            Showing {filteredProducts.length} of {sheetProducts?.length || 0} products | 
            Render #{debugInfo.renderCount} | 
            {debugInfo.subscriberCount} subscriber(s)
          </p>
        )}
      </div>

      {/* Controls */}
      <div className="mb-6 space-y-4">
        {/* Search and Filter Row */}
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-4 items-center flex-wrap">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="name">Sort by Name</option>
              <option value="price">Sort by Price</option>
              <option value="category">Sort by Category</option>
              <option value="id">Sort by ID</option>
            </select>
          </div>

          <div className="flex gap-2 items-center">
            <span className="text-sm text-gray-600">Grid Layout:</span>
            <select
              value={gridLayout}
              onChange={(e) => setGridLayout(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
            >
              <option value="1">1 Column</option>
              <option value="2">2 Columns</option>
              <option value="3">3 Columns</option>
              <option value="4">4 Columns</option>
            </select>
          </div>
        </div>

        {/* Column Visibility Toggles */}
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-gray-600 mr-2">Show Columns:</span>
          {Object.entries(visibleColumns).map(([column, visible]) => (
            <button
              key={column}
              onClick={() => toggleColumn(column)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                visible
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {column === 'customSpecifications' ? 'Specifications' : 
               column.charAt(0).toUpperCase() + column.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className={`grid gap-6 grid-cols-1 ${
        gridLayout === '2' ? 'md:grid-cols-2' :
        gridLayout === '3' ? 'md:grid-cols-2 lg:grid-cols-3' :
        gridLayout === '4' ? 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' :
        ''
      }`}>
        {filteredProducts.map((product, index) => (
          <div key={product.id || index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            {/* Product Image */}
            {visibleColumns.image && (
              <div className="w-full h-48 bg-gray-200">
                <img
                  src={getImageSrc(product.image)}
                  alt={product.name || 'Product'}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = '/api/placeholder/300/300';
                  }}
                />
              </div>
            )}

            {/* Product Info */}
            <div className="p-4 space-y-3">
              {visibleColumns.id && (
                <div className="text-xs text-gray-500 font-mono">
                  ID: {product.id}
                </div>
              )}

              {visibleColumns.name && (
                <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                  {product.name || 'Unnamed Product'}
                </h3>
              )}

              {visibleColumns.category && product.category && (
                <div className="inline-block px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">
                  {product.category}
                </div>
              )}

              {visibleColumns.description && product.description && (
                <div className="text-sm text-gray-600">
                  <div className="line-clamp-3" 
                       dangerouslySetInnerHTML={{
                         __html: product.description.replace(/\n/g, '<br>')
                       }}>
                  </div>
                </div>
              )}

              {visibleColumns.details && product.details && (
                <div className="text-sm text-gray-700 border-t pt-2">
                  <strong className="block mb-1">Details:</strong>
                  <div className="line-clamp-2" 
                       dangerouslySetInnerHTML={{
                         __html: product.details.replace(/\n/g, '<br>')
                       }}>
                  </div>
                </div>
              )}

              {visibleColumns.price && (
                <div className="text-lg font-bold text-orange-600">
                  {formatPrice(product.price)}
                </div>
              )}

              {visibleColumns.images && product.images && product.images.length > 0 && (
                <div className="text-sm text-gray-600">
                  📸 {product.images.length} additional image{product.images.length !== 1 ? 's' : ''}
                </div>
              )}

              {visibleColumns.customSpecifications && (
                <div className="border-t pt-3">
                  {renderSpecifications(
                    product.customSpecifications, 
                    product.id, 
                    expandedSpecs[product.id]
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <Link
                  to={`/product/${product.id}`}
                  className="flex-1 bg-orange-500 text-white text-center py-2 rounded hover:bg-orange-600 transition-colors text-sm font-medium"
                >
                  View Details
                </Link>
                <button
                  onClick={() => {
                    console.log('Product Data:', product);
                    console.log('Custom Specifications:', product.customSpecifications);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors text-sm"
                  title="Debug product data"
                >
                  🔍
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Results Info */}
      <div className="mt-8 text-center text-sm text-gray-500">
        Showing {filteredProducts.length} of {sheetProducts?.length || 0} products
        {categories.length > 0 && (
          <span className="ml-2">across {categories.length} categories</span>
        )}
      </div>
    </div>
  );
};

export default CustomizableProductGrid;
