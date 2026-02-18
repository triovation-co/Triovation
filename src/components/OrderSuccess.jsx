import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { CheckCircle, Package, MessageCircle, ArrowRight, ShoppingBag } from "lucide-react";

const OrderSuccess = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-pink-50 px-4 py-12 sm:py-16">

      {/* Success Icon */}
      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center animate-scale-in">
          <CheckCircle className="w-12 h-12 text-green-500" />
        </div>
      </div>

      {/* Heading */}
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3 text-center">
        Order Placed Successfully!
      </h1>

      <p className="text-gray-500 mb-10 text-center max-w-xl mx-auto text-sm sm:text-base">
        Thank you for your order. Our team will contact you on WhatsApp shortly to confirm payment and delivery details.
      </p>

      {/* Next Steps */}
      <div className="max-w-2xl mx-auto bg-white rounded-xl p-6 sm:p-8 mb-10 space-y-5 shadow-sm border border-gray-100">
        <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">
          What happens next?
        </h2>

        <div className="flex items-start space-x-4">
          <div className="w-10 h-10 bg-[#f47e82]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <MessageCircle className="w-5 h-5 text-[#f47e82]" />
          </div>
          <div>
            <p className="text-base font-medium text-gray-700">WhatsApp Confirmation</p>
            <p className="text-sm text-gray-500 mt-1">
              We'll reach out on WhatsApp to confirm your order and share payment details.
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <div className="w-10 h-10 bg-[#f47e82]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <Package className="w-5 h-5 text-[#f47e82]" />
          </div>
          <div>
            <p className="text-base font-medium text-gray-700">Production & Dispatch</p>
            <p className="text-sm text-gray-500 mt-1">
              Once payment is confirmed, your order goes into production and will be dispatched within the agreed timeline.
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
        <Link
          to="/Products"
          className="flex-1 inline-flex items-center justify-center gap-2 bg-[#f47e82] hover:bg-[#e06670] text-white px-6 py-3.5 rounded-lg transition-all font-semibold text-base shadow-md hover:shadow-lg"
        >
          <ShoppingBag className="w-5 h-5" />
          Shop More
        </Link>

        <Link
          to="/"
          className="flex-1 inline-flex items-center justify-center gap-2 border border-gray-300 text-gray-700 px-6 py-3.5 rounded-lg hover:bg-gray-50 transition-all font-medium text-base"
        >
          Back to Home
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
};

export default OrderSuccess;
