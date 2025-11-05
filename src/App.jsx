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
      // Load the video source
      videoRef.current.load();
      // Try to play
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


  return (
    <CartProvider>
      {/* Video Intro */}
      {!introComplete && (
        <div 
          className={`fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}
        >
          {/* Desktop Video */}
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


          {/* Mobile Video */}
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


      {/* Main App Content */}
      <div className={`flex flex-col min-h-screen w-auto transition-opacity duration-500 ${introComplete ? 'opacity-100' : 'opacity-0'}`}>
        {/* Navbar */}
        <Navbar />


        {/* Main content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Customize_product" element={<CustomizationPage />}/>
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
          </Routes>
        </main>
<WhatsAppButton/>

        {/* Footer */}
        <Footer />
      </div>
    </CartProvider>
  );
}


export default App;
