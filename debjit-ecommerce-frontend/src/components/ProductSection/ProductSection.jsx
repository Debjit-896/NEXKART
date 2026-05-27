import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductSection({ title, highlightText, products }) {
  return (
    <div className="w-full mb-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-2">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-700 flex items-center gap-2">
          {title} 
          <span className="text-[#0A88FF] font-semibold relative">
            {highlightText}
            {/* Blue underline matching exactly */}
            <span className="absolute -bottom-[11px] left-0 w-full h-[3px] bg-[#0A88FF]"></span>
          </span>
        </h2>
        <a href="#" className="text-sm font-semibold text-gray-500 hover:text-[#0A88FF] flex items-center gap-1 transition-colors">
          View All <span className="text-[#0A88FF] text-lg leading-none font-bold">&rsaquo;</span>
        </a>
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {products.map((product) => (
          <Link to={`/product/${product.id}`} key={product.id} className="bg-[#F8F9FA] rounded-xl p-4 border border-transparent hover:border-[#0A88FF] hover:bg-blue-50/30 transition-all relative group cursor-pointer block">
            {/* Discount Badge */}
            {product.discount && (
              <div className="absolute top-0 right-0 bg-[#0A88FF] text-white text-[10px] font-bold px-2 py-1.5 rounded-bl-xl rounded-tr-xl z-10 shadow-sm">
                {product.discount}<br/>OFF
              </div>
            )}
            
            {/* Image */}
            <div className="h-36 flex items-center justify-center mb-4 p-2 bg-white rounded-lg shadow-sm">
              <img src={product.image} alt={product.name} className="max-h-full object-contain group-hover:scale-105 transition-transform duration-300" />
            </div>

            {/* Info */}
            <h3 className="text-[13px] font-semibold text-gray-800 mb-1.5 truncate">{product.name}</h3>
            <div className="flex items-center gap-1.5 mb-1.5">
              <span className="text-[15px] font-bold text-gray-900">₹{product.price}</span>
              {product.originalPrice && (
                <span className="text-[11px] font-medium text-gray-400 line-through">₹{product.originalPrice}</span>
              )}
            </div>
            {product.save && (
              <p className="text-[11px] text-green-500 font-semibold">Save - ₹{product.save}</p>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
