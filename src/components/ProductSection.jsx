import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import ViewToggleButton from './Buttons.jsx';

// Helper: strip HTML safely
const stripHtml = (html = '') => {
  try {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return (doc.body.textContent || '').trim();
  } catch (err) {
    return String(html).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  }
};

const ProductSection = ({
  title,
  products = [],
  displayedProducts = [],
  showAll,
  setShowAll,
  sectionRef,
  scrollToRef,
  shouldHighlight,
  buttonColor = "bg-orange-500",
  handleAddToCart  // ← ADD THIS PROP
}) => {
  // REMOVE the useCart hook and local handleAddToCart function
  // const { addToCart } = useCart();  // ← DELETE THIS
  
  // DELETE THIS ENTIRE FUNCTION:
  // const handleAddToCart = (product, e) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   addToCart({
  //     id: product.id,
  //     name: product.name,
  //     price: product.price,
  //     image: product.image,
  //     category: title
  //   });
  // };

  const safeDisplayedProducts = Array.isArray(displayedProducts) ? displayedProducts : [];
  const safeProducts = Array.isArray(products) ? products : [];

  return (
    <div className="w-full max-w-10xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Title */}
      <div ref={sectionRef} className="flex items-center my-10">
        <div className="flex-grow border-t-2 border-gray-300"></div>
        <span className="mx-4 text-gray-800 font-semibold lg:text-xl">
          {title}
        </span>
        <div className="flex-grow border-t-2 border-gray-300"></div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8 mb-20">
        {safeDisplayedProducts.length > 0 ? (
          safeDisplayedProducts.map((product) => (
            <div
              key={product.id}
              className="w-full rounded-2xl overflow-hidden bg-white flex flex-col h-full"
            >
              <Link to={`/product/${product.id}`}>
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    decoding="async"
                    className={`rounded-2xl w-full h-35 sm:h-56 md:h-50 lg:h-50 xl:h-75 2xl:h-100 object-cover transition-all duration-500 ${
                      shouldHighlight && shouldHighlight(product)
                        ? 'brightness-110 contrast-105 shadow-lg'
                        : ''
                    }`}
                  />
                  {product.savePercent && (
                    <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">
                      Save {product.savePercent}
                    </div>
                  )}
                </div>
              </Link>

              <div className="p-3 sm:p-4 flex flex-col flex-grow text-center">
                <Link to={`/product/${product.id}`}>
                  <h2 className="text-sm sm:text-base md:text-lg text-gray-700 font-semibold mb-1 line-clamp-2">
                    {product.name}
                  </h2>

                  <p className="text-gray-600 text-xs sm:text-sm mb-2 line-clamp-2">
                    {stripHtml(product.description) ||
                      `${product.name} - Perfect for your needs.`}
                  </p>

                  <p className="font-medium text-gray-800 mb-3 text-sm sm:text-base">
                    {product.originalPrice ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="line-through text-gray-500 text-xs">
                          ₹{product.originalPrice}
                        </span>
                        <span className="font-bold">
                          from ₹{product.price}
                        </span>
                      </span>
                    ) : (
                      <span className="font-bold">from ₹{product.price}</span>
                    )}
                  </p>
                </Link>

                <div className="mt-auto">
                  <button
                    className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 rounded-md transition"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleAddToCart(product);  // ← USE THE PROP FUNCTION
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center text-gray-500">
            No products found.
          </div>
        )}
      </div>

      <ViewToggleButton
        showAll={showAll}
        setShowAll={setShowAll}
        scrollToRef={scrollToRef}
        refElement={sectionRef}
        productsLength={safeProducts.length}
      />
    </div>
  );
};

export default ProductSection;