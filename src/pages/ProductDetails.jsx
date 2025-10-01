import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useProductManager } from '../hooks/useProductManager.jsx';
import {
  FestiveSeason,
  corporateGiftingProducts,
  customisationProducts,
  homeDecorProducts,
  mechanicalProducts,
  designConsultancyProducts,
  educationWorkshopsProducts,
} from '../assets/data.jsx';

// Custom Specification Display Component
const CustomSpecificationDisplay = ({ customSpecifications }) => {
  if (!customSpecifications || Object.keys(customSpecifications).length === 0) {
    return null;
  }

  return (
    <div className="mt-8 border-t pt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {Object.entries(customSpecifications).map(([sectionName, specs]) => (
          <div key={sectionName}>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">{sectionName}</h3>
            <div className="space-y-3">
              {typeof specs === 'object' && specs !== null ? 
                Object.entries(specs).map(([specName, specValue]) => (
                  <div key={specName} className="flex justify-between items-start">
                    <span className="text-gray-600 text-sm font-medium">{specName}:</span>
                    <span className="font-medium text-gray-800 text-sm text-right ml-4">{specValue}</span>
                  </div>
                )) :
                <div className="text-gray-600 text-sm">{specs}</div>
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { products: sheetProducts, loading: sheetLoading } = useProductManager();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (sheetLoading) {
      return;
    }

    const allStaticProducts = [
      ...FestiveSeason,
      ...corporateGiftingProducts,
      ...customisationProducts,
      ...homeDecorProducts,
      ...mechanicalProducts,
      ...designConsultancyProducts,
      ...educationWorkshopsProducts,
    ];

    const allProducts = [...allStaticProducts, ...(sheetProducts || [])];
    const foundProduct = allProducts.find(p => p.id.toString() === id);

    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedImage(0);
    } else {
      console.log(`Product with ID ${id} not found`);
    }
    
    setLoading(false);
  }, [id, sheetProducts, sheetLoading]);

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity
      });
    }
  };

const formatPrice = (price) => {
  if (!price || price === '') return 'Price not set';
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;
  return `₹${numPrice.toLocaleString('en-IN')}`; // Direct Unicode
  // Or for JSX: { '\u20B9' } or &#8377;
};


  const parseHtmlContent = (htmlContent) => {
    if (!htmlContent) return '';
    return htmlContent;
  };

  const getAvailableImages = () => {
    const images = [];
    if (product.image) images.push(product.image);
    if (product.images && Array.isArray(product.images)) {
      images.push(...product.images);
    }
    return [...new Set(images)];
  };

  if (loading || sheetLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white flex items-center justify-center">
        <div className="text-orange-600 text-xl">Loading product...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-600 text-xl mb-4">Product not found</div>
          <button
            onClick={() => navigate('/products')}
            className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const availableImages = getAvailableImages();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center text-orange-600 hover:text-orange-700 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
            {/* Product Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={availableImages[selectedImage] || '/api/placeholder/500/500'}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = '/api/placeholder/500/500';
                  }}
                />
              </div>

              {/* Thumbnail Images */}
              {availableImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                  {availableImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                        selectedImage === index ? 'border-orange-500' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img
                        src={img || '/api/placeholder/80/80'}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = '/api/placeholder/80/80';
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}

              {availableImages.length > 1 && (
                <div className="text-center text-sm text-gray-500">
                  {selectedImage + 1} of {availableImages.length} images
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Product Name and ID */}
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                {product.id && (
                  <p className="text-sm text-gray-500">Product ID: {product.id}</p>
                )}
              </div>

              {/* Price */}
              <div className="text-3xl font-bold text-orange-600">
                {formatPrice(product.price)}
                <span className="text-sm font-normal text-gray-500 ml-2">Inclusive of all taxes</span>
              </div>

              {/* Description */}
              {product.description && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Product Description</h3>
                  <div 
                    className="text-gray-700 prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: parseHtmlContent(product.description) }}
                  />
                </div>
              )}

              {/* Details */}
              {product.details && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Additional Details</h3>
                  <div 
                    className="text-gray-700 prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: parseHtmlContent(product.details) }}
                  />
                </div>
              )}

              {/* Category */}
              {product.category && (
                <div>
                  <span className="inline-block bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                    {product.category}
                  </span>
                </div>
              )}

              {/* Quantity and Add to Cart */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700 font-medium">Quantity:</span>
                  <div className="flex items-center border border-gray-300 rounded-md">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 text-gray-600 hover:text-gray-800"
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <span className="px-4 py-2 font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-2 text-gray-600 hover:text-gray-800"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-orange-500 text-white py-3 px-6 rounded-md hover:bg-orange-600 transition-colors font-medium"
                  >
                    Add to Cart
                  </button>
                  <button className="flex-1 bg-gray-900 text-white py-3 px-6 rounded-md hover:bg-gray-800 transition-colors font-medium">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Custom Specifications Section */}
          {product.customSpecifications && (
            <div className="px-6 pb-6">
              <CustomSpecificationDisplay customSpecifications={product.customSpecifications} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;