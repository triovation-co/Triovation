import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProductManager } from '../hooks/useProductManager.jsx';

const CustomizableProductGrid = () => {
  const { products: sheetProducts, loading: productsLoading } = useProductManager();
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

  const categories = [...new Set(sheetProducts?.map(product => product.category).filter(Boolean))];

  const filteredProducts = sheetProducts?.filter(product => {
    const matchesSearch = searchTerm === '' || 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = filterCategory === '' || product.category === filterCategory;
    
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
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

  const toggleColumn = (columnName) => {
    setVisibleColumns(prev => ({
      ...prev,
      [columnName]: !prev[columnName]
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
    return htmlContent.replace(/<[^>]*>/g, '');
  };

  const renderSpecifications = (customSpecs) => {
    if (!customSpecs || Object.keys(customSpecs).length === 0) {
      return <span className="text-gray-500 text-xs">No specifications</span>;
    }

    const specCount = Object.values(customSpecs).reduce((count, section) => {
      return count + (typeof section === 'object' ? Object.keys(section).length : 1);
    }, 0);

    return (
      <div className="text-xs text-gray-600">
        <div className="font-medium mb-1">{Object.keys(customSpecs).length} sections, {specCount} specs</div>
        {Object.entries(customSpecs).slice(0, 2).map(([sectionName]) => (
          <div key={sectionName} className="text-gray-500">• {sectionName}</div>
        ))}
        {Object.keys(customSpecs).length > 2 && (
          <div className="text-gray-400">+{Object.keys(customSpecs).length - 2} more...</div>
        )}
      </div>
    );
  };

  if (productsLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white p-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-orange-600 text-xl">Loading products...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Customizable Product Display</h1>
          <p className="text-gray-600">View and customize your Google Sheets product data with flexible specifications</p>
        </div>

        {/* Controls Panel */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          {/* Search and Filter Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Products</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, description..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Category</label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="name">Name</option>
                <option value="price">Price</option>
                <option value="category">Category</option>
                <option value="id">ID</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Grid Layout</label>
              <select
                value={gridLayout}
                onChange={(e) => setGridLayout(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="1">1 Column</option>
                <option value="2">2 Columns</option>
                <option value="3">3 Columns</option>
                <option value="4">4 Columns</option>
              </select>
            </div>
          </div>

          {/* Column Visibility Controls */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Visible Columns</label>
            <div className="flex flex-wrap gap-3">
              {Object.entries(visibleColumns).map(([column, isVisible]) => (
                <label key={column} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isVisible}
                    onChange={() => toggleColumn(column)}
                    className="w-4 h-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                  />
                  <span className="text-sm font-medium text-gray-700 capitalize">
                    {column === 'images' ? 'Additional Images' : 
                     column === 'customSpecifications' ? 'Custom Specifications' : column}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className={`grid gap-6 ${
          gridLayout === '1' ? 'grid-cols-1' :
          gridLayout === '2' ? 'grid-cols-1 md:grid-cols-2' :
          gridLayout === '3' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' :
          'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
        }`}>
          {filteredProducts?.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-200"
            >
              {/* Product Image */}
              {visibleColumns.image && (
                <div className="relative h-48 bg-gray-100">
                  <img
                    src={getImageSrc(product.image)}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = '/api/placeholder/300/300';
                    }}
                  />
                  {visibleColumns.category && product.category && (
                    <div className="absolute top-2 left-2">
                      <span className="inline-block bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                        {product.category}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Product Content */}
              <div className="p-4">
                {/* Product ID */}
                {visibleColumns.id && (
                  <div className="text-xs text-gray-500 mb-2">
                    ID: {product.id}
                  </div>
                )}

                {/* Product Name */}
                {visibleColumns.name && (
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                )}

                {/* Product Description */}
                {visibleColumns.description && product.description && (
                  <div className="text-sm text-gray-600 mb-3 line-clamp-3">
                    <div className="font-medium text-gray-700 mb-1">Description:</div>
                    {parseHtmlContent(product.description)}
                  </div>
                )}

                {/* Product Details */}
                {visibleColumns.details && product.details && (
                  <div className="text-sm text-gray-600 mb-3 line-clamp-2">
                    <div className="font-medium text-gray-700 mb-1">Details:</div>
                    {parseHtmlContent(product.details)}
                  </div>
                )}

                {/* Product Price */}
                {visibleColumns.price && (
                  <div className="text-xl font-bold text-orange-600 mb-3">
                    {formatPrice(product.price)}
                  </div>
                )}

                {/* Additional Images */}
                {visibleColumns.images && product.images && product.images.length > 0 && (
                  <div className="mb-3">
                    <div className="text-sm font-medium text-gray-700 mb-2">
                      Additional Images ({product.images.length})
                    </div>
                    <div className="flex gap-1 overflow-x-auto">
                      {product.images.slice(0, 3).map((img, index) => (
                        <img
                          key={index}
                          src={getImageSrc(img)}
                          alt={`${product.name} ${index + 1}`}
                          className="w-12 h-12 object-cover rounded border flex-shrink-0"
                          onError={(e) => {
                            e.target.src = '/api/placeholder/50/50';
                          }}
                        />
                      ))}
                      {product.images.length > 3 && (
                        <div className="w-12 h-12 bg-gray-200 rounded border flex items-center justify-center text-xs text-gray-600 flex-shrink-0">
                          +{product.images.length - 3}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Custom Specifications */}
                {visibleColumns.customSpecifications && (
                  <div className="mb-3">
                    <div className="text-sm font-medium text-gray-700 mb-2">Custom Specifications:</div>
                    {renderSpecifications(product.customSpecifications)}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2 mt-4">
                  <Link
                    to={`/product/${product.id}`}
                    className="flex-1 bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors text-center text-sm font-medium"
                  >
                    View Details
                  </Link>
                  <button className="px-4 py-2 border border-orange-500 text-orange-500 rounded-md hover:bg-orange-50 transition-colors text-sm font-medium">
                    Quick View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Products Message */}
        {filteredProducts?.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-2">No products found</div>
            <div className="text-gray-400 text-sm">
              {searchTerm || filterCategory ? 'Try adjusting your search or filter criteria' : 'No products available in your Google Sheets'}
            </div>
          </div>
        )}

        {/* Products Count */}
        <div className="mt-8 text-center text-sm text-gray-500">
          Showing {filteredProducts?.length || 0} of {sheetProducts?.length || 0} products
        </div>
      </div>
    </div>
  );
};

export default CustomizableProductGrid;
