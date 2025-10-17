import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import ProductSection from "../components/ProductSection.jsx";
import { useProductManager } from "../hooks/useProductManager.jsx";
import bulkorder1 from "../assets/bulkorder1.png";
import bulkorder2 from "../assets/bulkorder2.png";
import WhatsAppButton from "../components/whatsapp.jsx";
import {
  sections, whatsNewItems, bestSellerItems, FestiveSeason,
  corporateGiftingProducts, customisationProducts, homeDecorProducts,
  mechanicalProducts, designConsultancyProducts, educationWorkshopsProducts,
} from "../assets/data.jsx";

// Loading Component for initial page load
const LoadingScreen = () => (
  <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white flex items-center justify-center">
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-orange-500 mb-6"></div>
      <p className="text-gray-700 text-xl font-semibold">Loading products...</p>
      <p className="text-gray-500 text-sm mt-2">Please wait while we fetch the latest items</p>
    </div>
  </div>
);

// Search Loading Overlay - Glassmorphism style
const SearchLoadingOverlay = () => (
  <div className="fixed inset-0 bg-white bg-opacity-40 backdrop-blur-md z-40 flex items-center justify-center">
    <div className="bg-white bg-opacity-80 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white border-opacity-30">
      <div className="flex flex-col items-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-4 border-orange-500 mb-4"></div>
        <p className="text-gray-700 text-lg font-semibold">Searching products...</p>
      </div>
    </div>
  </div>
);

