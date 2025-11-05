import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  // 🔥 ADD YOUR GOOGLE APPS SCRIPT WEB APP URL HERE
  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzKEmqd-a72j87VTW2_9Hnyr938gdhH-SiN0mG_SktrGKQD2hXnhaidOkim4baQq-kL/exec';
  // Example: 'https://script.google.com/macros/s/AKfycby.../exec'

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    country: 'India',
    streetAddress: '',
    apartment: '',
    townCity: '',
    state: 'Maharashtra',
    pinCode: '',
    phone: '',
    email: '',
    createAccount: false,
    shipToDifferent: false,
    orderNotes: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('whatsapp');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const subtotal = getCartTotal();
  const shipping = 0; // Free shipping
  const total = subtotal + shipping;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Prepare order data
      const orderData = {
        formData: formData,
        cart: cart.items,
        subtotal: subtotal,
        shipping: shipping,
        total: total,
        paymentMethod: paymentMethod,
        orderDate: new Date().toISOString()
      };

      console.log('📤 Sending order data:', orderData);

      // Send to Google Apps Script
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // Important for Google Apps Script
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });

      // Note: With mode: 'no-cors', we can't read the response
      // But if no error is thrown, we assume success
      console.log('✅ Order sent successfully');

      // Clear cart and show success
      clearCart();
      alert('Order placed successfully! We will contact you on WhatsApp for payment.');
      navigate('/');

    } catch (error) {
      console.error('❌ Error submitting order:', error);
      setSubmitError('Failed to submit order. Please try again or contact us directly.');
      setIsSubmitting(false);
    }
  };

  if (cart.items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-center text-gray-900">Checkout</h1>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mt-8 space-x-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-300 text-gray-500 rounded-full flex items-center justify-center text-sm font-semibold">
                1
              </div>
              <span className="ml-2 text-sm font-medium text-gray-500">SHOPPING CART</span>
            </div>

            <div className="w-8 h-px bg-gray-300"></div>

            <div className="flex items-center">
              <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm font-semibold">
                2
              </div>
              <span className="ml-2 text-sm font-medium text-gray-900">CHECKOUT DETAILS</span>
            </div>

            <div className="w-8 h-px bg-gray-300"></div>

            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-300 text-gray-500 rounded-full flex items-center justify-center text-sm font-semibold">
                3
              </div>
              <span className="ml-2 text-sm font-medium text-gray-500">ORDER COMPLETE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {submitError && (
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{submitError}</span>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Billing Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">

              <h2 className="text-xl font-semibold text-gray-900 mb-6">Billing details</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company name (optional)
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country / Region *
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                  >
                    <option value="India">India</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Street address *
                  </label>
                  <input
                    type="text"
                    name="streetAddress"
                    required
                    placeholder="House number and street name"
                    value={formData.streetAddress}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                  />
                </div>

                <div>
                  <input
                    type="text"
                    name="apartment"
                    placeholder="Apartment, suite, unit, etc. (optional)"
                    value={formData.apartment}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Town / City *
                  </label>
                  <input
                    type="text"
                    name="townCity"
                    required
                    value={formData.townCity}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State *
                  </label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                  >
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    PIN Code *
                  </label>
                  <input
                    type="text"
                    name="pinCode"
                    required
                    value={formData.pinCode}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Order notes (optional)
                  </label>
                  <textarea
                    name="orderNotes"
                    rows="4"
                    placeholder="Notes about your order, e.g. special notes for delivery"
                    value={formData.orderNotes}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                  />
                </div>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Your order</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm font-medium text-gray-700 pb-2 border-b">
                  <span>Product</span>
                  <span>Subtotal</span>
                </div>

                {cart.items.map((item) => (
                  <div key={item.id} className="text-sm">
                    <div className="flex justify-between">
                      <div>
                        <span className="text-gray-900">{item.name}</span>
                        <span className="text-gray-500"> × {item.quantity}</span>
                      </div>
                      <span className="text-gray-900">₹{((item.price || 0) * item.quantity).toFixed(2)}</span>
                    </div>
                    {/* Show customization details */}
                    {item.customization && (
                      <div className="mt-2 ml-4 p-2 bg-blue-50 border-l-2 border-blue-400 rounded">
                        <p className="text-xs text-blue-800 font-semibold">🎨 Customization:</p>
                        <p className="text-xs text-gray-700 mt-1">{item.customization}</p>
                      </div>
                    )}
                  </div>
                ))}

                <div className="flex justify-between text-sm py-2 border-t">
                  <span className="text-gray-700">Subtotal</span>
                  <span className="text-gray-900">₹{subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">Shipping</span>
                  <span className="text-gray-500">Free shipping</span>
                </div>

                <div className="flex justify-between text-lg font-semibold pt-2 border-t">
                  <span className="text-gray-900">Total</span>
                  <span className="text-gray-900">₹{total.toFixed(2)}</span>
                </div>
              </div>

              {/* Payment Method */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-4">Payment on WhatsApp</h3>
                <div className="p-4 bg-gray-50 rounded border">
                  <p className="text-sm text-green-600">
                    We will contact you on WhatsApp for payment.
                  </p>
                </div>

                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded">
                  <p className="text-xs text-gray-600">
                    Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our{' '}
                    <button className="text-blue-600 hover:underline">privacy policy</button>.
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <label className="flex items-start space-x-2">
                  <input
                    type="checkbox"
                    required
                    className="mt-1 rounded border-gray-300 text-black focus:ring-black"
                  />
                  <span className="text-xs text-gray-600">
                    I agree to receive order updates and confirmation via email and WhatsApp.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full bg-black text-white py-3 px-4 rounded hover:bg-gray-800 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Processing...' : 'Place order'}
              </button>

              <div className="mt-4 text-center">
                <button 
                  onClick={() => navigate('/cart')}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  ← Back to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;