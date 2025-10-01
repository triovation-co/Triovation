import React from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, getCartTotal } = useCart();
  const navigate = useNavigate();

  const subtotal = getCartTotal();
  const shipping = 0; // Free shipping
  const total = subtotal + shipping;

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const proceedToCheckout = () => {
    navigate('/checkout');
  };

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center py-16">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-8">Looks like you haven't added anything to your cart yet.</p>
            <Link 
              to="/products" 
              className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-center text-gray-900">Cart</h1>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mt-8 space-x-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm font-semibold">
                1
              </div>
              <span className="ml-2 text-sm font-medium text-gray-900">SHOPPING CART</span>
            </div>

            <div className="w-full sm:w-8 h-px bg-gray-300"></div>

            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-300 text-gray-500 rounded-full flex items-center justify-center text-sm font-semibold">
                2
              </div>
              <span className="ml-2 text-sm font-medium text-gray-500">CHECKOUT DETAILS</span>
            </div>

            <div className="w-full sm:w-8 h-px bg-gray-300"></div>

            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-300 text-gray-500 rounded-full flex items-center justify-center text-sm font-semibold">
                3
              </div>
              <span className="ml-2 text-sm font-medium text-gray-500">ORDER COMPLETE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:flex-2">
            <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
              {/* Cart Header */}
              <div className="px-4 py-3 border-b border-gray-200 hidden sm:grid grid-cols-6 gap-4 text-sm font-medium text-gray-700">
                <div className="col-span-2">Product</div>
                <div>Price</div>
                <div>Quantity</div>
                <div>Subtotal</div>
                <div></div>
              </div>

              {/* Cart Items */}
              <div className="divide-y divide-gray-200">
                {cart.items.map((item) => (
                  <div key={item.id} className="px-4 py-4 sm:py-6">
                    <div className="flex flex-col sm:grid sm:grid-cols-6 gap-4 items-center sm:items-start">
                      {/* Product Info */}
                      <div className="flex items-center sm:col-span-2 space-x-4 w-full">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <img
                          src={item.image || '/api/placeholder/80/80'}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded flex-shrink-0"
                          onError={(e) => {
                            e.target.src = '/api/placeholder/80/80';
                          }}
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-gray-900">{item.name}</h3>
                          <p className="text-sm text-gray-500 mt-1 truncate">{item.category || 'Custom Product'}</p>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="text-gray-900 text-sm mt-2 sm:mt-0">
                        ₹{item.price?.toFixed(2) || '0.00'}
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded text-gray-600 hover:bg-gray-50"
                        >
                          −
                        </button>
                        <span className="w-8 text-center text-gray-900">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded text-gray-600 hover:bg-gray-50"
                        >
                          +
                        </button>
                      </div>

                      {/* Subtotal */}
                      <div className="text-gray-900 font-medium mt-2 sm:mt-0">
                        ₹{((item.price || 0) * item.quantity).toFixed(2)}
                      </div>

                      <div></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Cart Summary */}
          <div className="lg:flex-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Cart totals</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <div className="text-right">
                    <div>Free shipping</div>
                    <div className="text-xs text-gray-500">Shipping to Maharashtra</div>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-200">
                  <div className="flex justify-between text-lg font-semibold text-gray-900">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={proceedToCheckout}
                className="w-full bg-black text-white py-3 px-4 rounded hover:bg-gray-800 transition-colors font-medium"
              >
                Proceed to checkout
              </button>

              <div className="mt-4 text-center">
                <Link 
                  to="/products"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  ← Back to Products
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;