// Helper function to scroll to a ref with offset
const scrollToRef = (ref) => {
  if (ref.current) {
    const yOffset = -150;
    const y = ref.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
};

const Products = () => {
  // Use React Router's useLocation hook
  const location = useLocation();
  
  // State
  const [showAllFestive, setShowAllFestive] = useState(false);
  const [showAllCorporate, setShowAllCorporate] = useState(false);
  const [showAllCustomisation, setShowAllCustomisation] = useState(false);
  const [showAllHomeDecor, setShowAllHomeDecor] = useState(false);
  const [showAllMechanical, setShowAllMechanical] = useState(false);
  const [showAllDesign, setShowAllDesign] = useState(false);
  const [showAllEducation, setShowAllEducation] = useState(false);
  const [highlightedProduct, setHighlightedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [pageReady, setPageReady] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchSource, setSearchSource] = useState('search'); // Track search source: 'search' or 'dropdown'
  
  const [sortBy, setSortBy] = useState('featured');
  const { products: sheetProducts, loading: productsLoading, refreshProducts } = useProductManager();

  // Force minimum loading time of 1.5 seconds for initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      setPageReady(true);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  // Function to sort products locally
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

  const [enhancedProducts, setEnhancedProducts] = useState({
    festive: FestiveSeason,
    corporate: corporateGiftingProducts,
    customisation: customisationProducts,
    homeDecor: homeDecorProducts,
    mechanical: mechanicalProducts,
    design: designConsultancyProducts,
    education: educationWorkshopsProducts
  });

  // Update enhanced products when sheet data loads or sorting changes
  useEffect(() => {
    if (sheetProducts && sheetProducts.length > 0) {
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

  // Enhanced intelligent search function with relevance-based ranking
  const performSearch = async (query) => {
    if (!query || query.trim() === '') {
      setSearchResults([]);
      setIsSearchActive(false);
      setIsSearching(false);
      return;
    }

    // Show loading indicator for search
    setIsSearching(true);

    // Simulate minimum search time for better UX (300ms)
    const searchPromise = new Promise((resolve) => {
      setTimeout(() => {
        const searchLower = query.toLowerCase().trim();
        
        const allProducts = [
          ...enhancedProducts.festive,
          ...enhancedProducts.corporate,
          ...enhancedProducts.customisation,
          ...enhancedProducts.homeDecor,
          ...enhancedProducts.mechanical,
          ...enhancedProducts.design,
          ...enhancedProducts.education
        ];

        console.log('🔍 Search query:', searchLower);
        console.log('📦 Total products to search:', allProducts.length);

        // Split search query into words
        const searchWords = searchLower.split(/\s+/);
        
        // Create search variations (handle plurals)
        const createSearchVariations = (term) => {
          const variations = [term];
          
          if (term.endsWith('s') && term.length > 2) {
            variations.push(term.slice(0, -1));
          } else {
            variations.push(term + 's');
          }
          
          if (term.endsWith('es') && term.length > 3) {
            variations.push(term.slice(0, -2));
          }
          
          if (term.endsWith('ies') && term.length > 4) {
            variations.push(term.slice(0, -3) + 'y');
          } else if (term.endsWith('y') && term.length > 2) {
            variations.push(term.slice(0, -1) + 'ies');
          }
          
          return variations;
        };
        
        // Score each product based on relevance
        const scoredProducts = allProducts.map(product => {
          const name = (product.name || '').toLowerCase();
          const description = (product.description || '').toLowerCase();
          const category = (product.category || '').toLowerCase();
          
          let score = 0;
          
          // Check for exact match (highest priority)
          if (name === searchLower) {
            score = 10000;
            console.log('✅ Exact match:', product.name, '| Score:', score);
            return { product, score };
          }
          
          // Count how many search words match
          let matchedWordsCount = 0;
          const totalSearchWords = searchWords.length;
          
          searchWords.forEach(word => {
            const variations = createSearchVariations(word);
            
            variations.forEach(variation => {
              // Name matches score highest
              if (name.includes(variation)) {
                matchedWordsCount++;
                score += 100; // High score for name match
              }
              // Description matches score medium
              else if (description.includes(variation)) {
                matchedWordsCount++;
                score += 30; // Medium score for description match
              }
              // Category matches score lowest
              else if (category.includes(variation)) {
                matchedWordsCount++;
                score += 10; // Low score for category match
              }
            });
          });
          
          // Bonus for matching percentage
          const matchPercentage = (matchedWordsCount / totalSearchWords) * 100;
          score += matchPercentage * 5; // Bonus based on match percentage
          
          // Bonus if all words match
          if (matchedWordsCount >= totalSearchWords) {
            score += 200; // Extra bonus for matching all search terms
          }
          
          if (score > 0) {
            console.log('✅ Match found:', product.name, '| Matched words:', matchedWordsCount, '/', totalSearchWords, '| Score:', score.toFixed(2));
          }
          
          return { product, score };
        });
        
        // Filter products with score > 0 and sort by score (highest first)
        const results = scoredProducts
          .filter(item => item.score > 0)
          .sort((a, b) => b.score - a.score)
          .map(item => item.product);

        console.log('✨ Total results found:', results.length);
        
        // Apply sorting preference AFTER relevance sorting
        const finalResults = sortBy === 'featured' ? results : sortProductsLocally(results, sortBy);
        
        resolve(finalResults);
      }, 300);
    });

    const results = await searchPromise;
    setSearchResults(results);
    setIsSearching(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Uses location.search which is REACTIVE
  useEffect(() => {
    if (!pageReady) {
      return;
    }

    const params = new URLSearchParams(location.search);
    const search = params.get('search');
    const highlight = params.get('highlight');
    
    console.log('🔄 URL Changed - Search param:', search, '| Highlight param:', highlight);
    
    // Update search query IMMEDIATELY (synchronously)
    if (highlight) {
      console.log('📌 Setting search query to:', highlight);
      setSearchQuery(highlight);
      setSearchSource('dropdown'); // Track that this came from dropdown
      setIsSearchActive(true);
      performSearch(highlight);
    } else if (search) {
      console.log('📌 Setting search query to:', search);
      setSearchQuery(search);
      setSearchSource('search'); // Track that this came from search field
      setIsSearchActive(true);
      performSearch(search);
    } else {
      console.log('📌 Clearing search');
      setSearchQuery('');
      setIsSearchActive(false);
      setSearchResults([]);
    }
  }, [location.search, enhancedProducts, pageReady]);

  const clearSearch = () => {
    setSearchQuery('');
    setIsSearchActive(false);
    setSearchResults([]);
    setIsSearching(false);
    window.history.replaceState({}, document.title, window.location.pathname);
  };

  const handleSortChange = async (newSortBy) => {
    setSortBy(newSortBy);
    
    if (refreshProducts) {
      await refreshProducts(newSortBy);
    }

    if (isSearchActive && searchQuery) {
      performSearch(searchQuery);
    }
  };

  // Refs
  const festiveRef = useRef(null);
  const corporateRef = useRef(null);
  const customisationRef = useRef(null);
  const homeDecorRef = useRef(null);
  const mechanicalRef = useRef(null);
  const designRef = useRef(null);
  const educationRef = useRef(null);

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

  const shouldHighlight = (product) => {
    return highlightedProduct && (
      product.name.toLowerCase().includes(highlightedProduct.toLowerCase()) ||
      highlightedProduct.toLowerCase().includes(product.name.toLowerCase())
    );
  };

  // Show loading screen until page is ready
  if (!pageReady || productsLoading) {
    return <LoadingScreen />;
  }

  const displayedFestiveProducts = showAllFestive ? enhancedProducts.festive : enhancedProducts.festive.slice(0, 8);
  const displayedCorporateProducts = showAllCorporate ? enhancedProducts.corporate : enhancedProducts.corporate.slice(0, 8);
  const displayedCustomisationProducts = showAllCustomisation ? enhancedProducts.customisation : enhancedProducts.customisation.slice(0, 8);
  const displayedHomeDecorProducts = showAllHomeDecor ? enhancedProducts.homeDecor : enhancedProducts.homeDecor.slice(0, 8);
  const displayedMechanicalProducts = showAllMechanical ? enhancedProducts.mechanical : enhancedProducts.mechanical.slice(0, 8);
  const displayedDesignProducts = showAllDesign ? enhancedProducts.design : enhancedProducts.design.slice(0, 8);
  const displayedEducationProducts = showAllEducation ? enhancedProducts.education : enhancedProducts.education.slice(0, 8);

  return (
    <div className="min-h-screen">
      {/* Search Loading Overlay */}
      {isSearching && <SearchLoadingOverlay />}
      
      <div className="w-full px-4 sm:px-6 lg:px-4 py-8">
        {/* Sort Controls */}
        <div className="w-full px-2 py-4 lg:ml-6 2xl:ml-10">
          <div className="flex items-center gap-2 w-full">
            <span className="text-sm font-medium text-gray-700">Sort by:</span>
            <div className="relative flex-1 max-w-[160px]">
              <select
                className="block w-full h-8 bg-white border border-gray-300 rounded px-2 pr-8 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={sortBy}
                onChange={e => handleSortChange(e.target.value)}
              >
                <option value="featured">Featured</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="name">Alphabetical</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>
        </div>

        {/* Search Results Section */}
        {isSearchActive && (
          <div className="w-full max-w-10xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Search Results for "{searchQuery}"
              </h2>
              <button
                onClick={clearSearch}
                className="flex items-center gap-2 text-orange-500 hover:text-orange-600 transition-colors"
              >
                <X size={20} />
                <span className="text-sm font-medium">Clear Search</span>
              </button>
            </div>

            {searchResults.length > 0 ? (
              <>
                <p className="text-gray-600 mb-6">Found {searchResults.length} product{searchResults.length !== 1 ? 's' : ''}</p>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-20">
                  {searchResults.map((product) => (
                    <div 
                      key={product.id}
                      className="w-full rounded-2xl overflow-hidden bg-white flex flex-col h-full"
                    >
                      <Link to={`/product/${product.id}`}>
                        <div className="relative">
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="rounded-2xl w-full h-35 sm:h-56 md:h-50 lg:h-50 xl:h-75 2xl:h-100 object-cover"
                          />
                          {product.savePercent && (
                            <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">
                              Save {product.savePercent}
                            </div>
                          )}
                        </div>
                      </Link>

                      <div className="p-4 flex flex-col flex-grow text-center">
                        <Link to={`/product/${product.id}`}>
                          <h2 className="text-base sm:text-lg text-gray-700 font-semibold mb-2">
                            {product.name}
                          </h2>
                          <p className="text-gray-600 text-xs sm:text-sm lg:text-xs 2xl:text-sm mb-3 leading-relaxed flex-grow line-clamp-2">
                            {product.description || `${product.name} - Perfect for your needs.`}
                          </p>
                          <div className="flex justify-center items-center text-xs sm:text-sm mb-2">
                            {product.rating ? (
                              <>⭐ <span className="ml-1">{product.rating} ({product.reviews} reviews)</span></>
                            ) : (
                              <>⭐ <span className="ml-1">4.5 (10 reviews)</span></>
                            )}
                          </div>
                          <p className="font-medium text-gray-800 mb-4 text-sm sm:text-base">
                            {product.originalPrice ? (
                              <>
                                <span className="line-through text-gray-500 mr-2">₹{product.originalPrice}</span>
                                from ₹{product.price}
                              </>
                            ) : (
                              `from ₹${product.price}`
                            )}
                          </p>
                        </Link>
                        <div className="w-full flex justify-center mt-auto">
                          <button
                            className="bg-orange-500 hover:bg-orange-600 text-white px-3 lg:px-2 2xl:px-4 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-md lg:text-xs 2xl:text-lg rounded-md transition-colors w-auto"
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                {searchSource === 'dropdown' ? (
                  // Message for dropdown/highlight searches (product not in stock)
                  <>
                    <div className="mb-4">
                      <svg className="mx-auto h-16 w-16 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-xl font-semibold mb-2">Stay tuned for more products!</p>
                    <p className="text-gray-500 mb-6">
                      We're constantly adding new items. "{searchQuery}" will be available soon.
                    </p>
                    <button
                      onClick={clearSearch}
                      className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition-colors"
                    >
                      Browse All Products
                    </button>
                  </>
                ) : (
                  // Message for regular search (no products found)
                  <>
                    <div className="mb-4">
                      <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <p className="text-gray-600 text-lg mb-4">No products found matching "{searchQuery}"</p>
                    <p className="text-gray-500 text-sm mb-6">Try adjusting your search terms or browse our categories</p>
                    <button
                      onClick={clearSearch}
                      className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition-colors"
                    >
                      Browse All Products
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        )}

        {/* Regular Product Sections - Only show if not searching */}
        {!isSearchActive && (
          <>
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
          </>
        )}
      </div>

      {/* Corporate Bulk Gifting Section - Only show if not searching */}
      {!isSearchActive && (
        <div className="mt-20">
          <main className="container mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 2xl:px-12 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20 xl:gap-40 2xl:gap-40 items-center">
              
              <div className="relative flex items-center justify-center w-full min-h-[300px] sm:min-h-[400px] lg:min-h-[500px] 2xl:min-h-[600px]">
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
                  <img src={bulkorder1} alt="Gift Background Right" className="w-full h-full object-cover" />
                </div>

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
                  <img src={bulkorder2} alt="Gift Foreground Left" className="w-full h-full object-cover" />
                </div>
              </div>

              <div className="mt-10 lg:mt-20 text-center lg:text-left px-2">
                <p className="text-sm sm:text-base lg:text-lg 2xl:text-xl text-gray-500 mb-4">
                  Joining Kits, Event Giveaways & More
                </p>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl 2xl:text-5xl font-bold text-gray-700 mb-4">
                  Corporate Bulk Gifting
                </h1>
                <p className="text-sm sm:text-base lg:text-lg 2xl:text-xl text-gray-500 mb-6">
                  Email at <span className="font-semibold">Triovation.co@gmail.com</span> for any B2B gifting requirement!
                </p>
                <button className="px-6 py-2 bg-blue-400 hover:bg-blue-500 text-white rounded-lg transition text-sm sm:text-base">
                  Contact Us
                </button>
              </div>
            </div>
          </main>
        </div>
      )}
      
      <WhatsAppButton />
    </div>
  );
};

export default Products;
