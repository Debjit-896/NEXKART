import React from 'react';
import { useWishlist } from '../context/WishlistContext';

export default function WishlistPage() {
  const { wishlistItems, toggleWishlist } = useWishlist();

  return (
    <div className="flex-grow max-w-7xl mx-auto px-4 py-8 w-full">
      <h1 className="text-3xl font-bold text-text-dark mb-6">Your Wishlist</h1>
      {wishlistItems.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-border-light">
          <p className="text-gray-500 text-lg">Your wishlist is currently empty.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlistItems.map(item => (
            <div key={item.id} className="bg-white rounded-xl shadow-sm border border-border-light p-4 flex flex-col">
              <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
              <button 
                onClick={() => toggleWishlist(item)}
                className="mt-auto text-red-500 hover:text-red-700 font-medium text-left"
              >
                Remove from Wishlist
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
