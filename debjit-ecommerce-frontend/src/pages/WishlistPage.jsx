import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';

export default function WishlistPage() {
  const { wishlistItems, toggleWishlist, wishlistCount } = useWishlist();

  return (
    <div className="flex-grow w-full bg-white min-h-screen pb-10">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="py-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-800">
            My Wishlist ({wishlistCount})
          </h1>
        </div>

        {/* Empty State */}
        {wishlistItems.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">Your wishlist is currently empty.</p>
            <Link to="/" className="inline-block mt-4 px-6 py-2 bg-[#0A88FF] text-white rounded-md hover:bg-[#339DFF] transition-colors">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col">
            {wishlistItems.map((item, index) => {
              // Calculate discount percentage if both prices are available
              const originalPrice = item.originalPrice || (item.price * 1.5); // Fallback for mock data
              const currentPrice = item.price || item.originalPrice;
              const discountPercent = Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
              
              return (
                <div 
                  key={item.id} 
                  className={`flex flex-col sm:flex-row py-6 relative group ${index !== wishlistItems.length - 1 ? 'border-b border-gray-200' : ''}`}
                >
                  {/* Left: Image Container */}
                  <Link to={`/product/${item.id}`} className="w-full sm:w-48 h-32 flex-shrink-0 flex flex-col items-center justify-center mb-4 sm:mb-0 relative cursor-pointer">
                    <img 
                      src={item.image || `https://via.placeholder.com/120x120?text=${item.name.charAt(0)}`} 
                      alt={item.name} 
                      className="w-3/4 h-full object-contain"
                    />
                    {item.unavailable && (
                      <span className="text-[#e23a65] text-xs font-medium mt-2 text-center">
                        Currently <br/> unavailable
                      </span>
                    )}
                  </Link>

                  {/* Middle: Details */}
                  <div className="flex-grow sm:pl-6 flex flex-col justify-start">
                    <Link 
                      to={`/product/${item.id}`} 
                      className="text-[#2874f0] hover:text-[#2874f0] font-medium text-base line-clamp-2 pr-10 hover:underline cursor-pointer"
                    >
                      {item.name}
                    </Link>
                    
                    {/* Assured Badge (Mock) */}
                    <div className="flex items-center mt-2 mb-3">
                      <div className="bg-[#2874f0] text-white text-[10px] font-bold italic px-1.5 py-0.5 rounded-sm flex items-center">
                        <svg className="w-3 h-3 mr-0.5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                        Assured
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="flex items-center space-x-3 mt-1">
                      <span className="text-xl font-semibold text-gray-800">
                        ₹{currentPrice.toLocaleString()}
                      </span>
                      {originalPrice > currentPrice && (
                        <>
                          <span className="text-sm text-gray-400 line-through">
                            ₹{originalPrice.toLocaleString()}
                          </span>
                          <span className="text-sm font-medium text-[#388e3c]">
                            {discountPercent}% off
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Right: Delete Button */}
                  <button 
                    onClick={() => toggleWishlist(item)}
                    className="absolute top-6 right-0 text-gray-400 hover:text-red-500 transition-colors p-2"
                    title="Remove from wishlist"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path>
                    </svg>
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
