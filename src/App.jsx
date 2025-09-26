import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import { CartProvider } from './context/CartContext';


function App() {
  return (
    <CartProvider>

  
      <div className="flex flex-col min-h-screen w-auto">
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
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
      </CartProvider>

  
  );
}

export default App;
