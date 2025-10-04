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
import Video from "./assets/Triovation_video.mp4";
import Mobile from "./assets/mobile_video.mp4";

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
      videoRef.current.play().catch(err => {
        console.log("Autoplay prevented:", err);
      });
    }
  }, [introComplete]);

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
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            autoPlay
            muted
            playsInline
            webkit-playsinline="true"
            onEnded={handleVideoEnd}
          >
            <source src={isMobile ? Mobile : Video} type="video/mp4" />
          </video>
          
          {/* Skip Button */}
          <button
            onClick={handleSkip}
            className="absolute top-2 right-2 sm:top-4 sm:right-4 md:top-8 md:right-8 z-10 bg-white/30 hover:bg-white/40 backdrop-blur-sm text-white px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-3 rounded-full text-xs sm:text-sm md:text-base font-semibold transition-all duration-300 border border-white/40 shadow-lg"
          >
            Skip
          </button>
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
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;