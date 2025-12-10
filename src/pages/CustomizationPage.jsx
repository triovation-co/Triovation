  import React, { useState, useEffect } from "react";
  import { useParams, useNavigate } from "react-router-dom";
  import { ShoppingCart, Check, ArrowLeft , ArrowRight } from "lucide-react";
  import { useCart } from "../context/CartContext";
  import { useProductManager } from "../hooks/useProductManager.jsx";
  import {
    FestiveSeason,
    corporateGiftingProducts,
    customisationProducts,
    homeDecorProducts,
    mechanicalProducts,
    designConsultancyProducts,
    educationWorkshopsProducts,
  } from "../assets/data.jsx";

  // Import lamp design images
  import acrylicLamp from "../assets/customization_page/acrylic_lamp.jpg";
  import acrylicLamp4 from "../assets/customization_page/acrylic_lamp_4.jpg";
  import acrylicLamp5 from "../assets/customization_page/acrylic_lamp_5.jpg";
  import couple1 from "../assets/customization_page/couple_1.jpg";
  import couple2a from "../assets/customization_page/couple_2.jpg";
  import couple2b from "../assets/customization_page/couple_2b.jpg";
  import couple2c from "../assets/customization_page/couple_2c.jpg";
  import moonCouple from "../assets/customization_page/moon_and_couple.jpg";
  import uShapeCalendar from "../assets/customization_page/u_shape_calendar.jpg";
  import Blue from "../assets/customization_page/blue_light.jpg";
  import warm from "../assets/customization_page/warn_light.jpg";
