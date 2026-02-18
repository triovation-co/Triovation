import React, { useEffect, useState } from "react";
import { ShoppingCart, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

/**
 GLOBAL TOAST SYSTEM — Add-to-Cart only
 Event:
 window.dispatchEvent(new CustomEvent('cart-item-added',{detail:{name,image,price}}))
*/

const CartToast = () => {
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let timer;

    const handleCart = (e) => {
      setToast(e.detail);
      clearTimeout(timer);
      timer = setTimeout(() => setToast(null), 3500);
    };

    window.addEventListener("cart-item-added", handleCart);

    return () => {
      window.removeEventListener("cart-item-added", handleCart);
      clearTimeout(timer);
    };
  }, []);

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] w-[calc(100vw-2rem)] max-w-sm">
      <div
        className="bg-white/95 backdrop-blur-md border border-[#f47e82]/20 rounded-2xl shadow-2xl shadow-[#f47e82]/10 p-4 flex gap-3 items-start animate-slideUp"
      >
        <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-[#f47e82]/10">
          <ShoppingCart className="text-[#f47e82] w-5 h-5" />
        </div>

        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-900">Added to Cart</p>
          <p className="text-sm text-gray-500 truncate">{toast?.name}</p>
          <button
            onClick={() => { setToast(null); navigate("/cart"); }}
            className="text-xs text-[#f47e82] hover:text-[#e06670] mt-1 font-semibold transition-colors"
          >
            View Cart →
          </button>
        </div>

        <button
          onClick={() => setToast(null)}
          className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0 mt-0.5"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

export default CartToast;
