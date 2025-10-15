import React, { useState } from "react";
import { ShoppingCart, Search, Check } from "lucide-react";

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
  const [selectedPower, setSelectedPower] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedDesign, setSelectedDesign] = useState("");

  const getPreviewImg = (arr, val) => arr.find((opt) => opt.value === val)?.img;

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Preview Section */}
        {(selectedPower || selectedColor || selectedDesign) && (
          <section className="mb-16 p-8 bg-gray-50 rounded-2xl border border-gray-100">
            <div className="flex flex-wrap items-center justify-center gap-8">
              {selectedPower && (
                <div className="text-center">
                  <img
                    src={getPreviewImg(powerSources, selectedPower)}
                    alt="power"
                    className="w-32 h-32 object-cover rounded-xl mb-3"
                  />
                  <p className="text-sm text-gray-600">Power Source</p>
                </div>
              )}
              {selectedColor && (
                <div className="text-center">
                  <img
                    src={getPreviewImg(ledColors, selectedColor)}
                    alt="color"
                    className="w-32 h-32 object-cover rounded-xl mb-3"
                  />
                  <p className="text-sm text-gray-600">LED Colour</p>
                </div>
              )}
              {selectedDesign && (
                <div className="text-center">
                  <img
                    src={getPreviewImg(lampDesigns, selectedDesign)}
                    alt="design"
                    className="w-32 h-32 object-cover rounded-xl mb-3"
                  />
                  <p className="text-sm text-gray-600">Lamp Design</p>
                </div>
              )}
            </div>
            {selectedPower && selectedColor && selectedDesign && (
              <button className="mt-6 w-full bg-gradient-to-r from-red-400 to-pink-400 text-white font-medium py-3 rounded-lg hover:from-red-500 hover:to-pink-500 transition-all">
                Get Customized
              </button>
            )}
          </section>
        )}

        {/* Why Choose Us */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">
            Customize Your Lamp
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-red-400 to-pink-400 mx-auto"></div>
        </div>

        {/* Power Source */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Power Source</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {powerSources.map((opt) => (
              <button
                key={opt.value}
                className={`relative group overflow-hidden rounded-xl transition-all ${
                  selectedPower === opt.value
                    ? "ring-2 ring-red-400 shadow-lg"
                    : "hover:shadow-md"
                }`}
                onClick={() => setSelectedPower(opt.value)}
              >
                <img 
                  src={opt.img} 
                  alt={opt.label} 
                  className="w-full h-56 object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-t transition-all ${
                  selectedPower === opt.value 
                    ? "from-red-400/80 to-transparent" 
                    : "from-black/50 to-transparent group-hover:from-red-400/60"
                }`}>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white font-medium">{opt.label}</p>
                    {selectedPower === opt.value && (
                      <div className="mt-2 inline-flex items-center gap-1 bg-white text-red-500 px-2 py-1 rounded-full text-xs font-medium">
                        <Check className="w-3 h-3" />
                        Selected
                      </div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* LED Colour */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">LED Colour</h3>
          <div className="grid md:grid-cols-4 gap-6">
            {ledColors.map((opt) => (
              <button
                key={opt.value}
                className={`relative group overflow-hidden rounded-xl transition-all ${
                  selectedColor === opt.value
                    ? "ring-2 ring-orange-400 shadow-lg"
                    : "hover:shadow-md"
                }`}
                onClick={() => setSelectedColor(opt.value)}
              >
                <img 
                  src={opt.img} 
                  alt={opt.label} 
                  className="w-full h-48 object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-t transition-all ${
                  selectedColor === opt.value 
                    ? "from-orange-400/80 to-transparent" 
                    : "from-black/50 to-transparent group-hover:from-orange-400/60"
                }`}>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white font-medium">{opt.label}</p>
                    {selectedColor === opt.value && (
                      <div className="mt-2 inline-flex items-center gap-1 bg-white text-orange-500 px-2 py-1 rounded-full text-xs font-medium">
                        <Check className="w-3 h-3" />
                        Selected
                      </div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Lamp Design */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Lamp Design</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {lampDesigns.map((opt) => (
              <button
                key={opt.value}
                className={`relative group overflow-hidden rounded-xl transition-all ${
                  selectedDesign === opt.value
                    ? "ring-2 ring-pink-400 shadow-lg"
                    : "hover:shadow-md"
                }`}
                onClick={() => setSelectedDesign(opt.value)}
              >
                <img 
                  src={opt.img} 
                  alt={opt.label} 
                  className="w-full h-48 object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-t transition-all ${
                  selectedDesign === opt.value 
                    ? "from-pink-400/80 to-transparent" 
                    : "from-black/50 to-transparent group-hover:from-pink-400/60"
                }`}>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white font-medium">{opt.label}</p>
                    {selectedDesign === opt.value && (
                      <div className="mt-2 inline-flex items-center gap-1 bg-white text-pink-500 px-2 py-1 rounded-full text-xs font-medium">
                        <Check className="w-3 h-3" />
                        Selected
                      </div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}