import WhatsAppButton from "../components/whatsapp.jsx";

  const powerSources = [
    {
      label: "9V Battery",
      value: "battery",
      img: "https://images.unsplash.com/photo-1624823183493-ed5832f48f18?auto=format&fit=crop&w=400&q=80",
    },
    {
      label: "DC Power Jack",
      value: "dc_jack",
      img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=400&q=80",
    },
    {
      label: "C-Type Charging",
      value: "c_type",
      img: "https://plus.unsplash.com/premium_photo-1759893280332-0f890dcdc936?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fGMlMjB0eXBlfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500",
    },
  ];

  const ledColors = [
    {
      label: "Warm White",
      value: "warm_white",
      img: warm,
    },
    {
      label: "White",
      value: "white",
      img: "https://m.media-amazon.com/images/I/41dW89u4gjL.jpg",
    },
    {
      label: "Red",
      value: "red",
      img: "https://ledcentre.in/wp-content/uploads/2022/05/red-strip.jpg",
    },
    {
      label: "Blue",
      value: "blue",
      img: Blue,
    },
  ];

  const lampDesigns = [
    { label: "U shape", value: "acrylic_lamp", img: acrylicLamp },
    { label: "Rectangular shape", value: "acrylic_lamp_4", img: acrylicLamp4 },
    { label: "Spotify frame", value: "acrylic_lamp_5", img: acrylicLamp5 },
    { label: "Couple 1", value: "couple_1", img: couple1 },
    { label: "Circular & Rectangular frame", value: "couple_2a", img: couple2a },
    { label: "Couple 2b", value: "couple_2b", img: couple2b },
    { label: "Couple Silhouette Frame", value: "couple_2c", img: couple2c },
    { label: "Moon shaped frame", value: "moon_couple", img: moonCouple },
    { label: "U Shape Calendar", value: "u_shape_calendar", img: uShapeCalendar },
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
      if (foundProduct) setProduct(foundProduct);
    }, [id, sheetProducts, sheetLoading]);

    const customizationDetails = `Power: ${
      powerSources.find((p) => p.value === selectedPower)?.label || "—"
    }, LED: ${
      ledColors.find((c) => c.value === selectedColor)?.label || "—"
    }, Design: ${
      lampDesigns.find((d) => d.value === selectedDesign)?.label || "—"
    }`;

    const handleAddToCart = () => {
      if (!product || !selectedPower || !selectedColor || !selectedDesign) return;

      addToCart({
        id: `${product.id}-custom-${Date.now()}`,
        name: `${product.name} (Customized)`,
        price: product.price,
        image: product.image,
        quantity: 1,
        customization: customizationDetails,
      });

      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setTimeout(() => navigate("/cart"), 500);
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
      <div className="min-h-screen bg-white">
        {showSuccess && (
          <div className="fixed top-24 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2">
            <Check className="w-5 h-5" />
            <span>Added to cart</span>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button
            onClick={() => navigate(-1)}
            className="mb-8 flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span>Back</span>
          </button>

          <div className="mb-12">
            <h1 className="text-3xl sm:text-4xl font-light text-gray-900 mb-2">
              Customize Product
            </h1>
            {product && <p className="text-gray-600">{product.name}</p>}
            <p className="text-red-400">you can select one option from each sections </p>
          </div>

          <div className="space-y-12">
            {/* Power Source */}
            <div>
              <h2 className="text-xl font-medium text-gray-900 mb-6">Power Source</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {powerSources.map((power) => (
                  <button
                    key={power.value}
                    onClick={() => setSelectedPower(power.value)}
                    className={`relative rounded-lg overflow-hidden border transition-all ${
                      selectedPower === power.value
                        ? "border-gray-900"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    <img
                      src={power.img}
                      alt={power.label}
                      className="w-full h-80 object-cover"
                    />
                    <div className="p-4 bg-white">
                      <p className="text-sm font-medium text-gray-900">{power.label}</p>
                    </div>
                    {selectedPower === power.value && (
                      <div className="absolute top-3 right-3 bg-gray-900 rounded-full p-1">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* LED Color */}
            <div>
              <h2 className="text-xl font-medium text-gray-900 mb-6">LED Color</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {ledColors.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setSelectedColor(color.value)}
                    className={`relative rounded-lg overflow-hidden border transition-all ${
                      selectedColor === color.value
                        ? "border-gray-900"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    <img
                      src={color.img}
                      alt={color.label}
                      className="w-full h-58 object-cover"
                    />
                    <div className="p-3 bg-white">
                      <p className="text-xs font-medium text-gray-900">{color.label}</p>
                    </div>
                    {selectedColor === color.value && (
                      <div className="absolute top-2 right-2 bg-gray-900 rounded-full p-1">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

        {/* Lamp Design Section */}
{/* Lamp Design Section */}
<div>
  <h2 className="text-xl font-medium text-gray-900 mb-6">Lamp Design</h2>

  <div className="relative w-full">
    {/* Left Arrow */}
    <button
      onClick={() =>
        document
          .getElementById("lampScroll")
          .scrollBy({ left: -620, behavior: "smooth" })
      }
      className="absolute -left-8 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 text-gray-800 shadow-md rounded-full p-2 z-10"
    >
      <ArrowLeft className="w-5 h-5" />
    </button>

    {/* Scrollable Container */}
    <div
      id="lampScroll"
      className="flex gap-4 overflow-x-auto scrollbar-hide px-2 scroll-smooth"
      style={{ scrollSnapType: "x mandatory" }}
    >
      {lampDesigns.map((design, idx) => (
        <button
          key={design.value}
          onClick={() => setSelectedDesign(design.value)}
          className={`relative flex-shrink-0 rounded-lg overflow-hidden border transition-all ${
            selectedDesign === design.value
              ? "border-gray-900"
              : "border-gray-200 hover:border-gray-400"
          }`}
          style={{
            minWidth: "calc(33.333% - 5px)", // 3 items fit with gap
            scrollSnapAlign: "start",
            borderRadius: "0.5rem", // ensure full rounding
          }}
        >
          <img
            src={design.img}
            alt={design.label}
            className="w-full h-100 object-cover rounded-lg"
          />
          <div className="p-3 bg-white">
            <p className="text-sm font-medium text-gray-900 truncate">
              {design.label}
            </p>
          </div>
          {selectedDesign === design.value && (
            <div className="absolute top-2 right-2 bg-gray-900 rounded-full p-1">
              <Check className="w-4 h-4 text-white" />
            </div>
          )}
        </button>
      ))}
    </div>

    {/* Right Arrow */}
    <button
      onClick={() =>
        document
          .getElementById("lampScroll")
          .scrollBy({ left: 620, behavior: "smooth" })
      }
      className="absolute -right-8 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 text-gray-800 shadow-md rounded-full p-2 z-10"
    >
      <ArrowRight className="w-5 h-5" />
    </button>
  </div>
</div>


            {/* Summary Section */}
            <div className="bg-gray-50 p-6 rounded-xl border">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Your Selection Summary
              </h2>
              <p className="text-gray-700">
                <strong>Power Source:</strong>{" "}
                {powerSources.find((p) => p.value === selectedPower)?.label ||
                  "Not selected"}
              </p>
              <p className="text-gray-700">
                <strong>LED Color:</strong>{" "}
                {ledColors.find((c) => c.value === selectedColor)?.label ||
                  "Not selected"}
              </p>
              <p className="text-gray-700">
                <strong>Lamp Design:</strong>{" "}
                {lampDesigns.find((d) => d.value === selectedDesign)?.label ||
                  "Not selected"}
              </p>
            </div>

            {/* Add to Cart */}
            <div className="pt-8 border-t">
              <button
                onClick={handleAddToCart}
                disabled={!selectedPower || !selectedColor || !selectedDesign}
                className="w-full sm:w-auto bg-gray-900 text-white py-4 px-12 rounded-lg hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
              {(!selectedPower || !selectedColor || !selectedDesign) && (
                <p className="text-sm text-gray-500 mt-3">
                  Please select all options to continue <br />
                <p className="text-sm text-blue-800 mt-3 font-medium">
  If you want more personalised custom product,<br />
  Click the <span className="text-green-500 font-medium">whatsapp</span> image and send your requirements
</p>                <WhatsAppButton/>
                </p>
              )}
            </div>
          </div>
        </div>
        
      </div>
      
    );
  }
