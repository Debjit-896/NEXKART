import React from 'react';
import { Star } from 'lucide-react';

export default function SpotlightsSection({ title, highlightText, items }) {
  return (
    <div className="w-full mb-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-2">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-700 flex items-center gap-2">
          {title} 
          <span className="text-[#0A88FF] font-semibold relative">
            {highlightText}
            <span className="absolute -bottom-[11px] left-0 w-full h-[3px] bg-[#0A88FF]"></span>
          </span>
        </h2>
        <a href="#" className="text-sm font-semibold text-gray-500 hover:text-[#0A88FF] flex items-center gap-1 transition-colors">
          View All <span className="text-[#0A88FF] text-lg leading-none font-bold">&rsaquo;</span>
        </a>
      </div>

      {/* Cards Container */}
      <div className="flex items-start gap-4 sm:gap-6 overflow-x-auto scrollbar-hide pb-4">
        {items.map((item, index) => (
          <div key={index} className="flex flex-col gap-2 min-w-[180px] sm:min-w-[220px] cursor-pointer group">
            {/* Image Wrapper */}
            <div className="relative bg-[#F4F5F7] rounded-xl overflow-hidden aspect-[4/3] flex items-center justify-center">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 mix-blend-multiply" 
              />
              
              {/* Optional Badge */}
              {item.badge && (
                <div className="absolute bottom-0 left-4 bg-[#A828C5] text-white text-[11px] font-bold px-2 py-1 rounded-t-md flex items-center gap-1 shadow-md">
                  <Star size={12} fill="#FFEB3B" className="text-[#FFEB3B]" /> {item.badge}
                </div>
              )}
            </div>
            
            {/* Details */}
            <div className="flex flex-col px-1">
              <span className="text-[13px] text-gray-600 mb-0.5">{item.subtitle}</span>
              <span className="text-[15px] font-bold text-gray-900">{item.title}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
