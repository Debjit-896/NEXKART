import React from 'react';
import { useCart } from '../../context/CartContext';

export default function CartItemList() {
  const { cartItems, updateQuantity, removeFromCart, cartCount } = useCart();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800 flex items-center">
          <svg className="w-5 h-5 mr-2 text-[#0A1172]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          Shopping Cart
        </h2>
        <span className="font-bold text-gray-800">{cartCount} {cartCount === 1 ? 'Item' : 'Items'}</span>
      </div>

      {cartItems.length > 0 && (
        <div className="grid grid-cols-12 gap-4 text-xs font-semibold text-gray-400 uppercase tracking-wide border-b border-gray-100 pb-3 mb-4 text-center">
          <div className="col-span-6 text-left pl-4">Product Details</div>
          <div className="col-span-2">Price</div>
          <div className="col-span-2">Quantity</div>
          <div className="col-span-2">Total</div>
        </div>
      )}

      {cartItems.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          Your cart is empty.
        </div>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="grid grid-cols-12 gap-4 items-center p-4 border border-gray-100 rounded-xl relative group hover:shadow-md transition-shadow">
              {/* Product Info */}
              <div className="col-span-6 flex items-center space-x-4">
                <div className="w-20 h-24 bg-blue-50 rounded-lg overflow-hidden flex-shrink-0">
                  <img 
                    src={item.image || `https://via.placeholder.com/80x100?text=${item.name.charAt(0)}`} 
                    alt={item.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">{item.name}</h3>
                  <div className="text-xs text-gray-500 space-y-1">
                    <p>Color - <span className="font-medium text-gray-800">{item.color || 'Default'}</span></p>
                    <p>Size - <span className="font-medium text-gray-800">{item.size || 'M'}</span></p>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="col-span-2 flex flex-col items-center justify-center">
                <span className="font-bold text-green-600">₹{item.price || item.originalPrice}</span>
                {item.originalPrice && item.price && item.originalPrice > item.price && (
                  <span className="text-xs text-red-400 line-through">₹{item.originalPrice}</span>
                )}
              </div>

              {/* Quantity */}
              <div className="col-span-2 flex justify-center items-center">
                <div className="flex border border-gray-200 rounded text-sm overflow-hidden w-16">
                  <span className="w-10 text-center py-1 font-medium bg-gray-50 border-r border-gray-200">
                    {item.quantity || 1}
                  </span>
                  <div className="flex flex-col w-6 bg-white">
                    <button 
                      onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                      className="h-1/2 border-b border-gray-200 flex items-center justify-center hover:bg-gray-100"
                    >
                      <svg className="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path></svg>
                    </button>
                    <button 
                      onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                      className="h-1/2 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50"
                      disabled={(item.quantity || 1) <= 1}
                    >
                      <svg className="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Total */}
              <div className="col-span-2 text-center font-bold text-gray-800">
                ₹{(item.price || item.originalPrice || 0) * (item.quantity || 1)}
              </div>

              {/* Remove Button */}
              <button 
                onClick={() => removeFromCart(item.id)}
                className="absolute top-4 right-4 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                title="Remove Item"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
