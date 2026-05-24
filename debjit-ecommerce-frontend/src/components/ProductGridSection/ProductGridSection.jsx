import React from 'react';
import { Star } from 'lucide-react';

export default function ProductGridSection({ title, highlightText, products }) {
  return (
    <div className="w-full mb-10">
      {/* Header */}
      {(title || highlightText) && (
        <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-2">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-700 flex items-center gap-2">
            {title} 
            <span className="text-[#0A88FF] font-semibold relative">
              {highlightText}
              <span className="absolute -bottom-[11px] left-0 w-full h-[3px] bg-[#0A88FF]"></span>
            </span>
          </h2>
        </div>
      )}

      {/* Grid container */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {products.map((product, index) => (
          <div key={index} className="flex flex-col bg-white group cursor-pointer border border-transparent hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] rounded-lg transition-shadow pb-3">
            
            {/* Image Box */}
            <div className="relative aspect-[4/5] bg-[#F4F5F7] rounded-lg overflow-hidden mb-3">
              <img 
                src={product.image} 
                alt={product.title} 
                className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500" 
              />
              
              {/* Rating Badge */}
              {product.rating && (
                <div className="absolute bottom-2 left-2 bg-white/95 backdrop-blur-sm text-[11px] font-bold text-gray-800 px-1.5 py-0.5 rounded shadow-sm flex items-center gap-1 border border-gray-100">
                  {product.rating} <Star size={10} fill="#008C00" className="text-[#008C00]" /> 
                  <span className="text-gray-500 font-medium ml-0.5">({product.reviews})</span>
                </div>
              )}
            </div>
            
            {/* Details */}
            <div className="flex flex-col px-2">
              <p className="text-[13px] text-gray-700 leading-snug mb-1 line-clamp-1">
                <span className="font-bold text-gray-900 mr-1">{product.brand}</span>
                {product.title}
              </p>
              
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[15px] font-bold text-gray-900">₹{product.price}</span>
                {product.originalPrice && (
                  <span className="text-[12px] text-gray-500 line-through">₹{product.originalPrice}</span>
                )}
              </div>
              
              {product.bankOffer && (
                <p className="text-[11px] text-[#2874F0] font-medium leading-tight">
                  ₹{product.bankOffer} with Bank offer 
                  {product.moreOffers && <span className="text-gray-500 font-normal ml-1">+ more</span>}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
