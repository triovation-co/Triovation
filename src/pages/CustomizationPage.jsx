import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ShoppingCart, Search, Check, ArrowLeft } from "lucide-react";
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

const powerSources = [
  {
    label: "9V Battery",
    value: "battery",
    img: "https://images.unsplash.com/photo-1624823183493-ed5832f48f18?auto=format&fit=crop&w=400&q=80",
  },
  {
    label: "Wired DC Power Jack",
    value: "dc_jack",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=400&q=80",
  },
  {
    label: "C-type Charging Lamp",
    value: "c_type",
    img: "https://images.unsplash.com/photo-1625948515291-69613efd103f?auto=format&fit=crop&w=400&q=80",
  },
];

const ledColors = [
  {
    label: "Warm White",
    value: "warm_white",
    img: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=400&q=80",
  },
  {
    label: "White",
    value: "white",
    img: "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?auto=format&fit=crop&w=400&q=80",
  },
  {
    label: "Red",
    value: "red",
    img: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=400&q=80",
  },
  {
    label: "Blue",
    value: "blue",
    img: "https://images.unsplash.com/photo-1535558275619-6b36d1d8d07a?auto=format&fit=crop&w=400&q=80",
  },
];

const lampDesigns = [
  {
    label: "D1",
    value: "d1",
    img: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=400&q=80",
  },
  {
    label: "D2",
    value: "d2",
    img: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=400&q=80",
  },
  {
    label: "D3",
    value: "d3",
    img: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=400&q=80",
  },
  {
    label: "D4",
    value: "d4",
    img: "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?auto=format&fit=crop&w=400&q=80",
  },
  {
    label: "D5",
    value: "d5",
    img: "https://images.unsplash.com/photo-1543512214-318c7553f230?auto=format&fit=crop&w=400&q=80",
  },
  {
    label: "D6",
    value: "d6",
    img: "https://images.unsplash.com/photo-1535558275619-6b36d1d8d07a?auto=format&fit=crop&w=400&q=80",
  },
  {
    label: "D7",
    value: "d7",
    img: "https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=400&q=80",
  },
  {
    label: "D8",
    value: "d8",
    img: "https://images.unsplash.com/photo-1534105415203-0e48e8ba9e3a?auto=format&fit=crop&w=400&q=80",
  },
];

