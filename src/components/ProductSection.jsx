import React from 'react';
import { Link } from 'react-router-dom'; // Add this import
import ViewToggleButton from './Buttons.jsx';

const ProductSection = ({
  title,
  products,
  displayedProducts,
  showAll,
  setShowAll,
  sectionRef,
  scrollToRef,
  shouldHighlight,
  buttonColor = "bg-blue-500"
}) => {
  return (
    <>
      {/* Section Header */}
      <div ref={sectionRef} className="flex items-center my-10">
        <div className="flex-grow border-t-2 border-gray-300"></div>
        <span className="mx-4 text-gray-800 font-semibold text-xl"> {title} </span>
        <div className="flex-grow border-t-2 border-gray-300"></div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-20 mb-20">
        {displayedProducts.map((product) => (
          <Link 
            key={product.id} 
            to={`/product/${product.id}`}
            className="rounded-2xl overflow-hidden bg-white flex flex-col h-full transition-shadow duration-300 cursor-pointer"
          >
            <div className="relative">
              <img 
                src={product.image} 
                alt={product.name} 
                className={`rounded-2xl w-full h-48 sm:h-56 md:h-64 object-cover transition-all duration-500 ${
                  shouldHighlight(product)
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
            
            <div className="p-4 flex flex-col flex-grow text-center">
              <h2 className="text-base sm:text-lg text-gray-700 font-semibold mb-2">
                {product.name}
              </h2>
              <p className="text-gray-600 text-xs sm:text-sm mb-3 leading-relaxed flex-grow">
                {product.description || `${product.name} - Perfect for your needs.`}
              </p>

              <div className="flex justify-center items-center text-xs sm:text-sm mb-2">
                {product.rating ? (
                  <>⭐ <span className="ml-1">{product.rating} ({product.reviews} reviews)</span></>
                ) : (
                  <>⭐ <span className="ml-1">4.5 (10 reviews)</span></>
                )}
              </div>

              <p className="font-medium text-gray-800 mb-4 text-sm sm:text-base">
                {product.originalPrice ? (
                  <>
                    <span className="line-through text-gray-500 mr-2">₹{product.originalPrice}</span>
                    from ₹{product.price}
                  </>
                ) : (
                  `from ₹${product.price}`
                )}
              </p>

              <div className="w-full flex justify-center mt-auto">
                <button 
                  className={`${buttonColor} text-white px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-md rounded-md hover:opacity-90 w-auto transition-opacity`}
                  onClick={(e) => e.preventDefault()} // Prevent link navigation when clicking button
                >
                  {product.buyNowText}
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* View Toggle Button */}
      <ViewToggleButton
        showAll={showAll}
        setShowAll={setShowAll}
        scrollToRef={scrollToRef}
        refElement={sectionRef}
        productsLength={products.length}
      />
    </>
  );
};

export default ProductSection;
