import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";
import ProductSection from "../components/ProductSection.jsx";
import { useProductManager } from "../hooks/useProductManager.jsx";
import img from "../assets/image1.jpg";
import WhatsAppButton from "../components/whatsapp.jsx";
import {
  sections, whatsNewItems, bestSellerItems, FestiveSeason,
  corporateGiftingProducts, customisationProducts, homeDecorProducts,
  mechanicalProducts, designConsultancyProducts, educationWorkshopsProducts,
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
  
  // NEW: Sorting state
  const [sortBy, setSortBy] = useState('featured');

  // ADD: Google Sheets Integration with sorting support
  const { products: sheetProducts, loading: productsLoading, refreshProducts } = useProductManager();

  // Function to sort products locally (for static data)
  const sortProductsLocally = (products, sortOption) => {
    const productsCopy = [...products];
    
    switch (sortOption) {
      case 'price-low-high':
        return productsCopy.sort((a, b) => {
          const priceA = parseFloat(a.price?.toString().replace(/[₹$€£¥,\s]/g, '') || '0');
          const priceB = parseFloat(b.price?.toString().replace(/[₹$€£¥,\s]/g, '') || '0');
          return priceA - priceB;
        });
      case 'price-high-low':
        return productsCopy.sort((a, b) => {
          const priceA = parseFloat(a.price?.toString().replace(/[₹$€£¥,\s]/g, '') || '0');
          const priceB = parseFloat(b.price?.toString().replace(/[₹$€£¥,\s]/g, '') || '0');
          return priceB - priceA;
        });
      case 'name':
        return productsCopy.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
      case 'newest':
        return productsCopy.sort((a, b) => {
          const idA = parseInt(a.id) || 0;
          const idB = parseInt(b.id) || 0;
          return idB - idA;
        });
      default:
        return productsCopy;
    }
  };

  // ADD: Enhanced product arrays that combine static + sheet data
  const [enhancedProducts, setEnhancedProducts] = useState({
    festive: FestiveSeason,
    corporate: corporateGiftingProducts,
    customisation: customisationProducts,
    homeDecor: homeDecorProducts,
    mechanical: mechanicalProducts,
    design: designConsultancyProducts,
    education: educationWorkshopsProducts
  });

  // ADD: Update enhanced products when sheet data loads or sorting changes
  useEffect(() => {
    if (sheetProducts && sheetProducts.length > 0) {
      console.log(`Received ${sheetProducts.length} products from sheets`);
      // Group sheet products by category
      const sheetProductsByCategory = sheetProducts.reduce((acc, product) => {
        const category = product.category?.toLowerCase() || '';
        if (category.includes('festive') || category.includes('festival')) {
          acc.festive = acc.festive || [];
          acc.festive.push(product);
        } else if (category.includes('corporate') || category.includes('business')) {
          acc.corporate = acc.corporate || [];
          acc.corporate.push(product);
        } else if (category.includes('custom') || category.includes('merchandising')) {
          acc.customisation = acc.customisation || [];
          acc.customisation.push(product);
        } else if (category.includes('home') || category.includes('decor')) {
          acc.homeDecor = acc.homeDecor || [];
          acc.homeDecor.push(product);
        } else if (category.includes('mechanical') || category.includes('engineering')) {
          acc.mechanical = acc.mechanical || [];
          acc.mechanical.push(product);
        } else if (category.includes('design') || category.includes('consultancy')) {
          acc.design = acc.design || [];
          acc.design.push(product);
        } else if (category.includes('education') || category.includes('workshop')) {
          acc.education = acc.education || [];
          acc.education.push(product);
        }
        return acc;
      }, {});

      // Merge and sort with existing static products
      setEnhancedProducts({
        festive: sortProductsLocally([...FestiveSeason, ...(sheetProductsByCategory.festive || [])], sortBy),
        corporate: sortProductsLocally([...corporateGiftingProducts, ...(sheetProductsByCategory.corporate || [])], sortBy),
        customisation: sortProductsLocally([...customisationProducts, ...(sheetProductsByCategory.customisation || [])], sortBy),
        homeDecor: sortProductsLocally([...homeDecorProducts, ...(sheetProductsByCategory.homeDecor || [])], sortBy),
        mechanical: sortProductsLocally([...mechanicalProducts, ...(sheetProductsByCategory.mechanical || [])], sortBy),
        design: sortProductsLocally([...designConsultancyProducts, ...(sheetProductsByCategory.design || [])], sortBy),
        education: sortProductsLocally([...educationWorkshopsProducts, ...(sheetProductsByCategory.education || [])], sortBy)
      });
    } else {
      // If no sheet products, just sort static products
      setEnhancedProducts({
        festive: sortProductsLocally(FestiveSeason, sortBy),
        corporate: sortProductsLocally(corporateGiftingProducts, sortBy),
        customisation: sortProductsLocally(customisationProducts, sortBy),
        homeDecor: sortProductsLocally(homeDecorProducts, sortBy),
        mechanical: sortProductsLocally(mechanicalProducts, sortBy),
        design: sortProductsLocally(designConsultancyProducts, sortBy),
        education: sortProductsLocally(educationWorkshopsProducts, sortBy)
      });
    }
  }, [sheetProducts, sortBy]);

  // Handle sorting change
  const handleSortChange = async (newSortBy) => {
    setSortBy(newSortBy);
    
    // If we have sheet products, refresh them with new sorting
    if (refreshProducts) {
      await refreshProducts(newSortBy);
    }
  };

  // All your existing refs and functions remain the same...
  const festiveRef = useRef(null);
  const corporateRef = useRef(null);
  const customisationRef = useRef(null);
  const homeDecorRef = useRef(null);
  const mechanicalRef = useRef(null);
  const designRef = useRef(null);
  const educationRef = useRef(null);

  // MODIFY: Use enhancedProducts instead of static data
  const findProductInSections = (productName) => {
    const sections = [
      { name: 'festive', products: enhancedProducts.festive },
      { name: 'corporate', products: enhancedProducts.corporate },
      { name: 'customisation', products: enhancedProducts.customisation },
      { name: 'homeDecor', products: enhancedProducts.homeDecor },
      { name: 'mechanical', products: enhancedProducts.mechanical },
      { name: 'design', products: enhancedProducts.design },
      { name: 'education', products: enhancedProducts.education }
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
      case 'festive': setShowAllFestive(true); break;
      case 'corporate': setShowAllCorporate(true); break;
      case 'customisation': setShowAllCustomisation(true); break;
      case 'homeDecor': setShowAllHomeDecor(true); break;
      case 'mechanical': setShowAllMechanical(true); break;
      case 'design': setShowAllDesign(true); break;
      case 'education': setShowAllEducation(true); break;
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
    return highlightedProduct && (
      product.name.toLowerCase().includes(highlightedProduct.toLowerCase()) ||
      highlightedProduct.toLowerCase().includes(product.name.toLowerCase())
    );
  };

  // Display logic using enhanced products
  const displayedFestiveProducts = showAllFestive ? enhancedProducts.festive : enhancedProducts.festive.slice(0, 8);
  const displayedCorporateProducts = showAllCorporate ? enhancedProducts.corporate : enhancedProducts.corporate.slice(0, 8);
  const displayedCustomisationProducts = showAllCustomisation ? enhancedProducts.customisation : enhancedProducts.customisation.slice(0, 8);
  const displayedHomeDecorProducts = showAllHomeDecor ? enhancedProducts.homeDecor : enhancedProducts.homeDecor.slice(0, 8);
  const displayedMechanicalProducts = showAllMechanical ? enhancedProducts.mechanical : enhancedProducts.mechanical.slice(0, 8);
  const displayedDesignProducts = showAllDesign ? enhancedProducts.design : enhancedProducts.design.slice(0, 8);
  const displayedEducationProducts = showAllEducation ? enhancedProducts.education : enhancedProducts.education.slice(0, 8);

  return (
    <div className="min-h-screen pt-20">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-8">
        {/* Sort Controls - ENHANCED */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 mx-15 -mt-15">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Sort by:</span>
            <div className="relative">
              <select 
                className="appearance-none bg-white border border-gray-300 rounded-md px-3 py-1 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
              >
                <option value="featured">Featured</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="name">Alphabetical</option>
                <option value="newest">Newest</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
          {productsLoading && (
            <div className="text-sm text-gray-600">
              Loading products...
            </div>
          )}
        </div>

        {/* What's New Section - FIXED: Added consistent padding wrapper */}
        <div className="mb-12">
          <div className="px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
            <div className="flex items-center my-10">
              <div className="flex-grow border-t-2 border-gray-300"></div>
              <span className="mx-4 text-gray-800 font-semibold text-xl">WHAT'S NEW</span>
              <div className="flex-grow border-t-2 border-gray-300"></div>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-6 gap-4 sm:gap-6 lg:gap-8 justify-items-center">
              {whatsNewItems.map((item, index) => (
                <Link 
                  key={index} 
                  to={`/category/${encodeURIComponent(item.title)}`}
                  className="w-full max-w-xs rounded-2xl overflow-hidden bg-white flex flex-col h-full"
                >
                  <div className="relative aspect-square">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="rounded-2xl w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-2 flex flex-col flex-grow text-center">
                    <h3 className="text-base sm:text-lg text-gray-700 font-semibold mb-2">{item.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Best Seller Section - Kept consistent padding */}
        <div className="mb-12">
          <div className="px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
            <div className="flex items-center my-10">
              <div className="flex-grow border-t-2 border-gray-300"></div>
              <span className="mx-4 text-gray-800 font-semibold text-xl">BEST SELLER</span>
              <div className="flex-grow border-t-2 border-gray-300"></div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 2xl:gap-8">
              {bestSellerItems.map((item, index) => (
                <Link 
                  key={index} 
                  to={`/category/${encodeURIComponent(item.title)}`}
                  className="w-full rounded-2xl overflow-hidden bg-white flex flex-col h-full mx-auto"
                >
                  <div className="relative">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="rounded-2xl w-full h-48 sm:h-56 md:h-64 2xl:h-100 object-cover"
                    />
                  </div>
                  <div className="p-4 flex flex-col flex-grow text-center">
                    <h3 className="text-base sm:text-lg text-gray-700 font-semibold mb-2">{item.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* All Product Sections - Now using enhanced products */}
        <ProductSection
          title="Festive Season"
          products={enhancedProducts.festive}
          displayedProducts={displayedFestiveProducts}
          showAll={showAllFestive}
          setShowAll={setShowAllFestive}
          sectionRef={festiveRef}
          scrollToRef={scrollToRef}
          shouldHighlight={shouldHighlight}
          buttonColor="bg-orange-400"
        />

        <ProductSection
          title="Corporate Gifting"
          products={enhancedProducts.corporate}
          displayedProducts={displayedCorporateProducts}
          showAll={showAllCorporate}
          setShowAll={setShowAllCorporate}
          sectionRef={corporateRef}
          scrollToRef={scrollToRef}
          shouldHighlight={shouldHighlight}
          buttonColor="bg-orange-400"
        />

        <ProductSection
          title="Customisation & Merchandising"
          products={enhancedProducts.customisation}
          displayedProducts={displayedCustomisationProducts}
          showAll={showAllCustomisation}
          setShowAll={setShowAllCustomisation}
          sectionRef={customisationRef}
          scrollToRef={scrollToRef}
          shouldHighlight={shouldHighlight}
          buttonColor="bg-orange-400"
        />

        <ProductSection
          title="Home Decor"
          products={enhancedProducts.homeDecor}
          displayedProducts={displayedHomeDecorProducts}
          showAll={showAllHomeDecor}
          setShowAll={setShowAllHomeDecor}
          sectionRef={homeDecorRef}
          scrollToRef={scrollToRef}
          shouldHighlight={shouldHighlight}
          buttonColor="bg-orange-400"
        />

        <ProductSection
          title="Mechanical Products"
          products={enhancedProducts.mechanical}
          displayedProducts={displayedMechanicalProducts}
          showAll={showAllMechanical}
          setShowAll={setShowAllMechanical}
          sectionRef={mechanicalRef}
          scrollToRef={scrollToRef}
          shouldHighlight={shouldHighlight}
          buttonColor="bg-orange-400"
        />

        <ProductSection
          title="Design Consultancy"
          products={enhancedProducts.design}
          displayedProducts={displayedDesignProducts}
          showAll={showAllDesign}
          setShowAll={setShowAllDesign}
          sectionRef={designRef}
          scrollToRef={scrollToRef}
          shouldHighlight={shouldHighlight}
          buttonColor="bg-orange-400"
        />

        <ProductSection
          title="Education & Workshops"
          products={enhancedProducts.education}
          displayedProducts={displayedEducationProducts}
          showAll={showAllEducation}
          setShowAll={setShowAllEducation}
          sectionRef={educationRef}
          scrollToRef={scrollToRef}
          shouldHighlight={shouldHighlight}
          buttonColor="bg-orange-400"
        />
      </div>

      {/* Rest of your existing content... */}
      <div className="mt-20">
        <main className="container mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 2xl:px-12 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20 xl:gap-40 2xl:gap-40 items-center">
            
            {/* Left Column: Images */}
            <div className="relative flex items-center justify-center w-full min-h-[300px] sm:min-h-[400px] lg:min-h-[500px] 2xl:min-h-[600px]">
              {/* Right image (behind) */}
              <div
                className="absolute 
                left-1/3 sm:left-[35%] md:left-[40%] lg:left-[45%] 
                top-1/2 -translate-y-1/2 
                w-[200px] h-[260px] 
                sm:w-[275px] sm:h-[350px]  
                md:w-[275px] md:h-[350px]
                lg:w-[335px] lg:h-[370px] 
                xl:w-[425px] xl:h-[500px]
                overflow-hidden shadow-lg rounded-t-full"
              >
                <img src={img} alt="Gift Background Right" className="w-full h-full object-cover" />
              </div>

              {/* Left image (in front) */}
              <div
                className="absolute
                          left-[8%] md:left-[10%] lg:left-[12%]
                          top-[55%] sm:top-[15%] md:top-[62.7%] lg:top-[57%] xl:top-[60.2%]
                          top-1/2 -translate-y-1/2
                          rounded-t-full overflow-hidden
                          w-[180px] h-[230px] 
                          sm:w-[225px] sm:h-[250px]  
                          md:w-[225px] md:h-[250px]
                          lg:w-[275px] lg:h-[300px] 
                          xl:w-[375px] xl:h-[400px]
                          mx-auto"
              >
                <img src={img} alt="Gift Foreground Left" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Right Column: Text */}
            <div className="mt-10 lg:mt-20 text-center lg:text-left px-2">
              <p className="text-sm sm:text-base lg:text-lg 2xl:text-xl text-gray-500 mb-4">
                Joining Kits, Event Giveaways & More
              </p>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl 2xl:text-5xl font-bold text-gray-700 mb-4">
                Corporate Bulk Gifting
              </h1>
              <p className="text-sm sm:text-base lg:text-lg 2xl:text-xl text-gray-500 mb-6">
                Email at <span className="font-semibold">Triovation@gmail.in</span> for any B2B gifting requirement!
              </p>
              <button className="px-6 py-2 bg-blue-400 hover:bg-blue-500 text-white rounded-lg transition text-sm sm:text-base">
                Contact Us
              </button>
            </div>
          </div>
        </main>
      </div>
      
      <WhatsAppButton />
    </div>
  );
};

export default Products;
