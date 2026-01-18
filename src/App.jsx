import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import Video from "./assets/Triovation_video.mov";
import Mobile from "./assets/mobile_video.mp4";
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
import { MessageCircleQuestion, Headset  } from "lucide-react";
import { createPortal } from "react-dom";

function App() {
  const [introComplete, setIntroComplete] = useState(
    sessionStorage.getItem('introWatched') === 'true'
  );
  const [fadeOut, setFadeOut] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const videoRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!introComplete && videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(err => {
        console.log("Autoplay prevented:", err);
      });
    }
  }, [introComplete, isMobile]);

  const handleVideoEnd = () => {
    setFadeOut(true);
    setTimeout(() => {
      setIntroComplete(true);
      sessionStorage.setItem('introWatched', 'true');
    }, 500);
  };

  const handleSkip = () => {
    setFadeOut(true);
    setTimeout(() => {
      setIntroComplete(true);
      sessionStorage.setItem('introWatched', 'true');
    }, 500);
  };

  const openEnquiry = () => {
    window.dispatchEvent(new Event("open-enquiry-form"));
  };

  return (
    <CartProvider>
      {/* ===== VIDEO INTRO (ALWAYS ON TOP) ===== */}
      {!introComplete && (
        <div
          className={`fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}
        >
          {!isMobile && (
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              autoPlay
              muted
              playsInline
              onEnded={handleVideoEnd}
            >
              <source src={Video} type="video/mp4" />
            </video>
          )}

          {isMobile && (
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              autoPlay
              muted
              playsInline
              webkit-playsinline="true"
              onEnded={handleVideoEnd}
            >
              <source src={Mobile} type="video/mp4" />
            </video>
          )}
        </div>
      )}

      {/* ===== ENTIRE APP ONLY RENDERS AFTER INTRO ===== */}
      {introComplete && (
        <div className="flex flex-col min-h-screen w-auto">
          <Navbar />
          <ScrollToTop />

          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Customize_product" element={<CustomizationPage />} />
              <Route path="/customize/:id" element={<CustomizationPage />} />
              <Route path="/About" element={<About />} />
              <Route path="/Products" element={<Products />} />
              <Route path="/Consultancy" element={<Service />} />
              <Route path="/Education" element={<Work_Education />} />
              <Route path="/ContactUs" element={<ContactUs />} />
              <Route path="/Category_page/:categoryName" element={<Category_page />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/product-grid" element={<CustomizableProductGrid />} />
              <Route path="/grid" element={<CustomizableProductGrid />} />
              <Route path="/admin" element={<CustomizableProductGrid />} />
              <Route path="/terms-condition" element={<TermsAndConditions />} />
              <Route path="/privacy-policies" element={<PrivacyPolicy />} />
              <Route path="/shipping-delivery" element={<ShippingPolicy />} />
              <Route path="/cancellation-refund" element={<CancellationRefundPolicy />} />
              <Route path="/thank-you" element={<ThankYou />} />
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
            </Routes>

            <EnquiryModal />
          </main>

          <WhatsAppButton />

          {createPortal(
            <div
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 9999,
                pointerEvents: "none",
              }}
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
" >
               <MessageCircleQuestion size={28} className="md:size-8" />
              </button>
            </div>,
            document.body
          )}

          <Footer />
        </div>
      )}
    </CartProvider>
  );
}

export default App;
