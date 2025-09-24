import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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

  // Get Google Sheets products
  const { products: sheetProducts, loading: sheetLoading } = useProductManager();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Find product from all sections INCLUDING Google Sheets products
  useEffect(() => {
    // WAIT for sheet products to load before searching
    if (sheetLoading) {
      return; // Don't search yet, sheets are still loading
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

    // Combine static products with Google Sheets products
    const allProducts = [...allStaticProducts, ...(sheetProducts || [])];

    console.log('Searching for product ID:', id);
    console.log('Total products available:', allProducts.length);
    console.log('Sheet products:', sheetProducts?.length || 0);

    const foundProduct = allProducts.find(p => p.id.toString() === id.toString());
    console.log('Found product:', foundProduct);
    
    setProduct(foundProduct);
    setLoading(false);
  }, [id, sheetProducts, sheetLoading]); // Add sheetLoading dependency

  // Helper function for image fallback
  const getImageSrc = (imageUrl) => {
    if (!imageUrl || imageUrl.trim() === '') {
      return '/api/placeholder/300/300';
    }
    return imageUrl;
  };

  // NEW: Get all available images (primary + additional from Google Sheets)
  const getAllProductImages = () => {
    if (!product) return [];
    
    const images = [];
    
    // Add primary image if exists
    if (product.image && product.image.trim() !== '') {
      images.push(product.image);
    }
    
    // Add additional images from Google Sheets if they exist
    if (product.images && Array.isArray(product.images)) {
      const validAdditionalImages = product.images.filter(img => 
        img && img.trim() !== '' && img !== product.image
      );
      images.push(...validAdditionalImages);
    }
    
    // If no images found, return array with placeholder for thumbnail generation
    if (images.length === 0) {
      return ['/api/placeholder/300/300'];
    }
    
    return images;
  };

  // Show loading while sheets are loading OR while searching for product
  if (loading || sheetLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="text-gray-600 mb-4">Product ID: {id}</p>
        <button 
          onClick={() => navigate('/products')}
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
        >
          Back to Products
        </button>
      </div>
    );
  }

  // UPDATED: Use actual product images from Google Sheets or fallback to duplicates
  const allAvailableImages = getAllProductImages();
  const productImages = allAvailableImages.length > 0 
    ? allAvailableImages 
    : [getImageSrc(product.image), getImageSrc(product.image), getImageSrc(product.image), getImageSrc(product.image)];

  return (
    <div className="w-full max-w-screen-2xl mx-auto px-8 py-12">
      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)}
        className="mb-8 flex items-center gap-2 text-blue-600 hover:text-blue-800"
      >
        ← Back
      </button>

      <div className="flex gap-8">
        {/* Thumbnail Images Column */}
        <div className="flex flex-col gap-4 w-24">
          {productImages.slice(0, 4).map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative overflow-hidden rounded-lg border-2 transition-all ${
                selectedImage === index 
                  ? 'border-orange-500' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <img
                src={getImageSrc(image)}
                alt={`${product.name} thumbnail ${index + 1}`}
                className="w-full h-24 object-cover"
                onError={(e) => { e.target.src = '/api/placeholder/300/300'; }}
              />
            </button>
          ))}
        </div>

        {/* Main Product Image - Now takes more space */}
        <div className="flex-1 min-w-[45%] max-w-2xl">
          <div className="relative">
            <img 
              src={getImageSrc(productImages[selectedImage] || productImages[0])}
              alt={product.name} 
              className="w-full h-[600px] object-cover"
              onError={(e) => { e.target.src = '/api/placeholder/300/300'; }}
            />
            {product.savePercent && (
              <div className="absolute top-6 right-6 bg-orange-500 text-white px-4 py-3 rounded-lg font-medium text-lg">
                Save {product.savePercent}
              </div>
            )}
          </div>
        </div>

        {/* Product Details - More spacious */}
        <div className="flex-1 min-w-[35%] space-y-8 pl-12">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
              {product.name}
            </h1>
          </div>

          {/* Price Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <span className="text-base font-medium text-gray-700">MRP :</span>
              {product.originalPrice ? (
                <>
                  <span className="text-red-600 font-bold text-2xl">₹{product.price}</span>
                  <span className="line-through text-gray-500 text-lg">₹{product.originalPrice}</span>
                  <span className="text-red-600 font-medium text-base">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </span>
                </>
              ) : (
                <span className="text-red-600 font-bold text-2xl">₹{product.price}</span>
              )}
            </div>
            <p className="text-gray-600 text-base">Inclusive of all taxes</p>
          </div>

          {/* Product Description */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Product Description</h3>
            <p className="text-gray-700 text-base leading-relaxed">
              {product.description || "We blend creativity with technology to deliver exceptional solutions. With a team of skilled professionals, we've been transforming ideas into reality since 2024. Our commitment to quality, innovation, and client satisfaction sets us apart as."}
            </p>
          </div>

          {/* Contact Us Button */}
          <button className="w-full bg-gray-800 text-white py-4 px-8 text-base font-medium hover:bg-gray-900 transition-colors rounded-lg">
            CONTACT US
          </button>
        </div>
      </div>

      {/* Product Information & Care - HORIZONTAL LAYOUT BELOW IMAGE */}
      <div className="mt-12 w-full">
        <div className="flex items-center gap-3 mb-8">
          <span className="w-3 h-3 bg-orange-500 rounded-full"></span>
          <h4 className="font-semibold text-gray-900 text-xl">Product Information & Care</h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* General Specifications */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <p className="font-bold text-gray-900 mb-4 text-base uppercase tracking-wide">
              General Specifications
            </p>
            <div className="text-sm text-gray-700 space-y-2">
              <p><span className="font-medium">SKU:</span> {product.sku || '8907605130960'}</p>
              <p><span className="font-medium">Weight (gms):</span> {product.weight || '82'}</p>
              <p><span className="font-medium">Primary Color:</span> {product.primaryColor || 'Multi color'}</p>
            </div>
          </div>

          {/* Composition and Usage */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <p className="font-bold text-gray-900 mb-4 text-base uppercase tracking-wide">
              Composition and Usage
            </p>
            <div className="text-sm text-gray-700 space-y-2">
              <p><span className="font-medium">Material:</span> Crafted with durable ceramic for longevity and quality</p>
              <p><span className="font-medium">Care Instructions:</span> Do not wash. Clean with a dry cloth</p>
              <p><span className="font-medium">Box Contents:</span> 1 planter</p>
            </div>
          </div>

          {/* Dimensions */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <p className="font-bold text-gray-900 mb-4 text-base uppercase tracking-wide">
              Dimensions
            </p>
            <div className="text-sm text-gray-700 space-y-2">
              <p><span className="font-medium">Length (cms):</span> {product.length || '12'}</p>
              <p><span className="font-medium">Height (cms):</span> {product.height || '10.2'}</p>
              <p><span className="font-medium">Width (cms):</span> {product.width || '10.2'}</p>
            </div>
          </div>

          {/* Supplier Information */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <p className="font-bold text-gray-900 mb-4 text-base uppercase tracking-wide">
              Supplier Information
            </p>
            <div className="text-sm text-gray-700">
              <p><span className="font-medium">Country of Origin:</span> {product.origin || 'India'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
