import React, { useState, useEffect } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { ChevronDown, ChevronUp, Heart, Check } from 'lucide-react';
import { filterConfig, defaultFilterConfig } from '../utils/filtersConfig';

export default function ProductListingPage() {
  const { category, subcategory } = useParams();
  const [searchParams] = useSearchParams();
  
  // Fallback to query param if route param is not present (for backward compatibility)
  const rawCategory = category || searchParams.get('category') || 'fashion';
  const rawSubcategory = subcategory || searchParams.get('subcategory') || '';
  
  const categoryKey = rawCategory.toLowerCase();
  const subcategoryKey = rawSubcategory.toLowerCase();
  
  // Resolve config: Try subcategory config first, fallback to main category config, then default
  let currentConfig = defaultFilterConfig;
  if (filterConfig[categoryKey]) {
    if (subcategoryKey && filterConfig[categoryKey].subcategories && filterConfig[categoryKey].subcategories[subcategoryKey]) {
      currentConfig = filterConfig[categoryKey].subcategories[subcategoryKey];
    } else {
      currentConfig = filterConfig[categoryKey];
    }
  }
  
  const categoryNames = {
    fashion: 'Fashion',
    mobiles: 'Mobiles',
    electronics: 'Electronics',
    appliances: 'Appliances',
    beauty: 'Beauty',
    home: 'Home',
    furniture: 'Furniture',
    'toys-baby-kids': 'Toys, Baby & Kids',
    'food-health': 'Food & Health',
    'sports-fitness': 'Sports & Fitness',
    'auto-accessories': 'Auto Accessories',
    'books-stationery': 'Books & Stationery'
  };
  
  const categoryDisplayName = categoryNames[categoryKey] || 'All Products';
  const subcategoryDisplayName = subcategoryKey ? (subcategoryKey.charAt(0).toUpperCase() + subcategoryKey.slice(1).replace(/-/g, ' ')) : null;

  const [sortBy, setSortBy] = useState(currentConfig.sortOptions[0]?.id || 'popularity');
  const [openFilters, setOpenFilters] = useState({});
  const [selectedFilters, setSelectedFilters] = useState({});

  // Initialize open filters (open all by default for visibility)
  useEffect(() => {
    const initialOpen = {};
    currentConfig.filters.forEach(filter => {
      initialOpen[filter.id] = true;
    });
    setOpenFilters(initialOpen);
    
    // Reset selected filters when category changes
    setSelectedFilters({});
    setSortBy(currentConfig.sortOptions[0].id);
  }, [categoryKey, currentConfig]);

  const toggleFilter = (key) => {
    setOpenFilters(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleCheckboxChange = (filterId, option) => {
    setSelectedFilters(prev => {
      const currentSelected = prev[filterId] || [];
      if (currentSelected.includes(option)) {
        return { ...prev, [filterId]: currentSelected.filter(item => item !== option) };
      } else {
        return { ...prev, [filterId]: [...currentSelected, option] };
      }
    });
  };

  // Mock Products
  const products = [
    { id: 101, brand: 'TRIPR', title: 'Pack of 4 Men Soli...', price: 445, originalPrice: 1999, discount: '77%', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=300&q=80', assured: true, sponsored: true },
    { id: 102, brand: 'Try This', title: 'Men Typography P...', price: 299, originalPrice: 999, discount: '70%', image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=300&q=80', assured: true, sponsored: true },
    { id: 103, brand: 'ParcelYard', title: 'Men Regular Fit Sel...', price: 464, originalPrice: 1999, discount: '76%', image: 'https://images.unsplash.com/photo-1596755094514-f87e32f85e23?auto=format&fit=crop&w=300&q=80', assured: true, sponsored: true },
    { id: 104, brand: 'METRONAUT', title: 'Men Regular Fit Sol...', price: 289, originalPrice: 1399, discount: '79%', image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=300&q=80', assured: true, sponsored: false },
    { id: 105, brand: 'HIGHLANDER', title: 'Men Slim Fit Check...', price: 499, originalPrice: 1299, discount: '61%', image: 'https://images.unsplash.com/photo-1588359348347-9bc6cbbb689e?auto=format&fit=crop&w=300&q=80', assured: false, sponsored: false },
    { id: 106, brand: 'PUMA', title: 'Graphic Print Men...', price: 899, originalPrice: 1999, discount: '55%', image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=300&q=80', assured: true, sponsored: false },
    { id: 107, brand: 'U.S. POLO ASSN.', title: 'Men Solid Polo Ne...', price: 1199, originalPrice: 2499, discount: '52%', image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=300&q=80', assured: true, sponsored: false },
    { id: 108, brand: 'WROGN', title: 'Men Slim Fit Solid...', price: 749, originalPrice: 1599, discount: '53%', image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=300&q=80', assured: true, sponsored: false },
  ];

  return (
    <div className="flex-grow w-full bg-gray-50/50 pb-12">
      <div className="w-full px-4 md:px-10 mx-auto pt-4 flex gap-4">
        
        {/* Filter Sidebar */}
        <div className="w-[280px] flex-shrink-0 hidden md:block bg-white shadow-sm rounded-lg overflow-hidden h-fit border border-gray-200 sticky top-4">
          <div className="px-5 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-[17px] font-semibold text-gray-800">Filters</h2>
            {Object.values(selectedFilters).some(arr => arr.length > 0) && (
               <button 
                 onClick={() => setSelectedFilters({})}
                 className="text-[12px] font-semibold text-[#0A88FF] hover:underline"
               >
                 CLEAR ALL
               </button>
            )}
          </div>

          <div className="divide-y divide-gray-100 max-h-[calc(100vh-140px)] overflow-y-auto scrollbar-hide">
            
            {currentConfig.filters.map((filter) => (
              <div key={filter.id} className="px-5 py-4">
                <div 
                  className="flex items-center justify-between cursor-pointer mb-3"
                  onClick={() => toggleFilter(filter.id)}
                >
                  <h3 className="text-[12px] font-semibold text-gray-700 tracking-wider uppercase">{filter.name}</h3>
                  {openFilters[filter.id] ? <ChevronUp size={16} className="text-gray-400"/> : <ChevronDown size={16} className="text-gray-400"/>}
                </div>
                
                {openFilters[filter.id] && (
                  <div className="flex flex-col gap-2 mt-1">
                    {filter.options.map((option) => {
                      const isChecked = selectedFilters[filter.id]?.includes(option) || false;
                      return (
                        <label key={option} className="flex items-center gap-2.5 cursor-pointer group py-0.5">
                          <div className={`w-4 h-4 rounded-sm border flex items-center justify-center transition-colors ${isChecked ? 'bg-[#0A88FF] border-[#0A88FF]' : 'border-gray-300 group-hover:border-gray-400'}`}>
                            {isChecked && <Check size={12} className="text-white" strokeWidth={3} />}
                          </div>
                          <input 
                            type="checkbox" 
                            className="hidden" 
                            checked={isChecked}
                            onChange={() => handleCheckboxChange(filter.id, option)}
                          />
                          <span className={`text-[13px] ${isChecked ? 'text-gray-900 font-medium' : 'text-gray-700 group-hover:text-black'} flex-1`}>{option}</span>
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
            
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
          
          {/* Header & Sorting */}
          <div className="px-5 py-4 border-b border-gray-200">
            <div className="text-[12px] text-gray-500 mb-2 capitalize">
              Home {'>'} {categoryDisplayName} {subcategoryDisplayName ? `> ${subcategoryDisplayName}` : '> All Products'}
            </div>
            <div className="flex items-center gap-2 mb-4">
              <h1 className="text-[16px] font-bold text-gray-800 capitalize">
                {subcategoryDisplayName ? `${subcategoryDisplayName} - ${categoryDisplayName}` : categoryDisplayName}
              </h1>
              <span className="text-[12px] text-gray-500">(Showing 1 – 40 products of 23,356 products)</span>
            </div>
            <div className="flex items-center gap-6 text-[13px] font-medium text-gray-800">
              <span className="text-gray-800 font-semibold">Sort By</span>
              {currentConfig.sortOptions.map((option) => (
                <button 
                  key={option.id}
                  onClick={() => setSortBy(option.id)} 
                  className={`transition-colors ${sortBy === option.id ? 'text-[#0A88FF] border-b-2 border-[#0A88FF] pb-1 font-bold' : 'hover:text-[#0A88FF] pb-1 border-b-2 border-transparent'}`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-0 divide-x divide-y divide-gray-100">
            {products.map((product) => (
              <Link to={`/product/${product.id}`} key={product.id} className="group flex flex-col p-4 hover:shadow-[0_0_10px_rgba(0,0,0,0.1)] transition-shadow bg-white relative z-0 hover:z-10">
                <button className="absolute top-4 right-4 z-10 text-gray-300 hover:text-red-500 transition-colors">
                  <Heart size={20} className="fill-current" />
                </button>
                <div className="w-full aspect-[3/4] overflow-hidden rounded mb-3 bg-gray-50">
                  <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                {product.sponsored && <div className="text-[11px] text-gray-400 mb-0.5">Sponsored</div>}
                <h3 className="text-[13px] font-bold text-gray-500 mb-0.5">{product.brand}</h3>
                <p className="text-[14px] text-gray-800 truncate mb-1" title={product.title}>{product.title}</p>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[16px] font-bold text-gray-800">₹{product.price}</span>
                  <span className="text-[13px] text-gray-500 line-through">₹{product.originalPrice}</span>
                  <span className="text-[13px] font-semibold text-green-600">{product.discount} off</span>
                </div>
                {product.assured && (
                  <div className="mt-1 h-5 flex items-center">
                    <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png" alt="Assured" className="h-4" />
                  </div>
                )}
              </Link>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
