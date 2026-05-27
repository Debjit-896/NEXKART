import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';

const categories = [
  { id: 'groceries', label: 'Groceries' },
  { id: 'premium-fruits', label: 'Premium Fruits' },
  { id: 'home-kitchen', label: 'Home & Kitchen' },
  { id: 'fashion', label: 'Fashion' },
  { id: 'electronics', label: 'Electronics' },
  { id: 'beauty', label: 'Beauty' },
  { id: 'home-improvement', label: 'Home Improvement' },
  { id: 'sports-toys', label: 'Sports, Toys & Luggage' },
  { id: 'health-wellness', label: 'Health & Wellness' },
  { id: 'automotive', label: 'Automotive & Accessories' },
  { id: 'books-stationery', label: 'Books & Stationery' },
  { id: 'pet-supplies', label: 'Pet Supplies' },
  { id: 'baby-care', label: 'Baby Care' },
  { id: 'office-supplies', label: 'Office Supplies' },
  { id: 'pharmacy', label: 'Pharmacy & Medical' },
  { id: 'gifts-festive', label: 'Gifts & Festive Decor' }
];

export default function CategoryBar() {
  const scrollContainerRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState('groceries');
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white border-b border-border-light shadow-sm">
      <div className="w-full px-4 md:px-10 lg:px-16 xl:px-24 mx-auto py-2.5 flex items-center">

        <div className="relative w-full flex items-center group">
          {/* Scroll Left Button */}
          {canScrollLeft && (
            <button
              onClick={scrollLeft}
              className="absolute -left-3 md:-left-4 z-10 bg-white shadow-md rounded-full w-8 h-8 flex items-center justify-center text-gray-600 hover:text-primary-blue hover:bg-gray-50 border border-gray-200 hidden md:flex"
              aria-label="Scroll left"
            >
              <ChevronLeft size={20} />
            </button>
          )}

          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            onScroll={checkScroll}
            className="flex-grow flex items-center gap-2 overflow-x-auto scrollbar-hide py-1 scroll-smooth"
          >
            {categories.map((category) => {
              const isActive = activeCategory === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-1 px-4 py-1.5 rounded-full text-[13px] font-medium whitespace-nowrap transition-colors flex-shrink-0 ${isActive
                    ? 'bg-[#0A88FF] text-white shadow-md'
                    : 'bg-bg-light text-gray-700 hover:bg-blue-50 hover:text-primary-blue'
                    }`}
                >
                  {category.label}
                  <ChevronDown size={14} className={isActive ? 'text-white' : 'text-gray-400'} />
                </button>
              );
            })}
          </div>

          {/* Scroll Right Button */}
          {canScrollRight && (
            <button
              onClick={scrollRight}
              className="absolute -right-3 md:-right-4 z-10 bg-white shadow-md rounded-full w-8 h-8 flex items-center justify-center text-gray-500 hover:text-primary-blue hover:bg-gray-50 border border-gray-100 hidden md:flex"
              aria-label="Scroll right"
            >
              <ChevronRight size={20} />
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
