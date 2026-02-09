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

// Helper: Generate structured data for product
const generateProductSchema = (product, category) => {
  return {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": product.image,
    "description": stripHtml(product.description) || `${product.name} - Perfect for your needs.`,
    "offers": {
      "@type": "Offer",
      "price": product.price,
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock",
      "url": `${window.location.origin}/product/${product.id}`
    },
    "category": category
  };
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
  handleAddToCart
}) => {
  const safeDisplayedProducts = Array.isArray(displayedProducts) ? displayedProducts : [];
  const safeProducts = Array.isArray(products) ? products : [];

  return (
    <section 
      className="w-full max-w-10xl mx-auto px-4 sm:px-6 lg:px-8"
      aria-labelledby={`section-${title.replace(/\s+/g, '-').toLowerCase()}`}
    >
      {/* Section Title - Using semantic heading */}
      <header ref={sectionRef} className="flex items-center my-10">
        <div className="flex-grow border-t-2 border-gray-300" aria-hidden="true"></div>
        <h2 
          id={`section-${title.replace(/\s+/g, '-').toLowerCase()}`}
          className="mx-4 text-gray-800 font-semibold lg:text-xl"
        >
          {title}
        </h2>
        <div className="flex-grow border-t-2 border-gray-300" aria-hidden="true"></div>
      </header>

      {/* Products Grid - Using semantic list */}
      <ul 
        className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8 mb-20"
        role="list"
      >
        {safeDisplayedProducts.length > 0 ? (
          safeDisplayedProducts.map((product) => {
            const productDescription = stripHtml(product.description) || `${product.name} - Perfect for your needs.`;
            
            return (
              <li
                key={product.id}
                className="w-full rounded-2xl overflow-hidden bg-white flex flex-col h-full"
                itemScope
                itemType="https://schema.org/Product"
              >
                {/* Structured data script */}
                <script 
                  type="application/ld+json"
                  dangerouslySetInnerHTML={{
                    __html: JSON.stringify(generateProductSchema(product, title))
                  }}
                />

                <Link 
                  to={`/product/${product.id}`}
                  aria-label={`View details for ${product.name}`}
                >
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={`${product.name} - ${productDescription.substring(0, 100)}`}
                      loading="lazy"
                      decoding="async"
                      width="300"
                      height="300"
                      itemProp="image"
                      className={`rounded-2xl w-full h-35 sm:h-56 md:h-50 lg:h-50 xl:h-75 2xl:h-100 object-cover transition-all duration-500 ${
                        shouldHighlight && shouldHighlight(product)
                          ? 'brightness-110 contrast-105 shadow-lg'
                          : ''
                      }`}
                    />
                    {product.savePercent && (
                      <div 
                        className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded"
                        aria-label={`Save ${product.savePercent} on this product`}
                      >
                        Save {product.savePercent}
                      </div>
                    )}
                  </div>
                </Link>

                <div className="p-3 sm:p-4 flex flex-col flex-grow text-center">
                  <Link 
                    to={`/product/${product.id}`}
                    aria-label={`View details for ${product.name}`}
                  >
                    <h3 
                      className="text-sm sm:text-base md:text-lg text-gray-700 font-semibold mb-1 line-clamp-2"
                      itemProp="name"
                    >
                      {product.name}
                    </h3>

                    <p 
                      className="text-gray-600 text-xs sm:text-sm mb-2 line-clamp-2"
                      itemProp="description"
                    >
                      {productDescription}
                    </p>

                    <div 
                      className="font-medium text-gray-800 mb-3 text-sm sm:text-base"
                      itemProp="offers"
                      itemScope
                      itemType="https://schema.org/Offer"
                    >
                      <meta itemProp="priceCurrency" content="INR" />
                      <meta itemProp="price" content={product.price} />
                      <meta itemProp="availability" content="https://schema.org/InStock" />
                      
                      {product.originalPrice ? (
                        <span className="flex items-center justify-center gap-2">
                          <span 
                            className="line-through text-gray-500 text-xs"
                            aria-label={`Original price ${product.originalPrice} rupees`}
                          >
                            ₹{product.originalPrice}
                          </span>
                          <span className="font-bold">
                            from ₹{product.price}
                          </span>
                        </span>
                      ) : (
                        <span className="font-bold">from ₹{product.price}</span>
                      )}
                    </div>
                  </Link>

                  <div className="mt-auto">
                    <button
                      className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 rounded-md transition focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleAddToCart(product);
                      }}
                      aria-label={`Add ${product.name} to cart`}
                      type="button"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </li>
            );
          })
        ) : (
          <li className="col-span-full py-20 text-center text-gray-500" role="status">
            No products found.
          </li>
        )}
      </ul>

      <ViewToggleButton
        showAll={showAll}
        setShowAll={setShowAll}
        scrollToRef={scrollToRef}
        refElement={sectionRef}
        productsLength={safeProducts.length}
      />
    </section>
  );
};

export default ProductSection;