import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  
  // Simple hover state for all product info
  const [showAllProductInfo, setShowAllProductInfo] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Find product from all sections
  useEffect(() => {
    const allProducts = [
      ...FestiveSeason,
      ...corporateGiftingProducts,
      ...customisationProducts,
      ...homeDecorProducts,
      ...mechanicalProducts,
      ...designConsultancyProducts,
      ...educationWorkshopsProducts,
    ];

    const foundProduct = allProducts.find(p => p.id.toString() === id);
    setProduct(foundProduct);
    setLoading(false);
  }, [id]);

  if (loading) {
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
        <button 
          onClick={() => navigate('/products')}
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
        >
          Back to Products
        </button>
      </div>
    );
  }

  // Create thumbnail images array
  const productImages = product.images || [product.image, product.image, product.image, product.image];

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
                src={image}
                alt={`${product.name} thumbnail ${index + 1}`}
                className="w-full h-24 object-cover"
              />
            </button>
          ))}
        </div>

        {/* Main Product Image - Now takes more space */}
        <div className="flex-1 min-w-[45%] max-w-2xl">
          <div className="relative">
            <img 
              src={productImages[selectedImage]}
              alt={product.name} 
              className="w-full h-[600px] object-cover"
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
          
          {/* Product Information & Care - OVERLAY HOVER */}
          <div className="pt-6 relative">
            <div
              className="flex items-center gap-3 cursor-pointer hover:text-orange-600 transition-colors"
              onMouseEnter={() => setShowAllProductInfo(true)}
              onMouseLeave={() => setShowAllProductInfo(false)}
            >
              <span className="w-3 h-3 bg-orange-500 rounded-full"></span>
              <h4 className="font-semibold text-gray-900 text-base">Product Information & Care</h4>
            </div>

            {/* OVERLAY - Absolute positioned hover content */}
            {showAllProductInfo && (
              <div className="absolute z-30 top-full left-0 mt-3 w-[450px] bg-white/95 backdrop-blur-sm rounded-xl p-6 border border-gray-200 shadow-2xl">
                
                {/* General Specifications */}
                <div className="mb-5">
                  <p className="font-bold text-gray-900 mb-3 text-base">GENERAL SPECIFICATIONS</p>
                  <div className="text-sm text-gray-700 space-y-2">
                    <p>SKU: {product.sku || '8907605130960'}</p>
                    <p>Weight (gms.): {product.weight || '82'}</p>
                    <p>Primary Color: {product.primaryColor || 'Multi color'}</p>
                  </div>
                </div>

                {/* Composition and Usage */}
                <div className="mb-5">
                  <p className="font-bold text-gray-900 mb-3 text-base">COMPOSITION AND USAGE</p>
                  <div className="text-sm text-gray-700 space-y-2">
                    <p>Material: Crafted with durable ceramic for longevity and quality</p>
                    <p>Care Instructions: Do not wash. Clean with a dry cloth</p>
                    <p>Box Contents: 1 planter</p>
                  </div>
                </div>

                {/* Dimensions */}
                <div className="mb-5">
                  <p className="font-bold text-gray-900 mb-3 text-base">DIMENSIONS</p>
                  <div className="text-sm text-gray-700 space-y-2">
                    <p>Length(cms.): {product.length || '12'}</p>
                    <p>Height(cms): {product.height || '10.2'}</p>
                    <p>Width(cms): {product.width || '10.2'}</p>
                  </div>
                </div>

                {/* Supplier Information */}
                <div>
                  <p className="font-bold text-gray-900 mb-3 text-base">SUPPLIER INFORMATION</p>
                  <div className="text-sm text-gray-700">
                    <p>Country of Origin: {product.origin || 'India'}</p>
                  </div>
                </div>

              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
