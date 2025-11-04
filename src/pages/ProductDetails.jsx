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
    <div className="mt-6 sm:mt-8 border-t pt-6 sm:pt-8">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800">
        Specifications
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
        {Object.entries(customSpecifications).map(([sectionName, specs]) => (
          <div key={sectionName} className="bg-gray-50 rounded-lg p-4 sm:p-5">
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-800 border-b pb-2">
              {sectionName}
            </h3>
            <div className="space-y-2 sm:space-y-3">
              {typeof specs === 'object' && specs !== null ? (
                Object.entries(specs).map(([specName, specValue]) => (
                  <div key={specName} className="flex justify-between items-start gap-2">
                    <span className="text-gray-600 text-xs sm:text-sm font-medium flex-shrink-0">
                      {specName}:
                    </span>
                    <span className="font-medium text-gray-800 text-xs sm:text-sm text-right">
                      {specValue}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-gray-600 text-xs sm:text-sm">{specs}</div>
              )}
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

  // Check if product is customizable
  const isCustomizable = ['T0001', 'T0002', 'T0003'].includes(product?.id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (sheetLoading) return;

    const allStaticProducts = [
      ...FestiveSeason,
      ...corporateGiftingProducts,
      ...customisationProducts,
      ...homeDecorProducts,
      ...mechanicalProducts,
      ...designConsultancyProducts,
      ...educationWorkshopsProducts,
    ];

    const allProducts = [...allStaticProducts, ...sheetProducts];
    const foundProduct = allProducts.find((p) => p.id.toString() === id);

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
        quantity: quantity,
      });
    }
  };

  const handleCustomize = () => {
    navigate(`/customize/${product.id}`);
  };

  const handleBuyNow = () => {
    if (product) {
      // Add product to cart first
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity,
      });
      // Then redirect to cart
      navigate('/cart');
    }
  };

  const formatPrice = (price) => {
    if (!price && price !== 0) return 'Price not set';
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    return `₹${numPrice.toLocaleString('en-IN')}`;
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
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white flex items-center justify-center px-4">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mb-4"></div>
          <div className="text-orange-600 text-lg sm:text-xl">Loading product...</div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-gray-600 text-lg sm:text-xl mb-4">Product not found</div>
          <button
            onClick={() => navigate('/products')}
            className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors text-sm sm:text-base"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const availableImages = getAvailableImages();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white ">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-4 sm:mb-6 flex items-center text-orange-600 hover:text-orange-700 transition-colors touch-manipulation"
        >
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span className="text-sm sm:text-base">Back</span>
        </button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 p-3 sm:p-4 lg:p-6">
            {/* Product Images */}
            <div className="space-y-3 sm:space-y-4">
              {/* Main Image */}
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={availableImages[selectedImage] || 'https://via.placeholder.com/500x500'}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/500x500';
                  }}
                />
              </div>

              {/* Thumbnail Images */}
              {availableImages.length > 1 && (
                <>
                  <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
                    {availableImages.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all touch-manipulation ${
                          selectedImage === index
                            ? 'border-orange-500 scale-105'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <img
                          src={img || 'https://via.placeholder.com/80x80'}
                          alt={`${product.name} ${index + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/80x80';
                          }}
                        />
                      </button>
                    ))}
                  </div>
                  {availableImages.length > 1 && (
                    <div className="text-center text-xs sm:text-sm text-gray-500">
                      {selectedImage + 1} of {availableImages.length} images
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-4 sm:space-y-6">
              {/* Product Name and ID */}
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h1>
                {product.id && (
                  <p className="text-xs sm:text-sm text-gray-500">Product ID: {product.id}</p>
                )}
              </div>

              {/* Price */}
              <div className="p-3 sm:p-4 rounded-lg">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-orange-600">
                  {formatPrice(product.price)}
                </div>
                <span className="text-xs sm:text-sm font-normal text-gray-500 mt-1 block">
                  Inclusive of all taxes
                </span>
              </div>

              {/* Description */}
              {product.description && (
                <div className="border-t pt-4">
                  <h3 className="text-base sm:text-lg font-semibold mb-2 text-gray-900">
                    Product Description
                  </h3>
                  <div
                    className="text-gray-700 text-sm sm:text-base leading-relaxed prose prose-sm sm:prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: parseHtmlContent(product.description) }}
                  />
                </div>
              )}

              {/* Details */}
              {product.details && (
                <div className="border-t pt-4">
                  <h3 className="text-base sm:text-lg font-semibold mb-2 text-gray-900">
                    Additional Details
                  </h3>
                  <div
                    className="text-gray-700 text-sm sm:text-base leading-relaxed prose prose-sm sm:prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: parseHtmlContent(product.details) }}
                  />
                </div>
              )}

              {/* Category */}
              {product.category && (
                <div>
                  <span className="inline-block bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                    {product.category}
                  </span>
                </div>
              )}

              {/* Quantity and Add to Cart - Sticky on Mobile */}
              <div className="space-y-3 sm:space-y-4 lg:static lg:space-y-4">
                {/* Quantity Selector */}
                <div className="flex items-center gap-3 sm:gap-4">
                  <span className="text-sm sm:text-base text-gray-700 font-medium">Quantity</span>
                  <div className="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                      className="px-3 sm:px-4 py-2 sm:py-3 text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation transition-colors text-base sm:text-lg font-semibold"
                    >
                      -
                    </button>
                    <span className="px-4 sm:px-6 py-2 sm:py-3 font-semibold text-base sm:text-lg min-w-[50px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 sm:px-4 py-2 sm:py-3 text-gray-600 hover:bg-gray-100 active:bg-gray-200 touch-manipulation transition-colors text-base sm:text-lg font-semibold"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-orange-500 text-white py-3 sm:py-3.5 px-6 rounded-lg hover:bg-orange-600 active:bg-orange-700 transition-colors font-semibold text-sm sm:text-base touch-manipulation shadow-md hover:shadow-lg"
                  >
                    Add to Cart
                  </button>
                  <button 
                  onClick={handleBuyNow}
                  className="flex-1 bg-gray-900 text-white py-3 sm:py-3.5 px-6 rounded-lg hover:bg-gray-800 active:bg-gray-950 transition-colors font-semibold text-sm sm:text-base touch-manipulation shadow-md hover:shadow-lg">
                    Buy Now
                  </button>
                  {isCustomizable && (
                    <button
                      onClick={handleCustomize}
                      className="flex-1 bg-blue-600 text-white py-3 sm:py-3.5 px-6 rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors font-semibold text-sm sm:text-base touch-manipulation shadow-md hover:shadow-lg"
                    >
                      Customize
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Custom Specifications Section */}
          {product.customSpecifications && (
            <div className="px-3 sm:px-4 lg:px-6 pb-4 sm:pb-6">
              <CustomSpecificationDisplay customSpecifications={product.customSpecifications} />
            </div>
          )}
        </div>
      </div>

      {/* Sticky Bottom Bar for Mobile - Only on small screens */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-40 safe-area-bottom">
        <div className="px-4 py-3 flex items-center gap-3">
          <div className="flex-1">
            <div className="text-lg font-bold text-orange-600">{formatPrice(product.price)}</div>
            <div className="text-xs text-gray-500">Inclusive of all taxes</div>
          </div>
          <button
            onClick={handleAddToCart}
            className="bg-orange-500 text-white py-3 px-6 rounded-lg hover:bg-orange-600 active:bg-orange-700 transition-colors font-semibold text-sm touch-manipulation shadow-md flex-shrink-0"
          >
            Add to Cart
          </button>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-thin::-webkit-scrollbar {
          height: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 10px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
        .safe-area-bottom {
          padding-bottom: env(safe-area-inset-bottom);
        }
      `}</style>
    </div>
  );
};

export default ProductDetails;
