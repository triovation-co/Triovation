import React from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { useEffect } from 'react'; 

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, getCartTotal } = useCart();
  const navigate = useNavigate();
  
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

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

  // Structured data for shopping cart
  const cartSchema = {
    "@context": "https://schema.org",
    "@type": "ShoppingCart",
    "itemListElement": cart.items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Product",
        "name": item.name,
        "image": item.image,
        "offers": {
          "@type": "Offer",
          "price": item.price,
          "priceCurrency": "INR"
        }
      }
    }))
  };

  if (cart.items.length === 0) {
    return (
      <main className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <article className="text-center py-16">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-8">Looks like you haven't added anything to your cart yet.</p>
            <Link 
              to="/products" 
              className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
              aria-label="Continue shopping and browse products"
            >
              Continue Shopping
            </Link>
          </article>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* SEO: Structured Data */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(cartSchema)
        }}
      />

      {/* Header */}
      <header className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-center text-gray-900">Shopping Cart</h1>

          {/* Progress Steps */}
          <nav className="flex items-center justify-center mt-8 space-x-4" aria-label="Checkout progress">
            <div className="flex items-center">
              <div 
                className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm font-semibold"
                aria-current="step"
              >
                1
              </div>
              <span className="ml-2 text-sm font-medium text-gray-900">SHOPPING CART</span>
            </div>

            <div className="w-16 sm:w-24 h-px bg-gray-300" aria-hidden="true"></div>

            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-300 text-gray-500 rounded-full flex items-center justify-center text-sm font-semibold">
                2
              </div>
              <span className="ml-2 text-sm font-medium text-gray-500">CHECKOUT DETAILS</span>
            </div>

            <div className="w-16 sm:w-24 h-px bg-gray-300" aria-hidden="true"></div>

            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-300 text-gray-500 rounded-full flex items-center justify-center text-sm font-semibold">
                3
              </div>
              <span className="ml-2 text-sm font-medium text-gray-500">ORDER COMPLETE</span>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <section className="lg:flex-[2]" aria-label="Shopping cart items">
            <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
              {/* Cart Header */}
              <div className="px-6 py-4 border-b border-gray-200 hidden sm:grid grid-cols-12 gap-4 text-sm font-medium text-gray-700">
                <div className="col-span-5">Product</div>
                <div className="col-span-2">Price</div>
                <div className="col-span-3">Quantity</div>
                <div className="col-span-2">Subtotal</div>
              </div>

              {/* Cart Items */}
              <ul className="divide-y divide-gray-200" role="list">
                {cart.items.map((item) => (
                  <li key={item.id} className="px-6 py-6">
                    <article className="flex flex-col sm:grid sm:grid-cols-12 gap-4 items-center sm:items-start">
                      {/* Product Info */}
                      <div className="flex items-start sm:col-span-5 space-x-4 w-full">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors mt-1 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded"
                          aria-label={`Remove ${item.name} from cart`}
                          type="button"
                        >
                          <X className="w-5 h-5" />
                        </button>
                        <img
                          src={item.image || '/api/placeholder/100/100'}
                          alt={`${item.name} product image`}
                          className="w-24 h-24 object-cover rounded flex-shrink-0"
                          width="96"
                          height="96"
                          loading="lazy"
                          onError={(e) => {
                            e.target.src = '/api/placeholder/100/100';
                          }}
                        />
                        <div className="flex-1 min-w-0">
                          <h2 className="font-medium text-gray-900 text-base">{item.name}</h2>
                          <p className="text-sm text-gray-500 mt-1">{item.category || 'Custom Product'}</p>
                          
                          {/* Customization Details */}
                          {item.customization && (
                            <div className="mt-3 bg-orange-50 border border-orange-200 rounded p-3">
                              <p className="text-xs font-semibold text-orange-800 mb-1">Customization:</p>
                              <p className="text-sm text-gray-700 leading-relaxed">{item.customization}</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Price */}
                      <div className="text-gray-900 font-medium text-base mt-2 sm:mt-0 sm:col-span-2">
                        <span className="sr-only">Price: </span>
                        ₹{item.price?.toLocaleString('en-IN') || '0'}
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-3 mt-2 sm:mt-0 sm:col-span-3" role="group" aria-label="Quantity controls">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded text-gray-600 hover:bg-gray-50 text-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                          aria-label={`Decrease quantity of ${item.name}`}
                          type="button"
                        >
                          −
                        </button>
                        <span className="w-12 text-center text-gray-900 font-medium text-base" aria-label={`Quantity: ${item.quantity}`}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded text-gray-600 hover:bg-gray-50 text-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                          aria-label={`Increase quantity of ${item.name}`}
                          type="button"
                        >
                          +
                        </button>
                      </div>

                      {/* Subtotal */}
                      <div className="text-gray-900 font-semibold text-base mt-2 sm:mt-0 sm:col-span-2">
                        <span className="sr-only">Subtotal: </span>
                        ₹{((item.price || 0) * item.quantity).toLocaleString('en-IN')}
                      </div>
                    </article>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Cart Summary */}
          <aside className="lg:flex-1" aria-label="Order summary">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Cart totals</h2>

              <dl className="space-y-4 mb-6">
                <div className="flex justify-between text-base text-gray-700">
                  <dt>Subtotal</dt>
                  <dd className="font-medium">₹{subtotal.toLocaleString('en-IN')}</dd>
                </div>

                <div className="flex justify-between text-base text-gray-700">
                  <dt>Shipping</dt>
                  <dd className="text-right">
                    <div className="font-medium">Free shipping</div>
                    <div className="text-xs text-gray-500 mt-1">Shipping to Maharashtra</div>
                  </dd>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between text-xl font-bold text-gray-900">
                    <dt>Total</dt>
                    <dd>₹{total.toLocaleString('en-IN')}</dd>
                  </div>
                </div>
              </dl>

              <button
                onClick={proceedToCheckout}
                className="w-full bg-black text-white py-3 px-4 rounded hover:bg-gray-800 transition-colors font-medium text-base focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                type="button"
              >
                Proceed to Checkout
              </button>

              <div className="mt-4 text-center">
                <Link 
                  to="/products"
                  className="text-sm text-gray-600 hover:text-gray-900 focus:outline-none focus:underline"
                >
                  ← Back to Products
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default Cart;