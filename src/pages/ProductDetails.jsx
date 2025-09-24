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
    const foundProduct = allProducts.find(p => p.id.toString() === id.toString());
    
    console.log('Found product:', foundProduct);
    setProduct(foundProduct);
    setLoading(false);
  }, [id, sheetProducts, sheetLoading]);

  const getImageSrc = (imageUrl) => {
    if (!imageUrl || imageUrl.trim() === '') {
      return '/api/placeholder/300/300';
    }
    return imageUrl;
  };

  const getAllProductImages = () => {
    if (!product) return [];

    const images = [];

    if (product.image && product.image.trim() !== '') {
      images.push(product.image);
    }

    if (product.images && Array.isArray(product.images)) {
      const validAdditionalImages = product.images.filter(
        img => img && img.trim() !== '' && img !== product.image
      );
      images.push(...validAdditionalImages);
    }

    if (images.length === 0) {
      return ['/api/placeholder/300/300'];
    }

    return images;
  };

  const handleAddToCart = () => {
    if (!product) return;

    const cartProduct = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category || 'Product'
    };

    for (let i = 0; i < quantity; i++) {
      addToCart(cartProduct);
    }

    alert(`Added ${quantity} ${product.name}(s) to cart!`);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  if (loading || sheetLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading product details...</p>
          <p className="text-sm text-gray-400 mt-2">Product ID: {id}</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
          <p className="text-sm text-gray-400 mb-6">Product ID: {id}</p>
          <button
            onClick={() => navigate('/products')}
            className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
          >
            Browse All Products
          </button>
        </div>
      </div>
    );
  }

  const allImages = getAllProductImages();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
          <button onClick={() => navigate('/')} className="hover:text-orange-500">
            Home
          </button>
          <span>/</span>
          <button onClick={() => navigate('/products')} className="hover:text-orange-500">
            Products
          </button>
          <span>/</span>
          <span className="text-gray-700">{product.name}</span>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
            {/* Image Gallery Section */}
            <div className="space-y-4">
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={getImageSrc(allImages[selectedImage])}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = '/api/placeholder/300/300';
                  }}
                />
              </div>

              {allImages.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {allImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 transition-colors ${
                        selectedImage === index ? 'border-orange-500' : 'border-transparent hover:border-gray-300'
                      }`}
                    >
                      <img
                        src={getImageSrc(image)}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = '/api/placeholder/300/300';
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}

              {allImages.length > 1 && (
                <div className="text-center text-sm text-gray-500">
                  {selectedImage + 1} of {allImages.length} images
                </div>
              )}
            </div>

            {/* Product Info Section */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                <p className="text-sm text-gray-500">Product ID: {id}</p>
              </div>

              {/* Price Section */}
              <div className="space-y-2">
                <div className="flex items-center space-x-4">
                  <span className="text-3xl font-bold text-gray-900">₹{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-lg text-gray-500 line-through">₹{product.originalPrice}</span>
                  )}
                  {product.savePercent && (
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">
                      Save {product.savePercent}%
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600">Inclusive of all taxes</p>
              </div>

              {/* Product Description */}
              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Product Description</h3>
                <div 
                  className="text-gray-600 leading-relaxed prose prose-sm max-w-none product-description"
                  dangerouslySetInnerHTML={{
                    __html: product.description || product.descriptionPlain || 
                      "Premium quality product crafted with attention to detail."
                  }}
                />
              </div>

              {/* Additional Details - Only show if exists */}
              {(product.details || product.detailsPlain) && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Additional Details</h3>
                  <div 
                    className="text-gray-600 leading-relaxed prose prose-sm max-w-none product-details"
                    dangerouslySetInnerHTML={{
                      __html: product.details || product.detailsPlain || ''
                    }}
                  />
                </div>
              )}

              {/* Quantity Selector */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <label htmlFor="quantity" className="text-sm font-medium text-gray-700">
                    Quantity:
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-md">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 text-gray-500 hover:text-gray-700"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      id="quantity"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-16 px-3 py-2 text-center border-0 focus:ring-0"
                    />
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-2 text-gray-500 hover:text-gray-700"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-orange-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-orange-600 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={handleBuyNow}
                    className="flex-1 bg-gray-900 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Specifications Section */}
          <div className="border-t border-gray-200 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* General Specifications */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">General Specifications</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">SKU:</span>
                    <span className="text-gray-900">{product.sku || '8907605130960'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Weight (gms):</span>
                    <span className="text-gray-900">{product.weight || '82'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Primary Color:</span>
                    <span className="text-gray-900">{product.primaryColor || 'Multi color'}</span>
                  </div>
                </div>
              </div>

              {/* Composition and Usage */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">Composition and Usage</h4>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-gray-600">Material:</span>
                    <span className="text-gray-900 ml-2">
                      Crafted with durable ceramic for longevity and quality
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Care Instructions:</span>
                    <span className="text-gray-900 ml-2">Do not wash. Clean with a dry cloth</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Box Contents:</span>
                    <span className="text-gray-900 ml-2">1 planter</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Styles for Rich Text */}
      <style jsx>{`
        .product-description strong,
        .product-details strong {
          font-weight: 600;
          color: #1f2937;
        }

        .product-description em,
        .product-details em {
          font-style: italic;
        }

        .product-description u,
        .product-details u {
          text-decoration: underline;
        }

        .product-description s,
        .product-details s {
          text-decoration: line-through;
        }

        .product-description br,
        .product-details br {
          line-height: 1.5;
        }

        .product-description p,
        .product-details p {
          margin-bottom: 1rem;
        }

        .product-description a,
        .product-details a {
          color: #ff6b35;
          text-decoration: underline;
        }

        .product-description a:hover,
        .product-details a:hover {
          color: #e55a2b;
        }

        .product-description ul,
        .product-details ul {
          list-style-type: disc;
          margin-left: 1.5rem;
          margin-bottom: 1rem;
        }

        .product-description ol,
        .product-details ol {
          list-style-type: decimal;
          margin-left: 1.5rem;
          margin-bottom: 1rem;
        }

        .product-description li,
        .product-details li {
          margin-bottom: 0.5rem;
        }
      `}</style>
    </div>
  );
};

export default ProductDetails;
