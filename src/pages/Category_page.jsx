import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { categories } from "../assets/data.jsx";

const Category_page = () => {
  const { categoryName } = useParams();
  const decodedName = decodeURIComponent(categoryName);

  // Scroll to top when component mounts or category changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [categoryName]); // Re-run when categoryName changes

  // Find category object
  const category = categories.find(cat => cat.title === decodedName);

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Category Not Found</h1>
          <p className="text-gray-600">The category "{decodedName}" doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{category.title}</h1>
          <p className="text-gray-600 max-w-3xl">{category.description}</p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {category.products.map((product, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              {/* Product Image */}
              <div className="aspect-square bg-gray-100">
                <img
                  src={product.image || '/api/placeholder/300/300'}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = '/api/placeholder/300/300';
                  }}
                />
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2 line-clamp-2">
                  {product.name}
                </h3>
                
                <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                  A unique and quirky way to preserve your memories — gift your loved ones this {product.name}.
                </p>

                {/* Rating */}
                {product.rating && (
                  <div className="flex items-center mb-3">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'}`}
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">
                      {product.rating} ({product.reviews || 0} reviews)
                    </span>
                  </div>
                )}

                {/* Price */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-gray-900">
                      from ₹{product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        ₹{product.originalPrice}
                      </span>
                    )}
                  </div>
                  {product.savePercent && (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                      {product.savePercent}% OFF
                    </span>
                  )}
                </div>

                {/* Add to Cart */}
                <button 
                  onClick={() => {
                    // Add to cart functionality would go here
                    console.log('Added to cart:', product.name);
                  }}
                  className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors font-medium"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {(!category.products || category.products.length === 0) && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">We're working on adding products to this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Category_page;
