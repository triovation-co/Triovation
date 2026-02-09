import { Routes, Route } from "react-router-dom";
import { useState, useRef, useEffect } from 'react';
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Service from "./pages/Service";
import Work_Education from "./pages/Work_Education";
import ContactUs from "./pages/ContactUs";
import Footer from "./components/Footer";
import Category_page from "./pages/Category_page";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./components/Checkout";
import CustomizableProductGrid from "./components/CustomizableProductGrid";
import { CartProvider } from './context/CartContext';
import CustomizationPage from './pages/CustomizationPage.jsx';
import TermsAndConditions from "./footer_pages/Terms_Condition.jsx";
import PrivacyPolicy from "./footer_pages/Privacy_Policies.jsx";
import ShippingPolicy from "./footer_pages/Shipping_Delivery.jsx";
import CancellationRefundPolicy from "./footer_pages/Cancellation-Refund.jsx";
import WhatsAppButton from "./components/whatsapp.jsx";
import ScrollToTop from "./components/ScrollToTop";
import ThankYou from "./pages/ThankYou";
import EnquiryModal from "./components/EnquiryModal";
import DesignConsultancy from "./pages/service_pages/DesignConsultancy.jsx";
import BrandIdentityDesign from "./pages/service_pages/design_consultancy_pages/BrandIdentityDesign";
import BrandManualDesign from "./pages/service_pages/design_consultancy_pages/BrandManualDesign";
import DigitalIllustrationDesign from "./pages/service_pages/design_consultancy_pages/DigitalIllustrationDesign";
import BusinessCollateralDesign from "./pages/service_pages/design_consultancy_pages/BusinessCollateralDesign";
import BrandCampaignsDesign from "./pages/service_pages/design_consultancy_pages/BrandCampaignsDesign";
import SocialMediaDesign from "./pages/service_pages/design_consultancy_pages/SocialMediaDesign";
import DigitalPaintingDesign from "./pages/service_pages/design_consultancy_pages/DigitalPaintingDesign";
import WebsiteUiUxDesign from "./pages/service_pages/design_consultancy_pages/WebsiteUiUxDesign";
import BookMagazineZineDesign from "./pages/service_pages/design_consultancy_pages/BookMagazineZineDesign";
import { MessageCircleQuestion } from "lucide-react";
import { createPortal } from "react-dom";
import SitemapGenerator from './components/SitemapGenerator';

function App() {
  const openEnquiry = () => {
    window.dispatchEvent(new Event("open-enquiry-form"));
  };

  // Add skip to main content for accessibility
  useEffect(() => {
    const skipLink = document.getElementById('skip-to-main');
    if (skipLink) {
      skipLink.addEventListener('click', (e) => {
        e.preventDefault();
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
          mainContent.focus();
          mainContent.scrollIntoView();
        }
      });
    }
  }, []);

  return (
    <CartProvider>
      {/* SEO: Skip to main content link for accessibility */}
      <a 
        id="skip-to-main"
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-black focus:text-white focus:rounded focus:outline-none"
        aria-label="Skip to main content"
      >
        Skip to main content
      </a>

      <div className="flex flex-col min-h-screen w-auto">
        <Navbar />
        <ScrollToTop />

        {/* Main content with semantic HTML and accessibility */}
        <main 
          id="main-content"
          className="flex-grow" 
          role="main"
          tabIndex={-1}
        >
          <Routes>
            {/* Main Pages */}
            <Route path="/" element={<Home />} />
            <Route path="/About" element={<About />} />
            <Route path="/Products" element={<Products />} />
            <Route path="/Consultancy" element={<Service />} />
            <Route path="/Education" element={<Work_Education />} />
            <Route path="/ContactUs" element={<ContactUs />} />

            {/* Product Pages */}
            <Route path="/Category_page/:categoryName" element={<Category_page />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/Customize_product" element={<CustomizationPage />} />
            <Route path="/customize/:id" element={<CustomizationPage />} />

            {/* E-commerce Pages */}
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/thank-you" element={<ThankYou />} />

            {/* Admin/Grid Pages */}
            <Route path="/product-grid" element={<CustomizableProductGrid />} />
            <Route path="/grid" element={<CustomizableProductGrid />} />
            <Route path="/admin" element={<CustomizableProductGrid />} />

            {/* Design Consultancy Pages */}
            <Route path="/design-consultancy" element={<DesignConsultancy />} />
            <Route path="/design-consultancy/brand-identity-design" element={<BrandIdentityDesign />} />
            <Route path="/design-consultancy/brand-manual-design" element={<BrandManualDesign />} />
            <Route path="/design-consultancy/digital-illustration-design" element={<DigitalIllustrationDesign />} />
            <Route path="/design-consultancy/business-collateral-design" element={<BusinessCollateralDesign />} />
            <Route path="/design-consultancy/brand-campaigns-design" element={<BrandCampaignsDesign />} />
            <Route path="/design-consultancy/social-media-design" element={<SocialMediaDesign />} />
            <Route path="/design-consultancy/digital-painting-design" element={<DigitalPaintingDesign />} />
            <Route path="/design-consultancy/website-uiux-design" element={<WebsiteUiUxDesign />} />
            <Route path="/design-consultancy/book-magazine-zine-design" element={<BookMagazineZineDesign />} />

            {/* Legal/Footer Pages */}
            <Route path="/terms-condition" element={<TermsAndConditions />} />
            <Route path="/privacy-policies" element={<PrivacyPolicy />} />
            <Route path="/shipping-delivery" element={<ShippingPolicy />} />
            <Route path="/cancellation-refund" element={<CancellationRefundPolicy />} />

            <Route path="/admin/sitemap" element={<SitemapGenerator />} />
          </Routes>

          <EnquiryModal />
        </main>

        {/* WhatsApp Button */}
        <WhatsAppButton />

        {/* Enquiry Button - Fixed Position */}
        {createPortal(
          <div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9999,
              pointerEvents: "none",
            }}
            role="complementary"
            aria-label="Enquiry assistance"
          >
            <button
              onClick={openEnquiry}
              style={{ pointerEvents: "auto" }}
              className="
                fixed 
                right-4 md:right-6.5 
                bottom-23 md:bottom-25
                bg-[#0F172A] text-white
                px-3.5 py-3.5
                rounded-full shadow-2xl
                writing-vertical-rl
                font-semibold tracking-widest
                flex items-center gap-2
                hover:bg-[#020617]
                hover:scale-105
                hover:shadow-[0_10px_25px_-5px_rgba(0,0,0,0.4)]
                active:scale-95
                transition-all duration-300
                focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2
              "
              aria-label="Open enquiry form for assistance"
              type="button"
            >
              <MessageCircleQuestion size={28} className="md:size-8" aria-hidden="true" />
            </button>
          </div>,
          document.body
        )}

        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;