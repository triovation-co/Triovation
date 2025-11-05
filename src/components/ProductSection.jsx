import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import ViewToggleButton from './Buttons.jsx';

// inside ProductSection file, add this helper near top (below imports)
const stripHtml = (html = '') => {
  try {
    // decode &lt;p&gt; etc and strip tags
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return (doc.body.textContent || '').trim();
  } catch (err) {
    // fallback: naive tag stripper
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
        <span className="mx-4 text-gray-800 font-semibold lg:text-xl">{title}</span>
        <div className="flex-grow border-t-2 border-gray-300"></div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3 sm:gap-6 lg:gap-8 mb-20">
        {safeDisplayedProducts.length > 0 ? (
          safeDisplayedProducts.map((product) => (
            <div
              key={product.id}
              /* NO borders or shadows — purely rounded corners for aesthetic */
              className="w-full rounded-2xl overflow-hidden bg-white flex flex-col h-full"
            >
              <Link to={`/product/${product.id}`} className="block">
                <div className="relative">
                  {/* Restored your original image height classes so image height remains unchanged */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className={`rounded-2xl w-full h-35 sm:h-56 md:h-50 lg:h-50 xl:h-75 2xl:h-100 object-cover transition-all duration-500 ${
                      shouldHighlight && shouldHighlight(product) ? 'brightness-110 contrast-105 shadow-lg' : ''
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
                <Link to={`/product/${product.id}`} className="block">
                  {/* Smaller on phones, larger on bigger screens; clamp to 2 lines */}
                  <h2 className="text-sm sm:text-base md:text-lg text-gray-700 font-semibold mb-1 leading-tight line-clamp-2">
                    {product.name}
                  </h2>

{/* Compact description for mobile with clamp (HTML stripped) */}
<p className="text-gray-600 text-xs sm:text-sm mb-2 leading-relaxed line-clamp-2">
  {stripHtml(product.description) || `${product.name} - Perfect for your needs.`}
</p>


                  <p className="font-medium text-gray-800 mb-3 text-sm sm:text-base">
                    {product.originalPrice ? (
                      <span className="flex flex-wrap items-center justify-center gap-2">
                        <span className="line-through text-gray-500 text-xs sm:text-sm">₹{product.originalPrice}</span>
                        <span className="font-bold text-sm sm:text-base">from ₹{product.price}</span>
                      </span>
                    ) : (
                      <span className="font-bold text-sm sm:text-base">from ₹{product.price}</span>
                    )}
                  </p>
                </Link>

                {/* Button: full-width on phones for tappability, auto on larger screens */}
                <div className="w-full flex justify-center mt-auto">
                  <button
                    className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 text-sm sm:text-base rounded-md transition-colors"
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
