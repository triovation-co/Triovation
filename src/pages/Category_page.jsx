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

  // find category object
  const category = categories.find(cat => cat.title === decodedName);

  if (!category) {
    return <h1 className="text-center mt-10 text-2xl">Category Not Found</h1>;
  }

  return (
    <div className="p-4 sm:p-6 md:p-10">
      {/* Page Title */}
      <h1 className="text-2xl text-gray-700 sm:text-3xl md:text-4xl font-bold mb-15 text-center">
        {category.title}
      </h1>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-20">
        {category.items.map(product => (
          <div
            key={product.id}
            className="rounded-2xl overflow-hidden bg-white flex flex-col "
          >
            {/* Product Image */}
            <img
              src={product.image}
              alt={product.name}
              className="rounded-2xl w-full h-48 sm:h-56 md:h-64 object-cover"
            />

            {/* Details */}
            <div className="p-4 flex flex-col flex-grow text-center">
              <h2 className="text-base sm:text-lg text-gray-700 font-semibold mb-2">
                {product.name}
              </h2>
              <p className="text-gray-600 text-xs sm:text-sm mb-3 leading-relaxed">
                A unique and quirky way to preserve your memories — gift your
                loved ones this {product.name}.
              </p>

              {/* Rating */}
              <div className="flex justify-center items-center text-xs sm:text-sm mb-2">
                ⭐ <span className="ml-1">5.0 (2 reviews)</span>
              </div>

              {/* Price */}
              <p className="font-medium text-gray-800 mb-4 text-sm sm:text-base">
                from ₹{product.price}
              </p>

              {/* Add to Cart */}
              <div className="w-full flex justify-center">
                <button className="bg-blue-500 text-white px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-md rounded-md hover:bg-blue-600 w-auto">
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category_page;