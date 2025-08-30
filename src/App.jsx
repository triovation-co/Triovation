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

function App() {
  return (
  
      <div className="flex flex-col min-h-screen w-auto">
        {/* Navbar */}
        <Navbar />

        {/* Main content */}
        <main className="flex-grow">
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/About" element={<About />} />
            <Route path="/Products" element={<Products />} />
            <Route path="/Service" element={<Service />} />
            <Route path="/Work_Education" element={<Work_Education />} />
            <Route path="/ContactUs" element={<ContactUs />} />
            <Route path="/Category_page/:categoryName" element={<Category_page />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
  
  );
}

export default App;