export default function CustomizationPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { products: sheetProducts, loading: sheetLoading } = useProductManager();
  
  const [selectedPower, setSelectedPower] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedDesign, setSelectedDesign] = useState("");
  const [product, setProduct] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  // Fetch product details
  useEffect(() => {
    if (sheetLoading || !id) return;

    const allStaticProducts = [
      ...FestiveSeason,
      ...corporateGiftingProducts,
      ...customisationProducts,
      ...homeDecorProducts,
      ...mechanicalProducts,
      ...designConsultancyProducts,
      ...educationWorkshopsProducts,
    ];

    const allProducts = [...allStaticProducts, ...sheetProducts];
    const foundProduct = allProducts.find((p) => p.id.toString() === id);

    if (foundProduct) {
      setProduct(foundProduct);
    }
  }, [id, sheetProducts, sheetLoading]);

  const getPreviewImg = (arr, val) => arr.find((opt) => opt.value === val)?.img;

  const handleAddToCart = () => {
    if (!product || !selectedPower || !selectedColor || !selectedDesign) return;

    // Create customization details string
    const customizationDetails = `Power: ${powerSources.find(p => p.value === selectedPower)?.label}, LED: ${ledColors.find(c => c.value === selectedColor)?.label}, Design: ${lampDesigns.find(d => d.value === selectedDesign)?.label}`;

    // Add to cart with customization details
    addToCart({
      id: `${product.id}-custom-${Date.now()}`, // Unique ID for customized product
      name: `${product.name} (Customized)`,
      price: product.price,
      image: product.image,
      quantity: 1,
      customization: customizationDetails,
    });

    // Show success message
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      // Navigate to cart after 1.5 seconds
      setTimeout(() => {
        navigate('/cart');
      }, 500);
    }, 1500);
  };

  if (sheetLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mb-4"></div>
          <div className="text-orange-600 text-lg">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white pt-16 sm:pt-20">
      {/* Success Message */}
      {showSuccess && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2">
          <Check className="w-5 h-5" />
          <span>Added to cart successfully!</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-4 sm:mb-6 flex items-center text-orange-600 hover:text-orange-700 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          <span className="text-base">Back to Product</span>
        </button>

        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Customize Your Product
          </h1>
          {product && (
            <div>
              <p className="text-lg text-gray-700 font-medium">{product.name}</p>
              <p className="text-sm text-gray-600">
                Product ID: <span className="font-semibold text-orange-600">{id}</span>
              </p>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Preview Section */}
          <div className="bg-white rounded-lg shadow-lg p-6 h-fit sticky top-24">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Live Preview</h2>
            <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden aspect-square flex items-center justify-center">
              {selectedPower || selectedColor || selectedDesign ? (
                <div className="relative w-full h-full">
                  <img
                    src={
                      getPreviewImg(lampDesigns, selectedDesign) ||
                      getPreviewImg(ledColors, selectedColor) ||
                      getPreviewImg(powerSources, selectedPower) ||
                      product?.image ||
                      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80"
                    }
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-4">
                    <div className="space-y-2 text-sm">
                      {selectedPower && (
                        <p>
                          <span className="font-semibold">Power:</span>{" "}
                          {powerSources.find((p) => p.value === selectedPower)?.label}
                        </p>
                      )}
                      {selectedColor && (
                        <p>
                          <span className="font-semibold">LED:</span>{" "}
                          {ledColors.find((c) => c.value === selectedColor)?.label}
                        </p>
                      )}
                      {selectedDesign && (
                        <p>
                          <span className="font-semibold">Design:</span>{" "}
                          {lampDesigns.find((d) => d.value === selectedDesign)?.label}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center p-8">
                  <Search className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-500 text-lg">
                    Select options to see your customized product
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Customization Options */}
          <div className="space-y-8">
            {/* Power Source */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-900">Power Source</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {powerSources.map((power) => (
                  <button
                    key={power.value}
                    onClick={() => setSelectedPower(power.value)}
                    className={`relative rounded-lg overflow-hidden border-2 transition-all ${
                      selectedPower === power.value
                        ? "border-orange-500 ring-2 ring-orange-200"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <img
                      src={power.img}
                      alt={power.label}
                      className="w-full h-32 object-cover"
                    />
                    <div className="p-3 bg-white">
                      <p className="text-sm font-medium text-gray-900">{power.label}</p>
                    </div>
                    {selectedPower === power.value && (
                      <div className="absolute top-2 right-2 bg-orange-500 rounded-full p-1">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* LED Color */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-900">LED Colour</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {ledColors.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setSelectedColor(color.value)}
                    className={`relative rounded-lg overflow-hidden border-2 transition-all ${
                      selectedColor === color.value
                        ? "border-orange-500 ring-2 ring-orange-200"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <img
                      src={color.img}
                      alt={color.label}
                      className="w-full h-24 object-cover"
                    />
                    <div className="p-2 bg-white">
                      <p className="text-xs font-medium text-gray-900">{color.label}</p>
                    </div>
                    {selectedColor === color.value && (
                      <div className="absolute top-2 right-2 bg-orange-500 rounded-full p-1">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Lamp Design */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-900">Lamp Design</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {lampDesigns.map((design) => (
                  <button
                    key={design.value}
                    onClick={() => setSelectedDesign(design.value)}
                    className={`relative rounded-lg overflow-hidden border-2 transition-all ${
                      selectedDesign === design.value
                        ? "border-orange-500 ring-2 ring-orange-200"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <img
                      src={design.img}
                      alt={design.label}
                      className="w-full h-24 object-cover"
                    />
                    <div className="p-2 bg-white">
                      <p className="text-xs font-medium text-gray-900">{design.label}</p>
                    </div>
                    {selectedDesign === design.value && (
                      <div className="absolute top-2 right-2 bg-orange-500 rounded-full p-1">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <button
                onClick={handleAddToCart}
                disabled={!selectedPower || !selectedColor || !selectedDesign}
                className="w-full bg-orange-500 text-white py-4 px-6 rounded-lg hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-semibold text-lg flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Add Customized Product to Cart
              </button>
              {(!selectedPower || !selectedColor || !selectedDesign) && (
                <p className="text-sm text-gray-500 text-center mt-3">
                  Please select all options to add to cart
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
