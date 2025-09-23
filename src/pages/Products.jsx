import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";
import ProductSection from "../components/ProductSection.jsx";
import WhatsAppButton from "../components/whatsapp.jsx";

import { 
  sections, 
  whatsNewItems, 
  bestSellerItems, 
  FestiveSeason,
  corporateGiftingProducts,
  customisationProducts,
  homeDecorProducts,
  mechanicalProducts,
  designConsultancyProducts,
  educationWorkshopsProducts,
} from "../assets/data.jsx";

// ⭐ Helper function to scroll to a ref with offset
const scrollToRef = (ref) => {
  if (ref.current) {
    const yOffset = -150;
    const y = ref.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
};

const useQuery = () => {
  return new URLSearchParams(window.location.search);
};

const Products = () => {
  // State
  const [showAllFestive, setShowAllFestive] = useState(false);
  const [showAllCorporate, setShowAllCorporate] = useState(false);
  const [showAllCustomisation, setShowAllCustomisation] = useState(false);
  const [showAllHomeDecor, setShowAllHomeDecor] = useState(false);
  const [showAllMechanical, setShowAllMechanical] = useState(false);
  const [showAllDesign, setShowAllDesign] = useState(false);
  const [showAllEducation, setShowAllEducation] = useState(false);
  const [highlightedProduct, setHighlightedProduct] = useState(null);

  // Refs
  const festiveRef = useRef(null);
  const corporateRef = useRef(null);
  const customisationRef = useRef(null);
  const homeDecorRef = useRef(null);
  const mechanicalRef = useRef(null);
  const designRef = useRef(null);
  const educationRef = useRef(null);

const Products = () => {
  // State
  const [showAllFestive, setShowAllFestive] = useState(false);
  const [showAllCorporate, setShowAllCorporate] = useState(false);
  const [showAllCustomisation, setShowAllCustomisation] = useState(false);
  const [showAllHomeDecor, setShowAllHomeDecor] = useState(false);
  const [showAllMechanical, setShowAllMechanical] = useState(false);
  const [showAllDesign, setShowAllDesign] = useState(false);
  const [showAllEducation, setShowAllEducation] = useState(false);
  const [highlightedProduct, setHighlightedProduct] = useState(null);

  // Refs
  const festiveRef = useRef(null);
  const corporateRef = useRef(null);
  const customisationRef = useRef(null);
  const homeDecorRef = useRef(null);
  const mechanicalRef = useRef(null);
  const designRef = useRef(null);
  const educationRef = useRef(null);

  // ADD THESE MISSING FUNCTIONS:
  const findProductInSections = (productName) => {
    const sections = [
      { name: 'festive', products: FestiveSeason },
      { name: 'corporate', products: corporateGiftingProducts },
      { name: 'customisation', products: customisationProducts },
      { name: 'homeDecor', products: homeDecorProducts },
      { name: 'mechanical', products: mechanicalProducts },
      { name: 'design', products: designConsultancyProducts },
      { name: 'education', products: educationWorkshopsProducts }
    ];

    for (const section of sections) {
      const found = section.products.find(product => 
        product.name.toLowerCase().includes(productName.toLowerCase()) ||
        productName.toLowerCase().includes(product.name.toLowerCase())
      );
      if (found) {
        return { section: section.name, product: found };
      }
    }
    return null;
  };

  const expandRelevantSection = (sectionName) => {
    switch(sectionName) {
      case 'festive':
        setShowAllFestive(true);
        break;
      case 'corporate':
        setShowAllCorporate(true);
        break;
      case 'customisation':
        setShowAllCustomisation(true);
        break;
      case 'homeDecor':
        setShowAllHomeDecor(true);
        break;
      case 'mechanical':
        setShowAllMechanical(true);
        break;
      case 'design':
        setShowAllDesign(true);
        break;
      case 'education':
        setShowAllEducation(true);
        break;
    }
  };

  const getSectionRef = (sectionName) => {
    switch(sectionName) {
      case 'festive': return festiveRef;
      case 'corporate': return corporateRef;
      case 'customisation': return customisationRef;
      case 'homeDecor': return homeDecorRef;
      case 'mechanical': return mechanicalRef;
      case 'design': return designRef;
      case 'education': return educationRef;
      default: return null;
    }
  };

  const scrollToProduct = (productName) => {
    const productFound = findProductInSections(productName);
    if (productFound) {
      expandRelevantSection(productFound.section);
      setTimeout(() => {
        const sectionRef = getSectionRef(productFound.section);
        if (sectionRef) {
          scrollToRef(sectionRef);
        }
      }, 200);
    }
  };

  // ADD THIS MISSING useEffect:
  useEffect(() => {
    const query = useQuery();
    const highlightParam = query.get('highlight');
    if (highlightParam) {
      setHighlightedProduct(highlightParam);
      
      setTimeout(() => {
        scrollToProduct(highlightParam);
      }, 500);
      
      setTimeout(() => {
        setHighlightedProduct(null);
        const newUrl = window.location.pathname;
        window.history.replaceState({}, document.title, newUrl);
      }, 5000);
    }
  }, []);

  // Helper function to check if product should be highlighted
  const shouldHighlight = (product) => {
    return highlightedProduct && 
           (product.name.toLowerCase().includes(highlightedProduct.toLowerCase()) ||
            highlightedProduct.toLowerCase().includes(product.name.toLowerCase()));
  };

  // ... rest of your component
};

  
  // Helper function to check if product should be highlighted
  const shouldHighlight = (product) => {
    return highlightedProduct && 
           (product.name.toLowerCase().includes(highlightedProduct.toLowerCase()) ||
            highlightedProduct.toLowerCase().includes(product.name.toLowerCase()));
  };

  // Display logic
  const displayedFestiveProducts = showAllFestive ? FestiveSeason : FestiveSeason.slice(0, 8);
  const displayedCorporateProducts = showAllCorporate ? corporateGiftingProducts : corporateGiftingProducts.slice(0, 8);
  const displayedCustomisationProducts = showAllCustomisation ? customisationProducts : customisationProducts.slice(0, 8);
  const displayedHomeDecorProducts = showAllHomeDecor ? homeDecorProducts : homeDecorProducts.slice(0, 8);
  const displayedMechanicalProducts = showAllMechanical ? mechanicalProducts : mechanicalProducts.slice(0, 8);
  const displayedDesignProducts = showAllDesign ? designConsultancyProducts : designConsultancyProducts.slice(0, 8);
  const displayedEducationProducts = showAllEducation ? educationWorkshopsProducts : educationWorkshopsProducts.slice(0, 8);

  return (
    <main className="mx-auto px-15 py-12">
      <div className="flex justify-end">
         <button className="border p-1 px-4">Sort by</button>
      </div>
      
      <div>
        <h1 className="text-center text-xl font-semibold text-gray-900 mb-8">WHAT'S NEW</h1>
        
        {/* What's New Section - Keep as is */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-15 mb-20">
          {whatsNewItems.map((item, index) => (
            <div key={index}>
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-50 object-cover group-hover:scale-105 rounded-2xl transition-transform duration-300 mb-2"
              />
              <p className="text-xl text-center font-semibold text-gray-600">{item.title}</p>
            </div>
          ))}
        </div>

        {/* Best Seller Section - Keep as is */}
        <div className="flex items-center my-10">
          <div className="flex-grow border-t-2 border-gray-300"></div>
          <span className="mx-4 text-gray-800 font-semibold text-xl"> BEST SELLER </span>
          <div className="flex-grow border-t-2 border-gray-300"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-15 mb-20">
          {bestSellerItems.map((item, index) => (
            <div key={index}>
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-90 object-cover group-hover:scale-105 rounded-2xl transition-transform duration-300 mb-2"
              />
              <p className="text-xl text-center font-semibold text-gray-600">{item.title}</p>
            </div>
          ))}
        </div>

        {/* All Product Sections - Now Using Reusable Component */}
        <ProductSection
          title="FESTIVE SEASON"
          products={FestiveSeason}
          displayedProducts={displayedFestiveProducts}
          showAll={showAllFestive}
          setShowAll={setShowAllFestive}
          sectionRef={festiveRef}
          scrollToRef={scrollToRef}
          shouldHighlight={shouldHighlight}
          buttonColor="bg-[#a6a8d4]"
        />

        <ProductSection
          title="CORPORATE GIFTING"
          products={corporateGiftingProducts}
          displayedProducts={displayedCorporateProducts}
          showAll={showAllCorporate}
          setShowAll={setShowAllCorporate}
          sectionRef={corporateRef}
          scrollToRef={scrollToRef}
          shouldHighlight={shouldHighlight}
        />

        <ProductSection
          title="CUSTOMISATION & MERCHANDISING"
          products={customisationProducts}
          displayedProducts={displayedCustomisationProducts}
          showAll={showAllCustomisation}
          setShowAll={setShowAllCustomisation}
          sectionRef={customisationRef}
          scrollToRef={scrollToRef}
          shouldHighlight={shouldHighlight}
        />

        <ProductSection
          title="HOME & DECOR"
          products={homeDecorProducts}
          displayedProducts={displayedHomeDecorProducts}
          showAll={showAllHomeDecor}
          setShowAll={setShowAllHomeDecor}
          sectionRef={homeDecorRef}
          scrollToRef={scrollToRef}
          shouldHighlight={shouldHighlight}
        />

        <ProductSection
          title="MECHANICAL PRODUCTS"
          products={mechanicalProducts}
          displayedProducts={displayedMechanicalProducts}
          showAll={showAllMechanical}
          setShowAll={setShowAllMechanical}
          sectionRef={mechanicalRef}
          scrollToRef={scrollToRef}
          shouldHighlight={shouldHighlight}
        />

        <ProductSection
          title="DESIGN, PROTOTYPING & CONSULTANCY"
          products={designConsultancyProducts}
          displayedProducts={displayedDesignProducts}
          showAll={showAllDesign}
          setShowAll={setShowAllDesign}
          sectionRef={designRef}
          scrollToRef={scrollToRef}
          shouldHighlight={shouldHighlight}
        />

        <ProductSection
          title="EDUCATION & WORKSHOPS"
          products={educationWorkshopsProducts}
          displayedProducts={displayedEducationProducts}
          showAll={showAllEducation}
          setShowAll={setShowAllEducation}
          sectionRef={educationRef}
          scrollToRef={scrollToRef}
          shouldHighlight={shouldHighlight}
        />

      </div>
      <WhatsAppButton />
    </main>
    
  );
};

export default Products;
