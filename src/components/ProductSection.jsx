import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import ViewToggleButton from './Buttons.jsx';

const ProductSection = ({
  title,
  products = [], // Default to empty array
  displayedProducts = [], // Default as well
  showAll,
  setShowAll,
  sectionRef,
  scrollToRef,
  shouldHighlight,
  buttonColor = "bg-orange-500"
}) => {
  const { addToCart } = useCart();

  const handleAddToCart = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    const cartProduct = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: title
    };
    addToCart(cartProduct);
  };

  const safeDisplayedProducts = Array.isArray(displayedProducts) ? displayedProducts : [];
  const safeProducts = Array.isArray(products) ? products : [];

  return (
    <div className="w-full max-w-10xl mx-auto px-4 sm:px-6 lg:px-8">
      <div ref={sectionRef} className="flex items-center my-10">
        <div className="flex-grow border-t-2 border-gray-300"></div>
        <span className="mx-4 text-gray-800 font-semibold text-xl">{title}</span>
        <div className="flex-grow border-t-2 border-gray-300"></div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-25 mb-20">
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
                    className={`rounded-2xl w-full h-48 sm:h-56 md:h-64 object-cover transition-all duration-500 ${
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
              <div className="p-4 flex flex-col flex-grow text-center">
                <Link to={`/product/${product.id}`}>
                  <h2 className="text-base sm:text-lg text-gray-700 font-semibold mb-2">
                    {product.name}
                  </h2>
                  <p className="text-gray-600 text-xs sm:text-sm mb-3 leading-relaxed flex-grow line-clamp-2">
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
                </Link>
                <div className="w-full flex justify-center mt-auto">
                  <button
                    className="bg-orange-500 hover:bg-orange-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-md rounded-md transition-colors w-auto"
                    onClick={(e) => handleAddToCart(product, e)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center text-gray-500 text-lg">
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
